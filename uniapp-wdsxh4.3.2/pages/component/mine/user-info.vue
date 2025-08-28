<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-用户信息 开发者: 麦沃德科技-半夏  
+---------------------------------------------------------------------- -->

<template>
	<view class="component-user-info" :style="{paddingTop: showStyle.layout == 3 ? '64rpx' : '0', '--theme-color': themeColor}">
		<view class="layout-1" v-if="showStyle.layout == 1">
			<!-- 用户信息 -->
			<view class="user-info-content flex align-items-center" v-if="token" @click="toModifyUser()">
				<image class="content-avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				<view class="content-box flex-item" :style="{color: showStyle.titleTextColor == 'black' ? '#5A5B6E' : showStyle.titleTextColor}">
					<view class="name text-ellipsis">{{userInfo.nickname}}</view>
					<view class="phone text-ellipsis" v-if="userInfo.mobile">{{userInfo.mobile}}</view>
					<button class="phone clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" @click.stop v-else>绑定手机号</button>
				</view>
			</view>
			<!-- 登录 -->
			<view class="user-info-login" v-else @click="toLogin()">
				<view class="login-text" :style="{color: showStyle.titleTextColor == 'black' ? '#5A5B6E' : showStyle.titleTextColor}">立即登录</view>
			</view>
			<!-- 会员状态 -->
			<view class="user-info-member" :class="'' + getMemberClass(memberState)" v-if="!showStyle.hideMember && (memberState != -1 || !showStyle.hideApply)">
				<!-- 背景图片 -->
				<view class="member-image">
					<image class="image-circular" src="/static/member_bg.png" mode="aspectFit"></image>
					<image class="image-auth" src="/static/member/member_blue.png" mode="heightFix" v-if="memberState == 6 || memberState == 3 || memberState == 4 || memberState == 5"></image>
					<image class="image-auth" src="/static/member/member_orange.png" mode="heightFix" v-else-if="memberState == 7 || memberState == 1"></image>
					<image class="image-auth" src="/static/member/member_red.png" mode="heightFix" v-else-if="memberState == 2"></image>
					<image class="image-note" src="/static/note.png" mode="aspectFit" v-else></image>
				</view>
				<!-- 会员 -->
				<view class="member-box" v-if="memberState == 6">
					<view class="box-title">
						<text class="title">{{userInfo.member_level_name}}</text>
						<text class="subtitle"> | 到期时间{{userInfo.expire_time ? userInfo.expire_time.replaceAll("-", "/") : userInfo.expire_time}}</text>
					</view>
					<view class="box-btn flex align-items-center" @click="getPoster">
						<text>电子会牌</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore2 +')'}" v-if="iconMore2"></view>
					</view>
				</view>
				<!-- 已到期 -->
				<view class="member-box" v-else-if="memberState == 7">
					<view class="box-title">
						<text class="title">会员</text>
						<text class="subtitle"> | 已到期</text>
					</view>
					<view class="box-btn flex align-items-center" @click="toPayment()">
						<text>待缴纳会费</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore3 +')'}" v-if="iconMore3"></view>
					</view>
				</view>
				<!-- 待缴费 -->
				<view class="member-box" v-else-if="memberState == 3 || memberState == 4 || memberState == 5">
					<view class="box-title">
						<text class="title">会员</text>
						<text class="subtitle"> | 已通过审核</text>
					</view>
					<view class="box-btn flex align-items-center" @click="toPayment()">
						<text>待缴纳会费</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore4 +')'}" v-if="iconMore4"></view>
					</view>
				</view>
				<!-- 待审核 -->
				<view class="member-box" v-else-if="memberState == 1">
					<view class="box-title">
						<text class="title">会员</text>
						<text class="subtitle"> | 待审核</text>
					</view>
					<view class="box-tag">已提交审核，请等待审核</view>
				</view>
				<!-- 已驳回 -->
				<view class="member-box" v-else-if="memberState == 2">
					<view class="box-title">
						<text class="title">会员</text>
						<text class="subtitle">| 已驳回</text>
					</view>
					<view class="box-btn flex align-items-center" @click="toApplyMember()">
						<text>重新申请</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore5 +')'}" v-if="iconMore5"></view>
					</view>
				</view>
				<!-- 非会员 -->
				<view class="member-box" v-else>
					<view class="box-title">
						<text class="title">您还不是{{organize}}成员</text>
					</view>
					<view class="box-btn flex align-items-center" @click="toApplyMember()">
						<text>立即申请</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="layout-2" v-else-if="showStyle.layout == 2">
			<!-- 用户信息 -->
			<view class="user-info-content flex align-items-center" v-if="token" @click="toModifyUser()">
				<image class="content-avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				<view class="content-box flex-item" :style="{color: showStyle.titleTextColor == 'black' ? '#5A5B6E' : showStyle.titleTextColor}">
					<view class="name text-ellipsis">{{userInfo.nickname}}</view>
					<view class="phone text-ellipsis" v-if="userInfo.mobile">{{userInfo.mobile}}</view>
					<button class="phone clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" @click.stop v-else>绑定手机号</button>
				</view>
			</view>
			<!-- 登录 -->
			<view class="user-info-login" v-else @click="toLogin()">
				<view class="login-text" :style="{color: showStyle.titleTextColor == 'black' ? '#5A5B6E' : showStyle.titleTextColor}">立即登录</view>
			</view>
			<!-- 会员状态 -->
			<view class="user-info-member" v-if="!showStyle.hideMember && (memberState != -1 || !showStyle.hideApply)">
				<!-- 会员 -->
				<view class="member-box flex align-items-center" v-if="memberState == 6">
					<image class="box-icon" src="/static/mine/auth.png" mode="aspectFit"></image>
					<view class="box-title flex-item">
						<view class="title">{{userInfo.member_level_name}}</view>
						<view class="subtitle">到期时间{{userInfo.expire_time ? userInfo.expire_time.replaceAll("-", "/") : userInfo.expire_time}}</view>
					</view>
					<view class="box-btn flex align-items-center" @click="getPoster">
						<text>电子会牌</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 已到期 -->
				<view class="member-box flex align-items-center" v-else-if="memberState == 7">
					<image class="box-icon" src="/static/mine/auth.png" mode="aspectFit"></image>
					<view class="box-title flex-item">
						<view class="title">会员</view>
						<view class="subtitle">已到期</view>
					</view>
					<view class="box-btn flex align-items-center" @click="toPayment()">
						<text>待缴纳会费</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 待缴费 -->
				<view class="member-box flex align-items-center" v-else-if="memberState == 3 || memberState == 4 || memberState == 5">
					<image class="box-icon" src="/static/mine/auth.png" mode="aspectFit"></image>
					<view class="box-title flex-item">
						<view class="title">会员</view>
						<view class="subtitle">已通过审核</view>
					</view>
					<view class="box-btn flex align-items-center" @click="toPayment()">
						<text>待缴纳会费</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 待审核 -->
				<view class="member-box flex align-items-center" v-else-if="memberState == 1">
					<image class="box-icon" src="/static/mine/auth.png" mode="aspectFit"></image>
					<view class="box-title flex-item">
						<view class="title">会员</view>
						<view class="subtitle">已提交审核，请等待审核</view>
					</view>
				</view>
				<!-- 已驳回 -->
				<view class="member-box flex align-items-center" v-else-if="memberState == 2">
					<image class="box-icon" src="/static/mine/auth.png" mode="aspectFit"></image>
					<view class="box-title flex-item">
						<view class="title">会员</view>
						<view class="subtitle">已驳回</view>
					</view>
					<view class="box-btn flex align-items-center" @click="toApplyMember()">
						<text>重新申请</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 非会员 -->
				<view class="member-box flex align-items-center" v-else>
					<image class="box-icon" src="/static/mine/auth.png" mode="aspectFit"></image>
					<view class="box-title flex-item">
						<text class="title">普通用户</text>
						<view class="subtitle">您还不是{{organize}}成员</view>
					</view>
					<view class="box-btn flex align-items-center" @click="toApplyMember()">
						<text>立即申请</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="layout-3" v-else-if="showStyle.layout == 3">
			<view class="user-info-top">
				<!-- 用户信息 -->
				<view class="top-content flex align-items-center" v-if="token" @click="toModifyUser()">
					<view class="content-box flex-item">
						<view class="name text-ellipsis">{{userInfo.nickname}}</view>
						<view class="phone text-ellipsis" v-if="userInfo.mobile">{{userInfo.mobile}}</view>
						<button class="phone clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" @click.stop v-else>绑定手机号</button>
					</view>
					<image class="content-avatar" :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<!-- 登录 -->
				<view class="top-login" v-else @click="toLogin()">
					<view class="login-text">立即登录</view>
				</view>
				<!-- 会员状态 -->
				<view class="top-label" v-if="!showStyle.hideMember">
					<view class="bg"></view>
					<view class="icon" :style="{'background-image': 'url('+ iconAuth +')'}" v-if="iconAuth"></view>
					<text class="text">{{memberState == 6 ? userInfo.member_level_name : '普通用户'}}</text>
				</view>
				<!-- 右侧图标 -->
				<view class="top-icon" v-if="iconRectangle">
					<view class="icon" :style="{'background-image': 'url('+ iconRectangle +')'}"></view>
					<view class="icon" :style="{'background-image': 'url('+ iconRectangle +')'}"></view>
					<view class="icon" :style="{'background-image': 'url('+ iconRectangle +')'}"></view>
				</view>
				<!-- 背景图 -->
				<image class="top-bg" src="/static/mine_bg.png" mode="aspectFill"></image>
			</view>
			<view class="user-info-bottom" v-if="!showStyle.hideMember && (memberState != -1 || !showStyle.hideApply)">
				<!-- 会员 -->
				<view class="bottom-box flex align-items-center" v-if="memberState == 6">
					<view class="box-title flex-item">到期时间{{userInfo.expire_time ? userInfo.expire_time.replaceAll("-", "/") : userInfo.expire_time}}</view>
					<view class="box-btn flex align-items-center" @click="getPoster">
						<text>电子会牌</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 已到期 -->
				<view class="bottom-box flex align-items-center" v-else-if="memberState == 7">
					<view class="box-title flex-item">已到期</view>
					<view class="box-btn flex align-items-center" @click="toPayment()">
						<text>待缴纳会费</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 待缴费 -->
				<view class="bottom-box flex align-items-center" v-else-if="memberState == 3 || memberState == 4 || memberState == 5">
					<view class="box-title flex-item">已通过审核</view>
					<view class="box-btn flex align-items-center" @click="toPayment()">
						<text>待缴纳会费</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 待审核 -->
				<view class="bottom-box flex align-items-center" v-else-if="memberState == 1">
					<view class="box-title flex-item">已提交审核，请等待审核</view>
				</view>
				<!-- 已驳回 -->
				<view class="bottom-box flex align-items-center" v-else-if="memberState == 2">
					<view class="box-title flex-item">已驳回</view>
					<view class="box-btn flex align-items-center" @click="toApplyMember()">
						<text>重新申请</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
				<!-- 非会员 -->
				<view class="bottom-box flex align-items-center" v-else>
					<view class="box-title flex-item">您还不是{{organize}}成员</view>
					<view class="box-btn flex align-items-center" @click="toApplyMember()">
						<text>立即申请</text>
						<view class="icon" :style="{'background-image': 'url('+ iconMore1 +')'}" v-if="iconMore1"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		name: "userInfo",
		props: ['showStyle'],
		data() {
			return {
				// 图标
				iconMore1: "",
				iconMore2: "",
				iconMore3: "",
				iconMore4: "",
				iconMore5: "",
				iconAuth: "",
				iconRectangle: "",
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				organize: state => state.app.organize,
				token: state => state.user.token,
				userInfo: state => state.user.userInfo,
				memberState: state => {
					if (state.user.userInfo && state.user.userInfo.apply_member_state) {
						return state.user.userInfo.apply_member_state.state
					} else {
						return -1
					}
				},
			})
		},
		watch: {
			showStyle: {
				handler() {
					this.getSvgIcon()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 获取图标
			getSvgIcon() {
				if (this.showStyle.layout == 1) {
					this.iconMore1 = svgData.svgToUrl("more", "#5A5B6E")
					this.iconMore2 = svgData.svgToUrl("more", "#325DFF")
					this.iconMore3 = svgData.svgToUrl("more", "#F39700")
					this.iconMore4 = svgData.svgToUrl("more", "#379CFA")
					this.iconMore5 = svgData.svgToUrl("more", "#FA3737")
				} else if (this.showStyle.layout == 2) {
					this.iconMore1 = svgData.svgToUrl("more", this.themeColor)
				} else {
					this.iconMore1 = svgData.svgToUrl("more", "#FFF")
					this.iconAuth = svgData.svgToUrl("auth", this.themeColor)
					this.iconRectangle = svgData.svgToUrl("rectangle", this.themeColor)
				}
			},
			// 获取会员状态类名
			getMemberClass(state) {
				if (state == 6) return "state-1"
				else if (state == 7) return "state-2"
				else if (state == 3 || state == 4 || state == 5) return "state-3"
				else if (state == 1) return "state-2"
				else if (state == 2) return "state-4"
				else return ""
			},
			// 跳转登录
			toLogin() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/login/index"
				})
			},
			// 显示电子会牌
			getPoster() {
				this.$emit("getPoster")
			},
			// 跳转修改用户信息
			toModifyUser() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mine/settings/user"
				})
			},
			// 跳转申请入会
			toApplyMember() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/apply/index"
				})
			},
			// 跳转会费缴纳
			toPayment() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/member/fees/index"
				})
			},
			// 绑定手机号
			bindPhoneNumber(e) {
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.showLoading({
						mask: true,
						title: "加载中",
					})
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							let data = e.detail
							data.code = loginRes.code
							this.$util.request("login.bindMobile", data).then(res => {
								uni.hideLoading()
								if (res.code == 1) {
									uni.showToast({
										icon: "success",
										title: "绑定成功",
									})
									this.$emit("getUserInfo")
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							}).catch(error => {
								uni.hideLoading()
								console.error('获取用户手机号码 ', error)
							})
						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								icon: "none",
								title: "授权失败，请重试"
							})
						}
					});
				} else {
					uni.showToast({
						title: '获取失败，请重新获取',
						icon: 'none'
					})
				}
			},
		},
	}
</script>

<style lang="scss">
	.component-user-info {
		.layout-1 {
			padding-bottom: 16rpx;

			.user-info-content {
				padding: 48rpx 32rpx 32rpx;

				.content-avatar {
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
					margin-right: 48rpx;
				}

				.content-box {
					color: #5A5B6E;

					.name {
						font-size: 36rpx;
						font-weight: 600;
						line-height: 50rpx;
					}

					.phone {
						font-size: 32rpx;
						line-height: 44rpx;
						margin-top: 16rpx;
						text-align: left;
					}
				}
			}

			.user-info-login {
				padding: 48rpx 32rpx 32rpx;

				.login-text {
					color: #5A5B6E;
					font-size: 36rpx;
					font-weight: 600;
					height: 128rpx;
					line-height: 128rpx;
				}
			}

			.user-info-member {
				margin-top: 16rpx;
				position: relative;
				background: linear-gradient(90.00deg, #BABABA, #FEFEFE 50.802%, #CECECE 100%);
				min-height: 190rpx;
				padding: 32rpx 48rpx;
				border-radius: 10rpx;

				&::after {
					content: "";
					display: block;
					position: absolute;
					left: 16rpx;
					right: 16rpx;
					bottom: -8rpx;
					height: 128rpx;
					z-index: -1;
					border-radius: 10rpx;
					background: #C1C1C1;
				}

				&::before {
					content: "";
					display: block;
					position: absolute;
					left: 32rpx;
					right: 32rpx;
					bottom: -16rpx;
					height: 128rpx;
					z-index: -1;
					border-radius: 10rpx;
					background: #929292;
				}

				.member-image {
					.image-circular {
						width: 296rpx;
						height: auto;
						position: absolute;
						top: 0;
						left: 34rpx;
						bottom: 6rpx;
						z-index: 5;
					}

					.image-note {
						width: 156rpx;
						height: 140rpx;
						position: absolute;
						top: 26rpx;
						right: 36rpx;
						z-index: 5;
					}

					.image-auth {
						position: absolute;
						top: 16rpx;
						right: 80rpx;
						bottom: 0;
						z-index: 5;
						width: auto;
					}
				}

				.member-box {
					position: relative;
					z-index: 8;
					display: flex;
					flex-direction: column;
					align-items: flex-start;

					.box-title {
						color: #5A5B6E;

						.title {
							font-size: 32rpx;
							font-weight: 600;
							line-height: 44rpx;
						}

						.subtitle {
							font-size: 24rpx;
							line-height: 44rpx;
							margin-left: 8rpx;
						}
					}

					.box-btn {
						margin-top: 24rpx;
						padding: 12rpx 20rpx;
						border-radius: 8rpx;
						background: #ffffff;

						text {
							color: #5A5B6E;
							font-size: 24rpx;
							line-height: 34rpx;
						}

						.icon {
							margin-left: 16rpx;
							width: 24rpx;
							height: 24rpx;
							background-size: 24rpx;
						}
					}

					.box-tag {
						margin-top: 24rpx;
						color: #ffffff;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				&.state-1 {
					background: linear-gradient(90.00deg, #325DFF, #88C1FF 50.802%, #489FFF 100%);

					&::after {
						background: #82ACFF;
					}

					&::before {
						background: #C6E1FF;
					}

					.member-box {
						.box-title {
							color: #FFFFFF;
						}

						.box-btn text {
							color: #325DFF;
						}
					}
				}

				&.state-2 {
					background: linear-gradient(90.00deg, #FF9D00, #FF8D4E 50.802%, #FFD9AD 100%);

					&::after {
						background: #FFC66B;
					}

					&::before {
						background: #FFE2B4;
					}

					.member-box {
						.box-title {
							color: #FFFFFF;
						}

						.box-btn text {
							color: #F39700;
						}
					}
				}

				&.state-3 {
					background: linear-gradient(90.00deg, #379CFA, #57C3FF 50.802%, #8DC8FF 100%);

					&::after {
						background: #83C3FF;
					}

					&::before {
						background: #B4DBFF;
					}

					.member-box {
						.box-title {
							color: #FFFFFF;
						}

						.box-btn text {
							color: #379CFA;
						}
					}
				}

				&.state-4 {
					background: linear-gradient(90.00deg, #FA3737, #FF5757 50.802%, #FF8D8D 100%);

					&::after {
						background: #FF6B6B;
					}

					&::before {
						background: #FFB4B4;
					}

					.member-box {
						.box-title {
							color: #FFFFFF;
						}

						.box-btn text {
							color: #FA3737;
						}
					}
				}
			}
		}

		.layout-2 {
			padding-bottom: 48rpx;

			.user-info-content {
				padding: 48rpx 32rpx 0;

				.content-avatar {
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
					margin-right: 48rpx;
				}

				.content-box {
					color: #5A5B6E;

					.name {
						font-size: 36rpx;
						font-weight: 600;
						line-height: 50rpx;
					}

					.phone {
						font-size: 32rpx;
						line-height: 44rpx;
						margin-top: 16rpx;
						text-align: left;
					}
				}
			}

			.user-info-login {
				padding: 48rpx 32rpx 0;

				.login-text {
					color: #5A5B6E;
					font-size: 36rpx;
					font-weight: 600;
					height: 128rpx;
					line-height: 128rpx;
				}
			}

			.user-info-member {
				margin-top: 48rpx;
				position: relative;
				border-radius: 16rpx;
				background: #303752;
				padding: 24rpx 32rpx;

				.member-box {
					.box-icon {
						width: 48rpx;
						height: 48rpx;
						margin-right: 16rpx;
					}

					.box-title {
						color: #FFF;

						.title {
							font-size: 28rpx;
							font-weight: 600;
							line-height: 40rpx;
						}

						.subtitle {
							font-size: 28rpx;
							line-height: 40rpx;
						}
					}

					.box-btn {
						margin-left: 24rpx;
						padding: 12rpx 20rpx;
						border-radius: 30rpx;
						background: #ffffff;

						text {
							color: var(--theme-color);
							font-size: 24rpx;
							line-height: 34rpx;
						}

						.icon {
							margin-left: 16rpx;
							width: 24rpx;
							height: 24rpx;
							background-size: 24rpx;
						}
					}
				}
			}
		}

		.layout-3 {
			background: #FFF;
			border-radius: 16rpx 16rpx 0 0;

			.user-info-top {
				border-radius: 16rpx 16rpx 0 0;
				padding: 24rpx 48rpx;
				position: relative;
				z-index: 1;

				.top-content {
					position: relative;
					z-index: 1;

					.content-box {
						color: #5A5B6E;

						.name {
							font-size: 36rpx;
							font-weight: 600;
							line-height: 50rpx;
						}

						.phone {
							font-size: 32rpx;
							line-height: 44rpx;
							margin-top: 16rpx;
							text-align: left;
						}
					}

					.content-avatar {
						width: 128rpx;
						height: 128rpx;
						border-radius: 50%;
						margin-left: 48rpx;
						position: relative;
						top: -56rpx;
					}
				}

				.top-login {
					position: relative;
					z-index: 1;

					.login-text {
						color: #5A5B6E;
						font-size: 36rpx;
						font-weight: 600;
						height: 128rpx;
						line-height: 128rpx;
					}
				}

				.top-label {
					display: inline-flex;
					align-items: center;
					border-radius: 30rpx;
					background: #FFF;
					box-shadow: 0 0 8rpx 0 rgba(255, 255, 255, 0.50);
					padding: 12rpx 16rpx;
					min-width: 136rpx;
					margin-top: 16rpx;
					position: relative;
					z-index: 1;
					overflow: hidden;

					.bg {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						z-index: -1;
						opacity: 0.1;
						background: var(--theme-color);
					}

					.icon {
						width: 24rpx;
						height: 24rpx;
						background-size: 24rpx;
					}

					.text {
						color: var(--theme-color);
						font-size: 20rpx;
						line-height: 28rpx;
						margin-left: 8px;
					}
				}

				.top-icon {
					position: absolute;
					right: 16rpx;
					bottom: 0;
					height: 106rpx;
					display: flex;

					.icon {
						width: 116rpx;
						height: 106rpx;
						background-size: 100%;
						margin-left: -52rpx;
						color: var(--theme-color);
					}
				}

				.top-bg {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					z-index: -1;
					border-radius: 16rpx 16rpx 0 0;
				}
			}

			.user-info-bottom {
				position: relative;
				background: #FFF;
				padding: 14rpx 32rpx;

				.bottom-box {
					.box-title {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.box-btn {
						margin-left: 24rpx;
						padding: 12rpx 20rpx;
						border-radius: 30rpx;
						background: var(--theme-color);

						text {
							color: #FFF;
							font-size: 24rpx;
							line-height: 34rpx;
						}

						.icon {
							margin-left: 16rpx;
							width: 24rpx;
							height: 24rpx;
							background-size: 24rpx;
						}
					}
				}
			}
		}
	}
</style>