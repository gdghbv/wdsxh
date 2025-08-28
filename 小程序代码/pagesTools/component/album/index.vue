<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-相册列表 开发者: 麦沃德科技-半夏-暴雨
+---------------------------------------------------------------------- -->

<template>
	<view  class="component-album" :style="{'--theme-color': themeColor}">
		<view class="album-item" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<view class="item-date">
				<view class="item-date-time">{{item.release_date}}</view>
				<view class="item-date-title">{{item.name}}</view>
			</view>
			<view class="flex">
				<view class="item-timeline">
					<view class="point"></view>
					<view class="line"></view>
				</view>
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
		name: "album",
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
			// 字符串转数组格式图片
			splitImages(images) {
			    return images.split(',');
			},
			// 去详情
			toDetails(id){
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
			
			.item-date{
				padding-bottom: 16rpx;
				
				.item-date-time{
					padding-bottom: 16rpx;
					font-size: 28rpx;
					line-height: 32rpx;
					font-weight: 600;
					color: #5A5B6E;
				}
				.item-date-title{
					font-size: 28rpx;
					line-height: 40rpx;
					color: #8D929C;
				}
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
				margin-left: 84rpx;
				position: relative; // 添加相对定位

				.video-overlay {
				    position: absolute;
				    top: 0;
				    left: 0;
				    width: 100%;
				    height: 100%;
				    background-color: transparent;
				    pointer-events: none; // 设置为不接收鼠标事件
				    z-index: 1; // 确保在视频上层    
				}
				
				.content-title {
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.content-cover {
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
					width: 100%;
					height: 240rpx;
					border-radius: 16rpx;
					overflow: hidden;
				}
				
				.cover {
				  position: absolute;
				  top: 0;
				  left: 0;
				  width: 100%;
				  height: 240rpx;
				  background-color: transparent; /* 设置透明背景色 */
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