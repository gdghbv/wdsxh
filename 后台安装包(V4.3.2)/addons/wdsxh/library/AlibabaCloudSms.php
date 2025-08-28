<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力中小企业发展
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdadmin.cn    All rights reserved.
// +----------------------------------------------------------------------
// | Wdadmin系统产品软件并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.wdadmin.cn
// +----------------------------------------------------------------------
/**
 * Class Sample
 * Desc  阿里云短信demo
 * Create on 2025/5/22 13:35
 * Create by wangyafang
 */

namespace addons\wdsxh\library;




use addons\qcloudsms\library\SmsSingleSender;
use addons\qcloudsms\library\SmsVoiceVerifyCodeSender;
use addons\qcloudsms\library\TtsVoiceSender;
use AlibabaCloud\SDK\Dysmsapi\V20170525\Dysmsapi;
use \Exception;
use AlibabaCloud\Tea\Exception\TeaError;
use AlibabaCloud\Tea\Utils\Utils;

use Darabonba\OpenApi\Models\Config;
use AlibabaCloud\SDK\Dysmsapi\V20170525\Models\SendSmsRequest;
use AlibabaCloud\Tea\Utils\Utils\RuntimeOptions;

class AlibabaCloudSms {

    /**
     * 使用凭据初始化账号Client
     * @return Dysmsapi Client
     */
    public static function createClient(){
        // 工程代码建议使用更安全的无AK方式，凭据配置方式请参见：https://help.aliyun.com/document_detail/311677.html。
        $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
        $config = new Config([
            'type' => 'access_key',
            'accessKeyId' => $configObj['alibaba_cloud_access_key_id'],
            'accessKeySecret' => $configObj['alibaba_cloud_access_key_secret'],
        ]);
        // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
        $config->endpoint = "dysmsapi.aliyuncs.com";
        return new Dysmsapi($config);
    }

    /**
     * @param string[] $args
     * @return void
     */
    public static function main($args){
        $client = self::createClient();

        $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
        $args['signName'] = $configObj['alibaba_cloud_sign_name'];
        $sendSmsRequest = new SendSmsRequest($args);
        $runtime = new \AlibabaCloud\Dara\Models\RuntimeOptions();
        try {
            // 复制代码运行请自行打印 API 的返回值
            $res = $client->sendSmsWithOptions($sendSmsRequest, $runtime);
            return $res;
        }
        catch (Exception $error) {
            if (!($error instanceof TeaError)) {
                $error = new TeaError([], $error->getMessage(), $error->getCode(), $error);
            }

            return $error;
        }
    }
}



 