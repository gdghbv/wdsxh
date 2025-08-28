<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 供需 开发者: 麦沃德科技-暴雨 
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="供需"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header" :style="{top: titleBarHeight + 'px'}">
				<view class="header-search flex align-items-center">
					<view class="search-input flex-item flex align-items-center" @click="toSearch()">
						<image class="icon" src="/static/search.png" mode="aspectFit"></image>
						<view class="text">请输入关键词搜索</view>
					</view>
					<view class="search-btn flex align-items-center" @click="toPublish()">
						<view class="icon" :style="{'background-image': 'url('+ iconRelease +')'}" v-if="iconRelease"></view>
						<view class="text">发布</view>
					</view>
				</view>
				<scroll-view scroll-x class="header-screen">
					<view class="screen-item" :class="{active: selectScreen == 0}" @click="screenChange(0)">
						<text class="item-text">全部</text>
					</view>
					<view class="screen-item" :class="{active: selectScreen == item.id}" v-for="item in demandScreen" :key="item.id" @click="screenChange(item.id)">
						<text class="item-text">{{ item.name }}</text>
					</view>
				</scroll-view>
			</view>
			<view class="main-content">
				<demand-item :show-data="demandList" @setShareData="setShareData" v-if="demandList.length"></demand-item>
				<empty top="30%" title="暂无相关内容~" v-else></empty>
			</view>
		</view>
		<!-- 未登录状态 -->
		<view class="container-login" v-if="!loadEnd && showLogin">
			<image class="login-image" :src="loginImg" mode="aspectFit"></image>
			<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
			<view class="login-btn" :style="{ background: themeColor }" @click="toLogin()">前往登录</view>
			<view class="login-btn cancel" @click="toBack()">返回上一页</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import demandItem from "@/pages/component/demand/index.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	import svgData from "@/common/svg.js"
	export default {
		components: {
			demandItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 当前页
				page: 1,
				// 限制条数
				limit: 10,
				// 是否存在下一页
				hasMore: false,
				// 供需筛选
				demandScreen: [],
				// 已选筛选
				selectScreen: 0,
				// 供需列表
				demandList: [],
				// 分享数据
				shareData: {},
				// 是否显示登录提示
				showLogin: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconRelease: state => {
					return svgData.svgToUrl("release", state.app.themeColor)
				},
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
				loginImg: state => state.app.loginImg,
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
			this.getDemandScreen()
			this.getDemandList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onShow() {
			if (this.loadEnd) {
				this.page = 1
				this.getDemandList()
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getDemandList(() => {
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getDemandList();
			}
		},
		onShareAppMessage(res) {
			if (res.from == "button") {
				return {
					title: this.shareData.title,
					path: this.shareData.path,
					imageUrl: this.shareData.imageUrl || this.shareImage,
				}
			} else if (res.from == "menu") {
				return {
					title: this.shareTitle,
					imageUrl: this.shareImage,
				}
			}
		},
		onShareTimeline() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImage,
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
			// 获取商圈分类
			getDemandScreen() {
				this.$util.request("demand.businessCat").then(res => {
					if (res.code == 1) {
						this.demandScreen = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商圈分类', error)
				})
			},
			// 获取供需列表 
			getDemandList(fn) {
				this.$util.request("demand.businessIndexList", {
					category_id: this.selectScreen,
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data || []
						list.forEach((el) => {
							el.images = this.splitImages(el.images)
							if (el.createtime) el.time = this.$util.getDateBeforeNow(el.createtime)
						});
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.demandList = this.page == 1 ? list : [...this.demandList, ...list];
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
						console.error('获取供需列表', error)
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
			// 发布供需
			toPublish() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesDemand/demand/edit"
				})
			},
			// 顶部导航筛选
			screenChange(id) {
				if (this.selectScreen == id) {
					return
				}
				this.selectScreen = id
				this.page = 1
				this.getDemandList()
			},
			// 去搜索
			toSearch() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/demand/search/index"
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
			// 设置分享数据
			setShareData(data) {
				this.shareData = data
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-header {
				position: sticky;
				top: 0;
				z-index: 99;
				background: #fff;

				.header-search {
					padding: 16rpx 32rpx;

					.search-input {
						padding: 20rpx 32rpx;
						border-radius: 10rpx;
						background: #F9F9F9;

						.icon {
							width: 40rpx;
							height: 40rpx;
						}

						.text {
							margin-left: 16rpx;
							font-size: 32rpx;
							color: #BBB;
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}

					.search-btn {
						margin-left: 32rpx;

						.icon {
							width: 40rpx;
							height: 40rpx;
							background-size: 40rpx;
						}

						.text {
							margin-left: 8rpx;
							color: var(--theme-color);
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}
				}

				.header-screen {
					white-space: nowrap;

					.screen-item {
						display: inline-block;
						padding: 0 24rpx;
						min-width: 152rpx;
						text-align: center;

						.item-text {
							color: #333333;
							font-size: 28rpx;
							line-height: 40rpx;
							display: inline-block;
							padding: 36rpx 0 32rpx;
							border-bottom: 4rpx solid transparent;
						}

						&.active .item-text {
							color: var(--theme-color);
							font-weight: 600;
							border-color: var(--theme-color);
						}
					}
				}
			}

			.main-content {
				padding: 32rpx;
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
</style>