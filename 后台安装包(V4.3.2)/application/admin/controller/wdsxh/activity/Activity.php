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

namespace app\admin\controller\wdsxh\activity;

use addons\wdsxh\library\Encryptor;
use app\admin\model\wdsxh\Config;
use app\common\controller\Backend;
use EasyWeChat\Factory;
use think\Db;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

/**
 * 活动列管理
 *
 * @icon fa fa-circle-o
 */
class Activity extends Backend
{

    /**
     * Activity模型对象
     * @var \app\admin\model\wdsxh\activity\Activity
     */
    protected $model = null;

    protected $modelValidate = true;
    protected $modelSceneValidate = true;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\activity\Activity;
        $this->view->assign("organizingMethodList", $this->model->getOrganizingMethodList());
        $this->view->assign("stateList", $this->model->getStateList());
        $this->view->assign("isVerifyingList", $this->model->getIsVerifyingList());
        $this->view->assign("statusList", $this->model->getStatusList());
        $this->view->assign("activityAuthList", $this->model->getActivityAuthList());
        $this->view->assign("nonMemberRegistrationStatusList", $this->model->getNonMemberRegistrationStatusList());
        $this->view->assign("verificationMethodList", $this->model->getVerificationMethodList());
        $this->view->assign("pointsStatusList", $this->model->getPointsStatusList());
        $configObj = (new Config())->get(1);
        $this->assignconfig('wananchi_appid',$configObj['wananchi_appid']);
        $this->assignconfig('applet_appid',$configObj['applet_appid']);
        $this->view->assign("applyFieldStateList", $this->model->getApplyFieldStateList());
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
        if ($params['is_verifying'] == 2) {
            $params['verifying_wechat_ids'] = '';
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
            $show_applet_activity_qrcode = 2;
            $applet_activity_qrcode_path = '';
            $save_path = '/uploads/wdsxh/applet_activity_qrcode/'.$row['id'].'/'.$row['createtime'].'.png';
            if (is_file(ROOT_PATH."public".$save_path)) {
                $applet_activity_qrcode_path = $this->request->domain().$save_path;
                $show_applet_activity_qrcode = 1;
            } else {
                $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
                if (!empty($configObj['applet_appid']) && !empty($configObj['applet_secret'])) {
                    $path = 'pagesActivity/index/details';
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
                        'check_path'  => false,
                    ]);

                    if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                        $response->saveAs('uploads/wdsxh/applet_activity_qrcode/'.$row['id'], $row['createtime'].'.png');
                        $applet_activity_qrcode_path = $this->request->domain().$save_path;
                        $show_applet_activity_qrcode = 1;
                    }
                }
            }

            $this->view->assign('show_applet_activity_qrcode', $show_applet_activity_qrcode);
            $this->view->assign('applet_activity_qrcode_path', $applet_activity_qrcode_path);
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        if ($params['is_verifying'] == 2) {
            $params['verifying_wechat_ids'] = '';
            $params['verification_method'] = 0;
        }
        if ($params['verification_method'] == 1) {
            $params['verifying_wechat_ids'] = '';
        }
        if ($params['points_status'] == 2) {
            $params['points'] = 0;
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

        $activityApplyModel = new \app\admin\model\wdsxh\activity\ActivityApply();
        foreach ($list as $item) {
            if ($item['state'] == '2') {
                $this->error('活动：'.$item['name'].'，进行中，无法删除');
            }
            $apply_count = $activityApplyModel->where('activity_id',$item['id'])->where('state','2')->count();
            if ($item['state'] == '1' && $apply_count) {
                $this->error('活动：'.$item['name'].'，报名中，有会员报名成功，无法删除');
            }
        }

        $count = 0;
        Db::startTrans();
        try {
            foreach ($list as $item) {
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
     * Desc 公众号签到二维码
     * Create on 2025/3/6 17:49
     * Create by wangyafang
     */
    public function verification_qr_code($ids)
    {
        if (false === $this->request->isPost()) {
            $qrcode_class = 1;
            $row = $this->model->get($ids);
            $this->view->assign('row', $row);
            if (!class_exists('\Endroid\QrCode\QrCode')) {
                $qrcode_class = 2;
            } else {
                $path = $this->create_qr_code($ids,$row);

                $this->view->assign('path', $path);
            }
            $this->view->assign('qrcode_class', $qrcode_class);
            return $this->view->fetch();
        }
    }

    private function create_qr_code($id,$activityObj)
    {
        $activity_wananchi_sign_path_path = '';
        $domain = $this->request->domain();
        $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'activity_wananchi_sign_path'.DIRECTORY_SEPARATOR.$id.DIRECTORY_SEPARATOR.$activityObj['createtime'].'activity.png';
        if (is_file(ROOT_PATH."public".$save_path)) {
            $activity_wananchi_sign_path_path = $this->request->domain().$save_path;
        } else {
            $token_key = config('token.key');
            $encryptor = new Encryptor(substr($token_key,0,16),substr($token_key,16));
            $validate_value = $encryptor->encrypt($id);
            $params['text'] = $this->request->get('text', $domain.'/web/#/pagesActivity/order/details?scene='.$validate_value, 'trim');
            $qrCode = \addons\qrcode\library\Service::qrcode($params);
            $qrcodePath = ROOT_PATH . 'public'.DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'activity_wananchi_sign_path'.DIRECTORY_SEPARATOR.$id.DIRECTORY_SEPARATOR;
            if (!is_dir($qrcodePath)) {
                wdsxh_mkdirs($qrcodePath);
            }
            if (is_really_writable($qrcodePath)) {
                $filePath = $qrcodePath . $activityObj['createtime'].'activity.png';
                $qrCode->writeFile($filePath);
                $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'activity_wananchi_sign_path'.DIRECTORY_SEPARATOR.$id.DIRECTORY_SEPARATOR.$activityObj['createtime'].'activity.png';
                $activity_wananchi_sign_path_path = $this->request->domain().$save_path;
            }
        }
        return $activity_wananchi_sign_path_path;
    }

    /**
     * Desc 小程序签到二维码
     * Create on 2025/3/6 17:49
     * Create by wangyafang
     */
    public function verification_applet_code($ids)
    {
        if (false === $this->request->isPost()) {
            $row = $this->model->get($ids);
            $this->view->assign('row', $row);
            $path = $this->create_applet_code($ids,$row);

            $this->view->assign('path', $path);
            return $this->view->fetch();
        }
    }

    private function create_applet_code($id,$activityObj)
    {
        $activity_qrcode_path = '';
        $row = $activityObj;
        $save_path = DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'activity_applet_sign_path'.DIRECTORY_SEPARATOR.$id.DIRECTORY_SEPARATOR.$activityObj['createtime'].'activity.png';
        if (is_file(ROOT_PATH."public".$save_path)) {
            $activity_qrcode_path = $this->request->domain().$save_path;
        } else {
            $ids = $row['id'];
            $configObj = (new \app\admin\model\wdsxh\Config())->where('id',1)->find();
            if (!empty($configObj['applet_appid']) && !empty($configObj['applet_secret'])) {
                $path = 'pagesActivity/order/details';
                $config = [
                    'app_id' => $configObj['applet_appid'],
                    'secret' => $configObj['applet_secret'],
                    'response_type' => 'array',
                    'log' => [
                        'level' => 'debug',
                    ],
                ];

                $app = Factory::miniProgram($config);
                $token_key = config('token.key');
                $encryptor = new Encryptor(substr($token_key,0,16),substr($token_key,16));
                $scene = $validate_value = $encryptor->encrypt($id);


                $response  = $app->app_code->getUnlimit($scene, [
                    'page'  => $path,
                    'check_path'  => false,
                ]);

                if ($response instanceof \EasyWeChat\Kernel\Http\StreamResponse) {
                    $response->saveAs('uploads/wdsxh/activity_applet_sign_path/'.$row['id'], $row['createtime'].'activity.png');
                    $activity_qrcode_path = $this->request->domain().$save_path;
                }
            }
        }
        return $activity_qrcode_path;
    }


}
