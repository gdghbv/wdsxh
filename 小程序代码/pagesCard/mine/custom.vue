<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 自定义背景图 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="自定义背景"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<view class="main-upload" @click="chooseImage()">
				<image class="upload-icon" src="/static/card/image.png" mode="aspectFit"></image>
				<view class="upload-text">点击上传背景</view>
				<view class="upload-text">(建议上传尺寸686*400，上传格式JPG/JPEG/PNG)</view>
			</view>
			<view class="main-tips">
				<view class="tips-title">温馨提示</view>
				<view class="tips-content">自定义图片只能上传一张，后续可点击进行重新上传</view>
				<view class="tips-bg"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 选择图片
			chooseImage() {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						const imagePath = res.tempFiles[0].tempFilePath
						this.uploadImage(imagePath)
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						const imagePath = res.tempFilePaths[0]
						this.uploadImage(imagePath)
					}
				});
				// #endif
			},
			// 上传图片
			uploadImage(image) {
				uni.showLoading({
					mask: true,
					title: "上传中"
				})
				this.$util.uploadFile(image).then(result => {
					uni.hideLoading()
					let pages = getCurrentPages()
					let prevPage = pages[pages.length - 2]
					prevPage.$vm.selectBackground = result.data
					uni.navigateBack()
				}).catch(error => {
					uni.hideLoading()
					console.error('上传图片 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFF;
	}

	.container {
		.container-main {
			padding: 32rpx;

			.main-upload {
				display: flex;
				flex-direction: column;
				align-items: center;
				border-radius: 16rpx;
				border: 1px dashed #8D929C;
				padding: 92rpx 32rpx;

				.upload-icon {
					width: 112rpx;
					height: 112rpx;
				}

				.upload-text {
					margin-top: 16rpx;
					color: #8D929C;
					text-align: center;
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}

			.main-tips {
				margin-top: 32rpx;
				padding: 32rpx;
				position: relative;
				z-index: 1;
				border-radius: 16rpx;
				overflow: hidden;

				.tips-title {
					color: var(--theme-color);
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.tips-content {
					margin-top: 24rpx;
					color: var(--theme-color);
					font-size: 24rpx;
					line-height: 34rpx;
				}

				.tips-bg {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: -1;
					background: var(--theme-color);
					opacity: 0.1;
				}
			}
		}
	}
</style>