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
/**
 * Class SelfPickup
 * Desc  自提点Model
 * Create on 2025/4/15 14:23
 * Create by wangyafang
 */

namespace app\admin\model\wdsxh\mall;


use think\Model;

class SelfPickup extends Model
{
// 表名
    protected $name = 'wdsxh_mall_self_pickup';


    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    public function getIsStatusList()
    {
        return ['1' => __('Self_pickup_status 1'), '2' => __('Self_pickup_status 2')];
    }
}



 