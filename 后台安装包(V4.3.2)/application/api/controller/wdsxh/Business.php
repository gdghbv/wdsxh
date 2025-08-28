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
namespace app\api\controller\wdsxh;

use addons\wdsxh\library\Wxapp;
use app\api\model\wdsxh\business\BusinessConfig;
use app\api\model\wdsxh\business\Category;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\user\Wechat;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class Business extends Api
{
    protected $noNeedLogin = ['business_cat','index','business_config','user_details','diy_list'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $BusinessCatModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\business\Business();
        $this->BusinessCatModel = new Category();

    }


    /**
     * Desc  商圈分类
     * Create on 2024/3/12 15:36
     * Create by @小趴菜
     */
    public function business_cat(){
        $where = [];
        $where['status'] = array('eq','normal');
        $data = $this->BusinessCatModel
            ->where($where)
            ->field('id,name')
            ->select();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  商圈列表
     * Create on 2024/3/12 14:49
     * Create by @小趴菜
     */
    public function index(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $is_status = (new BusinessConfig())->where('id',1)->value('is_status');
        if ($is_status == 3) {
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

        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        if(isset($param['category_id']) && !empty($param['category_id'])) {
            $where['category_id'] = array('eq',$param['category_id']);
        }
        if(isset($param['title']) && !empty($param['title'])) {
            $where['title'] = array('like','%'.$param['title'].'%');
        }
        $where['status'] = array('eq','normal');
        $where['state'] = array('eq',2);
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,title,images,title,content,createtime,page_view,member_id,address,lng,lat')
            ->page($page,$limit)
            ->order('createtime desc,weigh desc')
            ->select();
        $businessAssociationModel = new \app\api\model\wdsxh\business\Association();
        $is_status = (new BusinessConfig())->where('id',1)->value('is_status');
        foreach ($data as $k=>$v){
            $images = explode(',',$v['images']);
            // 如果文件数量超过3个，只取前三个文件，否则取全部文件
//            $data[$k]['images'] = implode(',', array_slice($images, 0, 3));
            if ($v['member_id'] == '-1') {
                $businessAssociationObj = $businessAssociationModel
                    ->where('id',1)
                    ->field('name,logo avatar,phone mobile')
                    ->find();
                $businessAssociationObj['level_name'] = '平台发布';
                $businessAssociationObj['avatar'] = wdsxh_full_url($businessAssociationObj['avatar']);
                $data[$k]['member'] = $businessAssociationObj;
            } else {
                $data[$k]['member'] = (new Member())
                    ->alias('member')
                    ->where('member.id',$v['member_id'])
                    ->join('wdsxh_member_level level','level.id = member.member_level_id')
                    ->field('member.id,member.name,member.avatar,member.mobile,level.name level_name')
                    ->find();
            }
            if ($is_status == 2) {
                if ($this->auth->isLogin()) {
                    $current_date = date('Y-m-d',time());
                    $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                    $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                        ->where('expire_time','>=',$current_date)
                        ->find();
                    if (!$memberObj) {
                        $data[$k]['member']['mobile'] = '';
                    }
                } else {
                    $data[$k]['member']['mobile'] = '';
                }
            }

        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  商圈详情
     * Create on 2024/3/12 14:03
     * Create by @小趴菜
     */
    public function details(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $is_status = (new BusinessConfig())->where('id',1)->value('is_status');
        if ($is_status == 3) {
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

        $param = $this->request->param();
        $where = [];
        $where['id'] = array('eq',$param['id']);
        $business = $this->model
            ->where($where)
            ->field('id,title,images,content,createtime,page_view,member_id,address,lng,lat')
            ->find();
        if ($business){
            $business['page_view']+=1;
            $business->save();
        }
        if ($business['member_id'] == '-1') {
            $businessAssociationModel = new \app\api\model\wdsxh\business\Association();
            $businessAssociationObj = $businessAssociationModel
                ->where('id',1)
                ->field('name,logo avatar,phone mobile')
                ->find();
            $businessAssociationObj['level_name'] = '平台发布';
            $businessAssociationObj['avatar'] = wdsxh_full_url($businessAssociationObj['avatar']);
            $member = $businessAssociationObj;
        } else {
            $member =  (new Member())
                ->alias('member')
                ->where('member.id',$business['member_id'])
                ->join('wdsxh_member_level level','level.id = member.member_level_id')
                ->field('member.id,member.name,member.avatar,member.mobile,level.name level_name')
                ->find();
        }

        $data = [
            'member' => $member,
            'business' => $business,

        ];
        $this->success('请求成功',$data);
    }

    /**
     * Desc  商圈发布
     * Create on 2024/3/12 17:07
     * Create by @小趴菜
     */
    public function add(){
        $param = $this->request->post();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $member = (new Member())->where('wechat_id',$wechat_id)->find();
        if (!$member){
            $this->error('你还不是会员,请先入会');
        }
        $current_date = date('Y-m-d',time());
        if ($member['expire_time'] <= $current_date){
            $this->error('您的会员已到期,请先入会');
        }
        $openid = wdsxh_get_openid($wechat_id,1);
        $channel = $this->request->header('channel');
        //todo 腾讯校验增加开关
        $security_text_switch = (new \app\admin\model\wdsxh\Config())->where('id','1')->value('security_text_switch');
        if ($security_text_switch == '1' && $channel == 1) {
            $result = Wxapp::checkSecurityText($openid,$param['title']);
            if ($result != 1) {
                if ($result == 2) {
                    $this->error('文本内容输入不合规，请重新输入');
                } else {
                    $this->error('errcode:'.$result['errcode'].',errmsg:'.$result['errmsg']);
                }
            }
            unset($result);
            if (!empty($param['content'])) {
                $result = Wxapp::checkSecurityText($openid,$param['content']);
                if ($result != 1) {
                    if ($result == 2) {
                        $this->error('文本内容输入不合规，请重新输入');
                    } else {
                        $this->error('errcode:'.$result['errcode'].',errmsg:'.$result['errmsg']);
                    }
                }
            }
        }
        $member_id = (new Member())->where('wechat_id',$wechat_id)->value('id');
        $state_config = (new BusinessConfig())->value('is_process');
        $param['address'] = isset($param['address']) ? $param['address'] : '';
        $param['lat'] = isset($param['lat']) ? $param['lat'] : '';
        $param['lng'] = isset($param['lng']) ? $param['lng'] : '';
        $param['number'] = wdsxh_create_order();
        $param['member_id'] = $member_id;
        $param['wechat_id'] = $wechat_id;
        $param['createtime'] = time();
        if ($state_config == 1){
            $param['state'] = 1;
        }else{
            $param['state'] = 2;
        }
        $result = false;
        Db::startTrans();
        try {
            $result = $this->model->save($param);
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
     * Desc  我的发布-商圈修改
     * Create on 2024/3/12 17:58
     * Create by @小趴菜
     */
    public function edit(){
        $param = $this->request->post();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $openid = wdsxh_get_openid($wechat_id,1);
        $channel = $this->request->header('channel');
        //todo 腾讯校验增加开关
        $security_text_switch = (new \app\admin\model\wdsxh\Config())->where('id','1')->value('security_text_switch');
        if ($security_text_switch == '1' && $channel == 1) {
            $result = Wxapp::checkSecurityText($openid,$param['title']);
            if ($result != 1) {
                if ($result == 2) {
                    $this->error('文本内容输入不合规，请重新输入');
                } else {
                    $this->error('errcode:'.$result['errcode'].',errmsg:'.$result['errmsg']);
                }
            }
            unset($result);
            if (!empty($param['content'])) {
                $result = Wxapp::checkSecurityText($openid,$param['content']);
                if ($result != 1) {
                    if ($result == 2) {
                        $this->error('文本内容输入不合规，请重新输入');
                    } else {
                        $this->error('errcode:'.$result['errcode'].',errmsg:'.$result['errmsg']);
                    }
                }
            }
        }
        $state_config = (new BusinessConfig())->value('is_process');
        $param['createtime'] = time();
        $param['updatetime'] = time();
        if(isset($param['images']) && !empty($param['images'])) {
            $param['images'] = remove_wdsxh_full_url($param['images']);
        }
        if ($state_config == 1){
            $param['state'] = 1;
        }else{
            $param['state'] = 2;
        }
        $param['reject'] = '';
        $param['address'] = isset($param['address']) ? $param['address'] : '';
        $param['lat'] = isset($param['lat']) ? $param['lat'] : '';
        $param['lng'] = isset($param['lng']) ? $param['lng'] : '';
        $result = false;
        Db::startTrans();
        try {
            $result = $this->model->where('id',$param['id'])->update($param);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('修改成功');
    }

    /**
     * Desc  我的发布-商圈删除
     * Create on 2024/3/13 15:17
     * Create by @小趴菜
     */
    public function del(){
        $param = $this->request->param();
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $result = false;
        Db::startTrans();
        try {
            $result = $this->model
                ->where('id',$param['id'])
                ->where('wechat_id',$wechat_id)
                ->delete();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('删除成功');
    }

    /**
     * Desc  我的发布-商圈详情
     * Create on 2024/3/13 14:35
     * Create by @小趴菜
     */
    public function user_details(){
        $param = $this->request->param();
        $where = [];
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $where['id'] = array('eq',$param['id']);
        $where['wechat_id'] = array('eq',$wechat_id);
        $business = $this->model
            ->where($where)
            ->field('id,title,images,content,category_id,createtime,page_view,member_id,reject,state,address,lng,lat')
            ->find();
        if ($business){
            $business['category_name'] = $this->BusinessCatModel->where('id',$business['category_id'])->value('name');

        }
        $member =  (new Member())
            ->alias('member')
            ->where('member.id',$business['member_id'])
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field('member.id,member.name,member.avatar,member.mobile,level.name level_name')
            ->find();
        $data = [
            'member' => $member,
            'business' => $business,

        ];
        $this->success('请求成功',$data);
    }

    /**
     * Desc  我的发布-商圈列表
     * Create on 2024/3/13 15:00
     * Create by @小趴菜
     */
    public function user_index(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        if(isset($param['state']) && !empty($param['state'])) {
            $where['state'] = array('eq',$param['state']);
        }
        $where['wechat_id'] = array('eq',$wechat_id);
        $where['status'] = array('eq','normal');
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,number,title,images,content,state,reject,page_view,address,lng,lat')
            ->page($page,$limit)
            ->order('createtime desc,weigh desc')
            ->select();


        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  商圈配置
     * Create on 2024/3/18 11:22
     * Create by @小趴菜
     */
    public function business_config(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $type = $this->request->get('type');

        //会员详情显示权限:1=全部开放,2=部分开放,3=会员专属
        $member_details = (new BusinessConfig())->where('id',1)->value('is_status');
        $current_date = date('Y-m-d',time());
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();
        if ($type == 1) {//列表
            $show_status = in_array($member_details,array('1','2')) || $memberObj ? 1 : 2;
        } else {//详情
            $show_status = ($member_details == '1' || $memberObj) ? 1 : 2;
        }
        $this->success('请求成功',['show_status'=>$show_status]);
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
        $param = $this->request->get();
        $where = [];
        if(isset($param['category_id']) && !empty($param['category_id'])) {
            $where['category_id'] = array('eq',$param['category_id']);
        }
        $where['status'] = array('eq','normal');
        $where['state'] = array('eq',2);
        $data = $this->model
            ->where($where)
            ->field('id,title,images,title,content,createtime,page_view,member_id,address,lng,lat')
            ->page(1,$limit)
            ->order('createtime desc,weigh desc')
            ->select();
        $businessAssociationModel = new \app\api\model\wdsxh\business\Association();
        $is_status = (new BusinessConfig())->where('id',1)->value('is_status');
        foreach ($data as $k=>$v){
            if ($v['member_id'] == '-1') {
                $businessAssociationObj = $businessAssociationModel
                    ->where('id',1)
                    ->field('name,logo avatar,phone mobile')
                    ->find();
                $businessAssociationObj['level_name'] = '平台发布';
                $businessAssociationObj['avatar'] = wdsxh_full_url($businessAssociationObj['avatar']);
                $data[$k]['member'] = $businessAssociationObj;
            } else {
                $data[$k]['member'] = (new Member())
                    ->alias('member')
                    ->where('member.id',$v['member_id'])
                    ->join('wdsxh_member_level level','level.id = member.member_level_id')
                    ->field('member.id,member.name,member.avatar,member.mobile,level.name level_name')
                    ->find();
            }
            if ($is_status == 2) {
                if ($this->auth->isLogin()) {
                    $current_date = date('Y-m-d',time());
                    $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                    $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                        ->where('expire_time','>=',$current_date)
                        ->find();
                    if (!$memberObj) {
                        $data[$k]['member']['mobile'] = '';
                    }
                } else {
                    $data[$k]['member']['mobile'] = '';
                }
            }
        }
        $this->success('请求成功',$data);
    }


}