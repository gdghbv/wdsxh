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
namespace app\api\validate\wdsxh\activity;

use app\api\model\wdsxh\activity\Activity;
use think\Validate;

/**
 * Class ActivityApply
 * Desc  活动申请校验
 * Create on 2024/3/12 10:07
 * Create by wangyafang
 */
class ActivityApply extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'activity_id'=>'require|checkActivityExist|checkData',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'activity_id.require'=>'活动id不能为空',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'apply'  => ['activity_id'],
    ];

    protected function checkActivityExist($value,$rule,$data)
    {
        $avtivityObj = (new Activity())->get($value);
        if (!$avtivityObj) {
            return '活动不存在';
        }
        return true;
    }

    protected function checkData($value, $rule, $data)
    {
        if (isset($data['data']) && !empty($data['data'])) {
            $array = $data['data'];
            foreach ($array as $row) {
                if ($row['required'] == 1 && ($row['value'] === '' || $row['value'] === null)) {
                    if ($row['type'] == 'select' || $row['type'] == 'checkbox') {
                        return $row['option'] . '至少选择一个';
                    } else {
                        return $row['option'];
                    }
                }
                if ($row['field'] == 'email') {
                    if (!$value || !\think\Validate::is($row['value'], 'email')) {
                        return '邮箱格式不正确';
                    }
                }
                if ($row['field'] == 'mobile') {
                    if (!$value || !\think\Validate::regex($row['value'], "^1\d{10}$")) {
                        return '手机号格式不正确';
                    }
                }
            }
        }


        return true;
    }
}



 