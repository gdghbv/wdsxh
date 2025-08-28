<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-地图组 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-map" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<map class="map" :latitude="showParams.latitude" :longitude="showParams.longitude" :style="{height: height}" @click="onClick"></map>
	</view>
</template>

<script>
	export default {
		name: 'mapDiy',
		props: ['showStyle', 'showParams'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			height() {
				return uni.upx2px(this.showStyle.height * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
		},
		methods: {
			// 点击事件
			onClick() {
				uni.openLocation({
					latitude: parseFloat(this.showParams.latitude),
					longitude: parseFloat(this.showParams.longitude),
				});
			}
		}
	}
</script>

<style lang="scss">
	.diy-map .map {
		width: 100%;
	}
</style>