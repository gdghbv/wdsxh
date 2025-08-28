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

use app\api\model\wdsxh\PcBanner;
use app\common\controller\Api;


class Banner extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $pcModel = null;
    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\Banner();
        $this->pcModel = new PcBanner();
    }

    /**
     * Desc  首页轮播图
     * Create on 2024/3/25 10:03
     * Create by @小趴菜
     */
    public function index(){
        $where = [];
        $where['status'] = array('eq',1);
        $data = $this->model
            ->where($where)
            ->field('id,title,image,jump_type,content,jump_link')
            ->order('weigh desc,createtime desc')
            ->select();
        if($data){
            $list=collection($data)->toArray();
            foreach ($list as &$row){
                if($row['jump_type'] == 2){
                    $row['content']=json_decode($row['content'],true);
                }
            }
        }
        $this->success('请求成功', $data);
    }

    /**
     * Desc  轮播图详情
     * Create on 2024/3/28 14:56
     * Create by @小趴菜
     */
    public function details(){
        $param = $this->request->param();
        $data = $this->model
            ->where('id',$param['id'])
            ->field('id,title,content')
            ->find();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  pc首页轮播图
     * Create on 2024/4/09 16:25
     * Create by @小趴菜
     */
    public function pc_banner(){
        $where = [];
        $where['status'] = array('eq',1);
        $data = $this->pcModel
            ->where($where)
            ->field('id,title,image')
            ->order('weigh desc,createtime desc')
            ->select();

        $this->success('请求成功', $data);
    }







}