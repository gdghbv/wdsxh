<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-购物车信息 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-mall-cart" :style="{ '--theme-color': themeColor }">
		<view class="cart-item" v-for="(item, index) in showData" :key="index">
			<view class="item-radio" @click="changeSelect(index)">
				<view class="radio-input" :class="{active: item.selected}">
					<image src="/static/tick.png" mode="aspectFit" v-if="item.selected"></image>
				</view>
			</view>
			<view class="item-goods" @click="toDetails(item.id)">
				<view class="goods-left">
					<image class="left-image" :src="item.image" mode="aspectFill"></image>
					<view class="left-disabled" v-if="item.goods_status == 2">
						<view class="box">
							<text>商品</text>
							<text>已下架</text>
						</view>
					</view>
				</view>
				<view class="goods-info">
					<view class="info-top text-ellipsis-more">{{item.name}}</view>
					<view class="info-bottom">
						<view class="bottom-price"><text>￥</text>{{item.price}}</view>
						<view class="bottom-tips" v-if="item.goods_status == 2">商品已下架</view>
						<view class="bottom-select" @click.stop v-else>
							<view class="select-btn" :class="{disabled: parseInt(item.number) <= 1}" @click.stop="changeNumber(index, 1)">
								<image class="icon" src="/static/mall/subtraction.png" mode="aspectFit"></image>
							</view>
							<view class="select-text text-ellipsis" @click.stop="changeNumber(index, 3)">{{item.number}}</view>
							<view class="select-btn" @click.stop="changeNumber(index, 2)">
								<image class="icon" src="/static/mall/addition.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "componentMallCart",
		props: ["showData"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 跳转商品详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/goods/details?id=" + id
				})
			},
			// 选择商品
			changeSelect(index) {
				this.$emit("changeSelect", index)
			},
			// 更改数量
			changeNumber(index, type) {
				this.$emit("changeNumber", index, type)
			},
		},
	}
</script>

<style lang="scss">
	.component-mall-cart {
		.cart-item {
			border-radius: 20rpx;
			background: #FFF;
			margin-top: 32rpx;
			display: flex;
			overflow: hidden;

			&:first-child {
				margin-top: 0;
			}

			.item-radio {
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 32rpx 24rpx 32rpx 32rpx;
				height: 160rpx;
				box-sizing: content-box;

				.radio-input {
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					background: #D6DBDE;

					&.active {
						background: var(--theme-color);
					}
				}
			}

			.item-goods {
				padding: 32rpx 32rpx 32rpx 0;
				flex: 1;
				display: flex;
				align-items: center;
				overflow: hidden;

				.goods-left {
					width: 150rpx;
					min-width: 150rpx;
					height: 150rpx;
					border-radius: 20rpx;
					overflow: hidden;
					position: relative;

					.left-image {
						width: 100%;
						height: 100%;
					}

					.left-disabled {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						border-radius: 20rpx;
						background: rgba(0, 0, 0, 0.60);
						padding: 28rpx;

						.box {
							width: 100%;
							height: 100%;
							color: #FFF;
							font-size: 20rpx;
							line-height: 32rpx;
							border-radius: 50%;
							background: rgba(0, 0, 0, 0.50);
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
						}
					}
				}

				.goods-info {
					flex: 1;
					height: 160rpx;
					margin-left: 24rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					overflow: hidden;

					.info-top {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.info-bottom {
						display: flex;
						align-items: center;

						.bottom-price {
							color: #E60012;
							font-size: 32rpx;
							font-weight: 600;
							line-height: 40rpx;

							text {
								font-size: 24rpx;
							}
						}

						.bottom-select {
							flex: 1;
							margin-left: 16rpx;
							display: flex;
							justify-content: flex-end;
							align-items: center;
							overflow: hidden;

							.select-btn {
								width: 32rpx;
								min-width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
								background: var(--theme-color);

								&.disabled {
									opacity: .5;
								}

								.icon {
									width: 100%;
									height: 100%;
								}
							}

							.select-text {
								color: #000;
								font-size: 28rpx;
								line-height: 32rpx;
								height: 32rpx;
								margin: 0 16rpx;
								text-align: center;
							}
						}

						.bottom-tips {
							flex: 1;
							text-align: right;
							color: #FF626E;
							font-size: 24rpx;
							line-height: 32rpx;
						}
					}
				}
			}
		}
	}
</style>