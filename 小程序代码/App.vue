<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+---------------------------------------------------------------------- -->

<script>
	export default {
		globalData: {
			// 接口地址
			adminPath: "https://xhdemo.funkia.cn",
			// 入会字段
			applyField: [],
		},
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			// 微信版本更新
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				if (updateManager && updateManager.onCheckForUpdate) {
					updateManager.onCheckForUpdate(function(res) {
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							updateManager.onUpdateReady(function() {
								wx.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							})
						}
					})
				}
			} else {
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
			// #endif
			// #ifdef H5
			// 判断是否为公众号模拟器环境
			let ua = navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) != "micromessenger") {
				uni.reLaunch({
					url: "/pages/error/browser"
				})
				return
			}
			// #endif
			// 设置登录信息
			const token = uni.getStorageSync("token")
			if (token) {
				const userInfo = uni.getStorageSync("userInfo")
				this.$store.commit('user/setToken', token)
				this.$store.commit('user/setUserInfo', userInfo)
			}
			this.getAssociation()
			this.getTabBar()
			this.getConfig()
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			// 获取商协信息
			getAssociation() {
				this.$util.request("main.association", {}, this.globalData.adminPath).then(res => {
					if (res.code == 1) {
						this.$store.commit('app/setAppletInfo', {
							name: res.data.name,
							logo: res.data.logo,
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error("获取商协信息", error)
				})
			},
			// 获取底部导航
			getTabBar() {
				this.$util.request("main.tabbar", {}, this.globalData.adminPath).then(res => {
					if (res.code == 1) {
						this.$store.commit('app/setTabBar', res.data)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error("获取底部导航", error)
				})
			},
			// 获取系统配置
			getConfig() {
				this.$util.request("main.config", {}, this.globalData.adminPath).then(res => {
					if (res.code == 1) {
						this.$store.commit('app/setConfig', {
							themeColor: res.data.theme_colors,
							organize: res.data.organize,
							subscribeNotifyIds: res.data.subscribe_msg_tpl_ids,
							statement: res.data.applet_record_number,
							support: {
								image: res.data.technical_support_image,
								type: res.data.jump_type,
								link: res.data.jump_link,
								mobile: res.data.call_mobile,
							},
							loginImg: res.data.login_img,
							jielongImg: res.data.jielong_img,
							questionnaireImg: res.data.questionnaire_img,
							shareImage: res.data.share_image,
							shareTitle: res.data.share_title,
							WeChatAppid: res.data.wananchi_appid,
							deliveryManagement: res.data.delivery_management,
							version: res.data.version,
							joinConfig: res.data.join_config,
						})
						this.$isResolve()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error("获取配置信息", error)
				})
			},
		},
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	/*每个页面公共css */

	page {
		background: #F6F7FB;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	image {
		display: block;
		width: 100%;
		height: 100%;
	}

	view {
		box-sizing: border-box;
	}

	button::after {
		border: none;
	}

	button.clear {
		padding: 0;
		margin: 0;
		border: none;
		background: transparent;
		line-height: 1.3;
	}

	button.clear::after {
		display: none;
	}

	.flex {
		display: flex;
	}

	.inline-flex {
		display: inline-flex;
	}

	.flex-item {
		flex: 1;
		min-width: 0;
	}

	.flex-center {
		align-items: center;
		justify-content: center;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}

	.flex-direction-column {
		display: flex;
		flex-direction: column;
	}

	.align-items-center {
		align-items: center;
	}

	.align-items-start {
		align-items: flex-start;
	}

	.align-items-end {
		align-items: flex-end;
	}

	.justify-content-between {
		justify-content: space-between;
	}

	.justify-content-around {
		justify-content: space-around;
	}

	.justify-content-center {
		justify-content: center;
	}

	.justify-content-start {
		justify-content: flex-start;
	}

	.justify-content-end {
		justify-content: flex-end;
	}

	.wbcentre {
		text-align: center;
	}

	.text-ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.text-ellipsis-more {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
		word-break: break-all;
	}

	.safe-padding {
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* #endif */
	// H5样式
	/* #ifdef H5 */
	.uni-app--showtabbar uni-page-wrapper::after {
		display: none !important;
	}

	/* #endif */
</style>