<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 接龙反馈信息 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="反馈信息"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-column">
				<view class="column-member flex align-items-center">
					<image class="member-avatar" :src="memberInfo.avatar" mode="aspectFill"></image>
					<view class="member-info">
						<view class="info-top">
							<view class="top-name">{{memberInfo.name}}</view>
							<view class="top-level">{{memberInfo.member_level}}</view>
						</view>
						<view class="info-time">{{feedbackInfo.createtime}}</view>
					</view>
				</view>
				<view class="column-form">
					<view class="form-content" v-if="feedbackInfo.status">{{feedbackInfo.status}}</view>
					<view class="form-content" v-if="feedbackInfo.content">
						<text>{{feedbackInfo.content}}</text>
					</view>
					<view class="form-list flex flex-wrap" v-if="feedbackImages.length">
						<view class="list-image" v-for="(image, index) in feedbackImages" :key="index">
							<image class="image-box" :src="image" mode="aspectFill" @click="previewImage(index)"></image>
						</view>
					</view>
				</view>
			</view>
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
				// 加载状态
				loadEnd: false,
				// 反馈id
				feedbackId: null,
				// 用户信息
				memberInfo: {},
				// 反馈信息
				feedbackInfo: {},
				// 反馈图片
				feedbackImages: [],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor
			}),
		},
		onLoad(option) {
			this.feedbackId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getDetails(() => {
				this.loadEnd = true
				uni.hideLoading()
			})
		},
		methods: {
			// 获取反馈详情
			getDetails(fn) {
				this.$util.request("sequence.feedbackDetails", {
					jielong_id: this.feedbackId,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.memberInfo = res.data.member_data
						this.feedbackInfo = res.data.feedback_data
						if (res.data.feedback_data.images) {
							this.feedbackImages = res.data.feedback_data.images.split(",")
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取反馈详情', error)
				})
			},
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.feedbackImages,
					current: index,
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;

			.main-column {
				padding: 32rpx;
				border-radius: 10rpx;
				background: #FFFFFF;

				.column-member {
					.member-avatar {
						margin-right: 16rpx;
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.member-info {
						.info-top {
							display: flex;
							align-items: center;

							.top-name {
								color: #5A5B6E;
								font-size: 28rpx;
								font-weight: 600;
								line-height: 40rpx;
							}

							.top-level {
								color: var(--theme-color);
								margin-left: 8rpx;
								font-size: 28rpx;
								line-height: 20px;
							}
						}

						.info-time {
							margin-top: 6rpx;
							color: #8D929C;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}
				}

				.column-form {
					.form-content {
						margin-top: 32rpx;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.form-list {
						margin-top: 32rpx;
						border-radius: 16rpx;
						row-gap: 24rpx;
						column-gap: 3.5%;

						.list-image {
							position: relative;
							width: 31%;
							height: 0;
							padding-top: 31%;

							.image-box {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								border-radius: 12rpx;
							}

							.image-close {
								position: absolute;
								z-index: 1;
								top: -16rpx;
								right: -16rpx;
								width: 48rpx;
								height: 48rpx;
							}
						}
					}
				}
			}
		}
	}
</style>