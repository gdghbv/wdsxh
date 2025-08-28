<?php

namespace app\admin\controller\wdsxh;

use app\common\controller\Backend;
/**
 * 电子会牌
 *
 * @icon fa fa-circle-o
 */
class Willbrand extends Backend
{
    
    /**
     * Party模型对象
     * @var \app\admin\model\wdsxh\Willbrand
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model=new \app\admin\model\wdsxh\Willbrand;
    }

    public function index()
    {
        $row=$this->model->get(1);
        if ($this->request->isPost()) {
            $params=$this->request->param('row/a');
            
            // 获取会员编号设置
            $memberNumberPrefix = $this->request->param('member_number_prefix', '');
            $memberNumberSuffix = $this->request->param('member_number_suffix', '');
            
            // 如果params['data']存在，解析它
            if (isset($params['data']) && !empty($params['data'])) {
                $data = json_decode($params['data'], true);
            } else {
                $data = [];
            }
            
            // 添加会员编号设置到数据中
            $data['member_number_settings'] = [
                'prefix' => $memberNumberPrefix,
                'suffix' => $memberNumberSuffix,
                'generateFunction' => 'generateMemberNumber'
            ];
            
            // 重新编码数据
            $params['data'] = json_encode($data);

            if(empty($row)){
                \app\admin\model\wdsxh\Willbrand::create(array('data'=>$params['data']));
            }else{
                $row->data=$params['data'];
                $row->save();
            }
            $this->success('保存成功！');
        }
        $data=$row->data;
        if(!empty($data)){
            $data=json_decode($data,true);
        }
        
        // 添加默认的自定义会员编号设置
        if (!isset($data['member_number_settings'])) {
            $data['member_number_settings'] = [
                'prefix' => '',
                'suffix' => ''
            ];
        }
        
        $this->assign('data',$data);
        return $this->view->fetch();
    }

    public function multi($ids = null)
    {
        return;
    }

    public function del($ids = null)
    {
        return;
    }

    public function edit($ids = null)
    {
        return;
    }

    public function add()
    {
        return;
    }

}
