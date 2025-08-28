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

namespace app\admin\controller\wdsxh\activity;

use app\admin\model\wdsxh\activity\Order;
use app\api\model\wdsxh\activity\ActivityApplyRecord;
use app\common\controller\Backend;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 活动报名
 *
 * @icon fa fa-circle-o
 */
class ActivityApply extends Backend
{

    /**
     * ActivityApply模型对象
     * @var \app\admin\model\wdsxh\activity\ActivityApply
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\activity\ActivityApply;
        $this->view->assign("stateList", $this->model->getStateList());
        $this->view->assign("isSignInList", $this->model->getIsSignInList());
        $param = $this->request->get();
        $activity_id = isset($param['activity_id']) ? $param['activity_id'] : '';
        $this->assign('activity_id',$activity_id);
        $this->assignconfig('activity_id',$activity_id);
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
            $activitiIdWhere = [];
            $param = $this->request->get();
            if(isset($param['activity_id']) && !empty($param['activity_id'])) {
                $activitiIdWhere[config('database.prefix').'wdsxh_activity.id'] = array('eq',$param['activity_id']);
            }
            $list = $this->model
                   ->where($activitiIdWhere)
                    ->with(['activity','wechat'])//todo 活动创建后，会员功能对外功能不可用，非会员无法报名
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            $orderModel = new Order();
            foreach ($list as $row) {
                $row->order_no = $orderModel
                    ->where('activity_id',$row['activity_id'])
                    ->where('apply_id',$row['id'])
                    ->where('wechat_id',$row['wechat_id'])
                    ->value('order_no');
                if (!empty($row['name'])) {
                    $row->show_field_data = 1;
                    $row->wechat->nickname = $row['name'];
                    $row->wechat->mobile = $row['mobile'];
                } else {
                    $row->show_field_data = 2;
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
        $activityObj = (new \app\admin\model\wdsxh\activity\Activity())->where('id',$params['activity_id'])->find();
        if (empty($activityObj)) {
            $this->error('活动不存在');
        }
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\admin\model\wdsxh\member\Member())->where('wechat_id',$params['wechat_id'])
            ->where('expire_time','>=',$current_date)
            ->find();
        if ($activityObj['non_member_registration_status'] == '2' && !$memberObj) {
            $this->error('只有会员才能报名');
        }
        if ($activityObj['apply_time'] < time()) {
            $this->error('活动报名时间已过，无法报名');
        }
        if ($activityObj['state'] == '2') {
            $this->error('活动进行中，无法报名');
        }
        if ($activityObj['state'] == '3') {
            $this->error('活动已结束，无法报名');
        }
        $queryActivityApplyObj = (new \app\admin\model\wdsxh\activity\ActivityApply())
            ->where('activity_id',$params['activity_id'])
            ->where('wechat_id',$params['wechat_id'])
            ->where('state','<>','4')
            ->find();
        if ($queryActivityApplyObj) {
            $this->error('用户后台已添加或者小程序已报名，请勿重复添加！');
        }

        if (!empty($activityObj['apply_limit_number']) && $activityObj['apply_limit_number'] > 0) {
            $apply_count = $this->model->where('activity_id', $params['activity_id'])
                ->where('state',2)
                ->count();
            if ($apply_count >= $activityObj['apply_limit_number']) {
                $this->error('活动报名人数已满，无法报名');
            }
        }

        if ($activityObj['is_verifying'] == '1') {//活动是否核销:1=是,2=否
            $is_sign_in = 2;
        } else {
            $is_sign_in = 3;//签到:1=已签到,2=未签到,3=无需签到
        }
        $member_id = $memberObj ? $memberObj->id : 0;
        $orderModel = new Order();
        $avtivityApplyRecordModel = new ActivityApplyRecord();
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
                $this->model->validateFailException()->validate($validate);
            }
            $apply_data = array(
                'activity_id'=> $params['activity_id'],
                'wechat_id' => $params['wechat_id'],
                'member_id'=>$member_id,
                'is_sign_in'=>$is_sign_in,
                'state'=>'2',
                'createtime' => time(),
            );
            $this->model->data($apply_data);
            $result = $this->model->allowField(true)->save();

            $order_data = array(
                'activity_id'=> $params['activity_id'],
                'apply_id'=> $this->model->id,
                'wechat_id' => $params['wechat_id'],
                'member_id'=>$member_id,
                'order_no'=> wdsxh_create_order(),
                'pay_amount'=>$activityObj['fees'],
                'channel'=>'3',
                'paid'=>'2',
                'pay_time' => time(),
                'complete_time' => date('Y-m-d H:i:s',time()),
                'createtime' => time(),
            );

            $orderModel->data($order_data);
            $orderModel->allowField(true)->save();

            $avtivity_apply_record_data = array(
                'activity_id'=> $params['activity_id'],
                'wechat_id' => $params['wechat_id'],
                'member_id'=>$member_id,
            );
            $avtivityApplyRecordModel->data($avtivity_apply_record_data);
            $avtivityApplyRecordModel->allowField(true)->save();

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



    /**
     * 报名信息
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function field_data_details($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $custom_content = json_decode($row['field_data'],true);
        $row['custom_content'] = $custom_content;

        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
    }

}
