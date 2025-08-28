<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 活动核销-详情 开发者: 麦沃德科技-半夏  
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="活动核销"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-column">
				<view class="column-screen flex">
					<view class="screen-item" :class="{active: selectScreen == 2}" @click="changeScreen(2)">待核销</view>
					<view class="screen-item" :class="{active: selectScreen == 1}" @click="changeScreen(1)">已核销</view>
				</view>
				<view class="column-list">
					<view class="list-item flex align-items-center" v-for="item in memberList" :key="item.id">
						<view class="item-info flex-item flex align-items-center">
							<image class="info-avatar" :src="item.avatar" mode="aspectFill"></image>
							<view class="info-name">{{item.nickname}}</view>
						</view>
						<view class="item-status">
							<text class="wait" v-if="item.is_sign_in == 2">待核销</text>
							<text v-else-if="item.is_sign_in == 1">已核销</text>
						</view>
					</view>
					<empty top="26%" title="暂无相关人员~" v-if="memberList.length == 0"></empty>
				</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="handleScan">扫码核销</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 查询参数
				page: 1,
				limit: 10,
				hasMore: false,
				// 活动ID
				activityId: null,
				// 已选分类 1已核销,2待核销
				selectScreen: 2,
				// 会员列表
				memberList: [],
			}
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
			this.activityId = option.id
			this.getMemberList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page++
				this.getMemberList()
			}
		},
		methods: {
			// 核销会员列表
			getMemberList(fn) {
				this.$util.request("activity.verifyMemberList", {
					page: this.page,
					limit: this.limit,
					activity_id: this.activityId,
					is_sign_in: this.selectScreen
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.memberList = this.page == 1 ? list : [...this.memberList, ...list];
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取活动列表 ', error)
				})
			},
			// 更改分类
			changeScreen(id) {
				this.selectScreen = id
				this.page = 1
				this.getMemberList()
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
							jsApiList: ['scanQRCode']
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
			// 扫码核销
			handleScan() {
				// #ifndef H5
				uni.scanCode({
					success: (res) => {
						let codeData = JSON.parse(res.result)
						this.$util.request("activity.verifying", {
							activity_id: this.activityId,
							wechat_id: codeData.wechatId
						}).then(res => {
							if (res.code == 1) {
								uni.showToast({
									icon: "success",
									title: "核销成功"
								})
								this.page = 1
								this.selectScreen = 1
								this.getMemberList()
							} else {
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
							}
						}).catch(error => {
							console.error('核销活动', error)
						})
					}
				});
				// #endif
				// #ifdef H5
				wx.scanQRCode({
					needResult: 1,
					scanType: ["qrCode"],
					success: (res) => {
						let codeData = JSON.parse(res.resultStr)
						this.$util.request("activity.verifying", {
							activity_id: this.activityId,
							wechat_id: codeData.wechatId
						}).then(res => {
							if (res.code == 1) {
								uni.showToast({
									icon: "success",
									title: "核销成功"
								})
								this.page = 1
								this.selectScreen = 1
								this.getMemberList()
							} else {
								uni.showToast({
									title: res.msg,
									icon: "none"
								})
							}
						}).catch(error => {
							console.error('核销活动', error)
						})
					},
					fail: () => {
						uni.showModal({
							title: "系统提示",
							content: "当前设备暂不支持扫码核销，请稍后再试",
							showCancel: false,
							confirmText: "我知道了"
						})
					},
				});
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-column {
				border-radius: 16rpx;
				background: #ffffff;
				padding: 32rpx 0;

				.column-screen {
					padding: 0 8rpx;

					.screen-item {
						padding: 0 24rpx;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;

						&.active {
							color: var(--theme-color);
						}
					}
				}

				.column-list {
					margin-top: 32rpx;
					padding: 0 32rpx;

					.list-item {
						margin-top: 32rpx;

						&:first-child {
							margin-top: 0;
						}

						.item-info {
							.info-avatar {
								width: 64rpx;
								height: 64rpx;
								border-radius: 50%;
							}

							.info-name {
								color: #5A5B6E;
								font-size: 28rpx;
								font-weight: 600;
								line-height: 40rpx;
								margin-left: 32rpx;
							}
						}

						.item-status {
							color: #8D929C;
							font-size: 28rpx;
							line-height: 40rpx;
							margin-left: 32rpx;

							.wait {
								color: #FF9100;
							}
						}
					}
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

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
				}
			}
		}
	}
</style>