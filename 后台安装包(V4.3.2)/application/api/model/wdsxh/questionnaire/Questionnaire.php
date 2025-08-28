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
 * Class Questionnaire
 * Desc  证书模型
 * Create on 2024/3/19 15:49
 * Create by @小趴菜
 */

namespace app\api\model\wdsxh\questionnaire;


use app\api\model\wdsxh\Base;
use traits\model\SoftDelete;

class Questionnaire extends Base
{
// 表名
    protected $name = 'wdsxh_questionnaire';

    use SoftDelete;

    protected $deleteTime = 'deletetime';
}



 