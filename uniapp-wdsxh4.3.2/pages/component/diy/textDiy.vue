<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-文本组 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view :style="{background: showStyle.background, borderRadius: itemBorderRadius, padding: paddingTop +' '+ paddingLeft, textAlign: showStyle.textAlign, color: showStyle.textColor, fontSize: fontSize}">
		<text v-if="showStyle.fontStyle == 'bold'" style="font-weight: bold;">{{showStyle.text}}</text>
		<text v-else-if="showStyle.fontStyle == 'italic'" style="font-style: italic;">{{showStyle.text}}</text>
		<text v-else>{{showStyle.text}}</text>
	</view>
</template>

<script>
	export default {
		name: 'textDiy',
		props: ['showStyle'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			fontSize() {
				return uni.upx2px(this.showStyle.fontSize * 2) + 'px';
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