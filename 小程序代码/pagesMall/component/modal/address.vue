<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 地址选择弹窗 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-modal-address" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="modal-box" :style="{'--theme-color': themeColor}">
				<view class="modal-head">
					<view class="title">选择地址</view>
					<image class="close" src="/static/close.png" mode="aspectFit" @click="onClose"></image>
				</view>
				<view class="modal-content">
					<scroll-view scroll-y class="content-scroll">
						<empty top="0" title="请登录后查看，" btn-text="前往登录" @callback="toLogin()" v-if="!isToken"></empty>
						<view class="scroll-list" v-else-if="addressList.length">
							<view class="list-item flex align-items-center" @click="onConfirm(item)" v-for="item in addressList" :key="item.id">
								<view class="item-radio" :class="{select: item.id == selectId}">
									<view class="point" v-if="item.id == selectId"></view>
								</view>
								<view class="item-info flex-item">
									<view class="info-address text-ellipsis-more">{{item.address}}</view>
									<view class="info-tag flex">
										<text>{{item.name}}</text>
										<text style="margin-left: 16rpx;">{{item.tel}}</text>
									</view>
								</view>
								<view class="item-edit" :style="{'background-image': 'url('+ iconEdit +')'}" v-if="iconEdit" @click="editAddress(item)"></view>
							</view>
						</view>
						<empty top="0" title="暂无相关地址~" @callback="addAddress()" v-else></empty>
					</scroll-view>
				</view>
				<view class="modal-btn" @click="addAddress()">添加地址</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import svgData from "@/common/svg.js"
	export default {
		name: "componentModalAddress",
		data() {
			return {
				// 选中地址id
				selectId: null,
				// 地址列表
				addressList: [],
				// 是否登录
				isToken: false,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconEdit: state => {
					return svgData.svgToUrl("edit", state.app.themeColor)
				},
			})
		},
		methods: {
			// 打开模态框
			open(value) {
				if (value) this.selectId = value
				else this.selectId = null
				if (uni.getStorageSync("token")) {
					this.isToken = true
					this.getAddress(() => {
						this.$refs.popupModal.open()
					})
				} else {
					this.isToken = false
					this.$refs.popupModal.open()
				}
			},
			// 关闭弹窗
			onClose() {
				this.$refs.popupModal.close()
			},
			// 改变事件
			onChange(e) {
				this.$emit("onChange", e.show)
			},
			// 获取地址列表
			getAddress(fn) {
				this.$util.request("mall.addressList").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.addressList = res.data || []
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取地址列表 ', error)
				})
			},
			// 跳转登录
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/index",
					success: () => {
						this.onClose()
					}
				})
			},
			// 跳转添加地址
			addAddress() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/address/index"
				})
				this.onClose()
			},
			// 跳转编辑地址
			editAddress(item) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesMall/address/add?addressData=" + JSON.stringify(item)
				})
				this.onClose()
			},
			// 选择事件
			onConfirm(item) {
				this.onClose()
				this.$emit("confirm", item)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-modal-address {
		position: relative;
		z-index: 999;

		.modal-box {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			width: 100vw;
			padding-top: 32rpx;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.modal-head {
				display: flex;
				align-items: center;
				padding: 0 32rpx 0 64rpx;

				.title {
					color: #333;
					text-align: center;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
					flex: 1;
				}

				.close {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.modal-content {
				padding: 16rpx 32rpx 0;

				.content-scroll {
					min-height: 25vh;
					max-height: 45vh;

					.scroll-list {
						margin-top: 32rpx;

						.list-item {
							margin-top: 32rpx;
							padding-bottom: 20rpx;
							border-bottom: 1rpx solid #F6F7FB;

							&:first-child {
								margin-top: 0;
							}

							.item-radio {
								width: 32rpx;
								height: 32rpx;
								background: #FFFFFF;
								border-radius: 50%;
								border: 1rpx solid #979797;
								padding: 6rpx;
								margin-right: 24rpx;

								&.select {
									border-color: var(--theme-color);
								}

								.point {
									width: 100%;
									height: 100%;
									background: var(--theme-color);
									border-radius: 50%;
								}
							}

							.item-info {
								.info-address {
									color: #5A5B6E;
									font-size: 28rpx;
									line-height: 40rpx;
								}

								.info-tag {
									color: #979797;
									font-size: 24rpx;
									line-height: 34rpx;
									margin-top: 8rpx;
								}
							}

							.item-edit {
								width: 48rpx;
								height: 48rpx;
								background-size: 48rpx;
								margin-left: 24rpx;
							}
						}
					}
				}
			}

			.modal-btn {
				color: var(--theme-color);
				text-align: center;
				font-size: 32rpx;
				line-height: 44rpx;
				padding: 32rpx;
			}
		}
	}
</style>