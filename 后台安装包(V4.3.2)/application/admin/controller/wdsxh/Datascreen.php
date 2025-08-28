<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力中小企业发展
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdadmin.cn    All rights reserved.
// +----------------------------------------------------------------------
// | Wdadmin系统产品软件并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.wdadmin.cn
// +----------------------------------------------------------------------
/**
 * Class Datascreen
 * Desc  数据大屏控制器
 * Create on 2025/3/20 10:07
 * Create by wangyafang
 */

namespace app\admin\controller\wdsxh;


use app\common\controller\Backend;

class Datascreen extends Backend
{
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index()
    {
        if (!is_dir(ROOT_PATH.'public'.DIRECTORY_SEPARATOR.'assets'.DIRECTORY_SEPARATOR.'addons'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'fullscreen')) {
            $this->error('请先部署数据大屏');
        } else {
            $this->redirect($this->request->domain().'/assets/addons/wdsxh/fullscreen/index.html#/?ref=addtabs',302);
        }
    }
}



 