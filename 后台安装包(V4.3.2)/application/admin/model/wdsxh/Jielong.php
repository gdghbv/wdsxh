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

namespace app\admin\model\wdsxh;

use EasyWeChat\Factory;
use think\Model;
use traits\model\SoftDelete;

class Jielong extends Model
{

    use SoftDelete;



    // 表名
    protected $name = 'wdsxh_jielong';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'type_text',
        'expire_time_text',
        'status_text',
        'applet_jielong_qrcode_path'
    ];


    protected static function init()
    {
        self::afterInsert(function ($row) {
            $pk = $row->getPk();
            $row->getQuery()->where($pk, $row[$pk])->update(['weigh' => $row[$pk]]);
        });
    }


    public function getTypeList()
    {
        return ['1' => __('Type 1'), '2' => __('Type 2')];
    }

    public function getStatusList()
    {
        return ['normal' => __('Status normal'), 'hidden' => __('Status hidden')];
    }


    public function getTypeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['type']) ? $data['type'] : '');
        $list = $this->getTypeList();
        return isset($list[$value]) ? $list[$value] : '';
    }


    public function getExpireTimeTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['expire_time']) ? $data['expire_time'] : '');
        return is_numeric($value) ? date("Y-m-d H:i:s", $value) : $value;
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    protected function setExpireTimeAttr($value)
    {
        return $value === '' ? null : ($value && !is_numeric($value) ? strtotime($value) : $value);
    }

    public function getJielongAuthList()
    {
        return ['1' => __('Jielong_auth 1'), '2' => __('Jielong_auth 2')];
    }

    public function getAppletJielongQrcodePathAttr($value, $data)
    {
        $row = $data;
        $save_path = '/uploads/wdsxh/applet_jielong_qrcode/'.$row['id'].'/'.$row['createtime'].'.png';
        if (is_file(ROOT_PATH."public".$save_path)) {
            $value = $save_path;
        }  else {
            $ids = $row['id'];
            $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
            if (!empty($configObj['applet_appid']) && !empty($configObj['applet_secret'])) {
                $path = 'pagesTools/sequence/details';
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
                    $response->saveAs('uploads/wdsxh/applet_jielong_qrcode/'.$row['id'], $row['createtime'].'.png');
                    $value = $save_path;
                }
            }
        }
        if (!empty($value)) {
            $value = request()->domain().$value;
        }
        return $value;
    }


}
