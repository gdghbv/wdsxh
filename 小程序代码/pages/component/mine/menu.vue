<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-按钮组 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-menu" :class="{'vertical-layout': showStyle.layout == 2}" :style="{'row-gap': `${showStyle.itemSpace}px`}">
		<block v-for="(item, index) in showData" :key="index">
			<view class="menu-item" :style="{width: `calc(100% / ${showStyle.rowsNum})`}" @click="onClick(item.link)" v-if="!item.link || item.link.type != 'Service'">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image mode="aspectFit" :src="getImagePath(item.imgUrl)"></image>
				</view>
				<view class="item-space" :style="{width: graphicSpace, height: graphicSpace}"></view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
				<image class="item-icon" src="/static/right.png" mode="aspectFit" :style="{width: fontSize, height: fontSize}"></image>
				<!-- #ifdef H5 -->
				<wx-open-launch-weapp class="item-absolute" :appid="item.link.appid" :path="item.link.path" v-if="item.link && item.link.type == 'WXMp'">
					<script type="text/wxtag-template">
						<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
						<view class="btn"></view>
					</script>
				</wx-open-launch-weapp>
				<!-- #endif -->
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<button class="menu-item clear" open-type="contact" :style="{width: `calc(100% / ${showStyle.rowsNum})`}" v-else-if="item.link.type == 'Service'">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image mode="aspectFit" :src="getImagePath(item.imgUrl)"></image>
				</view>
				<view class="item-space" :style="{width: graphicSpace, height: graphicSpace}"></view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
				<image class="item-icon" src="/static/right.png" mode="aspectFit" :style="{width: fontSize, height: fontSize}"></image>
			</button>
			<!-- #endif -->
		</block>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: 'mineMenu',
		props: ['showStyle', 'showData', 'domain'],
		computed: {
			iconSize() {
				let size = this.showStyle.iconSize || 44
				return uni.upx2px(size * 2) + 'px';
			},
			fontSize() {
				let size = this.showStyle.fontSize || 14
				return uni.upx2px(size * 2) + 'px';
			},
			graphicSpace() {
				return uni.upx2px(this.showStyle.graphicSpace * 2) + 'px';
			},
			itemSpace() {
				return uni.upx2px(this.showStyle.itemSpace * 2) + 'px';
			},
		},
		methods: {
			// 获取图片地址
			getImagePath(url) {
				if (url.indexOf('http') > -1) {
					return url
				} else {
					return this.domain + url
				}
			},
			// 点击事件
			onClick(e) {
				if (!e) return;
				this.$util.openLink(e);
			},
		}
	}
</script>
<style lang="scss">
	.diy-menu {
		display: flex;
		flex-wrap: wrap;

		.menu-item {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0 8rpx;

			.item-image {
				width: 88rpx;
				height: 88rpx;
			}

			.item-text {
				width: 100%;
				line-height: 1.4;
				font-size: 28rpx;
				text-align: center;
			}

			.item-icon {
				display: none;
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

		&.vertical-layout {
			flex-direction: column;
			padding: 0 16px;

			.menu-item {
				flex-direction: row;
				width: 100% !important;
				padding: 0;

				.item-text {
					flex: 1;
					text-align: left;
				}

				.item-icon {
					display: block;
					margin-left: 16rpx;
				}
			}
		}
	}
</style>