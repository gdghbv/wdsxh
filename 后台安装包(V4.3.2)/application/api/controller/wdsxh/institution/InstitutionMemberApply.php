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

use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\user\Wechat;
use app\common\controller\Api;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class InstitutionMemberApply extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\institution\InstitutionMemberApply();
    }

    /**
     * Desc 申请
     * Create on 2025/8/4 15:48
     * Create by wangyafang
     */
    public function submit()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $param = $_POST;
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

        $channel = $this->request->header('channel');
        $param['channel'] = $channel;
        $param['wechat_id'] = $wechat_id;

        $result = $this->validate($param,'app\api\validate\wdsxh\institution\InstitutionMemberApply.submit');
        if(true !== $result){
            // 验证失败 输出错误信息
            $this->error($result);
        }

        if (!(new \app\api\model\wdsxh\institution\Institution())
            ->get($param['institution_id'])
        ) {
            $this->error('机构不存在');
        }

        if (!(new \app\api\model\wdsxh\institution\Level())->get($param['level_id'])) {
            $this->error('级别不存在不存在');
        }

        if ((new \app\api\model\wdsxh\institution\Member())
            ->where('institution_id',$param['institution_id'])
            ->where('wechat_id',$param['wechat_id'])
            ->find()
        ) {
            $this->error('已经加入机构');
        }

        if ($this->model->where('institution_id',$param['institution_id'])
            ->where('level_id',$param['level_id'])
            ->where('wechat_id',$param['wechat_id'])
            ->where('state','1')
            ->find()
        ) {
            $this->error('已提交申请');
        }

        $rejectObj = $this->model->where('institution_id',$param['institution_id'])
            ->where('wechat_id',$param['wechat_id'])
            ->where('state','3')
            ->find();
        if ($rejectObj) {
            try {
                $rejectObj->level_id = $param['level_id'];
                $rejectObj->introduction = $param['introduction'];
                $rejectObj->state = '1';
                $rejectObj->reject = '';
                $rejectObj->handle_time = '';
                $result = $rejectObj->save();
                Db::commit();
            } catch (ValidateException|PDOException|Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
        } else {
            try {
                $this->model->data([
                    'institution_id'  =>  $param['institution_id'],
                    'wechat_id'  =>  $param['wechat_id'],
                    'member_id'  =>  $member['id'],
                    'level_id'  =>  $param['level_id'],
                    'introduction'  =>  $param['introduction'],
                    'state' => '1',
                ]);
                $result = $this->model->save();
                Db::commit();
            } catch (ValidateException|PDOException|Exception $e) {
                Db::rollback();
                $this->error($e->getMessage());
            }
        }

        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('提交成功');
    }

    /**
     * Desc 申请详情
     * Create on 2025/8/7 上午10:32
     * Create by wangyafang
     */
    public function details()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $institution_id = $this->request->get('institution_id');
        if (empty($institution_id)) {
            $this->error('参数错误');
        }
        $data = null;

        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $queryInstitutionMemberObj = (new \app\api\model\wdsxh\institution\Member())->where('institution_id',$institution_id)
            ->where('wechat_id',$wechat_id)
            ->find();
        if (!empty($queryInstitutionMemberObj)) {
            $queryInstitutionMemberObj['level_name'] = (new \app\api\model\wdsxh\institution\Level())
                ->where('id',$queryInstitutionMemberObj['level_id'])->value('level_name');
            $this->success('请求成功',$queryInstitutionMemberObj);
        }

        $applyData = $this->model
            ->where('institution_id',$institution_id)
            ->where('wechat_id',$wechat_id)
            ->field('introduction,level_id,state,reject')
            ->find();
        if (!empty($applyData)) {
            $applyData['level_name'] = (new \app\api\model\wdsxh\institution\Level())
                ->where('id',$applyData['level_id'])->value('level_name');
            $this->success('请求成功',$applyData);
        }


        $this->success('请求成功',$data);

    }
}