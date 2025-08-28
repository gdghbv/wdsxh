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

namespace app\admin\controller\wdsxh\member\apply;

use addons\wdsxh\library\AlibabaCloudSms;
use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\member\Cert;
use app\admin\model\wdsxh\member\FeesConfig;
use app\admin\model\wdsxh\member\Level;
use app\admin\model\wdsxh\member\Member;
use app\admin\model\wdsxh\member\MemberApply;
use app\admin\model\wdsxh\member\Pay;
use app\api\model\wdsxh\business\Association;
use app\common\controller\Backend;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

/**
 * 入会申请
 *
 * @icon fa fa-circle-o
 */
class Apply extends Backend
{


    protected $model = null;
    protected $domain = null;


    public function _initialize()
    {
        parent::_initialize();
        $this->model = new MemberApply();
        $this->view->assign("typeList", $this->model->getTypeList());
        $this->view->assign("stateList", $this->model->getStateExamineList());
        $domain = cdnurl('',true);
        $this->assign('domain',$domain);
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    /**
     * 入会审核
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function examine($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        if (!isset($row['type'])) {
            $this->error('参数错误');
        }
        switch ($row['type']) {
            case '1':
                $custom_content = json_decode($row['custom_content'],true);
                $row['custom_content'] = $custom_content;
                break;
            case '2':
                $custom_content = json_decode($row['custom_content'],true);
                $this->assign('person_fieldset',$custom_content['person']);
                $this->assign('company_fieldset',$custom_content['company']);
                break;
            case '3':
                $custom_content = json_decode($row['custom_content'],true);
                $this->assign('person_fieldset',$custom_content['person']);
                $this->assign('organize_fieldset',$custom_content['organize']);
                break;
        }



        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            if ($row['state'] == '2') {
                $memberPayObj = (new Pay())->where('wechat_id',$row['wechat_id'])
                    ->where('paid','2')
                    ->order('id desc')
                    ->field('pay_method,fees')
                    ->find();
                $row['pay'] = $memberPayObj;
            }
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }

        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        if (!isset($params['state'])) {
            $this->error('请选择审核状态');
        }
        if ($params['state'] == 3 && empty($params['reject'])) {
            $this->error('请填写驳回原因');
        }
        $params = $this->preExcludeFields($params);
        $row = $this->model->get($ids);
        switch ($row['type']) {
            case '1':
                $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],$row['custom_content'],$params);
                break;
            case '2':
                $tem_decode_json_custom_content = json_decode($row['custom_content'],true);
                $params['custom_content'] = array_merge($params['person'],$params['company']);
                $params['custom_content']['mobile'] = $row['mobile'];
                $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],json_encode($tem_decode_json_custom_content['person']),$params,json_encode($tem_decode_json_custom_content['company']));
                break;
            case '3':
                $tem_decode_json_custom_content = json_decode($row['custom_content'],true);
                $params['custom_content'] = array_merge($params['person'],$params['organize']);
                $params['custom_content']['mobile'] = $row['mobile'];
                $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],json_encode($tem_decode_json_custom_content['person']),$params,'',json_encode($tem_decode_json_custom_content['organize']));
                break;
        }
        $params['address'] = json_encode(array(
            'address'=>$params['address'],
            'latitude'=>$params['latitude'],
            'longitude'=>$params['longitude'],
        ));
        if ($params['state'] == '2') {
            $this->pass($row,$params);
        } else {
            $this->reject($row,$params);
        }

    }

    /**
     * 线下审核
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function offline_examine($ids = null)
    {
        $row = $this->model->get($ids);
        switch ($row['type']) {
            case '1':
                $custom_content = json_decode($row['custom_content'],true);
                $row['custom_content'] = $custom_content;
                break;
            case '2':
                $custom_content = json_decode($row['custom_content'],true);
                $this->assign('person_fieldset',$custom_content['person']);
                $this->assign('company_fieldset',$custom_content['company']);
                break;
            case '3':
                $custom_content = json_decode($row['custom_content'],true);
                $this->assign('person_fieldset',$custom_content['person']);
                $this->assign('organize_fieldset',$custom_content['organize']);
                break;
        }
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

        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        if (!isset($params['state'])) {
            $this->error('请选择审核状态');
        }
        if ($params['state'] == 3 && empty($params['reject'])) {
            $this->error('请填写驳回原因');
        }
        $params = $this->preExcludeFields($params);
        $row = $this->model->get($ids);
        switch ($row['type']) {
            case '1':
                $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],$row['custom_content'],$params);
                break;
            case '2':
                $tem_decode_json_custom_content = json_decode($row['custom_content'],true);
                $params['custom_content'] = array_merge($params['person'],$params['company']);
                $params['custom_content']['mobile'] = $row['mobile'];
                $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],json_encode($tem_decode_json_custom_content['person']),$params,json_encode($tem_decode_json_custom_content['company']));
                break;
            case '3':
                $tem_decode_json_custom_content = json_decode($row['custom_content'],true);
                $params['custom_content'] = array_merge($params['person'],$params['organize']);
                $params['custom_content']['mobile'] = $row['mobile'];
                $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],json_encode($tem_decode_json_custom_content['person']),$params,'',json_encode($tem_decode_json_custom_content['organize']));
                break;
        }
        $params['address'] = json_encode(array(
            'address'=>$params['address'],
            'latitude'=>$params['latitude'],
            'longitude'=>$params['longitude'],
        ));
        if ($params['state'] == '2') {
            $this->offline_pass($row,$params);
        } else {
            $this->offline_reject($row,$params);
        }

    }

    /**
     * Desc  通过
     * Create on 2024/3/7 15:56
     * Create by wangyafang
     */
    protected function pass($row = '',$params = [])
    {
        $feesConfigObj = (new FeesConfig())->where('id',1)->find();
        $params = array_merge($row->toArray(),$params);
        $member_data = \app\common\model\wdsxh\member\Member::get_member_data($params);
        $memberModel = new Member();
        $memberObj = $memberModel->where('wechat_id',$row['wechat_id'])->find();
        $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
        $params['examine_role'] = 1;
        $params['examine_admin_id'] = $this->auth->id;
        $params['examine_time'] = time();
        if ($feesConfigObj['pay_method'] == 1) {//免费入会
            $params['state'] = '2';//已通过
            $params['child_state'] = '6';//已通过
            $result = false;
            $member_data['pay_method'] = 1;

            Db::startTrans();
            try {
                $result = $row->allowField(true)->save($params);
                Db::commit();
            } catch (ValidateException|PDOException|Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            if (false === $result) {
                $this->error(__('No rows were updated'));
            }
            if ($memberObj) {
                $memberObj->expire_time = $member_data['expire_time'];
                $memberObj->save();
            } else {
                $memberModel->data($member_data);
                $memberModel->allowField(true)->save();
                $cert_data = \app\common\model\wdsxh\Cert::get_cert_data($row['type'],$row,$memberModel->id);
                if(!empty($cert_data)) {
                    $certModel = new Cert();
                    $certModel->saveAll($cert_data);
                }
            }
            if ($row['channel'] == '1') {
                //入会审核成功通知
                try {
                    $data = [
                        'thing1' => [
                            'value' => $row['name'],
                        ],
                        'time3' => [
                            'value' => date('Y-m-d H:i:s'),
                        ],
                        'phrase4' => [
                            'value' => '审核通过',
                        ],
                        'thing5' => [
                            'value' => '恭喜成功加入会员',
                        ],
                    ];
                    $result = Wxapp::subscribeMessage($conf['applet_initiation_audit'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
                } catch (\think\Exception $e) {
                    $this->error($e->getMessage());
                }
                //入会申请成功通知
                $businessAssociationObj = (new Association())->get(1);
                try {
                    $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
                    $data = [
                        'thing3' => [
                            'value' => mb_substr($businessAssociationObj['name'], 0, 20)
                        ],
                        'time2' => [
                            'value' => date('Y-m-d H:i:s'),
                        ],
                        'thing1' => [
                            'value' => mb_substr('恭喜您已成功加入' . $businessAssociationObj['name'], 0, 20),
                        ]
                    ];
                    $result = Wxapp::subscribeMessage($conf['applet_initiation_success'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
                } catch (\think\Exception $e) {
                    $this->error($e->getMessage());
                }
            }
            $this->initiation_success_notify($member_data['mobile'],$member_data['member_level_name']);
        } else {
            $params['state'] = '4';//待付款
            $params['child_state'] = '3';//待付款
            $row->allowField(true)->save($params);
            if ($row['channel'] == '1') {
                //入会审核成功通知
                try {
                    $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
                    $data = [
                        'thing1' => [
                            'value' => $row['name'],
                        ],
                        'time3' => [
                            'value' => date('Y-m-d H:i:s'),
                        ],
                        'phrase4' => [
                            'value' => '审核通过',
                        ],
                        'thing5' => [
                            'value' => '通过审核，请前往小程序缴纳会费！',
                        ],
                    ];
                    $result = Wxapp::subscribeMessage($conf['applet_initiation_audit'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
                } catch (\think\Exception $e) {
                    $this->error($e->getMessage());
                }
            }
        }
        $this->success();
    }

    private function initiation_success_notify($phoneNumbers,$level_name)
    {
        $configObj = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
        if (!empty($configObj['alibaba_cloud_sign_name'])
            && !empty($configObj['alibaba_cloud_access_key_id'])
            && !empty($configObj['alibaba_cloud_access_key_secret'])
            && !empty($configObj['alibaba_initiation_success_notify'])
            && !empty($phoneNumbers)
        ) {
            $level_name = preg_replace('/[^\x{4e00}-\x{9fa5}]/u', '',$level_name);
            if (empty($level_name)) {
                $level_name = '用户';
            }

            $userSendSmsRequestParam = [
                "phoneNumbers" => $phoneNumbers,
                "templateCode" => $configObj['alibaba_initiation_success_notify'],
                "templateParam" => "{'leavelname':'$level_name'}"
            ];

            AlibabaCloudSms::main($userSendSmsRequestParam);
        }
    }

    /**
     * Desc  驳回
     * Create on 2024/3/7 15:56
     * Create by wangyafang
     */
    protected function reject($row = '',$params = [])
    {
        $params['child_state'] = '2';
        $params['examine_role'] = 1;
        $params['examine_admin_id'] = $this->auth->id;
        $params['examine_time'] = time();
        $result = false;
        Db::startTrans();
        try {
            $result = $row->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
        if ($row['channel'] == 1) {
            //入会审核成功通知
            try {
                $data = [
                    'thing1' => [
                        'value' => $row['name'],
                    ],
                    'time3' => [
                        'value' => date('Y-m-d H:i:s'),
                    ],
                    'phrase4' => [
                        'value' => '审核未通过',
                    ],
                    'thing5' => [
                        'value' => '原因：' . $params['reject'],
                    ],
                ];
                $result = Wxapp::subscribeMessage($conf['applet_initiation_audit'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
            } catch (\think\Exception $e) {
                $this->error($e->getMessage());
            }
        }
        $this->success();
    }

    /**
     * Desc  线下通过
     * Create on 2024/3/21 9:01
     * Create by wangyafang
     */
    protected function offline_pass($row = '',$params = [])
    {
        $member_data = \app\common\model\wdsxh\member\Member::get_member_data($row);
        $params['state'] = '2';//已通过
        $params['child_state'] = '6';//已通过
        $params['examine_role'] = 1;
        $params['examine_admin_id'] = $this->auth->id;
        $params['examine_time'] = time();
        $memberModel = new Member();
        $memberObj = $memberModel->where('wechat_id',$row['wechat_id'])->find();
        if ($memberObj) {
            $memberObj->expire_time = $member_data['expire_time'];
            $memberObj->save();
            $member_id = $memberObj['id'];

        } else {
            $memberModel->data($member_data);
            $memberModel->allowField(true)->save();
            $member_id = $memberModel->id;
        }
        $payModel = new Pay();
        $result = false;
        Db::startTrans();
        try {
            $result = $row->allowField(true)->save($params);
            $pay_data = array(
                'member_id'=>$member_id,
                'wechat_id'=>$row['wechat_id'],
                'order_no'=> wdsxh_create_order(),
                'fees'=>(new Level())->where('id',$row['member_level_id'])->value('fees'),
                'level_id'=>$row['member_level_id'],
                'channel'=>$row['channel'],
                'pay_method'=>'3',
                'paid'=>'2',
                'pay_time'=>time(),
            );
            $payModel->data($pay_data);
            $payModel->allowField(true)->save();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }

        $cert_data = \app\common\model\wdsxh\Cert::get_cert_data($row['type'],$row,$member_id);
        if(!empty($cert_data)) {
            $certModel = new Cert();
            $certModel->saveAll($cert_data);
        }
        //入会审核成功通知
        try {
            $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
            $data = [
                'thing1' => [
                    'value' => $row['name'],
                ],
                'time3' => [
                    'value' => date('Y-m-d H:i:s'),
                ],
                'phrase4' => [
                    'value' => '审核通过',
                ],
                'thing5' => [
                    'value' => '恭喜成功加入会员',
                ],
            ];
            $result = Wxapp::subscribeMessage($conf['applet_initiation_audit'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
        } catch (\think\Exception $e) {
            $this->error($e->getMessage());
        }


        //入会申请成功通知
        $businessAssociationObj = (new Association())->get(1);
        try {
            $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
            $data = [
                'thing3' => [
                    'value' => mb_substr($businessAssociationObj['name'], 0, 20)
                ],
                'time2' => [
                    'value' => date('Y-m-d H:i:s'),
                ],
                'thing1' => [
                    'value' => mb_substr('恭喜您已成功加入' . $businessAssociationObj['name'], 0, 20),
                ]
            ];
            $result = Wxapp::subscribeMessage($conf['applet_initiation_success'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
        } catch (\think\Exception $e) {
            $this->error($e->getMessage());
        }

        $this->initiation_success_notify($member_data['mobile'],$member_data['member_level_name']);
        $this->success();
    }

    /**
     * Desc  线下驳回
     * Create on 2024/3/21 8:56
     * Create by wangyafang
     */
    protected function offline_reject($row = '',$params = [])
    {
        $params['child_state'] = '5';
        $params['examine_role'] = 1;
        $params['examine_admin_id'] = $this->auth->id;
        $params['examine_time'] = time();
        $result = false;
        Db::startTrans();
        try {
            $result = $row->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        if ($row['channel'] == 1) {
            //入会审核成功通知
            try {
                $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
                $data = [
                    'thing1' => [
                        'value' => $row['name'],
                    ],
                    'time3' => [
                        'value' => date('Y-m-d H:i:s'),
                    ],
                    'phrase4' => [
                        'value' => '审核未通过',
                    ],
                    'thing5' => [
                        'value' => '原因：' . $params['reject'],
                    ],
                ];
                $result = Wxapp::subscribeMessage($conf['applet_initiation_audit'], trim(wdsxh_get_openid($row['wechat_id'],1)), '/pages/mine/index', $data);
            } catch (\think\Exception $e) {
                $this->error($e->getMessage());
            }
        } else {//todo 公众号通知

        }
        $this->success();
    }

    public function multi($ids = null)
    {
        return;
    }

    //todo 缴费会员审核通过不缴费，待缴费状态时可以删除入会信息，入会成功以后没有删除功能
    public function del($ids = null)
    {
        if (false === $this->request->isPost()) {
            $this->error(__("Invalid parameters"));
        }
        if (empty($ids)) {
            $this->error(__('Parameter %s can not be empty', 'ids'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            $this->model->where($this->dataLimitField, 'in', $adminIds);
        }
        $row = $this->model->get($ids);
        $memberPayObj = (new Pay())->where('paid','1')
            ->where('wechat_id',$row['wechat_id'])
            ->find();
        $result = false;
        Db::startTrans();
        try {
            $result = $row->delete();
            Db::commit();
        } catch (PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($result === false) {
            $this->error('删除失败');
        }
        if ($memberPayObj) {
            $memberPayObj->delete();
        }
        $this->success();
    }

    public function edit($ids = null)
    {
        return;
    }

    public function add()
    {
        return;
    }

    public function index()
    {
        return;
    }




}
