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

namespace app\admin\controller\wdsxh\member;

use app\admin\model\User;
use app\admin\model\wdsxh\activity\ActivityApply;
use app\admin\model\wdsxh\activity\Order;
use app\admin\model\wdsxh\activity\Refund;
use app\admin\model\wdsxh\business\Business;
use app\admin\model\wdsxh\member\MemberApply;
use app\admin\model\wdsxh\member\Cert;
use app\api\model\wdsxh\activity\ActivityApplyRecord;
use app\api\model\wdsxh\member\Visitor;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Backend;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use Exception;

/**
 * 会员列表
 *
 * @icon fa fa-circle-o
 */
class Member extends Backend
{

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\member\Member();
        $this->view->assign("statusList", $this->model->getStatusList());
        $expire_time_type = (new \app\admin\model\wdsxh\member\FeesConfig())->where('id',1)->value('expire_time_type');
        $this->assign('expire_time_type',$expire_time_type);
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    public function index()
    {
        $current_date = date('Y-m-d',time());
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if (false === $this->request->isAjax()) {
            return $this->view->fetch();
        }
        //如果发送的来源是 Selectpage，则转发到 Selectpage
        if ($this->request->request('keyField')) {
            return $this->selectpage();
        }
        [$where, $sort, $order, $offset, $limit] = $this->buildparams();
        $list = $this->model
            ->where('expire_time','>=',$current_date)
            ->where($where)
            ->order($sort, $order)
            ->paginate($limit);
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }


    public function member()
    {
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {

            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $parent_wechat_id = $this->request->get('wechat_id');

            // 添加空值检查
            if (empty($parent_wechat_id)) {
                $list = [];
            } else {
                // 优化为单次联表查询
                $list = $this->model
                    ->where($where)
                    ->alias('member')
                    ->join('wdsxh_member_level level','level.id = member.member_level_id')
                    ->join('wdsxh_user_wechat wechat','wechat.id = member.wechat_id')
                    ->join('wdsxh_user_wechat parent_wechat','parent_wechat.id = wechat.parent_wechat_id')
                    ->where('parent_wechat.id', $parent_wechat_id)
                    ->field("member.id,member.name,member.avatar,level.name level_name,member.join_time,FROM_UNIXTIME(wechat.createtime, '%Y-%m-%d') as createtime")
                    ->order('member.id desc')
                    ->paginate($limit);
            }

            // 保持原有的循环处理（虽然已优化到SQL中，但保留以确保兼容性）
            foreach ($list as &$v) {
                if (!isset($v->createtime) || !$v->createtime) {
                    $v->createtime = date('Y-m-d', $v->createtime);
                }
            }


            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 普通用户列表
     */
    public function seluser(){
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $wechat_id_array = (new MemberApply())->where('wechat_id','<>',0)->column('wechat_id');
            $userWechatModel = new UserWechat();
            $list = $userWechatModel
                ->where($where)
                ->where('id','not in',$wechat_id_array)
                ->where( 'user_id','in' ,function($query) {
                    $query->name('user')->field('id');
                })
                ->order($sort, $order)
                ->paginate($limit);
            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    public function activity_seluser(){
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $param = $this->request->get();

            $wechat_id_array = (new ActivityApply())->where('activity_id',$param['activity_id'])->column('wechat_id');
            $userWechatModel = new UserWechat();
            $list = $userWechatModel
                ->where($where)
                ->where('id','not in',$wechat_id_array)
                ->where( 'user_id','in' ,function($query) {
                    $query->name('user')->field('id');
                })
                ->order($sort, $order)
                ->paginate($limit);
            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 删除
     *
     * @param $ids
     * @return void
     * @throws DbException
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     */
    public function del($ids = null)
    {
        if (false === $this->request->isPost()) {
            $this->error(__("Invalid parameters"));
        }
        $ids = $ids ?: $this->request->post("ids");
        if (empty($ids)) {
            $this->error(__('Parameter %s can not be empty', 'ids'));
        }
        $pk = $this->model->getPk();
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            $this->model->where($this->dataLimitField, 'in', $adminIds);
        }
        $list = $this->model->where($pk, 'in', $ids)->select();

        $count = 0;
        Db::startTrans();
        try {
            foreach ($list as $item) {
                \app\admin\model\wdsxh\member\Pay::where('member_id',$item->id)->delete();
                MemberApply::where('mobile',$item->mobile)->delete();
                Business::where('wechat_id',$item->wechat_id)->delete();
                Visitor::where('wechat_id',$item->wechat_id)->delete();
                ActivityApply::where('wechat_id',$item->wechat_id)->delete();//活动报名
                ActivityApplyRecord::where('wechat_id',$item->wechat_id)->delete();//活动报名记录
                Order::where('wechat_id',$item->wechat_id)->delete();//活动订单
                Refund::where('wechat_id',$item->wechat_id)->delete();//活动退款
                Cert::where('wechat_id',$item->wechat_id)->delete();//证书管理
                \app\admin\model\wdsxh\institution\Member::where('wechat_id',$item->wechat_id)->delete();
                \app\admin\model\wdsxh\institution\InstitutionMemberApply::where('wechat_id',$item->wechat_id)->delete();
                $count += $item->delete();
            }
            Db::commit();
        } catch (PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($count) {
            $this->success();
        }
        $this->error(__('No rows were deleted'));
    }

    /**
     * Desc  获取列字母
     * Create on 2024/4/9 16:05
     * Create by wangyafang
     */
    protected function getColumnZimu($num)
    {
        if ($num>= 0 && $num< 26) {
            // 如果是 A 到 Z 之间的列，直接返回对应的字母
            return chr(65 + $num);
        } else {
            // 针对 AA、AB、AC ... ZZ 这样的列，使用类似递归的方式计算出对应的字母组合
            $result = '';
            while ($num>= 26) {
                $result .= chr(65 + ($num% 26));
                $num= intval($num/ 26) - 1;
            }
            $result .= chr(65 + $num);
            return strrev($result); // 需要反转列名字母组合
        }
    }

    /**
     * Desc  获取excel所有列
     * Create on 2024/4/9 16:05
     * Create by wangyafang
     */
    protected function byNumReturnLabels($num)
    {
        $labels = range('A', 'Z');
        if ($num <= 26) {
            return $labels;
        } else {
            $for_count = $num - 26;
            for ($i = 0; $i < $for_count; $i++) {
                $labels[] = $this->getColumnZimu(26 + $i);
            }
            return $labels;
        }
    }

    public function edit($ids = null)
    {
        return;
    }

    public function add()
    {
        return;
    }






}
