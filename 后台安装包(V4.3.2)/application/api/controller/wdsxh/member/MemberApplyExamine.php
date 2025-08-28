<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力中小企业发展
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdadmin.cn    All rights reserved.
// +----------------------------------------------------------------------
// | Wdadmin系统产品软件并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.wdadmin.cn
// +----------------------------------------------------------------------
/**
 * Class MemberApplyExamine
 * Desc  入会申请审核会员
 * Create on 2025/3/5 14:03
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\member;


use addons\wdsxh\library\Wxapp;
use app\api\model\wdsxh\member\Cert;
use app\admin\model\wdsxh\member\FeesConfig;
use app\api\model\wdsxh\member\IndustryCategory;
use app\api\model\wdsxh\member\Level;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\business\Association;
use app\api\model\wdsxh\member\Pay;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;

class MemberApplyExamine extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];
    protected $model = null;
    protected $wechat_id = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\member\MemberApplyExamine();
        $userWechatModel = new UserWechat();
        $this->wechat_id = $userWechatModel->where('user_id',$this->auth->id)->value('id');
        $set_admin = $userWechatModel->where('id',$this->wechat_id)->value('set_admin');
        if ($set_admin == 2) {
            $this->error('不是管理员，无法操作');
        }
    }

    /**
     * Desc 审核列表
     * Create on 2025/3/5 14:08
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->get();
        if (empty($param['state'])) {
            $this->error('参数错误');
        }
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];

        if ($param['state'] == 1) {//待审核
            $where['child_state'] = array('in',array('1','4'));
        } else {//已审核
            $where['child_state'] = array('in',array('2','5','3','6'));
            $where[] = ['exp',Db::raw("FIND_IN_SET($this->wechat_id,examine_wechat_id)")];
        }

        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->with(['level'])
            ->page($page,$limit)
            ->order('createtime desc')
            ->select();

        foreach ($data as &$v) {
            // 先处理 level 的字段限制
            $v->level->visible(['name']);

            // 再处理 $v 的字段限制，确保不覆盖 level 的字段
            $v->visible(['id', 'name', 'avatar', 'createtime', 'state', 'child_state','examine_time','level']);
            if (in_array($v['state'],['4','6'])) {
                $v->createtime = date('Y-m-d H:i:s',$v['examine_time']);
            }
            unset($v['examine_time']);
        }


        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc 详情
     * Create on 2025/3/5 15:43
     * Create by wangyafang
     */
    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('id');
        if (!$id) {
            $this->error('参数错误');
        }
        try {
            $row = $this->model->get($id);
            if (!$row) {
                $this->error('数据不存在');
            }

            $custom_content = json_decode($row['custom_content'],true);
            switch ($row['type']) {
                case 1:
                    $custom_content = $this->loop_array_get_full_url($custom_content);
                    break;
                case 2:
                    $custom_content['person'] = $this->loop_array_get_full_url($custom_content['person']);
                    $custom_content['company'] = $this->loop_array_get_full_url($custom_content['company']);
                    break;
                case 3:
                    $custom_content['person'] = $this->loop_array_get_full_url($custom_content['person']);
                    $custom_content['organize'] = $this->loop_array_get_full_url($custom_content['organize']);
                    break;
            }
            $data['custom_content'] = $custom_content;
            if ($row['state'] == '1' && $row['child_state'] == '4' && !empty($row['pay_voucher'])) {
                $data['pay_voucher'] = wdsxh_full_url($row['pay_voucher']);
            }

            $data['name'] = $row['name'];
            $data['avatar'] = $row['avatar'];
            $data['level_name'] = (new Level())->where('id',$row['member_level_id'])->value('name');
            $data['child_state'] = $row['child_state'];
            $data['createtime'] = $row['createtime'];
            $data['type'] = $row['type'];

            $this->success('请求成功',$data);
        }  catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }

    }

    /**
     * Desc 遍历数组获取图片，文件，视频全路径
     * Create on 2025/3/8 8:15
     * Create by wangyafang
     */
    private function loop_array_get_full_url($array) {
        $industryCategoryModel = new IndustryCategory();
        foreach ($array as $k=>&$v) {
            if (in_array($v['field'],['name','avatar','member_level_id'])) {
                unset($array[$k]);
                continue;
            }
            if (in_array($v['type'],['image','video']) && !empty($v['value'])) {
                $v['value'] = \app\common\model\wdsxh\member\Member::get_string_full_url($v['value']);
            }
            if (in_array($v['type'],['cert']) && !empty($v['value']['image'])) {
                $v['value']['image'] = \app\common\model\wdsxh\member\Member::get_string_full_url($v['value']['image']);
            }
            if (in_array($v['type'],['file']) && !empty($v['value'])) {
                foreach ($v['value'] as &$vv) {
                    $vv['path'] = \app\common\model\wdsxh\member\Member::get_string_full_url($vv['path']);
                }
            }
            if ($v['field'] == 'industry_category_id') {
                $v['value'] = $industryCategoryModel->where('id',$v['value'])->value('name');
            }
        }
        $array = array_values($array);

        return $array;
    }

    /**
     * 入会审核
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function examine()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $params = $this->request->post();
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        if (empty($params['id'])) {
            $this->error('参数错误');
        }
        $ids = $params['id'];
        $row = $this->model->get($ids);

        if (!$row) {
            $this->error(__('No Results were found'));
        }

        if (!isset($params['state'])) {
            $this->error('请选择审核状态');
        }
        if ($params['state'] == 3 && empty($params['reject'])) {
            $this->error('请填写驳回原因');
        }

        $row = $this->model->get($ids);
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
    public function offline_examine()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $params = $this->request->post();
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $ids = $params['id'];
        $row = $this->model->get($ids);

        $row['custom_content'] = \app\common\model\wdsxh\member\Member::get_custom_data($row);

        if (!$row) {
            $this->error(__('No Results were found'));
        }

        if (!isset($params['state'])) {
            $this->error('请选择审核状态');
        }
        if ($params['state'] == 3 && empty($params['reject'])) {
            $this->error('请填写驳回原因');
        }

        $row = $this->model->get($ids);
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
        $member_data = \app\common\model\wdsxh\member\Member::get_member_data($row);
        $memberModel = new Member();
        $memberObj = $memberModel->where('wechat_id',$row['wechat_id'])->find();
        $conf = (new \app\admin\model\wdsxh\Config())->where('id', 1)->find();
        $params['examine_role'] = 2;
        $params['examine_wechat_id'] = $this->wechat_id;
        $params['examine_time'] = time();

        if ($feesConfigObj['pay_method'] == 1) {//免费入会
            $params['state'] = '2';//已通过
            $params['child_state'] = '6';//已通过

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
            if ($memberObj) {
                $memberObj->expire_time = $member_data['expire_time'];
                $memberObj->save();
            } else {
                $memberModel->data($member_data);
                $memberModel->allowField(true)->save();
            }
            $cert_data = \app\common\model\wdsxh\Cert::get_cert_data($row['type'],$row,$memberModel->id);
            if(!empty($cert_data)) {
                $certModel = new Cert();
                $certModel->saveAll($cert_data);
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
        $this->success('操作成功');
    }

    /**
     * Desc  驳回
     * Create on 2024/3/7 15:56
     * Create by wangyafang
     */
    protected function reject($row = '',$params = [])
    {
        $params['examine_role'] = 2;
        $params['examine_wechat_id'] = $this->wechat_id;
        $params['child_state'] = '2';
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
        $this->success('操作成功');
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
        $params['examine_role'] = 2;
        $params['examine_time'] = time();
        if (!empty($row['examine_wechat_id']) && ($row['examine_wechat_id'] != $this->wechat_id)) {
            $params['examine_wechat_id'] = $row['examine_wechat_id'].','.$this->wechat_id;
        } else {
            $params['examine_wechat_id'] = $this->wechat_id;
        }
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
        $this->success('操作成功');
    }

    /**
     * Desc  线下驳回
     * Create on 2024/3/21 8:56
     * Create by wangyafang
     */
    protected function offline_reject($row = '',$params = [])
    {
        $params['examine_role'] = 2;
        $params['examine_wechat_id'] = $this->wechat_id;
        $params['child_state'] = '5';
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
        }
        $this->success('操作成功');
    }
}



 