<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商城商品 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-goods" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="goods-title" :style="{marginBottom: titleSpace}" v-if="showParams.showTitle">
			<view :style="{fontSize: titleFontSize,fontWeight: showStyle.titleFontStyle, color: showStyle.titleColor}">{{showParams.titleText}}</view>
			<view :style="{fontSize: titleBtnSize, color: showStyle.titleBtnColor}" @click="toMore()">
				<text v-if="showParams.titleBtnType == 'text'">{{showParams.titleBtnText}}</text>
				<view :style="{'background-image': 'url('+ titleIconMore +')', width: titleIconSize, height: titleIconSize, backgroundSize: titleIconSize}" v-else-if="titleIconMore"></view>
			</view>
		</view>
		<view class="goods-list flex flex-wrap justify-content-between" :style="{rowGap: itemSpace}" v-if="goodsList">
			<view class="list-item" v-for="item in goodsList" :key="item.id" @click="toDetails(item.id)">
				<image class="item-image" :src="item.image" :style="{height: imgHeight, borderRadius: `${borderRadius} ${borderRadius} 0 0`}" mode="aspectFill"></image>
				<view class="item-name text-ellipsis-more" :style="{fontSize: nameSize, fontWeight: showStyle.nameWeight}">{{item.name}}</view>
				<view class="item-price" :style="{fontSize: priceSize, color: showStyle.priceColor}">￥{{item.price}}</view>
			</view>
		</view>
		<empty top="0" padding="0" width="200rpx" size="28rpx" title="暂无相关内容~" v-else></empty>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	export default {
		name: "goodsDiy",
		props: ['showStyle', 'showParams'],
		data() {
			return {
				goodsList: [],
			};
		},
		computed: {
			titleFontSize() {
				return uni.upx2px(this.showStyle.titleFontSize * 2) + 'px';
			},
			titleBtnSize() {
				return uni.upx2px(this.showStyle.titleBtnSize * 2) + 'px';
			},
			titleIconMore() {
				return svgData.svgToUrl("more", this.showStyle.titleBtnColor)
			},
			titleIconSize() {
				return uni.upx2px(this.showStyle.titleIconSize * 2) + 'px';
			},
			titleSpace() {
				return uni.upx2px(this.showStyle.titleSpace * 2) + 'px';
			},
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			imgHeight() {
				return uni.upx2px(this.showStyle.imgHeight * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
			},
			nameSize() {
				return uni.upx2px(this.showStyle.nameSize * 2) + 'px';
			},
			priceSize() {
				return uni.upx2px(this.showStyle.priceSize * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
			itemSpace() {
				return uni.upx2px(this.showStyle.itemSpace * 2) + 'px';
			},
		},
		watch: {
			showParams: {
				handler(value) {
					if (value) this.getGoodsList()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 获取商城商品
			getGoodsList() {
				this.$util.request("mall.goodsList", {
					page: 1,
					limit: 4
				}).then(res => {
					if (res.code == 1) {
						this.goodsList = res.data.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商城商品', error)
				})
			},
			// 跳转商城详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/goods/details?id=" + id
				})
			},
			// 跳转商城列表
			toMore() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mall/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.diy-goods {
		.goods-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.goods-list {
			.list-item {
				width: calc(50% - 16rpx);
				padding-bottom: 20rpx;

				.item-image {
					width: 100%;
					height: 296rpx;
				}

				.item-name {
					line-height: 40rpx;
					height: 80rpx;
					color: #000000;
					margin-top: 16rpx;
					padding: 0 16rpx;
				}

				.item-price {
					margin-top: 16rpx;
					font-weight: 600;
					line-height: 1.3;
					padding: 0 16rpx;
				}
			}
		}
	}
</style>