<?php

namespace app\admin\controller\wdsxh;

use app\admin\model\User;
use app\admin\model\wdsxh\member\MemberApply;
use app\admin\model\wdsxh\member\Pay;
use app\common\controller\Backend;
use app\common\model\Attachment;
use fast\Date;
use think\Db;

/**
 * 控制台
 *
 * @icon   fa fa-dashboard
 * @remark 用于展示当前系统中的统计数据、统计报表及重要实时数据
 */
class Dashboard extends Backend
{

    /**
     * 查看
     */
    public function index()
    {
        try {
            \think\Db::execute("SET @@sql_mode='';");
        } catch (\Exception $e) {

        }
        $column = [];
        $starttime = Date::unixtime('day', -6);
        $endtime = Date::unixtime('day', 0, 'end');
        $joinlist = Db("user")->where('jointime', 'between time', [$starttime, $endtime])
            ->field('jointime, status, COUNT(*) AS nums, DATE_FORMAT(FROM_UNIXTIME(jointime), "%Y-%m-%d") AS join_date')
            ->group('join_date')
            ->select();
        for ($time = $starttime; $time <= $endtime;) {
            $column[] = date("Y-m-d", $time);
            $time += 86400;
        }
        $userlist = array_fill_keys($column, 0);
        foreach ($joinlist as $k => $v) {
            $userlist[$v['join_date']] = $v['nums'];
        }

        $dbTableList = Db::query("SHOW TABLE STATUS");
        $totalworkingaddon = 0;
        $current_date = date('Y-m-d',time());
        $member_count = (new \app\api\model\wdsxh\member\Member())->where('expire_time','>=',$current_date)->count();
        $personal_count = (new \app\api\model\wdsxh\member\Member())->where('type',1)->where('expire_time','>=',$current_date)->count();
        $enterprise_count = (new \app\api\model\wdsxh\member\Member())->where('type',2)->where('expire_time','>=',$current_date)->count();
        $group_count = (new \app\api\model\wdsxh\member\Member())->where('type',3)->where('expire_time','>=',$current_date)->count();
        $memberPayModel = new Pay();
        $memberPayWhere['channel'] = array('in',['1','2']);
        $memberPayWhere['pay_method'] = array('in',['2','3','4']);
        $person_type_name = (new \app\admin\model\wdsxh\member\JoinConfig())->where('type',1)->value('name');
        if (empty($person_type_name)) {
            $person_type_name = '个人会员';
        }
        $company_type_name = (new \app\admin\model\wdsxh\member\JoinConfig())->where('type',2)->value('name');
        if (empty($person_type_name)) {
            $company_type_name = '企业会员';
        }
        $organize_type_name = (new \app\admin\model\wdsxh\member\JoinConfig())->where('type',3)->value('name');
        if (empty($person_type_name)) {
            $organize_type_name = '团体会员';
        }
        $this->view->assign([
            'totaluser'         => User::count(),
            'member_count'        => $member_count,
            'group_count'        => $group_count,
            'enterprise_count'        => $enterprise_count,
            'totalcategory'     => \app\common\model\Category::count(),
            'todayusersignup'   => User::whereTime('jointime', 'today')->count(),
            'todayuserlogin'    => User::whereTime('logintime', 'today')->count(),
            'sevendau'          => User::whereTime('jointime|logintime|prevtime', '-7 days')->count(),
            'thirtydau'         => User::whereTime('jointime|logintime|prevtime', '-30 days')->count(),
            'threednu'          => User::whereTime('jointime', '-3 days')->count(),
            'sevendnu'          => User::whereTime('jointime', '-7 days')->count(),
            'dbtablenums'       => count($dbTableList),
            'dbsize'            => array_sum(array_map(function ($item) {
                return $item['Data_length'] + $item['Index_length'];
            }, $dbTableList)),
            'totalworkingaddon' => $totalworkingaddon,
            'attachmentnums'    => Attachment::count(),
            'attachmentsize'    => Attachment::sum('filesize'),
            'picturenums'       => Attachment::where('mimetype', 'like', 'image/%')->count(),
            'picturesize'       => Attachment::where('mimetype', 'like', 'image/%')->sum('filesize'),
            'personal_count'    => $personal_count,
            'member_apply_pend_count'=>(new MemberApply())->where('child_state','in',['1','4'])->count(),
            'member_apply_pend_amount'=>$memberPayModel->where($memberPayWhere)->where('paid','1')->sum('fees'),
            'member_apply_paid_amount'=>$memberPayModel->where($memberPayWhere)->where('paid','2')->sum('fees'),
            'person_type_name'=>$person_type_name,
            'company_type_name'=>$company_type_name,
            'organize_type_name'=>$organize_type_name,

        ]);

        $this->assignconfig('column', array_keys($userlist));
        $this->assignconfig('userdata', array_values($userlist));

        return $this->view->fetch();
    }

}
