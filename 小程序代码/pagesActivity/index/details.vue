<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 活动详情 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="活动详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<block v-if="loadEnd">
				<!-- 轮播图 -->
				<carousel :show-data="activityInfo.image_list" height="320rpx" radius="10rpx" bottom="24rpx" right="24rpx"></carousel>
				<!-- 活动信息 -->
				<view class="main-info">
					<view class="info-header flex align-items-center" v-if="activityInfo.activity_state == 1">
						<image class="header-bg" src="/static/activity/time_bg.png" mode="aspectFill"></image>
						<image class="header-icon" src="/static/activity/time.png" mode="aspectFit"></image>
						<view class="header-box flex-item flex align-items-center">
							<view class="text flex-item">距离报名结束还有</view>
							<view class="cell">{{countdown.day}}</view>
							<view class="text">天</view>
							<view class="cell">{{countdown.hours}}</view>
							<view class="text">时</view>
							<view class="cell">{{countdown.minutes}}</view>
							<view class="text">分</view>
							<view class="cell">{{countdown.seconds}}</view>
							<view class="text">秒</view>
						</view>
					</view>
					<view class="info-main">
						<view class="main-title">{{activityInfo.name}}</view>
						<view class="main-row flex align-items-center">
							<view class="price" v-if="parseFloat(activityInfo.fees || 0) > 0"><text>￥</text>{{activityInfo.fees}}</view>
							<view class="price" v-else>免费</view>
							<view class="label">
								<text class="type-1" v-if="activityInfo.activity_state == 1">报名中</text>
								<text class="type-2" v-else-if="activityInfo.activity_state == 2">进行中</text>
								<text class="type-3" v-else-if="activityInfo.activity_state == 3">已结束</text>
							</view>
							<view class="label">
								<text v-if="activityInfo.organizing_method == 1">线上活动</text>
								<text v-else-if="activityInfo.organizing_method == 2">线下活动</text>
							</view>
						</view>
						<view class="main-label" v-if="activityInfo.points_status == 1">参加活动可得{{activityInfo.points || 0}}积分</view>
						<view class="main-column flex align-items-center">
							<view class="column-icon" :style="{'background-image': 'url('+ iconTime +')'}" v-if="iconTime"></view>
							<view class="column-text flex-item">{{activityInfo.time_frame}}</view>
						</view>
						<view class="main-column flex align-items-start" v-if="activityInfo.organizing_method == 2 && activityInfo.address">
							<view class="column-icon" :style="{'background-image': 'url('+ iconLocation +')'}" v-if="iconLocation"></view>
							<view class="column-text flex-item">{{activityInfo.address}}</view>
							<view class="column-navigation flex align-items-center" @click="toNavigation()">
								<view class="icon" :style="{'background-image': 'url('+ iconNavigation +')'}" v-if="iconNavigation"></view>
								<text class="text">导航</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 已报名 -->
				<view class="main-record flex justify-content-between align-items-center" v-if="activityInfo.apply_count">
					<view class="record-bubble">已报名：{{activityInfo.apply_count}}人</view>
					<view class="record-list flex">
						<view class="list-item" v-for="(item, index) in activityInfo.apply_list" :key="index">
							<image :src="item.member_avatar" mode="aspectFill"></image>
						</view>
						<view class="list-item" v-if="parseInt(activityInfo.apply_count || 0) > 9">
							<view class="item-more flex justify-content-around align-items-center">
								<view class="point"></view>
								<view class="point"></view>
								<view class="point"></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 活动介绍 -->
				<view class="main-content">
					<mp-html :content="activityInfo.content"></mp-html>
				</view>
				<!-- 底部按钮 -->
				<view class="main-footer">
					<view class="flex justify-content-between align-items-center">
						<view class="footer-menu flex">
							<!-- #ifdef MP-WEIXIN -->
							<button type="default" open-type="share" class="menu-btn">
								<image class="icon" src="/static/share.png" mode="aspectFit"></image>
								<view class="text">分享</view>
							</button>
							<!-- #endif -->
							<view class="menu-btn" @click="onContact">
								<image class="icon" src="/static/phone.png" mode="aspectFit"></image>
								<view class="text">联系</view>
							</view>
						</view>
						<!-- 用户退款中 -->
						<block v-if="activityInfo.refund == 1 && activityInfo.pay_state == 3">
							<view class="footer-btn flex-item disabled">退款中</view>
						</block>
						<!-- 用户已报名 -->
						<block v-else-if="activityInfo.apply_status == 1">
							<view class="footer-btn flex-item" :class="{disabled: activityInfo.activity_state != 1}" @click="handleApply()">已报名</view>
						</block>
						<!-- 用户未报名 -->
						<block v-else>
							<!-- 活动报名中 -->
							<block v-if="activityInfo.activity_state == 1">
								<!-- 存在人数限制 -->
								<block v-if="activityInfo.apply_limit_number || activityInfo.apply_limit_number === 0">
									<!-- 有剩余名额 -->
									<block v-if="parseInt(activityInfo.apply_limit_number) > 0">
										<view class="footer-btn flex-item flex flex-center" @click="handleApply()" v-if="userMobile">
											<text>立即报名</text>
											<text style="font-size: 24rpx;">（剩余{{activityInfo.apply_limit_number}}个名额）</text>
										</view>
										<button class="footer-btn flex-item clear flex flex-center" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>
											<text>立即报名</text>
											<text style="font-size: 24rpx;">（剩余{{activityInfo.apply_limit_number}}个名额）</text>
										</button>
									</block>
									<!-- 无剩余名额 -->
									<view class="footer-btn flex-item disabled" v-else>
										<text>无法报名</text>
										<text style="font-size: 24rpx;">（剩余0个名额）</text>
									</view>
								</block>
								<!-- 不存在人数限制 -->
								<block v-else>
									<view class="footer-btn flex-item flex flex-center" @click="handleApply()" v-if="userMobile">立即报名</view>
									<button class="footer-btn flex-item clear flex flex-center" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>立即报名</button>
								</block>
							</block>
							<!-- 活动报名结束（进行中/已结束） -->
							<view class="footer-btn flex-item disabled" v-else>报名已结束</view>
						</block>
					</view>
					<view class="safe-padding"></view>
				</view>
			</block>
			<view class="main-login" v-else-if="showLogin">
				<image class="login-image" :src="loginImg" mode="aspectFit"></image>
				<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
				<view class="login-btn" @click="toLogin()">前往登录</view>
				<view class="login-btn cancel" @click="toBack()">返回上一页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import carousel from "@/pages/component/carousel/carousel.vue"
	import svgData from "@/common/svg.js"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			carousel,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 活动id
				activityId: null,
				// 活动详情
				activityInfo: {},
				// 活动剩余时间计时器
				activityInterval: null,
				// 活动倒计时
				countdown: {
					day: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				},
				// 是否显示登录提示
				showLogin: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconTime: state => {
					return svgData.svgToUrl("time", state.app.themeColor)
				},
				iconLocation: state => {
					return svgData.svgToUrl("location", state.app.themeColor)
				},
				iconNavigation: state => {
					return svgData.svgToUrl("navigation", state.app.themeColor)
				},
				loginImg: state => state.app.loginImg,
				userMobile: state => state.user.mobile,
			})
		},
		onLoad(option) {
			this.activityId = option.id || option.scene
			uni.showLoading({
				title: "加载中"
			})
			this.getActivity(() => {
				this.loadEnd = true
				uni.hideLoading()
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onShow() {
			if (this.loadEnd) this.getActivity()
		},
		onShareAppMessage() {
			return {
				title: this.activityInfo.name,
				path: '/pagesActivity/index/details?id=' + this.activityId,
				imageUrl: this.activityInfo.image_list[0],
			}
		},
		onShareTimeline() {
			return {
				title: this.activityInfo.name,
				path: '/pagesActivity/index/details?id=' + this.activityId,
				imageUrl: this.activityInfo.image_list[0],
			}
		},
		onUnload() {
			clearInterval(this.activityInterval)
		},
		methods: {
			// 获取活动详情
			getActivity(fn) {
				this.$util.request("activity.details", {
					id: this.activityId
				}).then(res => {
					if (res.code == 1) {
						if (res.data.activity_auth == 2) {
							this.getMemberState(1, () => {
								if (fn) fn()
								this.activityInfo = res.data
								this.activityInfo.time_frame = this.getTimeFrame(res.data.start_time, res.data.end_time)
								if (this.activityInfo.images) this.activityInfo.image_list = this.activityInfo.images.split(",")
								else this.activityInfo.image_list = []
								this.getCountdown()
							})
						} else {
							if (fn) fn()
							this.activityInfo = res.data
							this.activityInfo.time_frame = this.getTimeFrame(res.data.start_time, res.data.end_time)
							if (this.activityInfo.images) this.activityInfo.image_list = this.activityInfo.images.split(",")
							else this.activityInfo.image_list = []
							this.getCountdown()
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
						console.error('获取活动详情 ', error)
					}
				})
			},
			// 获取会员状态
			getMemberState(type, fn) {
				this.$util.request("member.state").then(res => {
					if (res.code == 1) {
						if (res.data.state.state == 6) {
							fn()
						} else if (res.data.state.state == -1) {
							uni.hideLoading()
							uni.showModal({
								title: "系统提示",
								content: type == 2 ? "该活动需成为会员后可报名" : "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: "/pages/member/apply/index"
										})
									}
								}
							})
						} else {
							uni.hideLoading()
							uni.showModal({
								title: "系统提示",
								content: type == 2 ? "该活动需成为会员后可报名" : "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
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
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('获取会员状态 ', error)
				})
			},
			// 获取活动剩余时间
			getCountdown() {
				let nowTime = new Date().getTime()
				this.countdown = this.$util.getTimeDifference(nowTime, this.activityInfo.apply_time * 1000)
				if (this.countdown.day == 0 && this.countdown.hours == 0 && this.countdown.minutes == 0 && this.countdown.seconds == 0) {
					this.activityInfo.activity_state = 2
					clearInterval(this.activityInterval)
				} else {
					this.activityInterval = setInterval(() => {
						let nowTime = new Date().getTime()
						this.countdown = this.$util.getTimeDifference(nowTime, this.activityInfo.apply_time * 1000)
						if (this.countdown.day == 0 && this.countdown.hours == 0 && this.countdown.minutes == 0 && this.countdown.seconds == 0) {
							this.activityInfo.activity_state = 2
							clearInterval(this.activityInterval)
						}
					}, 1000);
				}
			},
			// 获取时间范围
			getTimeFrame(start, end) {
				let startTime = this.$util.formatDate(start, "object")
				let endTime = this.$util.formatDate(end, "object")
				let startResult = `${startTime.year}-${startTime.month}-${startTime.day} ${startTime.hours}:${startTime.minutes}`
				let endResult = `${endTime.year}-${endTime.month}-${endTime.day} ${endTime.hours}:${endTime.minutes}`
				return startResult + "—" + endResult
			},
			// 跳转地图导航
			toNavigation() {
				this.$util.toPage({
					mode: 7,
					address: {
						latitude: this.activityInfo.latitude,
						longitude: this.activityInfo.longitude,
						address: this.activityInfo.address,
					},
				})
			},
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
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "wx-open-launch-weapp"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData", 'wx-open-launch-weapp'],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.activityInfo.name,
								desc: "",
								link: window.location.href,
								imgUrl: this.activityInfo.image_list[0],
							});
							wx.updateTimelineShareData({
								title: this.activityInfo.name,
								link: window.location.href,
								imgUrl: this.activityInfo.image_list[0],
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
			// 联系
			onContact() {
				this.$util.toPage({
					mode: 6,
					phone: this.activityInfo.mobile,
				})
			},
			// 立即报名
			handleApply() {
				if (this.activityInfo.non_member_registration_status == 2) {
					uni.showLoading({
						title: "加载中",
						mask: true,
					})
					this.getMemberState(2, () => {
						uni.hideLoading()
						this.toApplication()
					})
				} else {
					this.toApplication()
				}
			},
			// 跳转报名页面
			toApplication() {
				if (this.activityInfo.apply_status == 1) {
					uni.showModal({
						content: "您已报名此活动，是否前往查看？",
						confirmColor: this.themeColor,
						confirmText: "前往查看",
						success: (res) => {
							if (res.confirm) {
								this.$util.toPage({
									mode: 2,
									path: `/pagesActivity/order/details?id=${this.activityInfo.apply_id}&activity_id=${this.activityId}`
								})
							}
						}
					})
				} else {
					if (this.activityInfo.apply_field_state == 1 && this.activityInfo.apply_info_fill_state != 1) {
						this.$util.toPage({
							mode: 1,
							path: "/pagesActivity/index/apply?id=" + this.activityId
						})
					} else {
						this.$util.toPage({
							mode: 1,
							path: "/pagesActivity/index/order?id=" + this.activityId
						})
					}
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
									this.handleApply()
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

			.main-info {
				border-radius: 16rpx;
				background: #ffffff;
				overflow: hidden;
				margin-top: 32rpx;

				.info-header {
					background: linear-gradient(134.71deg, var(--theme-color) -1.001%, #ffffff 300%);
					padding: 24rpx 32rpx;
					position: relative;

					.header-bg {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
					}

					.header-icon {
						width: 48rpx;
						height: 48rpx;
						position: relative;
						z-index: 1;
					}

					.header-box {
						position: relative;
						z-index: 1;

						.text {
							color: #ffffff;
							font-size: 24rpx;
							line-height: 34rpx;
							margin-left: 8rpx;
						}

						.cell {
							color: #ffffff;
							font-size: 24rpx;
							height: 48rpx;
							line-height: 48rpx;
							padding: 0 8rpx;
							min-width: 48rpx;
							border-radius: 4rpx;
							backdrop-filter: blur(20rpx);
							background: rgba(255, 255, 255, 0.4);
							margin-left: 8rpx;
							text-align: center;
						}
					}
				}

				.info-main {
					padding: 32rpx;

					.main-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.main-row {
						margin-top: 24rpx;

						.price {
							color: var(--theme-color);
							font-size: 40rpx;
							font-weight: 600;
							line-height: 50rpx;

							text {
								font-size: 22rpx
							}
						}

						.label {
							margin-left: 16rpx;

							text {
								display: block;
								color: var(--theme-color);
								font-size: 24rpx;
								line-height: 34rpx;
								padding: 6rpx 14rpx;
								border: 2rpx solid var(--theme-color);
								border-radius: 4rpx;
							}

							.type-1 {
								color: #FFA820;
								border-color: #FFA820;
							}

							.type-2 {
								color: #00AE84;
								border-color: #00AE84;
							}

							.type-3 {
								color: #E60012;
								border-color: #E60012;
							}
						}
					}

					.main-label {
						margin-top: 24rpx;
						color: #FF8112;
						font-size: 24rpx;
						line-height: 36rpx;
						padding: 14rpx 24rpx;
						border-radius: 16rpx;
						background: #FFF9EF;
					}

					.main-column {
						margin-top: 24rpx;

						.column-icon {
							width: 32rpx;
							height: 40rpx;
							background-size: 32rpx 40rpx;
						}

						.column-text {
							margin-left: 10rpx;
							color: #666666;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.column-navigation {
							margin-left: 16rpx;

							.icon {
								width: 32rpx;
								height: 32rpx;
								background-size: 32rpx;
							}

							.text {
								margin-left: 8rpx;
								color: var(--theme-color);
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}
					}
				}
			}

			.main-record {
				padding: 12rpx 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.record-bubble {
					color: #ffffff;
					font-size: 20rpx;
					line-height: 28rpx;
					padding: 8rpx 16rpx;
					background: var(--theme-color);
					border-radius: 8rpx;
					display: flex;
					align-items: center;
					position: relative;

					&::after {
						content: "";
						display: block;
						position: absolute;
						top: 50%;
						right: -10rpx;
						transform: translateY(-50%);
						width: 0;
						height: 0;
						border-top: 12rpx solid transparent;
						border-bottom: 12rpx solid transparent;
						border-left: 12rpx solid var(--theme-color);
					}
				}

				.record-list {
					padding: 16rpx;
					width: 452rpx;
					border-radius: 8rpx;
					// background: #F6F7FB;

					.list-item {
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-left: -7rpx;
						border: 2rpx solid #ffffff;

						.item-more {
							width: 100%;
							height: 100%;
							background: var(--theme-color);
							padding: 0 6rpx;

							.point {
								width: 6rpx;
								height: 6rpx;
								background: #ffffff;
								border-radius: 50%;
							}
						}
					}
				}
			}

			.main-content {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				color: #5A5B6E;
				font-size: 28rpx;
				line-height: 48rpx;
				margin-top: 32rpx;
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 12rpx 32rpx 12rpx 48rpx;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;

				.footer-menu {
					.menu-btn {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-right: 32rpx;
						background: transparent;
						padding: 0;

						.icon {
							width: 52rpx;
							height: 52rpx;
						}

						.text {
							color: #5A5B6E;
							font-size: 20rpx;
							line-height: 28rpx;
						}
					}
				}

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;

					&.disabled {
						background: #8D929C;
					}
				}
			}

			.main-login {
				padding: 64rpx 28rpx 0;

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