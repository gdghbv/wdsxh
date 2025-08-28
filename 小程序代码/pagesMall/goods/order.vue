<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 订单确认 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{ '--theme-color': themeColor }">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="订单确认"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 发货方式 -->
			<view class="main-method flex align-items-center" @click="openDeliveryMethod" v-if="mallConfig.self_pickup_status == 1">
				<view class="method-title">发货方式</view>
				<view class="method-value flex-item">{{deliveryMethod == 2 ? "到店自提" : "快递发货"}}</view>
				<image class="method-icon" src="/static/right.png" mode="aspectFit"></image>
			</view>
			<!-- 到店自提 -->
			<view class="main-address" v-if="deliveryMethod == 2">
				<view class="address-title">自提地址</view>
				<view class="address-box flex align-items-center" @click="toNavigation()">
					<view class="box-text flex-item">{{mallConfig.address}}</view>
					<view class="box-icon" :style="{'background-image': 'url('+ iconMore +')'}" v-if="iconMore"></view>
				</view>
				<view class="address-info flex flex-wrap" v-if="mallConfig.mobile" @click="onContact()">{{mallConfig.mobile}}</view>
			</view>
			<!-- 地址选择 -->
			<view class="main-address" @click="chooseAddress()" v-else>
				<view class="address-box flex align-items-center">
					<view class="box-text flex-item">{{addressData.address || "请选择收货地址"}}</view>
					<view class="box-icon" :style="{'background-image': 'url('+ iconMore +')'}" v-if="iconMore"></view>
				</view>
				<view class="address-info flex flex-wrap" v-if="addressData.name && addressData.tel">
					<text>{{addressData.name || ""}}</text>
					<text>{{addressData.tel || ""}}</text>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="main-goods">
				<block v-for="(item, index) in goodsData" :key="index">
					<mall-store :show-data="item" :show-number="item.number" @changeNumber="changeNumber($event, index)"></mall-store>
				</block>
			</view>
			<!-- 商品费用 -->
			<view class="main-cost">
				<view class="cost-info">
					<view class="title">商品总额</view>
					<view class="value">￥{{totalPrice}}</view>
				</view>
				<view class="cost-info" v-if="deliveryMethod == 1">
					<view class="title">运费总额</view>
					<view class="value">￥{{parseFloat(orderFreight).toFixed(2)}}</view>
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="main-footer">
				<view class="flex align-items-center">
					<view class="footer-money text-ellipsis-more"><text>￥</text>{{getOrderAmount()}}</view>
					<view class="footer-btn flex-item" @click="submitOrder()" v-if="userMobile">提交订单</view>
					<button class="footer-btn flex-item clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>提交订单</button>
				</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 发货方式选择弹窗 -->
		<select-picker ref="selectPicker" title="发货方式" @confirm="changeDeliveryMethod" @onChange="pageChange"></select-picker>
		<!-- 选择地址弹窗 -->
		<address-modal ref="addressModal" @confirm="changeAddress" @onChange="pageChange"></address-modal>
		<!-- 选择数量弹窗 -->
		<quantity-modal ref="quantityModal" @confirm="changeQuantity" @onChange="pageChange"></quantity-modal>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	import mallStore from "@/pagesMall/component/mall/store.vue"
	import selectPicker from "@/pages/component/picker/select.vue"
	import addressModal from "@/pagesMall/component/modal/address.vue"
	import quantityModal from "@/pagesMall/component/modal/quantity.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			mallStore,
			selectPicker,
			addressModal,
			quantityModal,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 是否加载完成
				loadEnd: false,
				// 商品数据
				goodsData: [],
				// 发货方式
				deliveryMethod: 1,
				// 已选地址
				addressData: {},
				// 订单运费
				orderFreight: 0,
				// 是否为购物车商品
				isCartItem: false,
				// 商城配置
				mallConfig: {},
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconMore: state => {
					return svgData.svgToUrl("more", state.app.themeColor)
				},
				userMobile: state => state.user.mobile,
				subscribeIds: state => state.app.subscribeNotifyIds,
			}),
			totalPrice() {
				var result = this.goodsData.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.number)), 0)
				return parseFloat(result).toFixed(2);
			},
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getMallConfig()
			this.getGoodsDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取商品详情
			getGoodsDetails(fn) {
				if (this.$store.state.app.mallOrder && this.$store.state.app.mallOrder.list && this.$store.state.app.mallOrder.list.length) {
					this.goodsData = this.$store.state.app.mallOrder.list || []
					this.isCartItem = this.$store.state.app.mallOrder.isCartItem || false
					this.getAddress(() => {
						this.getPostage(fn)
					})
				} else {
					uni.hideLoading()
					uni.showModal({
						title: "提示",
						content: "请选择商品后下单",
						showCancel: false,
						confirmText: "返回",
						confirmColor: this.themeColor,
						complete: () => {
							uni.navigateBack()
						}
					})
				}
			},
			// 获取商城配置
			getMallConfig() {
				this.$util.request("mall.config").then(res => {
					if (res.code == 1) {
						this.mallConfig = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商城配置', error)
				})
			},
			// 获取默认地址
			getAddress(fn) {
				this.$util.request("mall.addressList", {
					is_default: 1
				}).then(res => {
					if (res.code == 1) {
						if (res.data[0]) this.addressData = res.data[0]
						if (fn) fn()
					} else {
						if (fn) fn()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取默认地址', error)
				})
			},
			// 获取运费
			getPostage(fn) {
				if (this.deliveryMethod == 2) {
					if (fn) fn()
					return
				}
				if (!this.addressData || !this.addressData.id) {
					if (fn) fn()
					return
				}
				this.$util.request("mall.getPostage", {
					pay_price: this.totalPrice,
					address_id: this.addressData.id
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.orderFreight = parseFloat(res.data.price)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取运费', error)
				})
			},
			// 绑定手机号
			bindPhoneNumber(e) {
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.showLoading({
						mask: true,
						title: "加载中",
					})
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							let data = e.detail
							data.code = loginRes.code
							this.$util.request("login.bindMobile", data).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									this.$store.commit('user/updateMobile', res.data.phoneNumber)
									this.submitOrder()
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('获取用户手机号码 ', error)
							})
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								icon: "none",
								title: "授权手机号失败，请重试"
							})
						}
					});
				} else {
					uni.showToast({
						title: '获取手机号失败，请重新获取',
						icon: 'none'
					})
				}
			},
			// 打开发货方式弹窗
			openDeliveryMethod() {
				const methodList = [
					{ id: 1, name: "快递发货" },
					{ id: 2, name: "到店自提" },
				]
				this.$refs.selectPicker.open(methodList, this.deliveryMethod)
			},
			// 改变发货方式
			changeDeliveryMethod(value) {
				this.deliveryMethod = value.id
				if (value.id == 1) {
					uni.showLoading({
						title: "加载中",
						mask: true
					})
					this.getPostage(() => {
						uni.hideLoading()
					})
				}
			},
			// 选择地址
			chooseAddress() {
				this.$refs.addressModal.open(this.addressData.id)
			},
			// 改变选择的地址
			changeAddress(item) {
				this.addressData = item
				this.getPostage()
			},
			// 跳转地图导航
			toNavigation() {
				this.$util.toPage({
					mode: 7,
					address: {
						latitude: this.mallConfig.latitude,
						longitude: this.mallConfig.longitude,
						address: this.mallConfig.address,
					},
				})
			},
			// 联系
			onContact() {
				this.$util.toPage({
					mode: 6,
					phone: this.mallConfig.mobile,
				})
			},
			// 改变商品数量
			changeNumber(type, index) {
				if (type == 1) {
					if (parseInt(this.goodsData[index].number) > 1) {
						const goodsNumber = parseInt(this.goodsData[index].number) - 1
						this.changeQuantity(goodsNumber, index)
					}
				} else if (type == 2) {
					const goodsNumber = parseInt(this.goodsData[index].number) + 1
					this.changeQuantity(goodsNumber, index)
				} else if (type == 3) {
					this.$refs.quantityModal.open(this.goodsData[index].number, index)
				}
			},
			// 选择商品数量
			changeQuantity(number, index) {
				uni.showLoading({
					mask: true,
					title: "加载中"
				})
				if (this.isCartItem) {
					this.$util.request("mall.updateCartNumber", {
						goods_id: this.goodsData[index].id,
						number: number,
					}).then(res => {
						if (res.code == 1) {
							this.$set(this.goodsData[index], "number", parseInt(number))
							this.getPostage(() => {
								uni.hideLoading()
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('更新购物车商品数量', error)
					})
				} else {
					this.$set(this.goodsData[index], "number", parseInt(number))
					this.getPostage(() => {
						uni.hideLoading()
					})
				}
			},
			// 获取订单总额
			getOrderAmount() {
				var result = 0
				if (this.deliveryMethod == 2) result = parseFloat(this.totalPrice)
				else result = parseFloat(this.totalPrice) + parseFloat(this.orderFreight)
				return parseFloat(result).toFixed(2)
			},
			// 提交订单
			submitOrder() {
				if (!this.addressData || !this.addressData.id) {
					uni.showToast({
						title: "请选择收货地址",
						icon: "none"
					})
					return;
				}
				uni.showLoading({
					title: "提交中",
					mask: true
				})
				this.subscribeMessage(() => {
					var data = {
						goods_id: this.goodsData.map(item => item.id).join(),
						buy_now: this.isCartItem ? 2 : 1,
						delivery_method: this.deliveryMethod,
					}
					if (!this.isCartItem) data.number = this.goodsData[0].number
					if (this.deliveryMethod == 1) data.address_id = this.addressData.id
					this.$util.request("mall.createOrder", data).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.$util.toPage({
								mode: 2,
								path: `/pagesMall/order/payment?money=${this.getOrderAmount()}&id=${res.data.order_id}`
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						console.error('创建订单', error)
					})
				})
			},
			// 订阅消息
			subscribeMessage(fn, number = 0) {
				// #ifdef MP-WEIXIN
				var tmplIds = []
				if (this.subscribeIds?.applet_order_shipping_notification) tmplIds.push(this.subscribeIds.applet_order_shipping_notification)
				if (this.subscribeIds?.applet_confirm_receipt_notification) tmplIds.push(this.subscribeIds.applet_confirm_receipt_notification)
				uni.requestSubscribeMessage({
					tmplIds,
					success: () => {
						fn()
					},
					fail: (error) => {
						if (error.errCode == 20004) {
							uni.hideLoading()
							uni.showModal({
								title: '提示',
								content: '请前往设置打开接受通知',
								confirmColor: this.themeColor,
								confirmText: '继续提交',
								success: (res) => {
									if (res.confirm) {
										fn()
									}
								},
							})
						} else if (error.errCode) {
							uni.hideLoading()
							uni.showModal({
								title: '提示',
								content: '消息订阅失败，无法接收到订单通知，错误码：' + error.errCode,
								confirmColor: this.themeColor,
								confirmText: '继续提交',
								success: (res) => {
									if (res.confirm) {
										fn()
									}
								},
							})
						} else if (++number > 3) {
							this.subscribeMessage(fn, number)
						} else {
							fn()
						}
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				fn()
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-method {
				border-radius: 20rpx;
				padding: 32rpx;
				background: #FFF;
				margin-bottom: 32rpx;

				.method-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
				}

				.method-value {
					margin-left: 24rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
					text-align: right;
				}

				.method-icon {
					margin-left: 16rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}

			.main-address {
				border-radius: 20rpx;
				padding: 32rpx;
				background: #FFF;

				.address-title {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
					margin-bottom: 24rpx;
				}

				.address-box {
					.box-text {
						color: #5A5B6E;
						font-size: 32rpx;
						line-height: 44rpx;
						margin-right: 64rpx;
					}

					.box-icon {
						width: 32rpx;
						height: 32rpx;
						background-size: 32rpx;
					}
				}

				.address-info {
					margin-top: 24rpx;
					color: #979797;
					font-size: 28rpx;
					line-height: 40rpx;
					gap: 16rpx;
				}
			}

			.main-goods {
				margin-top: 32rpx;
				display: flex;
				flex-direction: column;
				row-gap: 32rpx;
			}

			.main-cost {
				margin-top: 32rpx;
				padding: 32rpx;
				border-radius: 16rpx;
				background: #FFFFFF;

				.cost-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.title {
						color: #979797;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.value {
						color: var(--theme-color);
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 24rpx;
					}
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
				padding: 16rpx 24rpx;

				.footer-money {
					color: var(--theme-color);
					font-size: 40rpx;
					line-height: 56rpx;
					word-break: break-all;

					text {
						font-size: 28rpx;
					}
				}

				.footer-btn {
					margin-left: 24rpx;
					padding: 20rpx 44rpx;
					background: var(--theme-color);
					border-radius: 16rpx;
					color: #FFF;
					text-align: center;
					font-size: 28rpx;
					line-height: 40rpx;
					min-width: 220rpx;
				}
			}
		}
	}
</style>