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
namespace app\api\controller\wdsxh\activity;

use app\admin\model\wdsxh\activity\ActivityConfig;
use app\api\model\wdsxh\activity\Order;
use app\api\model\wdsxh\activity\Refund;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\user\Wechat;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * Class Activity
 * Desc  活动控制器
 * Create on 2024/3/11 16:24
 * Create by wangyafang
 */
class Activity extends Api
{
    protected $noNeedLogin = ['index','update_activity_state','details','activity_config'];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\activity\Activity();
    }

    /*
     * desc: 活动列表
     * time: 2024-3-11 16:38
     * */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->get();
        $where = [];

        $expired_activity_show = (new ActivityConfig())->value('expired_activity_show');
        if ($expired_activity_show == 1) {
            $where['state'] = array('in',['1','2','3']);
        } else {
            $where['state'] = array('in',['1','2']);
        }

        $where['status'] = array('eq','normal');

        if(isset($param['keywords']) && !empty($param['keywords'])) {
            $where['name'] = array('like','%'.$param['keywords'].'%');
        }
        if(isset($param['state']) && !empty($param['state'])) {
            $where['state'] = array('eq',$param['state']);
        }
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $count = $this->model->where($where)->count();
        $order = 'weigh desc,id desc';

        $data = $this->model
            ->where($where)
            ->page($page,$limit)
            ->field('id,name,start_time,address,images,organizing_method,activity_auth')
            ->order($order)
            ->select();

        foreach ($data as $k=>&$v) {
            $v->week = $this->getTimeWeek($v['start_time']);
            $v->start_time = date('m/d H:i',$v->start_time);
            $images = explode(',',$v->images);
            $v->images = $images[0];
        }

        $this->success('请求成功',['total'=>$count,'data'=>$data]);
    }

    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('id');
        $data = $this->model
            ->where('id',$id)
            ->field('id,images,start_time,end_time,name,fees,state activity_state,
            contacts,mobile,
            organizing_method,url,address,longitude,latitude,content,
            is_verifying,refund,
            apply_time,
            activity_auth,
            points_status,points,
            apply_field_state,
            apply_limit_number,
            non_member_registration_status')
            ->find();
        if (!$data) {
            $this->error('活动不存在');
        }
        if ($this->auth->isLogin()) {
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
                ->where('wechat_id',$wechat_id)
                ->where('activity_id',$id)
                ->order('id desc')
                ->find();
            if (!$activityApplyObj) {
                $data['pay_state'] = '1';
                $data['apply_id'] = '';
                $data['reject'] = '';
            } else {
                $data['pay_state'] = $activityApplyObj['state'];
                $data['apply_id'] = $activityApplyObj['id'];
                $activityRefundObj = (new Refund())
                    ->where('activity_id',$id)
                    ->where('wechat_id',$wechat_id)
                    ->where('state','3')
                    ->order('id desc')
                    ->find();
                $data['reject'] = $activityRefundObj ? $activityRefundObj['reject'] : '';
            }
        } else {
            $data['pay_state'] = '1';
            $data['apply_id'] = '';
            $data['reject'] = '';
        }

        if ($data['points_status'] == 2) {
            unset($data['points']);
        }

        $activityApplyModel = new \app\api\model\wdsxh\activity\ActivityApply();
        $data['apply_count'] = $activityApplyModel->where('activity_id', $id)->where('state',2)->count();
        $apply_list = $activityApplyModel->where('activity_id', $id)
            ->where('state',2)
            ->alias('apply')
            ->order('apply.createtime desc')
            ->join('wdsxh_member member', 'member.id = apply.member_id')
            ->field('member.avatar member_avatar')
            ->limit(10)
            ->select();
        if (!empty($apply_list)) {
            foreach ($apply_list as &$v) {
                $v->member_avatar = wdsxh_full_url($v->member_avatar);
            }
        }
        $data['apply_list'] = $apply_list;

        if ($this->auth->isLogin()) {
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
                ->where('activity_id', $id)
                ->where('wechat_id',$wechat_id)
                ->where('state','2')
                ->find();
            if ($activityApplyObj) {
                $apply_status = 1;
            } else {
                $apply_status = 2;
            }
        } else {
            $apply_status = 2;
        }
        $data['apply_status'] = $apply_status;

        if ($this->auth->isLogin()) {
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
                ->where('activity_id', $id)
                ->where('wechat_id',$wechat_id)
                ->find();
            if ($activityApplyObj && !empty($activityApplyObj['field_data'])) {
                $apply_info_fill_state = 1;
            } else {
                $apply_info_fill_state = 2;
            }
        } else {
            $apply_info_fill_state = 2;
        }
        $data['apply_info_fill_state'] = $apply_info_fill_state;

        if (!empty($data['apply_limit_number']) && $data['apply_limit_number'] > 0) {
            $apply_count = (new \app\api\model\wdsxh\activity\ActivityApply())->where('activity_id', $id)
                ->where('state',2)
                ->count();
            if ($data['apply_limit_number'] > $apply_count) {
                $data['apply_limit_number'] = $data['apply_limit_number'] - $apply_count;
            } else {
                $data['apply_limit_number'] = 0;
            }
        }

        $this->success('请求成功',$data);
    }

    public function getTimeWeek($time, $i = 0) {
        $weekarray = array("日","一", "二", "三", "四", "五", "六");
        $week = $weekarray[date("w",$time)];
        return "周".$week;
    }

    /*
     * desc: 会员活动列表
     * time: 2024-3-11 17:38
     * */
    public function user_index()
    {
        $page=$this->request->param('page',1);
        $limit=$this->request->param('limit',10);
        $payState=$this->request->param('pay_state',0);//报名状态
        $activityState=$this->request->param('activity_state',0);
        try {
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $where=array(
                'ActivityApply.wechat_id'=>$wechat_id
            );
            if(!empty($payState)){
                $where['ActivityApply.state'] = $payState;
            }

            $activityMap = array();
            if(!empty($activityState)){
                $activityMap['state']=$activityState;
            }
            $applyModel = new \app\api\model\wdsxh\activity\ActivityApply();
            $count = $applyModel->hasWhere('activity',$activityMap)->where($where)->count();
            $list = $applyModel->hasWhere('activity',$activityMap)->page($page,$limit)->where($where)->order('id desc')->select();
            $activityOrderModel = new Order();

            foreach ($list as $k=>&$v) {
                $v->pay_state = $v->state;
                $activityObj = $this->model->get($v->activity_id);
                $orderObj = $activityOrderModel
                    ->where('activity_id',$v->activity_id)
                    ->where('apply_id',$v->id)
                    ->where('wechat_id',$v->wechat_id)
                    ->where('member_id',$v->member_id)
                    ->order('id desc')
                    ->limit(1)
                    ->find();
                $v->order_no = $orderObj ? $orderObj['order_no'] : '';
                $v->name = $activityObj['name'];
                $images = explode(',',$activityObj['images']);
                $v->images = $images[0];
                $v->week = $this->getTimeWeek($activityObj['start_time']);
                $v->start_time = date('m/d H:i',$activityObj['start_time']);
                $v->address = $activityObj->address;
                $v->fees = $orderObj ? $orderObj['pay_amount'] : '';
                $v->organizing_method = $activityObj['organizing_method'];
                $v->activity_state = $activityObj['state'];
                $v->refund = $activityObj['refund'];
                $v->url = $activityObj['url'];
                $v->is_verifying = $activityObj['is_verifying'];
                $v->verification_method = $activityObj['verification_method'];

                $v->hidden(['wechat_id','member_id','createtime','state']);
                unset($orderObj);
                unset($activityObj);
            }
            $this->success('请求成功',['total'=>$count,'data'=>$list]);
        } catch (ValidateException|PDOException|Exception $e)  {
            $this->error($e->getMessage());
        }
    }

    /*
     * desc: 申请退款
     * time: 2024-3-11 16:38
     * */
    public function apply_refund()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        $result = $this->validate($param,'app\api\validate\wdsxh\activity\Refund.apply_refund');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }

        $activityObj = $this->model->get($param['activity_id']);
        if(!$activityObj){
            $this->error('活动信息不存在');
        }
        if ($activityObj['refund'] == 0) {
            $this->error('此活动无法退款');
        }
        if ($activityObj && $activityObj['state'] == '2') {
            $this->error('活动进行中，无法退款');
        }
        if ($activityObj && $activityObj['state'] == '3') {
            $this->error('活动已结束，无法退款');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');

        $refundModel = new Refund();
        $refundObj = $refundModel->where('activity_id',$param['activity_id'])
            ->where('apply_id',$param['apply_id'])
            ->find();
        if ($refundObj && $refundObj['wechat_id'] != $wechat_id) {
            $this->error('不是此用户下的活动，无法退款');
        }
        $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())->get($param['apply_id']);
        $orderObj = (new Order())->where('activity_id',$param['activity_id'])
            ->where('apply_id',$param['apply_id'])
            ->where('wechat_id',$wechat_id)
            ->where('member_id',$activityApplyObj['member_id'])
            ->where('paid','2')
            ->order('id desc')
            ->limit(1)
            ->find();
        if (!$orderObj) {
            $this->error('订单支付信息不存在');
        }
        if($orderObj['pay_amount'] == 0.00){
            $this->error('订单0元，无法退款');
        }

        if ($refundObj && $refundObj['state'] == '1') {
            $this->error('已申请退款，请勿重复提交');
        }
        $applyObj = (new \app\api\model\wdsxh\activity\ActivityApply())->get($param['apply_id']);

        if ($refundObj) {
            Db::startTrans();
            try{
                $refundObj->state = '1';
                $refundObj->reject = '';
                $refundObj->save();
                $applyObj->state = '3';
                $applyObj->save();
                // 提交事务
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $this->error($e->getMessage());
            }
            $this->success('提交成功');
        } else {
            Db::startTrans();
            try{
                $refund_data = array(
                    'activity_id'=> $param['activity_id'],
                    'apply_id'=> $param['apply_id'],
                    'wechat_id' => $activityApplyObj['wechat_id'],
                    'member_id'=>$activityApplyObj['member_id'],
                    'order_id'=>$orderObj['id'],
                );
                $refundModel->data($refund_data);
                $refundModel->allowField(true)->save();
                $applyObj->state = '3';
                $applyObj->save();
                // 提交事务
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $this->error($e->getMessage());
            }
            $this->success('提交成功');
        }
    }

    /*
     * desc: 参会凭证
     * time: 2024-3-130 9:46
     * */
    public function attendance_voucher()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('activity_id');
        $activityObj = $this->model
            ->where('id',$id)
            ->field('id,name activity_name,
            address')
            ->find();

        if (!$activityObj) {
            $this->error('活动不存在');
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $activityArray = $activityObj->toArray();
        $memberObj = (new Member())->where('wechat_id',$wechat_id)
            ->field('name member_name,avatar member_avatar,mobile,
            type,member_level_name,type,company_name,organize_name')
            ->find();
        if ($memberObj) {
            $memberObj->member_avatar = wdsxh_full_url($memberObj->member_avatar);
            $memberArray = $memberObj->toArray();
            $data = array_merge($activityArray,$memberArray);
        } else {
            $memberObj = (new UserWechat())->where('id',$wechat_id)
                ->field('nickname member_name,avatar member_avatar,mobile')
                ->find();


            $memberObj->member_avatar = wdsxh_full_url($memberObj->member_avatar);
            $memberObj['member_level_name'] = '普通用户';
            $memberObj['company_name'] = '';
            $memberObj['organize_name'] = '';
            $memberArray = $memberObj->toArray();
            $data = array_merge($activityArray,$memberArray);
        }


        $data['wechat_id'] = $wechat_id;

        $this->success('请求成功',$data);
    }

    /**
     * Desc 更新活动状态
     * Create on 2025/1/20 15:22
     * Create by wangyafang
     */
    public function update_activity_state()
    {
        $now = time();
        $applyData = $this->model->where('state','1')->where('apply_time','elt',$now)->column('id');
        if (!empty($applyData)) {
            $this->model->where('id','in',$applyData)->update(['state'=>'2']);
        }
        $endData = $this->model->where('state','2')->where('end_time','elt',$now)->column('id');
        if (!empty($endData)) {
            $this->model->where('id','in',$endData)->update(['state'=>'3']);
        }

        $this->success('请求成功');
    }

    /**
     * Desc 接龙配置
     * Create on 2025/8/8 10:04
     * Create by wangyafang
     */
    public function activity_config()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('id');
        if (empty($id)) {
            $this->error('参数错误');
        }
        $activityObj = $this->model->get($id);
        if (!$activityObj) {
            $this->error('活动数据不存在');
        }
        $is_status = $activityObj['activity_auth'];

        if ($is_status == 2){
            if ($this->auth->isLogin()) {
                $user_id = $this->auth->id;
                $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
                $current_date = date('Y-m-d',time());
                $member = (new Member())->where('wechat_id',$wechat_id)->where('expire_time','>=',$current_date)->find();
                if ($member) {
                    $is_status = 1;
                }
            }
        }
        $this->success('请求成功',['show_status'=>$is_status]);
    }
}



 