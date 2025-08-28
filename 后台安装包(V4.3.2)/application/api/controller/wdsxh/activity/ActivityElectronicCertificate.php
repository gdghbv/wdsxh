<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力中小企业发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdadmin.cn    All rights reserved.
// +----------------------------------------------------------------------
// | Wdadmin系统产品软件并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.wdadmin.cn
// +----------------------------------------------------------------------
namespace app\api\controller\wdsxh\activity;

use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;

class ActivityElectronicCertificate extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\activity\ActivityElectronicCertificate();
    }

    /**
     * Desc  电子证书数据
     * Create on 2024/4/9 17:52
     * Create by wangyafang
     */
    public function index(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $activity_id = $this->request->get('id');
        if (empty($activity_id)) {
            $this->error('参数错误');
        }
        $activityObj = (new \app\api\model\wdsxh\activity\Activity())->get($activity_id);
        if (!$activityObj) {
            $this->error('活动不存在');
        }
        if ($activityObj['end_time'] > time()) {
            $this->error('活动未结束');
        }
        if ($activityObj['state'] != '3') {
            $this->error('活动未结束');
        }
        $apply_id = $this->request->get('apply_id');
        if (empty($apply_id)) {
            $this->error('参数错误');
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
            ->where('id',$apply_id)
            ->where('wechat_id',$wechat_id)
            ->where('activity_id',$activity_id)
            ->find();
        if(!$activityApplyObj){
            $this->error('报名信息不存在');
        }

        $data = $this->model->where('id',1)->value('data');
        $data = json_decode($data,true);
        $data['bg']['img'] = wdsxh_full_url($data['bg']['img']);
        if (!empty($activityApplyObj['name'])) {
            $participant = $activityApplyObj['name'];
        } else {
            $participant = (new UserWechat())->where('id', $activityApplyObj['wechat_id'])->value('nickname');
        }

        $result_data = array(
            'activity_name'=>$activityObj['name'],
            'participant'=>$participant,
            'time'=>date('Y年m月d日',$activityObj['start_time']),
            'data'=>$data,
        );

        $this->success('请求成功',$result_data);
    }
}