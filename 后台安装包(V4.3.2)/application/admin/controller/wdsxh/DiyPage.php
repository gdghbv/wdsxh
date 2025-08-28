<?php

namespace app\admin\controller\wdsxh;

use app\admin\model\wdsxh\article\Article;
use app\common\controller\Backend;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

/**
 * 首页diy
 *
 * @icon fa fa-circle-o
 */
class DiyPage extends Backend
{

    /**
     * DiyPage模型对象
     * @var \app\admin\model\wdsxh\DiyPage
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\DiyPage;
        $this->view->assign("statusList", $this->model->getStatusList());
    }



    public function add()
    {
        if (false === $this->request->isPost()) {
            $defaultData = json_encode($this->model->getDefaultStyle($this->request->scheme()));
            $jsonPageData    = json_encode(['page' => $this->model->getDefaultPageData(), 'items' => []]);
            $this->assign('defaultData',$defaultData);
            $this->assign('jsonPageData',$jsonPageData);
            $article_list = (new Article())->where('status','1')->order('weigh desc,id desc')->field('title,image')->limit(3)->select();
            foreach ($article_list as &$v) {
                $v->image = wdsxh_full_url($v->image);
            }
            $this->assign('article_list',$article_list);
            return $this->view->fetch();
        }
        $post = $this->request->post('data');
        if (empty($post)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
            $params[$this->dataLimitField] = $this->auth->id;
        }
        $result = false;
        $count = $this->model->count();
        $post = json_decode($post,true);
        $page_name = $post['page']['params']['name'];
        $post = json_encode($post);
        if ($count > 0){
            $params = [
                'status' => 'custom',
                'page_name' => $page_name,
                'page_data' => $post
            ];
        }else{
            $params = [
                'status' => 'home',
                'page_name' => $page_name,
                'page_data' => $post
            ];
        }

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
        $this->success('添加成功');
    }

    /**
     * 编辑
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function edit($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }

        if (!$this->request->isAjax()) {
            $defaultData = json_encode($this->model->getDefaultStyle($this->request->scheme()));
            $jsonPageData    = $row['page_data'];
            $this->assign('defaultData',$defaultData);
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
        $page_name = $post['page']['params']['name'];
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
        $list['Inlay']['list'] = [];

        $pagelist = $this->model->getInlayList();
        foreach ($pagelist as $k => $v) {
            array_push($list['Inlay']['list'], ['id' => $v['id'], 'title' => $v['page_name'], 'path' => '/pages/diy/index?page_id=' . $v['id']]);
        }
        $result = array("rows" => $list);
        return json($result);
    }

    /**
     * 选择文章分类
     */
    public function get_article_category()
    {
        $list = $this->model->getArticleCategory();
        $result = array("rows" => $list);
        return json($result);
    }

    /**
     * 选择供需分类
     */
    public function get_demand_category()
    {
        $list = $this->model->getDemandCategory();
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

    /**
     * 设为首页
     */
    public function set_home()
    {
        $id = $this->request->param('ids');
        $result = false;
        $where['id'] = array('not in',[$id]);
        Db::startTrans();
        try {
            $this->model->where('id',$id)->update([
                'status'=>'home',
            ]);
            $result = $this->model->where($where)->update([
                'status'=>'custom',
            ]);
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
     * 设置首页模式
     */
    public function select_home_mode(){
        $row = (new \app\admin\model\wdsxh\Config())->get(1);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $this->view->assign('row', $row);
            $this->view->assign("select_home_mode", ['1' => __('固定样式'), '2' => __('装修自定义')]);
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

        $count = $this->model->count();
        if ($count == 1) {
            $this->error('装修页面至少要保留一个');
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
