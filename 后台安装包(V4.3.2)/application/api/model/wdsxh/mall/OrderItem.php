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
/**
 * Class OrderItem
 * Desc  订单明细表
 * Create on 2025/4/14 17:55
 * Create by wangyafang
 */

namespace app\api\model\wdsxh\mall;


use think\Model;

class OrderItem extends Model
{
// 表名
    protected $name = 'wdsxh_mall_order_item';


    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    protected function getGoodsImageAttr($value)
    {
        return wdsxh_full_url($value);
    }

    protected function setGoodsImageAttr($value)
    {
        $value = remove_wdsxh_full_url($value);
        return $value;
    }
}



 