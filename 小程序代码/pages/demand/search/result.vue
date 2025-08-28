<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 供需搜索结果 开发者: 麦沃德科技-暴雨
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="搜索结果"></title-bar>
		<!-- 供需列表 -->
		<view class="container-main" v-if="loadEnd">
			<demand-item :show-data="demandList" @setShareData="setShareData" v-if="demandList.length"></demand-item>
			<empty top="30%" title="暂无相关内容~" v-else></empty>
		</view>
		<!-- 未登录状态 -->
		<view class="container-login" v-else-if="showLogin">
			<image class="login-image" :src="loginImg" mode="aspectFit"></image>
			<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
			<view class="login-btn" :style="{ background: themeColor }" @click="toLogin()">前往登录</view>
			<view class="login-btn cancel" @click="toBack()">返回上一页</view>
		</view>
	</view>
</template>

<script>
	import demandItem from "@/pages/component/demand/index.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			demandItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 搜索关键词
				keywords: '',
				// 分页参数
				page: 1,
				limit: 10,
				hasMore: false,
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
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
				loginImg: state => state.app.loginImg,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.keywords = option.keyword
			this.getDemandList(() => {
				uni.hideLoading()
				this.loadEnd = true
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
					path: "/pages/demand/index"
				}
			}
		},
		onShareTimeline() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImage,
				path: "/pages/demand/index"
			}
		},
		methods: {
			// 获取供需列表
			getDemandList(fn) {
				this.$util.request("demand.businessIndexList", {
					title: this.keywords,
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
			padding: 32rpx;
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