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
namespace app\admin\controller\wdsxh\member;

use app\common\controller\Backend;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\response\Json;
use Exception;

/**
 * 入会类型设置
 *
 * @icon fa fa-circle-o
 */
class JoinConfig extends Backend
{

    /**
     * JoinConfig模型对象
     * @var \app\admin\model\wdsxh\member\JoinConfig
     */
    protected $model = null;



    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\member\JoinConfig;
        $this->view->assign("typeList", $this->model->getTypeList());
        $this->view->assign("statusList", $this->model->getStatusList());
        $list = $this->model->where('weigh',0)->field('id')->select();
        if(count($list) == 3) {
            $data = [
                ['id'=>1, 'weigh'=>1],
                ['id'=>2, 'weigh'=>2],
                ['id'=>3, 'weigh'=>3]
            ];
            $this->model->saveAll($data);
        }
        $list = $this->model->select();
        foreach ($list as &$row) {
            if (empty($row['name']) && $row['type'] == 1) {
                $row['name'] = '个人入会';
                $row->save();
            }
            if (empty($row['name']) && $row['type'] == 2) {
                $row['name'] = '企业入会';
                $row->save();
            }
            if (empty($row['name']) && $row['type'] == 3) {
                $row['name'] = '团体入会';
                $row->save();
            }
        }
    }

    /**
     * 查看
     *
     * @return string|Json
     * @throws \think\Exception
     * @throws DbException
     */
    public function index()
    {
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if (false === $this->request->isAjax()) {
            return $this->view->fetch();
        }
        //如果发送的来源是 Selectpage，则转发到 Selectpage
        if ($this->request->request('keyField')) {
            return $this->selectpage();
        }
        [$where, $sort, $order, $offset, $limit] = $this->buildparams();
        $list = $this->model
            ->where($where)
            ->order($sort, $order)
            ->paginate($limit);
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }

    /**
     * 批量更新
     *
     * @param $ids
     * @return void
     */
    public function multi($ids = null)
    {
        if (false === $this->request->isPost()) {
            $this->error(__('Invalid parameters'));
        }
        $ids = $ids ?: $this->request->post('ids');
        if (empty($ids)) {
            $this->error(__('Parameter %s can not be empty', 'ids'));
        }

        if (false === $this->request->has('params')) {
            $this->error(__('No rows were updated'));
        }
        parse_str($this->request->post('params'), $values);
        $values = $this->auth->isSuperAdmin() ? $values : array_intersect_key($values, array_flip(is_array($this->multiFields) ? $this->multiFields : explode(',', $this->multiFields)));
        if (empty($values)) {
            $this->error(__('You have no permission'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            $this->model->where($this->dataLimitField, 'in', $adminIds);
        }
        $selectCount = count(explode(',',$ids));
        if($values['status'] == 'hidden' && $selectCount == 3) {
            $this->error('入会类型至少有一个需要展示，否则无法入会');
        }
        $count = 0;
        Db::startTrans();
        try {
            $list = $this->model->where($this->model->getPk(), 'in', $ids)->select();
            foreach ($list as $item) {
                $count += $item->allowField(true)->isUpdate(true)->save($values);
            }
            Db::commit();
        } catch (PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($count) {
            $this->success();
        }
        $this->error(__('No rows were updated'));
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    public function fieldset($ids = null)
    {
        switch ($ids) {
            case 1:
                return $this->person_handle($ids);
                break;
            case 2:
                return $this->company_handle($ids);
                break;
            case 3:
                return $this->organize_handle($ids);
                break;
        }
    }

    private function person_handle($ids)
    {
        $row = $this->model->get($ids);
        $person_fieldset = \app\admin\model\wdsxh\member\JoinConfig::person_fieldset();
        if ($this->request->isPost()) {
            $params = $this->request->param('row/a');
            $status = $params['status'];
            if ($status == 'hidden') {
                $hiddenCount = $this->model->where('id','<>',$ids)->where('status','hidden')->count();
                if ($hiddenCount && $hiddenCount == 2) {
                    $this->error('入会类型至少有一个需要展示，否则无法入会');
                }
            }
            $row->status = $status;
            $row->save();
            if (empty($params['field']) || !is_array($params['field'])) {
                $this->error('字段信息不能为空');
            }
            foreach ($params['field'] as &$v) {
                $v['field'] = strtolower($v['field']);
                if (strpos($v['field'], ' ') !== false) {
                    $this->error('字段信息'.$v['field'].',不能包含空格');
                }
                if (!preg_match('/^[a-z_]*$/', $v['field'])) {
                    $this->error('字段信息'.$v['field'].',规则必须是：小写英文字母，特殊字符可以用下划线_代替');
                }
            }

            $temp = array();

            foreach ($params['field'] as $row) {
                if ($row['type'] == 'file' && $row['show'] == 1) {
                    $this->error('文件上传是否展示必须选择否');
                }
                $temp[] = $row;
            }
            $field_array = array_column($temp, 'field');
            if (count($field_array) != count(array_unique($field_array))) {
                $this->error('字段名不能重复');
            }
            file_put_contents(
                ADDON_PATH . "wdsxh" . DS . 'config' . DS . "person.php",
                '<?php' . "\n\nreturn " . var_export_short($temp) . ";\n"
            );
            $this->success('操作成功！');
        }
        $this->assign('person_fieldset', json_encode($person_fieldset));
        $this->view->assign('row', $row);
        return $this->view->fetch('person');
    }

    private function company_handle($ids)
    {
        $row = $this->model->get($ids);
        list($person_fieldset,$company_fieldset) = \app\admin\model\wdsxh\member\JoinConfig::company_fieldset();
        if ($this->request->isPost()) {
            $params = $this->request->param('row/a');
            $status = $params['status'];
            if ($status == 'hidden') {
                $hiddenCount = $this->model->where('id','<>',$ids)->where('status','hidden')->count();
                if ($hiddenCount && $hiddenCount == 2) {
                    $this->error('入会类型至少有一个需要展示，否则无法入会');
                }
            }
            $row->status = $status;
            $row->save();
            if (empty($params['person']) || !is_array($params['person'])) {
                $this->error('个人信息字段信息不能为空');
            }
            if (empty($params['company']) || !is_array($params['company'])) {
                $this->error('企业信息字段信息不能为空');
            }
            foreach ($params['person'] as &$v) {
                $v['field'] = strtolower($v['field']);
                if (strpos($v['field'], ' ') !== false) {
                    $this->error('字段信息'.$v['field'].',不能包含空格');
                }
                if (!preg_match('/^[a-z_]*$/', $v['field'])) {
                    $this->error('字段信息'.$v['field'].',规则必须是：小写英文字母，特殊字符可以用下划线_代替');
                }
            }
            foreach ($params['company'] as &$v) {
                $v['field'] = strtolower($v['field']);
                if (strpos($v['field'], ' ') !== false) {
                    $this->error('字段信息'.$v['field'].',不能包含空格');
                }
                if (!preg_match('/^[a-z_]*$/', $v['field'])) {
                    $this->error('字段信息'.$v['field'].',规则必须是：小写英文字母，特殊字符可以用下划线_代替');
                }
            }

            //个人信息
            $temp = array();

            foreach ($params['person'] as $row) {
                if ($row['type'] == 'file' && $row['show'] == 1) {
                    $this->error('文件上传是否展示必须选择否');
                }
                $temp[] = $row;
            }
            $field_array = array_column($temp, 'field');
            if (count($field_array) != count(array_unique($field_array))) {
                $this->error('个人字段名不能重复');
            }
            //个人信息

            //企业信息
            $temp_company = array();

            foreach ($params['company'] as $row) {
                if ($row['type'] == 'file' && $row['show'] == 1) {
                    $this->error('文件上传是否展示必须选择否');
                }
                $temp_company[] = $row;
            }
            $company_field_array = array_column($temp_company, 'field');
            if (count($company_field_array) != count(array_unique($company_field_array))) {
                $this->error('企业字段名不能重复');
            }
            config('company', $temp_company);
            $intersect_array = array_intersect($field_array,$company_field_array);
            if (!empty($intersect_array)) {
                $this->error('个人字段名和企业字段名不能重复');
            }
            //企业信息
            $company_array = array(
                'person'=>$temp,
                'company'=> $temp_company,
            );

            file_put_contents(
                ADDON_PATH . "wdsxh" . DS . 'config' . DS . "company.php",
                '<?php' . "\n\nreturn " . var_export_short($company_array) . ";\n"
            );
            $this->success('操作成功！');
        }
        $this->assign('person_fieldset', json_encode($person_fieldset));
        $this->assign('company_fieldset', json_encode($company_fieldset));
        $this->view->assign('row', $row);
        return $this->view->fetch('company');
    }

    private function organize_handle($ids)
    {
        $row = $this->model->get($ids);
        list($person_fieldset,$organize_fieldset) = \app\admin\model\wdsxh\member\JoinConfig::organize_fieldset();
        if ($this->request->isPost()) {
            $params = $this->request->param('row/a');
            $status = $params['status'];
            if ($status == 'hidden') {
                $hiddenCount = $this->model->where('id','<>',$ids)->where('status','hidden')->count();
                if ($hiddenCount && $hiddenCount == 2) {
                    $this->error('入会类型至少有一个需要展示，否则无法入会');
                }
            }
            $row->status = $status;
            $row->save();
            if (empty($params['person']) || !is_array($params['person'])) {
                $this->error('个人信息字段信息不能为空');
            }
            if (empty($params['organize']) || !is_array($params['organize'])) {
                $this->error('团体信息字段信息不能为空');
            }
            foreach ($params['person'] as &$v) {
                $v['field'] = strtolower($v['field']);
                if (strpos($v['field'], ' ') !== false) {
                    $this->error('字段信息'.$v['field'].',不能包含空格');
                }
                if (!preg_match('/^[a-z_]*$/', $v['field'])) {
                    $this->error('字段信息'.$v['field'].',规则必须是：小写英文字母，特殊字符可以用下划线_代替');
                }
            }
            foreach ($params['organize'] as &$v) {
                $v['field'] = strtolower($v['field']);
                if (strpos($v['field'], ' ') !== false) {
                    $this->error('字段信息'.$v['field'].',不能包含空格');
                }
                if (!preg_match('/^[a-z_]*$/', $v['field'])) {
                    $this->error('字段信息'.$v['field'].',规则必须是：小写英文字母，特殊字符可以用下划线_代替');
                }
            }

            //个人信息
            $temp = array();

            foreach ($params['person'] as $row) {
                if ($row['type'] == 'file' && $row['show'] == 1) {
                    $this->error('文件上传是否展示必须选择否');
                }
                $temp[] = $row;
            }
            $field_array = array_column($temp, 'field');
            if (count($field_array) != count(array_unique($field_array))) {
                $this->error('个人字段名不能重复');
            }
            //个人信息

            //团体信息
            $temp_organize = array();

            foreach ($params['organize'] as $row) {
                if ($row['type'] == 'file' && $row['show'] == 1) {
                    $this->error('文件上传是否展示必须选择否');
                }
                $temp_organize[] = $row;
            }
            $organize_field_array = array_column($temp_organize, 'field');
            if (count($organize_field_array) != count(array_unique($organize_field_array))) {
                $this->error('团体字段名不能重复');
            }
            config('organize', $temp_organize);
            $intersect_array = array_intersect($field_array,$organize_field_array);
            if (!empty($intersect_array)) {
                $this->error('个人字段名和团体字段名不能重复');
            }
            //团体信息
            $organize_array = array(
                'person'=>$temp,
                'organize'=> $temp_organize,
            );

            file_put_contents(
                ADDON_PATH . "wdsxh" . DS . 'config' . DS . "organize.php",
                '<?php' . "\n\nreturn " . var_export_short($organize_array) . ";\n"
            );
            $this->success('操作成功！');
        }
        $this->assign('person_fieldset', json_encode($person_fieldset));
        $this->assign('organize_fieldset', json_encode($organize_fieldset));
        $this->view->assign('row', $row);
        return $this->view->fetch('organize');
    }

    public function del($ids = null)
    {
        return;
    }



    public function add()
    {
        return;
    }


}
