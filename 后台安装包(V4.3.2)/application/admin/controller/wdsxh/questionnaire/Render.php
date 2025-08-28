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

namespace app\admin\controller\wdsxh\questionnaire;

use app\admin\model\wdsxh\user\Wechat;
use app\common\controller\Backend;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use think\exception\DbException;
use think\response\Json;

/**
 * 问卷提交
 *
 * @icon fa fa-circle-o
 */
class Render extends Backend
{

    /**
     * Render模型对象
     * @var \app\admin\model\wdsxh\questionnaire\Render
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\wdsxh\questionnaire\Render;
        $questionnaire_id = input('questionnaire_id', 0, 'intval');
        $this->view->assign('questionnaire_id',$questionnaire_id);

    }

    /**
     * 查看
     *
     * @return string|Json
     * @throws \think\Exception
     * @throws DbException
     */
    public function index()
    {
        $questionnaire_id = input('questionnaire_id', 0, 'intval');
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if (false === $this->request->isAjax()) {
            return $this->view->fetch();
        }
        //如果发送的来源是 Selectpage，则转发到 Selectpage
        if ($this->request->request('keyField')) {
            return $this->selectpage();
        }
        [$where, $sort, $order, $offset, $limit] = $this->buildparams();
        $list = $this->model
                ->where('questionnaire_id',$questionnaire_id)
            ->order($sort, $order)
            ->paginate($limit);
        foreach ($list as $item){
            $item->wechat_id = (new Wechat())->where('id',$item['wechat_id'])->value('nickname');
        }

        $result = ['total' => $list->total(), 'rows' => $list->items()];
        return json($result);
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    public function details($ids = null){
        $row = $this->model->get($ids);
        $data = html_entity_decode($row->content_render);
        $formData = json_decode($data, true);
        foreach ($formData as $k=>$v){
            if ($v['type'] == 'images'){
                if ($v['content']){
                    if (strpos($v['content'], ',') !== false) {
                        $img = explode(',', $v['content']);
                    } else {
                        $img = array($v['content']);
                    }
                    $images = [];
                    foreach ($img as $item){
                        $images[] = wdsxh_full_url($item);
                    }
                    $formData[$k]['content'] = $images;
                }

            }
        }
        $this->view->assign("content", $formData);
        return $this->view->fetch();
    }


    /**
     * Desc  问卷提交导出
     * Create on 2024/3/22 13:36
     * Create by @小趴菜
     */
    public function export($ids = ""){

        if ($this->request->isPost()) {
            $questionnaire_id = input('questionnaire_id', 0, 'intval');
            set_time_limit(0);
            ini_set('memory_limit', '2048M');
            $search = $this->request->post('search');
            $ids = $ids ? $ids : $this->request->post("ids");
            $pk = $this->model->getPk();
            $adminIds = $this->getDataLimitAdminIds();
            if (is_array($adminIds)) {
                $this->model->where($this->dataLimitField, 'in', $adminIds);
            }
            $op = $this->request->post('op');

            $this->request->get(['search' => $search, 'ids' => $ids,'op' => $op]);
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            if ($ids == 'all'){
                $sql = $this->model
                    ->where($where)
                    ->where('questionnaire_id',$questionnaire_id)
                    ->field('content_render')
                    ->select();
            }else{
                $sql = $this->model
                    ->where($pk, 'in', $ids)
                    ->where($where)
                    ->where('questionnaire_id',$questionnaire_id)
                    ->field('content_render')
                    ->select();
            }
            $sql = collection($sql)->toArray();
            if (!$sql){
                $this->error('暂无数据导出');
            }
            foreach ($sql as $k=>$v){
                if ($v['content_render']){
                    $data = html_entity_decode($v['content_render']);
                    $sql[$k]['content_render'] = json_decode($data,true);
                }
            }
            $newExcel = new Spreadsheet();  //创建一个新的excel文档
            $objSheet = $newExcel->getActiveSheet();  //获取当前操作sheet的对象
            $questionnaire_name = (new \app\api\model\wdsxh\questionnaire\Questionnaire())->where('id',$questionnaire_id)->value('title');
            $objSheet->setTitle($questionnaire_name);  //设置当前sheet的标题
            $topic = (new \app\admin\model\wdsxh\questionnaire\Topic())->where('questionnaire_id', $questionnaire_id)->order('weigh asc')->select();
            $topic_data = collection($topic)->toArray();
            $labels = range('A', 'Z'); // 生成 A 到 Z 的数组作为列标的数组

          // 设置列宽度
            for ($i = 0; $i < count($labels); $i++) {
                $column = $labels[$i];
                $newExcel->getActiveSheet()->getColumnDimension($column)->setWidth(20);
                }

         // 设置每一行的标签（label）
            for ($i = 0; $i < count($topic_data); $i++) {
                $label = isset($topic_data[$i]['topic']) ? $topic_data[$i]['topic'] : '';
                $objSheet->setCellValue($labels[$i] . '1', $label);
            }
            // 外部循环遍历 $sql 数组
            foreach ($sql as $rowIndex => $row) {
                // 内部循环遍历 content 数组，设置每一行的值
                for ($j = 0; $j < count($row['content_render']); $j++) {
                    // 查询提交的数据是否开始说明
                    if ($row['content_render'][$j]['is_explain'] == '1') {
                        $value = $row['content_render'][$j]['content'] . '。' . '说明:' . $row['content_render'][$j]['explain'];
                    } else {
                        $value = isset($row['content_render'][$j]['content']) ? $row['content_render'][$j]['content'] : '';
                    }

                    // 循环图片,拼接完整的链接
                    if ($row['content_render'][$j]['type'] == 'images') {
                        $array = explode(',', $row['content_render'][$j]['content']);
                        foreach ($array as $k=>$v) {
                            $array[$k] = wdsxh_full_url($v);
                        }
                        $value =  implode(',',$array);
                    }
                    $objSheet->setCellValue($labels[$j] . ($rowIndex + 2), $value);
                }
            }
            /*--------------下面是设置其他信息------------------*/
            $title = date("Ymd-问卷调查");
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="' . $title . '.xlsx"');
            header('Cache-Control: max-age=0');
            $objWriter = IOFactory::createWriter($newExcel, 'Xlsx');
            $objWriter->save('php://output');
            return;

        }

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
