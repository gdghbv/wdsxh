<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 订单支付 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="订单支付"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-info">
				<view class="info-label">订单需要支付</view>
				<view class="info-value"><text>￥</text>{{orderAmount}}</view>
			</view>
			<view class="main-footer">
				<button class="footer-btn" :style="{ background: themeColor }" @click="handlePayment()">立即支付</button>
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
				// 支付金额
				orderAmount: "",
				// 订单id
				orderId: "",
			}
		},
		onLoad(option) {
			this.orderAmount = option.money
			this.orderId = option.id
			this.$nextTick(() => {
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
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
			// 支付
			handlePayment() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$util.request("mall.preparePay", {
					order_id: this.orderId
				}).then(res => {
					if (res.code == 1) {
						const data = res.data
						// #ifdef MP-WEIXIN
						uni.requestPayment({
							provider: "wxpay",
							...data,
							success: (res) => {
								uni.hideLoading();
								if (res.errMsg == "requestPayment:ok") {
									uni.redirectTo({
										url: "/pagesMall/order/success?id=" + this.orderId
									})
								}
							},
							fail: () => {
								uni.hideLoading();
								uni.showToast({
									title: "支付已取消",
									icon: "none",
									duration: 1000
								})
							},
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
									uni.hideLoading();
									if (res.errMsg == "chooseWXPay:ok") {
										uni.redirectTo({
											url: "/pagesMall/order/success?id=" + this.orderId
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
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取支付参数', error)
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-info {
				background: #FFF;
				padding: 48rpx 32rpx;
				border-radius: 20rpx;

				.info-label {
					color: #5A5B6E;
					text-align: center;
					font-size: 32rpx;
					line-height: 44rpx;
				}

				.info-value {
					margin-top: 32rpx;
					color: #E10602;
					font-size: 72rpx;
					font-weight: 600;
					line-height: 100rpx;
					text-align: center;

					text {
						font-size: 32rpx;
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 16rpx 24rpx;
				background: #FFF;
				border-top: 1rpx solid #F6F7FB;

				.footer-btn {
					color: #FFF;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 20rpx 32rpx;
					border-radius: 40rpx;
					text-align: center;
				}
			}
		}
	}
</style>