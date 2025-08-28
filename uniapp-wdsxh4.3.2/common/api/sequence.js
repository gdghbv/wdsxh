// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 活动接龙接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------

export default {
	// 接龙列表
	chainsList: {
		url: '/api/wdsxh/jielong/index',
		method: 'GET',
	},
	// 接龙详情
	chainsDetails: {
		url: '/api/wdsxh/jielong/details',
		method: 'GET',
	},
	// 限定接龙资格
	chainsSeniority: {
		url: '/api/wdsxh/jielong/jielong_state',
		auth: true,
		method: 'GET',
	},
	// 获取反馈结果
	feedbackResult: {
		url: '/api/wdsxh/jielong/feedback_state',
		auth: true,
		method: 'GET',
	},
	// 提交反馈
	addFeedback: {
		url: '/api/wdsxh/jielong/add',
		auth: true,
		method: 'POST',
	},
	// 反馈详情
	feedbackDetails: {
		url: '/api/wdsxh/jielong/feedback_details',
		auth: true,
		method: 'POST',
	},
	// 接龙权限
	limit: {
		url: '/api/wdsxh/jielong/jielong_config',
		auth: true,
		method: 'GET',
	},
};