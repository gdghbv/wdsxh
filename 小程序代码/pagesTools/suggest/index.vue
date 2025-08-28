<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 需求建议 开发者: 麦沃德科技-暴雨  
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="需求建议"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-form">
				<view class="main-form-item" :style="{'--theme-color': themeColor}">
					<view class="main-form-item-title">标题</view>
					<view class="main-form-item-info">
						<input type="text" placeholder="请输入需求建议标题" placeholder-class="placeholder" v-model="title" />
					</view>
					<view class="main-form-item-title">内容</view>
					<view class="main-form-item-info">
						<textarea class="textarea" placeholder="请输入需求建议内容" placeholder-class="placeholder" v-model="content" />
					</view>
					<view class="main-form-item-title">图片</view>
					<view class="main-form-item-info-img">
						<view class="item-image" v-for="(item, index) in selectImages" :key="index">
							<image class="image" :src="item" mode="aspectFill" @click="previewImage(index)"></image>
							<image class="close" src="/static/cancel.png" mode="aspectFit" @click="deleteImage(index)">
							</image>
						</view>
						<view class="item-image" @click="chooseImage()" v-if="selectImages.length < 1">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传图片</view>
							</view>
						</view>
					</view>
					<view class="main-form-item-anonymity flex align-items-center">
						<view class="radio" :class="{active: isRead}" @click="isRead = !isRead">
							<image src="/static/tick.png" mode="aspectFill" v-if="isRead"></image>
						</view>
						<view class="anonymity-txt" @click="isRead = !isRead">是否匿名提交</view>
						<image src="/static/warning.png" mode="aspectFill" class="anonymity-icon" @click="isShowTips = !isShowTips"></image>
						<view class="anonymity-tips flex flex-center" v-if="isShowTips">
							<view class="tips-triangle"></view>
							<text class="tips-text">不使用真实姓名进行提交</text>
						</view>
					</view>
				</view>
				<!-- 提交按钮 -->
				<view class="main-bottom">
					<view class="harmless-content-button" :style="{ background: themeColor }" @click="submitCheck()">提交</view>
					<view class="safe-padding"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题
				title: '',
				// 内容
				content: '',
				// 已选择图片
				selectImages: [],
				// 上传图片
				image: '',
				// 是否匿名
				isRead: false,
				is_anonymity: 2,
				// 是否显示匿名提示
				isShowTips: false,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onReady() {
			this.loadEnd = true
		},
		methods: {
			// 提交反馈 
			submitCheck() {
				if (this.title == '') {
					uni.showToast({
						title: "请输入需求建议标题",
						icon: 'none'
					})
					return
				}
				if (this.content == '') {
					uni.showToast({
						title: "请输入需求建议内容",
						icon: 'none'
					})
					return
				}
				if (this.isRead == true) {
					this.is_anonymity = 1
				} else {
					this.is_anonymity = 2
				}
				if (this.selectImages[0]) {
					uni.showLoading({
						title: "上传图片中",
						mask: true
					})
					this.$util.uploadFile(this.selectImages[0]).then(result => {
						this.image = result.data.url
						this.submit()
					}).catch(error => {
						uni.hideLoading()
						console.error('上传图片 ', error)
					})
				} else {
					this.submit()
				}
			},
			// 提交 
			submit() {
				this.$util.request("main.addDemand", {
					title: this.title,
					content: this.content,
					image: this.image,
					is_anonymity: this.is_anonymity
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						uni.redirectTo({
							url: "/pagesTools/suggest/success"
						})
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
					sourceType: ['album', 'camera'],
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
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-form {
				padding: 48rpx 48rpx 144rpx;

				.main-form-item {

					.main-form-item-title {
						padding-bottom: 32rpx;
						font-size: 32rpx;
						line-height: 44rpx;
						color: #5A5B6E;
					}

					.main-form-item-info {
						margin-bottom: 32rpx;
						padding: 32rpx;
						border-radius: 16rpx;
						background: #FFFFFF;

						.placeholder {
							font-size: 28rpx;
							line-height: 40rpx;
							color: #8D929C;
						}

						.textarea {
							height: 240rpx;
						}
					}

					.main-form-item-info-img {

						.info-txt {
							flex: 1;
							font-size: 28rpx;
							color: #ACADB7;
						}

						.info-icon {
							width: 32rpx;
							height: 32rpx;
						}

						.placeholder {
							font-size: 28rpx;
							color: #ACADB7;
						}

						.item-image {
							width: 32%;
							height: 0;
							padding-top: 32%;
							position: relative;
							// margin-top: 32rpx;
							margin-right: 2%;

							&:nth-child(3n) {
								margin-right: 0;
							}

							.image-background {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								z-index: 1;
								background: var(--theme-color);
								opacity: 0.08;
							}

							.image-choose {
								position: absolute;
								top: 20rpx;
								left: 20rpx;
								right: 20rpx;
								bottom: 20rpx;
								z-index: 6;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								background: #ffffff;
								border-radius: 6rpx;

								.icon {
									width: 80rpx;
									height: 80rpx;
									padding: 18rpx;
									background: var(--theme-color);
									border-radius: 50%;
								}

								.text {
									margin-top: 16rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}
							}

							.image {
								position: absolute;
								top: 0;
								left: 0;
								border-radius: 10rpx;
							}

							.close {
								position: absolute;
								z-index: 1;
								top: 0;
								right: 0;
								width: 48rpx;
								height: 48rpx;
							}
						}

					}

					.main-form-item-anonymity {
						padding-top: 20rpx;

						.item-radio {
							display: flex;
							align-items: center;

							.item-radio-button {
								width: 48rpx;
								height: 48rpx;
								border-radius: 8rpx;
								background: #FFFFFF;
								position: relative; // 设置相对定位，用于放置图片    

								.radio-image {
									position: absolute;
									top: 0;
									left: 0;
									width: 100%;
									height: 100%;
									display: block;
								}
							}

							.item-radio-txt {
								padding-left: 16rpx;
								font-size: 28rpx;
								line-height: 40rpx;
								color: #5A5B6E;
							}
						}

						.radio {
							width: 32rpx;
							height: 32rpx;
							background: #D6DBDE;
							border-radius: 50%;

							&.active {
								background: var(--theme-color);
							}
						}

						.anonymity-txt {
							padding-left: 16rpx;
							padding-right: 16rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							padding: 12rpx;
							color: #5A5B6E;
						}

						.anonymity-icon {
							width: 32rpx;
							height: 32rpx;
						}

						.anonymity-tips {
							display: flex;
							align-items: center;
							margin-left: 24rpx;

							.tips-triangle {
								width: 0;
								height: 0;
								margin-right: -2rpx;
								border-top: 12rpx solid transparent;
								border-bottom: 12rpx solid transparent;
								border-right: 16rpx solid #333;
							}

							.tips-text {
								font-size: 24rpx;
								line-height: 34rpx;
								padding: 12rpx 16rpx;
								background: #333;
								color: #FFF;
								border-radius: 10rpx;
							}
						}
					}
				}

				.main-bottom {
					padding-top: 16rpx;
					padding-bottom: 16rpx;
					position: fixed;
					bottom: 0;
					left: 0;
					right: 0;
					width: 100%;
					text-align: center;
					background: #FFF;
					z-index: 99;

					.harmless-content-button {
						margin-left: 26rpx;
						margin-right: 26rpx;
						width: 700rpx;
						height: 80rpx;
						background: rgba(50, 93, 255, 1);
						color: rgba(255, 255, 255, 1);
						text-align: center;
						line-height: 80rpx;
						border-radius: 16rpx;
					}

					.safe-padding {
						width: 100%;
						padding-bottom: constant(safe-area-inset-bottom);
						/* 兼容 iOS < 11.2 */
						padding-bottom: env(safe-area-inset-bottom);
						/* 兼容 iOS >= 11.2 */
					}

				}
			}
		}
	}
</style>