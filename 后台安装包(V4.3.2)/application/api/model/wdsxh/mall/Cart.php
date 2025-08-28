<?php
/**
 * Class Cart
 * Desc  购物车模型
 * Create on 2022/10/11 11:53
 * Create by wangyafang
 */

namespace app\api\model\wdsxh\mall;
use think\Model;

class Cart extends Model
{

    // 表名
    protected $name = 'wdsxh_mall_cart';


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



 