<?php

namespace app\api\model\wdsxh;

use think\Model;

/**
 * Class Base
 * Desc  基础Model
 * Create on 2024/3/11 11:53
 * Create by wangyafang
 */

class Base extends Model
{
    protected function getImageAttr($value)
    {
        return wdsxh_full_url($value);
    }

    protected function getAvatarAttr($value)
    {
        return wdsxh_full_url($value);
    }

    protected function getImagesAttr($value)
    {
        $array = explode(',',$value);
        foreach ($array as $k=>$v) {
            $array[$k] = wdsxh_full_url($v);
        }
        return implode(',',$array);
    }

    protected function getFilesAttr($value)
    {
        $array = explode(',',$value);
        foreach ($array as $k=>$v) {
            $array[$k] = wdsxh_full_url($v);
        }
        return implode(',',$array);
    }

    protected function setImagesAttr($value)
    {
        $value = remove_wdsxh_full_url($value);
        return $value;
    }

    protected function setImageAttr($value)
    {
        $value = remove_wdsxh_full_url($value);
        return $value;
    }

    protected function setBackgroundImageAttr($value)
    {
        $value = remove_wdsxh_full_url($value);
        return $value;
    }
}



 