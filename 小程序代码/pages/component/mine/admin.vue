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
			<!-- 核销活动 -->
			<view class="menu-item" :style="{width: `calc(100% / ${showStyle.rowsNum})`}" @click="toPage(item.type)" v-if="item.type == 'verificationActivity' && userInfo.is_verifying == 1">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image mode="aspectFit" :src="getImagePath(item.imgUrl)"></image>
				</view>
				<view class="item-space" :style="{width: graphicSpace, height: graphicSpace}"></view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
				<image class="item-icon" src="/static/right.png" mode="aspectFit" :style="{width: fontSize, height: fontSize}"></image>
			</view>
			<!-- 审核会员 -->
			<view class="menu-item" :style="{width: `calc(100% / ${showStyle.rowsNum})`}" @click="toPage(item.type)" v-else-if="item.type == 'examineMember' && userInfo.set_admin == 1">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image class="image" mode="aspectFit" :src="getImagePath(item.imgUrl)"></image>
					<view class="count" v-if="userInfo && parseInt(userInfo.member_apply_count) > 0">{{parseInt(userInfo.member_apply_count) > 99 ? '99+' : userInfo.member_apply_count}}</view>
				</view>
				<view class="item-space" :style="{width: graphicSpace, height: graphicSpace}"></view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
				<view class="item-count" v-if="userInfo && parseInt(userInfo.member_apply_count) > 0">{{parseInt(userInfo.member_apply_count) > 99 ? '99+' : userInfo.member_apply_count}}</view>
				<image class="item-icon" src="/static/right.png" mode="aspectFit" :style="{width: fontSize, height: fontSize}"></image>
			</view>
			<!-- 消息订阅 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="menu-item" :style="{width: `calc(100% / ${showStyle.rowsNum})`}" @click="toPage(item.type)" v-else-if="item.type == 'subscribeMessage' && userInfo.set_admin == 1">
				<view class="item-image" :style="{width: iconSize, height: iconSize}">
					<image class="image" mode="aspectFit" :src="getImagePath(item.imgUrl)"></image>
				</view>
				<view class="item-space" :style="{width: graphicSpace, height: graphicSpace}"></view>
				<view class="item-text text-ellipsis" :style="{color: showStyle.textColor, fontSize: fontSize}">{{ item.text }}</view>
				<image class="item-icon" src="/static/right.png" mode="aspectFit" :style="{width: fontSize, height: fontSize}"></image>
			</view>
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
			...mapState({
				userInfo: state => state.user.userInfo,
				adminStatus: state => {
					let status = false
					if (state.user.userInfo.is_verifying == 1) {
						status = true
					}
					if (state.user.userInfo.set_admin == 1) {
						status = true
					}
					return status
				},
				adminCount: state => {
					return {
						member_apply_count: state.user.userInfo.member_apply_count || 0
					}
				},
			}),
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
			// 跳转页面
			toPage(type) {
				var path = ""
				if (type == "subscribeMessage") {
					path = "/pages/mine/subscribe/index"
				} else if (type == "verificationActivity") {
					path = "/pagesActivity/verification/index"
				} else if (type == "examineMember") {
					path = "/pagesAdmin/examine/index"
				}
				this.$util.toPage({
					mode: 1,
					path: path,
				})
			}
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
					line-height: 28rpx;
					padding: 0 8rpx;
					min-width: 28rpx;
					background: #FF4646;
					border-radius: 28rpx;
				}
			}

			.item-text {
				width: 100%;
				line-height: 1.4;
				font-size: 28rpx;
				text-align: center;
			}

			.item-count {
				display: none;
			}

			.item-icon {
				display: none;
			}
		}

		&.vertical-layout {
			flex-direction: column;
			padding: 0 16px;

			.menu-item {
				flex-direction: row;
				width: 100% !important;
				padding: 0;

				.item-image .count {
					display: none;
				}

				.item-text {
					flex: 1;
					text-align: left;
				}

				.item-count {
					display: block;
					color: #FFF;
					text-align: center;
					font-size: 20rpx;
					line-height: 28rpx;
					padding: 0 8rpx;
					min-width: 28rpx;
					background: #FF4646;
					border-radius: 28rpx;
					margin-left: 16rpx;
				}

				.item-icon {
					display: block;
					margin-left: 16rpx;
				}
			}
		}
	}
</style>