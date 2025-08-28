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
namespace app\api\validate\wdsxh\member;

use addons\wdsxh\library\Wxapp;
use think\Validate;

/**
 * Class MemberApply
 * Desc  入会申请校验
 * Create on 2024/3/7 16:06
 * Create by wangyafang
 */
class MemberApply extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'type'=>'require',
        'data'=>'require|checkData',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'type.require'=>'请选择入会类型',
        'data.require'=>'内容不能为空',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'submit'  => ['type','data'],
    ];

    protected function checkData($value,$rule,$data)
    {
        //todo 腾讯校验增加开关
        $security_text_switch = (new \app\admin\model\wdsxh\Config())->where('id','1')->value('security_text_switch');
        $array = $value;
        if ($data['type'] == '1') {
            foreach ($array as $row) {
                if ($row['required'] == 1 && ($row['value'] === '' || $row['value'] === null)) {
                    if ($row['type'] == 'select' || $row['type'] == 'checkbox') {
                        return $row['option'] . '至少选择一个';
                    } else {
                        return $row['option'];
                    }
                }
                if ($row['field'] == 'mobile') {
                    if (!$value || !\think\Validate::regex($row['value'], "^1\d{10}$")) {
                        return '手机号格式不正确';
                    }
                    $memberApplyId = (new \app\api\model\wdsxh\member\MemberApply())
                        ->where('wechat_id','<>',$data['wechat_id'])
                        ->where('mobile',$row['value'])
                        ->value('id');
                    if ($memberApplyId) {
                        return '该手机号已被使用，请更换其他手机号！';
                    }
                }

            }
            //todo 腾讯校验增加开关
            if ($security_text_switch == '1' && isset($data['channel']) && $data['channel'] == 1) {
                $check_text = '';
                foreach ($data['data'] as $v) {
                    if (in_array($v['type'],['text','textarea']) && $v['field'] != 'address' && !empty($v['value'])) {
                        $check_text = $check_text.$v['value'];
                    }
                }
                if (!empty($check_text)) {
                    $openid = wdsxh_get_openid($data['wechat_id'],1);
                    $result = Wxapp::checkSecurityText($openid,$check_text);
                    if ($result != 1) {
                        if ($result == 2) {
                            return '文本内容输入不合规，请重新输入';
                        } else {
                            return 'errcode:'.$result['errcode'].',errmsg:'.$result['errmsg'];
                        }
                    }
                }
                unset($check_text);
            }
        } elseif ($data['type'] == 2) {
            foreach ($array['person'] as $row) {
                if ($row['required'] == 1 && ($row['value'] === '' || $row['value'] === null)) {
                    if ($row['type'] == 'select' || $row['type'] == 'checkbox') {
                        return $row['option'] . '至少选择一个';
                    } else {
                        return $row['option'];
                    }
                }
                if ($row['field'] == 'mobile') {
                    if (!$value || !\think\Validate::regex($row['value'], "^1\d{10}$")) {
                        return '手机号格式不正确';
                    }
                    $memberApplyId = (new \app\api\model\wdsxh\member\MemberApply())
                        ->where('wechat_id','<>',$data['wechat_id'])
                        ->where('mobile',$row['value'])
                        ->value('id');
                    if ($memberApplyId) {
                        return '该手机号已被使用，请更换其他手机号！';
                    }
                }
            }
            //todo 腾讯校验增加开关
            if ($security_text_switch == '1' && isset($data['channel']) && $data['channel'] == 1) {
                $check_text = '';
                foreach ($array['person'] as $v) {
                    if (in_array($v['type'],['text','textarea']) && $v['field'] != 'address' && !empty($v['value'])) {
                        $check_text = $check_text.$v['value'];
                    }
                }
                if (!empty($check_text)) {
                    $openid = wdsxh_get_openid($data['wechat_id'],1);
                    $result = Wxapp::checkSecurityText($openid,$check_text);
                    if ($result != 1) {
                        if ($result == 2) {
                            return '文本内容输入不合规，请重新输入';
                        } else {
                            return 'errcode:'.$result['errcode'].',errmsg:'.$result['errmsg'];
                        }
                    }
                }
                unset($check_text);
            }
            foreach ($array['company'] as $row) {
                if ($row['required'] == 1 && ($row['value'] === '' || $row['value'] === null)) {
                    if ($row['type'] == 'select' || $row['type'] == 'checkbox') {
                        return $row['option'] . '至少选择一个';
                    } else {
                        return $row['option'];
                    }
                }
            }
            //todo 腾讯校验增加开关
            if ($security_text_switch == '1' && isset($data['channel']) && $data['channel'] == 1) {
                $check_text = '';
                foreach ($array['company'] as $v) {
                    if (in_array($v['type'],['text','textarea']) && $v['field'] != 'address' && !empty($v['value'])) {
                        $check_text = $check_text.$v['value'];
                    }
                }
                if (!empty($check_text)) {
                    $openid = wdsxh_get_openid($data['wechat_id'],1);
                    $result = Wxapp::checkSecurityText($openid,$check_text);
                    if ($result != 1) {
                        if ($result == 2) {
                            return '文本内容输入不合规，请重新输入';
                        } else {
                            return 'errcode:'.$result['errcode'].',errmsg:'.$result['errmsg'];
                        }
                    }
                }
                unset($check_text);
            }
        } else {
            foreach ($array['person'] as $row) {
                if ($row['required'] == 1 && ($row['value'] === '' || $row['value'] === null)) {
                    if ($row['type'] == 'select' || $row['type'] == 'checkbox') {
                        return $row['option'] . '至少选择一个';
                    } else {
                        return $row['option'];
                    }
                }
                if ($row['field'] == 'mobile') {
                    if (!$value || !\think\Validate::regex($row['value'], "^1\d{10}$")) {
                        return '手机号格式不正确';
                    }
                    $memberApplyId = (new \app\api\model\wdsxh\member\MemberApply())
                        ->where('wechat_id','<>',$data['wechat_id'])
                        ->where('mobile',$row['value'])
                        ->value('id');
                    if ($memberApplyId) {
                        return '该手机号已被使用，请更换其他手机号！';
                    }
                }
            }
            //todo 腾讯校验增加开关
            if ($security_text_switch == '1' && isset($data['channel']) && $data['channel'] == 1) {
                $check_text = '';
                foreach ($array['person'] as $v) {
                    if (in_array($v['type'],['text','textarea']) && $v['field'] != 'address' && !empty($v['value'])) {
                        $check_text = $check_text.$v['value'];
                    }
                }
                if (!empty($check_text)) {
                    $openid = wdsxh_get_openid($data['wechat_id'],1);
                    $result = Wxapp::checkSecurityText($openid,$check_text);
                    if ($result != 1) {
                        if ($result == 2) {
                            return '文本内容输入不合规，请重新输入';
                        } else {
                            return 'errcode:'.$result['errcode'].',errmsg:'.$result['errmsg'];
                        }
                    }
                }
                unset($check_text);
            }
            foreach ($array['organize'] as $row) {
                if ($row['required'] == 1 && ($row['value'] === '' || $row['value'] === null)) {
                    if ($row['type'] == 'select' || $row['type'] == 'checkbox') {
                        return $row['option'] . '至少选择一个';
                    } else {
                        return $row['option'];
                    }
                }
            }
            //todo 腾讯校验增加开关
            if ($security_text_switch == '1' && isset($data['channel']) && $data['channel'] == 1) {
                $check_text = '';
                foreach ($array['organize'] as $v) {
                    if (in_array($v['type'],['text','textarea']) && $v['field'] != 'address' && !empty($v['value'])) {
                        $check_text = $check_text.$v['value'];
                    }
                }
                if (!empty($check_text)) {
                    $openid = wdsxh_get_openid($data['wechat_id'],1);
                    $result = Wxapp::checkSecurityText($openid,$check_text);
                    if ($result != 1) {
                        if ($result == 2) {
                            return '文本内容输入不合规，请重新输入';
                        } else {
                            return 'errcode:'.$result['errcode'].',errmsg:'.$result['errmsg'];
                        }
                    }
                }
                unset($check_text);
            }
        }


        return true;
    }

    protected function checkMobile($value,$rule,$data)
    {
        if (!$value || !\think\Validate::regex($value, "^1\d{10}$")) {
            return '手机号格式不正确';
        }
        return true;
    }
}



 