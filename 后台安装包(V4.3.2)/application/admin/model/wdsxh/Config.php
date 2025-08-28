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

namespace app\admin\model\wdsxh;

use think\Model;


class Config extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_config';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'organize_text',
        'applet_member_expiretime_text',
        'wananchi_member_expiretime_text'
    ];
    

    
    public function getOrganizeList()
    {
        return ['1' => __('Organize 1'), '2' => __('Organize 2')];
    }


    public function getOrganizeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['organize']) ? $data['organize'] : '');
        $list = $this->getOrganizeList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public function getJumpTypeList()
    {
        return ['1' => __('Jump_type 1'), '2' => __('Jump_type 2'), '3' => __('Jump_type 3')];
    }

    public function getSecurityTextSwitchList(){//todo 腾讯校验增加开关
        return ['1' => '打开', '2' => '关闭'];
    }

    public function getDeliveryManagementList(){
        return ['1' => __('开启'), '2' => __('关闭')];
    }

}
