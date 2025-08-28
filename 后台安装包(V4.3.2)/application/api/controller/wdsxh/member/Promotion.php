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
 * Class Promotion
 * Desc  推广人员控制器
 * Create on 2024/3/16 13:51
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\member;


use app\admin\model\wdsxh\Config;
use app\api\model\wdsxh\business\Association;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use EasyWeChat\Factory;

class Promotion extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $userWechatModel = new UserWechat();
        $memberModel = new \app\api\model\wdsxh\member\Member();

        // 确保 auth->id 为整数，防止注入
        $userId = (int)$this->auth->id;

        // 获取 parent_wechat_id
        $parent_wechat_id = $userWechatModel->where('user_id', $userId)->value('id');

        if (!$parent_wechat_id) {
            // 处理 parent_wechat_id 不存在的情况
            $user_data = [];
            $member_data = [];
        } else {
            // 获取所有子微信ID
            $all_wechat_id_array = $userWechatModel->where('parent_wechat_id', $parent_wechat_id)->column('id');
            if (empty($all_wechat_id_array)) {
                $user_data = [];
                $member_data = [];
            } else {
                // 获取已经是会员的微信ID
                $member_wechat_id_array = $memberModel->where('wechat_id', 'in', $all_wechat_id_array)->column('wechat_id');
                $member_wechat_id_array = $member_wechat_id_array ?: [];

                // 计算非会员的微信ID
                $user_wechat_id_array = array_diff($all_wechat_id_array, $member_wechat_id_array);

                // 查询非会员用户信息
                $user_data = $userWechatModel->where('id', 'in', $user_wechat_id_array)->order('id desc')
                    ->field("avatar,REPLACE(mobile,SUBSTR(mobile,4,4),'****') mobile,createtime join_time")
                    ->select();

                // 查询会员信息
                $member_data = $memberModel
                    ->alias('member')
                    ->where('member.wechat_id', 'in', $member_wechat_id_array)
                    ->field('member.name member_name,member.avatar member_avatar,level.name level_name,member.join_time')
                    ->join('wdsxh_member_level level', 'level.id = member.member_level_id')
                    ->order('member.id desc')
                    ->select();

                // 处理头像路径
                foreach ($member_data as &$v) {
                    $v->member_avatar = wdsxh_full_url($v->member_avatar);
                }
                unset($v); // 释放引用
            }
        }


        $memberObj = $memberModel->where('wechat_id',$parent_wechat_id)->field('id,name,avatar,createtime')->find();
        if (!$memberObj) {
            $this->error('会员信息不存在');
        }

        $user = array(
            'total'=> count($user_data),
            'data'=> $user_data,
        );
        $member = array(
            'total'=> count($member_data),
            'data'=> $member_data,
        );

        $promotion_img = (new Config())->where('id',1)->value('promotion_img');
        $channel = $this->request->header('channel');
        if ($channel == 1) {//小程序
            $save_path = '/uploads/wdsxh/applet_qrcode/'.$memberObj['id'].'/'.$memberObj['createtime'].'.png';
            if (is_file(ROOT_PATH."public".$save_path)) {
                $applet_qrcode_path = $this->request->domain().$save_path;
            } else {
                $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
                $path = 'pages/index/index';
                $config = [
                    'app_id' => $configObj['applet_appid'],
                    'secret' => $configObj['applet_secret'],
                    'response_type' => 'array',
                    'log' => [
                        'level' => 'debug',
                    ],
                ];

                $app = Factory::miniProgram($config);

                $response  = $app->app_code->getUnlimit($parent_wechat_id, [
                    'page'  => $path,
                ]);

                if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                    $response->saveAs('uploads/wdsxh/applet_qrcode/'.$memberObj['id'], $memberObj['createtime'].'.png');
                    $applet_qrcode_path = $this->request->domain().$save_path;
                } else {
                    $this->error('小程序二维码生成失败');
                }
            }
        } else {//公众号
            $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'wananchi_qrcode'.DIRECTORY_SEPARATOR.$memberObj['id'].DIRECTORY_SEPARATOR.$memberObj['createtime'].'promotion.png';
            if (is_file(ROOT_PATH."public".$save_path)) {
                $applet_qrcode_path = $this->request->domain().$save_path;
            } else {
                $params['text'] = $this->request->get('text', $this->request->domain().'/web/#/?parent_wechat_id='.$parent_wechat_id, 'trim');
                $qrCode = \addons\qrcode\library\Service::qrcode($params);
                $qrcodePath = ROOT_PATH . 'public'.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'wananchi_qrcode'.DIRECTORY_SEPARATOR.$memberObj['id'].DIRECTORY_SEPARATOR;
                if (!is_dir($qrcodePath)) {
                    wdsxh_mkdirs($qrcodePath);
                }
                if (is_really_writable($qrcodePath)) {
                    $filePath = $qrcodePath . $memberObj['createtime'].'promotion.png';
                    $qrCode->writeFile($filePath);
                    $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'wananchi_qrcode'.DIRECTORY_SEPARATOR.$memberObj['id'].DIRECTORY_SEPARATOR.$memberObj['createtime'].'promotion.png';
                    $applet_qrcode_path = $this->request->domain().$save_path;
                }
            }
        }
        $data = array(
            'user'=>$user,
            'member'=>$member,
            'parent_wechat_id'=>$parent_wechat_id,
            'member_name'=>$memberObj['name'],
            'member_avatar'=>$memberObj['avatar'],
            'promotion_img'=>wdsxh_full_url($promotion_img),
            'applet_qrcode_path'=>$applet_qrcode_path,
        );
        $business_association_name = (new Association())->where('id',1)->value('name');
        $data['business_association_name'] = $business_association_name;
        $this->success('请求成功',$data);
    }
}



 