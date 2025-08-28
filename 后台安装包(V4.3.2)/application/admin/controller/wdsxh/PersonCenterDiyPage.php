<?php

namespace app\admin\controller\wdsxh;

use app\common\controller\Backend;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

/**
 * 首页diy
 *
 * @icon fa fa-circle-o
 */
class PersonCenterDiyPage extends Backend
{

    /**
     * PersonCenterDiyPage模型对象
     * @var \app\admin\model\wdsxh\PersonCenterDiyPage
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\PersonCenterDiyPage;
        $this->view->assign("statusList", $this->model->getStatusList());
    }

    public function index()
    {
        $row = $this->model->get(1);
        if (!$row) {
            $this->error(__('No Results were found'));
        }

        if (!$this->request->isAjax()) {
            $jsonPageData = $row['page_data'];
            if (empty($jsonPageData)) {
                $jsonPageData = json_encode($this->model->getDefaultPageData());
            }
            $this->assign('jsonPageData',$jsonPageData);
            return $this->view->fetch();
        }

        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $post = $this->request->post('data');
        if (empty($post)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $post = json_decode($post,true);
        $page_name = $post['pageTitle'];
        $post = json_encode($post);
        $params['page_data'] = $post;
        $params['page_name'] = $page_name;
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
        $this->success('修改成功');
    }

    /**
     * 选择URL
     */
    public function select_url_pro()
    {
        $list = $this->model->getLinkUrl();

        $result = array("rows" => $list);
        return json($result);
    }

    /**
     * 显示富文本
     */
    public function editor()
    {
        return $this->view->fetch();
    }



    public function add()
    {
        return;
    }

    public function del($ids = null)
    {
        return;
    }

    public function multi($ids = NULL)
    {
        return;
    }
}
