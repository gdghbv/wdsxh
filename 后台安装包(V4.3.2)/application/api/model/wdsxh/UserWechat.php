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

use think\Model;

/**
 * Class UserWechat
 * Desc  微信表模型
 * Create on 2024/3/7 10:11
 * Create by wangyafang
 */
class UserWechat extends Base
{
    // 表名
    protected $name = 'wdsxh_user_wechat';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    protected $type = [
        'join_time'  =>  'timestamp:Y-m-d',
    ];
}



 