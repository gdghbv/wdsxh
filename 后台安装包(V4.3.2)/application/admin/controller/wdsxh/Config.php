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

namespace app\admin\controller\wdsxh;
use Exception;
use app\common\controller\Backend;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 系统配置
 *
 * @icon fa fa-circle-o
 */
class Config extends Backend
{

    /**
     * Config模型对象
     * @var \app\admin\model\wdsxh\Config
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\Config;
        $this->view->assign("organizeList", $this->model->getOrganizeList());
        $this->view->assign("jumpTypeList", $this->model->getJumpTypeList());
        $this->view->assign("securityTextSwitchList", $this->model->getSecurityTextSwitchList());//todo 腾讯校验增加开关
        $this->view->assign("DeliveryManagementList", $this->model->getDeliveryManagementList());
    }

    public function index(){
        $row = $this->model->get(1);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        // 新增后端必填校验
        if (empty($params['organize'])) {
            $this->error('适用组织不能为空');
        }
        if (empty($params['share_title'])) {
            $this->error('分享标题不能为空');
        }
        $params = $this->preExcludeFields($params);
        if (isset($params['jump_type'])) {
            $jump_type = $params['jump_type'];
            if ($jump_type == 2 && empty($params['call_mobile'])) {
                $this->error('请输入拨打的电话');
            }
            if ($jump_type == 3 && empty($params['jump_link'])) {
                $this->error('请输入外部链接');
            }
            if ($jump_type == 2) {
                $params['jump_link'] = '';
            }
            if ($jump_type == 3) {
                $params['call_mobile'] = '';
            }
            if ($jump_type == 1) {
                $params['jump_link'] = '';
                $params['call_mobile'] = '';
            }
        } else {
            $params['jump_link'] = '';
            $params['call_mobile'] = '';
        }
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $result = $row->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $this->success();
    }


    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

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
