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

namespace app\admin\model\wdsxh\user;

use think\Model;


class Wechat extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_user_wechat';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'set_admin_text',
        'channel_text'
    ];
    

    
    public function getSetAdminList()
    {
        return ['1' => __('Set_admin 1'), '2' => __('Set_admin 2')];
    }

    public function getChannelList()
    {
        return ['1' => __('Channel 1'), '2' => __('Channel 2')];
    }


    public function getSetAdminTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['set_admin']) ? $data['set_admin'] : '');
        $list = $this->getSetAdminList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getChannelTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['channel']) ? $data['channel'] : '');
        $list = $this->getChannelList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected $type = [
        'createtime'  =>  'timestamp:Y-m-d',
    ];




}
