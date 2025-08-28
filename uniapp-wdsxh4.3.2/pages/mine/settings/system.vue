<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 系统设置 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="系统设置"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 功能列表 -->
			<view class="main-list">
				<view class="list-item flex align-items-center" @click="toAgreement(1)">
					<view class="item-title flex-item">用户协议</view>
					<image class="item-right" src="/static/right.png" mode="aspectFit"></image>
				</view>
				<view class="list-item flex align-items-center" @click="toAgreement(2)">
					<view class="item-title flex-item">隐私政策</view>
					<image class="item-right" src="/static/right.png" mode="aspectFit"></image>
				</view>
				<view class="list-item flex align-items-center">
					<view class="item-title flex-item">版本信息</view>
					<text class="item-tag">{{version}}</text>
				</view>
			</view>
			<!-- 退出登录 -->
			<view class="main-btn" v-if="token" @click="handleExit">退出登录</view>
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
				// 加载完成
				loadEnd: false,
			}
		},
		computed: {
			...mapState({
				token: state => state.user.token,
				themeColor: state => state.app.themeColor,
				version: state => state.app.version,
			})
		},
		onLoad() {
			this.$nextTick(() => {
				this.loadEnd = true
			})
		},
		methods: {
			// 跳转用户协议和隐私政策
			toAgreement(type) {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mine/settings/agreement?type=" + type
				})
			},
			// 退出登录
			handleExit() {
				uni.showModal({
					title: "系统提示",
					content: "确定要退出登录吗？",
					confirmColor: this.themeColor,
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync("token")
							uni.removeStorageSync("userInfo")
							this.$store.commit('user/clearAuth')
							uni.switchTab({
								url: "/pages/mine/index"
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
			padding: 32rpx;

			.main-list {
				.list-item {
					padding: 34rpx 32rpx;
					background: #fff;
					border-radius: 16rpx;
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.item-title {
						color: #333;
						font-size: 32rpx;
						line-height: 44rpx;
					}

					.item-right {
						width: 32rpx;
						height: 32rpx;
						margin-left: 32rpx;
					}

					.item-tag {
						color: #666;
						font-size: 32rpx;
						line-height: 44rpx;
						margin-left: 32rpx;
					}
				}
			}

			.main-btn {
				margin-top: 32rpx;
				padding: 34rpx;
				background: #fff;
				border-radius: 16rpx;
				text-align: center;
				font-size: 32rpx;
				line-height: 44rpx;
				color: #FF2E2E;
			}
		}
	}
</style>