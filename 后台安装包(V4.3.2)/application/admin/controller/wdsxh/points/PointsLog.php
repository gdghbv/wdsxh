<?php

namespace app\admin\controller\wdsxh\points;

use app\common\controller\Backend;

/**
 * 微信用户积分变动管理
 *
 * @icon fa fa-circle-o
 */
class PointsLog extends Backend
{

    /**
     * PointsLog模型对象
     * @var \app\admin\model\wdsxh\points\PointsLog
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\points\PointsLog;
        $this->view->assign("changeList", $this->model->getChangeList());
       
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    //todo 完成index和add的逻辑，目前是复制了UserWechatPotinsLog的逻辑

      /**
     * 查看
     *
     * @return string|Json
     * @throws \think\Exception
     * @throws DbException
     */
 public function index()
    {
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
            ->where($where)
            ->order($sort, $order)
            ->paginate($limit);
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }

     public function add()
    {
        if ($this->request->isPost()) {
            $params = $this->request->post('row/a');
            if (!$params) {
                $this->error('参数错误');
            }
             $wechat_id = $params['wechat_id'];
            $userWechatObj = \think\Db::name('wdsxh_user_wechat')->where('id', $wechat_id)->find();
            if (!$userWechatObj) {
                $this->error('用户不存在');
            }
            
            $change = isset($params['change']) ? intval($params['change']) : 1;
            $points = isset($params['points']) ? intval($params['points']) : 0;
            $memo = isset($params['memo']) ? $params['memo'] : '';
            
            if ($points == 0) {
                $this->error('操作积分不能为0');
            }

          
            $before = $userWechatObj['points'];
            $total_points =$userWechatObj['total_points'] ?? 0; // 确保total_points存在
            $after =$change==1? $before + $points:$before-$points;
            $total_points=$change==1? $total_points + $points:$total_points;
            if ($after < 0) {
                $after=0;
            }
            // 日志记录
            $pointsLogData = [
                'wechat_id' => $wechat_id,
                'points' => $points,
                'before' => $before,
                'after' => $after,
                'memo' => $memo,
                'change' => $change,
                'total_points'=> $total_points,
                'createtime' => time(),
            ];
            \think\Db::name('wdsxh_user_wechat_points_log')->insert($pointsLogData);
            // 更新用户积分
            \think\Db::name('wdsxh_user_wechat')->where('id', $wechat_id)->update(['points' => $after,'total_points'=> $total_points]);
            $this->success('操作成功');
        }
        return $this->view->fetch();
    }


}
