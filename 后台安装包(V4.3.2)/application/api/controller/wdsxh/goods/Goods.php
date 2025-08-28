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
namespace app\api\controller\wdsxh\goods;
use app\api\model\wdsxh\goods\Banner;
use app\api\model\wdsxh\goods\SingleCategory;
use app\common\controller\Api;


class Goods extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $categoryModel = null;
    protected $bannerModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\goods\Goods();
        $this->categoryModel = new SingleCategory();
        $this->bannerModel = new Banner();
    }

    /**
     * Desc  商品列表
     * Create on 2024/3/13 16:23
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        //分类id
        if(isset($param['category_id']) && !empty($param['category_id'])) {
            $pid = (new SingleCategory())->where('id',$param['category_id'])->value('pid');
            if ($pid == 0) {
                $childCategoryIdArray = (new SingleCategory())->where('pid',$param['category_id'])->column('id');
                array_push($childCategoryIdArray,$param['category_id']);
                $where['category_id'] = array('in',$childCategoryIdArray);
            } else {
                $where['category_id'] = array('eq',$param['category_id']);
            }
        }
        if(isset($param['keywords']) && !empty($param['keywords'])) {
            $where['name'] = array('like','%'.$param['keywords'].'%');
        }
        //是否热销:1=是,0=否
        if(isset($param['is_hot']) && !empty($param['is_hot'])) {
            $where['is_hot'] = array('eq',$param['is_hot']);
        }
        $where['status'] = array('eq','normal');
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,name,image,recommend_image,price')
            ->page($page,$limit)
            ->order('weigh desc,createtime desc')
            ->select();
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  商品详情
     * Create on 2024/3/13 16:43
     * Create by @小趴菜
     */
    public function details(){
        $param = $this->request->param();
        $where = [];
        $where['id'] = array('eq',$param['id']);
        $data = $this->model
            ->where($where)
            ->field('id,name,slider_images,price,ot_price,param_json,content,image')
            ->find();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  商品分类
     * Create on 2024/3/13 17:32
     * Create by @小趴菜
     */
    public function category_index(){
        $where = [];
        $where['status'] = array('eq',1);
        $where['pid'] = array('eq',0);
        $data = $this->categoryModel
            ->where($where)
            ->field('id,name,image')
            ->order('weigh desc,createtime desc')
            ->select();

        foreach ($data as &$v) {
            $v['child'] = $this->categoryModel
                ->where('pid',$v['id'])
                ->where('status',1)
                ->field('id,name,image')
                ->order('weigh desc,createtime desc')
                ->select();
        }
        $this->success('请求成功',$data);
    }

    /**
     * Desc  商城轮播图
     * Create on 2024/3/13 17:58
     * Create by @小趴菜
     */
    public function banner_index(){
        $where = [];
        $where['status'] = array('eq',1);
        $data = $this->bannerModel
            ->where($where)
            ->field('id,title,image,jump_type,content,jump_link')
            ->order('weigh desc,createtime desc')
            ->select();
        if($data){
            $list=collection($data)->toArray();
            foreach ($list as &$row){
                $row['image']=wdsxh_full_url($row['image']);
                if($row['jump_type'] == 2){
                    $row['content']=json_decode($row['content'],true);
                }
            }
        }
        $this->success('请求成功', $data);
    }

    /**
     * Desc  商城轮播图详情
     * Create on 2024/4/2 11:42
     * Create by @小趴菜
     */
    public function banner_details(){
        $param = $this->request->param();
        $data = $this->bannerModel
            ->where('id',$param['id'])
            ->field('id,title,content')
            ->find();
        $this->success('请求成功', $data);
    }



}