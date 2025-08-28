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

class FreightRules extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'wdsxh_mall_freight_rules';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'status_text'
    ];

    protected static function init()
    {
        self::beforeInsert(function ($row) {
            $row['open_area'] = implode(',',$row['open_area']);
        });

        self::beforeUpdate(function ($row) {
            $row['open_area'] = implode(',',$row['open_area']);
        });
    }
    
    public function getStatusList()
    {
        return ['normal' => __('Status normal'), 'hidden' => __('Status hidden')];
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public function getOpenAreaList()
    {
        return ['北京市' => __('北京市'), '天津市' => __('天津市'), '上海市' => __('上海市'), '重庆市' => __('重庆市'), '河北省' => __('河北省'), '山西省' => __('山西省'), '辽宁省' => __('辽宁省'), '吉林省' => __('吉林省'), '黑龙江省' => __('黑龙江省'), '江苏省' => __('江苏省'), '浙江省' => __('浙江省'), '安徽省' => __('安徽省'), '福建省' => __('福建省'), '江西省' => __('江西省'), '山东省' => __('山东省'), '河南省' => __('河南省'), '湖北省' => __('湖北省'), '湖南省' => __('湖南省'), '广东省' => __('广东省'), '海南省' => __('海南省'), '四川省' => __('四川省'), '贵州省' => __('贵州省'), '云南省' => __('云南省'), '陕西省' => __('陕西省'), '甘肃省' => __('甘肃省'), '青海省' => __('青海省'), '内蒙古自治区' => __('内蒙古自治区'), '广西壮族自治区' => __('广西壮族自治区'), '西藏自治区' => __('西藏自治区'), '宁夏回族自治区' => __('宁夏回族自治区'), '新疆维吾尔自治区' => __('新疆维吾尔自治区'), '香港' => __('香港'),  '澳门' => __('澳门'),  '台湾省' => __('台湾省')];
    }




}
