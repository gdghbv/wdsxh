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
namespace app\api\controller\wdsxh\activity;

use app\common\controller\Api;

/**
 * Class JoinConfig
 * Desc  入会申请控制器
 * Create on 2024/3/7 9:08
 * Create by wangyafang
 */
class ActivityFieldset extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    /**
     * Desc 报名字段
     * Create on 2025/8/11 下午5:00
     * Create by wangyafang
     */
    public function field()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $activity_id = $this->request->get('id');
        if (empty($activity_id)) {
            $this->error('参数错误');
        }
        $activityFieldsetObj = (new \app\admin\model\wdsxh\activity\ActivityFieldset())
            ->where('activity_id',$activity_id)
            ->find();
        if ($activityFieldsetObj) {
            $fieldset = json_decode($activityFieldsetObj['json'],true);
        } else {
            $fieldset = array(
                0 =>
                    array(
                        'show' => '1',
                        'required' => '1',
                        'type' => 'text',
                        'label' => '姓名',
                        'field' => 'name',
                        'option' => '请输入姓名',
                    ),
                1 =>
                    array(
                        'show' => '1',
                        'required' => '1',
                        'type' => 'number',
                        'label' => '手机号',
                        'field' => 'mobile',
                        'option' => '请输入你的手机号',
                    ),
            );;
        }      

        foreach ($fieldset as $k=>$v) {
            $fieldset[$k]['value'] = '';
        }

        $this->success('请求成功',$fieldset);
    }


}



 