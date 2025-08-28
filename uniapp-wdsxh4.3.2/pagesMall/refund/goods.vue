<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 退货信息填写 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="填写信息"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 商品信息 -->
			<view class="main-goods">
				<block v-for="(item, index) in orderInfo.goods" :key="index">
					<mall-store :show-data="item"></mall-store>
				</block>
			</view>
			<!-- 填写快递单号 -->
			<view class="main-form">
				<view class="form-title">填写快递单号</view>
				<input class="form-input" type="text" v-model="trackingNumber" placeholder="填写快递单号" placeholder-class="placeholder" />
			</view>
			<!-- 底部按钮 -->
			<view class="main-footer">
				<view class="footer-btn" :style="{background: themeColor}" @click="handleSubmit()">提交信息</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import mallStore from "@/pagesMall/component/mall/store.vue"
	export default {
		components: {
			mallStore,
		},
		data() {
			return {
				// 是否加载完成
				loadEnd: false,
				// 订单id
				orderId: '',
				// 订单详情
				orderInfo: {},
				// 快递单号
				trackingNumber: '',
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.orderId = option.id;
			this.getOrderDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onShow() {
			if (this.loadEnd) this.getOrderDetails()
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
			// 提交快递信息
			handleSubmit() {
				if (!this.trackingNumber) {
					uni.showToast({
						title: "请填写快递单号",
						icon: "none",
						duration: 2000
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				this.$util.request("mall.receipt", {
					order_id: this.orderInfo.id,
					refund_express_no: this.trackingNumber
				}).then(res => {
					if (res.code == 1) {
						uni.redirectTo({
							url: "/pagesMall/refund/success",
							success: () => {
								uni.hideLoading()
							}
						})
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('提交快递信息', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-goods {
				display: flex;
				flex-direction: column;
				row-gap: 32rpx;
			}

			.main-form {
				margin-top: 32rpx;
				border-radius: 16rpx;
				padding: 24rpx 32rpx 48rpx;
				background: #FFF;

				.form-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.form-input {
					margin-top: 24rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
					border-radius: 16rpx;
					padding: 20rpx 32rpx;
					background: #F6F7FB;
				}

				.placeholder {
					color: #999;
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