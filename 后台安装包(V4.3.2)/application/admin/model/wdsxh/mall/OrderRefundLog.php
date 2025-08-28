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
namespace app\admin\model\wdsxh\mall;

use think\Model;
use traits\model\SoftDelete;

class OrderRefundLog extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'wdsxh_mall_order_refund_log';
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';
    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';


}
