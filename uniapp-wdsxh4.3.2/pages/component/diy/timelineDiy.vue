<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-时间线 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-timeline" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<u-time-line>
			<u-time-line-item v-for="(item,index) in showData" :key="index" :bgColor="item.color">
				<template v-slot:content>
					<view>
						<view class="u-order-desc">{{item.content}}</view>
						<view class="u-order-time" v-if="item.hide">{{item.time}}</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		props: ['showStyle', 'showData'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
		},
	}
</script>

<style lang="scss">
	.diy-timeline .u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
		margin-top: 10rpx;
	}
	
	.diy-timeline .u-time-axis-item {
		margin-top: 32rpx;
	}
</style>