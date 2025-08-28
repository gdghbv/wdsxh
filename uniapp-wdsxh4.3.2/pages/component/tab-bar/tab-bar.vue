<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-底部导航 开发者: 麦沃德科技-半夏  
+---------------------------------------------------------------------- -->

<template>
	<view class="component-tab-bar" v-if="tabBarList && tabBarList.length">
		<view class="tab-bar-main" :style="{'--theme-color': themeColor}">
			<view class="main-item wbcentre" v-for="(item, index) in tabBarList" :key="index" @click="tabBarPages(item.path)">
				<image class="item-img" :src="item.selicon" mode="aspectFit" @click.stop="tabBarPages(item.path)" v-if="item.path == currentPath"></image>
				<image class="item-img" :src="item.icon" mode="aspectFit" @click.stop="tabBarPages(item.path)" v-else></image>
				<view class="item-text" :class="{active: item.path == currentPath}" @click.stop="tabBarPages(item.path)">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "tabBar",
		data() {
			return {
				// 当前页面路径
				currentPath: ""
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				tabBarList: state => {
					let list = state.app.tabBarList
					let pages = getCurrentPages();
					let isShow = false
					if (pages && pages.length) {
						let currentPath = "/" + pages[pages.length - 1].route;
						if (list.length) {
							for (let i in list) {
								if (currentPath == list[i].path) {
									isShow = true
									// #ifdef MP-WEIXIN
									wx.hideHomeButton();
									// #endif
								}
							}
						}
					}
					if (!isShow) list = []
					return list
				},
			})
		},
		mounted() {
			let pages = getCurrentPages();
			this.currentPath = "/" + pages[pages.length - 1].route;
		},
		methods: {
			// 跳转底部导航
			tabBarPages(path) {
				if (path == this.currentPath) return
				this.$util.toPage({
					path: path,
					mode: 3
				})
			},
		}
	}
</script>

<style lang="scss">
	.component-tab-bar {
		width: 100%;
		height: 126rpx;

		.tab-bar-main {
			background: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 998;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			display: flex;
			justify-content: space-around;
			border-top: 2rpx solid #F6F7FB;

			.main-item {
				flex: 1;
				height: 124rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.item-img {
					width: 56rpx;
					height: 56rpx;
					margin: 0 auto;
				}

				.item-text {
					font-size: 24rpx;
					color: #333;
					margin-top: 4rpx;
					text-align: center;

					&.active {
						color: var(--theme-color);
					}
				}
			}
		}
	}
</style>