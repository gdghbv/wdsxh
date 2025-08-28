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

class AlbumConfig extends Model
{


    

    // 表名
    protected $name = 'wdsxh_album_config';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';

    public function getIsStatusList()
    {
        return ['1' => __('全部开放'), '2' => __('部分开放'), '3' => __('会员专属(只有会员才能查看)')];
    }

    public function getIsStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_status']) ? $data['is_status'] : '');
        $list = $this->getIsStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }








}
