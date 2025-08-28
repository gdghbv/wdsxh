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
 * Class Willbrand
 * Desc  电子会牌控制器
 * Create on 2024/4/9 17:06
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use EasyWeChat\Factory;

class Willbrand extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\Willbrand();
    }

    /**
     * Desc  展示电子会牌
     * Create on 2024/4/9 17:52
     * Create by wangyafang
     */
    public function index(){
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)->find();
        if(!$memberObj){
            $this->error('会员信息不存在');
        }
        if (empty($memberObj['industry_category_id'])) {
            $this->error('会员资料不完整，请先完善会员资料');// code...
        }
        if($current_date > $memberObj['expire_time']) {
            $this->error('会员信息已过期,请重新缴纳会费');
        }
        $data = $this->model->where('id',1)->value('data');
        $data = json_decode($data,true);
        $data['bg']['img'] = wdsxh_full_url($data['bg']['img']);
        $channel = $this->request->header('channel');
        if ($channel == 1) {//小程序
            $save_path = '/uploads/wdsxh/willbrand/'.$memberObj['id'].'/'.$memberObj['createtime'].'.png';
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

                $response  = $app->app_code->getUnlimit($wechat_id, [
                    'page'  => $path,
                ]);

                if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                    $response->saveAs('uploads/wdsxh/willbrand/'.$memberObj['id'], $memberObj['createtime'].'.png');
                    $applet_qrcode_path = $this->request->domain().$save_path;
                } else {
                    $this->error('小程序二维码生成失败');
                }
            }
        } else {//公众号
            $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'wananchi_qrcode'.DIRECTORY_SEPARATOR.$memberObj['id'].DIRECTORY_SEPARATOR.$memberObj['createtime'].'.png';
            if (is_file(ROOT_PATH."public".$save_path)) {
                $applet_qrcode_path = $this->request->domain().$save_path;
            } else {
                $params['text'] = $this->request->get('text', $this->request->domain().'/web', 'trim');
                $qrCode = \addons\qrcode\library\Service::qrcode($params);
                $qrcodePath = ROOT_PATH . 'public'.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'wananchi_qrcode'.DIRECTORY_SEPARATOR.$memberObj['id'].DIRECTORY_SEPARATOR;
                if (!is_dir($qrcodePath)) {
                    wdsxh_mkdirs($qrcodePath);
                }
                if (is_really_writable($qrcodePath)) {
                    $filePath = $qrcodePath . $memberObj['createtime'].'.png';
                    $qrCode->writeFile($filePath);
                    $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'wananchi_qrcode'.DIRECTORY_SEPARATOR.$memberObj['id'].DIRECTORY_SEPARATOR.$memberObj['createtime'].'.png';
                    $applet_qrcode_path = $this->request->domain().$save_path;
                }
            }
        }

        $member_level_name = $memberObj['member_level_name'];
        $member_name = $memberObj['name'];
        if (empty($memberObj['serial_number'])) {
            $memberTodayJoinCount = (new Member())
                ->where('id','neq',$memberObj['id'])
                ->order('id desc')
                ->limit(1)
                ->value('id');
            if (!$memberTodayJoinCount) {
                $serial_number = str_pad('1', 3, '0', STR_PAD_LEFT);
            } else {
                $serial_number = str_pad($memberTodayJoinCount + 1, 3, '0', STR_PAD_LEFT);
            }
            $memberObj['serial_number'] = $serial_number;
            $memberObj->save();
        }

        // 自定义会员编号格式：前后自定义，中间四位数字固定
        $custom_prefix = ''; // 前缀，可以自定义
        $custom_suffix = ''; // 后缀，可以自定义
        $middle_number = str_pad($memberObj['serial_number'], 4, '0', STR_PAD_LEFT); // 中间四位数字

        // 从电子会牌设置中获取自定义前缀和后缀
        if (isset($data['member_number_settings'])) {
            $custom_prefix = isset($data['member_number_settings']['prefix']) ? $data['member_number_settings']['prefix'] : '';
            $custom_suffix = isset($data['member_number_settings']['suffix']) ? $data['member_number_settings']['suffix'] : '';
        }

        // 生成自定义会员编号
        $number = $custom_prefix . $middle_number . $custom_suffix;



        $result_data = array(
            'number'=>$number,
            'member_name'=>$member_name,
            'join_time'=>date('Y年m月d日',strtotime($memberObj['join_time'])),
            'expire_time'=>date('Y年m月d日',strtotime($memberObj['expire_time'])),
            'member_level_name'=>$member_level_name,
            'applet_qrcode_path'=>$applet_qrcode_path,
            'willbrand'=>$data,
            'avatar'=>wdsxh_full_url($memberObj['avatar']),
        );
        if ($memberObj['type'] == '2') {
            $result_data['company_name'] = $memberObj['company_name'];
        }
        if ($memberObj['type'] == '3') {
            $result_data['organize_name'] = $memberObj['organize_name'];
        }
        $this->success('请求成功',$result_data);
    }
}



 