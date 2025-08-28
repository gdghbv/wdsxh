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

namespace app\admin\model\wdsxh\activity;

use think\Model;


class ActivityApply extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_activity_apply';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'state_text',
        'is_sign_in_text'
    ];
    

    
    public function getStateList()
    {
        return ['1' => __('State 1'), '2' => __('State 2'), '4' => __('State 4')];
    }

    public function getIsSignInList()
    {
        return ['1' => __('Is_sign_in 1'), '2' => __('Is_sign_in 2'), '3' => __('Is_sign_in 3')];
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsSignInTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_sign_in']) ? $data['is_sign_in'] : '');
        $list = $this->getIsSignInList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function activity()
    {
        return $this->belongsTo('app\admin\model\wdsxh\activity\Activity', 'activity_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function member()
    {
        return $this->belongsTo('app\admin\model\wdsxh\member\Member', 'member_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    //todo 活动创建后，会员功能对外功能不可用，非会员无法报名
    public function wechat()
    {
        return $this->belongsTo('app\admin\model\wdsxh\user\Wechat', 'wechat_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
