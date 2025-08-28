<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 购物车 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="购物车"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header flex justify-content-between align-items-center" v-if="cartList.length">
				<view class="header-title">商品列表</view>
				<view class="header-btn" @click="handleDelete()">清除购物车</view>
			</view>
			<view class="main-list">
				<mall-cart :show-data="cartList" @changeSelect="changeSelect" @changeNumber="changeNumber" v-if="cartList.length"></mall-cart>
				<empty top="30%" title="暂无商品，" btnText="去购物" @callback="toShopping()" v-else></empty>
			</view>
			<view class="main-footer flex align-items-center" v-if="cartList.length">
				<view class="footer-radio flex align-items-center" @click="toggleSelectAll()">
					<view class="radio-input" :class="{active: allSelected}">
						<image src="/static/tick.png" mode="aspectFit" v-if="allSelected"></image>
					</view>
					<view class="radio-label">全选</view>
				</view>
				<view class="footer-amount flex-item flex align-items-center justify-content-end">
					<text class="label">合计</text>
					<text class="amount text-ellipsis">￥{{totalPrice}}</text>
				</view>
				<view class="footer-btn" :class="{disabled: !selectedList.length}" @click="toSettlement()">去结算</view>
			</view>
			<view class="safe-padding" style="background: #FFF;"></view>
		</view>
		<!-- 选择数量弹窗 -->
		<quantity-modal ref="quantityModal" @confirm="changeQuantity" @onChange="pageChange"></quantity-modal>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import mallCart from '@/pagesMall/component/mall/cart.vue'
	import quantityModal from "@/pagesMall/component/modal/quantity.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			mallCart,
			quantityModal,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 购物车列表
				cartList: [],
				// 是否全选
				allSelected: false,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			}),
			totalPrice() {
				var result = this.cartList.filter(item => item.selected).reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.number)), 0)
				return parseFloat(result).toFixed(2);
			},
			selectedList() {
				return this.cartList.filter(item => item.selected);
			},
		},
		watch: {
			cartList: {
				handler() {
					this.allSelected = this.cartList.every(item => item.selected);
				},
				immediate: true,
				deep: true
			}
		},
		onLoad() {
			if (uni.getStorageSync("token")) {
				uni.showLoading({
					title: "加载中"
				})
				this.getCartList(() => {
					this.loadEnd = true
					uni.hideLoading()
				})
			} else {
				this.loadEnd = true
			}
		},
		onShow() {
			if (this.loadEnd && uni.getStorageSync("token")) {
				this.getCartList()
			}
		},
		onPullDownRefresh() {
			if (uni.getStorageSync("token")) {
				this.getCartList(() => {
					uni.stopPullDownRefresh();
				})
			} else {
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取购物车列表
			getCartList(fn) {
				this.$util.request("mall.cartList").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						var list = res.data || []
						if (list.length && this.selectedList.length) {
							list.forEach(item => {
								if (this.selectedList.some(el => el.id === item.id)) {
									this.$set(item, 'selected', true);
								}
							});
						}
						this.cartList = list
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取购物车列表', error)
				})
			},
			// 去购物
			toShopping() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mall/index"
				})
			},
			// 更改数量
			changeNumber(index, type) {
				var data = this.cartList[index]
				if (type == 1) {
					if (parseInt(data.number) > 1) {
						data.number = parseInt(data.number) - 1
					} else {
						this.handleDelete(data.id)
						return
					}
				} else if (type == 2) {
					data.number = parseInt(data.number) + 1
				} else if (type == 3) {
					this.$refs.quantityModal.open(data.number, index)
					return
				}
				this.updateCartNumber(data, () => {
					this.$set(this.cartList, index, data)
				})
			},
			// 选择数量弹窗回调
			changeQuantity(number, index) {
				var data = this.cartList[index]
				data.number = number
				this.updateCartNumber(data, () => {
					this.$set(this.cartList, index, data)
				})
			},
			// 更新购物车商品数量
			updateCartNumber(data, fn) {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				this.$util.request("mall.updateCartNumber", {
					goods_id: data.id,
					number: data.number,
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('更新购物车商品数量', error)
				})
			},
			// 删除购物车商品
			handleDelete(id) {
				if (id) {
					uni.showModal({
						content: "确认删除该商品吗？",
						confirmColor: this.themeColor,
						success: (res) => {
							if (res.confirm) {
								this.deleteEvent(id)
							}
						}
					})
				} else {
					if (this.selectedList.length) {
						uni.showModal({
							content: `确认要删除这${this.selectedList.length}种商品吗？`,
							confirmColor: this.themeColor,
							success: (res) => {
								if (res.confirm) {
									const idList = this.selectedList.map(item => item.id)
									this.deleteEvent(idList.join())
								}
							}
						})
					} else {
						uni.showToast({
							icon: "none",
							title: "请选择要删除的商品",
							duration: 2000
						})
					}
				}
			},
			// 删除事件
			deleteEvent(ids) {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				this.$util.request("mall.deleteCart", {
					goods_id: ids,
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						uni.showToast({
							icon: "success",
							title: "删除成功",
							duration: 2000
						})
						this.getCartList()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('删除事件', error)
				})
			},
			// 更改选择
			changeSelect(index) {
				var data = this.cartList[index]
				data.selected = !data.selected
				this.$set(this.cartList, index, data)
			},
			// 切换全选状态
			toggleSelectAll() {
				this.cartList.forEach(item => {
					this.$set(item, "selected", !this.allSelected)
				});
				this.$forceUpdate()
			},
			// 去结算
			toSettlement() {
				if (!this.selectedList.length) {
					uni.showToast({
						title: "请至少选择一件商品",
						icon: "none",
						duration: 2000
					})
					return;
				}
				var isDisabled = false;
				for (var i in this.selectedList) {
					if (this.selectedList[i].goods_status == 2) {
						isDisabled = true
						break;
					}
				}
				if (isDisabled) {
					uni.showToast({
						title: "存在已下架商品",
						icon: "none",
						duration: 2000
					})
					return
				}
				this.$store.commit("app/setMallOrder", { isCartItem: true, list: this.selectedList })
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/goods/order",
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 0;
	}

	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.container-main {
			flex: 1;
			display: flex;
			flex-direction: column;

			.main-header {
				padding: 32rpx 32rpx 0;

				.header-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.header-btn {
					color: var(--theme-color);
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}

			.main-list {
				flex: 1;
				padding: 32rpx;
			}

			.main-footer {
				padding: 32rpx;
				background: #FFF;

				.footer-radio {
					.radio-input {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						background: #D6DBDE;

						&.active {
							background: var(--theme-color);
						}
					}

					.radio-label {
						margin-left: 16rpx;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}
				}

				.footer-amount {
					margin-left: 16rpx;

					.label {
						color: #C4C4C4;
						font-size: 28rpx;
						line-height: 40rpx;
						white-space: nowrap;
					}

					.amount {
						margin-left: 8rpx;
						color: var(--theme-color);
						font-size: 28rpx;
						font-weight: 600;
						line-height: 40rpx;
					}
				}

				.footer-btn {
					margin-left: 20rpx;
					color: #FFF;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 16rpx 32rpx;
					min-width: 200rpx;
					border-radius: 36rpx;
					background: var(--theme-color);
					text-align: center;

					&.disabled {
						background: #AAA;
					}
				}
			}
		}
	}
</style>