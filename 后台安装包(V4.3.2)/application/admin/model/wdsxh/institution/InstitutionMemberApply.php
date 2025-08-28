<?php

namespace app\admin\model\wdsxh\institution;

use think\Model;


class InstitutionMemberApply extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_institution_member_apply';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'state_text',
        'handle_time_text'
    ];
    

    
    public function getStateList()
    {
        return ['1' => __('State 1'), '2' => __('State 2'), '3' => __('State 3')];
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getHandleTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['handle_time']) ? $data['handle_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }

    protected function setHandleTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }


    public function institution()
    {
        return $this->belongsTo('app\admin\model\wdsxh\institution\Institution', 'institution_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function level()
    {
        return $this->belongsTo('Level', 'level_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function usermember()
    {
        return $this->belongsTo('app\admin\model\wdsxh\Member', 'member_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
