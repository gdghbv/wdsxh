<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 名片详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="名片详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-card">
				<card-item :show-data="cardDetails"></card-item>
			</view>
			<view class="main-record" v-if="cardDetails.visitor_count > 0">
				<view class="record-title">
					<view class="title">访客记录</view>
					<view class="label">已有{{cardDetails.visitor_count}}人访问</view>
				</view>
				<view class="record-list">
					<view class="list-item" v-for="(item, index) in cardDetails.visitor_list" :key="index">
						<image class="item-avatar" :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="list-item" v-if="cardDetails.visitor_count > 23">
						<view class="item-more">
							<view class="point"></view>
							<view class="point"></view>
							<view class="point"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="main-introduce">
				<view class="introduce-title">公司介绍</view>
				<view class="introduce-content">
					<mp-html :content="cardDetails.company_introduction || '暂未完善'"></mp-html>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import cardItem from "../component/card/item.vue"
	export default {
		components: {
			cardItem,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 名片id
				cardId: null,
				// 名片信息
				cardDetails: {},
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.cardId = option.id
			this.getCardDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onShareAppMessage() {
			return {
				title: this.cardDetails.share_title,
				path: "/pagesCard/card/details?id=" + this.cardDetails.id,
				imageUrl: this.cardDetails.image,
			}
		},
		onShareTimeline() {
			return {
				title: this.cardDetails.share_title,
				path: "/pagesCard/card/details?id=" + this.cardDetails.id,
				imageUrl: this.cardDetails.image,
			}
		},
		methods: {
			// 获取名片详情
			getCardDetails(fn) {
				this.$util.request("card.details", {
					id: this.cardId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.cardDetails = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取名片详情 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-record {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.record-title {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.label {
						color: var(--theme-color);
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.record-list {
					padding-top: 8rpx;
					margin-left: -2rpx;
					display: flex;
					flex-wrap: wrap;

					.list-item {
						width: calc((100% / 12) - 4rpx);
						height: 0;
						padding-top: calc((100% / 12) - 4rpx);
						border-radius: 50%;
						overflow: hidden;
						position: relative;
						margin-left: 4rpx;
						margin-top: 16rpx;
						background: #eee;

						.item-avatar {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
						}

						.item-more {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							background: var(--theme-color);
							padding: 0 6rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;

							.point {
								width: 6rpx;
								height: 6rpx;
								background: #ffffff;
								border-radius: 50%;
							}
						}
					}
				}
			}

			.main-introduce {
				padding: 32rpx;
				border-radius: 16rpx;
				background: #ffffff;
				margin-top: 32rpx;

				.introduce-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.introduce-content {
					margin-top: 24rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 48rpx;
				}
			}
		}
	}
</style>