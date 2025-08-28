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
namespace app\admin\controller\wdsxh\activity;

use app\common\controller\Backend;

class ActivityFieldset  extends Backend
{
    /**
     * Config模型对象
     * @var \app\admin\model\wdsxh\activity\ActivityFieldset()
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\activity\ActivityFieldset();
    }

    public function fieldset($ids = null)
    {
        $get_fieldset_data = $this->get_fieldset($ids);
        if ($this->request->isPost()) {
            $params = $this->request->param('row/a');

            if (empty($params['field']) || !is_array($params['field'])) {
                $this->error('字段信息不能为空');
            }
            $temp = array();

            foreach ($params['field'] as $row) {
                $temp[] = $row;
            }
            $field_array = array_column($temp, 'field');
            if (count($field_array) != count(array_unique($field_array))) {
                $this->error('字段名不能重复');
            }
            $fieldsetObj = $this->model->where('activity_id',$ids)->find();

            $json = json_encode($temp);
            if ($fieldsetObj) {
                $fieldsetObj->json = $json;
                $fieldsetObj->save();
            } else {
                $this->model->save([
                    'activity_id'=>$ids,
                    'json'=>$json
                ]);
            }
            $this->success('操作成功！');
        }
        $this->assign('get_fieldset_data', json_encode($get_fieldset_data));
        return $this->view->fetch('');
    }

    private function get_fieldset($activity_id)
    {
        $fieldsetObj = $this->model->where('activity_id',$activity_id)->find();
        if ($fieldsetObj) {
            $get_fieldset_data = json_decode($fieldsetObj['json'],true);
        } else {
            $get_fieldset_data = array(
                0 =>
                    array(
                        'show' => '1',
                        'required' => '1',
                        'type' => 'text',
                        'label' => '姓名',
                        'field' => 'name',
                        'option' => '请输入姓名',
                    ),
                1 =>
                    array(
                        'show' => '1',
                        'required' => '1',
                        'type' => 'number',
                        'label' => '手机号',
                        'field' => 'mobile',
                        'option' => '请输入你的手机号',
                    ),
            );;
        }

        return $get_fieldset_data;

    }

    public function index()
    {
        return;
    }

    public function multi($ids = null)
    {
        return;
    }

    public function del($ids = null)
    {
        return;
    }

    public function edit($ids = null)
    {
        return;
    }

    public function add()
    {
        return;
    }
}