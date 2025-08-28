<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 机构详情 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="机构详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<block v-if="loadEnd">
				<!-- 轮播图 -->
				<carousel :show-data="institutionInfo.image_list" height="320rpx" radius="10rpx" bottom="24rpx" right="24rpx"></carousel>
				<!-- 机构信息 -->
				<view class="main-info flex align-items-center">
					<image class="info-logo" :src="institutionInfo.icon" mode="aspectFill"></image>
					<view class="info-name flex-item">{{ appletName }} | {{ institutionInfo.name }}</view>
				</view>
				<!-- 机构简介 -->
				<view class="main-column">
					<view class="column-title">机构简介</view>
					<view class="column-content">
						<mp-html :content="institutionInfo.introduction"></mp-html>
					</view>
				</view>
				<!-- 成员列表 -->
				<view class="main-column" v-if="memberList && memberList.length">
					<view class="column-title">成员列表</view>
					<view class="column-list">
						<view class="list-item" v-for="(item, index) in memberList" :key="index">
							<view class="item-info flex align-items-center">
								<image class="info-avatar" :src="item.usermember.avatar" mode="aspectFill"></image>
								<view class="info-box flex-item">
									<view class="box-title text-ellipsis">{{ item.usermember.name }}</view>
									<view class="box-subtitle text-ellipsis">{{ appletName }} | {{ item.member_level }}</view>
									<view class="box-subtitle text-ellipsis" :style="{color: themeColor}">{{ item.institution_level.level_name }}</view>
								</view>
							</view>
							<view class="item-introduce flex">
								<view class="introduce-text text-ellipsis-more">
									<view class="btn" @click="openMemberDetails(item)">详情</view>
									{{ item.introduction }}
									<view class="mask"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 申请加入 -->
				<view class="main-apply" @click="toApply()" v-if="institutionInfo.apply_state != 2">
					<image class="apply-icon" src="/static/add.png" mode="aspectFit"></image>
					<text class="apply-text">申请加入</text>
				</view>
			</block>
			<view class="main-login" v-else-if="showLogin">
				<image class="login-image" :src="loginImg" mode="aspectFit"></image>
				<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
				<view class="login-btn" @click="toLogin()">前往登录</view>
				<view class="login-btn cancel" @click="toBack()">返回上一页</view>
			</view>
		</view>
		<!-- 成员详情弹窗 -->
		<uni-popup ref="popupModal" type="center" @change="onModalChange">
			<view class="container-popup">
				<view class="popup-close" @click="$refs.popupModal.close()">
					<image src="/static/close.png" mode="aspectFit"></image>
				</view>
				<view class="popup-content flex-direction-column">
					<view class="content-info flex align-items-center" v-if="popupInfo && popupInfo.usermember">
						<image class="info-avatar" :src="popupInfo.usermember.avatar" mode="aspectFill"></image>
						<view class="info-box flex-item">
							<view class="box-title text-ellipsis">{{ popupInfo.usermember.name }}</view>
							<view class="box-subtitle text-ellipsis">{{ appletName }} | {{ popupInfo.member_level }}</view>
							<view class="box-subtitle text-ellipsis" :style="{color: themeColor}">{{ popupInfo.institution_level.level_name }}</view>
						</view>
					</view>
					<scroll-view scroll-y class="contetnt-scroll flex-item">
						<mp-html :content="popupInfo.content"></mp-html>
					</scroll-view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import carousel from "@/pages/component/carousel/carousel.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			carousel,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 机构id
				institutionId: null,
				// 机构详情
				institutionInfo: {},
				// 成员列表
				memberList: [],
				// 分类查询参数
				page: 1,
				limit: 10,
				hasMore: false,
				// 弹窗信息
				popupInfo: {},
				// 是否显示登录提示
				showLogin: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				appletName: state => state.app.appletName,
			})
		},
		onLoad(option) {
			this.institutionId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getMemberList()
			this.getInstitution(() => {
				this.loadEnd = true
				uni.hideLoading()
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getMemberList()
			}
		},
		onShareAppMessage() {
			return {
				title: this.institutionInfo.name,
				imageUrl: this.institutionInfo.image_list[0],
			}
		},
		onShareTimeline() {
			return {
				title: this.institutionInfo.name,
				imageUrl: this.institutionInfo.image_list[0],
			}
		},
		methods: {
			// 获取机构详情
			getInstitution(fn) {
				this.$util.request("institution.details", {
					id: this.institutionId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.institutionInfo = res.data
						if (this.institutionInfo.images) this.institutionInfo.image_list = this.institutionInfo.images.split(",")
						else this.institutionInfo.image_list = []
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
						console.error('获取机构详情 ', error)
					}
				})
			},
			// 获取成员列表
			getMemberList() {
				this.$util.request("institution.member", {
					page: this.page,
					limit: this.limit,
					institution_id: this.institutionId
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.memberList = this.page == 1 ? list : [...this.memberList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取成员列表 ', error)
				})
			},
			// 跳转申请
			toApply() {
				if (this.institutionInfo.apply_state == 1) {
					uni.showToast({
						icon: "none",
						title: "您已提交申请正在审核",
						duration: 2500
					})
				} else {
					this.$util.toPage({
						mode: 1,
						path: `/pagesTools/institution/apply?id=${this.institutionId}&state=${this.institutionInfo.apply_state || -1}`,
					})
				}
			},
			// 打开成员介绍弹窗
			openMemberDetails(item) {
				this.popupInfo = item
				this.$refs.popupModal.open()
			},
			// 弹窗改变事件
			onModalChange(e) {
				this.pageShow = e.show
			},
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
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "wx-open-launch-weapp"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData", 'wx-open-launch-weapp'],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.institutionInfo.name,
								desc: "",
								link: window.location.href,
								imgUrl: this.institutionInfo.image_list[0],
							});
							wx.updateTimelineShareData({
								title: this.institutionInfo.name,
								link: window.location.href,
								imgUrl: this.institutionInfo.image_list[0],
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
			padding: 32rpx;

			.main-info {
				margin-top: 32rpx;
				border-radius: 16rpx;
				background: #FFF;
				padding: 32rpx;

				.info-logo {
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
				}

				.info-name {
					margin-left: 32rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}
			}

			.main-column {
				margin-top: 32rpx;

				.column-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.column-content {
					margin-top: 32rpx;
					border-radius: 16rpx;
					background: #FFF;
					padding: 32rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.column-list {
					margin-top: 32rpx;

					.list-item {
						margin-top: 32rpx;
						border-radius: 16rpx;
						background: #FFF;
						padding: 32rpx;

						&:first-child {
							margin-top: 0;
						}

						.item-info {
							.info-avatar {
								width: 124rpx;
								height: 124rpx;
								border-radius: 50%;
							}

							.info-box {
								margin-left: 16rpx;

								.box-title {
									color: #5A5B6E;
									font-size: 28rpx;
									font-weight: 500;
									line-height: 40rpx;
								}

								.box-subtitle {
									margin-top: 8rpx;
									color: #8D929C;
									font-size: 24rpx;
									line-height: 34rpx;
								}
							}
						}

						.item-introduce {
							margin-top: 16rpx;

							.introduce-text {
								position: relative;
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;

								.btn {
									float: right;
									clear: both;
									color: var(--theme-color);
									margin-left: 12rpx;
								}

								&::before {
									content: '';
									float: right;
									width: 0;
									height: 100%;
									margin-bottom: -40rpx;
								}

								.mask {
									display: inline-block;
									position: absolute;
									width: 100%;
									height: 100%;
									background-color: #FFF;
								}
							}
						}
					}
				}
			}

			.main-apply {
				position: fixed;
				z-index: 99;
				right: 32rpx;
				bottom: 14%;
				background: var(--theme-color);
				width: 128rpx;
				height: 128rpx;
				border-radius: 32rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.apply-icon {
					width: 48rpx;
					height: 48rpx;
					margin-bottom: 8rpx;
				}

				.apply-text {
					color: #FFF;
					text-align: center;
					font-size: 24rpx;
					font-weight: 600;
					line-height: 34rpx;
				}
			}

			.main-login {
				padding: 64rpx 28rpx 0;

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
					background: var(--theme-color);
					color: #ffffff;

					&.cancel {
						background: #dedede;
						color: #999;
						margin-top: 48rpx;
					}
				}
			}
		}

		.container-popup {
			position: relative;
			z-index: 999;
			border-radius: 16rpx;
			background: #FFF;
			padding: 48rpx 24rpx 64rpx;
			width: 600rpx;
			max-width: 95vw;

			.popup-close {
				position: absolute;
				top: 24rpx;
				right: 24rpx;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				border: 1rpx solid #5A5B6E;
				padding: 12rpx;
				background: #FFF;
				z-index: 1;
			}

			.popup-content {
				.content-info {
					padding: 0 24rpx;

					.info-avatar {
						width: 124rpx;
						height: 124rpx;
						border-radius: 50%;
					}

					.info-box {
						margin-left: 16rpx;

						.box-title {
							color: #5A5B6E;
							font-size: 28rpx;
							font-weight: 500;
							line-height: 40rpx;
						}

						.box-subtitle {
							margin-top: 8rpx;
							color: #8D929C;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}
				}

				.contetnt-scroll {
					padding: 0 24rpx;
					margin-top: 40rpx;
					max-height: 524rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>