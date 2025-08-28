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
	<view class="container" v-if="loadEnd">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="搜索结果"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<activity-item :show-data="dataList" v-if="dataList.length"></activity-item>
			<empty top="30%" title="暂无相关内容~" v-else></empty>
		</view>
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
				// 搜索关键词
				keyword: "",
				// 查询参数
				page: 1,
				limit: 20,
				hasMore: false,
				// 数据列表
				dataList: []
			}
		},
		onLoad(option) {
			this.keyword = option.keyword
			uni.showLoading({
				title: "加载中"
			})
			this.getList(() => {
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
			// 获取活动列表
			getList(fn) {
				this.$util.request("activity.list", {
					page: this.page,
					limit: this.limit,
					keywords: this.keyword
				}).then(res => {
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
					console.error('获取活动列表 ', error)
				})
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