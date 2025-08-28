<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-订单菜单 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->
<template>
	<view class="component-menu-order">
		<view class="order-cloumn" :style="{width: (100 / showData.length) + '%'}" v-for="(item, index) in showData" :key="index">
			<view class="cloumn-item" @click="toPage(item.type)">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image class="image" :src="getImagePath(item.imgUrl)" mode="aspectFit" v-if="item.imgUrl"></image>
					<view class="count" v-if="parseInt(getOrderNumber(item.type)) > 0">{{parseInt(getOrderNumber(item.type)) > 99 ? '99+' : getOrderNumber(item.type)}}</view>
				</view>
				<view class="item-text" :style="{fontSize: fontSize, color: showStyle.textColor, marginTop: graphicSpace}">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "mineOrder",
		props: ['showStyle', 'showData', 'domain'],
		computed: {
			...mapState({
				orderInfo: state => state.user.userInfo.order || {},
			}),
			iconSize() {
				return uni.upx2px(this.showStyle.iconSize * 2) + 'px';
			},
			fontSize() {
				return uni.upx2px(this.showStyle.fontSize * 2) + 'px';
			},
			graphicSpace() {
				return uni.upx2px(this.showStyle.graphicSpace * 2) + 'px';
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
			// 获取该状态的订单数量
			getOrderNumber(type) {
				if (type == 1) {
					return this.orderInfo.unpaid_count || 0
				} else if (type == 2) {
					return this.orderInfo.to_be_shipped_count || 0
				} else if (type == 3) {
					return this.orderInfo.to_be_received_count || 0
				} else if (type == 4) {
					return this.orderInfo.refund_count || 0
				}
				return 0
			},
			// 跳转页面
			toPage(type) {
				var path = ""
				if (type == 1) {
					path = "/pagesMall/order/index?id=1"
				} else if (type == 2) {
					path = "/pagesMall/order/index?id=2"
				} else if (type == 3) {
					path = "/pagesMall/order/index?id=3"
				} else if (type == 4) {
					path = "/pagesMall/refund/index"
				}
				this.$util.toPage({
					mode: 1,
					path: path,
				})
			}
		},
	}
</script>

<style lang="scss">
	.component-menu-order {
		width: 100%;
		display: flex;

		.order-cloumn {
			width: 25%;

			.cloumn-item {
				margin: 0 auto;
				position: relative;

				.item-image {
					margin: 0 auto;
					position: relative;

					.image {
						width: 100%;
						height: 100%;
					}

					.count {
						position: absolute;
						top: -12rpx;
						right: -16rpx;
						color: #FFF;
						text-align: center;
						font-size: 20rpx;
						line-height: 26rpx;
						padding: 0 8rpx;
						min-width: 26rpx;
						background: #FF4646;
						border-radius: 26rpx;
					}
				}

				.item-text {
					text-align: center;
					line-height: 1.4;
					color: #5A5B6E;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
				}
			}
		}
	}
</style>