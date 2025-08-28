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
 * Class WananchiUserWechat
 * Desc  公众号H5微信用户注册登录
 * Create on 2024/3/7 10:08
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;

use addons\wdsxh\library\Wxofficial\Jssdk;
use app\admin\model\wdsxh\business\Association;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\member\MemberApply;
use app\api\model\wdsxh\member\Promotion;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use app\common\library\Sms;
use app\common\model\User;
use think\Db;
use EasyWeChat\Factory;

class WananchiUserWechat extends Api
{
    protected $noNeedLogin = ['mobile_login','get_wechat_config'];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * 手机验证码登录
     *
     * @ApiMethod (POST)
     * @param string $mobile  手机号
     * @param string $captcha 验证码
     */
    public function mobile_login()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $mobile = $this->request->post('mobile');
        $code = $this->request->post('code');

        $param = $this->request->post();
        $result = $this->validate($param,'app\api\validate\wdsxh\WananchiUserWechat.mobile_login');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }

        $userWechatObj = UserWechat::getByMobile($mobile);
        $wananchi_openid = $this->by_code_get_openid($code);
        $parent_wechat_id = $this->request->post('parent_wechat_id',0);
        if ($userWechatObj) {
            //如果已经有账号则直接登录
            $userWechatObj->wananchi_openid = $wananchi_openid;
            $userWechatObj->save();
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
            $register_state = 2;
            $ret = $this->auth->direct($userWechatObj['user_id']);
        } else {
            $nickname_avatar_data = $this->get_nickname_avatar();
            Db::startTrans();
            try{
                $user = User::create(array(
                    'group_id'=>1,
                    'status'=>'normal',
                    'joinip'=>request()->ip(),
                    'jointime'=>time(),
                    'nickname'=>$nickname_avatar_data['nickname'],
                    'avatar'=>$nickname_avatar_data['avatar'],
                    'mobile'=>$mobile
                ),true);
                $userWechatObj = UserWechat::create(array(
                    'user_id' =>$user->id,
                    'wananchi_openid'=>$wananchi_openid,
                    'nickname'=>$nickname_avatar_data['nickname'],
                    'avatar'=>$nickname_avatar_data['avatar'],
                    'mobile'=>$mobile,
                    'channel'=>2,
                    'parent_wechat_id'=>$parent_wechat_id,
                ));
                // 提交事务
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $this->error($e->getMessage());
            }
            $ret = $this->auth->direct($user->id);
            $register_state = 1;
        }
        if ($parent_wechat_id) {
            $promotionModel = new Promotion();
            $member_id = (new Member())->where('wechat_id',$parent_wechat_id)->value('id');
            $promotion_data = array(
                'wechat_id' => $parent_wechat_id,
                'member_id'=>$member_id,
            );
            $promotionModel->data($promotion_data);
            $promotionModel->allowField(true)->save();
        }

        //todo 导入会员后，会员使用手机号登陆小程序，可以自动绑定会员信息
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
        }

        if ($ret) {
            Sms::flush($mobile, 'mobilelogin');
            $userObj = $this->auth->getUserinfo();
            $avatar = (new UserWechat())->where('user_id',$userObj['id'])->value('avatar');
            $userObj['avatar'] = wdsxh_full_url($avatar);
            $userObj['register_state'] = $register_state;
            $this->success('请求成功',$userObj);
        } else {
            $this->error($this->auth->getError());
        }
    }

    /**
     * Desc  通过code获取公众号微信用户openid
     * Create on 2024/3/7 11:39
     * Create by wangyafang
     */
    private function by_code_get_openid($code = '')
    {
        $configObj  = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
        $wananchi_appid = $configObj['wananchi_appid'];
        $wananchi_secret = $configObj['wananchi_secret'];

        $token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$wananchi_appid&secret=$wananchi_secret&code={$code}&grant_type=authorization_code";

        $token = json_decode(\fast\Http::get($token_url));
        if(isset($token->errcode)) {
            $this->error('token:'.$token->errcode);
        }
        $access_token_url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=$wananchi_appid&grant_type=refresh_token&refresh_token=".$token->refresh_token;
        //转成对象
        $access_token = json_decode(\fast\Http::get($access_token_url));
        if(isset($access_token->errcode)) {
            $this->error('access_token:'.$access_token->errcode);
        }
        $openid = $access_token->openid;
        return $openid;
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
     * Desc  通过config接口注入权限验证配置
     * Create on 2024/6/13 17:53
     * Create by wangyafang
     */
    public function get_wechat_config()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $url = $this->request->get('url');

        $configObj = (new \app\admin\model\wdsxh\Config())->get(1);
        $appid = $configObj['wananchi_appid'];
        $secret = $configObj['wananchi_secret'];

        $jssdk = (new Jssdk($appid,$secret));
        $signPackage = $jssdk->GetSignPackage($url);

        $data = array(
            'appId'=>$appid,
            'timestamp'=>isset($signPackage['timestamp']) ? $signPackage['timestamp'] : '',
            'nonceStr'=>isset($signPackage['nonceStr']) ? $signPackage['nonceStr'] : '',
            'signature'=>isset($signPackage['signature']) ? $signPackage['signature'] : '',
        );

        $this->success('请求成功',$data);
    }

}



 