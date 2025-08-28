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
namespace app\api\controller\wdsxh\institution;

use app\common\controller\Api;

class Level extends  Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\institution\Level();
    }

    /**
     * Desc 机构级别列表
     * Create on 2025/8/7 8:47
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $institution_id = $this->request->get('institution_id');
        if (empty($institution_id)) {
            $this->error('参数错误');
        }

        $data = $this->model
            ->where('institution_id',$institution_id)
            ->field('id,level_name')
            ->order('id asc')
            ->select();
        $this->success('请求成功',$data);
    }
}