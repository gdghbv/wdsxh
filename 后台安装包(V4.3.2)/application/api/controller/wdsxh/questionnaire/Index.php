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
namespace app\api\controller\wdsxh\questionnaire;

use app\api\model\wdsxh\member\Level;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\questionnaire\Questionnaire;
use app\api\model\wdsxh\questionnaire\Render;
use app\api\model\wdsxh\questionnaire\Topic;
use app\api\model\wdsxh\user\Wechat;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

class Index extends Api
{
    protected $noNeedLogin = ['index'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $topicModel = null;
    protected $renderModel = null;
    public function _initialize()
    {
        parent::_initialize();
        $this->model = new Questionnaire();
        $this->topicModel = new Topic();
        $this->renderModel = new Render();
    }

    /**
     * Desc  问卷调查列表
     * Create on 2024/3/19 16:29
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        $where['status'] = array('eq','normal');
        $expired_questionnaire_show = (new \app\admin\model\wdsxh\Config())->value('expired_questionnaire_show');
        $total = $this->model->where($where)->where(function ($query) use($expired_questionnaire_show){
            if ($expired_questionnaire_show == 2) {
                $query->where('end_time','>=',time());
            }
        })->count();
        $data = $this->model->where($where)
            ->where(function ($query) use($expired_questionnaire_show){
                if ($expired_questionnaire_show == 2) {
                    $query->where('end_time','>=',time());
                }
            })
            ->field('id,title,end_time,end_time,page_view,member_id')
            ->page($page,$limit)
            ->order('weigh desc,createtime desc')
            ->select();
        foreach ($data as $datum){
            if ($datum['member_id'] == -1) {//平台发布
                $datum['mobile'] = (new \app\api\model\wdsxh\business\Association())
                    ->where('id',1)->value('phone');
            }else{
                $datum['mobile'] = (new Member())->where('id',$datum['member_id'])->value('mobile');
            }

            $datum['end_time'] = date('Y-m-d h:i',$datum['end_time']);
            $datum['part_total'] = $this->renderModel->where('questionnaire_id',$datum['id'])->count();
            if (!$this->auth->isLogin()) {
                $datum['state'] = 2;
            } else {
                $user_id = $this->auth->id;
                $wechat_id = (new UserWechat())->where('user_id',$user_id)->value('id');
                $renderModel = (new Render())->where('wechat_id',$wechat_id)->where('questionnaire_id',$datum['id'])->find();
                if ($renderModel){
                    $datum['state'] = 1;
                }else{
                    $datum['state'] = 2;
                }
            }
        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  问卷调查详情
     * Create on 2024/3/20 08:53
     * Create by @小趴菜
     */
    public function details(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->get();
        $data =  (new Questionnaire())
            ->where('id',$param['id'])
            ->field('id,title,end_time,end_time,member_id,page_view,content,createtime,non_member_answer_sheet_status')
            ->find();
        $data['end_time'] = date('Y-m-d h:i',$data['end_time']);
        $data['createtime'] = date('Y-m-d h:i',$data['createtime']);
        if ($data['member_id'] == -1){//平台发布
            $association = (new \app\api\model\wdsxh\business\Association())
                ->where('id',1)->field('name,logo,phone')->find();
            $data['member_name'] = $association['name'];
            $data['avatar'] = $association['logo'];
            $data['level_name'] = '';
            $data['mobile'] = $association['phone'];
        }else{
            $memberObj = (new Member())->where('id',$data['member_id'])->field('id,name,avatar,member_level_id,mobile')->find();
            $memberObj['avatar'] = wdsxh_full_url($memberObj['avatar']);
            $data['member_name'] = $memberObj['name'];
            $data['avatar'] = $memberObj['avatar'];
            $data['level_name'] = (new Level())->where('id',$memberObj['member_level_id'])->value('name');
            $data['mobile'] = $memberObj['mobile'];
        }

        unset($data['member_id']);
        $topic = $this->topicModel->where('questionnaire_id',$data['id'])->field('id,topic,type,content,message,is_explain,explain_message,must')
            ->order('weigh asc')
            ->select();
        $page_view = $data['page_view']+=1;
        (new Questionnaire())->where('id',$param['id'])->update(['page_view' => $page_view]);

        if ($data['non_member_answer_sheet_status'] == 2) {
            if ($this->auth->isLogin()) {
                $user_id = $this->auth->id;
                $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
                $current_date = date('Y-m-d',time());
                $member = (new Member())->where('wechat_id',$wechat_id)->where('expire_time','>=',$current_date)->find();
                if ($member) {
                    $data['non_member_answer_sheet_status'] = 1;
                }
            }
        }
        $data= [
            'data' => $data,
            'topic' => $topic,
        ];
        $this->success('请求成功',$data);
    }

    /**
     * Desc  问卷调查提交
     * Create on 2024/3/20 08:53
     * Create by @小趴菜
     */
    public function add_topic(){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->post();
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');

        $current_date = date('Y-m-d',time());
        $memberObj = (new Member())->where('wechat_id',$wechat_id)
            ->where('expire_time','>=',$current_date)
            ->find();
        $questionnaireObj = $this->model->get($param['questionnaire_id']);
        if (!$questionnaireObj) {
            $this->error('问卷不存在');
        }
        if ($questionnaireObj['non_member_answer_sheet_status'] == '2' && !$memberObj) {
            $this->error('只有会员才能填写');
        }

        $topicModel = (new Render())->where('wechat_id',$wechat_id)->where('questionnaire_id',$param['questionnaire_id'])->find();
        if ($topicModel){
            $this->error('你已提交过此问卷,请勿重复提交');
        }
        $param['wechat_id'] = $wechat_id;
        $param['content_render'] = $param['content'];
        unset($param['content']);
        $param['createtime'] = time();
        $result = false;
        Db::startTrans();
        try {
            $result = (new Render())->insert($param);
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
     * Desc  问卷调查反馈
     * Create on 2024/4/11 17:11
     * Create by @小趴菜
     */
    public function render_details(){
        $param = $this->request->param();
        $user_id = $this->auth->id;
        $wechat_id = (new UserWechat())->where('user_id',$user_id)->value('id');
        $renderModel = (new Render())->where('wechat_id',$wechat_id)->where('questionnaire_id',$param['questionnaire_id'])->find();
        $data = html_entity_decode($renderModel->content_render);
        $formData = json_decode($data, true);
        foreach ($formData as $k=>$v){
            $formData[$k]['status'] = 1;
            if ($v['type'] == 'images'){
                if ($v['content']){
                    if (strpos($v['content'], ',') !== false) {
                        $img = explode(',', $v['content']);
                    } else {
                        $img = array($v['content']);
                    }
                    $images = [];
                    foreach ($img as $item){
                        $images[] = wdsxh_full_url($item);
                    }
                    $formData[$k]['content'] = $images;
                }
            }
        }
        $this->success('请求成功',$formData);
    }

    /**
     * Desc 答卷状态
     * Create on 2025/8/7 上午11:15
     * Create by wangyafang
     */
    public function answer_sheet_status()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('id');
        if (empty($id)) {
            $this->error('参数错误');
        }
        $non_member_answer_sheet_status = $this->model->where('id',$id)->value('non_member_answer_sheet_status');
        if ($non_member_answer_sheet_status == 2) {
            if ($this->auth->isLogin()) {
                $user_id = $this->auth->id;
                $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
                $current_date = date('Y-m-d',time());
                $member = (new Member())->where('wechat_id',$wechat_id)->where('expire_time','>=',$current_date)->find();
                if ($member) {
                    $non_member_answer_sheet_status = 1;
                }
            }
        }

        $this->success('请求成功',array(
            'status'=>$non_member_answer_sheet_status,
        ));
    }
}