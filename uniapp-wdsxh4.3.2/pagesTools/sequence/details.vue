<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 活动接龙详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="活动接龙详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<block v-if="loadEnd">
				<!-- 接龙信息 -->
				<view class="main-column">
					<view class="column-title text-ellipsis-more">{{ chainsInfo.name }}</view>
					<view class="column-publisher flex align-items-center">
						<image class="publisher-avatar" :src="chainsInfo.avatar" mode="aspectFill"></image>
						<view class="publisher-info">
							<view class="info-top flex align-items-center">
								<view class="top-name">{{ chainsInfo.member_name }}</view>
								<view class="top-level">{{ chainsInfo.level_name }}</view>
							</view>
							<view class="info-time">{{ chainsInfo.createtime }}</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<button class="publisher-share flex align-items-center" open-type="share">
							<image class="share-icon" src="/static/invite.png" mode="aspectFill"></image>
							<text class="share-text">邀请填写</text>
						</button>
						<!-- #endif -->
					</view>
					<view class="column-time">
						<view class="time-text">结束时间：{{ chainsInfo.expire_time }}</view>
						<view class="time-bg"></view>
					</view>
					<view class="column-content">
						<text user-select>{{ chainsInfo.content }}</text>
					</view>
				</view>
				<!-- 接龙完成情况 -->
				<view class="main-situation">
					<view class="situation-title">接龙完成情况</view>
					<view class="situation-list" v-if="situationList.length">
						<view class="list-item" :class="{select: item.status == 1}" v-for="(item, index) in situationList" :key="index" @click="handleFeedback(index)">
							<text class="item-name">{{item.member_name}}</text>
							<view class="item-select" v-if="item.status == 1">
								<image src="/static/tick.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<view class="situation-empty" v-else>
						<image class="empty-icon" src="/static/empty.png" mode="aspectFit"></image>
						<view class="empty-text flex align-items-center">
							<text class="text">暂无接龙人员，</text>
							<view class="btn" @click="toFeedback()" v-if="userMobile">去反馈</view>
							<button class="btn clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>去反馈</button>
						</view>
					</view>
				</view>
				<!-- 底部按钮 -->
				<view class="main-footer">
					<view class="flex align-items-center">
						<view class="footer-label" @click="onContact()">
							<image class="label-icon" src="/static/phone.png" mode="aspectFit"></image>
							<view class="label-text">联系电话</view>
						</view>
						<block v-if="feedbackResult.status == 2">
							<view class="footer-btn flex-item" @click="toFeedback()" v-if="userMobile">我要接龙</view>
							<button class="footer-btn flex-item clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>我要接龙</button>
						</block>
						<view class="footer-btn flex-item" @click="viewFeedback(chainsInfo.id)" v-else>查看反馈</view>
					</view>
					<view class="safe-padding"></view>
				</view>
			</block>
			<view class="main-login" v-else-if="showLogin">
				<image class="login-image" :src="loginImg" mode="aspectFit"></image>
				<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
				<view class="login-btn" :style="{background: themeColor}" @click="toLogin()">前往登录</view>
				<view class="login-btn cancel" @click="toBack()">返回上一页</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 接龙id
				chainsId: 0,
				// 反馈结果 
				feedbackResult: {},
				// 接龙详情
				chainsInfo: {},
				// 接龙情况
				situationList: [],
				// 是否显示登录提示
				showLogin: false,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				jielongImg: state => state.app.jielongImg,
				loginImg: state => state.app.loginImg,
				userMobile: state => state.user.mobile,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.chainsId = option.id || option.scene
			this.getFeedbackResult()
			this.getChainsInfo(() => {
				uni.hideLoading()
				this.loadEnd = true
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onShow() {
			if (this.loadEnd) {
				this.getFeedbackResult()
				this.getChainsInfo()
			}
		},
		onShareAppMessage() {
			return {
				title: this.chainsInfo.name,
				path: '/pagesTools/sequence/details?id=' + this.chainsId,
				imageUrl: this.jielongImg,
			}
		},
		onShareTimeline() {
			return {
				title: this.chainsInfo.name,
				path: '/pagesTools/sequence/details?id=' + this.chainsId,
				imageUrl: this.jielongImg,
			}
		},
		methods: {
			// #ifdef H5
			// 微信公众号初始化方法
			initConfig() {
				this.$util.request("main.WeChatConfig", {
					url: location.href.split('#')[0]
				}).then(res => {
					if (res.code == 1) {
						wx.config({
							debug: false,
							appId: res.data.appId,
							timestamp: Number(res.data.timestamp),
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData"],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.chainsInfo.name,
								desc: "",
								link: window.location.href,
								imgUrl: this.jielongImg,
							});
							wx.updateTimelineShareData({
								title: this.chainsInfo.name,
								link: window.location.href,
								imgUrl: this.jielongImg,
							});
						});
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
			// 获取详情
			getChainsInfo(fn) {
				this.$util.request("sequence.chainsDetails", {
					id: this.chainsId,
				}).then(res => {
					if (res.code == 1) {
						if (res.data.data.jielong_auth == 2) {
							this.getMemberState(() => {
								if (fn) fn()
								this.chainsInfo = res.data.data
								this.situationList = res.data.member_data
							})
						} else {
							if (fn) fn()
							this.chainsInfo = res.data.data
							this.situationList = res.data.member_data
						}
					} else {
						if (fn) fn()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (error == 401) {
						this.showLogin = true
					} else {
						console.error('获取详情 ', error)
					}
				})
			},
			// 获取会员状态
			getMemberState(fn) {
				this.$util.request("member.state").then(res => {
					if (res.code == 1) {
						if (res.data.state.state == 6) {
							fn()
						} else if (res.data.state.state == -1) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: "/pages/member/apply/index"
										})
									} else {
										uni.switchTab({
											url: "/pages/index/index"
										})
									}
								}
							})
						} else {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "前往查看",
								success: (res) => {
									if (res.confirm) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									} else {
										uni.switchTab({
											url: "/pages/index/index"
										})
									}
								}
							})
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取会员状态 ', error)
				})
			},
			// 获取反馈结果
			getFeedbackResult(fn) {
				this.$util.request("sequence.feedbackResult", {
					id: this.chainsId,
				}).then(res => {
					if (res.code == 1) {
						this.feedbackResult = res.data
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取反馈结果', error)
				})
			},
			// 点击名字去反馈
			handleFeedback(index) {
				if (!this.userMobile) return
				const item = this.situationList[index]
				if (this.chainsInfo.type == 2 && this.feedbackResult.id == item.id) {
					if (this.feedbackResult.status == 1) {
						uni.showToast({
							title: "您已反馈过该接龙",
							icon: "none",
							duration: 2000,
						})
					} else {
						this.getChainsSeniority(() => {
							const data = {
								jielong_id: this.chainsId,
								member_id: this.feedbackResult.id,
								name: this.feedbackResult.name,
							}
							this.$util.toPage({
								mode: 1,
								path: `/pagesTools/sequence/feedback?data=${JSON.stringify(data)}`,
							})
						})
					}
				}
			},
			// 前往反馈
			toFeedback() {
				if (this.feedbackResult.status == 1) {
					uni.showToast({
						title: "您已反馈过该接龙",
						icon: "none",
						duration: 2000,
					})
				} else {
					this.getChainsSeniority(() => {
						const data = {
							jielong_id: this.chainsId,
							member_id: this.feedbackResult.id,
							name: this.feedbackResult.name,
						}
						this.$util.toPage({
							mode: 1,
							path: `/pagesTools/sequence/feedback?data=${JSON.stringify(data)}`,
						})
					})
				}
			},
			// 获取限定接龙资格
			getChainsSeniority(fn) {
				if (this.chainsInfo.type == 2) {
					uni.showLoading({
						title: "加载中",
						mask: true,
					})
					this.$util.request("sequence.chainsSeniority", {
						id: this.chainsId,
					}).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							if (res.data.state == 1) {
								fn()
							} else {
								uni.showToast({
									title: "您无法参加此限定接龙，请联系管理员添加",
									icon: 'none',
									duration: 2500
								})
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('获取限定接龙资格', error)
					})
				} else {
					fn()
				}
			},
			// 绑定手机号
			bindPhoneNumber(e) {
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.showLoading({
						mask: true,
						title: "加载中",
					})
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							let data = e.detail
							data.code = loginRes.code
							this.$util.request("login.bindMobile", data).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									this.$store.commit('user/updateMobile', res.data.phoneNumber)
									this.toFeedback()
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('获取用户手机号码 ', error)
							})
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								icon: "none",
								title: "授权手机号失败，请重试"
							})
						}
					});
				} else {
					uni.showToast({
						title: '获取手机号失败，请重新获取',
						icon: 'none'
					})
				}
			},
			// 查看反馈信息
			viewFeedback(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesTools/sequence/feedInfo?id=" + id
				})
			},
			// 联系电话 
			onContact() {
				this.$util.toPage({
					mode: 6,
					phone: this.chainsInfo.mobile,
				})
			},
			// 前往登录
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/index",
				})
			},
			// 返回上一页
			toBack() {
				if (getCurrentPages().length == 1) {
					this.$util.toPage({
						mode: 1,
						path: "/pages/index/index"
					})
				} else {
					uni.navigateBack()
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-column {
				padding: 32rpx;
				border-radius: 10rpx;
				background: #FFFFFF;

				.column-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.column-publisher {
					margin-top: 32rpx;

					.publisher-avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.publisher-info {
						flex: 1;
						margin-left: 16rpx;

						.info-top {
							.top-name {
								color: #5A5B6E;
								font-size: 28rpx;
								font-weight: 600;
								line-height: 40rpx;
							}

							.top-level {
								margin-left: 8rpx;
								color: var(--theme-color);
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}

						.info-time {
							margin-top: 6rpx;
							color: #8D929C;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}

					.publisher-share {
						margin-left: 24rpx;
						padding: 12rpx;
						border-radius: 8rpx;
						background: var(--theme-color);

						.share-icon {
							width: 32rpx;
							height: 32rpx;
							margin-right: 8rpx;
						}

						.share-text {
							color: #FFF;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}
				}

				.column-time {
					position: relative;
					z-index: 1;
					margin-top: 32rpx;
					padding: 16rpx 32rpx;
					border-radius: 8rpx;
					overflow: hidden;
					background: #FFF;

					.time-text {
						color: #5A5B6E;
						font-size: 24rpx;
						line-height: 32rpx;
						text-align: center;
					}

					.time-bg {
						position: absolute;
						z-index: -1;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						background: var(--theme-color);
						opacity: .05;
					}
				}

				.column-content {
					margin-top: 32rpx;
					color: #8D929C;
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}

			.main-situation {
				padding: 32rpx;
				border-radius: 10rpx;
				background: #FFFFFF;

				.situation-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.situation-list {
					margin-top: 32rpx;
					display: flex;
					flex-wrap: wrap;
					gap: 16rpx;

					.list-item {
						position: relative;
						padding: 10rpx 14rpx;
						border: 2rpx solid #F6F7FB;
						border-radius: 8rpx;
						background: #F6F7FB;

						.item-name {
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.item-select {
							position: absolute;
							top: -2rpx;
							right: -2rpx;
							z-index: 1;
							width: 16rpx;
							height: 16rpx;
							background: var(--theme-color);
							border-radius: 50%;
							overflow: hidden;
						}

						&.select {
							border-color: var(--theme-color);
						}
					}
				}

				.situation-empty {
					margin-top: 32rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 16rpx;

					.empty-icon {
						width: 128rpx;
						height: 128rpx;
						margin-bottom: 16rpx;
					}

					.empty-text {
						.text {
							color: #8D929C;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.btn {
							color: var(--theme-color);
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				background: #FFF;
				padding: 12rpx 24rpx;
				z-index: 99;

				.footer-label {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 32rpx;

					.label-icon {
						width: 52rpx;
						height: 52rpx;
					}

					.label-text {
						color: #5A5B6E;
						text-align: center;
						font-size: 20rpx;
						line-height: 28rpx;
					}
				}

				.footer-btn {
					padding: 22rpx 32rpx;
					background: var(--theme-color);
					border-radius: 16rpx;
					color: #FFF;
					text-align: center;
					font-size: 32rpx;
					line-height: 44rpx;
				}
			}

			.main-login {
				padding: 96rpx 60rpx 0;

				.login-image {
					width: 100%;
					height: 500rpx;
				}

				.login-tips {
					color: #585858;
					font-size: 36rpx;
					line-height: 50rpx;
					margin-top: 48rpx;
					text-align: center;
				}

				.login-btn {
					margin-top: 56rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 28rpx;
					border-radius: 16rpx;
					text-align: center;
					background: var(--theme-color);
					color: #ffffff;

					&.cancel {
						background: #dedede;
						color: #999;
						margin-top: 48rpx;
					}
				}
			}
		}
	}
</style>