// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 机构管理接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

export default {
	// 机构列表
	list: {
		url: '/api/wdsxh/institution/institution/index',
		method: 'GET',
	},
	// 机构详情
	details: {
		url: '/api/wdsxh/institution/institution/details',
		method: 'GET',
	},
	// 成员列表
	member: {
		url: '/api/wdsxh/institution/member/index',
		method: 'GET',
	},
	// 机构权限
	limit: {
		url: '/api/wdsxh/institution/institution/institution_config',
		method: 'GET',
	},
	// 申请加入
	apply: {
		url: '/api/wdsxh/institution/institution_member_apply/submit',
		auth: true,
		method: 'POST',
	},
	// 机构级别
	level: {
		url: '/api/wdsxh/institution/level/index',
		method: 'GET',
	},
	// 申请详情
	applyDetails: {
		url: '/api/wdsxh/institution/institution_member_apply/details',
		auth: true,
		method: 'GET',
	},
};