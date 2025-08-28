<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 申请入会 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="申请入会"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header" :style="{top: titleBarHeight + 'px'}">
				<view class="header-tips" v-if="memberState.state == 2">驳回原因：{{memberState.reject}}</view>
				<view class="header-box">
					<view class="box-image" :style="{'background-image': 'url('+ iconSheet +')'}" v-if="iconSheet"></view>
					<view class="box-title">入会申请表</view>
					<view class="box-subtitle">填写完成提交后，审核时间为1~2天</view>
				</view>
			</view>
			<view class="main-form">
				<view class="form-item" @click="selectMemberType">
					<view class="item-title"><text>*</text>入会类型</view>
					<view class="item-input">
						<view class="input" v-if="memberType">
							<text v-for="item in typeList" :key="item.id" v-if="memberType == item.id">{{item.name}}</text>
						</view>
						<view class="input placeholder" v-else>请选择入会类型</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<member-apply ref="memberApply" :show-type="1" :show-data="applyField" @onChange="pageChange"></member-apply>
			</view>
			<view class="main-footer">
				<view class="footer-read flex align-items-center" @click="isRead = !isRead">
					<view class="radio" :class="{active: isRead}">
						<image src="/static/tick.png" mode="aspectFill" v-if="isRead"></image>
					</view>
					<view class="label flex-item">请仔细阅读并同意 <text @click.stop="toAgreement()">《入会协议》</text></view>
				</view>
				<view class="footer-btn" @click="heandleSubmit()" v-if="memberType != 1 || memberType == 1 && userMobile">{{memberType == 1 ? "提交申请" : "下一步"}}</view>
				<button class="footer-btn clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>提交申请</button>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 入会类型选择 -->
		<select-picker ref="selectPicker" title="入会类型" @onChange="pageChange" @confirm="changeMemberType"></select-picker>
	</view>
</template>

<script>
	import memberApply from "@/pages/component/member/apply.vue"
	import selectPicker from "@/pages/component/picker/select.vue"
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		components: {
			memberApply,
			selectPicker,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 入会类型列表
				typeList: [],
				// 已选入会类型
				memberType: null,
				// 入会字段
				applyField: [],
				// 会员状态
				memberState: {},
				// 是否已读
				isRead: false,
				// 重新申请时的入会类型
				reapplyType: null,
				// 已上传图片列表
				uploadedList: [],
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				iconSheet: state => {
					return svgData.svgToUrl("sheet", state.app.themeColor)
				},
				subscribeIds: state => state.app.subscribeNotifyIds,
				userMobile: state => state.user.mobile,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad() {
			uni.showLoading({
				title: "加载中"
			})
			this.getMemberState(() => {
				this.loadEnd = true
				uni.hideLoading()
			})
		},
		onShow() {
			let pages = getCurrentPages();
			if (pages[pages.length - 1].$vm.editorContent) {
				const result = pages[pages.length - 1].$vm.editorContent
				this.$refs.memberApply.setEditorData(result)
				delete pages[pages.length - 1].$vm.editorContent;
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取入会类型
			getMemberType(fn) {
				this.$util.request("member.type").then(res => {
					if (res.code == 1) {
						this.typeList = res.data.map(item => {
							return {
								id: item.type,
								name: item.name
							}
						})
						this.memberType = this.typeList[0].id
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取入会类型 ', error)
				})
			},
			// 获取会员状态
			getMemberState(fn) {
				this.$util.request("member.state").then(res => {
					if (res.code == 1) {
						this.memberState = res.data.state
						if (this.memberState.state == -1) {
							this.getMemberType(() => {
								this.getField(fn)
							})
						} else if (this.memberState.state == 2) {
							this.getMemberType()
							this.getMemberInfo(fn)
						} else {
							uni.hideLoading()
							uni.showModal({
								title: "系统提示",
								content: "您已提交入会申请，无需重复提交",
								cancelText: "返回",
								confirmText: "前往查看",
								success: (res) => {
									if (res.confirm) {
										uni.switchTab({
											url: "/pages/mine/index"
										})
									} else {
										if (getCurrentPages().length == 1) {
											uni.switchTab({
												url: "/pages/index/index"
											})
										} else {
											uni.navigateBack()
										}
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
			// 获取入会字段
			getField(fn) {
				this.$util.request("member.field", {
					type: this.memberType
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = []
						if (this.memberType == 1) {
							list = res.data
						} else {
							list = res.data.person
						}
						list.forEach((item) => {
							if (item.type == "checkbox") {
								item.value = []
							} else if (item.type == "text" && item.field == "address") {
								item.value = {
									latitude: "",
									longitude: "",
									name: "",
									address: ""
								}
							} else if (item.type == "image") {
								if (item.field == "avatar") {
									item.value = ""
								} else {
									item.value = []
								}
							} else if (item.type == "cert") {
								item.value = {
									name: "",
									number: "",
									image: "",
								}
							} else if (item.type == "file") {
								item.value = []
							} else {
								item.value = ""
							}
						});
						this.applyField = list
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取入会字段 ', error)
				})
			},
			// 获取入会信息
			getMemberInfo(fn) {
				this.$util.request("member.applyDetails").then(res => {
					if (res.code == 1) {
						let list = []
						if (res.data.company) {
							this.memberType = 2
							this.reapplyType = 2
							list = res.data.person
						} else if (res.data.organize) {
							this.memberType = 3
							this.reapplyType = 3
							list = res.data.person
						} else {
							this.memberType = 1
							this.reapplyType = 1
							list = res.data
						}
						this.uploadedList = []
						list.forEach((item) => {
							if (item.type == "checkbox") {
								if (item.value) item.value = item.value.split(",")
								else item.value = []
							} else if (item.type == "text" && item.field == "address") {
								if (!item.value) {
									item.value = {
										latitude: "",
										longitude: "",
										name: "",
										address: ""
									}
								}
							} else if (item.type == "image") {
								if (item.field == "avatar") {
									if (item.value) {
										this.uploadedList.push(item.value)
									} else {
										item.value = ""
									}
								} else {
									if (item.value) {
										if (typeof(item.value) == "string") {
											item.value = item.value.split(",")
										}
										this.uploadedList = [...this.uploadedList, ...item.value]
									} else {
										item.value = []
									}
								}
							} else if (item.type == "cert") {
								if (!item.value) {
									item.value = {
										name: "",
										number: "",
										image: "",
									}
								} else if (item.value.image) {
									this.uploadedList.push(item.value.image)
								}
							} else if (item.type == "video") {
								this.uploadedList.push(item.value)
							} else if (item.type == "file") {
								if (item.value) {
									if (typeof(item.value) == "string") {
										item.value = item.value.split(",")
									}
									this.uploadedList = [...this.uploadedList, ...item.value.map(item => item.path)]
								} else {
									item.value = []
								}
							}
						});
						this.applyField = list
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
					console.error('获取入会信息 ', error)
				})
			},
			// 跳转入会协议
			toAgreement() {
				this.$util.toPage({
					mode: 1,
					path: "/pages/mine/settings/agreement?type=3"
				})
			},
			// 选择入会类型
			selectMemberType() {
				this.$refs.selectPicker.open(this.typeList, this.memberType)
			},
			// 改变入会类型
			changeMemberType(value) {
				this.memberType = value.id
				uni.showLoading({
					title: "加载中"
				})
				if (this.memberState.state == 2 && this.reapplyType == this.memberType) {
					this.getMemberInfo(() => {
						uni.hideLoading()
					})
				} else {
					this.getField(() => {
						uni.hideLoading()
					})
				}
			},
			// 提交申请
			heandleSubmit() {
				if (!this.isRead) {
					uni.showToast({
						icon: "none",
						title: "请仔细阅读并同意《入会协议》"
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$refs.memberApply.getApplyField((data) => {
					let fileList = []
					for (let i in data) {
						// 判断必填项是否为空
						if (data[i].required == 1) {
							let isEmpty = false
							if (data[i].type == "text" && data[i].field == "address") {
								if (!data[i].value.address) isEmpty = true
							} else if (data[i].type == "checkbox") {
								if (!data[i].value.length) isEmpty = true
							} else if (data[i].type == "image") {
								if (data[i].field == "avatar") {
									if (!data[i].value) isEmpty = true
								} else {
									if (!data[i].value.length) isEmpty = true
								}
							} else if (data[i].type == "cert") {
								if (!data[i].value.name || !data[i].value.number || !data[i].value.image) isEmpty = true
							} else if (data[i].type == "file") {
								if (!data[i].value.length) isEmpty = true
							} else {
								if (!data[i].value && data[i].value !== 0) isEmpty = true
							}
							if (isEmpty) {
								uni.hideLoading()
								uni.showToast({
									icon: "none",
									title: data[i].label + "不能为空"
								})
								return
							}
						}
						// 判断手机号是否合规
						if (data[i].type == "number" && data[i].field == "mobile") {
							if (!this.$util.validation("phone", data[i].value)) {
								uni.hideLoading()
								uni.showToast({
									icon: "none",
									title: "请输入正确的手机号"
								})
								return
							}
						}
						// 判断证书是否合规
						if (data[i].type == "cert") {
							if (data[i].value.name || data[i].value.number || data[i].value.image) {
								if (!data[i].value.name || !data[i].value.number || !data[i].value.image) {
									uni.hideLoading()
									uni.showToast({
										icon: "none",
										title: data[i].label + "存在未填项"
									})
									return
								}
							}
						}
						// 设置字段值格式
						if (data[i].type == "number") {
							data[i].value = (data[i].value || data[i].value === 0) ? Number(data[i].value) : data[i].value
						} else if (data[i].type == "checkbox") {
							data[i].value = data[i].value.join()
						} else if (data[i].type == "image") {
							if (data[i].field == "avatar") {
								if (!this.uploadedList.includes(data[i].value)) {
									fileList.push({
										index: i,
										value: data[i].value
									})
								}
							} else {
								for (let j in data[i].value) {
									if (!this.uploadedList.includes(data[i].value[j])) {
										fileList.push({
											index: i,
											number: j,
											value: data[i].value[j]
										})
									}
								}
							}
						} else if (data[i].type == "cert" && data[i].value.image) {
							if (!this.uploadedList.includes(data[i].value.image)) {
								fileList.push({
									index: i,
									value: data[i].value.image
								})
							}
						} else if (data[i].type == "video" && data[i].value) {
							if (!this.uploadedList.includes(data[i].value)) {
								fileList.push({
									index: i,
									value: data[i].value
								})
							}
						} else if (data[i].type == "file") {
							for (let j in data[i].value) {
								if (!this.uploadedList.includes(data[i].value[j].path)) {
									fileList.push({
										index: i,
										number: j,
										value: data[i].value[j].path
									})
								}
							}
						}
					}
					this.subscribeMessage(() => {
						this.checkPhone(data, (result) => {
							if (result) {
								if (fileList.length) {
									this.uploadFiles(fileList, (files) => {
										for (let i in fileList) {
											if (data[fileList[i].index].type == "image") {
												if (data[fileList[i].index].field == "avatar") {
													data[fileList[i].index].value = files[i]
												} else {
													data[fileList[i].index].value[fileList[i].number] = files[i]
												}
											} else if (data[fileList[i].index].type == "video") {
												data[fileList[i].index].value = files[i]
											} else if (data[fileList[i].index].type == "cert") {
												data[fileList[i].index].value.image = files[i]
											} else if (data[fileList[i].index].type == "file") {
												data[fileList[i].index].value[fileList[i].number].path = files[i]
											}
										}
										this.submitEvent(data)
									})
								} else {
									this.submitEvent(data)
								}
							} else {
								uni.showToast({
									title: "该手机号已被使用，请更换手机号",
									icon: "none"
								})
							}
						})
					})
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
									this.$store.commit('user/updateMobile', res.data.phoneNumber)
									this.heandleSubmit()
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
								title: "授权手机号失败，请重试"
							})
						}
					});
				} else {
					uni.showToast({
						title: '获取手机号失败，请重新获取',
						icon: 'none'
					})
				}
			},
			// 上传文件
			uploadFiles(list, fn) {
				this.$util.uploadFileMultiple(list.map(item => item.value)).then(result => {
					fn(result)
				}).catch(error => {
					console.error('上传文件 ', error)
				})
			},
			// 提交事件
			submitEvent(data) {
				for (let i in data) {
					if (data[i].type == "image" && typeof(data[i].value) == "object") {
						data[i].value = data[i].value.join()
					}
				}
				if (this.memberType == 1) {
					this.$util.request("member.apply", {
						type: this.memberType,
						data: JSON.stringify(data)
					}).then(res => {
						if (res.code == 1) {
							uni.redirectTo({
								url: "/pages/member/apply/success",
								success: () => {
									uni.hideLoading()
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}).catch(error => {
						uni.hideLoading()
						console.error('提交入会申请 ', error)
					})
				} else {
					uni.hideLoading()
					getApp().globalData.applyField = data
					if (this.memberState.state == 2 && this.reapplyType == this.memberType) {
						this.$util.toPage({
							mode: 1,
							path: "/pages/member/apply/enterprise?reapply=1&type=" + this.memberType
						})
					} else {
						this.$util.toPage({
							mode: 1,
							path: "/pages/member/apply/enterprise?type=" + this.memberType
						})
					}
				}
			},
			// 订阅消息
			subscribeMessage(fn, number = 0) {
				if (this.memberType == 1) {
					// #ifdef MP-WEIXIN
					let tmplIds = []
					if (this.subscribeIds?.applet_initiation_audit) tmplIds.push(this.subscribeIds.applet_initiation_audit)
					if (this.subscribeIds?.applet_initiation_success) tmplIds.push(this.subscribeIds.applet_initiation_success)
					if (this.subscribeIds?.applet_member_expiretime) tmplIds.push(this.subscribeIds.applet_member_expiretime)
					uni.requestSubscribeMessage({
						tmplIds,
						success: () => {
							fn()
						},
						fail: (error) => {
							if (error.errCode == 20004) {
								uni.hideLoading()
								uni.showModal({
									title: '提示',
									content: '请前往设置打开接受通知',
									confirmColor: this.themeColor,
									confirmText: '继续提交',
									success: (res) => {
										if (res.confirm) {
											fn()
										}
									},
								})
							} else if (error.errCode) {
								uni.hideLoading()
								uni.showModal({
									title: '提示',
									content: '消息订阅失败，无法接收到会员通知，错误码：' + error.errCode,
									confirmColor: this.themeColor,
									confirmText: '继续提交',
									success: (res) => {
										if (res.confirm) {
											fn()
										}
									},
								})
							} else if (++number > 3) {
								this.subscribeMessage(fn, number)
							} else {
								fn()
							}
						}
					})
					// #endif
					// #ifndef MP-WEIXIN
					fn()
					// #endif
				} else {
					fn()
				}
			},
			// 验证手机号是否重复
			checkPhone(data, fn) {
				if (this.memberType == 1) {
					fn(true)
					return
				}
				let index = data.findIndex((item) => {
					if (item.field == "mobile") return true
				})
				this.$util.request("member.applyCheck", {
					mobile: data[index].value,
				}).then(res => {
					if (res.code == 1) {
						if (res.data.use_status == 1) fn(false)
						else fn(true)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('验证手机号是否重复 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 192rpx;

			.main-header {
				position: sticky;
				top: 0;
				z-index: 96;

				.header-tips {
					padding: 24rpx 32rpx;
					font-size: 24rpx;
					line-height: 34rpx;
					color: #F6F7FB;
					background: #FF6868;
				}

				.header-box {
					position: relative;
					background: linear-gradient(0deg, #F6F7FB, var(--theme-color) 316.667%);
					padding: 80rpx 48rpx 68rpx;

					.box-image {
						position: absolute;
						top: 64rpx;
						right: 48rpx;
						width: 218rpx;
						height: 198rpx;
						background-size: 218rpx 198rpx;
					}

					.box-title {
						color: var(--theme-color);
						font-size: 48rpx;
						font-weight: 600;
						line-height: 68rpx;
						position: relative;
						z-index: 1;
					}

					.box-subtitle {
						margin-top: 32rpx;
						color: #999999;
						font-size: 28rpx;
						line-height: 40rpx;
						position: relative;
						z-index: 1;
					}
				}
			}

			.main-form {
				padding: 22rpx 48rpx 32rpx;

				.form-item {
					margin-bottom: 32rpx;

					.item-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;

						text {
							color: #E60012;
						}
					}

					.item-input {
						margin-top: 32rpx;
						display: flex;
						align-items: center;
						border-radius: 16rpx;
						background: #ffffff;

						.input {
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
							flex: 1;
							padding: 32rpx;
						}

						.placeholder {
							color: #ACADB7;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.icon {
							width: 32rpx;
							height: 32rpx;
							padding-right: 32rpx;
						}
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 96;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;
				padding: 20rpx 24rpx 12rpx;

				.footer-read {
					padding: 0 12rpx;

					.radio {
						width: 32rpx;
						height: 32rpx;
						background: #D6DBDE;
						border-radius: 50%;

						&.active {
							background: var(--theme-color);
						}
					}

					.label {
						margin-left: 20rpx;
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;

						text {
							color: var(--theme-color);
						}
					}
				}

				.footer-btn {
					margin-top: 32rpx;
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
				}
			}
		}
	}
</style>