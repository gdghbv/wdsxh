<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-平台动态 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-article">
		<view class="article-item flex" :class="{special: showType == 1}" v-for="item in showData" :key="item.id" @click="toDetails(item)">
			<image class="item-image" :src="item.image" mode="aspectFill"></image>
			<view class="item-box flex-item flex-direction-column justify-content-between">
				<view class="box-title text-ellipsis-more">{{item.title}}</view>
				<view class="box-bottom flex justify-content-between align-items-center">
					<view class="bottom-view flex align-items-center">
						<image class="icon" src="/static/see.png" mode="aspectFit"></image>
						<text class="number">{{item.read_num}}</text>
					</view>
					<view class="bottom-time">{{item.createtime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "articleIndex",
		props: ["showData", "showType", "showTitle"],
		methods: {
			// 跳转详情
			toDetails(item) {
				if (item.type == 2) {
					this.$util.toPage({
						mode: 4,
						path: item.link,
					})
					this.$util.request("main.article.updateReadNum", { id: item.id })
				} else {
					this.$util.toPage({
						mode: 1,
						path: `/pages/article/details?id=${item.id}&title=${this.showTitle || ""}`
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.component-article {
		.article-item {
			margin-top: 32rpx;
			background: #ffffff;
			border-radius: 10rpx;
			padding: 32rpx;

			&:first-child {
				margin-top: 0;
			}

			&.special {
				background: transparent;
				border-radius: 0;
				padding: 0;
			}

			.item-image {
				width: 220rpx;
				height: 192rpx;
				border-radius: 10rpx;
			}

			.item-box {
				margin-left: 16rpx;

				.box-title {
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.box-bottom {
					.bottom-view {
						.icon {
							width: 32rpx;
							height: 32rpx;
						}

						.number {
							margin-left: 8rpx;
							color: #8D929C;
							font-size: 24rpx;
							line-height: 32rpx;
						}
					}

					.bottom-time {
						color: #8D929C;
						font-size: 24rpx;
						line-height: 32rpx;
					}
				}
			}
		}
	}
</style>