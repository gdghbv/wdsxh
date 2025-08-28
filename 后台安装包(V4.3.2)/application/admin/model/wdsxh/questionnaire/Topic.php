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

namespace app\admin\model\wdsxh\questionnaire;

use think\Model;
use traits\model\SoftDelete;

class Topic extends Model
{

    use SoftDelete;

    

    // 表名
    protected $name = 'wdsxh_questionnaire_topic';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'type_text',
        'is_explain_text',
        'must_text',
        'status_text'
    ];
    

    protected static function init()
    {
        self::afterInsert(function ($row) {
            $pk = $row->getPk();
            $row->getQuery()->where($pk, $row[$pk])->update(['weigh' => $row[$pk]]);
        });
    }

    
    public function getTypeList()
    {
        return ['text' => __('Type text'), 'number' => __('Type number'), 'radio' => __('Type radio'), 'checkbox' => __('Type checkbox'), 'select' => __('Type select'),'datetime' => __('Type datetime'), 'textarea' => __('Type textarea'),'images' => __('Type images')];
    }

    public function getIsExplainList()
    {
        return ['1' => __('Is_explain 1'), '2' => __('Is_explain 2')];
    }

    public function getMustList()
    {
        return ['1' => __('Must 1'), '2' => __('Must 2')];
    }

    public function getStatusList()
    {
        return ['normal' => __('Status normal'), 'hidden' => __('Status hidden')];
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsExplainTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_explain']) ? $data['is_explain'] : '');
        $list = $this->getIsExplainList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getMustTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['must']) ? $data['must'] : '');
        $list = $this->getMustList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
