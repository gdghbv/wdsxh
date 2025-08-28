<?php

namespace app\admin\model\wdsxh\institution;

use think\Model;


class Member extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_institution_member';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];

    protected static function init()
    {
        self::beforeInsert(function ($row) {
            if (empty($row['institution_id']) && isset($row['level_id']) && !empty($row['level_id'])) {
                $row->institution_id = (new \app\api\model\wdsxh\institution\Level())->where('id',$row['level_id'])->value('institution_id');
            }
            $row->wechat_id = (new \app\admin\model\wdsxh\Member)->where('id',$row->member_id)->value('wechat_id');
        });

        self::beforeUpdate(function ($row) {
            $row->wechat_id = (new \app\admin\model\wdsxh\Member)->where('id',$row->member_id)->value('wechat_id');
        });
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
