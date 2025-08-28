	<!-- +----------------------------------------------------------------------
	| 麦沃德科技赋能开发者，助力商协会发展 
	+----------------------------------------------------------------------
	| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
	+----------------------------------------------------------------------
	| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
	+----------------------------------------------------------------------
	| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
	+----------------------------------------------------------------------
	| 组件-图片魔方 开发者: 麦沃德科技-半夏 
	+---------------------------------------------------------------------- -->

	<template>
		<view class="diy-cube" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
			<!-- 橱窗布局 -->
			<view class="cube-display" v-if="showStyle.layout == -1 ">
				<view class="display-left" :style="{width: showStyle.imgWidth + '%', paddingReft: itemSpace}" v-if="showStyle.imgFloat == 'left'">
					<button class="clear" open-type="contact" v-if="showData[0].link && showData[0].link.type == 'Service'">
						<image class="image" :src="getImagePath(showData[0].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
					</button>
					<block v-else>
						<image class="image" @click="onClick(showData[0].link)" :src="getImagePath(showData[0].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
						<!-- #ifdef H5 -->
						<wx-open-launch-weapp class="diy-cube-absolute" :appid="showData[0].link.appid" :path="showData[0].link.path" v-if="showData[0].link && showData[0].link.type == 'WXMp'">
							<script type="text/wxtag-template">
								<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
								<view class="btn"></view>
							</script>
						</wx-open-launch-weapp>
						<!-- #endif -->
					</block>
				</view>
				<view class="display-right" :style="'width:' + (100 - showStyle.imgWidth) + '%; ' + (showStyle.imgFloat == 'right' ? ('padding-right:' + itemSpace) : ('padding-left:' + itemSpace))" v-if="showStyle.model == 1">
					<view class="right-1" v-if="showData.length >= 2" :style="{paddingBottom: itemSpace}">
						<button class="clear" open-type="contact" v-if="showData[1].link && showData[1].link.type == 'Service'">
							<image class="image" :src="getImagePath(showData[1].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
						</button>
						<block v-else>
							<image class="image" @click="onClick(showData[1].link)" :src="getImagePath(showData[1].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
							<!-- #ifdef H5 -->
							<wx-open-launch-weapp class="diy-cube-absolute" :appid="showData[1].link.appid" :path="showData[1].link.path" v-if="showData[1].link && showData[1].link.type == 'WXMp'">
								<script type="text/wxtag-template">
									<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
									<view class="btn"></view>
								</script>
							</wx-open-launch-weapp>
							<!-- #endif -->
						</block>
					</view>
					<view class="right-2" :style="{paddingTop: itemSpace}">
						<view class="right-2-left" v-if="showData.length >= 3" :style="{paddingRight: itemSpace}">
							<button class="clear" open-type="contact" v-if="showData[2].link && showData[2].link.type == 'Service'">
								<image class="image" :src="getImagePath(showData[2].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
							</button>
							<block v-else>
								<image class="image" @click="onClick(showData[2].link)" :src="getImagePath(showData[2].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
								<!-- #ifdef H5 -->
								<wx-open-launch-weapp class="diy-cube-absolute" :appid="showData[2].link.appid" :path="showData[2].link.path" v-if="showData[2].link && showData[2].link.type == 'WXMp'">
									<script type="text/wxtag-template">
										<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
										<view class="btn"></view>
									</script>
								</wx-open-launch-weapp>
								<!-- #endif -->
							</block>
						</view>
						<view class="right-2-right" v-if="showData.length >= 4" :style="{paddingLeft: itemSpace}">
							<button class="clear" open-type="contact" v-if="showData[3].link && showData[3].link.type == 'Service'">
								<image class="image" :src="getImagePath(showData[3].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
							</button>
							<block v-else>
								<image class="image" @click="onClick(showData[3].link)" :src="getImagePath(showData[3].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
								<!-- #ifdef H5 -->
								<wx-open-launch-weapp class="diy-cube-absolute" :appid="showData[3].link.appid" :path="showData[3].link.path" v-if="showData[3].link && showData[3].link.type == 'WXMp'">
									<script type="text/wxtag-template">
										<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
										<view class="btn"></view>
									</script>
								</wx-open-launch-weapp>
								<!-- #endif -->
							</block>
						</view>
					</view>
				</view>
				<view class="display-right" :style="'width:' + (100 - showStyle.imgWidth) + '%; ' + (showStyle.imgFloat == 'right' ? ('padding-right:' + itemSpace) : ('padding-left:' + itemSpace))" v-else>
					<view class="right-3" :style="{margin: '-' + itemSpace + ' 0', height: `calc(100% + ${itemSpace} + ${itemSpace})`}">
						<view class="item" v-for="(img, num) in showData" :key="num" v-if="num > 0 && num < 4" :style="{height:`calc(100% / ${showData.length > 4 ? 3 : showData.length - 1})`, padding: itemSpace + ' 0'}">
							<button class="clear" open-type="contact" v-if="img.link && img.link.type == 'Service'">
								<image class="image" :src="getImagePath(img.imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
							</button>
							<block v-else>
								<image class="image" @click="onClick(img.link)" :src="getImagePath(img.imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
								<!-- #ifdef H5 -->
								<wx-open-launch-weapp class="diy-cube-absolute" :appid="img.link.appid" :path="img.link.path" v-if="img.link && img.link.type == 'WXMp'">
									<script type="text/wxtag-template">
										<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
										<view class="btn"></view>
									</script>
								</wx-open-launch-weapp>
								<!-- #endif -->
							</block>
						</view>
					</view>
				</view>
				<view class="display-left" :style="{width: showStyle.imgWidth + '%', paddingLeft: itemSpace}" v-if="showStyle.imgFloat == 'right'">
					<button class="clear" open-type="contact" v-if="showData[0].link && showData[0].link.type == 'Service'">
						<image class="image" :src="getImagePath(showData[0].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
					</button>
					<block v-else>
						<image class="image" @click="onClick(showData[0].link)" :src="getImagePath(showData[0].imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
						<!-- #ifdef H5 -->
						<wx-open-launch-weapp class="diy-cube-absolute" :appid="showData[0].link.appid" :path="showData[0].link.path" v-if="showData[0].link && showData[0].link.type == 'WXMp'">
							<script type="text/wxtag-template">
								<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
								<view class="btn"></view>
							</script>
						</wx-open-launch-weapp>
						<!-- #endif -->
					</block>
				</view>
			</view>
			<!-- 分列布局 -->
			<view class="cube-list" :style="{margin: '-' + itemSpace}" v-else>
				<view class="list-item" :style="{width: `calc(100% / ${showStyle.layout})`, padding: itemSpace}" v-for="(item, index) in showData" :key="index">
					<button class="clear" open-type="contact" v-if="item.link && item.link.type == 'Service'">
						<image :src="getImagePath(item.imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}"></image>
					</button>
					<block v-else>
						<image :src="getImagePath(item.imgUrl)" mode="widthFix" :style="{borderRadius: borderRadius}" @click="onClick(item.link)"></image>
						<!-- #ifdef H5 -->
						<wx-open-launch-weapp class="diy-cube-absolute" :appid="item.link.appid" :path="item.link.path" v-if="item.link && item.link.type == 'WXMp'">
							<script type="text/wxtag-template">
								<style> .btn { position: absolute; top: 0; left: 0; right: 0; bottom: 0; } </style>
								<view class="btn"></view>
							</script>
						</wx-open-launch-weapp>
						<!-- #endif -->
					</block>
				</view>
			</view>
		</view>
	</template>

	<script>
		export default {
			name: 'cubeDiy',
			props: ['showStyle', 'showData', 'domain'],
			computed: {
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
				itemSpace() {
					return uni.upx2px(this.showStyle.itemSpace) + 'px';
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
			}
		}
	</script>

	<style lang="scss">
		.diy-cube {
			overflow: hidden;

			.cube-list {
				display: flex;
				flex-wrap: wrap;

				.list-item {
					position: relative;
					width: 100%;
					height: 100%;
				}
			}

			.cube-display {
				width: 100%;
				display: flex;
				align-items: center;

				.display-left {
					width: 50%;
					height: 100%;
					position: relative;
				}

				.display-right {
					width: auto;
					height: 100%;
					display: flex;
					flex-direction: column;

					.right-1 {
						width: 100%;
						height: 50%;
						position: relative;
					}

					.right-2 {
						width: 100%;
						height: 50%;
						display: flex;

						.right-2-left {
							position: relative;
							width: 50%;
							height: 100%;
						}

						.right-2-right {
							position: relative;
							width: 50%;
							height: 100%;
						}
					}

					.right-3 {
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: column;

						.item {
							position: relative;
							width: 100%;
							flex: 1;
						}
					}
				}
			}

			.diy-cube-absolute {
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
	</style>