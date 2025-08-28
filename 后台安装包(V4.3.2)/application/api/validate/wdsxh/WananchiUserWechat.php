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

use app\common\library\Sms;
use think\Validate;

class WananchiUserWechat extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'mobile'=>'require|checkMobile',
        'captcha'=>'require|checkCaptcha'
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'mobile.require'=>'请输入手机号',
        'captcha.require'=>'请输入手机号验证码',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'mobile_login'  => ['mobile','captcha'],
    ];

    protected function checkMobile($value,$rule,$data)
    {
        if (!$value || !\think\Validate::regex($value, "^1\d{10}$")) {
            return '手机号格式不正确';
        }
        return true;
    }

    protected function checkCaptcha($value,$rule,$data)
    {
        if (!Sms::check($data['mobile'], $value, 'mobilelogin')) {
            return '验证码不正确';
        }
        return true;
    }


    
}
