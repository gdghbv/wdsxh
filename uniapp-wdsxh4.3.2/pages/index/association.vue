<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 商会介绍 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :title="pageTitle"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" :style="{minHeight: `calc(100vh - ${titleBarHeight}px)`}">
			<!-- 顶部导航 -->
			<view class="main-menu flex" :style="{top: titleBarHeight + 'px'}" v-if="loadEnd">
				<view class="menu-item flex-item flex justify-content-center" v-for="item in menuList" :key="item.id" @click="changeMenu(item.id, item.name)">
					<view class="text" :class="{active: selectMenu == item.id}">{{item.name}}</view>
				</view>
			</view>
			<!-- 内容区 -->
			<view class="main-box" v-if="loadEnd">
				<!-- 商会介绍 -->
				<view class="box-content" v-if="selectMenu == 1">
					<mp-html :content="associationInfo.course"></mp-html>
				</view>
				<!-- 商会荣誉 -->
				<view class="box-content" v-else-if="selectMenu == 2">
					<mp-html :content="associationInfo.honor"></mp-html>
				</view>
				<!-- 商会章程 -->
				<view class="box-content" v-else-if="selectMenu == 3">
					<mp-html :content="associationInfo.rules"></mp-html>
				</view>
				<!-- 联系我们 -->
				<view class="box-contact" v-else-if="selectMenu == 4">
					<view class="contact-item" @click="onContact(1)">
						<view class="item-info">
							<view class="info-title">{{organize}}电话</view>
							<view class="info-subtitle">{{associationInfo.contacts}} {{associationInfo.phone}}</view>
						</view>
						<view class="item-icon">
							<image src="/static/contact/phone.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="contact-item" @click="onContact(2)">
						<view class="item-info">
							<view class="info-title">{{organize}}地址</view>
							<view class="info-subtitle">{{associationInfo.address}}</view>
						</view>
						<view class="item-icon">
							<image src="/static/contact/location.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="contact-item" @click="onContact(3)">
						<view class="item-info">
							<view class="info-title">{{organize}}邮箱</view>
							<view class="info-subtitle">{{associationInfo.mailbox}}</view>
						</view>
						<view class="item-icon">
							<image src="/static/contact/email.png" mode="aspectFit"></image>
						</view>
					</view>
					<image class="contact-official" :src="associationInfo.wananchi_qr_code" mode="widthFix" :show-menu-by-longpress="true" @click="onContact(4)"></image>
				</view>
				<!-- 苹果手机底部适配 -->
				<view class="safe-padding" :style="selectMenu != 4 ? 'background: #ffffff;' : ''"></view>
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
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 页面标题
				pageTitle: "",
				// 已选菜单
				selectMenu: 1,
				// 商会介绍
				associationInfo: {},
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				organize: state => state.app.organize,
				menuList: state => {
					return [{
							id: 1,
							name: state.app.organize + "介绍"
						},
						{
							id: 2,
							name: state.app.organize + "荣誉"
						},
						{
							id: 3,
							name: state.app.organize + "章程"
						},
						{
							id: 4,
							name: "联系我们"
						},
					]
				},
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getIntroduce(() => {
				this.loadEnd = true
				uni.hideLoading()
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onReady() {
			this.pageTitle = this.organize + "介绍"
		},
		onShareAppMessage() {
			return {
				title: this.associationInfo.name,
				imageUrl: this.associationInfo.logo,
			}
		},
		onShareTimeline() {
			return {
				title: this.associationInfo.name,
				imageUrl: this.associationInfo.logo,
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
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "wx-open-launch-weapp"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData", 'wx-open-launch-weapp'],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.associationInfo.name,
								desc: "",
								link: window.location.href,
								imgUrl: this.associationInfo.logo,
							});
							wx.updateTimelineShareData({
								title: this.associationInfo.name,
								link: window.location.href,
								imgUrl: this.associationInfo.logo,
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
			// 获取商会介绍
			getIntroduce(fn) {
				this.$util.request("main.association").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.associationInfo = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取商会介绍 ', error)
				})
			},
			// 改变菜单
			changeMenu(id, name) {
				this.selectMenu = id
				this.pageTitle = name
			},
			// 联系我们
			onContact(id) {
				let info = {}
				if (id == 1) {
					info = {
						mode: 6,
						phone: this.associationInfo.phone,
					}
				} else if (id == 2) {
					info = {
						mode: 7,
						address: {
							latitude: this.associationInfo.lat,
							longitude: this.associationInfo.lng,
							address: this.associationInfo.address,
						},
					}
				} else if (id == 3) {
					info = {
						mode: 8,
						content: this.associationInfo.mailbox,
					}
				} else if (id == 4) {
					if (this.associationInfo.qr_code_jump_link) {
						info = {
							mode: 4,
							path: this.associationInfo.qr_code_jump_link,
						}
					} else return
				}
				this.$util.toPage(info)
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 0;
	}

	.container {
		.container-main {
			display: flex;
			flex-direction: column;

			.main-menu {
				background: #ffffff;
				position: sticky;
				top: 0;
				z-index: 99;

				.menu-item {
					padding: 0 24rpx;

					.text {
						padding: 24rpx 0;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						text-align: center;
						border-bottom: 4rpx solid transparent;

						&.active {
							color: var(--theme-color);
							border-color: var(--theme-color);
						}
					}
				}
			}

			.main-box {
				flex: 1;
				display: flex;
				flex-direction: column;

				.box-contact {
					flex: 1;
					padding: 32rpx;

					.contact-item {
						margin-top: 32rpx;
						display: flex;
						align-items: center;
						border-radius: 16rpx;
						background: #ffffff;
						padding: 32rpx 48rpx;

						&:first-child {
							margin-top: 0;
						}

						.item-info {
							flex: 1;

							.info-title {
								color: #5A5B6E;
								font-size: 32rpx;
								font-weight: 600;
								line-height: 44rpx;
							}

							.info-subtitle {
								margin-top: 16rpx;
								color: #8D929C;
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}

						.item-icon {
							padding: 8rpx;
							border-radius: 50%;
							background: var(--theme-color);
							margin-left: 24rpx;

							image {
								width: 48rpx;
								height: 48rpx;
							}
						}
					}

					.contact-official {
						margin-top: 32rpx;
						width: 100%;
						height: auto;
					}
				}

				.box-content {
					flex: 1;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 48rpx;
					padding: 32rpx;
					background: #ffffff;
				}
			}
		}
	}
</style>