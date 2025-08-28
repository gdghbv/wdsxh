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
 * Class WxExpress
 * Desc  微信小程序发货信息管理服务
 * Create on 2025/2/28 15:51
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use addons\wdsxh\library\Wxapp;
use app\api\model\wdsxh\activity\Order;
use app\api\model\wdsxh\member\Pay;
use app\common\controller\Api;

class WxExpress extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    public function delivery_state(){
        // todo 文档定时任务
        $delivery_management = (new \app\admin\model\wdsxh\Config())->where('id',1)->value('delivery_management');
        if ($delivery_management == 1){
            $activityOrderObj = (new Order())->where('paid',2)->where('delivery_state',1)
                ->where('trade_no','not in','')
                ->select();
            foreach ($activityOrderObj as $item){
                $activityObj = (new \app\api\model\wdsxh\activity\Activity())
                    ->where('id',$item['activity_id'])
                    ->find();
                $delivery = Wxapp::upload_shipping_info(2,$item['trade_no'],1,3,'','',$activityObj['name'],'',wdsxh_get_openid($item['wechat_id'],1));
                Log::record($delivery,'activity_delivery_upload_shipping_info');
            }

            $memberPayObj = (new Pay())->where('paid',2)->where('delivery_state',1)
                ->where('trade_no','not in','')
                ->select();
            foreach ($memberPayObj as $item){
                $delivery = Wxapp::upload_shipping_info(2,$item['trade_no'],1,3,'','','会费缴纳','',wdsxh_get_openid($item['wechat_id'],1));
                Log::record($delivery,'member_pay_delivery_upload_shipping_info');
            }

        }
        $this->success('请求成功');
    }
}



 