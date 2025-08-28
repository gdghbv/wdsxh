<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 退款列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="退款列表"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 顶部导航 -->
			<scroll-view scroll-x class="main-screen" :style="{top: titleBarHeight + 'px'}">
				<view class="screen-item" :class="{active: selectScreen == index}" @click="changeScreen(index)" v-for="(item, index) in screenList" :key="index">{{item.text}}</view>
			</scroll-view>
			<!-- 订单列表 -->
			<view class="main-list">
				<mall-refund :show-data="orderList" @getOrderList="resetOrderList"></mall-refund>
				<empty top="36%" title="暂无相关订单~" v-if="orderList.length == 0"></empty>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import mallRefund from "@/pagesMall/component/mall/refund.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			mallRefund,
		},
		data() {
			return {
				// 是否加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 分类列表
				screenList: [{
						text: "全部",
					},
					{
						text: "申请中",
						state: 2
					},
					{
						text: "待退货",
						state: 3
					},
					{
						text: "退款中",
						state: 4
					},
					{
						text: "已退款",
						state: 5
					}
				],
				// 已选分类
				selectScreen: 0,
				// 订单列表
				orderList: [],
				// 分类查询参数
				page: 1,
				limit: 10,
				hasMore: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad(option) {
			if (option.id) {
				this.selectScreen = this.screenList.findIndex(item => {
					if (item.state == option.id) return true
				})
			}
			uni.showLoading({
				title: "加载中"
			})
			this.getOrderList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onShow() {
			if (this.loadEnd) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.page = 1
				this.getOrderList()
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getOrderList(() => {
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getOrderList()
			}
		},
		methods: {
			// 更改分类
			changeScreen(index) {
				this.selectScreen = index
				this.page = 1
				this.getOrderList()
			},
			// 获取退款订单列表
			getOrderList(fn) {
				let data = {
					page: this.page,
					limit: this.limit,
				}
				if (this.screenList[this.selectScreen].state) data.refund_status = this.screenList[this.selectScreen].state
				this.$util.request("mall.refundList", data).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.orderList = this.page == 1 ? list : [...this.orderList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取退款订单列表', error)
				})
			},
			// 重新获取订单列表
			resetOrderList() {
				this.page = 1
				this.getOrderList()
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-screen {
				position: sticky;
				top: 0;
				z-index: 99;
				background: #FFF;
				white-space: nowrap;

				.screen-item {
					display: inline-block;
					min-width: 20%;
					padding: 40rpx 12rpx;
					color: #8D929C;
					font-size: 28rpx;
					line-height: 40rpx;
					text-align: center;

					&.active {
						color: var(--theme-color);
					}
				}
			}

			.main-list {
				padding: 32rpx;
			}
		}
	}
</style>