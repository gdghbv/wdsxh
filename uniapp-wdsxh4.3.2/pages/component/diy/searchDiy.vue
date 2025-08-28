<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-搜索 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-search" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="search-input" :style="{'--placeholder-color': showStyle.placeholderColor, padding: inputPaddingTop + ' ' + inputPaddingLeft, background: showStyle.inputBackground, borderRadius: inputBorderRadius}">
			<view :style="{'background-image': 'url('+ iconSearch +')', width: iconSize, height: iconSize, backgroundSize: iconSize}" v-if="iconSearch"></view>
			<input class="input-box" type="text" confirm-type="search" :style="{fontSize: fontSize, color: showStyle.inputColor}" :placeholder="showParams.placeholder" placeholder-class="placeholder" @confirm="handleSearch" />
		</view>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	export default {
		name: "searchDiy",
		props: ['showStyle', 'showParams'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			iconSearch() {
				return svgData.svgToUrl("search", this.showStyle.iconColor)
			},
			iconSize() {
				return uni.upx2px(this.showStyle.iconSize * 2) + 'px';
			},
			fontSize() {
				return uni.upx2px(this.showStyle.fontSize * 2) + 'px';
			},
			inputBorderRadius() {
				return uni.upx2px(this.showStyle.inputBorderRadius * 2) + 'px';
			},
			inputPaddingTop() {
				return uni.upx2px(this.showStyle.inputPaddingTop * 2) + 'px';
			},
			inputPaddingLeft() {
				return uni.upx2px(this.showStyle.inputPaddingLeft * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
		},
		methods: {
			// 搜索
			handleSearch(e) {
				if (!e.detail.value) {
					uni.showToast({
						icon: "none",
						title: this.showParams.placeholder,
						duration: 2000
					})
					return
				}
				this.$util.toPage({
					mode: 1,
					path: "/pages/diy/search?keyword=" + e.detail.value
				})
			},
		}
	}
</script>

<style lang="scss">
	.diy-search {
		.search-input {
			display: flex;
			align-items: center;

			.input-box {
				width: 100%;
				height: auto;
				min-height: auto;
				line-height: 1.4;
				margin-left: 16rpx;
			}

			.placeholder {
				color: var(--placeholder-color);
			}
		}
	}
</style>