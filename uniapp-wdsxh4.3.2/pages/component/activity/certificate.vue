<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.maiwd.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-参会证书 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-activity-certificate">
		<!-- 参会证书 -->
		<canvas class="poster-canvas" :style="{width: posterWidth + 'px', height: posterHeight + 'px'}" canvas-id="myCanvas" id="myCanvas"></canvas>
		<!-- 参会证书模态框 -->
		<uni-popup ref="popupModal" type="center" @change="onChange">
			<view class="poster-popup flex-direction-column align-items-center" :style="{'--theme-color': themeColor, paddingTop: titleBarHeight + 'px'}">
				<view class="popup-close" @click="onClose()">
					<image class="icon" src="/static/closePopup.png" mode="aspectFit"></image>
				</view>
				<scroll-view scroll-y class="popup-content flex justify-content-center">
					<image class="image" :src="posterPath" mode="widthFix"></image>
				</scroll-view>
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
	import { loadImage, createPoster, canvasToTempFilePath } from "@/common/poster.js";
	export default {
		name: "activityCertificate",
		data() {
			return {
				// 标题栏高度
				titleBarHeight: 0,
				// 参会证书数据
				posterInfo: {},
				// 参会证书宽度
				posterWidth: 0,
				// 参会证书高度
				posterHeight: 0,
				// 图片资源是否准备完成
				posterReady: false,
				// 参会证书背景图片
				posterBackground: "",
				// 参会证书图片路径
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
			// 获取参会证书
			getPoster(activityId, applyId) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$util.request("activity.certificate", {
					id: activityId,
					apply_id: applyId,
				}).then(res => {
					if (res.code == 1) {
						this.posterInfo = res.data
						this.posterWidth = res.data.data.bg.width
						this.posterHeight = res.data.data.bg.height
						this.$nextTick(() => {
							this.showNucleus()
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取参会证书 ', error)
				})
			},
			// 获取图片资源
			async showNucleus() {
				this.loadingResources().then((state) => {
					// 状态为 true 表示加载完成
					if (state) {
						this.posterReady = true
						this.createImage()
					}
				});
			},
			// 加载图片资源
			async loadingResources() {
				this.posterBackground = await loadImage(this.posterInfo.data.bg.img);
				return true;
			},
			// 生成参会证书
			async createImage() {
				if (!this.posterReady) {
					uni.hideLoading()
					uni.showToast({
						title: '参会证书图片资源加载失败',
						icon: 'none'
					})
					return
				};
				// 获取上下文对象
				const ctx = uni.createCanvasContext("myCanvas", this);
				// 创建参会证书
				let posterData = [{
					type: "image",
					url: this.posterBackground,
					config: {
						x: 0,
						y: 0,
						w: parseFloat(this.posterWidth),
						h: parseFloat(this.posterHeight),
					},
				}]
				this.posterInfo.data.data.forEach((item) => {
					if (item.type == "text") {
						let content = ""
						if (item.item == "activity_name") content = this.posterInfo.activity_name || ""
						else if (item.item == "name") content = this.posterInfo.participant || ""
						else if (item.item == "time") content = this.posterInfo.time || ""
						let itemX = 0
						if (item.textAlign == "center") itemX = parseFloat(item.left) + parseFloat(item.width) / 2
						else if (item.textAlign == "right") itemX = parseFloat(item.left) + parseFloat(item.width)
						else itemX = parseFloat(item.left)
						let itemFont = "10px sans-serif"
						if (item.fontStyle == 2) {
							itemFont = `italic ${item.size} sans-serif`
						} else if (item.fontStyle == 3) {
							itemFont = `bold ${item.size} sans-serif`
						} else if (item.fontStyle == 4) {
							itemFont = `italic bold ${item.size} sans-serif`
						} else {
							itemFont = `${item.size} sans-serif`
						}
						posterData.push({
							type: "text",
							text: content || "",
							config: {
								x: itemX,
								y: parseFloat(item.top),
								color: item.color,
								font: itemFont,
								textAlign: item.textAlign,
								maxWidth: parseFloat(item.width),
								lineHeight: parseInt(item.height),
								isVerticalCenter: true
							},
						})
					}
				})
				await createPoster(ctx, posterData)
				const imagePath = await canvasToTempFilePath("myCanvas", this);
				this.posterPath = imagePath;
				this.$refs.popupModal.open()
				uni.hideLoading()
			},
			// 保存参会证书
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
	.component-activity-certificate {
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
				max-height: 55vh;

				.image {
					width: 92vw;
					height: auto;
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