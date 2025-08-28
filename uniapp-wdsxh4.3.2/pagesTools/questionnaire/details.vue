<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 问卷详情 开发者: 麦沃德科技-暴雨
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="问卷详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<block v-if="loadEnd">
				<!-- 问卷信息 -->
				<view class="main-question-info">
					<view class="question-info-title text-ellipsis-more">{{questionDetails.data.title}}</view>
					<view class="question-info-person flex align-items-center">
						<image :src="questionDetails.data.avatar" mode="aspectFill" class="info-person-img"></image>
						<view class="info-person-item">
							<view class="flex align-items-center">
								<view class="info-person-item-name">{{questionDetails.data.member_name}}</view>
								<view class="info-person-item-level" :style="{ color: themeColor }">{{questionDetails.data.level_name}}</view>
							</view>
							<view class="info-person-item-time">{{questionDetails.data.createtime}}</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="share" class="info-person-button flex align-items-center" :style="{ background: themeColor }">
							<image src="/static/invite.png" mode="aspectFill" class="info-person-button-icon"></image>邀请填写
						</button>
						<!-- #endif -->
					</view>
					<view class="question-info-time">结束时间：{{questionDetails.data.end_time}}</view>
					<view class="question-info-introduce">
						<text>{{questionDetails.data.content}}</text>
					</view>
				</view>
				<!-- 问卷列表 -->
				<question-problem ref="questionProblem" :show-data="questionDetails.topic" @onChange="pageChange"></question-problem>
				<empty top="26%" title="暂无问题~" v-if="questionDetails.topic.length == 0"></empty>
				<!-- 提交按钮 -->
				<view class="main-bottom">
					<view class="harmless-content-button" style="background: #bbb" v-if="questionDetails.data.non_member_answer_sheet_status == 2">仅会员可填写</view>
					<view class="harmless-content-button" :style="{ background: themeColor }" @click="handleSubmit()" v-else>完成填写</view>
					<view class="safe-padding"></view>
				</view>
			</block>
			<view class="main-login" v-else-if="showLogin">
				<image class="login-image" :src="loginImg" mode="aspectFit"></image>
				<view class="login-tips">小程序需要登录注册才能使用相关功能，请登录后查看该页面</view>
				<view class="login-btn" @click="toLogin()">前往登录</view>
				<view class="login-btn cancel" @click="toBack()">返回上一页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import questionProblem from "@/pagesTools/component/questionnaire/problem.vue"
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	export default {
		components: {
			questionProblem
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 问卷id 
				questionId: null,
				// 问卷详情
				questionDetails: {},
				// 页面是否阻止滚动
				pageShow: false,
				// 是否显示登录提示
				showLogin: false,
				// 延时器
				delayer: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				questionnaireImg: state => state.app.questionnaireImg,
				loginImg: state => state.app.loginImg,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.questionId = option.id || option.scene
			this.getQuestionDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
				// #ifdef H5
				this.initConfig()
				// #endif
			})
		},
		onUnload() {
			clearTimeout(this.delayer)
		},
		onShareAppMessage() {
			return {
				title: this.questionDetails.data.title,
				path: '/pagesTools/questionnaire/details?id=' + this.questionId,
				imageUrl: this.questionnaireImg,
			}
		},
		onShareTimeline() {
			return {
				title: this.questionDetails.data.title,
				path: '/pagesTools/questionnaire/details?id=' + this.questionId,
				imageUrl: this.questionnaireImg,
			}
		},
		methods: {
			// #ifdef H5
			// 微信公众号初始化方法
			initConfig() {
				this.$util.request("main.WeChatConfig", {
					url: location.href.split('#')[0]
				}).then(res => {
					if (res.code == 1) {
						wx.config({
							debug: false,
							appId: res.data.appId,
							timestamp: Number(res.data.timestamp),
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData"],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.questionDetails.data.title,
								desc: "",
								link: window.location.href,
								imgUrl: this.questionnaireImg,
							});
							wx.updateTimelineShareData({
								title: this.questionDetails.data.title,
								link: window.location.href,
								imgUrl: this.questionnaireImg,
							});
						});
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
			// 完成填写
			handleSubmit() {
				uni.showLoading({
					title: "提交中",
					mask: true
				})
				this.$refs.questionProblem.getApplyField((data) => {
					let fileList = []
					for (let i in data) {
						// 判断必填项是否为空
						if (data[i].must == 1) {
							let isEmpty = false
							if (data[i].type == "text") {
								if (!data[i].value) isEmpty = true
							} else if (data[i].type == "checkbox") {
								if (!data[i].value || !data[i].value.length) isEmpty = true
							} else if (data[i].type == "images") {
								if (!data[i].value || !data[i].value.length) isEmpty = true
							} else {
								if (!data[i].value && data[i].value !== 0) isEmpty = true
							}
							if (isEmpty) {
								uni.hideLoading()
								uni.showToast({
									icon: "none",
									title: data[i].topic + "不能为空"
								})
								return
							}
						}
						// 设置字段值格式
						if (data[i].type == "number") {
							data[i].value = (data[i].value || data[i].value === 0) ? Number(data[i].value) : data[i].value
						} else if (data[i].type == "images") {
							for (let j in data[i].value) {
								fileList.push({
									index: i,
									number: j,
									value: data[i].value[j]
								})
							}
						}
					}
					if (fileList.length) {
						this.uploadFiles(fileList, (files) => {
							for (let i in fileList) {
								if (data[fileList[i].index].type == "images") {
									data[fileList[i].index].value[fileList[i].number] = files[i]
								}
							}
							this.submitQuestion(data)
						})
					} else {
						this.submitQuestion(data)
					}
				})
			},
			// 提交事件
			submitQuestion(data) {
				data.forEach(item => {
					if (item.value) {
						item.content = item.value;
					} else {
						item.content = ''
					}
					if (item.explain) {
						item.explain = item.explain;
					} else {
						item.explain = ''
					}
					if (item.type == 'images' || item.type == 'checkbox') {
						item.content = item.content.toString()
					}
				});
				this.$util.request("questionnaire.questionAdd", {
					questionnaire_id: this.questionId,
					content: JSON.stringify(data)
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						uni.showToast({
							title: "提交成功",
							icon: "success",
							mask: true,
							duration: 1500
						})
						this.delayer = setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('提交问卷', error)
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
			// 获取问卷详情
			getQuestionDetails(fn) {
				this.$util.request("questionnaire.questionDetails", {
					id: this.questionId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.questionDetails = res.data
						if (res.data.data.non_member_answer_sheet_status == 2) {
							uni.showToast({
								title: "该问卷仅会员可填写",
								icon: "none",
								duration: 2000
							})
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (error == 401) {
						this.showLogin = true
					} else {
						if (fn) fn()
						console.error('获取问卷列表 ', error)
					}
				})
			},
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 前往登录
			toLogin() {
				uni.navigateTo({
					url: "/pages/login/index",
				})
			},
			// 返回上一页
			toBack() {
				if (getCurrentPages().length == 1) {
					this.$util.toPage({
						mode: 1,
						path: "/pages/index/index"
					})
				} else {
					uni.navigateBack()
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx 32rpx;

			.main-question-info {
				padding: 32rpx;
				margin-bottom: 32rpx;
				border-radius: 12rpx;
				background: #FFFFFF;

				.question-info-title {
					margin-bottom: 32rpx;
					font-size: 32rpx;
					line-height: 44rpx;
					font-weight: 600;
					color: #5A5B6E;
				}

				.question-info-person {
					margin-bottom: 32rpx;

					.info-person-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.info-person-item {
						flex: 1;
						padding-left: 16rpx;

						.info-person-item-name {
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}

						.info-person-item-level {
							padding-left: 8rpx;
							font-size: 28rpx;
							line-height: 40rpx;
						}

						.info-person-item-time {
							font-size: 24rpx;
							line-height: 34rpx;
							color: #8D929C;
						}
					}

					.info-person-button {
						padding: 12rpx;
						font-size: 24rpx;
						line-height: 34rpx;
						border-radius: 8rpx;
						color: #FFFFFF;

						.info-person-button-icon {
							padding-right: 8rpx;
							width: 32rpx;
							height: 32rpx;
						}
					}
				}

				.question-info-time {
					margin-bottom: 32rpx;
					padding: 16rpx 0rpx;
					font-size: 24rpx;
					line-height: 34rpx;
					color: #5A5B6E;
					border-radius: 8rpx;
					text-align: center;
					background: #EEF2FF;
				}

				.question-info-introduce {
					font-size: 28rpx;
					line-height: 40rpx;
					color: #8D929C;
				}
			}

			.main-bottom {
				padding-top: 16rpx;
				padding-bottom: 16rpx;
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				text-align: center;
				background: #FFF;
				z-index: 99;

				.harmless-content-button {
					margin-left: 26rpx;
					margin-right: 26rpx;
					width: 700rpx;
					height: 80rpx;
					background: rgba(50, 93, 255, 1);
					color: rgba(255, 255, 255, 1);
					text-align: center;
					line-height: 80rpx;
					border-radius: 16rpx;
				}

				.safe-padding {
					width: 100%;
					padding-bottom: constant(safe-area-inset-bottom);
					/* 兼容 iOS < 11.2 */
					padding-bottom: env(safe-area-inset-bottom);
					/* 兼容 iOS >= 11.2 */
				}

			}

			.main-login {
				padding: 96rpx 60rpx 0;

				.login-image {
					width: 100%;
					height: 500rpx;
				}

				.login-tips {
					color: #585858;
					font-size: 36rpx;
					line-height: 50rpx;
					margin-top: 48rpx;
					text-align: center;
				}

				.login-btn {
					margin-top: 56rpx;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 28rpx;
					border-radius: 16rpx;
					text-align: center;
					background: var(--theme-color);
					color: #ffffff;

					&.cancel {
						background: #dedede;
						color: #999;
						margin-top: 48rpx;
					}
				}
			}
		}
	}
</style>