<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 供需详情-我的 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{ '--theme-color': themeColor }">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="供需详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-tips" :style="{top: titleBarHeight + 'px'}" v-if="demandDetails.business.reject">
				<view class="tips-text">驳回原因:{{ demandDetails.business.reject }}</view>
			</view>
			<view class="main-content">
				<view class="content-item">
					<view class="item-top flex align-items-center">
						<image class="top-avatar" :src="demandDetails.member.avatar" mode="aspectFill"></image>
						<view class="top-info flex-item">
							<view class="title text-ellipsis">{{ demandDetails.member.name }}</view>
							<view class="subtitle">
								{{ demandDetails.member.level_name }} | {{ demandDetails.business.time }} | 浏览 {{ demandDetails.business.page_view }}
							</view>
						</view>
					</view>
					<view class="item-center" v-if="demandDetails.business">
						<view class="center-title">{{ demandDetails.business.title }}</view>
						<view class="center-content">
							<text>{{ demandDetails.business.content }}</text>
						</view>
						<view class="center-image" :class="{'special-image': (demandDetails.business.images.length < 3 || demandDetails.business.images.length === 4)}" v-if="demandDetails.business.images.length">
							<view class="image-box" v-for="(img, num) in demandDetails.business.images" :key="num" @click.stop="previewImage(num)">
								<image class="image" :src="img" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="item-bottom" v-if="demandDetails.business.address">
						<view class="bottom-label inline-flex align-items-center">
							<view class="label-icon" :style="{'background-image': 'url('+ iconAddress +')'}" v-if="iconAddress"></view>
							<text class="label-text flex-item">{{demandDetails.business.address}}</text>
							<view class="label-bg"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="main-footer">
				<view class="flex">
					<view class="footer-btn" style="background: #FFB656;" @click="handleEdit()">修改</view>
					<view class="footer-btn" style="background: #FF2525;" @click="handleDelete()">删除</view>
				</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 未登录状态 -->
		<view class="container-login" v-else-if="showLogin">
			<image class="login-image" :src="loginImg" mode="aspectFit"></image>
			<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
			<view class="login-btn" :style="{ background: themeColor }" @click="toLogin()">前往登录</view>
			<view class="login-btn cancel" @click="toBack()">返回上一页</view>
		</view>
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
				// 标题栏高度
				titleBarHeight: 0,
				// 供需id
				demandId: 0,
				// 详情数据
				demandDetails: {},
				// 是否显示登录提示
				showLogin: false,
				// 延时器
				timeout: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconAddress: state => {
					return svgData.svgToUrl("address", state.app.themeColor)
				},
				loginImg: state => state.app.loginImg,
			}),
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad(option) {
			this.demandId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getDemandDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onShow() {
			if (this.loadEnd) this.getDemandDetails()
		},
		onUnload() {
			clearTimeout(this.timeout)
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
							wx.updateAppMessageShareData({
								title: this.demandDetails.business.title,
								desc: "",
								link: window.location.href,
								imgUrl: this.demandDetails.business.images[0],
							});
							wx.updateTimelineShareData({
								title: this.demandDetails.business.title,
								link: window.location.href,
								imgUrl: this.demandDetails.business.images[0],
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
			// 获取详情
			getDemandDetails(fn) {
				this.$util.request("demand.businessUserDetails", {
					id: this.demandId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.demandDetails = res.data
						this.demandDetails.business.images = this.splitImages(res.data.business.images)
						this.demandDetails.business.time = this.$util.getDateBeforeNow(this.demandDetails.business.createtime)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (error == 401) {
						this.showLogin = true
					} else {
						if (fn) fn()
						console.error('获取详情 ', error)
					}
				})
			},
			// 字符串转数组格式图片
			splitImages(images) {
				try {
					if (images) return images.split(',');
					else return []
				} catch (error) {
					return [];
				}
			},
			// 修改供需
			handleEdit() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesDemand/demand/edit?id=" + this.demandId
				})
			},
			// 删除供需
			handleDelete() {
				uni.showModal({
					title: '提示',
					content: '确认删除此条吗?',
					confirmText: '确认删除',
					confirmColor: '#E50002',
					cancelText: '我再想想',
					cancelColor: '#999999',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "加载中",
								mask: true
							})
							this.$util.request("demand.businessDel", {
								id: this.demandId,
							}).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									uni.showToast({
										title: "删除成功",
										icon: "success",
										mask: true,
										duration: 1500
									})
									this.timeout = setTimeout(() => {
										uni.navigateBack()
									}, 1500)
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('删除供需', error)
							})
						}
					}
				})
			},
			// 预览图片 
			previewImage(index) {
				uni.previewImage({
					urls: this.demandDetails.business.images,
					current: index,
				});
			},
			// 前往登录
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/index",
				})
			},
			// 返回上一页
			toBack() {
				if (getCurrentPages().length == 1) {
					this.$util.toPage({
						mode: 1,
						path: "/pages/index/index"
					})
				} else {
					uni.navigateBack()
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 112rpx;

			.main-tips {
				position: sticky;
				top: 0;
				z-index: 99;
				background: #FFF1F2;
				padding: 24rpx 32rpx;

				.tips-text {
					color: #FF626E;
					font-size: 24rpx;
					line-height: 34rpx;
				}
			}

			.main-content {
				padding: 32rpx;

				.content-item {
					padding: 32rpx 32rpx 24rpx;
					border-radius: 16rpx;
					background: #FFF;

					.item-top {
						padding-bottom: 32rpx;
						border-bottom: 1px solid #E4E4E4;

						.top-avatar {
							width: 96rpx;
							height: 96rpx;
							border-radius: 50%;
						}

						.top-info {
							margin-left: 24rpx;

							.title {
								color: #5A5B6E;
								font-size: 32rpx;
								font-weight: 600;
								line-height: 44rpx;
							}

							.subtitle {
								margin-top: 16rpx;
								color: #666;
								font-size: 24rpx;
								line-height: 34rpx;
							}
						}
					}

					.item-center {
						margin-top: 32rpx;

						.center-title {
							color: #5A5B6E;
							font-size: 32rpx;
							font-weight: 600;
							line-height: 44rpx;
						}

						.center-content {
							margin-top: 24rpx;
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.center-image {
							display: flex;
							flex-wrap: wrap;
							padding-top: 4rpx;

							.image-box {
								width: 32%;
								height: 0;
								padding-top: 32%;
								margin-right: 2%;
								position: relative;
								border-radius: 16rpx;
								overflow: hidden;
								margin-top: 12rpx;

								&:nth-child(3n) {
									margin-right: 0;
								}

								.image {
									position: absolute;
									top: 0;
									left: 0;
									right: 0;
									bottom: 0;
								}
							}

							&.special-image {
								padding-top: 0;
								justify-content: space-between;

								.image-box {
									width: calc(50% - 8rpx);
									padding-top: calc(50% - 8rpx);
									margin-right: 0;
									margin-top: 16rpx;
								}
							}
						}
					}

					.item-bottom {
						margin-top: 24rpx;

						.bottom-label {
							padding: 6rpx 18rpx 6rpx 8rpx;
							position: relative;
							z-index: 1;
							border-radius: 8rpx;
							overflow: hidden;

							.label-bg {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								background: var(--theme-color);
								z-index: -1;
								opacity: 0.1;
							}

							.label-icon {
								width: 24rpx;
								height: 24rpx;
								background-size: 24rpx;
							}

							.label-text {
								margin-left: 8rpx;
								color: var(--theme-color);
								font-size: 20rpx;
								line-height: 28rpx;
							}
						}
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 12rpx 24rpx;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
					width: 100%;
					margin-left: 24rpx;

					&:first-child {
						margin-left: 0;
					}
				}
			}
		}

		.container-login {
			padding: 96rpx 60rpx 0;

			.login-image {
				width: 100%;
				height: 500rpx;
			}

			.login-tips {
				color: #585858;
				font-size: 36rpx;
				line-height: 50rpx;
				margin-top: 48rpx;
				text-align: center;
			}

			.login-btn {
				margin-top: 56rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 28rpx;
				border-radius: 16rpx;
				text-align: center;
				color: #ffffff;

				&.cancel {
					background: #dedede;
					color: #999;
					margin-top: 48rpx;
				}
			}
		}
	}
</style>