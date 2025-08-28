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
/**
 * Class Screen
 * Desc  数据大屏
 * Create on 2024/7/2 9:55
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use app\api\model\wdsxh\activity\Activity;
use app\api\model\wdsxh\member\Member;
use app\api\model\wdsxh\member\Visitor;
use app\common\controller\Api;
use app\api\model\wdsxh\business\Business;
use app\common\model\User;

class Screen extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * Desc 头部信息
     * Create on 2024/7/2 10:08
     * Create by wangyafang
     */
    public function header()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $data = (new \app\api\model\wdsxh\business\Association())->where('id',1)
            ->field('logo')
            ->find();
        $data['name'] = (new \app\admin\model\wdsxh\Config())->where('id',1)->value('data_screen_title');
        $this->success('请求成功',$data);
    }

    /**
     * Desc 行业会员数量
     * Create on 2024/7/2 10:19
     * Create by wangyafang
     */
    public function member_count()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $current_date = date('Y-m-d',time());
        $data = array(
            'platform'=>array(
                'total_user_count'         => User::count(),
                'today_user_count'   => User::whereTime('jointime', 'today')->count(),
            ),
            'member'=>array(
                'total_member_count'         => Member::where('expire_time','>=',$current_date)->count(),
                'today_member_count'   => Member::whereTime('createtime', 'today')->count(),
            ),
            'activity'=>array(
                'total_activity_count'         => Activity::where('status','normal')->count(),
                'today_activity_count'   => Activity::where('status','normal')->whereTime('createtime', 'today')->count(),
            ),
            'business'=>array(
                'total_business_count'         => Business::where('status','normal')->where('state','2')->count(),
                'today_business_count'   => Business::where('status','normal')->where('state','2')->whereTime('createtime', 'today')->count(),
            ),
        );
        $this->success('请求成功',$data);
    }

    /**
     * Desc 会员类型
     * Create on 2024/7/2 10:56
     * Create by wangyafang
     */
    public function member_type()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $current_date = date('Y-m-d',time());
        $data = array(
            'total_member_count'         => Member::where('expire_time','>=',$current_date)->count(),
            'person_member_count'         => Member::where('expire_time','>=',$current_date)->where('type','1')->count(),
            'company_member_count'         => Member::where('expire_time','>=',$current_date)->where('type','2')->count(),
            'organize_member_count'         => Member::where('expire_time','>=',$current_date)->where('type','3')->count(),
        );
        $this->success('请求成功',$data);
    }

    /**
     * Desc 上月用户访问情况
     * Create on 2024/7/2 11:10
     * Create by wangyafang
     */
    public function last_month_user_data()
    {
        //todo 展示数据大屏，显示会员头像
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $day_array = array();
        $count_array = array();
        for ($i = 30; $i >= 1 ; $i--) {
            $day_array[] = date("d",strtotime("-$i day"));
            $count_array[] = User::whereTime('logintime', 'between',[date("Y-m-d",strtotime("-$i day")).' 00:00:00', date("Y-m-d",strtotime("-$i day")).' 23:59:59'])->count();
        }
        $data = array(
            'day_array' =>$day_array,
            'count_array' =>$count_array,
        );
        $this->success('请求成功',$data);
    }

    public function last_month_user_data_bak()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $year_month = date('Y-m', strtotime('-1 month'));
        $last_month_count = date('t', strtotime('-1 month'));
        $day_array = array();
        $count_array = array();
        for ($i = 1; $i <= $last_month_count ; $i++) {
            $day_array[] = $i;
            $count_array[] = User::whereTime('logintime', 'between',[$year_month.'-'.$i.' 00:00:00', $year_month.'-'.$i.' 23:59:59'])->count();
        }
        $data = array(
            'day_array' =>$day_array,
            'count_array' =>$count_array,
        );
        $this->success('请求成功',$data);
    }

    /**
     * Desc 商会活动
     * Create on 2024/7/2 10:58
     * Create by wangyafang
     */
    public function activity()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $data = array(
            'total_count'         => Activity::where('status','normal')->count(),
            'apply_count'         => Activity::where('status','normal')->where('state','1')->count(),
            'progress_count'         => Activity::where('status','normal')->where('state','2')->count(),
            'end_count'         => Activity::where('status','normal')->where('state','3')->count(),
        );
        $this->success('请求成功',$data);
    }

    /**
     * Desc 会员列表
     * Create on 2024/7/2 11:40
     * Create by wangyafang
     */
    public function member_list()
    {
        //todo 展示数据大屏，显示会员头像
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $field = 'member.name,member.avatar,member.member_level_name,member.industry_category_name,member.join_time';

        $order = "level.weigh asc,member.id asc";

        $current_date = date('Y-m-d',time());
        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);
        $data = (new Member())
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)->order($order)
            ->select();
        $data = collection($data)->toArray();
        $result = array();
        foreach ($data as $v) {
            $result[] = array(
                0=>$v['avatar'],
                1=>$v['name'],
                2=>$v['member_level_name'],
                3=>$v['industry_category_name'],
                4=>$v['join_time'],
            );
        }

        $this->success('请求成功',$result);
    }

    /**
     * Desc 会员行业
     * Create on 2024/7/2 11:55
     * Create by wangyafang
     */
    public function member_industry()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $data = (new Member())
            ->field('industry_category_name,count(industry_category_id) count')
            ->group('industry_category_id')
            ->order('count desc')
            ->select();
        $category_array = array();
        $count_array = array();
        $data = collection($data)->toArray();
        foreach ($data as $k=>$v) {
            $category_array[] = $v['industry_category_name'];
            $count_array[] = $v['count'];
        }

        $result = array(
            'category_array'=>$category_array,
            'count_array'=>$count_array,
        );

        $this->success('请求成功',$result);
    }

    /**
     * Desc 会员本月新增
     * Create on 2024/7/2 13:55
     * Create by wangyafang
     */
    public function member_this_month_new()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $current_date = date('Y-m-d',time());
        $data = array(
            'person_count'=>Member::where('expire_time','>=',$current_date)->whereTime('createtime', 'month')->where('type','1')->count(),
            'company_count'=>Member::where('expire_time','>=',$current_date)->whereTime('createtime', 'month')->where('type','2')->count(),
            'organize_count'=>Member::where('expire_time','>=',$current_date)->whereTime('createtime', 'month')->where('type','3')->count(),
        );
        $this->success('请求成功',$data);
    }

    /**
     * Desc 会员当日访问频率
     * Create on 2024/7/2 13:55
     * Create by wangyafang
     */
    public function member_daily_visit_frequency()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $time_slot = array(
            '00:00',
            '03:00',
            '06:00',
            '09:00',
            '12:00',
            '15:00',
            '18:00',
            '21:00',
        );
        $current_time = time();
        $time = array();
        $person_count = array();
        $company_count = array();
        $organize_count = array();
        $current_date = date('Y-m-d',time());
        $where['expire_time'] = array('>=',$current_date);
        $person_member_id_array = (new Member())
            ->where($where)
            ->where('type','1')
            ->column('id');
        $company_member_id_array = (new Member())
            ->where($where)
            ->where('type','2')
            ->column('id');
        $organize_member_id_array = (new Member())
            ->where($where)
            ->where('type','3')
            ->column('id');
        foreach ($time_slot as $v) {
            $time[] = $v;
            $tem = date('Y-m-d',time()).' '.$v.':00';
            if ($current_time >= strtotime($tem)) {
                switch ($v) {
                    case '00:00':
                        $whereTime = [$current_date.' 00:00:00', $current_date.' 00:00:00'];
                        break;
                    case '03:00':
                        $whereTime = [$current_date.' 00:00:01', $current_date.' 03:00:00'];
                        break;
                    case '06:00':
                        $whereTime = [$current_date.' 03:00:01', $current_date.' 06:00:00'];
                        break;
                    case '09:00':
                        $whereTime = [$current_date.' 06:00:01', $current_date.' 09:00:00'];
                        break;
                    case '12:00':
                        $whereTime = [$current_date.' 09:00:01', $current_date.' 12:00:00'];
                        break;
                    case '15:00':
                        $whereTime = [$current_date.' 12:00:01', $current_date.' 15:00:00'];
                        break;
                    case '18:00':
                        $whereTime = [$current_date.' 15:00:01', $current_date.' 18:00:00'];
                        break;
                    case '21:00':
                        $whereTime = [$current_date.' 18:00:01', $current_date.' 23:59:59'];
                        break;
                }
                $person_count[] = Visitor::where('member_id','in',$person_member_id_array)->whereTime('createtime', 'between',$whereTime)->count();
                $company_count[] = Visitor::where('member_id','in',$company_member_id_array)->whereTime('createtime', 'between',$whereTime)->count();
                $organize_count[] = Visitor::where('member_id','in',$organize_member_id_array)->whereTime('createtime', 'between',$whereTime)->count();
            }
        }
        $result = array(
            'time'=>$time,
            'person_count'=>$person_count,
            'company_count'=>$company_count,
            'organize_count'=>$organize_count,
        );
        $this->success('请求成功',$result);
    }
}



 