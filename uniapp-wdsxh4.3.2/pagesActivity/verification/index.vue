<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 活动核销-列表 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="活动核销"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<activity-item :show-data="activityList" show-type="3"></activity-item>
			<empty top="26%" title="暂无核销活动~" v-if="activityList.length == 0"></empty>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import activityItem from "@/pages/component/activity/index.vue"
	export default {
		components: {
			activityItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 查询参数
				page: 1,
				limit: 10,
				hasMore: false,
				// 活动列表
				activityList: [],
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getActivityList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onPullDownRefresh() {
			this.page = 1
			this.getActivityList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getActivityList()
			}
		},
		methods: {
			// 获取核销列表
			getActivityList(fn) {
				this.$util.request("activity.verifyList", {
					page: this.page,
					limit: this.limit,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.activityList = this.page == 1 ? list : [...this.activityList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取活动列表 ', error)
				})
			}
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