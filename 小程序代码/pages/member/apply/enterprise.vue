<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 企业/团体信息 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" :title="memberType == 2 ? memberTypeConfig.enterprise : memberTypeConfig.group"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-header" :style="{top: titleBarHeight + 'px'}">
				<view class="header-image" :style="{'background-image': 'url('+ iconSheet +')'}" v-if="iconSheet"></view>
				<view class="header-title">入会申请表</view>
				<view class="header-subtitle">填写完成提交后，审核时间为1~2天</view>
			</view>
			<view class="main-form">
				<member-apply ref="memberApply" :show-type="memberType" :show-data="applyField" @onChange="pageChange"></member-apply>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="heandleSubmit()" v-if="userMobile">提交申请</view>
				<button class="footer-btn clear" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>提交申请</button>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import memberApply from "@/pages/component/member/apply.vue"
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		components: {
			memberApply,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 入会字段
				applyField: [],
				// 入会类型
				memberType: null,
				// 是否为重新申请
				isReapply: false,
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
				memberTypeConfig: state => state.app.memberTypeConfig,
			})
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
			// #endif
		},
		onLoad(option) {
			this.isReapply = option.reapply == 1 ? true : false
			uni.showLoading({
				title: "加载中"
			})
			this.memberType = option.type
			if (this.isReapply) {
				this.getMemberInfo(() => {
					this.loadEnd = true
					uni.hideLoading()
				})
			} else {
				this.getField(() => {
					this.loadEnd = true
					uni.hideLoading()
				})
			}
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
			// 获取入会字段
			getField(fn) {
				this.$util.request("member.field", {
					type: this.memberType
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = []
						if (this.memberType == 2) {
							list = res.data.company
						} else {
							list = res.data.organize
						}
						list.forEach((item) => {
							if (item.type == "checkbox") {
								item.value = []
							} else if (item.type == "image") {
								if ((this.memberType == 2 && item.field == 'company_logo') || (this.memberType == 3 && item.field == 'organize_logo')) {
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
						if (this.memberType == 2) {
							list = res.data.company
						} else {
							list = res.data.organize
						}
						this.uploadedList = []
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
			// 提交申请
			heandleSubmit() {
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
							if (data[i].type == "checkbox") {
								if (!data[i].value.length) isEmpty = true
							} else if (data[i].type == "image") {
								if ((this.memberType == 2 && data[i].field == "company_logo") || (this.memberType == 3 && data[i].field == "organize_logo")) {
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
							if ((this.memberType == 2 && data[i].field == "company_logo") || (this.memberType == 3 && data[i].field == "organize_logo")) {
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
						} else if (data[i].type == "video" && data[i].value) {
							if (!this.uploadedList.includes(data[i].value)) {
								fileList.push({
									index: i,
									value: data[i].value
								})
							}
						} else if (data[i].type == "cert" && data[i].value.image) {
							if (!this.uploadedList.includes(data[i].value.image)) {
								fileList.push({
									index: i,
									value: data[i].value.image
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
						if (fileList.length) {
							this.uploadFiles(fileList, (files) => {
								for (let i in fileList) {
									if (data[fileList[i].index].type == "image") {
										if ((this.memberType == 2 && data[fileList[i].index].field == "company_logo") || (this.memberType == 3 && data[fileList[i].index].field == "organize_logo")) {
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
				let fields = {
					person: getApp().globalData.applyField,
				}
				if (this.memberType == 2) fields.company = data
				else fields.organize = data
				this.$util.request("member.apply", {
					type: this.memberType,
					data: JSON.stringify(fields)
				}).then(res => {
					if (res.code == 1) {
						getApp().globalData.applyField = []
						uni.reLaunch({
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
					console.error('提交入会申请 ', error)
				})
			},
			// 订阅消息
			subscribeMessage(fn, number = 0) {
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
				background: linear-gradient(0deg, #F6F7FB, var(--theme-color) 316.667%);
				padding: 80rpx 48rpx 68rpx;

				.header-image {
					position: absolute;
					top: 64rpx;
					right: 48rpx;
					width: 218rpx;
					height: 198rpx;
					background-size: 218rpx 198rpx;
				}

				.header-title {
					color: var(--theme-color);
					font-size: 48rpx;
					font-weight: 600;
					line-height: 68rpx;
					position: relative;
					z-index: 1;
				}

				.header-subtitle {
					margin-top: 32rpx;
					color: #999999;
					font-size: 28rpx;
					line-height: 40rpx;
					position: relative;
					z-index: 1;
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
				padding: 20rpx 24rpx 12rpx;

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