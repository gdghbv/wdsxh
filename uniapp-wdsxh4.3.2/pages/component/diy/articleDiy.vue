<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-平台动态 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-article" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="article-title" :style="{marginBottom: titleSpace}" v-if="showParams.showTitle">
			<view :style="{fontSize: titleFontSize,fontWeight: showStyle.titleFontStyle, color: showStyle.titleColor}">{{showParams.titleText}}</view>
			<view :style="{fontSize: titleBtnSize, color: showStyle.titleBtnColor}" @click="toMore()">
				<text v-if="showParams.titleBtnType == 'text'">{{showParams.titleBtnText}}</text>
				<view :style="{'background-image': 'url('+ titleIconMore +')', width: titleIconSize, height: titleIconSize, backgroundSize: titleIconSize}" v-else-if="titleIconMore"></view>
			</view>
		</view>
		<view class="article-list" :style="{rowGap: itemSpace }" v-if="articleList.length">
			<view class="list-item" :class="{'flex-row-reverse': showStyle.imgFloat == 'right'}" v-for="(item,index) in articleList" :key="index" @click="toDetails(item)">
				<view class="item-left" v-if="showParams.showImg">
					<image mode="aspectFill" :src="item.image" :style="{ width: imgWidth, height: imgHeight, float: showStyle.imgFloat || 'left', borderRadius: borderRadius}"></image>
				</view>
				<view class="item-right" :style="{height: imgHeight}">
					<view class="right-title" :style="{fontSize: nameSize, fontWeight: showStyle.nameWeight}">{{item.title}}</view>
					<view class="right-group flex align-items-center">
						<view class="group-view flex align-items-center" v-if="showParams.showReadNum">
							<image class="icon" src="/static/see.png" mode="aspectFit" :style="{width: viewSize, height: viewSize}"></image>
							<text class="number" :style="{fontSize: dateSize}">{{item.read_num}}</text>
						</view>
						<view class="group-date flex-item" :style="{fontSize: dateSize, textAlign: (!showParams.showReadNum && showStyle.imgFloat == 'right') ? 'left' : 'right'}">{{item.createtime}}</view>
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
		name: 'articleDiy',
		props: ['showStyle', 'showParams'],
		data() {
			return {
				articleList: [],
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
			imgWidth() {
				return uni.upx2px(this.showStyle.imgWidth * 2) + 'px';
			},
			imgHeight() {
				return uni.upx2px(this.showStyle.imgHeight * 2) + 'px';
			},
			borderRadius() {
				return uni.upx2px(this.showStyle.borderRadius * 2) + 'px';
			},
			nameSize() {
				return uni.upx2px(this.showStyle.nameSize * 2) + 'px';
			},
			dateSize() {
				return uni.upx2px(this.showStyle.dateSize * 2) + 'px';
			},
			viewSize() {
				return uni.upx2px((this.showStyle.dateSize + 4) * 2) + 'px';
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
					if (value) this.getArticleList()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 获取新闻列表
			getArticleList() {
				let catId = ""
				if (this.showParams.category) {
					catId = this.showParams.category
				} else if (this.showParams.link && this.showParams.link.type == "Article") {
					catId = this.showParams.link.path.split("?id=")[1]
				}
				this.$util.request("main.article.list", {
					page: 1,
					limit: this.showParams.count,
					cat_id: catId
				}).then(res => {
					if (res.code == 1) {
						this.articleList = res.data.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取新闻列表 ', error)
				})
			},
			// 跳转查看更多
			toMore() {
				this.$util.toPage({
					mode: 1,
					path: `/pages/article/index?id=${this.showParams.category}&title=${this.showParams.titleText || ""}`
				})
			},
			// 跳转新闻详情
			toDetails(item) {
				if (item.type == 2) {
					this.$util.toPage({
						mode: 4,
						path: item.link,
					})
					this.$util.request("main.article.updateReadNum", { id: item.id })
				} else {
					var title = ""
					if (this.showTitle) title = this.showParams.titleText || ""
					else title = this.showParams.categoryName || ""
					this.$util.toPage({
						mode: 1,
						path: `/pages/article/details?id=${item.id}&title=${title}`
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.diy-article {
		.article-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.article-list {
			display: flex;
			flex-direction: column;

			.list-item {
				overflow: hidden;
				display: flex;
				align-items: center;
				column-gap: 10px;

				&.flex-row-reverse {
					flex-direction: row-reverse;
				}

				.item-right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;

					.right-title {
						line-height: 1.3;
						color: #333;
						display: -webkit-box;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
					}

					.right-group {
						margin-top: 16rpx;
						column-gap: 8px;

						.group-view {
							.icon {
								width: 32rpx;
								height: 32rpx;
							}

							.number {
								margin-left: 8rpx;
								color: #5A5B6E;
								font-size: 24rpx;
								line-height: 1.2;
							}
						}

						.group-date {
							color: #5A5B6E;
							line-height: 1.2;
							text-align: right;
						}
					}
				}
			}
		}
	}
</style>