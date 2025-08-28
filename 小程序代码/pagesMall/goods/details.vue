<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 商品详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="商品详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-carousel">
				<carousel :show-data="carouselList" height="660rpx" radius="0"></carousel>
			</view>
			<view class="main-info">
				<view class="info-price">
					<view class="title"><text>￥</text>{{goodsDetails.price}}</view>
					<view class="subtitle">￥{{goodsDetails.ot_price}}</view>
				</view>
				<view class="info-title">{{goodsDetails.name}}</view>
				<view class="info-parameter" @click="handleExpand()">
					<view class="parameter-title">参数</view>
					<view class="parameter-value" :class="{'multiLine': isMultiLine, 'text-ellipsis' : !isExpand && isMultiLine}">
						<text id="specsText">{{goodsDetails.paramJson}}</text>
					</view>
					<view class="parameter-more" :class="{rotate: isExpand}" v-if="isMultiLine">
						<image class="icon" src="/static/mall/icon-down.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="main-content">
				<view class="content-title">商品详情</view>
				<mp-html :content="goodsDetails.content" />
			</view>
			<view class="main-footer">
				<view class="flex align-items-center">
					<!-- #ifdef MP-WEIXIN -->
					<button class="footer-item clear" open-type="share">
						<image class="item-icon" src="/static/share.png" mode="aspectFit"></image>
						<text class="item-text">分享</text>
					</button>
					<!-- #endif -->
					<view class="footer-item" @click="toShoppingCart()">
						<image class="item-icon" src="/static/mall/cart.png" mode="aspectFit"></image>
						<text class="item-text">购物车</text>
						<view class="item-number" v-if="Number(cartNumber) > 0">{{cartNumber}}</view>
					</view>
					<view class="flex-item flex justify-content-end">
						<view class="footer-btn flex-item" style="background: #FFA820" @click="handleAddCart()">加入购物车</view>
						<view class="footer-btn flex-item" :style="{background: themeColor}" @click="toOrder()">立即购买</view>
					</view>
				</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 选择数量弹窗 -->
		<quantity-modal ref="quantityModal" @confirm="changeQuantity" @onChange="pageChange"></quantity-modal>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import carousel from "@/pages/component/carousel/carousel.vue"
	import quantityModal from "@/pagesMall/component/modal/quantity.vue"
	export default {
		components: {
			carousel,
			quantityModal,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 是否加载完成
				loadEnd: false,
				// 商品Id 
				goodsId: '',
				// 商品详情
				goodsDetails: {},
				// 商品参数是否展开
				isExpand: false,
				// 商品参数是否存在多行
				isMultiLine: false,
				// 轮播图列表
				carouselList: [],
				// 购物车数量
				cartNumber: 0,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			}),
		},
		onLoad(option) {
			this.goodsId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getGoodsDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onShow() {
			if (uni.getStorageSync("token")) this.getCartNumber()
		},
		onShareAppMessage() {
			return {
				title: this.goodsDetails.name,
				path: '/pagesMall/goods/details?id=' + this.goodsId,
				imageUrl: this.carouselList[0].image,
			}
		},
		onShareTimeline() {
			return {
				title: this.goodsDetails.name,
				path: '/pagesMall/goods/details?id=' + this.goodsId,
				imageUrl: this.carouselList[0].image,
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
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
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "wx-open-launch-weapp"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData", 'wx-open-launch-weapp'],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.goodsDetails.name,
								desc: "",
								link: window.location.href,
								imgUrl: this.carouselList[0].image,
							});
							wx.updateTimelineShareData({
								title: this.goodsDetails.name,
								link: window.location.href,
								imgUrl: this.carouselList[0].image,
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
			// 获取商品详情
			getGoodsDetails(fn) {
				this.$util.request("mall.goodsDetails", {
					id: this.goodsId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.goodsDetails = res.data
						if (res.data.slider_images) {
							var carouselList = res.data.slider_images.split(",") || []
							this.carouselList = carouselList.map(item => {
								return { image: item }
							})
						}
						if (res.data.param_json) {
							let paramJsons = JSON.parse(res.data.param_json);
							let tempJson = [];
							for (let key in paramJsons) {
								tempJson.push(key + ':' + paramJsons[key]);
							}
							this.goodsDetails.paramJson = tempJson.join(" ");
						}
						this.$nextTick(() => {
							this.getCollapse()
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取商品详情', error)
				})
			},
			// 前往订单确认 
			toOrder() {
				if (uni.getStorageSync("token")) {
					this.$refs.quantityModal.open(1, 1)
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
						animationType: "fade-in"
					})
				}
			},
			// 展示更多切换事件
			handleExpand() {
				this.isExpand = !this.isExpand
			},
			// 获取文字是否存在折叠
			getCollapse() {
				uni.createSelectorQuery().select('#specsText').boundingClientRect((rect) => {
					if (rect.height > uni.upx2px(40)) {
						this.isMultiLine = true
						this.isExpand = false
					} else {
						this.isMultiLine = false
						this.isExpand = true
					}
				}).exec();
			},
			// 获取购物车数量
			getCartNumber() {
				this.$util.request("mall.cartNumber").then(res => {
					if (res.code == 1) {
						this.cartNumber = res.data.number || 0
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取购物车数量', error)
				})
			},
			// 加入购物车
			handleAddCart() {
				if (uni.getStorageSync("token")) {
					this.$refs.quantityModal.open(1, 2)
				} else {
					uni.navigateTo({
						url: "/pages/login/index",
						animationType: "fade-in"
					})
				}
			},
			// 改变选择的数量
			changeQuantity(number, type) {
				if (type == 1) {
					const mallOrder = {
						isCartItem: false,
						list: [{
							id: this.goodsDetails.id,
							name: this.goodsDetails.name,
							image: this.goodsDetails.image,
							price: this.goodsDetails.price,
							number: number
						}]
					}
					this.$store.commit("app/setMallOrder", mallOrder)
					this.$util.toPage({
						mode: 1,
						path: "/pagesMall/goods/order",
					})
				} else {
					uni.showLoading({
						title: "加载中",
						mask: true,
					})
					this.$util.request("mall.addCart", {
						goods_id: this.goodsDetails.id,
						number: number
					}).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.cartNumber = res.data.number || 0
							uni.showToast({
								icon: "success",
								title: "添加成功",
								duration: 2000
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('加入购物车', error)
					})
				}
			},
			// 跳转购物车
			toShoppingCart() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/cart/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 112rpx;

			.main-info {
				position: relative;
				z-index: 9;
				margin-top: -74rpx;
				padding: 32rpx 40rpx;
				border-radius: 40rpx 40rpx 0 0;
				background: #FFF;

				.info-price {
					display: flex;
					align-items: flex-end;

					.title {
						color: var(--theme-color);
						font-size: 48rpx;
						font-weight: 600;
						line-height: 1;
						padding: 10rpx 0;

						text {
							font-size: 28rpx;
						}
					}

					.subtitle {
						margin-left: 24rpx;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
						text-decoration-line: line-through;
						padding: 10rpx 0;
					}
				}

				.info-title {
					margin-top: 32rpx;
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.info-parameter {
					margin-top: 32rpx;
					display: flex;

					.parameter-title {
						color: #5A5B6E;
						font-size: 28rpx;
						font-weight: 600;
						line-height: 40rpx;
					}

					.parameter-value {
						flex: 1;
						margin-left: 32rpx;
						height: 40rpx;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
						overflow: hidden;

						&.multiLine {
							height: auto;
						}
					}

					.parameter-more {
						width: 24rpx;
						height: 40rpx;
						margin-left: 24rpx;

						&.rotate {
							transform: rotate(180deg);
						}
					}
				}
			}

			.main-content {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 32rpx 40rpx;
				background: #FFFFFF;
				margin-top: 12rpx;

				.content-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					margin-bottom: 32rpx;
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 96;
				background: #FFF;
				border-top: 1rpx solid #F6F7FB;
				padding: 16rpx 32rpx;

				.footer-item {
					position: relative;
					margin-right: 32rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					min-width: 60rpx;

					.item-icon {
						width: 52rpx;
						height: 52rpx;
					}

					.item-text {
						color: #5A5B6E;
						font-size: 20rpx;
						line-height: 28rpx;
					}

					.item-number {
						position: absolute;
						top: 0;
						left: 100%;
						transform: translateX(-50%);
						margin-left: -6rpx;
						color: #FFF;
						text-align: center;
						font-size: 16rpx;
						line-height: 20rpx;
						min-width: 20rpx;
						height: 20rpx;
						border-radius: 10rpx;
						padding: 0 4rpx;
						background: var(--theme-color);
					}
				}

				.footer-btn {
					color: #ffffff;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 20rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
					margin-right: 20rpx;

					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>