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
 * Class PersonCenterDiyPage
 * Desc  个人中心自定义控制器
 * Create on 2025/3/13 17:20
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use app\common\controller\Api;

class PersonCenterDiyPage extends Api
{
    protected $noNeedLogin = ['details'];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\PersonCenterDiyPage();
    }

    /**
     * Desc 详情
     * Create on 2025/3/13 17:21
     * Create by wangyafang
     */
    public function details()
    {
        $detail = $this->model->where('id',1)->field('page_name,page_data')->find();
        $page_data = json_decode($detail['page_data'],true);

        //todo 配置七牛云后，自定义装修，自定义入会图片无法访问
        $domain = \think\Config::get('upload.cdnurl');
        if (!wdsxh_is_url($domain)) {
            $domain = request()->domain();
        }
        $page_data['domain'] = $domain;

        $this->success('请求成功', $page_data);
    }
}



 