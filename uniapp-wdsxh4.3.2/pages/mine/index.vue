<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 我的 开发者: 麦沃德科技-半夏  
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{background: diyData.headerStyle.backgroundColor}" v-if="loadEnd">
		<!-- 顶部区域 -->
		<view class="container-header">
			<!-- 标题栏 -->
			<view class="header-nav" :style="{height: titleBarHeight + 'px'}">
				<title-bar positionMode="fixed" :frontColor="titleColor" :backgroundColor="titleBackground" :title="diyData.pageTitle || appletName"></title-bar>
			</view>
			<!-- 背景图 -->
			<image class="header-image" :src="getImagePath(diyData.headerStyle.backgroundImage)" mode="aspectFill" v-if="diyData.headerStyle.backgroundImage"></image>
			<!-- 用户信息 -->
			<view class="header-user">
				<user-info :showStyle="diyData.headerStyle" @getPoster="$refs.memberPoster.getPoster()" @getUserInfo="getUserInfo()"></user-info>
			</view>
		</view>
		<!-- 页面内容 -->
		<view class="container-main">
			<block v-for="(item, index) in diyData.items" :key="index" v-if="item.show">
				<!-- 商城订单 -->
				<view class="main-column" v-if="item.type == 'mallOrderDiy'">
					<view class="column-title flex justify-content-between align-items-center">
						<view class="title">{{item.name}}</view>
						<view class="btn" @click="toOrder()">查看全部</view>
					</view>
					<view class="column-content">
						<order-menu :showStyle="item.style" :showData="item.data" :domain="diyData.domain"></order-menu>
					</view>
				</view>
				<!-- 我的名片-仅微信小程序可用 -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="main-column" v-else-if="item.type == 'cardDiy'">
					<view class="column-title flex justify-content-between align-items-center">
						<view class="title">{{item.name}}<text v-if="token">({{cardList.length}})</text></view>
						<view class="btn" @click="toCard()">查看全部</view>
					</view>
					<view class="column-content" style="padding: 0 32rpx;" v-if="token && cardList.length">
						<scroll-view scroll-x class="content-card">
							<view class="card-item" v-for="card in cardList" :key="card.id" @click="toCardDetails(card.id)">
								<image class="item-image" :src="card.image" mode="widthFix"></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<!-- #endif -->
				<!-- 导航组 -->
				<view class="main-column" v-else-if="item.type == 'navDiy'">
					<view class="column-title">
						<view class="title">{{item.name}}</view>
					</view>
					<view class="column-content">
						<menu-center :showStyle="item.style" :showData="item.data" :domain="diyData.domain"></menu-center>
					</view>
				</view>
				<!-- 管理员中心 -->
				<view class="main-column" v-else-if="item.type == 'adminDiy' && adminStatus">
					<view class="column-title">
						<view class="title">{{item.name}}</view>
					</view>
					<view class="column-content">
						<admin-center :showStyle="item.style" :showData="item.data" :domain="diyData.domain"></admin-center>
					</view>
				</view>
			</block>
			<!-- 备案号 -->
			<view class="main-statement" v-if="statement">备案号：{{statement}}</view>
			<!-- 技术支持 -->
			<view class="main-support flex justify-content-center" @click="toSupport" v-if="support && support.image">
				<!-- #ifdef MP-WEIXIN -->
				<button class="clear" open-type="contact" v-if="support.type == 1">
					<image class="image" :src="support.image" mode="widthFix"></image>
				</button>
				<image class="image" :src="support.image" mode="widthFix" v-else></image>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<image class="image" :src="support.image" mode="widthFix"></image>
				<!-- #endif -->
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
		<!-- 电子会牌 -->
		<member-poster ref="memberPoster" @onChange="pageChange"></member-poster>
	</view>
</template>

<script>
	import userInfo from "@/pages/component/mine/user-info.vue"
	import orderMenu from "@/pages/component/mine/order.vue"
	import menuCenter from "@/pages/component/mine/menu.vue"
	import adminCenter from "@/pages/component/mine/admin.vue"
	import memberPoster from "@/pages/component/member/poster.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			userInfo,
			orderMenu,
			menuCenter,
			adminCenter,
			memberPoster,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 自定义模式
				diyData: null,
				// 顶部导航栏背景色
				titleBackground: "rgba(255, 255, 255, 0)",
				// 顶部导航栏字体颜色
				titleColor: "#000",
				// 标题栏高度
				titleBarHeight: 0,
				// 名片列表
				cardList: [],
			}
		},
		computed: {
			...mapState({
				token: state => state.user.token,
				adminStatus: state => {
					let status = false
					if (state.user.userInfo.is_verifying == 1) {
						status = true
					}
					if (state.user.userInfo.set_admin == 1) {
						status = true
					}
					return status
				},
				userInfo: state => state.user.userInfo,
				statement: state => state.app.statement,
				support: state => state.app.support,
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height + statusBarHeight
			// #endif
		},
		onLoad() {
			// #ifdef H5
			this.initConfig()
			// #endif
			this.getDiyData(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onShow() {
			if (uni.getStorageSync("token")) {
				this.getUserInfo()
				this.getCardList()
			}
			if (this.loadEnd) {
				this.getDiyData()
			}
		},
		onPullDownRefresh() {
			if (uni.getStorageSync("token")) {
				this.getCardList()
				this.getUserInfo()
			}
			this.getDiyData(() => {
				uni.stopPullDownRefresh();
			})
		},
		onShareAppMessage() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImage,
				path: "/pages/index/index",
			}
		},
		onShareTimeline() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImage,
				path: "/pages/index/index",
			}
		},
		onPageScroll(e) {
			const scrollTop = e.scrollTop
			if (scrollTop > 100) {
				this.titleBackground = "#fff"
				this.titleColor = "black"
			} else {
				let opacity = parseFloat(scrollTop / 100).toFixed(4)
				this.titleBackground = "rgba(255, 255, 255, " + opacity + ")"
				if (scrollTop > 30) {
					this.titleColor = "black"
					uni.setNavigationBarColor({
						frontColor: "#000000", //文字颜色
						backgroundColor: "#ffffff" //底部背景色
					})
				} else {
					this.titleColor = this.diyData.headerStyle.titleTextColor === 'white' ? '#ffffff' : '#000000'
					uni.setNavigationBarColor({
						frontColor: this.titleColor, //文字颜色
						backgroundColor: "transparent" //底部背景色
					})
				}
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取自定义数据
			getDiyData(fn) {
				this.$util.request("mine.diyData").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.diyData = res.data
						const page = this.getPageStyle(res.data)
						this.diyData.headerStyle = page
						this.titleColor = page.titleTextColor
						// #ifdef MP-WEIXIN
						// 设置navbar标题、颜色
						uni.setNavigationBarColor({
							frontColor: page.titleTextColor === 'white' ? '#ffffff' : '#000000',
							backgroundColor: "transparent",
						})
						// #endif
						uni.setNavigationBarTitle({
							title: res.data.pageTitle || this.appletName || "首页",
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取自定义数据 ', error)
				})
			},
			// 获取已选页面样式
			getPageStyle(data) {
				var index = data.pageStyle.findIndex(item => {
					if (item.layout == data.pageLayout) return true
				})
				if (index === -1) index = 0
				return data.pageStyle[index]
			},
			// 获取图片地址
			getImagePath(url) {
				if (url.indexOf('http') > -1) {
					return url
				} else {
					return this.diyData.domain + url
				}
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
								title: this.shareTitle,
								desc: "",
								link: window.location.href,
								imgUrl: this.shareImage,
							});
							wx.updateTimelineShareData({
								title: this.shareTitle,
								link: window.location.href,
								imgUrl: this.shareImage,
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
			// 获取用户信息
			getUserInfo(fn) {
				this.$util.request("mine.user").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						uni.setStorageSync("userInfo", res.data)
						this.$store.commit('user/setUserInfo', res.data)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取用户信息 ', error)
				})
			},
			// 获取名片列表
			getCardList(fn) {
				this.$util.request("card.list").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.cardList = res.data
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
						console.error('获取名片列表 ', error)
					}
				})
			},
			// 跳转全部订单
			toOrder() {
				this.$util.toPage({
					mode: 1,
					path: '/pagesMall/order/index',
				})
			},
			// 跳转我的名片
			toCard() {
				this.$util.toPage({
					mode: 1,
					path: '/pagesCard/mine/index',
				})
			},
			// 跳转我的名片详情
			toCardDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: '/pagesCard/mine/details?id=' + id,
				})
			},
			// 跳转技术支持
			toSupport() {
				if (this.support.type == 2) {
					// 拨打电话
					this.$util.toPage({
						mode: 6,
						phone: this.support.mobile,
					})
				} else if (this.support.type == 3) {
					// 外部链接
					this.$util.toPage({
						mode: 4,
						path: this.support.link,
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 0;
	}

	.container {
		position: relative;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		min-height: 100vh;

		.container-header {
			position: relative;
			z-index: 998;

			.header-image {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: -1;
			}

			.header-user {
				padding: 0 32rpx;
			}
		}

		.container-main {
			position: relative;
			z-index: 1;
			padding: 0 32rpx 32rpx;

			.main-column {
				padding: 32rpx 0;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.column-title {
					padding: 0 32rpx;

					.title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.btn {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}

				.column-content {
					margin-top: 24rpx;

					.content-card {
						white-space: nowrap;

						.card-item {
							display: inline-block;
							margin-left: 16rpx;
							width: 296rpx;
							height: 176rpx;
							border-radius: 8rpx;
							overflow: hidden;

							&:first-child {
								margin-left: 0;
							}

							.item-image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}

			.main-statement {
				font-size: 24rpx;
				line-height: 34rpx;
				color: #8D929C;
				margin-top: 32rpx;
				text-align: center;
			}

			.main-support {
				margin-top: 32rpx;

				.image {
					width: 400rpx;
					height: auto;
					border-radius: 16rpx;
				}
			}
		}
	}
</style>