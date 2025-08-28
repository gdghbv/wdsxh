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

namespace app\admin\controller\wdsxh;
use app\admin\model\wdsxh\member\Member;
use EasyWeChat\Factory;
use Exception;
use app\common\controller\Backend;
use fast\Tree;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\response\Json;

/**
 * 活动接龙
 *
 * @icon fa fa-circle-o
 */
class Jielong extends Backend
{

    /**
     * Jielong模型对象
     * @var \app\admin\model\wdsxh\Jielong
     */
    protected $model = null;
    protected $feedbackModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\Jielong;
        $this->feedbackModel = new \app\admin\model\wdsxh\JielongFeedback;
        $this->view->assign("typeList", $this->model->getTypeList());
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
        $this->view->assign("jielongAuthList", $this->model->getJielongAuthList());
    }

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
        foreach ($list as $item){
            if ($item['member_id'] == -1){
                $item->member_name = '平台';
            }else{
                $item->member_name = (new Member())->where('id',$item['member_id'])->value('name');
            }
        }
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
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
        if ($params['type'] == 2 && $params['member_ids'] == ''){
            $this->error('请选择接龙会员');
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
            $show_applet_jielong_qrcode = 2;
            $applet_jielong_qrcode_path = '';
            $save_path = '/uploads/wdsxh/applet_jielong_qrcode/'.$row['id'].'/'.$row['createtime'].'.png';
            if (is_file(ROOT_PATH."public".$save_path)) {
                $applet_jielong_qrcode_path = $this->request->domain().$save_path;
                $show_applet_jielong_qrcode = 1;
            } else {
                $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
                if (!empty($configObj['applet_appid']) && !empty($configObj['applet_secret'])) {
                    $path = 'pagesTools/sequence/details';
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
                        $response->saveAs('uploads/wdsxh/applet_jielong_qrcode/'.$row['id'], $row['createtime'].'.png');
                        $applet_jielong_qrcode_path = $this->request->domain().$save_path;
                        $show_applet_jielong_qrcode = 1;
                    }
                }
            }

            $this->view->assign('show_applet_jielong_qrcode', $show_applet_jielong_qrcode);
            $this->view->assign('applet_jielong_qrcode_path', $applet_jielong_qrcode_path);
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        if ($params['type'] == 2 && $params['member_ids'] == ''){
            $this->error('请选择接龙会员');
        }
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
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


    /**
     * 复制接龙
     */
    public function copy_relay($ids = null){
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }

        $row = $this->model->get($ids);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $data = [
            'name' => $row['name'],
            'member_id' => $row['member_id'],
            'type' => $row['type'],
            'expire_time' => $row['expire_time'],
            'member_ids' => $row['member_ids'],
            'content' => $row['content'],
            'createtime' => time(),
        ];
        $result = false;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
                $this->model->validateFailException()->validate($validate);
            }
            $result = $this->model->allowField(true)->save($data);
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


    public function lists(){
        // 获取自定义按钮传递的questionnaire_id
        $jielong_id = input('jielong_id', 0, 'intval');
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
        $list = $this->feedbackModel
            ->where('jielong_id',$jielong_id)
            ->order('id desc')
            ->paginate($limit);
        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
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
