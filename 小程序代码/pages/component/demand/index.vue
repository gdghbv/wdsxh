<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-供需列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-demand" :style="{'--theme-color': themeColor}">
		<view class="demand-item" v-for="item in showData" :key="item.id" @click="toDetails(item.id)">
			<view class="item-top">
				<view class="top-order flex align-items-center" v-if="showType == 2">
					<view class="order-number flex-item">编号：{{item.number}}</view>
					<view class="order-status">
						<view class="status-label" style="color: #FF9100;" v-if="item.state == 1">审核中</view>
						<view class="status-label" :style="{ color: themeColor }" v-else-if="item.state == 2">发布中</view>
						<view class="status-label" style="color: #FF626E;" v-else-if="item.state == 3">已驳回</view>
					</view>
				</view>
				<view class="top-info flex align-items-center" v-else>
					<image class="info-avatar" :src="item.member.avatar" mode="aspectFill"></image>
					<view class="info-box flex-item">
						<view class="title text-ellipsis">{{ item.member.name }}</view>
						<view class="subtitle text-ellipsis">{{ item.member.level_name }} | {{ item.time }}</view>
					</view>
					<view class="info-btn" @click.stop="onContact(item.member.mobile)">联系TA</view>
				</view>
			</view>
			<view class="item-center">
				<view class="center-title text-ellipsis">{{ item.title }}</view>
				<view class="center-content text-ellipsis-more">{{ item.content }}</view>
				<view class="center-image" :class="{'special-image': (item.images.length < 3 || item.images.length === 4)}" v-if="item.images.length">
					<view class="image-box" v-for="(img, num) in item.images" :key="num" @click.stop="previewImage(item.images, num)">
						<image class="image" :src="img" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="item-bottom">
				<view class="bottom-order" v-if="showType == 2">
					<view class="order-box flex justify-content-between align-items-center" v-if="item.address || item.page_view">
						<view class="box-label flex-item">
							<view class="label-box inline-flex align-items-center" v-if="item.address">
								<view class="box-icon" :style="{'background-image': 'url('+ iconAddress +')'}" v-if="iconAddress"></view>
								<text class="box-text flex-item text-ellipsis">{{item.address}}</text>
								<view class="box-bg"></view>
							</view>
						</view>
						<view class="box-btn flex align-items-center">
							<image class="icon" src="/static/see.png" mode="aspectFit"></image>
							<text class="text">{{ item.page_view }}</text>
						</view>
					</view>
					<view class="order-btn flex justify-content-end">
						<view class="btn" style="background: #FFB656;" @click.stop="handleEdit(item.id)">修改</view>
						<view class="btn" style="background: #FF626E;" @click.stop="handleDelete(item.id)">删除</view>
					</view>
				</view>
				<view class="bottom-info flex justify-content-between align-items-center" v-else>
					<view class="info-label flex-item">
						<view class="label-box inline-flex align-items-center" v-if="item.address">
							<view class="box-icon" :style="{'background-image': 'url('+ iconAddress +')'}" v-if="iconAddress"></view>
							<text class="box-text flex-item text-ellipsis">{{item.address}}</text>
							<view class="box-bg"></view>
						</view>
					</view>
					<view class="info-other flex align-items-center">
						<view class="other-item flex align-items-center">
							<image class="icon" src="/static/see.png" mode="aspectFit"></image>
							<text class="text">{{ item.page_view }}</text>
						</view>
						<button open-type="share" class="other-item clear flex align-items-center" @click.stop="setShareData(item)">
							<image class="icon" src="/static/share.png" mode="aspectFit"></image>
							<text class="text">分享</text>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import svgData from "@/common/svg.js"
	export default {
		name: "componentDemand",
		props: ["showData", "showType"],
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconAddress: state => {
					return svgData.svgToUrl("address", state.app.themeColor)
				},
			})
		},
		methods: {
			// 跳转详情
			toDetails(id) {
				if (this.showType == 2) {
					this.$util.toPage({
						mode: 1,
						path: `/pagesDemand/demand/publish?id=${id}`
					})
				} else {
					this.$util.toPage({
						mode: 1,
						path: `/pagesDemand/demand/details?id=${id}`
					})
				}
			},
			// 联系ta 
			onContact(phone) {
				// 获取商圈限制
				this.$util.request("demand.businessLimit", {
					type: 2
				}).then(res => {
					if (res.code == 1) {
						if (res.data.show_status == 1) {
							this.$util.toPage({
								mode: 6,
								phone: phone,
							})
						} else {
							if (uni.getStorageSync("token")) {
								uni.showModal({
									title: "系统提示",
									content: "联系电话需成为会员后可拨打!",
									confirmColor: this.themeColor,
									confirmText: "去加入",
									success: (res) => {
										if (res.confirm) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										}
									}
								})
							} else {
								uni.navigateTo({
									url: "/pages/login/index",
									animationType: "fade-in"
								})
							}
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取商圈分类', error)
				})
			},
			// 预览图片
			previewImage(list, index) {
				uni.previewImage({
					urls: list,
					current: index
				});
			},
			// 设置分享数据
			setShareData(item) {
				this.$emit('setShareData', {
					title: item.title,
					path: '/pagesDemand/demand/details?id=' + item.id,
					imageUrl: item.images.length ? item.images[0] : item.member.avatar,
				})
			},
			// 修改供需
			handleEdit(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesDemand/demand/edit?id=" + id
				})
			},
			// 删除供需
			handleDelete(id) {
				uni.showModal({
					title: '提示',
					content: '确认删除此条吗?',
					confirmText: '确认删除',
					confirmColor: '#E50002',
					cancelText: '我再想想',
					cancelColor: '#999999',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "加载中",
								mask: true
							})
							this.$util.request("demand.businessDel", {
								id: id,
							}).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									uni.showToast({
										title: "删除成功"
									})
									this.$emit("onReset")
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('删除发布', error)
							})
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.component-demand {
		.demand-item {
			margin-top: 32rpx;
			padding: 32rpx 32rpx 24rpx;
			border-radius: 16rpx;
			background: #FFF;

			&:first-child {
				margin-top: 0;
			}

			.item-top {
				.top-info {
					.info-avatar {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
					}

					.info-box {
						margin-left: 24rpx;

						.title {
							color: #5A5B6E;
							font-size: 32rpx;
							font-weight: 600;
							line-height: 44rpx;
						}

						.subtitle {
							margin-top: 12rpx;
							color: #666;
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}

					.info-btn {
						margin-left: 24rpx;
						padding: 8rpx 16rpx;
						color: #FFF;
						text-align: center;
						font-size: 24rpx;
						line-height: 34rpx;
						background: var(--theme-color);
						border-radius: 8rpx;
					}
				}

				.top-order {
					padding-bottom: 32rpx;
					border-bottom: 1px solid #E4E4E4;

					.order-number {
						color: #979797;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.order-status {
						.status-label {
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}
				}
			}

			.item-center {
				margin-top: 32rpx;

				.center-title {
					color: #5A5B6E;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
				}

				.center-content {
					margin-top: 24rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.center-image {
					display: flex;
					flex-wrap: wrap;
					padding-top: 4rpx;

					.image-box {
						width: 32%;
						height: 0;
						padding-top: 32%;
						margin-right: 2%;
						position: relative;
						border-radius: 16rpx;
						overflow: hidden;
						margin-top: 12rpx;

						&:nth-child(3n) {
							margin-right: 0;
						}

						.image {
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
						}
					}

					&.special-image {
						padding-top: 0;
						justify-content: space-between;

						.image-box {
							width: calc(50% - 8rpx);
							padding-top: calc(50% - 8rpx);
							margin-right: 0;
							margin-top: 16rpx;
						}
					}
				}
			}

			.item-bottom {
				.bottom-info {
					margin-top: 24rpx;

					.info-label {
						max-width: 280rpx;

						.label-box {
							max-width: 100%;
							padding: 6rpx 18rpx 6rpx 8rpx;
							position: relative;
							z-index: 1;
							border-radius: 8rpx;
							overflow: hidden;

							.box-bg {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								background: var(--theme-color);
								z-index: -1;
								opacity: 0.1;
							}

							.box-icon {
								width: 24rpx;
								height: 24rpx;
								background-size: 24rpx;
							}

							.box-text {
								margin-left: 8rpx;
								color: var(--theme-color);
								font-size: 20rpx;
								line-height: 28rpx;
							}
						}
					}

					.info-other {
						.other-item {
							margin-left: 32rpx;

							.icon {
								width: 32rpx;
								height: 32rpx;
							}

							.text {
								margin-left: 8rpx;
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}
					}
				}

				.bottom-order {
					.order-box {
						margin-top: 24rpx;

						.box-label {
							max-width: 280rpx;

							.label-box {
								max-width: 100%;
								padding: 6rpx 18rpx 6rpx 8rpx;
								position: relative;
								z-index: 1;
								border-radius: 8rpx;
								overflow: hidden;

								.box-bg {
									position: absolute;
									top: 0;
									left: 0;
									right: 0;
									bottom: 0;
									background: var(--theme-color);
									z-index: -1;
									opacity: 0.1;
								}

								.box-icon {
									width: 24rpx;
									height: 24rpx;
									background-size: 24rpx;
								}

								.box-text {
									margin-left: 8rpx;
									color: var(--theme-color);
									font-size: 20rpx;
									line-height: 28rpx;
								}
							}
						}

						.box-btn {
							margin-left: 32rpx;

							.icon {
								width: 32rpx;
								height: 32rpx;
							}

							.text {
								margin-left: 8rpx;
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;
							}
						}
					}

					.order-btn {
						margin-top: 32rpx;

						.btn {
							padding: 16rpx 32rpx;
							border-radius: 8rpx;
							color: #FFF;
							text-align: center;
							font-size: 28rpx;
							line-height: 40rpx;
							margin-left: 16rpx;
						}
					}
				}
			}
		}
	}
</style>