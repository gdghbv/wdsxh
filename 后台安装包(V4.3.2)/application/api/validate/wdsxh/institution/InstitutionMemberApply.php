<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力中小企业发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdadmin.cn    All rights reserved.
// +----------------------------------------------------------------------
// | Wdadmin系统产品软件并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.wdadmin.cn
// +----------------------------------------------------------------------
namespace app\api\validate\wdsxh\institution;


use think\Validate;

class InstitutionMemberApply extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'institution_id'=>'require',
        'level_id'=>'require',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'institution_id.require'=>'请选择机构id',
        'level_id.require'=>'请选择级别',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'submit'  => ['institution_id','level_id'],
    ];



}