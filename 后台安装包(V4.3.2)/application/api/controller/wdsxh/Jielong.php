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
use app\api\model\wdsxh\jielong\JielongFeedback;
use app\api\model\wdsxh\member\Level;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\user\Wechat;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class Jielong extends Api
{
    protected $noNeedLogin = ['index','jielong_config'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $feedbackModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\jielong\Jielong();
        $this->feedbackModel = new JielongFeedback();

    }

    /**
     * Desc  接龙列表
     * Create on 2024/3/14 16:23
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        $where['status'] = array('eq','normal');
        $expired_jielong_show = (new \app\admin\model\wdsxh\Config())->value('expired_jielong_show');
        $total = $this->model->where($where)->where(function ($query) use($expired_jielong_show){
            if ($expired_jielong_show == 2) {
                $query->where('expire_time','>=',time());
            }
        })->count();
        $data = $this->model->where($where)
            ->where(function ($query) use($expired_jielong_show){
                if ($expired_jielong_show == 2) {
                    $query->where('expire_time','>=',time());
                }
            })
            ->field('id,name,type,expire_time,page_view,member_id,jielong_auth')
            ->page($page,$limit)
            ->order('createtime desc,weigh desc')
            ->select();
        foreach ($data as $row){
            $row['expire_time'] = date('Y-m-d h:i',$row['expire_time']);
            $row['part_total'] = $this->feedbackModel->where('jielong_id',$row['id'])->count();
            if ($row['member_id'] == -1){
                $row['mobile'] = (new \app\api\model\wdsxh\business\Association())->where('id',1)->value('phone');
            }else{
                $row['mobile'] = (new Member())->where('id',$row['member_id'])->value('mobile');
            }
        }
        $this->success('',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  接龙详情
     * Create on 2024/3/14 17:41
     * Create by @小趴菜
     */
    public function details(){
        $param = $this->request->param();
        $where = [];
        $where['id'] = array('eq',$param['id']);
        $list = $this->model
            ->where($where)
            ->field('id,name,type,content,expire_time,page_view,member_ids,createtime,member_id,jielong_auth')
            ->find();
        if ($list){
            if ($list['member_id'] == -1){
                $association = (new \app\api\model\wdsxh\business\Association())
                    ->where('id',1)->field('name,logo,phone')->find();
                $list['member_name'] = $association['name'];
                $list['avatar'] = $association['logo'];
                $list['level_name'] = '';
                $list['mobile'] = $association['phone'];
            }else{
                $member = (new Member())->alias('member')
                    ->where('member.id',$list['member_id'])
                    ->join('wdsxh_member_level level','level.id = member.member_level_id')
                    ->field('member.name member_name,member.avatar,member.mobile,level.name level_name')
                    ->find();
                $list['member_name'] = $member['member_name'];
                $list['avatar'] = $member['avatar'];
                $list['level_name'] = $member['level_name'];
                $list['mobile'] = $member['mobile'];
            }
            $list['expire_time'] = date('Y-m-d H:i',$list['expire_time']);
            $list['createtime'] = date('Y-m-d H:i',$list['createtime']);
            if ($list['type'] == 2){//限定接龙
                //根据接龙表存的member_ids来查询会员信息
                $member_ids = explode(",", $list['member_ids']);
                $memberObj_data = [];
                foreach ($member_ids as $datum){
                    $memberObj = (new Member())
                        ->where('id',$datum)
                        ->field('id,name member_name')->find();
                    $JielongFeedbackObj = (new JielongFeedback())->where('member_id',$datum)->where('jielong_id',$param['id'])->find();
                    if ($JielongFeedbackObj){
                        $memberObj['status'] = 1;
                    }else{
                        $memberObj['status'] = 2;
                    }
                    $memberObj_data[] = $memberObj;
                }
                $JielongFeedback_data = (new JielongFeedback())
                    ->where('jielong_id',$param['id'])
                    ->field('id,name member_name')
                    ->select();
                foreach ($JielongFeedback_data as $datum){
                    $datum['status'] = 1;
                }
                //合并数组
                $result = array_merge($memberObj_data, $JielongFeedback_data);
                // 创建一个关联数组，用于存储唯一的 member_name
                $uniqueArray = [];
                foreach ($result as $element) {
                    $memberName = $element["member_name"];
                    // 如果这个 member_name 还没有被加入到 $uniqueArray 中，就加入
                    if (!isset($uniqueArray[$memberName])) {
                        $uniqueArray[$memberName] = $element;
                    }
                }
                // 获取去重后的数组
                $member_data = array_values($uniqueArray); // 重新索引数组
            }else{
                $member_data = (new JielongFeedback())
                    ->where('jielong_id',$param['id'])
                    ->field('id,name member_name')
                    ->select();
                foreach ($member_data as $datum){
                    $datum['status'] = 1;
                }
            }
            $page_view = $list['page_view'] +=1;
            (new \app\api\model\wdsxh\jielong\Jielong())->where('id',$param['id'])->update(['page_view' => $page_view]);
        }
        $data = [
            'data' => $list,
            'member_data' => $member_data,
        ];
        $this->success('请求成功',$data);
    }

    /**
     * Desc  活动接龙反馈
     * Create on 2024/3/15 10:46
     * Create by @小趴菜
     */
    public function add(){
        $param = $this->request->post();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $member_id = (new Member())->where('wechat_id',$wechat_id)->value('id');
        //接龙类型  类型:1=自由接龙,2=限定接龙
        $jielong_type = $this->model->where('id',$param['jielong_id'])->value('type');
        if ($jielong_type == 2){
            $member_ids = $this->model->where('id',$param['jielong_id'])->value('member_ids');
            $member_ids_array = explode(',',$member_ids);
            if (!in_array($param['member_id'],$member_ids_array)) {
                $this->error('不是指定人员，无法接龙');
            }
            if ($param['member_id'] != $member_id){
                $this->error('请选择自己的名字进行反馈！');
            }
            $jielong_feedback = (new JielongFeedback())
                ->where('member_id',$param['member_id'])
                ->where('jielong_id',$param['jielong_id'])
                ->where('wechat_id',$wechat_id)
                ->find();
            if ($jielong_feedback){
                $this->error('您已经反馈过啦！');
            }
        }else{
            $jielong_feedback = (new JielongFeedback())
                ->where('jielong_id',$param['jielong_id'])
                ->where('wechat_id',$wechat_id)
                ->find();
            if ($jielong_feedback){
                $this->error('您已经反馈过啦！');
            }
        }
        $param['wechat_id'] = $wechat_id;
        $param['createtime'] = time();
        $result = false;
        Db::startTrans();
        try {
            $result = $this->feedbackModel->save($param);
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
     * Desc  判断是否反馈
     * Create on 2024/3/22 11:26
     * Create by @小趴菜
     */
    public function feedback_state()
    {
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id', $user_id)->value('id');
        $where = [];
        $where['id'] = array('eq', $param['id']);
        $list = $this->model
            ->where($where)
            ->field('id,name,type,content,expire_time,page_view,member_ids,createtime,member_id')
            ->find();
        if ($list) {

            if ($list['type'] == 2) {//限定接龙
                $member_data = (new Member())->where('wechat_id', $wechat_id)->field('id,name member_name')->find();
                $JielongFeedbackObj = (new JielongFeedback())->where('member_id', $member_data['id'])->where('jielong_id', $param['id'])->find();
                if ($JielongFeedbackObj) {
                    $member_data['status'] = 1;
                } else {
                    $member_data['status'] = 2;
                }
            } else {
                $member_data = (new Member())->where('wechat_id', $wechat_id)->field('id,name')->find();
                if ($member_data){
                    $member_data['member_name'] = $member_data['name'];
                }else{
                    $member_data = (new Wechat())->where('user_id', $user_id)->field('id,nickname member_name')->find();
                }
                $JielongFeedbackObj = (new JielongFeedback())->where('wechat_id', $wechat_id)->where('jielong_id', $param['id'])->find();
                if ($JielongFeedbackObj) {
                    $member_data['status'] = 1;
                } else {
                    $member_data['status'] = 2;
                }
            }
        }
        $this->success('请求成功', $member_data);
    }

    /**
     * Desc  判断是否有资格参加
     * Create on 2024/3/22 11:42
     * Create by @小趴菜
     */
    public function jielong_state()
    {
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id', $user_id)->value('id');
        $where = [];
        $where['id'] = array('eq', $param['id']);
        $list = $this->model
            ->where($where)
            ->field('id,member_ids,type')
            ->find();
        $current_date = date('Y-m-d',time());
        $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();
        if ($list['type'] == 2) {//限定接龙
            if ($memberObj){
                //根据接龙表存的member_ids来查询会员信息
                $member_ids = explode(",", $list['member_ids']);
                $member_data = (new Member())->where('wechat_id', $wechat_id)->value('id');
                if (in_array($member_data, $member_ids)) {
                    $member_data = 1;
                } else {
                    $member_data = 2;
                }
            }else{
                $member_data = 2;
            }
        }else{
            if ($memberObj){
                $member_data = 1;
            }else{
                $member_data = 2;
            }
        }
        $this->success('请求成功', ['state' => $member_data]);
    }

    /**
     * Desc  反馈详情
     * Create on 2024/4/11 15:44
     * Create by @小趴菜
     */
    public function feedback_details(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new UserWechat())->where('user_id',$user_id)->value('id');
        $data = (new JielongFeedback())->where('jielong_id',$param['jielong_id'])
            ->where('wechat_id',$wechat_id)->field('id,name,member_id,images,content,status,createtime')->find();
        if ($data){
            $data['createtime'] = date('Y-m-d h:i',$data['createtime']);
            if ($data['status'] == 1){
                $data['status'] = '参加';
            }elseif($data['status'] == 2){
                $data['status'] = '不参加';
            }elseif ($data['status'] == 3){
                $data['status'] = '参加其他';
            }
        }
        $member_data = (new Member())->where('id',$data['member_id'])->field('id,avatar,name,member_level_id')->find();
        if ($member_data){
            $member_data['member_level'] = (new Level())->where('id',$member_data['member_level_id'])->value('name');
        } else {
            $member_data = (new UserWechat())->where('id',$wechat_id)->field('id,avatar,nickname name')->find();
        }
        $data = [
            'member_data' => $member_data,
            'feedback_data' => $data,
        ];
        $this->success('请求成功',$data);


    }

    /**
     * Desc 接龙配置
     * Create on 2025/8/8 10:04
     * Create by wangyafang
     */
    public function jielong_config()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('id');
        if (empty($id)) {
            $this->error('参数错误');
        }
        $jielongObj = $this->model->get($id);
        if (!$jielongObj) {
            $this->error('接龙数据不存在');
        }
        $is_status = $jielongObj['jielong_auth'];

        if ($is_status == 2){
            if ($this->auth->isLogin()) {
                $user_id = $this->auth->id;
                $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
                $current_date = date('Y-m-d',time());
                $member = (new Member())->where('wechat_id',$wechat_id)->where('expire_time','>=',$current_date)->find();
                if ($member) {
                    $is_status = 1;
                }
            }
        }
        $this->success('请求成功',['show_status'=>$is_status]);
    }


}