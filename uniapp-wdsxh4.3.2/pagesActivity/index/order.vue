<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 订单详情 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="订单详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-card flex">
				<image class="card-avatar" :src="activityInfo.image" mode="aspectFill"></image>
				<view class="card-box flex-item flex-direction-column justify-content-between">
					<view class="box-title text-ellipsis-more">{{activityInfo.name}}</view>
					<view class="box-label flex">
						<view class="label">
							<text class="type-1" v-if="activityInfo.state == 1">报名中</text>
							<text class="type-2" v-else-if="activityInfo.state == 2">进行中</text>
							<text class="type-3" v-else-if="activityInfo.state == 3">已结束</text>
						</view>
						<view class="label">
							<text v-if="activityInfo.organizing_method == 1">线上活动</text>
							<text v-else-if="activityInfo.organizing_method == 2">线下活动</text>
						</view>
					</view>
				</view>
			</view>
			<view class="main-info">
				<view class="info-title">活动信息</view>
				<view class="info-main">
					<view class="main-item">
						<view class="title">活动时间</view>
						<text class="value">{{activityInfo.time_frame}}</text>
					</view>
					<view class="main-item">
						<view class="title">联系信息</view>
						<text class="value">{{activityInfo.contacts}} {{activityInfo.mobile}}</text>
					</view>
					<view class="main-item">
						<view class="title">支付金额</view>
						<text class="value" :style="{color: themeColor}" v-if="parseFloat(activityInfo.fees) > 0">￥{{activityInfo.fees}}</text>
						<text class="value" :style="{color: themeColor}" v-else>免费</text>
					</view>
				</view>
			</view>
			<view class="main-footer">
				<view class="flex justify-content-between align-items-center">
					<view class="footer-price flex align-items-center" v-if="parseFloat(activityInfo.fees) > 0">
						<view class="unit">￥</view>
						<view class="number">{{activityInfo.fees}}</view>
					</view>
					<view class="footer-btn flex-item" @click="handleSubmit">{{parseFloat(activityInfo.fees) > 0 ? "立即支付" : "立即报名"}}</view>
				</view>
				<view class="safe-padding"></view>
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
				// 活动id
				activityId: null,
				// 活动详情
				activityInfo: {},
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				subscribeId: state => state.app.subscribeNotifyIds.applet_activity_apply,
			})
		},
		onLoad(option) {
			this.activityId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getActivity(() => {
				this.loadEnd = true
				uni.hideLoading()
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		methods: {
			// 获取活动详情
			getActivity(fn) {
				this.$util.request("activity.details", {
					id: this.activityId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.activityInfo = res.data
						this.activityInfo.time_frame = this.getTimeFrame(res.data.start_time, res.data.end_time)
						if (this.activityInfo.images) this.activityInfo.image = this.activityInfo.images.split(",")[0]
						else this.activityInfo.image_list = ""
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取活动详情 ', error)
				})
			},
			// 获取时间范围
			getTimeFrame(start, end) {
				let startTime = this.$util.formatDate(start, "object")
				let endTime = this.$util.formatDate(end, "object")
				let startResult = `${String(startTime.year).slice(2)}/${startTime.month}/${startTime.day} ${startTime.hours}:${startTime.minutes}`
				let endResult = `${String(endTime.year).slice(2)}/${endTime.month}/${endTime.day} ${endTime.hours}:${endTime.minutes}`
				return startResult + "~" + endResult
			},
			// 提交报名
			async handleSubmit() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.subscribeMessage(() => {
					var formData = { activity_id: this.activityId }
					if (this.activityInfo.apply_field_state == 1) formData.data = this.$store.state.app.activityField
					this.$util.request("activity.submit", formData).then(res => {
						if (res.code == 1) {
							if (res.data) {
								this.onPayment(res.data)
							} else {
								uni.reLaunch({
									url: "/pagesActivity/index/success?freeType=1",
									success: () => {
										uni.hideLoading()
									}
								})
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(error => {
						console.error('活动报名 ', error)
					})
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
							jsApiList: ['chooseWXPay']
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
			// 立即支付
			onPayment(data) {
				// #ifdef MP-WEIXIN
				uni.requestPayment({
					provider: "wxpay",
					...data,
					success: () => {
						uni.hideLoading()
						uni.reLaunch({
							url: "/pagesActivity/index/success"
						})
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '支付已取消',
							icon: 'none'
						})
					}
				})
				// #endif
				// #ifdef H5
				wx.ready(() => {
					uni.hideLoading()
					wx.chooseWXPay({
						timestamp: data.timeStamp,
						package: data.package,
						nonceStr: data.nonceStr,
						signType: data.signType,
						paySign: data.paySign,
						success: (res) => {
							uni.hideLoading()
							if (res.errMsg == "chooseWXPay:ok") {
								uni.reLaunch({
									url: "/pagesActivity/index/success"
								})
							} else {
								uni.showToast({
									title: '支付失败',
									icon: 'error'
								})
							}
						},
						fail: () => {
							uni.hideLoading();
							uni.showToast({
								title: '支付已取消',
								icon: 'none'
							})
						},
					});
				});
				// #endif
			},
			// 订阅消息
			subscribeMessage(fn, number = 0) {
				// #ifdef MP-WEIXIN
				uni.requestSubscribeMessage({
					tmplIds: this.subscribeId ? [this.subscribeId] : [],
					success: () => {
						fn()
					},
					fail: (error) => {
						if (error.errCode == 20004) {
							uni.hideLoading()
							uni.showModal({
								title: '提示',
								content: '请前往设置打开接受通知',
								confirmColor: this.themeColor,
								confirmText: '继续报名',
								success: (res) => {
									if (res.confirm) {
										fn()
									}
								},
							})
						} else if (error.errCode) {
							uni.hideLoading()
							uni.showModal({
								title: '提示',
								content: '消息订阅失败，无法接收到活动通知，错误码：' + error.errCode,
								confirmColor: this.themeColor,
								confirmText: '继续报名',
								success: (res) => {
									if (res.confirm) {
										fn()
									}
								},
							})
						} else if (++number > 3) {
							this.subscribeMessage(fn, number)
						} else {
							fn()
						}
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				fn()
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-card {
				border-radius: 10rpx;
				background: #ffffff;
				padding: 32rpx;

				.card-avatar {
					width: 200rpx;
					height: 160rpx;
					border-radius: 16rpx;
				}

				.card-box {
					margin-left: 32rpx;

					.box-title {
						color: #5A5B6E;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 40rpx;
					}

					.box-label {
						margin-top: 16rpx;

						.label {
							margin-right: 16rpx;

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
				}
			}

			.main-info {
				border-radius: 10rpx;
				background: #ffffff;
				padding: 24rpx 32rpx 32rpx;
				margin-top: 32rpx;

				.info-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.info-main {
					margin-top: 32rpx;

					.main-item {
						margin-top: 48rpx;
						display: flex;
						overflow: hidden;

						&:first-child {
							margin-top: 0;
						}

						.title {
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.value {
							margin-left: 32rpx;
							color: #8D929C;
							font-size: 28rpx;
							line-height: 40rpx;
							flex: 1;
							word-break: break-all;
							display: flex;
							justify-content: flex-end;
						}
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 12rpx 32rpx;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;

				.footer-price {
					margin-right: 40rpx;

					.unit {
						color: var(--theme-color);
						font-size: 32rpx;
						line-height: 44rpx;
					}

					.number {
						margin-left: 16rpx;
						color: var(--theme-color);
						font-size: 40rpx;
						font-weight: 600;
						line-height: 56rpx;
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
				}
			}
		}
	}
</style>