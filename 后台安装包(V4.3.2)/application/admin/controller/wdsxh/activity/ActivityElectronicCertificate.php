<?php

namespace app\admin\controller\wdsxh\activity;

use app\common\controller\Backend;
/**
 * 活动电子证书
 *
 * @icon fa fa-circle-o
 */
class ActivityElectronicCertificate extends Backend
{
    
    /**
     * Party模型对象
     * @var \app\admin\model\wdsxh\activity\ActivityElectronicCertificate
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model=new \app\admin\model\wdsxh\activity\ActivityElectronicCertificate();
    }

    public function index()
    {
        $row=$this->model->get(1);
        if ($this->request->isPost()) {
            $params=$this->request->param('row/a');
            
            // 如果params['data']存在，解析它
            if (isset($params['data']) && !empty($params['data'])) {
                $data = json_decode($params['data'], true);
            } else {
                $data = [];
            }
            
            // 重新编码数据
            $params['data'] = json_encode($data);

            if(empty($row)){
                \app\admin\model\wdsxh\activity\ActivityElectronicCertificate::create(array('data'=>$params['data']));
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
