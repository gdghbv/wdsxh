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
 * Class Member
 * Desc  成员控制器
 * Create on 2025/3/5 10:42
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\institution;


use app\common\controller\Api;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class Member extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\institution\Member();
    }

    /**
     * Desc 成员列表
     * Create on 2025/3/5 10:44
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $param = $this->request->get();
        if (empty($param['institution_id'])) {
            $this->error('参数错误');
        }
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        try {
            $where = [];
            $where[config('database.prefix').'wdsxh_institution_member.institution_id'] = array('eq',$param['institution_id']);
            $memberModel = new \app\api\model\wdsxh\member\Member();

            $date = date('Y-m-d',time());
            $total = $this->model->where($where)
                ->alias('member')
                ->with(['usermember','institution_level'])
                ->join('wdsxh_member','wdsxh_member.id = '.config('database.prefix').'wdsxh_institution_member.member_id')
                ->where('wdsxh_member.expire_time','>=',$date)
                ->count();
            $data = $this->model
                ->alias('member')
                ->with(['usermember','institution_level'])
                ->join('wdsxh_member','wdsxh_member.id = '.config('database.prefix').'wdsxh_institution_member.member_id')
                ->where('wdsxh_member.expire_time','>=',$date)
                ->where($where)
                ->page($page,$limit)
                ->order('createtime asc')
                ->select();

            foreach ($data as &$v) {
                $v->usermember->visible(['name','avatar']);
                $v['member_level'] = $memberModel->alias('m')->where('m.id',$v['member_id'])
                    ->join('wdsxh_member_level member_level','m.member_level_id = member_level.id')
                    ->value('member_level.name');
                $v->institution_level->visible(['level_name']);
                $v->hidden(['id','institution_id','level_id','wechat_id','member_id','wechat_id','createtime','updatetime']);
                $v->content = $v->introduction;
                $v->introduction = wdsxh_cut_str($v->introduction,4000);

            }
            $this->success('请求成功',['total' => $total,'data' => $data]);
        } catch (ValidateException|PDOException|Exception $e)  {
            $this->error($e->getMessage());
        }
    }


}



 