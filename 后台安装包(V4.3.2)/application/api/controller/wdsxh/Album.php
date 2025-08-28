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

use app\api\model\wdsxh\album\AlbumConfig;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;

class Album extends Api
{
    protected $noNeedLogin = ['index','diy_list','album_config'];
    protected $noNeedRight = ['*'];

    protected $model = null;
    protected $AlbumConfigModel = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\album\Album;
        $this->AlbumConfigModel = new \app\api\model\wdsxh\album\AlbumConfig();

    }


    /**
     * Desc  相册配置
     * Create on 2024/3/12 10:28
     * Create by @小趴菜
     */
    public function album_config(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $type = $this->request->get('type');

        //会员详情显示权限:1=全部开放,2=部分开放,3=会员专属
        $is_status = (new AlbumConfig())->where('id',1)->value('is_status');
        if ($type == 1) {//列表
            if ($is_status == 1 || $is_status == 2) {
                $show_status = 1;//能看
            } else {
                if ($this->auth->isLogin()) {
                    $current_date = date('Y-m-d',time());
                    $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                    $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                        ->where('expire_time','>=',$current_date)
                        ->find();
                    if ($memberObj) {
                        $show_status = 1;
                    } else {
                        $show_status = 2;
                    }
                } else {
                    $show_status = 2;//不能看
                }
            }
        } else {//详情
            $current_date = date('Y-m-d',time());
            $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
            $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                ->where('expire_time','>=',$current_date)
                ->find();
            $show_status = ($is_status == '1' || $memberObj) ? 1 : 2;
        }
        $this->success('请求成功',['show_status'=>$show_status]);
    }

    /**
     * Desc  相册列表
     * Create on 2024/3/12 10:13
     * Create by @小趴菜
     */
    public function index(){
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $is_status = (new AlbumConfig())->where('id',1)->value('is_status');
        if ($is_status == 3) {
            if ($this->auth->isLogin()) {
                $current_date = date('Y-m-d',time());
                $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                    ->where('expire_time','>=',$current_date)
                    ->find();
                if (!$memberObj) {
                    $this->error('成为会员后可查看');
                }
            } else {
                $this->error('请登录后操作',null,401);
            }
        }
        $param = $this->request->param();
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $where = [];
        $where['status'] = array('eq','normal');
        $total = $this->model->where($where)->count();
        $data = $this->model
            ->where($where)
            ->field('id,name,release_date,type,files,image')
            ->page($page,$limit)
            ->order('release_date desc,weigh desc')
            ->select();
        foreach ($data as $datum) {
            $files = explode(',',$datum['files']);
            // 如果文件数量超过3个，只取前三个文件，否则取全部文件
            $datum['files'] = implode(',', array_slice($files, 0, 3));
        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }

    /**
     * Desc  相册详情
     * Create on 2024/3/12 10:13
     * Create by @小趴菜
     */
    public function details(){
        $param = $this->request->param();
        $where = [];
        $where['status'] = array('eq','normal');
        $where['id'] = array('eq',$param['album_id']);
        $data = $this->model
            ->where($where)
            ->field('id,name,release_date,type,files,image')
            ->find();
        $this->success('请求成功',$data);
    }

    /**
     * Desc 首页diy
     * Create on 2025/8/8 上午10:27
     * Create by wangyafang
     */
    public function diy_list()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $limit = $this->request->get('limit');
        if (empty($limit)) {
            $this->error('参数错误');
        }

        $where = [];
        $where['status'] = array('eq','normal');
        $data = $this->model
            ->where($where)
            ->field('id,name,release_date,type,files,image')
            ->page(1,$limit)
            ->order('release_date desc,weigh desc')
            ->select();
        foreach ($data as $datum) {
            $files = explode(',',$datum['files']);
            // 如果文件数量超过3个，只取前三个文件，否则取全部文件
            $datum['files'] = implode(',', array_slice($files, 0, 3));
        }
        $this->success('请求成功',$data);
    }

}