<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-会员供需 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-demand" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="demand-title" :style="{marginBottom: titleSpace}" v-if="showParams.showTitle">
			<view :style="{fontSize: titleFontSize,fontWeight: showStyle.titleFontStyle, color: showStyle.titleColor}">{{showParams.titleText}}</view>
			<view :style="{fontSize: titleBtnSize, color: showStyle.titleBtnColor}" @click="toMore()">
				<text v-if="showParams.titleBtnType == 'text'">{{showParams.titleBtnText}}</text>
				<view :style="{'background-image': 'url('+ titleIconMore +')', width: titleIconSize, height: titleIconSize, backgroundSize: titleIconSize}" v-else-if="titleIconMore"></view>
			</view>
		</view>
		<view class="demand-list" :style="{rowGap: itemSpace }" v-if="demandList.length">
			<view class="list-item" v-for="(item, index) in demandList" :key="index" @click="toDetails(item.id)">
				<view class="item-top flex align-items-center">
					<image class="top-avatar" :src="item.member.avatar" mode="aspectFill"></image>
					<view class="top-info flex-item">
						<view class="info-title text-ellipsis">{{ item.member.name }}</view>
						<view class="info-subtitle text-ellipsis">{{ item.member.level_name }} | {{ item.time }}</view>
					</view>
					<view class="top-btn" @click.stop="onContact(item.member.mobile)" :style="{background: showStyle.btnColor, color: showStyle.btnTextColor}" v-if="showParams.showContact">联系TA</view>
				</view>
				<view class="item-center">
					<view class="center-title text-ellipsis" :style="{fontSize: nameSize, fontWeight: showStyle.nameWeight}">{{ item.title }}</view>
					<view class="center-content text-ellipsis-more" :style="{fontSize: contentSize}">{{ item.content }}</view>
					<view class="center-image" :class="{'special-image': (item.images.length < 3 || item.images.length === 4)}" v-if="item.images.length">
						<view class="image-box" v-for="(img, num) in item.images" :key="num" @click.stop="previewImage(item.images, num)">
							<image class="image" :src="img" mode="aspectFill"></image>
						</view>
					</view>
				</view>
				<view class="item-bottom flex justify-content-between align-items-center">
					<view class="bottom-label flex-item">
						<view class="label-box inline-flex align-items-center" v-if="item.address">
							<view class="box-icon" :style="{'background-image': 'url('+ iconAddress +')'}" v-if="iconAddress"></view>
							<text class="box-text flex-item text-ellipsis" :style="{color: showStyle.addressColor}">{{item.address}}</text>
							<view class="box-bg" :style="{background: showStyle.addressColor}"></view>
						</view>
					</view>
					<view class="bottom-other flex align-items-center">
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
		<empty top="0" padding="0" width="200rpx" size="28rpx" title="暂无相关内容~" v-else></empty>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	export default {
		name: 'demandDiy',
		props: ['showStyle', 'showParams'],
		data() {
			return {
				demandList: [],
			}
		},
		computed: {
			titleFontSize() {
				return uni.upx2px(this.showStyle.titleFontSize * 2) + 'px';
			},
			titleBtnSize() {
				return uni.upx2px(this.showStyle.titleBtnSize * 2) + 'px';
			},
			titleIconMore() {
				return svgData.svgToUrl("more", this.showStyle.titleBtnColor)
			},
			titleIconSize() {
				return uni.upx2px(this.showStyle.titleIconSize * 2) + 'px';
			},
			titleSpace() {
				return uni.upx2px(this.showStyle.titleSpace * 2) + 'px';
			},
			itemBorderRadius() {
				return uni.upx2px(this.showStyle.itemBorderRadius * 2) + 'px';
			},
			nameSize() {
				return uni.upx2px(this.showStyle.nameSize * 2) + 'px';
			},
			contentSize() {
				return uni.upx2px(this.showStyle.contentSize * 2) + 'px';
			},
			iconAddress() {
				return svgData.svgToUrl("address", this.showStyle.addressColor)
			},
			paddingTop() {
				return uni.upx2px(this.showStyle.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showStyle.paddingLeft * 2) + 'px';
			},
			itemSpace() {
				return uni.upx2px(this.showStyle.itemSpace * 2) + 'px';
			},
		},
		watch: {
			showParams: {
				handler(value) {
					if (value) this.getDemandList()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 获取供需列表
			getDemandList() {
				this.$util.request("demand.businessDiyList", {
					limit: this.showParams.count,
					category_id: this.showParams.category || ""
				}).then(res => {
					if (res.code == 1) {
						let list = res.data || []
						list.forEach((el) => {
							el.images = this.splitImages(el.images)
							if (el.createtime) el.time = this.$util.getDateBeforeNow(el.createtime)
						});
						this.demandList = list;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取供需列表 ', error)
				})
			},
			// 字符串转数组格式图片
			splitImages(images) {
				try {
					if (images) return images.split(',');
					else return []
				} catch (error) {
					return [];
				}
			},
			// 跳转查看更多
			toMore() {
				this.$util.toPage({
					mode: 1,
					path: `/pages/demand/index`
				})
			},
			// 跳转供需详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: `/pagesDemand/demand/details?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.diy-demand {
		.demand-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.demand-list {
			display: flex;
			flex-direction: column;

			.list-item {
				.item-top {
					.top-avatar {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
					}

					.top-info {
						margin-left: 24rpx;

						.info-title {
							color: #5A5B6E;
							font-size: 32rpx;
							font-weight: 600;
							line-height: 44rpx;
						}

						.info-subtitle {
							margin-top: 12rpx;
							color: #666;
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}

					.top-btn {
						margin-left: 24rpx;
						padding: 8rpx 16rpx;
						color: #FFF;
						text-align: center;
						font-size: 24rpx;
						line-height: 34rpx;
						border-radius: 8rpx;
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
					margin-top: 24rpx;

					.bottom-label {
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
								font-size: 20rpx;
								line-height: 28rpx;
							}
						}
					}

					.bottom-other {
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
			}
		}
	}
</style>