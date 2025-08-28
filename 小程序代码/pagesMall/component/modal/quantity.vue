<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 数量选择弹窗 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-modal-quantity" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="modal-box" :style="{'--theme-color': themeColor}">
				<view class="modal-content flex align-items-center">
					<view class="content-title">选择商品数量：</view>
					<view class="content-select flex-item flex justify-content-end align-items-center">
						<view class="select-btn" @click="handleSubtraction()">
							<image class="icon" src="@/static/mall/subtraction.png" mode="aspectFit"></image>
						</view>
						<input class="select-number" v-model="selectQuantity" type="number" @blur="handleBlur()" />
						<view class="select-btn" @click="handleAddition()">
							<image class="icon" src="@/static/mall/addition.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="modal-footer">
					<view class="footer-btn" @click="onConfirm()">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "componentModalQuantity",
		data() {
			return {
				// 选择数量
				selectQuantity: 1,
				// 参数
				parameter: null,
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 打开模态框
			open(value, parameter) {
				this.selectQuantity = parseInt(value)
				this.parameter = parameter
				this.$refs.popupModal.open()
			},
			// 关闭弹窗
			onClose() {
				this.$refs.popupModal.close()
			},
			// 改变事件
			onChange(e) {
				this.$emit("onChange", e.show)
			},
			// 选择事件
			onConfirm() {
				this.onClose()
				this.$emit("confirm", this.selectQuantity, this.parameter)
			},
			// 减少数量
			handleSubtraction() {
				if (this.selectQuantity > 1) this.selectQuantity--
				this.$forceUpdate()
			},
			// 增加数量
			handleAddition() {
				this.selectQuantity++
				this.$forceUpdate()
			},
			// 数量判断
			handleBlur() {
				this.selectQuantity = parseInt(this.selectQuantity) || 1
				if (this.selectQuantity < 1) this.selectQuantity = 1
				this.$forceUpdate()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-modal-quantity {
		position: relative;
		z-index: 999;

		.modal-box {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			width: 100vw;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.modal-content {
				padding: 64rpx 48rpx;

				.content-title {
					color: #000;
					font-size: 32rpx;
					line-height: 44rpx;
				}

				.content-select {
					margin-left: 24rpx;

					.select-btn {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						background: var(--theme-color);
						overflow: hidden;

						.icon {
							width: 100%;
							height: 100%;
						}
					}

					.select-number {
						color: #000;
						font-size: 28rpx;
						line-height: 48rpx;
						height: 48rpx;
						border-radius: 10rpx;
						background: #F2F2F2;
						padding: 0 16rpx;
						text-align: center;
						width: 120rpx;
						box-sizing: border-box;
						margin: 0 20rpx;
					}
				}
			}

			.modal-footer {
				padding: 16rpx 24rpx;
				border-top: 1px solid #ccc;

				.footer-btn {
					color: #FFF;
					text-align: center;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 20rpx 32rpx;
					border-radius: 40rpx;
					background: var(--theme-color);
				}
			}
		}
	}
</style>