<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 会员风采 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="会员风采"></title-bar>
		<!-- 顶部搜索筛选栏 -->
		<block v-if="loadEnd">
			<view class="container-search" :style="{top: titleBarHeight + 'px'}">
				<view class="search-input flex align-items-center" @click="toSearch()">
					<image class="icon" src="/static/search.png" mode="aspectFit"></image>
					<text class="text flex-item">请输入姓名搜索</text>
				</view>
			</view>
			<view class="container-classify">
				<menu-carousel :show-data="industryList" height="370rpx" icon-size="80rpx" font-size="24rpx" line-height="34rpx" margin-top="48rpx" @toPage="toIndustry"></menu-carousel>
			</view>
			<view class="container-screen flex" :style="{top: `calc(${titleBarHeight}px + 112rpx)`}">
				<view class="screen-item flex-item" :class="{active: isNearby}" @click="changeScreen(1)">
					<text class="text">附近会员</text>
				</view>
				<view class="screen-item flex-item" :class="{active: selectRegion.city}" @click="changeScreen(2)">
					<text class="text">会员籍贯</text>
					<view class="icon" :style="{'background-image': 'url('+ iconDownActive +')'}" v-if="iconDownActive && selectRegion.city"></view>
					<view class="icon" :style="{'background-image': 'url('+ iconDown +')'}" v-else-if="iconDown"></view>
				</view>
				<view class="screen-item flex-item" :class="{active: selectLevel.length}" @click="changeScreen(3)">
					<text class="text">会员级别</text>
					<view class="icon" :style="{'background-image': 'url('+ iconDownActive +')'}" v-if="iconDownActive && selectLevel.length"></view>
					<view class="icon" :style="{'background-image': 'url('+ iconDown +')'}" v-else-if="iconDown"></view>
				</view>
			</view>
		</block>
		<!-- 会员列表 -->
		<view class="container-main" v-if="loadEnd">
			<member-item :show-data="memberList" v-if="memberList.length"></member-item>
			<empty top="64rpx" title="暂无相关会员~" v-else></empty>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
		<!-- 地区选择框 -->
		<region-modal ref="regionModal" @onChange="pageChange" @callback="changeRegion"></region-modal>
		<!-- 级别选择框 -->
		<level-modal ref="levelModal" @onChange="pageChange" @callback="changeLevel"></level-modal>
	</view>
</template>

<script>
	import menuCarousel from "@/pages/component/menu/carousel.vue"
	import memberItem from "@/pages/component/member/index.vue"
	import regionModal from "@/pages/component/modal/region.vue"
	import levelModal from "@/pages/component/modal/level.vue"
	import svgData from "@/common/svg.js"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			menuCarousel,
			memberItem,
			regionModal,
			levelModal,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 页面是否阻止滚动
				pageShow: false,
				// 行业分类
				industryList: [],
				// 是否筛选附近会员
				isNearby: false,
				// 已选会员籍贯
				selectRegion: {},
				// 已选会员级别
				selectLevel: [],
				// 向下图标-未选中
				iconDown: "",
				// 分类查询参数
				page: 1,
				limit: 10,
				hasMore: false,
				// 会员列表
				memberList: [],
				// 是否授权位置信息
				isLocation: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
				iconDownActive: state => {
					return svgData.svgToUrl("down", state.app.themeColor)
				}
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
			this.getSvgIcon()
			uni.showLoading({
				title: "加载中"
			})
			// #ifdef H5
			this.initConfig()
			// #endif
			this.getIndustry(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			this.getAuthSetting(() => {
				this.getMemberList()
			})
		},
		onPullDownRefresh() {
			this.getIndustry()
			this.page = 1
			this.getMemberList(() => {
				uni.stopPullDownRefresh()
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
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
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
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "getLocation"],
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
			// 获取向下图标
			getSvgIcon() {
				this.iconDown = svgData.svgToUrl("down", "#999999")
			},
			// 获取行业分类
			getIndustry(fn) {
				this.$util.request("member.industry").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.industryList = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取行业分类 ', error)
				})
			},
			// 改变分类
			changeScreen(id) {
				if (id == 1) {
					this.getAuthSetting(() => {
						if (this.isLocation) {
							this.isNearby = !this.isNearby
							this.page = 1
							this.getMemberList()
						}
					})
				} else if (id == 2) {
					this.$refs.regionModal.open(this.selectRegion)
				} else if (id == 3) {
					this.$refs.levelModal.open(this.selectLevel)
				}
			},
			// 选择会员籍贯
			changeRegion(data) {
				this.selectRegion = data
				this.page = 1
				this.getMemberList()
			},
			// 选择会员级别
			changeLevel(value) {
				this.selectLevel = value
				this.page = 1
				this.getMemberList()
			},
			// 跳转搜索
			toSearch() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/search/index"
				})
			},
			// 跳转行业分类
			toIndustry(item) {
				this.$util.toPage({
					mode: 1,
					path: `/pages/member/industry?id=${item.id}&name=${item.name}`,
				})
			},
			// 获取位置权限
			getAuthSetting(fn) {
				// #ifdef MP-WEIXIN
				uni.getSetting({
					success: (setting) => {
						if (setting.authSetting && setting.authSetting.hasOwnProperty("scope.userLocation")) {
							if (setting.authSetting["scope.userLocation"]) {
								this.isLocation = true
								if (fn) fn()
							} else {
								uni.hideLoading()
								uni.showModal({
									title: '提示',
									content: '请重新授权获取您的地理位置，否则部分功能将无法使用',
									confirmColor: "#E50002",
									confirmText: "授权",
									success: (res) => {
										if (res.confirm) {
											uni.openSetting({
												success: () => {
													this.isLocation = true
													if (fn) fn()
												},
												fail: (err) => {
													console.error(err)
												}
											})
										} else {
											this.isLocation = false
											if (fn) fn()
										}
									},
									fail: () => {
										this.isLocation = false
										if (fn) fn()
									}
								})
							}
						} else {
							this.isLocation = true
							if (fn) fn()
						}
					},
					fail: () => {
						this.isLocation = false
						if (fn) fn()
					}
				})
				// #endif
				// #ifdef H5
				this.isLocation = true
				if (fn) fn()
				// #endif
			},
			// 获取会员列表
			getMemberList(fn) {
				this.getLocation((location) => {
					let data = {
						page: this.page,
						limit: this.limit,
					}
					if (location && location.latitude && location.longitude) {
						data.latitude = location.latitude
						data.longitude = location.longitude
						if (this.isNearby) data.nearby = 1
					} else this.isNearby = false
					if (this.selectRegion.city) data.native_place = this.selectRegion.city
					if (this.selectRegion.area) data.native_place += "/" + this.selectRegion.area
					if (this.selectLevel.length) data.member_level_id = this.selectLevel.map(item => item.id).join()
					this.$util.request("member.list", data).then(res => {
						console.log("这是memberlist：",res)
						if (fn) fn()
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
						console.error('获取会员列表 ', error)
					})
				})
			},
			// 获取当前地址
			getLocation(fn) {
				// #ifdef MP-WEIXIN
				if (!this.isLocation) {
					fn()
					return
				}
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						fn({
							latitude: res.latitude,
							longitude: res.longitude,
						})
					},
					fail: () => {
						this.isLocation = false
						fn()
					}
				});
				// #endif
				// #ifdef H5
				wx.ready(() => {
					wx.getLocation({
						type: 'wgs84',
						success: (res) => {
							fn({
								latitude: res.latitude,
								longitude: res.longitude,
							})
						},
						fail: (err) => {
							this.isLocation = false
							fn()
						},
						cancel: () => {
							this.isLocation = false
							fn()
						}
					});
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-search {
			position: sticky;
			top: 0;
			z-index: 99;
			background: #ffffff;
			padding: 0 32rpx;
			height: 112rpx;
			display: flex;
			align-items: center;

			.search-input {
				width: 100%;
				padding: 20rpx 32rpx;
				background: #F9F9F9;
				border-radius: 16rpx;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}

				.text {
					margin-left: 16rpx;
					color: #8D929C;
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}
		}

		.container-classify {
			background: #ffffff;
			padding: 48rpx 0 28rpx;
		}

		.container-screen {
			position: sticky;
			top: 0;
			z-index: 98;
			background: #ffffff;

			.screen-item {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 24rpx;

				.text {
					color: #666666;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.icon {
					width: 20rpx;
					height: 16rpx;
					background-size: 20rpx 16rpx;
					margin-left: 12rpx;
				}

				&.active .text {
					color: var(--theme-color);
				}
			}
		}

		.container-main {
			padding: 32rpx;
		}
	}
</style>