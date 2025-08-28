<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-可滚动会员列表 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-member" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="member-title" :style="{marginBottom: titleSpace}" v-if="showParams.showTitle">
			<view :style="{fontSize: titleFontSize,fontWeight: showStyle.titleFontStyle, color: showStyle.titleColor}">{{showParams.titleText}}</view>
			<view :style="{fontSize: titleBtnSize, color: showStyle.titleBtnColor}" @click="toMore()">
				<text v-if="showParams.titleBtnType == 'text'">{{showParams.titleBtnText}}</text>
				<view :style="{'background-image': 'url('+ titleIconMore +')', width: titleIconSize, height: titleIconSize, backgroundSize: titleIconSize}" v-else-if="titleIconMore"></view>
			</view>
		</view>
		<block v-if="memberList.length">
			<view class="member-swiper" v-if="showStyle.isAutoRoll">
				<z-swiper v-model="memberList" :options="{loop: (memberList.length > 9 ? true : false), autoplay: {delay: showStyle.rollDelay || 2000, disableOnInteraction: false}, speed: showStyle.rollSpeed || 1000, slidesPerView: 'auto', spaceBetween: showStyle.itemSpace}">
					<z-swiper-item v-for="(item, index) in memberList" :key="index" :custom-style="{width: iconSize}">
						<view class="swiper-item" @click="toDetails(item.id)">
							<image class="item-avatar" :style="{width: iconSize, height: iconSize, borderRadius: iconRadius}" :src="item.avatar" mode="aspectFill"></image>
							<view class="item-label text-ellipsis" :style="{fontSize: pSize, color: showStyle.pColor, background: showStyle.pBackground, borderRadius: showStyle.pRadiusType == 'full' ? pRadius : showStyle.pRadiusType == 'half' ? `0 ${pRadius} 0 ${pRadius}` : 0}">{{item.level_name}}</view>
							<view class="item-name text-ellipsis" :style="{fontSize: nameSize, color: showStyle.nameColor,}">{{item.name}}</view>
						</view>
					</z-swiper-item>
				</z-swiper>
			</view>
			<scroll-view scroll-x class="member-scroll" v-else>
				<view class="scroll-item" :style="{width: iconSize, marginLeft: itemSpace}" v-for="item in memberList" :key="item.id" @click="toDetails(item.id)">
					<image class="item-avatar" :style="{width: iconSize, height: iconSize, borderRadius: iconRadius}" :src="item.avatar" mode="aspectFill"></image>
					<view class="item-label text-ellipsis" :style="{
						fontSize: pSize,
						color: showStyle.pColor,
						background: showStyle.pBackground,
						borderRadius: showStyle.pRadiusType == 'full' ? pRadius : showStyle.pRadiusType == 'half' ? `0 ${pRadius} 0 ${pRadius}` : 0
					}">{{item.level_name}}</view>
					<view class="item-name text-ellipsis" :style="{fontSize: nameSize, color: showStyle.nameColor,}">{{item.name}}</view>
				</view>
			</scroll-view>
		</block>
		<empty top="0" padding="0" width="200rpx" size="28rpx" title="暂无相关内容~" v-else></empty>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	export default {
		name: "memberDiy",
		props: ['showStyle', 'showParams'],
		data() {
			return {
				// 会员列表
				memberList: [],
				// 轮播图高度
				carouselHeight: 0,
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
			iconRadius() {
				return uni.upx2px(this.showStyle.iconRadius * 2) + 'px';
			},
			iconSize() {
				return uni.upx2px(this.showStyle.iconSize * 2) + 'px';
			},
			pSize() {
				return uni.upx2px(this.showStyle.pSize * 2) + 'px';
			},
			pRadius() {
				return uni.upx2px(this.showStyle.pRadius * 2) + 'px';
			},
			nameSize() {
				return uni.upx2px(this.showStyle.nameSize * 2) + 'px';
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
					if (value) this.getMemberList()
				},
				immediate: true,
				deep: true
			},
			showStyle: {
				handler(value) {
					if (value) {
						this.carouselHeight = `calc(${uni.upx2px((value.iconSize + value.pSize + value.nameSize) * 2)}px + 22rpx)`
					}
				},
				immediate: true,
				deep: true
			},
		},
		methods: {
			// 跳转会员详情
			toDetails(id) {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/details?id=" + id
				})
			},
			// 获取会员列表
			getMemberList() {
				this.$util.request("member.diyList", {
					limit: this.showParams.count,
				}).then(res => {
					if (res.code == 1) {
						this.memberList = res.data
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
			// 跳转会员列表
			toMore() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/index"
				})
			},
		},
	}
</script>

<style lang="scss">
	.diy-member {
		.member-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.member-scroll {
			white-space: nowrap;

			.scroll-item {
				display: inline-block;

				&:first-child {
					margin-left: 0 !important;
				}

				.item-label {
					line-height: 1;
					padding: 10rpx 8rpx;
					margin-top: -16rpx;
					text-align: center;
					position: relative;
					z-index: 1;
				}

				.item-name {
					color: #5A5B6E;
					line-height: 1;
					margin-top: 18rpx;
					text-align: center;
				}
			}
		}

		.member-swiper {
			.swiper-item {
				.item-label {
					line-height: 1;
					padding: 10rpx 8rpx;
					margin-top: -16rpx;
					text-align: center;
					position: relative;
					z-index: 1;
				}

				.item-name {
					color: #5A5B6E;
					line-height: 1;
					margin-top: 18rpx;
					text-align: center;
				}
			}
		}
	}
</style>