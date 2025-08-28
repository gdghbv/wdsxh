<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 商城 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container flex-direction-column" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="商城"></title-bar>
		<!-- 顶部轮播图 -->
		<view class="container-carousel">
			<carousel :show-data="carouselList" height="280rpx" radius="20rpx"></carousel>
		</view>
		<!-- 内容区 -->
		<view class="container-main flex-item flex" v-if="loadEnd">
			<!-- 侧边栏分类 -->
			<scroll-view class="main-sidebar" scroll-y>
				<view class="sidebar-item" :class="{active: selectParentCategory == 0}">
					<view class="item-parent select text-ellipsis-more" @click="changeParentCategory(0)">全部商品</view>
				</view>
				<view class="sidebar-item" :class="{active: selectParentCategory == item.id}" v-for="item in categoryList" :key="item.id">
					<view class="item-parent text-ellipsis-more" :class="{select: selectParentCategory == item.id && selectChildCategory == 0}" @click="changeParentCategory(item.id)">
						{{ item.name }}
					</view>
					<view class="item-child" v-if="selectParentCategory == item.id && item.child && item.child.length">
						<view class="child-box text-ellipsis-more" :class="{select: selectChildCategory == child.id}" v-for="child in item.child" :key="child.id" @click="changeChildCategory(child.id)">
							{{ child.name }}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 商品列表 -->
			<scroll-view class="main-list flex-item" scroll-y :scroll-top="scrollTop" refresher-enabled :refresher-triggered="triggered" @scrolltolower="onScrollBottom" @refresherrefresh="onScrollRefresh" @scroll="onScroll">
				<view class="list-box" v-if="goodsList.length">
					<view class="box-item flex" v-for="item in goodsList" :key="item.id" @click="toDetails(item.id)">
						<image class="item-image" :src="item.image" mode="aspectFill"></image>
						<view class="item-info flex-item flex-direction-column justify-content-between">
							<view class="info-title text-ellipsis-more">{{ item.name }}</view>
							<view class="info-price">￥{{ item.price }}</view>
						</view>
					</view>
				</view>
				<empty top="64rpx" title="暂无相关商品~" v-else></empty>
			</scroll-view>
		</view>
		<!-- 购物车 -->
		<view class="container-cart" @click="toShoppingCart()">
			<image class="cart-icon" src="/static/mall/cart_icon.png" mode="aspectFit"></image>
			<view class="cart-number" v-if="Number(cartNumber) > 0">{{cartNumber}}</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import carousel from "@/pages/component/mall/carousel.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	export default {
		components: {
			carousel,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 轮播图列表
				carouselList: [],
				// 商品分类列表
				categoryList: [],
				// 已选一级分类
				selectParentCategory: 0,
				// 已选二级分类
				selectChildCategory: 0,
				// 商品列表
				goodsList: [],
				// 下拉刷新状态
				triggered: false,
				// 滚动条距顶部位置
				scrollTop: 0,
				// 滚动条距顶部位置-以前
				oldScrollTop: 0,
				// 分类查询参数
				page: 1,
				hasMore: false,
				limit: 10,
				// 购物车数量
				cartNumber: 0,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
			}),
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getCarousel()
			this.getCategoay()
			this.getGoodsList(() => {
				uni.hideLoading()
				this.loadEnd = true
			});
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onShow() {
			if (uni.getStorageSync("token")) this.getCartNumber()
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
			// 获取轮播图
			getCarousel() {
				this.$util.request("mall.carousel").then(res => {
					if (res.code == 1) {
						this.carouselList = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取轮播图', error)
				})
			},
			// 获取商品分类
			getCategoay() {
				this.$util.request("mall.categoay").then(res => {
					if (res.code == 1) {
						this.categoryList = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商品分类', error)
				})
			},
			// 获取商品列表
			getGoodsList(fn) {
				var data = {
					page: this.page,
					limit: this.limit,
				}
				if (this.selectParentCategory != 0) {
					if (this.selectChildCategory == 0) {
						data.category_id = this.selectParentCategory
					} else {
						data.category_id = this.selectChildCategory
					}
				}
				this.$util.request("mall.goodsList", data).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.goodsList = this.page == 1 ? list : [...this.goodsList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商品列表', error)
				})
			},
			// 更换一级商品分类
			changeParentCategory(id) {
				this.selectParentCategory = id
				this.selectChildCategory = 0
				this.scrollTop = this.oldScrollTop
				this.getGoodsList(() => {
					this.scrollTop = this.oldScrollTop = 0
				})
			},
			// 更换二级商品分类
			changeChildCategory(id) {
				this.selectChildCategory = id
				this.scrollTop = this.oldScrollTop
				this.getGoodsList(() => {
					this.scrollTop = this.oldScrollTop = 0
				})
			},
			// 商品列表懒加载
			onScrollBottom() {
				if (this.hasMore) {
					this.page++
					this.getGoodsList();
				}
			},
			// 商品列表下拉刷新
			onScrollRefresh() {
				this.page = 1
				this.triggered = true
				this.getGoodsList(() => {
					this.triggered = false
					uni.stopPullDownRefresh();
				});
			},
			// 商品列表页面滚动
			onScroll(e) {
				this.oldScrollTop = e.detail.scrollTop
			},
			// 跳转商品详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/goods/details?id=" + id
				})
			},
			// 获取购物车数量
			getCartNumber() {
				this.$util.request("mall.cartNumber").then(res => {
					if (res.code == 1) {
						this.cartNumber = res.data.number || 0
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取购物车数量', error)
				})
			},
			// 跳转购物车
			toShoppingCart() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/cart/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 0;
		background: #FFF;
	}

	.container {
		height: 100vh;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.container-carousel {
			padding: 32rpx;
		}

		.container-main {
			overflow: hidden;

			.main-sidebar {
				width: 200rpx;
				background: #F6F7FB;

				.sidebar-item {
					.item-parent {
						padding: 32rpx 20rpx 32rpx 16rpx;
						border-left: 4rpx solid transparent;
						color: #5A5B6E;
						text-align: center;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.item-child .child-box {
						color: #5A5B6E;
						text-align: center;
						font-size: 24rpx;
						line-height: 34rpx;
						padding: 24rpx 20rpx 24rpx 16rpx;
						border-left: 4rpx solid transparent;
					}

					&.active {
						background: #FFF;

						.item-parent.select {
							border-color: var(--theme-color);
							font-weight: 600;
						}

						.item-child .child-box.select {
							border-color: var(--theme-color);
							font-weight: 600;
						}
					}
				}
			}

			.main-list {
				.list-box {
					padding: 16rpx 32rpx 32rpx;

					.box-item {
						margin-top: 32rpx;

						&:first-child {
							margin-top: 0;
						}

						.item-image {
							width: 160rpx;
							height: 160rpx;
							border-radius: 16rpx;
						}

						.item-info {
							margin-left: 24rpx;

							.info-title {
								color: #5A5B6E;
								font-size: 28rpx;
								font-weight: 600;
								line-height: 40rpx;
							}

							.info-price {
								margin-top: 16rpx;
								color: var(--theme-color);
								font-size: 28rpx;
								font-weight: 600;
								line-height: 40rpx;
							}
						}
					}
				}
			}
		}

		.container-cart {
			position: fixed;
			right: 32rpx;
			bottom: 16%;
			z-index: 99;
			background: var(--theme-color);
			border-radius: 50%;
			width: 96rpx;
			height: 96rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.cart-icon {
				width: 40rpx;
				height: 36rpx;
			}

			.cart-number {
				position: absolute;
				top: 0;
				left: 100%;
				transform: translateX(-50%);
				margin-left: -16rpx;
				color: var(--theme-color);
				text-align: center;
				font-size: 24rpx;
				line-height: 1;
				min-width: 32rpx;
				height: 32rpx;
				border-radius: 16rpx;
				border: 1px solid var(--theme-color);
				padding: 0 6rpx;
				background: #FFF;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>