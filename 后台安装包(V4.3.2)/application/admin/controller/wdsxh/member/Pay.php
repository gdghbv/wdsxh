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

namespace app\admin\controller\wdsxh\member;

use app\admin\model\wdsxh\member\MemberApply;
use app\common\controller\Backend;

/**
 * 会员缴费记录
 *
 * @icon fa fa-circle-o
 */
class Pay extends Backend
{

    /**
     * Pay模型对象
     * @var \app\admin\model\wdsxh\member\Pay
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\member\Pay;
        $this->view->assign("paidList", $this->model->getPaidList());
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
                    ->where('pay_method','in',['2','3','4'])
                    ->with(['level','wechat','member'])
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            $memberApplyModel = new MemberApply();
            foreach ($list as $row) {
                if ($row['pay_method'] == '3') {
                    $row->pay_voucher = $memberApplyModel->where('wechat_id',$row['wechat_id'])->value('pay_voucher');
                }
                if ($row['pay_method'] == '2') {
                    $row->pay_voucher = '/assets/addons/wdsxh/img/wechat_pay.png';
                }
            }

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
