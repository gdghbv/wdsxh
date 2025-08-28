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

use think\Validate;

class Member extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'mobile'=>'require|checkMobile',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'mobile.require' => '手机号不能为空',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => ['mobile'],
        'edit' => ['mobile'],
    ];

    protected function checkMobile($value,$rule,$data)
    {
        $memberModel = new \app\api\model\wdsxh\member\Member();
        if (isset($data['id']) && !empty($data['id'])) {//编辑
            $memberId = $memberModel->where('id','<>',$data['id'])
                ->where('mobile',$value)
                ->value('id');
            if ($memberId) {
                return '手机号已被使用';
            }
        } else {
            $memberId = $memberModel
                ->where('mobile',$value)
                ->value('id');
            if ($memberId) {
                return '手机号已被使用';
            }
        }
        return true;
    }
    
}
