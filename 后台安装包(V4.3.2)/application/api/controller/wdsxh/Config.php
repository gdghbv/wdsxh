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
 * Class Config
 * Desc  系统配置控制器
 * Create on 2024/3/16 8:56
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use app\api\model\wdsxh\member\JoinConfig;
use app\common\controller\Api;

class Config extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];
    protected $configObj = null;
    protected $association = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->configObj = (new \app\admin\model\wdsxh\Config())->get(1);
        $this->association = (new \app\api\model\wdsxh\business\Association());
    }

    /**
     * Desc  协议
     * Create on 2024/3/16 8:59
     * Create by wangyafang
     */
    public function agreement()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $type = $this->request->get('type');
        if ($type == 1) {//用户协议
            $data = $this->configObj->user_agreement;
        } elseif ($type == 2) {//隐私政策
            $data = $this->configObj->privacy_policy;
        } else {//入会协议
            $data = $this->association->where('id',1)->value('notice');
        }
        $this->success('请求成功',['content'=>$data]);

    }

    /**
     * Desc  入会类型启用状态
     * Create on 2024/3/19 10:59
     * Create by wangyafang
     */
    public function join_config()
    {
        $list = (new JoinConfig())->select();
        foreach ($list as &$row) {
            if (empty($row['name']) && $row['type'] == 1) {
                $row['name'] = '个人入会';
                $row->save();
            }
            if (empty($row['name']) && $row['type'] == 2) {
                $row['name'] = '企业入会';
                $row->save();
            }
            if (empty($row['name']) && $row['type'] == 3) {
                $row['name'] = '团体入会';
                $row->save();
            }
        }
        $data = (new JoinConfig())->where('status','normal')->field('type,name')->order('weigh desc,id asc')->select();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  系统配置
     * Create on 2024/3/26 09:00
     * Create by @小趴菜
     */
    public function config(){
        $list = (new JoinConfig())->select();
        foreach ($list as &$row) {
            if (empty($row['name']) && $row['type'] == 1) {
                $row['name'] = '个人入会';
                $row->save();
            }
            if (empty($row['name']) && $row['type'] == 2) {
                $row['name'] = '企业入会';
                $row->save();
            }
            if (empty($row['name']) && $row['type'] == 3) {
                $row['name'] = '团体入会';
                $row->save();
            }
        }
        $configObj = $this->configObj
            ->where('id',1)
            ->field('id,organize,theme_colors,share_title,share_image,
            applet_initiation_admin,applet_initiation_audit,applet_initiation_success,
            applet_member_expiretime,applet_activity_apply,jielong_img,questionnaire_img,login_img,
            applet_record_number,            
            wananchi_appid,
            technical_support_image,jump_type,jump_link,call_mobile,
            domain_record_number,public_security_record_number,
            delivery_management,
            applet_order_shipping_notification,applet_confirm_receipt_notification')
            ->find();

        $data = [
            'organize' => $configObj['organize'],
            'theme_colors' => $configObj['theme_colors'],
            'share_title' => $configObj['share_title'],
            'share_image' => wdsxh_full_url($configObj['share_image']),
            'applet_record_number'=>$configObj['applet_record_number'],
            'subscribe_msg_tpl_ids'=>array(
                'applet_initiation_admin'=>empty($configObj['applet_initiation_admin'])?null:trim($configObj['applet_initiation_admin']),
                'applet_initiation_audit'=>empty($configObj['applet_initiation_audit'])?null:trim($configObj['applet_initiation_audit']),
                'applet_initiation_success'=>empty($configObj['applet_initiation_success'])?null:trim($configObj['applet_initiation_success']),
                'applet_member_expiretime'=>empty($configObj['applet_member_expiretime'])?null:trim($configObj['applet_member_expiretime']),
                'applet_activity_apply'=>empty($configObj['applet_activity_apply'])?null:trim($configObj['applet_activity_apply']),
                'applet_order_shipping_notification'=>empty($configObj['applet_order_shipping_notification'])?null:trim($configObj['applet_order_shipping_notification']),
                'applet_confirm_receipt_notification'=>empty($configObj['applet_confirm_receipt_notification'])?null:trim($configObj['applet_confirm_receipt_notification']),
            ),
            'jielong_img' => wdsxh_full_url($configObj['jielong_img']),
            'questionnaire_img' => wdsxh_full_url($configObj['questionnaire_img']),
            'login_img' => wdsxh_full_url($configObj['login_img']),
            'wananchi_appid' => $configObj['wananchi_appid'],
            'technical_support_image' => wdsxh_full_url($configObj['technical_support_image']),
            'jump_type' => $configObj['jump_type'],
            'jump_link' => $configObj['jump_link'],
            'call_mobile' => $configObj['call_mobile'],
            'domain_record_number' => $configObj['domain_record_number'],
            'public_security_record_number' => $configObj['public_security_record_number'],
            'version'=>'V4.3.2',
            'delivery_management'=>$configObj['delivery_management'],
            'join_config'=>(new JoinConfig())->field('type,name')->order('weigh desc,id asc')->select(),
        ];
        $this->success('请求成功',$data);
    }




}



 