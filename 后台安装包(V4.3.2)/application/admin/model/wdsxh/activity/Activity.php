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

namespace app\admin\model\wdsxh\activity;

use EasyWeChat\Factory;
use think\Model;


class Activity extends Model
{





    // 表名
    protected $name = 'wdsxh_activity';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'organizing_method_text',
        'apply_time_text',
        'start_time_text',
        'end_time_text',
        'state_text',
        'is_verifying_text',
        'status_text',
        'applet_activity_qrcode_path'
    ];


    protected static function init()
    {
        self::afterInsert(function ($row) {
            $pk = $row->getPk();
            $row->getQuery()->where($pk, $row[$pk])->update(['weigh' => $row[$pk]]);
        });
    }


    public function getOrganizingMethodList()
    {
        return ['1' => __('Organizing_method 1'), '2' => __('Organizing_method 2')];
    }

    public function getStateList()
    {
        return ['1' => __('State 1'), '2' => __('State 2'), '3' => __('State 3')];
    }

    public function getIsVerifyingList()
    {
        return ['1' => __('Is_verifying 1'), '2' => __('Is_verifying 2')];
    }

    public function getStatusList()
    {
        return ['normal' => __('Status normal'), 'hidden' => __('Status hidden')];
    }


    public function getOrganizingMethodTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['organizing_method']) ? $data['organizing_method'] : '');
        $list = $this->getOrganizingMethodList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getApplyTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['apply_time']) ? $data['apply_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getStartTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['start_time']) ? $data['start_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getEndTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['end_time']) ? $data['end_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getStateTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['state']) ? $data['state'] : '');
        $list = $this->getStateList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getIsVerifyingTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['is_verifying']) ? $data['is_verifying'] : '');
        $list = $this->getIsVerifyingList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected function setApplyTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setStartTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    protected function setEndTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    public function getActivityAuthList()
    {
        return ['1' => __('Activity_auth 1'), '2' => __('Activity_auth 2')];
    }

    //todo 活动创建后，会员功能对外功能不可用，非会员无法报名
    public function getNonMemberRegistrationStatusList()
    {
        return ['1' => __('Non_member_registration_status 1'), '2' => __('Non_member_registration_status 2')];
    }

    public function getVerificationMethodList()
    {
        return ['1' => __('Verification_method 1'), '2' => __('Verification_method 2')];
    }

    public function getAppletActivityQrcodePathAttr($value, $data)
    {
        $row = $data;
        $row['createtime'] = self::where('id',$row['id'])->value('createtime');
        $save_path = '/uploads/wdsxh/applet_activity_qrcode/'.$row['id'].'/'.$row['createtime'].'.png';
        if (is_file(ROOT_PATH."public".$save_path)) {
            $value = $save_path;
        }  else {
            if(isset($row['id'])) {
                $ids = $row['id'];
                $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
                if (!empty($configObj['applet_appid']) && !empty($configObj['applet_secret'])) {
                    $path = 'pagesActivity/index/details';
                    $config = [
                        'app_id' => $configObj['applet_appid'],
                        'secret' => $configObj['applet_secret'],
                        'response_type' => 'array',
                        'log' => [
                            'level' => 'debug',
                        ],
                    ];

                    $app = Factory::miniProgram($config);

                    $response  = $app->app_code->getUnlimit($ids, [
                        'page'  => $path,
                        'check_path'  => false,
                    ]);

                    if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                        $response->saveAs('uploads/wdsxh/applet_activity_qrcode/'.$row['id'], $row['createtime'].'.png');
                        $value = $save_path;
                    }
                }
            }

        }
        if (!empty($value)) {
            $value = request()->domain().$value;
        }
        return $value;
    }

    public function getPointsStatusList()
    {
        return ['2' => __('Points_status 2'), '1' => __('Points_status 1')];
    }

    public function getApplyFieldStateList()
    {
        return ['2' => __('Apply_field_state 2'), '1' => __('Apply_field_state 1')];
    }


}
