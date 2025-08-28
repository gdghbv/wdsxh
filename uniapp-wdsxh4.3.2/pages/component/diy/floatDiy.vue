<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会与发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-悬浮按钮 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-float" :style="{right: right, bottom: bottom, opacity: showStyle.opacity / 100}">
		<block v-if="showParams.type == 'service'">
			<button open-type="contact" class="btn-normal">
				<view class="float-icon">
					<image :src="getImagePath(showParams.image)"></image>
				</view>
			</button>
		</block>
		<block v-else>
			<button class="btn-normal" @click="onClick(showParams.link)">
				<view class="float-icon">
					<image :src="getImagePath(showParams.image)"></image>
				</view>
				<!-- #ifdef H5 -->
				<wx-open-launch-weapp class="float-absolute" :appid="showParams.link.appid" :path="showParams.link.path" v-if="showParams.link && showParams.link.type == 'WXMp'">
					<script type="text/wxtag-template">
						<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
							<view class="btn"></view>
						</script>
				</wx-open-launch-weapp>
				<!-- #endif -->
			</button>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'floatDiy',
		props: ['showStyle', 'showParams', 'domain'],
		computed: {
			right() {
				return uni.upx2px(this.showStyle.right * 2) + '%';
			},
			bottom() {
				return uni.upx2px(this.showStyle.bottom * 2) + '%';
			}
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
				if (this.showParams.type != 'link' && !this.showParams.link) return;
				this.$emit("onClick", e)
			},
		}
	}
</script>

<style>
	/* 在线客服 */
	.diy-float {
		position: fixed;
		z-index: 999;
	}

	.diy-float .float-icon {
		padding: 10rpx;
	}

	.diy-float .float-icon image {
		display: block;
		width: 90rpx;
		height: 90rpx;
	}

	.diy-float .float-absolute {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.btn-normal {
		position: relative;
		display: block;
		margin: 0;
		padding: 0;
		line-height: normal;
		background: none;
		border-radius: 0;
		box-shadow: none;
		border: none;
		font-size: unset;
		text-align: unset;
		overflow: visible;
		color: inherit;
	}

	.btn-normal:after {
		border: none;
	}

	.btn-normal.button-hover {
		color: inherit;
	}

	button:after {
		content: none;
		border: none;
	}
</style>