<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.maiwd.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-推广会员 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-publicize-poster">
		<!-- 推广会员 -->
		<canvas class="poster-canvas" :style="{width: posterWidth + 'px', height: posterHeight + 'px'}" canvas-id="myCanvas" id="myCanvas"></canvas>
		<!-- 推广会员模态框 -->
		<uni-popup ref="popupModal" type="center" @change="onChange">
			<view class="poster-popup flex-direction-column align-items-center" :style="{'--theme-color': themeColor, paddingTop: titleBarHeight + 'px'}">
				<view class="popup-close" @click="onClose()">
					<image class="icon" src="/static/closePopup.png" mode="aspectFit"></image>
				</view>
				<view class="popup-content flex justify-content-center">
					<image class="image" :src="posterPath" mode="aspectFit"></image>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="popup-btn" @click="saveImage">保存相册</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view class="popup-btn">长按图片保存相册</view>
				<!-- #endif -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import {
		loadImage,
		createPoster,
		canvasToTempFilePath
	} from "@/common/poster.js";
	export default {
		name: "publicizePoster",
		props: ["showData"],
		data() {
			return {
				// 标题栏高度
				titleBarHeight: 0,
				// 推广会员海报宽度
				posterWidth: 0,
				// 推广会员海报高度
				posterHeight: 0,
				// 图片资源是否准备完成
				posterReady: false,
				// 推广会员背景图
				posterBackground: "",
				// 推广会员用户头像
				posterAvatar: "",
				// 推广会员二维码
				posterCode: "",
				// 推广会员图片路径
				posterPath: "",
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		methods: {
			// 获取推广会员
			generatePoster() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.posterWidth = uni.getSystemInfoSync().windowWidth;
				this.posterHeight = parseInt(this.posterWidth * (337 / 248));
				this.showNucleus()
			},
			// 获取图片资源
			async showNucleus() {
				this.loadingResources().then((state) => {
					if (state) {
						this.posterReady = true
						this.createImage()
					}
				});
			},
			// 加载图片资源
			async loadingResources() {
				this.posterBackground = await loadImage(this.showData.image);
				this.posterAvatar = await loadImage(this.showData.avatar);
				this.posterCode = await loadImage(this.showData.code);
				return true;
			},
			// 生成推广会员
			async createImage() {
				if (!this.posterReady) {
					uni.hideLoading()
					uni.showToast({
						title: '推广海报图片资源加载失败',
						icon: 'none'
					})
					return
				};
				// 获取上下文对象
				const ctx = uni.createCanvasContext("myCanvas", this);
				// 设置背景色
				ctx.setFillStyle('#FFFFFF')
				ctx.fillRect(0, 0, this.posterWidth, this.posterHeight)
				// 创建推广会员
				await createPoster(ctx, [{
						type: "image",
						url: this.posterBackground,
						config: {
							x: 0,
							y: 0,
							w: this.posterWidth,
							h: this.posterWidth,
						},
					},
					{
						type: "image",
						url: this.posterAvatar,
						config: {
							x: parseInt(this.posterWidth * (16 / 248)),
							y: parseInt(this.posterWidth * (265 / 248)),
							w: parseInt(this.posterWidth * (24 / 248)),
							h: parseInt(this.posterWidth * (24 / 248)),
							r: parseInt(this.posterWidth * (4 / 248)),
						},
					},
					{
						type: "text",
						text: this.showData.name,
						config: {
							x: parseInt(this.posterWidth * (46 / 248)),
							y: parseInt(this.posterWidth * (276 / 248)),
							color: "#333333",
							fontSize: parseInt(this.posterWidth * (12 / 248)).toString(),
							textAlign: "left",
						},
					},
					{
						type: "text",
						text: "邀请您参加" + this.showData.businessName,
						config: {
							x: parseInt(this.posterWidth * (16 / 248)),
							y: parseInt(this.posterWidth * (306 / 248)),
							color: "#333333",
							fontSize: parseInt(this.posterWidth * (12 / 248)).toString(),
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (140 / 248)),
							wrap: true,
							lineNumber: 2,
							lineHeight: parseInt(this.posterWidth * (20 / 311)),
							isVerticalCenter: true
						},
					},
					{
						type: "image",
						url: this.posterCode,
						config: {
							x: parseInt(this.posterWidth * (168 / 248)),
							y: parseInt(this.posterWidth * (258 / 248)),
							w: parseInt(this.posterWidth * (64 / 248)),
							h: parseInt(this.posterWidth * (64 / 248)),
							r: parseInt(this.posterWidth * (8 / 248)),
						},
					},
				])
				const imagePath = await canvasToTempFilePath("myCanvas", this);
				this.posterPath = imagePath;
				this.$refs.popupModal.open()
				uni.hideLoading()
			},
			// 保存推广会员
			saveImage() {
				// #ifdef MP-WEIXIN
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success: () => {
						uni.getImageInfo({
							src: this.posterPath,
							success: (img) => {
								uni.saveImageToPhotosAlbum({
									filePath: img.path,
									success: () => {
										uni.showToast({
											title: "保存成功",
											icon: "success",
										});
									},
									fail: (err) => {
										console.error(err);
									},
								});
							},
							fail: (err) => {
								console.error(err)
							}
						});
					},
					fail: () => {
						uni.showModal({
							title: '图片保存失败',
							content: '请确认是否已开启授权',
							confirmText: '开启授权',
							confirmColor: this.themeColor,
							success: (res) => {
								if (res.confirm) {
									uni.openSetting({
										success: (setting) => {
											if (setting.authSetting["scope.writePhotosAlbum"]) {
												uni.showToast({
													title: '授权成功，请重新保存',
													icon: "none"
												});
											} else {
												uni.showToast({
													title: '请确定已打开保存权限',
													icon: "none"
												});
											}
										}
									})
								}
							}
						})
					}
				})
				// #endif
				// #ifdef H5
				uni.downloadFile({
					url: this.posterPath,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.showToast({
								title: "保存成功",
								icon: "success",
							});
						}
					}
				});
				// #endif
			},
			// 关闭弹窗
			onClose() {
				this.$refs.popupModal.close()
			},
			// 改变页面滚动状态
			onChange(e) {
				this.$emit("onChange", e.show)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-publicize-poster {
		position: relative;
		z-index: 999;

		.poster-canvas {
			position: fixed;
			top: 100vw;
			left: 100vh;
			z-index: -1;
		}

		.poster-popup {
			.popup-close {
				width: 100%;
				margin-top: -112rpx;
				margin-bottom: 32rpx;
				display: flex;
				justify-content: flex-end;

				.icon {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.popup-content {
				.image {
					width: 80vw;
					height: 65vh;
				}
			}

			.popup-btn {
				margin-top: 32rpx;
				width: 336rpx;
				font-size: 28rpx;
				line-height: 40rpx;
				padding: 26rpx 32rpx;
				border-radius: 16rpx;
				color: #FFFFFF;
				background: var(--theme-color);
				text-align: center;
			}
		}
	}
</style>