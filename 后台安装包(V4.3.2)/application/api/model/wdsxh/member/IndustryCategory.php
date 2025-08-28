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
 * Class IndustryCategory
 * Desc  行业分类模型
 * Create on 2024/3/19 11:22
 * Create by wangyafang
 */

namespace app\api\model\wdsxh\member;


use think\Model;

class IndustryCategory extends Model
{
// 表名
    protected $name = 'wdsxh_member_industry_category';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    public function getIconAttr($value)
    {
        return wdsxh_full_url($value);
    }
}



 