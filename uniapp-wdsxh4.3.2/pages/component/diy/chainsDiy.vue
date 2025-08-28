<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-活动接龙 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view class="diy-chains" :style="{padding: paddingTop + ' ' + paddingLeft, background: showStyle.background, borderRadius: itemBorderRadius}">
		<view class="chains-title" :style="{marginBottom: titleSpace}" v-if="showParams.showTitle">
			<view :style="{fontSize: titleFontSize,fontWeight: showStyle.titleFontStyle, color: showStyle.titleColor}">{{showParams.titleText}}</view>
			<view :style="{fontSize: titleBtnSize, color: showStyle.titleBtnColor}" @click="toMore()">
				<text v-if="showParams.titleBtnType == 'text'">{{showParams.titleBtnText}}</text>
				<view :style="{'background-image': 'url('+ titleIconMore +')', width: titleIconSize, height: titleIconSize, backgroundSize: titleIconSize}" v-else-if="titleIconMore"></view>
			</view>
		</view>
		<view class="chains-list" :style="{rowGap: itemSpace}" v-if="chainsList.length">
			<view class="list-item" v-for="item in chainsList" :key="item.id" @click="toDetails(item.id, item.jielong_auth)">
				<view class="item-title text-ellipsis" :style="{fontSize: nameSize, fontWeight: showStyle.nameWeight}">{{item.name}}</view>
				<view class="item-tag flex justify-content-between">
					<view class="tag-box flex" :style="{fontSize: contentSize}">
						<text style="margin-left: 0;">{{item.expire_time}}</text>
						<text v-if="item.type == 1">自由接龙</text>
						<text v-else>限定接龙</text>
					</view>
					<view class="tag-box flex" :style="{fontSize: contentSize}">
						<text>浏览{{item.page_view}}</text>
						<text>参与{{item.part_total}}</text>
					</view>
				</view>
				<view class="item-btn flex align-items-center">
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="btn-box clear flex align-items-center" @click.stop="setShareData(item)">
						<view class="icon" :style="{width: iconSize, height: iconSize, backgroundSize: iconSize, backgroundImage: 'url('+ iconInvite +')'}" v-if="showStyle.showIcon && iconInvite"></view>
						<text class="text" :style="{fontSize: btnSize}">邀请填写</text>
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view class="btn-box flex align-items-center">
						<view class="icon" :style="{width: iconSize, height: iconSize, backgroundSize: iconSize, backgroundImage: 'url('+ iconInvite +')'}" v-if="showStyle.showIcon && iconInvite"></view>
						<text class="text" :style="{fontSize: btnSize}">填写接龙</text>
					</view>
					<!-- #endif -->
					<view class="btn-line"></view>
					<view class="btn-box justify-content-end flex align-items-center" @click.stop="onContact(item.mobile)">
						<view class="icon" :style="{width: iconSize, height: iconSize, backgroundSize: iconSize, backgroundImage: 'url('+ iconPhone +')'}" v-if="showStyle.showIcon && iconPhone"></view>
						<text class="text" :style="{fontSize: btnSize}">电话</text>
					</view>
				</view>
			</view>
		</view>
		<empty top="0" padding="0" width="200rpx" size="28rpx" title="暂无相关内容~" v-else></empty>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		name: "chainsDiy",
		props: ['showStyle', 'showParams'],
		data() {
			return {
				chainsList: [],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				jielongImg: state => state.app.jielongImg,
			}),
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
			iconSize() {
				return uni.upx2px(this.showStyle.iconSize * 2) + 'px';
			},
			btnSize() {
				return uni.upx2px(this.showStyle.btnSize * 2) + 'px';
			},
			iconInvite() {
				return svgData.svgToUrl("invite", this.showStyle.iconColor)
			},
			iconPhone() {
				return svgData.svgToUrl("phone", this.showStyle.iconColor)
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
					if (value) this.getChainsList()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 获取活动接龙
			getChainsList() {
				this.$util.request("sequence.chainsList", {
					page: 1,
					limit: this.showParams.count,
				}).then(res => {
					if (res.code == 1) {
						this.chainsList = res.data.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取接龙列表', error)
				})
			},
			// 跳转接龙详情 
			toDetails(id, state) {
				if (state == 2) {
					this.getMemberState(() => {
						this.$util.toPage({
							mode: 1,
							path: "/pagesTools/sequence/details?id=" + id
						})
					})
				} else {
					this.$util.toPage({
						mode: 1,
						path: "/pagesTools/sequence/details?id=" + id
					})
				}
			},
			// 获取会员状态
			getMemberState(fn) {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				this.$util.request("member.state").then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						if (res.data.state.state == 6) {
							fn()
						} else if (res.data.state.state == -1) {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "去加入",
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: "/pages/member/apply/index"
										})
									}
								}
							})
						} else {
							uni.showModal({
								title: "系统提示",
								content: "此页面需成为会员后可查看！",
								confirmColor: this.themeColor,
								confirmText: "前往查看",
								success: (res) => {
									if (res.confirm) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									}
								}
							})
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取会员状态 ', error)
				})
			},
			// 跳转接龙列表
			toMore() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesTools/sequence/index"
				})
			},
			// 联系电话
			onContact(phone) {
				this.$util.toPage({
					mode: 6,
					phone: phone,
				})
			},
			// 设置分享数据
			setShareData(item) {
				this.$emit('setShareData', {
					title: item.name,
					path: '/pagesTools/sequence/details?id=' + item.id,
					imageUrl: this.jielongImg,
				})
			},
		},
	}
</script>

<style lang="scss">
	.diy-chains {
		.chains-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.chains-list {
			display: flex;
			flex-direction: column;

			.list-item {
				.item-title {
					color: #5A5B6E;
					line-height: 1.3;
				}

				.item-tag {
					margin-top: 16rpx;

					.tag-box {
						text {
							color: #999999;
							line-height: 1.4;
							margin-left: 16rpx;
						}
					}
				}

				.item-btn {
					margin-top: 32rpx;
					border-top: 1rpx solid #E8E8E8;
					padding-top: 32rpx;

					.btn-box {
						flex: 1;
						padding: 0 48rpx;

						.text {
							margin-left: 8rpx;
							color: #5A5B6E;
							line-height: 1.4;
						}
					}

					.btn-line {
						width: 0;
						height: 32rpx;
						border-left: 1rpx solid #E8E8E8;
					}
				}
			}
		}
	}
</style>