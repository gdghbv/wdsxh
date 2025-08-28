<?php

namespace app\admin\controller\wdsxh\institution;

use app\common\controller\Backend;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use Exception;

/**
 * 机构级别
 *
 * @icon fa fa-circle-o
 */
class Level extends Backend
{

    /**
     * Level模型对象
     * @var \app\admin\model\wdsxh\institution\Level
     */
    protected $model = null;

    protected $searchFields = 'id,level_name';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\institution\Level;

        $param = $this->request->get();
        
        $institution_id = isset($param['institution_id']) ? $param['institution_id'] : '';
        $this->assign('institution_id',$institution_id);
        $this->assignconfig('institution_id',$institution_id);
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $institution_id = $this->request->get('institution_id');
            if (!empty($institution_id)) {
                $this->model = $this->model->where('institution_id',$institution_id);
            }

            $list = $this->model
                    ->with(['institution'])
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            foreach ($list as $row) {
                
                
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

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

        $memberModel = new \app\admin\model\wdsxh\institution\Member();
        foreach ($list as $item) {
            $memberCount = $memberModel->where('level_id',$item['id'])->count();
            if ($memberCount) {
                $this->error('级别：'.$item['level_name'].'，有成员，无法删除');
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

}
