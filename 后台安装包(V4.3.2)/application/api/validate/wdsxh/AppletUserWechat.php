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
namespace app\api\validate\wdsxh;

use think\Validate;

class AppletUserWechat extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'mobile'=>'require|checkMobile',
        'nickname'=>'require',
        'avatar'=>'require',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'mobile.require'=>'请输入手机号',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'register'  => ['mobile'],
    ];

    protected function checkMobile($value,$rule,$data)
    {
        if (!$value || !\think\Validate::regex($value, "^1\d{10}$")) {
            return '手机号格式不正确';
        }
        return true;
    }
}
