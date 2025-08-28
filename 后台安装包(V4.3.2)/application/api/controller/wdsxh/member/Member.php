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
 * Class Member
 * Desc  会员列表
 * Create on 2024/3/14 17:07
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\member;


use addons\wdsxh\library\AlibabaCloudSms;
use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\member\AuthConfig;
use app\admin\model\wdsxh\member\FeesConfig;
use app\admin\model\wdsxh\member\Level;
use app\api\model\wdsxh\business\Association;
use app\api\model\wdsxh\member\MemberAlreadyExpireMessage;
use app\api\model\wdsxh\member\MemberExpireMessage;
use app\api\model\wdsxh\member\Pay;
use app\api\model\wdsxh\member\Visitor;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\Exception;


class Member extends Api
{
    protected $noNeedLogin = ['notify','index','send_expire_message','unit','member_map_list','auth','diy_list','send_already_expire_message'];
    protected $noNeedRight = ['*'];
    protected $model = null;
    protected $memberAuthConfigObj = null;
    protected $configObj = '';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\member\Member();
        $this->memberAuthConfigObj = (new AuthConfig())->get(1);
        $this->configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
    }

    /**
     * Desc  会费缴纳详情
     * Create on 2024/3/15 14:05
     * Create by wangyafang
     */
    public function membershipPayDetail()
    {
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $memberObj = $this->model->where('wechat_id', $wechat_id)->field('id,member_level_id,join_time,expire_time')->find();
        $row = $memberObj;
        $applyObj = (new \app\api\model\wdsxh\member\MemberApply())->where('wechat_id', $wechat_id)->find();
        if (!$memberObj) {
            if (!$applyObj) {
                $this->error('入会信息不存在');
            }
            if ($applyObj['state'] != '4' && empty($applyObj['pay_voucher'])) {
                if ($applyObj['state'] == '1') {
                    $this->error('入会信息待管理员审核通过');
                } elseif ($applyObj['state'] == '3') {
                    $this->error('入会信息被驳回，请重新提交审核');
                } else {
                    $this->error('发生未知错误，请联系系统管理员');
                }
            }
        }

        $levelObj = (new Level())->where('id',$applyObj['member_level_id'])->field('name,fees,content')->find();
        $memberObj['level_name'] = $levelObj['name'];
        $memberObj['pay_method'] = (new FeesConfig())->where('id',1)->value('pay_method');
        if ($memberObj['pay_method'] == '1') {
            $memberObj['fees'] = 0;
        } else {
            $memberObj['fees'] = $levelObj['fees'];
        }
        $memberObj['content'] = $levelObj['content'];

        $memberObj['join_time'] = !empty($row) ? $row['join_time'] : '';
        $join_time = !empty($row) ? $row['join_time'] : date('Y-m-d');
        $memberObj['expire_time'] = (!empty($row) && $row['expire_time'] > date('Y-m-d')) ? $row['expire_time'] : \app\common\model\wdsxh\member\Member::get_expire_time(date('Y-m-d'));
        $memberObj['join_time'] = str_replace('-','/',$memberObj['join_time']);
        $memberObj['expire_time'] = str_replace('-','/',$memberObj['expire_time']);
        $memberObj['apply_member_state'] = (new \app\api\controller\wdsxh\UserWechat())->query_apply_member_state($wechat_id);
        $memberObj['reject'] = $applyObj['reject'];

        $member_id = (new \app\api\model\wdsxh\member\Member())->where('wechat_id', $wechat_id)->value('id');
        $memberObj['pay_list'] = (new Pay())
            ->where('member_id', $member_id)
            ->where('wechat_id',$wechat_id)
            ->where('paid','2')
            ->field('pay_method,pay_time,fees')
            ->order('createtime desc')
            ->select();

        $this->success('请求成功',$memberObj);
    }

    /**
     * Desc  线下付款提交支付凭证
     * Create on 2024/3/20 16:39
     * Create by wangyafang
     */
    public function submit_pay_voucher()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $pay_voucher = $this->request->post('pay_voucher');
        if(empty($pay_voucher)) {
            $this->error('请上传付款凭证');
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');

        $memberApplyObj = (new \app\api\model\wdsxh\member\MemberApply())
            ->where('wechat_id',$wechat_id)
            ->where('child_state','4')
            ->where('state','1')
            ->find();
        if ($memberApplyObj) {
            $this->error('已上传支付凭证，请勿重复上传');
        }

        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)->find();
        if (!$memberObj) {//没有入会
            $memberApplyObj = (new \app\api\model\wdsxh\member\MemberApply())
                ->where('wechat_id',$wechat_id)
                ->find();
            if (!$memberApplyObj) {
                $this->error('入会信息不存在');
            }
            if(!in_array($memberApplyObj['child_state'],['3','5'])) {
                $this->error('入会信息状态错误');
            }
        } else {
            $current_date = date('Y-m-d',time());
            if ($memberObj['expire_time'] >= $current_date) {
                $this->error('会员未到期');
            }
            $memberApplyObj = (new \app\api\model\wdsxh\member\MemberApply())
                ->where('wechat_id',$wechat_id)
                ->where('state','in',['2','4'])
                ->find();
            if (!$memberApplyObj) {
                $this->error('续费入会信息不存在');
            }
            if ($memberApplyObj['state'] == '2') {
                if ($memberApplyObj['child_state'] != '6') {
                    $this->error('续费入会信息错误');
                }
            }
            if($memberApplyObj['state'] == '4' && !in_array($memberApplyObj['child_state'],['3','5'])) {
                $this->error('续费入会信息状态错误');
            }
        }
        $memberApplyObj->pay_voucher = $pay_voucher;
        $memberApplyObj->state = '1';
        $memberApplyObj->child_state = '4';
        $memberApplyObj->reject = '';
        $memberApplyObj->save();
        $this->success('提交成功');

    }

    /**
     * Desc  会费缴纳
     * Create on 2024/3/15 14:05
     * Create by wangyafang
     */
    public function membershipPay() {
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $applyObj = $memberApplyObj= (new \app\api\model\wdsxh\member\MemberApply())->where('wechat_id', $wechat_id)->find();
        if (!$memberApplyObj) {
            $this->error('入会信息不存在');
        }
        if(!in_array($memberApplyObj['child_state'],['3','5','6'])) {
            $this->error('入会信息状态错误');
        }
        $channel = $this->request->header('channel');
        $memberPayObj = (new Pay())->where('paid','1')
            ->where('wechat_id',$wechat_id)
            ->where('pay_method','2')
            ->find();
        if (!$memberPayObj) {
            //线上缴费
            $pay_data = array(
                'wechat_id'=>$wechat_id,
                'order_no'=> wdsxh_create_order(),
                'fees'=>(new Level())->where('id',$applyObj['member_level_id'])->value('fees'),
                'level_id'=>$applyObj['member_level_id'],
                'channel'=>$channel,
                'pay_method'=>'2',
            );
            $applyObj->pay_method = '2';
            Db::startTrans();
            try{
                $applyObj->save();
                $payModel = new Pay();
                $payModel->data($pay_data);
                $payModel->allowField(true)->save();
                // 提交事务
                Db::commit();
                $order_no = $payModel->order_no;
                $fees = $payModel->fees;
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $this->error($e->getMessage());
            }
        } else {
            $order_no = wdsxh_create_order();
            $memberPayObj->order_no = $order_no;
            $fees = $memberPayObj->fees;
            Db::startTrans();
            try{
                $applyObj->save();
                $memberPayObj->save();
                // 提交事务
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
                $this->error($e->getMessage());
            }
        }


        if ($channel == 1) {//小程序会员缴费
            try {
                $openid = wdsxh_get_openid($wechat_id,$channel);
                $conf = Wxapp::unify('会费缴纳', $order_no, $fees, $openid, request()->domain() . '/api/wdsxh/member/member/notify');
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            $this->success('success', $conf);
        } else {//公众号会员缴费
            try {
                $openid = wdsxh_get_openid($wechat_id,$channel);
                $conf = Wxapp::unify_wxofficial('会费缴纳', $order_no, $fees, $openid, request()->domain() . '/api/wdsxh/member/member/notify');
            } catch (\Exception $e) {
                $this->error($e->getMessage());
            }
            $this->success('success', $conf);
        }

    }

    /*
     * 会费缴纳支付回调处理
     */
    public function notify()
    {
        $pay = Wxapp::getPay();
        $response = $pay->handlePaidNotify(function ($message, $fail) {
            $orderObj = $payObj = (new Pay())->where('order_no', $message['out_trade_no'])->where('pay_method','2')->find();
            if (!$orderObj || $orderObj->paid == '2') {
                return true;
            }
            if ($message['return_code'] === 'SUCCESS') {
                if ($message['result_code'] === 'SUCCESS') {
                    $memberApplyObj = (new \app\api\model\wdsxh\member\MemberApply())
                        ->where('wechat_id',$orderObj['wechat_id'])
                        ->find();
                    if (!$memberApplyObj) {
                        $this->error('入会信息错误');
                    }
                    if (!in_array($memberApplyObj['state'],['4','3','2'])) {
                        $this->error('入会状态不是待付款或者已驳回');
                    }
                    if (!in_array($memberApplyObj['child_state'],['3','5','6'])) {
                        $this->error('入会子状态不是待付款或者线下已驳回');
                    }
                    $member_data = \app\common\model\wdsxh\member\Member::get_member_data($memberApplyObj);
                    $memberModel = new \app\api\model\wdsxh\member\Member();
                    $memberObj = $memberModel->where('wechat_id',$payObj['wechat_id'])->find();
                    if ($memberObj) {
                        $memberObj->expire_time = $member_data['expire_time'];
                        $memberObj->save();
                        $member_id = $memberObj['id'];
                    } else {
                        $memberModel->data($member_data);
                        $memberModel->allowField(true)->save();
                        $member_id = $memberModel->id;
                    }

                    $params['state'] = '2';//已通过
                    $params['child_state'] = '6';//已通过
                    $result = false;
                    Db::startTrans();
                    try {
                        $result = $memberApplyObj->allowField(true)->save($params);
                        $orderObj->trade_no = $message['transaction_id'];
                        $orderObj->pay_time = time();
                        $orderObj->paid = '2';
                        $orderObj->member_id = $member_id;
                        $orderObj->save();
                        Db::commit();
                    } catch (ValidateException|PDOException|Exception $e) {
                        Db::rollback();
                        $this->error($e->getMessage());
                    }
                    if (false === $result) {
                        $this->error(__('No rows were updated'));
                    }
                    $cert_data = \app\common\model\wdsxh\Cert::get_cert_data($memberApplyObj['type'],$memberApplyObj,$member_id);
                    if(!empty($cert_data)) {
                        $certModel = new \app\api\model\wdsxh\member\Cert();
                        $certModel->saveAll($cert_data);
                    }

                    if ($orderObj['channel'] == '1') {
                        //入会申请成功通知
                        $businessAssociationObj = (new Association())->get(1);
                        try {
                            $conf = $this->configObj;
                            $data = [
                                'thing3' => [
                                    'value' => mb_substr($businessAssociationObj['name'], 0, 20)
                                ],
                                'time2' => [
                                    'value' => date('Y-m-d H:i:s'),
                                ],
                                'thing1' => [
                                    'value' => mb_substr('恭喜您已成功加入' . $businessAssociationObj['name'], 0, 20),
                                ]
                            ];
                            $result = Wxapp::subscribeMessage($conf['applet_initiation_success'], trim(wdsxh_get_openid($memberApplyObj['wechat_id'],$orderObj['channel'])), '/pages/mine/index', $data);
                        } catch (\think\Exception $e) {
                            $this->error($e->getMessage());
                        }
                    } else {//公众号推送消息

                    }
                    $configObj = $this->configObj;
                    $phoneNumbers = $member_data['mobile'];
                    if (!empty($configObj['alibaba_cloud_sign_name'])
                        && !empty($configObj['alibaba_cloud_access_key_id'])
                        && !empty($configObj['alibaba_cloud_access_key_secret'])
                        && !empty($configObj['alibaba_initiation_success_notify'])
                        && !empty($phoneNumbers)
                    ) {
                        $level_name = preg_replace('/[^\x{4e00}-\x{9fa5}]/u', '',$member_data['member_level_name']);
                        if (empty($level_name)) {
                            $level_name = '用户';
                        }

                        $userSendSmsRequestParam = [
                            "phoneNumbers" => $phoneNumbers,
                            "templateCode" => $configObj['alibaba_initiation_success_notify'],
                            "templateParam" => "{'leavelname':'$level_name'}"
                        ];
                        AlibabaCloudSms::main($userSendSmsRequestParam);
                    }

                }
            } else {
                return $fail('FAIL');
            }

            return true;
        });
        $response->send();
    }

    /**
     * Desc  编辑资料详情
     * Create on 2024/3/18 16:04
     * Create by wangyafang
     */
    public function information_details()
    {
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $memberObj = $this->model->where('wechat_id',$wechat_id)->find();
        if (!$memberObj) {
            $this->error('会员信息不存在');
        }

        if ($memberObj['type'] == '1') {
            $custom_content = array(
                'person'=>\app\common\model\wdsxh\member\Member::get_custom_content_full_image($memberObj['type'],$memberObj['custom_content']),
                'mobile_auth'=>$memberObj['mobile_auth'],
            );
        } else {
            $custom_content_result = \app\common\model\wdsxh\member\Member::get_custom_content_full_image($memberObj['type'],$memberObj['custom_content']);
            $custom_content_result['mobile_auth'] = $memberObj['mobile_auth'];
            $custom_content = $custom_content_result;
        }


        $this->success('请求成功',$custom_content);
    }

    /**
     * Desc  保存信息
     * Create on 2024/3/18 16:04
     * Create by wangyafang
     */
    public function submit_information()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $param['wechat_id'] = $wechat_id;
        $memberObj = $this->model->where('wechat_id',$wechat_id)->find();
        if (!$memberObj) {
            $this->error('会员信息不存在');
        }
        $param['type'] = $memberObj['type'];
        $param['data'] = json_decode($_POST['data'],true);

        $member_base_data = $this->get_member_base_data($memberObj['type'],$param['data']);
        $channel = $this->request->header('channel');
        $param['channel'] = $channel;

        $result = $this->validate($param,'app\api\validate\wdsxh\member\MemberApply.submit');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }
        $member_base_data['custom_content'] = \app\common\model\wdsxh\member\Member::remove_custom_content_full_image($memberObj['type'],$_POST['data']);
        $mobile_auth = $this->request->post('mobile_auth');
        $member_base_data['mobile_auth'] = $mobile_auth ? $mobile_auth : 1;
        $member_base_data['status'] = 'normal';
        $memberObj->save($member_base_data);
        $this->success('请求成功');
    }

    /**
     * Desc  获取会员基础数据
     * Create on 2024/4/10 11:50
     * Create by wangyafang
     */
    private function get_member_base_data($type,$data)
    {
        $result = (new MemberApply())->handle_custom_data($type,$data);
        $result['avatar'] = remove_wdsxh_full_url($result['avatar']);
        if (isset($result['company_logo']) && !empty($result['company_logo'])) {
            $result['company_logo'] = remove_wdsxh_full_url($result['company_logo']);
        }
        if (isset($result['organize_logo']) && !empty($result['organize_logo'])) {
            $result['organize_logo'] = remove_wdsxh_full_url($result['organize_logo']);
        }
        if (isset($result['address']) && !empty($result['address'])) {
            $address_array = json_decode($result['address'],true);
            $result['address'] = $address_array['address'];
            $result['latitude'] = $address_array['latitude'];
            $result['longitude'] = $address_array['longitude'];
        }
        return $result;
    }

    /**
     * Desc  通讯录
     * Create on 2024/3/14 17:09
     * Create by wangyafang
     */
    public function address_book()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->get();

        $address_book_sort_order = (new AuthConfig())->where('id',1)->value('address_book_sort_order');
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();

        if ($this->memberAuthConfigObj['address_book_is_openness'] == 2 && !$memberObj) {
            $this->error('通讯录没有对外开放，无法查看');
        }

        $where['member.expire_time'] = array('>=',$current_date);
        $where['member.status'] = array('eq','normal');
        $where['member.mobile_auth'] = array('eq','1');
        if(isset($param['keywords']) && !empty($param['keywords'])) {
            $where['member.name'] = array('like','%'.$param['keywords'].'%');
        }
        switch ($address_book_sort_order) {
            case 1:
                $order = 'letter asc';
                $queryField = 'letter';
                break;
            case 2:
                $order = 'area_letter asc';
                $queryField = 'area_letter';
                break;
            case 3:
                $order = 'level.weigh asc';
                $queryField = 'level_weigh';
                break;
        }
        $data = $list = (new \app\common\model\wdsxh\member\Member())
            ->alias('member')
            ->where($where)
            ->field('member.id,member.name,member.avatar,member.mobile,member.letter,member.member_level_id,member.area_letter,level.name level_name,level.weigh')
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->order($order)
            ->select();

        if ($queryField != 'level_weigh') {
            $data = [];
            foreach ($list as $v) {
                if (preg_match('/^[A-Z]+$/', $v[$queryField])) {
                    $data[$v[$queryField]][] = array(
                        'id'=>$v['id'],
                        'name'=>$v['name'],
                        'mobile'=>$v['mobile'],
                        'avatar'=>wdsxh_full_url($v['avatar']),
                        'level_name'=> $v['level_name'],
                    );
                } else {
                    $data['#'][] = array(
                        'id'=>$v['id'],
                        'name'=>$v['name'],
                        'mobile'=>$v['mobile'],
                        'avatar'=>wdsxh_full_url($v['avatar']),
                        'level_name'=> $v['level_name'],
                    );
                }
            }

            if (isset($data['#'])) {
                $tem_array = $data['#'];
                unset($data['#']);
                $data['#'] = $tem_array;
            }
        } else {
            $data = collection($data)->toArray();
            foreach ($data as &$v) {
                $v['avatar'] = wdsxh_full_url($v['avatar']);
                unset($v['member_level_id']);
                unset($v['weigh']);
                unset($v['area_letter']);
                unset($v['letter']);
            }
        }

        $address_book_sort_order = (new AuthConfig())->where('id',1)->value('address_book_sort_order');
        $this->success('请求成功',array(
            'data'=>$data,
            'address_book_sort_order'=>$address_book_sort_order
        ));
    }

    /**
     * Desc  会员风采列表
     * Create on 2024/3/15 10:09
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $member_details = (new AuthConfig())->where('id',1)->value('member_details');
        if ($member_details == 3) {
            if ($this->auth->isLogin()) {
                $current_date = date('Y-m-d',time());
                $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                    ->where('expire_time','>=',$current_date)
                    ->find();
                if (!$memberObj) {
                    $this->error('成为会员后可查看');
                }
            } else {
                $this->error('请登录后操作',null,401);
            }
        }


        $current_date = date('Y-m-d',time());

        $param = $this->request->get();

        //经度
        $longitude = $this->request->param('longitude','');
        //纬度
        $latitude = $this->request->param('latitude','');

        //模糊查询
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);

        $field_lat = 'latitude';//数据库中的纬度字段名
        $field_lng = 'longitude';//数据库中的经度字段名称

        $field = 'member.id,member.name,member.avatar,member.native_place,
        member.member_level_id,level.name level_name,member.latitude,member.longitude,
        industry_category.name industry_category_name';

        //经纬度
        if (!empty($longitude) && !empty($latitude)) {
            $field_distance="(6378.137 * 2 * asin(sqrt(pow(sin(($field_lat * pi() / 180 - $latitude * pi() / 180) / 2),2) + cos($field_lat * pi() / 180) * cos($latitude * pi() / 180) * pow(sin(($field_lng * pi() / 180 - $longitude * pi() / 180) / 2),2))) * 1000) as distance";//在数据库中根据经纬度搜索，返回米
            $field=$field.",".$field_distance;//获取的字段
            $order = "level.weigh asc,member.join_time asc,member.createtime asc";
        }else{
            $order = "level.weigh asc,member.join_time asc,member.createtime asc";
        }

        $keywords = isset($param['keywords']) && !empty($param['keywords']) ? $param['keywords'] : '';
        if (isset($param['native_place']) && !empty($param['native_place'])) {
            $where[$table_name.'native_place'] = array('like','%'.$param['native_place'].'%');
        }
        if (isset($param['member_level_id']) && !empty($param['member_level_id'])) {
            $where[$table_name.'member_level_id'] = array('in',explode(',',$param['member_level_id']));
        }
        if (isset($param['industry_category_id']) && !empty($param['industry_category_id'])) {
            $where[$table_name.'industry_category_id'] = array('eq',$param['industry_category_id']);
        }
        if (isset($param['nearby']) && !empty($param['nearby'])) {
            $order = 'distance asc,'.$order;
            $where['longitude'] = array('<>','');
            $where['latitude'] = array('<>','');
        }

        $total = $this->model
            ->where(function ($query) use($keywords){
                if ($keywords) {
                    $table_name = config('database.prefix').'wdsxh_member.';
                    $query->where($table_name.'name','like','%'.$keywords.'%')
                        ->whereor($table_name.'introduce_content','like','%'.$keywords.'%')
                        ->whereor($table_name.'company_name','like','%'.$keywords.'%')
                        ->whereor($table_name.'company_position','like','%'.$keywords.'%')
                        ->whereor($table_name.'company_introduction','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_name','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_position','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_introduction','like','%'.$keywords.'%');
                }
            })
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->join('wdsxh_member_industry_category industry_category','industry_category.id = member.industry_category_id')
            ->count();

        $data = $this->model
            ->where(function ($query) use($keywords){
                if ($keywords) {
                    $table_name = config('database.prefix').'wdsxh_member.';
                    $query->where($table_name.'name','like','%'.$keywords.'%')
                        ->whereor($table_name.'introduce_content','like','%'.$keywords.'%')
                        ->whereor($table_name.'company_name','like','%'.$keywords.'%')
                        ->whereor($table_name.'company_position','like','%'.$keywords.'%')
                        ->whereor($table_name.'company_introduction','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_name','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_position','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_introduction','like','%'.$keywords.'%');
                }
            })
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->join('wdsxh_member_industry_category industry_category','industry_category.id = member.industry_category_id')
            ->field($field)->order($order)
            ->page($page)->limit($limit)
            ->select();
        foreach ($data as &$v) {
            if (!empty($longitude) && !empty($latitude) && !empty($v['longitude']) && !empty($v['latitude'])){
                $distance = wdsxh_distance($latitude,$longitude,$v['latitude'],$v['longitude']);
                if ($distance > 0) {
                    $v['distance'] = $distance;
                } else {
                    $v['distance'] = $distance;
                }
            } else {
                $v['distance'] = '';
            }
            $v->hidden(['member_level_id','latitude','longitude']);
        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  会员详情
     * Create on 2024/3/15 10:26
     * Create by wangyafang
     */
    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->get();
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();

        if (in_array($this->memberAuthConfigObj['member_details'],array('1','3')) && !$memberObj) {
            $this->error('此页面需成为会员后可查看!');
        }

        $memberVisitorObj = (new Visitor())->where('wechat_id', $wechat_id)->where('member_id', $param['id'])->find();
        if ($memberVisitorObj) {
            $memberVisitorObj->createtime = time();
            $memberVisitorObj->save();
        } else {
            $visitor_data = array(
                'wechat_id' => $wechat_id,
                'member_id' => $param['id'],
                'createtime' => time(),
            );
            Visitor::create($visitor_data);
        }

        $where['member.id'] = array('eq',$param['id']);
        $type = $this->model->alias('member')->where($where)->value('type');

        switch ($type) {
            case 1:
                $data = $this->person($where);
                break;
            case 2:
                $data = $this->company($where);
                break;
            case 3:
                $data = $this->organize($where);
                break;
        }

        $visitor_list = (new Visitor())->where('visitor.member_id', $param['id'])
            ->alias('visitor')
            ->order('visitor.createtime desc')
            ->join('wdsxh_user_wechat wechat', 'wechat.id = visitor.wechat_id')
            ->field('wechat.avatar')
            ->limit(23)
            ->select();
        if (!empty($visitor_list)) {
            foreach ($visitor_list as &$v) {
                $v->avatar = wdsxh_full_url($v->avatar);
            }
        }
        $data['visitor_list'] = $visitor_list;
        $data['visitor_count'] = (new Visitor())->where('member_id', $param['id'])->count();
        $data['type'] = $type;
        $where['member.id'] = array('eq',$param['id']);
        $mobile_auth = $this->model->alias('member')->where($where)->value('mobile_auth');
        $data['mobile_auth'] = $mobile_auth;
        if ($mobile_auth == '2') {
            $data['mobile'] = '';
        }

        $this->success('请求成功',$data);
    }

    private function person($where = array())
    {
        $field = 'member.id,member.name,member.avatar,member.mobile,member.native_place,member.introduce_content,
        level.name level_name,
        member.industry_category_name,
        member.address,member.latitude,member.longitude,
        custom_content';

        $memberObj = $this->model
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)
            ->find();

        $custom_content = json_decode($memberObj['custom_content'],true);
        $custom_content_array = array();
        foreach ($custom_content as $k=>$v) {
            if ($v['show'] == '1' && !in_array($v['field'],array('name','mobile','avatar','introduce_content','address','native_place','industry_category_id','member_level_id'))) {
                if(in_array($v['type'],array('image','video')) && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']);
                    if(is_array($v['value'])){
                        $v['value'] = implode(',',$v['value']);
                    }
                }
                if ($v['type'] == 'cert' && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']['image']);
                }
                $custom_content_array[] = $v;
            }
        }
        $memberObj['custom_content'] = $custom_content_array;

        return $memberObj;
    }

    private function company($where = array())
    {
        $field = 'member.id,member.name,member.avatar,member.mobile,member.native_place,member.introduce_content,
        level.name level_name,
        member.industry_category_name,
        member.address,member.latitude,member.longitude,
        custom_content,
        company_name,company_logo,company_introduction,company_position';
        $memberObj = $this->model
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)
            ->find();
        $memberObj['company_introduction'] = wdsxh_cut_str($memberObj['company_introduction'],4000);

        $custom_content = json_decode($memberObj['custom_content'],true);
        $custom_content_array = array();
        foreach ($custom_content['person'] as $k=>$v) {
            if ($v['show'] == '1' && !in_array($v['field'],array('name','mobile','avatar','introduce_content','address','native_place','industry_category_id','member_level_id','company_position'))) {
                if(in_array($v['type'],array('image','video')) && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']);
                    if(is_array($v['value'])){
                        $v['value'] = implode(',',$v['value']);
                    }
                }
                if ($v['type'] == 'cert' && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']['image']);
                }
                $custom_content_array[] = $v;
            }
        }

        $memberObj['custom_content'] = $custom_content_array;

        return $memberObj;
    }

    public function company_details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $id = $this->request->get('id');
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();

        if (in_array($this->memberAuthConfigObj['member_details'],array('1','3')) && !$memberObj) {
            $this->error('此页面需成为会员后可查看!');
        }

        $memberObj = $this->model->where('id',$id)->field('company_name,company_logo,company_introduction,custom_content,member_level_name')->find();
        $custom_content = json_decode($memberObj['custom_content'],true);
        $custom_content_array = array();
        foreach ($custom_content['company'] as $k=>$v) {
            if ($v['show'] == '1' && !in_array($v['field'],array('company_name','company_logo','company_introduction','company_position'))) {
                if(in_array($v['type'],array('image','video')) && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']);
                    if(is_array($v['value'])){
                        $v['value'] = implode(',',$v['value']);
                    }
                }
                if ($v['type'] == 'cert' && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']['image']);
                }
                $custom_content_array[] = $v;
            }
        }
        $memberObj['custom_content'] = $custom_content_array;
        $this->success('请求成功',$memberObj);
    }

    private function organize($where = array())
    {
        $field = 'member.id,member.name,member.avatar,member.mobile,member.native_place,member.introduce_content,
        level.name level_name,
        member.industry_category_name,
        member.address,member.latitude,member.longitude,
        custom_content,
        organize_name,organize_logo,organize_introduction,organize_position';
        $memberObj = $this->model
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)
            ->find();
        $memberObj['organize_introduction'] = wdsxh_cut_str($memberObj['organize_introduction'],4000);

        $custom_content = json_decode($memberObj['custom_content'],true);
        $custom_content_array = array();
        foreach ($custom_content['person'] as $k=>$v) {
            if ($v['show'] == '1' && !in_array($v['field'],array('name','mobile','avatar','introduce_content','address','native_place','industry_category_id','member_level_id','organize_position'))) {
                if(in_array($v['type'],array('image','video')) && !empty($v['value'])) {
                    $v['value'] =wdsxh_full_url($v['value']);
                    if(is_array($v['value'])){
                        $v['value'] = implode(',',$v['value']);
                    }
                }
                if ($v['type'] == 'cert' && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']['image']);
                }
                $custom_content_array[] = $v;
            }
        }
        $memberObj['custom_content'] = $custom_content_array;

        return $memberObj;
    }

    public function organize_details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $id = $this->request->get('id');
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();

        if (in_array($this->memberAuthConfigObj['member_details'],array('1','3')) && !$memberObj) {
            $this->error('此页面需成为会员后可查看!');
        }

        $memberObj = $this->model->where('id',$id)->field('organize_name,organize_logo,organize_introduction,custom_content,member_level_name')->find();
        $custom_content = json_decode($memberObj['custom_content'],true);
        $custom_content_array = array();
        foreach ($custom_content['organize'] as $k=>$v) {
            if ($v['show'] == '1' && !in_array($v['field'],array('organize_name','organize_logo','organize_introduction','organize_position'))) {
                if(in_array($v['type'],array('image','video')) && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']);
                    if(is_array($v['value'])){
                        $v['value'] = implode(',',$v['value']);
                    }
                }
                if ($v['type'] == 'cert' && !empty($v['value'])) {
                    $v['value'] = wdsxh_full_url($v['value']['image']);
                }
                $custom_content_array[] = $v;
            }
        }
        $memberObj['custom_content'] = $custom_content_array;
        $this->success('请求成功',$memberObj);
    }

    //管理员提交订阅
    public function submit_subscribe()
    {
        $count = 0;
        $id = $this->auth->id;
        $wechatModel = new UserWechat();
        $wechat_id = $wechatModel->where('user_id',$this->auth->id)->value('id');
        $set_admin = $wechatModel->where('id',$wechat_id)->value('set_admin');
        if ($set_admin == '2') {
            $this->error('不是管理员，无法订阅');
        }
        $subscribeObj = Db::name('wdsxh_member_subscribe')->where('wechat_id', $wechat_id)->where('type', 1)->find();
        if ($subscribeObj) {
            $count = Db::name('wdsxh_member_subscribe')->where('wechat_id', $wechat_id)->where('type', 1)->setInc('count');
        } else {
            $data = ['user_id' => $id, 'count' => 1, 'type' => 1, 'wechat_id'=>$wechat_id];
            $count = Db::name('wdsxh_member_subscribe')->insert($data);
        }
        if ($count) {
            $this->success('订阅成功');
        } else {
            $this->error('订阅失败');
        }
    }

    //管理员订阅数量
    public function subscribe_count()
    {
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $subscribeObj = Db::name('wdsxh_member_subscribe')->where('wechat_id', $wechat_id)->where('type', 1)->find();
        if ($subscribeObj) {
            $this->success('查询成功', ['subscribe_count' => $subscribeObj['count']]);
        } else {
            $this->success('查询成功', ['subscribe_count' => 0]);
        }
    }

    /**
     * Desc  小程序会员权限
     * Create on 2024/4/8 18:08
     * Create by wangyafang
     */
    public function auth()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $type = $this->request->get('type');

        //会员详情显示权限:1=部分开放,2=全部开放,3=会员专属
        $member_details = (new AuthConfig())->where('id',1)->value('member_details');

        if ($type == 1) {//列表
            if ($member_details == 1 || $member_details == 2) {
                $show_status = 1;//能看
            } else {
                if ($this->auth->isLogin()) {
                    $current_date = date('Y-m-d',time());
                    $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                    $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                        ->where('expire_time','>=',$current_date)
                        ->find();
                    if ($memberObj) {
                        $show_status = 1;
                    } else {
                        $show_status = 2;
                    }
                } else {
                    $show_status = 2;//不能看
                }
            }
        } else {//详情
            $current_date = date('Y-m-d',time());
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                ->where('expire_time','>=',$current_date)
                ->find();
            $show_status = ($member_details == '2' || $memberObj) ? 1 : 2;
        }

        $this->success('请求成功',['show_status'=>$show_status]);
    }

    /**
     * Desc  通讯录权限
     * Create on 2024/4/8 18:08
     * Create by wangyafang
     */
    public function address_book_auth()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        //通讯录是否对外开放:1=是,2=否
        $address_book_is_openness = (new AuthConfig())->where('id',1)->value('address_book_is_openness');

        $current_date = date('Y-m-d',time());
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();

        $show_status = ($address_book_is_openness == '1' || $memberObj) ? 1 : 2;
        $this->success('请求成功',['show_status'=>$show_status]);
    }

    /**
     * Desc  发送会员即将过期消息提醒
     * Create on 2024/4/8 16:55
     * Create by wangyafang
     */
    private function message($member_id,$applet_member_expiretime,$memberModel) {
        $memberObj = $memberModel->alias('member')
            ->where('id',$member_id)
            ->field('name,mobile,wechat_id,expire_time,type')
            ->find();
        $phrase2 = '';
        switch ($memberObj['type']) {
            case 1:
                $phrase2 = '个人';
                break;
            case 2:
                $phrase2 = '企业';
                break;
            case 3:
                $phrase2 = '团体';
                break;
        }
        //会员到期提醒
        $data = [
            'thing5' => [
                'value' => $memberObj['name'],//会员名称
            ],
            'phrase2' => [
                'value' => $phrase2,//会员类型
            ],
            'date3' => [
                'value' => $memberObj['expire_time'],//到期时间
            ],
            'thing4' => [
                'value' => '为不影响使用，建议及时续费',//备注
            ]
        ];
        $openid = trim(wdsxh_get_openid($memberObj['wechat_id'],'1'));
        $result = Wxapp::subscribeMessage($applet_member_expiretime,$openid, '/pages/mine/index', $data);

        $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
        $phoneNumbers = $memberObj['mobile'];
        if (!empty($configObj['alibaba_cloud_sign_name'])
            && !empty($configObj['alibaba_cloud_access_key_id'])
            && !empty($configObj['alibaba_cloud_access_key_secret'])
            && !empty($configObj['alibaba_member_soon_expiretime_notify'])
            && !empty($phoneNumbers)
        ) {
            $member_name = preg_replace('/[^\x{4e00}-\x{9fa5}]/u', '',$memberObj['name']);
            if (empty($member_name)) {
                $member_name = '用户';
            }


            $userSendSmsRequestParam = [
                "phoneNumbers" => $phoneNumbers,
                "templateCode" => $configObj['alibaba_member_soon_expiretime_notify'],
                "templateParam" => "{'member_name':'$member_name','time':'{$memberObj['expire_time']}'}",
            ];

            AlibabaCloudSms::main($userSendSmsRequestParam);
        }


        $memberExpireMessageModel = new MemberExpireMessage();
        $send_time = date('Y-m-d',time());
        $message_data = array(
            'wechat_id'=>$memberObj['wechat_id'],
            'member_id'=>$member_id,
            'send_time'=>$send_time,
            'errcode'=>$result[0]['errcode'],
            'errmsg'=>$result[0]['errcode'] == 0 ? '' : $result[0]['errmsg'],
        );
        $memberExpireMessageModel->save($message_data);

    }

    /**
     * Desc  发送会员已过期消息提醒
     * Create on 2025/8/13 14:55
     * Create by wangyafang
     */
    private function already_member_message($member_id,$memberModel) {
        $memberObj = $memberModel->alias('member')
            ->where('id',$member_id)
            ->field('name,mobile,wechat_id,expire_time,type,member_level_name')
            ->find();


        $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
        $phoneNumbers = $memberObj['mobile'];
        if (!empty($configObj['alibaba_cloud_sign_name'])
            && !empty($configObj['alibaba_cloud_access_key_id'])
            && !empty($configObj['alibaba_cloud_access_key_secret'])
            && !empty($configObj['alibaba_member_expiretime_notify'])
            && !empty($phoneNumbers)
        ) {
            $member_name = preg_replace('/[^\x{4e00}-\x{9fa5}]/u', '',$memberObj['name']);
            if (empty($member_name)) {
                $member_name = '用户';
            }
            $member_level_name = preg_replace('/[^\x{4e00}-\x{9fa5}]/u', '',$memberObj['member_level_name']);
            if (empty($member_level_name)) {
                $member_level_name = '级别';
            }

            $userSendSmsRequestParam = [
                "phoneNumbers" => $phoneNumbers,
                "templateCode" => $configObj['alibaba_member_expiretime_notify'],
                "templateParam" => "{'leavelname':'$member_name','leavel':'$member_level_name'}",
            ];
            AlibabaCloudSms::main($userSendSmsRequestParam);
        }


        $memberAlreadyExpireMessageModel = new MemberAlreadyExpireMessage();
        $send_time = date('Y-m-d',time());
        $message_data = array(
            'wechat_id'=>$memberObj['wechat_id'],
            'member_id'=>$member_id,
            'send_time'=>$send_time,
        );
        $memberAlreadyExpireMessageModel->save($message_data);

    }
    /**
     * Desc  会员即将到期通知消息，通知30以内快过期的会员
     * Create on 2024/4/11 16:49
     * Create by wangyafang
     */
    public function send_expire_message()
    {
        $start_time =  date('Y-m-d');
        $end_time = date('Y-m-d',(time() + 86400*30));

        $memberModel = new \app\api\model\wdsxh\member\Member();
        $member_id_array = $memberModel
            ->where('wechat_id', '<>', 0)
            ->where('expire_time', 'between', [$start_time, $end_time])
            ->column('id');

        $memberExpireMessageModel = new MemberExpireMessage();
        $send_member_id_array = $memberExpireMessageModel
            ->where('wechat_id', '<>', 0)
            ->where('send_time', '>=', date('Y-m-d', time() - 86400 * 30))  // 发送时间 >= 30天前
            ->where('send_time', '<=', date('Y-m-d'))                       // 发送时间 <= 今天
            ->column('member_id');

        $diff_result = array_diff($member_id_array,$send_member_id_array);
        if (!empty($diff_result)) {
            $conf = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
            foreach (array_slice($diff_result, 0, 1) as $v) {
                $this->message($v, $conf['applet_member_expiretime'], $memberModel);
            }
        }
        echo 'success:'.date('Y-m-d H:i:s',time());
    }

    /**
     * Desc 发送已过期会员通知消息
     * Create on 2025/8/13 下午2:39
     * Create by wangyafang
     */
    public function send_already_expire_message()
    {
        $start_time =  date('Y-m-d');

        $memberModel = new \app\api\model\wdsxh\member\Member();
        $member_id_array = $memberModel
            ->where('wechat_id', '<>', 0)
            ->where('expire_time', '<', $start_time)
            ->column('id');

        $memberAlreadyExpireMessageModel = new MemberAlreadyExpireMessage();
        $send_member_id_array = $memberAlreadyExpireMessageModel
            ->where('wechat_id', '<>', 0)
            ->column('member_id');



        $diff_result = array_diff($member_id_array,$send_member_id_array);

        if (!empty($diff_result)) {
            foreach (array_slice($diff_result, 0, 3) as $v) {
                $this->already_member_message($v,$memberModel);
            }
        }
        echo 'success:'.date('Y-m-d H:i:s',time());
    }

    /**
     * Desc  会员单位列表
     * Create on 2024/6/21 17:54
     * Create by wangyafang
     */
    public function unit()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $member_details = (new AuthConfig())->where('id',1)->value('member_details');
        if ($member_details == 3) {
            if ($this->auth->isLogin()) {
                $current_date = date('Y-m-d',time());
                $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                    ->where('expire_time','>=',$current_date)
                    ->find();
                if (!$memberObj) {
                    $this->error('成为会员后可查看');
                }
            } else {
                $this->error('请登录后操作',null,401);
            }
        }

        $current_date = date('Y-m-d',time());

        $param = $this->request->get();

        //模糊查询
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);
        $where['type'] = array('in',array('2','3'));
        $keywords = isset($param['keywords']) && !empty($param['keywords']) ? $param['keywords'] : '';

        $field = 'member.id,member.type,
        member.company_name,member.company_logo,member.company_introduction,
        member.organize_name,member.organize_logo,member.organize_introduction,
        level.name level_name';

        $order = "level.weigh asc,member.id asc";

        $total = $this->model->where(function ($query) use($keywords){
            if ($keywords) {
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'company_name','like','%'.$keywords.'%')
                    ->whereor($table_name.'organize_name','like','%'.$keywords.'%');
            }
        })->where($where)->count();

        $data = $this->model
            ->alias('member')
            ->where(function ($query) use($keywords){
                if ($keywords) {
                    $table_name = config('database.prefix').'wdsxh_member.';
                    $query->where($table_name.'company_name','like','%'.$keywords.'%')
                        ->whereor($table_name.'organize_name','like','%'.$keywords.'%');
                }
            })
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)->order($order)
            ->page($page)->limit($limit)
            ->select();
        foreach ($data as &$v) {
            $v['name'] = $v['type'] == '2' ? $v['company_name'] : $v['organize_name'];
            $v['logo'] = $v['type'] == '2' ? $v['company_logo'] : $v['organize_logo'];
            $introduction = $v['type'] == '2' ? $v['company_introduction'] : $v['organize_introduction'];
            $v['introduction'] = strip_tags($introduction);
            $v->hidden(['company_name','company_logo','company_introduction','organize_name','organize_logo','organize_introduction']);

        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc 会员地图
     * Create on 2025/8/4 14:24
     * Create by wangyafang
     */
    public function member_map_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $where = array();

        $param = $this->request->get();

        if (!isset($param['type']) || empty($param['type'])) {
            $this->error('参数错误');
        }

        $data = array();
        $type = $param['type'];
        try{
            if (in_array($type,[1,2])) {
                if (isset($param['member_level_id']) && !empty($param['member_level_id'])) {
                    $where['member_level_id'] = array('in',explode(',',$param['member_level_id']));
                }
                if (isset($param['industry_category_id']) && !empty($param['industry_category_id'])) {
                    $where['industry_category_id'] = array('in',explode(',',$param['industry_category_id']));
                }

                $current_date = date('Y-m-d',time());


                $where['status'] = array('eq','normal');
                $where['expire_time'] = array('>=',$current_date);

                $data = $this->model
                    ->where($where)
                    ->field('id,name,avatar,longitude,latitude')
                    ->order('join_time asc,id asc')
                    ->select();
            } else {
                if (isset($param['institution_id']) && !empty($param['institution_id'])) {
                    $where['institution_id'] = array('in',explode(',',$param['institution_id']));
                }
                $prefix = config('database.prefix');
                $data = (new \app\api\model\wdsxh\institution\Member())
                    ->alias('institution_member')
                    ->where($where)
                    ->join($prefix.'wdsxh_member member','member.id = institution_member.member_id')
                    ->field('member.id,member.name,member.avatar,member.longitude,member.latitude')
                    ->order('member.join_time asc,member.id asc')
                    ->select();
                foreach ($data as &$v) {
                    $v->avatar = wdsxh_full_url($v->avatar);
                }
            }
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }




        $this->success('请求成功',$data);
    }

    /**
     * Desc 首页diy
     * Create on 2025/8/8 上午10:27
     * Create by wangyafang
     */
    public function diy_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $limit = $this->request->get('limit');
        if (empty($limit)) {
            $this->error('参数错误');
        }

        $current_date = date('Y-m-d',time());

        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);

        $field = 'member.id,member.name,member.avatar,
        member.member_level_id,level.name level_name';

        //经纬度
        $order = "level.weigh asc,member.join_time asc,member.createtime asc";

        $data = $this->model
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)->order($order)
            ->page(1)->limit($limit)
            ->select();
        foreach ($data as &$v) {

            $v->hidden(['member_level_id']);
        }
        $this->success('请求成功',$data);
    }

    /**
     * Desc  免费会费缴纳
     * Create on 2024/3/15 14:05
     * Create by wangyafang
     */
    public function freeMembershipPay() {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $applyObj = $memberApplyObj= (new \app\api\model\wdsxh\member\MemberApply())->where('wechat_id', $wechat_id)->find();
        if (!$memberApplyObj) {
            $this->error('入会信息不存在');
        }
        if(!in_array($memberApplyObj['child_state'],['2','3','5','6'])) {
            $this->error('入会信息状态错误');
        }
        $current_date = date('Y-m-d',time());
        $memberExpireObj = (new \app\api\model\wdsxh\member\Member())
            ->where('wechat_id',$wechat_id)
            ->where('expire_time','<',$current_date)
            ->find();
        if (!$memberExpireObj) {
            $this->error('会员过期信息不存在');
        }

        $channel = $this->request->header('channel');

        $applyObj->state = '1';
        $applyObj->child_state = '1';
        $applyObj->pay_method = '1';
        $applyObj->reject = '';
        Db::startTrans();
        try{
            $applyObj->save();

            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }

        $conf = $this->configObj;
        if ($channel == 1) {
            //发送入会申请通知
            try {
                $data = [
                    'thing2' => [
                        'value' => $memberApplyObj['name'],
                    ],
                    'phone_number4' => [
                        'value' => $memberApplyObj['mobile'],
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

        $this->success('请求成功');
    }

}



 