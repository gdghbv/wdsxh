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
namespace app\api\controller\wdsxh\mall;

use addons\wdsxh\library\Wxapp;
use app\common\controller\Api;

class ConfirmReceiptMessage extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\mall\ConfirmReceiptMessage();
    }

    /**
     * Desc 发送确认收货消息提醒    5天未确认收货发送消息提醒
     * Create on 2025/8/15 下午1:40
     * Create by wangyafang
     */
    public function send_confirm_receipt_message()
    {
        $orderModel = new \app\api\model\wdsxh\goods\Order();

        $order_id_array = $orderModel->alias('order')
            ->join('wdsxh_mall_order_logistics logistics', 'logistics.order_id = order.id')
            ->where('order.state', '3')
            ->where('order.paid', '2')
            ->where('order.delivery_method', 1)
            ->where('logistics.send_time', '<', time() - 86400 * 5)
            ->where('order.id','not in', $this->model
                ->column('order_id'))
            ->column('order.id');

        if (!empty($order_id_array)) {
            $conf = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();

            foreach (array_slice($order_id_array, 0, 10) as $v) {

                $this->message($v,$conf['applet_confirm_receipt_notification'],$orderModel);
            }
        }
        echo 'success:'.date('Y-m-d H:i:s',time());
    }

    private function message($order_id,$applet_confirm_receipt_notification,$orderModel) {
        $orderObj = $orderModel
            ->where('id', $order_id)
            ->find();

        //确认收货通知
        $data = [
            'character_string2' => [
                'value' => $orderObj['order_no'],//订单号
            ],
            'amount3' => [
                'value' => $orderObj['pay_price'].'元',//付款金额
            ],
            'thing5' => [
                'value' => '您好，需要去小程序确认收货',//备注
            ]
        ];
        $openid = trim(wdsxh_get_openid($orderObj['wechat_id'],'1'));
        $result = Wxapp::subscribeMessage($applet_confirm_receipt_notification,$openid, '/pagesMall/order/details?order_id='.$order_id, $data);

        $send_time = date('Y-m-d',time());
        $message_data = array(
            'wechat_id'=>$orderObj['wechat_id'],
            'send_time'=>$send_time,
            'errcode'=>$result[0]['errcode'],
            'errmsg'=>$result[0]['errcode'] == 0 ? '' : $result[0]['errmsg'],
            'order_id'=>$order_id,
        );
        $this->model->save($message_data);

    }
}