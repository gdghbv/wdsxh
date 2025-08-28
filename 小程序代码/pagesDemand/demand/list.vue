<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 我的发布 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="我的发布"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header flex align-items-center" :style="{top: titleBarHeight + 'px'}">
				<scroll-view scroll-x class="header-screen flex-item">
					<view class="screen-item" :class="{active: selectScreen == item.id}" v-for="item in demandScreen" :key="item.id" @click="screenChange(item.id)">
						{{ item.name }}
					</view>
				</scroll-view>
				<view class="header-btn  flex align-items-center" @click="toPublish()">
					<view class="icon" :style="{'background-image': 'url('+ iconRelease +')'}" v-if="iconRelease"></view>
					<view class="text">发布</view>
				</view>
			</view>
			<view class="main-content">
				<demand-item :show-data="demandList" :show-type="2" @onReset="resetDemandList()" v-if="demandList.length"></demand-item>
				<empty top="30%" title="暂无相关内容~" v-else></empty>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import demandItem from "@/pages/component/demand/index.vue"
	import { mapState } from "vuex"
	import svgData from "@/common/svg.js"
	export default {
		components: {
			demandItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 已选状态
				selectScreen: 0,
				// 当前页
				page: 1,
				// 限制条数
				limit: 10,
				// 是否存在下一页
				hasMore: false,
				// 供需筛选
				demandScreen: [{
						id: 0,
						name: "全部",
					},
					{
						id: 1,
						name: "审核中",
					},
					{
						id: 2,
						name: "发布中",
					},
					{
						id: 3,
						name: "已驳回",
					}
				],
				// 供需列表
				demandList: []

			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconRelease: state => {
					return svgData.svgToUrl("release", state.app.themeColor)
				},
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getDemandList(() => {
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
				this.getDemandList()
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getDemandList(() => {
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getDemandList();
			}
		},
		methods: {
			// 获取列表
			getDemandList(fn) {
				this.$util.request("demand.businessList", {
					state: this.selectScreen,
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data || []
						list.forEach((el) => {
							el.images = this.splitImages(el.images)
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
					if (fn) fn()
					console.error('获取供需列表', error)
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
			// 重新获取列表
			resetDemandList() {
				this.page = 1
				this.getDemandList()
			},
			// 发布供需
			toPublish() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesDemand/demand/edit"
				})
			},
			// 顶部导航筛选
			screenChange(id) {
				if (this.selectScreen == id) {
					return
				}
				this.selectScreen = id
				this.page = 1
				this.getDemandList()
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
				padding: 24rpx 0;
				background: #FFF;

				.header-screen {
					.screen-item {
						display: inline-block;
						min-width: 25%;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						text-align: center;
						padding: 12rpx 16rpx;

						&.active {
							color: var(--theme-color);
							font-weight: 600;
						}
					}
				}

				.header-btn {
					padding: 12rpx 32rpx;
					border-left: 1px solid #E4E4E4;

					.icon {
						width: 40rpx;
						height: 40rpx;
						background-size: 40rpx;
					}

					.text {
						margin-left: 8rpx;
						color: var(--theme-color);
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}
			}

			.main-content {
				padding: 32rpx;
			}
		}
	}
</style>