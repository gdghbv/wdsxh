<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 推广会员 开发者: 麦沃德科技-暴雨 
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="推广会员"></title-bar>
		<!-- 内容区 -->
		<view class="container-main flex-column" v-if="loadEnd">
			<!-- 推广信息 -->
			<view class="main-publicize">
				<image class="publicize-image" src="/static/mine_bg.png" mode="widthFix"></image>
				<view class="publicize-title">推广会员</view>
				<view class="publicize-introduce">推广{{organize}}会员，为{{organize}}带来新活力</view>
				<view class="publicize-button" :style="{background: themeColor}" @click="$refs.publicizePoster.generatePoster()">生成推广海报</view>
			</view>
			<!-- 推广人员列表 -->
			<view class="main-list flex-item">
				<!-- 筛选tab -->
				<view class="main-list-title">
					<view :style="{ color: isSelect == 0 ? themeColor : '#5A5B6E' }" @click="selectType(0)">普通用户({{userData.total || 0}}人)</view>
					<view :style="{ color: isSelect == 1 ? themeColor : '#5A5B6E' }" @click="selectType(1)">{{organize}}会员({{memberData.total || 0}}人)</view>
				</view>
				<!-- 人员信息 -->
				<view class="main-list-item">
					<view class="list-item" v-if="isSelect == 0 && userData.total != 0" v-for="(item, index) in userData.data" :key="index">
						<image :src="item.avatar" mode="aspectFit" class="list-item-img"></image>
						<view class="list-item-phone text-ellipsis">{{item.mobile}}</view>
						<view class="list-item-time">{{item.join_time}}</view>
					</view>
					<empty top="20%" title="暂无相关人员~" v-if="isSelect == 0 && userData.total == 0"></empty>
					<view class="list-item" v-if="isSelect == 1 &&  memberData.total != 0" v-for="(item, index) in memberData.data" :key="index">
						<image :src="item.member_avatar" mode="aspectFit" class="list-item-img"></image>
						<view class="list-item-name text-ellipsis">{{item.member_name}}</view>
						<view class="list-item-level text-ellipsis" :style="{color: themeColor}">{{item.level_name}}</view>
						<view class="list-item-time">{{item.join_time}}</view>
					</view>
					<empty top="20%" title="暂无相关会员~" v-if="isSelect == 1 && memberData.total == 0"></empty>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
		<!-- 推广海报 -->
		<publicize-poster ref="publicizePoster" :show-data="posterData" @onChange="pageChange"></publicize-poster>
	</view>
</template>

<script>
	import publicizePoster from "@/pagesTools/component/publicize/poster.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			publicizePoster,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 页面是否阻止滚动
				pageShow: false,
				// 列表类型
				isSelect: 0,
				// 会员数据
				memberData: {},
				// 用户列表
				userData: {},
				// 推广海报数据
				posterData: {},
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				organize: state => state.app.organize,
			})
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getManList(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		onPullDownRefresh() {
			this.getManList(() => {
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取推广会员数据
			getManList(fn) {
				this.$util.request("member.promotionList").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.memberData = res.data.member
						this.userData = res.data.user
						this.posterData = {
							name: res.data.member_name,
							avatar: res.data.member_avatar,
							image: res.data.promotion_img,
							businessName: res.data.business_association_name,
							code: res.data.applet_qrcode_path
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取推广人员', error)
				})
			},
			// 切换人员类型 
			selectType(type) {
				this.isSelect = type
				this.getManList()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.container {
		.container-main {
			.main-publicize {
				padding: 48rpx 48rpx 68rpx;
				position: relative;
				overflow: hidden;
				z-index: 1;

				.publicize-image {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					z-index: -1;
				}

				.publicize-title {
					font-size: 48rpx;
					line-height: 68rpx;
					color: #5A5B6E;
				}

				.publicize-introduce {
					margin-top: 16rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #5A5B6E;
				}

				.publicize-button {
					margin-top: 16rpx;
					padding: 14rpx 24rpx;
					font-size: 24rpx;
					line-height: 34rpx;
					border-radius: 8rpx;
					width: 192rpx;
					color: #FFFFFF;
				}
			}

			.main-list {
				margin-top: -20rpx;
				border-radius: 32rpx 32rpx 0rpx 0rpx;
				background: #FFFFFF;

				.main-list-title {
					display: flex;
					justify-content: space-between;
					padding: 32rpx 114rpx 0rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #5A5B6E;
				}

				.main-list-item {
					padding: 48rpx;

					.list-item {
						display: flex;
						align-items: center;
						margin-top: 32rpx;

						.list-item-img {
							width: 64rpx;
							height: 64rpx;
							border-radius: 50%;
						}

						.list-item-name {
							padding-left: 32rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}

						.list-item-level {
							flex: 1;
							padding-left: 32rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}

						.list-item-phone {
							flex: 1;
							padding-left: 32rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}

						.list-item-time {
							padding-left: 16rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}

						&:first-child {
							margin-top: 0;
						}
					}

				}
			}
		}
	}
</style>