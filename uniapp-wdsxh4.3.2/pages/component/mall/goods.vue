<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商会商品 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-mall-goods">
		<view class="goods-item flex" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<image class="item-image" :src="item.image" mode="aspectFill"></image>
			<view class="item-info flex-item flex-direction-column justify-content-between">
				<view class="info-title text-ellipsis-more">{{ item.name }}</view>
				<view class="info-price">￥{{ item.price }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "mallGoods",
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
		}
	}
</script>

<style lang="scss">
	.component-mall-goods {
		.goods-item {
			margin-top: 32rpx;
			padding: 32rpx;
			background: #FFF;
			border-radius: 10rpx;

			&:first-child {
				margin-top: 0;
			}

			.item-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 16rpx;
			}

			.item-info {
				margin-left: 24rpx;

				.info-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.info-price {
					margin-top: 16rpx;
					color: var(--theme-color);
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}
			}
		}
	}
</style>