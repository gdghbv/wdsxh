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
/**
 * Class UserWechat
 * Desc  微信用户控制器
 * Create on 2024/3/16 9:14
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use app\admin\model\wdsxh\mall\Order;
use app\api\model\wdsxh\activity\Activity;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\member\MemberApply;
use app\common\controller\Api;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

class UserWechat extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\UserWechat();
    }

    /**
     * Desc  个人中心
     * Create on 2024/3/16 9:15
     * Create by wangyafang
     */
    public function center()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $wechat_id = $this->model->where('user_id',$this->auth->id)->value('id');
        if (!$wechat_id) {
            $this->error('用户信息不存在');
        }
        $data = $this->model->where('id',$wechat_id)->field("nickname,REPLACE(mobile,SUBSTR(mobile,4,4),'****') mobile,avatar,points,total_points")->find();
        $data['apply_member_state'] = $this->query_apply_member_state($wechat_id);

        if ($data['apply_member_state']['state'] == '6') {
            $data['expire_time'] = (new Member())->where('wechat_id',$wechat_id)->value('expire_time');
        } else {
            $data['expire_time'] = '';
        }

        if (in_array($data['apply_member_state']['state'],array('2','5'))) {
            $data['reject'] = (new MemberApply())->where('wechat_id',$wechat_id)->value('reject');
        } else {
            $data['reject'] = '';
        }

        $mallOrderModel = new Order();
        $data['order'] = array(
            'unpaid_count'=> $mallOrderModel->where('wechat_id',$wechat_id)->where('state','1')->count(),
            'to_be_shipped_count'=> $mallOrderModel->where('wechat_id',$wechat_id)->where('state','2')->count(),
            'to_be_received_count'=> $mallOrderModel->where('wechat_id',$wechat_id)->where('state','3')->count(),
            'refund_count'=> $mallOrderModel->where('wechat_id',$wechat_id)->where('state','-1')->count(),
        );
        $data['set_admin'] = $this->model->where('id',$wechat_id)->value('set_admin');
        $where_query[] = ['exp',Db::raw("FIND_IN_SET($wechat_id,verifying_wechat_ids)")];
        $verifying_wechat_ids_array = (new Activity())
            ->where($where_query)
            ->column('id');
        $data['is_verifying'] = !empty($verifying_wechat_ids_array) ? 1 : 2;
        $data['member_level_name'] = (new Member())->where('wechat_id',$wechat_id)->value('member_level_name');
        if ($data['set_admin'] == 1) {
            $data['member_apply_count'] = (new MemberApply())
                ->where('state','1')
                ->count();
        }
        $this->success('请求成功',$data);
    }

    /**
     * Desc  入会申请状态
     * Create on 2024/3/21 9:48
     * Create by wangyafang
     */
    public function apply_member_state()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $wechat_id = $this->model->where('user_id',$this->auth->id)->value('id');
        if (!$wechat_id) {
            $this->error('用户信息不存在');
        }
        $state = $this->query_apply_member_state($wechat_id);
        if ($state['state'] == '-1') {
            $reject = '';
        } else {
            $memberApplyObj = (new MemberApply())->where('wechat_id',$wechat_id)->field('reject')->find();
            $reject = $memberApplyObj['reject'];
        }
        $state['reject'] = $reject;
        $this->success('请求成功',['state'=>$state]);
    }

    public function query_apply_member_state($wechat_id = '')
    {
        $applyObj = (new MemberApply())->where('wechat_id',$wechat_id)->order('id desc')->find();
        if (!$applyObj) {
            $data = array(
                'state'=>'-1',
                'msg'=>'未提交入会申请',
            );
            return $data;
        }
        switch ($applyObj['child_state']) {
            case '1':
                $data = array(
                    'state'=>'1',
                    'msg'=>'已提交审核，请等待审核',
                );
                break;
            case '2':
                $data = array(
                    'state'=>'2',
                    'msg'=>'入会申请被驳回',
                );
                break;
            case '3':
                $data = array(
                    'state'=>'3',
                    'msg'=>'后台审核通过未缴费,需要缴纳会费',
                );
                break;
            case '4':
                $data = array(
                    'state'=>'4',
                    'msg'=>'线下缴费审核中',
                );
                break;
            case '5':
                $data = array(
                    'state'=>'5',
                    'msg'=>'线下缴费被驳回',
                );
                break;
            case '6':
                $current_date = date('Y-m-d',time());
                $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                    ->find();
                if ($memberObj['expire_time'] < $current_date) {
                    $data = array(
                        'state'=>'7',
                        'msg'=>'会员已过期,需要缴纳会费',
                    );
                } else {
                    $data = array(
                        'state'=>'6',
                        'msg'=>'已经是会员',
                    );
                }
                break;

        }
        return $data;


    }

    /**
     * Desc  更新昵称和头像
     * Create on 2024/3/28 14:12
     * Create by wangyafang
     */
    public function update_nickname_avatar(){
        if (!$this->request->isPost()){
            $this->error('请求类型错误');
        }
        $params = $this->request->param();
        $model = new \app\admin\model\User();
        $user = $model->get($this->auth->id);
        if (!$user){
            $this->error('用户信息不存在');
        }
        $wechatObj = (new \app\api\model\wdsxh\UserWechat())->where('user_id',$this->auth->id)->find();
        if (!$wechatObj) {
            $this->error('微信用户信息不存在');
        }

        $user['nickname']=empty($params['nickname'])?$user['nickname']:$params['nickname'];
        $user['avatar']=empty($params['avatar'])?$user['avatar']:$params['avatar'];
        $wechatObj->nickname = $user['nickname'];
        $wechatObj->avatar = $user['avatar'];
        $result = false;
        Db::startTrans();
        try {
            $result = $user->save();
            $wechatObj->save();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }

        $this->success('更新成功！',$this->auth->getUserinfo());
    }
        /**
     * Desc  查看用户积分详情
     * Create on 2025/8/12 10:03
     * Create by JustWorking
     */
    
         public function points_log(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $page=isset($param['page']) ? $param['page'] : 1;
        $limit=isset($param['limit']) ? $param['limit'] : 10;
        if(!$this->request->isGet()){
            $this->error('请求类型错误');
        }
        $wechat_id=$this->model->where('user_id',$user_id)->value('id');
        if (!$wechat_id) {
            $this->error('用户信息不存在');
        }
          $total = (new \app\api\model\wdsxh\PointsLog())
        ->where('wechat_id', $wechat_id)
        ->count();
        $points_log = (new \app\api\model\wdsxh\PointsLog())
            ->where('wechat_id',$wechat_id)
            ->order('id desc')
            ->field("id,points,before,after,total_points,memo,createtime,change")
            ->page($page,$limit)
            ->select();
            //  $this->success('请求成功',$points_log);
             $this->success('请求成功',['data'=>$points_log,
             'total'=>$total,]);
    }
}



 