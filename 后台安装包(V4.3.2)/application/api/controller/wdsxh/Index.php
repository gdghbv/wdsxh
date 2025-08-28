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

use app\api\model\wdsxh\Quickmenu;
use app\api\model\wdsxh\Tabbar;
use app\common\controller\Api;


class Index extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $tabbarModel = null;
    public function _initialize()
    {
        parent::_initialize();
        $this->model = new Quickmenu();
        $this->tabbarModel = new Tabbar();
    }

    /**
     * Desc  快速导航
     * Create on 2024/3/22 16:37
     * Create by @小趴菜
     */
    public function quickmenu_index(){
        $list=$this->model->where('status',1)
            ->order('weigh desc')
            ->field('id,name,icon,skip_type,content')
            ->select();
        if($list){
            foreach ($list as $row){
                $row->icon=wdsxh_full_url($row->icon);
                if($row->skip_type == 3){
                    $row->content=json_decode($row->content,true);
                }
            }
        }
        $this->success('请求成功',$list);
    }

    /**
     * Desc  快速导航详情
     * Create on 2024/3/28 15:06
     * Create by @小趴菜
     */
    public function quickmenu_details(){
        $param = $this->request->param();
        $data = $this->model
            ->where('id',$param['id'])
            ->field('id,name,content')
            ->find();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  底部导航
     * Create on 2024/3/22 17:04
     * Create by @小趴菜
     */
    public function tabbar_index(){
        $list= $this->tabbarModel->where('status',1)
            ->order('weigh desc')
            ->field('id,name,path,icon,selicon')
            ->select();
        $this->success('请求成功',$list);
    }







}