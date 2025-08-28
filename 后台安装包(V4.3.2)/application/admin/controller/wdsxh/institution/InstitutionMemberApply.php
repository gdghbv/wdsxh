<?php

namespace app\admin\controller\wdsxh\institution;

use app\common\controller\Backend;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 机构成员申请
 *
 * @icon fa fa-circle-o
 */
class InstitutionMemberApply extends Backend
{

    /**
     * InstitutionMemberApply模型对象
     * @var \app\admin\model\wdsxh\institution\InstitutionMemberApply
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\institution\InstitutionMemberApply;
        $this->view->assign("stateList", $this->model->getStateList());
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

            $list = $this->model
                    ->with(['institution','level','usermember'])
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
     * Desc 处理
     * Create on 2025/8/5 8:55
     * Create by wangyafang
     */
    public function handle($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $row = $this->model->get($ids);
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }

        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }

        if (empty($params['state'])) {
            $this->error('请选择审核状态');
        }

        if ($row['state'] == '2') {
            $this->error('已审核');
        }

        if ($params['state'] == 2) {
            $this->pass($row);
        } else {
            if (empty($params['reject'])) {
                $this->error('请填写驳回原因');
            }
            $this->reject($row,$params);
        }
    }

    /**
     * Desc 驳回
     * Create on 2025/7/28 16:50
     * Create by wangyafang
     */
    protected function reject($row,$params)
    {
        $result = false;
        Db::startTrans();
        try {
            $handleData = array(
                'handle_time'=>time(),
                'state'=>$params['state'],
                'reject'=>$params['reject'],
            );
            $result = $row->save($handleData);
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
     * Desc 通过
     * Create on 2025/7/28 16:51
     * Create by wangyafang
     */
    protected function pass($row)
    {
        $institutionMemberModel = new \app\admin\model\wdsxh\institution\Member();
        $result = false;
        Db::startTrans();
        try {
            $handleData = array(
                'handle_time'=>time(),
                'state'=>'2',
            );
            $result = $row->save($handleData);
            $institutionMemberModel->data([
                'institution_id'  =>  $row['institution_id'],
                'wechat_id'  =>  $row['wechat_id'],
                'member_id'  =>  $row['member_id'],
                'level_id'  =>  $row['level_id'],
                'introduction'  =>  $row['introduction'],
            ]);
            $institutionMemberModel->save();
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

    public function recyclebin($ids = null)
    {
        return;
    }

    public function restore($ids = null)
    {
        return;
    }

    public function destroy($ids = null)
    {
        return;
    }

}
