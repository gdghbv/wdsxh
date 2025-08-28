<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 通讯录 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="通讯录"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 顶部搜索 -->
			<view class="main-search" :style="{top: titleBarHeight + 'px'}">
				<view class="search-box flex align-items-center">
					<image class="icon" src="/static/search.png" mode="aspectFit"></image>
					<input class="input flex-item" placeholder="请输入关键词搜索" placeholder-class="placeholder" v-model="keyword" @confirm="getPhoneList()" />
				</view>
			</view>
			<!-- 通讯录列表 -->
			<view class="main-content" v-if="phoneList.length">
				<!-- 正常排序 -->
				<view class="content-list" v-if="sortOrder == 3">
					<view class="list-box flex align-items-center" v-for="item in phoneList" :key="item.id" @click="onContact(item.mobile)">
						<image class="box-avatar" :src="item.avatar" mode="aspectFill"></image>
						<view class="box-info flex-item">
							<view class="info-head flex align-items-center">
								<view class="name">{{item.name}}</view>
								<view class="level">{{item.level_name}}</view>
							</view>
							<view class="info-mobile">{{item.mobile}}</view>
						</view>
						<view class="box-btn">
							<image class="icon" src="/static/contact/phone.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<!-- 首字母排序 -->
				<view class="content-initial" v-else>
					<view class="initial-item" v-for="(list, index) in phoneList" :key="index">
						<view class="item-title">{{ list.key }}</view>
						<view class="item-list">
							<view class="list-box flex align-items-center" v-for="item in list.value" :key="item.id" @click="onContact(item.mobile)">
								<image class="box-avatar" :src="item.avatar" mode="aspectFill"></image>
								<view class="box-info flex-item">
									<view class="info-head flex align-items-center">
										<view class="name">{{item.name}}</view>
										<view class="level">{{item.level_name}}</view>
									</view>
									<view class="info-mobile">{{item.mobile}}</view>
								</view>
								<view class="box-btn">
									<image class="icon" src="/static/contact/phone.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<empty top="36%" title="暂无通讯人员~" v-else></empty>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 是否加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 搜索关键词  
				keyword: "",
				// 排序方式
				sortOrder: 0,
				// 通讯列表
				phoneList: []
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
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
			this.getPhoneList(() => {
				this.loadEnd = true
				uni.hideLoading()
			})
		},
		onPullDownRefresh() {
			this.getPhoneList(() => {
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			// 获取通讯录
			getPhoneList(fn) {
				this.$util.request("member.addressBook", {
					keywords: this.keyword,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.sortOrder = res.data.address_book_sort_order
						if (res.data.address_book_sort_order == 3) {
							this.phoneList = res.data.data
						} else {
							this.phoneList = []
							if (this.phoneList) {
								try {
									for (var key in res.data.data) {
										this.phoneList.push({ key, value: res.data.data[key] })
									}
								} catch (error) {
									this.phoneList = []
								}
							}
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取通讯录', error)
				})
			},
			// 拨打电话
			onContact(phone) {
				this.$util.toPage({
					mode: 6,
					phone: phone,
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			.main-search {
				position: sticky;
				top: 0;
				z-index: 99;
				background: #FFF;
				padding: 16rpx 32rpx;

				.search-box {
					border-radius: 10rpx;
					background: #F9F9F9;
					padding-left: 32rpx;

					.icon {
						width: 40rpx;
						height: 40rpx;
					}

					.input {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						padding: 20rpx 32rpx 20rpx 16rpx;
					}

					.placeholder {
						color: #BBB;
					}
				}
			}

			.main-content {
				padding: 32rpx;
				border-radius: 10rpx;

				.content-initial {
					padding: 32rpx;
					border-radius: 10rpx;
					background: #FFF;

					.initial-item {
						margin-top: 32rpx;

						&:first-child {
							margin-top: 0;
						}

						.item-title {
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.item-list {
							margin-top: 32rpx;
						}
					}
				}

				.content-list {
					padding: 32rpx;
					border-radius: 10rpx;
					background: #FFF;

					.list-box {
						margin-top: 48rpx;
					}
				}

				.list-box {
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.box-avatar {
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}

					.box-info {
						margin-left: 32rpx;

						.info-head {
							.name {
								color: #5A5B6E;
								font-size: 32rpx;
								font-weight: 600;
								line-height: 44rpx;
							}

							.level {
								margin-left: 16rpx;
								color: #8D929C;
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}

						.info-mobile {
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}

					.box-btn {
						margin-left: 32rpx;
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						background: var(--theme-color);
						padding: 8rpx;
					}
				}
			}
		}
	}
</style>