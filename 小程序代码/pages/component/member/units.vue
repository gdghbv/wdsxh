<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-会员单位列表 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="component-member-units">
		<view class="units-item flex" v-for="item in showData" :key="item.id" @click="toDetails(item.id, item.type)">
			<image class="item-logo" :src="item.logo" mode="aspectFill"></image>
			<view class="item-info flex-item flex-direction-column justify-content-between">
				<view class="info-name text-ellipsis">{{item.name}}</view>
				<view class="info-introduction text-ellipsis-more">{{item.introduction}}</view>
			</view>
			<view class="item-level">
				<view class="bg" :style="{background: themeColor}"></view>
				<view class="text">{{item.level_name}}单位</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "memberUnits",
		props: ["showData"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			})
		},
		methods: {
			// 跳转会员详情
			toDetails(id, type) {
				if (type == 2) {
					this.$util.toPage({
						mode: 1,
						path: "/pages/member/enterprise?id=" + id
					})
				} else {
					this.$util.toPage({
						mode: 1,
						path: "/pages/member/organization?id=" + id
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.component-member-units {
		.units-item {
			position: relative;
			margin-top: 32rpx;
			padding: 32rpx;
			border-radius: 16rpx;
			overflow: hidden;
			background: #ffffff;

			&:first-child {
				margin-top: 0;
			}

			.item-logo {
				width: 156rpx;
				height: 156rpx;
				border-radius: 50%;
			}

			.item-info {
				margin-left: 32rpx;

				.info-name {
					color: #333;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.info-introduction {
					margin-top: 16rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 48rpx;
				}
			}

			.item-level {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 9;
				border-bottom-right-radius: 16rpx;
				padding: 8rpx 16rpx;
				overflow: hidden;

				.bg {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					opacity: .7;
				}

				.text {
					color: #FFF;
					font-size: 24rpx;
					line-height: 34rpx;
					position: relative;
					z-index: 1;
				}
			}
		}
	}
</style>