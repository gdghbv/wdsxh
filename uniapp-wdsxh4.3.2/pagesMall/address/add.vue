<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 添加地址 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" :title="pageTitle"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<view class="main-form">
				<view class="form-item">
					<view class="item-title">
						<text style="color: #E60012;">*</text>收件人
					</view>
					<view class="item-input">
						<input class="input" type="text" v-model="formData.name" placeholder="请填写收件人姓名" placeholder-class="placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="item-title">
						<text style="color: #E60012;">*</text>收件人电话
					</view>
					<view class="item-input">
						<input class="input" type="number" maxlength="11" v-model="formData.tel" placeholder="请填写收件人电话" placeholder-class="placeholder" />
					</view>
				</view>
				<view class="form-item">
					<view class="item-title">
						<text style="color: #E60012;">*</text>收件地址
					</view>
					<view class="item-address flex">
						<textarea class="textarea flex-item" :disabled="!formData.address" v-model="formData.address" auto-height />
						<view class="placeholder" @click="chooseLocation()" v-if="!formData.address">请点击选择收件地址</view>
						<image class="icon" src="/static/location.png" mode="aspectFit" @click="chooseLocation()"></image>
					</view>
				</view>
				<view class="form-item">
					<view class="item-title">默认地址</view>
					<view class="item-switch flex">
						<view class="switch-label">是否默认地址</view>
						<view class="switch-box" :class="{select: formData.is_default == 1}" @click="formData.is_default = formData.is_default == 1 ? 0 : 1">
							<view class="round"></view>
						</view>
					</view>
				</view>
			</view>
			<view class="main-footer">
				<view class="footer-btn" @click="handleSubmit()">{{formData.id ? "编辑" : "添加"}}</view>
				<view class="safe-padding"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 页面标题
				pageTitle: "",
				// 表单数据
				formData: {
					name: '',
					tel: '',
					address: '',
					is_default: 0,
				},
				// 延时器
				delayer: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad(option) {
			if (option.addressData) this.formData = JSON.parse(option.addressData)
			if (this.formData.id) {
				this.pageTitle = "编辑地址"
			} else {
				this.pageTitle = "添加地址"
			}
			this.$nextTick(() => {
				this.loadEnd = true
			})
		},
		onUnload() {
			clearTimeout(this.delayer)
		},
		methods: {
			// 添加/编辑地址 
			handleSubmit() {
				if (!this.formData.name) {
					uni.showToast({
						icon: "none",
						title: "请输入收件人姓名"
					})
					return
				}
				if (!this.formData.tel) {
					uni.showToast({
						icon: "none",
						title: "请输入收件人手机号"
					})
					return
				}
				if (!this.$util.validation("phone", this.formData.tel)) {
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号"
					})
					return
				}
				if (!this.formData.address) {
					uni.showToast({
						icon: "none",
						title: "请输入收货地址"
					})
					return
				}
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				let url = ""
				if (this.formData.id) url = "mall.editAddress"
				else url = "mall.addAddress"
				this.$util.request(url, this.formData).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						uni.showToast({
							title: this.formData.id ? "编辑成功" : "添加成功",
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
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('添加/编辑地址 ', error)
				})
			},
			// 选择位置 
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						this.formData.address = res.address
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx 48rpx 144rpx;

			.main-form {
				.form-item {
					margin-top: 32rpx;

					&:first-child {
						margin-top: 0;
					}

					.item-title {
						padding-bottom: 32rpx;
						font-size: 32rpx;
						color: #5A5B6E;
					}

					.item-input {
						border-radius: 16rpx;
						background: #FFFFFF;
						overflow: hidden;

						.input {
							font-size: 28rpx;
							color: #5A5B6E;
							min-height: 40rpx;
							height: 40rpx;
							line-height: 40rpx;
							padding: 32rpx;
						}

						.placeholder {
							font-size: 28rpx;
							color: #ACADB7;
							line-height: 40rpx;
						}
					}

					.item-address {
						position: relative;
						border-radius: 16rpx;
						background: #FFFFFF;
						overflow: hidden;

						.textarea {
							width: 100%;
							font-size: 28rpx;
							color: #5A5B6E;
							line-height: 40rpx;
							padding: 32rpx 0 32rpx 32rpx;
							min-height: 40rpx;
						}

						.placeholder {
							width: 100%;
							font-size: 28rpx;
							color: #ACADB7;
							line-height: 40rpx;
							padding: 32rpx;
							min-height: 40rpx;
							position: absolute;
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							z-index: 9;
						}

						.icon {
							width: 34rpx;
							height: auto;
							padding: 0 32rpx 0 24rpx;
						}
					}

					.item-switch {
						padding: 32rpx;
						border-radius: 16rpx;
						background: #FFFFFF;

						.switch-label {
							flex: 1;
							font-size: 28rpx;
							color: #5A5B6E;
						}

						.switch-box {
							width: 80rpx;
							height: 40rpx;
							padding: 3rpx;
							background: #D9D9D9;
							border-radius: 20rpx;
							transition: all .3s;

							.round {
								width: 34rpx;
								height: 34rpx;
								border-radius: 50%;
								background: #fff;
								margin-left: 0;
								transition: all .3s;
							}

							&.select {
								background: var(--theme-color);

								.round {
									margin-left: calc(100% - 34rpx);
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
			}
		}
	}
</style>