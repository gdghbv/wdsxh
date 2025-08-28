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
namespace app\admin\model\wdsxh\member;

use think\Model;


class JoinConfig extends Model
{

    



    // 表名
    protected $name = 'wdsxh_member_join_config';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type_text',
        'status_text'
    ];
    

    
    public function getTypeList()
    {
        return ['1' => __('Type 1'), '2' => __('Type 2'), '3' => __('Type 3')];
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


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public static function person_fieldset()
    {
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS ."person.php";
        if (is_file($config_file)) {
            $person_fieldset = include $config_file;
        }
        if (empty($person_fieldset)) {
            $person_fieldset = Member::person_data();
        }
        return $person_fieldset;
    }

    public static function company_fieldset()
    {
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS ."company.php";
        if (is_file($config_file)) {
            $company_file_data = include $config_file;
            $person_fieldset = $company_file_data['person'];
            $company_fieldset = $company_file_data['company'];
        }
        if (empty($company_fieldset)) {
            $person_fieldset = Member::company_person_data();
            $company_fieldset = Member::company_data();
        }
        $data = array(
            $person_fieldset,
            $company_fieldset,
        );
        return $data;
    }

    public static function organize_fieldset()
    {
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS ."organize.php";
        if (is_file($config_file)) {
            $organize_file_data = include $config_file;
            $person_fieldset = $organize_file_data['person'];
            $organize_fieldset = $organize_file_data['organize'];
        }
        if (empty($organize_fieldset)) {
            $person_fieldset = Member::organize_person_data();
            $organize_fieldset = Member::organize_data();
        }
        $data = array(
            $person_fieldset,
            $organize_fieldset,
        );
        return $data;
    }




}
