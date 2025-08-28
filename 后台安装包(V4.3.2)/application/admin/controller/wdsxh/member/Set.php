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
/**
 * Class Set
 * Desc  会员设置
 * Create on 2024/3/28 16:39
 * Create by wangyafang
 */

namespace app\admin\controller\wdsxh\member;


use app\common\controller\Backend;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

class Set extends Backend
{
    protected $model = null;
    protected $feesConfigmodel = null;
    protected $authConfigmodel = null;
    protected $modelValidate = true;

    public function _initialize()
    {
        parent::_initialize();
        $this->feesConfigmodel = new \app\admin\model\wdsxh\member\FeesConfig;
        $this->view->assign("expireTimeTypeList", $this->feesConfigmodel->getExpireTimeTypeList());
        $this->view->assign("payMethodList", $this->feesConfigmodel->getPayMethodList());

        $this->authConfigmodel = new \app\admin\model\wdsxh\member\AuthConfig;
        $this->view->assign("addressBookIsOpennessList", $this->authConfigmodel->getAddressBookIsOpennessList());
        $this->view->assign("addressBookIsExclusiveList", $this->authConfigmodel->getAddressBookIsExclusiveList());
        $this->view->assign("memberDetailsList", $this->authConfigmodel->getMemberDetailsList());
        $this->view->assign("addressBookSortOrderList", $this->authConfigmodel->getAddressBookSortOrderList());
    }

    public function index()
    {
        $authConfigObj = (new \app\admin\model\wdsxh\member\AuthConfig())->get(1);
        $authConfigData = $authConfigObj->toArray();
        $feesConfigObj = (new \app\admin\model\wdsxh\member\FeesConfig())->get(1);
        $feesConfigData = $feesConfigObj->toArray();
        $row = array_merge($authConfigData,$feesConfigData);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds)) {
            if (!in_array($row[$this->dataLimitField], $adminIds)) {
                $this->error(__('You have no permission'));
            }
        }
        if ($this->request->isPost()) {
            $params = $this->request->post("row/a");
            if (empty($params)) {
                $this->error(__('Parameter %s can not be empty', ''));
            }
            if ($params) {
                $params = $this->preExcludeFields($params);
                if (empty($params['days'])) {
                    unset($params['days']);
                }
                if (empty($params['fixed_date'])) {
                    unset($params['fixed_date']);
                }
                $row = (new \app\admin\model\wdsxh\member\FeesConfig())->get(1);
                $result = false;
                Db::startTrans();
                try {
                    //是否采用模型验证
                    if ($this->modelValidate) {
                        $validate = 'app\admin\validate\wdsxh\member\FeesConfig';
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
                $row = (new \app\admin\model\wdsxh\member\AuthConfig())->get(1);
                $result = false;
                Db::startTrans();
                try {
                    //是否采用模型验证
                    $result = $row->allowField(true)->save($params);
                    Db::commit();
                } catch (ValidateException|PDOException|Exception $e) {
                    Db::rollback();
                    $this->error($e->getMessage());
                }
                if (false === $result) {
                    $this->error(__('No rows were updated'));
                }
                if ($params['expire_time_type'] == '2') {
                    $current_date = date('Y-m-d', time());
                    $where['expire_time'] = array('>=', $current_date);
                    $memberModel = new \app\admin\model\wdsxh\member\Member();
                    $member_id_array = $memberModel->where($where)->column('id');

                    // 检查数组是否为空，避免潜在的SQL问题
                    if (!empty($member_id_array)) {
                        $fixed_date = $params['fixed_date'];
                        $memberModel->where('id', 'in', $member_id_array)->update(['expire_time' => $fixed_date]);
                    }

                }
                $this->success();
            }

        }
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }
}



 