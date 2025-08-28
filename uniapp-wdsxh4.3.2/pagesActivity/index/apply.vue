<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 填写报名信息 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="填写报名信息"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<activity-apply ref="activityApply" :show-data="applyField" @onChange="pageChange"></activity-apply>
		</view>
		<!-- 底部按钮 -->
		<view class="container-footer">
			<view class="footer-btn" @click="heandleSubmit()">立即报名</view>
			<view class="safe-padding"></view>
		</view>
	</view>
</template>

<script>
	import activityApply from "@/pages/component/activity/apply.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			activityApply,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 活动id
				activityId: null,
				// 入会字段
				applyField: [],
				// 用户手机号
				userMobile: "",
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad(option) {
			this.activityId = option.id
			uni.showLoading({
				title: "加载中"
			})
			this.getUserMobile()
			this.getApplyField(() => {
				this.loadEnd = true
				uni.hideLoading()
			})
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取用户手机号
			getUserMobile() {
				this.$util.request("login.getMobile").then(res => {
					if (res.code == 1) {
						this.userMobile = res.data.mobile || ""
						var index = this.applyField.findIndex(item => {
							if (item.type == "number" && item.field == "mobile") return true
						})
						if (index > -1 && !this.applyField[index].valuel) {
							this.applyField[index].valuel = this.userMobile
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取用户手机号 ', error)
				})
			},
			// 获取报名字段
			getApplyField(fn) {
				this.$util.request("activity.field", {
					id: this.activityId,
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						let list = res.data
						list.forEach((item) => {
							if (item.type == "checkbox") {
								item.value = []
							} else if (item.type == "image") {
								item.value = []
							} else if (item.type == "map") {
								item.value = {
									latitude: "",
									longitude: "",
									name: "",
									address: ""
								}
							} else if (item.type == "number" && item.field == "mobile") {
								item.value = this.userMobile || ""
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
					if (fn) fn()
					console.error('获取报名字段 ', error)
				})
			},
			// 提交申请
			heandleSubmit() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				this.$refs.activityApply.getApplyField((data) => {
					let fileList = []
					for (let i in data) {
						// 判断必填项是否为空
						if (data[i].required == 1) {
							let isEmpty = false
							if (data[i].type == "checkbox") {
								if (!data[i].value.length) isEmpty = true
							} else if (data[i].type == "image") {
								if (!data[i].value.length) isEmpty = true
							} else if (data[i].type == "map") {
								if (!data[i].value.address) isEmpty = true
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
						// 设置字段值格式
						if (data[i].type == "number") {
							data[i].value = (data[i].value || data[i].value === 0) ? Number(data[i].value) : data[i].value
						} else if (data[i].type == "checkbox") {
							data[i].value = data[i].value.join()
						} else if (data[i].type == "image") {
							for (let j in data[i].value) {
								fileList.push({
									index: i,
									number: j,
									value: data[i].value[j]
								})
							}
						} else if (data[i].type == "video" && data[i].value) {
							fileList.push({
								index: i,
								value: data[i].value
							})
						}
					}
					if (fileList.length) {
						this.uploadFiles(fileList, (files) => {
							for (let i in fileList) {
								if (data[fileList[i].index].type == "image") {
									data[fileList[i].index].value[fileList[i].number] = files[i]
								} else if (data[fileList[i].index].type == "video") {
									data[fileList[i].index].value = files[i]
								}
							}
							this.submitEvent(data)
						})
					} else {
						this.submitEvent(data)
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
			submitEvent(formData) {
				for (let i in formData) {
					if (formData[i].type == "image") {
						formData[i].value = formData[i].value.join()
					}
				}
				this.$store.commit("app/setActivityField", JSON.stringify(formData))
				this.$util.toPage({
					mode: 1,
					path: "/pagesActivity/index/order?id=" + this.activityId
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;
		}

		.container-footer {
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
</style>