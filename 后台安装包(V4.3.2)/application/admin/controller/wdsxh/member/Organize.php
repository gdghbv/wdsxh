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

namespace app\admin\controller\wdsxh\member;

use app\admin\model\wdsxh\member\Cert;
use app\admin\model\wdsxh\member\MemberApply;
use app\admin\model\wdsxh\user\UserWechat;
use think\Db;
use think\exception\DbException;
use think\exception\PDOException;
use think\exception\ValidateException;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Csv;
use PhpOffice\PhpSpreadsheet\Reader\Xls;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use Exception;
use app\common\library\Auth;

/**
 * 团体会员
 *
 * @icon fa fa-circle-o
 */
class Organize extends Member
{

    /**
     * Organize模型对象
     * @var \app\admin\model\wdsxh\member\Organize
     */
    protected $model = null;
    protected $noNeedRight = ['seluser', 'member'];
    protected $industryCategoryModel = null;
    protected $modelValidate = true;
    protected $modelSceneValidate = true;

    public function _initialize()
    {
        parent::_initialize();
        $this->industryCategoryModel = new \app\admin\model\wdsxh\member\IndustryCategory();
    }



    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */

    /**
     * 导入
     *
     * @return void
     * @throws PDOException
     */
    public function import()
    {
        list($person_fieldset,$organize_fieldset) = \app\admin\model\wdsxh\member\JoinConfig::organize_fieldset();
        foreach ($person_fieldset as $k=>$v) {
            if ($v['field'] == 'address') {
                $person_fieldset[$k]['value'] = array(
                    'address'=>'',
                    'latitude'=>'',
                    'longitude'=>'',
                );
            } else {
                $person_fieldset[$k]['value'] = '';
            }
        }
        foreach ($organize_fieldset as $k=>$v) {
            $organize_fieldset[$k]['value'] = '';
        }

        $file = $this->request->request('file');
        if (!$file) {
            $this->error(__('Parameter %s can not be empty', 'file'));
        }
        $filePath = ROOT_PATH . DS . 'public' . DS . $file;
        if (!is_file($filePath)) {
            $this->error(__('No results were found'));
        }
//实例化reader
        $ext = pathinfo($filePath, PATHINFO_EXTENSION);
        if (!in_array($ext, ['csv', 'xls', 'xlsx'])) {
            $this->error(__('Unknown data format'));
        }
        if ($ext === 'csv') {
            $file = fopen($filePath, 'r');
            $filePath = tempnam(sys_get_temp_dir(), 'import_csv');
            $fp = fopen($filePath, 'w');
            $n = 0;
            while ($line = fgets($file)) {
                $line = rtrim($line, "\n\r\0");
                $encoding = mb_detect_encoding($line, ['utf-8', 'gbk', 'latin1', 'big5']);
                if ($encoding !== 'utf-8') {
                    $line = mb_convert_encoding($line, 'utf-8', $encoding);
                }
                if ($n == 0 || preg_match('/^".*"$/', $line)) {
                    fwrite($fp, $line . "\n");
                } else {
                    fwrite($fp, '"' . str_replace(['"', ','], ['""', '","'], $line) . "\"\n");
                }
                $n++;
            }
            fclose($file) || fclose($fp);

            $reader = new Csv();
        } elseif ($ext === 'xls') {
            $reader = new Xls();
        } else {
            $reader = new Xlsx();
        }

//导入文件首行类型,默认是注释,如果需要使用字段名称请使用name
        $importHeadType = isset($this->importHeadType) ? $this->importHeadType : 'comment';

        $table = $this->model->getQuery()->getTable();
        $database = \think\Config::get('database.database');
        $fieldArr = [];
        $list = db()->query("SELECT COLUMN_NAME,COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?", [$table, $database]);
        foreach ($list as $k => $v) {
            if ($importHeadType == 'comment') {
                $v['COLUMN_COMMENT'] = explode(':', $v['COLUMN_COMMENT'])[0]; //字段备注有:时截取
                $fieldArr[$v['COLUMN_COMMENT']] = $v['COLUMN_NAME'];
            } else {
                $fieldArr[$v['COLUMN_NAME']] = $v['COLUMN_NAME'];
            }
        }
        $levelModel = new \app\admin\model\wdsxh\member\Level();

//加载文件
        $insert = [];
        try {
            if (!$PHPExcel = $reader->load($filePath)) {
                $this->error(__('Unknown data format'));
            }
            $currentSheet = $PHPExcel->getSheet(0);  //读取文件中的第一个工作表
            $allColumn = $currentSheet->getHighestDataColumn(); //取得最大的列号
            $allRow = $currentSheet->getHighestRow(); //取得一共有多少行
            $maxColumnNumber = Coordinate::columnIndexFromString($allColumn);
            $fields = [];
            for ($currentRow = 1; $currentRow <= 1; $currentRow++) {
                for ($currentColumn = 1; $currentColumn <= $maxColumnNumber; $currentColumn++) {
                    $val = $currentSheet->getCellByColumnAndRow($currentColumn, $currentRow)->getValue();
                    $fields[] = $val;
                }
            }

            for ($currentRow = 2; $currentRow <= $allRow; $currentRow++) {
                $mobile = 0;
                $values = [];
                $isEmptyRow = true; // 假设该行为空行

                // 先检查整行是否为空行
                for ($currentColumn = 1; $currentColumn <= $maxColumnNumber; $currentColumn++) {
                    $val = $currentSheet->getCellByColumnAndRow($currentColumn, $currentRow)->getValue();
                    $val = trim($val);

                    // 如果某一列有值，则该行不为空
                    if (!empty($val)) {
                        $isEmptyRow = false;
                    }
                }

                // 如果该行为空行，则跳过
                if ($isEmptyRow) {
                    continue;
                }

                // 如果不是空行，则处理每一列的数据
                for ($currentColumn = 1; $currentColumn <= $maxColumnNumber; $currentColumn++) {
                    $val = $currentSheet->getCellByColumnAndRow($currentColumn, $currentRow)->getValue();
                    $val = trim($val);
                    if ($currentColumn <= count($person_fieldset)) {
                        if ($currentColumn == 1) {//姓名
                            if (empty($val)) {
                                throw new Exception('姓名不能为空');
                            }
                            $found_key = array_search('name', array_column($person_fieldset, 'field'));
                            $person_fieldset[$found_key]['value'] = $val;
                        } elseif ($currentColumn == 2) {//手机号
                            if (empty($val)) {
                                throw new Exception('手机号不能为空');
                            }
                            $found_key = array_search('mobile', array_column($person_fieldset, 'field'));
                            $person_fieldset[$found_key]['value'] = $val;
                            $mobile = $val;
                        } elseif ($currentColumn == 3) {//级别
                            if (empty($val)) {
                                throw new Exception('级别不能为空');
                            }
                            $found_key = array_search('member_level_id', array_column($person_fieldset, 'field'));
                            $person_fieldset[$found_key]['value'] = $levelModel->where('name',$val)->value('id');
                        }
                    } else {
                        $key = ($currentColumn - $maxColumnNumber) + ($maxColumnNumber - count($person_fieldset) -1);//11  person 8  organize 0 1 2
                        $organize_fieldset[$key]['value'] = is_null($val) ? '' : $val;
                    }
                    $values[] = is_null($val) ? '' : $val;
                    $total_values[] = array(
                        'field'=>$fields[$currentColumn-1],
                        'val'=>$val,
                    );
                }

                $row = [];
                $temp = array_combine($fields, $values);
                $mobileWhere['mobile'] = array('eq',$mobile);
                $memberObj = $this->model->where($mobileWhere)->find();
                $memberApplyModel = new MemberApply();
                $memberApplyObj = $memberApplyModel->where($mobileWhere)->find();
                if (empty($memberObj) && empty($memberApplyObj)) {
                    $userWechatModel = new UserWechat();
                    foreach ($temp as $k => $v) {
                        if (isset($fieldArr[$k]) && $k !== '') {
                            $row[$fieldArr[$k]] = $v;
                        }
                    }
                    if (isset($row['industry_category_id']) && !empty($row['industry_category_id'])) {
                        $row['industry_category_id'] = (new \app\admin\model\wdsxh\member\IndustryCategory())->where('name',$row['industry_category_id'])->value('id');
                    }
                    foreach ($person_fieldset as $k=>$v) {
                        if (isset($v['field']) && $v['field'] == 'industry_category_id' && !empty($row['industry_category_id'])) {
                            $person_fieldset[$k]['value'] = $row['industry_category_id'];
                        }
                    }
                    $person_fieldset = wdsxh_update_array_child_fieldset($person_fieldset, $total_values);

                    foreach ($organize_fieldset as $k=>$v) {
                        if (!isset($v['field'])) {
                            unset($organize_fieldset[$k]);
                        }
                    }
                    foreach ($person_fieldset as $k=>$v) {
                        if (!isset($v['field'])) {
                            unset($person_fieldset[$k]);
                        }
                    }
                    $organize_fieldset = wdsxh_update_array_child_fieldset($organize_fieldset, $total_values);
                    $custom_content = array(
                        'person'=>$person_fieldset,
                        'organize'=>$organize_fieldset,
                    );
                    $row['custom_content'] = json_encode($custom_content);
                    $row['type'] = $type = '3';
                    $row['join_time'] = date('Y-m-d',time());
                    $row['expire_time'] = \app\common\model\wdsxh\member\Member::get_expire_time($row['join_time']);
                    $row['status'] = 'hidden';
                    $userWechatObj = $userWechatModel->where($mobileWhere)->find();
                    if ($userWechatObj) {
                        $row['wechat_id'] = $userWechatObj['id'];
                    }


                    if ($row) {
                        $insert[] = $row;
                    }
                }
            }
        } catch (Exception $exception) {
            $this->error($exception->getMessage());
        }

        $apply_data = array();
        foreach ($insert as $k=>$v) {
            $level_name_id = $levelModel->where('name',$v['member_level_id'])->value('id');
            if (!$level_name_id) {
                $this->error('级别'.$v['member_level_id'].'不存在');
            } else {
                $insert[$k]['member_level_name'] = $v['member_level_id'];
                $insert[$k]['member_level_id'] = $level_name_id;
            }
            $insert[$k]['letter'] = \app\common\model\wdsxh\member\Member::getFirstCharter($v['name']);
            $apply = array(
                'type'=>$type,
                'name'=>$v['name'],
                'mobile'=>$v['mobile'],
                'member_level_id'=>$insert[$k]['member_level_id'],
                'custom_content'=>$v['custom_content'],
                'state'=>'2',
                'channel'=>3,
                'child_state'=>'6',
                'pay_method'=>'1',
            );
            if (isset($v['wechat_id']) && !empty($v['wechat_id'])) {
                $apply['wechat_id'] = $v['wechat_id'];
            }
            $apply_data[] = $apply;
            unset($apply);
        }
        if (!$insert) {
            $this->error(__('No rows were updated'));
        }
        $memberApplyModel = new MemberApply();
        try {
//是否包含admin_id字段
            $has_admin_id = false;
            foreach ($fieldArr as $name => $key) {
                if ($key == 'admin_id') {
                    $has_admin_id = true;
                    break;
                }
            }
            if ($has_admin_id) {
                $auth = Auth::instance();
                foreach ($insert as &$val) {
                    if (!isset($val['admin_id']) || empty($val['admin_id'])) {
                        $val['admin_id'] = $auth->isLogin() ? $auth->id : 0;
                    }
                }
            }
            $this->model->saveAll($insert);
            $memberApplyModel->saveAll($apply_data);
        } catch (PDOException $exception) {
            $msg = $exception->getMessage();
            if (preg_match("/.+Integrity constraint violation: 1062 Duplicate entry '(.+)' for key '(.+)'/is", $msg, $matches)) {
                $msg = "导入失败，包含【{$matches[1]}】的记录已存在";
            };
            $this->error($msg);
        } catch (Exception $e) {
            $this->error($e->getMessage());
        }

        $this->success();
    }
    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model
                ->where('type','3')
                ->with(['level','industry'])
                ->where($where)
                ->order($sort, $order)
                ->paginate($limit);

            foreach ($list as $row) {
                if (empty($row['organize_name'])) {
                    $row['organize_name'] = '';
                }
                if (empty($row['organize_position'])) {
                    $row['organize_position'] = '';
                }
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }

    /**
     * 添加
     *
     * @return string
     * @throws \think\Exception
     */
    public function add()
    {
        list($person_fieldset,$organize_fieldset) = \app\admin\model\wdsxh\member\JoinConfig::organize_fieldset();
        if (false === $this->request->isPost()) {
            $this->assign('person_fieldset',$person_fieldset);
            $this->assign('organize_fieldset',$organize_fieldset);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');

        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);

        if ($this->dataLimit && $this->dataLimitFieldAutoFill) {
            $params[$this->dataLimitField] = $this->auth->id;
        }
        $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params(3,json_encode($person_fieldset),$params,'',json_encode($organize_fieldset));
        $result = false;
        $params['type'] = '3';
        $params['expire_time'] = \app\common\model\wdsxh\member\Member::get_expire_time($params['join_time']);
        $applyModel = new MemberApply();
        $apply_data = $params;
        $apply_data['channel'] = 3;
        $apply_data['state'] = '2';//已通过
        $apply_data['child_state'] = '6';//已通过
        $params['channel'] = 3;
        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.add' : $name) : $this->modelValidate;
                $this->model->validateFailException()->validate($validate);
            }
            $applyModel->data($apply_data);
            $applyModel->allowField(true)->save();
            $result = $this->model->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if ($result === false) {
            $this->error(__('No rows were inserted'));
        }
        $cert_data = \app\common\model\wdsxh\Cert::get_cert_data($params['type'],$applyModel,$this->model->id);
        if(!empty($cert_data)) {
            $certModel = new Cert();
            $certModel->saveAll($cert_data);
        }
        $this->success();
    }

    /**
     * 编辑
     *
     * @param $ids
     * @return string
     * @throws DbException
     * @throws \think\Exception
     */
    public function edit($ids = null)
    {
        $row = $this->model->get($ids);
        $original_wechat_id = $row['wechat_id'];
        $original_mobile = $row['mobile'];
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        $adminIds = $this->getDataLimitAdminIds();
        if (is_array($adminIds) && !in_array($row[$this->dataLimitField], $adminIds)) {
            $this->error(__('You have no permission'));
        }
        if (false === $this->request->isPost()) {
            $custom_content = json_decode($row['custom_content'],true);
            $this->assign('person_fieldset',$custom_content['person']);
            $this->assign('organize_fieldset',$custom_content['organize']);
            $this->view->assign('row', $row);
            return $this->view->fetch();
        }
        $params = $this->request->post('row/a');
        if (empty($params)) {
            $this->error(__('Parameter %s can not be empty', ''));
        }
        $params = $this->preExcludeFields($params);
        $update_mobile = $params['person']['mobile'];
        $result = false;
        $tem_decode_json_custom_content = json_decode($row['custom_content'],true);
        $params['custom_content'] = array_merge($params['person'],$params['organize']);
        $params['custom_content']['mobile'] = $update_mobile;
        $params = \app\admin\model\wdsxh\member\Member::get_member_edit_params($row['type'],json_encode($tem_decode_json_custom_content['person']),$params,'',json_encode($tem_decode_json_custom_content['organize']));
        if (isset($params['join_time']) && !empty($params['join_time'])) {
            $params['expire_time'] = \app\common\model\wdsxh\member\Member::get_expire_time($params['join_time']);
        }
        $params['id'] = $row['id'];
        $queryMemberIsUserMobile = $this->model->where('mobile',$params['mobile'])
            ->where('id','<>',$row['id'])
            ->find();
        if ($queryMemberIsUserMobile) {
            $this->error('手机号已被其他会员使用');
        }

        Db::startTrans();
        try {
            //是否采用模型验证
            if ($this->modelValidate) {
                $name = str_replace("\\model\\", "\\validate\\", get_class($this->model));
                $validate = is_bool($this->modelValidate) ? ($this->modelSceneValidate ? $name . '.edit' : $name) : $this->modelValidate;
                $row->validateFailException()->validate($validate);
            }
            $result = $row->allowField(true)->save($params);
            Db::commit();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            $this->error($e->getMessage());
        }
        if (false === $result) {
            $this->error(__('No rows were updated'));
        }
        $applyModel = new MemberApply();
        if(empty($original_wechat_id) && $params['wechat_id']) {//会员之前没有选中微信用户，编辑有选中微信用户
            $applyObj = $applyModel->where('mobile',$original_mobile)->find();
            if ($applyObj) {
                $applyObj->mobile = $params['mobile'];
                $applyObj->wechat_id = $params['wechat_id'];
                $applyObj->save();
            }
        }
        if(!empty($original_wechat_id) && ($original_wechat_id != $params['wechat_id'])) {//会员之前没有选中微信用户，编辑有选中微信用户
            $applyObj = $applyModel->where('mobile',$original_mobile)->find();
            if ($applyObj) {
                $applyObj->mobile = $params['mobile'];
                $applyObj->wechat_id = $params['wechat_id'];
                $applyObj->save();
            }
        }
        if ($original_mobile != $update_mobile) {
            $applyObj = $applyModel->where('mobile',$original_mobile)->find();
            $custom_content_array = json_decode($applyObj['custom_content'],true);
            foreach ($custom_content_array['person'] as &$v) {
                if (isset($v['field']) && $v['field'] == 'mobile') {
                    $v['value'] = $update_mobile;
                }
            }
            $applyObj->custom_content = json_encode($custom_content_array);
            $applyObj->mobile = $update_mobile;
            $applyObj->save();
        }
        $this->success();
    }

    /**
     * 导出
     */
    public function export($ids = "")
    {
        if ($this->request->isPost()) {
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
            $filter = $this->request->post('filter');
            $columns = $this->request->post('columns');

            // 兼容POST导出时筛选条件未生效的问题：将筛选参数写入GET供buildparams读取
            if (is_array($filter)) { $filter = json_encode($filter, JSON_UNESCAPED_UNICODE); }
            if (is_array($op)) { $op = json_encode($op, JSON_UNESCAPED_UNICODE); }
            $_GET['search'] = $search ?: '';
            $_GET['ids'] = $ids ?: '';
            $_GET['op'] = $op ?: '{}';
            $_GET['filter'] = $filter ?: '{}';
            $_GET['columns'] = $columns ?: '';

            $this->relationSearch = true;
            $this->request->get(['search' => $search, 'ids' => $ids,'op' => $op, 'filter' => $filter, 'columns' => $columns]);
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $baseWhere['type'] = array('eq','3');
            if ($ids == 'all'){
                $memberList = $this->model
                    ->where($where)
                    ->where($baseWhere)
                    ->field('custom_content')
                    ->select();
            }else{
                $memberList = $this->model
                    ->where($pk, 'in', $ids)
                    ->where($where)
                    ->where($baseWhere)
                    ->field('custom_content')
                    ->select();
            }

            $memberList = collection($memberList)->toArray();

            foreach ($memberList as $k=>$v){
                if ($v['custom_content']){
                    $memberList[$k]['custom_content'] = json_decode($v['custom_content'],true);
                }
            }
            $newExcel = new Spreadsheet();  //创建一个新的excel文档
            $objSheet = $newExcel->getActiveSheet();  //获取当前操作sheet的对象
            $type_name = (new \app\admin\model\wdsxh\member\JoinConfig())->where('type',3)->value('name');
            if (empty($type_name)) {
                $type_name = '团体会员';
            }
            $objSheet->setTitle($type_name);  //设置当前sheet的标题

            list($person_fieldset,$organize_fieldset) = \app\admin\model\wdsxh\member\JoinConfig::organize_fieldset();
            $count_person_fieldset = count($person_fieldset);
            $organize_count = $count_person_fieldset + count($organize_fieldset); //16
            $labels = $this->byNumReturnLabels($organize_count);// 生成 A 到 Z 的数组作为列标的数组

            // 设置列宽度
            for ($i = 0; $i < count($labels); $i++) {
                $column = $labels[$i];
                $newExcel->getActiveSheet()->getColumnDimension($column)->setWidth(20);
            }

            for ($i = 0; $i < $count_person_fieldset; $i++) {//0-11
                $label = isset($person_fieldset[$i]['label']) ? $person_fieldset[$i]['label'] : '';
                $objSheet->setCellValue($labels[$i] . '1', $label);
            }

            for ($i = $count_person_fieldset; $i < $organize_count; $i++) {//11 12 13 14 15   //从11开始  总共16
                $key = $i - count($person_fieldset);
                $label = isset($organize_fieldset[$key]['label']) ? $organize_fieldset[$key]['label'] : '';
                $objSheet->setCellValue($labels[$i] . '1', $label);
            }

            $levelModel = new \app\admin\model\wdsxh\member\Level();
            $industryModel = new \app\admin\model\wdsxh\member\IndustryCategory();
            // 外部循环遍历 $sql 数组
            foreach ($memberList as $rowIndex => $row) {
                // 内部循环遍历 content 数组，设置每一行的值
                for ($j = 0; $j < count($row['custom_content']['person']); $j++) {
                    if($row['custom_content']['person'][$j]['type'] == 'cert'){
                        $value = !empty($row['custom_content']['person']['value']) ? wdsxh_full_url($row['custom_content']['person'][$j]['value']['image']) : '';
                    } elseif ($row['custom_content']['person'][$j]['field'] == 'address') {
                        $value = !empty($row['custom_content']['person'][$j]['value']) ? $row['custom_content']['person'][$j]['value']['address'] : '';
                    } else {
                        $value = isset($row['custom_content']['person'][$j]['value']) ? $row['custom_content']['person'][$j]['value'] : '';
                        if (in_array($row['custom_content']['person'][$j]['type'],['image','video'])) {
                            $value = wdsxh_full_url($value);
                            if (is_array($value)) {
                                $value = implode(',',$value);
                            }
                        }
                        if ($row['custom_content']['person'][$j]['field'] == 'member_level_id') {
                            $value = $levelModel->where('id',$value)->value('name');
                        }
                        if ($row['custom_content']['person'][$j]['field'] == 'industry_category_id') {
                            $value = $industryModel->where('id',$value)->value('name');
                        }
                    }
                    if (is_array($value)) {
                        $value = '';
                    }
                    $objSheet->setCellValue($labels[$j] . ($rowIndex + 2), ' '.$value);
                }
                for ($j = count($person_fieldset); $j < $organize_count; $j++) {
                    $key = $j - count($person_fieldset);
                    if (isset($row['custom_content']['organize'][$key])) {
                        if($row['custom_content']['organize'][$key]['type'] == 'cert'){
                            $value = !empty($row['custom_content']['organize']['value']) ? wdsxh_full_url($row['custom_content']['organize'][$key]['value']['image']) : '';
                        } elseif ($row['custom_content']['organize'][$key]['field'] == 'address') {
                            $value = !empty($row['custom_content']['organize'][$key]['value']) ? $row['custom_content']['organize'][$key]['value']['address'] : '';
                        } else {
                            $value = isset($row['custom_content']['organize'][$key]['value']) ? $row['custom_content']['organize'][$key]['value'] : '';
                            if (in_array($row['custom_content']['organize'][$key]['type'],['image','video'])) {
                                $value = wdsxh_full_url($value);
                                if (is_array($value)) {
                                    $value = implode(',',$value);
                                }
                            }
                            if ($row['custom_content']['organize'][$key]['field'] == 'member_level_id') {
                                $value = $levelModel->where('id',$value)->value('name');
                            }
                            if ($row['custom_content']['organize'][$key]['field'] == 'industry_category_id') {
                                $value = $industryModel->where('id',$value)->value('name');
                            }
                        }
                    }
                    $objSheet->setCellValue($labels[$j] . ($rowIndex + 2), ' '.$value);
                }
            }
            /*--------------下面是设置其他信息------------------*/
            $title = date("Ymd-".$type_name);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="' . $title . '.xlsx"');
            header('Cache-Control: max-age=0');
            $objWriter = IOFactory::createWriter($newExcel, 'Xlsx');
            $objWriter->save('php://output');
            return;

        }
    }

    /**
     * 导出模板
     */
    public function import_template()
    {
        if ($this->request->isPost()) {
            set_time_limit(0);
            ini_set('memory_limit', '2048M');
            $newExcel = new Spreadsheet();  //创建一个新的excel文档
            $objSheet = $newExcel->getActiveSheet();  //获取当前操作sheet的对象
            $type_name = (new \app\admin\model\wdsxh\member\JoinConfig())->where('type',3)->value('name');
            if (empty($type_name)) {
                $type_name = '团体会员';
            }
            $objSheet->setTitle($type_name);  //设置当前sheet的标题
            $person_fieldset = array (
                0 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'text',
                        'label' => '姓名',
                        'field' => 'name',
                        'option' => '请输入你的姓名',
                    ),
                1 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'number',
                        'label' => '手机号',
                        'field' => 'mobile',
                        'option' => '请输入你的手机号',
                    ),
                2 =>
                    array (
                        'show' => '1',
                        'required' => '1',
                        'type' => 'select',
                        'label' => '级别',
                        'field' => 'member_level_id',
                        'option' => '请选择会员级别',
                    ),

            );
            $count_person_fieldset = count($person_fieldset);
            $labels = $this->byNumReturnLabels($count_person_fieldset);// 生成 A 到 Z 的数组作为列标的数组

            // 设置列宽度
            for ($i = 0; $i < count($labels); $i++) {
                $column = $labels[$i];
                $newExcel->getActiveSheet()->getColumnDimension($column)->setWidth(20);
            }

            foreach ($person_fieldset as $k=>$v) {
                if(in_array($v['type'],['image','video','cert']) || in_array($v['field'],['address'])) {
                    unset($person_fieldset[$k]);
                }
            }
            $person_fieldset = array_values($person_fieldset);

            for ($i = 0; $i < count($person_fieldset); $i++) {
                $label = isset($person_fieldset[$i]['label']) ? $person_fieldset[$i]['label'] : '';
                $objSheet->setCellValue($labels[$i] . '1', $label);
            }
            /*--------------下面是设置其他信息------------------*/
            $title = date("Ymd-".$type_name."模板");

            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment;filename="' . $title . '.xlsx"');
            header('Cache-Control: max-age=0');
            $objWriter = IOFactory::createWriter($newExcel, 'Xlsx');
            $filename = $title.'.xlsx';
            ob_start();
            $objWriter->save('php://output');
            $xlsData = ob_get_contents();
            ob_end_clean();
            $this->success('请求成功','',['filename' => $filename, 'file' => "data:application/vnd.ms-excel;base64," . base64_encode($xlsData)]);
        }
    }

    public function seluser()
    {
        return;
    }

    public function member()
    {
        return;
    }

    public function activity_seluser()
    {
        return;
    }



}
