<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-会员列表 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="component-member" :style="{'--theme-color': themeColor}">
		<view class="member-item flex" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<image class="item-avatar" :src="item.avatar" mode="aspectFill"></image>
			<view class="item-info flex-item flex-direction-column justify-content-between">
				<view class="info-head flex">
					<view class="head-name flex-item text-ellipsis">{{item.name}}</view>
					<view class="head-tag" v-if="item.distance">{{item.distance}}</view>
				</view>
				<view class="info-tag text-ellipsis">{{item.native_place}}</view>
				<view class="info-label flex justify-content-between">
					<text class="text-ellipsis">{{item.level_name}}</text>
					<text class="text-ellipsis" style="margin-left: 16rpx;">{{item.industry_category_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "memberIndex",
		props: ["showData"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			})
		},
		methods: {
			// 跳转会员详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/details?id=" + id
				})
			},
		},
	}
</script>

<style lang="scss">
	.component-member {
		white-space: nowrap;

		.member-item {
			margin-top: 32rpx;
			padding: 32rpx;
			border-radius: 10rpx;
			background: #ffffff;

			&:first-child {
				margin-top: 0;
			}

			.item-avatar {
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
			}

			.item-info {
				margin-left: 32rpx;

				.info-head {
					.head-name {
						color: #5A5B6E;
						font-size: 32rpx;
						line-height: 44rpx;
					}

					.head-tag {
						color: var(--theme-color);
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}

				.info-tag {
					color: #C4C4C4;
					font-size: 24rpx;
					line-height: 34rpx;
				}

				.info-label {
					color: var(--theme-color);
					font-size: 24rpx;
					line-height: 34rpx;
				}
			}
		}
	}
</style>