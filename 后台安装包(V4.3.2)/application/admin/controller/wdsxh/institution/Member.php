<?php

namespace app\admin\controller\wdsxh\institution;


use app\common\controller\Backend;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 机构成员
 *
 * @icon fa fa-circle-o
 */
class Member extends Backend
{

    /**
     * Member模型对象
     * @var \app\admin\model\wdsxh\institution\Member
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\institution\Member;
        $this->assign('date',date('Y-m-d'));

        $param = $this->request->get();

        $institution_id = isset($param['institution_id']) ? $param['institution_id'] : '';
        $this->assign('institution_id',$institution_id);
        $this->assignconfig('institution_id',$institution_id);

        $level_id = isset($param['level_id']) ? $param['level_id'] : '';
        $this->assign('level_id',$level_id);
        $this->assignconfig('level_id',$level_id);
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
                $this->model = $this->model->where(config('database.prefix').'wdsxh_institution_member.institution_id',$institution_id);
            }
            $level_id = $this->request->get('level_id');
            if (!empty($level_id)) {
                $this->model = $this->model->where('level_id',$level_id);
            }
            $list = $this->model
                    ->with(['institution','level','usermember'])
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            $date = date('Y-m-d');
            foreach ($list as $row) {
                if ($row->usermember->expire_time < $date) {
                    $row->member_expire_status = 2;
                } else {
                    $row->member_expire_status = 1;
                }
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 添加
     *
     * @return string
     * @throws \think\Exception
     */
    public function add()
    {
        if (false === $this->request->isPost()) {
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);

        if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
            $params[$this->dataLimitField] = $this->auth->id;
        }

        if ($this->model->where('institution_id',$params['institution_id'])
        ->where('member_id',$params['member_id'])->find()) {
            $this->error('已添加成员');
        }
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
                $this->model->validateFailException()->validate($validate);
            }
            $result = $this->model->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($result === false) {
            $this->error(__('No rows were inserted'));
        }
        $this->success();
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

        $count = 0;
        $institutionMemberApplyModel = new \app\admin\model\wdsxh\institution\InstitutionMemberApply();
        Db::startTrans();
        try {
            foreach ($list as $item) {
                $institutionMemberApplyModel->where('institution_id',$item['institution_id'])
                    ->where('level_id',$item['level_id'])
                    ->where('wechat_id',$item['wechat_id'])
                    ->where('member_id',$item['member_id'])
                    ->delete();
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
