<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-菜单 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-menu flex flex-wrap">
		<block v-for="(item, index) in showData" :key="index" @click="toPage(index)">
			<button class="menu-item clear" open-type="contact" :style="{width: (parseFloat(100 / rowNumber).toFixed(2) + '%'), marginTop: (index < rowNumber ? 0 : marginTop)}" v-if="item.info == 'contact'">
				<image :src="item.icon" :style="{width: iconSize, height: iconSize}" mode="aspectFit"></image>
				<text class="text-ellipsis" :style="{fontSize: fontSize, color: fontColor, lineHeight: lineHeight, marginTop: space}">{{item.name}}</text>
			</button>
			<view class="menu-item" :style="{width: (parseFloat(100 / rowNumber).toFixed(2) + '%'), marginTop: (index < rowNumber ? 0 : marginTop)}" @click="toPage(index)" v-else>
				<view class="item-icon" :style="{width: iconSize, height: iconSize}">
					<image :src="item.icon" mode="aspectFit"></image>
					<view class="count" :style="{background: themeColor}" v-if="item.count && parseInt(countData[item.count]) > 0">{{parseInt(countData[item.count]) > 99 ? '99+' : countData[item.count]}}</view>
				</view>
				<text class="text-ellipsis" :style="{fontSize: fontSize, color: fontColor, lineHeight: lineHeight, marginTop: space}">{{item.name}}</text>
				<!-- #ifdef H5 -->
				<wx-open-launch-weapp class="item-absolute" :appid="item.content.appid" :path="item.content.path" v-if="item.skip_type == 3">
					<script type="text/wxtag-template">
						<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
					  <view class="btn"></view>
					</script>
				</wx-open-launch-weapp>
				<!-- #endif -->
			</view>
		</block>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "menuIndex",
		props: {
			// 组件内容
			showData: {
				type: Array,
				default () {
					return []
				}
			},
			// 组件数量
			countData: {
				type: Object,
				default () {
					return {}
				}
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
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			toPage(index) {
				// #ifdef H5
				if (this.showData[index].skip_type == 3) return
				// #endif
				if (this.showData[index].info) {
					this.$util.toPage(this.showData[index].info)
				} else {
					this.$emit("toPage", this.showData[index])
				}
			}
		},
	}
</script>

<style lang="scss">
	.component-menu {
		.menu-item {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: transparent;
			border-radius: 0;
			padding: 0;

			.item-icon {
				position: relative;

				.count {
					position: absolute;
					top: -8rpx;
					left: 50%;
					margin-left: 16rpx;
					color: #FFF;
					text-align: center;
					font-size: 24rpx;
					line-height: 32rpx;
					padding: 0 8rpx;
					min-width: 32rpx;
					border-radius: 32rpx;
				}
			}

			text {
				width: 100%;
				padding: 0 8rpx;
				box-sizing: border-box;
				text-align: center;
			}

			.item-absolute {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
	}
</style>