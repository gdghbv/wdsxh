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

namespace app\admin\controller\wdsxh\user;

use app\common\controller\Backend;
use Exception;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 微信管理
 *
 * @icon fa fa-circle-o
 */
class Wechat extends Backend
{

    /**
     * Wechat模型对象
     * @var \app\admin\model\wdsxh\user\Wechat
     */
    protected $model = null;
    protected $userModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\user\Wechat;
        $this->userModel = new \app\admin\model\User();
        $this->view->assign("setAdminList", $this->model->getSetAdminList());
        $this->view->assign("channelList", $this->model->getChannelList());
    }


    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    public function pass_through($ids = null){
        $row = $this->model->where('user_id',$ids)->find();
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
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }

            $params['set_admin'] = 1;
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



    public function cancellation($ids = null){
        $row = $this->model->where('user_id',$ids)->find();
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
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $params['set_admin'] = 2;
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
     * 普通用户列表
     */
    public function user()
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
            $parent_wechat_id = $this->request->get('wechat_id');
            // 添加输入验证，防止SQL注入
            if (empty($parent_wechat_id)) {
                $result = array("total" => 0, "rows" => []);
                return $result;
            }

            $memberModel = new \app\admin\model\wdsxh\Member();
            $all_id_array = $this->model->where('parent_wechat_id', $parent_wechat_id)->column('id');

            // 防止空数组导致的SQL语法错误
            if (empty($all_id_array)) {
                $result = array("total" => 0, "rows" => []);
                return $result;
            }

            $member_wechat_id_array = $memberModel->where('wechat_id', 'in', $all_id_array)->column('wechat_id');

            $user_id_array = array_diff($all_id_array, $member_wechat_id_array);

            // 防止空数组导致的SQL语法错误
            if (empty($user_id_array)) {
                $result = array("total" => 0, "rows" => []);
                return $result;
            }

            $list = $this->model->where('id', 'in', $user_id_array)->order('id desc')
                ->where($where)
                ->field("id,nickname,avatar,createtime")->paginate($limit);

            $result = array("total" => $list->total(), "rows" => $list->items());


            return json($result);
        }
        return $this->view->fetch();
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
