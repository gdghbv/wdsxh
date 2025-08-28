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
 * Class ActivityApply
 * Desc  活动报名控制器
 * Create on 2024/3/11 17:57
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\activity;


use addons\wdsxh\library\Wxapp;
use app\api\model\wdsxh\activity\ActivityApplyRecord;
use app\api\model\wdsxh\activity\Order;
use app\api\model\wdsxh\activity\Refund;
use app\api\model\wdsxh\member\Member;
use app\common\model\wdsxh\points\UserWechatPointsLog;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class ActivityApply extends Api
{
    protected $noNeedLogin = ['index','notify'];
    protected $noNeedRight = ['*'];
    protected $model = null;
    protected $configObj = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\activity\ActivityApply();
        $this->configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
    }

    /*
     * desc: 活动取消
     * time: 2023-3-30 10:20
     * */
    public function cancel()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->post('id');
        $where = array(
            'id'=>$id,
        );
        $activityApplyObj = $this->model->where($where)->find();
        if (!$activityApplyObj) {
            $this->error('活动已取消');
        }
        $activityObj = (new \app\api\model\wdsxh\activity\Activity())->where('id',$activityApplyObj['activity_id'])->find();
        if ($activityObj && $activityObj['state'] == '2') {
            $this->error('活动进行中，无法取消');
        }
        if ($activityObj && $activityObj['state'] == '3') {
            $this->error('活动已结束，无法取消');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        if ($wechat_id != $activityApplyObj['wechat_id']) {
            $this->error('不是本人，无法取消');
        }
        $result = false;
        Db::startTrans();
        try {
            $result = $activityApplyObj->delete();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($activityApplyObj->getError());
        }
        if ($activityObj['points_status'] == 1) {
            $userWechatPointsLogObj = (new UserWechatPointsLog())->where('activity_id',$activityObj['id'])
                ->where('wechat_id',$wechat_id)
                ->where('change',1)
                ->find();
            if ($userWechatPointsLogObj) {
                UserWechatPointsLog::activity(2,$activityApplyObj,$activityObj,'活动：'.$activityObj['name'].'，取消报名成功，退回'.$activityObj['points'].'个积分');
            }
        }
        $this->success('取消成功');
    }

    /*
     * desc: 活动提交
     * time: 2023-3-11 18:00
     * */
    public function submit()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();

        $fixed_data = array();
        if (isset($_POST['data']) && !empty($_POST['data'])) {
            $custom_content = $_POST['data'];
            $param['data'] = json_decode($custom_content, true);
            $fixed_data = $this->handle_custom_data($param['data']);
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $result = $this->validate($param,'app\api\validate\wdsxh\activity\ActivityApply.apply');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }
        $activityObj = (new \app\api\model\wdsxh\activity\Activity())->where('id',$param['activity_id'])->find();
        $current_date = date('Y-m-d',time());
        $memberObj = (new Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();
        if ($activityObj['non_member_registration_status'] == '2' && !$memberObj) {
            $this->error('只有会员才能报名');
        }
        if (!$activityObj) {
            $this->error('活动不存在');
        }
        if ($activityObj['apply_time'] < time()) {
            $this->error('活动报名时间已过，无法报名');
        }
        if ($activityObj['state'] == '2') {
            $this->error('活动进行中，无法报名');
        }
        if ($activityObj['state'] == '3') {
            $this->error('活动已结束，无法报名');
        }
        $applyObj = $this->model->where(array('wechat_id'=>$wechat_id,'activity_id'=>$param['activity_id']))
            ->order('id desc')->find();
        if($applyObj && $applyObj['state'] == '2'){
            $this->error('你已报名过了，不能重复报名');
        }
        if($applyObj && $applyObj['state'] == '3'){
            $this->error('你的报名信息正在申请退款处理，暂时无法报名');
        }

        if (!empty($activityObj['apply_limit_number']) && $activityObj['apply_limit_number'] > 0) {
            $apply_count = $this->model->where('activity_id', $param['activity_id'])
                ->where('state',2)
                ->count();
            if ($apply_count >= $activityObj['apply_limit_number']) {
                $this->error('活动报名人数已满，无法报名');
            }
        }

        //is_verifying  活动是否核销:1=是,2=否
        //is_sign_in  签到:1=已签到,2=未签到,3=无需签到
        $is_sign_in = $activityObj['is_verifying'] == '1' ? '2' : '3';
        if ($applyObj && $applyObj['state'] == 1) {//已提交报名，但未付款
            if ($activityObj['apply_field_state'] == 1 && empty($applyObj['field_data'])) {
                $this->error('请填写报名信息');
            }
            $apply_id = $applyObj->id;
        } else {//第一次报名
            $apply_data = array(
                'activity_id'=> $param['activity_id'],
                'wechat_id' => $wechat_id,
                'member_id'=>$memberObj ? $memberObj->id : 0,
                'is_sign_in'=>$is_sign_in,
            );
            if ($activityObj['apply_field_state'] == 1
                && (!isset($_POST['data']) || empty($_POST['data']))
            ) {
                $this->error('请填写报名信息');
            }
            if (isset($_POST['data']) && !empty($_POST['data'])) {
                $apply_data['field_data'] = $_POST['data'];
            }
            $apply_data = array_merge($apply_data, $fixed_data);

            $apply_data['state'] = $activityObj['fees'] == 0.00 ? 2 : 1;
            $this->model->data($apply_data);
            $applyObj = $this->model->allowField(true)->save();
            $apply_id = $this->model->id;
        }

        if ($applyObj) {
            $orderModel = new Order();
            $activityOrderObj = $orderModel
                ->where(array('wechat_id'=>$wechat_id,'activity_id'=>$param['activity_id']))
                ->where('paid','1')
                ->find();
            $channel = $this->request->header('channel');
            $paid = $activityObj['fees'] == 0.00 ? 2 : 1;
            if ($activityOrderObj) {
                $activityOrderObj->order_no = wdsxh_create_order();
                $activityOrderObj->pay_amount = $activityObj['fees'];
                $activityOrderObj->channel = $channel;
                $activityOrderObj->paid = $paid;
                if ($paid == 2) {
                    $activityOrderObj->pay_time = time();
                    $activityOrderObj->complete_time = date('Y-m-d H:i:s',time());
                }
                $activityOrderObj->save();
            } else {
                $order_data = array(
                    'activity_id'=> $param['activity_id'],
                    'apply_id'=> $apply_id,
                    'wechat_id' => $wechat_id,
                    'member_id'=>$memberObj ? $memberObj->id : 0,
                    'order_no'=> wdsxh_create_order(),
                    'pay_amount'=>$activityObj['fees'],
                    'channel'=>$channel,
                    'paid'=>$paid,
                );
                if ($paid == 2) {
                    $order_data['pay_time'] = time();
                    $order_data['complete_time'] = date('Y-m-d H:i:s',time());
                }
                $orderModel->data($order_data);
                $orderModel->allowField(true)->save();
                $activityOrderObj = $orderModel;
            }
            $applyObj = $this->model->get($apply_id);
            $applyObj->is_sign_in = $is_sign_in;
            $applyObj->save();
            if($paid == 2){//不付钱
                $avtivity_apply_record_data = array(
                    'activity_id'=> $param['activity_id'],
                    'wechat_id' => $wechat_id,
                    'member_id'=>$memberObj ? $memberObj->id : 0,
                );
                $avtivityApplyRecordModel = new ActivityApplyRecord();
                $avtivityApplyRecordModel->data($avtivity_apply_record_data);
                $avtivityApplyRecordModel->allowField(true)->save();
                if ($activityObj['points_status'] == 1) {
                    UserWechatPointsLog::activity(1,$applyObj,$activityObj,'参加活动：'.$activityObj['name'].'获得'.$activityObj['points'].'个积分');
                }
                $this->zero_pay($activityObj , $wechat_id , $channel);
            } else{//微信支付
                $this->wx_pay($activityOrderObj , $wechat_id , $channel);
            }
        } else {
            $this->error('创建订单失败');
        }
    }



    private function zero_pay($activityObj = [] , $wechat_id = '' ,$channel = 1)
    {
        $address = $activityObj['organizing_method'] == '1' ? $activityObj['url'] : $activityObj['address'];
        if ($channel == 1) {
            //活动报名成功通知
            try{
                $conf=$this->configObj;
                $data=[
                    'thing1'=>[
                        'value'=>$activityObj['name'],
                    ],
                    'amount3'=>[
                        'value'=>$activityObj['fees'],
                    ],
                    'thing6'=>[
                        'value'=>$address,
                    ],
                    'date7'=>[
                        'value'=>date('Y年m月d日 H:i',$activityObj['start_time']),
                    ],
                    'phone_number8'=>[
                        'value'=>$activityObj['mobile'],
                    ]
                ];
                $result = Wxapp::subscribeMessage($conf['applet_activity_apply'],trim(wdsxh_get_openid($wechat_id,$channel)),'/pagesActivity/index/details?id='.$activityObj['id'],$data);
            }catch (\think\Exception $e){
                $this->error($e->getMessage());
            }
        } else {//todo公众号逻辑

        }

        $this->success('报名成功');
    }

    private function wx_pay($activityOrderObj = [] , $wechat_id = '' ,$channel = 1)
    {
        if ($channel == 1) {//小程序支付
            try{
                $openid = wdsxh_get_openid($wechat_id,$channel);
                $conf=Wxapp::unify('商会活动报名',$activityOrderObj->order_no,$activityOrderObj->pay_amount,$openid,request()->domain().'/api/wdsxh/activity/activity_apply/notify');
            }catch (Exception $e){
                $this->error($e->getMessage());
            }
            $this->success('报名成功',$conf);
        } else {//todo 公众号支付
            try{
                $openid = wdsxh_get_openid($wechat_id,$channel);
                $conf=Wxapp::unify_wxofficial('商会活动报名',$activityOrderObj->order_no,$activityOrderObj->pay_amount,$openid,request()->domain().'/api/wdsxh/activity/activity_apply/notify');
            }catch (Exception $e){
                $this->error($e->getMessage());
            }
            $this->success('报名成功',$conf);
        }
    }



    /*
     * desc: 活动支付回调处理
     * time: 2023-3-11 18:00
     * */
    public function notify()
    {
        $pay = Wxapp::getPay();
        $response = $pay->handlePaidNotify(function($message, $fail){
            $orderObj = Order::where('order_no',$message['out_trade_no'])->find();
            if (!$orderObj || $orderObj['paid'] == '2') {
                return true;
            }
            if ($message['return_code'] === 'SUCCESS') {
                if ($message['result_code'] === 'SUCCESS') {
                    $avtivity_apply_record_data = array(
                        'activity_id'=> $orderObj['activity_id'],
                        'wechat_id' => $orderObj['wechat_id'],
                        'member_id'=>$orderObj['member_id'],
                    );
                    $avtivityApplyRecordModel = new ActivityApplyRecord();
                    Db::startTrans();
                    try {
                        $orderObj['pay_time'] = time();
                        $orderObj['paid'] = '2';
                        $orderObj->trade_no = $message['transaction_id'];
                        $orderObj->save();
                        //处理活动报名
                        //todo 活动创建后，会员功能对外功能不可用，非会员无法报名  删除where条件
                        $applyObj = $this->model->where(array('wechat_id'=>$orderObj['wechat_id'],'activity_id'=>$orderObj['activity_id']))
                            ->where('state','1')
                            ->find();
                        $applyObj->state = '2';
                        $applyObj->save();
                        $avtivityApplyRecordModel->data($avtivity_apply_record_data);
                        $avtivityApplyRecordModel->allowField(true)->save();
                        Db::commit();
                    } catch (ValidateException|PDOException|Exception $e) {
                        Db::rollback();
                        $this->error($e->getMessage());
                    }
                    $activityObj = (new \app\api\model\wdsxh\activity\Activity())->get($orderObj['activity_id']);
                    $address = $activityObj['organizing_method'] == '1' ? $activityObj['url'] : mb_substr($activityObj['address'],0,20);
                    if ($activityObj['points_status'] == 1) {
                        UserWechatPointsLog::activity(1,$applyObj,$activityObj,'参加活动：'.$activityObj['name'].'获得'.$activityObj['points'].'个积分');
                    }

                    //活动报名成功通知
                    try{
                        $conf=$this->configObj;
                        $data=[
                            'thing1'=>[
                                'value'=>mb_substr($activityObj['name'],0,20),
                            ],
                            'amount3'=>[
                                'value'=>$orderObj['pay_amount'],
                            ],
                            'thing6'=>[
                                'value'=>$address,
                            ],
                            'date7'=>[
                                'value'=>date('Y年m月d日 H:i',$activityObj['start_time']),
                            ],
                            'phone_number8'=>[
                                'value'=>$activityObj['mobile'],
                            ]
                        ];
                        $result = Wxapp::subscribeMessage($conf['applet_activity_apply'],trim(wdsxh_get_openid($orderObj['wechat_id'],1)),'/pagesActivity/index/details?id='.$orderObj['activity_id'],$data);
                    }catch (\think\Exception $e){
                        $this->error($e->getMessage());
                    }
                }
            } else {
                return $fail('FAIL');
            }

            return true;
        });

        $response->send();
    }

    /*
    * desc: 删除未支付订单
    * time: 2023-4-10 11:58
    * */
    public function del()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->post('id');
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $where = array(
            'id'=>$id,
            'wechat_id'=>$wechat_id,
        );
        $activityApplyObj = $this->model->where($where)->find();
        if (!$activityApplyObj) {
            $this->error('未支付已取消');
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        if ($wechat_id != $activityApplyObj['wechat_id']) {
            $this->error('不是本人，无法取消');
        }

        $activityOrderObj = (new Order())->where('activity_id',$activityApplyObj['activity_id'])
            ->where('apply_id',$id)
            ->where('wechat_id',$wechat_id)
            ->where('paid','1')
            ->find();
        if (!$activityOrderObj) {
            $this->error('未支付已取消');
        }
        $result = false;
        Db::startTrans();
        try {
            $result = $activityApplyObj->delete();
            $activityOrderObj->delete();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($activityApplyObj->getError());
        }
        $this->success('删除成功');
    }

    /*
    * desc: 报名活动详情
    * time: 2023-6-29 9:03
    * */
    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        try {
            $id = $this->request->get('id');
            $apply_id = $this->request->get('apply_id');
            $data = (new \app\api\model\wdsxh\activity\Activity())
                ->where('id',$id)
                ->field('id,images,start_time,end_time,name,fees,state activity_state,
            contacts,mobile,
            organizing_method,url,address,longitude,latitude,content,
            refund,
            apply_time,
            activity_auth,is_verifying,verification_method,points_status,points')
                ->find();
            if (!$data) {
                $this->error('活动不存在');
            }
            if ($data['points_status'] == 2) {
                unset($data['points']);
            }
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $activityObj = (new Order())->where('apply_id',$apply_id)->find();
            if (!$activityObj) {
                $this->error('活动订单不存在');
            }

            $activityApplyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
                ->where('wechat_id',$wechat_id)
                ->where('id',$activityObj['apply_id'])
                ->where('activity_id',$id)
                ->find();
            if (!$activityApplyObj) {
                $this->error('报名信息不存在');
            }
            $data['pay_state'] = $activityApplyObj['state'];
            $data['apply_id'] = $apply_id;
            $activityRefundObj = (new Refund())
                ->where('apply_id',$activityObj['apply_id'])
                ->where('activity_id',$id)
                ->where('wechat_id',$wechat_id)
                ->where('state','3')
                ->order('id desc')
                ->find();

            $data['reject'] = $activityRefundObj ? $activityRefundObj['reject'] : '';

            $activityApplyModel = new \app\api\model\wdsxh\activity\ActivityApply();
            $data['apply_count'] = $activityApplyModel->where('activity_id', $id)->where('state',2)->count();
            $apply_list = $activityApplyModel->where('activity_id', $id)
                ->where('state',2)
                ->alias('apply')
                ->order('apply.createtime desc')
                ->join('wdsxh_user_wechat member', 'member.id = apply.wechat_id')
                ->field('member.avatar member_avatar')
                ->limit(10)
                ->select();
            if (!empty($apply_list)) {
                foreach ($apply_list as &$v) {
                    $v->member_avatar = wdsxh_full_url($v->member_avatar);
                }
            }
            $data['apply_list'] = $apply_list;


            $applyObj = (new \app\api\model\wdsxh\activity\ActivityApply())
                ->where('id',$apply_id)
                ->where('activity_id',$id)
                ->where('wechat_id',$wechat_id)
                ->find();
            $data['apply_status'] = $applyObj['state'] == 2 ? 1 : 2;

            $data['is_sign_in'] = $applyObj['is_sign_in'];

            $this->success('请求成功',$data);
        } catch (ValidateException|PDOException|Exception $e)  {
            $this->error($e->getMessage());
        }

    }

    private function handle_custom_data($data)
    {
        $custom_field = array('name','mobile');

        $result = array();
        foreach ($data as $v) {
            if (in_array($v['field'], $custom_field)) {
                $result[$v['field']] = $v['value'];
            }
        }

        return $result;
    }
}



 