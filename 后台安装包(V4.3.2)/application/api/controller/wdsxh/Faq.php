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
use app\common\controller\Api;


class Faq extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\Faq();

    }

    /**
     * Desc  常见问题列表
     * Create on 2024/3/13 15:57
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        $where['status'] = array('eq',1);
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,title')
            ->page($page,$limit)
            ->order('weigh desc,createtime desc')
            ->select();
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  常见问题详情
     * Create on 2024/3/13 16:10
     * Create by @小趴菜
     */
    public function details(){
        $param = $this->request->param();
        $where = [];
        $where['id'] = array('eq',$param['id']);
        $data = $this->model
            ->where($where)
            ->field('id,title,reply')
            ->find();
        $this->success('请求成功',$data);
    }


}