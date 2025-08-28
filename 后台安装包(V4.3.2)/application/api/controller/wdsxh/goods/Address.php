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
use app\api\model\wdsxh\user\Wechat;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;


class Address extends Api
{
    protected $noNeedLogin = ['address_province','address_city','address_area'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\goods\Address();

    }

    /**
     * Desc  地址列表
     * Create on 2024/3/15 15:25
     * Create by @小趴菜
     */
    public function index()
    {
        $param = $this->request->param();
        //查询默认地址
        if(isset($param['is_default']) && !empty($param['is_default'])) {
            $where['is_default'] = array('eq',$param['is_default']);
        }
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $where['wechat_id'] = array('eq',$wechat_id);
        $data = $this->model
            ->where($where)
            ->field('id,name,tel,address,is_default')
            ->select();
        $this->success('请求成功',$data);

    }

    /**
     * Desc  地址列表
     * Create on 2024/3/15 15:39
     * Create by @小趴菜
     */
    public function add(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $default_id =  $this->model->where([
            'wechat_id'=>$wechat_id,
            'is_default'=>1,
        ])->value('id');
        if($param['is_default'] == 1 && $default_id) {
            Db::name('wdsxh_mall_user_address')->where('id',$default_id)->update([
                'is_default'=>0,
            ]);
        }
        Db::startTrans();
        try{
            Db::name('wdsxh_mall_user_address')->insert([
                'wechat_id'=>$wechat_id,
                'name'=>$param['name'],
                'tel' =>$param['tel'],
                'address'=>$param['address'],
                'is_default'=>$param['is_default'] == true ? 1 : 0,
                'createtime'=>time(),
            ]);
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('操作成功');
    }

    /**
     * Desc  修改地址
     * Create on 2024/3/15 15:46
     * Create by @小趴菜
     */
    public function edit(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        if($param['is_default'] == true) {
            Db::name('wdsxh_mall_user_address')
                ->where('wechat_id',$wechat_id)
                ->update([
                    'is_default'=>0,
                ]);
        }
        Db::startTrans();
        try{
            Db::name('wdsxh_mall_user_address')
                ->where('id',$param['id'])
                ->update([
                    'name'=>$param['name'],
                    'tel' =>$param['tel'],
                    'address'=>$param['address'],
                    'is_default'=>$param['is_default'] == true ? 1 : 0,
                    'updatetime'=>time(),
                ]);
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('操作成功');
    }

    /**
     * Desc  删除地址
     * Create on 2024/3/15 15:54
     * Create by @小趴菜
     */
    public function del()
    {
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $userAddressObj = $this->model
            ->where('id',$this->request->param('id'))
            ->where('wechat_id',$wechat_id)
            ->find();
        $userAddressObj->delete();
        $this->success('删除成功');
    }

    /**
     * Desc  修改默认地址
     * Create on 2024/3/15 15:56
     * Create by @小趴菜
     */
    public function set_default()
    {
        $id = $this->request->param('id');
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        Db::startTrans();
        try{
            Db::name('wdsxh_mall_user_address')
                ->where('wechat_id',$wechat_id)
                ->update([
                    'is_default'=>0,
                ]);
            Db::name('wdsxh_mall_user_address')
                ->where('id',$id)
                ->update([
                    'is_default'=>1,
                ]);
            // 提交事务
            Db::commit();
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            $this->error($e->getMessage());
        }
        $this->success('操作成功');

    }


    //省
    public function address_province(){
        $total = Db::name('wdsxh_area')
            ->where('level',1)
            ->count();
        $data = Db::name('wdsxh_area')
            ->where('level',1)
            ->field('id,name')
            ->select();
        $this->success('请求成功',['total'=>$total,'data'=>$data]);
    }

    //市
    public function address_city(){
        $param = $this->request->param();
        $total = Db::name('wdsxh_area')
            ->where('level',2)
            ->where('pid',$param['crea_id'])
            ->count();
        $data = Db::name('wdsxh_area')
            ->where('level',2)
            ->where('pid',$param['crea_id'])
            ->field('id,name')
            ->select();
        $this->success('请求成功',['total'=>$total,'data'=>$data]);
    }

    //区
    public function address_area(){
        $param = $this->request->param();
        $total = Db::name('wdsxh_area')
            ->where('level',3)
            ->where('pid',$param['crea_id'])
            ->count();
        $data = Db::name('wdsxh_area')
            ->where('level',3)
            ->where('pid',$param['crea_id'])
            ->field('id,name')
            ->select();
        $this->success('请求成功',['total'=>$total,'data'=>$data]);
    }


}