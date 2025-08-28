<?php

namespace app\admin\model\wdsxh\corporate;

use think\Model;


class Card extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_corporate_card';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'is_default_text',
        'is_hide_avatar_text',
        'is_wechat_number_public_text'
    ];
    

    
    public function getIsDefaultList()
    {
        return ['1' => __('Is_default 1'), '2' => __('Is_default 2')];
    }

    public function getIsHideAvatarList()
    {
        return ['1' => __('Is_hide_avatar 1'), '2' => __('Is_hide_avatar 2')];
    }

    public function getIsWechatNumberPublicList()
    {
        return ['1' => __('Is_wechat_number_public 1'), '2' => __('Is_wechat_number_public 2')];
    }


    public function getIsDefaultTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_default']) ? $data['is_default'] : '');
        $list = $this->getIsDefaultList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsHideAvatarTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_hide_avatar']) ? $data['is_hide_avatar'] : '');
        $list = $this->getIsHideAvatarList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsWechatNumberPublicTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_wechat_number_public']) ? $data['is_wechat_number_public'] : '');
        $list = $this->getIsWechatNumberPublicList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
