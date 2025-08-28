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

class FeesConfig extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'expire_time_type' => 'require|checkDaysAndDate',
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
        'edit' => ['expire_time_type'],
    ];

    protected function checkDaysAndDate($value,$rule,$data)
    {
        if ($value == 1) {//自由时间验证
            if (empty($data['days'])) {
                return '请输入自由时间天数';
            }
        } else {
            if (empty($data['fixed_date'])) {
                return '请选择固定日期';
            }
            $fixed_date = (new \app\admin\model\wdsxh\member\FeesConfig())->where('id',1)->value('fixed_date');
            if( ($fixed_date != $data['fixed_date']) && $data['fixed_date'] <= date('Y-m-d',time())) {
                return '固定时间只能设置当前时间之后的时间';
            }
        }
        return true;
    }
    
}
