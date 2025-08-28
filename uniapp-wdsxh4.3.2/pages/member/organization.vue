<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 会员团体 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" :title="memberTypeConfig.group"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<block v-if="loadEnd">
				<!-- 团体信息 -->
				<view class="main-info flex align-items-center">
					<image class="info-avatar" :src="memberInfo.organize_logo" mode="aspectFill"></image>
					<view class="info-name flex-item text-ellipsis-more">{{memberInfo.organize_name}}</view>
					<!-- #ifdef MP-WEIXIN -->
					<button class="info-icon" type="default" open-type="share">
						<image class="icon" src="/static/share_w.png" mode="aspectFit"></image>
					</button>
					<!-- #endif -->
				</view>
				<!-- 团体简介 -->
				<view class="main-introduce">
					<view class="introduce-title">团体简介</view>
					<view class="introduce-content">
						<mp-html :content="memberInfo.organize_introduction"></mp-html>
					</view>
				</view>
				<!-- 自定义字段 -->
				<member-custom :show-data="memberInfo.custom_content"></member-custom>
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
				memberTypeConfig: state => state.app.memberTypeConfig,
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
				title: `${this.memberInfo.member_level_name || ""}单位${this.memberInfo.organize_name || ""}`,
				path: '/pages/member/organization?id=' + this.memberId,
				imageUrl: this.memberInfo.organize_logo,
			}
		},
		onShareAppMessage() {
			return {
				title: `${this.memberInfo.member_level_name || ""}单位${this.memberInfo.organize_name || ""}`,
				path: '/pages/member/organization?id=' + this.memberId,
				imageUrl: this.memberInfo.organize_logo,
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
								title: this.memberInfo.organize_name,
								desc: "",
								link: window.location.href,
								imgUrl: this.memberInfo.organize_logo,
							});
							wx.updateTimelineShareData({
								title: this.memberInfo.organize_name,
								link: window.location.href,
								imgUrl: this.memberInfo.organize_logo,
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
				this.$util.request("member.organization", {
					id: this.memberId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.memberInfo = res.data
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
						console.error('获取会员详情 ', error)
					}
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
			padding: 32rpx;

			.main-info {
				padding: 32rpx 24rpx 32rpx 32rpx;
				border-radius: 10rpx;
				background: #ffffff;

				.info-avatar {
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
				}

				.info-name {
					margin-left: 32rpx;
					font-weight: 600;
					font-size: 32rpx;
					line-height: 40rpx;
					color: #5A5B6E;
				}

				.info-icon {
					margin-left: 32rpx;
					border-radius: 50%;
					background: var(--theme-color);
					padding: 0;

					.icon {
						width: 40rpx;
						height: 40rpx;
						padding: 8rpx;
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