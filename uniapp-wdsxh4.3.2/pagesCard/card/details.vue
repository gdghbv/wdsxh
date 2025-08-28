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
			<view class="main-visitor">
				<view class="visitor-record" v-if="cardDetails.visitor_count > 0">
					<view class="record-list">
						<view class="list-item" v-for="(item, index) in cardDetails.visitor_list" :key="index" v-if="index < 5">
							<image class="item-avatar" :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="list-item" v-if="cardDetails.visitor_count > 5">
							<view class="item-more">
								<view class="point"></view>
								<view class="point"></view>
								<view class="point"></view>
							</view>
						</view>
					</view>
					<view class="record-label">已有{{cardDetails.visitor_count || 0}}人访问</view>
					<view class="record-btn" :class="{active: cardDetails.reliable_status == 1}" @click="setCardReliable()">
						<uni-icons type="hand-up-filled" size="16" color="#FFFFFF" v-if="cardDetails.reliable_status == 1"></uni-icons>
						<uni-icons type="hand-up" size="16" :color="themeColor" v-else></uni-icons>
						<text class="text">靠谱</text>
					</view>
				</view>
				<view class="visitor-contact" v-if="cardDetails.mobile || cardDetails.wechat_number">
					<view class="contact-item" @click="handleContact" v-if="cardDetails.mobile">
						<view class="item-icon" :style="{background: themeColor, padding: '4rpx'}">
							<image src="/static/card/phone.png" mode="aspectFit"></image>
						</view>
						<text class="item-text">打电话</text>
					</view>
					<view class="contact-line" v-if="cardDetails.mobile && cardDetails.wechat_number"></view>
					<view class="contact-item" @click="handleCopy" v-if="cardDetails.is_wechat_number_public == 1 && cardDetails.wechat_number">
						<view class="item-icon" style="background: #FFFFFF;">
							<image src="/static/card/wechat.png" mode="aspectFit"></image>
						</view>
						<text class="item-text">加微信</text>
					</view>
					<view class="contact-bg"></view>
				</view>
			</view>
			<view class="main-introduce">
				<view class="introduce-title">公司介绍</view>
				<view class="introduce-content">
					<mp-html :content="cardDetails.company_introduction || '暂未完善'"></mp-html>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="container-footer">
			<view class="footer-btn" @click="toCardList">
				<image class="btn-icon" src="/static/card/make.png" mode="aspectFit"></image>
				<view class="btn-text">制作同款名片</view>
			</view>
			<view class="safe-padding"></view>
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
			// 拨打电话
			handleContact() {
				if (this.cardDetails.mobile) {
					this.$util.toPage({
						mode: 6,
						phone: this.cardDetails.mobile,
					})
				} else {
					uni.showToast({
						icon: "none",
						title: "该用户暂未完善该信息"
					})
				}
			},
			// 复制文本
			handleCopy() {
				if (this.cardDetails.wechat_number) {
					uni.setClipboardData({
						data: this.cardDetails.wechat_number,
						success: () => {
							uni.showToast({
								icon: "success",
								title: "已复制微信号"
							})
						}
					});
				} else {
					uni.showToast({
						icon: "none",
						title: "该用户暂未完善该信息"
					})
				}
			},
			// 设置靠谱
			setCardReliable() {
				this.$util.request(this.cardDetails.reliable_status == 1 ? "card.cancelReliable" : "card.setReliable", {
					card_id: this.cardId
				}).then(res => {
					if (res.code == 1) {
						this.getCardDetails()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('设置靠谱 ', error)
				})
			},
			// 跳转名片列表
			toCardList() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 144rpx;

		.container-main {
			padding: 32rpx;

			.main-visitor {
				margin-top: 32rpx;
				border-radius: 16rpx;
				overflow: hidden;
				background: #ffffff;

				.visitor-record {
					display: flex;
					align-items: center;
					padding: 32rpx;

					.record-list {
						display: flex;

						.list-item {
							width: 48rpx;
							height: 48rpx;
							border-radius: 50%;
							overflow: hidden;
							margin-left: -4rpx;
							background: #eee;

							&:first-child {
								margin-left: 0;
							}

							.item-avatar {
								width: 100%;
								height: 100%;
							}

							.item-more {
								width: 100%;
								height: 100%;
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

					.record-label {
						flex: 1;
						margin-left: 16rpx;
						color: var(--theme-color);
						font-size: 24rpx;
						line-height: 34rpx;
					}

					.record-btn {
						margin-left: 16rpx;
						border-radius: 8rpx;
						border: 1px solid var(--theme-color);
						padding: 0 12rpx;
						height: 48rpx;
						display: flex;
						align-items: center;

						.text {
							margin-left: 8rpx;
							color: var(--theme-color);
							font-size: 24rpx;
							line-height: 34rpx;
						}

						&.active {
							background: var(--theme-color);

							.text {
								color: #ffffff;
							}
						}
					}
				}

				.visitor-contact {
					display: flex;
					align-items: center;
					position: relative;
					z-index: 1;

					.contact-item {
						width: 100%;
						padding: 32rpx;
						display: flex;
						justify-content: center;

						.item-icon {
							width: 48rpx;
							height: 48rpx;
							border-radius: 50%;
							overflow: hidden;
						}

						.item-text {
							margin-left: 16rpx;
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 48rpx;
						}
					}

					.contact-line {
						background: var(--theme-color);
						opacity: 0.3;
						width: 1px;
						height: 72rpx;
					}

					.contact-bg {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						z-index: -1;
						background: var(--theme-color);
						opacity: 0.1;
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

		.container-footer {
			position: fixed;
			left: 50%;
			bottom: 32rpx;
			transform: translateX(-50%);
			z-index: 99;

			.footer-btn {
				display: flex;
				align-items: center;
				padding: 32rpx 44rpx;
				border-radius: 56rpx;
				background: var(--theme-color);

				.btn-icon {
					width: 48rpx;
					height: 48rpx;
				}

				.btn-text {
					margin-left: 8rpx;
					color: #FFF;
					font-size: 32rpx;
					line-height: 44rpx;
				}
			}

			.safe-padding {
				width: 100%;
				padding-bottom: constant(safe-area-inset-bottom);
				padding-bottom: env(safe-area-inset-bottom);
			}
		}
	}
</style>