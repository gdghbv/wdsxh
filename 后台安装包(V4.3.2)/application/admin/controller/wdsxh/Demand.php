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

use app\admin\model\wdsxh\user\Wechat;
use app\common\controller\Backend;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\response\Json;

/**
 * 需求反馈
 *
 * @icon fa fa-circle-o
 */
class Demand extends Backend
{

    /**
     * Demand模型对象
     * @var \app\admin\model\wdsxh\Demand
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\Demand;
        $this->view->assign("isAnonymityList", $this->model->getIsAnonymityList());
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
            ->with(['wechat'])
            ->order($sort, $order)
            ->paginate($limit);
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    public function details($ids = null){
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $row['nickname'] = (new Wechat())->where('id',$row['wechat_id'])->value('nickname');
            if ($row['image']){
                $row['image'] = wdsxh_full_url($row['image']);
            }
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }

    }

    public function multi($ids = null)
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

    /**
     * Desc 处理
     * Create on 2025/3/12 16:47
     * Create by wangyafang
     */
    public function processing($ids=null){
        $demandObj = $this->model->get($ids);
        if ($demandObj['status'] == 1) {
            $this->error('已处理');
        }
        try {
            $demandObj->status = 1;
            $demandObj->processing_time = time();
            $demandObj->save();
            $this->success('操作成功');
        } catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }
    }




}
