<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 会员搜索 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="会员搜索"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 顶部搜索筛选区 -->
			<view class="main-header flex align-items-center" :style="{top: titleBarHeight + 'px'}">
				<view class="header-search flex-item flex align-items-center">
					<image class="icon" src="/static/search.png" mode="aspectFit"></image>
					<input class="input flex-item" type="text" confirm-type="search" @confirm="confirmSearch" placeholder="请输入姓名搜索" placeholder-class="placeholder" />
				</view>
				<view class="header-btn" @click="toBack()">取消</view>
			</view>
			<!-- 历史搜索 -->
			<view class="main-history" v-if="recordList && recordList.length">
				<view class="history-title flex justify-content-between align-items-center">
					<view class="name">历史搜索</view>
					<view class="clear flex align-items-center" @click="clearRecords">
						<image src="/static/clear.png" mode="aspectFit"></image>
						<text>清除记录</text>
					</view>
				</view>
				<view class="history-cont flex flex-wrap">
					<view class="item" v-for="(item,index) in recordList" :key="index" @click="doSearch(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 搜索记录
				recordList: [],
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onReady() {
			this.loadEnd = true
		},
		onShow() {
			this.recordList = uni.getStorageSync('memberHistory')
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		methods: {
			// 返回
			toBack() {
				if (getCurrentPages().length == 1) {
					this.$util.toPage({
						mode: 3,
						path: "/pages/member/index"
					})
				} else {
					uni.navigateBack()
				}
			},
			// 删除历史记录
			clearRecords() {
				uni.showModal({
					title: "提示",
					content: "是否删除全部历史记录？",
					confirmText: "删除",
					confirmColor: this.themeColor,
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('memberHistory')
							this.recordList = []
						}
					}
				})
			},
			// 提交搜索
			confirmSearch(e) {
				this.doSearch(e.detail.value)
			},
			// 搜索
			doSearch(keyword) {
				if (!keyword) {
					uni.showToast({
						title: '请输入要搜索的内容',
						icon: 'none'
					})
					return
				}
				var memberHistory = uni.getStorageSync('memberHistory') || []
				if (!memberHistory.includes(keyword)) {
					memberHistory.push(keyword)
					uni.setStorageSync('memberHistory', memberHistory)
				}
				this.$util.toPage({
					mode: 1,
					path: '/pages/member/search/result?keyword=' + keyword
				})
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
				padding: 20rpx 32rpx;
				background: #fff;

				.header-search {
					padding: 20rpx 32rpx;
					border-radius: 8rpx;
					background: #F6F7FB;

					.icon {
						width: 40rpx;
						height: 40rpx;
					}

					.input {
						margin-left: 16rpx;
						color: #333;
						font-size: 26rpx;
						line-height: 36rpx;
					}

					.placeholder {
						color: #A0A2B3;
						font-size: 26rpx;
						line-height: 36rpx;
					}
				}

				.header-btn {
					color: var(--theme-color);
					font-size: 28rpx;
					line-height: 40rpx;
					margin-left: 32rpx;
				}
			}

			.main-history {
				background: #fff;
				padding: 32rpx;

				.history-title {
					.name {
						color: #333;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.clear {
						image {
							width: 36rpx;
							height: 36rpx;
						}

						text {
							margin-left: 8rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #999999;
						}
					}
				}

				.history-cont {
					margin-top: 16rpx;
					margin-left: -16rpx;

					.item {
						margin-top: 16rpx;
						margin-left: 16rpx;
						font-size: 28rpx;
						line-height: 40rpx;
						color: #999999;
						padding: 8rpx 16rpx;
						background: rgba(6, 50, 119, 0.05);
						border-radius: 10rpx;
					}
				}
			}
		}
	}
</style>