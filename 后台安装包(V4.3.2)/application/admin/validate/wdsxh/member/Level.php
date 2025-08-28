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

namespace app\admin\validate\wdsxh\member;

use app\admin\model\wdsxh\member\FeesConfig;
use think\Validate;

class Level extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'fees'=>'require|checkFees',
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
        'add'  => ['fees'],
        'edit' => ['fees'],
    ];

    protected function checkFees($value,$rule,$data)
    {
        //todo 免费入会和会员级别0元冲突问题：
        $pay_method = (new FeesConfig())->where('id',1)->value('pay_method');
        if (($pay_method != '1') && $value <= 0) {
            return '请前往入会设置→免费入会';
        }
        return true;
    }
    
}
