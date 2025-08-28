<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 退款申请 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{ '--theme-color': themeColor }">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="申请退款"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-column">
				<view class="column-title">退款原因</view>
				<view class="column-list">
					<view class="list-item flex align-items-center" v-for="(item, index) in reasonList" :key="index" @click="changeReason(index)">
						<view class="item-radio" :class="{active: selectReason == index}">
							<image src="/static/tick.png" mode="aspectFill" v-if="selectReason == index"></image>
						</view>
						<view class="item-label">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="main-column">
				<view class="column-title">退款描述</view>
				<view class="column-content">
					<textarea class="input" placeholder="请填写您的退款描述，200字以内" v-model="formData.refund_content" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="handleSubmit()">提交退款申请</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 是否加载完成
				loadEnd: false,
				// 原因列表
				reasonList: [{
						id: 1,
						name: '产品存在质量问题'
					},
					{
						id: 2,
						name: '产品实物与描述不符'
					},
					{
						id: 3,
						name: '卖家的发货环节出现问题'
					},
					{
						id: 4,
						name: '卖家存在延迟发货问题'
					}
				],
				// 已选原因
				selectReason: null,
				// 表单内容
				formData: {
					order_id: "",
					refund_reason: "",
					refund_content: "",
				},
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			})
		},
		onLoad(option) {
			this.formData.order_id = option.id
			this.$nextTick(() => {
				this.loadEnd = true
			})
		},
		methods: {
			// 更换退款原因
			changeReason(index) {
				this.selectReason = index
				this.formData.refund_reason = this.reasonList[index].name
			},
			// 提交退款申请
			handleSubmit() {
				if (!this.formData.refund_reason && !this.formData.refund_content) {
					uni.showToast({
						title: "请选择退款原因或填写退款描述",
						icon: 'none',
						duration: 2000
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$util.request("mall.orderRefund", this.formData).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						uni.redirectTo({
							url: "/pagesMall/refund/success"
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('提交退款申请', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-column {
				padding: 24rpx 32rpx 48rpx;
				border-radius: 20rpx;
				background: #FFF;
				margin-top: 32rpx;

				&:first-child {
					margin-top: 0;
				}

				.column-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.column-list {
					margin-top: 24rpx;

					.list-item {
						padding: 24rpx 16rpx;

						.item-radio {
							width: 40rpx;
							height: 40rpx;
							background: #D6DBDE;
							border-radius: 50%;

							&.active {
								background: var(--theme-color);
							}
						}

						.item-label {
							margin-left: 24rpx;
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}
				}

				.column-content {
					margin-top: 32rpx;
					padding: 24rpx;
					border-radius: 10rpx;
					background: #F6F7FB;
					height: 260rpx;

					.input {
						width: 100%;
						height: 100%;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.placeholder {
						color: #999;
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 96;
				background: #FFF;
				border-top: 1rpx solid #F6F7FB;
				padding: 16rpx 24rpx;

				.footer-btn {
					padding: 20rpx 44rpx;
					background: var(--theme-color);
					border-radius: 40rpx;
					color: #FFF;
					text-align: center;
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}
		}
	}
</style>