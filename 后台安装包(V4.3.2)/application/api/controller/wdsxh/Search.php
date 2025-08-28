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
namespace app\api\controller\wdsxh;

use app\admin\model\wdsxh\activity\ActivityConfig;
use app\admin\model\wdsxh\member\AuthConfig;
use app\api\model\wdsxh\activity\Activity;
use app\api\model\wdsxh\goods\Goods;
use app\api\model\wdsxh\UserWechat;
use app\common\controller\Api;

class Search  extends Api
{
    protected $noNeedLogin = ['*'];
    protected $noNeedRight = ['*'];

    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    /**
     * Desc 搜索数据
     * Create on 2025/8/12 下午5:56
     * Create by wangyafang
     */
    public function search_result()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }
        $keywords = $this->request->get('keywords');
        if (!$keywords) {
            $this->error('请输入搜索关键词');
        }
        $limit = $this->request->get('limit');
        if (!$limit) {
            $this->error('请输入条数');
        }

        $member_data = array();
        $unit_data = array();

        $activity_data = $this->search_activity_data($keywords,$limit);
        $article_data = $this->search_article_data($keywords,$limit);
        $goods_data = $this->search_goods_data($keywords,$limit);

        $unit_data = $this->search_unit($keywords,$limit);


        $member_details = (new AuthConfig())->where('id',1)->value('member_details');
        if ($member_details == 3) {
            if ($this->auth->isLogin()) {
                $current_date = date('Y-m-d',time());
                $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                    ->where('expire_time','>=',$current_date)
                    ->find();
                if ($memberObj) {
                    $unit_data = $this->search_unit($keywords,$limit);
                    $member_data = $this->inner_search_member_name($keywords,$limit);
                }
            }
        } else {
            $unit_data = $this->search_unit($keywords,$limit);
            $member_data = $this->inner_search_member_name($keywords,$limit);
        }

        $this->success('请求成功',[
            'member_data' => $member_data,
            'unit_data' => $unit_data,
            'activity_data' => $activity_data,
            'article_data' => $article_data,
            'goods_data' => $goods_data
        ]);
    }



    /**
     * Desc 搜索活动数据
     * Create on 2025/8/13 上午8:50
     * Create by wangyafang
     */
    private function search_activity_data($keywords,$limit){
        $expired_activity_show = (new ActivityConfig())->value('expired_activity_show');
        if ($expired_activity_show == 1) {
            $where['state'] = array('in',['1','2','3']);
        } else {
            $where['state'] = array('in',['1','2']);
        }

        $where['status'] = array('eq','normal');

        $where['name'] = array('like','%'.$keywords.'%');
        
        $order = 'weigh desc,id desc';

        $total = (new Activity())
            ->where($where)
            ->count();

        $data = (new Activity())
            ->where($where)
            ->limit($limit)
            ->field('id,name,start_time,address,images,organizing_method,activity_auth')
            ->order($order)
            ->select();

        foreach ($data as $k=>&$v) {
            $v->week = $this->getTimeWeek($v['start_time']);
            $v->start_time = date('m/d H:i',$v->start_time);
            $images = explode(',',$v->images);
            $v->images = $images[0];
        }

        return array(
            'total' => $total,
            'data' => $data
        );
    }

    private function getTimeWeek($time, $i = 0) {
        $weekarray = array("日","一", "二", "三", "四", "五", "六");
        $week = $weekarray[date("w",$time)];
        return "周".$week;
    }

    /**
     * Desc 搜索文章数据
     * Create on 2025/8/13 上午8:54
     * Create by wangyafang
     */
    private function search_article_data($keywords,$limit){
        $where['title'] = array('like','%'.$keywords.'%');
        $where['status'] = array('eq',1);

        $total = (new \app\api\model\wdsxh\article\Article())
            ->where($where)
            ->count();

        $data = (new \app\api\model\wdsxh\article\Article())
            ->where($where)
            ->field('id,title,type,image,createtime,link,read_num')
            ->limit($limit)
            ->order('createtime desc,weigh desc')
            ->select();

        return array(
            'total' => $total,
            'data' => $data
        );
    }

    /**
     * Desc 搜索商品数据
     * Create on 2025/8/13 上午8:54
     * Create by wangyafang
     */
    private function search_goods_data($keywords,$limit){
        $where['name'] = array('like','%'.$keywords.'%');
        $where['status'] = array('eq','normal');

        $total = (new Goods())
            ->where($where)
            ->count();

        $data = (new Goods())
            ->where($where)
            ->field('id,name,image,recommend_image,price')
            ->limit($limit)
            ->order('weigh desc,createtime desc')
            ->select();

        return array(
            'total' => $total,
            'data' => $data
        );
    }

    /**
     * Desc 搜索会员单位
     * Create on 2025/8/15 上午9:19
     * Create by wangyafang
     */
    private function search_unit($keywords,$limit) {
        $current_date = date('Y-m-d',time());
        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);
        $where['type'] = array('in',array('2','3'));

        $field = 'member.id,member.type,
        member.company_name,member.company_logo,member.company_introduction,
        member.organize_name,member.organize_logo,member.organize_introduction,
        level.name level_name';

        $order = "level.weigh asc,member.id asc";

        $total = (new \app\api\model\wdsxh\member\Member())
            ->alias('member')
            ->where(function ($query) use($keywords){
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'company_name','like','%'.$keywords.'%')
                    ->whereor($table_name.'organize_name','like','%'.$keywords.'%');
            })
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->count();;
        $data = (new \app\api\model\wdsxh\member\Member())
            ->alias('member')
            ->where(function ($query) use($keywords){
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'company_name','like','%'.$keywords.'%')
                    ->whereor($table_name.'organize_name','like','%'.$keywords.'%');
            })
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->field($field)->order($order)
            ->limit($limit)
            ->select();
        foreach ($data as &$v) {
            $v['name'] = $v['type'] == '2' ? $v['company_name'] : $v['organize_name'];
            $v['logo'] = $v['type'] == '2' ? $v['company_logo'] : $v['organize_logo'];
            $introduction = $v['type'] == '2' ? $v['company_introduction'] : $v['organize_introduction'];
            $v['introduction'] = strip_tags($introduction);
            $v->hidden(['company_name','company_logo','company_introduction','organize_name','organize_logo','organize_introduction']);

        }

        return array(
            'total' => $total,
            'data' => $data
        );
    }

    /** 内部调用搜索会员名称
     * Desc inner_search_member_name
     * Create on 2025/8/15 上午10:01
     * Create by wangyafang
     */
    private function inner_search_member_name($keywords,$limit)
    {
        $current_date = date('Y-m-d',time());


        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);



        $field = 'member.id,member.name,member.avatar,member.native_place,
        member.member_level_id,level.name level_name,member.latitude,member.longitude,
        industry_category.name industry_category_name';

        $order = "level.weigh asc,member.join_time asc,member.createtime asc";



        $total = (new \app\api\model\wdsxh\member\Member())
            ->where(function ($query) use($keywords){
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'name','like','%'.$keywords.'%');
            })
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->join('wdsxh_member_industry_category industry_category','industry_category.id = member.industry_category_id')
            ->count();

        $data = (new \app\api\model\wdsxh\member\Member())
            ->where(function ($query) use($keywords){
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'name','like','%'.$keywords.'%');
            })
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->join('wdsxh_member_industry_category industry_category','industry_category.id = member.industry_category_id')
            ->field($field)->order($order)
            ->limit($limit)
            ->select();
        foreach ($data as &$v) {
            if (!empty($longitude) && !empty($latitude) && !empty($v['longitude']) && !empty($v['latitude'])){
                $distance = wdsxh_distance($latitude,$longitude,$v['latitude'],$v['longitude']);
                if ($distance > 0) {
                    $v['distance'] = $distance;
                } else {
                    $v['distance'] = $distance;
                }
            } else {
                $v['distance'] = '';
            }
            $v->hidden(['member_level_id','latitude','longitude']);
        }
        return array(
            'total' => $total,
            'data' => $data
        );
    }

    /**
     * Desc  搜索会员名称
     * Create on 2025/8/15 9:53
     * Create by wangyafang
     */
    public function search_member_name()
    {
        if(!$this->request->isGet()) {
            $this->error('请求类型错误');
        }

        $member_details = (new AuthConfig())->where('id',1)->value('member_details');
        if ($member_details == 3) {
            if ($this->auth->isLogin()) {
                $current_date = date('Y-m-d',time());
                $wechat_id = (new UserWechat())->where('user_id',$this->auth->id)->value('id');
                $memberObj = (new \app\api\model\wdsxh\member\Member())->where('wechat_id',$wechat_id)
                    ->where('expire_time','>=',$current_date)
                    ->find();
                if (!$memberObj) {
                    $this->error('成为会员后可查看');
                }
            } else {
                $this->error('请登录后操作',null,401);
            }
        }


        $current_date = date('Y-m-d',time());

        $param = $this->request->get();

        //经度
        $longitude = $this->request->param('longitude','');
        //纬度
        $latitude = $this->request->param('latitude','');

        //模糊查询
        $page = isset($param['page']) ? $param['page'] : '';
        $limit = isset($param['limit']) ? $param['limit'] : 10;
        $table_name = config('database.prefix').'wdsxh_member.';
        $where[$table_name.'status'] = array('eq','normal');
        $where['expire_time'] = array('>=',$current_date);



        $field = 'member.id,member.name,member.avatar,member.native_place,
        member.member_level_id,level.name level_name,member.latitude,member.longitude,
        industry_category.name industry_category_name';

        $order = "level.weigh asc,member.join_time asc,member.createtime asc";

        $keywords = isset($param['keywords']) && !empty($param['keywords']) ? $param['keywords'] : '';


        $total = (new \app\api\model\wdsxh\member\Member())
            ->where(function ($query) use($keywords){
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'name','like','%'.$keywords.'%');
            })
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->join('wdsxh_member_industry_category industry_category','industry_category.id = member.industry_category_id')
            ->count();

        $data = (new \app\api\model\wdsxh\member\Member())
            ->where(function ($query) use($keywords){
                $table_name = config('database.prefix').'wdsxh_member.';
                $query->where($table_name.'name','like','%'.$keywords.'%');
            })
            ->alias('member')
            ->where($where)
            ->join('wdsxh_member_level level','level.id = member.member_level_id')
            ->join('wdsxh_member_industry_category industry_category','industry_category.id = member.industry_category_id')
            ->field($field)->order($order)
            ->page($page)->limit($limit)
            ->select();
        foreach ($data as &$v) {
            if (!empty($longitude) && !empty($latitude) && !empty($v['longitude']) && !empty($v['latitude'])){
                $distance = wdsxh_distance($latitude,$longitude,$v['latitude'],$v['longitude']);
                if ($distance > 0) {
                    $v['distance'] = $distance;
                } else {
                    $v['distance'] = $distance;
                }
            } else {
                $v['distance'] = '';
            }
            $v->hidden(['member_level_id','latitude','longitude']);
        }
        $this->success('请求成功',['total' => $total,'data' => $data]);
    }
}