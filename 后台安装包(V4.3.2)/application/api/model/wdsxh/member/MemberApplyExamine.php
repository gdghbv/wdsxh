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
 * Class MemberApplyExamine
 * Desc  会员审核Model
 * Create on 2025/3/5 15:18
 * Create by wangyafang
 */

namespace app\api\model\wdsxh\member;


use app\api\model\wdsxh\Base;

class MemberApplyExamine extends Base
{
// 表名
    protected $name = 'wdsxh_member_apply';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    protected $type = [
        'createtime'  =>  'timestamp:Y-m-d  H:i:s',
    ];

    public function level()
    {
        return $this->belongsTo('Level', 'member_level_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}



 