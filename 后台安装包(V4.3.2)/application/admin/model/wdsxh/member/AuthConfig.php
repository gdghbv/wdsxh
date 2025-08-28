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


class AuthConfig extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_member_auth_config';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'address_book_is_openness_text',
        'address_book_is_exclusive_text',
        'member_details_text'
    ];
    

    
    public function getAddressBookIsOpennessList()
    {
        return ['1' => __('Address_book_is_openness 1'), '2' => __('Address_book_is_openness 2')];
    }

    public function getAddressBookIsExclusiveList()
    {
        return ['1' => __('Address_book_is_exclusive 1'), '2' => __('Address_book_is_exclusive 2')];
    }

    public function getMemberDetailsList()
    {
        return ['1' => __('Member_details 1'), '2' => __('Member_details 2'), '3' => __('Member_details 3')];
    }

    public function getAddressBookSortOrderList()
    {
        return ['1' => __('Address_book_sort_order 1'), '2' => __('Address_book_sort_order 2'), '3' => __('Address_book_sort_order 3')];
    }


    public function getAddressBookIsOpennessTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['address_book_is_openness']) ? $data['address_book_is_openness'] : '');
        $list = $this->getAddressBookIsOpennessList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getAddressBookIsExclusiveTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['address_book_is_exclusive']) ? $data['address_book_is_exclusive'] : '');
        $list = $this->getAddressBookIsExclusiveList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getMemberDetailsTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['member_details']) ? $data['member_details'] : '');
        $list = $this->getMemberDetailsList();
        return isset($list[$value]) ? $list[$value] : '';
    }




}
