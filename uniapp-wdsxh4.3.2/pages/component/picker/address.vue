<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-省市区选择器 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-picker-address" @click.stop>
		<uni-popup ref="popupModal" type="bottom" :safe-area="false" @change="onChange">
			<view class="modal-box" :style="{'--theme-color': themeColor}">
				<view class="modal-head">
					<view class="head-title">地址选择</view>
					<view class="head-btn" @click="handleConfirm">确认</view>
				</view>
				<view class="modal-content flex align-items-center">
					<picker-view class="content-picker" indicator-style="height: 70rpx;" :value="selectValue" @change="handleChange">
						<picker-view-column>
							<view class="picker-column" v-for="(item, index) in provinceList" :key="index">{{item.name}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-column" v-for="(item, index) in cityList" :key="index">{{item.name}}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="picker-column" v-for="(item, index) in areaList" :key="index">{{item.name}}</view>
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
		name: "addressPicker",
		data() {
			return {
				// 省份列表
				provinceList: [],
				// 城市列表
				cityList: [],
				// 地区列表
				areaList: [],
				// 已选地址
				addressList: [],
				// 已选数据
				selectValue: [0, 0, 0],
				// 参数
				parameter: "",
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		mounted() {
			this.getProvinceList()
		},
		methods: {
			// 打开模态框
			open(value, parameter) {
				const list = value.split("/")
				this.addressList = list
				this.parameter = parameter
				this.setValueChange()
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
			// 数值改变
			async handleChange(e) {
				if (this.selectValue[0] != e.target.value[0]) {
					this.selectValue = [e.target.value[0], 0, 0]
					this.cityList = await this.getCityList(this.provinceList[this.selectValue[0]].id)
					this.areaList = await this.getAreaList(this.cityList[this.selectValue[1]].id)
				} else if (this.selectValue[1] != e.target.value[1]) {
					this.selectValue = [e.target.value[0], e.target.value[1], 0]
					this.areaList = await this.getAreaList(this.cityList[this.selectValue[1]].id)
				} else {
					this.selectValue = e.target.value
				}
			},
			// 设置选中数值
			async setValueChange() {
				var selectData = [0, 0, 0]
				if (this.addressList[0]) {
					for (var i = 0; i < this.provinceList.length; i++) {
						if (this.provinceList[i].name == this.addressList[0]) {
							selectData[0] = i
							break
						}
					}
				}
				this.cityList = await this.getCityList(this.provinceList[selectData[0]].id)
				if (this.addressList[1]) {
					for (var i = 0; i < this.cityList.length; i++) {
						if (this.cityList[i].name == this.addressList[1]) {
							selectData[1] = i
							break
						}
					}
				}
				this.areaList = await this.getAreaList(this.cityList[selectData[1]].id)
				if (this.addressList[2]) {
					for (var i = 0; i < this.areaList.length; i++) {
						if (this.areaList[i].name == this.addressList[2]) {
							selectData[2] = i
							break
						}
					}
				}
				this.$nextTick(() => {
					this.selectValue = selectData
					this.$forceUpdate()
				})
			},
			// 确认
			handleConfirm() {
				var data = {
					province: this.provinceList[this.selectValue[0]].name,
					city: this.cityList[this.selectValue[1]].name,
					area: this.areaList[this.selectValue[2]].name,
				}
				this.$emit("confirm", data, this.parameter)
				this.onClose()
			},
			// 获取省份数据
			getProvinceList() {
				this.$util.request("main.address.province").then(res => {
					if (res.code == 1) {
						this.provinceList = res.data.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取省份数据 ', error)
				})
			},
			// 获取城市数据
			getCityList(id) {
				return new Promise((resolve, reject) => {
					this.$util.request("main.address.city", {
						crea_id: id
					}).then(res => {
						if (res.code == 1) {
							resolve(res.data.data)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							reject(false)
						}
					}).catch(error => {
						console.error('获取城市数据 ', error)
						reject(false)
					})
				})
			},
			// 获取地区数据
			getAreaList(id) {
				return new Promise((resolve, reject) => {
					this.$util.request("main.address.area", {
						crea_id: id
					}).then(res => {
						if (res.code == 1) {
							resolve(res.data.data)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
							reject(false)
						}
					}).catch(error => {
						console.error('获取省份数据 ', error)
						reject(false)
					})
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.component-picker-address {
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
						line-height: 70rpx;
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