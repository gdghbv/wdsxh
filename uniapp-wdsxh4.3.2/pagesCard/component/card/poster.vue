<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.maiwd.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-电子名片 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-card-poster">
		<canvas class="poster-canvas" :style="{width: posterWidth + 'px', height: posterHeight + 'px'}" canvas-id="myCanvas" id="myCanvas"></canvas>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import { loadImage, createPoster, canvasToTempFilePath } from "@/common/poster.js";
	export default {
		name: "cardPoster",
		data() {
			return {
				// 名片数据
				showData: {},
				// 电子名片宽度
				posterWidth: 343,
				// 电子名片高度
				posterHeight: 276,
				// 图片资源是否准备完成
				posterReady: false,
				// 电子名片背景图
				posterBackground: "",
				// 电子名片用户头像
				posterAvatar: "",
				// 电子名片商协会logo
				posterLogo: "",
				// 电话图标-白
				mobileIcon1: "/static/card/mobile_w.png",
				// 电话图标-黑
				mobileIcon2: "/static/card/mobile.png",
				// 地址图标-白
				addressIcon1: "/static/card/location_w.png",
				// 地址图标-黑
				addressIcon2: "/static/card/location.png",
				// 回调方法
				posterCallback: null,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				appletName: state => state.app.appletName,
				appletLogo: state => state.app.appletLogo,
				userInfo: state => state.user.userInfo,
			})
		},
		methods: {
			// 获取电子名片路径
			getPosterPath(data, fn) {
				this.showData = data
				this.posterCallback = fn
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
				if (this.showData.card_background_image) this.posterBackground = await loadImage(this.showData.card_background_image);
				if (this.showData.avatar) this.posterAvatar = await loadImage(this.showData.avatar);
				if (this.appletLogo) this.posterLogo = await loadImage(this.appletLogo);
				return true;
			},
			// 生成电子名片
			async createImage() {
				if (!this.posterReady) {
					uni.hideLoading()
					uni.showToast({
						title: '电子名片部分图片资源加载失败',
						icon: 'none'
					})
					return
				};
				// 获取上下文对象
				const ctx = uni.createCanvasContext("myCanvas", this);
				// 获取姓名占用长度
				ctx.font = "bold 20px sans-serif"
				let nameWidth = parseFloat(ctx.measureText(this.showData.name).width);
				// 设置按钮背景色
				const x1 = 51.5;
				const y1 = 216;
				const width1 = 240;
				const height1 = 48;
				const radius1 = 24;
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
				ctx.setFillStyle(this.themeColor)
				ctx.fill();
				ctx.setStrokeStyle(this.themeColor)
				ctx.stroke();
				// 创建电子名片
				let posterData = [{
						type: "image",
						url: this.posterBackground || "",
						config: {
							x: 0,
							y: 0,
							w: this.posterWidth,
							h: 200,
							r: 8,
						},
					},
					{
						type: "text",
						text: "查看名片",
						config: {
							x: parseInt(this.posterWidth / 2),
							y: 240,
							color: "#FFF",
							fontSize: "16",
							textAlign: "center",
						},
					},
				]
				if (this.showData.avatar && this.showData.is_hide_avatar != 1) {
					posterData.push({
						type: "image",
						url: this.posterAvatar || "",
						config: {
							x: 271,
							y: 16,
							w: 56,
							h: 56,
							r: 8,
						},
					})
				}
				if (this.showData.name) {
					posterData.push({
						type: "text",
						text: this.showData.name || "",
						config: {
							x: 16,
							y: 30,
							color: this.showData.font_color,
							font: `bold 20px sans-serif`,
							textAlign: "left",
						},
					})
				}
				if (this.showData.company_position) {
					posterData.push({
						type: "text",
						text: this.showData.company_position || "",
						config: {
							x: parseInt(nameWidth + 24),
							y: 33,
							color: this.showData.font_color,
							fontSize: "12",
							textAlign: "left",
						},
					})
				}
				if (this.showData.company_name) {
					posterData.push({
						type: "text",
						text: this.showData.company_name || "",
						config: {
							x: 16,
							y: 58,
							color: this.showData.font_color,
							fontSize: "12",
							textAlign: "left",
						},
					})
				}
				if (this.showData.main_business) {
					posterData.push({
						type: "text",
						text: this.getMainBusiness(this.showData.main_business) || "",
						config: {
							x: 16,
							y: 88,
							color: this.showData.font_color,
							fontSize: "12",
							textAlign: "left",
						},
					})
				}
				if (this.showData.mobile) {
					posterData.push({
						type: "image",
						url: this.showData.font_color == "#FFFFFF" ? this.mobileIcon1 : this.mobileIcon2,
						config: {
							x: 16,
							y: 110,
							w: 12,
							h: 12,
						},
					})
					posterData.push({
						type: "text",
						text: this.showData.mobile || "",
						config: {
							x: 36,
							y: 117,
							color: this.showData.font_color,
							fontSize: "12",
							textAlign: "left",
						},
					})
				}
				if (this.showData.company_address) {
					posterData.push({
						type: "image",
						url: this.showData.font_color == "#FFFFFF" ? this.addressIcon1 : this.addressIcon2,
						config: {
							x: 16,
							y: 132,
							w: 12,
							h: 12,
						},
					})
					posterData.push({
						type: "text",
						text: this.showData.company_address || "",
						config: {
							x: 36,
							y: 140,
							color: this.showData.font_color,
							fontSize: "12",
							textAlign: "left",
						},
					})
				}
				if (this.posterLogo) {
					posterData.push({
						type: "image",
						url: this.posterLogo || "",
						config: {
							x: 16,
							y: 174,
							w: 20,
							h: 20,
							r: 10,
						},
					})
				}
				if (this.appletName) {
					var showText = this.appletName
					if (this.userInfo && this.userInfo.member_level_name) showText += ` ${this.userInfo.member_level_name}`
					posterData.push({
						type: "text",
						text: showText || "",
						config: {
							x: 44,
							y: 185,
							color: this.showData.font_color,
							fontSize: "12",
							textAlign: "left",
						},
					})
				}
				await createPoster(ctx, posterData)
				const imagePath = await canvasToTempFilePath("myCanvas", this);
				this.$util.uploadFile(imagePath).then(result => {
					this.posterCallback(result.data.url)
				}).catch(error => {
					uni.hideLoading()
					console.error('上传图片 ', error)
				})
			},
			// 获取主营业务
			getMainBusiness(value) {
				try {
					if (value) return value.replaceAll(",", "  ")
					else return ""
				} catch (error) {
					return "";
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-card-poster {
		position: relative;
		z-index: 999;

		.poster-canvas {
			position: fixed;
			top: 100vw;
			left: 100vh;
			z-index: -1;
		}
	}
</style>