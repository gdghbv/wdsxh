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
 * Class MemberApply
 * Desc  入会申请控制器
 * Create on 2024/3/7 15:45
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\member;


use addons\wdsxh\library\AlibabaCloudSms;
use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\member\FeesConfig;
use app\admin\model\wdsxh\member\IndustryCategory;
use app\api\model\wdsxh\business\Association;
use app\api\model\wdsxh\member\Level;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class MemberApply extends Api
{
    protected $noNeedLogin = ['submit','level_list','industry_category_list'];
    protected $noNeedRight = ['*'];
    protected $model = null;
    protected $configObj = '';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\member\MemberApply();
        $this->configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();

    }

    /**
     * Desc  入会申请提交
     * Create on 2024/3/7 15:56
     * Create by wangyafang
     */
    public function submit()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        $param['data'] = json_decode($_POST['data'],true);


        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $param['wechat_id'] = $wechat_id;
        $channel = $this->request->header('channel');
        $param['channel'] = $channel;

        $result = $this->validate($param,'app\api\validate\wdsxh\member\MemberApply.submit');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }

        $memberApplyObj = $this->model->where('wechat_id',$wechat_id)->find();
        if ($memberApplyObj && $memberApplyObj['state'] == '1') {
            $this->error('你的入会信息正在审核，不能重复提交');
        }
        if ($memberApplyObj && $memberApplyObj['state'] == '2') {
            $this->error('你已经是会员了，不能再次申请');
        }

        try {
            $custom_data = $this->handle_custom_data($param['type'],$param['data']);
            $channel = $this->request->header('channel');
            $custom_data['channel'] = $channel;
            $custom_data['type'] = $param['type'];
            $custom_data['pay_method'] = (new FeesConfig())->where('id',1)->value('pay_method');

            if ($memberApplyObj) {
                $custom_data['state'] = '1';
                $custom_data['child_state'] = '1';
                $custom_data['custom_content'] = \app\common\model\wdsxh\member\Member::remove_custom_content_full_image($param['type'],$_POST['data']);
                $custom_data['createtime'] = time();
                $custom_data['reject'] = '';
                $memberApplyObj->save($custom_data);
            } else {
                $custom_data['wechat_id'] = $wechat_id;
                $custom_data['type'] = $param['type'];
                $custom_data['custom_content'] = json_encode($param['data']);

                $this->model->data($custom_data);
                $this->model->allowField(true)->save();
            }
        } catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }


        $conf = $this->configObj;
        if ($channel == 1) {
            //发送入会申请通知
            try {
                $data = [
                    'thing2' => [
                        'value' => $custom_data['name'],
                    ],
                    'phone_number4' => [
                        'value' => $custom_data['mobile'],
                    ],
                    'phrase1' => [
                        'value' => '待审核',
                    ],
                ];
                $openids = (new UserWechat())->where('set_admin', 1)->column('applet_openid');
                if ($openids) {
                    foreach ($openids as $openid) {
                        $result = Wxapp::subscribeMessage($conf['applet_initiation_admin'], trim($openid), '/pagesAdmin/examine/index', $data);
                        if ($result && $result[0]['errcode'] == 0) {
                            $wechat_id = (new UserWechat())
                                ->where('applet_openid', $openid)
                                ->value('id');
                            $subscribeObj = Db::name('wdsxh_member_subscribe')->where('wechat_id', $wechat_id)->where('type', 1)->find();
                            if ($subscribeObj && $subscribeObj['count'] > 0) {
                                Db::name('wdsxh_member_subscribe')->where('wechat_id', $wechat_id)->where('type', 1)->setDec('count');
                            }
                        }
                    }
                }
            } catch (Exception $e) {
                $this->error($e->getMessage());
            }
        }
        $configObj = $this->configObj;

        $phoneNumbers = (new Association())->where('id',1)->value('phone');
        if (!empty($configObj['alibaba_cloud_sign_name'])
            && !empty($configObj['alibaba_cloud_access_key_id'])
            && !empty($configObj['alibaba_cloud_access_key_secret'])
            && !empty($configObj['alibaba_initiation_admin_notify'])
            && !empty($phoneNumbers)
        ) {
            $name = preg_replace('/[^\x{4e00}-\x{9fa5}]/u', '', $custom_data['name']);
            if (empty($name)) {
                $name = '用户';
            }
            $phone = $custom_data['mobile'];
            $userSendSmsRequestParam = [
                "phoneNumbers" => $phoneNumbers,
                "templateCode" => $configObj['alibaba_initiation_admin_notify'],
                "templateParam" => "{'name':'$name','phone':'$phone'}"
            ];
            AlibabaCloudSms::main($userSendSmsRequestParam);
        }

        $this->success('提交成功');
    }

    public function handle_custom_data($type,$data)
    {
        $custom_field = array();
        switch ($type) {
            case 1:
                $custom_field = array('name','avatar','mobile','member_level_id','native_place','introduce_content','address','industry_category_id');
                break;
            case 2:
                $custom_field = array('name','avatar','mobile','member_level_id','native_place','introduce_content','company_name','company_logo','company_introduction','company_position','address','industry_category_id');
                break;
            case 3:
                $custom_field = array('name','avatar','mobile','member_level_id','native_place','introduce_content','organize_name','organize_logo','organize_introduction','organize_position','address','industry_category_id');
                break;
        }
        $result = array();
        if ($type == 1) {
            foreach ($data as &$v) {
                if (in_array($v['field'],$custom_field)) {
                    $result[$v['field']] = $v['value'];
                    if ($v['field'] == 'industry_category_id') {
                        $result['industry_category_name'] = (new IndustryCategory())->where('id',$v['value'])->value('name');
                    }
                    if ($v['field'] == 'introduce_content') {
                        $v['value'] = wdsxh_xss_filter($v['value']);
                    }
                }
            }
            $result['address'] = json_encode($result['address']);
        } elseif ($type == 2) {
            foreach ($data['person'] as &$v) {
                if (in_array($v['field'],$custom_field)) {
                    $result[$v['field']] = $v['value'];
                    if ($v['field'] == 'industry_category_id') {
                        $result['industry_category_name'] = (new IndustryCategory())->where('id',$v['value'])->value('name');
                    }
                    if ($v['field'] == 'address') {
                        $result['address'] = json_encode($v['value']);
                    }
                    if ($v['field'] == 'introduce_content') {
                        $v['value'] = wdsxh_xss_filter($v['value']);
                    }
                }
            }
            foreach ($data['company'] as &$v) {
                if (in_array($v['field'],$custom_field)) {
                    $result[$v['field']] = $v['value'];
                }
                if ($v['field'] == 'company_introduction') {
                    $v['value'] = wdsxh_xss_filter($v['value']);
                }
            }
        } else {
            foreach ($data['person'] as &$v) {
                if (in_array($v['field'],$custom_field)) {
                    $result[$v['field']] = $v['value'];
                    if ($v['field'] == 'industry_category_id') {
                        $result['industry_category_name'] = (new IndustryCategory())->where('id',$v['value'])->value('name');
                    }
                    if ($v['field'] == 'address') {
                        $result['address'] = json_encode($v['value']);
                    }
                    if ($v['field'] == 'introduce_content') {
                        $v['value'] = wdsxh_xss_filter($v['value']);
                    }
                }
            }
            foreach ($data['organize'] as &$v) {
                if (in_array($v['field'],$custom_field)) {
                    $result[$v['field']] = $v['value'];
                }
                if ($v['field'] == 'organize_introduction') {
                    $v['value'] = wdsxh_xss_filter($v['value']);
                }
            }
        }

        return $result;
    }

    /**
     * Desc  会员级别列表
     * Create on 2024/3/18 11:26
     * Create by wangyafang
     */
    public function level_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $list = (new Level())
            ->where('status','normal')
            ->field('id,name')
            ->order('weigh asc,id asc')
            ->select();

        $this->success('请求成功',$list);
    }

    /**
     * Desc  行业分类列表
     * Create on 2024/3/19 11:21
     * Create by wangyafang
     */
    public function industry_category_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $list = (new \app\api\model\wdsxh\member\IndustryCategory())
            ->where('status','1')
            ->field('id,name,icon')
            ->order('weigh desc,id desc')
            ->select();

        $this->success('请求成功',$list);
    }

    /**
     * Desc  入会信息详情
     * Create on 2024/3/27 16:29
     * Create by wangyafang
     */
    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');

        $applyObj = $this->model->where('wechat_id',$wechat_id)->field('type,custom_content')->find();
        if (!$applyObj) {
            $this->error('入会信息不存在');
        }

        $custom_content = \app\common\model\wdsxh\member\Member::get_custom_content_full_image($applyObj['type'],$applyObj['custom_content']);
        $this->success('请求成功',$custom_content);

    }

    /**
     * Desc  检查手机号是否被使用
     * Create on 2024/3/27 16:29
     * Create by wangyafang
     */
    public function check_mobile_use()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $mobile = $this->request->get('mobile');
        if (empty($mobile)) {
            $this->error('手机号不能为空');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $memberApplyId = (new \app\api\model\wdsxh\member\MemberApply())
            ->where('wechat_id','<>',$wechat_id)
            ->where('mobile',$mobile)
            ->value('id');
        $use_status = $memberApplyId ? 1 : 2;
        $result = array(
            'use_status'=>$use_status,
        );
        $this->success('成功请求',$result);
    }


}



 