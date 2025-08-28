<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-退款订单列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-mall-refund">
		<view class="refund-item" v-for="(item, index) in showData" :key="index" @click="toDetails(item.id)">
			<view class="item-top flex align-items-center">
				<view class="top-number flex-item">订单编号：{{item.order_no}}</view>
				<view class="top-status">
					<text style="color: #FF626E;" v-if="item.refund_status == 2">申请中</text>
					<text style="color: #FF9100;" v-if="item.refund_status == 3">待退货</text>
					<text :style="{color: themeColor}" v-if="item.refund_status == 4">退款中</text>
					<text style="color: #979797;" v-if="item.refund_status == 5">已退款</text>
				</view>
			</view>
			<view class="item-center">
				<!-- 单商品 -->
				<view class="center-single flex" v-if="item.goods.length == 1">
					<image class="single-image" :src="item.goods[0].image" mode="aspectFill"></image>
					<view class="single-info flex-item">
						<view class="info-name text-ellipsis-more">{{item.goods[0].name}}</view>
						<view class="info-box flex align-items-center">
							<view class="price flex-item" :style="{color: themeColor}">￥{{item.pay_price}}</view>
							<view class="number">×{{item.number}}</view>
						</view>
					</view>
				</view>
				<!-- 多商品 -->
				<view class="center-multiple" v-else>
					<scroll-view scroll-x class="multiple-list">
						<view class="list-goods">
							<view class="goods-box" v-for="goods in item.goods" :key="goods.id">
								<image class="image" :src="goods.image" mode="aspectFill"></image>
								<view class="name text-ellipsis">{{goods.name}}</view>
							</view>
						</view>
					</scroll-view>
					<view class="multiple-total flex-direction-column flex-center">
						<view class="number">×{{item.number}}</view>
						<view class="price"><text>￥</text>{{item.pay_price}}</view>
					</view>
				</view>
			</view>
			<view class="item-bottom" v-if="item.refund_status == 2 || item.refund_status == 3">
				<view class="bottom-btn" style="background: #FF626E" @click.stop="handleCancel(item.id)" v-if="item.refund_status == 2">取消退款</view>
				<view class="bottom-btn" :style="{background: themeColor}" @click.stop="handleWrite(item.id)" v-if="item.refund_status == 3">填写信息</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "componentMallRefund",
		props: ["showData"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 跳转详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: `/pagesMall/refund/details?id=` + id
				})
			},
			// 取消退款
			handleCancel(id) {
				uni.showModal({
					title: "提示",
					content: "确定取消退款申请? \n 点击取消退款后取消申请",
					confirmText: '取消退款',
					confirmColor: this.themeColor,
					cancelText: '我再想想',
					cancelColor: '#999999',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "加载中",
								mask: true
							})
							this.$util.request("mall.cancelRefund", { id: id }).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									uni.showToast({
										title: "取消成功",
										icon: "success",
										duration: 2000
									})
									this.$emit("getOrderList")
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('取消退款', error)
							})
						}
					}
				})
			},
			// 跳转填写信息
			handleWrite(id) {
				this.$util.toPage({
					mode: 1,
					path: `/pagesMall/refund/goods?id=` + id
				})
			},
		},
	}
</script>

<style lang="scss">
	.component-mall-refund {
		.refund-item {
			margin-top: 32rpx;
			background: #FFF;
			border-radius: 16rpx;

			&:first-child {
				margin-top: 0;
			}

			.item-top {
				padding: 32rpx;

				.top-number {
					color: #999;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.top-status {
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}

			.item-center {
				border-top: 1px solid rgba(0, 0, 0, 0.10);

				.center-single {
					padding: 32rpx;

					.single-image {
						width: 160rpx;
						height: 160rpx;
						border-radius: 20rpx;
					}

					.single-info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 24rpx;
						height: 160rpx;

						.info-name {
							font-size: 28rpx;
							font-weight: 600;
							line-height: 40rpx;
							color: #5A5B6E;
						}

						.info-box {
							.price {
								font-size: 32rpx;
								font-weight: 600;
								line-height: 40rpx;
								word-break: break-all;
							}

							.number {
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 32rpx;
								margin-left: 16rpx;
							}
						}
					}
				}

				.center-multiple {
					position: relative;
					padding: 32rpx 0;
					overflow: hidden;

					.multiple-list {
						.list-goods {
							display: inline-flex;
							padding: 0 32rpx;
							column-gap: 32rpx;

							.goods-box {
								.image {
									width: 160rpx;
									height: 160rpx;
									border-radius: 20rpx;
								}

								.name {
									margin-top: 12rpx;
									width: 160rpx;
									color: #5A5B6E;
									font-size: 24rpx;
									font-weight: 600;
									line-height: 34rpx;
									text-align: center;
								}
							}
						}
					}

					.multiple-total {
						position: absolute;
						top: 0;
						right: -4rpx;
						bottom: 24rpx;
						z-index: 9;
						padding: 0 32rpx 0 28rpx;
						background: rgba(255, 255, 255, 0.70);

						.number {
							color: #5A5B6E;
							font-size: 32rpx;
							line-height: 40rpx;
						}

						.price {
							margin-top: 40rpx;
							color: #E60012;
							font-size: 40rpx;
							font-weight: 600;
							line-height: 40rpx;

							text {
								font-size: 24rpx;
							}
						}
					}
				}
			}

			.item-bottom {
				padding: 0 32rpx 32rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				gap: 24rpx;

				.bottom-btn {
					color: #FFF;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 16rpx 32rpx;
					min-width: 144rpx;
					text-align: center;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>