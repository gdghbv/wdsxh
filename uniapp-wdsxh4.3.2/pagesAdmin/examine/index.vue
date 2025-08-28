<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 审核会员 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="审核会员"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-screen flex" :style="{top: titleBarHeight + 'px'}">
				<view class="screen-item" :class="{active: selectScreen == 1}" @click="changeScreen(1)">待审核</view>
				<view class="screen-item" :class="{active: selectScreen == 2}" @click="changeScreen(2)">已审核</view>
			</view>
			<view class="main-list">
				<examine-item :show-data="examineList" @onConfirm="handleConfirm" v-if="examineList.length"></examine-item>
				<empty top="30%" title="暂无相关内容~" v-else></empty>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
		<!-- 驳回申请弹窗 -->
		<confirm-modal ref="confirmModal" @onChange="pageChange"></confirm-modal>
	</view>
</template>

<script>
	import examineItem from "@/pagesAdmin/component/examine.vue"
	import confirmModal from "@/pages/component/modal/confirm.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			examineItem,
			confirmModal,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 已选分类
				selectScreen: 1,
				// 审核列表
				examineList: [],
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
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getExamineList(() => {
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
				this.getExamineList()
			}
		},
		onPullDownRefresh() {
			this.getExamineList(() => {
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getExamineList()
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取审核列表
			getExamineList(fn) {
				this.$util.request("member.examine.list", {
					page: this.page,
					limit: this.limit,
					state: this.selectScreen
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.examineList = this.page == 1 ? list : [...this.examineList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取审核列表 ', error)
				})
			},
			// 更改状态
			changeScreen(id) {
				this.selectScreen = id
				this.getExamineList()
			},
			// 审核操作
			handleConfirm(e) {
				if (e.type == 1) {
					this.$refs.confirmModal.open({
						content: "确认申请信息无误？<br />点击【确认】完成审核",
						cancelText: "我再想想",
						confirmText: "确认",
						cancelColor: "#999999",
						confirmColor: this.themeColor,
						success: (data) => {
							if (data.confirm) {
								uni.showLoading({
									title: "加载中",
									mask: true
								})
								this.$util.request(e.state == 1 ? "member.examine.examineApply" : "member.examine.examineOffline", {
									state: 2,
									id: e.id,
								}).then(res => {
									uni.hideLoading()
									if (res.code == 1) {
										uni.showToast({
											title: "审核成功",
											icon: "success",
											duration: 1500
										})
										this.page = 1
										this.getExamineList()
									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								}).catch(error => {
									uni.hideLoading()
									console.error('通过审核 ', error)
								})
							}
						}
					})
				} else if (e.type == 2) {
					this.$refs.confirmModal.open({
						title: "驳回申请",
						editable: true,
						placeholderText: "请输入驳回原因",
						cancelText: "我再想想",
						confirmText: "提交",
						cancelColor: "#999999",
						confirmColor: this.themeColor,
						success: (data) => {
							if (data.confirm) {
								uni.showLoading({
									title: "加载中",
									mask: true
								})
								this.$util.request(e.state == 1 ? "member.examine.examineApply" : "member.examine.examineOffline", {
									state: 3,
									id: e.id,
									reject: data.content
								}).then(res => {
									uni.hideLoading()
									if (res.code == 1) {
										uni.showToast({
											title: "审核成功",
											icon: "success",
											duration: 1500
										})
										this.page = 1
										this.getExamineList()
									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								}).catch(error => {
									uni.hideLoading()
									console.error('通过审核 ', error)
								})
							}
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-screen {
				position: sticky;
				z-index: 99;
				background: #FFF;

				.screen-item {
					width: 50%;
					color: #8D929C;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 36rpx 24rpx;
					text-align: center;

					&.active {
						color: #5A5B6E;
						font-weight: 600;
					}
				}
			}

			.main-list {
				padding: 32rpx;
			}
		}
	}
</style>