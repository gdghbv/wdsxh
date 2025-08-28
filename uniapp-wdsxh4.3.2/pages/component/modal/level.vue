<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-级别选择弹窗 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-modal-level" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="popup-box" :style="{'--theme-color': themeColor}">
				<view class="popup-header">
					<view class="title">会员级别</view>
					<image class="close" src="/static/close.png" mode="aspectFit" @click="onClose"></image>
				</view>
				<view class="popup-content flex-direction-column">
					<scroll-view scroll-y class="contetnt-scroll flex-item">
						<view class="scroll-list flex flex-wrap">
							<view class="list-item" :class="{active: selectItem.includes(item)}" v-for="item in levelList" :key="item.id" @click="selectLevel(item)">{{item.name}}</view>
						</view>
					</scroll-view>
				</view>
				<view class="popup-btn">
					<view class="btn" @click="onReset">重置</view>
					<view class="btn confirm" @click="onConfirm">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		name: "modalLevel",
		data() {
			return {
				// 级别列表
				levelList: [],
				// 已选项目
				selectItem: [],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		methods: {
			// 打开模态框
			open(value) {
				this.levelList = []
				this.getLevelList(value)
				this.$refs.popupModal.open()
			},
			// 获取级别数据
			getLevelList(value) {
				// 获取会员级别
				this.$util.request("member.level").then(res => {
					if (res.code == 1) {
						this.levelList = res.data
						this.selectItem = []
						for (let i in this.levelList) {
							for (let j in value) {
								if (this.levelList[i].id == value[j].id) {
									this.selectItem.push(this.levelList[i])
								}
							}
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取会员级别 ', error)
				})
			},
			// 选择级别
			selectLevel(item) {
				if (this.selectItem.includes(item)) {
					this.$delete(this.selectItem, this.selectItem.indexOf(item))
				} else {
					this.selectItem.push(item)
				}
			},
			// 关闭弹窗
			onClose() {
				this.$refs.popupModal.close()
			},
			// 重置
			onReset() {
				this.selectItem = []
				this.$emit("callback", [])
				this.onClose()
			},
			// 确认
			onConfirm() {
				this.$emit("callback", this.selectItem)
				this.onClose()
			},
			// 改变事件
			onChange(e) {
				this.$emit("onChange", e.show)
			},
		},
	}
</script>

<style lang="scss">
	.component-modal-level {
		position: relative;
		z-index: 999;

		.popup-box {
			background: #FFFFFF;
			border-radius: 40rpx 40rpx 0 0;
			padding-top: 32rpx;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			.popup-header {
				display: flex;
				align-items: center;
				padding: 0 32rpx 0 64rpx;

				.title {
					color: #333;
					text-align: center;
					font-size: 32rpx;
					font-weight: 600;
					line-height: 44rpx;
					flex: 1;
				}

				.close {
					width: 32rpx;
					height: 32rpx;
				}
			}

			.popup-content {
				padding: 12rpx 32rpx 32rpx;
				height: 60vh;

				.contetnt-scroll {
					overflow: hidden;
					padding: 0 12rpx;

					.scroll-list {
						margin-left: -32rpx;

						.list-item {
							margin-top: 32rpx;
							color: #666666;
							font-size: 28rpx;
							line-height: 40rpx;
							text-align: center;
							padding: 16rpx;
							min-width: 200rpx;
							border-radius: 10rpx;
							background: #F6F7FB;
							margin-left: 32rpx;

							&.active {
								background: var(--theme-color);
								color: #ffffff;
							}
						}
					}
				}
			}

			.popup-btn {
				display: flex;
				justify-content: space-between;
				border-top: 1rpx solid #F6F7FB;
				padding: 16rpx 32rpx;

				.btn {
					width: 48%;
					color: #666666;
					font-size: 28rpx;
					line-height: 40rpx;
					padding: 20rpx;
					border-radius: 10rpx;
					background: #F0F0F0;
					text-align: center;

					&.confirm {
						color: #FFFFFF;
						background: var(--theme-color);
					}
				}
			}
		}
	}
</style>