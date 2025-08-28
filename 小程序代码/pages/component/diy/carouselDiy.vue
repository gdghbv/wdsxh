<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-图片轮播 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-carousel" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<swiper class="carousel-list" autoplay :interval="showParams.interval" :duration="500" circular @change='change' :previous-margin="showParams.type === 'card' ? '120rpx' : '0rpx'" :next-margin="showParams.type === 'card' ? '120rpx' : '0rpx'" :style="{height: height, marginTop:showParams.type === 'card' ? '20rpx' : '0rpx', borderRadius: borderRadius}">
			<swiper-item v-for="(item, index) in showData" :key='index'>
				<button class="list-item clear" :class="[showParams.type != 'card' ? '' : (current == index ? 'crown-active' : 'crown')]" open-type="contact" :style="{width: iconSize, height: iconSize}" v-if="item.link && item.link.type == 'Service'">
					<image class="item-img" :src="getImagePath(item.imgUrl)" :style="{ borderRadius: showParams.type === 'card' ? '10rpx' : '0rpx'}" mode="aspectFill" @click="onClick(item.link)"></image>
				</button>
				<view class="list-item" :class="[showParams.type != 'card' ? '' : (current == index ? 'crown-active' : 'crown')]" v-else>
					<image class="item-img" :src="getImagePath(item.imgUrl)" :style="{ borderRadius: showParams.type === 'card' ? '10rpx' : '0rpx'}" mode="aspectFill" @click="onClick(item.link)"></image>
					<!-- #ifdef H5 -->
					<wx-open-launch-weapp class="item-absolute" :appid="item.link.appid" :path="item.link.path" v-if="item.link && item.link.type == 'WXMp'">
						<script type="text/wxtag-template">
							<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
							<view class="btn"></view>
						</script>
					</wx-open-launch-weapp>
					<!-- #endif -->
				</view>
			</swiper-item>
		</swiper>
		<view class="carousel-dots flex" :style="{paddingBottom: paddingTop}">
			<view class="dots-item" :style="{background: current == i ? (showStyle.dotColor || themeColor) : '#ffffff'}" v-for="(d, i) in showData" :key='i'></view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: 'carouselDiy',
		props: ['showStyle', 'showData', 'showParams', 'domain'],
		data() {
			return {
				current: 0,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			}),
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			height() {
				return uni.upx2px(this.showStyle.height * 2) + 'px';
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
			// 点击事件
			onClick(e) {
				if (!e) return;
				this.$emit("onClick", e)
			},
			// 改变事件
			change(event) {
				this.current = event.detail.current
			}
		}
	}
</script>

<style lang="scss" scoped>
	.diy-carousel {
		position: relative;

		.carousel-list {
			overflow: hidden;

			.list-item {
				position: relative;
				height: 100%;
				transition: 1.2s;

				&.crown {
					transform: scale(0.93, 0.85);
				}

				&.crown-active {
					transform: scale(1);
				}

				.item-img {
					width: 100%;
					height: 100%;
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
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 24rpx;

			.dots-item {
				width: 24rpx;
				height: 8rpx;
				border-radius: 8rpx;
				background: #FFFFFF;
				margin-right: 4rpx;

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>