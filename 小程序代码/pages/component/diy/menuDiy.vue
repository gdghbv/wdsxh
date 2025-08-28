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
	<view class="diy-menu">
		<block v-for="(item, index) in showData" :key="index">
			<button class="menu-item clear" open-type="contact" :style="{marginTop: (index >= parseInt(showStyle.rowsNum) ? itemSpace : 0), width: `calc(100% / ${showStyle.rowsNum})`}" v-if="item.link && item.link.type == 'Service'">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image mode="widthFix" :src="getImagePath(item.imgUrl)" :style="{borderRadius: borderRadius}"></image>
				</view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
			</button>
			<view class="menu-item" :style="{marginTop: (index >= parseInt(showStyle.rowsNum) ? itemSpace : 0), width: `calc(100% / ${showStyle.rowsNum})`}" @click="onClick(item.link, item.text)" v-else>
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image mode="widthFix" :src="getImagePath(item.imgUrl)" :style="{borderRadius: borderRadius}"></image>
				</view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
				<!-- #ifdef H5 -->
				<wx-open-launch-weapp class="item-absolute" :appid="item.link.appid" :path="item.link.path" v-if="item.link && item.link.type == 'WXMp'">
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
	export default {
		name: 'menuDiy',
		props: ['showStyle', 'showData', 'domain'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			iconSize() {
				let size = this.showStyle.iconSize || 44
				return uni.upx2px(size * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
			},
			fontSize() {
				let size = this.showStyle.fontSize || 14
				return uni.upx2px(size * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
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
			onClick(e, title) {
				if (!e) return;
				if (e.type == "Custom" && e.path.indexOf('/pages/article/index') > -1) {
					if (e.path.indexOf("?") > -1) e.path += "&title=" + title
					else e.path += "?title=" + title
				}
				this.$emit("onClick", e)
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

			.item-image {
				width: 88rpx;
				height: 88rpx;
				margin-bottom: 12rpx;
			}

			.item-text {
				width: 100%;
				line-height: 1;
				font-size: 28rpx;
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