<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-单图组 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-images" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="item-image" v-for="(item, index) in showData" :key="index" :style="{paddingTop: paddingTop}">
			<button class="clear" open-type="contact" v-if="item.link && item.link.type == 'Service'">
				<image :src="getImagePath(item.imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
			</button>
			<block v-else>
				<image :src="getImagePath(item.imgUrl)" mode="widthFix" @click="onClick(item.link)" :style="{borderRadius: borderRadius}"></image>
				<!-- #ifdef H5 -->
				<wx-open-launch-weapp class="item-absolute" :appid="item.link.appid" :path="item.link.path" v-if="item.link && item.link.type == 'WXMp'">
					<script type="text/wxtag-template">
						<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
							<view class="btn"></view>
						</script>
				</wx-open-launch-weapp>
				<!-- #endif -->
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'imagesDiy',
		props: ['showStyle', 'showData', 'domain'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
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
			// 跳转
			onClick(e) {
				if (!e) return;
				this.$emit("onClick", e)
			},
		}
	}
</script>

<style lang="scss">
	.diy-images {
		.item-image {
			position: relative;

			&:first-child {
				padding-top: 0 !important;
			}

			image {
				display: block;
				width: 100%;
			}
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
</style>