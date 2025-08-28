<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 发布/修改供需 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{ '--theme-color': themeColor }">
		<!-- 标题栏 -->
		<title-bar :showBack="true" :title="demandId ? '修改供需' : '发布供需'"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 表单 -->
			<view class="main-form">
				<!-- 发布类型 -->
				<view class="form-item">
					<view class="item-title"><text style="color: #E60012;">*</text>发布类型</view>
					<view class="item-input" @click="openSelectType()">
						<view class="input text-ellipsis" v-if="formData.category_id">{{getTypeName()}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择发布类型</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 标题 -->
				<view class="form-item">
					<view class="item-title"><text style="color: #E60012;">*</text>标题</view>
					<view class="item-input">
						<input class="input" type="text" v-model="formData.title" placeholder="请输入标题" placeholder-class="placeholder" />
					</view>
				</view>
				<!-- 介绍 -->
				<view class="form-item">
					<view class="item-title"><text style="color: #E60012;">*</text>介绍</view>
					<view class="item-input">
						<textarea class="textarea" type="text" maxlength="-1" v-model="formData.content" placeholder="请输入" placeholder-class="placeholder" />
					</view>
				</view>
				<!-- 地址 -->
				<view class="form-item">
					<view class="item-title">地址</view>
					<view class="item-input" @click="chooseLocation()">
						<view class="input text-ellipsis" v-if="formData.address">{{formData.address}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择地址(非必填项)</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 详情图片 -->
				<view class="form-item">
					<view class="item-title">
						<text>详情图片</text>
						<text class="tips">（图片建议尺寸1:1）</text>
					</view>
					<view class="item-upload">
						<view class="upload-image" v-if="selectImages.length > 0" v-for="(img, num) in selectImages" :key="num" @click="previewImage(num)">
							<image class="image-select" :src="img" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage(num)"></image>
						</view>
						<view class="upload-image" v-if="selectImages.length < 9" @click="chooseImage()">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传图片</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 提交按钮 -->
			<view class="main-footer">
				<view class="footer-btn" @click="handleSubmit()">提交审核</view>
				<view class="safe-padding"></view>
			</view>
		</view>
		<!-- 单项选择框 -->
		<select-picker ref="selectPicker" title="发布类型" @onChange="pageChange" @confirm="changeSelectType"></select-picker>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import selectPicker from "@/pages/component/picker/select.vue"
	export default {
		components: {
			selectPicker
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 页面是否阻止滚动
				pageShow: false,
				// 供需id
				demandId: null,
				// 发布类型列表
				typeList: [],
				// 表单数据
				formData: {
					// 发布类型
					category_id: null,
					// 标题
					title: "",
					// 介绍
					content: "",
					// 地址
					address: "",
					// 经度
					lng: "",
					// 纬度
					lat: "",
					// 详情图片
					images: "",
				},
				// 已选择图片
				selectImages: [],
				// 延时器
				timeout: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad(option) {
			this.getDemandType()
			if (option.id) {
				this.demandId = option.id
				uni.showLoading({
					title: "加载中"
				})
				this.getDemandDetails(() => {
					uni.hideLoading()
					this.loadEnd = true
				})
			} else {
				this.loadEnd = true
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
			// 获取详情
			getDemandDetails(fn) {
				this.$util.request("demand.businessUserDetails", {
					id: this.demandId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.formData = {
							id: res.data.business.id,
							category_id: res.data.business.category_id,
							title: res.data.business.title,
							content: res.data.business.content,
							address: res.data.business.address,
							lng: res.data.business.lng,
							lat: res.data.business.lat,
							images: res.data.business.images,
						}
						this.selectImages = this.splitImages(res.data.business.images)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取详情', error)
				})
			},
			// 字符串转数组格式图片
			splitImages(images) {
				try {
					if (images) return images.split(',');
					else return []
				} catch (error) {
					return [];
				}
			},
			// 获取发布类型
			getDemandType() {
				this.$util.request("demand.businessCat", {}).then(res => {
					if (res.code == 1) {
						this.typeList = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取发布类型', error)
				})
			},
			// 打开选择发布类型弹窗
			openSelectType() {
				this.$refs.selectPicker.open(this.typeList, this.formData.category_id)
			},
			// 改变发布类型
			changeSelectType(value) {
				this.formData.category_id = value.id
			},
			// 获取发布类型名称
			getTypeName() {
				for (var i in this.typeList) {
					if (this.typeList[i].id == this.formData.category_id) {
						return this.typeList[i].name
					}
				}
				return ""
			},
			// 打开地图选择位置
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						this.formData.lat = res.latitude
						this.formData.lng = res.longitude
						this.formData.address = res.address || ""
					}
				});
			},
			// 选择图片
			chooseImage() {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 9 - this.selectImages.length,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.selectImages = [...this.selectImages, ...res.tempFiles.map(item => item.tempFilePath)]
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: 9 - this.selectImages.length,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						this.selectImages = [...this.selectImages, ...res.tempFilePaths]
					}
				});
				// #endif
			},
			// 删除图片
			deleteImage(index) {
				this.$delete(this.selectImages, index)
			},
			// 预览图片
			previewImage(index) {
				uni.previewImage({
					urls: this.selectImages,
					current: index,
				})
			},
			// 提交审核
			handleSubmit() {
				if (!this.formData.category_id) {
					uni.showToast({
						title: "请选择发布类型",
						icon: 'none'
					})
					return
				}
				if (!this.formData.title) {
					uni.showToast({
						title: "请输入标题",
						icon: 'none'
					})
					return
				}
				if (!this.formData.content) {
					uni.showToast({
						title: "请输入内容",
						icon: 'none'
					})
					return
				}
				if (this.selectImages.length > 0) {
					uni.showLoading({
						title: "提交中",
						mask: true
					})
					const oldImages = this.splitImages(this.formData.images)
					this.$util.uploadFileMultiple(this.selectImages, oldImages).then(result => {
						this.formData.images = result
						this.submitEvent()
					}).catch(error => {
						uni.hideLoading()
						console.error('上传图片 ', error)
					})
				} else {
					uni.showLoading({
						title: "提交中",
						mask: true
					})
					this.submitEvent()
				}
			},
			// 提交事件
			submitEvent() {
				var url = ""
				if (this.demandId) url = "demand.businessEdit"
				else url = "demand.businessAdd"
				this.$util.request(url, this.formData).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: "提交成功",
							icon: "success",
							duration: 1500,
							mask: true
						})
						this.timeout = setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('提交审核', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 112rpx;

			.main-form {
				padding: 32rpx 48rpx;

				.form-item {
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.item-title {
						color: #5A5B6E;
						font-size: 32rpx;
						font-weight: 600;
						line-height: 44rpx;

						.tips {
							font-size: 24rpx;
							font-weight: 400;
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
							padding: 36rpx 32rpx;
							width: 100%;
							height: 240rpx;
						}

						.placeholder {
							color: #ACADB7;
						}

						.icon {
							width: 32rpx;
							height: 32rpx;
							padding-right: 32rpx;
						}
					}

					.item-upload {
						display: flex;
						flex-wrap: wrap;
						padding-top: 8rpx;

						.upload-image {
							position: relative;
							width: 31%;
							height: 0;
							padding-top: 31%;
							margin-top: 24rpx;
							margin-right: 3.5%;

							&:nth-child(3n) {
								margin-right: 0;
							}

							.image-select {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								border-radius: 10rpx;
							}

							.image-video {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								border-radius: 10rpx;
								background: var(--theme-color);
								padding: 56rpx;
							}

							.image-delete {
								position: absolute;
								top: -16rpx;
								right: -16rpx;
								width: 48rpx;
								height: 48rpx;
							}

							.image-choose {
								position: absolute;
								top: 20rpx;
								left: 20rpx;
								right: 20rpx;
								bottom: 20rpx;
								z-index: 6;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								background: #ffffff;
								border-radius: 6rpx;

								.icon {
									width: 80rpx;
									height: 80rpx;
									padding: 18rpx;
									background: var(--theme-color);
									border-radius: 50%;
								}

								.text {
									margin-top: 16rpx;
									color: var(--theme-color);
									font-size: 28rpx;
									line-height: 40rpx;
								}
							}

							.image-background {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								z-index: 1;
								background: var(--theme-color);
								opacity: 0.08;
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
			}
		}
	}
</style>