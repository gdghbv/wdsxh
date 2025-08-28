<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 编辑资料 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="编辑资料"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 顶部信息 -->
			<view class="main-header" :style="{top: titleBarHeight + 'px'}">
				<view class="header-screen">
					<view class="screen" :class="{active: selectScreen == 1}" v-if="memberType == 2 || memberType == 3" @click="changeScreen(1)">个人资料</view>
					<view class="screen" :class="{active: selectScreen == 2}" v-if="memberType == 2" @click="changeScreen(2)">企业资料</view>
					<view class="screen" :class="{active: selectScreen == 2}" v-else-if="memberType == 3" @click="changeScreen(2)">团体资料</view>
				</view>
				<view class="header-box">
					<view class="box-image" :style="{'background-image': 'url('+ iconSheet +')'}" v-if="iconSheet"></view>
					<view class="box-title">
						<text v-if="memberType == 1 || (memberType == 2 && selectScreen == 1) || (memberType == 3 && selectScreen == 1)">完善个人信息</text>
						<text v-else-if="memberType == 2 && selectScreen == 2">完善企业信息</text>
						<text v-else-if="memberType == 3 && selectScreen == 2">完善团体信息</text>
					</view>
					<view class="box-subtitle">完善信息后，可在会员详情显示</view>
				</view>
			</view>
			<!-- 个人会员 -->
			<view class="main-form" v-if="memberType == 1">
				<member-apply ref="memberPerson" :show-type="1" :show-data="personInfo" :mobile-auth="mobileAuth" @changeMobileAuth="changeMobileAuth" @onChange="pageChange"></member-apply>
			</view>
			<!-- 企业会员 -->
			<view class="main-form" v-else-if="memberType == 2">
				<view v-show="selectScreen == 1">
					<member-apply ref="memberPerson" :show-type="1" :show-data="companyInfo.person" :mobile-auth="mobileAuth" @changeMobileAuth="changeMobileAuth" @onChange="pageChange"></member-apply>
				</view>
				<view v-show="selectScreen == 2">
					<member-apply ref="memberEnterprise" :show-type="2" :show-data="companyInfo.company" @onChange="pageChange"></member-apply>
				</view>
			</view>
			<!-- 团体会员 -->
			<view class="main-form" v-else-if="memberType == 3">
				<view v-show="selectScreen == 1">
					<member-apply ref="memberPerson" :show-type="1" :show-data="organizeInfo.person" :mobile-auth="mobileAuth" @changeMobileAuth="changeMobileAuth" @onChange="pageChange"></member-apply>
				</view>
				<view v-show="selectScreen == 2">
					<member-apply ref="memberEnterprise" :show-type="3" :show-data="organizeInfo.organize" @onChange="pageChange"></member-apply>
				</view>
			</view>
			<!-- 底部按钮 -->
			<view class="main-footer">
				<view class="footer-btn" @click="heandleSubmit()">保存信息</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import memberApply from "@/pages/component/member/apply.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			memberApply,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 入会类型
				memberType: 1,
				// 已选筛选 1.个人，2.企业/团体
				selectScreen: 1,
				// 个人详情
				personInfo: {},
				// 企业详情
				companyInfo: {},
				// 团体详情
				organizeInfo: {},
				// 已上传图片列表
				uploadedList: [],
				// 手机号对外权限
				mobileAuth: 1,
				// 返回计时器
				backTimer: null,
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
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
		onUnload() {
			clearTimeout(this.backTimer)
		},
		onShow() {
			let pages = getCurrentPages();
			if (pages[pages.length - 1].$vm.editorContent) {
				const result = pages[pages.length - 1].$vm.editorContent
				if (this.memberType == 1 || this.selectScreen == 1) this.$refs.memberPerson.setEditorData(result)
				else if (this.selectScreen == 2) this.$refs.memberEnterprise.setEditorData(result)
				delete pages[pages.length - 1].$vm.editorContent;
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取会员状态
			getMemberState(fn) {
				this.$util.request("member.state").then(res => {
					if (res.code == 1) {
						this.memberState = res.data.state
						if (this.memberState.state == 6) {
							this.getMemberInfo(fn)
						} else if (this.memberState.state == -1) {
							uni.hideLoading()
							uni.showModal({
								title: "系统提示",
								content: "您还没有入会，请入会后操作",
								cancelText: "返回",
								confirmText: "去申请",
								success: (res) => {
									if (res.confirm) {
										this.$util.toPage({
											mode: 2,
											path: "/pages/member/apply/index"
										})
									} else {
										if (getCurrentPages().length == 1) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										} else {
											uni.navigateBack()
										}
									}
								}
							})
						} else if (this.memberState.state == 7) {
							uni.hideLoading()
							uni.showModal({
								title: "系统提示",
								content: "您的会员已过期，请缴纳会费后操作",
								cancelText: "返回",
								confirmText: "去缴纳",
								success: (res) => {
									if (res.confirm) {
										this.$util.toPage({
											mode: 2,
											path: "/pages/member/fees/index"
										})
									} else {
										if (getCurrentPages().length == 1) {
											uni.switchTab({
												url: "/pages/mine/index"
											})
										} else {
											uni.navigateBack()
										}
									}
								}
							})
						} else {
							uni.hideLoading()
							uni.showModal({
								title: "系统提示",
								content: "您已提交入会申请，请通过后操作",
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
			// 获取会员信息
			getMemberInfo(fn) {
				this.$util.request("member.information").then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.mobileAuth = res.data.mobile_auth || 1
						this.uploadedList = []
						if (res.data.company) {
							this.memberType = 2
							this.companyInfo = {
								person: this.setMemberField(res.data.person, 1),
								company: this.setMemberField(res.data.company, 2)
							}
						} else if (res.data.organize) {
							this.memberType = 3
							this.organizeInfo = {
								person: this.setMemberField(res.data.person, 1),
								organize: this.setMemberField(res.data.organize, 3)
							}
						} else {
							this.memberType = 1
							this.personInfo = this.setMemberField(res.data.person, 1)
						}
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取会员信息 ', error)
				})
			},
			// 设置会员字段
			setMemberField(data, type) {
				let list = JSON.parse(JSON.stringify(data))
				if (type == 1) {
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
						}
						if (item.field == "name" || item.field == "mobile" || item.field == "member_level_id") {
							item.disabled = true
						}
					});
				} else {
					list.forEach((item) => {
						if (item.type == "checkbox") {
							if (item.value) item.value = item.value.split(",")
							else item.value = []
						} else if (item.type == "image") {
							if ((this.memberType == 2 && item.field == 'company_logo') || (this.memberType == 3 && item.field == 'organize_logo')) {
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
						}
					});
				}
				return list
			},
			// 改变筛选
			changeScreen(id) {
				if (this.selectScreen == id) return
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				this.selectScreen = id
			},
			// 改变手机号对外状态
			changeMobileAuth(value) {
				this.mobileAuth = value
			},
			// 提交申请
			heandleSubmit() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$refs.memberPerson.getApplyField((data) => {
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
										type: 1,
										index: i,
										value: data[i].value
									})
								}
							} else if (data[i].value.length) {
								for (let j in data[i].value) {
									if (!this.uploadedList.includes(data[i].value[j])) {
										fileList.push({
											type: 1,
											index: i,
											number: j,
											value: data[i].value[j]
										})
									}
								}
							}
						} else if (data[i].type == "video" && data[i].value) {
							if (!this.uploadedList.includes(data[i].value)) {
								fileList.push({
									type: 1,
									index: i,
									value: data[i].value
								})
							}
						} else if (data[i].type == "cert" && data[i].value.image) {
							if (!this.uploadedList.includes(data[i].value.image)) {
								fileList.push({
									type: 1,
									index: i,
									value: data[i].value.image
								})
							}
						}
					}
					if (this.memberType == 1) {
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
									}
								}
								this.submitEvent(data)
							})
						} else {
							this.submitEvent(data)
						}
					} else {
						this.$refs.memberEnterprise.getApplyField((form) => {
							for (let j in form) {
								// 判断必填项是否为空
								if (form[j].required == 1) {
									let isEmpty = false
									if (form[j].type == "checkbox") {
										if (!form[j].value.length) isEmpty = true
									} else if (form[j].type == "image") {
										if ((this.memberType == 2 && form[j].field == "company_logo") || (this.memberType == 3 && form[j].field == "organize_logo")) {
											if (!form[j].value) isEmpty = true
										} else {
											if (!form[j].value.length) isEmpty = true
										}
									} else if (form[j].type == "cert") {
										if (!form[j].value.name || !form[j].value.number || !form[j].value.image) isEmpty = true
									} else {
										if (!form[j].value) isEmpty = true
									}
									if (isEmpty) {
										uni.hideLoading()
										uni.showToast({
											icon: "none",
											title: form[j].label + "不能为空"
										})
										return
									}
								}
								// 判断证书是否合规
								if (form[j].type == "cert") {
									if (form[j].value.name || form[j].value.number || form[j].value.image) {
										if (!form[j].value.name || !form[j].value.number || !form[j].value.image) {
											uni.hideLoading()
											uni.showToast({
												icon: "none",
												title: form[j].label + "存在未填项"
											})
											return
										}
									}
								}
								// 设置字段值格式
								if (form[j].type == "number") {
									form[j].value = (form[j].value || form[j].value === 0) ? Number(form[j].value) : form[j].value
								} else if (form[j].type == "checkbox") {
									form[j].value = form[j].value.join()
								} else if (form[j].type == "image") {
									if ((this.memberType == 2 && form[j].field == "company_logo") || (this.memberType == 3 && form[j].field == "organize_logo")) {
										if (!this.uploadedList.includes(form[j].value)) {
											fileList.push({
												type: 2,
												index: j,
												value: form[j].value
											})
										}
									} else if (form[j].value.length) {
										for (let z in form[j].value) {
											if (!this.uploadedList.includes(form[j].value[z])) {
												fileList.push({
													type: 2,
													index: j,
													number: z,
													value: form[j].value[z]
												})
											}
										}
									}
								} else if (form[j].type == "video" && form[j].value) {
									if (!this.uploadedList.includes(form[j].value)) {
										fileList.push({
											type: 2,
											index: j,
											value: form[j].value
										})
									}
								} else if (form[j].type == "cert" && form[j].value.image) {
									if (!this.uploadedList.includes(form[j].value.image)) {
										fileList.push({
											type: 2,
											index: j,
											value: form[j].value.image
										})
									}
								}
							}
							if (fileList.length) {
								this.uploadFiles(fileList, (files) => {
									for (let i in fileList) {
										if (fileList[i].type == 1) {
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
											}
										} else {
											if (form[fileList[i].index].type == "image") {
												if ((this.memberType == 2 && form[fileList[i].index].field == "company_logo") || (this.memberType == 3 && form[fileList[i].index].field == "organize_logo")) {
													form[fileList[i].index].value = files[i]
												} else {
													form[fileList[i].index].value[fileList[i].number] = files[i]
												}
											} else if (form[fileList[i].index].type == "video") {
												form[fileList[i].index].value = files[i]
											} else if (form[fileList[i].index].type == "cert") {
												form[fileList[i].index].value.image = files[i]
											}
										}
									}
									if (this.memberType == 2) {
										this.submitEvent({
											person: data,
											company: form
										})
									} else if (this.memberType == 3) {
										this.submitEvent({
											person: data,
											organize: form
										})
									}
								})
							} else {
								if (this.memberType == 2) {
									this.submitEvent({
										person: data,
										company: form
									})
								} else if (this.memberType == 3) {
									this.submitEvent({
										person: data,
										organize: form
									})
								}
							}
						})
					}
				})
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
				if (this.memberType == 1) {
					for (let i in data) {
						if (data[i].type == "image" && typeof(data[i].value) == "object") {
							data[i].value = data[i].value.join()
						}
					}
				} else if (this.memberType == 2) {
					for (let i in data.person) {
						if (data.person[i].type == "image" && typeof(data.person[i].value) == "object") {
							data.person[i].value = data.person[i].value.join()
						}
					}
					for (let i in data.company) {
						if (data.company[i].type == "image" && typeof(data.company[i].value) == "object") {
							data.company[i].value = data.company[i].value.join()
						}
					}
				} else if (this.memberType == 3) {
					for (let i in data.person) {
						if (data.person[i].type == "image" && typeof(data.person[i].value) == "object") {
							data.person[i].value = data.person[i].value.join()
						}
					}
					for (let i in data.organize) {
						if (data.organize[i].type == "image" && typeof(data.organize[i].value) == "object") {
							data.organize[i].value = data.organize[i].value.join()
						}
					}
				}
				this.$util.request("member.editInformation", {
					type: this.memberType,
					data: JSON.stringify(data),
					mobile_auth: this.mobileAuth
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							mask: true,
							title: "保存成功",
							icon: "success",
							duration: 1500
						})
						clearTimeout(this.backTimer)
						this.backTimer = setTimeout(() => {
							uni.navigateBack()
						}, 1500);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('编辑资料 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 112rpx;

			.main-header {
				position: sticky;
				top: 0;
				z-index: 96;

				.header-screen {
					display: flex;
					background: #ffffff;

					.screen {
						width: 50%;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
						text-align: center;
						padding: 32rpx 24rpx;

						&.active {
							color: var(--theme-color)
						}
					}
				}

				.header-box {
					position: relative;
					background: linear-gradient(0deg, #F6F7FB, var(--theme-color) 316.667%);
					padding: 40rpx 48rpx;

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
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 96;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;
				padding: 12rpx 24rpx;

				.footer-btn {
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