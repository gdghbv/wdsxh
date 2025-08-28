<?php
if (!function_exists('wdsxh_get_openid')) {
    function wdsxh_get_openid($wechat_id,$channel){
        if ($channel == 1) {
            $field = 'applet_openid';
        } else {
            $field = 'wananchi_openid';
        }
        $openid =\app\api\model\wdsxh\UserWechat::where('id',$wechat_id)->value($field);
        return $openid;
    }
}

if (!function_exists('wdsxh_full_url')) {
    /**
     * 补全url
     */
    function wdsxh_full_url($url,$ret=false)
    {
        if (empty($url)) {
            return '';
        }

        if(stripos($url,',') !== false){
            $urls=explode(',',$url);
            foreach ($urls as &$row){
                $row=wdsxh_full_url($row);
            }
            return $urls;
        }

        if (!wdsxh_is_url($url)){
            $url = cdnurl($url, true);
            if (!wdsxh_is_url($url)) {
                $url = request()->domain() . $url;
            }
        }
        return $ret?array($url):$url;
    }
}

if (!function_exists('wdsxh_is_url')) {
    /**
     * 是否url
     */
    function wdsxh_is_url($url)
    {
        $preg = "/http[s]?:\/\/[\w.]+[\w\/]*[\w.]*\??[\w=&\+\%]*/is";
        if (preg_match($preg, $url)) {
            return true;
        } else {
            return false;
        }
    }
}

if (!function_exists('wdsxh_create_order')) {
    /**
     * 创建订单编号
     */
    function wdsxh_create_order()
    {
        return date('YmdHis') . str_pad(mt_rand(0, 1000), '4', '0', STR_PAD_LEFT);
    }
}

if (!function_exists('remove_wdsxh_full_url')) {
    /**
     * 移除域名
     */
    function remove_wdsxh_full_url($url,$ret=false)
    {
        if(stripos($url,',') !== false){
            $urls=explode(',',$url);
            foreach ($urls as &$row){
                $row=remove_wdsxh_full_url($row);
            }
            return implode(',',$urls);
        }
        $url = remove_wdsxh_cdnurl($url);
        return $ret?array($url):$url;
    }
}

if (!function_exists('remove_wdsxh_cdnurl')) {

    /**
     * 移除上传资源的CDN的地址
     * @param string  $url    资源相对地址
     * @return string
     */
    function remove_wdsxh_cdnurl($url)
    {
        $cdnurl = \think\Config::get('upload.cdnurl');
        if (wdsxh_is_url($url)) {

            if($cdnurl) {
                $url = str_replace($cdnurl,'',$url);
            } else {
                $url = str_replace(request()->domain(),'',$url);
            }

        }
        return $url;
    }
}

if (!function_exists('wdsxh_create_order')) {
    /**
     * 创建订单编号
     */
    function wdsxh_create_order()
    {
        return date('YmdHis') . str_pad(mt_rand(0, 1000), '4', '0', STR_PAD_LEFT);
    }
}

if (!function_exists('wdsxh_distance')) {
    //计算经纬度距离（php 方法）
    function wdsxh_distance($lat1, $lon1, $lat2, $lon2) {
        $earthRadius = 6371000; // 地球半径，单位为米

        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        $deltaLat = $lat2 - $lat1;
        $deltaLon = $lon2 - $lon1;
        $a = sin($deltaLat / 2) * sin($deltaLat / 2) + cos($lat1) * cos($lat2) * sin($deltaLon / 2) * sin($deltaLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $earthRadius * $c;
        if ($distance < 1000){
            $rounded_number = round($distance, 2);  // 保留两位小数
            $distance_number = $rounded_number.'m';
        }else{
            $kilometers = $distance / 1000;  // 将米转换为千米
            $rounded_number = round($kilometers, 2);  // 保留两位小数
            $distance_number = $rounded_number.'km';
        }
        return $distance_number; // 返回结果保留小数点后两位
    }
}

if (!function_exists('wdsxh_mkdirs')) {
    //批量创建目录
    function wdsxh_mkdirs($path, $mode = "0755") {
        if(!is_dir($path)) { // 判断目录是否存在

            wdsxh_mkdirs(dirname($path), $mode); // 循环建立目录

            mkdir($path, $mode); // 建立目录

        }

        return true;
    }
}

if (!function_exists('wdsxh_hide_phone_number')) {

    function wdsxh_hide_phone_number($phoneNumber) {
        // 确保手机号格式正确（比如11位手机号）
        if (strlen($phoneNumber) == 11) {
            // 使用 substr 来提取手机号的前3位和后4位，中间部分用星号替代
            return substr($phoneNumber, 0, 3) . '****' . substr($phoneNumber, -4);
        } else {
            return "手机号格式不正确";
        }
    }
}

/**
 * @param $str 内容
 * @param $len 长度
 * @param string $suffix 后缀
 * @return string|string[]
 */
if (!function_exists('wdsxh_cut_str')) {
    function wdsxh_cut_str($str, $len, $suffix = "...")
    {
        $str = strip_tags($str);
        $str = str_replace("\r\n", "", $str);
        if (function_exists('mb_substr')) {
            if (strlen($str) > $len) {
                $str = mb_substr($str, 0, $len, 'utf-8') . $suffix;
            }
            return $str;
        } else {
            if (strlen($str) > $len) {
                $str = substr($str, 0, $len, 'utf-8') . $suffix;
            }
            return $str;
        }

    }
}

/**
 * Desc 更新数组字段相同数据
 * Create on 2025/3/14 13:36
 * Create by wangyafang
 */
if (!function_exists('wdsxh_update_array_child_fieldset')) {
    function wdsxh_update_array_child_fieldset($person_fieldset, $total_values) {
        // 将 $total_values 转换为一个哈希表，键为 'field'，值为 'val'
        $value_map = [];
        foreach ($total_values as $value) {
            $value_map[$value['field']] = $value['val'];
        }

        // 遍历 $person_fieldset 数组
        foreach ($person_fieldset as &$fieldset) {
            if (in_array($fieldset['field'],array('name','mobile','member_level_id','address','industry_category_id'))) {
                continue;
            }
            if (in_array($fieldset['type'],array('image','video','cert','file'))) {
                continue;
            }
            if (isset($value_map[$fieldset['label']])) {
                $fieldset['value'] = $value_map[$fieldset['label']];
            }

        }

        return $person_fieldset;
    }
}

/**
 * Desc 编辑器 XSS 过滤
 * Create on 2025/4/21 14:16
 * Create by wangyafang
 */
if (!function_exists('wdsxh_xss_filter')) {
    function wdsxh_xss_filter($content) {
        $config = \HTMLPurifier_Config::createDefault();
        $config->set('HTML.Allowed', 'p,br,b,strong,i,em,a[href|title],ul,ol,li,img[src|alt|title]');
        $config->set('HTML.Doctype', 'XHTML 1.0 Strict');
        $config->set('HTML.TidyLevel', 'medium');
        $config->set('AutoFormat.AutoParagraph', true);
        $config->set('AutoFormat.RemoveEmpty', true);
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true]);
        $config->set('URI.DisableExternal', false);  // 允许外部资源（图片）
        $config->set('URI.DisableResources', false); // 允许资源加载（图片）
        $config->set('Attr.AllowedFrameTargets', []);
        $config->set('Attr.EnableID', false);
        $config->set('Cache.DefinitionImpl', null); // 禁用缓存

        $purifier = new \HTMLPurifier($config);
        $content = $purifier->purify($content);
        return $content;
    }
}





