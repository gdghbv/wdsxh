<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-会员地图 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-member-map" :class="{'flex-column': showCategory.styleMode == 2 && showMap.heightType == 1}" :style="{height: showMap.heightType == 2 ? `auto` : `calc(100vh - ${spaceHeight}px)`, background: showMap.background, borderRadius: mapItemBorderRadius}" v-if="loadEnd">
		<view class="map-classify style-2" v-if="showCategory.styleMode == 2 && classifyList.length" @scrolltolower="scrollBottom" :style="{background: showCategory.background, padding: `0 ${categoryPaddingLeft}`}">
			<scroll-view scroll-x class="classify-list" :style="{padding: `${categoryPaddingTop} 0`}">
				<view class="list-item" @click="changeClassify(-1)" :style="{
					background: (!selectClassify.length ? showCategory.btnActiveBackground : showCategory.btnBackground), 
					borderRadius: categoryBtnBorderRadius, 
					padding: categoryBtnPadding,
					color: !selectClassify.length ? showCategory.btnActiveColor : showCategory.btnColor}">
					<text>全部</text>
				</view>
				<view class="list-item" v-for="(item, index) in classifyList" :key="index" @click="changeClassify(item.id)" :style="{
					marginLeft: categoryItemSpace, 
					background: (selectClassify.includes(item.id) ? showCategory.btnActiveBackground : showCategory.btnBackground), 
					borderRadius: categoryBtnBorderRadius, 
					padding: categoryBtnPadding,
					color: selectClassify.includes(item.id) ? showCategory.btnActiveColor : showCategory.btnColor}">
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
			<view class="classify-more" @click="handleExpand(1)">
				<view class="more-icon" :style="{'background-image': 'url('+ categoryIconDown +')'}" v-if="categoryIconDown"></view>
				<text class="more-text" :style="{color: showCategory.expandColor}">展开列表</text>
			</view>
		</view>
		<view class="map-classify style-1" v-else-if="classifyList.length" :style="{
			top: categoryMarginTop,
			left: showCategory.position == 'right' ? 'initial' : categoryMarginLeft,
			right: showCategory.position == 'right' ? categoryMarginLeft : 'initial',
			width: showCategory.widthType == 2 ? `${showCategory.widthNumber}%` : 'auto',
			maxWidth: `calc((100% - ${categoryMarginLeft} - ${categoryMarginLeft}) * ${showCategory.widthType == 2 ? `${showCategory.widthNumber / 100}` : 1})`,
			maxHeight: showMap.heightType == 2 ? categoryMaxHeight : `calc(100vh - ${spaceHeight}px - ${categoryMaxHeight})`,
			alignItems: showCategory.position == 'right' ? 'flex-end' : 'flex-start'}">
			<view class="classify-more" :class="{collapse: !isExpandCategory1}" @click="handleExpand()" :style="{
				background: showCategory.background,
				borderRadius: isExpandCategory1 ? categoryBorderRadius : (showCategory.position == 'right' ? `${categoryBorderRadius} 0 0 ${categoryBorderRadius}` : `0 ${categoryBorderRadius} ${categoryBorderRadius} 0`),
				left: showCategory.position == 'right' ? 'initial' : `-${categoryMarginLeft}`,
				right: showCategory.position == 'right' ? `-${categoryMarginLeft}` : 'initial',}">
				<text class="more-text" :style="{color: showCategory.expandColor}">{{isExpandCategory1 ? "收起" : "展开"}}列表</text>
				<view class="more-icon" :style="{'background-image': 'url('+ categoryIconDown +')'}" v-if="categoryIconDown"></view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<uni-transition style="width: 100%;" :mode-class="showCategory.position == 'right' ? 'slide-right' : 'slide-left'" :duration="80" :show="isExpandCategory1">
				<scroll-view scroll-y @scrolltolower="scrollBottom" :style="{
					borderRadius: categoryBorderRadius,
					background: showCategory.background,
					maxHeight: showMap.heightType == 2 ? `calc(${categoryMaxHeight} - 80rpx)` : `calc(100vh - 80rpx - ${spaceHeight}px - ${categoryMaxHeight})`}">
					<view class="classify-list" :style="{rowGap: categoryItemSpace, padding: `${categoryPaddingTop} ${categoryPaddingLeft}`}">
						<view class="list-item" @click="changeClassify(-1)" :style="{
							background: (!selectClassify.length ? showCategory.btnActiveBackground : showCategory.btnBackground), 
							borderRadius: categoryBtnBorderRadius, 
							padding: categoryBtnPadding,
							color: !selectClassify.length ? showCategory.btnActiveColor : showCategory.btnColor}">
							<text>全部</text>
						</view>
						<view class="list-item" v-for="(item, index) in classifyList" :key="index" @click="changeClassify(item.id)" :style="{
							background: (selectClassify.includes(item.id) ? showCategory.btnActiveBackground : showCategory.btnBackground), 
							borderRadius: categoryBtnBorderRadius, 
							padding: categoryBtnPadding,
							color: selectClassify.includes(item.id) ? showCategory.btnActiveColor : showCategory.btnColor}">
							<text>{{item.name}}</text>
						</view>
					</view>
				</scroll-view>
			</uni-transition>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<scroll-view scroll-y @scrolltolower="scrollBottom" v-if="isExpandCategory1" :style="{
				borderRadius: categoryBorderRadius,
				background: showCategory.background,
				maxHeight: showMap.heightType == 2 ? `calc(${categoryMaxHeight} - 80rpx)` : `calc(100vh - 80rpx - ${spaceHeight}px - ${categoryMaxHeight})`}">
				<view class="classify-list" :style="{rowGap: categoryItemSpace, padding: `${categoryPaddingTop} ${categoryPaddingLeft}`}">
					<view class="list-item" @click="changeClassify(-1)" :style="{
						background: (!selectClassify.length ? showCategory.btnActiveBackground : showCategory.btnBackground), 
						borderRadius: categoryBtnBorderRadius, 
						padding: categoryBtnPadding,
						color: !selectClassify.length ? showCategory.btnActiveColor : showCategory.btnColor}">
						<text>全部</text>
					</view>
					<view class="list-item" v-for="(item, index) in classifyList" :key="index" @click="changeClassify(item.id)" :style="{
						background: (selectClassify.includes(item.id) ? showCategory.btnActiveBackground : showCategory.btnBackground), 
						borderRadius: categoryBtnBorderRadius, 
						padding: categoryBtnPadding,
						color: selectClassify.includes(item.id) ? showCategory.btnActiveColor : showCategory.btnColor}">
						<text>{{item.name}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- #endif -->
		</view>
		<view class="map-context" :style="{height: showMap.heightType == 2 ? mapHeight : '100%', padding: mapPadding}">
			<map class="map" id="map" :style="{borderRadius: mapBorderRadius}" :markers="markersList" :include-points="includePoints" @callouttap="toMemberDetails" @markertap="toMemberDetails">
				<!-- #ifdef MP-WEIXIN -->
				<cover-view slot="callout" class="map-callout" v-if="memberList.length">
					<cover-view :marker-id="Number(item.id)" v-for="item in memberList" :key="item.id">
						<cover-view class="callout-item">
							<cover-image class="item-avatar" :src="item.avatar"></cover-image>
							<cover-view class="item-name">{{item.name}}</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
				<!-- #endif -->
			</map>
		</view>
		<view class="map-popup" v-if="showCategory.styleMode == 2 && isExpandCategory2">
			<view class="popup-classify" :style="{background: showCategory.background, padding: `0 ${categoryPaddingLeft}`}">
				<scroll-view scroll-y class="classify-scroll" :style="{maxHeight: `${componentHeight}px`, padding: `${categoryPaddingTop} 0`}">
					<view class="scroll-list" :style="{gap: categoryItemSpace}">
						<view class="list-item" @click="changeClassify(-1)" :style="{
							background: (!selectClassify.length ? showCategory.btnActiveBackground : showCategory.btnBackground), 
							borderRadius: categoryBtnBorderRadius, 
							padding: categoryBtnPadding,
							color: !selectClassify.length ? showCategory.btnActiveColor : showCategory.btnColor}">
							<text>全部</text>
						</view>
						<view class="list-item" v-for="(item, index) in classifyList" :key="index" @click="changeClassify(item.id)" :style="{
							background: (selectClassify.includes(item.id) ? showCategory.btnActiveBackground : showCategory.btnBackground), 
							borderRadius: categoryBtnBorderRadius, 
							padding: categoryBtnPadding,
							color: selectClassify.includes(item.id) ? showCategory.btnActiveColor : showCategory.btnColor}">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="scroll-space"></view>
				</scroll-view>
				<view class="classify-more" :style="{background: showCategory.background}" @click="handleExpand(2)">
					<view class="more-icon" style="transform: rotate(180deg);" :style="{'background-image': 'url('+ categoryIconDown +')'}" v-if="categoryIconDown"></view>
					<text class="more-text" :style="{color: showCategory.expandColor}">收起列表</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	export default {
		name: "memberMapDiy",
		props: ['showMap', 'showCategory', 'spaceHeight'],
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 分类列表 1.行业分类，2.分支机构，3.会员级别
				classifyList: [],
				// 已选分类
				selectClassify: [],
				// 分类查询参数
				page: 1,
				limit: 100,
				hasMore: false,
				// 会员列表
				memberList: [],
				// 地图标记点
				markersList: [],
				// 所有标记点
				includePoints: [],
				// 查询数据防抖延时器
				loadTimer: null,
				// 页面跳转防抖延时器
				toPageTimer: null,
				// 分类弹窗是否展开-样式1
				isExpandCategory1: true,
				// 分类弹窗是否展开-样式2
				isExpandCategory2: false,
				// 组件高度
				componentHeight: 0,
			};
		},
		computed: {
			mapItemBorderRadius() {
				return uni.upx2px(this.showMap.itemBorderRadius * 2) + 'px';
			},
			mapHeight() {
				if (this.showMap.heightType == 2) {
					return uni.upx2px(this.showMap.height * 2) + 'px';
				} else {
					return '100%';
				}
			},
			mapBorderRadius() {
				return uni.upx2px(this.showMap.borderRadius * 2) + 'px';
			},
			mapPadding() {
				return `${uni.upx2px(this.showMap.paddingTop * 2)}px ${uni.upx2px(this.showMap.paddingLeft * 2)}px`;
			},
			categoryBorderRadius() {
				return uni.upx2px(this.showCategory.borderRadius * 2) + 'px';
			},
			categoryMaxHeight() {
				var maxHeight = 0
				if (this.showMap.heightType == 2) {
					maxHeight = this.showMap.height - (this.showCategory.marginTop * 2)
					return uni.upx2px(maxHeight * 2) + 'px';
				} else {
					maxHeight = this.showCategory.marginTop * 2
					return uni.upx2px(maxHeight * 2) + 'px';
				}
			},
			categoryMarginTop() {
				return `${uni.upx2px(this.showCategory.marginTop * 2)}px`
			},
			categoryMarginLeft() {
				return `${uni.upx2px(this.showCategory.marginLeft * 2)}px`
			},
			categoryIconDown() {
				return svgData.svgToUrl("expand", this.showCategory.expandColor)
			},
			categoryPaddingTop() {
				return `${uni.upx2px(this.showCategory.paddingTop * 2)}px`
			},
			categoryPaddingLeft() {
				return `${uni.upx2px(this.showCategory.paddingLeft * 2)}px`
			},
			categoryItemSpace() {
				return uni.upx2px(this.showCategory.itemSpace * 2) + 'px';
			},
			categoryBtnBorderRadius() {
				return uni.upx2px(this.showCategory.btnBorderRadius * 2) + 'px';
			},
			categoryBtnPadding() {
				return `${uni.upx2px(this.showCategory.btnPaddingTop * 2)}px ${uni.upx2px(this.showCategory.btnPaddingLeft * 2)}px`
			},
		},
		watch: {
			showCategory: {
				handler(value) {
					if (value) {
						this.getClassifyList()
						this.getMemberList()
					}
				},
				immediate: true,
				deep: true
			},
		},
		destroyed() {
			if (this.loadTimer) clearTimeout(this.loadTimer)
			if (this.toPageTimer) clearTimeout(this.toPageTimer)
		},
		methods: {
			// 获取会员列表
			getMemberList() {
				var data = { type: this.showCategory.type }
				if (this.selectClassify.length) {
					if (this.showCategory.type == 1) {
						data.member_level_id = this.selectClassify.join(",")
					} else if (this.showCategory.type == 2) {
						data.industry_category_id = this.selectClassify.join(",")
					} else if (this.showCategory.type == 3) {
						data.institution_id = this.selectClassify.join(",")
					}
				}
				this.$util.request("member.memberMapList", data).then(res => {
					if (res.code == 1) {
						this.memberList = res.data || []
						var markersPoints = []
						res.data.forEach((item) => {
							markersPoints.push({
								id: Number(item.id),
								latitude: item.latitude,
								longitude: item.longitude,
								// #ifdef H5
								iconPath: item.avatar,
								width: 28,
								height: 28,
								callout: {
									display: "ALWAYS",
									content: item.name,
									fontSize: 12,
									borderRadius: 4,
									padding: 5,
								},
								// #endif
								// #ifdef MP-WEIXIN
								iconPath: "/static/point.png",
								width: 20,
								height: 20,
								customCallout: {
									anchorX: 0,
									anchorY: 28,
									display: "ALWAYS",
								},
								// #endif
							})
						});
						// #ifdef MP-WEIXIN
						this.markersList = markersPoints
						// #endif
						// #ifndef MP-WEIXIN
						this.markersList = []
						this.$nextTick(() => {
							this.markersList = markersPoints
							console.log(this.markersList)
						})
						// #endif
						const allPoints = res.data.map(item => {
							return {
								latitude: item.latitude,
								longitude: item.longitude,
							}
						})
						// #ifdef MP-WEIXIN
						this._mapContext = uni.createMapContext('map', this);
						this._mapContext.initMarkerCluster({
							enableDefaultStyle: false,
							zoomOnClick: true,
							gridSize: 60,
						});
						this._mapContext.includePoints({
							padding: [100, 100, 100, 100],
							points: allPoints,
						});
						// #endif
						// #ifndef MP-WEIXIN
						this.includePoints = this.calculateBounds(allPoints)
						// #endif
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取会员列表 ', error)
				})
			},
			// 计算所有点的边界
			calculateBounds(points) {
				if (!points || points.length === 0) return null;
				let minLat = Infinity;
				let maxLat = -Infinity;
				let minLng = Infinity;
				let maxLng = -Infinity;
				points.forEach(point => {
					const lat = point.latitude;
					const lng = point.longitude;
					minLat = Math.min(minLat, lat);
					maxLat = Math.max(maxLat, lat);
					minLng = Math.min(minLng, lng);
					maxLng = Math.max(maxLng, lng);
				});
				const latRange = maxLat - minLat;
				const lngRange = maxLng - minLng;
				const topPadding = latRange * 0.4;
				const bottomPadding = latRange * 0.3;
				const leftPadding = lngRange * 0.3;
				const rightPadding = lngRange * 0.3;
				minLat = minLat - bottomPadding;
				maxLat = maxLat + topPadding;
				minLng = minLng - leftPadding;
				maxLng = maxLng + rightPadding;
				return [{ latitude: minLat, longitude: minLng }, { latitude: maxLat, longitude: maxLng }];
			},
			// 获取分类列表
			getClassifyList() {
				// type: 1.会员级别，2.行业分类，3.分支机构
				const endFunction = () => {
					this.loadEnd = true
					setTimeout(() => {
						uni.createSelectorQuery().in(this).select('.diy-member-map').boundingClientRect(data => {
							this.componentHeight = data?.height
						}).exec();
					}, 200);
				}
				if (this.showCategory.type == 2) {
					this.getIndustry(() => {
						endFunction()
					})
				} else if (this.showCategory.type == 3) {
					this.page = 1
					this.getInstitution(() => {
						endFunction()
					})
				} else {
					this.getMemberLevel(() => {
						endFunction()
					})
				}
			},
			// 获取会员级别
			getMemberLevel(fn) {
				this.$util.request("member.level").then(res => {
					if (res.code == 1) {
						this.classifyList = res.data || []
						if (fn) fn()
					} else {
						if (fn) fn()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取会员级别 ', error)
				})
			},
			// 获取行业分类
			getIndustry(fn) {
				this.$util.request("member.industry").then(res => {
					if (res.code == 1) {
						this.classifyList = res.data || []
						if (fn) fn()
					} else {
						if (fn) fn()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取行业分类 ', error)
				})
			},
			// 获取分支机构
			getInstitution(fn) {
				this.$util.request("institution.list", {
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (res.code == 1) {
						let list = res.data.data
						this.hasMore = this.page < res.data.total / this.limit ? true : false
						this.classifyList = this.page == 1 ? list : [...this.classifyList, ...list];
						if (fn) fn()
					} else {
						if (fn) fn()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取机构列表', error)
				})
			},
			// 滚动到底部
			scrollBottom() {
				if (this.hasMore) {
					this.page++
					this.getInstitution()
				}
			},
			// 更换分类
			changeClassify(id) {
				if (id == -1) {
					this.selectClassify = []
				} else {
					const index = this.selectClassify.findIndex(item => item == id)
					if (index > -1) {
						this.$delete(this.selectClassify, index)
					} else {
						this.selectClassify.push(id)
					}
				}
				if (this.loadTimer) clearTimeout(this.loadTimer)
				this.loadTimer = setTimeout(() => {
					this.getMemberList()
				}, 400);
			},
			// 跳转会员详情
			toMemberDetails(res) {
				if (this.toPageTimer) clearTimeout(this.toPageTimer)
				this.toPageTimer = setTimeout(() => {
					this.$util.toPage({
						mode: 1,
						path: "/pages/member/details?id=" + res.detail.markerId,
					})
				}, 50);
			},
			// 展开/折叠分类列表
			handleExpand(type) {
				uni.createSelectorQuery().in(this).select('.diy-member-map').boundingClientRect(data => {
					this.componentHeight = data?.height
				}).exec();
				if (this.showCategory.styleMode == 2) {
					this.isExpandCategory2 = type == 1 ? true : false
				} else {
					this.isExpandCategory1 = !this.isExpandCategory1
				}
			},
		}
	}
</script>

<style lang="scss">
	.diy-member-map {
		position: relative;
		overflow: hidden;

		&.flex-column {
			display: flex;
			flex-direction: column;
		}

		.map-context {
			width: 100%;
			height: 100%;
			flex: 1;
			overflow: hidden;

			.map {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}

			.callout-item {
				display: flex;
				align-items: center;
				padding: 16rpx;
				border-radius: 16rpx;
				background: #FFF;

				.item-avatar {
					width: 56rpx;
					height: 56rpx;
					border-radius: 16rpx;
					object-fit: cover;
					margin-right: 8rpx;
				}

				.item-name {
					color: #5A5B6E;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 40rpx;
				}
			}
		}

		.map-classify {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;

			.classify-list {
				height: 100%;

				.list-item {
					line-height: 1.4;
					text-align: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
				}
			}

			.classify-more {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 12rpx 24rpx;
				gap: 8rpx;

				.more-icon {
					width: 32rpx;
					height: 32rpx;
				}

				.more-text {
					font-size: 24rpx;
					line-height: 32rpx;
				}
			}

			&.style-1 {
				position: absolute;
				z-index: 9;

				.classify-list {
					display: flex;
					flex-direction: column;
				}

				.classify-more {
					min-width: 184rpx;
					margin-bottom: 16rpx;
					width: 100%;

					.more-icon {
						transform: rotate(90deg);
					}

					&.collapse {
						position: relative;
						width: fit-content;

						.more-icon {
							transform: rotate(-90deg);
						}
					}
				}
			}

			&.style-2 {
				.classify-list {
					white-space: nowrap;
					overflow: hidden;

					.list-item {
						display: inline-block;
					}
				}
			}
		}

		.map-more {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 9;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 12rpx 24rpx;

			.more-icon {
				width: 32rpx;
				height: 32rpx;
			}

			.more-text {
				font-size: 24rpx;
				line-height: 32rpx;
			}
		}

		.map-popup {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;

			.popup-classify {
				position: relative;

				.classify-scroll {
					box-sizing: border-box;

					.scroll-list {
						display: flex;
						flex-wrap: wrap;

						.list-item {
							line-height: 1.4;
							text-align: center;
						}
					}

					.scroll-space {
						width: 100%;
						height: 56rpx;
					}
				}

				.classify-more {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 12rpx 24rpx;

					.more-icon {
						width: 32rpx;
						height: 32rpx;
					}

					.more-text {
						font-size: 24rpx;
						line-height: 32rpx;
					}
				}
			}
		}
	}
</style>