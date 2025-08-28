<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-商会相册 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="component-album" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="album-title" :style="{marginBottom: titleSpace}" v-if="showParams.showTitle">
			<view :style="{fontSize: titleFontSize,fontWeight: showStyle.titleFontStyle, color: showStyle.titleColor}">{{showParams.titleText}}</view>
			<view :style="{fontSize: titleBtnSize, color: showStyle.titleBtnColor}" @click="toMore()">
				<text v-if="showParams.titleBtnType == 'text'">{{showParams.titleBtnText}}</text>
				<view :style="{'background-image': 'url('+ titleIconMore +')', width: titleIconSize, height: titleIconSize, backgroundSize: titleIconSize}" v-else-if="titleIconMore"></view>
			</view>
		</view>
		<view class="album-list" :style="{rowGap: itemSpace}" v-if="albumList.length">
			<view class="list-item flex" v-for="item in albumList" :key="item.id" @click="toDetails(item.id)">
				<view class="item-timeline">
					<view class="time" v-if="item.showTime.month && item.showTime.day">
						<text :style="{fontSize: timeSize}">{{item.showTime.month}}/</text>
						<text :style="{fontSize: timeSizeSmall}">{{item.showTime.day}}</text>
					</view>
					<view class="time" v-else>{{item.release_date}}</view>
					<view class="point" :style="{background: showStyle.iconColor}"></view>
					<view class="line"></view>
				</view>
				<view class="item-content flex-item">
					<view class="content-title text-ellipsis-more" :style="{fontSize: nameSize, fontWeight: showStyle.nameWeight}">{{item.name}}</view>
					<view class="item-content flex-item" v-if="item.type == 1">
						<view class="content-single" v-if="item.showImages.length == 1">
							<image class="image" :src="item.showImages[0]" :style="{borderRadius: borderRadius}" mode="aspectFill"></image>
						</view>
						<view class="content-multiple" v-else-if="item.showImages.length">
							<view class="image" v-for="(img, index) in item.showImages" :key="index" :style="{ marginBottom: ((index + 1) % 3 !== 0) ? '16rpx' : '0' }">
								<image :src="img" :style="{borderRadius: borderRadius}" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="item-content flex-item" v-if="item.type == 2">
						<view class="content-cover">
							<image class="image" :src="item.image" mode="aspectFill"></image>
							<image class="play" src="/static/play.png" mode="aspectFit"></image>
						</view>
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
		name: "albumDiy",
		props: ['showStyle', 'showParams'],
		data() {
			return {
				albumList: [],
			};
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
			timeSize() {
				return uni.upx2px(this.showStyle.timeSize * 2) + 'px';
			},
			timeSizeSmall() {
				return uni.upx2px((this.showStyle.timeSize - 4) * 2) + 'px';
			},
			nameSize() {
				return uni.upx2px(this.showStyle.nameSize * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
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
					if (value) this.getAlbumList()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 获取商会相册
			getAlbumList() {
				this.$util.request("album.albumDiyList", {
					limit: this.showParams.count,
				}).then(res => {
					if (res.code == 1) {
						this.albumList = res.data
						for (let i in this.albumList) {
							if (this.albumList[i].release_date) {
								this.albumList[i].showTime = this.cutDate(this.albumList[i].release_date)
							}
							if (this.albumList[i].type == 1 && this.albumList[i].files) {
								if (typeof(this.albumList[i].files) == "string") {
									this.albumList[i].showImages = this.albumList[i].files.split(",")
								} else {
									this.albumList[i].showImages = this.albumList[i].files
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
					console.error('获取相册列表', error)
				})
			},
			// 截取日期
			cutDate(time) {
				let parts = time.split('/');
				let result = {}
				if (parts && parts.length == 3) {
					result = {
						month: parts[1],
						day: parts[2]
					};
				}
				return result
			},
			// 跳转相册详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pagesTools/album/details?id=" + id
				})
			},
			// 跳转相册列表
			toMore() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesTools/album/index"
				})
			},
		},
	}
</script>

<style lang="scss">
	.component-album {
		.album-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.album-list {
			display: flex;
			flex-direction: column;

			.list-item {
				.item-timeline {
					display: flex;
					flex-direction: column;

					.time {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;
					}

					.point {
						width: 20rpx;
						height: 20rpx;
						border-radius: 4rpx;
						background: var(--theme-color);
					}

					.line {
						width: 2rpx;
						height: 100%;
						flex: 1;
						background: #F0F0F0;
					}
				}

				.item-content {
					margin-left: 16rpx;
					position: relative;

					.content-title {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.content-cover {
						margin-top: 16rpx;
						width: 100%;
						height: 240rpx;
						background: rgba(0, 0, 0, 0.3);
						border-radius: 16rpx;
						overflow: hidden;
						position: relative;

						.image {
							width: 100%;
							height: 100%;
						}

						.play {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
						}
					}

					.content-single {
						margin-top: 16rpx;
						width: 100%;
						height: 240rpx;
						border-radius: 16rpx;
						overflow: hidden;
					}

					.cover {
						position: absolute;
						top: 16rpx;
						left: 0;
						width: 100%;
						height: 240rpx;
						background-color: transparent;
						/* 设置透明背景色 */
					}

					.content-multiple {
						display: flex;
						flex-wrap: wrap;

						.image {
							width: 32%;
							height: 0;
							padding-top: 32%;
							border-radius: 16rpx;
							overflow: hidden;
							position: relative;
							margin-right: 2%;
							margin-top: 16rpx;

							&:nth-child(3n) {
								margin-right: 0;
							}

							image {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>