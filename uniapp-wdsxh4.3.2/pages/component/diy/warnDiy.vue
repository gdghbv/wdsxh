<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-警告提示 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<block v-if="isshow">
		<view :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
			<u-alert-tips :type="showStyle.type" :title="showParams.title" :description="showParams.description" :close-able="showParams.closable" :show="show" @close="onClick" :show-icon="showParams.showIcon"></u-alert-tips>
		</view>
	</block>
</template>

<script>
	export default {
		props: ['showStyle', 'showParams'],
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
		data() {
			return {
				show: true,
				isshow: true,
			}
		},
		methods: {
			onClick() {
				this.show = false;
				this.isshow = false;
			}
		}
	}
</script>