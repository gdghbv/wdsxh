<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商品信息 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-mall-store flex" :style="{ '--theme-color': themeColor }">
		<image class="store-image" :src="showData.image" mode="aspectFill"></image>
		<view class="store-info">
			<view class="info-top text-ellipsis-more">{{showData.name}}</view>
			<view class="info-bottom">
				<view class="bottom-price"><text>￥</text>{{showData.price || showData.goods_price}}</view>
				<view class="bottom-select" v-if="showNumber">
					<view class="select-btn" :class="{disabled: parseInt(showNumber) <= 1}" @click="changeNumber(1)">
						<image class="icon" src="/static/mall/subtraction.png" mode="aspectFit"></image>
					</view>
					<view class="select-text text-ellipsis" @click="changeNumber(3)">{{showNumber}}</view>
					<view class="select-btn" @click="changeNumber(2)">
						<image class="icon" src="/static/mall/addition.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="bottom-number text-ellipsis" v-else>×{{showData.number || showData.goods_num}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "componentMallStore",
		props: ["showData", "showNumber"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 更改数量
			changeNumber(type) {
				this.$emit("changeNumber", type)
			},
		},
	}
</script>

<style lang="scss">
	.component-mall-store {
		border-radius: 20rpx;
		background: #FFF;
		padding: 32rpx;
		display: flex;
		align-items: center;
		overflow: hidden;

		.store-image {
			width: 160rpx;
			min-width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
		}

		.store-info {
			flex: 1;
			height: 160rpx;
			margin-left: 32rpx;
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
					font-size: 36rpx;
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

				.bottom-number {
					flex: 1;
					margin-left: 16rpx;
					text-align: right;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 32rpx;
				}
			}
		}
	}
</style>