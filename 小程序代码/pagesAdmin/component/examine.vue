<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-审核列表 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="component-member-examine" :style="{'--theme-color': themeColor}">
		<view class="examine-item" v-for="item in showData" :key="item.id">
			<view class="item-top">
				<view class="top-pending" v-if="item.child_state == 1 || item.child_state == 3 || item.child_state == 4">
					<view class="pending-bg"></view>
					<view class="pending-status">
						<text v-if="item.child_state == 1">入会审核</text>
						<text v-else-if="item.child_state == 3">已通过信息审核，等待缴费</text>
						<text v-else-if="item.child_state == 4">缴费审核</text>
					</view>
					<view class="pending-time" v-if="item.child_state != 3">{{item.createtime}}</view>
				</view>
				<view class="top-reviewed" v-else>
					<view class="reviewed-status" v-if="item.child_state == 6">
						<image class="icon" src="/static/mine/pass.png" mode="aspectFit"></image>
						<text class="text" style="color: #00A980;">已通过审核</text>
					</view>
					<view class="reviewed-status" v-else-if="item.child_state == 2 || item.child_state == 5">
						<image class="icon" src="/static/mine/reject.png" mode="aspectFit"></image>
						<text class="text" style="color: #FF626E;">已驳回申请</text>
					</view>
					<view class="reviewed-time">{{item.createtime}}</view>
				</view>
			</view>
			<view class="item-center flex align-items-center">
				<image class="center-avatar" :src="item.avatar" mode="aspectFill"></image>
				<view class="center-info flex-item">
					<view class="info-name text-ellipsis">{{item.name}}</view>
					<view class="info-level text-ellipsis">申请级别：{{item.level.name}}</view>
				</view>
			</view>
			<view class="item-bottom flex" v-if="item.child_state == 1 || item.child_state == 4">
				<view class="bottom-btn" @click="onConfirm(1, item.id, item.child_state)">
					<image class="icon" src="/static/mine/pass.png" mode="aspectFit"></image>
					<text class="text">通过</text>
				</view>
				<view class="bottom-btn" @click="onConfirm(2, item.id, item.child_state)">
					<image class="icon" src="/static/mine/reject.png" mode="aspectFit"></image>
					<text class="text">驳回</text>
				</view>
				<view class="bottom-btn" @click="toDetails(item.id)">
					<view class="icon" style="background-size: 32rpx 32rpx;" :style="{'background-image': 'url('+ iconDetails +')'}" v-if="iconDetails"></view>
					<text class="text">详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		name: "memberExamine",
		props: ["showData"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconDetails: state => {
					return svgData.svgToUrl("details", state.app.themeColor)
				},
			})
		},
		methods: {
			// 跳转会员详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesAdmin/examine/details?id=" + id
				})
			},
			// 通过/驳回操作
			onConfirm(type, id, state) {
				this.$emit("onConfirm", { type, id, state })
			},
		},
	}
</script>

<style lang="scss">
	.component-member-examine {
		.examine-item {
			border-radius: 16rpx;
			background: #FFF;
			overflow: hidden;
			margin-top: 32rpx;

			&:first-child {
				margin-top: 0;
			}

			.item-top {
				.top-pending {
					position: relative;
					z-index: 1;
					padding: 12rpx 32rpx;
					height: 72rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.pending-bg {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						z-index: -1;
						background: var(--theme-color);
						opacity: 0.1;
					}

					.pending-status {
						color: var(--theme-color);
						font-size: 24rpx;
						line-height: 34rpx;
					}

					.pending-time {
						color: #8D929C;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.top-reviewed {
					position: relative;
					z-index: 1;
					padding: 12rpx 32rpx;
					height: 80rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #F1F4FF;

					.reviewed-status {
						display: flex;
						align-items: center;

						.icon {
							width: 24rpx;
							height: 24rpx;
						}

						.text {
							margin-left: 16rpx;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}

					.reviewed-time {
						color: #8D929C;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}

			.item-center {
				padding: 32rpx;

				.center-avatar {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
				}

				.center-info {
					margin-left: 20rpx;

					.info-name {
						color: #5A5B6E;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 40rpx;
					}

					.info-level {
						margin-top: 16rpx;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}
			}

			.item-bottom {
				border-top: 1px solid #F1F4FF;

				.bottom-btn {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					padding: 20rpx;
					border-left: 1px solid #F1F4FF;

					&:first-child {
						border-left: none;
					}

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
</style>