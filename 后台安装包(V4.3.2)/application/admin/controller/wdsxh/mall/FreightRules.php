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
namespace app\admin\controller\wdsxh\mall;

use app\common\controller\Backend;

/**
 * 商城运费规则
 *
 * @icon fa fa-circle-o
 */
class FreightRules extends Backend
{

    /**
     * FreightRules模型对象
     * @var \app\admin\model\wdsxh\mall\FreightRules
     */
    protected $model = null;
    protected $modelValidate = true;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\mall\FreightRules;
        $this->view->assign("statusList", $this->model->getStatusList());
        $this->view->assign("openAreaList", $this->model->getOpenAreaList());
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */


}
