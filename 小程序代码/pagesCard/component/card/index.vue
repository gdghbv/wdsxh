<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-名片列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-card" :style="{'--theme-color': themeColor}">
		<view class="card-item" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<view class="item-image">
				<card-item :show-data="item"></card-item>
				<view class="image-btn" @click.stop="handleEdit(item.id)">
					<image class="icon" src="/static/card/edit.png" mode="aspectFit"></image>
					<text class="text">编辑名片</text>
				</view>
			</view>
			<view class="item-bottom">
				<view class="bottom-default" @click.stop="setDefaultCard(item.id, item.is_default)">
					<view class="default-label">默认名片</view>
					<view class="default-switch" :class="{'active': item.is_default == 1}">
						<view class="switch-round"></view>
					</view>
				</view>
				<button open-type="share" class="bottom-render" @click.stop="setShareData(item)">
					<view class="render-icon">
						<image src="/static/card/render.png" mode="aspectFit"></image>
					</view>
					<view class="render-text">递交名片</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import cardItem from "./item.vue"
	export default {
		name: "componentCard",
		props: ["showData"],
		components: {
			cardItem,
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 前往详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/details?id=" + id
				})
			},
			// 前往编辑
			handleEdit(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/edit?id=" + id
				})
			},
			// 设置分享数据
			setShareData(item) {
				this.$emit('setShareData', {
					id: item.id,
					share_title: item.share_title,
					image: item.image,
				})
			},
			// 设置默认名片
			setDefaultCard(id, status) {
				if (status == 1) return
				uni.showLoading({
					mask: true,
					title: "加载中",
				})
				this.$util.request("card.setDefault", {
					id: id,
					is_default: 1,
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.$emit('getList', () => { uni.hideLoading() })
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('设置默认名片 ', error)
				})
			},
		},
	}
</script>

<style lang="scss">
	.component-card {
		.card-item {
			background: #FFF;
			margin-top: 32rpx;

			&:first-child {
				margin-top: 0;
			}

			.item-image {
				position: relative;
				border-radius: 16rpx;
				overflow: hidden;

				.image-btn {
					position: absolute;
					right: 0;
					bottom: 0;
					display: flex;
					align-items: center;
					padding: 14rpx 16rpx;
					border-radius: 16rpx 0;
					background: var(--theme-color);

					.icon {
						width: 32rpx;
						height: 32rpx;
					}

					.text {
						margin-left: 8rpx;
						color: #FFF;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}

			.item-bottom {
				padding: 20rpx 32rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bottom-default {
					display: flex;
					align-items: center;

					.default-label {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-right: 16rpx;
					}

					.default-switch {
						width: 80rpx;
						height: 40rpx;
						padding: 3rpx;
						background: #D9D9D9;
						border-radius: 20rpx;
						transition: all .3s;

						.switch-round {
							width: 34rpx;
							height: 34rpx;
							border-radius: 50%;
							background: #fff;
							margin-left: 0;
							transition: all .3s;
						}

						&.active {
							background: var(--theme-color);

							.switch-round {
								margin-left: calc(100% - 34rpx);
							}
						}
					}
				}

				.bottom-render {
					display: flex;
					align-items: center;
					padding: 0;
					margin: 0;
					border: none;
					background: transparent;
					line-height: 1.3;

					&::after {
						display: none;
					}

					.render-icon {
						width: 28rpx;
						height: 28rpx;
						border-radius: 8rpx;
						overflow: hidden;
						background: var(--theme-color);
					}

					.render-text {
						margin-left: 8rpx;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}
			}
		}
	}
</style>