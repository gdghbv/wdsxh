<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-单项选择框 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-picker-select" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="modal-box" :style="{'--theme-color': themeColor}">
				<view class="modal-head">
					<view class="head-title text-ellipsis">{{title}}</view>
					<view class="head-btn" @click="handleConfirm">确认</view>
				</view>
				<view class="modal-content flex align-items-center" v-if="loadEnd">
					<picker-view class="content-picker" indicator-style="height: 50px;" :immediate-change="true" :value="selectValue" @change="handleChange">
						<picker-view-column>
							<view class="picker-column" v-for="(item, index) in selectList" :key="index">{{item.name || item}}</view>
						</picker-view-column>
					</picker-view>
				</view>
				<view class="modal-btn" @click="onClose">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "selectPicker",
		props: ["title"],
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 参数
				parameter: null,
				// 数据列表
				selectList: [],
				// 已选数据
				selectValue: [0],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 打开模态框
			open(list, value, parameter) {
				this.selectList = list
				this.parameter = parameter
				if (value) {
					for (var i = 0; i < list.length; i++) {
						if (typeof(list[i]) == "object") {
							if (list[i].id == value) {
								this.selectValue = [i]
								break;
							}
						} else {
							if (list[i] == value) {
								this.selectValue = [i]
								break;
							}
						}
					}
				} else {
					this.selectValue = [0]
				}
				this.selectValue = [...this.selectValue]
				this.loadEnd = true
				this.$refs.popupModal.open()
			},
			// 关闭弹窗
			onClose() {
				this.loadEnd = false
				this.$refs.popupModal.close()
			},
			// 改变事件
			onChange(e) {
				this.$emit("onChange", e.show)
			},
			// 改变值
			handleChange(e) {
				this.selectValue = [...e.target.value]
			},
			// 确认
			handleConfirm() {
				this.$emit("confirm", this.selectList[this.selectValue[0]], this.parameter)
				this.onClose()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-picker-select {
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
					color: #333;
					text-align: center;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
					padding-left: 128rpx;
					padding: 0 32rpx 0 160rpx;
				}

				.head-btn {
					color: #FFF;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 12rpx 36rpx;
					border-radius: 10rpx;
					background: var(--theme-color);
				}
			}

			.modal-content {
				padding-bottom: 32rpx;

				.content-picker {
					height: 400rpx;
					flex: 1;

					.picker-column {
						line-height: 50px;
						text-align: center;
						font-size: 28rpx;
					}
				}
			}

			.modal-btn {
				color: #E10602;
				text-align: center;
				font-size: 32rpx;
				line-height: 44rpx;
				padding: 32rpx;
			}
		}
	}
</style>