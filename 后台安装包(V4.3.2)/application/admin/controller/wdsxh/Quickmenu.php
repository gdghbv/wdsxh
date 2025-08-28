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

use app\common\controller\Backend;
use Exception;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 快速导航
 *
 * @icon fa fa-circle-o
 */
class Quickmenu extends Backend
{

    /**
     * Quickmenu模型对象
     * @var \app\admin\model\wdsxh\Quickmenu
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\Quickmenu;
        $this->view->assign("skipTypeList", $this->model->getSkipTypeList());
        $this->view->assign("statusList", $this->model->getStatusList());
    }

    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = false;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model

                ->where($where)
                ->order($sort, $order)
                ->paginate($limit);

            foreach ($list as $row) {
                $row->visible(['id','name','icon','skip_type','weigh','status','createtime']);

            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

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
        switch ($params['skip_type']){
            case 1:
                if(empty($params['path'])){
                    $this->error('页面路径不能为空');
                }
                if(stripos($params['path'],'?') !== false){
                    $params['content']=$params['path'].'&'.$params['param'];
                }else{
                    $params['content']=$params['path'].'?'.$params['param'];
                }
                break;
            case 2:
                if(empty($params['content'])){
                    $this->error('图文内容不能为空');
                }
                break;
            case 3:
                if(empty($params['wxapp']['appid'])){
                    $this->error('小程序Appid不能为空');
                }
                if(empty($params['wxapp']['path'])){
                    $this->error('小程序页面路径不能为空');
                }
                $params['content']=json_encode(array('appid'=>$params['wxapp']['appid'],'path'=>$params['wxapp']['path']));
                break;
            case 4:
                if(empty($params['url'])){
                    $this->error('外部链接不能为空');
                }
                $params['content']=trim($params['url']);
                break;
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
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $row=$row->toArray();
            switch ($row['skip_type']){
                case 1:
                    $temp=explode('?',$row['content']);
                    $row['path']=$temp['0'];
                    $row['param']=empty($temp['1'])?null:$temp['1'];
                    $row['content']=null;
                    break;
                case 3:
                    $temp=json_decode($row['content'],true);
                    $row['wxapp']['appid']=$temp['appid'];
                    $row['wxapp']['path']=$temp['path'];
                    $row['content']=null;
                    break;
                case 4:
                    $row['url']= $row['content'];
                    $row['content']=null;
                    break;
            }
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        switch ($params['skip_type']){
            case 1:
                if(empty($params['path'])){
                    $this->error('页面路径不能为空');
                }
                if(stripos($params['path'],'?') !== false){
                    $params['content']=empty($params['param'])?$params['path']:$params['path'].'&'.$params['param'];
                }else{
                    $params['content']=empty($params['param'])?$params['path']:$params['path'].'?'.$params['param'];
                }
                break;
            case 2:
                if(empty($params['content'])){
                    $this->error('图文内容不能为空');
                }
                break;
            case 3:
                if(empty($params['wxapp']['appid'])){
                    $this->error('小程序Appid不能为空');
                }
                if(empty($params['wxapp']['path'])){
                    $this->error('小程序页面路径不能为空');
                }
                $params['content']=json_encode(array('appid'=>$params['wxapp']['appid'],'path'=>$params['wxapp']['path']));
                break;
            case 4:
                if(empty($params['url'])){
                    $this->error('外部链接不能为空');
                }
                $params['content']=trim($params['url']);
                break;
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


}
