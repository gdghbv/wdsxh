<?php

namespace app\admin\controller\wdsxh\corporate;

use app\common\controller\Backend;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;

/**
 * 名片
 *
 * @icon fa fa-circle-o
 */
class Card extends Backend
{

    /**
     * Card模型对象
     * @var \app\admin\model\wdsxh\corporate\Card
     */
    protected $model = null;

    protected $searchFields = 'name,company_name,company_position';

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\corporate\Card;
        $this->view->assign("isDefaultList", $this->model->getIsDefaultList());
        $this->view->assign("isHideAvatarList", $this->model->getIsHideAvatarList());
        $this->view->assign("isWechatNumberPublicList", $this->model->getIsWechatNumberPublicList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    /**
     * Desc 详情
     * Create on 2025/1/24 9:26
     * Create by wangyafang
     */
    public function details($ids = null)
    {
        $row = $this->model->get($ids);
        $this->view->assign('row', $row);
        return $this->view->fetch();
    }

    public function multi($ids = null)
    {
        return;
    }

    public function add()
    {
        return;
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
            $main_business = $row['main_business'];
            $array = explode(',', $main_business);
            $main_business = json_encode($array, JSON_UNESCAPED_UNICODE);
            $row['main_business'] = $main_business;
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (isset($params['main_business']) && is_string($params['main_business'])) {
            $main_business_arr = json_decode($params['main_business'], true);
            if (is_array($main_business_arr)) {
                foreach ($main_business_arr as $v) {
                    if (mb_strlen($v, 'UTF-8') > 4) {
                        $this->error($v . '内容超过4个字');
                    }
                }
                $params['main_business'] = implode(',', $main_business_arr);
            }
        }
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
