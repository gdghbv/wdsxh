<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-活动报名 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-activity-apply">
		<!-- 表单数据 -->
		<form class="apply-form">
			<view class="form-item" v-for="(item, index) in applyField" :key="index">
				<!-- 标题 -->
				<view class="item-title">
					<text class="required" v-if="item.required == 1">*</text>
					<text class="text">{{item.label}}</text>
					<text class="tips" v-if="item.type == 'image' || item.type == 'video'">（{{item.option}}）</text>
				</view>
				<!-- 文本字段 -->
				<block v-if="item.type == 'text'">
					<view class="item-input" :class="{disabled: item.disabled}">
						<input class="input" :disabled="item.disabled" type="text" v-model="item.value" :placeholder="item.option" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 数字字段 -->
				<block v-else-if="item.type == 'number'">
					<view class="item-input" :class="{disabled: item.disabled}">
						<input class="input" :disabled="item.disabled" type="number" :maxlength="item.field == 'mobile' ? 11 : -1" v-model="item.value" :placeholder="item.option" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 单选按钮 -->
				<block v-else-if="item.type == 'radio'">
					<view class="item-radio">
						<view class="radio" :class="{active: item.value == option}" v-for="(option, num) in getOption(item.option)" :key="num" @click="selectRadio(index, option)">
							<image src="/static/select.png" mode="aspectFit"></image>
							<text>{{option}}</text>
						</view>
					</view>
				</block>
				<!-- 复选按钮 -->
				<block v-else-if="item.type == 'checkbox'">
					<view class="item-radio">
						<view class="radio" :class="{active: item.value.includes(option)}" v-for="(option, num) in getOption(item.option)" :key="num" @click="selectCheckbox(index, option)">
							<image src="/static/select.png" mode="aspectFit"></image>
							<text>{{option}}</text>
						</view>
					</view>
				</block>
				<!-- 下拉列表 -->
				<block v-else-if="item.type == 'select'">
					<view class="item-input" @click="openSelectPicker(index)">
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 日期字段 -->
				<block v-else-if="item.type == 'date'">
					<view class="item-input" @click="openDatePicker(index)">
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/date.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 时间字段 -->
				<block v-else-if="item.type == 'time'">
					<view class="item-input" @click="openTimePicker(index)">
						<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/time.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 日期时间 -->
				<block v-else-if="item.type == 'datetime'">
					<uni-datetime-picker v-model="item.value" :is-meeting="true" @show="pageChange(true)" @maskClick="pageChange(false)" @change="pageChange(false)">
						<view class="item-input">
							<view class="input text-ellipsis" v-if="item.value">{{item.value}}</view>
							<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
							<image class="icon" src="/static/date.png" mode="aspectFit"></image>
						</view>
					</uni-datetime-picker>
				</block>
				<!-- 文本域 -->
				<block v-else-if="item.type == 'textarea'">
					<view class="item-input">
						<textarea class="textarea" type="text" maxlength="-1" v-model="item.value" :placeholder="'请输入' + item.label" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 图片上传 -->
				<block v-else-if="item.type == 'image'">
					<view class="item-upload">
						<view class="upload-image" v-if="item.value && item.value.length > 0" v-for="(img, num) in item.value" :key="num" @click="previewImage(index, num)">
							<image class="image-select" :src="img" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage(index, num)"></image>
						</view>
						<view class="upload-image" v-if="!item.value || item.value.length < 9" @click="chooseImage(index, 9)">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传图片</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 视频上传 -->
				<block v-else-if="item.type == 'video'">
					<view class="item-upload">
						<view class="upload-image" v-if="item.value">
							<view class="image-video">
								<image class="video" src="/static/video.png" mode="aspectFill"></image>
							</view>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click="deleteVideo(index)"></image>
						</view>
						<view class="upload-image" v-else @click="chooseVideo(index)">
							<view class="image-background"></view>
							<view class="image-choose">
								<view class="icon">
									<image src="/static/camera.png" mode="aspectFit"></image>
								</view>
								<view class="text">上传视频</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 地图选址 -->
				<block v-else-if="item.type == 'map'">
					<view class="item-input" @click="chooseLocation(index)">
						<view class="input text-ellipsis" v-if="item.value.address">{{item.value.address}}</view>
						<view class="input placeholder text-ellipsis" v-else>请选择{{item.label}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</block>
			</view>
		</form>
		<!-- 单项选择框 -->
		<select-picker ref="selectPicker" :is-meeting="true" :title="selectTitle" @onChange="pageChange" @confirm="changeSelectPicker"></select-picker>
		<!-- 日期选择框 -->
		<date-picker ref="datePicker" :is-meeting="true" @onChange="pageChange" @confirm="changeDatePicker"></date-picker>
		<!-- 时间选择框 -->
		<time-picker ref="timePicker" :is-meeting="true" @onChange="pageChange" @confirm="changeTimePicker"></time-picker>
	</view>
</template>

<script>
	import selectPicker from "@/pages/component/picker/select.vue"
	import datePicker from "@/pages/component/picker/date.vue"
	import timePicker from "@/pages/component/picker/time.vue"
	export default {
		name: "activityApply",
		props: ["showData"],
		components: {
			selectPicker,
			datePicker,
			timePicker,
		},
		data() {
			return {
				// 入会字段
				applyField: [],
				// 会员级别
				levelList: [],
				// 行业分类
				industryList: [],
				// 单选标题
				selectTitle: "",
			}
		},
		watch: {
			showData: {
				handler(value) {
					this.applyField = value || [];
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 改变页面滚动状态
			pageChange(state) {
				this.$emit("onChange", state)
			},
			// 获取选项数据
			getOption(option) {
				return option.split(",")
			},
			// 选择单选
			selectRadio(index, option) {
				if (this.applyField[index].value == option) {
					this.applyField[index].value = ""
				} else {
					this.applyField[index].value = option
				}
			},
			// 选择复选
			selectCheckbox(index, option) {
				if (this.applyField[index].value.includes(option)) {
					this.$delete(this.applyField[index].value, this.applyField[index].value.indexOf(option))
				} else {
					this.applyField[index].value.push(option)
				}
			},
			// 选择图片
			chooseImage(index, limit = 9) {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: Number(limit) > 1 ? (limit - this.applyField[index].value.length) : 1,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						let list = res.tempFiles.map(item => item.tempFilePath)
						this.applyField[index].value = [...this.applyField[index].value, ...list]
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: Number(limit) > 1 ? (limit - this.applyField[index].value.length) : 1,
					sourceType: ['album', 'camera '],
					sizeType: ['compressed'],
					success: (res) => {
						let list = res.tempFilePaths
						this.applyField[index].value = [...this.applyField[index].value, ...list]
					}
				});
				// #endif
			},
			// 删除图片
			deleteImage(i, j) {
				this.$delete(this.applyField[i].value, j)
			},
			// 预览图片
			previewImage(i, j = 0) {
				let list = this.applyField[i].value
				uni.previewImage({
					urls: list,
					current: j
				});
			},
			// 选择视频
			chooseVideo(index) {
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: 1,
					mediaType: ['video'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.applyField[index].value = res.tempFiles[0].tempFilePath
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: (res) => {
						this.applyField[index].value = res.tempFilePath;
					}
				});
				// #endif
			},
			// 删除视频
			deleteVideo(index) {
				this.applyField[index].value = ""
			},
			// 选择下拉选项
			openSelectPicker(index) {
				if (this.applyField[index].disabled) return
				this.selectTitle = this.applyField[index].label
				let list = this.applyField[index].option.split(",")
				this.$refs.selectPicker.open(list, this.applyField[index].value, index)
			},
			// 改变下拉选项
			changeSelectPicker(value, index) {
				this.applyField[index].value = value
			},
			// 选择日期
			openDatePicker(index) {
				this.$refs.datePicker.open(this.applyField[index].value, index)
			},
			// 改变日期
			changeDatePicker(value, index) {
				this.applyField[index].value = value
			},
			// 选择时间
			openTimePicker(index) {
				this.$refs.timePicker.open(this.applyField[index].value, index)
			},
			// 改变时间
			changeTimePicker(value, index) {
				this.applyField[index].value = value
			},
			// 地址选址
			chooseLocation(index) {
				uni.chooseLocation({
					success: (res) => {
						this.applyField[index].value = {
							latitude: res.latitude,
							longitude: res.longitude,
							name: res.name,
							address: res.address
						}
					}
				})
			},
			// 获取表单数据
			getApplyField(fn) {
				fn(JSON.parse(JSON.stringify(this.applyField)))
			},
		},
	}
</script>

<style lang="scss">
	.component-activity-apply {
		.apply-form {
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

					.required {
						color: #E60012;
					}

					.tips {
						font-size: 28rpx;
						font-weight: 400;
						color: #666666;
					}
				}

				.item-input {
					margin-top: 32rpx;
					display: flex;
					align-items: center;
					border-radius: 16rpx;
					background: #FFF;

					&.disabled {
						.input {
							color: #8D929C;
						}
					}

					.input {
						color: #5A5B6E;
						font-size: 28rpx;
						height: 104rpx;
						line-height: 104rpx;
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
						color: #8D929C;
						font-size: 28rpx;
						line-height: 104rpx;
					}

					.icon {
						width: 32rpx;
						height: 32rpx;
						padding-right: 32rpx;
					}
				}

				.item-radio {
					display: flex;
					flex-wrap: wrap;
					margin-left: -26rpx;
					padding-top: 8rpx;

					.radio {
						border-radius: 8rpx;
						background: #FFF;
						padding: 16rpx;
						margin-left: 26rpx;
						margin-top: 24rpx;
						display: flex;
						align-items: center;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 8rpx;
							display: none;
						}

						text {
							color: #8D929C;
							font-size: 24rpx;
							line-height: 34rpx;
						}

						&.active {
							background: var(--theme-color);

							image {
								display: block;
							}

							text {
								color: #ffffff;
							}
						}
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
	}
</style>