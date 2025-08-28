<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-轮播菜单 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-menu-carousel" v-if="menuList && menuList.length">
		<block v-if="menuList.length === 1">
			<menu-nav :show-data="menuList[0]" :row-number="rowNumber" :icon-size="iconSize" :font-size="fontSize" :line-height="lineHeight" :font-color="fontColor" :space="space" :margin-top="marginTop" @toPage="toPage"></menu-nav>
		</block>
		<block v-else>
			<swiper class="carousel-swiper" :style="{height: height}" @change="carouselChange">
				<swiper-item v-for="(item, index) in menuList" :key="index">
					<menu-nav :show-data="item" :row-number="rowNumber" :icon-size="iconSize" :font-size="fontSize" :line-height="lineHeight" :font-color="fontColor" :space="space" :margin-top="marginTop" @toPage="toPage"></menu-nav>
				</swiper-item>
			</swiper>
			<view class="carousel-dots" :style="{'--theme-color': themeColor}">
				<view class="dots-item" :class="{active: carouseIndex == index}" v-for="(item, index) in menuList" :key="index"></view>
			</view>
		</block>
	</view>
</template>

<script>
	import menuNav from "@/pages/component/menu/menu.vue"
	import { mapState } from "vuex"
	export default {
		name: "menuCarousel",
		components: {
			menuNav,
		},
		props: {
			// 组件内容
			showData: {
				type: Array,
				default () {
					return []
				}
			},
			// 组件高度
			height: {
				type: String,
				default: "390rpx",
			},
			// 每排数量
			rowNumber: {
				type: Number,
				default: 4,
			},
			// 图标尺寸
			iconSize: {
				type: String,
				default: "96rpx",
			},
			// 文字尺寸
			fontSize: {
				type: String,
				default: "28rpx",
			},
			// 文字行高
			lineHeight: {
				type: String,
				default: "40rpx",
			},
			// 文字颜色
			fontColor: {
				type: String,
				default: "#5A5B6E",
			},
			// 图文间隔
			space: {
				type: String,
				default: "16rpx",
			},
			// 上下间隔
			marginTop: {
				type: String,
				default: "32rpx",
			},
		},
		data() {
			return {
				// 已选索引
				carouseIndex: 0,
				// 菜单列表
				menuList: [],
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
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 轮播图切换
			carouselChange(e) {
				this.carouseIndex = e.detail.current
			},
			// 切割数组
			splitArray(arr) {
				var result = [];
				for (var i = 0; i < arr.length; i += 8) {
					var chunk = arr.slice(i, i + 8);
					result.push(chunk);
				}
				return result;
			},
			// 跳转详情
			toPage(item) {
				this.$emit("toPage", item)
			},
		},
	}
</script>

<style lang="scss">
	.component-menu-carousel {
		position: relative;
		width: 100%;

		.carousel-swiper {
			box-sizing: border-box;
			width: 100%;
			overflow: hidden;

			.swiper-item {
				width: 100%;
				height: 100%;

				.item-thumb {
					width: 100%;
					height: 100%;
					background-color: #f1f1f1;
				}
			}
		}

		.carousel-dots {
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			z-index: 1;

			.dots-item {
				width: 24rpx;
				height: 8rpx;
				border-radius: 8rpx;
				background: #F1F1F1;
				margin-right: 4rpx;

				&:last-child {
					margin-right: 0;
				}

				&.active {
					background: var(--theme-color);
				}
			}
		}
	}
</style>