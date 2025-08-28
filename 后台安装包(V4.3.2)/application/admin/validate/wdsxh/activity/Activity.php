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

namespace app\admin\validate\wdsxh\activity;

use think\Validate;

class Activity extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'fees'=>'require|checkFees',
        'organizing_method'=>'require|checkAddress',
        'apply_time'=>'require|checkApplyTime',
        'end_time'=>'require|checkEndTime',
        'is_verifying'=>'require|checkVerifyingWechatIds',
        'points_status'=>'require|checkPointsStatus',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'organizing_method.require' => '请选择举办方式',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => ['organizing_method','apply_time','end_time','is_verifying','points_status'],
        'edit' => ['organizing_method','is_verifying','points_status'],
    ];

    protected function checkAddress($value,$rule,$data)
    {
        if ($value == 1 && empty($data['url'])) {
            return '请输入线上网址';
        }
        if ($value == 1 && $data['is_verifying'] == '1') {
            return '线上活动是否核销必须选择否';
        }
        if ($value == 2 && empty($data['address'])) {
            return '请选择线下地址位置';
        }
        return true;
    }

    protected function checkApplyTime($value,$rule,$data)
    {
        if ($value > $data['start_time']) {
            return '报名时间不能大于开始时间';
        }
        return true;
    }

    protected function checkEndTime($value,$rule,$data)
    {
        if ($value < $data['apply_time']) {
            return '报名时间不能大于结束时间';
        }

        if ($value <= $data['start_time']) {
            return '开始时间不能大于结束时间';
        }
        return true;
    }

    protected function checkVerifyingWechatIds($value,$rule,$data)
    {
        if ($value == '1' && $data['verification_method'] == 2  && empty($data['verifying_wechat_ids'])) {
            return '请选择核销管理员';
        }

        return  true;
    }

    protected function checkFees($value,$rule,$data)
    {
        if (in_array($value,[0,0.00]) && $data['refund'] == '1') {
            return '报名费用0元，不能选择退款';
        }

        return  true;
    }

    protected function checkPointsStatus($value,$rule,$data)
    {
        if ($value == '1' && empty($data['points'])) {
            return '请输入积分数量';
        }

        return  true;
    }
    
}
