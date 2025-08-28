<?php

namespace app\admin\controller\wdsxh\points;

use app\admin\model\wdsxh\member\Member;
use app\admin\model\wdsxh\user\UserWechat;
use app\common\controller\Backend;
use app\common\model\wdsxh\points\UserWechatPointsLog;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\response\Json;

/**
 * 微信用户积分变动管理
 *
 * @icon fa fa-circle-o
 */
class Ranking extends Backend
{

    /**
     * Ranking模型对象
     * @var \app\admin\model\wdsxh\points\Ranking
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\points\Ranking;

    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

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

        $wechatIdArray = (new UserWechatPointsLog())->distinct(true)->column('wechat_id');
        $wechatIdArray = (new UserWechat())->where('id','in',$wechatIdArray)->where('points','>',0)->column('id');
        [$where, $sort, $order, $offset, $limit] = $this->buildparams();
        $list = (new Member())
            ->with(['level','wechat'])
            ->where('wechat_id','in',$wechatIdArray)
            ->order('points desc')
            ->paginate($limit);
        foreach ($list as &$v) {
            $v->id = $v->wechat_id;
        }
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }

    /**
     * Desc 一键清零
     * Create on 2025/3/12 11:13
     * Create by wangyafang
     */
    public function one_click_reset($ids=null){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        try {
            $userWechatObj = (new UserWechat())->get($ids);

            $pointsLogData = array(
                'wechat_id'=>$ids,
                'points'=>$userWechatObj['points'],
                'before'=>$userWechatObj['points'],
                'after'=>0,
                'memo'=>'积分清零',
                'change'=>2,
            );

            $pointsLogModel = new UserWechatPointsLog();
            $pointsLogModel->data($pointsLogData);
            $pointsLogModel->allowField(true)->save();

            $userWechatObj->points = 0;
            $userWechatObj->save();

            $this->success('操作成功');
        } catch (ValidateException|PDOException|Exception $e) {
            $this->error($e->getMessage());
        }
    }

    public function multi($ids = NULL)
    {
        return;
    }

    public function del($ids = null)
    {
        return;
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
