<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 我的名片 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="我的名片"></title-bar>
		<!-- 统计数据 -->
		<view class="container-statistics" :style="{top: titleBarHeight + 'px'}">
			<view class="statistics-item">
				<view class="item-name">访客数据</view>
			</view>
			<view class="statistics-line"></view>
			<view class="statistics-item">
				<view class="item-value">{{cardStatistics.total_count || 0}}</view>
				<view class="item-title">总访问人数</view>
			</view>
			<view class="statistics-line"></view>
			<view class="statistics-item">
				<view class="item-value">{{cardStatistics.today_count || 0}}</view>
				<view class="item-title">今日访问人数</view>
			</view>
			<view class="statistics-bg"></view>
		</view>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-list" v-if="cardList.length">
				<card-item :show-data="cardList" @setShareData="setShareData" @getList="resetCardList"></card-item>
			</view>
			<view class="main-empty" v-else>
				<image class="empty-image" src="/static/empty.png" mode="widthFix"></image>
				<view class="empty-text">暂无相关内容~</view>
			</view>
			<view class="main-footer">
				<view class="footer-box">
					<view class="box-create" @click="handleAdd()">
						<view class="create-icon">
							<image class="icon" src="/static/card/create.png" mode="aspectFit"></image>
							<view class="add">
								<image src="/static/card/add.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="create-text">新建</view>
					</view>
					<view class="box-manage" @click="toCardManage()">
						<view class="manage-bg"></view>
						<view class="manage-text">名片管理</view>
					</view>
					<button open-type="share" class="box-btn" @click="setShareData(defaultCard)" v-if="defaultCard && defaultCard.id">
						递交名片<text>(默认名片)</text>
					</button>
					<view class="box-btn" @click="setShareTips()" v-else>
						递交名片<text>(默认名片)</text>
					</view>
				</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import cardItem from "../component/card/index.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	export default {
		components: {
			cardItem
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 统计数据
				cardStatistics: {},
				// 名片列表
				cardList: [],
				// 默认名片
				defaultCard: {},
				// 分享数据
				shareData: {},
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				shareImage: state => state.app.shareImage,
				shareTitle: state => state.app.shareTitle,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getCardStatistics()
			this.getDefaultCard()
			this.getCardList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onShow() {
			if (this.loadEnd) {
				this.getCardStatistics()
				this.getDefaultCard()
				this.getCardList()
			}
		},
		onPullDownRefresh() {
			this.getCardStatistics()
			this.getDefaultCard()
			this.getCardList(() => {
				uni.stopPullDownRefresh()
			})
		},
		onShareAppMessage(res) {
			if (res.from == "button") {
				return {
					title: this.shareData.share_title,
					path: "/pagesCard/card/details?id=" + this.shareData.id,
					imageUrl: this.shareData.image,
				}
			} else if (res.from == "menu") {
				return {
					title: this.shareTitle,
					imageUrl: this.shareImage,
				}
			}
		},
		onShareTimeline() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImage,
			}
		},
		methods: {
			// #ifdef H5
			// 微信公众号初始化方法
			initConfig() {
				this.$util.request("main.WeChatConfig", {
					url: location.href.split('#')[0]
				}).then(res => {
					if (res.code == 1) {
						wx.config({
							debug: false,
							appId: res.data.appId,
							timestamp: Number(res.data.timestamp),
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData"],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.shareTitle,
								desc: "",
								link: window.location.href,
								imgUrl: this.shareImage,
							});
							wx.updateTimelineShareData({
								title: this.shareTitle,
								link: window.location.href,
								imgUrl: this.shareImage,
							});
						});
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
			// 获取名片统计
			getCardStatistics() {
				this.$util.request("card.statistics").then(res => {
					if (res.code == 1) {
						this.cardStatistics = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取名片统计 ', error)
				})
			},
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
			// 获取默认名片
			getDefaultCard() {
				this.$util.request("card.getDefault").then(res => {
					if (res.code == 1) {
						this.defaultCard = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取默认名片 ', error)
				})
			},
			// 新建名片
			handleAdd() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/edit"
				})
			},
			// 设置分享数据
			setShareData(data) {
				this.shareData = data
			},
			// 重新获取名片列表
			resetCardList() {
				this.getDefaultCard()
				this.getCardList()
			},
			// 设置分享提示
			setShareTips() {
				uni.showToast({
					icon: "none",
					title: "请先设置默认名片后操作",
				})
			},
			// 前往卡片管理
			toCardManage() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/manage"
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-statistics {
			position: sticky;
			top: 0;
			z-index: 99;
			display: flex;
			align-items: center;
			background: #FFF;

			.statistics-item {
				width: 100%;
				padding: 30rpx 20rpx 28rpx;
				text-align: center;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.item-name {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.item-value {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.item-title {
					margin-top: 8rpx;
					color: #8D929C;
					font-size: 24rpx;
					line-height: 34rpx;
				}
			}

			.statistics-line {
				background: var(--theme-color);
				opacity: 0.3;
				width: 1px;
				height: 72rpx;
			}

			.statistics-bg {
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

		.container-main {
			padding: 32rpx 32rpx 144rpx;

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
				border-top: 1rpx solid #F6F7FB;

				.footer-box {
					display: flex;
					align-items: center;

					.box-create {
						border-radius: 16rpx;
						background: #F4F4F4;
						margin-right: 16rpx;
						width: 88rpx;
						height: 88rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.create-icon {
							position: relative;
							width: 48rpx;
							height: 48rpx;
							display: flex;
							justify-content: center;
							align-items: center;

							.icon {
								width: 40rpx;
								height: 36rpx;
							}

							.add {
								position: absolute;
								right: 2rpx;
								bottom: 2rpx;
								border-radius: 50%;
								background: var(--theme-color);
								width: 16rpx;
								height: 16rpx;
								line-height: 16rpx;
								text-align: center;
							}
						}

						.create-text {
							color: #5A5B6E;
							text-align: center;
							font-size: 20rpx;
							line-height: 28rpx;
						}
					}

					.box-manage {
						width: 240rpx;
						padding: 22rpx 24rpx;
						border-radius: 16rpx;
						margin-right: 16rpx;
						position: relative;
						z-index: 1;

						.manage-text {
							color: var(--theme-color);
							font-size: 32rpx;
							line-height: 44rpx;
							text-align: center;
						}

						.manage-bg {
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

					.box-btn {
						flex: 1;
						color: #ffffff;
						font-size: 32rpx;
						line-height: 44rpx;
						padding: 22rpx 24rpx;
						border-radius: 16rpx;
						background: var(--theme-color);
						text-align: center;
						margin: 0;
						border: none;


						&::after {
							display: none;
						}

						text {
							font-size: 24rpx;
						}
					}
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