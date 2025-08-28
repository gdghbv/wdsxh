<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 常见问题-列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="常见问题"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-list" v-if="problemList.length">
				<view class="list-item" v-for="(item, index) in problemList" :key="index" @click="toDetails(item.id)">
					{{item.title}}
				</view>
			</view>
			<empty top="30%" title="暂无相关内容~" v-else></empty>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 分类查询参数
				page: 1,
				limit: 10,
				hasMore: false,
				// 问题列表
				problemList: [],
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getProblemList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onPullDownRefresh() {
			this.page = 1
			this.getProblemList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getProblemList()
			}
		},
		methods: {
			// 获取帮助列表
			getProblemList(fn) {
				this.$util.request("mine.problemList", {
					page: this.page,
					limit: this.limit,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.problemList = this.page == 1 ? list : [...this.problemList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取帮助列表 ', error)
				})
			},
			// 跳转详情页面
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mine/problem/details?id=" + id
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
				padding: 0 32rpx;
				border-radius: 10rpx;
				background: #ffffff;

				.list-item {
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 32rpx 0;
					border-top: 1rpx solid rgba(0, 0, 0, 0.1);

					&:first-child {
						border-top: none;
					}
				}
			}
		}
	}
</style>