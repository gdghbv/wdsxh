<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 首页 开发者: 麦沃德科技-半夏  
+---------------------------------------------------------------------- -->

<template>
	<view v-if="loadEnd">
		<view class="container" :style="{backgroundColor: diyData.page.style.backgroundColor}" v-if="diyData && diyData.page && diyData.page.style">
			<title-bar class="container-header" :frontColor="diyData.page.style.titleTextColor" :backgroundColor="diyData.page.style.titleBackgroundColor" :title="diyData.page.params.title || ''"></title-bar>
			<image class="container-background" :src="getImagePath(diyData.page.style.backgroundImage)" mode="aspectFill" v-if="diyData.page.style.backgroundImage"></image>
			<view class="container-main">
				<diy-mode ref="diyMode" :show-data="diyData" :spaceHeight="spaceHeight" @setShareData="setShareData"></diy-mode>
			</view>
			<view class="container-footer safe-padding">
				<tab-bar></tab-bar>
			</view>
		</view>
		<view class="container" v-else>
			<view class="container-header">
				<title-bar></title-bar>
			</view>
			<view class="container-error">未配置首页样式，请于后台进行首页装修</view>
			<view class="container-footer safe-padding">
				<tab-bar></tab-bar>
			</view>
		</view>
	</view>
</template>

<script>
	import diyMode from '@/pages/component/diy/index.vue';
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		components: {
			diyMode,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 页面ID
				pageId: null,
				// 自定义数据
				diyData: null,
				// 分享数据
				shareData: {},
				// 头部与底部高度（仅会员地图占满屏幕时使用）
				spaceHeight: 0,
			}
		},
		computed: {
			...mapState({
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
			})
		},
		onLoad(option) {
			this.pageId = option.page_id;
			// #ifdef H5
			this.initConfig()
			// #endif
			uni.showLoading({
				title: "加载中"
			})
			this.getDiyData(() => {
				uni.hideLoading()
				this.loadEnd = true
			});
		},
		onShow() {
			if (this.loadEnd) this.getDiyData()
		},
		onPullDownRefresh() {
			this.getDiyData(() => {
				uni.stopPullDownRefresh();
			});
		},
		onShareAppMessage(res) {
			if (res.from == "button") {
				return {
					title: this.shareData.title,
					path: this.shareData.path,
					imageUrl: this.shareData.imageUrl || this.shareImage,
				}
			} else {
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
			// 获取自定义数据
			getDiyData(fn) {
				this.$util.request("main.diyData", {
					page_id: this.pageId
				}).then(res => {
					if (res.code == 1) {
						this.diyData = res.data
						if (res.data && res.data.page) {
							let page = res.data.page
							// #ifdef MP-WEIXIN
							// 设置navbar标题、颜色
							uni.setNavigationBarColor({
								frontColor: page.style.titleTextColor === 'white' ? '#ffffff' : '#000000',
								backgroundColor: page.style.titleBackgroundColor
							})
							// #endif
							uni.setNavigationBarTitle({
								title: page.params.title || ""
							})
						}
						if (this.loadEnd) {
							this.$refs.diyMode.updateData()
						}
						if (fn) fn()
						if (res.data?.items?.length) {
							const hasMemberMap = res.data.items.some(item => item.type == "memberMapDiy");
							if (hasMemberMap) {
								setTimeout(() => {
									try {
										const query = uni.createSelectorQuery().in(this);
										let headerHeight, footerHeight;
										query.select('.container-header').boundingClientRect(data => {
											headerHeight = data?.height || 0;
										}).select('.container-footer').boundingClientRect(data => {
											footerHeight = data?.height || 0;
										}).exec(() => {
											this.spaceHeight = Number(Number(headerHeight) + Number(footerHeight))
										});
									} catch (error) {
										this.spaceHeight = 0
									}
								}, 200);
							}
						}
					} else {
						if (fn) fn()
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
			// 获取图片地址
			getImagePath(url) {
				if (url.indexOf('http') > -1) {
					return url
				} else {
					return this.diyData.domain + url
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
	page {
		padding: 0;
	}

	.container {
		position: relative;
		z-index: 9;
		min-height: 100vh;

		.container-background {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
		}

		.container-error {
			padding: 64rpx 32rpx;
			font-size: 32rpx;
			line-height: 48rpx;
			color: #5A5B6E;
			text-align: center;
		}
	}
</style>