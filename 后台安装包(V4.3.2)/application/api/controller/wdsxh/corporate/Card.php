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
 * Class Card
 * Desc  名片控制器
 * Create on 2025/1/21 16:59
 * Create by wangyafang
 */
namespace app\api\controller\wdsxh\corporate;

use app\api\model\wdsxh\corporate\Reliable;
use app\api\model\wdsxh\corporate\Visitor;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

class Card extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\corporate\Card();
    }

    /**
     * Desc 名片列表
     * Create on 2025/1/21 17:00
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $where = [];
        $where['wechat_id'] = array('eq',$wechat_id);


        $order = 'is_default asc,id desc';

        $data = $this->model
            ->where($where)
            ->field('id,image,share_title,is_default,font_color,card_background_image,name,avatar,
            company_name,main_business,mobile,company_address,is_hide_avatar,company_position,wechat_id')
            ->order($order)
            ->select();

        $memberModel = new Member();
        $current_date = date('Y-m-d',time());
        foreach($data as $v) {
            $memberObj = $memberModel->where('wechat_id',$wechat_id)
                ->where('expire_time','>=',$current_date)
                ->find();
            if ($memberObj) {
                $v->member_level_name = $memberObj->member_level_name;
                unset($memberObj);
            }
            $v->hidden(['wechat_id']);
        }

        $data = collection($data)->toArray();

        $this->success('请求成功',$data);
    }

    /**
     * Desc 添加
     * Create on 2025/1/21 17:17
     * Create by wangyafang
     */
    public function add()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $result = $this->validate($param,'app\api\validate\wdsxh\corporate\Card');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }
        if (isset($param['mobile']) && !empty($param['mobile'])) {
            if (!$param['mobile'] || !\think\Validate::regex($param['mobile'], "^1\d{10}$")) {
                $this->error('手机号格式不正确');
            }
        }

        $param['is_default'] = isset($param['is_default']) ? $param['is_default'] : 2;
        $param['is_hide_avatar'] = isset($param['is_hide_avatar']) ? $param['is_hide_avatar'] : 2;
        $param['is_wechat_number_public'] = isset($param['is_wechat_number_public']) ? $param['is_wechat_number_public'] : 2;
        $param['wechat_id'] = $wechat_id;

        $count = $this->model->where('wechat_id',$wechat_id)->count();
        if ($count == 0) {
            $param['is_default'] = 1;
        } else {
            $default_id =  $this->model->where([
                'wechat_id'=> $wechat_id,
                'is_default'=>1,
            ])->value('id');
            if($param['is_default'] == 1 && $default_id) {
                $this->model->where('id',$default_id)->update([
                    'is_default'=>2,
                ]);
            }
        }

        if (isset($_POST['company_introduction'])) {
            $param['company_introduction'] = $_POST['company_introduction'];
        }
        if (isset($param['company_introduction']) && !empty($param['company_introduction'])) {
            $param['company_introduction'] = wdsxh_xss_filter($param['company_introduction']);
        }

        $result = false;
        Db::startTrans();
        try {
            $result = $this->model->allowField(true)->save($param);
            $card_id = $this->model->id; // 获取刚添加数据的ID
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('提交成功', ['card_id' => $card_id]); // 返回刚添加数据的ID
    }

    /**
     * Desc 编辑
     * Create on 2025/1/21 17:18
     * Create by wangyafang
     */
    public function edit()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $result = $this->validate($param,'app\api\validate\wdsxh\corporate\Card');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }
        if (isset($param['mobile']) && !empty($param['mobile'])) {
            if (!$param['mobile'] || !\think\Validate::regex($param['mobile'], "^1\d{10}$")) {
                $this->error('手机号格式不正确');
            }
        }

        $row = $this->model->where('id',$param['id'])->where('wechat_id',$wechat_id)->find();
        if (!$row) {
            $this->error('名片信息不存在');
        }

        $default_id =  $this->model->where([
            'wechat_id'=> $wechat_id,
            'is_default'=>1,
        ])->where('id','<>',$param['id'])->value('id');
        if($param['is_default'] == 1 && $default_id) {
            $this->model->where('id',$default_id)->update([
                'is_default'=>2,
            ]);
        }

        if (isset($_POST['company_introduction'])) {
            $param['company_introduction'] = $_POST['company_introduction'];
        }
        if (isset($param['company_introduction']) && !empty($param['company_introduction'])) {
            $param['company_introduction'] = wdsxh_xss_filter($param['company_introduction']);
        }

        $param['updatetime'] = time();
        $result = false;
        Db::startTrans();
        try {
            $result = $row->allowField(true)->save($param);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('编辑成功');
    }

    /**
     * Desc 详情
     * Create on 2025/1/21 17:18
     * Create by wangyafang
     */
    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');

        }
        $id = $this->request->get('id');
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $data = $this->model
            ->where('id',$id)
            ->field('id,name,company_position,company_name,main_business,mobile,company_address,
            avatar,company_introduction,
            is_hide_avatar,is_wechat_number_public,wechat_number,image,card_background_image,font_color')
            ->find();
        if (!$data) {
            $this->error('名片不存在');
        }
        if ($data['is_hide_avatar'] == '1') {
            $data['avatar'] = '';
        }
        if ($data['is_wechat_number_public'] == '2') {
            $data['wechat_number'] = '';
        }

        $visitorObj = (new Visitor())->where('wechat_id', $wechat_id)->where('card_id', $id)->find();
        if ($visitorObj) {
            $visitorObj->createtime = time();
            $visitorObj->save();
        } else {
            $visitor_data = array(
                'wechat_id' => $wechat_id,
                'card_id' => $id,
                'createtime' => time(),
            );
            Visitor::create($visitor_data);
        }

        $visitor_list = (new Visitor())->where('visitor.card_id', $id)
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
        $data['visitor_count'] = (new Visitor())->where('card_id', $id)->count();

        $reliableObj = (new Reliable())->where('card_id', $id)
            ->where('wechat_id',$wechat_id)
            ->find();
        $data['reliable_status'] = !empty($reliableObj) ? 1 : 2;

        $current_date = date('Y-m-d',time());
        $memberObj = (new Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();
        if ($memberObj) {
            $data['member_level_name'] = $memberObj->member_level_name;
            unset($memberObj);
        }
        $this->success('请求成功',$data);
    }

    /**
     * Desc 编辑详情
     * Create on 2025/1/22 10:58
     * Create by wangyafang
     */
    public function edit_details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');

        }
        $id = $this->request->get('id');
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $data = $this->model
            ->where('id',$id)
            ->where('wechat_id', $wechat_id)
            ->find();
        if (empty($data)) {
            $this->error('名片不存在');
        }
        $data->hidden(['wechat_id','company_lat','company_lng','image','createtime','updatetime']);
        $this->success('请求成功',$data);
    }

    /**
     * Desc 设置默认
     * Create on 2025/1/22 11:41
     * Create by wangyafang
     */
    public function set_default()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $param = $this->request->post();
        if (!isset($param['is_default'])) {
            $this->error('参数错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $row = $this->model->where('id',$param['id'])->where('wechat_id',$wechat_id)->find();
        if (!$row) {
            $this->error('名片信息不存在');
        }
        $default_id =  $this->model->where([
            'wechat_id'=> $wechat_id,
            'is_default'=>1,
        ])->where('id','<>',$param['id'])->value('id');
        if($param['is_default'] == 1 && $default_id) {
            $this->model->where('id',$default_id)->update([
                'is_default'=>2,
            ]);
        }
        $result = false;
        Db::startTrans();
        try {
            $result = $row->allowField(true)->save($param);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('操作成功');

    }

    /**
     * Desc 我的名片
     * Create on 2025/1/22 11:53
     * Create by wangyafang
     */
    public function center()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');

        $visitorModel = new Visitor();
        $cart_id_array = $this->model->where('wechat_id',$wechat_id)->column('id');

        $total_count = $visitorModel
            ->where('card_id','in',$cart_id_array)
            ->count();
        $today_count = $visitorModel
            ->where('card_id','in',$cart_id_array)
            ->whereTime('createtime', 'today')
            ->count();
        $data = array(
            'total_count'=>$total_count,
            'today_count'=>$today_count,
        );
        $this->success('请求成功',$data);
    }

    /**
     * Desc 默认名片
     * Create on 2025/1/22 14:07
     * Create by wangyafang
     */
    public function default_card()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $data = $this->model->where('wechat_id',$wechat_id)->where('is_default',1)->field('id,image,share_title')->find();

        $this->success('请求成功',$data);
    }

    /**
     * Desc 删除
     * Create on 2025/1/23 9:28
     * Create by wangyafang
     */
    public function del()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $ids = $this->request->post('ids');
        if (empty($ids)) {
            $this->error('参数错误');
        }
        $idsArray = explode(',',$ids);
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');

        $result = false;
        Db::startTrans();
        try {
            $result = $this->model->where('id','in',$idsArray)->where('wechat_id',$wechat_id)->delete();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }

        if ($result == false) {
            $this->error('删除失败');
        }

        $this->success('删除成功');
    }


}



 