<?php
/**
 * Class Diy
 * Desc  Diy模式
 * Create on 2022/5/18 8:49
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;



use app\common\controller\Api;

class Diy extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    public function mode()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $home_mode = '2';
        $this->success('请求成功',['home_mode'=>$home_mode]);
    }

    public function getPage()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $page_id = (int)$this->request->request('page_id');

        if (Db("wdsxh_diy_page")->where(['deletetime' => null])->order(['id' => 'desc'])->count() <= 0) {
            $this->error('未定义页面');
        }
        // 页面详情//todo 软删除
        $detail = $page_id > 0 ? Db("wdsxh_diy_page")->where(['deletetime' => null])->where('id', $page_id)->find() : Db("wdsxh_diy_page")->where(['deletetime' => null])->where('status', 'home')->find();
        if (!$detail) {
            $this->error('页面错误');
        }
        $page_data = json_decode($detail['page_data'],true);

        //todo 配置七牛云后，自定义装修，自定义入会图片无法访问
        $domain = \think\Config::get('upload.cdnurl');
        if (!wdsxh_is_url($domain)) {
            $domain = request()->domain();
        }
        $page_data['domain'] = $domain;

        // 页面diy元素
        $this->success('请求成功', $page_data);
    }
}