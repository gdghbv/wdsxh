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
 * Class InstitutionConfig
 * Desc  机构配置Model
 * Create on 2025/3/6 10:50
 * Create by wangyafang
 */

namespace app\admin\model\wdsxh\institution;


use think\Model;

class InstitutionConfig extends Model
{
// 表名
    protected $name = 'wdsxh_institution_config';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    public function getIsStatusList()
    {
        return ['1' => __('对外开放'), '2' => __('不对外开放')];
    }
}



 