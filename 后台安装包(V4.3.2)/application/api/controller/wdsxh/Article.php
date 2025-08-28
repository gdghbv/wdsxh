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

use app\api\model\wdsxh\article\ArticleCat;
use app\common\controller\Api;

class Article extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $ArticleCatModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\article\Article();
        $this->ArticleCatModel = new ArticleCat();

    }


    /**
     * Desc  文章分类
     * Create on 2024/3/12 11:44
     * Create by @小趴菜
     */
    public function article_cat(){
        $data = $this->ArticleCatModel
            ->field('id,name')
            ->where('status','1')
            ->select();
        $this->success('请求成功',$data);
    }

    /**
     * Desc  文章列表
     * Create on 2024/3/12 11:48
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        if(isset($param['keywords']) && !empty($param['keywords'])) {
            $where['title'] = array('like','%'.$param['keywords'].'%');
        }
        if(isset($param['cat_id']) && !empty($param['cat_id'])) {
            $where['cat_id'] = array('eq',$param['cat_id']);
        }
        $where['status'] = array('eq',1);
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,title,type,image,createtime,link,read_num')
            ->page($page,$limit)
            ->order('createtime desc,weigh desc')
            ->select();
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  文章详情
     * Create on 2024/3/12 13:40
     * Create by @小趴菜
     */
    public function details(){
        $param = $this->request->param();
        $where = [];
        $where['id'] = array('eq',$param['id']);
        $data = $this->model
            ->where($where)
            ->field('id,title,release,content,read_num,createtime,image')
            ->find();
        if ($data){
            if ($data['release'] == ''){
                $data['release'] = (new \app\api\model\wdsxh\business\Association())->where('id',1)->value('name');
            }
            $data['read_num']+=1;
            $data->save();
            $data=$data->toArray();
        }
        $this->success('请求成功',$data);
    }

    /**
     * Desc 更新阅读量
     * Create on 2025/8/11 上午8:31
     * Create by wangyafang
     */
    public function update_read_num()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $id = $this->request->post('id');
        if (empty($id)) {
            $this->error('参数错误');
        }

        $articleObj = $this->model->get($id);
        if (!$articleObj) {
            $this->error('数据不存在');
        }
        if ($articleObj['type'] == '2') {
            $articleObj->read_num = $articleObj->read_num + 1;
            $articleObj->save();
        }
        $this->success('请求成功');
    }

}