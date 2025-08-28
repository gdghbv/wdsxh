<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 消息订阅 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="消息订阅"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header" :style="{top: titleBarHeight + 'px'}">建议您在订阅授权窗口点选“总是允许”选框，以便正常收到消息提醒，订阅按钮上的数字表示订阅消息可发送的次数。</view>
			<view class="main-list">
				<view class="list-item flex align-items-center">
					<view class="item-info flex-item">
						<view class="info-title text-ellipsis">会员入会申请通知</view>
						<view class="info-subtitle text-ellipsis">新用户申请入会时向管理员发送提醒</view>
					</view>
					<view class="item-btn" @click="handleSubscribe()">
						<view class="btn" :style="{background: themeColor}">订阅</view>
						<view class="point" v-if="parseInt(subscribeCount) > 0">{{subscribeCount}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 是否订阅
				subscribeCount: 0
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				subscribeId: state => state.app.subscribeNotifyIds.applet_initiation_admin,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getSubscribe(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onPullDownRefresh() {
			this.getSubscribe(() => {
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			// 获取订阅数量
			getSubscribe(fn) {
				this.$util.request("main.message.count").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.subscribeCount = res.data.subscribe_count
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取订阅数量 ', error)
				})
			},
			// 订阅
			handleSubscribe() {
				// #ifdef MP-WEIXIN
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.subscribeMessage(() => {
					this.$util.request("main.message.subscribe").then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							uni.showToast({
								icon: 'success',
								title: '订阅成功'
							})
							this.getSubscribe()
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('提交订阅消息 ', error)
					})
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.showToast({
					icon: "none",
					title: "请前往小程序端订阅",
					duration: 2500
				})
				// #endif
			},
			// 订阅消息
			subscribeMessage(fn, number = 0) {
				uni.requestSubscribeMessage({
					tmplIds: this.subscribeId ? [this.subscribeId] : [],
					success: (res) => {
						if (res[this.subscribeId] == 'accept') {
							fn()
						} else {
							uni.hideLoading()
							uni.showToast({
								icon: 'error',
								title: '订阅失败'
							})
						}
					},
					fail: (error) => {
						if (error.errCode == 20004) {
							uni.hideLoading()
							uni.showModal({
								title: '提示',
								content: '请前往设置打开接受通知',
								confirmText: '确定',
								showCancel: false,
							})
						} else if (error.errCode) {
							uni.hideLoading()
							uni.showModal({
								title: '提示',
								content: '消息订阅失败，无法接收到订阅通知，错误码：' + error.errCode,
								confirmText: '确定',
								showCancel: false,
							})
						} else if (++number > 3) {
							this.subscribeMessage(fn, number)
						} else {
							fn()
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-header {
				color: #F6F7FB;
				font-size: 24rpx;
				line-height: 34rpx;
				padding: 32rpx;
				background: #5A5B6E;
				position: sticky;
				top: 0;
				z-index: 99;
			}

			.main-list {
				padding: 32rpx;

				.list-item {
					margin-top: 32rpx;
					border-radius: 16rpx;
					background: #ffffff;
					padding: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.item-info {
						.info-title {
							color: #5A5B6E;
							font-size: 32rpx;
							font-weight: 600;
							line-height: 44rpx;
						}

						.info-subtitle {
							margin-top: 24rpx;
							color: #999999;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}

					.item-btn {
						margin-left: 24rpx;
						position: relative;

						.btn {
							color: #F6F7FB;
							font-size: 28rpx;
							line-height: 40rpx;
							padding: 12rpx 32rpx;
							min-width: 160rpx;
							border-radius: 8rpx;
							text-align: center;
						}

						.point {
							position: absolute;
							top: -12rpx;
							right: -12rpx;
							color: #F6F7FB;
							font-size: 24rpx;
							line-height: 30rpx;
							text-align: center;
							min-width: 32rpx;
							height: 32rpx;
							border-radius: 16rpx;
							padding: 0 4rpx;
							border: 2rpx solid #F6F7FB;
							background: #FF0000;
						}
					}
				}
			}
		}
	}
</style>