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
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="搜索结果"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-column" v-if="memberList.length">
				<view class="column-title">会员列表</view>
				<member-item :show-data="memberList"></member-item>
				<view class="column-more" v-if="parseInt(memberTotal) > parseInt(firstLimit) && memberList.length < parseInt(memberTotal)" @click="memberLoadMore()">
					<view class="more-bg"></view>
					<view class="more-text">加载更多</view>
				</view>
			</view>
			<view class="main-column" v-if="unitsList.length">
				<view class="column-title">会员单位列表</view>
				<member-units :show-data="unitsList"></member-units>
				<view class="column-more" v-if="parseInt(unitsTotal) > parseInt(firstLimit) && unitsList.length < parseInt(unitsTotal)" @click="unitsLoadMore()">
					<view class="more-bg"></view>
					<view class="more-text">加载更多</view>
				</view>
			</view>
			<view class="main-column" v-if="activityList.length">
				<view class="column-title">活动列表</view>
				<activity-item :show-data="activityList"></activity-item>
				<view class="column-more" v-if="parseInt(activityTotal) > parseInt(firstLimit) && activityList.length < parseInt(activityTotal)" @click="activityLoadMore()">
					<view class="more-bg"></view>
					<view class="more-text">加载更多</view>
				</view>
			</view>
			<view class="main-column" v-if="articleList.length">
				<view class="column-title">资讯列表</view>
				<article-item :show-data="articleList"></article-item>
				<view class="column-more" v-if="parseInt(articleTotal) > parseInt(firstLimit) && articleList.length < parseInt(articleTotal)" @click="articleLoadMore()">
					<view class="more-bg"></view>
					<view class="more-text">加载更多</view>
				</view>
			</view>
			<view class="main-column" v-if="goodsList.length">
				<view class="column-title">商品列表</view>
				<goods-item :show-data="goodsList"></goods-item>
				<view class="column-more" v-if="parseInt(goodsTotal) > parseInt(firstLimit) && goodsList.length < parseInt(goodsTotal)" @click="goodsLoadMore()">
					<view class="more-bg"></view>
					<view class="more-text">加载更多</view>
				</view>
			</view>
			<empty top="30%" title="暂无相关内容~" v-if="!memberList.length && !unitsList.length && !activityList.length && !articleList.length && !goodsList.length"></empty>
		</view>
	</view>
</template>

<script>
	import memberItem from "@/pages/component/member/index.vue"
	import memberUnits from "@/pages/component/member/units.vue"
	import activityItem from "@/pages/component/activity/index.vue"
	import articleItem from "@/pages/component/article/index.vue"
	import goodsItem from '@/pages/component/mall/goods.vue'
	import { mapState } from "vuex"
	export default {
		components: {
			memberItem,
			memberUnits,
			activityItem,
			articleItem,
			goodsItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 搜索关键词
				keyword: "",
				// 首次搜索数量限制
				firstLimit: 5,
				// 会员查询参数
				memberList: [],
				memberPage: 0,
				memberLimit: 50,
				memberTotal: 0,
				// 会员单位查询参数
				unitsList: [],
				unitsPage: 0,
				unitsLimit: 50,
				unitsTotal: 0,
				// 活动查询参数
				activityList: [],
				activityPage: 0,
				activityLimit: 50,
				activityTotal: 0,
				// 新闻查询参数
				articleList: [],
				articlePage: 0,
				articleLimit: 50,
				articleTotal: 0,
				// 商品查询参数
				goodsList: [],
				goodsPage: 0,
				goodsLimit: 50,
				goodsTotal: 0,
				// 是否授权位置信息
				isLocation: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				memberTypeConfig: state => state.app.memberTypeConfig,
			})
		},
		onLoad(option) {
			this.keyword = option.keyword
			uni.showLoading({
				title: "加载中"
			})
			this.getSearchData(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		methods: {
			// 获取搜索数据
			getSearchData(fn) {
				this.$util.request("main.diySearch", {
					keywords: this.keyword,
					limit: this.firstLimit,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.memberList = res.data?.member_data?.data || []
						this.memberTotal = res.data?.member_data?.total || 0
						this.unitsList = res.data?.unit_data?.data || []
						this.unitsTotal = res.data?.unit_data?.total || 0
						this.activityList = res.data?.activity_data?.data || []
						this.activityTotal = res.data?.activity_data?.total || 0
						this.articleList = res.data?.article_data?.data || []
						this.articleTotal = res.data?.article_data?.total || 0
						this.goodsList = res.data?.goods_data?.data || []
						this.goodsTotal = res.data?.goods_data?.total || 0
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取自定义搜索数据 ', error)
				})
			},
			// 会员加载更多数据
			memberLoadMore() {
				if (this.memberList.length >= parseInt(this.memberTotal)) return
				this.memberPage++
				this.$util.request("member.diySearchList", {
					page: this.memberPage,
					limit: this.memberLimit,
					keywords: this.keyword,
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.memberTotal = res.data.total
						this.memberList = this.memberPage == 1 ? list : [...this.memberList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取自定义搜索会员列表 ', error)
				})
			},
			// 会员单位加载更多数据
			unitsLoadMore() {
				if (this.unitsList.length >= parseInt(this.unitsTotal)) return
				this.unitsPage++
				this.$util.request("member.units", {
					page: this.unitsPage,
					limit: this.unitsLimit,
					keywords: this.keyword,
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.unitsTotal = res.data.total
						this.unitsList = this.unitsPage == 1 ? list : [...this.unitsList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取自定义搜索会员单位列表 ', error)
				})
			},
			// 活动加载更多数据
			activityLoadMore() {
				if (this.activityList.length >= parseInt(this.activityTotal)) return
				this.activityPage++
				this.$util.request("activity.list", {
					page: this.activityPage,
					limit: this.activityLimit,
					keywords: this.keyword,
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.activityTotal = res.data.total
						this.activityList = this.activityPage == 1 ? list : [...this.activityList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取自定义搜索活动列表 ', error)
				})
			},
			// 资讯加载更多数据
			articleLoadMore() {
				if (this.articleList.length >= parseInt(this.articleTotal)) return
				this.articlePage++
				this.$util.request("main.article.list", {
					page: this.articlePage,
					limit: this.articleLimit,
					keywords: this.keyword,
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.articleTotal = res.data.total
						this.articleList = this.articlePage == 1 ? list : [...this.articleList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取自定义搜索资讯列表 ', error)
				})
			},
			// 商品加载更多数据
			goodsLoadMore() {
				if (this.goodsList.length >= parseInt(this.goodsTotal)) return
				this.goodsPage++
				this.$util.request("mall.goodsList", {
					page: this.goodsPage,
					limit: this.goodsLimit,
					keywords: this.keyword,
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.goodsTotal = res.data.total
						this.goodsList = this.goodsPage == 1 ? list : [...this.goodsList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取自定义搜索商品列表 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-column {
				margin-top: 32rpx;

				&:first-child {
					margin-top: 0;
				}

				.column-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
					margin-bottom: 32rpx;
				}

				.column-more {
					position: relative;
					width: 100%;
					height: 72rpx;
					border-radius: 16rpx;
					overflow: hidden;
					background: #FFF;
					margin-top: 32rpx;

					.more-bg {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						background: var(--theme-color);
						opacity: .1;
					}

					.more-text {
						position: relative;
						z-index: 1;
						color: var(--theme-color);
						font-size: 12px;
						line-height: 72rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>