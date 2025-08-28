<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-导航组 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-nav" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<block v-if="!showStyle.rowsLimit || showStyle.rowsLimit == -1">
			<menu-diy :showStyle="showStyle" :showData="showData" :domain="domain" @onClick="onClick"></menu-diy>
		</block>
		<block v-else-if="menuList.length == 1">
			<menu-diy :showStyle="showStyle" :showData="menuList[0]" :domain="domain" @onClick="onClick"></menu-diy>
		</block>
		<block v-else>
			<swiper :style="{height: carouselHeight}" @change="carouselChange">
				<swiper-item v-for="(menu, number) in menuList" :key="number">
					<menu-diy :showStyle="showStyle" :showData="menu" :domain="domain" @onClick="onClick"></menu-diy>
				</swiper-item>
			</swiper>
			<view class="carousel-dots">
				<view class="dots-item" :style="{background: carouseIndex == i ? (showStyle.dotColor || themeColor) : '#F1F1F1'}" v-for="(d, i) in menuList" :key="i"></view>
			</view>
		</block>
	</view>
</template>

<script>
	import menuDiy from './menuDiy.vue'
	import { mapState } from "vuex"
	export default {
		name: 'navDiy',
		components: {
			menuDiy
		},
		props: ['showStyle', 'showData', 'showParams', 'domain'],
		data() {
			return {
				// 已选索引
				carouseIndex: 0,
				// 菜单列表
				menuList: [],
				// 轮播图高度
				carouselHeight: 0,
			};
		},
		watch: {
			showData: {
				handler(value) {
					if (value && value.length) {
						this.menuList = this.splitArray(value);
					}
				},
				immediate: true,
				deep: true
			},
			showStyle: {
				handler(value) {
					if (value) {
						let height = 0
						let iconSize = value.iconSize || 44
						let fontSize = value.fontSize || 14
						if (value.rowsLimit) {
							height = `calc(${uni.upx2px(((iconSize + fontSize) * value.rowsLimit + value.itemSpace * (value.rowsLimit - 1)) * 2)}px + ${12 * value.rowsLimit}rpx)`
						}
						this.carouselHeight = height;
					}
				},
				immediate: true,
				deep: true
			},
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			}),
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
		methods: {
			// 轮播图切换
			carouselChange(e) {
				this.carouseIndex = e.detail.current
			},
			// 切割数组
			splitArray(arr) {
				var result = [];
				if (this.showStyle.rowsLimit && this.showStyle.rowsLimit > 0 && arr.length > this.showStyle.rowsNum * this.showStyle.rowsLimit) {
					for (var i = 0; i < arr.length; i += parseInt(this.showStyle.rowsNum * this.showStyle.rowsLimit)) {
						var chunk = arr.slice(i, i + parseInt(this.showStyle.rowsNum * this.showStyle.rowsLimit));
						result.push(chunk);
					}
				} else {
					result[0] = arr
				}
				return result;
			},
			// 点击事件
			onClick(e) {
				if (!e) return;
				this.$emit("onClick", e)
			},
		}
	}
</script>
<style lang="scss">
	.diy-nav {
		.carousel-dots {
			display: flex;
			justify-content: center;
			padding-top: 20px;

			.dots-item {
				width: 24rpx;
				height: 8rpx;
				border-radius: 8rpx;
				background: #F1F1F1;
				margin-right: 4rpx;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>