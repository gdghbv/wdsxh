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
 * Class Reliable
 * Desc  名片靠谱控制器
 * Create on 2025/1/22 14:33
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh\corporate;


use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;
use think\Db;
use think\exception\PDOException;
use think\exception\ValidateException;
use Exception;

class Reliable extends Api
{
    protected $noNeedLogin = [''];
    protected $noNeedRight = ['*'];
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\api\model\wdsxh\corporate\Reliable();
    }
    
    /**
     * Desc 靠谱
     * Create on 2025/1/22 14:40
     * Create by wangyafang
     */
    public function reliable()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $card_id = $this->request->post('card_id');
        if (empty($card_id)) {
            $this->error('名片ID不能为空');
        }
        $reliableObj = $this->model->where('wechat_id',$wechat_id)->where('card_id',$card_id)->find();
        if($reliableObj) {
            $this->error('已点击');
        }

        $result = false;
        Db::startTrans();
        try {
            $result = $this->model->allowField(true)->save(array(
                'card_id'=>$card_id,
                'wechat_id'=>$wechat_id,
            ));
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }

        $this->success('操作成功');
    }

    /**
     * Desc 取消靠谱
     * Create on 2025/1/22 15:05
     * Create by wangyafang
     */
    public function cancel()
    {
        if(!$this->request->isPost()) {
            $this->error('请求类型错误');
        }
        $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
        $card_id = $this->request->post('card_id');
        if (empty($card_id)) {
            $this->error('名片ID不能为空');
        }
        $reliableObj = $this->model->where('wechat_id',$wechat_id)->where('card_id',$card_id)->find();
        if(!$reliableObj) {
            $this->error('已取消');
        }

        $result = false;
        Db::startTrans();
        try {
            $result = $reliableObj->delete();
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if(false === $result){
            $this->error($this->model->getError());
        }

        $this->success('取消成功');
    }
}



 