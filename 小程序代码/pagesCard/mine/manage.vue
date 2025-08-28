<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 名片管理 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="名片管理"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-list" v-if="cardList.length">
				<view class="list-item" v-for="item in cardList" :key="item.id" @click="changeSelectCard(item.id)">
					<view class="item-radio" :class="{select: selectCard.includes(item.id)}">
						<image class="icon" src="/static/card/tick.png" mode="aspectFit"></image>
					</view>
					<view class="item-image">
						<image class="image" :src="item.image" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="main-empty" v-else>
				<image class="empty-image" src="/static/empty.png" mode="widthFix"></image>
				<view class="empty-text">暂无相关内容~</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="handleDelete()">删除名片</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import cardItem from "../component/card/index.vue"
	export default {
		components: {
			cardItem
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 名片列表
				cardList: [],
				// 已选名片
				selectCard: [],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getCardList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onPullDownRefresh() {
			this.getCardList(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			// 获取名片列表
			getCardList(fn) {
				this.$util.request("card.list").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.cardList = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取名片列表 ', error)
				})
			},
			// 改变已选名片
			changeSelectCard(id) {
				if (this.selectCard.includes(id)) {
					const index = this.selectCard.findIndex(item => item == id)
					this.$delete(this.selectCard, index)
				} else {
					this.selectCard.push(id)
				}
			},
			// 删除名片
			handleDelete() {
				if (!this.selectCard.length) {
					uni.showToast({
						icon: "none",
						title: "请选择要删除的名片"
					})
					return
				}
				uni.showModal({
					title: "提示",
					content: "确认删除所选名片？删除后无法恢复",
					confirmText: "确认删除",
					cancelText: "我再想想",
					confirmColor: "#FF626E",
					cancelColor: "#999999",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true,
								title: "加载中"
							})
							this.$util.request("card.delete", { ids: this.selectCard.join() }).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									uni.showToast({
										icon: "success",
										title: "删除成功",
										duration: 2000
									})
									this.getCardList()
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('删除名片 ', error)
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-list {
				.list-item {
					margin-top: 32rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					&:first-child {
						margin-top: 0;
					}

					.item-radio {
						width: 40rpx;
						height: 40rpx;
						background: #D6DBDE;
						border-radius: 50%;

						.icon {
							display: none;
						}

						&.select {
							background: var(--theme-color);

							.icon {
								display: block;
							}
						}
					}

					.item-image {
						width: 624rpx;
						height: 364rpx;
						border-radius: 16rpx;
						overflow: hidden;

						.image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}

			.main-empty {
				text-align: center;
				padding: 32rpx;
				margin-top: 25%;

				.empty-image {
					width: 260rpx;
					height: 100%;
					display: block;
					margin: 0 auto 32rpx;
				}

				.empty-text {
					color: #888;
					font-size: 32rpx;
					line-height: 1.4;
					display: flex;
					justify-content: center;

				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 12rpx 32rpx;
				background: #ffffff;

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: #FF5360;
					text-align: center;
				}

				.safe-padding {
					width: 100%;
					padding-bottom: constant(safe-area-inset-bottom);
					padding-bottom: env(safe-area-inset-bottom);
				}
			}
		}
	}
</style>