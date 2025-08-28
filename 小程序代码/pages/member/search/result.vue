<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 搜索结果 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="搜索结果"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<member-item :show-data="dataList" v-if="dataList.length"></member-item>
			<empty top="30%" title="暂无相关内容~" v-else></empty>
		</view>
	</view>
</template>

<script>
	import memberItem from "@/pages/component/member/index.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	export default {
		components: {
			memberItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 搜索关键词
				keyword: "",
				// 查询参数
				page: 1,
				limit: 20,
				hasMore: false,
				// 数据列表
				dataList: [],
				// 是否授权位置信息
				isLocation: false,
			}
		},
		onLoad(option) {
			this.keyword = option.keyword
			uni.showLoading({
				title: "加载中"
			})
			// #ifdef H5
			this.initConfig()
			// #endif
			this.getAuthSetting(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getList()
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
							jsApiList: ["getLocation"],
						})
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
			// 获取位置权限
			getAuthSetting(fn) {
				// #ifdef MP-WEIXIN
				uni.getSetting({
					success: (setting) => {
						if (setting.authSetting && setting.authSetting.hasOwnProperty("scope.userLocation")) {
							if (setting.authSetting["scope.userLocation"]) {
								this.isLocation = true
								this.getList(fn)
							} else {
								this.isLocation = false
								this.getList(fn)
							}
						} else {
							this.isLocation = false
							this.getList(fn)
						}
					},
					fail: () => {
						this.isLocation = false
						this.getList(fn)
					}
				})
				// #endif
				// #ifdef H5
				this.isLocation = true
				this.getList(fn)
				// #endif
			},
			// 获取数据列表
			getList(fn) {
				this.getLocation((location) => {
					let data = {
						page: this.page,
						limit: this.limit,
						keywords: this.keyword
					}
					if (location && location.latitude && location.longitude) {
						data.latitude = location.latitude
						data.longitude = location.longitude
					}
					this.$util.request("member.list", data).then(res => {
						if (fn) fn()
						if (res.code == 1) {
							let list = res.data.data
							this.hasMore = this.page < res.data.total / this.limit ? true : false
							this.dataList = this.page == 1 ? list : [...this.dataList, ...list];
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
						fail: () => {
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
		.container-main {
			padding: 32rpx;
		}
	}
</style>