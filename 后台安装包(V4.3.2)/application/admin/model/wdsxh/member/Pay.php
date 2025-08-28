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

namespace app\admin\model\wdsxh\member;

use think\Model;


class Pay extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_member_pay';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'paid_text',
        'pay_time_text'
    ];
    

    
    public function getPaidList()
    {
        return ['1' => __('Paid 1'), '2' => __('Paid 2')];
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

    protected function setPayTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


    public function level()
    {
        return $this->belongsTo('Level', 'level_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function wechat()
    {
        return $this->belongsTo('app\admin\model\wdsxh\user\UserWechat', 'wechat_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function member()
    {
        return $this->belongsTo('app\admin\model\wdsxh\member\Member', 'member_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
