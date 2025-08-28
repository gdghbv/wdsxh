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


class MemberApply extends Model
{





    // 表名
    protected $name = 'wdsxh_member_apply';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type_text',
        'state_text'
    ];



    public function getTypeList()
    {
        return ['1' => __('Type 1'), '2' => __('Type 2'), '3' => __('Type 3')];
    }

    public function getStateList()
    {
        return ['1' => __('State 1'), '2' => __('State 2'), '3' => __('State 3'), '4' => __('State 4')];
    }

    public function getStateExamineList()
    {
        return ['1' => __('State 1'), '2' => __('State 2'), '3' => __('State 3')];
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function level()
    {
        return $this->belongsTo('app\admin\model\wdsxh\member\Level', 'member_level_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function getPayVoucherAttr($value)
    {
        return wdsxh_full_url($value);
    }
}
