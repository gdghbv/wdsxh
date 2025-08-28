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
 * Class institution
 * Desc  机构Model
 * Create on 2025/3/5 10:28
 * Create by wangyafang
 */
namespace app\api\model\wdsxh\institution;

use app\api\model\wdsxh\Base;

class Institution extends Base
{
// 表名
    protected $name = 'wdsxh_institution';


    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;

    protected function getIconAttr($value)
    {
        return wdsxh_full_url($value);
    }
}



 