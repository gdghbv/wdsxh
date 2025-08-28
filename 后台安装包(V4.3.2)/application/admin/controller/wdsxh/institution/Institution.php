<?php

namespace app\admin\controller\wdsxh\institution;

use app\admin\model\wdsxh\institution\InstitutionConfig;
use app\common\controller\Backend;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use Exception;
use think\exception\ValidateException;

/**
 * 机构列管理
 *
 * @icon fa fa-circle-o
 */
class Institution extends Backend
{

    /**
     * Institution模型对象
     * @var \app\admin\model\wdsxh\institution\Institution
     */
    protected $model = null;
    protected $modelConfig = null;

    protected $searchFields = 'id,name';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\institution\Institution;
        $this->modelConfig = new InstitutionConfig();
        $this->view->assign("statusList", $this->model->getStatusList());
        $this->view->assign("IsStatusList", $this->modelConfig->getIsStatusList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    /**
     * 删除
     *
     * @param $ids
     * @return void
     * @throws DbException
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     */
    public function del($ids = null)
    {
        if (false === $this->request->isPost()) {
            $this->error(__("Invalid parameters"));
        }
        $ids = $ids ?: $this->request->post("ids");
        if (empty($ids)) {
            $this->error(__('Parameter %s can not be empty', 'ids'));
        }
        $pk = $this->model->getPk();
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            $this->model->where($this->dataLimitField, 'in', $adminIds);
        }
        $list = $this->model->where($pk, 'in', $ids)->select();

        $levelModel = new \app\admin\model\wdsxh\institution\Level();
        $memberModel = new \app\admin\model\wdsxh\institution\Member();
        foreach ($list as $item) {
            $levelCount = $levelModel->where('institution_id',$item['id'])->count();
            if ($levelCount) {
                $this->error('机构：'.$item['name'].'，有等级，无法删除');
            }
            unset($levelCount);
            
            $memberCount = $memberModel->where('institution_id',$item['id'])->count();
            if ($memberCount) {
                $this->error('机构：'.$item['name'].'，有成员，无法删除');
            }
            unset($memberCount);
        }

        $count = 0;
        Db::startTrans();
        try {
            foreach ($list as $item) {
                $count += $item->delete();
            }
            Db::commit();
        } catch (PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($count) {
            $this->success();
        }
        $this->error(__('No rows were deleted'));
    }

    public function institution_config(){
        $row = $this->modelConfig->get(1);
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
        $params = $this->preExcludeFields($params);
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->modelConfig));
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


}
