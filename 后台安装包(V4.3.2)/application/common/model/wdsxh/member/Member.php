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
namespace app\common\model\wdsxh\member;
use app\admin\model\wdsxh\member\FeesConfig;
use app\admin\model\wdsxh\member\IndustryCategory;
use app\admin\model\wdsxh\member\Level;
use think\Config;

/**
 * Class Member
 * Desc  会员模型
 * Create on 2024/3/20 15:36
 * Create by wangyafang
 */
class Member extends \think\Model
{
// 表名
    protected $name = 'wdsxh_member';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    public static function get_member_data($memberApplyObj) {
        $memberLevelModel = new Level();
        $member_level_name = $memberLevelModel->where('id',$memberApplyObj['member_level_id'])->value('name');
        $join_time = date('Y-m-d',time());
        $nativePlaceArray = explode('/',$memberApplyObj['native_place']);
        $member_data = array(
            'type'=>$memberApplyObj['type'],
            'wechat_id'=>$memberApplyObj['wechat_id'],
            'name'=>$memberApplyObj['name'],
            'avatar'=>$memberApplyObj['avatar'],
            'mobile'=>$memberApplyObj['mobile'],
            'member_level_id'=>$memberApplyObj['member_level_id'],
            'member_level_name'=>$member_level_name,
            'custom_content'=>$memberApplyObj['custom_content'],
            'letter'=>self::getFirstCharter($memberApplyObj['name']),
            'join_time'=>$join_time,
            'industry_category_id'=>$memberApplyObj['industry_category_id'],
            'industry_category_name'=>$memberApplyObj['industry_category_name'],
            'native_place' => $memberApplyObj['native_place'],
            'introduce_content' => $memberApplyObj['introduce_content'],
            'area_letter'=>count($nativePlaceArray) == 3 ? self::getFirstCharter($nativePlaceArray[2]) : '',
        );
        if (!empty($memberApplyObj['address'])) {
            $address_array = json_decode($memberApplyObj['address'],true);
            if (isset($address_array['name']) && !empty($address_array['name'])) {
                $member_data['address'] = $address_array['name'];
            } elseif (isset($address_array['address']) && !empty($address_array['address'])) {
                $member_data['address'] = $address_array['address'];
            } else {
                $member_data['address'] = '';
            }
            $member_data['longitude'] = isset($address_array['longitude']) ? $address_array['longitude'] : '';
            $member_data['latitude'] = isset($address_array['latitude']) ? $address_array['latitude'] : '';
        }

        switch ($memberApplyObj['type']) {
            case 2:
                $member_data['company_name'] = $memberApplyObj['company_name'];
                $member_data['company_logo'] = $memberApplyObj['company_logo'];
                $member_data['company_introduction'] = $memberApplyObj['company_introduction'];
                $member_data['company_position'] = $memberApplyObj['company_position'];
                break;
            case 3:
                $member_data['organize_name'] = $memberApplyObj['organize_name'];
                $member_data['organize_logo'] = $memberApplyObj['organize_logo'];
                $member_data['organize_introduction'] = $memberApplyObj['organize_introduction'];
                $member_data['organize_position'] = $memberApplyObj['organize_position'];
                break;
        }

        $member_data['expire_time'] = self::get_expire_time($join_time);

        return $member_data;
    }

    //获取到期时间
    public static function get_expire_time($join_time)
    {
        $feesConfigObj = (new \app\admin\model\wdsxh\member\FeesConfig())->get(1);
        if ($feesConfigObj['expire_time_type'] == '1') {//自由时间
            $days = $feesConfigObj['days'];
            $expire_time = date('Y-m-d',strtotime("{$join_time} +$days day"));
        } else {
            $expire_time = $feesConfigObj['fixed_date'];
        }
        return $expire_time;
    }

    //php获取中文字符拼音首字母

    public static function getFirstCharter($str)
    {
        if (empty($str)) {
            return '';
        }

        if (!preg_match('/[\x{4e00}-\x{9fa5}]/u', $str)) {
            return '';
        }


        $fchar = ord($str[0]);

        if ($fchar >= ord('A') && $fchar <= ord('z')) return strtoupper($str[0]);

        $s1 = iconv('UTF-8', 'gbk', $str);

        $s2 = iconv('gbk', 'UTF-8', $s1);

        $s = $s2 == $str ? $s1 : $str;

        $asc = ord($s[0]) * 256 + ord($s[1]) - 65536;

        if ($asc >= -20319 && $asc <= -20284) return 'A';

        if ($asc >= -20283 && $asc <= -19776) return 'B';

        if ($asc >= -19775 && $asc <= -19219) return 'C';

        if ($asc >= -19218 && $asc <= -18711) return 'D';

        if ($asc >= -18710 && $asc <= -18527) return 'E';

        if ($asc >= -18526 && $asc <= -18240) return 'F';

        if ($asc >= -18239 && $asc <= -17923) return 'G';

        if ($asc >= -17922 && $asc <= -17418) return 'H';

        if ($asc>=-17417 && $asc<=-16475) return 'J';

        if ($asc>=-16474 && $asc<=-16213) return 'K';

        if ($asc>=-16212 && $asc<=-15641) return 'L';

        if ($asc>=-15640 && $asc<=-15166) return 'M';

        if ($asc>=-15165 && $asc<=-14923) return 'N';

        if ($asc>=-14922 && $asc<=-14915) return 'O';

        if ($asc>=-14914 && $asc<=-14631) return 'P';

        if ($asc>=-14630 && $asc<=-14150) return 'Q';

        if ($asc>=-14149 && $asc<=-14091) return 'R';

        if ($asc>=-14090 && $asc<=-13319) return 'S';

        if ($asc>=-13318 && $asc<=-12839) return 'T';

        if ($asc>=-12838 && $asc<=-12557) return 'W';

        if ($asc>=-12556 && $asc<=-11848) return 'X';

        if ($asc>=-11847 && $asc<=-11056) return 'Y';

        if ($asc>=-11055 && $asc<=-10247) return 'Z';

        return null;
    }

    public static function get_custom_data($row)
    {
        $custom_content = array();
        switch ($row['type']) {
            case 1:
                $custom_content = self::person_data($row['custom_content']);
                break;
            case 2:
                $custom_content = self::company_data($row['custom_content']);
                break;
            case 3:
                $custom_content = self::organize_data($row['custom_content']);
                break;
        }
        return $custom_content;
    }

    public static function person_data($custom_content)
    {
        $uploadConfig = Config::get("upload");
        $custom_content = json_decode($custom_content,true);
        foreach ($custom_content as $k=>&$v) {

            if ($v['field'] == 'member_level_id') {
                $custom_content[$k]['value'] = (new Level())->where('id',$v['value'])->value('name');
            }
            if ($v['field'] == 'industry_category_id') {
                $custom_content[$k]['value'] = (new IndustryCategory())->where('id',$v['value'])->value('name');
            }
            if ($v['field'] == 'address') {
                $custom_content[$k]['value'] = $v['value']['address'];
            }
            if ($uploadConfig['storage'] != 'local') {
                if (in_array($v['type'],['image','video','file'])) {
                    $v['value'] = self::get_string_full_url($v['value']);
                }
                if (in_array($v['type'],['cert'])) {
                    $v['value']['image'] = self::get_string_full_url($v['value']['image']);
                }
            }
        }
        return $custom_content;
    }

    public static function company_data($custom_content)
    {
        $uploadConfig = Config::get("upload");
        $array = array();
        $custom_content = json_decode($custom_content,true);
        foreach ($custom_content['person'] as $k=>&$v) {
            if ($v['field'] == 'member_level_id') {
                $v['value'] = (new Level())->where('id',$v['value'])->value('name');
            }
            if ($v['field'] == 'industry_category_id') {
                $v['value'] = (new IndustryCategory())->where('id',$v['value'])->value('name');
            }
            if ($v['field'] == 'address') {
                $v['value'] = $v['value']['address'];
            }
            if ($uploadConfig['storage'] != 'local') {
                if (in_array($v['type'],['image','video','file'])) {
                    $v['value'] = self::get_string_full_url($v['value']);
                }
                if (in_array($v['type'],['cert'])) {
                    $v['value']['image'] = self::get_string_full_url($v['value']['image']);
                }
            }
            $array[] = $v;
        }

        foreach ($custom_content['company'] as $k=>&$v) {
            if ($uploadConfig['storage'] != 'local') {
                if (in_array($v['type'],['image','video','file'])) {
                    $v['value'] = self::get_string_full_url($v['value']);
                }
                if (in_array($v['type'],['cert'])) {
                    $v['value']['image'] = self::get_string_full_url($v['value']['image']);
                }
            }
            $array[] = $v;
        }
        return $array;
    }

    public static function organize_data($custom_content)
    {
        $uploadConfig = Config::get("upload");
        $array = array();
        $custom_content = json_decode($custom_content,true);
        foreach ($custom_content['person'] as $k=>&$v) {
            if ($v['field'] == 'member_level_id') {
                $v['value'] = (new Level())->where('id',$v['value'])->value('name');
            }
            if ($v['field'] == 'industry_category_id') {
                $v['value'] = (new IndustryCategory())->where('id',$v['value'])->value('name');
            }
            if ($v['field'] == 'address') {
                $v['value'] = $v['value']['address'];
            }
            if ($uploadConfig['storage'] != 'local') {
                if (in_array($v['type'],['image','video','file'])) {
                    $v['value'] = self::get_string_full_url($v['value']);
                }
                if (in_array($v['type'],['cert'])) {
                    $v['value']['image'] = self::get_string_full_url($v['value']['image']);
                }
            }
            $array[] = $v;
        }
        foreach ($custom_content['organize'] as $k=>&$v) {
            if ($uploadConfig['storage'] != 'local') {
                if (in_array($v['type'],['image','video','file'])) {
                    $v['value'] = self::get_string_full_url($v['value']);
                }
                if (in_array($v['type'],['cert'])) {
                    $v['value']['image'] = self::get_string_full_url($v['value']['image']);
                }
            }
            $array[] = $v;
        }
        return $array;
    }

    public static function get_custom_content_full_image($type,$custom_content = '')
    {
        $custom_content = json_decode($custom_content,true);
        if ($type == '1') {
            return self::get_person_full_image($custom_content);
        } elseif ($type == '2') {
            $result = array(
                'person'=>self::get_person_full_image($custom_content['person']),
                'company'=>self::get_person_full_image($custom_content['company']),
            );
            return $result;
        } elseif ($type == '3') {
            $result = array(
                'person'=>self::get_person_full_image($custom_content['person']),
                'organize'=>self::get_person_full_image($custom_content['organize']),
            );
            return $result;
        }
    }

    public static function get_person_full_image($custom_content = array())
    {
        foreach ($custom_content as $k=>$v) {
            if (in_array($v['type'],array('image','video'))) {
                $custom_content[$k]['value'] = wdsxh_full_url($v['value']);
                if(is_array($custom_content[$k]['value'])){
                    $custom_content[$k]['value'] = implode(',',$custom_content[$k]['value']);
                }
            }
            if ($v['type'] == 'cert' && !empty($v['value']['image'])) {
                $custom_content[$k]['value']['image'] = wdsxh_full_url($v['value']['image']);
            }
        }
        return $custom_content;
    }

    public static function remove_custom_content_full_image($type,$custom_content = '')
    {
        $result = array();
        $custom_content = json_decode($custom_content,true);
        if ($type == '1') {
            $result = self::remove_person_full_image($custom_content);
        } elseif ($type == '2') {
            $result = array(
                'person'=>self::remove_person_full_image($custom_content['person']),
                'company'=>self::remove_person_full_image($custom_content['company']),
            );

        } elseif ($type == '3') {
            $result = array(
                'person'=>self::remove_person_full_image($custom_content['person']),
                'organize'=>self::remove_person_full_image($custom_content['organize']),
            );
        }
        return json_encode($result);
    }

    public static function remove_person_full_image($custom_content = array())
    {
        foreach ($custom_content as $k=>$v) {
            if (in_array($v['type'],array('image','video'))) {
                $custom_content[$k]['value'] = remove_wdsxh_full_url($v['value']);
            }
            if ($v['type'] == 'cert' && !empty($v['value']['image'])) {
                $custom_content[$k]['value']['image'] = remove_wdsxh_full_url($v['value']['image']);
            }
        }
        return $custom_content;
    }

    public static function get_string_full_url($url)
    {
        if(stripos($url,',') !== false){
            $urls=explode(',',$url);
            foreach ($urls as &$row){
                $row=wdsxh_full_url($row);
            }
            return implode(',',$urls);
        }

        if (!wdsxh_is_url($url)){
            $url = cdnurl($url, true);
            if (!wdsxh_is_url($url)) {
                $url = request()->domain() . $url;
            }
        }
        return $url;
    }
}



 