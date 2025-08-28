<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商城轮播图 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-carousel" :style="{height: height}">
		<swiper class="carousel-swiper" :style="{'border-radius': radius}" autoplay circular :interval="4000" :duration="800" @change="imgChange">
			<swiper-item v-for="(item, index) in showData" :key="index">
				<view class="swiper-item" :style="{'border-radius': radius}" @click="toDetails(index)">
					<image class="item-thumb" :src="item.image || item" mode="aspectFill"></image>
					<!-- #ifdef H5 -->
					<wx-open-launch-weapp class="item-absolute" :appid="stringifyToParse(item.content).appid" :path="stringifyToParse(item.content).path" v-if="item.jump_type == 4">
						<script type="text/wxtag-template">
							<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
						  <view class="btn"></view>
						</script>
					</wx-open-launch-weapp>
					<!-- #endif -->
				</view>
			</swiper-item>
		</swiper>
		<view class="carousel-dots" :style="{right: right, bottom: bottom, '--theme-color': themeColor}">
			<view class="dots-item" :class="{active: imgIndex == index}" v-for="(item, index) in showData" :key="index"></view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "carouselIndex",
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
				default: "334rpx",
			},
			// 组件圆角
			radius: {
				type: String,
				default: "16rpx",
			},
			// 指示点位置
			right: {
				type: String,
				default: "16rpx",
			},
			// 指示点距底部距离
			bottom: {
				type: String,
				default: "16rpx",
			},
		},
		data() {
			return {
				imgIndex: 0,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			})
		},
		methods: {
			// JSON字符串转对象
			stringifyToParse(str) {
				try {
					return JSON.parse(str)
				} catch (e) {
					return {}
				}
			},
			// 轮播图切换
			imgChange(e) {
				this.imgIndex = e.detail.current
			},
			// 跳转页面
			toDetails(index) {
				if (this.showData[index].jump_type == 1) {
					// 图文
					uni.navigateTo({
						url: "/pages/webview/imageText?type=3&id=" + this.showData[index].id
					})
				} else if (this.showData[index].jump_type == 2) {
					// 内部页面
					this.$util.toPage({
						path: this.showData[index].content,
						mode: 1,
					})
				} else if (this.showData[index].jump_type == 4) {
					// #ifdef MP-WEIXIN
					// 小程序
					this.$util.toPage({
						appId: JSON.parse(this.showData[index].content).appid,
						path: JSON.parse(this.showData[index].content).path,
						mode: 5,
					})
					// #endif
				} else if (this.showData[index].jump_type == 3) {
					// 外部链接
					this.$util.toPage({
						path: this.showData[index].content,
						mode: 4,
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.component-carousel {
		position: relative;
		width: 100%;

		.carousel-swiper {
			width: 100%;
			height: 100%;
			overflow: hidden;

			.swiper-item {
				position: relative;
				width: 100%;
				height: 100%;

				.item-thumb {
					width: 100%;
					height: 100%;
					background-color: #f1f1f1;
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

		.carousel-dots {
			position: absolute;
			z-index: 1;
			display: flex;

			.dots-item {
				width: 24rpx;
				height: 8rpx;
				border-radius: 8rpx;
				background: #FFFFFF;
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