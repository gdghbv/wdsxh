<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
/**
 * Class Verifying
 * Desc  活动核销
 * Create on 2024/3/15 16:27
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\activity;


use addons\wdsxh\library\Encryptor;
use app\admin\model\wdsxh\Config;
use app\common\model\wdsxh\points\UserWechatPointsLog;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class Verifying extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * Desc  核销活动列表
     * Create on 2024/3/14 17:09
     * Create by wangyafang
     */
    public function activity_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $where[] = ['exp',Db::raw("FIND_IN_SET($wechat_id,verifying_wechat_ids)")];

        $activityModel = new \app\api\model\wdsxh\activity\Activity();

        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;

        $count = $activityModel->where($where)->count();

        $data = $activityModel
            ->where($where)
            ->page($page,$limit)
            ->field('id,name,start_time,address,images,organizing_method')
            ->order('id desc')
            ->select();

        $activityController = new Activity();
        foreach ($data as $k=>&$v) {
            $v->week = $activityController->getTimeWeek($v['start_time']);
            $v->start_time = date('m/d H:i',$v->start_time);
            $images = explode(',',$v->images);
            $v->images = $images[0];
        }

        $this->success('请求成功',['total'=>$count,'data'=>$data]);
    }

    /**
     * @notes 扫码核销
     * @author wangyafang
     * @date 2024/3/15 16:46
     */
    public function verifying() {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $wechat_id = $this->request->post('wechat_id');
        $activity_id = $this->request->post('activity_id');
        $activityObj = (new \app\api\model\wdsxh\activity\Activity())->get($activity_id);
        if (!$activityObj) {
            $this->error('活动不存在');
        }

        if ($activityObj['state'] == '3') {
            $this->error('活动已结束，无法核销');
        }

        if ($activityObj['is_verifying'] == '1') {
            $user_id = $this->auth->id;
            $admin_wechat_id = (new UserWechat())->where('user_id',$user_id)->value('id');
            $verifying_wechat_ids_array = explode(',',$activityObj['verifying_wechat_ids']);
            if (!in_array($admin_wechat_id,$verifying_wechat_ids_array)) {
                $this->error('不是核销管理员，请在后台活动设置为核销管理员');
            }
        } else {
            $this->error('此活动不用核销');
        }

        $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
            ->where('wechat_id',$wechat_id)
            ->where('activity_id',$activity_id)
            ->where('state','2')
            ->find();
        if (!$activityApplyObj) {
            $this->error('没有找到报名信息或者未付款，无法核销');
        }
        if ($activityApplyObj['is_sign_in'] == '1') {
            $this->error('已核销');
        }
        $activityApplyObj->is_sign_in = '1';
        $activityApplyObj->save();

        if ($activityObj['points_status'] == 1) {
            UserWechatPointsLog::activity(1,$activityApplyObj,$activityObj,'参加活动：'.$activityObj['name'].'获得'.$activityObj['points'].'个积分');
        }
        $this->success('核销成功');
    }

    /**
     * @notes 核销会员列表
     * @author wangyafang
     * @date 2024/3/15 16:57
     */
    public function verifying_member_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->get();
        $where = [];
        $where['apply.activity_id'] = array('eq',$param['activity_id']);
        $where['apply.is_sign_in'] = array('eq',$param['is_sign_in']);

        $activityApplyModel = new \app\api\model\wdsxh\activity\ActivityApply();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $count = $activityApplyModel->alias('apply')->where($where)->count();
        $order = 'apply.id desc';

        //todo 活动创建后，会员功能对外功能不可用，非会员无法报名
        $data = $activityApplyModel
            ->alias('apply')
            ->where($where)
            ->page($page,$limit)
            ->field('apply.is_sign_in,wechat.nickname,wechat.avatar')
            ->join('wdsxh_user_wechat wechat','apply.wechat_id = wechat.id')
            ->order($order)
            ->select();
        foreach ($data as &$v) {
            $v->avatar = wdsxh_full_url($v->avatar);
        }

        $this->success('请求成功',['total'=>$count,'data'=>$data]);
    }

    /**
     * Desc 自动核销
     * Create on 2025/3/8 9:34
     * Create by wangyafang
     */
    public function self_service_check_in()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $validate_value = $this->request->post('validate_value');
        $activity_id = $this->request->post('activity_id');
        $from_lng = $this->request->post('lng');
        $from_lat = $this->request->post('lat');
        if (empty($validate_value)) {
            $this->error('validate_value参数不能为空');
        }
        if (empty($activity_id)) {
            $this->error('activity_id参数不能为空');
        }
        if (empty($from_lng)) {
            $this->error('纬度不能为空');
        }
        if (empty($from_lat)) {
            $this->error('经度不能为空');
        }

        try {
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $activityObj = (new \app\api\model\wdsxh\activity\Activity())->get($activity_id);
            if (!$activityObj) {
                $this->error('活动不存在');
            }
            if ($activityObj['state'] == '3') {
                $this->error('活动已结束，无法核销');
            }

            if ($activityObj['is_verifying'] == '2') {
                $this->error('此活动不用核销');
            }

            if ($activityObj['verification_method'] != 1) {
                $this->error('核销方式不是自助签到，无法核销');
            }

            $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
                ->where('wechat_id',$wechat_id)
                ->where('activity_id',$activity_id)
                ->where('state','2')
                ->find();
            if (!$activityApplyObj) {
                $this->error('没有找到报名信息或者未付款，无法核销');
            }
            if ($activityApplyObj['is_sign_in'] == '1') {
                $this->error('已核销');
            }
            $token_key = config('token.key');
            $encryptor = new Encryptor(substr($token_key,0,16),substr($token_key,16));
            if ($encryptor->encrypt($activity_id) != $validate_value) {// 验证失败，返回错误
                $this->error('签到失败，请检查签到二维码是否正确');
            }
            $distance = $this->calculateDistance($from_lat,$from_lng,$activityObj['latitude'],$activityObj['longitude']);
            if ($distance > 1000) {
                $this->error('请在1000米内核销');
            }
            $activityApplyObj->is_sign_in = '1';
            $activityApplyObj->save();

            if ($activityObj['points_status'] == 1) {
                UserWechatPointsLog::activity(1,$activityApplyObj,$activityObj,'参加活动：'.$activityObj['name'].'获得'.$activityObj['points'].'个积分');
            }
            $this->success('核销成功');
        }  catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }
    }

    /**
     * Desc 计算距离
     * Create on 2025/3/8 9:55
     * Create by wangyafang
     */
    private function calculateDistance($lat1, $lon1, $lat2, $lon2) {
        $lat1 = floatval($lat1);
        $lon1 = floatval($lon1);
        $lat2 = floatval($lat2);
        $lon2 = floatval($lon2);

        // 验证经度和纬度是否在有效范围内
        if ($lon1 < -180 || $lon1 > 180) {
            $this->error('经度值不在有效范围内');
        }
        if ($lat1 < -90 || $lat1 > 90) {
            $this->error('纬度值不在有效范围内');
        }

        if ($lon2 < -180 || $lon2 > 180) {
            $this->error('经度值不在有效范围内');
        }
        if ($lat2 < -90 || $lat2 > 90) {
            $this->error('纬度值不在有效范围内');
        }

        // 地球半径（单位：米）
        $earthRadius = 6371000;

        // 将纬度、经度从度转换为弧度
        $latFrom = deg2rad($lat1);
        $lonFrom = deg2rad($lon1);
        $latTo = deg2rad($lat2);
        $lonTo = deg2rad($lon2);

        // 计算纬度和经度的差值
        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        // 使用 Haversine 公式计算距离
        $angle = 2 * asin(sqrt(
                pow(sin($latDelta / 2), 2) +
                cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)
            ));
        $distance = $angle * $earthRadius;

        return $distance;
    }

    /**
     * Desc 获取核销加密数据
     * Create on 2025/4/17 9:58
     * Create by wangyafang
     */
    public function get_decrypt_data()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $validate_value = $this->request->get('validate_value');

        if (empty($validate_value)) {
            $this->error('validate_value参数不能为空');
        }
        $token_key = config('token.key');
        $encryptor = new Encryptor(substr($token_key,0,16),substr($token_key,16));
        $activity_id = $validate_value = $encryptor->decrypt($validate_value);

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $apply_id = (new \app\api\model\wdsxh\activity\ActivityApply())->where('activity_id',$activity_id)->where('wechat_id',$wechat_id)->value('id');
        if (!$apply_id) {
            $apply_id = '';
        }
        $this->success('请求成功',array('activity_id'=>$validate_value,'apply_id'=>$apply_id));
    }

}



 