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
 * Class Article
 * Desc  文章管理
 * Create on 2024/3/12 10:10
 * Create by @小趴菜
 */

namespace app\api\model\wdsxh\article;

use app\api\model\wdsxh\Base;

class Article extends Base
{
// 表名
    protected $name = 'wdsxh_article';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $createTime = true;
    protected $updateTime = false;
    protected $deleteTime = false;

    protected function getCreatetimeAttr($value)
    {
        $new_date = date("Y-m-d H:i", $value);
        return $new_date;
    }


}



 