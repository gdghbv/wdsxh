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

namespace app\admin\controller\wdsxh\activity;

use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\activity\Order;
use app\common\model\wdsxh\points\UserWechatPointsLog;
use app\admin\model\wdsxh\user\Wechat;
use app\common\controller\Backend;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

/**
 * 活动退款
 *
 * @icon fa fa-circle-o
 */
class Refund extends Backend
{

    /**
     * Refund模型对象
     * @var \app\admin\model\wdsxh\activity\Refund
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\activity\Refund;
        $this->view->assign("stateList", $this->model->getStateList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model
                    ->with(['wechat','activity','order'])//todo 活动创建后，会员功能对外功能不可用，非会员无法报名
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            foreach ($list as $row) {
                
                
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /*
     * 同意退款
     */
    public function agree($ids=null){
        $refundObj = $this->model->get($ids);
        if(!$refundObj){
            $this->error('退款信息不存在');
        }
        $wechatObj = (new Wechat())->get($refundObj->wechat_id);
        if(!$wechatObj){
            $this->error('用户信息不存在');
        }

        $orderWhere = array(
            'activity_id'=>$refundObj->activity_id,
            'apply_id'=>$refundObj->apply_id,
            'wechat_id'=>$refundObj->wechat_id,
            'id'=>$refundObj->order_id,
            'paid'=>'2'
        );
        $applyWhere = array(
            'activity_id'=>$refundObj->activity_id,
            'wechat_id'=>$refundObj->wechat_id,
            'state' =>'3',
            'id'=>$refundObj->apply_id,
        );

        $applyObj = \app\admin\model\wdsxh\activity\ActivityApply::where($applyWhere)->find();
        if (!$applyObj) {
            $this->error('报名没有查询到退款记录');
        }
        $orderObj = (new Order())->where($orderWhere)->find();
        if(!$orderObj){
            $this->error('支付订单信息不存在');
        }

        $refund_no = wdsxh_create_order();

        $res=Wxapp::payRefund($orderObj->order_no,$refund_no,$orderObj->pay_amount,array('refund_desc'=>'活动报名退款'));
        if($res && $res['return_code'] == 'SUCCESS' && $res['result_code'] == 'SUCCESS'){
            $result = false;
            Db::startTrans();
            try {
                $refundObj->state = '2';
                $refundObj->dispose_time = time();
                $result = $refundObj->save();
                $orderObj->refund_no = $refund_no;
                $orderObj->refund_time = time();
                $orderObj->paid = '3';
                $orderObj->save();
                $applyObj->state = '4';
                $applyObj->save();
                Db::commit();
            } catch (ValidateException|PDOException|Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            if ($result === false) {
                $this->error(__('No rows were inserted'));
            }
            $activityObj = (new \app\admin\model\wdsxh\activity\Activity())->get($refundObj->activity_id);
            $wechat_id = $refundObj->wechat_id;
            $activityApplyObj = $applyObj;
            if ($activityObj['points_status'] == 1) {
                $userWechatPointsLogObj = (new UserWechatPointsLog())->where('activity_id',$activityObj['id'])
                    ->where('wechat_id',$wechat_id)
                    ->where('change',1)
                    ->find();
                if ($userWechatPointsLogObj) {
                    UserWechatPointsLog::activity(2,$activityApplyObj,$activityObj,'活动：'.$activityObj['name'].'，申请退款成功，退回'.$activityObj['points'].'个积分');
                }
            }
            $this->success('退款操作成功');
        }else{
            $this->error('退款失败,错误信息：'.$res['err_code_des']);
        }
    }

    /*
     * 拒绝退款
     */
    public function refuse($ids=""){
        if (false === $this->request->isPost()) {
            return $this->view->fetch();
        }

        $refundObj = $this->model->get($ids);
        if(!$refundObj){
            $this->error('退款信息不存在');
        }

        $applyWhere = array(
            'activity_id'=>$refundObj->activity_id,
            'wechat_id'=>$refundObj->wechat_id,
            'state' =>'3',
            'id'=>$refundObj->apply_id,
        );
        $applyObj = \app\admin\model\wdsxh\activity\ActivityApply::where($applyWhere)->find();
        if (!$applyObj) {
            $this->error('报名没有查询到退款记录');
        }
        $params = $this->request->post('row/a');

        $result = false;
        Db::startTrans();
        try {
            $refundObj->state = '3';
            $refundObj->dispose_time = time();
            $refundObj->reject = $params['reject'];
            $result = $refundObj->save();
            $applyObj->state = '5';
            $applyObj->save();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($result === false) {
            $this->error(__('No rows were inserted'));
        }
        $this->success('操作成功');
    }

    public function multi($ids = null)
    {
        return;
    }

    public function del($ids = null)
    {
        return;
    }

    public function edit($ids = null)
    {
        return;
    }

    public function add()
    {
        return;
    }

}
