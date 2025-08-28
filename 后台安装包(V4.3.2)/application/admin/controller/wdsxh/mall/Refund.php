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

namespace app\admin\controller\wdsxh\mall;

use app\admin\model\wdsxh\mall\OrderRefundLog;
use app\admin\model\wdsxh\user\Wechat;
use app\common\controller\Backend;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\response\Json;
use Exception;

/**
 * 订单退款管理
 *
 * @icon fa fa-circle-o
 */
class Refund extends Backend
{

    /**
     * Refund模型对象
     * @var \app\admin\model\wdsxh\mall\Refund
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\mall\Refund;

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
            ->order($sort, $order)
            ->paginate($limit);
        foreach ($list as $item){
            $item->order_no = (new \app\admin\model\wdsxh\mall\Order())->where('id',$item['order_id'])->value('order_no');
            $item->real_name = (new \app\admin\model\wdsxh\mall\Order())->where('id',$item['order_id'])->value('real_name');
            $item->refund_status = (new \app\admin\model\wdsxh\mall\Order())->where('id',$item['order_id'])->value('refund_status');
        }
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    /**
     * 通过
     */
    public function three_adopt($ids = null){
        $row = $this->model->get($ids);
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
        $order = (new \app\admin\model\wdsxh\mall\Order())->where('id',$row['order_id'])->find();
        if ($order['state'] == 2){
            $refundSn=wdsxh_create_order();
            $res=\addons\wdsxh\library\Wxapp::payRefund($order->order_no,$refundSn,$order->pay_price,array('refund_desc'=>'退款'));
            if($res && $res['return_code'] == 'SUCCESS' && $res['result_code'] == 'SUCCESS'){
                $order->complete_time=time();
                $order->state='-2';
                $order->refund_status='5';
                $order->save();
                $row->refund_time=time();
                $row->save();
                $this->success('退款操作成功');
            }else{
                $this->error('退款失败,错误信息：'.$res['err_code_des']);
            }
        }else{
            $result = false;
            Db::startTrans();
            try {
                //是否采用模型验证
                if ($this->modelValidate) {
                    $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                    $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                    $row->validateFailException()->validate($validate);
                }
                $params['refund_status'] = 3;
                $result =  (new \app\admin\model\wdsxh\mall\Order())->allowField(true)->where('id',$row['order_id'])->update($params);
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

    /**
     * 驳回
     */
    public function three_reject($ids = null){
        $row = $this->model->get($ids);
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
            $params['refund_status'] = 1;
            $params['state'] = $row['state'];
             (new \app\admin\model\wdsxh\mall\Order())->allowField(true)->where('id',$row['order_id'])->update($params);
            $result = $row->delete();
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


    //退款
    public function refund($ids = null){
        $data = $this->model->get($ids);
        if(!$data){
            $this->error('退款信息不存在');
        }
        $user=Wechat::where('id',$data->wechat_id)->field('applet_openid')->find();
        if(!$user){
            $this->error('用户信息不存在');
        }
        $mep = array(
            'wechat_id'=>$data->wechat_id,
            'refund_status' =>'4',
            'id'=>$data->order_id,
        );
        $order = \app\admin\model\wdsxh\mall\Order::where($mep)->find();
        $refundModel = \app\admin\model\wdsxh\mall\Refund::where('id',$data->id)->find();
        if(!$order){
            $this->error('支付订单信息不存在');
        }
        $refundLogModel = [
            'order_sn' => $order['order_no'],
            'refund_sn'=>$data['refund_express_no'],
            'order_id' =>$order['id'],
            'status' => -1,
            'pay_fee'=>$order['pay_price'],
            'refund_fee' =>$order['refund_price'],
            'createtime'=> time()
        ];
        $refundSn=wdsxh_create_order();
            $res=\addons\wdsxh\library\Wxapp::payRefund($order->order_no,$refundSn,$order->pay_price,array('refund_desc'=>'退款'));
        if($res && $res['return_code'] == 'SUCCESS' && $res['result_code'] == 'SUCCESS'){
            $order->complete_time=time();
            $order->state='-2';
            $order->refund_status='5';
            $order->save();
            $refundModel->refund_time=time();
            $refundModel->save();
            $this->success('退款操作成功');
        }else{
            (new OrderRefundLog())->save($refundLogModel);
            $this->error('退款失败,错误信息：'.$res['err_code_des']);
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


}
