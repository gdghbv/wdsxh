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
namespace app\admin\model\wdsxh;

use think\Model;
use traits\model\SoftDelete;

class Demand extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'wdsxh_demand';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'is_anonymity_text'
    ];

    protected $type = [
        'processing_time'  =>  'timestamp:Y-m-d H:i:s',
    ];

    public function getIsAnonymityList()
    {
        return ['1' => __('Is_anonymity 1'), '2' => __('Is_anonymity 2')];
    }


    public function getIsAnonymityTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_anonymity']) ? $data['is_anonymity'] : '');
        $list = $this->getIsAnonymityList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public function wechat()
    {
        return $this->belongsTo('app\admin\model\wdsxh\user\UserWechat','wechat_id','id')->setEagerlyType(0);
    }




}
