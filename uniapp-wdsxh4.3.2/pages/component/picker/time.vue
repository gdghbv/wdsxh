<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-时间选择框 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-picker-time" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="modal-box" :style="{'--theme-color': themeColor}">
				<view class="modal-head">
					<view class="head-btn cancel" @click="onClose">取消</view>
					<view class="head-title">选择时间</view>
					<view class="head-btn" @click="handleConfirm">确认</view>
				</view>
				<view class="modal-content flex-item">
					<picker-view class="picker-view" indicator-style="height: 50px;" :immediate-change="true" :value="selectValue" @change="handleChange">
						<picker-view-column>
							<view class="picker-column" v-for="item in 24" :key="item">{{item < 10 ? "0" + item : item}}时</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-column" v-for="item in 60" :key="item">{{item < 10 ? "0" + item : item}}分</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "timePicker",
		data() {
			const date = new Date()
			const hours = date.getHours();
			const minutes = date.getMinutes();
			return {
				// 当前时间
				nowTime: [hours, minutes],
				// 已选数据
				selectValue: [hours, minutes],
				// 参数
				parameter: "",
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
				this.parameter = parameter
				if (value) {
					var time = value.split(":")
					this.selectValue = [parseInt(time[0]), parseInt(time[1])]
				} else {
					this.selectValue = [parseInt(this.nowTime[0]), parseInt(this.nowTime[1])]
				}
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
			// 时间改变
			handleChange(e) {
				this.selectValue = e.target.value
			},
			// 确认
			handleConfirm() {
				var hours = parseInt(this.selectValue[0]) < 10 ? "0" + this.selectValue[0] : this.selectValue[0]
				var minutes = parseInt(this.selectValue[1]) < 10 ? "0" + this.selectValue[1] : this.selectValue[1]
				var time = hours + ":" + minutes
				this.$emit("confirm", time, this.parameter)
				this.onClose()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-picker-time {
		position: relative;
		z-index: 999;

		.modal-box {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			width: 100vw;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.modal-head {
				display: flex;
				align-items: center;
				padding: 32rpx;

				.head-title {
					flex: 1;
					text-align: center;
					font-size: 28rpx;
					font-weight: 600;
					line-height: 40rpx;
					padding: 0 16rpx;
				}

				.head-btn {
					color: var(--theme-color);
					font-size: 28rpx;
					line-height: 40rpx;

					&.cancel {
						color: #979797;
					}
				}
			}

			.modal-content {
				padding-bottom: 32rpx;

				.picker-view {
					height: 400rpx;
					flex: 1;

					.picker-column {
						line-height: 50px;
						text-align: center;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>