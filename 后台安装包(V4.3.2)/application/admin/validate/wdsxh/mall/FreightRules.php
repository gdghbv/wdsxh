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
namespace app\admin\validate\wdsxh\mall;

use think\Validate;

class FreightRules extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'min|最小数' =>'require',
        'max|最大数' =>'require|checkMax',
    ];
    /**
     * 提示消息
     */
    protected $message = [
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => ['min','max'],
        'edit' => ['min','max'],
    ];
    protected function checkMax($value,$rule,$data)
    {
        if($data['min'] > $value) {
            return '最小数不能大于最大数';
        }
        return true;
    }
    
}
