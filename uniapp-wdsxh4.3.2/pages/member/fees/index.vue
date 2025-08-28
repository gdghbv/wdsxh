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
	<view class="container" :style="{'--theme-color': themeColor, paddingBottom: isShowPay ? '112rpx' : '0'}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="会费缴纳"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-tips" :style="{top: titleBarHeight + 'px', background: '#FFA820'}" v-if="payDetails.apply_member_state.state == 4">会费缴纳审核中</view>
			<view class="main-tips" :style="{top: titleBarHeight + 'px', background: '#FF6868'}" v-else-if="payDetails.apply_member_state.state == 5">驳回原因：{{payDetails.reject}}</view>
			<view class="main-header">
				<view class="header-box">
					<view class="box-line flex-direction-column align-items-center">
						<view class="free" v-if="payDetails.pay_method == 1">免费</view>
						<view class="price" v-else><text>￥</text>{{payDetails.fees}}</view>
						<view class="term" v-if="payDetails.apply_member_state.state == 7 && !isShowPay">
							<text>暂未开启入会申请，详情请联系客服</text>
						</view>
						<view class="term" v-else>
							<text>期限：</text>
							<text v-if="payDetails.apply_member_state.state == 6">{{payDetails.join_time}}</text>
							<text v-else>{{nowTime}}</text>
							<text>—{{payDetails.expire_time}}</text>
						</view>
						<view class="level">级别：{{payDetails.level_name}}</view>
					</view>
				</view>
				<view class="header-pocket" :style="{'background-image': 'url('+ iconFees +')'}" v-if="iconFees"></view>
			</view>
			<view class="main-content">
				<view class="content-column">
					<view class="column-title">级别介绍</view>
					<view class="column-content column-text">
						<mp-html :content="payDetails.content"></mp-html>
					</view>
				</view>
				<view class="content-column">
					<view class="column-title">缴纳明细</view>
					<view class="column-content">
						<view class="detail-list" v-if="payDetails.pay_list.length">
							<view class="list-item flex align-items-center" v-for="record in payDetails.pay_list" :key="record.order_no">
								<view class="item-info flex-item">
									<view class="info-name">{{record.pay_method == 2 ? "线上" : "线下"}}-会费缴纳</view>
									<view class="info-time">{{record.pay_time}}</view>
								</view>
								<view class="item-price">{{record.fees}}元</view>
							</view>
						</view>
						<view class="detail-empty" v-else>暂无记录~</view>
					</view>
				</view>
			</view>
			<view class="main-footer" v-if="isShowPay">
				<view class="footer-btn flex-item" @click="handleRenew()" v-if="payDetails.pay_method == 1">续期</view>
				<view class="flex justify-content-between align-items-center" v-else>
					<view class="footer-price flex align-items-center">
						<view class="unit">￥</view>
						<view class="number">{{payDetails.fees}}</view>
					</view>
					<view class="footer-btn flex-item" @click="toPayment">会费缴纳</view>
				</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 会费缴纳详情
				payDetails: {},
				// 当前时间
				nowTime: "",
				// 是否可以支付
				isShowPay: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconFees: state => {
					return svgData.svgToUrl("fees", state.app.themeColor)
				},
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
			this.getNowTime()
			this.getPayDetails()
		},
		methods: {
			// 获取当前时间
			getNowTime() {
				this.nowTime = this.$util.getCurrentDate("y/m/d")
			},
			// 获取会费缴纳详情
			getPayDetails() {
				this.$util.request("member.payDetails").then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.payDetails = res.data
						if (this.payDetails.apply_member_state.state == -1) {
							uni.showModal({
								title: "系统提示",
								content: "请入会后查看此页面",
								confirmText: "去申请",
								success: (res) => {
									if (res.confirm) {
										this.$util.toPage({
											mode: 2,
											path: "/pages/member/apply/index"
										})
									}
								}
							})
							return
						} else if (this.payDetails.apply_member_state.state == 1 || this.payDetails.apply_member_state.state == 2) {
							uni.showModal({
								title: "系统提示",
								content: "您已提交入会申请，请审核通过后查看",
								confirmText: "前往查看",
								success: (res) => {
									if (res.confirm) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									}
								}
							})
							return
						} else if (this.payDetails.apply_member_state.state == 3 || this.payDetails.apply_member_state.state == 5) {
							this.isShowPay = true
						} else if (this.payDetails.apply_member_state.state == 7) {
							let startTime = new Date(this.nowTime).getTime()
							let endTime = new Date(this.payDetails.expire_time).getTime()
							let timeDif = this.$util.getTimeDifference(startTime, endTime)
							if (timeDif.day > 0) this.isShowPay = true
							else this.isShowPay = false
						} else {
							this.isShowPay = false
						}
						this.loadEnd = true
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('获取会费缴纳详情 ', error)
				})
			},
			// 跳转支付页
			toPayment() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/fees/pay?fees=" + this.payDetails.fees + "&method=" + this.payDetails.pay_method
				})
			},
			// 免费入会续费
			handleRenew() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$util.request("member.payFree").then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.$util.toPage({
							mode: 2,
							path: "/pages/member/fees/success?type=1"
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('免费入会续费 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-tips {
				padding: 24rpx 32rpx;
				font-size: 24rpx;
				line-height: 34rpx;
				color: #F6F7FB;
				position: sticky;
				top: 0;
				z-index: 9;
			}

			.main-header {
				padding: 32rpx 32rpx 20rpx;
				position: relative;

				.header-box {
					border-radius: 10rpx;
					background: var(--theme-color);
					padding: 16rpx;
					position: relative;

					.box-line {
						border: 1rpx solid #ffffff;
						border-bottom: none;
						border-radius: 10rpx;
						padding: 48rpx 32rpx 66rpx;

						.price {
							color: #ffffff;
							font-size: 72rpx;
							font-weight: 600;
							line-height: 60rpx;

							text {
								font-size: 36rpx;
							}
						}

						.free {
							color: #ffffff;
							font-size: 44rpx;
							font-weight: 600;
							line-height: 60rpx;
						}

						.term {
							margin-top: 24rpx;
							color: #ffffff;
							font-size: 24rpx;
							line-height: 34rpx;
							padding: 8rpx 16rpx;
							border-radius: 8rpx;
							background: rgba(255, 255, 255, 0.25);
						}

						.level {
							position: absolute;
							top: 48rpx;
							left: 0;
							color: var(--theme-color);
							font-size: 20rpx;
							line-height: 28rpx;
							padding: 10rpx;
							border-radius: 0 8rpx 8rpx 0;
							background: #ffffff;
						}
					}
				}

				.header-pocket {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 1;
					width: 100%;
					height: 120rpx;
					background-size: 100% 120rpx;
					background-repeat: no-repeat;
				}
			}

			.main-content {
				background: linear-gradient(180deg, rgb(255, 255, 255), rgba(246, 247, 251, 0) 100%);
				padding: 32rpx;

				.content-column {
					margin-top: 48rpx;

					&:first-child {
						margin-top: 0;
					}

					.column-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.column-text {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.column-content {
						padding: 24rpx;
						border-radius: 16rpx;
						box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.02);
						background: #ffffff;
						margin-top: 32rpx;

						.detail-list {
							.list-item {
								margin-top: 32rpx;

								&:first-child {
									margin-top: 0;
								}

								.item-info {
									.info-name {
										color: #5A5B6E;
										font-size: 28rpx;
										line-height: 40rpx;
									}

									.info-time {
										margin-top: 16rpx;
										color: #8D929C;
										font-size: 24rpx;
										line-height: 34rpx;
									}
								}

								.item-price {
									margin-left: 24rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}
							}
						}

						.detail-empty {
							color: #8D929C;
							font-size: 28rpx;
							line-height: 40rpx;
							padding: 48rpx 32rpx;
							text-align: center;
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