<?php

namespace addons\wdsxh\library;

use app\admin\model\wdsxh\Config;
use app\admin\model\wdsxh\mall\Order;
use EasyWeChat\Factory;
use think\Exception;
use think\Log;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Pool;
use GuzzleHttp\Exception\ClientException;

/**
 * 微信处理类
 */
class Wxapp
{
    public static function wxappInit($type = 0)
    {
        try {
            $site = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();

            if ($type == 1) {
                if (empty($site['mch_id'])) {
                    throw new \think\Exception('微信支付商户号未配置');
                }
                if (empty($site['key'])) {
                    throw new \think\Exception('微信支付秘钥未配置');
                }
            }
            $appid = trim($site['applet_appid']);
            $secret = trim($site['applet_secret']);
            if ($type == 2) {
                $appid = trim($site['wananchi_appid']);
                $secret = trim($site['wananchi_secret']);
            }

            $config = [
                'app_id' => $appid,
                'secret' => $secret,
                'mch_id' => empty($site['mch_id']) ? '' : trim($site['mch_id']),
                'key' => empty($site['key']) ? '' : trim($site['key']),
                'cert_path' => empty($site['cert_path']) ? '' : ROOT_PATH . 'public' . trim($site['cert_path']),
                'key_path' => empty($site['key_path']) ? '' : ROOT_PATH . 'public' . trim($site['key_path']),
                'notify_url' => '',
                'response_type' => 'array',
                'log' => [
                    'level' => 'debug',
                    'file' => RUNTIME_PATH . 'wechat.log',
                ],
            ];
            if ($type == 0) {
                return Factory::miniProgram($config);
            } else {
                return Factory::payment($config);
            }
        } catch (Exception $e) {
            die($e->getMessage());
        }
    }

    public static function getApp()
    {
        return self::wxappInit();
    }

    public static function getPay()
    {
        return self::wxappInit(1);
    }

    public static function getPayWxofficial()
    {
        return self::wxappInit(2);
    }

    public static function wxlogin($code)
    {
        return self::getApp()->auth->session($code);
    }

    public static function unify($body, $sn, $money, $openid, $notify_url)
    {
        $pay = self::getPay();
        $result = $pay->order->unify([
            'body' => $body,
            'out_trade_no' => $sn,
            'total_fee' => $money * 100,
            'notify_url' => $notify_url,
            'trade_type' => 'JSAPI',
            'openid' => $openid,
        ]);
        if ($result && $result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS' && isset($result['prepay_id'])) {
            return $pay->jssdk->bridgeConfig($result['prepay_id'], false);
        } else {
            Log::record([
                'body' => $body,
                'out_trade_no' => $sn,
                'total_fee' => $money * 100,
                'notify_url' => $notify_url,
                'trade_type' => 'JSAPI',
                'openid' => $openid,
            ], 'info');
            Log::record($result, 'info');
            throw new \think\Exception(isset($result['return_msg']) ? $result['return_msg'] : '统一下单发生错误');
        }
    }

    public static function unify_wxofficial($body, $sn, $money, $openid, $notify_url)
    {
        $pay = self::getPayWxofficial();
        $result = $pay->order->unify([
            'body' => $body,
            'out_trade_no' => $sn,
            'total_fee' => $money * 100,
            'notify_url' => $notify_url,
            'trade_type' => 'JSAPI',
            'openid' => $openid,
        ]);

        if ($result && $result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS' && isset($result['prepay_id'])) {
            return $pay->jssdk->bridgeConfig($result['prepay_id'], false);
        } else {
            Log::record([
                'body' => $body,
                'out_trade_no' => $sn,
                'total_fee' => $money * 100,
                'notify_url' => $notify_url,
                'trade_type' => 'JSAPI',
                'openid' => $openid,
            ], 'info');
            Log::record($result, 'info');
            throw new \think\Exception(isset($result['err_code_des']) ? $result['err_code_des'] : '统一下单发生错误');
        }
    }

    public static function weixinunify($body, $sn, $money, $openid, $notify_url)
    {
        $pay = self::getPay();
        $result = $pay->order->unify([
            'body' => $body,
            'out_trade_no' => $sn,
            'total_fee' => $money * 100,
            'notify_url' => $notify_url,
            'trade_type' => 'MWEB',
            'openid' => $openid,
        ]);
        p($result);
        if ($result && $result['return_code'] == 'SUCCESS' && $result['result_code'] == 'SUCCESS' && isset($result['prepay_id'])) {
            return $pay->jssdk->bridgeConfig($result['prepay_id'], false);
        } else {
            Log::record([
                'body' => $body,
                'out_trade_no' => $sn,
                'total_fee' => $money * 100,
                'notify_url' => $notify_url,
                'trade_type' => 'JSAPI',
                'openid' => $openid,
            ], 'info');
            Log::record($result, 'info');
            throw new \think\Exception(isset($result['return_msg']) ? $result['return_msg'] : '统一下单发生错误');
        }
    }

    /*
     * 退款操作
     */
    public static function payRefund($number, $refundNumber, $refundFee, $config = null)
    {
        $pay = self::getPay();
        try {
            $result = $pay->refund->byOutTradeNumber($number, $refundNumber, intval($refundFee * 100), intval($refundFee * 100), $config ? $config : [
                'refund_desc' => '支付后退款',
            ]);
        } catch (\Exception $e) {
            die($e->getMessage());
        }
        return $result;
    }

    public static function phone($code, $iv, $encryptedData)
    {
        $app = self::getApp();
        $openid = $app->auth->session($code);
        if (empty($openid['openid']) || empty($openid['session_key'])) {
            throw new \think\Exception('小程序登录失败');
        }
        return $app->encryptor->decryptData($openid['session_key'], $iv, $encryptedData);
    }

    public static function getQrcode($path)
    {
        $app = self::getApp();
        $response = $app->app_code->get($path, array('width' => 280, 'is_hyaline' => true));
        //$response = $app->app_code->getQrCode($path,280);
        if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
            $savePath = ROOT_PATH . 'public' . DS . 'uploads'.DS.'wdsxh'.DS.'qrcode' . DS;
            if (!is_dir($savePath)) {
                mkdir($savePath, 0777, true);
            }
            $filename = time() . mt_rand(1000, 9999) . '.png';
            $response->saveAs($savePath, $filename);
            return $savePath . $filename;
        }
        return false;
    }

    public static function subscribeMessage($template_id, $openid, $page, $data)
    {
        if(empty($template_id) || empty($openid) || empty($data)){
            return false;
        }
        $app = self::getApp();
        $accessToken = $app->access_token;
        $token = $accessToken->getToken(true);
        $url = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token={$token['access_token']}";
        $content = [
            'template_id' => trim($template_id),
            'touser' => '',
            'page' => trim($page),
            'data' => $data,
        ];
        //$response=$app->subscribe_message->send($data);
        $client = new Client();
        $openids = [];
        if (is_string($openid)) {
            $openids[] = $openid;
        } elseif (is_array($openid)) {
            $openids = $openid;
        } else {
            throw new Exception('openid类型错误');
        }
        try {
            $requests = function ($total) use ($client, $url, $content, $openids) {
                foreach ($openids as $row) {
                    $content['touser'] = $row;
                    yield function () use ($client, $url, $content) {
                        $options = [
                            'headers' => ['Content-Type' => 'application/json'],
                            'body' => json_encode($content)
                        ];
                        return $client->postAsync($url, $options);
                    };
                }
            };
            $res = [];
            $pool = new Pool($client, $requests(count($openids)), [
                'concurrency' => count($openids),
                'fulfilled' => function ($response, $index) use (&$res) {
                    $res[$index] = json_decode($response->getBody()->getContents(), true);
                },
                'rejected' => function ($reason, $index) use (&$res) {
                    $res[$index] = $reason;
                },
            ]);
            $promise = $pool->promise();
            $promise->wait();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        } catch (ClientException $e) {
            throw new Exception($e->getMessage());
        }
        return $res;
    }

    public static function uniformSend($openid, $mp_template_msg)
    {
        $app = self::getApp();
        $accessToken = $app->access_token;
        $token = $accessToken->getToken();
        $url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=' . $token['access_token'];
        $data = [
            'touser' => $openid,
            'mp_template_msg' => $mp_template_msg
        ];
        $response = self::httpPost($url, $data);

    }

    private static function httpPost($url, $data)
    {
        $curlPost = json_encode($data);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $return_str = curl_exec($curl);
        curl_close($curl);
        return $return_str;
    }

    public static function checkSecurityText($openId,$content)
    {
        $app = self::getApp();
        $accessToken = $app->access_token;
        $token = $accessToken->getToken();
        $url = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=".$token['access_token'];
        $data = [
            'openid' => $openId,
            'scene' => 2,
            'version' => 2,
            'content' => $content,
        ];
        $response = self::httpPostCheckText($url, $data);

        $result = json_decode($response,true);
        if ($result['errcode'] != 0) {
            if ($result['errcode'] == 40001) {
                $token = $accessToken->getToken(true);
                $url = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=".$token['access_token'];
                $fileType = mb_detect_encoding($content, array('UTF-8','GBK','LATIN1','BIG5'));
                if($fileType != 'UTF-8') {
                    $content = mb_convert_encoding($content ,'utf-8', $fileType);
                }
                $data = [
                    'openid' => $openId,
                    'scene' => 2,
                    'version' => 2,
                    'content' => $content,
                ];
                $response = self::httpPostCheckText($url, $data);
                $result = json_decode($response,true);
            }
            return $result;
        }
        if (isset($result['errcode']) && $result['errcode'] == 0 && isset($result['result']) && $result['result']['suggest']=='pass') {
            return 1;
        } else {
            return 2;
        }
    }

    private static function httpPostCheckText($url, $data)
    {
        $curlPost = json_encode($data, JSON_UNESCAPED_UNICODE);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $return_str = curl_exec($curl);
        curl_close($curl);
        return $return_str;
    }

    //订单发货
    //$order_number_type = 订单单号类型，用于确认需要上传详情的订单。枚举值1，使用下单商户号和商户侧单号；枚举值2，使用微信支付单号
    //transaction_id = 原支付交易对应的微信订单号
    //delivery_mode = 发货模式，发货模式枚举值：1、UNIFIED_DELIVERY（统一发货）2、SPLIT_DELIVERY（分拆发货） 示例值: UNIFIED_DELIVERY
    //logistics_type = 物流模式，发货方式枚举值：1、实体物流配送采用快递公司进行实体物流配送形式 2、同城配送 3、虚拟商品，虚拟商品，例如话费充值，点卡等，无实体配送形式 4、用户自提
    //tracking_no = 物流单号，物流快递发货时必填，示例值: 323244567777 字符字节限制: [1, 128]
    //express_company = 物流公司编码，快递公司ID，参见「查询物流公司编码列表」，物流快递发货时必填， 示例值: DHL 字符字节限制: [1, 128]
    //item_desc = 商品信息，例如：微信红包抱枕*1个，限120个字以内
    //consignor_contact = 寄件人联系方式，寄件人联系方式，采用掩码传输，最后4位数字不能打掩码 示例值: `189****1234, 021-****1234, ****1234, 0**2-***1234, 0**2-******23-10, ****123-8008` 值限制: 0 ≤ value ≤ 1024
    //upload_time =  上传时间，用于标识请求的先后顺序 示例值: `2022-12-15T13:29:35.120+08:00`
    //openid =  用户标识，用户在小程序appid下的唯一标识。 下单前需获取到用户的Openid 示例值: oUpF8uMuAJO_M2pxb1Q9zNjWeS6o 字符字节限制: [1, 128]
    public static function upload_shipping_info($order_number_type,$transaction_id,$delivery_mode,$logistics_type,$tracking_no,$express_company,$item_desc,$consignor_contact,$openid)
    {
        $app = self::getApp();
        $accessToken = $app->access_token;
        $token = $accessToken->getToken();
        $url = 'https://api.weixin.qq.com/wxa/sec/order/upload_shipping_info?access_token='.$token['access_token'];
        $data = [
            'order_key' => [
                'order_number_type' => $order_number_type,
                'transaction_id' => $transaction_id,
            ],
            'delivery_mode' => $delivery_mode,
            'logistics_type' => $logistics_type,
            'shipping_list' => [
                [
                    'tracking_no' => $tracking_no,
                    'express_company' => $express_company,
                    'item_desc' => $item_desc,
                    'contact' => [
                        'consignor_contact' => '+86-'.$consignor_contact,
                    ],
                ],
            ],
            'upload_time' => date('Y-m-d',time()).'T'.date('h:i:s',time()).'.120+08:00',
            'payer' => [
                'openid' => $openid,
            ],
        ];
        Log::record($data,'delivery_data');
        $response = self::httpPosts($url, $data);
        $response = json_decode($response, true);
        if ($response['errcode'] == 0){
            $data = [
                'code' => $response['errcode'],
                'errmsg' => $response['errmsg'],
            ];;
            return $data;
        }else{
            $data = [
                'code' => $response['errcode'],
                'errmsg' => $response['errmsg'],
            ];
        }
        return $data;
    }




    public static function get_order($transaction_id)
    {
        $app = self::getApp();
        $accessToken = $app->access_token;
        $token = $accessToken->getToken();
        $url = 'https://api.weixin.qq.com/wxa/sec/order/get_order?access_token='.$token['access_token'];
        $data = [
            'transaction_id' => $transaction_id,
            "merchant_id"=> (new Config())->where('id',1)->value('mch_id'),
            "merchant_trade_no"=> (new Order())->where('trade_no',$transaction_id)->value('order_no'),
        ];
        Log::record($data,'get_order');
        $response = self::httpPosts($url, $data);
        $response = json_decode($response, true);
        if ($response['errcode'] == 0){
            $data = [
                'code' => $response['errcode'],
                'errmsg' => $response['errmsg'],
                'order'=>isset($response['order']) ? $response['order'] : [],
            ];;
            return $data;
        }else{
            $data = [
                'code' => $response['errcode'],
                'errmsg' => $response['errmsg'],
            ];
        }
        return $data;
    }

    private static function httpPosts($url, $data)
    {
        $curlPost = json_encode($data, JSON_UNESCAPED_UNICODE); // 确保以 UTF-8 编码发送数据
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); // 允许获取返回内容
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);

        // 设置 HTTP 头信息，确保是 UTF-8 编码
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json; charset=UTF-8',
        ]);
        $return_str = curl_exec($curl);
        // 错误检查
        if(curl_errno($curl)) {
            // 错误处理
            echo 'Curl error: ' . curl_error($curl);
        }
        curl_close($curl);
        // 返回响应结果
        return $return_str;
    }

}
