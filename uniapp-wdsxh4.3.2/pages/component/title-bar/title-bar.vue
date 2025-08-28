<!-- 组件-标题栏 开发者: 麦沃德科技半夏 -->
<template>
	<!-- #ifdef MP-WEIXIN -->
	<view class="component-title-bar" :style="{background: backgroundColor, position: positionMode}">
		<view class="title-bar-status" :style="{height: statusBarHeight + 'px'}"></view>
		<view class="title-bar-main" :style="{height: titleBarHeight + 'px'}">
			<view class="main-back" v-if="showBack || !isHideBtn" @click="goBack()">
				<image class="icon" src="/static/back.png" mode="aspectFit" v-if="frontColor == 'white'"></image>
				<image class="icon" src="/static/back_b.png" mode="aspectFit" v-else></image>
			</view>
			<view class="main-title">
				<view class="title text-ellipsis" :style="{color: frontColor, fontSize: titleFontSize + 'px'}">{{title}}</view>
			</view>
		</view>
		<view class="title-bar-border" v-if="backgroundColor == '#fff'"></view>
	</view>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<view></view>
	<!-- #endif -->
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: 'titleBar',
		props: {
			// 组件标题
			title: {
				type: String,
				default: ""
			},
			// 组件背景色
			backgroundColor: {
				type: String,
				default: "#fff"
			},
			// 组件文字颜色
			frontColor: {
				type: String,
				default: "black"
			},
			// 是否总是显示返回按钮
			showBack: {
				type: Boolean,
				default: false
			},
			// 定位模式
			positionMode: {
				type: String,
				default: "sticky"
			},
		},
		data() {
			return {
				// 状态栏高度
				statusBarHeight: 0,
				// 标题栏高度
				titleBarHeight: 0,
				// 标题文字尺寸
				titleFontSize: 16,
			}
		},
		computed: {
			...mapState({
				isHideBtn: state => {
					let list = state.app.tabBarList
					let pages = getCurrentPages();
					let isHide = false
					if (pages && pages.length) {
						let currentPath = "/" + pages[pages.length - 1].route;
						if (list.length) {
							for (let i in list) {
								if (currentPath == list[i].path) {
									isHide = true
								}
							}
						}
					}
					return isHide
				},
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let systemInfo = uni.getSystemInfoSync()
			this.titleFontSize = systemInfo.fontSizeSetting || 16
			this.statusBarHeight = systemInfo.statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = (menuButtonInfo.top - this.statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		watch: {
			title: {
				handler(value) {
					// #ifndef MP-WEIXIN
					if (value) {
						uni.setNavigationBarTitle({
							title: value
						});
					}
					// #endif
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 返回上一页
			goBack() {
				if (getCurrentPages().length == 1) {
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					uni.navigateBack()
				}
			},
		},
	}
</script>

<style lang="scss">
	.component-title-bar {
		position: sticky;
		top: 0;
		z-index: 998;
		background: #fff;
		width: 100%;

		.title-bar-status {
			width: 100%;
		}

		.title-bar-main {
			display: flex;
			align-items: center;
			height: 0;
			overflow: hidden;
			padding: 0 25%;

			.main-back {
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				left: 32rpx;

				.icon {
					position: absolute;
					top: 0;
					left: 0;
				}
			}

			.main-title {
				position: relative;
				width: 100%;
				flex: 1;

				.title {
					color: #000000;
					text-align: center;
					font-size: 32rpx;
					line-height: 44rpx;
				}
			}
		}

		.title-bar-border {
			width: 100%;
			height: 1rpx;
			background: #F6F7FB;
			margin-top: -1rpx;
		}
	}
</style>