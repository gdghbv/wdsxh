<?php

namespace app\admin\controller\wdsxh\user;

use app\admin\model\UserGroup;
use app\admin\model\wdsxh\user\UserWechat;
use app\common\controller\Backend;
use app\common\library\Auth;

/**
 * 用户列表
 *
 * @icon fa fa-user
 */
class User extends Backend
{

    protected $relationSearch = true;
    protected $searchFields = 'id,username,nickname';

    /**
     * @var \app\admin\model\User
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = model('User');
    }

    /**
     * 查看
     */
    public function index()
    {
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            $userData = $this->model
                ->alias('u')
                ->where('u.mobile','')
                ->join(config('database.prefix').'wdsxh_user_wechat wechat','wechat.user_id = u.id')
                ->where('wechat.mobile','<>','')
                ->field('u.*')
                ->select();
            if (!empty($userData)) {
                $userWechatModel = new UserWechat();
                foreach ($userData as $v) {
                    $v->mobile = $userWechatModel->where('user_id',$v->id)->value('mobile');
                    $v->save();
                }
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $list = $this->model
                ->where($where)
                ->order($sort, $order)
                ->paginate($limit);
            $userGroupingModel = new UserGroup();
            foreach ($list as $k => $v) {
                $v->avatar = $v->avatar ? cdnurl($v->avatar, true) : letter_avatar($v->nickname);
                $v->hidden(['password', 'salt']);
                $v->channel = (new UserWechat())->where('user_id',$v['id'])->value('channel');
                $v->set_admin = (new UserWechat())->where('user_id',$v['id'])->value('set_admin');
                $v->group = $userGroupingModel->get($v['group_id']);
            }
            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 删除
     */
    public function del($ids = "")
    {
        if (!$this->request->isPost()) {
            $this->error(__("Invalid parameters"));
        }
        $ids = $ids ? $ids : $this->request->post("ids");
        $row = $this->model->get($ids);
        $this->modelValidate = true;
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        Auth::instance()->delete($row['id']);
        $this->success();
    }

    public function multi($ids = null)
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
