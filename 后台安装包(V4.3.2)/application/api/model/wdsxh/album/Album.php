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
 * Class Album
 * Desc  相册管理
 * Create on 2024/3/12 10:10
 * Create by @小趴菜
 */

namespace app\api\model\wdsxh\album;

use app\api\model\wdsxh\Base;
use traits\model\SoftDelete;
class Album extends Base
{
    use SoftDelete;



    // 表名
    protected $name = 'wdsxh_album';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    protected function getReleaseDateAttr($value)
    {
        $new_date = str_replace("-", "/", $value);
        return $new_date;
    }
}



 