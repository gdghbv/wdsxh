<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 登录 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="登录"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<image class="main-header" :src="loginImg" mode="aspectFit" v-if="loginImg"></image>
			<!-- #ifdef MP-WEIXIN -->
			<view class="main-login">
				<view class="login-title">小程序需要登录注册才能使用相关功能，申请获取以下权限</view>
				<view class="login-subtitle">获得你的公开信息(昵称、头像、手机号码等)</view>
				<!-- 授权登录 -->
				<view class="login-info" v-if="isRegister">
					<view class="info-btn" @click="handleLogin">授权登录</view>
					<view class="info-btn cancel" @click="goBack(2)">取消登录</view>
				</view>
				<!-- 授权头像昵称 -->
				<form class="login-info" @submit="handleLogin" v-else>
					<view class="info-item">
						<view class="item-title">头像</view>
						<button class="item-avatar" open-type="chooseAvatar" @chooseavatar="bindChooseAvatar">
							<image class="image" :src="avatarPath || '/static/login.png'" mode="aspectFill"></image>
						</button>
					</view>
					<view class="info-item">
						<view class="item-title">昵称</view>
						<input class="item-nickname" type="nickname" name="nickname" :value="userInfo.nickname" placeholder="请输入昵称" />
					</view>
					<button class="info-btn" style="margin-top: 48rpx;" form-type="submit">授权登录</button>
					<button class="info-btn cancel" @click="goBack(2)">取消登录</button>
				</form>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<!-- 手机号验证码登录 -->
			<view class="main-form" v-if="!isShowInfo">
				<view class="form-input">
					<input class="input" v-model="mobile" maxlength="11" type="number" placeholder="请输入您的手机号" placeholder-class="placeholder" />
				</view>
				<view class="form-input flex align-items-center">
					<input class="input flex-item" v-model="captcha" type="text" placeholder="请输入验证码" placeholder-class="placeholder" />
					<view class="countdown" v-if="countdown && countdown > 0">{{countdown}}秒</view>
					<view class="btn" @click="getCaptcha()" v-else>发送验证码</view>
				</view>
				<view class="form-btn" @click="onLogin">登录</view>
				<view class="form-read flex align-items-center" @click="isRead = !isRead">
					<view class="radio" :class="{active: isRead}">
						<image src="/static/tick.png" mode="aspectFill" v-if="isRead"></image>
					</view>
					<view class="label flex-item">我已阅读并同意 <text @click.stop="toAgreement(1)">《用户协议》</text>和<text @click.stop="toAgreement(2)">《隐私政策》</text></view>
				</view>
			</view>
			<!-- 授权头像昵称 -->
			<view class="main-login" v-else>
				<view class="login-info">
					<view class="info-item">
						<view class="item-title">头像</view>
						<view class="item-avatar" @click="chooseAvatar">
							<image class="image" :src="avatarPath || '/static/login.png'" mode="aspectFill"></image>
						</view>
					</view>
					<view class="info-item">
						<view class="item-title">昵称</view>
						<input class="item-nickname" v-model="userInfo.nickname" placeholder="请输入昵称" />
					</view>
					<button class="info-btn" style="margin-top: 48rpx;" @click="handleUpdateUser">授权登录</button>
					<button class="info-btn cancel" @click="goBack(1)">稍后授权</button>
				</view>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 微信参数
				// #ifdef MP-WEIXIN
				// 是否已经注册
				isRegister: false,
				// #endif
				// 已选择头像
				avatarPath: "",
				// 用户信息
				userInfo: {
					avatar: "",
					nickname: "",
				},
				// 公众号H5参数
				// #ifndef MP-WEIXIN
				// 是否已读
				isRead: false,
				// 手机号
				mobile: "",
				// 验证码
				captcha: "",
				// 验证码倒计时
				countdown: 0,
				// 定时器
				interval: null,
				// 是否显示设置头像昵称
				isShowInfo: false,
				// #endif
				// 来源链接
				fromPage: null,
			}
		},
		onLoad(option) {
			if (option.from) this.fromPage = decodeURIComponent(option.from)
			// #ifdef MP-WEIXIN
			uni.showLoading({
				title: "加载中"
			})
			this.getAuthStatus(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #endif
		},
		onShow() {
			// #ifndef MP-WEIXIN
			if (this.isRead || this.mobile || this.captcha || this.isShowInfo) return
			this.loadEnd = false
			uni.showLoading({
				title: "加载中"
			})
			this.getAuthCode(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #endif
		},
		// #ifndef MP-WEIXIN
		onUnload() {
			clearInterval(this.interval)
		},
		// #endif
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				appletLogo: state => state.app.appletLogo,
				appletName: state => state.app.appletName,
				loginImg: state => state.app.loginImg,
				token: state => state.user.token,
				WeChatAppid: state => state.app.WeChatAppid,
			})
		},
		methods: {
			// 返回上一页
			async goBack(type) {
				try {
					let pages = getCurrentPages()
					if (type == 2) {
						if (pages.length == 1 || pages[pages.length - 2].route.indexOf("pages/login/index") > -1) {
							this.$util.toPage({
								mode: 3,
								path: "/pages/mine/index",
							})
						} else {
							uni.navigateBack()
						}
					} else {
						if (this.fromPage && this.fromPage.indexOf("pages/login/index") == -1) {
							const isPermission = await this.$util.getPagePermission({ mode: 2, path: this.fromPage }, 2)
							if (isPermission) {
								this.$util.toPage({
									mode: 2,
									path: this.fromPage
								})
							} else {
								this.$util.toPage({
									mode: 3,
									path: "/pages/mine/index",
								})
							}
						} else {
							if (pages.length == 1 || pages[pages.length - 2].route.indexOf("pages/login/index") > -1) {
								this.$util.toPage({
									mode: 3,
									path: "/pages/mine/index",
								})
							} else {
								uni.navigateBack()
							}
						}
					}
				} catch (error) {
					this.$util.toPage({
						mode: 3,
						path: "/pages/mine/index",
					})
				}
			},
			// 微信登录
			// #ifdef MP-WEIXIN
			// 获取账号是否已注册
			getAuthStatus(fn) {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						this.$util.request("login.isAuth", {
							code: loginRes.code
						}).then(res => {
							if (fn) fn()
							if (res.code == 1) {
								if (res.data.auth_status == 1) {
									this.isRegister = true
								} else {
									this.isRegister = false
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}).catch(error => {
							if (fn) fn()
							console.error('获取账号是否已注册 ', error)
						})
					},
					fail: () => {
						uni.showToast({
							icon: "none",
							title: "授权失败，请重试"
						})
					}
				})
			},
			// 选择头像
			bindChooseAvatar(e) {
				this.avatarPath = e.detail.avatarUrl
			},
			// 提交登录
			handleLogin(e) {
				if (!this.isRegister) {
					this.userInfo.nickname = e.detail.value.nickname
					if (!this.avatarPath) {
						uni.showToast({
							title: "请设置头像后登录",
							icon: 'none',
						})
						return
					}
					if (!this.userInfo.nickname) {
						uni.showToast({
							title: "请设置昵称后登录",
							icon: 'none',
						})
						return
					}
				}
				uni.showLoading({
					title: '授权中',
					mask: true,
				})
				if (this.avatarPath) {
					this.$util.uploadFile(this.avatarPath).then(result => {
						this.userInfo.avatar = result.data.url
						this.loginEvent()
					}).catch(error => {
						uni.hideLoading()
						console.error('上传图片 ', error)
					})
				} else {
					this.loginEvent()
				}
			},
			// 提交事件
			loginEvent() {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						let url = ""
						let data = {
							code: loginRes.code
						}
						if (this.isRegister) {
							url = "login.login"
						} else {
							url = "login.register"
							if (uni.getStorageSync("parentWechatId")) data.parent_wechat_id = uni.getStorageSync("parentWechatId")
							if (this.userInfo.nickname) data.nickname = this.userInfo.nickname
							if (this.userInfo.avatar) data.avatar = this.userInfo.avatar
						}
						this.$util.request(url, data).then(res => {
							uni.hideLoading()
							if (res.code == 1) {
								uni.setStorageSync('token', res.data.token);
								uni.setStorageSync("userInfo", res.data)
								this.$store.commit('user/setToken', res.data.token)
								this.$store.commit('user/setUserInfo', res.data)
								this.goBack(1)
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						}).catch(error => {
							console.error('登录/注册 ', error)
						})
					},
					fail: () => {
						uni.showToast({
							icon: "none",
							title: "授权失败，请重试"
						})
					}
				})
			},
			// #endif
			// 公众号H5登录
			// #ifndef MP-WEIXIN
			// 获取微信授权code
			getAuthCode(fn) {
				let authCode = this.getUrlCode('code')
				if (authCode) {
					const now = new Date().getTime();
					const item = {
						value: authCode,
						expiry: parseInt(now) + 240000,
					}
					sessionStorage.setItem('authCode', JSON.stringify(item));
					if (document.referrer.indexOf("open.weixin.qq.com") == -1) {
						history.back()
					} else {
						history.go(-2)
					}
				} else {
					if (this.getSessionValue('authCode')) {
						if (fn) fn()
					} else {
						var local = window.location.href;
						var appid = this.WeChatAppid
						location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + encodeURIComponent(local) + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
					}
				}
			},
			// 获取临时存储
			getSessionValue(key) {
				const itemStr = sessionStorage.getItem(key);
				if (!itemStr) {
					return null;
				}
				const item = JSON.parse(itemStr);
				const now = new Date();
				if (now.getTime() > item.expiry) {
					sessionStorage.removeItem(key);
					return null;
				}
				return item.value;
			},
			// 截取url中的code方法
			getUrlCode(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
				let url = window.location.href.split('#')[0];
				let search = url.split('?')[1];
				if (search) {
					var r = search.substr(0).match(reg);
					if (r !== null) {
						return unescape(r[2]);
					}
					return null;
				} else return null;
			},
			// 跳转用户协议和隐私政策
			toAgreement(type) {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mine/settings/agreement?type=" + type
				})
			},
			// 获取验证码
			getCaptcha() {
				if (!this.mobile) {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					})
					return
				}
				if (!this.$util.validation("phone", this.mobile)) {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号"
					})
					return
				}
				this.$util.request("login.captcha", {
					mobile: this.mobile,
					event: "mobilelogin",
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						clearInterval(this.interval)
						this.countdown = 60
						this.interval = setInterval(() => {
							if (this.countdown <= 1) {
								clearInterval(this.interval)
								this.countdown = 0
							} else this.countdown--
						}, 1000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('发送验证码', error)
				})
			},
			// 登录
			onLogin() {
				if (!this.isRead) {
					uni.showToast({
						icon: "none",
						title: "请阅读并同意用户协议和隐私政策"
					})
					return
				}
				if (!this.mobile) {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					})
					return
				}
				if (!this.$util.validation("phone", this.mobile)) {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号"
					})
					return
				}
				if (!this.captcha) {
					uni.showToast({
						icon: "none",
						title: "请输入手机验证码"
					})
					return
				}
				uni.showLoading({
					title: "登录中",
					mask: true
				})
				let data = {
					code: this.getSessionValue('authCode'),
					mobile: this.mobile,
					captcha: this.captcha,
				}
				if (uni.getStorageSync("parentWechatId")) data.parent_wechat_id = uni.getStorageSync("parentWechatId")
				this.$util.request("login.officialLogin", data).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						sessionStorage.removeItem("authCode")
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync("userInfo", res.data)
						this.$store.commit('user/setToken', res.data.token)
						this.$store.commit('user/setUserInfo', res.data)
						if (res.data.register_state == 1) {
							this.isShowInfo = true
						} else {
							this.goBack(1)
						}
					} else {
						if (res.msg.indexOf("40163") > -1) {
							sessionStorage.removeItem("authCode")
							uni.showModal({
								title: "提示",
								content: "公众号授权状态已过期，请重试",
								showCancel: false,
								confirmColor: this.themeColor,
								confirmText: "重新授权",
								success: (res) => {
									if (res.confirm) {
										this.getAuthCode()
									}
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				}).catch(error => {
					console.error('登录/注册 ', error)
				})
			},
			// 选择头像
			chooseAvatar() {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.avatarPath = res.tempFiles[0].tempFilePath
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.avatarPath = res.tempFilePaths[0]
					}
				});
				// #endif
			},
			// 更新用户头像昵称
			handleUpdateUser() {
				if (!this.avatarPath) {
					uni.showToast({
						title: "请设置头像后登录",
						icon: 'none',
					})
					return
				}
				if (!this.userInfo.nickname) {
					uni.showToast({
						title: "请设置昵称后登录",
						icon: 'none',
					})
					return
				}
				this.uploadAvatar((path) => {
					this.userInfo.avatar = path
					this.$util.request("mine.updateUser", this.userInfo).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							var userInfo = uni.getStorageSync("userInfo")
							userInfo.avatar = res.data.avatar
							userInfo.nickname = res.data.nickname
							uni.setStorageSync("userInfo", userInfo)
							this.$store.commit('user/setUserInfo', userInfo)
							this.goBack(1)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('更新用户信息 ' + error)
					})
				})
			},
			// 上传头像
			uploadAvatar(fn) {
				this.$util.uploadFile(this.avatarPath).then(res => {
					if (res.code == 1) {
						fn(res.data.url)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('上传图片 ', error)
				})
			},
			// #endif
		}
	}
</script>
<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		.container-main {
			padding: 96rpx 60rpx 0;

			.main-header {
				width: 100%;
				height: 500rpx;
				margin-bottom: 76rpx;
			}

			.main-login {
				.login-title {
					color: #585858;
					font-size: 34rpx;
				}

				.login-subtitle {
					color: #888;
					font-size: 28rpx;
					margin-top: 40rpx;
				}

				.login-info {
					margin-top: 48rpx;

					.info-item {
						display: flex;
						align-items: center;
						background: #ffffff;
						border-bottom: 1rpx solid #F6F7FB;

						.item-title {
							margin-right: 40rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #000000;
						}

						.item-avatar {
							flex: 1;
							padding: 32rpx 0;
							height: 80rpx;
							background: transparent;
							box-sizing: content-box;
							display: flex;
							justify-content: flex-start;

							&::after {
								border: none;
							}

							.image {
								width: 80rpx;
								height: 80rpx;
								border-radius: 50%;
							}
						}

						.item-nickname {
							flex: 1;
							font-size: 28rpx;
							line-height: 40rpx;
							padding: 32rpx 0;
							box-sizing: content-box;
						}
					}

					.info-btn {
						height: 88rpx;
						line-height: 88rpx;
						font-size: 28rpx;
						border-radius: 16rpx;
						text-align: center;
						background: var(--theme-color);
						color: #ffffff;

						&.cancel {
							background: #eee;
							color: #999;
							margin-top: 24rpx;
						}
					}
				}
			}

			.main-form {
				margin-top: 96rpx;

				.form-input {
					border-radius: 16rpx;
					border: 1rpx solid #F0F0F0;
					background: #FFF;
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.input {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						padding: 36rpx 32rpx;
					}

					.placeholder {
						color: #ACADB7;
					}

					.btn {
						padding: 0 24rpx;
						color: var(--theme-color);
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.countdown {
						padding: 0 24rpx;
						color: #666;
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}

				.form-btn {
					color: #FFF;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 36rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					margin-top: 48rpx;
					text-align: center;
				}

				.form-read {
					margin-top: 52rpx;

					.radio {
						width: 32rpx;
						height: 32rpx;
						background: #D6DBDE;
						border-radius: 50%;

						&.active {
							background: var(--theme-color);
						}
					}

					.label {
						margin-left: 20rpx;
						color: #5A5B6E;
						font-size: 24rpx;
						line-height: 34rpx;

						text {
							color: var(--theme-color);
						}
					}
				}
			}
		}
	}
</style>