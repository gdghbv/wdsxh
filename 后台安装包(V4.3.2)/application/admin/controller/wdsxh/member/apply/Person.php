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

namespace app\admin\controller\wdsxh\member\apply;


use app\admin\model\Admin;
use app\admin\model\wdsxh\user\UserWechat;

/**
 * 入会申请
 *
 * @icon fa fa-circle-o
 */
class Person extends Apply
{


    protected $model = null;
    protected $noNeedRight = ['examine','offline_examine','pass','reject','offline_pass','offline_reject'];

    public function _initialize()
    {
        parent::_initialize();
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    /**
     * 查看
     */
    public function index()
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

            $list = $this->model
                    ->where('state','in',['1','2','3','4'])
                    ->where('type','1')
                    ->with(['level'])
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            $adminModel = new Admin();
            $userWechatModel = new UserWechat();
            foreach ($list as &$row) {
                if (in_array($row['child_state'],array('3','6'))) {
                    if (!empty($row['examine_admin_id']) && !empty($row['examine_wechat_id'])) {
                        $adminUserName = $adminModel->where('id',$row['examine_admin_id'])->value('username');
                        $wechatNickname = $userWechatModel->where('id',$row['examine_wechat_id'])->value('nickname');
                        if (!empty($adminUserName)) {
                            $adminUserName = $adminUserName.'(后台审核)';
                        }
                        $row->examine_name = $wechatNickname.'(小程序审核)，'.$adminUserName;
                    } elseif (!empty($row['examine_admin_id'])) {
                        $examineAdminIdArray = explode(',',$row['examine_admin_id']);
                        $adminArray = $adminModel->where('id','in',$examineAdminIdArray)->column('username');
                        $row->examine_name = count($adminArray) == 1 ? $adminArray[0].'(后台审核)' : $adminArray[0].'，'.$adminArray[1].'(后台审核)';
                    } elseif (!empty($row['examine_wechat_id'])) {
                        $examineWechatIdArray = explode(',',$row['examine_wechat_id']);
                        $wechatArray = $userWechatModel->where('id','in',$examineWechatIdArray)->column('nickname');
                        $row->examine_name = count($wechatArray) == 1 ? $wechatArray[0].'(小程序审核)' : $wechatArray[0].'，'.$wechatArray[1].'(小程序审核)';
                    } else {
                        $row->examin_name = '';
                    }
                } else {
                    $row->examin_name = '';
                }

            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    public function examine($ids = null)
    {
        return;
    }

    public function offline_examine($ids = null)
    {
        return;
    }

    public function pass($row = '',$params = [])
    {
        return;
    }

    public function reject($row = '',$params = [])
    {
        return;
    }

    public function offline_pass($row = '',$params = [])
    {
        return;
    }

    public function offline_reject($row = '',$params = [])
    {
        return;
    }

}
