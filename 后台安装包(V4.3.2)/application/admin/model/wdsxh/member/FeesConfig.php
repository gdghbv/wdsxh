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


class FeesConfig extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_member_fees_config';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'expire_time_type_text',
        'pay_method_text'
    ];
    

    
    public function getExpireTimeTypeList()
    {
        return ['1' => __('Expire_time_type 1'), '2' => __('Expire_time_type 2')];
    }

    public function getPayMethodList()
    {
        return ['1' => __('Pay_method 1'), '2' => __('Pay_method 2'), '3' => __('Pay_method 3'), '4' => __('Pay_method 4')];
    }


    public function getExpireTimeTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['expire_time_type']) ? $data['expire_time_type'] : '');
        $list = $this->getExpireTimeTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getPayMethodTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['pay_method']) ? $data['pay_method'] : '');
        $list = $this->getPayMethodList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
