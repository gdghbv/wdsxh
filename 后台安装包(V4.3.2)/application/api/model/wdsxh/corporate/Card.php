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
 * Class Card
 * Desc  名片Model
 * Create on 2025/1/21 16:57
 * Create by wangyafang
 */
namespace app\api\model\wdsxh\corporate;

use app\api\model\wdsxh\Base;
use app\api\model\wdsxh\business\Association;

class Card extends Base
{



    // 表名
    protected $name = 'wdsxh_corporate_card';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'association'
    ];

    public function getAssociationAttr($value)
    {

        $result = (new Association())->where('id',1)->field('name,logo')->find();
        return $result;
    }

    protected function getCardBackgroundImageAttr($value)
    {
        return wdsxh_full_url($value);
    }

    protected function setCardBackgroundImageAttr($value)
    {
        $value = remove_wdsxh_full_url($value);
        return $value;
    }
}



 