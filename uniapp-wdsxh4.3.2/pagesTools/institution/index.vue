<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 机构列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="机构列表"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-list flex flex-wrap justify-content-between" v-if="institutionList.length">
				<view class="list-item flex-direction-column align-items-center" v-for="item in institutionList" :key="item.id" @click="toDetails(item.id)">
					<image class="item-icon" :src="item.icon" mode="aspectFill"></image>
					<view class="item-text">{{ item.name }}</view>
				</view>
			</view>
			<empty top="30%" title="暂无相关内容~" v-else></empty>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 机构列表
				institutionList: [],
				// 分类查询参数
				page: 1,
				limit: 20,
				hasMore: false,
			};
		},
		computed: {
			...mapState({
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
			})
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getInstitutionList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onPullDownRefresh() {
			this.page = 1
			this.getInstitutionList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getInstitutionList();
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
			// 获取机构列表
			getInstitutionList(fn) {
				this.$util.request("institution.list", {
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.institutionList = this.page == 1 ? list : [...this.institutionList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取机构列表', error)
				})
			},
			// 跳转机构详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesTools/institution/details?id=" + id
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-list {
				row-gap: 32rpx;

				.list-item {
					width: calc(50% - 16rpx);
					padding: 48rpx 32rpx;
					border-radius: 16rpx;
					background: #FFF;

					.item-icon {
						width: 144rpx;
						height: 144rpx;
						border-radius: 10rpx;
					}

					.item-text {
						margin-top: 16rpx;
						color: #5A5B6E;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 40rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>