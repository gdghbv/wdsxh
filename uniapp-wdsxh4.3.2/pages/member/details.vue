<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 会员详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="会员详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<block v-if="loadEnd">
				<!-- 会员信息 -->
				<view class="main-info flex align-items-center">
					<image class="info-avatar" :src="memberInfo.avatar" mode="aspectFill"></image>
					<view class="info-box flex-item">
						<view class="box-head flex align-items-center">
							<view class="head-name">{{memberInfo.name || "暂未完善"}}</view>
							<view class="head-label">{{memberInfo.level_name || "暂未完善"}}</view>
						</view>
						<view class="box-tag">{{memberInfo.native_place || "暂未完善"}}</view>
						<view class="box-label" v-if="memberInfo.type == 2 && memberInfo.company_position">{{memberInfo.company_position}}</view>
						<view class="box-label" v-else-if="memberInfo.type == 3 && memberInfo.organize_position">{{memberInfo.organize_position}}</view>
					</view>
				</view>
				<!-- 访客记录 -->
				<view class="main-record" v-if="memberInfo.visitor_count > 0">
					<view class="record-title flex justify-content-between align-items-center">
						<view class="title">访客记录</view>
						<view class="label">已有{{memberInfo.visitor_count}}人访问</view>
					</view>
					<view class="record-list flex flex-wrap">
						<view class="list-item" v-for="(item, index) in memberInfo.visitor_list" :key="index">
							<image class="item-avatar" :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="list-item" v-if="memberInfo.visitor_count > 23">
							<view class="item-more flex justify-content-around align-items-center">
								<view class="point"></view>
								<view class="point"></view>
								<view class="point"></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 企业 -->
				<view class="main-group flex" @click="toEnterprise()" v-if="memberInfo.type == 2">
					<image class="group-avatar" :src="memberInfo.company_logo" mode="aspectFill"></image>
					<view class="group-info flex-item flex-direction-column justify-content-around">
						<view class="info-title text-ellipsis">{{memberInfo.company_name}}</view>
						<view class="info-tag text-ellipsis-more">{{memberInfo.company_introduction}}</view>
					</view>
				</view>
				<!-- 团体 -->
				<view class="main-group flex" @click="toOrganization()" v-else-if="memberInfo.type == 3">
					<image class="group-avatar" :src="memberInfo.organize_logo" mode="aspectFill"></image>
					<view class="group-info flex-item flex-direction-column justify-content-around">
						<view class="info-title text-ellipsis">{{memberInfo.organize_name}}</view>
						<view class="info-tag text-ellipsis-more">{{memberInfo.organize_introduction}}</view>
					</view>
				</view>
				<!-- 个人简介 -->
				<view class="main-introduce">
					<view class="introduce-title">个人简介</view>
					<view class="introduce-content">
						<mp-html :content="memberInfo.introduce_content || '暂未完善'"></mp-html>
					</view>
				</view>
				<!-- 行业分类 -->
				<view class="main-industry flex justify-content-start">
					<view class="industry-title">行业分类</view>
					<view class="industry-value flex-item"> {{ memberInfo.industry_category_name || '暂未完善' }}</view>
				</view>
				<!-- 自定义字段 -->
				<member-custom :show-data="memberInfo.custom_content"></member-custom>
				<!-- 底部按钮 -->
				<view class="main-footer">
					<view class="flex justify-content-between align-items-center">
						<view class="footer-menu flex">
							<!-- #ifdef MP-WEIXIN -->
							<button type="default" open-type="share" class="menu-btn">
								<image class="icon" src="/static/share.png" mode="aspectFit"></image>
								<view class="text">分享</view>
							</button>
							<!-- #endif -->
							<view class="menu-btn" @click="toNavigation()">
								<image class="icon" src="/static/location.png" mode="aspectFit"></image>
								<view class="text">地址</view>
							</view>
						</view>
						<view class="footer-btn" @click="saveAddressBook" v-if="memberInfo.mobile_auth == 1 && memberInfo.mobile">保存到通讯录</view>
					</view>
					<view class="safe-padding"></view>
				</view>
			</block>
			<view class="main-login" v-else-if="showLogin">
				<image class="login-image" :src="loginImg" mode="aspectFit"></image>
				<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
				<view class="login-btn" @click="toLogin()">前往登录</view>
				<view class="login-btn cancel" @click="toBack()">返回上一页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import memberCustom from "@/pages/component/member/custom.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			memberCustom,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 会员id
				memberId: null,
				// 会员详情
				memberInfo: {},
				// 是否显示登录提示
				showLogin: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				loginImg: state => state.app.loginImg,
			})
		},
		onLoad(option) {
			this.memberId = option.id
			if (uni.getStorageSync("token")) {
				uni.showLoading({
					title: "加载中"
				})
				this.getMember(() => {
					this.loadEnd = true
					uni.hideLoading()
					// #ifdef H5
					this.initConfig()
					// #endif
				})
			} else {
				this.showLogin = true
				this.$util.verifyLogin(2)
			}
		},
		onShareTimeline() {
			return {
				title: (this.memberInfo.level_name || "") + (this.memberInfo.name || ""),
				path: '/pages/member/details?id=' + this.memberId,
				imageUrl: this.memberInfo.avatar,
			}
		},
		onShareAppMessage() {
			return {
				title: (this.memberInfo.level_name || "") + (this.memberInfo.name || ""),
				path: '/pages/member/details?id=' + this.memberId,
				imageUrl: this.memberInfo.avatar,
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
							wx.updateAppMessageShareData({
								title: this.memberInfo.name,
								desc: "",
								link: window.location.href,
								imgUrl: this.memberInfo.avatar,
							});
							wx.updateTimelineShareData({
								title: this.memberInfo.name,
								link: window.location.href,
								imgUrl: this.memberInfo.avatar,
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
			// 获取会员详情
			getMember(fn) {
				this.$util.request("member.details", {
					id: this.memberId
				}).then(res => {
					if (res.code == 1) {
						if (fn) fn()
						this.memberInfo = res.data
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (error == 401) {
						this.showLogin = true
					} else {
						console.error('获取会员详情 ', error)
					}
				})
			},
			// 跳转地图导航
			toNavigation() {
				this.$util.toPage({
					mode: 7,
					address: {
						latitude: this.memberInfo.latitude,
						longitude: this.memberInfo.longitude,
						address: this.memberInfo.address,
					},
				})
			},
			// 保存通讯录
			saveAddressBook() {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				this.$util.request("member.state", {
					id: this.memberId
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						if (res.data.state.state == 6) {
							// #ifdef MP-WEIXIN
							let info = {
								firstName: this.memberInfo.name, // 名字
								mobilePhoneNumber: this.memberInfo.mobile, // 手机号
								title: this.memberInfo.level_name, // 职位
								workAddressStreet: this.memberInfo.address, // 工作地址街道
							}
							if (this.memberInfo.group && this.memberInfo.group.name) info.organization = this.memberInfo.group.name
							uni.addPhoneContact(info)
							// #endif
							// #ifdef H5
							this.$util.toPage({
								mode: 6,
								phone: this.memberInfo.mobile,
							})
							// #endif
						} else if (res.data.state.state == -1) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: "/pages/member/apply/index"
										})
									}
								}
							})
						} else {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "前往查看",
								success: (res) => {
									if (res.confirm) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									}
								}
							})
						}
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('获取会员状态 ', error)
				})
			},
			// 跳转企业详情
			toEnterprise() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/enterprise?id=" + this.memberId
				})
			},
			// 跳转团体详情
			toOrganization() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/organization?id=" + this.memberId
				})
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
			padding: 32rpx 32rpx 144rpx;

			.main-info {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;

				.info-avatar {
					width: 144rpx;
					height: 144rpx;
					border-radius: 50%;
				}

				.info-box {
					margin-left: 32rpx;

					.box-head {
						.head-name {
							color: #5A5B6E;
							font-size: 36rpx;
							font-weight: 600;
							line-height: 50rpx;
						}

						.head-label {
							margin-left: 16rpx;
							color: var(--theme-color);
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}

					.box-tag {
						margin-top: 16rpx;
						color: #C4C4C4;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.box-label {
						margin-top: 16rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						color: #8D929C;
					}
				}
			}

			.main-record {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.record-title {
					.title {
						color: #5A5B6E;
						font-size: 30rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.label {
						color: var(--theme-color);
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.record-list {
					padding-top: 8rpx;
					margin-left: -2rpx;

					.list-item {
						width: calc((100% / 12) - 4rpx);
						height: 0;
						padding-top: calc((100% / 12) - 4rpx);
						border-radius: 50%;
						overflow: hidden;
						position: relative;
						margin-left: 4rpx;
						margin-top: 16rpx;
						background: #eee;

						.item-avatar {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
						}

						.item-more {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							background: var(--theme-color);
							padding: 0 6rpx;

							.point {
								width: 6rpx;
								height: 6rpx;
								background: #ffffff;
								border-radius: 50%;
							}
						}
					}
				}
			}

			.main-group {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.group-avatar {
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
				}

				.group-info {
					margin-left: 16rpx;

					.info-title {
						color: #5A5B6E;
						font-size: 32rpx;
						line-height: 40rpx;
					}

					.info-tag {
						color: #888888;
						font-size: 24rpx;
						line-height: 44rpx;
					}
				}
			}

			.main-introduce {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.introduce-title {
					color: #5A5B6E;
					font-size: 30rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.introduce-content {
					margin-top: 24rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 48rpx;
				}
			}

			.main-industry {
				margin-top: 32rpx;
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;

				.industry-title {
					color: #5A5B6E;
					font-size: 30rpx;
					font-weight: 600;
					line-height: 44rpx;
					margin-right: 64rpx;
				}

				.industry-value {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 40rpx;
					display: flex;
					justify-content: flex-end;
					word-break: break-all;
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 12rpx 32rpx 12rpx 48rpx;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;

				.footer-menu {
					.menu-btn {
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-right: 32rpx;
						background: transparent;
						padding: 0;

						.icon {
							width: 52rpx;
							height: 52rpx;
						}

						.text {
							color: #5A5B6E;
							font-size: 20rpx;
							line-height: 28rpx;
						}
					}
				}

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
				}
			}

			.main-login {
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
	}
</style>