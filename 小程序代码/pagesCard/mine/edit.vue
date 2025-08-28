<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 新建/编辑名片 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" :title="cardId ? '编辑名片' : '新建名片'"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-card">
				<image class="card-image" :src="formData.card_background_image" mode="aspectFill" v-if="formData.card_background_image"></image>
				<image class="card-avatar" :src="selectAvatar" mode="aspectFill" v-if="selectAvatar && formData.is_hide_avatar != 1"></image>
				<view class="card-name">
					<view class="name" :style="{color: formData.font_color}" v-if="formData.name">{{formData.name}}</view>
					<view class="position" :style="{color: formData.font_color}" v-if="formData.company_position">{{formData.company_position}}</view>
				</view>
				<view class="card-company" :style="{color: formData.font_color}" v-if="formData.company_name">{{formData.company_name}}</view>
				<view class="card-business" :style="{color: formData.font_color}" v-if="mainBusiness.length">
					<text class="label" :style="{color: formData.font_color}" v-for="(item, index) in mainBusiness" :key="index">{{item}}</text>
				</view>
				<view class="card-mobile" v-if="formData.mobile">
					<image class="icon" src="/static/card/mobile_w.png" mode="aspectFit" v-if="formData.font_color == '#FFFFFF'"></image>
					<image class="icon" src="/static/card/mobile.png" mode="aspectFit" v-else></image>
					<text class="text" :style="{color: formData.font_color}">{{formData.mobile}}</text>
				</view>
				<view class="card-address" v-if="formData.company_address">
					<image class="icon" src="/static/card/location_w.png" mode="aspectFit" v-if="formData.font_color == '#FFFFFF'"></image>
					<image class="icon" src="/static/card/location.png" mode="aspectFit" v-else></image>
					<text class="text" :style="{color: formData.font_color}">{{formData.company_address}}</text>
				</view>
				<view class="card-association">
					<image class="logo" :src="appletLogo" mode="aspectFill"></image>
					<text class="text" :style="{color: formData.font_color}">{{appletName}}</text>
					<text class="text" :style="{color: formData.font_color}" v-if="userInfo && userInfo.member_level_name">{{userInfo.member_level_name}}</text>
				</view>
			</view>
			<view class="main-form">
				<view class="form-group">
					<view class="group-item">
						<view class="item-head">
							<view class="head-title">名片样式</view>
							<view class="head-btn" @click="toCustomBackground()">
								<view class="icon">
									<image src="/static/card/add.png" mode="aspectFit"></image>
								</view>
								<text class="text">上传自定义背景</text>
							</view>
						</view>
						<scroll-view class="item-style" scroll-x :scroll-into-view="scrollIntoView">
							<view class="style-box" id="style-custom" @click="formData.card_background_image = customBackground" v-if="customBackground">
								<image class="box-image" :src="customBackground" mode="aspectFill"></image>
								<view class="box-select" v-if="formData.card_background_image === customBackground">
									<view class="select-icon">
										<image class="tick" src="/static/card/select.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>
							<view class="style-box" v-for="(item, index) in backgroundList" :key="index" :id="`style-${index}`" @click="changeStyle(item)">
								<image class="box-image" :src="item.image" mode="aspectFill"></image>
								<view class="box-select" v-if="formData.card_background_image === item.image">
									<view class="select-icon">
										<image class="tick" src="/static/card/select.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="form-group">
					<view class="group-item">
						<view class="item-title">
							<text style="color: #E60012;">*</text>分享标题
						</view>
						<view class="item-input">
							<input class="input" type="text" v-model="formData.share_title" placeholder="请填写分享标题" placeholder-class="placeholder" />
						</view>
					</view>
				</view>
				<view class="form-group">
					<view class="group-item">
						<view class="item-title">字体颜色</view>
						<view class="item-input" @click="openSelectPicker()">
							<view class="input" v-if="formData.font_color">
								<text v-if="formData.font_color === '#FFFFFF'">白色</text>
								<text v-else>黑色</text>
							</view>
							<image class="icon" src="/static/right.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="form-group">
					<view class="group-item">
						<view class="item-title">
							<text style="color: #E60012;">*</text>名片姓名
						</view>
						<view class="item-input">
							<input class="input" type="text" v-model="formData.name" placeholder="请填写姓名" placeholder-class="placeholder" />
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">
							<text style="color: #E60012;">*</text>名片头像
						</view>
						<view class="item-upload" @click="chooseAvatar()">
							<image class="upload-image" :src="selectAvatar" mode="aspectFill" v-if="selectAvatar"></image>
							<view class="upload-box" v-else>
								<view class="box-icon">
									<view class="horizontal"></view>
									<view class="vertical"></view>
								</view>
								<view class="box-text">上传图片</view>
							</view>
							<image class="upload-right" src="/static/card/right.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">企业名称</view>
						<view class="item-input">
							<input class="input" type="text" v-model="formData.company_name" placeholder="请填写企业名称" placeholder-class="placeholder" />
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">担任职务</view>
						<view class="item-input">
							<input class="input" type="text" v-model="formData.company_position" placeholder="请填写担任职务" placeholder-class="placeholder" />
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">企业地址</view>
						<view class="item-input" @click="chooseLocation()">
							<view class="input text-ellipsis" v-if="formData.company_address">{{formData.company_address}}</view>
							<view class="input placeholder text-ellipsis" v-else>请选择企业地址</view>
							<image class="icon" src="/static/right.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">主营业务</view>
						<view class="item-list">
							<view class="list-label" v-for="(item, index) in mainBusiness" :key="index">
								<input class="input" maxlength="4" type="text" v-model="mainBusiness[index]" placeholder="请填写主营业务(最多4字)" placeholder-class="placeholder" />
								<image class="icon" src="/static/card/delete.png" mode="aspectFit" @click="deleteMainBusiness(index)"></image>
							</view>
							<view class="list-add" @click="addMainBusiness" v-if="mainBusiness.length < 3">
								<view class="add-icon">
									<image src="/static/card/add.png" mode="aspectFit"></image>
								</view>
								<text class="add-text">添加新的</text>
								<view class="add-bg"></view>
							</view>
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">联系电话</view>
						<view class="item-input">
							<input class="input" type="number" maxlength="11" v-model="formData.mobile" placeholder="请填写联系电话" placeholder-class="placeholder" />
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">微信号</view>
						<view class="item-input">
							<input class="input" type="text" v-model="formData.wechat_number" placeholder="请填写微信号" placeholder-class="placeholder" />
						</view>
					</view>
					<view class="group-item">
						<view class="item-title">企业介绍</view>
						<view class="item-input" @click="toCardEditor()">
							<view class="input text-ellipsis" v-if="formData.company_introduction">{{getEditorText(formData.company_introduction) || '编辑企业介绍'}}</view>
							<view class="input placeholder text-ellipsis" v-else>编辑企业介绍</view>
							<image class="icon" src="/static/right.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="group-item">
						<view class="item-switch" @click="formData.is_default = formData.is_default == 1 ? 2 : 1">
							<view class="switch-label">是否默认名片</view>
							<view class="switch-box" :class="{select: formData.is_default == 1}">
								<view class="round"></view>
							</view>
						</view>
					</view>
					<view class="group-item">
						<view class="item-switch" @click="formData.is_hide_avatar = formData.is_hide_avatar == 1 ? 2 : 1">
							<view class="switch-label">隐藏名片头像</view>
							<view class="switch-box" :class="{select: formData.is_hide_avatar == 1}">
								<view class="round"></view>
							</view>
						</view>
					</view>
					<view class="group-item">
						<view class="item-switch" @click="formData.is_wechat_number_public = formData.is_wechat_number_public == 1 ? 2 : 1">
							<view class="switch-label">微信号是否对外</view>
							<view class="switch-box" :class="{select: formData.is_wechat_number_public == 1}">
								<view class="round"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="handleSubmit()">保存名片</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 颜色选择框 -->
		<select-picker ref="selectPicker" title="选择字体颜色" @onChange="pageChange" @confirm="changeSelectPicker"></select-picker>
		<!-- 电子名片 -->
		<card-poster ref="cardPoster"></card-poster>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import selectPicker from "../component/picker/select.vue"
	import cardPoster from "../component/card/poster.vue"
	export default {
		components: {
			selectPicker,
			cardPoster,
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 页面是否阻止滚动
				pageShow: false,
				// 名片背景图列表
				backgroundList: [],
				// 名片id
				cardId: null,
				// 表单数据
				formData: {
					// 背景图
					card_background_image: '',
					// 分享标题
					share_title: '您好，这是我的电子名片，请惠存',
					// 文字颜色
					font_color: '#FFFFFF',
					// 姓名
					name: '',
					// 头像
					avatar: '',
					// 企业名称
					company_name: '',
					// 担任职务
					company_position: '',
					// 企业地址
					company_address: '',
					// 企业经度
					company_lng: '',
					// 企业纬度
					company_lat: '',
					// 主营业务
					main_business: '',
					// 联系电话
					mobile: '',
					// 微信号
					wechat_number: '',
					// 企业介绍
					company_introduction: '',
					// 是否默认
					is_default: 2,
					// 隐藏头像
					is_hide_avatar: 2,
					// 微信号是否对外
					is_wechat_number_public: 2,
					// 名片图片
					image: "",
				},
				// 自定义背景图
				customBackground: "",
				// 已选头像
				selectAvatar: "",
				// 主营业务列表
				mainBusiness: [],
				// 名片样式滚动位置
				scrollIntoView: "",
				// 延时器
				timeout: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				appletName: state => state.app.appletName,
				appletLogo: state => state.app.appletLogo,
				userInfo: state => state.user.userInfo,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			if (option.id) {
				this.cardId = option.id
				this.getCardBackground(() => {
					this.getCardDetails(() => {
						uni.hideLoading()
						this.loadEnd = true
					})
				})
			} else {
				this.getCardBackground(() => {
					uni.hideLoading()
					this.loadEnd = true
				})
			}
		},
		onShow() {
			let pages = getCurrentPages();
			if (pages[pages.length - 1].$vm.selectBackground) {
				const result = pages[pages.length - 1].$vm.selectBackground
				this.formData.card_background_image = result.fullurl
				this.customBackground = result.fullurl
				this.scrollIntoView = "style-custom"
				delete pages[pages.length - 1].$vm.selectBackground;
			}
			if (pages[pages.length - 1].$vm.editorContent) {
				const result = pages[pages.length - 1].$vm.editorContent
				this.formData.company_introduction = result
				delete pages[pages.length - 1].$vm.editorContent;
			}
		},
		onUnload() {
			clearTimeout(this.timeout)
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.pageShow = state
			},
			// 获取名片背景图
			getCardBackground(fn) {
				this.$util.request("card.background").then(res => {
					if (res.code == 1) {
						this.backgroundList = res.data
						this.formData.card_background_image = this.backgroundList[0].image
						this.formData.font_color = this.backgroundList[0].font_color
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
					console.error('获取名片背景图 ', error)
				})
			},
			// 获取名片详情
			getCardDetails(fn) {
				this.$util.request("card.editDetails", {
					id: this.cardId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						if (res.data.association) delete res.data.association
						this.formData = res.data
						this.selectAvatar = res.data.avatar
						this.mainBusiness = this.stringToArray(res.data.main_business)
						if (this.backgroundList.length) this.setCardStyle()
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取名片详情 ', error)
				})
			},
			// 字符串转数组
			stringToArray(value) {
				try {
					if (value) return value.split(',');
					else return []
				} catch (error) {
					return [];
				}
			},
			// 设置名片样式数据
			setCardStyle() {
				const index = this.backgroundList.findIndex(item => item.image === this.formData.card_background_image)
				if (index > -1) {
					this.scrollIntoView = "style-" + index
				} else {
					this.customBackground = this.formData.card_background_image
					this.scrollIntoView = "style-custom"
				}
			},
			// 改变名片样式
			changeStyle(item) {
				this.formData.card_background_image = item.image
				this.formData.font_color = item.font_color
			},
			// 跳转上传自定义背景图
			toCustomBackground() {
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/custom"
				})
			},
			// 打开字体颜色选择框
			openSelectPicker() {
				let list = [{
						name: "白色",
						value: "#FFFFFF",
					},
					{
						name: "黑色",
						value: "#5A5B6E",
					},
				]
				this.$refs.selectPicker.open(list, this.formData.font_color)
			},
			// 改变字体颜色
			changeSelectPicker(item) {
				this.formData.font_color = item.value
			},
			// 选择头像
			chooseAvatar() {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.selectAvatar = res.tempFiles[0].tempFilePath
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.selectAvatar = res.tempFilePaths[0]
					}
				});
				// #endif
			},
			// 选择位置 
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						this.formData.company_address = res.address
						this.formData.company_lng = res.longitude
						this.formData.company_lat = res.latitude
					}
				});
			},
			// 添加主营业务
			addMainBusiness() {
				if (this.mainBusiness.length < 3) {
					this.mainBusiness.push("")
				} else {
					uni.showToast({
						icon: "none",
						title: "最多添加3个主营业务"
					})
				}
			},
			// 删除主营业务
			deleteMainBusiness(index) {
				this.$delete(this.mainBusiness, index)
			},
			// 跳转编辑器页面
			toCardEditor() {
				this.$store.commit('app/setEditorContent', this.formData.company_introduction || "")
				this.$util.toPage({
					mode: 1,
					path: "/pagesCard/mine/editor"
				})
			},
			// 提取富文本文字
			getEditorText(e) {
				if (e) return e.replace(/<[^>]+>/g, '')
				else return ""
			},
			// 保存名片 
			handleSubmit() {
				if (!this.formData.share_title) {
					uni.showToast({
						icon: "none",
						title: "请填写分享标题"
					})
					return
				}
				if (!this.formData.name) {
					uni.showToast({
						icon: "none",
						title: "请填写名片姓名"
					})
					return
				}
				if (!this.selectAvatar) {
					uni.showToast({
						icon: "none",
						title: "请上传名片头像"
					})
					return
				}
				if (this.formData.mobile && !this.$util.validation("phone", this.formData.mobile)) {
					uni.showToast({
						icon: "none",
						title: "请填写正确的联系电话"
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				if (this.formData.avatar === this.selectAvatar) {
					this.submitEvent()
				} else {
					this.$util.uploadFile(this.selectAvatar).then(result => {
						this.formData.avatar = result.data.fullurl
						this.submitEvent()
					}).catch(error => {
						uni.hideLoading()
						console.error('上传图片 ', error)
					})
				}
			},
			// 提交事件
			submitEvent() {
				let businessList = []
				this.mainBusiness.forEach((item) => {
					if (item) businessList.push(item)
				});
				this.formData.main_business = businessList.join()
				this.$refs.cardPoster.getPosterPath(this.formData, (posterPath) => {
					this.formData.image = posterPath
					this.$util.request(this.formData.id ? "card.edit" : "card.add", this.formData).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							uni.showToast({
								title: "保存成功",
								icon: "success",
								mask: true,
								duration: 1500
							})
							this.timeout = setTimeout(() => {
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
						console.error('保存名片 ', error)
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 32rpx 144rpx;

			.main-card {
				position: relative;
				height: 400rpx;

				.card-image {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					border-radius: 16rpx;
				}

				.card-avatar {
					width: 112rpx;
					height: 112rpx;
					border-radius: 16rpx;
					position: absolute;
					top: 32rpx;
					right: 32rpx;
				}

				.card-name {
					position: absolute;
					top: 32rpx;
					left: 32rpx;
					display: flex;
					align-items: flex-end;

					.name {
						color: #FFF;
						font-size: 40rpx;
						font-weight: 600;
						line-height: 56rpx;
					}

					.position {
						margin-left: 18rpx;
						padding-bottom: 4rpx;
						color: #FFF;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.card-company {
					position: absolute;
					top: 100rpx;
					left: 32rpx;
					color: #FFF;
					font-size: 24rpx;
					line-height: 34rpx;
				}

				.card-business {
					position: absolute;
					top: 158rpx;
					left: 32rpx;
					display: flex;

					.label {
						color: #FFF;
						font-size: 24rpx;
						line-height: 34rpx;
						margin-left: 16rpx;

						&:first-child {
							margin-left: 0;
						}
					}
				}

				.card-mobile {
					position: absolute;
					top: 216rpx;
					left: 32rpx;
					display: flex;
					align-items: center;

					.icon {
						width: 24rpx;
						height: 24rpx;
					}

					.text {
						margin-left: 16rpx;
						color: #FFF;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.card-address {
					position: absolute;
					top: 262rpx;
					left: 32rpx;
					display: flex;
					align-items: center;

					.icon {
						width: 24rpx;
						height: 24rpx;
					}

					.text {
						margin-left: 16rpx;
						color: #FFF;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.card-association {
					position: absolute;
					bottom: 12rpx;
					left: 32rpx;
					display: flex;
					align-items: center;

					.logo {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
					}

					.text {
						margin-left: 16rpx;
						color: #FFF;
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}

			.main-form {
				margin-top: 32rpx;

				.form-group {
					margin-top: 32rpx;
					border-radius: 16rpx;
					background: #FFF;
					padding: 32rpx;

					.group-item {
						margin-top: 32rpx;

						&:first-child {
							margin-top: 0;
						}

						.item-head {
							width: 100%;
							display: flex;
							justify-content: space-between;
							align-items: center;

							.head-title {
								color: #5A5B6E;
								font-size: 32rpx;
								font-weight: 600;
								line-height: 44rpx;
							}

							.head-btn {
								display: flex;
								align-items: center;

								.icon {
									width: 32rpx;
									height: 32rpx;
									background: var(--theme-color);
									border-radius: 50%;
								}

								.text {
									margin-left: 8rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}
							}
						}

						.item-style {
							width: 100%;
							white-space: nowrap;
							margin-top: 24rpx;

							.style-box {
								display: inline-block;
								width: 218rpx;
								height: 128rpx;
								border-radius: 8rpx;
								overflow: hidden;
								position: relative;
								margin-left: 24rpx;

								&:first-child {
									margin-left: 0;
								}

								.box-image {
									width: 100%;
									height: 100%;
								}

								.box-select {
									position: absolute;
									top: 0;
									right: 0;
									bottom: 0;
									left: 0;
									border: 4rpx solid var(--theme-color);

									.select-icon {
										position: absolute;
										right: -2rpx;
										bottom: -2rpx;
										width: 0;
										height: 0;
										border-top: 18rpx solid transparent;
										border-right: 18rpx solid var(--theme-color);
										border-bottom: 18rpx solid var(--theme-color);
										border-left: 18rpx solid transparent;

										.tick {
											position: absolute;
											width: 14rpx;
											height: 14rpx;
											top: -2rpx;
											left: -2rpx;
										}
									}
								}
							}
						}

						.item-title {
							width: 100%;
							color: #5A5B6E;
							font-size: 32rpx;
							font-weight: 600;
							line-height: 44rpx;
						}

						.item-input {
							margin-top: 32rpx;
							width: 100%;
							display: flex;
							align-items: center;
							border-radius: 16rpx;
							background: #F7F8FB;

							.input {
								color: #5A5B6E;
								font-size: 28rpx;
								height: 112rpx;
								line-height: 112rpx;
								flex: 1;
								padding: 0 32rpx;
							}

							.textarea {
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;
								flex: 1;
								padding: 32rpx;
								height: 200rpx;
							}

							.placeholder {
								color: #ACADB7;
							}

							.icon {
								width: 32rpx;
								height: 32rpx;
								padding-right: 32rpx;
							}

							.text-ellipsis {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								word-break: break-all;
							}
						}

						.item-switch {
							margin-top: 32rpx;
							display: flex;
							align-items: center;
							border-radius: 16rpx;
							background: #F7F8FB;
							width: 100%;
							height: 112rpx;
							padding: 0 32rpx;

							.switch-label {
								flex: 1;
								color: #5A5B6E;
								font-size: 28rpx;
								line-height: 40rpx;
							}

							.switch-box {
								margin-left: 20rpx;
								width: 72rpx;
								height: 36rpx;
								padding: 2rpx;
								background: #D9D9D9;
								border-radius: 18rpx;
								transition: all .3s;

								.round {
									width: 32rpx;
									height: 32rpx;
									border-radius: 50%;
									background: #FFFFFF;
									margin-left: 0;
									transition: all .3s;
								}

								&.select {
									background: var(--theme-color);

									.round {
										margin-left: calc(100% - 32rpx);
									}
								}
							}
						}

						.item-upload {
							margin-top: 32rpx;
							border-radius: 16rpx;
							background: #F7F8FB;
							padding: 32rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.upload-image {
								border-radius: 16rpx;
								width: 112rpx;
								height: 112rpx;
							}

							.upload-box {
								border-radius: 16rpx;
								background: #FFF;
								width: 112rpx;
								height: 112rpx;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;

								.box-icon {
									position: relative;
									width: 48rpx;
									height: 48rpx;

									.horizontal {
										position: absolute;
										top: 50%;
										left: 0;
										right: 0;
										transform: translateY(-50%);
										height: 4rpx;
										background: var(--theme-color);
										border-radius: 2rpx;
									}

									.vertical {
										position: absolute;
										top: 0;
										left: 50%;
										bottom: 0;
										transform: translateX(-50%);
										width: 4rpx;
										background: var(--theme-color);
										border-radius: 2rpx;
									}
								}

								.box-text {
									margin-top: 4rpx;
									color: var(--theme-color);
									text-align: center;
									font-size: 20rpx;
									line-height: 28rpx;
								}
							}

							.upload-right {
								width: 32rpx;
								height: 32rpx;
							}
						}

						.item-list {
							.list-label {
								margin-top: 32rpx;
								width: 100%;
								display: flex;
								align-items: center;
								border-radius: 16rpx;
								background: #F7F8FB;

								.input {
									color: #5A5B6E;
									font-size: 28rpx;
									height: 112rpx;
									line-height: 112rpx;
									flex: 1;
									padding: 0 32rpx;
								}

								.placeholder {
									color: #ACADB7;
								}

								.icon {
									width: 40rpx;
									height: 40rpx;
									padding-right: 32rpx;
								}
							}

							.list-add {
								margin-top: 32rpx;
								position: relative;
								z-index: 1;
								display: flex;
								justify-content: center;
								align-items: center;
								padding: 24rpx 32rpx;
								border-radius: 16rpx;
								overflow: hidden;

								.add-icon {
									width: 32rpx;
									height: 32rpx;
									background: var(--theme-color);
									border-radius: 50%;
								}

								.add-text {
									margin-left: 8rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}

								.add-bg {
									position: absolute;
									top: 0;
									left: 0;
									right: 0;
									bottom: 0;
									z-index: -1;
									background: var(--theme-color);
									opacity: 0.1;
								}
							}
						}
					}
				}
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 99;
				padding: 12rpx 32rpx;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
				}

				.safe-padding {
					width: 100%;
					padding-bottom: constant(safe-area-inset-bottom);
					padding-bottom: env(safe-area-inset-bottom);
				}
			}
		}
	}
</style>