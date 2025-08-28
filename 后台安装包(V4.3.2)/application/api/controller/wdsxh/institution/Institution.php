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
namespace app\api\controller\wdsxh\institution;

use app\admin\model\wdsxh\institution\InstitutionConfig;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\user\Wechat;
use app\common\controller\Api;

/**
 * Class Institution
 * Desc  机构控制器
 * Create on 2025/3/5 10:30
 * Create by wangyafang
 */
class Institution extends Api
{
    protected $noNeedLogin = ['index','details','institution_config'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\institution\Institution();
    }

    /**
     * Desc 机构列表
     * Create on 2025/3/5 10:32
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->get();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];

        $where['status'] = array('eq',1);
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,name,icon')
            ->page($page,$limit)
            ->order('weigh desc,createtime desc')
            ->select();
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc 机构详情
     * Create on 2025/3/5 10:36
     * Create by wangyafang
     */
    public function details()
    {
        $is_status = (new InstitutionConfig())->value('is_status');
        if ($is_status == 2) {
            if (!$this->auth->isLogin()) {
                $this->error('请登录后操作',null,401);
            }
            $user_id = $this->auth->id;
            $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
            $current_date = date('Y-m-d',time());
            $member = (new Member())->where('wechat_id',$wechat_id)->where('expire_time','>=',$current_date)->find();
            if (!$member) {
                $this->error('成为会员后可查看');
            }
        }
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->get('id');
        if (!$id) {
            $this->error('参数错误');
        }

        $data = $this->model->where('id',$id)
            ->field('id,name,images,introduction,icon')
            ->find();

        if ($this->auth->isLogin()) {
            $user_id = $this->auth->id;
            $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
            $queryInstitutionMemberObj = (new \app\api\model\wdsxh\institution\Member())->where('institution_id',$id)
                ->where('wechat_id',$wechat_id)
                ->find();
            if ($queryInstitutionMemberObj) {
                $data['apply_state'] = 2;
            } else {
                $data['apply_state'] = (new \app\api\model\wdsxh\institution\InstitutionMemberApply())
                    ->where('institution_id',$id)
                    ->where('wechat_id',$wechat_id)
                    ->value('state');
            }

        }

        $this->success('请求成功',$data);
    }

    /**
     * Desc 机构配置
     * Create on 2025/3/6 10:58
     * Create by wangyafang
     */
    public function institution_config()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $is_status = (new InstitutionConfig())->where('id',1)->value('is_status');

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



 