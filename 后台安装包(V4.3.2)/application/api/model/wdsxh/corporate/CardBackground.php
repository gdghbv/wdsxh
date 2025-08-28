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
 * Class CardBackground
 * Desc  名片背景Model
 * Create on 2025/1/21 16:57
 * Create by wangyafang
 */
namespace app\api\model\wdsxh\corporate;

use app\api\model\wdsxh\Base;
use traits\model\SoftDelete;

class CardBackground extends Base
{
    use SoftDelete;



    // 表名
    protected $name = 'wdsxh_corporate_card_background';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';
}



 