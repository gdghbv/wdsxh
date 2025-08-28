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
 * Class SelfPickup
 * Desc  自提点控制器
 * Create on 2025/4/15 14:37
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\mall;


use app\api\model\wdsxh\business\Association;
use app\common\controller\Api;

class SelfPickup extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\mall\SelfPickup();
    }

    /**
     * Desc 自提点配置
     * Create on 2025/4/15 14:38
     * Create by wangyafang
     */
    public function config()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $data = $this->model->get(1);
        if ($data) {
            $data->hidden(['id']);
        }
        $data['mobile'] = (new Association())->value('phone');
        $this->success('请求成功',$data);
    }
}



 