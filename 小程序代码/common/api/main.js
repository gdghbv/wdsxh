// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 公共接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

export default {
	// 系统配置
	config: {
		url: '/api/wdsxh/config/config',
		method: 'GET',
	},
	// 底部导航
	tabbar: {
		url: '/api/wdsxh/index/tabbar_index',
		method: 'GET',
	},
	// 自定义装修数据
	diyData: {
		url: '/api/wdsxh/diy/getPage',
		method: 'GET',
	},
	// 自定义搜索数据
	diySearch: {
		url: '/api/wdsxh/search/search_result',
		method: 'GET',
	},
	// 首页轮播图
	carousel: {
		url: '/api/wdsxh/banner/index',
		method: 'GET',
	},
	// 轮播图详情
	carouselDetails: {
		url: '/api/wdsxh/banner/details',
		method: 'GET',
	},
	// 快速导航
	menu: {
		url: '/api/wdsxh/index/quickmenu_index',
		method: 'GET',
	},
	// 快速导航详情
	menuDetails: {
		url: '/api/wdsxh/index/quickmenu_details',
		method: 'GET',
	},
	// 省市区管理
	address: {
		// 获取省份
		province: {
			url: '/api/wdsxh/goods/address/address_province',
			method: 'GET',
		},
		// 获取城市
		city: {
			url: '/api/wdsxh/goods/address/address_city',
			method: 'GET',
		},
		// 获取区县
		area: {
			url: '/api/wdsxh/goods/address/address_area',
			method: 'GET',
		},
	},
	// 需求建议提交
	addDemand: {
		url: '/api/wdsxh/demand/add',
		method: 'POST',
	},
	// 商协信息
	association: {
		url: '/api/wdsxh/association/index',
		method: 'GET',
	},
	// 文章管理
	article: {
		// 分类
		category: {
			url: '/api/wdsxh/article/article_cat',
			method: 'GET',
		},
		// 列表
		list: {
			url: '/api/wdsxh/article/index',
			method: 'GET',
		},
		// 详情
		details: {
			url: '/api/wdsxh/article/details',
			method: 'GET',
		},
		// 增加阅读量
		updateReadNum: {
			url: '/api/wdsxh/article/update_read_num',
			method: 'POST',
		},
	},
	// 协议内容
	agreement: {
		url: '/api/wdsxh/config/agreement',
		method: 'GET',
	},
	// 消息订阅
	message: {
		// 订阅数量
		count: {
			url: '/api/wdsxh/member/member/subscribe_count',
			auth: true,
			method: 'GET',
		},
		// 消息订阅
		subscribe: {
			url: '/api/wdsxh/member/member/submit_subscribe',
			auth: true,
			method: 'POST',
		},
	},
	// 系统配置
	WeChatConfig: {
		url: '/api/wdsxh/wananchi_user_wechat/get_wechat_config',
		method: 'GET',
	},
};