<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 提交成功 开发者: 麦沃德科技-暴雨  
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="提交成功"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<view class="image" :style="{background: themeColor}">
				<image src="/static/check.png" mode="aspectFit"></image>
			</view>
			<view class="text_black">
				提交成功
			</view>
			<view class="text_size_28">
				提交成功,感谢您提供的需求建议
			</view>
			<view class="back" @click="backHome" :style="{background: themeColor}">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			})
		},
		methods: {
			// 返回首页
			backHome() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFF;
	}

	.container {
		.container-main {
			padding: 0 24rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.image {
				margin-top: 96rpx;
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				padding: 40rpx;
			}

			.back {
				margin-top: 64rpx;
				padding: 22rpx 0rpx 22rpx;
				width: 100%;
				line-height: 44rpx;
				color: #FFF;
				font-size: 32rpx;
				text-align: center;
				border-radius: 16rpx;
			}

			.text_black {
				margin-top: 32rpx;
				color: #000000;
				font-size: 36rpx;
				line-height: 50rpx;
			}

			.text_size_28 {
				margin-top: 16rpx;
				color: #979797;
				font-size: 28rpx;
				line-height: 40rpx;
			}

			.text_size_32 {
				margin-top: 48rpx;
				color: #979797;
				font-size: 32rpx;
				line-height: 44rpx;
			}
		}
	}
</style>