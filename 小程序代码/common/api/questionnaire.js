// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 问卷调查接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------

export default {
	// 问卷列表
	questionList: {
		url: '/api/wdsxh/questionnaire/index/index',
		method: 'GET',
	},
	// 问卷详情
	questionDetails: {
		url: '/api/wdsxh/questionnaire/index/details',
		method: 'GET',
	},
	// 问卷提交
	questionAdd: {
		url: '/api/wdsxh/questionnaire/index/add_topic',
		auth: true,
		method: 'POST',
	},
	// 问卷反馈详情
	renderDetails: {
		url: '/api/wdsxh/questionnaire/index/render_details',
		auth: true,
		method: 'GET',
	},
	// 问卷权限
	limit: {
		url: '/api/wdsxh/questionnaire/index/answer_sheet_status',
		auth: true,
		method: 'GET',
	},
};