<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商品列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-mall-goods" v-if="list.length">
		<uv-waterfall ref="waterfall" v-model="list" style="overflow: hidden;" :add-time="10" :column-gap="12" @changeList="changeList">
			<!-- 第一列数据 -->
			<template v-slot:list1>
				<view class="goods-list-box">
					<view v-for="item in list1" :key="item.id" class="box-item" @click="toDetails(item.id)">
						<view class="item-image">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="item-name">{{item.name}}</view>
						<view class="item-price" :style="{ color: themeColor }">￥{{item.price}}</view>
					</view>
				</view>
			</template>
			<!-- 第二列数据 -->
			<template v-slot:list2>
				<view class="goods-list-box">
					<view v-for="item in list2" :key="item.id" class="box-item" @click="toDetails(item.id)">
						<view class="item-image">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
						<view class="item-name">{{item.name}}</view>
						<view class="item-price" :style="{ color: themeColor }">￥{{item.price}}</view>
					</view>
				</view>
			</template>
		</uv-waterfall>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "componentMallGoods",
		data() {
			return {
				// 数据列表
				list: [],
				// 瀑布流第一列数据
				list1: [],
				// 瀑布流第二列数据
				list2: [],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			}),
		},
		methods: {
			// 获取列表数据
			getList(list) {
				this.list = list
			},
			// 渲染列表
			changeList(e) {
				this[e.name].push(e.value);
			},
			// 跳转详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/goods/details?id=" + id
				})
			},
			// 清除列表
			clearList() {
				this.list = [];
				this.$refs.waterfall.clear();
				this.list1 = [];
				this.list2 = [];
			},
		},
	}
</script>

<style lang="scss">
	.component-mall-goods {
		.goods-list-box {
			.box-item {
				width: 100%;
				border-radius: 20rpx;
				overflow: hidden;
				background: #FFFFFF;
				box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.02);
				border-radius: 20rpx;
				margin-top: 24rpx;
				padding-bottom: 16rpx;

				&:first-child {
					margin-top: 0;
				}

				.item-image {
					width: 100%;
					height: 0;
					padding-top: 100%;
					position: relative;

					image {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				}

				.item-name {
					font-weight: 600;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #5A5B6E;
					margin-top: 16rpx;
					padding: 0 16rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					-webkit-line-clamp: 2;
					word-break: break-all;
				}

				.item-price {
					margin-top: 16rpx;
					font-weight: 600;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 0 16rpx;
				}
			}
		}
	}
</style>