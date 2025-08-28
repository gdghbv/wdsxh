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
 * Class Member
 * Desc  成员Model
 * Create on 2025/3/5 10:41
 * Create by wangyafang
 */

namespace app\api\model\wdsxh\institution;


use think\Model;

class Member extends Model
{
    protected $name = 'wdsxh_institution_member';


    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;

    public function usermember()
    {
        return $this->belongsTo('app\api\model\wdsxh\member\Member', 'member_id', 'id', [], 'LEFT')
            ->setEagerlyType(0);
    }

    public function institutionlevel()
    {
        return $this->belongsTo('app\api\model\wdsxh\institution\Level', 'level_id', 'id', [], 'LEFT')
            ->setEagerlyType(0);
    }
}



 