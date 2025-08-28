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


class Member extends Model
{

    

    

    // 表名
    protected $name = 'wdsxh_member';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'type_text'
    ];

    protected static function init()
    {
        self::afterInsert(function ($row) {
            $pk = $row->getPk();
            if (isset($row['native_place']) && !empty($row['native_place'])) {
                $native_place = $row['native_place'];
                $nativePlaceArray = explode('/',$native_place);
                if (count($nativePlaceArray) == 3) {
                    $area_letter = \app\common\model\wdsxh\member\Member::getFirstCharter($nativePlaceArray[2]);
                    $row->getQuery()->where($pk, $row[$pk])->update(['area_letter' => $area_letter]);
                }
            }

            if (isset($row['channel']) && $row['channel'] == 3) {
                $pay_time = time();
                $payData = array(
                    'member_id'=>$row[$pk],
                    'wechat_id'=>isset($row['wechat_id']) && !empty($row['wechat_id']) ? $row['wechat_id'] : '',
                    'order_no'=>wdsxh_create_order(),
                    'fees'=>(new Level())->where('id',$row['member_level_id'])->value('fees'),
                    'paid'=>'2',
                    'pay_time'=>$pay_time,
                    'level_id'=>$row['member_level_id'],
                    'channel'=>'3',
                    'pay_method'=>'4',
                    'delivery_state'=>'2'
                );
                (new Pay())->allowField(true)->save($payData);
            }

        });

        self::afterUpdate(function ($row) {
            $native_place = $row['native_place'];
            $nativePlaceArray = explode('/',$native_place);
            if (count($nativePlaceArray) == 3) {
                $area_letter = \app\common\model\wdsxh\member\Member::getFirstCharter($nativePlaceArray[2]);
                $pk = $row->getPk();
                $row->getQuery()->where($pk, $row[$pk])->update(['area_letter' => $area_letter]);
            }
        });

    }

    public function getStatusList()
    {
        return ['normal' => __('Status normal'), 'hidden' => __('Status hidden')];
    }

    public function getTypeList()
    {
        return ['1' => __('Type 1'), '2' => __('Type 2'), '3' => __('Type 3')];
    }

    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    public function wechat()
    {
        return $this->belongsTo('app\admin\model\wdsxh\user\Wechat', 'wechat_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function level()
    {
        return $this->belongsTo('Level', 'member_level_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function industry()
    {
        return $this->belongsTo('\app\admin\model\wdsxh\member\IndustryCategory', 'industry_category_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    //$person_original_custom_content  个人原始字段(new \app\admin\model\wdsxh\member\JoinConfig)->person_data();
    //$company_original_custom_content  企业原始字段(new \app\admin\model\wdsxh\member\JoinConfig)->company_data();
    //$organize_original_custom_content  组织原始字段(new \app\admin\model\wdsxh\member\JoinConfig)->organize_data();
    public static function get_member_edit_params($type = '',$person_original_custom_content = '',$params = array(),$company_original_custom_content = '',$organize_original_custom_content = '')
    {
        $joinConfigController = new \app\admin\controller\wdsxh\member\JoinConfig();
        switch ($type) {
            case 1:
                $custom_content = self::get_member_edit_custom_content($person_original_custom_content,$params);
                $fieldset = array_column(self::person_data(), 'field');
                foreach ($custom_content as $v) {
                    if (in_array($v['field'],$fieldset)) {
                        if ($v['field'] == 'address') {
                            $params['address'] = $v['value']['address'];
                            $params['latitude'] = $v['value']['latitude'];
                            $params['longitude'] = $v['value']['longitude'];
                        } else {
                            $params[$v['field']] = $v['value'];
                        }

                    }
                }
                $params['custom_content'] = json_encode($custom_content);
                break;
            case 2:
                $person_custom_content = self::get_member_edit_custom_content($person_original_custom_content,$params);
                $fieldset = array_column(self::company_person_data(), 'field');
                foreach ($person_custom_content as $v) {
                    if (in_array($v['field'],$fieldset)) {
                        if ($v['field'] == 'address') {
                            $params['address'] = $v['value']['address'];
                            $params['latitude'] = $v['value']['latitude'];
                            $params['longitude'] = $v['value']['longitude'];
                        } else {
                            $params[$v['field']] = $v['value'];
                        }

                    }
                }

                $company_custom_content = self::get_member_edit_custom_content($company_original_custom_content,$params);
                $fieldset = array_column(self::company_data(), 'field');
                foreach ($company_custom_content as $v) {
                    if (in_array($v['field'],$fieldset)) {
                        $params[$v['field']] = $v['value'];
                    }
                }
                $custom_content = array(
                    'person'=>$person_custom_content,
                    'company'=>$company_custom_content,
                );
                $params['custom_content'] = json_encode($custom_content);
                break;
            case 3:
                $person_custom_content = self::get_member_edit_custom_content($person_original_custom_content,$params);
                $fieldset = array_column(self::organize_person_data(), 'field');
                foreach ($person_custom_content as $v) {
                    if (in_array($v['field'],$fieldset)) {
                        if ($v['field'] == 'address') {
                            $params['address'] = $v['value']['address'];
                            $params['latitude'] = $v['value']['latitude'];
                            $params['longitude'] = $v['value']['longitude'];
                        } else {
                            $params[$v['field']] = $v['value'];
                        }

                    }
                }

                $organize_custom_content = self::get_member_edit_custom_content($organize_original_custom_content,$params);
                $fieldset = array_column(self::organize_data(), 'field');
                foreach ($organize_custom_content as $v) {
                    if (in_array($v['field'],$fieldset)) {
                        $params[$v['field']] = $v['value'];
                    }
                }
                $custom_content = array(
                    'person'=>$person_custom_content,
                    'organize'=>$organize_custom_content,
                );
                $params['custom_content'] = json_encode($custom_content);
                break;

        }
        $params['member_level_name'] = (new Level())->where('id',$params['member_level_id'])->value('name');
        $params['industry_category_name'] = (new IndustryCategory())->where('id',$params['industry_category_id'])->value('name');
        return $params;
    }

    public static function get_member_edit_custom_content($original_custom_content,$params) {
        $custom_content = json_decode($original_custom_content,true);


        foreach ($custom_content as $k=>$v) {
            if ($v['field'] == 'address') {
                $custom_content[$k]['value']['address'] = $params['custom_content']['address']['address'];
                $custom_content[$k]['value']['latitude'] = $params['custom_content']['address']['latitude'];
                $custom_content[$k]['value']['longitude'] = $params['custom_content']['address']['longitude'];
            } elseif ($v['type'] == 'checkbox') {
                $custom_content[$k]['value'] = implode(',',$params['custom_content'][$v['field']]);
            } elseif ($v['type'] == 'cert') {
                $custom_content[$k]['value'] = array(
                    'name'=>$params['custom_content'][$v['field']]['name'],
                    'number'=>$params['custom_content'][$v['field']]['number'],
                    'image'=>$params['custom_content'][$v['field']]['image'],
                );
            } else {//解决radio没有选中问题
                $custom_content[$k]['value'] = isset($params['custom_content'][$v['field']]) ? $params['custom_content'][$v['field']] : '';
            }
        }

        return $custom_content;
    }

    public static function organize_data()
    {
        $data = array(
            0 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '团体名称',
                    'field' => 'organize_name',
                    'option' => '请输入团体名称',
                ),
            1 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'image',
                    'label' => '团体Logo',
                    'field' => 'organize_logo',
                    'option' => '请上传团体Logo',
                ),
            2 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'textarea',
                    'label' => '团体简介',
                    'field' => 'organize_introduction',
                    'option' => '请输入团体简介',
                ),
        );
        return $data;
    }

    public static function company_person_data()
    {
        $data = array(
            0 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '姓名',
                    'field' => 'name',
                    'option' => '请输入你的姓名',
                ),
            1 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'image',
                    'label' => '头像',
                    'field' => 'avatar',
                    'option' => '请上传头像',
                ),
            2 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'number',
                    'label' => '手机号',
                    'field' => 'mobile',
                    'option' => '请输入你的手机号',
                ),
            3 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '级别',
                    'field' => 'member_level_id',
                    'option' => '请选择会员级别',
                ),
            4 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '籍贯',
                    'field' => 'native_place',
                    'option' => '请选择籍贯',
                ),
            5 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'textarea',
                    'label' => '介绍',
                    'field' => 'introduce_content',
                    'option' => '请输入介绍',
                ),
            6 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '所在地址',
                    'field' => 'address',
                    'option' => '请选择所在地址',
                ),
            7 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '行业分类',
                    'field' => 'industry_category_id',
                    'option' => '请选择行业分类',
                ),
            8 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '公司职务',
                    'field' => 'company_position',
                    'option' => '请输入公司职务',
                ),
        );
        return $data;
    }

    public static function organize_person_data()
    {
        $data = array(
            0 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '姓名',
                    'field' => 'name',
                    'option' => '请输入你的姓名',
                ),
            1 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'image',
                    'label' => '头像',
                    'field' => 'avatar',
                    'option' => '请上传头像',
                ),
            2 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'number',
                    'label' => '手机号',
                    'field' => 'mobile',
                    'option' => '请输入你的手机号',
                ),
            3 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '级别',
                    'field' => 'member_level_id',
                    'option' => '请选择会员级别',
                ),
            4 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '籍贯',
                    'field' => 'native_place',
                    'option' => '请选择籍贯',
                ),
            5 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'textarea',
                    'label' => '介绍',
                    'field' => 'introduce_content',
                    'option' => '请输入介绍',
                ),
            6 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '所在地址',
                    'field' => 'address',
                    'option' => '请选择所在地址',
                ),
            7 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '行业分类',
                    'field' => 'industry_category_id',
                    'option' => '请选择行业分类',
                ),
            8 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '团体职务',
                    'field' => 'organize_position',
                    'option' => '请输入团体职务',
                ),
        );
        return $data;
    }

    public static function person_data()
    {
        $data = array(
            0 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '姓名',
                    'field' => 'name',
                    'option' => '请输入你的姓名',
                ),
            1 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'image',
                    'label' => '头像',
                    'field' => 'avatar',
                    'option' => '请上传头像',
                ),
            2 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'number',
                    'label' => '手机号',
                    'field' => 'mobile',
                    'option' => '请输入你的手机号',
                ),
            3 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '级别',
                    'field' => 'member_level_id',
                    'option' => '请选择会员级别',
                ),
            4 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '籍贯',
                    'field' => 'native_place',
                    'option' => '请选择籍贯',
                ),
            5 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'textarea',
                    'label' => '介绍',
                    'field' => 'introduce_content',
                    'option' => '请输入介绍',
                ),
            6 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '所在地址',
                    'field' => 'address',
                    'option' => '请选择所在地址',
                ),
            7 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'select',
                    'label' => '行业分类',
                    'field' => 'industry_category_id',
                    'option' => '请选择行业分类',
                ),
        );
        return $data;
    }

    public static function company_data()
    {
        $data = array(
            0 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'text',
                    'label' => '公司名称',
                    'field' => 'company_name',
                    'option' => '请输入公司名称',
                ),
            1 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'image',
                    'label' => '公司Logo',
                    'field' => 'company_logo',
                    'option' => '请上传公司Logo',
                ),
            2 =>
                array(
                    'show' => '1',
                    'required' => '1',
                    'type' => 'textarea',
                    'label' => '公司简介',
                    'field' => 'company_introduction',
                    'option' => '请输入公司简介',
                ),
        );
        return $data;
    }




}
