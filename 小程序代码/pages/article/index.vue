<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 平台动态-列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :title="getPageTitle()"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 顶部导航 -->
			<scroll-view scroll-x class="main-screen" :style="{top: titleBarHeight + 'px'}" v-if="showScreen && screenList.length">
				<view class="screen-item" @click="changeScreen(0)">
					<view class="text" :class="{active: selectScreen == 0}">全部</view>
				</view>
				<view class="screen-item" v-for="item in screenList" :key="item.id" @click="changeScreen(item.id)">
					<view class="text" :class="{active: selectScreen == item.id}">{{item.name}}</view>
				</view>
			</scroll-view>
			<!-- 新闻列表 -->
			<view class="main-list">
				<article-item :show-data="articleList" :show-title="getPageTitle()" v-if="articleList.length"></article-item>
				<empty top="30%" title="暂无相关内容~" v-else></empty>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import articleItem from "@/pages/component/article/index.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			articleItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 是否显示分类筛选
				showScreen: true,
				// 分类列表
				screenList: [],
				// 已选分类
				selectScreen: 0,
				// 页面标题
				pageTitle: "",
				// 新闻列表
				articleList: [],
				// 分类查询参数
				page: 1,
				limit: 10,
				hasMore: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			if (option.id) {
				this.selectScreen = option.id
				this.showScreen = false
			} else {
				this.showScreen = true
			}
			this.getArticleCategory()
			if (option.title) this.pageTitle = option.title
			this.getArticleList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onPullDownRefresh() {
			this.page = 1
			this.getArticleList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getArticleList()
			}
		},
		onShareAppMessage() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImage,
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
			// 获取页面标题
			getPageTitle() {
				if (this.pageTitle) {
					return this.pageTitle || "平台动态"
				} else {
					var pageTitle = "平台动态"
					if (this.selectScreen) {
						const index = this.screenList.findIndex(item => item.id == this.selectScreen)
						if (index > -1) pageTitle = this.screenList[index].name
					}
					return pageTitle
				}
			},
			// 获取文章分类
			getArticleCategory() {
				this.$util.request("main.article.category").then(res => {
					if (res.code == 1) {
						this.screenList = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取文章列表 ', error)
				})
			},
			// 获取文章列表
			getArticleList(fn) {
				let data = {
					page: this.page,
					limit: this.limit,
				}
				if (this.selectScreen) data.cat_id = this.selectScreen
				this.$util.request("main.article.list", data).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.articleList = this.page == 1 ? list : [...this.articleList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取文章列表 ', error)
				})
			},
			// 更改分类
			changeScreen(id) {
				this.selectScreen = id
				this.page = 1
				this.getArticleList()
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-screen {
				white-space: nowrap;
				background: #ffffff;
				position: sticky;
				top: 0;
				z-index: 99;

				.screen-item {
					padding: 0 24rpx;
					display: inline-flex;
					justify-content: center;
					min-width: 25%;

					.text {
						padding: 36rpx 0;
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

			.main-list {
				padding: 32rpx;
			}
		}
	}
</style>