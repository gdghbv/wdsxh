<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.maiwd.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-参会凭证 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-activity-poster">
		<!-- 参会凭证 -->
		<canvas class="poster-canvas" :style="{width: posterWidth + 'px', height: posterHeight + 'px'}" canvas-id="myCanvas" id="myCanvas"></canvas>
		<!-- 二维码生成 -->
		<uqrcode class="poster-canvas" ref="qrcode" canvas-id="qrcode" :value="codeData" :options="{ margin: 4 }" v-if="codeData"></uqrcode>
		<!-- 参会凭证模态框 -->
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
		name: "activityPoster",
		data() {
			return {
				// 标题栏高度
				titleBarHeight: 0,
				// 参会凭证数据
				posterInfo: {},
				// 参会凭证宽度
				posterWidth: 0,
				// 参会凭证高度
				posterHeight: 0,
				// 图片资源是否准备完成
				posterReady: false,
				// 参会凭证用户头像
				posterAvatar: "",
				// 参会凭证二维码数据
				codeData: "",
				// 参会凭证二维码图片
				posterCode: "",
				// 参会凭证图片路径
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
			// 获取参会凭证
			getPoster(id) {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.posterWidth = uni.getSystemInfoSync().windowWidth;
				this.posterHeight = parseInt(this.posterWidth * (456 / 311));
				this.$util.request("activity.attendance", {
					activity_id: id,
				}).then(res => {
					if (res.code == 1) {
						this.posterInfo = res.data
						this.codeData = {
							wechatId: res.data.wechat_id,
						}
						this.codeData = JSON.stringify(this.codeData)
						this.createQrcode()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取参会凭证 ', error)
				})
			},
			// base64转临时路径
			base64ToPath(base64) {
				let arr = base64.split(',');
				let mime = arr[0].match(/:(.*?);/)[1];
				let bstr = atob(arr[1]);
				let n = bstr.length;
				let u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				let blob = new Blob([u8arr], {
					type: mime
				});
				let url = URL.createObjectURL(blob);
				return url;
			},
			// 生成二维码
			createQrcode() {
				if (this.$refs.qrcode && this.$refs.qrcode.toTempFilePath) {
					this.$refs.qrcode.toTempFilePath({
						success: res => {
							// #ifdef MP-WEIXIN
							const base64Data = res.tempFilePath.replace(/^data:image\/\w+;base64,/, '');
							const filePath = `${wx.env.USER_DATA_PATH}/qrcode.jpg`
							uni.getFileSystemManager().writeFile({
								filePath,
								data: base64Data,
								encoding: "base64",
								success: () => {
									this.posterCode = filePath
									this.showNucleus()
								}
							})
							// #endif
							// #ifdef H5
							this.posterCode = this.base64ToPath(res.tempFilePath);
							this.showNucleus()
							// #endif
						},
						fail: () => {
							setTimeout(() => {
								this.createQrcode()
							}, 200);
						},
					});
				} else {
					setTimeout(() => {
						this.createQrcode()
					}, 200);
				}
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
				this.posterCode = await loadImage(this.posterCode);
				this.posterAvatar = await loadImage(this.posterInfo.member_avatar);
				return true;
			},
			// 生成参会凭证
			async createImage() {
				if (!this.posterReady) {
					uni.hideLoading()
					uni.showToast({
						title: '参会凭证图片资源加载失败',
						icon: 'none'
					})
					return
				};
				// 获取上下文对象
				const ctx = uni.createCanvasContext("myCanvas", this);
				// 设置背景色1
				const x1 = 0;
				const y1 = 0;
				const width1 = this.posterWidth;
				const height1 = this.posterHeight;
				const radius1 = parseInt(this.posterWidth * (20 / 311));
				ctx.beginPath();
				ctx.moveTo(x1 + radius1, y1);
				ctx.lineTo(x1 + width1 - radius1, y1);
				ctx.arc(x1 + width1 - radius1, y1 + radius1, radius1, -Math.PI / 2, 0);
				ctx.lineTo(x1 + width1, y1 + height1 - radius1);
				ctx.arc(x1 + width1 - radius1, y1 + height1 - radius1, radius1, 0, Math.PI / 2);
				ctx.lineTo(x1 + radius1, y1 + height1);
				ctx.arc(x1 + radius1, y1 + height1 - radius1, radius1, Math.PI / 2, Math.PI);
				ctx.lineTo(x1, y1 + radius1);
				ctx.arc(x1 + radius1, y1 + radius1, radius1, Math.PI, -Math.PI / 2);
				ctx.closePath();
				ctx.setFillStyle('#ffffff')
				ctx.fill();
				ctx.setStrokeStyle('#ffffff')
				ctx.stroke();
				// 设置背景色2
				const x2 = 2;
				const y2 = 2;
				const width2 = parseInt(this.posterWidth - 4);
				const height2 = parseInt(this.posterHeight - 4);
				const radius2 = parseInt(this.posterWidth * (20 / 311));
				ctx.beginPath();
				ctx.moveTo(x2 + radius2, y2);
				ctx.lineTo(x2 + width2 - radius2, y2);
				ctx.arc(x2 + width2 - radius2, y2 + radius2, radius2, -Math.PI / 2, 0);
				ctx.lineTo(x2 + width2, y2 + height2 - radius2);
				ctx.arc(x2 + width2 - radius2, y2 + height2 - radius2, radius2, 0, Math.PI / 2);
				ctx.lineTo(x2 + radius2, y2 + height2);
				ctx.arc(x2 + radius2, y2 + height2 - radius2, radius2, Math.PI / 2, Math.PI);
				ctx.lineTo(x2, y2 + radius2);
				ctx.arc(x2 + radius2, y2 + radius2, radius2, Math.PI, -Math.PI / 2);
				ctx.closePath();
				ctx.setFillStyle(this.$util.hexToRgb(this.themeColor, .1))
				ctx.fill();
				ctx.setStrokeStyle('rgba(255, 255, 255, 0)')
				ctx.stroke();
				// 设置背景色3
				const x3 = parseInt(this.posterWidth * (16 / 311));
				const y3 = parseInt(this.posterWidth * (64 / 311));
				const width3 = parseInt(this.posterWidth - this.posterWidth * (32 / 311));
				const height3 = parseInt(this.posterWidth * (228 / 311));
				const radius3 = parseInt(this.posterWidth * (10 / 311));
				ctx.beginPath();
				ctx.moveTo(x3 + radius3, y3);
				ctx.lineTo(x3 + width3 - radius3, y3);
				ctx.arc(x3 + width3 - radius3, y3 + radius3, radius3, -Math.PI / 2, 0);
				ctx.lineTo(x3 + width3, y3 + height3 - radius3);
				ctx.arc(x3 + width3 - radius3, y3 + height3 - radius3, radius3, 0, Math.PI / 2);
				ctx.lineTo(x3 + radius3, y3 + height3);
				ctx.arc(x3 + radius3, y3 + height3 - radius3, radius3, Math.PI / 2, Math.PI);
				ctx.lineTo(x3, y3 + radius3);
				ctx.arc(x3 + radius3, y3 + radius3, radius3, Math.PI, -Math.PI / 2);
				ctx.closePath();
				const grd2 = ctx.createLinearGradient(0, 0, 0, parseInt(this.posterWidth * (321 / 311)))
				grd2.addColorStop(0, "#ffffff")
				grd2.addColorStop(1, "rgba(255, 255, 255, 0.4)")
				ctx.setFillStyle(grd2)
				ctx.fill();
				ctx.setStrokeStyle('rgba(255, 255, 255, 0)')
				ctx.stroke();
				// 创建参会凭证
				await createPoster(ctx, [{
						type: "text",
						text: "活动参会凭证",
						config: {
							x: parseInt(this.posterWidth / 2),
							y: parseInt(this.posterWidth * (36 / 311)),
							color: this.themeColor,
							font: `bold ${parseInt(this.posterWidth * (24 / 311))}px sans-serif`,
							textAlign: "center",
							lineHeight: parseInt(this.posterWidth * (28 / 311)),
						},
					},
					{
						type: "image",
						url: this.posterAvatar,
						config: {
							x: parseInt(this.posterWidth * (32 / 311)),
							y: parseInt(this.posterWidth * (80 / 311)),
							w: parseInt(this.posterWidth * (68 / 311)),
							h: parseInt(this.posterWidth * (68 / 311)),
							r: parseInt(this.posterWidth * (6 / 248))
						},
					},
					{
						type: "text",
						text: this.posterInfo.member_name,
						config: {
							x: parseInt(this.posterWidth * (108 / 311)),
							y: parseInt(this.posterWidth * (92 / 311)),
							color: "#5A5B6E",
							font: `bold ${parseInt(this.posterWidth * (18 / 311))}px sans-serif`,
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (177 / 311)),
						},
					},
					{
						type: "text",
						text: this.posterInfo.mobile,
						config: {
							x: parseInt(this.posterWidth * (108 / 311)),
							y: parseInt(this.posterWidth * (118 / 311)),
							color: "#5A5B6E",
							fontSize: parseInt(this.posterWidth * (12 / 311)).toString(),
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (177 / 311)),
						},
					},
					{
						type: "text",
						text: this.posterInfo.member_level_name,
						config: {
							x: parseInt(this.posterWidth * (108 / 311)),
							y: parseInt(this.posterWidth * (142 / 311)),
							color: "#5A5B6E",
							fontSize: parseInt(this.posterWidth * (12 / 311)).toString(),
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (177 / 311)),
						},
					},
					{
						type: "text",
						text: "活动",
						config: {
							x: parseInt(this.posterWidth * (32 / 311)),
							y: parseInt(this.posterWidth * (172 / 311)),
							color: "#5A5B6E",
							font: `bold ${parseInt(this.posterWidth * (14 / 311))}px sans-serif`,
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (247 / 311)),
						},
					},
					{
						type: "text",
						text: this.posterInfo.activity_name,
						config: {
							x: parseInt(this.posterWidth * (32 / 311)),
							y: parseInt(this.posterWidth * (196 / 311)),
							color: this.themeColor,
							fontSize: parseInt(this.posterWidth * (14 / 311)).toString(),
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (247 / 311)),
							wrap: true,
							lineNumber: 2,
							lineHeight: parseInt(this.posterWidth * (18 / 311)),
							isVerticalCenter: false
						},
					},
					{
						type: "text",
						text: "地址",
						config: {
							x: parseInt(this.posterWidth * (32 / 311)),
							y: parseInt(this.posterWidth * (235 / 311)),
							color: "#5A5B6E",
							font: `bold ${parseInt(this.posterWidth * (14 / 311))}px sans-serif`,
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (247 / 311)),
						},
					},
					{
						type: "text",
						text: this.posterInfo.address,
						config: {
							x: parseInt(this.posterWidth * (32 / 311)),
							y: parseInt(this.posterWidth * (259 / 311)),
							color: this.themeColor,
							fontSize: parseInt(this.posterWidth * (14 / 311)).toString(),
							textAlign: "left",
							maxWidth: parseInt(this.posterWidth * (247 / 311)),
							wrap: true,
							lineNumber: 2,
							lineHeight: parseInt(this.posterWidth * (18 / 311)),
							isVerticalCenter: false
						},
					},
					{
						type: "image",
						url: this.posterCode,
						config: {
							x: parseInt(this.posterWidth * (106 / 311)),
							y: parseInt(this.posterWidth * (308 / 311)),
							w: parseInt(this.posterWidth * (100 / 311)),
							h: parseInt(this.posterWidth * (100 / 311)),
						},
					},
					{
						type: "text",
						text: "参会时，请出示二维码进行核销",
						config: {
							x: parseInt(this.posterWidth / 2),
							y: parseInt(this.posterWidth * (428 / 311)),
							color: "#5A5B6E",
							fontSize: parseInt(this.posterWidth * (14 / 311)).toString(),
							textAlign: "center",
							lineHeight: parseInt(this.posterWidth * (24 / 311)),
						},
					},
				])
				const imagePath = await canvasToTempFilePath("myCanvas", this);
				this.posterPath = imagePath;
				this.$refs.popupModal.open()
				uni.hideLoading()
			},
			// 保存参会凭证
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
	.component-activity-poster {
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