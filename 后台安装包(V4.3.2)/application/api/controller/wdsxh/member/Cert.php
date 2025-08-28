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
namespace app\api\controller\wdsxh\member;

use app\common\controller\Api;

class Cert extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\member\Cert();
    }

    /**
     * Desc  证书模型
     * Create on 2024/3/12 9:52
     * Create by @小趴菜
     */
    public function index(){
        $param = $this->request->param();
        $where = [];
        if(isset($param['name']) && !empty($param['name'])) {
           $member_id =  (new \app\admin\model\wdsxh\member\Member())
                ->where('name',$param['name'])
                ->value('id');
           $where['member_id'] = array('eq',$member_id);
        }
        if(isset($param['number']) && !empty($param['number'])) {
            $where['number'] = array('eq',$param['number']);
        }
        $data = $this->model
            ->where($where)
            ->field('id,image')
            ->select();
        if (!$data){
            $data = '';
        }
        $this->success('请求成功',$data);
    }

}