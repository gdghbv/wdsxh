<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-标题 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-title" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="title-text" :style="{fontSize: fontSize, color: showStyle.color}">
			<text class="italic" v-if="showStyle.fontStyle == 'italic'">{{showParams.title}}</text>
			<text class="bold" v-else-if="showStyle.fontStyle == 'bold'">{{showParams.title}}</text>
			<text v-else>{{showParams.title}}</text>
		</view>
		<button class="title-btn clear" open-type="contact" v-if="showParams.link && showParams.link.type == 'Service'">
			<text :style="{fontSize: btnSize, color: showStyle.btnColor}" v-if="showParams.btnType == 'text'">{{showParams.btnText}}</text>
			<view class="btn" :style="{width: iconSize, height: iconSize, backgroundSize: iconSize, backgroundImage: 'url('+ iconMore +')'}" v-else-if="iconMore && showParams.btnType == 'icon'"></view>
		</button>
		<view class="title-btn" @click="onClick(showParams.link)" v-else>
			<text :style="{fontSize: btnSize, color: showStyle.btnColor}" v-if="showParams.btnType == 'text'">{{showParams.btnText}}</text>
			<view class="btn" :style="{width: iconSize, height: iconSize, backgroundSize: iconSize, backgroundImage: 'url('+ iconMore +')'}" v-else-if="iconMore && showParams.btnType == 'icon'"></view>
			<!-- #ifdef H5 -->
			<wx-open-launch-weapp class="btn-absolute" :appid="showParams.link.appid" :path="showParams.link.path" v-if="showParams.link && showParams.link.type == 'WXMp'">
				<script type="text/wxtag-template">
					<style> .wx-btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
					<view class="wx-btn"></view>
				</script>
			</wx-open-launch-weapp>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	export default {
		name: 'titleDiy',
		props: ['showStyle', 'showParams'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			fontSize() {
				return uni.upx2px(this.showStyle.fontSize * 2) + 'px';
			},
			btnSize() {
				return uni.upx2px(this.showStyle.btnSize * 2) + 'px';
			},
			iconSize() {
				return uni.upx2px(this.showStyle.iconSize * 2) + 'px';
			},
			iconMore() {
				return svgData.svgToUrl("more", this.showStyle.btnColor)
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
		},
		methods: {
			// 点击事件
			onClick(e) {
				if (!e) return;
				this.$emit("onClick", e)
			},
		}
	}
</script>

<style lang="scss">
	.diy-title {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.title-text {
			.italic {
				font-style: italic;
			}

			.bold {
				font-weight: bold;
			}
		}

		.title-btn {
			position: relative;

			.btn-absolute {
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