<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-会员自定义字段 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-member-custom">
		<block v-for="(item, index) in showData" :key="index" v-if="item.show == 1">
			<!-- 图片 -->
			<view class="custom-item" v-if="item.type == 'image'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-list" v-if="item.value">
					<view class="list-image" v-for="(img, num) in item.value.split(',')" :key="num">
						<image class="image" :src="img" mode="aspectFill" @click="previewImage(index, num)"></image>
					</view>
				</view>
				<view class="item-value" v-else>暂未完善</view>
			</view>
			<!-- 视频 -->
			<view class="custom-item" v-else-if="item.type == 'video'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-video" v-if="item.value">
					<video class="video" :src="item.value" controls></video>
				</view>
				<view class="item-value" v-else>暂未完善</view>
			</view>
			<!-- 证书 -->
			<view class="custom-item" v-else-if="item.type == 'cert'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-image" v-if="item.value">
					<image class="image" :src="item.value" mode="widthFix" @click="previewImage(index)"></image>
				</view>
				<view class="item-value" v-else>暂未完善</view>
			</view>
			<!-- 其他 -->
			<view class="custom-item flex flex-wrap justify-content-between" v-else>
				<view class="item-title">{{item.label}}</view>
				<view class="item-value">{{item.value || "暂未完善"}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "memberCustom",
		props: ["showData"],
		methods: {
			// 预览图片
			previewImage(i, j = 0) {
				let list = []
				if (this.showData[i].type == "cert") {
					list = [this.showData[i].value]
				} else {
					list = this.showData[i].value.split(",")
				}
				uni.previewImage({
					urls: list,
					current: j
				});
			},
		},
	}
</script>

<style lang="scss">
	.component-member-custom {
		.custom-item {
			margin-top: 32rpx;
			padding: 32rpx;
			border-radius: 16rpx;
			background: #ffffff;
			row-gap: 24rpx;
			column-gap: 48rpx;

			.item-title {
				color: #5A5B6E;
				font-size: 30rpx;
				font-weight: 600;
				line-height: 40rpx;
			}

			.item-value {
				color: #5A5B6E;
				font-size: 28rpx;
				line-height: 40rpx;
				word-break: break-all;
			}

			.item-list {
				display: flex;
				flex-wrap: wrap;

				.list-image {
					position: relative;
					width: 31%;
					height: 0;
					padding-top: 31%;
					margin-top: 24rpx;
					margin-right: 3.5%;

					&:nth-child(3n) {
						margin-right: 0;
					}

					.image {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						border-radius: 10rpx;
					}
				}
			}

			.item-video {
				margin-top: 24rpx;

				.video {
					width: 100%;
				}
			}

			.item-image {
				margin-top: 24rpx;

				.image {
					width: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>