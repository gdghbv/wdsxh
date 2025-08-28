<?php

namespace app\admin\model\wdsxh\institution;

use think\Model;


class Level extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_institution_level';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];
    

    







    public function institution()
    {
        return $this->belongsTo('app\admin\model\wdsxh\institution\Institution', 'institution_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
