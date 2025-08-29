// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 个人中心接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

export default {
	// 用户信息
	user: {
		url: '/api/wdsxh/user_wechat/center',
		auth: true,
		method: 'GET',
	},
	// 个人中心自定义数据
	diyData: {
		url: '/api/wdsxh/person_center_diy_page/details',
		method: 'GET',
	},
	//个人积分详情
	pointsLog: {
		url: '/api/wdsxh/user_wechat/points_log',
		auth: true,
		 method: 'GET',
	},
	// 电子会牌
	poster: {
		url: '/api/wdsxh/willbrand/index',
		auth: true,
		method: 'GET',
	},
	// 更新用户信息
	updateUser: {
		url: '/api/wdsxh/user_wechat/update_nickname_avatar',
		auth: true,
		method: 'POST',
	},
	// 常见问题列表
	problemList: {
		url: '/api/wdsxh/faq/index',
		method: 'GET',
	},
	// 常见问题详情
	problemDetails: {
		url: '/api/wdsxh/faq/details',
		method: 'GET',
	},
};