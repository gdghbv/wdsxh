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
namespace app\api\model\wdsxh;
/**
 * Class Tabbar
 * Desc  底部导航
 * Create on 2024/3/22 16:59
 * Create by @小趴菜
 */
class Tabbar extends Base
{
    // 表名
    protected $name = 'wdsxh_tabbar';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    protected function getIconAttr($value)
    {
        return wdsxh_full_url($value);
    }


    protected function getSeliconAttr($value)
    {
        return wdsxh_full_url($value);
    }








}
