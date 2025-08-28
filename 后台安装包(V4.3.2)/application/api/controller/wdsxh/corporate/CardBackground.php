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
 * Class CardBackground
 * Desc  名片背景控制器
 * Create on 2025/1/21 16:59
 * Create by wangyafang
 */
namespace app\api\controller\wdsxh\corporate;

use app\common\controller\Api;

class CardBackground extends Api
{
    protected $noNeedLogin = ['index','font_color'];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\corporate\CardBackground();
    }

    /**
     * Desc 背景列表
     * Create on 2025/1/21 17:00
     * Create by wangyafang
     */
    public function index()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $where = [];
        $where['status'] = array('eq','normal');


        $order = 'weigh desc,id desc';

        $data = $this->model
            ->where($where)
            ->field('id,image,font_color')
            ->order($order)
            ->select();

        $this->success('请求成功',$data);
    }
}



 