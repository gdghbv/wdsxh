<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 商会相册详情 开发者: 麦沃德科技-暴雨
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :title="organize + '相册详情'"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-demand">
				<view class="main-demand-time flex align-items-center">
					<text class="flex-item">{{albumDetails.release_date}}</text>
					<view class="flex align-items-center" :style="{ color:themeColor }" @click="downloads(albumDetails.files)" v-if="albumDetails.type == 2">
						<view class="item-icon" :style="{'background-image': 'url('+ iconDownloads +')'}" v-if="iconDownloads"></view>
						<text class="item-txt">下载视频</text>
					</view>
				</view>
				<view class="main-demand-info">{{albumDetails.name}}</view>
				<view class="main-demand-imge" v-if="albumDetails.files && albumDetails.type == 1">
					<image :src="img" mode="widthFix" class="imge-size" v-for="(img, index) in splitImages(albumDetails.files)" :key="index" @click="preview(index)">
					</image>
				</view>
				<view class="main-demand-imge" v-if="albumDetails.files && albumDetails.type == 2">
					<video :src="videos" class="imge-size" :loop="true" object-fit="cover" :show-mute-btn="true" :show-fullscreen-btn="true" play-btn-position="center" v-for="(videos, index) in splitImages(albumDetails.files)" :key="index"></video>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	import svgData from "@/common/svg.js"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				//相册id
				albumId: null,
				//详情
				albumDetails: {},
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				organize: state => state.app.organize,
				iconDownloads: state => {
					return svgData.svgToUrl("downloads", state.app.themeColor)
				},
				shareImage: state => state.app.shareImage,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.albumId = option.id
			this.getAlbumDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onShareAppMessage() {
			let shareImage = ""
			if (this.albumDetails.files && this.albumDetails.type == 1) {
				shareImage = this.splitImages(this.albumDetails.files)[0]
			} else {
				shareImage = this.shareImage
			}
			return {
				title: this.albumDetails.name,
				imageUrl: shareImage || this.shareImage,
			}
		},
		onShareTimeline() {
			let shareImage = ""
			if (this.albumDetails.files && this.albumDetails.type == 1) {
				shareImage = this.splitImages(this.albumDetails.files)[0]
			} else {
				shareImage = this.shareImage
			}
			return {
				title: this.albumDetails.name,
				imageUrl: shareImage || this.shareImage,
			}
		},
		methods: {
			// #ifdef H5
			// 微信公众号初始化方法
			initConfig() {
				this.$util.request("main.WeChatConfig", {
					url: location.href.split('#')[0]
				}).then(res => {
					if (res.code == 1) {
						wx.config({
							debug: false,
							appId: res.data.appId,
							timestamp: Number(res.data.timestamp),
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData"],
						})
						wx.ready(() => {
							let shareImage = ""
							if (this.albumDetails.files && this.albumDetails.type == 1) {
								shareImage = this.splitImages(this.albumDetails.files)[0]
							} else {
								shareImage = this.shareImage
							}
							wx.updateAppMessageShareData({
								title: this.albumDetails.name,
								desc: "",
								link: window.location.href,
								imgUrl: shareImage || this.shareImage,
							});
							wx.updateTimelineShareData({
								title: this.albumDetails.name,
								link: window.location.href,
								imgUrl: shareImage || this.shareImage,
							});
						});
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
			// 下载视频 
			downloads(url) {
				uni.showLoading({
					title: "下载中",
					mask: true
				})
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode == 200) {
							uni.hideLoading()
							uni.saveVideoToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功',
										icon: 'success'
									});
								},
								fail: function(err) {
									console.error(err);
									uni.hideLoading()
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									});
								}
							});
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '下载视频失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '下载视频失败',
							icon: 'none'
						});
					}
				});
			},
			// 获取相册列表详情
			getAlbumDetails(fn) {
				this.$util.request("album.albumDetails", {
					album_id: this.albumId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.albumDetails = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取相册列表详情', error)
				})
			},
			// 预览图片
			preview(index) {
				// 提取图片路径并组成新的数组
				const urls = this.splitImages(this.albumDetails.files).map(item => item);
				uni.previewImage({
					urls: urls,
					current: index,
				});

			},
			// 字符串转数组格式图片
			splitImages(images) {
				return images.split(',');
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-demand {
				padding: 32rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.main-demand-time {
					padding-bottom: 16rpx;
					font-size: 28rpx;
					line-height: 32rpx;
					font-weight: 600;
					color: #5A5B6E;

					.item-icon {
						width: 32rpx;
						height: 32rpx;
						background-size: 32rpx;
					}

					.item-txt {
						padding-left: 8rpx;
					}
				}

				.main-demand-info {
					font-size: 28rpx;
					line-height: 40rpx;
					color: #8D929C;
				}

				.main-demand-imge {
					.imge-size {
						margin-top: 16rpx;
						width: 622rpx;
						border-radius: 16rpx;
					}
				}
			}
		}
	}
</style>