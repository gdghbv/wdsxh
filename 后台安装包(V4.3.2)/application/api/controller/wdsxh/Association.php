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
namespace app\api\controller\wdsxh;

use app\api\model\wdsxh\PcBusinessAssociation;
use app\common\controller\Api;

class Association extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $pcModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\business\Association();
        $this->pcModel =  new PcBusinessAssociation();

    }


    /**
     * Desc  商协信息
     * Create on 2024/3/12 14:21
     * Create by @小趴菜
     */
    public function index(){
        $data = $this->model->field('id,logo,name,contacts,phone,mailbox,address,wananchi_qr_code,qr_code_jump_link,rules,honor,course,lng,lat')->find();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  pc商协信息
     * Create on 2024/4/9 17:43
     * Create by @小趴菜
     */
    public function pc_index(){
        $data = $this->pcModel->find();
        $data['image'] = wdsxh_full_url($data['image']);
        $data['background_image'] = wdsxh_full_url($data['background_image']);
        $data['association_image'] = wdsxh_full_url($data['association_image']);
        $data['member_image'] = wdsxh_full_url($data['member_image']);
        $data['activity_image'] = wdsxh_full_url($data['activity_image']);
        $data['business_image'] = wdsxh_full_url($data['business_image']);
        $data['article_image'] = wdsxh_full_url($data['article_image']);
        $data['contact_image'] = wdsxh_full_url($data['contact_image']);
        $data['applet_qr_code'] = wdsxh_full_url($data['applet_qr_code']);
        $data['album_image'] = wdsxh_full_url($data['album_image']);
        $this->success('请求成功',$data);
    }

    /**
     * Desc  公户信息
     * Create on 2024/6/26 9:27
     * Create by wangyafang
     */
    public function public_account_information(){
        $data = $this->model->field('bank_account_name,receiving_account,bank_name')->find();
        $this->success('请求成功',$data);
    }

}