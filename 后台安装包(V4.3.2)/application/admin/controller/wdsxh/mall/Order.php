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
namespace app\admin\controller\wdsxh\mall;
use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\mall\Express;
use app\admin\model\wdsxh\mall\Logistics;
use app\api\model\wdsxh\mall\OrderItem;
use Exception;
use app\common\controller\Backend;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 【订单表】
 *
 * @icon fa fa-circle-o
 */
class Order extends Backend
{

    /**
     * Order模型对象
     * @var \app\admin\model\wdsxh\mall\Order
     */
    protected $model = null;
    protected $logisticsModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\mall\Order;
        $this->logisticsModel = new Logistics;
        $expressObj = (new Express())->select();
        $this->view->assign('expressObj',$expressObj);
        $this->view->assign("buyNowList", $this->model->getBuyNowList());
        $this->view->assign("statusList", $this->model->getStateList());
        $this->view->assign("refundStatusList", $this->model->getRefundStatusList());
        $this->view->assign("paidList", $this->model->getPaidList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    public function delivery($ids = null){
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        $delivery_management = (new \app\admin\model\wdsxh\Config())->where('id',1)->value('delivery_management');
        if ($delivery_management == 1){
            $delivery_name = (new Express())->where('id',$params['delivery_id'])->value('brief_introduction');
            $goods_name = (new \app\admin\model\wdsxh\mall\Goods())->where('id',$row['goods_id'])->value('name');
            $delivery = Wxapp::upload_shipping_info(2,$row['trade_no'],1,1,$params['delivery_no'],$delivery_name,$goods_name,wdsxh_hide_phone_number($row['user_phone']),wdsxh_get_openid($row['wechat_id'],1));
            if ($delivery['code'] != 0){
                $this->error($delivery['errmsg']);
            }
        }
        $result = false;
        $send_time = time();
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $params = [
                'order_id' => $row['id'],
                'delivery_id' => $params['delivery_id'],
                'delivery_no' => $params['delivery_no'],
                'send_time' => $send_time
            ];
            (new Logistics())->insert($params);
            $order_data['state'] = 3;
            $result = $row->allowField(true)->save($order_data);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }

        $openid = wdsxh_get_openid($row['wechat_id'],1);
        $applet_order_shipping_notification = (new \app\admin\model\wdsxh\Config())->where('id',1)->value('applet_order_shipping_notification');
        // 发送物流通知
        if ($row['delivery_method'] == 1 && !empty($openid) && !empty($applet_order_shipping_notification)){
            $goodsObj = (new \app\admin\model\wdsxh\mall\Goods())->where('id',$row['goods_id'])->find();
            try{
                $data=[
                    'thing1'=>[
                        'value'=>$goodsObj['name'],
                    ],
                    'character_string2'=>[
                        'value'=>$row['order_no'],
                    ],
                    'date3'=>[
                        'value'=>date('Y-m-d H:i:s',$send_time),
                    ],
                    'character_string5'=>[
                        'value'=>$params['delivery_no'],
                    ],
                    'amount7'=>[
                        'value'=>$row['total_price'].'元',
                    ]
                ];
                $result = Wxapp::subscribeMessage($applet_order_shipping_notification,trim($openid),'/pagesMall/order/details?order_id='.$ids,$data);
            }catch (\think\Exception $e){
                error_log('Applet_order_shipping_notification send fail: ' . $e->getMessage());
            }
        }
        $this->success();
    }


    public function goods_details($ids = null){
        $orderObj = $this->model->get($ids);
        $usermodel = (new \app\admin\model\wdsxh\user\Wechat())->where('id',$orderObj['wechat_id'])->find();
        $logisticsModel = (new Logistics())->where('order_id',$orderObj['id'])->find();
        if ($orderObj['buy_now'] == '1') {
            $goodsObj = (new \app\admin\model\wdsxh\mall\Goods())->withTrashed()->where('id',$orderObj['goods_id'])->select();
            foreach ($goodsObj as &$v) {
                $v->goods_num = $orderObj['number'];
            }
        } else {
            $order_item_goods_id_array = (new OrderItem())->where('order_id',$ids)->column('goods_id');
            $goodsObj = (new \app\admin\model\wdsxh\mall\Goods())->withTrashed()->where('id','in',$order_item_goods_id_array)->select();
            foreach ($goodsObj as &$v) {
                $v->goods_num = (new OrderItem())->where('order_id',$ids)->where('goods_id',$v['id'])->value('goods_num');
            }
        }
        $refundMode = (new \app\admin\model\wdsxh\mall\Refund())->where('order_id',$orderObj['id'])->find();
        $this->view->assign("refundMode", $refundMode);
        $this->view->assign("goodsObj", $goodsObj);
        $this->view->assign("usermodel", $usermodel);
        $this->view->assign("orderObj", $orderObj);
        $this->view->assign("logisticsModel", $logisticsModel);
        return $this->view->fetch();
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

    public function recyclebin($ids = null)
    {
        return;
    }

    public function restore($ids = null)
    {
        return;
    }

    public function destroy($ids = null)
    {
        return;
    }

    /**
     * Desc 确认自提
     * Create on 2025/4/15 17:00
     * Create by wangyafang
     */
    public function confirm_self_pickup($ids=null){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error('订单不存在');
        }
        if ($row['state'] == 3) {
            $this->error('订单已自提，无需操作');
        }
        if ($row['state'] != 2) {
            $this->error('没有查到订单付款信息');
        }
        $delivery_management = (new \app\admin\model\wdsxh\Config())->where('id',1)->value('delivery_management');
        if ($delivery_management == 1){
            $delivery = Wxapp::upload_shipping_info(2,$row['trade_no'],1,4,'','','用户自提',wdsxh_hide_phone_number($row['user_phone']),wdsxh_get_openid($row['wechat_id'],1));
            if ($delivery['code'] != 0){
                $this->error($delivery['errmsg']);
            }
        }
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $order_data['state'] = 3;
            $result = $row->allowField(true)->save($order_data);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $this->success('操作成功');
    }

    /**
     * Desc 确认收货
     * Create on 2025/8/14 下午4:59
     * Create by wangyafang
     */
    public function confirm_receipt($ids=null){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error('订单不存在');
        }
        if ($row['state'] == 4) {
            $this->error('已确认收获');
        }
        if ($row['state'] != 3) {
            $this->error('不是待收获状态，无法操作');
        }
        $delivery_management = (new \app\admin\model\wdsxh\Config())->where('id',1)->value('delivery_management');
        if ($delivery_management == 1){
            $get_order_result = Wxapp::get_order($row['trade_no']);
            if ($get_order_result['code'] != 0){
                $this->error($get_order_result['errmsg']);
            }
            if (!empty($get_order_result['order'])) {
                if (!in_array($get_order_result['order']['order_state'],[3,4,6])) {
                    $this->error('订单状态不是：确认收货，交易完成，资金待结算；无法操作');
                }

            }
        }
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $order_data['state'] = 4;
            $result = $row->allowField(true)->save($order_data);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $this->success('操作成功');
    }


}
