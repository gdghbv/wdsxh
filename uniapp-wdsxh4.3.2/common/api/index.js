// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

import main from "./main.js"
import login from "./login.js"
import mine from "./mine.js"
import member from "./member.js"
import mall from "./mall.js"
import demand from "./demand.js"
import activity from "./activity.js"
import album from "./album.js"
import sequence from "./sequence.js"
import questionnaire from "./questionnaire.js"
import card from "./card.js"
import institution from "./institution.js"
export default {
	// 公共模块
	main,
	// 登录模块
	login,
	// 个人中心模块
	mine,
	// 会员模块
	member,
	// 商城模块
	mall,
	// 供需模块
	demand,
	// 活动模块
	activity,
	// 商会相册模块
	album,
	// 活动接龙模块
	sequence,
	// 问卷调查模块
	questionnaire,
	// 电子名片模块
	card,
	// 机构模块
	institution,
};