<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 活动接龙反馈 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="活动接龙反馈"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-form">
				<view class="form-group">
					<view class="group-title">1.署名<text class="symbol">*</text></view>
					<view class="group-input">{{formData.name}}</view>
				</view>
				<view class="form-group">
					<view class="group-title">2.图片</view>
					<view class="group-list flex flex-wrap">
						<view class="list-image" v-for="(image, index) in selectImages" :key="index">
							<image class="image-box" :src="image" mode="aspectFill" @click="previewImage(index)"></image>
							<image class="image-close" src="/static/cancel.png" mode="aspectFit" @click="deleteImage(index)"></image>
						</view>
						<view class="list-upload" @click="chooseImage()" v-if="selectImages.length < 9">
							<view class="upload-bg"></view>
							<view class="upload-choose flex-direction-column flex-center">
								<view class="choose-icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="choose-text">上传图片</view>
							</view>
						</view>
					</view>
				</view>
				<view class="form-group">
					<view class="group-title">3.内容</view>
					<view class="group-textarea">
						<textarea class="textarea" placeholder="请输入反馈内容" placeholder-class="placeholder" v-model="formData.content"></textarea>
					</view>
				</view>
			</view>
			<view class="main-btn">
				<view class="btn" :style="{ background: themeColor }" @click="handleSubmit(1)">参加</view>
				<view class="btn" :style="{ background: themeColorOne }" @click="handleSubmit(2)">不参加</view>
				<view class="btn" :style="{ background: themeColorTwo }" @click="handleSubmit(3)">参加其它</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 表单内容
				formData: {},
				// 已选择图片
				selectImages: [],
				// 延时器
				delayer: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			}),
			themeColorOne() {
				return this.$util.hexToRgb(this.themeColor, 0.6);
			},
			themeColorTwo() {
				return this.$util.hexToRgb(this.themeColor, 0.3);
			}
		},
		onLoad(option) {
			this.formData = {
				...JSON.parse(option.data),
				images: "",
				content: "",
			}
			this.$nextTick(() => {
				this.loadEnd = true
			})
		},
		onUnload() {
			if (this.delayer) clearTimeout(this.delayer)
		},
		methods: {
			// 选择图片
			chooseImage() {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 9 - this.selectImages.length,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.selectImages = [...this.selectImages, ...res.tempFiles.map(item => item.tempFilePath)]
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: 9 - this.selectImages.length,
					sourceType: ['album', 'camera '],
					sizeType: ['compressed'],
					success: (res) => {
						this.selectImages = [...this.selectImages, ...res.tempFilePaths]
					}
				});
				// #endif
			},
			// 删除图片
			deleteImage(index) {
				this.$delete(this.selectImages, index)
			},
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.selectImages,
					current: index,
				})
			},
			// 提交反馈
			handleSubmit(status) {
				this.formData.status = status
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				if (this.selectImages.length) {
					this.$util.uploadFileMultiple(this.selectImages).then(result => {
						this.formData.images = result.join(",")
						this.submitEvent()
					}).catch(error => {
						uni.hideLoading()
						console.error('上传文件 ', error)
					})
				} else {
					this.submitEvent()
				}
			},
			// 提交事件
			submitEvent() {
				this.$util.request("sequence.addFeedback", this.formData).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						uni.showToast({
							icon: "success",
							title: "反馈成功",
							mask: true,
							duration: 1500
						})
						this.delayer = setTimeout(() => {
							if (getCurrentPages().length == 1) {
								this.$util.toPage({
									mode: 1,
									path: "/pages/index/index"
								})
							} else {
								uni.navigateBack()
							}
						}, 1500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('提交反馈', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 48rpx;

			.main-form {
				.form-group {
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.group-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;

						.symbol {
							color: #E60012;
						}
					}

					.group-input {
						margin-top: 32rpx;
						padding: 36rpx 32rpx;
						border-radius: 16rpx;
						background: #FFFFFF;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.group-list {
						margin-top: 32rpx;
						border-radius: 16rpx;
						row-gap: 24rpx;
						column-gap: 3.5%;

						.list-image {
							position: relative;
							width: 31%;
							height: 0;
							padding-top: 31%;

							.image-box {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								border-radius: 12rpx;
							}

							.image-close {
								position: absolute;
								z-index: 1;
								top: -16rpx;
								right: -16rpx;
								width: 48rpx;
								height: 48rpx;
							}
						}

						.list-upload {
							position: relative;
							width: 31%;
							height: 0;
							padding-top: 31%;
							background: #FFF;
							border-radius: 12rpx;
							overflow: hidden;

							.upload-bg {
								position: absolute;
								top: 0;
								right: 0;
								bottom: 0;
								left: 0;
								background: var(--theme-color);
								opacity: 0.1;
							}

							.upload-choose {
								position: absolute;
								top: 20rpx;
								right: 20rpx;
								bottom: 20rpx;
								left: 20rpx;
								z-index: 1;
								background: #FFF;
								border-radius: 6rpx;

								.choose-icon {
									width: 80rpx;
									height: 80rpx;
									padding: 16rpx;
									background: var(--theme-color);
									border-radius: 50%;
									overflow: hidden;
								}

								.choose-text {
									margin-top: 16rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}
							}
						}
					}

					.group-textarea {
						margin-top: 32rpx;
						padding: 36rpx 32rpx;
						border-radius: 16rpx;
						background: #FFFFFF;

						.textarea {
							width: 100%;
							height: 144rpx;
							color: #ACADB7;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.placeholder {
							color: #ACADB7;
						}
					}
				}
			}

			.main-btn {
				margin-top: 48rpx;

				.btn {
					margin-top: 16rpx;
					padding: 28rpx 32rpx;
					border-radius: 16rpx;
					color: #FFFFFF;
					text-align: center;
					font-size: 28rpx;
					line-height: 40rpx;

					&:first-child {
						margin-top: 0;
					}
				}
			}
		}
	}
</style>