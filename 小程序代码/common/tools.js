// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 常用API方法集成 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

// 引入接口列表文档
import apiList from './api/index.js'
import store from '@/store'

// 接口请求方法
function request(api, parameter = {}, adminPath) {
	return new Promise((resolve, reject) => {
		let channel = 2
		// #ifdef MP-WEIXIN
		channel = 1
		// #endif
		const config = {
			url: '', // 接口地址
			data: {}, // 请求的参数
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
				"token": uni.getStorageSync('token'),
				"channel": channel
			}, // 设置请求头
			method: "POST", // 请求方法
			timeout: 30000, // 超时时间
			loading: true, // 设置加载等待
			dataType: "json", // 如果设为 json，会尝试对返回的数据做一次 JSON.parse
			responseType: "text", // 设置响应的数据类型
			sslVerify: true, // 验证 ssl 证书
			withCredentials: false, // 跨域请求时是否携带凭证（cookies）
			firstIpv4: "false", // DNS解析时优先使用ipv4
			success: (res) => {
				if (res.statusCode == 401) {
					uni.hideLoading()
					uni.removeStorageSync("token")
					uni.removeStorageSync("userInfo")
					store.commit('user/clearAuth')
					uni.removeStorageSync("myCart")
					uni.removeStorageSync("currentAddress")
					uni.removeStorageSync("searchHistory")
					verifyLogin(2)
					reject(401)
				} else if (res.statusCode == 200) {
					resolve(res.data)
				} else if (res.msg) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				} else if (res.statusCode == 408) {
					uni.showToast({
						title: '请求超时，请稍后重试',
						icon: 'none',
						duration: 2000
					})
					reject()
				} else if (res.statusCode == 500) {
					uni.showToast({
						title: '服务器开小差了，请稍后再试',
						icon: 'none',
						duration: 2000
					})
					reject()
				} else {
					uni.redirectTo({
						url: "/pages/error/error"
					})
					reject()
				}
			},
			fail: (err) => {
				uni.redirectTo({
					url: "/pages/error/error"
				})
				reject(err)
			}
		}
		let apiObj = getApiObj(api)
		if (!apiObj) {
			reject("接口地址错误")
		} else if (apiObj.auth && !uni.getStorageSync('token')) {
			uni.hideLoading()
			uni.showToast({
				title: '请登录后操作',
				icon: 'none',
				duration: 1000,
				mask: true
			});
			setTimeout(() => {
				verifyLogin(2)
				reject(401)
			}, 1000);
			return
		}
		const newConfig = Object.assign({}, config, {
			url: (adminPath ? adminPath : getApp().globalData.adminPath) + apiObj.url,
			method: apiObj.method,
			data: parameter
		})
		// 判断有无网络
		uni.getNetworkType({
			success: (res) => {
				if (res.networkType === "none") {
					uni.showToast({
						icon: "none",
						title: "请先连接网络后操作"
					})
					uni.hideLoading()
				} else {
					uni.request(newConfig)
				}
			}
		})
	})
}

// 获取接口信息
function getApiObj(url) {
	let apiArray = url.split(".");
	let api = apiList;
	apiArray.forEach(v => {
		api = api[v];
	});
	return api;
}

// 验证是否登录 type: 1.判断是否有token, 2.不判断直接跳转登录
function verifyLogin(type = 1) {
	if (type == 1) {
		if (!uni.getStorageSync("token")) {
			uni.navigateTo({
				url: "/pages/login/index",
				animationType: "fade-in"
			})
			return false
		} else return true
	} else {
		let pages = getCurrentPages()
		uni.redirectTo({
			url: "/pages/login/index?from=" + encodeURIComponent(pages[pages.length - 1].$page.fullPath),
			animationType: "fade-in"
		})
	}
}

// 上传文件-单文件
function uploadFile(file) {
	return new Promise((resolve, reject) => {
		// 判断有无网络
		uni.getNetworkType({
			success: (res) => {
				if (res.networkType === "none") {
					uni.showToast({
						icon: "none",
						title: "请先连接网络后操作"
					})
					uni.hideLoading()
				} else {
					uni.uploadFile({
						url: getApp().globalData.adminPath + '/api/wdsxh/common/upload',
						filePath: file,
						name: 'file',
						header: {
							token: uni.getStorageSync("token"),
						},
						success: (res) => {
							resolve(JSON.parse(res.data))
						},
						fail: (err) => {
							reject(err)
						}
					})
				}
			}
		})
	})
}

// 上传文件-多文件 type: 1.返回url, 2.返回fullurl
function uploadFileMultiple(files, oldFiles, type = 1) {
	return new Promise((resolve, reject) => {
		var uploadList = new Array(files.length)
		var completeNum = 0
		for (var i in files) {
			const index = i
			if (oldFiles && oldFiles.includes(files[i])) {
				uploadList[index] = files[i]
				if (++completeNum == files.length) {
					resolve(uploadList)
				}
			} else {
				uploadFile(files[i]).then((res) => {
					if (res.code == 1) {
						if (type == 2) uploadList[index] = res.data.fullurl
						else uploadList[index] = res.data.url
						if (++completeNum == files.length) {
							resolve(uploadList)
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						reject(res.msg)
					}
				}).catch(err => {
					reject(err)
				})
			}
		}
	})
}

// 导航菜单跳转及功能
// path: 跳转页面时使用的地址
// appId: 跳转小程序时使用的小程序id或原始id
// phone: 拨打电话时使用的电话号码
// address: 地图导航时使用的地址
// content: 复制文本时使用的文本
// mode: 1.跳转内部页面，2.关闭当前页面跳转，3.关闭所有页面跳转，4.跳转外部链接，5.跳转微信小程序，6.拨打电话，7.地图导航，8.复制文本
// success: 成功回调函数
async function toPage(e) {
	if (e.mode == 1 || e.mode == 2 || e.mode == 3) {
		// 需要登录的页面
		let loginRequired = [
			'/pages/mine/settings/user',
			'/pages/mine/subscribe/index',
			'/pages/member/details',
			'/pages/member/enterprise',
			'/pages/member/organization',
			'/pages/member/apply/index',
			'/pages/member/fees/index',
			'/pages/member/fees/pay',
			'/pages/member/information',
			'/pagesActivity/index/order',
			'/pagesActivity/order/index',
			'/pagesActivity/order/details',
			'/pagesActivity/verification/index',
			'/pagesActivity/verification/details',
			'/pagesMall/goods/order',
			'/pagesMall/address/index',
			'/pagesMall/address/add',
			'/pagesMall/cart/index',
			'/pagesMall/order/index',
			'/pagesMall/order/details',
			'/pagesMall/order/payment',
			'/pagesMall/refund/index',
			'/pagesMall/refund/details',
			'/pagesMall/refund/apply',
			'/pagesMall/refund/goods',
			'/pagesDemand/demand/details',
			'/pagesDemand/demand/edit',
			'/pagesDemand/demand/list',
			'/pagesDemand/demand/publish',
			'/pagesTools/certificate/index',
			'/pagesTools/certificate/result',
			'/pagesTools/phoneBook/index',
			'/pagesTools/sequence/feedback',
			'/pagesTools/suggest/index',
			'/pagesTools/publicize/index',
			'/pagesTools/sequence/details',
			'/pagesTools/questionnaire/details',
			'/pagesTools/institution/apply',
			'/pagesCard/mine/index',
			'/pagesCard/mine/details',
			'/pagesCard/mine/edit',
			'/pagesCard/mine/manage',
			'/pagesCard/card/details',
			'/pagesAdmin/examine/index',
			'/pagesAdmin/examine/details',
		]
		// 底部导航
		let tabbarList = [
			'/pages/index/index',
			'/pages/member/index',
			'/pages/mall/index',
			'/pages/demand/index',
			'/pages/mine/index'
		]
		// 判断是否需要登录
		if (loginRequired.indexOf(e.path.split("?")[0]) > -1 && !uni.getStorageSync("token")) { // 是否登录
			uni.navigateTo({
				url: "/pages/login/index",
				animationType: "fade-in"
			})
			return
		}
		const isPermission = await getPagePermission(e)
		if (!isPermission) return
		if (tabbarList.indexOf(e.path.split("?")[0]) > -1) { // 链接是否为底部导航
			uni.switchTab({
				url: e.path
			})
		} else {
			if (e.mode == 1) {
				uni.navigateTo({
					url: e.path,
					success: () => {
						if (e.success) e.success()
					}
				})
			} else if (e.mode == 2) {
				uni.redirectTo({
					url: e.path,
					success: () => {
						if (e.success) e.success()
					}
				})
			} else if (e.mode == 3) {
				uni.reLaunch({
					url: e.path,
					success: () => {
						if (e.success) e.success()
					}
				})
			}
		}
	} else {
		if (e.mode == 4) {
			// 跳转外部链接
			// #ifdef MP-WEIXIN
			uni.navigateTo({
				url: '/pages/webview/webview?path=' + encodeURIComponent(e.path),
			})
			// #endif
			// #ifdef H5
			window.open(e.path, '_blank');
			// #endif
		} else if (e.mode == 5) {
			// 跳转微信小程序
			// #ifdef MP-WEIXIN
			uni.navigateToMiniProgram({
				appId: e.appId,
				path: e.path
			})
			// #endif
		} else if (e.mode == 6) {
			// 拨打电话
			// Android需要在 manifest.json 增加权限 <uses-permission android:name="android.permission.CALL_PHONE"/>
			if (e.phone) {
				uni.makePhoneCall({
					phoneNumber: e.phone + ""
				});
			} else {
				uni.showToast({
					icon: "none",
					title: "暂无可拨打电话"
				})
			}
		} else if (e.mode == 7) {
			if (e.address && e.address.latitude && e.address.longitude) {
				let location = {
					latitude: Number(e.address.latitude),
					longitude: Number(e.address.longitude),
				}
				if (e.address.name) location.name = e.address.name
				if (e.address.address) location.address = e.address.address
				uni.openLocation(location);
			} else {
				uni.showToast({
					icon: "none",
					title: "暂无相关地址"
				})
			}
		} else if (e.mode == 8) {
			if (e.content) {
				uni.setClipboardData({
					data: e.content,
					success: () => {
						if (e.success) {
							e.success()
						} else {
							uni.showToast({
								icon: "success",
								title: "复制成功"
							})
						}
					}
				});
			} else {
				uni.showToast({
					icon: "none",
					title: "暂无可复制内容"
				})
			}
		}
	}
}

// 自定义装修-打开链接
function openLink(e) {
	switch (e.type) {
		case 'Custom':
			this.toPage({
				mode: 1,
				path: e.path
			})
			break;
		case 'Inlay':
			this.toPage({
				mode: 1,
				path: e.path
			})
			break;
		case 'Editor':
			store.commit('app/setEditorContent', e.content)
			this.toPage({
				mode: 1,
				path: "/pages/diy/richText?name=" + (e.pageTitle || "详情")
			})
			break;
		case 'WXMp':
			this.toPage({
				mode: 5,
				appId: e.appid,
				path: e.path
			})
			break;
		case 'Outside':
			this.toPage({
				mode: 4,
				path: e.url
			})
			break;
		case 'Phone':
			this.toPage({
				mode: 6,
				phone: e.phone + ""
			})
			break;
		case 'Member':
			this.toPage({
				mode: 1,
				path: "/pages/member/details?id=" + e.id
			})
			break;
		case 'Article':
			if (e.link_type == 2) {
				this.toPage({
					mode: 4,
					path: e.link_url,
				})
				this.$util.request("main.article.updateReadNum", { id: item.id })
			} else {
				this.toPage({
					mode: 1,
					path: "/pages/article/details?id=" + e.id
				})
			}
			break;
		case 'Activity':
			this.toPage({
				mode: 1,
				path: "/pagesActivity/index/details?id=" + e.id
			})
			break;
		case 'Goods':
			this.toPage({
				mode: 1,
				path: "/pagesMall/goods/details?id=" + e.id
			})
			break;
		default:
			break;
	}
}

// 判断页面跳转权限 isShowTips: 1.显示提示，2不显示提示
function getPagePermission(e, isShowTips = 1) {
	return new Promise(async (resolve) => {
		// 需要入会的页面
		let memberRequired = [
			'/pages/member/information',
			'/pagesDemand/demand/edit',
			'/pagesDemand/demand/list',
			'/pagesDemand/demand/publish',
			'/pagesTools/certificate/index',
			'/pagesTools/certificate/result',
			'/pagesTools/publicize/index',
			'/pagesTools/institution/apply',
		]
		// 会员权限判断
		let memberLimit = {
			list: [
				'/pages/member/index',
				'/pages/member/units',
				'/pages/member/search/index',
				'/pages/member/industry',
			],
			details: [
				'/pages/member/details',
				'/pages/member/enterprise',
				'/pages/member/organization',
			],
		}
		// 供需权限判断
		let demandLimit = {
			list: [
				'/pages/demand/index',
				'/pages/demand/search/index',
				'/pages/demand/search/result',
			],
			details: [
				'/pagesDemand/demand/details',
			],
		}
		if (memberRequired.indexOf(e.path.split("?")[0]) > -1) { // 用户是否为会员
			resolve(await getMemberState(isShowTips))
		} else if (memberLimit.list.indexOf(e.path.split("?")[0]) > -1) { // 会员列表是否对外
			resolve(await getMemberLimit(1, isShowTips))
		} else if (memberLimit.details.indexOf(e.path.split("?")[0]) > -1) { // 会员详情是否对外
			resolve(await getMemberLimit(2, isShowTips))
		} else if (demandLimit.list.indexOf(e.path.split("?")[0]) > -1) { // 供需列表是否对外
			resolve(await getDemandLimit(1, isShowTips))
		} else if (demandLimit.details.indexOf(e.path.split("?")[0]) > -1) { // 供需详情是否对外
			resolve(await getDemandLimit(2, isShowTips))
		} else if (e.path.split("?")[0] == "/pagesTools/album/index") { // 相册列表是否对外
			resolve(await getAlbumLimit(1, isShowTips))
		} else if (e.path.split("?")[0] == "/pagesTools/album/details") { // 相册详情是否对外
			resolve(await getAlbumLimit(2, isShowTips))
		} else if (e.path.split("?")[0] == "/pagesActivity/index/details") { // 活动详情是否对外
			resolve(await getActivityLimit(getUrlParam(e.path, "id"), isShowTips))
		} else if (e.path.split("?")[0] == "/pagesTools/institution/details") { // 机构详情是否对外
			resolve(await getInstitutionLimit(isShowTips))
		} else if (e.path.split("?")[0] == "/pagesTools/phoneBook/index") { // 通讯录是否对外
			resolve(await getAddressBookLimit(isShowTips))
		} else if (e.path.split("?")[0] == "/pagesTools/questionnaire/details") { // 调查问卷是否对外
			resolve(await getQuestionnaireLimit(getUrlParam(e.path, "id"), isShowTips))
		} else if (e.path.split("?")[0] == "/pagesTools/sequence/details") { // 接龙是否对外
			resolve(await getSequenceLimit(getUrlParam(e.path, "id"), isShowTips))
		} else if (e.path.split("?")[0] == "/pages/mine/subscribe/index") { // 消息订阅判断管理员
			resolve(await getSubscribeAdmin(1, isShowTips))
		} else if (e.path.split("?")[0] == "/pagesAdmin/examine/index") { // 会员审核列表判断管理员
			resolve(await getSubscribeAdmin(1, isShowTips))
		} else if (e.path.split("?")[0] == "/pagesAdmin/examine/details") { // 会员审核详情判断管理员
			resolve(await getSubscribeAdmin(1, isShowTips))
		} else if (e.path.split("?")[0] == "/pagesActivity/verification/index") { // 核销活动判断管理员
			resolve(await getSubscribeAdmin(2, isShowTips))
		} else if (e.path.split("?")[0] == "/pages/member/apply/index") { // 入会申请状态判断
			resolve(await getMemberApply(isShowTips))
		} else if (e.path.split("?")[0] == "/pages/member/fees/index") { // 会费缴纳状态判断
			resolve(await getMemberFeesState(isShowTips))
		} else {
			resolve(true)
		}
	})
}

// 获取会员状态
function getMemberState(isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("member.state").then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.state.state == 6) {
					resolve(true)
				} else if (res.data.state.state == -1) {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "此页面需成为会员后可查看！",
							confirmColor: store.state.app.themeColor,
							confirmText: "去加入",
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: "/pages/member/apply/index"
									})
								}
							}
						})
					}
					resolve(false)
				} else {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "此页面需成为会员后可查看！",
							confirmColor: store.state.app.themeColor,
							confirmText: "前往查看",
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: "/pages/mine/index"
									})
								}
							}
						})
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取会员对外开放状态
function getMemberLimit(type, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("member.limit", {
			type: type
		}).then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取通讯录对外开放状态
function getAddressBookLimit(isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("member.addressBookLimit").then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "此页面需成为会员后可查看！",
							confirmColor: store.state.app.themeColor,
							confirmText: "去加入",
							success: (res) => {
								if (res.confirm) {
									try {
										const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
										if (memberState == -1) {
											uni.navigateTo({
												url: "/pages/member/apply/index"
											})
										} else {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									} catch (error) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									}
								}
							}
						})
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取供需对外开放状态
function getDemandLimit(type, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("demand.businessLimit", {
			type: type
		}).then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取相册对外开放状态
function getAlbumLimit(type, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("album.albumLimit", {
			type: type
		}).then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取活动详情对外开放状态
function getActivityLimit(id, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("activity.limit", {
			id: id,
		}).then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取机构详情对外开放状态
function getInstitutionLimit(isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("institution.limit").then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取问卷详情对外开放状态
function getQuestionnaireLimit(id, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("questionnaire.limit", {
			id: id
		}).then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "该问卷需成为会员后可填写！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取接龙详情对外开放状态
function getSequenceLimit(id, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("sequence.limit", {
			id: id
		}).then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.show_status == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						if (uni.getStorageSync("token")) {
							uni.showModal({
								title: "系统提示",
								content: "该接龙需成为会员后可参加！",
								confirmColor: store.state.app.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										try {
											const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
											if (memberState == -1) {
												uni.navigateTo({
													url: "/pages/member/apply/index"
												})
											} else {
												uni.switchTab({
													url: "/pages/mine/index"
												})
											}
										} catch (error) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								}
							})
						} else {
							uni.navigateTo({
								url: "/pages/login/index",
								animationType: "fade-in"
							})
						}
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取管理员状态 type: 1.消息订阅管理员，2.核销活动管理员
function getSubscribeAdmin(type, isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("mine.user").then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (type == 1 && res.data.set_admin == 1) {
					resolve(true)
				} else if (type == 2 && res.data.is_verifying == 1) {
					resolve(true)
				} else {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "此页面需成为管理员后可查看！",
							showCancel: false,
							confirmColor: store.state.app.themeColor,
							confirmText: "我知道了",
						})
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取会费缴纳状态
function getMemberFeesState(isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("member.state").then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.state.state == -1) {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "请先提交入会申请后可查看",
							confirmColor: store.state.app.themeColor,
							confirmText: "去申请",
							success: (res) => {
								if (res.confirm) {
									try {
										const memberState = uni.getStorageSync("userInfo")?.apply_member_state?.state || -1
										if (memberState == -1) {
											uni.navigateTo({
												url: "/pages/member/apply/index"
											})
										} else {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									} catch (error) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									}
								}
							}
						})
					}
					resolve(false)
				} else if (res.data.state.state == 1) {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "入会申请审核中，请耐心等待",
							confirmColor: store.state.app.themeColor,
							confirmText: "我知道了",
							showCancel: false
						})
					}
					resolve(false)
				} else {
					resolve(true)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取入会申请状态
function getMemberApply(isShowTips) {
	return new Promise((resolve) => {
		uni.showLoading({
			title: "加载中",
			mask: true,
		})
		request("member.state").then(res => {
			uni.hideLoading()
			if (res.code == 1) {
				if (res.data.state.state == -1 || res.data.state.state == 2) {
					resolve(true)
				} else if (res.data.state.state == 6) {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "您已成为会员，无需重复提交",
							confirmColor: store.state.app.themeColor,
							confirmText: "前往查看",
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: "/pages/mine/index"
									})
								}
							}
						})
					}
					resolve(false)
				} else {
					if (isShowTips != 2) {
						uni.showModal({
							title: "系统提示",
							content: "您已提交入会申请，无需重复提交",
							confirmColor: store.state.app.themeColor,
							confirmText: "前往查看",
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: "/pages/mine/index"
									})
								}
							}
						})
					}
					resolve(false)
				}
			} else {
				if (isShowTips != 2) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}
				resolve(false)
			}
		}).catch(() => {
			uni.hideLoading()
			resolve(false)
		})
	})
}

// 获取地址栏参数 path: 页面路径，name: 参数名称
function getUrlParam(path, name) {
	const search = path.split("?")[1] || ""
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(search).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// 常用规则验证
// mode: phone验证手机号，email验证邮箱，IDcard身份证号（简单验证），password密码
// info: 需要验证的内容
function validation(mode, info) {
	if (mode == 'phone') {
		var reg = /^1[0-9]{10,10}$/
		if (reg.test(info)) return true;
		else return false;
	} else if (mode == 'email') {
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if (reg.test(info)) return true;
		else return false;
	} else if (mode == 'IDcard') {
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if (reg.test(info)) {
			var birth = (info.length === 18 ? info.slice(6, 14) : info.slice(6, 12));
			var month, day;
			if (birth.length == 8) {
				month = parseInt(birth.slice(4, 6), 10);
				day = parseInt(birth.slice(-2), 10);
			} else if (birth.length == 6) {
				month = parseInt(birth.slice(2, 4), 10);
				day = parseInt(birth.slice(-2), 10);
			} else {
				return false;
			}
			if (month > 12 || month === 0 || day > 31 || day === 0) {
				return false;
			}
			return true;
		} else return false;
	} else if (mode == 'password') {
		if (info.length >= 8) return true;
		else return false;
	}
}

// 获取当前日期
function getCurrentDate(format = "y-m-d") {
	var date = new Date()
	var year = date.getFullYear() //年
	var month = date.getMonth() + 1 //月
	var day = date.getDate() //日
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours() //时
	var minute = date.getMinutes() < 10 ? date.getMinutes() : date.getMinutes() //分
	var second = date.getSeconds() < 10 ? date.getSeconds() : date.getSeconds() //秒
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	hour >= 0 && hour <= 9 ? hour : "";
	minute >= 0 && minute <= 9 ? (minute = "0" + minute) : "";
	second >= 0 && second <= 9 ? (second = "0" + second) : "";
	if (format.indexOf('y') != -1) {
		format = format.replace('y', year)
	}
	if (format.indexOf('m') != -1) {
		format = format.replace('m', month)
	}
	if (format.indexOf('d') != -1) {
		format = format.replace('d', day)
	}
	if (format.indexOf('h') != -1) {
		format = format.replace('h', hour)
	}
	if (format.indexOf('i') != -1) {
		format = format.replace('i', minute)
	}
	if (format.indexOf('s') != -1) {
		format = format.replace('s', second)
	}
	return format;
}

// 时间戳转日期格式 type: dateTime-日期时间，date-日期，hours-时，minutes-时分，seconds-时分秒
function formatDate(timeStamp, hyphen = "-", type = "dateTime") {
	let date = new Date(timeStamp * 1000);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let h = date.getHours();
	let mm = date.getMinutes();
	let s = date.getSeconds();
	month = month >= 10 ? month : "0" + month;
	day = day >= 10 ? day : "0" + day;
	h = h >= 10 ? h : "0" + h;
	mm = mm >= 10 ? mm : "0" + mm;
	s = s >= 10 ? s : "0" + s;
	let result = "";
	if (hyphen == "object") {
		result = {
			year: year,
			month: month,
			day: day,
			hours: h,
			minutes: mm,
			seconds: s,
		}
	} else if (type == "date") {
		result = `${year}${hyphen}${month}${hyphen}${day}`;
	} else if (type == "hours") {
		result = `${h}`;
	} else if (type == "minutes") {
		result = `${h}:${mm}`;
	} else if (type == "seconds") {
		result = `${h}:${mm}:${s}`;
	} else {
		result = `${year}${hyphen}${month}${hyphen}${day} ${h}:${mm}:${s}`;
	}
	return result;
}

// 时间格式化时间为：刚刚、多少分钟前、多少天前
function getDateBeforeNow(stringTime) {
	// 统一单位换算
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var time1 = new Date().getTime(); //当前的时间戳
	// 对时间进行毫秒单位转换
	var time2 = new Date(stringTime * 1000).getTime(); //指定时间的时间戳
	var time = time1 - time2;
	var result = null;
	if (time < 0) {
		result = "刚刚";
	} else if (time / day >= 3) {
		result = formatDate(stringTime, ".", "date");
	} else if (time / day >= 1) {
		result = parseInt(time / day) + "天前";
	} else if (time / hour >= 1) {
		result = parseInt(time / hour) + "小时前";
	} else if (time / minute >= 1) {
		result = parseInt(time / minute) + "分钟前";
	} else {
		result = "刚刚";
	}
	return result;
}

// 获取时间差
function getTimeDifference(startTime, endTime) {
	let result = null
	let second = 1000;
	let minute = second * 60;
	let hour = minute * 60;
	let day = hour * 24;
	let timeDif = endTime - startTime;
	let secondDif = parseInt(timeDif / second);
	let minuteDif = parseInt(timeDif / minute);
	let hourDif = parseInt(timeDif / hour);
	let dayDif = parseInt(timeDif / day);
	if (secondDif <= 0) {
		result = {
			day: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		}
	} else if (secondDif < 60) {
		result = {
			day: 0,
			hours: 0,
			minutes: 0,
			seconds: parseInt(secondDif % 60),
		}
	} else if (minuteDif < 60) {
		result = {
			day: 0,
			hours: 0,
			minutes: parseInt(minuteDif % 60),
			seconds: parseInt(secondDif % 60),
		}
	} else if (hourDif < 24) {
		result = {
			day: 0,
			hours: parseInt(hourDif % 24),
			minutes: parseInt(minuteDif % 60),
			seconds: parseInt(secondDif % 60),
		}
	} else {
		result = {
			day: parseInt(dayDif),
			hours: parseInt(hourDif % 24),
			minutes: parseInt(minuteDif % 60),
			seconds: parseInt(secondDif % 60),
		}
	}
	return result
}

// 获取前一天日期
function getYesterday(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let today = new Date(date);
	let yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
	let yesterday = new Date();
	yesterday.setTime(yesterday_milliseconds);
	let strYear = yesterday.getFullYear();
	let strDay = yesterday.getDate();
	let strMonth = yesterday.getMonth() + 1;
	if (strMonth < 10) {
		strMonth = "0" + strMonth;
	}
	if (strDay < 10) {
		strDay = "0" + strDay;
	}
	return strYear + hyphen + strMonth + hyphen + strDay;
}

// 获取后一天日期
function getTomorrow(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let today = new Date(date);
	let tomorrow_milliseconds = today.getTime() + 1000 * 60 * 60 * 24;
	let tomorrow = new Date();
	tomorrow.setTime(tomorrow_milliseconds);
	let strYear = tomorrow.getFullYear();
	let strDay = tomorrow.getDate();
	let strMonth = tomorrow.getMonth() + 1;
	if (strMonth < 10) {
		strMonth = "0" + strMonth;
	}
	if (strDay < 10) {
		strDay = "0" + strDay;
	}
	return strYear + hyphen + strMonth + hyphen + strDay;
}

// 获取上一周日期
function getLastWeek(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let lastWeek = new Date(date).getTime() - (86400000 * 7);
	let day = new Date(lastWeek).getDate()
	let month = new Date(lastWeek).getMonth() + 1
	let year = new Date(lastWeek).getFullYear()
	return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取下一周日期
function getNextWeek(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let nextWeek = new Date(date).getTime() + (86400000 * 7);
	let day = new Date(nextWeek).getDate()
	let month = new Date(nextWeek).getMonth() + 1
	let year = new Date(nextWeek).getFullYear()
	return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取上一月日期
function getLastMonth(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let year, lastMonth;
	let today = new Date(date);
	let nowYear = today.getFullYear();
	let nowMonth = today.getMonth();
	if (nowMonth == 0) {
		year = nowYear - 1;
		lastMonth = 12;
	} else {
		year = nowYear;
		lastMonth = nowMonth;
	}
	lastMonth = lastMonth < 10 ? ('0' + lastMonth) : lastMonth;
	return year + hyphen + lastMonth;
}

// 获取下一月日期
function getNextMonth(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let year, nextMonth;
	let today = new Date(date);
	let nowYear = today.getFullYear();
	let nowMonth = today.getMonth() + 2;
	if (nowMonth == 12) {
		year = nowYear + 1;
		nextMonth = 1;
	} else {
		year = nowYear;
		nextMonth = nowMonth;
	}
	nextMonth = nextMonth < 10 ? ('0' + nextMonth) : nextMonth;
	return year + hyphen + nextMonth;
}

// 获取指定日期的一周开始日期（周一为每周开始，周日为每周结束）
function beginOfWeek(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let subDay = 0;
	let weekDay = new Date(date).getDay()
	if (weekDay == 0) {
		subDay = 6;
	} else {
		subDay = weekDay - 1;
	}
	let beginDateTime = new Date(date).getTime() - (86400000 * subDay);
	let day = new Date(beginDateTime).getDate()
	let month = new Date(beginDateTime).getMonth() + 1
	let year = new Date(beginDateTime).getFullYear()
	return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取指定日期的一周结束日期（周一为每周开始，周日为每周结束）
function endOfWeek(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let weekDay = new Date(date).getDay();
	if (weekDay == 0) {
		let day = new Date(date).getDate()
		let month = new Date(date).getMonth() + 1
		let year = new Date(date).getFullYear()
		return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
	} else {
		let addDay = 7 - weekDay;
		let endDateTime = new Date(date).getTime() + (86400000 * addDay);
		let day = new Date(endDateTime).getDate()
		let month = new Date(endDateTime).getMonth() + 1
		let year = new Date(endDateTime).getFullYear()
		return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
	}
}

// 获取指定日期的一周的所有日期的数组（周一为每周开始，周日为每周结束）
function getWeekTime(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	var timesStamp = new Date(date).getTime();
	var currenDay = new Date(date).getDay();
	var dates = [];
	for (var i = 0; i < 7; i++) {
		var das = timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)
		dates.push(formatDate((das / 1000), hyphen, "date"));
	}
	return dates
}

// 获取指定日期的一个月开始日期
function beginOfMonth(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let currenDay = new Date(date);
	currenDay.setDate(1)
	let day = currenDay.getDate()
	let year = currenDay.getFullYear()
	let month = currenDay.getMonth() + 1
	return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取指定日期的一个月结束日期
function endOfMonth(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let year = new Date(date).getFullYear()
	let month = new Date(date).getMonth() + 1
	let nextMonthFirthDay = new Date(year, month, 1)
	let oneDay = 1000 * 60 * 60 * 24
	let endDay = new Date(nextMonthFirthDay - oneDay)
	let day = endDay.getDate()
	return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取指定日期的一个月的所有日期的数组
function getMonthTime(date, hyphen = "-") {
	date = date.replace('-', '/');
	date = date.replace('-', '/');
	let dataTimes = [];
	let year = new Date(date).getFullYear();
	let month = new Date(date).getMonth() + 1;
	let number = new Date(year, month, 0).getDate();
	for (var day = 1; day < number + 1; day++) {
		dataTimes.push(year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day));
	}
	return dataTimes; //返回天数数组
}

// 计算年龄
function getAge(birth) {
	birth = birth.replace('-', '/');
	birth = birth.replace('-', '/');
	const birthDate = new Date(birth);
	const momentDate = new Date();
	momentDate.setHours(0, 0, 0, 0);
	const thisYearBirthDate = new Date(
		momentDate.getFullYear(),
		birthDate.getMonth(),
		birthDate.getDate()
	);
	const aDate = thisYearBirthDate - birthDate;
	const bDate = momentDate - birthDate;
	let tempAge = momentDate.getFullYear() - birthDate.getFullYear();
	let age = null;
	if (bDate < aDate) {
		tempAge = tempAge - 1;
		age = tempAge < 0 ? 0 : tempAge;
	} else {
		age = tempAge;
	}
	return age;
}

//计算两个经纬度之间的距离 单位米
function getDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = lat1 * Math.PI / 180.0;
	var radLat2 = lat2 * Math.PI / 180.0;
	var a = radLat1 - radLat2;
	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	s = s * 1000;
	s = parseFloat(s).toFixed(2)
	return s;
}

// 十六进制转rgb/rgba
function hexToRgb(hex, weight) {
	var reg = new RegExp("^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$");
	let color = hex ? hex.toLowerCase() : hex;
	if (color && reg.test(color)) {
		if (color.length === 4) {
			let temp = "#";
			for (let i = 1; i < 4; i += 1) {
				temp += color.slice(i, i + 1).concat(color.slice(i, i + 1));
			}
			color = temp;
		}
		var colorRes = [];
		for (let i = 1; i < 7; i += 2) {
			colorRes.push(parseInt("0x" + color.slice(i, i + 2)));
		}
		if (weight) {
			return "rgba(" + colorRes.join(",") + "," + weight + ")";
		}
		return colorRes.join(",");
	} else {
		return color;
	}
}

// 查看文件
function openDocument(fileLink) {
	return new Promise((resolve, reject) => {
		// 判断有无网络
		uni.getNetworkType({
			success: (res) => {
				if (res.networkType === "none") {
					uni.showToast({
						icon: "none",
						title: "请先连接网络后操作"
					})
					uni.hideLoading()
				} else {
					uni.downloadFile({
						url: fileLink,
						success: (result) => {
							if (result.statusCode === 200) {
								uni.openDocument({
									filePath: result.tempFilePath,
									showMenu: true,
									success: () => {
										resolve()
									},
									fail: (err) => {
										reject(err)
									},
								})
							}
						},
						fail: (err) => {
							reject(err)
						}
					})
				}
			}
		})
	})
}

module.exports.request = request;
module.exports.uploadFile = uploadFile;
module.exports.uploadFileMultiple = uploadFileMultiple;
module.exports.verifyLogin = verifyLogin;
module.exports.toPage = toPage;
module.exports.openLink = openLink;
module.exports.getPagePermission = getPagePermission;
module.exports.getUrlParam = getUrlParam;
module.exports.validation = validation;
module.exports.getCurrentDate = getCurrentDate;
module.exports.formatDate = formatDate;
module.exports.getDateBeforeNow = getDateBeforeNow;
module.exports.getTimeDifference = getTimeDifference;
module.exports.getYesterday = getYesterday;
module.exports.getTomorrow = getTomorrow;
module.exports.getLastWeek = getLastWeek;
module.exports.getNextWeek = getNextWeek;
module.exports.getLastMonth = getLastMonth;
module.exports.getNextMonth = getNextMonth;
module.exports.beginOfWeek = beginOfWeek;
module.exports.endOfWeek = endOfWeek;
module.exports.getWeekTime = getWeekTime;
module.exports.beginOfMonth = beginOfMonth;
module.exports.endOfMonth = endOfMonth;
module.exports.getMonthTime = getMonthTime;
module.exports.getAge = getAge;
module.exports.getDistance = getDistance;
module.exports.hexToRgb = hexToRgb;
module.exports.openDocument = openDocument;