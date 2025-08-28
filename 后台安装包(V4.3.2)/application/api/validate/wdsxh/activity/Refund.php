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
/**
 * Class Refund
 * Desc  活动退款校验
 * Create on 2024/3/12 17:30
 * Create by wangyafang
 */

namespace app\api\validate\wdsxh\activity;


use think\Validate;

class Refund extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'activity_id'=>'require',
        'apply_id'=>'require',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'activity_id.require'=>'活动id不能为空',
        'apply_id.require'=>'活动报名id不能为空',
    ];

    /**
     * 验证场景
     */
    protected $scene = [
        'apply_refund'  => ['activity_id','apply_id'],
    ];


}



 