 <!-- +----------------------------------------------------------------------
 | 麦沃德科技赋能开发者，助力商协会发展 
 +----------------------------------------------------------------------
 | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
 +----------------------------------------------------------------------
 | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
 +----------------------------------------------------------------------
 | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
 +----------------------------------------------------------------------
 | 地址管理 开发者: 麦沃德科技-半夏 
 +---------------------------------------------------------------------- -->

 <template>
 	<view class="container" :style="{'--theme-color': themeColor}">
 		<!-- 标题栏 -->
 		<title-bar :showBack="true" title="地址管理"></title-bar>
 		<!-- 内容区 -->
 		<view class="container-main" v-if="loadEnd">
 			<!-- 地址列表 -->
 			<view class="main-list" v-if="addressList.length">
 				<view class="list-item" v-for="item in addressList" :key="item.id">
 					<view class="item-info">
 						<view class="info-address">{{item.address}}</view>
 						<view class="info-name flex align-items-center">
 							<text>{{item.name}}</text>
 							<text style="margin-left: 16rpx;">{{item.tel}}</text>
 						</view>
 					</view>
 					<view class="item-operate flex justify-content-between align-items-center">
 						<view class="operate-default flex justify-content-between align-items-center" @click="handleSwitch(item.id)">
 							<view class="default-radio" :class="{select: item.is_default == 1}">
 								<image src="/static/tick.png" mode="aspectFit" v-if="item.is_default == 1"></image>
 							</view>
 							<view class="default-tag">{{item.is_default == 1 ? '默认地址' : '设为默认地址'}}</view>
 						</view>
 						<view class="operate-btn flex align-items-center">
 							<view class="btn-box flex align-items-center" @click="handleEdit(item)">
 								<view class="icon" :style="{'background-image': 'url('+ iconEdit +')'}" v-if="iconEdit"></view>
 								<text class="text" :style="{color: themeColor}">编辑</text>
 							</view>
 							<view class="btn-box flex align-items-center" @click="handleDelete(item.id)">
 								<image class="icon" src="/static/mall/icon_del.png" mode="aspectFit"></image>
 								<text class="text">删除</text>
 							</view>
 						</view>
 					</view>
 				</view>
 			</view>
 			<empty top="10vh" title="暂无相关地址~" @callback="handleAdd()" v-else></empty>
 			<!-- 底部按钮 -->
 			<view class="main-btn">
 				<view class="btn" @click="handleAdd()">添加地址</view>
 				<view class="safe-padding"></view>
 			</view>
 		</view>
 	</view>
 </template>

 <script>
 	import svgData from "@/common/svg.js"
 	import {
 		mapState
 	} from "vuex"
 	export default {
 		data() {
 			return {
 				// 是否加载完成
 				loadEnd: false,
 				// 地址列表
 				addressList: [],
 			}
 		},
 		computed: {
 			...mapState({
 				themeColor: state => state.app.themeColor,
 				iconEdit: state => {
 					return svgData.svgToUrl("edit", state.app.themeColor)
 				},
 			})
 		},
 		onLoad() {
 			uni.showLoading({
 				title: "加载中"
 			})
 			this.getAddress(() => {
 				uni.hideLoading()
 				this.loadEnd = true
 			})
 		},
 		onShow() {
 			if (this.loadEnd) this.getAddress()
 		},
 		onPullDownRefresh() {
 			this.getAddress(() => {
 				uni.stopPullDownRefresh()
 			})
 		},
 		methods: {
 			// 获取地址列表
 			getAddress(fn) {
 				this.$util.request("mall.addressList").then(res => {
 					if (fn) fn()
 					if (res.code == 1) {
 						this.addressList = res.data
 						this.$forceUpdate()
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
 			// 切换默认地址
 			handleSwitch(id) {
 				this.$util.request("mall.setDefault", {
 					id: id
 				}).then(res => {
 					if (res.code == 1) {
 						this.getAddress(() => {
 							uni.hideLoading()
 						})
 					} else {
 						uni.showToast({
 							title: res.msg,
 							icon: 'none'
 						})
 					}
 				}).catch(error => {
 					console.error('切换默认地址 ', error)
 				})
 			},
 			// 添加地址
 			handleAdd() {
 				this.$util.toPage({
 					mode: 1,
 					path: "/pagesMall/address/add"
 				})
 			},
 			// 修改地址
 			handleEdit(item) {
 				this.$util.toPage({
 					mode: 1,
 					path: "/pagesMall/address/add?addressData=" + JSON.stringify(item)
 				})
 			},
 			// 删除地址
 			handleDelete(id) {
 				uni.showModal({
 					title: "系统提示",
 					content: "是否删除该地址？",
 					confirmColor: "#E50002",
 					confirmText: "删除",
 					success: (res) => {
 						if (res.confirm) {
 							uni.showLoading({
 								mask: true,
 								title: "加载中"
 							})
 							this.$util.request("mall.delAddress", {
 								id: id
 							}).then(res => {
 								if (res.code == 1) {
 									this.getAddress(() => {
 										uni.hideLoading()
 										uni.showToast({
 											icon: "success",
 											title: "删除成功"
 										})
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
 								console.error('删除地址 ', error)
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
 					border-radius: 16rpx;
 					background: #FFF;
 					padding: 32rpx;

 					&:first-child {
 						margin-top: 0;
 					}

 					.item-info {
 						.info-address {
 							color: #5A5B6E;
 							font-size: 32rpx;
 							line-height: 44rpx;
 						}

 						.info-name {
 							color: #979797;
 							font-size: 28rpx;
 							line-height: 40rpx;
 							margin-top: 40rpx;
 						}
 					}

 					.item-operate {
 						border-top: 1rpx solid rgba(0, 0, 0, 0.1);
 						padding-top: 20rpx;
 						margin-top: 20rpx;

 						.operate-default {
 							.default-radio {
 								width: 32rpx;
 								height: 32rpx;
 								background: #D9D9D9;
 								border-radius: 50%;

 								&.select {
 									background: var(--theme-color);
 								}
 							}

 							.default-tag {
 								margin-left: 12rpx;
 								color: #979797;
 								font-size: 24rpx;
 								line-height: 34rpx;
 							}
 						}

 						.operate-btn {
 							.btn-box {
 								margin-left: 32rpx;

 								.icon {
 									width: 48rpx;
 									height: 48rpx;
 									background-size: 48rpx;
 								}

 								.text {
 									margin-left: 8rpx;
 									color: #FF626E;
 									font-size: 28rpx;
 									line-height: 40rpx;
 								}
 							}
 						}
 					}
 				}
 			}

 			.main-btn {
 				width: 100%;
 				position: fixed;
 				left: 0;
 				bottom: 0;
 				z-index: 99;
 				background: #fff;
 				padding: 12rpx 32rpx;

 				.btn {
 					color: #FFF;
 					text-align: center;
 					font-size: 32rpx;
 					line-height: 44rpx;
 					padding: 22rpx 32rpx;
 					background: var(--theme-color);
 					border-radius: 16rpx;
 				}
 			}
 		}
 	}
 </style>