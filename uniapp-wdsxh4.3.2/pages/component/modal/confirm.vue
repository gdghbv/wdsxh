<!-- 组件-确认弹窗 开发者: 麦沃德科技-半夏 -->

<template>
	<view class="component-modal-confirm">
		<uni-popup ref="popup" type="center" @change="onChange">
			<view class="modal-confirm" :style="{width: editable ? '688rpx' : '544rpx'}">
				<view class="confirm-title" v-if="title">{{title}}</view>
				<view class="confirm-input" v-if="editable">
					<textarea class="textarea" v-model="inputData" :placeholder="placeholderText" :placeholder-class="placeholder" />
				</view>
				<view class="confirm-content" v-else>
					<rich-text :nodes="content"></rich-text>
				</view>
				<view class="confirm-footer">
					<view class="footer-btn" :style="{color: cancelColor}" v-if="showCancel" @click="handleCancel()">{{cancelText}}</view>
					<view class="footer-btn" :style="{color: confirmColor}" @click="handleConfirm()">{{confirmText}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 模态框标题
				title: "",
				// 模态框内容
				content: "",
				// 是否显示取消按钮
				showCancel: true,
				// 取消按钮文字
				cancelText: "取消",
				// 取消按钮颜色
				cancelColor: "#8D929C",
				// 确认按钮文字
				confirmText: "确定",
				// 确认按钮颜色
				confirmColor: "#DE2828",
				// 是否显示输入框
				editable: false,
				// 显示输入框时的提示文本
				placeholderText: "请输入",
				// 回调函数
				callback: null,
				// 输入内容
				inputData: "",
			}
		},
		methods: {
			// 打开弹窗
			open(e) {
				this.title = e.title || ""
				this.content = e.content || ""
				this.showCancel = e.showCancel === false ? false : true
				this.cancelText = e.cancelText || "取消"
				this.cancelColor = e.cancelColor || "#8D929C"
				this.confirmText = e.confirmText || "确定"
				this.confirmColor = e.confirmColor || "#325DFF"
				this.editable = e.editable || false
				this.placeholderText = e.placeholderText || "请输入"
				this.callback = e.success
				this.inputData = ""
				this.$refs.popup.open()
			},
			// 改变事件
			onChange(e) {
				this.$emit("onChange", e.show)
			},
			// 取消按钮
			handleCancel() {
				if (this.callback) {
					this.callback({
						cancel: true,
					})
				}
				this.$refs.popup.close()
			},
			// 确认按钮
			handleConfirm() {
				if (this.callback) {
					if (this.editable) {
						if (!this.inputData) {
							uni.showToast({
								icon: "none",
								title: this.placeholderText
							})
							return
						}
						this.callback({
							confirm: true,
							content: this.inputData
						})
						this.$refs.popup.close()
					} else {
						this.callback({
							confirm: true
						})
						this.$refs.popup.close()
					}
				} else {
					this.$refs.popup.close()
				}
			},
		},
	}
</script>

<style lang="scss">
	.component-modal-confirm {
		position: relative;
		z-index: 999;

		.modal-confirm {
			width: 544rpx;
			max-width: 92vw;
			border-radius: 16rpx;
			background: #FFF;
			padding-top: 32rpx;

			.confirm-title {
				color: #5A5B6E;
				font-size: 32rpx;
				font-weight: 600;
				line-height: 44rpx;
				padding: 0 32rpx 16rpx;
				text-align: center;
			}

			.confirm-content {
				padding: 32rpx 48rpx 64rpx;
				color: #5A5B6E;
				text-align: center;
				font-size: 32rpx;
				line-height: 44rpx;
				white-space: pre-wrap;
			}

			.confirm-input {
				padding: 16rpx 32rpx 32rpx;

				.textarea {
					padding: 32rpx;
					border-radius: 16rpx;
					background: #F6F7FB;
					width: 100%;
					box-sizing: border-box;
					height: 240rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.placeholder {
					color: #8D929C;
				}
			}

			.confirm-footer {
				border-top: 1px solid #E5E5E5;
				display: flex;

				.footer-btn {
					flex: 1;
					width: 50%;
					padding: 28rpx 20rpx;
					text-align: center;
					font-size: 32rpx;
					line-height: 48rpx;
					border-left: 1px solid #E5E5E5;

					&:first-child {
						border-left: none;
					}
				}
			}
		}
	}
</style>