<?php
/**
 * Class Cart
 * Desc  购物车
 * Create on 2022/10/11 11:33
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\mall;

use app\api\model\wdsxh\goods\Goods;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class Cart extends Api
{
    protected $noNeedLogin = [''];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['*'];
    protected $model = '';
    protected $wechat_id = '';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\mall\Cart();
        $this->wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
    }

    //加入购物车
    //param:token goods_id
    public function add()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $user_id = $this->auth->id;
        $goods_id = $this->request->post('goods_id');
        if (!$goods_id) {
            $this->error('参数错误');
        }
        $number = $this->request->post('number');
        if (!$number) {
            $this->error('参数错误');
        }
        if (!filter_var($number, FILTER_VALIDATE_INT)) {
            $this->error('数量格式不正确');
        }
        if ($number <= 0) {
            $this->error('数量不能小于0');
        }

        //判断商品是否已下架
        $goodsObj = (new Goods())->where('id',$goods_id)->field('status,name,image,price')->find();
        if (!$goodsObj) {
            $this->error('商品不存在');
        }
        if ($goodsObj['status'] == 'hidden') {
            $this->error('商品已下架');
        }

        //判断用户是否已加入购物车
        $cartWhere['wechat_id'] = array('eq',$this->wechat_id);
        $cartWhere['goods_id'] = array('eq',$goods_id);
        $cartObj = $this->model->where($cartWhere)->find();
        if ($cartObj) {
            $goods_num = $handle_data['goods_num'] = $cartObj['goods_num'] + $number;
        } else {
            $goods_num = $handle_data['goods_num'] = $number;
        }

        $handle_data['user_id'] = $user_id;
        $handle_data['wechat_id'] = $this->wechat_id;
        $handle_data['goods_id'] = $goods_id;

        $handle_data['buy_now'] = 2;
        $handle_data['goods_name'] = $goodsObj['name'];
        $handle_data['goods_image'] = $goodsObj['image'];
        $handle_data['goods_price'] = $goodsObj['price'];
        try {
            if (!$cartObj) {
                $this->model->allowField(true)->save($handle_data);
            } else {
                $cartObj->save(['goods_num'=>$goods_num]);
            }
        } catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }

        $goods_id = $this->model->where('wechat_id',$this->wechat_id)
            ->group('goods_id')
            ->column('goods_id');
        $number = count($goods_id);
        $this->success('加入购物车成功',array('number'=>$number));
    }

    //购物车列表
    //param:token
    public function list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $cartWhere['wechat_id'] = array('eq',$this->wechat_id);
        $cartWhere['buy_now'] = array('eq','2');
        $data = $this->model
            ->where($cartWhere)
            ->order('createtime desc,id desc')
            ->field('goods_id id,goods_num number,
            goods_name,goods_image,goods_price')
            ->select();
        $goodsModel = new Goods();
        foreach ($data as &$v) {
            $goodsObj = $goodsModel->where('id',$v['id'])
                ->where('status','normal')
                ->find();
            if ($goodsObj) {
                $v->goods_status = 1;
                $v->name = $goodsObj['name'];
                $v->image = $goodsObj['image'];
                $v->price = $goodsObj['price'];
                unset($goodsObj);
                unset($v['goods_name']);
                unset($v['goods_image']);
                unset($v['goods_price']);
            } else {
                $v->goods_status = 2;
                $v->name = $v['goods_name'];
                $v->image = $v['goods_image'];
                $v->price = $v['goods_price'];
                unset($v['goods_name']);
                unset($v['goods_image']);
                unset($v['goods_price']);
            }
        }
        $this->success('请求成功',$data);
    }



    //清除购物车
    //param:token  ids列表id
    public function del()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $goods_id = $this->request->post('goods_id');
        if (!$goods_id) {
            $this->error('参数错误');
        }
        $goods_id_array = explode(',',$goods_id);
        $delete_count = $this->model
            ->where('wechat_id',$this->wechat_id)
            ->where('goods_id', 'in', $goods_id_array)
            ->count();
        if (count($goods_id_array) != $delete_count) {
            $this->error('数量错误');
        }
        $count = 0;
        try {
            $count = $this->model
                ->where('wechat_id',$this->wechat_id)
                ->where('goods_id', 'in', $goods_id_array)
                ->delete();
        } catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }

        if ($count) {
            $this->success();
        } else {
            $this->error('删除失败');
        }

    }

    /**
     * Desc 更新商品数量
     * Create on 2025/4/14 14:17
     * Create by wangyafang
     */
    public function update_goods_number()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $goods_id = $this->request->post('goods_id');
        if (!$goods_id) {
            $this->error('参数错误');
        }
        $number = $this->request->post('number');
        if (!$number) {
            $this->error('参数错误');
        }
        if (!filter_var($number, FILTER_VALIDATE_INT)) {
            $this->error('数量格式不正确');
        }
        if ($number <= 0) {
            $this->error('数量不能小于0');
        }

        $cartWhere['wechat_id'] = array('eq',$this->wechat_id);
        $cartWhere['goods_id'] = array('eq',$goods_id);
        $cartObj = $this->model->where($cartWhere)->find();
        if (!$cartObj) {
            $this->error('没有查到购物车数据');
        }
        $cartObj->goods_num = $number;
        $cartObj->save();
        $this->success('操作成功');
    }

    /**
     * Desc 购物车商品数量
     * Create on 2025/4/15 10:14
     * Create by wangyafang
     */
    public function cart_goods_number()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $goods_id = $this->model->where('wechat_id',$this->wechat_id)
            ->group('goods_id')
            ->column('goods_id');
        $number = count($goods_id);
        if (!$number) {
            $number = 0;
        }
        $this->success('请求成功',array('number'=>$number));
    }
}



 