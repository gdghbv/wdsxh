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

namespace app\api\controller\wdsxh\goods;
use addons\wdsxh\library\Wxapp;
use app\admin\model\wdsxh\mall\Logistics;
use app\api\model\wdsxh\goods\FreightRules;
use app\api\model\wdsxh\goods\Refund;
use app\api\model\wdsxh\mall\Cart;
use app\api\model\wdsxh\mall\OrderItem;
use app\api\model\wdsxh\user\Wechat;
use app\common\controller\Api;
use think\Db;
use Exception;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\Log;

class Order extends Api
{
    protected $noNeedLogin = ['postage','payResult'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $rulesModel = null;
    protected $refundModel = null;
    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\goods\Order();
        $this->rulesModel = new FreightRules();
        $this->refundModel = new Refund();
    }


    /**
     * Desc  创建订单
     * Create on 2024/3/14 08:38
     * Create by @小趴菜
     */
    public function create(){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        $buy_now = isset($param['buy_now']) ? $param['buy_now'] : 1;
        //查询用户id
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $param['wechat_id'] = $wechat_id;//用户id
        $delivery_method = isset($param['delivery_method']) ? $param['delivery_method'] : 1;
        if ($delivery_method == 1 && empty($param['address_id'])) {
            $this->error('请选择地址');
        }
        if (isset($param['address_id']) && !empty($param['address_id'])) {
            //查询用户收货地址
            $address = (new \app\api\model\wdsxh\goods\Address())->where('id',$param['address_id'])->find();
            $param['real_name'] = $address['name'];//用户名称
            $param['user_phone'] = $address['tel'];//手机号
            $param['user_address'] = $address['address'];//详细地址
        }

        if ($buy_now == 1) {
            $goods_price = (new \app\api\model\wdsxh\goods\Goods())->where('id',$param['goods_id'])->value('price');
            if ($param['delivery_method'] == 1) {
                //查询商品价格

                $pay_price_number = bcmul($goods_price,$param['number'],2);
                //计算邮费
                $postage = $this->rulesModel
                    ->where('min','<=',$pay_price_number)
                    ->where('max','>=',$pay_price_number)
                    ->value('price');
                //如果不在配送范围之内,邮费将会返回0
                if (!$postage){
                    $postage = 0;
                }
            } else {
                $postage = 0;
            }

            $param['number'] = isset($param['number']) ? $param['number'] : 1;
            $param['goods_price'] = $goods_price;
            $param['pay_postage'] = $postage;//支付邮费
            $param['pay_price'] = bcmul($goods_price,$param['number'],2) + $postage;//实际支付金额
            $param['total_price'] = $param['pay_price'];//订单总价
            $param['order_no'] = wdsxh_create_order();//订单号
            $param['refund_status'] = 1;
            $param['paid'] = 1;
            $param['createtime'] = time();
            $param['delivery_method'] = $delivery_method;
            $result = false;
            Db::startTrans();
            try {
                $result = $this->model->allowField(true)->save($param);
                $order_id = $this->model->id; // 获取刚添加数据的ID
                Db::commit();
            } catch (ValidateException|PDOException|Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            if(false === $result){
                $this->error($this->model->getError());
            }
            $this->success('提交成功', ['order_id' => $order_id]); // 返回刚添加数据的ID
        } else {//购物车
            $goods_id_array = explode(',',$param['goods_id']);
            $cartModel = new Cart();
            $cartList = $cartModel->where('goods_id','in',$goods_id_array)
                ->where('wechat_id',$wechat_id)
                ->select();
            if (empty($cartList)) {
                $this->error('购物车数据不存在');
            }
            if (count($goods_id_array) != count($cartList)) {
                $this->error('购物车数量不对');
            }
            $all_goods_total_price = 0;//排除运费，商品总价格
            $order_item_data = array();
            foreach ($cartList as $v) {
                $goodsObj = (new \app\api\model\wdsxh\goods\Goods())->where('id',$v['goods_id'])->find();
                $pay_price = bcmul($goodsObj['price'],$v['goods_num'],2);
                $all_goods_total_price = $all_goods_total_price + $pay_price;
                $order_item_data[] = array(
                    'goods_id'=>$v['goods_id'],
                    'goods_num'=>$v['goods_num'],
                    'goods_name'=>$goodsObj['name'],
                    'goods_image'=>$goodsObj['image'],
                    'goods_price'=>$goodsObj['price'],
                    'pay_price'=>$pay_price,
                );
            }

            if ($param['delivery_method'] == 1) {
                //计算邮费
                $postage = $this->rulesModel
                    ->where('min','<=',$all_goods_total_price)
                    ->where('max','>=',$all_goods_total_price)
                    ->value('price');
                //如果不在配送范围之内,邮费将会返回0
                if (!$postage){
                    $postage = 0;
                }
            } else {
                $postage = 0;
            }

            $param['number'] = $cartModel->where('goods_id','in',$goods_id_array)
                ->where('wechat_id',$wechat_id)
                ->sum('goods_num');
            $param['goods_price'] = $all_goods_total_price;
            $param['pay_postage'] = $postage;//支付邮费
            $param['pay_price'] = $all_goods_total_price + $postage;//实际支付金额
            $param['total_price'] = $param['pay_price'];//订单总价
            $param['order_no'] = wdsxh_create_order();//订单号
            $param['refund_status'] = 1;
            $param['paid'] = 1;
            $param['createtime'] = time();
            $param['delivery_method'] = $delivery_method;
            $result = false;
            Db::startTrans();
            try {
                $result = $this->model->allowField(true)->save($param);
                $order_id = $this->model->id; // 获取刚添加数据的ID

                // 使用 array_map 给每个元素追加 order_id
                $order_item_data = array_map(function($item) use ($order_id) {
                    $item['order_id'] = $order_id;
                    return $item;
                }, $order_item_data);
                (new OrderItem())->saveAll($order_item_data);

                $cartModel->where('goods_id','in',$goods_id_array)
                    ->where('wechat_id',$wechat_id)->delete();
                Db::commit();
            } catch (ValidateException|PDOException|Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            if(false === $result){
                $this->error($this->model->getError());
            }
            $this->success('提交成功', ['order_id' => $order_id]); // 返回刚添加数据的ID
        }
    }

    /**
     * Desc  订单列表
     * Create on 2024/3/13 16:23
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        //状态:1=待付款,2=待发货,3=待收货,5=支付失败,4=已完成,6=已取消,-1=退款中,-2=已退款
        if(isset($param['state']) && !empty($param['state'])) {
            $where['state'] = array('eq',$param['state']);
        }
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $where['refund_status'] = array('eq',1);
        $where['wechat_id'] = array('eq',$wechat_id);
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,order_no,state,pay_price,number,trade_no,buy_now,
            delivery_method')
            ->page($page,$limit)
            ->order('createtime desc')
            ->select();
        $orderItemModel = new OrderItem();
        foreach ($data as $row){
            if ($row['buy_now'] == '1') {
                $goods = $this->model
                    ->alias('mall_order')
                    ->join('wdsxh_mall_goods goods','goods.id = mall_order.goods_id')
                    ->where('mall_order.wechat_id',$wechat_id)
                    ->where('mall_order.id',$row['id'])
                    ->field('goods.id,goods.image,goods.name')
                    ->select();
            } else {
                $goods = $orderItemModel
                    ->alias('order_item')
                    ->join('wdsxh_mall_goods goods','goods.id = order_item.goods_id')
                    ->where('order_item.order_id',$row['id'])
                    ->field('goods.id,goods.image,goods.name')
                    ->select();
                foreach ($goods as &$vv) {
                    $vv->image = wdsxh_full_url($vv->image);
                }
            }
            $row->goods = $goods;
            $row->hidden(['buy_now']);
        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  计算邮费
     * Create on 2024/3/15 13:55
     * Create by @小趴菜
     */
    public function postage(){
        $param = $this->request->param();
        $where_query = array();
        if (isset($param['address_id']) && !empty($param['address_id'])) {
            $address_id = $param['address_id'];
            $address = (new \app\api\model\wdsxh\goods\Address())->where('id',$address_id)->value('address');

// 正则表达式匹配省、直辖市、自治区、特别行政区
            preg_match('/^(.*?(省|自治区|市|香港|澳门))/u', $address, $matches);

            if (!empty($matches)) {
                $province = $matches[0]; // 截取到的省、直辖市、自治区、特别行政区
                $where_query[] = ['exp',Db::raw("FIND_IN_SET('$province',open_area)")];
            }
        }

        $postage = $this->rulesModel
            ->where('min','<=',$param['pay_price'])
            ->where('max','>=',$param['pay_price'])
            ->where($where_query)
            ->value('price');
        if (!$postage){
            $postage = 0;
        }
        $this->success('请求成功',['price' =>$postage]);
    }

    /**
     * Desc  订单详情
     * Create on 2024/3/15 14:22
     * Create by @小趴菜
     */
    public function details(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $order_no = $this->request->get('order_no');
        $id = $this->request->get('id');
        if (!$order_no && !$id) {
            $this->error('参数错误');
        }
        if ($id) {
            $where['id'] = array('eq',$id);
        }
        if ($order_no) {
            $where['order_no'] = array('eq',$order_no);
        }
        $row = $this->model
            ->where($where)
            ->field('id,order_no,real_name,user_phone,
            user_address,total_price,
            pay_postage,state,refund_status,
            number,
            trade_no,
            buy_now,
            delivery_method,pick_up_code')
            ->find();
        if (!$row) {
            $this->error('订单不存在');
        }
        $orderItemModel = new OrderItem();
        if ($row['buy_now'] == '1') {
            $goods = $this->model
                ->alias('mall_order')
                ->join('wdsxh_mall_goods goods','goods.id = mall_order.goods_id')
                ->where('mall_order.id',$row['id'])
                ->field('goods.image,goods.name,mall_order.goods_price,number goods_num')
                ->select();
        } else {
            $goods = $orderItemModel
                ->alias('order_item')
                ->join('wdsxh_mall_goods goods','goods.id = order_item.goods_id')
                ->where('order_item.order_id',$row['id'])
                ->field('goods.image,goods.name,order_item.goods_price,goods_num')
                ->select();
            foreach ($goods as &$vv) {
                $vv->image = wdsxh_full_url($vv->image);
            }

        }
        $row->goods = $goods;
        unset($row['buy_now']);

        $row['refund_reason'] = (new Refund())->where('order_id',$row['id'])->value('refund_reason');
        if ($row['delivery_method'] == 1) {
            unset($row['pick_up_code']);
        } else {
            unset($row['real_name']);
            unset($row['real_name']);
            unset($row['real_name']);
            if (!in_array($row['state'],['2','3','4'])) {
                unset($row['pick_up_code']);
            }
        }
        $this->success('请求成功',$row);

    }

    /**
     * Desc  订单预支付
     * Create on 2024/3/15 16:23
     * Create by @小趴菜
     */
    public function prepare_pay()
    {
        $channel = $this->request->header('channel');
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $openid = wdsxh_get_openid($wechat_id,$channel);
        $orderObj = $this->model
            ->where('id',$param['order_id'])
            ->field('order_no,pay_price')
            ->find();
        if (!$orderObj) {
            $this->error('订单不存在');
        }
        $order_no = wdsxh_create_order();
        $orderObj->order_no = $order_no;
        $orderObj->save();
        try{
            //微信小程序支付
            if ($channel == 1){
                $data=\addons\wdsxh\library\Wxapp::unify('商城商品购买',$orderObj->order_no,$orderObj->pay_price,$openid,request()->domain().'/api/wdsxh/goods/order/payresult');
            } else {
                $data=\addons\wdsxh\library\Wxapp::unify_wxofficial('商城商品购买',$orderObj->order_no,$orderObj->pay_price,$openid,request()->domain().'/api/wdsxh/goods/order/payresult');
            }
        }catch (\think\Exception $e){
            $this->error($e->getMessage());
        }
        $this->success('success',$data);
    }

    /**
     * Desc  订单支付回调
     * Create on 2024/3/15 17:40
     * Create by @小趴菜
     */
    public function payResult(){
        $pay=Wxapp::getPay();
        $response = $pay->handlePaidNotify(function($message, $fail){
            Log::record($message['out_trade_no'],'logeuas');
            $order =$this->model->where('order_no',$message['out_trade_no'])->find();
            if (!$order || $order->state == '2') {
                return true;
            }
            if ($order['delivery_method'] == 2) {
                // 生成唯一的6位随机数字
                do {
                    $pickUpCode = mt_rand(100000, 999999);  // 生成6位随机数
                    $exists = $this->model->where('pick_up_code', $pickUpCode)->count();  // 检查数据库中是否已存在该pick_up_code
                } while ($exists > 0);  // 如果该pick_up_code已经存在，重新生成

                $order->pick_up_code = $pickUpCode;
            }
            Db::startTrans();
            try {
                $order->pay_time = time();
                $order->state = '2';
                $order->paid = '2';
                $order->trade_no = $message['transaction_id'];
                $order->save();
                Db::commit();
            } catch (\think\Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
            return true;
        });
        $response->send();
    }

    /**
     * Desc  确认收货
     * Create on 2024/3/15 17:48
     * Create by @小趴菜
     */
    public function sing(){
        $param = $this->request->param();
        Db::startTrans();
        try{
            $this->model->allowField(true)
                ->where('id',$param['id'])
                ->update([
                    'state' => 4,
                    'complete_time'=>time(),
                ]);
            (new Logistics())->allowField(true)
                ->where('order_id',$param['id'])
                ->update([
                    'receive_time' => time(),
                ]);
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('确认收货成功');

    }

    /**
     * Desc  申请退款
     * Create on 2024/3/18 11:59
     * Create by @小趴菜
     */
    public function refund(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        //查询用户wechat_id
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $refundObj = (new Refund())->where('order_id',$param['order_id'])->where('wechat_id',$wechat_id)->find();
        if ($refundObj){
            $this->error('你已提交退款申请，请勿重复提交，请等待管理员同意退款申请');
        }
        $orderModel = (new \app\api\model\wdsxh\goods\Order())->where('id', $param['order_id'])->find();
        $refund_reason = '退款原因:' . $param['refund_reason'] . ',' . '退款详情:' . $param['refund_content'];
        if ($orderModel['state'] == '2') {
            $refundSn=wdsxh_create_order();
            $res=\addons\wdsxh\library\Wxapp::payRefund($orderModel['order_no'],$refundSn,$orderModel['pay_price'],array('refund_desc'=>'退款'));
            if($res && $res['return_code'] == 'SUCCESS' && $res['result_code'] == 'SUCCESS'){
                Db::startTrans();
                try {
                    (new \app\api\model\wdsxh\goods\Order())
                        ->where('id', $param['order_id'])
                        ->update([
                            'state' =>'-2',
                            'refund_status' => '5',
                            'complete_time'=>time(),
                        ]);
                    $result = (new \app\admin\model\wdsxh\mall\Refund())->insert([
                        'order_id' => $orderModel['id'],//订单id
                        'refund_price' => $orderModel['pay_price'],//退款金额
                        'refund_reason' => $refund_reason,//退款用户说明
                        'state' => $orderModel['state'],//退款前状态
                        'wechat_id' => $wechat_id,//用户id
                        'createtime' => time(),//创建时间
                        'refund_time' => time(),//退款时间
                    ]);
                    Db::commit();
                } catch (ValidateException|PDOException|Exception $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                }
                if(false === $result){
                    $this->error($this->model->getError());
                }
                $this->success('退款成功');
            }else{
                $this->error('退款失败,错误信息：'.$res['err_code_des']);
            }
        }
        $result = false;
        Db::startTrans();
        try {
            (new \app\api\model\wdsxh\goods\Order())
                ->where('id', $param['order_id'])
                ->update([
                    'state' =>'-1',
                    'refund_status' => '2',
                ]);
            $result = (new \app\admin\model\wdsxh\mall\Refund())->insert([
                'order_id' => $orderModel['id'],//订单id
                'refund_price' => $orderModel['pay_price'],//退款金额
                'refund_reason' => $refund_reason,//退款用户说明
                'state' => $orderModel['state'],//退款前状态
                'wechat_id' => $wechat_id,//用户id
                'createtime' => time(),//创建时间
                'refund_time' => time(),//退款时间
            ]);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('提交成功');
    }

    /**
     * Desc  添加快递单号
     * Create on 2024/3/18 15:46
     * Create by @小趴菜
     */
    public function receipt(){
        $param = $this->request->param();
        Db::startTrans();
        try{
            (new \app\admin\model\wdsxh\mall\Refund())->allowField(true)
                ->where('order_id',$param['order_id'])
                ->update([
                    'refund_express_no' =>$param['refund_express_no'],//快递单号
                    'add_express_no_time' => time(),//添加单号时间
                ]);
            (new \app\api\model\wdsxh\goods\Order())->allowField(true)
                ->where('id', $param['order_id'])
                ->update([
                    'refund_status' => '4',
                ]);
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('请求成功');

    }


    /**
     * Desc  退款列表
     * Create on 2024/3/13 16:23
     * Create by @小趴菜
     */
    public function refund_index(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        //退款状态:1=未退款,2=申请中,3=待退货,4=退款中,5=已退款'
        if(isset($param['refund_status']) && !empty($param['refund_status'])) {
            $where['order.refund_status'] = array('not in',1);
            $where['order.refund_status'] = array('eq',$param['refund_status']);
        }
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $where['order.wechat_id'] = array('eq',$wechat_id);
        $total =(new Refund())
            ->alias('refund')
            ->join('wdsxh_mall_order order','order.id = refund.order_id')
            ->where($where)->count();
        $data = (new Refund())
            ->alias('refund')
            ->join('wdsxh_mall_order order','order.id = refund.order_id')
            ->where($where)
            ->field('order.id,order.order_no,order.goods_id,order.refund_status,order.pay_price,order.number,
            buy_now')
            ->page($page,$limit)
            ->order('order.createtime desc')
            ->select();
        $orderItemModel = new OrderItem();
        foreach ($data as $row){
            if ($row['buy_now'] == '1') {
                $goods = $this->model
                    ->alias('mall_order')
                    ->join('wdsxh_mall_goods goods','goods.id = mall_order.goods_id')
                    ->where('mall_order.wechat_id',$wechat_id)
                    ->where('mall_order.id',$row['id'])
                    ->field('goods.id,goods.image,goods.name')
                    ->select();
            } else {
                $goods = $orderItemModel
                    ->alias('order_item')
                    ->join('wdsxh_mall_goods goods','goods.id = order_item.goods_id')
                    ->where('order_item.order_id',$row['id'])
                    ->field('goods.id,goods.image,goods.name')
                    ->select();
                foreach ($goods as &$vv) {
                    $vv->image = wdsxh_full_url($vv->image);
                }
            }
            $row->goods = $goods;
            $row->hidden(['buy_now']);
        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  取消退款
     * Create on 2024/3/20 15:50
     * Create by @小趴菜
     */
    public function cancel_refund(){
        $param = $this->request->post();
        $row = $this->refundModel->where('order_id',$param['id'])->find();
        Db::startTrans();
        try{
            $params['refund_status'] = 1;
            $params['state'] = $row['state'];
            (new \app\admin\model\wdsxh\mall\Order())->allowField(true)->where('id',$row['order_id'])->update($params);
            $row->delete();
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('取消成功');

    }

    /**
     * Desc  取消订单
     * Create on 2024/4/10 14:19
     * Create by @小趴菜
     */
    public function del_order(){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $orderObj = $this->model->where('wechat_id',$wechat_id)->where('id',$param['order_id'])->find();
        if (!$orderObj) {
            $this->error('订单不存在');
        }
        if ($orderObj['state'] != '1') {
            $this->error('订单不是待付款，无法删除');
        }
        Db::startTrans();
        try{
            $orderObj->delete();
            (new OrderItem())->allowField(true)->where('order_id',$param['order_id'])->delete();
            // 提交事务
            Db::commit();
        } catch (ValidateException|PDOException|\think\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('取消成功');

    }




}