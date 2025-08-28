<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 会费缴纳 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="会费缴纳"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header">
				<view class="header-price">{{payFees}}<text>元</text></view>
				<view class="header-tag">会费缴纳</view>
			</view>
			<view class="main-content">
				<view class="content-column">
					<view class="column-title">支付方式</view>
					<view class="column-method">
						<view class="method-item flex align-items-center" @click="payMethod = 1" v-if="optionalPayMethod == 2 || optionalPayMethod == 4">
							<view class="icon" :style="{'background-image': 'url('+ iconPay +')'}" v-if="iconPay"></view>
							<view class="name flex-item">线上缴费</view>
							<view class="radio" :class="{active: payMethod == 1}">
								<image src="/static/tick.png" mode="aspectFill" v-if="payMethod == 1"></image>
							</view>
						</view>
						<view class="method-item flex align-items-center" @click="payMethod = 2" v-if="optionalPayMethod == 3 || optionalPayMethod == 4">
							<view class="icon" :style="{'background-image': 'url('+ iconPay +')'}" v-if="iconPay"></view>
							<view class="name flex-item">线下缴费</view>
							<view class="radio" :class="{active: payMethod == 2}">
								<image src="/static/tick.png" mode="aspectFill" v-if="payMethod == 2"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="content-column" v-if="payMethod == 2">
					<view class="column-title">支付凭证</view>
					<view class="column-upload">
						<view class="upload-image" v-if="certificate" @click="previewImage()">
							<image class="image-select" :src="certificate" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage()"></image>
						</view>
						<view class="upload-image" v-else @click="chooseImage()">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传图片</view>
							</view>
						</view>
					</view>
				</view>
				<view class="content-column" v-if="payMethod == 2">
					<view class="column-title">汇款账户信息</view>
					<view class="column-info">
						<view class="info-item flex">
							<view class="item-content flex-item">开户名称：{{accountInfo.bank_account_name || ""}}</view>
							<view class="item-copy" @click="handleCopy(accountInfo.bank_account_name || '')">复制</view>
						</view>
						<view class="info-item flex">
							<view class="item-content flex-item">收款账号：{{accountInfo.receiving_account || ""}}</view>
							<view class="item-copy" @click="handleCopy(accountInfo.receiving_account || '')">复制</view>
						</view>
						<view class="info-item flex">
							<view class="item-content flex-item">银行名称：{{accountInfo.bank_name || ""}}</view>
							<view class="item-copy" @click="handleCopy(accountInfo.bank_name || '')">复制</view>
						</view>
					</view>
				</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="toPayment" v-if="payMethod == 1">立即支付</view>
				<view class="footer-btn" @click="toSubmit" v-else>提交审核</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 可选支付方式 缴费方式: 2=线上缴费, 3=线下缴费, 4=线上缴费+线下缴费
				optionalPayMethod: 4,
				// 支付方式
				payMethod: 1,
				// 支付凭证
				certificate: "",
				// 支付费用
				payFees: 0,
				// 汇款账户信息
				accountInfo: {},
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconPay: state => {
					return svgData.svgToUrl("pay", state.app.themeColor)
				},
			})
		},
		onLoad(option) {
			this.optionalPayMethod = option.method
			if (this.optionalPayMethod == 3) this.payMethod = 2
			else this.payMethod = 1
			this.payFees = option.fees
			if (this.optionalPayMethod == 3 || this.optionalPayMethod == 4) {
				uni.showLoading({
					title: "加载中"
				})
				this.getAccountInfo(() => {
					uni.hideLoading()
					this.loadEnd = true
				})
			} else {
				this.$nextTick(() => {
					this.loadEnd = true
				})
			}
			// #ifdef H5
			this.initConfig()
			// #endif
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
			// 线上立即支付
			toPayment() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$util.request("member.payOnline").then(res => {
					if (res.code == 1) {
						let data = res.data
						// #ifdef MP-WEIXIN
						uni.requestPayment({
							provider: "wxpay",
							...data,
							success: () => {
								uni.hideLoading()
								uni.reLaunch({
									url: "/pages/member/fees/success"
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
									uni.hideLoading();
									if (res.errMsg == "chooseWXPay:ok") {
										uni.reLaunch({
											url: "/pages/member/fees/success"
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
					console.error('线上缴费 ', error)
				})
			},
			// 线下提交审核
			toSubmit() {
				if (!this.certificate) {
					uni.showToast({
						title: "请上传支付凭证",
						icon: "none"
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.uploadImage((url) => {
					this.$util.request("member.payOffline", {
						pay_voucher: url
					}).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							uni.reLaunch({
								url: "/pages/member/fees/success?type=1"
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						console.error('线下缴费 ', error)
					})
				})
			},
			// 上传图片
			uploadImage(fn) {
				this.$util.uploadFile(this.certificate).then(res => {
					if (res.code == 1) {
						fn(res.data.url)
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('上传图片 ', error)
				})
			},
			// 选择图片
			chooseImage() {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.certificate = res.tempFiles[0].tempFilePath
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera '],
					sizeType: ['compressed'],
					success: (res) => {
						this.certificate = res.tempFilePaths[0]
					}
				});
				// #endif
			},
			// 删除图片
			deleteImage() {
				this.certificate = ""
			},
			// 预览图片
			previewImage() {
				uni.previewImage({
					urls: [this.certificate],
					current: 0
				});
			},
			// 获取汇款账户信息
			getAccountInfo(fn) {
				this.$util.request("member.accountInfo").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.accountInfo = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取汇款账户信息 ', error)
				})
			},
			// 复制
			handleCopy(value) {
				this.$util.toPage({
					mode: 8,
					content: value
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-header {
				border-radius: 16rpx;
				box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.02);
				background: #ffffff;
				padding: 38rpx 32rpx;

				.header-price {
					color: var(--theme-color);
					font-size: 48rpx;
					font-weight: 600;
					text-align: center;

					text {
						font-size: 24rpx
					}
				}

				.header-tag {
					margin-top: 26rpx;
					color: #8D929C;
					font-size: 28rpx;
					line-height: 40rpx;
					text-align: center;
				}
			}

			.main-content {
				.content-column {
					margin-top: 32rpx;
					padding: 32rpx;
					border-radius: 16rpx;
					box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.02);
					background: #ffffff;

					.column-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.column-method {
						margin-top: 32rpx;

						.method-item {
							margin-top: 32rpx;

							&:first-child {
								margin-top: 0;
							}

							.icon {
								width: 32rpx;
								height: 32rpx;
								background-size: 32rpx;
							}

							.name {
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;
								margin: 0 16rpx;
							}

							.radio {
								width: 32rpx;
								height: 32rpx;
								background: #D6DBDE;
								border-radius: 50%;

								&.active {
									background: var(--theme-color);
								}
							}

						}
					}

					.column-upload {
						display: flex;
						flex-wrap: wrap;
						padding-top: 8rpx;

						.upload-image {
							position: relative;
							width: 31%;
							height: 0;
							padding-top: 31%;
							margin-top: 24rpx;
							margin-right: 3.5%;

							&:nth-child(3n) {
								margin-right: 0;
							}

							.image-select {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								border-radius: 10rpx;
							}

							.image-video {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								border-radius: 10rpx;
								background: var(--theme-color);
								padding: 56rpx;
							}

							.image-delete {
								position: absolute;
								top: -16rpx;
								right: -16rpx;
								width: 48rpx;
								height: 48rpx;
							}

							.image-choose {
								position: absolute;
								top: 20rpx;
								left: 20rpx;
								right: 20rpx;
								bottom: 20rpx;
								z-index: 6;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								background: #ffffff;
								border-radius: 6rpx;

								.icon {
									width: 80rpx;
									height: 80rpx;
									padding: 18rpx;
									background: var(--theme-color);
									border-radius: 50%;
								}

								.text {
									margin-top: 16rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}
							}

							.image-background {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								z-index: 1;
								background: var(--theme-color);
								opacity: 0.08;
							}
						}
					}

					.column-info {
						margin-top: 24rpx;

						.info-item {
							margin-top: 24rpx;

							&:first-child {
								margin-top: 0;
							}

							.item-content {
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;
							}

							.item-copy {
								color: var(--theme-color);
								font-size: 28rpx;
								line-height: 40rpx;
								margin-left: 24rpx;
							}
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