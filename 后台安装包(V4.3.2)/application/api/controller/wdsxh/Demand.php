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

use app\api\model\wdsxh\user\Wechat;
use app\common\controller\Api;
use think\Db;
use Exception;
use think\exception\PDOException;
use think\exception\ValidateException;

class Demand extends Api
{
    protected $noNeedLogin = [];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\Demand();

    }

    /**
     * Desc  需求反馈
     * Create on 2024/3/13 15:42
     * Create by @小趴菜
     */
    public function add(){
        $param = $this->request->post();
        if ($param['title'] == ''){
            $this->error('请填写标题');
        }
        $user_id = $this->auth->id;
        $wechat_id = (new Wechat())->where('user_id',$user_id)->value('id');
        $param['wechat_id'] = $wechat_id;
        $param['createtime'] = time();
        $result = false;
        Db::startTrans();
        try {
            $result = $this->model->save($param);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }
        $this->success('提交成功');

    }


}