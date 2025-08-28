<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商会介绍 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-introduce" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<image class="introduce-image" :src="getImagePath(showParams.imgUrl)" :style="{width: iconSize, height: iconSize, borderRadius: borderRadius}" mode="aspectFill"></image>
		<text class="introduce-title" :style="{fontSize: nameSize, fontWeight: showStyle.nameWeight}">{{showParams.name}}</text>
		<view class="introduce-btn" :style="{fontSize: btnSize, borderRadius: btnBorderRadius, background: `linear-gradient(90deg, ${showStyle.btnColor1} 0, ${showStyle.btnColor2} 100%)`}" @click="onClick()">{{showParams.btnName}}</view>
	</view>
</template>

<script>
	export default {
		name: 'introduceDiy',
		props: ['showStyle', 'showParams', 'domain'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
			},
			iconSize() {
				return uni.upx2px(this.showStyle.iconSize * 2) + 'px';
			},
			btnBorderRadius() {
				return uni.upx2px(this.showStyle.btnBorderRadius * 2) + 'px';
			},
			btnSize() {
				return uni.upx2px(this.showStyle.btnSize * 2) + 'px';
			},
			nameSize() {
				return uni.upx2px(this.showStyle.nameSize * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
		},
		methods: {
			// 获取图片地址
			getImagePath(url) {
				if (url.indexOf('http') > -1) {
					return url
				} else {
					return this.domain + url
				}
			},
			// 点击事件
			onClick() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/index/association"
				})
			},
		}
	}
</script>

<style lang="scss">
	.diy-introduce {
		display: flex;
		align-items: center;

		.introduce-title {
			margin-left: 16rpx;
			color: #5A5B6E;
			line-height: 1.3;
			flex: 1;
		}

		.introduce-btn {
			margin-left: 16rpx;
			color: #ffffff;
			line-height: 1.3;
			padding: 14rpx 40rpx;
		}
	}
</style>