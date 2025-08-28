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
namespace app\api\controller\wdsxh;

use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\business\Association;
use app\api\model\wdsxh\activity\ActivityApply;
use app\api\model\wdsxh\activity\ActivityApplyRecord;
use app\api\model\wdsxh\activity\Order;
use app\api\model\wdsxh\activity\Refund;
use app\api\model\wdsxh\goods\Address;
use app\api\model\wdsxh\jielong\JielongFeedback;
use app\api\model\wdsxh\member\Cert;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\member\MemberApply;
use app\api\model\wdsxh\member\MemberExpireMessage;
use app\api\model\wdsxh\member\Pay;
use app\api\model\wdsxh\member\Promotion;
use app\api\model\wdsxh\member\Visitor;
use app\api\model\wdsxh\questionnaire\Questionnaire;
use app\api\model\wdsxh\questionnaire\Render;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use app\common\library\Token;
use app\common\model\User;
use think\Db;

/**
 * Class AppletUserWechat
 * Desc  小程序微信用户注册登录
 * Create on 2024/3/7 10:03
 * Create by wangyafang
 */
class AppletUserWechat extends Api
{
    protected $noNeedLogin = ['is_register','get_phone','register','login'];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();

        $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
        if (empty($configObj['applet_appid'])) {
            $this->error('小程序AppID未配置');
        }
        if (empty($configObj['applet_secret'])) {
            $this->error('小程序AppSecret未配置');
        }
    }

    /**
     * Desc  微信小程序是否注册
     * Create on 2024/3/7 10:05
     * Create by wangyafang
     */
    public function is_register()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $code=$this->request->param('code');
        if(empty($code)){
            $this->error('code参数错误');
        }
        $data=Wxapp::wxlogin($code);
        if(empty($data['openid'])){
            $this->error('小程序登录失败',$data);
        }
        $openid=$data['openid'];
        $userWechatObj = (new UserWechat())->where('applet_openid',$openid)->find();

        $auth_status = !empty($userWechatObj) ? 1 : 2;
        $this->success('请求成功！',['auth_status'=>$auth_status]);
    }

    /**
     * Desc  微信小程序注册
     * Create on 2024/3/7 10:06
     * Create by wangyafang
     */
    public function register()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $code=$this->request->post('code');
        $param = $this->request->post();

        if(empty($code)){
            $this->error('code参数错误');
        }
        $data=Wxapp::wxlogin($code);
        if(empty($data['openid'])){
            $this->error('小程序注册失败',$data);
        }
        $openid=$data['openid'];
        //todo 腾讯校验增加开关
        $security_text_switch = (new \app\admin\model\wdsxh\Config())->where('id','1')->value('security_text_switch');
        if ($security_text_switch == '1' && isset($param['nickname']) && !empty($param['nickname'])) {
            $result = Wxapp::checkSecurityText($openid,$param['nickname']);
            if ($result != 1) {
                if ($result == 2) {
                    $this->error('文本内容输入不合规，请重新输入');
                } else {
                    $this->error('errcode:'.$result['errcode'].',errmsg:'.$result['errmsg']);
                }
            }
        }
        $nickname_avatar_data = $this->get_nickname_avatar();
        $avatar = (isset($param['avatar']) && !empty($param['avatar'])) ? $param['avatar'] : $nickname_avatar_data['avatar'];
        $param['nickname'] = (isset($param['nickname']) && !empty($param['nickname'])) ? $param['nickname'] : $nickname_avatar_data['nickname'];
        $parent_wechat_id = $this->request->post('parent_wechat_id',0);
        //todo 后台统一用户同一时间出现3次
        $userWechatCheckObj = (new UserWechat())->where('applet_openid',$openid)->find();
        if ($userWechatCheckObj) {
            $this->error('微信小程序数据错误,删除小程序重新进入，试下');
        }

        Db::startTrans();
        try{
            $user=User::create(array(
                'group_id'=>1,
                'status'=>'normal',
                'joinip'=>request()->ip(),
                'jointime'=>time(),
                'nickname'=>$param['nickname'],
                'avatar'=>$avatar,
            ),true);
            $userWechatObj = UserWechat::create(array(
                'user_id' =>$user->id,
                'applet_openid'=>$openid,
                'nickname'=>$param['nickname'],
                'avatar'=>$avatar,
                'channel'=>1,
                'parent_wechat_id'=>$parent_wechat_id,
            ));
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }

        $member_id = (new Member())->where('wechat_id',$parent_wechat_id)->value('id');
        if ($parent_wechat_id && $member_id) {
            $promotionModel = new Promotion();
            $promotion_data = array(
                'wechat_id' => $parent_wechat_id,
                'member_id'=>$member_id,
            );
            $promotionModel->data($promotion_data);
            $promotionModel->allowField(true)->save();
        }

        $this->auth->direct($user->id);
        $userObj = $this->auth->getUserinfo();
        $userObj['avatar'] = wdsxh_full_url($userObj['avatar']);
        $this->success('请求成功',$userObj);
    }

    /**
     * Desc  微信小程序登录
     * Create on 2024/3/7 10:06
     * Create by wangyafang
     */
    public function login()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $code = $this->request->param('code');
        if(empty($code)){
            $this->error('code参数错误');
        }
        $data=Wxapp::wxlogin($code);
        if(empty($data['openid'])){
            $this->error('小程序登录失败',$data);
        }
        $openid=$data['openid'];
        $userWechatObj = (new UserWechat())->where('applet_openid',$openid)->find();

        $userObj = User::get($userWechatObj['user_id']);
        if (!$userObj) {
            $userObj = User::create(array(
                'group_id'=>1,
                'status'=>'normal',
                'joinip'=>request()->ip(),
                'jointime'=>time(),
                'avatar'=> $userWechatObj['avatar'],
                'nickname'=> $userWechatObj['nickname'],
                'mobile'=> $userWechatObj['mobile'],
            ),true);
            $userWechatObj->user_id = $userObj->id;
            $userWechatObj->save();
        }
        if (empty($userWechatObj['openid'])) {
            $userWechatObj->applet_openid = $openid;
            $userWechatObj->save();
        }

        $this->auth->direct($userObj->id);
        $userObj = $this->auth->getUserinfo();
        $userObj['avatar'] = wdsxh_full_url($userObj['avatar']);
        $this->success('请求成功',$userObj);
    }

    /**
     * Desc  获取微信小程序用户手机号
     * Create on 2024/3/7 11:16
     * Create by wangyafang
     */
    public function get_phone(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $code=$this->request->get('code');
        $iv=$this->request->get('iv');
        $encryptedData=$this->request->get('encryptedData','','trim');
        if(empty($code)){
            $this->error('code 参数错误');
        }
        if(empty($iv)){
            $this->error('iv 参数错误');
        }
        if(empty($encryptedData)){
            $this->error('encryptedData 参数错误');
        }
        $data=Wxapp::phone($code,$iv,$encryptedData);


        if (isset($data['phoneNumber'])) {
            $userWechatObj = (new UserWechat())->where('mobile',$data['phoneNumber'])->find();
            $auth_status = !empty($userWechatObj) ? 1 : 2;
            $data['auth_status'] = $auth_status;
        } else {
            $this->error('获取手机号失败');
        }

        $this->success('请求成功',$data);
    }

    private function get_nickname_avatar()
    {
        $avatar = Association::where('id',1)->value('logo');
        if (empty($avatar)) {
            $avatar = '/assets/addons/wdsxh/img/avatar.png';
        }

        $current_user_id = User::order('id','desc')->limit(1)->value('id');
        if (!$current_user_id) {
            $current_user_id = 1;
        } else {
            $current_user_id = bcadd($current_user_id, 1);
        }
        $nickname = '用户'.$current_user_id;

        return array(
            'avatar'=>$avatar,
            'nickname'=>$nickname
        );
    }

    /**
     * Desc 绑定手机号
     * Create on 2024/10/15 17:14
     * Create by wangyafang
     */
    public function bind_mobile()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $user_id = $this->auth->id;
        $code=$this->request->post('code');
        $iv=$this->request->post('iv');
        $encryptedData=$this->request->post('encryptedData','','trim');
        if(empty($code)){
            $this->error('code 参数错误');
        }
        if(empty($iv)){
            $this->error('iv 参数错误');
        }
        if(empty($encryptedData)){
            $this->error('encryptedData 参数错误');
        }
        $data=Wxapp::phone($code,$iv,$encryptedData);

        if (!isset($data['phoneNumber'])) {
            $this->error('获取手机号失败');
        }

        $mobile = $data['phoneNumber'];

        $userWechatObj = $appletUserWechatObj = (new UserWechat())->where('user_id',$user_id)->find();

        $byMObileQueryUserWechat = (new UserWechat())->where('mobile',$mobile)->find();
        if (!empty($byMObileQueryUserWechat) && !empty($userWechatObj) && !empty($byMObileQueryUserWechat['applet_openid']) && ($byMObileQueryUserWechat['applet_openid'] != $userWechatObj['applet_openid'])) {
            $this->error('手机号已被其他微信使用');
        }

        $wananchiWhere['wananchi_openid'] = ['not null', ''];  //not null
        $wananchiUserWechatObj = (new UserWechat())->where('mobile',$mobile)->where($wananchiWhere)->find();


        if ($wananchiUserWechatObj) {//已经在公众号使用一段时间
            $wananchiUserObj = (new User())->where('id',$wananchiUserWechatObj['user_id'])->find();
            $wananchiData = $wananchiUserWechatObj;
            $result = false;
            $activityApplyModel = new ActivityApply();
            $activityApplyRecordModel = new ActivityApplyRecord();
            $activityOrderModel = new Order();
            $activityRefundModel = new Refund();
            $businessModel = new \app\api\model\wdsxh\business\Business();
            $demandModel = new \app\api\model\wdsxh\Demand();
            $jielongFeedbackModel = new JielongFeedback();
            $mallOrderModel = new \app\admin\model\wdsxh\mall\Order();
            $mallUserAddressModel = new Address();
            $memberModel = new Member();
            $memberApplyModel = new MemberApply();
            $memberCertModel = new Cert();
            $memberExpireMessageModel = new MemberExpireMessage();
            $memberPayModel = new Pay();
            $memberPromotionModel = new Promotion();
            $memberVisitorModel = new Visitor();
            $questionnaireModel = new Questionnaire();
            $questionnaireRenderModel = new Render();
            $token_user_id = $wananchiUserWechatObj['user_id'];

            Db::startTrans();
            try{
                $result = (new UserWechat())->save([
                    'wananchi_openid'  => $wananchiData['wananchi_openid'],
                    'member_id'  => $wananchiData['member_id'],
                ],['id' => $appletUserWechatObj['id']]);
                $memberModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $activityApplyModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $activityApplyRecordModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $activityOrderModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $activityRefundModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $businessModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $demandModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $jielongFeedbackModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $mallOrderModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $mallUserAddressModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $memberApplyModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $memberCertModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $memberExpireMessageModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $memberPayModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $memberPromotionModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $memberVisitorModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $questionnaireModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                $questionnaireRenderModel->save([
                    'wechat_id'  => $appletUserWechatObj['id'],
                ],['wechat_id' => $wananchiData['id']]);
                (new UserWechat())->save([
                    'parent_wechat_id'  => $appletUserWechatObj['id'],
                ],['parent_wechat_id' => $wananchiData['id']]);

                $wananchiUserWechatObj->delete();
                $wananchiUserObj->delete();
                // 提交事务
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $this->error($e->getMessage());
            }

            $wechat_id = $wananchiData['id'];
            $where[] = ['exp',Db::raw("FIND_IN_SET($wechat_id,verifying_wechat_ids)")];
            $activityModel = new \app\api\model\wdsxh\activity\Activity();
            $activityVerifyingData = $activityModel
                ->where($where)
                ->select();
            if (!empty($activityVerifyingData)) {
                foreach ($activityVerifyingData as $v) {
                    $verifying_wechat_ids_array = explode(',',$v['verifying_wechat_ids']);
                    foreach ($verifying_wechat_ids_array as $kk=>&$vv) {
                        if ($vv == $wechat_id) {
                            $vv = $appletUserWechatObj['id'];
                        }
                    }
                    $verifying_wechat_ids = implode(',',$verifying_wechat_ids_array);
                    $v->verifying_wechat_ids = $verifying_wechat_ids;
                    $v->save();
                }
            }


            if (false === $result) {
                $this->error('整合公众号数据失败');
            }
            Token::clear($token_user_id);
        }

        $appletUserWechatObj->mobile = $mobile;
        $result = $appletUserWechatObj->save();

        if (false === $result) {
            $this->error('绑定失败');
        }

        $memberApplyObj = (new MemberApply())
            ->where('mobile',$mobile)
            ->where('state','2')
            ->where('channel',3)
            ->where('child_state','6')
            ->where('pay_method','1')
            ->find();
        $memberObj = (new Member())->where('mobile',$mobile)->find();
        if ($memberApplyObj && empty($memberApplyObj['wechat_id']) && $memberObj && empty($memberObj['wechat_id'])) {
            $memberApplyObj->wechat_id = $userWechatObj->id;
            $memberApplyObj->save();

            $memberObj->wechat_id = $userWechatObj->id;
            $memberObj->save();

            $memberPayObj = (new Pay())->where('member_id',$memberObj['id'])->where('paid','2')
                ->where('channel','3')
                ->where('pay_method','4')
                ->where('delivery_state',2)
                ->order('id desc')
                ->find();
            if ($memberPayObj && empty($memberPayObj['wechat_id'])) {
                $memberPayObj->wechat_id = $userWechatObj->id;
                $memberPayObj->save();
            }
        }

        $this->success('绑定成功',$data);
    }
}



 