// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

const user = {
	namespaced: true,
	state: {
		// 登录鉴权
		token: "",
		// 用户信息
		userInfo: {},
		// 用户手机号
		mobile: "",
	},
	mutations: {
		// 设置token
		setToken(state, token) {
			state.token = token
		},
		// 设置用户信息
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
			state.mobile = userInfo.mobile
		},
		// 更新用户信息手机号
		updateMobile(state, mobile) {
			let userInfo = state.userInfo
			userInfo.mobile = mobile
			uni.setStorageSync("userInfo", userInfo)
			state.userInfo = userInfo
			state.mobile = mobile
		},
		// 清除登录信息
		clearAuth(state) {
			state.token = ""
			state.userInfo = {}
			uni.removeStorageSync("token")
			uni.removeStorageSync("userInfo")
		},
	},
}

export default user