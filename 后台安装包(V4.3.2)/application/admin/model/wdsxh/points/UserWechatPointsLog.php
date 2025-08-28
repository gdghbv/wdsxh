<?php

namespace app\admin\model\wdsxh\points;

use think\Model;


class UserWechatPointsLog extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_user_wechat_points_log';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'change_text'
    ];
    

    
    public function getChangeList()
    {
        return ['1' => __('Change 1'), '2' => __('Change 2')];
    }


    public function getChangeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['change']) ? $data['change'] : '');
        $list = $this->getChangeList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
