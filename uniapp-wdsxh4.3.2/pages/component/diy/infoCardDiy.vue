<!-- +----------------------------------------------------------------------
	| 麦沃德科技赋能开发者，助力商协会发展 
	+----------------------------------------------------------------------
	| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
	+----------------------------------------------------------------------
	| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
	+----------------------------------------------------------------------
	| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
	+----------------------------------------------------------------------
	| 组件-信息卡片 开发者: 麦沃德科技-半夏 
	+---------------------------------------------------------------------- -->

<template>
	<view class="diy-info-card" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<image class="card-image" mode="aspectFill" :src="getImagePath(showParams.image)" :style="{borderRadius: borderRadius}"></image>
		<view class="card-box">
			<view class="title">{{showParams.title}}</view>
			<view class="content">{{showParams.content}}</view>
			<button class="btn clear" open-type="contact" :style="{background: showStyle.btnBackground, borderRadius: btnBorderRadius, color: showStyle.btnColor}" v-if="showParams.link && showParams.link.type == 'Service'">{{showParams.btnTxt}}</button>
			<view class="btn" @click="onClick(showParams.link)" :style="{background: showStyle.btnBackground, borderRadius: btnBorderRadius, color: showStyle.btnColor}" v-else>
				<text>{{showParams.btnTxt}}</text>
				<!-- #ifdef H5 -->
				<wx-open-launch-weapp class="absolute" :appid="showParams.link.appid" :path="showParams.link.path" v-if="showParams.link && showParams.link.type == 'WXMp'">
					<script type="text/wxtag-template">
						<style> .wx-btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
							<view class="wx-btn"></view>
						</script>
				</wx-open-launch-weapp>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'infoCardDiy',
		props: ['showStyle', 'showParams', 'domain'],
		computed: {
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
			},
			btnBorderRadius() {
				return uni.upx2px(this.showStyle.btnBorderRadius * 2) + 'px';
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
			onClick(e) {
				if (!e) return;
				this.$emit("onClick", e)
			},
		}
	}
</script>

<style lang="scss">
	.diy-info-card {
		display: flex;

		.card-image {
			width: 200rpx;
			height: 200rpx;
		}

		.card-box {
			flex: 1;
			overflow: hidden;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;

			.title {
				width: 100%;
				font-size: 28rpx;
				line-height: 1.3;
				font-weight: 700;
				color: #333;
			}

			.content {
				width: 100%;
				font-size: 24rpx;
				line-height: 1.4;
				margin: 16rpx 0;
				color: #333;
				word-wrap: normal;
				display: -webkit-box;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.btn {
				position: relative;
				width: auto;
				height: auto;
				display: inline-block;
				padding: 0 28rpx;
				font-size: 24rpx;
				line-height: 54rpx;
				text-align: center;

				.absolute {
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}
			}
		}
	}
</style>