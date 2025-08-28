<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-相册列表 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view  class="component-album" :style="{'--theme-color': themeColor}">
		<view class="album-item flex" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<view class="item-timeline">
				<view class="time">{{cutDate(item.release_date)}}</view>
				<view class="point"></view>
				<view class="line"></view>
			</view>
			<view class="item-content flex-item">
				<view class="content-title text-ellipsis-more">{{item.name}}</view>
				<view class="item-content flex-item" v-if="item.files && item.type == 1">
					<view class="content-single" v-if="splitImages(item.files).length == 1">
						<image class="image" :src="item.files" mode="aspectFill"></image>
					</view>
					<view class="content-multiple" v-else-if="item.files.length">
						<view class="image" v-for="(img, index) in splitImages(item.files)" :key="index" :style="{ marginBottom: ((index + 1) % 3 !== 0) ? '16rpx' : '0' }">
							<image :src="img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="item-content flex-item" v-if="item.files && item.type == 2">
					<view class="content-cover">
						<image class="image" :src="item.image" mode="aspectFill"></image>
						<image class="play" src="/static/play.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "albumIndex",
		props: ["showData"],
		data() {
			return {

			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 截取年份
			cutDate(time) {
				let parts = time.split('/');
				if (parts.length == 3) {
					return parts[1] + '/' + parts[2];
				} else {
					return time;
				}
			},
			// 字符串转数组格式图片
			splitImages(images) {
				return images.split(',');
			},
			// 去详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesTools/album/details?id=" + id
				})
			}
		},
	}
</script>

<style lang="scss">
	.component-album {
		.album-item {
			margin-top: 32rpx;

			&:first-child {
				margin-top: 0;
			}

			.item-timeline {
				display: flex;
				flex-direction: column;

				.time {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.point {
					width: 20rpx;
					height: 20rpx;
					border-radius: 4rpx;
					background: var(--theme-color);
				}

				.line {
					width: 2rpx;
					height: 100%;
					flex: 1;
					background: #F0F0F0;
				}
			}

			.item-content {
				margin-left: 16rpx;
				position: relative;

				.content-title {
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.content-cover {
					margin-top: 16rpx;
					width: 100%;
					height: 240rpx;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 16rpx;
					overflow: hidden;
					position: relative;

					.image {
						width: 100%;
						height: 100%;
					}

					.play {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
					}
				}

				.content-single {
					margin-top: 16rpx;
					width: 100%;
					height: 240rpx;
					border-radius: 16rpx;
					overflow: hidden;
				}

				.cover {
					position: absolute;
					top: 16rpx;
					left: 0;
					width: 100%;
					height: 240rpx;
					background-color: transparent;
					/* 设置透明背景色 */
				}

				.content-multiple {
					display: flex;
					flex-wrap: wrap;

					.image {
						width: 32%;
						height: 0;
						padding-top: 32%;
						border-radius: 16rpx;
						overflow: hidden;
						position: relative;
						margin-right: 2%;
						margin-top: 16rpx;

						&:nth-child(3n) {
							margin-right: 0;
						}

						image {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>