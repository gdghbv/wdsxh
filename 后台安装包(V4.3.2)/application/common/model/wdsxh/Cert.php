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
namespace app\common\model\wdsxh;

/**
 * Class Cert
 * Desc  证书模型
 * Create on 2024/3/20 15:10
 * Create by wangyafang
 */
class Cert extends \think\Model
{
// 表名
    protected $name = 'wdsxh_member_cert';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    public static function get_cert_data($type, $applyObj,$member_id) {
        $custom_content = json_decode($applyObj['custom_content'],true);
        $result = array();
        if ($type == '1') {
            foreach ($custom_content as $v) {
                if ($v['type'] == 'cert' && isset($v['value']['image']) && !empty($v['value']['image'])) {
                    $result[] = array(
                        'name'=>$v['value']['name'],
                        'number'=>$v['value']['number'],
                        'image'=>$v['value']['image'],
                        'member_id'=>$member_id,
                        'wechat_id'=>$applyObj['wechat_id'],
                        'channel'=>$applyObj['channel'],
                    );
                }
            }
        } elseif ($type == '2') {
            foreach ($custom_content['person'] as $v) {
                if ($v['type'] == 'cert' && isset($v['value']['image']) && !empty($v['value']['image'])) {
                    $result[] = array(
                        'name'=>$v['value']['name'],
                        'number'=>$v['value']['number'],
                        'image'=>$v['value']['image'],
                        'member_id'=>$member_id,
                        'wechat_id'=>$applyObj['wechat_id'],
                        'channel'=>$applyObj['channel'],
                    );
                }
            }
            foreach ($custom_content['company'] as $v) {
                if ($v['type'] == 'cert' && isset($v['value']['image']) && !empty($v['value']['image'])) {
                    $result[] = array(
                        'name'=>$v['value']['name'],
                        'number'=>$v['value']['number'],
                        'image'=>$v['value']['image'],
                        'member_id'=>$member_id,
                        'wechat_id'=>$applyObj['wechat_id'],
                        'channel'=>$applyObj['channel'],
                    );
                }
            }
        } else {
            foreach ($custom_content['person'] as $v) {
                if ($v['type'] == 'cert' && isset($v['value']['image']) && !empty($v['value']['image'])) {
                    $result[] = array(
                        'name'=>$v['value']['name'],
                        'number'=>$v['value']['number'],
                        'image'=>$v['value']['image'],
                        'member_id'=>$member_id,
                        'wechat_id'=>$applyObj['wechat_id'],
                        'channel'=>$applyObj['channel'],
                    );
                }
            }
            foreach ($custom_content['organize'] as $v) {
                if ($v['type'] == 'cert' && isset($v['value']['image']) && !empty($v['value']['image'])) {
                    $result[] = array(
                        'name'=>$v['value']['name'],
                        'number'=>$v['value']['number'],
                        'image'=>$v['value']['image'],
                        'member_id'=>$member_id,
                        'wechat_id'=>$applyObj['wechat_id'],
                        'channel'=>$applyObj['channel'],
                    );
                }
            }
        }
        return $result;
    }
}



 