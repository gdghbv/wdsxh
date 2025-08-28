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
namespace app\api\controller\wdsxh\member;

use app\common\controller\Api;

/**
 * Class JoinConfig
 * Desc  入会申请控制器
 * Create on 2024/3/7 9:08
 * Create by wangyafang
 */
class JoinConfig extends Api
{
    protected $noNeedLogin = ['custom_field'];
    protected $noNeedRight = ['*'];

    /**
     * 首页
     *
     */
    public function custom_field()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $type = $this->request->get('type');
        switch ($type) {
            case 1:
                $this->peroson_field();
                break;
            case 2:
                $this->company_field();
                break;
            case 3:
                $this->organize_field();
                break;
        }
    }

    private function peroson_field()
    {
        $fieldset = array();
        $field_file_name = 'person';
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS .$field_file_name.".php";

        if (is_file($config_file)) {
            $fieldset = include $config_file;
        }
        if (empty($fieldset)) {
            $fieldset = array (
                0 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'text',
                        'label' => '姓名',
                        'field' => 'name',
                        'option' => '请输入你的姓名',
                    ),
                1 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'image',
                        'label' => '头像',
                        'field' => 'avatar',
                        'option' => '请上传头像',
                    ),
                2 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'number',
                        'label' => '手机号',
                        'field' => 'mobile',
                        'option' => '请输入你的手机号',
                    ),
                3 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'select',
                        'label' => '级别',
                        'field' => 'member_level_id',
                        'option' => '请选择会员级别',
                    ),
                4 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'select',
                        'label' => '籍贯',
                        'field' => 'native_place',
                        'option' => '请选择籍贯',
                    ),
                5 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'textarea',
                        'label' => '介绍',
                        'field' => 'introduce_content',
                        'option' => '请输入介绍',
                    ),
                6 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'text',
                        'label' => '所在地址',
                        'field' => 'address',
                        'option' => '请选择所在地址',
                    ),
                7 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'select',
                        'label' => '行业分类',
                        'field' => 'industry_category_id',
                        'option' => '请选择行业分类',
                    ),
            );
        }


        foreach ($fieldset as $k=>$v) {
            $fieldset[$k]['value'] = '';
        }

        $this->success('请求成功',$fieldset);
    }

    private function company_field()
    {
        $fieldset = array();
        $field_file_name = 'company';
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS .$field_file_name.".php";

        if (is_file($config_file)) {
            $fieldset = include $config_file;
        }
        if (empty($fieldset)) {
            $fieldset = array (
                'person' =>
                    array (
                        0 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '姓名',
                                'field' => 'name',
                                'option' => '请输入你的姓名',
                            ),
                        1 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'image',
                                'label' => '头像',
                                'field' => 'avatar',
                                'option' => '请上传头像',
                            ),
                        2 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'number',
                                'label' => '手机号',
                                'field' => 'mobile',
                                'option' => '请输入你的手机号',
                            ),
                        3 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'select',
                                'label' => '级别',
                                'field' => 'member_level_id',
                                'option' => '请选择会员级别',
                            ),
                        4 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'select',
                                'label' => '籍贯',
                                'field' => 'native_place',
                                'option' => '请选择籍贯',
                            ),
                        5 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'textarea',
                                'label' => '介绍',
                                'field' => 'introduce_content',
                                'option' => '请输入介绍',
                            ),
                        6 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '所在地址',
                                'field' => 'address',
                                'option' => '请选择所在地址',
                            ),
                        7 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'select',
                                'label' => '行业分类',
                                'field' => 'industry_category_id',
                                'option' => '请选择行业分类',
                            ),
                        8 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '公司职务',
                                'field' => 'company_position',
                                'option' => '请输入公司职务',
                            ),
                    ),
                'company' =>
                    array (
                        0 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '公司名称',
                                'field' => 'company_name',
                                'option' => '请输入公司名称',
                            ),
                        1 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'image',
                                'label' => '公司Logo',
                                'field' => 'company_logo',
                                'option' => '请上传公司Logo',
                            ),
                        2 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'textarea',
                                'label' => '公司简介',
                                'field' => 'company_introduction',
                                'option' => '请输入公司简介',
                            ),

                    ),
            );
        }


        foreach ($fieldset['person'] as $k=>$v) {
            $fieldset['person'][$k]['value'] = '';
        }
        foreach ($fieldset['company'] as $k=>$v) {
            $fieldset['company'][$k]['value'] = '';
        }

        $this->success('请求成功',$fieldset);
    }

    private function organize_field()
    {
        $fieldset = array();
        $field_file_name = 'organize';
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS .$field_file_name.".php";

        if (is_file($config_file)) {
            $fieldset = include $config_file;
        }
        if (empty($fieldset)) {
            $fieldset = array (
                'person' =>
                    array (
                        0 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '姓名',
                                'field' => 'name',
                                'option' => '请输入你的姓名',
                            ),
                        1 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'image',
                                'label' => '头像',
                                'field' => 'avatar',
                                'option' => '请上传头像',
                            ),
                        2 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'number',
                                'label' => '手机号',
                                'field' => 'mobile',
                                'option' => '请输入你的手机号',
                            ),
                        3 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'select',
                                'label' => '级别',
                                'field' => 'member_level_id',
                                'option' => '请选择会员级别',
                            ),
                        4 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'select',
                                'label' => '籍贯',
                                'field' => 'native_place',
                                'option' => '请选择籍贯',
                            ),
                        5 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'textarea',
                                'label' => '介绍',
                                'field' => 'introduce_content',
                                'option' => '请输入介绍',
                            ),
                        6 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '所在地址',
                                'field' => 'address',
                                'option' => '请选择所在地址',
                            ),
                        7 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'select',
                                'label' => '行业分类',
                                'field' => 'industry_category_id',
                                'option' => '请选择行业分类',
                            ),
                        8 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '团体职务',
                                'field' => 'organize_position',
                                'option' => '请输入团体职务',
                            ),
                    ),
                'organize' =>
                    array (
                        0 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'text',
                                'label' => '团体名称',
                                'field' => 'organize_name',
                                'option' => '请输入团体名称',
                            ),
                        1 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'image',
                                'label' => '团体Logo',
                                'field' => 'organize_logo',
                                'option' => '请上传团体Logo',
                            ),
                        2 =>
                            array (
                                'show' => '1',
                                'required' => '1',
                                'type' => 'textarea',
                                'label' => '团体简介',
                                'field' => 'organize_introduction',
                                'option' => '请输入团体简介',
                            ),
                    ),
            );
        }


        foreach ($fieldset['person'] as $k=>$v) {
            $fieldset['person'][$k]['value'] = '';
        }
        foreach ($fieldset['organize'] as $k=>$v) {
            $fieldset['organize'][$k]['value'] = '';
        }

        $this->success('请求成功',$fieldset);
    }
}



 