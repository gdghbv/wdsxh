<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 退款详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{ '--theme-color': themeColor }">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="退款详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" :style="{paddingBottom: (orderInfo.refund_status == 2 || orderInfo.refund_status == 3) ? '144rpx' : '32rpx'}" v-if="loadEnd">
			<!-- 订单状态 -->
			<view class="main-status">
				<block v-if="orderInfo.refund_status == 2">
					<view class="status-text">申请中</view>
					<view class="status-tips flex align-items-center">
						<view class="icon" :style="{'background-image': 'url('+ iconClock +')'}" v-if="iconClock"></view>
						<view class="text">等待平台退款申请通过</view>
					</view>
				</block>
				<block v-if="orderInfo.refund_status == 3">
					<view class="status-text">待退货</view>
					<view class="status-tips flex align-items-center">
						<view class="icon" :style="{'background-image': 'url('+ iconClock +')'}" v-if="iconClock"></view>
						<view class="text">请及时提交退货信息</view>
					</view>
				</block>
				<block v-if="orderInfo.refund_status == 4">
					<view class="status-text">退款中</view>
					<view class="status-tips flex align-items-center">
						<view class="icon" :style="{'background-image': 'url('+ iconClock +')'}" v-if="iconClock"></view>
						<view class="text">等待平台退款</view>
					</view>
				</block>
				<block v-if="orderInfo.refund_status == 5">
					<view class="status-text">已退款</view>
					<view class="status-tips flex align-items-center">
						<view class="icon" :style="{'background-image': 'url('+ iconClock +')'}" v-if="iconClock"></view>
						<view class="text">平台已完成退款</view>
					</view>
				</block>
			</view>
			<!-- 退款原因 -->
			<view class="main-reason">{{orderInfo.refund_reason}}</view>
			<!-- 到店自提 -->
			<view class="main-address" v-if="orderInfo.delivery_method == 2">
				<view class="address-title">自提地址</view>
				<view class="address-box flex align-items-center" @click="toNavigation()">
					<view class="box-text flex-item">{{mallConfig.address}}</view>
					<view class="box-icon" :style="{'background-image': 'url('+ iconMore +')'}" v-if="iconMore"></view>
				</view>
				<view class="address-info flex flex-wrap" v-if="mallConfig.mobile" @click="onContact()">{{mallConfig.mobile}}</view>
			</view>
			<!-- 收货地址 -->
			<view class="main-address" v-else>
				<view class="address-name">{{orderInfo.user_address || ""}}</view>
				<view class="address-info flex flex-wrap" v-if="orderInfo.real_name || orderInfo.user_phone">
					<text v-if="orderInfo.real_name">{{orderInfo.real_name}}</text>
					<text v-if="orderInfo.user_phone">{{orderInfo.user_phone}}</text>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="main-goods">
				<block v-for="(item, index) in orderInfo.goods" :key="index">
					<mall-store :show-data="item"></mall-store>
				</block>
			</view>
			<!-- 订单信息 -->
			<view class="main-order">
				<view class="order-info">
					<view class="title">商品总额</view>
					<view class="value">￥{{orderInfo.goods_price || ''}}</view>
				</view>
				<view class="order-info" v-if="orderInfo.delivery_method == 1">
					<view class="title">运费总额</view>
					<view class="value">￥{{orderInfo.pay_postage || '0.00'}}</view>
				</view>
				<view class="order-info">
					<view class="title">总计金额</view>
					<view class="value">￥{{orderInfo.total_price || '0.00'}}</view>
				</view>
				<view class="order-info" v-if="orderInfo.delivery_method == 2">
					<view class="title">发货方式</view>
					<view class="value" style="color: #5A5B6E;">到店自提</view>
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="main-footer" v-if="orderInfo.refund_status == 2 || orderInfo.refund_status == 3">
				<view class="footer-btn" style="background: #FF626E;" @click="handleCancel()" v-if="orderInfo.refund_status == 2">取消退款</view>
				<view class="footer-btn" :style="{background: themeColor}" @click="handleWrite()" v-if="orderInfo.refund_status == 3">填写信息</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import mallStore from "@/pagesMall/component/mall/store.vue"
	import svgData from "@/common/svg.js"
	export default {
		components: {
			mallStore
		},
		data() {
			return {
				// 是否加载完成
				loadEnd: false,
				// 订单id
				orderId: '',
				// 订单详情
				orderInfo: {},
				// 商城配置
				mallConfig: {},
				// 延时器
				delayer: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconClock: state => {
					return svgData.svgToUrl("clock", state.app.themeColor)
				},
				iconMore: state => {
					return svgData.svgToUrl("more", state.app.themeColor)
				},
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.orderId = option.id;
			this.getMallConfig()
			this.getOrderDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onShow() {
			if (this.loadEnd) this.getOrderDetails()
		},
		onUnload() {
			clearTimeout(this.delayer)
		},
		methods: {
			// 获取订单详情
			getOrderDetails(fn) {
				this.$util.request("mall.orderDetails", {
					id: this.orderId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.orderInfo = res.data
						this.orderInfo.goods_price = parseFloat(parseFloat(this.orderInfo.total_price) - parseFloat(this.orderInfo.pay_postage || 0)).toFixed(2)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取订单详情', error)
				})
			},
			// 获取商城配置
			getMallConfig() {
				this.$util.request("mall.config").then(res => {
					if (res.code == 1) {
						this.mallConfig = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商城配置', error)
				})
			},
			// 取消退款
			handleCancel() {
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
							this.$util.request("mall.cancelRefund", {
								id: this.orderId
							}).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									uni.showToast({
										title: "取消成功",
										icon: "success",
										mask: true,
										duration: 1500
									})
									this.delayer = setTimeout(() => {
										uni.navigateBack()
									}, 1500)
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
			// 填写信息
			handleWrite() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/refund/goods?id=" + this.orderId
				})
			},
			// 跳转地图导航
			toNavigation() {
				this.$util.toPage({
					mode: 7,
					address: {
						latitude: this.mallConfig.latitude,
						longitude: this.mallConfig.longitude,
						address: this.mallConfig.address,
					},
				})
			},
			// 联系
			onContact() {
				this.$util.toPage({
					mode: 6,
					phone: this.mallConfig.mobile,
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-status {
				padding: 16rpx 16rpx 48rpx;

				.status-text {
					color: #5A5B6E;
					font-size: 48rpx;
					line-height: 68rpx;
				}

				.status-tips {
					margin-top: 16rpx;

					.icon {
						width: 32rpx;
						height: 32rpx;
						background-size: 32rpx;
					}

					.text {
						margin-left: 16rpx;
						color: var(--theme-color);
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}
			}

			.main-reason {
				margin-bottom: 32rpx;
				border-radius: 20rpx;
				padding: 24rpx 32rpx;
				background: #FFF;
				color: #FF626E;
				font-size: 28rpx;
				line-height: 40rpx;
			}

			.main-address {
				border-radius: 20rpx;
				padding: 32rpx;
				background: #FFF;

				.address-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
					margin-bottom: 24rpx;
				}

				.address-name {
					color: #5A5B6E;
					font-size: 32rpx;
					line-height: 44rpx;
				}

				.address-box {
					.box-text {
						color: #5A5B6E;
						font-size: 32rpx;
						line-height: 44rpx;
						margin-right: 64rpx;
					}

					.box-icon {
						width: 32rpx;
						height: 32rpx;
						background-size: 32rpx;
					}
				}

				.address-info {
					margin-top: 24rpx;
					color: #979797;
					font-size: 28rpx;
					line-height: 40rpx;
					gap: 16rpx;
				}
			}

			.main-goods {
				margin-top: 32rpx;
				display: flex;
				flex-direction: column;
				row-gap: 32rpx;
			}

			.main-order {
				margin-top: 32rpx;
				padding: 32rpx;
				border-radius: 16rpx;
				background: #FFFFFF;

				.order-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.title {
						color: #979797;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.value {
						color: var(--theme-color);
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 24rpx;
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 96;
				background: #FFF;
				border-top: 1rpx solid #F6F7FB;
				padding: 16rpx 24rpx;

				.footer-btn {
					margin-left: 24rpx;
					padding: 20rpx 44rpx;
					background: var(--theme-color);
					border-radius: 16rpx;
					color: #FFF;
					text-align: center;
					font-size: 28rpx;
					line-height: 40rpx;

					&:first-child {
						margin-left: 0;
					}
				}
			}
		}
	}
</style>