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
 * Class UserWechatPointsLog
 * Desc  微信用户积分日志Model
 * Create on 2025/3/11 8:47
 * Create by wangyafang
 */

namespace app\common\model\wdsxh\points;

use app\api\model\wdsxh\UserWechat;
use think\Db;
use think\Exception;
use think\exception\PDOException;
use think\exception\ValidateException;
use think\Model;

class UserWechatPointsLog extends Model
{
// 表名
    protected $name = 'wdsxh_user_wechat_points_log';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = true;

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = false;
    protected $deleteTime = false;

    /**
     * Desc 活动积分
     * @param $change 1增加积分 2减少积分
     * Create on 2025/3/11 9:10
     * Create by wangyafang
     */
    public static function activity($change, $avtivityApplyObj, $activityObj ,$memo)
    {
        $userWeachatObj = (new UserWechat())->get($avtivityApplyObj['wechat_id']);
        if ($change == 1) {
            $after = bcadd($userWeachatObj['points'],$activityObj['points']);
        } else {
            $after = bcsub($userWeachatObj['points'],$activityObj['points']);
        }
        $pointsLogData = array(
            'wechat_id'=>$avtivityApplyObj['wechat_id'],
            'points'=>$activityObj['points'],
            'before'=>$userWeachatObj['points'],
            'after'=>$after,
            'memo'=>$memo,
            'change'=>$change,
            'activity_id'=>$activityObj['id'],
            'source'=>1,
        );
        self::handle($pointsLogData,$userWeachatObj);
    }

    /**
     * Desc 处理积分
     * @param $pointsLogData 积分数据
     * @param $userWeachatObj 微信用户数据
     * Create on 2025/3/11 9:10
     * Create by wangyafang
     */
    private static function handle($pointsLogData,$userWeachatObj)
    {
        $pointsLogModel = new UserWechatPointsLog();
        try{
            $pointsLogModel->data($pointsLogData);
            $pointsLogModel->allowField(true)->save();
            $userWeachatObj->points = $pointsLogData['after'];
            $userWeachatObj->save();
        } catch (ValidateException|PDOException|Exception $e) {
            Db::rollback();
            error_log('PointsLog error: ' . $e->getMessage());
        }
    }
}



 