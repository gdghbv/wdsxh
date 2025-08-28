<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-可滚动会员列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<scroll-view scroll-x :scroll-left="scrollLeft" class="component-member-scroll" :style="{'--theme-color': themeColor}" @scrolltolower="scrolltolower">
		<view class="scroll-item" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<image class="item-avatar" :src="item.avatar" mode="aspectFill"></image>
			<view class="item-label text-ellipsis">{{item.level_name}}</view>
			<view class="item-name text-ellipsis">{{item.name}}</view>
		</view>
	</scroll-view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "memberScroll",
		props: ["showData"],
		data() {
			return {
				// 横向滚动条位置
				scrollLeft: 0,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			})
		},
		methods: {
			// 重置横向滚动条位置
			resetScrollLeft() {
				this.scrollLeft = 0.1
				this.$nextTick(() => {
					this.scrollLeft = 0
				})
			},
			// 滚动到最右侧
			scrolltolower() {
				this.$emit("scrolltolower")
			},
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
	.component-member-scroll {
		white-space: nowrap;

		.scroll-item {
			display: inline-block;
			width: 128rpx;
			margin-left: 36rpx;

			&:first-child {
				margin-left: 0;
			}

			.item-avatar {
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
			}

			.item-label {
				color: #ffffff;
				font-size: 20rpx;
				line-height: 28rpx;
				padding: 8rpx;
				border-radius: 4rpx 20rpx 4rpx 20rpx;
				background: var(--theme-color);
				margin-top: -16rpx;
				text-align: center;
				position: relative;
				z-index: 1;
			}

			.item-name {
				color: #5A5B6E;
				font-size: 28rpx;
				line-height: 40rpx;
				margin-top: 16rpx;
				text-align: center;
			}
		}
	}
</style>