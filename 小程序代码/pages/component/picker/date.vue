<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-日期选择框 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-picker-date" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="modal-box" :style="{'--theme-color': themeColor}">
				<view class="modal-head">
					<view class="head-btn cancel" @click="onClose">取消</view>
					<view class="head-title">选择日期</view>
					<view class="head-btn" @click="handleConfirm">确认</view>
				</view>
				<view class="modal-content flex-item">
					<picker-view class="picker-view" indicator-style="height: 50px;" :immediate-change="true" :value="selectValue" @change="handleChange">
						<picker-view-column>
							<view class="picker-column" v-for="(item,index) in yearList" :key="index">{{item}}年</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-column" v-for="(item,index) in monthList" :key="index">{{item}}月</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-column" v-for="(item,index) in dayList" :key="index">{{item}}日</view>
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
		name: "datePicker",
		data() {
			const date = new Date()
			const year = date.getFullYear()
			const month = date.getMonth() + 1
			const day = date.getDate()
			let years = []
			let months = []
			let days = []
			for (let i = parseInt(year) - 150; i <= parseInt(year) + 150; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
				days.push(i)
			}
			return {
				// 当前日期
				nowDate: [year, month, day],
				// 年列表
				yearList: years,
				// 月列表
				monthList: months,
				// 日列表
				dayList: days,
				// 已选数据
				selectValue: [year, month - 1, day - 1],
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
					var date = value.split("-")
					var yearIndex = this.yearList.findIndex(item => {
						if (item == date[0]) return true
					})
					var monthIndex = this.monthList.findIndex(item => {
						if (item == date[1]) return true
					})
					var dayIndex = this.dayList.findIndex(item => {
						if (item == date[2]) return true
					})
					this.selectValue = [yearIndex, monthIndex, dayIndex]
				} else {
					this.selectValue = [this.yearList.indexOf(this.nowDate[0]), this.monthList.indexOf(this.nowDate[1]), this.dayList.indexOf(this.nowDate[2])]
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
				if (this.selectValue[0] != e.target.value[0] || this.selectValue[1] != e.target.value[1]) {
					var days = []
					var year = this.yearList[e.target.value[0]]
					var month = this.monthList[e.target.value[1]]
					for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
						days.push(i)
					}
					this.dayList = days
				}
				this.selectValue = e.target.value
				if (this.selectValue[2] > this.dayList.length - 1) {
					this.selectValue[2] = this.dayList.length - 1
				}
			},
			// 确认
			handleConfirm() {
				var year = parseInt(this.yearList[this.selectValue[0]]) < 10 ? "0" + this.yearList[this.selectValue[0]] : this.yearList[this.selectValue[0]]
				var month = parseInt(this.monthList[this.selectValue[1]]) < 10 ? "0" + this.monthList[this.selectValue[1]] : this.monthList[this.selectValue[1]]
				var day = parseInt(this.dayList[this.selectValue[2]]) < 10 ? "0" + this.dayList[this.selectValue[2]] : this.dayList[this.selectValue[2]]
				var data = year + "-" + month + "-" + day
				this.$emit("confirm", data, this.parameter)
				this.onClose()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-picker-date {
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