<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 机构申请 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="申请加入"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-tips" :style="{top: titleBarHeight + 'px'}" v-if="applyInfo.state == 3">驳回原因：{{applyInfo.reject}}</view>
			<view class="main-form">
				<view class="form-item">
					<view class="item-title"><text>*</text>选择级别</view>
					<view class="item-input" @click="openSelectLevel()">
						<view class="input text-ellipsis" v-if="selectLevel.id">{{selectLevel.name}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择机构级别</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="form-item">
					<view class="item-title">介绍</view>
					<view class="item-input">
						<sp-editor ref="spEditor" style="width: 100%;" :toolbar-config="toolbarConfig" @init="initEditor" @upinImage="upinImage" @overMax="overMax" @fullscreen="toEditor" @exportHtml="exportHtml"></sp-editor>
					</view>
				</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" :style="{background: themeColor}" @click="heandleSubmit()" v-if="userMobile">提交申请</view>
				<button class="footer-btn clear" :style="{background: themeColor}" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber" v-else>提交申请</button>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 机构级别选择 -->
		<select-level ref="selectLevel" title="选择级别" @onChange="pageChange" @confirm="changeLevel"></select-level>
	</view>
</template>

<script>
	import selectLevel from "@/pages/component/picker/select.vue"
	import { mapState } from "vuex"
	export default {
		components: {
			selectLevel,
		},
		data() {
			return {
				// 页面是否阻止滚动
				pageShow: false,
				// 加载完成
				loadEnd: false,
				// 标题栏高度
				titleBarHeight: 0,
				// 机构级别列表
				levelList: [],
				// 已选机构级别
				selectLevel: {},
				// 申请信息
				applyInfo: {},
				// 编辑器实例
				editorIns: null,
				// 编辑器配置
				toolbarConfig: {
					excludeKeys: ['direction', 'date', 'lineHeight', 'letterSpacing', 'listCheck', 'export'],
					iconSize: '18px',
					showFullscreen: true,
				},
			}
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
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
		onLoad(option) {
			this.institutionId = option.id
			this.getLevelList()
			if (option.state == -1) {
				this.loadEnd = true
			} else {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				this.getApplyInfo(() => {
					this.loadEnd = true
					uni.hideLoading()
				})
			}
		},
		onShow() {
			let pages = getCurrentPages();
			if (pages[pages.length - 1].$vm.editorContent) {
				const result = pages[pages.length - 1].$vm.editorContent
				this.editorIns.setContents({
					html: result || ""
				})
				delete pages[pages.length - 1].$vm.editorContent;
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取申请信息
			getApplyInfo(fn) {
				this.$util.request("institution.applyDetails", {
					institution_id: this.institutionId
				}).then(res => {
					if (res.code == 1) {
						if (res.data) {
							this.applyInfo = res.data
							this.selectLevel = {
								id: res.data.level_id,
								name: res.data.level_name
							}
						} else {
							this.applyInfo = { state: null }
						}
						if (fn) fn()
					} else {
						if (fn) fn()
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取申请信息 ', error)
				})
			},
			// 获取机构级别
			getLevelList(fn) {
				this.$util.request("institution.level", {
					institution_id: this.institutionId
				}).then(res => {
					if (res.code == 1) {
						this.levelList = res.data.map(item => {
							return { id: item.id, name: item.level_name }
						})
						if (fn) fn()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取机构级别 ', error)
				})
			},
			// 选择机构级别
			openSelectLevel() {
				if (this.levelList.length) {
					this.$refs.selectLevel.open(this.levelList, this.selectLevel.id)
				} else {
					uni.showLoading({
						title: "加载中",
						mask: true
					})
					this.getLevelList(() => {
						uni.hideLoading()
						this.$refs.selectLevel.open(this.levelList, this.selectLevel.id)
					})
				}
			},
			// 改变机构级别
			changeLevel(value) {
				this.selectLevel = value
			},
			// 超出最大内容限制
			overMax() {
				uni.showToast({
					title: "输入内容已超过最大字数限制"
				})
			},
			// 初始化编辑器
			initEditor(editor) {
				this.editorIns = editor
				this.editorIns.setContents({
					html: this.applyInfo.introduction || ""
				})
			},
			// 上传图片
			upinImage(tempFiles, editorCtx) {
				let imageList = []
				// #ifdef MP-WEIXIN
				imageList = tempFiles.map(item => item.tempFilePath)
				// #endif
				// #ifndef MP-WEIXIN
				imageList = tempFiles.map(item => item.path)
				// #endif
				uni.showLoading({
					title: '上传中请稍后',
					mask: true
				})
				this.$util.uploadFileMultiple(imageList, [], 2).then(result => {
					result.forEach((item) => {
						editorCtx.insertImage({
							src: item,
							width: '80%',
							success: () => {
								uni.hideLoading()
							}
						})
					});
				}).catch(error => {
					console.error('上传图片 ', error)
				})
			},
			// 跳转编辑器页面
			async toEditor() {
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				const introduction = await this.$refs.spEditor.getHtml()
				this.$store.commit('app/setEditorContent', introduction)
				uni.navigateTo({
					url: "/pagesTools/institution/editor",
					animationType: "fade-in",
					complete: () => {
						uni.hideLoading()
					},
				})
			},
			// 完成编辑
			exportHtml(e) {
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.editorContent = e
				uni.navigateBack()
			},
			// 提交申请
			async heandleSubmit() {
				if (!this.selectLevel?.id) {
					uni.showToast({
						icon: "none",
						title: "机构级别不能为空",
						duration: 2000,
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true,
				})
				const introduction = await this.$refs.spEditor.getHtml()
				this.$util.request("institution.apply", {
					institution_id: this.institutionId,
					level_id: this.selectLevel.id,
					introduction: introduction,
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.$util.toPage({
							mode: 2,
							path: "/pagesTools/institution/success"
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000,
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('申请加入机构 ', error)
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
										icon: 'none',
										duration: 2000,
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
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 192rpx;

			.main-tips {
				color: #FFF;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 34rpx;
				padding: 30rpx 32rpx;
				background: #FF6868;
			}

			.main-form {
				padding: 22rpx 32rpx 32rpx;

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
						overflow: hidden;

						.input {
							color: #5A5B6E;
							font-size: 28rpx;
							line-height: 40rpx;
							flex: 1;
							padding: 32rpx;
							min-height: 104rpx;
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