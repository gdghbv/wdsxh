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
namespace app\api\validate\wdsxh\corporate;

use app\api\model\wdsxh\activity\Activity;
use think\Validate;

/**
 * Class ActivityApply
 * Desc  活动申请校验
 * Create on 2024/3/12 10:07
 * Create by wangyafang
 */
class Card extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'card_background_image'=>'require',
        'share_title'=>'require',
        'font_color'=>'require',
        'name'=>'require',
        'avatar'=>'require',
        'image'=>'require',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'card_background_image.require'=>'请选择名片样式',
        'share_title.require'=>'请输入分享标题',
        'font_color.require'=>'请选择字体颜色',
        'name.require'=>'请填写姓名',
        'avatar.require'=>'请上传名片头像',
        'image.require'=>'生成图片不能为空',
    ];

}



 