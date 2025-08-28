<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-名片项目 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-card-item" v-if="showData">
		<image class="card-image" :src="showData.card_background_image" mode="aspectFill" v-if="showData.card_background_image"></image>
		<image class="card-avatar" :src="showData.avatar" mode="aspectFill" v-if="showData.avatar && showData.is_hide_avatar != 1"></image>
		<view class="card-name">
			<view class="name" :style="{color: showData.font_color}" v-if="showData.name">{{showData.name}}</view>
			<view class="position" :style="{color: showData.font_color}" v-if="showData.company_position">{{showData.company_position}}</view>
		</view>
		<view class="card-company" :style="{color: showData.font_color}" v-if="showData.company_name">{{showData.company_name}}</view>
		<view class="card-business" :style="{color: showData.font_color}" v-if="showData.main_business">
			<text class="label" :style="{color: showData.font_color}" v-for="(item, index) in stringToArray(showData.main_business)" :key="index">{{item}}</text>
		</view>
		<view class="card-mobile" v-if="showData.mobile">
			<image class="icon" src="/static/card/mobile_w.png" mode="aspectFit" v-if="showData.font_color == '#FFFFFF'"></image>
			<image class="icon" src="/static/card/mobile.png" mode="aspectFit" v-else></image>
			<text class="text" :style="{color: showData.font_color}">{{showData.mobile}}</text>
		</view>
		<view class="card-address" v-if="showData.company_address">
			<image class="icon" src="/static/card/location_w.png" mode="aspectFit" v-if="showData.font_color == '#FFFFFF'"></image>
			<image class="icon" src="/static/card/location.png" mode="aspectFit" v-else></image>
			<text class="text" :style="{color: showData.font_color}">{{showData.company_address}}</text>
		</view>
		<view class="card-association">
			<image class="logo" :src="showData.association.logo" mode="aspectFill"></image>
			<text class="text" :style="{color: showData.font_color}">{{showData.association.name}}</text>
			<text class="text" :style="{color: showData.font_color}">{{showData.member_level_name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "componentCardItem",
		props: ["showData"],
		methods: {
			// 字符串转数组
			stringToArray(value) {
				try {
					if (value) return value.split(',');
					else return []
				} catch (error) {
					return [];
				}
			},
		}
	}
</script>

<style lang="scss">
	.component-card-item {
		position: relative;
		height: 400rpx;

		.card-image {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			border-radius: 16rpx;
		}

		.card-avatar {
			width: 112rpx;
			height: 112rpx;
			border-radius: 16rpx;
			position: absolute;
			top: 32rpx;
			right: 32rpx;
		}

		.card-name {
			position: absolute;
			top: 32rpx;
			left: 32rpx;
			display: flex;
			align-items: flex-end;

			.name {
				color: #FFF;
				font-size: 40rpx;
				font-weight: 600;
				line-height: 56rpx;
			}

			.position {
				margin-left: 18rpx;
				padding-bottom: 4rpx;
				color: #FFF;
				font-size: 24rpx;
				line-height: 34rpx;
			}
		}

		.card-company {
			position: absolute;
			top: 100rpx;
			left: 32rpx;
			color: #FFF;
			font-size: 24rpx;
			line-height: 34rpx;
		}

		.card-business {
			position: absolute;
			top: 158rpx;
			left: 32rpx;
			display: flex;

			.label {
				color: #FFF;
				font-size: 24rpx;
				line-height: 34rpx;
				margin-left: 16rpx;

				&:first-child {
					margin-left: 0;
				}
			}
		}

		.card-mobile {
			position: absolute;
			top: 216rpx;
			left: 32rpx;
			display: flex;
			align-items: center;
			
			.icon {
				width: 24rpx;
				height: 24rpx;
			}

			.text {
				margin-left: 16rpx;
				color: #FFF;
				font-size: 24rpx;
				line-height: 34rpx;
			}
		}

		.card-address {
			position: absolute;
			top: 262rpx;
			left: 32rpx;
			display: flex;
			align-items: center;

			.icon {
				width: 24rpx;
				height: 24rpx;
			}

			.text {
				margin-left: 16rpx;
				color: #FFF;
				font-size: 24rpx;
				line-height: 34rpx;
			}
		}

		.card-association {
			position: absolute;
			bottom: 12rpx;
			left: 32rpx;
			display: flex;
			align-items: center;

			.logo {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}

			.text {
				margin-left: 16rpx;
				color: #FFF;
				font-size: 24rpx;
				line-height: 40rpx;
			}
		}
	}
</style>