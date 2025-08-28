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
namespace app\admin\model\wdsxh\mall;

use think\Model;
use traits\model\SoftDelete;

class Order extends Model
{

    use SoftDelete;



    // 表名
    protected $name = 'wdsxh_mall_order';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'state_text',
        'refund_status_text',
        'paid_text',
        'pay_time_text',
        'refund_reason_time_text',
        'complete_time_text',
        'cancel_time_text'
    ];


    public function getBuyNowList()
    {
        return ['1' => __('Buy_now 1'), '2' => __('Buy_now 2')];
    }

    public function getStateList()
    {
        return ['1' => __('待付款'), '2' => __('待发货'), '3' => __('待收货'),'4' => __('已完成')];
    }

    public function getRefundStatusList()
    {
        return ['1' => __('未退款'), '2' => __('申请中'), '3' => __('待退货'), '4' => __('退款中'), '5' => __('已退款')];
    }

    public function getPaidList()
    {
        return ['1' => __('未付款'), '2' => __('已付款')];
    }

    public function getBuyNowTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['buy_now']) ? $data['buy_now'] : '');
        $list = $this->getBuyNowList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getRefundStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['refund_status']) ? $data['refund_status'] : '');
        $list = $this->getRefundStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPaidTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['paid']) ? $data['paid'] : '');
        $list = $this->getPaidList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPayTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['pay_time']) ? $data['pay_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getRefundReasonTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['refund_reason_time']) ? $data['refund_reason_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getCompleteTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['complete_time']) ? $data['complete_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getCancelTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['cancel_time']) ? $data['cancel_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setPayTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setRefundReasonTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setCompleteTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setCancelTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    public function getDeliveryMethodList()
    {
        return ['1' => __('Delivery_method 1'), '2' => __('Delivery_method 2')];
    }

    public function getDeliveryMethodTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['buy_now']) ? $data['buy_now'] : '');
        $list = $this->getDeliveryMethodList();
        return isset($list[$value]) ? $list[$value] : '';
    }


}
