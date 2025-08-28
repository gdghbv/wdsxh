// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 电子名片接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

export default {
	// 名片列表
	list: {
		url: '/api/wdsxh/corporate/card/index',
		auth: true,
		method: 'GET',
	},
	// 名片详情
	details: {
		url: '/api/wdsxh/corporate/card/details',
		auth: true,
		method: 'GET',
	},
	// 名片统计
	statistics: {
		url: '/api/wdsxh/corporate/card/center',
		auth: true,
		method: 'GET',
	},
	// 名片样式
	background: {
		url: '/api/wdsxh/corporate/card_background/index',
		method: 'GET',
	},
	// 添加名片
	add: {
		url: '/api/wdsxh/corporate/card/add',
		auth: true,
		method: 'POST',
	},
	// 编辑名片
	edit: {
		url: '/api/wdsxh/corporate/card/edit',
		auth: true,
		method: 'POST',
	},
	// 编辑详情
	editDetails: {
		url: '/api/wdsxh/corporate/card/edit_details',
		auth: true,
		method: 'GET',
	},
	// 删除名片
	delete: {
		url: '/api/wdsxh/corporate/card/del',
		auth: true,
		method: 'POST',
	},
	// 设置默认名片
	setDefault: {
		url: '/api/wdsxh/corporate/card/set_default',
		auth: true,
		method: 'POST',
	},
	// 获取默认名片
	getDefault: {
		url: '/api/wdsxh/corporate/card/default_card',
		auth: true,
		method: 'GET',
	},
	// 设置名片靠谱
	setReliable: {
		url: '/api/wdsxh/corporate/reliable/reliable',
		auth: true,
		method: 'POST',
	},
	// 取消名片靠谱
	cancelReliable: {
		url: '/api/wdsxh/corporate/reliable/cancel',
		auth: true,
		method: 'POST',
	},
};