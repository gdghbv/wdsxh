// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 登录接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

export default {
	// 查询用户是否已注册-微信小程序
	isAuth: {
		url: '/api/wdsxh/applet_user_wechat/is_register',
		method: 'GET',
	},
	// 绑定手机号-微信小程序
	bindMobile: {
		url: '/api/wdsxh/applet_user_wechat/bind_mobile',
		auth: true,
		method: 'POST',
	},
	// 登录-微信小程序
	login: {
		url: '/api/wdsxh/applet_user_wechat/login',
		method: 'POST',
	},
	// 注册-微信小程序
	register: {
		url: '/api/wdsxh/applet_user_wechat/register',
		method: 'POST',
	},
	// 登录-微信公众号
	officialLogin: {
		url: '/api/wdsxh/wananchi_user_wechat/mobile_login',
		method: 'POST',
	},
	// 发送验证码-微信公众号
	captcha: {
		url: '/api/sms/send',
		method: 'POST',
	},
	// 获取手机号
	getMobile: {
		url: '/api/wdsxh/user_wechat/get_mobile',
		method: 'GET',
		auth: true,
	},
};