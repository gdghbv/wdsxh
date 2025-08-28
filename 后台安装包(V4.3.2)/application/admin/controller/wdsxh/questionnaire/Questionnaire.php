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

namespace app\admin\controller\wdsxh\questionnaire;
use EasyWeChat\Factory;
use Exception;
use app\admin\model\wdsxh\member\Member;
use app\common\controller\Backend;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 问卷调查
 *
 * @icon fa fa-circle-o
 */
class Questionnaire extends Backend
{

    /**
     * Questionnaire模型对象
     * @var \app\admin\model\wdsxh\questionnaire\Questionnaire
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\questionnaire\Questionnaire;
        $this->view->assign("statusList", $this->model->getStatusList());
        $current_date = date('Y-m-d',time());
        $memberObj = (new Member())->where('expire_time','>=',$current_date)->field('id,name')->order('id desc')->select();
        $memberIdArray = array_map(function ($item) {
            return $item->toArray();
        }, $memberObj);
        $memberdata = [0 => ['id' => '-1', 'name' => '平台']];
        foreach ($memberIdArray as $k => $v) {
            $memberdata[$v['id']] = $v;
        }
        $this->view->assign("memberList", $memberdata);
        $this->view->assign("nonMemberAnswerSheetStatusList", $this->model->getNonMemberAnswerSheetStatusList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


    /**
     * 添加
     *
     * @return string
     * @throws \think\Exception
     */
    public function add()
    {
        if (false === $this->request->isPost()) {
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);

        if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
            $params[$this->dataLimitField] = $this->auth->id;
        }
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
                $this->model->validateFailException()->validate($validate);
            }
            if ($params['member_id'] == -1){
                $params['wechat_id'] = -1;
            }else{
                $params['wechat_id'] = (new Member())->where('id',$params['member_id'])->value('wechat_id');
            }
            $result = $this->model->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($result === false) {
            $this->error(__('No rows were inserted'));
        }
        $this->success();
    }

    /**
     * 编辑
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function edit($ids = null)
    {
        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $show_applet_questionnaire_qrcode = 2;
            $applet_questionnaire_qrcode_path = '';
            $save_path = '/uploads/wdsxh/applet_questionnaire_qrcode/'.$row['id'].'/'.$row['createtime'].'.png';
            if (is_file(ROOT_PATH."public".$save_path)) {
                $applet_questionnaire_qrcode_path = $this->request->domain().$save_path;
                $show_applet_questionnaire_qrcode = 1;
            } else {
                $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
                if (!empty($configObj['applet_appid']) && !empty($configObj['applet_secret'])) {
                    $path = 'pagesTools/questionnaire/details';
                    $config = [
                        'app_id' => $configObj['applet_appid'],
                        'secret' => $configObj['applet_secret'],
                        'response_type' => 'array',
                        'log' => [
                            'level' => 'debug',
                        ],
                    ];

                    $app = Factory::miniProgram($config);

                    $response  = $app->app_code->getUnlimit($ids, [
                        'page'  => $path,
                    ]);

                    if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                        $response->saveAs('uploads/wdsxh/applet_questionnaire_qrcode/'.$row['id'], $row['createtime'].'.png');
                        $applet_questionnaire_qrcode_path = $this->request->domain().$save_path;
                        $show_applet_questionnaire_qrcode = 1;
                    }
                }
            }

            $this->view->assign('show_applet_questionnaire_qrcode', $show_applet_questionnaire_qrcode);
            $this->view->assign('applet_questionnaire_qrcode_path', $applet_questionnaire_qrcode_path);
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            if ($params['member_id'] == -1){
                $params['wechat_id'] = -1;
            }else{
                $params['wechat_id'] = (new Member())->where('id',$params['member_id'])->value('wechat_id');
            }
            $result = $row->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $this->success();
    }

    /**
     * Desc  分享图片
     * Create on 2024/4/8 16:08
     * Create by @小趴菜
     */
    public function config(){
        $row = (new \app\admin\model\wdsxh\Config())->get(1);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->modelConfig));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $result = $row->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $this->success();
    }


}
