<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 审核会员详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="审核会员详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-tips" :style="{top: titleBarHeight + 'px'}" v-if="examineInfo.child_state == 1 || examineInfo.child_state == 3 || examineInfo.child_state == 4">
				<view class="tips-bg"></view>
				<view class="tips-status">
					<text v-if="examineInfo.child_state == 1">入会审核</text>
					<text v-else-if="examineInfo.child_state == 3">已通过信息审核，等待缴费</text>
					<text v-else-if="examineInfo.child_state == 4">缴费审核</text>
				</view>
				<view class="tips-time" v-if="examineInfo.child_state != 3">{{examineInfo.createtime}}</view>
			</view>
			<view class="main-info flex align-items-center">
				<image class="info-avatar" :src="examineInfo.avatar" mode="aspectFill"></image>
				<view class="info-box flex-item">
					<view class="name">{{examineInfo.name}}</view>
					<view class="level">申请级别：{{examineInfo.level_name}}</view>
				</view>
			</view>
			<view class="main-field" v-if="examineInfo.type == 1">
				<view class="field-custom">
					<examine-custom :show-type="1" :show-data="examineInfo.custom_content"></examine-custom>
				</view>
			</view>
			<view class="main-field" v-else-if="examineInfo.type == 2">
				<view class="field-custom">
					<view class="custom-title">个人信息</view>
					<examine-custom :show-type="1" :show-data="examineInfo.custom_content.person"></examine-custom>
				</view>
				<view class="field-custom">
					<view class="custom-title">企业信息</view>
					<examine-custom :show-type="2" :show-data="examineInfo.custom_content.company"></examine-custom>
				</view>
			</view>
			<view class="main-field" v-else-if="examineInfo.type == 3">
				<view class="field-custom">
					<view class="custom-title">个人信息</view>
					<examine-custom :show-type="1" :show-data="examineInfo.custom_content.person"></examine-custom>
				</view>
				<view class="field-custom">
					<view class="custom-title">团体信息</view>
					<examine-custom :show-type="3" :show-data="examineInfo.custom_content.organize"></examine-custom>
				</view>
			</view>
			<view class="main-item" v-if="examineInfo.pay_voucher">
				<view class="item-title">支付凭证</view>
				<image class="item-image" :src="examineInfo.pay_voucher" mode="widthFix" @click="previewPayVoucher()"></image>
			</view>
			<view class="main-footer">
				<view class="footer-btn flex justify-content-between">
					<view class="btn-box flex flex-center" style="background: #ECFFFA;" @click="handleConfirm(1)">
						<image class="icon" src="/static/mine/pass.png" mode="aspectFit"></image>
						<text class="text">通过</text>
					</view>
					<view class="btn-box flex flex-center" style="background: #FFEDEE;" @click="handleConfirm(2)">
						<image class="icon" src="/static/mine/reject.png" mode="aspectFit"></image>
						<text class="text">驳回</text>
					</view>
				</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
		<!-- 驳回申请弹窗 -->
		<confirm-modal ref="confirmModal" @onChange="pageChange"></confirm-modal>
	</view>
</template>

<script>
	import examineCustom from "@/pagesAdmin/component/examine-custom.vue"
	import confirmModal from "@/pages/component/modal/confirm.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			examineCustom,
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
				// 审核id
				examineId: null,
				// 审核信息
				examineInfo: [],
				// 延时器
				timeout: null,
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
			this.examineId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getExamineInfo(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onUnload() {
			clearTimeout(this.timeout)
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取审核信息
			getExamineInfo(fn) {
				this.$util.request("member.examine.details", {
					id: this.examineId,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.examineInfo = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取审核信息 ', error)
				})
			},
			// 预览支付凭证图片
			previewPayVoucher() {
				uni.previewImage({
					urls: [this.examineInfo.pay_voucher],
					current: 0
				});
			},
			// 审核操作
			handleConfirm(type) {
				if (type == 1) {
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
								this.$util.request(this.examineInfo.child_state == 1 ? "member.examine.examineApply" : "member.examine.examineOffline", {
									state: 2,
									id: this.examineId,
								}).then(res => {
									uni.hideLoading()
									if (res.code == 1) {
										uni.showToast({
											title: "审核成功",
											icon: "success",
											duration: 1500,
											mask: true
										})
										this.timeout = setTimeout(() => {
											uni.navigateBack()
										}, 1500);
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
				} else if (type == 2) {
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
								this.$util.request(this.examineInfo.child_state == 1 ? "member.examine.examineApply" : "member.examine.examineOffline", {
									state: 3,
									id: this.examineId,
									reject: data.content
								}).then(res => {
									uni.hideLoading()
									if (res.code == 1) {
										uni.showToast({
											title: "审核成功",
											icon: "success",
											duration: 1500,
											mask: true
										})
										this.timeout = setTimeout(() => {
											uni.navigateBack()
										}, 1500);
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
			padding-bottom: 112rpx;

			.main-tips {
				position: sticky;
				z-index: 99;
				padding: 12rpx 32rpx;
				height: 72rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: #FFF;

				.tips-bg {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					z-index: -1;
					background: var(--theme-color);
					opacity: 0.1;
				}

				.tips-status {
					color: var(--theme-color);
					font-size: 24rpx;
					line-height: 34rpx;
				}

				.tips-time {
					color: #8D929C;
					font-size: 24rpx;
					line-height: 34rpx;
				}
			}

			.main-info {
				background: #FFF;
				padding: 32rpx;

				.info-avatar {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
				}

				.info-box {
					margin-left: 32rpx;

					.name {
						color: #5A5B6E;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 40rpx;
					}

					.level {
						margin-top: 16rpx;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}
			}

			.main-field {
				.field-custom {
					margin-top: 32rpx;
					background: #FFF;
					padding: 32rpx;

					.custom-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}
				}
			}

			.main-item {
				margin-top: 32rpx;
				background: #FFF;
				padding: 32rpx;

				.item-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.item-image {
					width: 100%;
					margin-top: 24rpx;
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 12rpx 32rpx;
				background: #FFF;

				.footer-btn {
					.btn-box {
						border-radius: 16rpx;
						padding: 24rpx;
						width: calc(50% - 8rpx);

						.icon {
							width: 32rpx;
							height: 32rpx;
						}

						.text {
							margin-left: 16rpx;
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>