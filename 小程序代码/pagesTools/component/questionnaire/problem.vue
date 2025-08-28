<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 调查问卷-问题组件 开发者: 麦沃德科技-暴雨 
+---------------------------------------------------------------------- -->

<template>
	<view class="component-problem">
		<view class="problem-form">
			<view class="problem-form-item" v-for="(item, index) in problemField" :key="index">
				<!-- 标题 -->
				<view class="item-title">
					{{item.topic}}<text style="color: #E60012;" v-if="item.must == 1">*</text>
				</view>
				<!-- 文本字段 -->
				<block v-if="item.type == 'text'">
					<view class="item-text">
						<input v-model="item.value" type="text" :placeholder="item.message || '请输入'" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 数字字段 -->
				<block v-else-if="item.type == 'number'">
					<view class="item-text">
						<input v-model="item.value" type="number" :placeholder="item.message || '请输入'" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 单选按钮 -->
				<block v-else-if="item.type == 'radio'">
					<view class="item-radio">
						<view class="item-radio-option" v-for="(radioItem, radioIndex) in getOptions(item.content)" :key="radioIndex" @click="selectRadio(index, radioItem.title)">
							<view class="item-radio-button">
								<image src="/static/mark.png" class="radio-image" v-if="item.value == radioItem.title"></image>
							</view>
							<view class="item-radio-txt">{{radioItem.title}}</view>
						</view>
					</view>
					<view class="item-text" v-if="item.is_explain == 1">
						<input v-model="item.explain" type="text" :placeholder="item.explain_message" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 多选按钮 -->
				<block v-else-if="item.type == 'checkbox'">
					<view class="item-checkbox">
						<view class="item-checkbox-option" v-for="(checkboxItem, checkboxIndex) in getOptions(item.content)" :key="checkboxIndex" @click="toggleCheckbox(index, checkboxItem.title)">
							<view class="item-checkbox-button">
								<image src="/static/mark.png" class="checkbox-image" v-if="item.value && item.value.includes(checkboxItem.title)"></image>
							</view>
							<view class="item-checkbox-txt">{{checkboxItem.title}}</view>
						</view>
					</view>
					<view class="item-text" v-if="item.is_explain == 1">
						<input v-model="item.explain" type="text" :placeholder="item.explain_message" placeholder-class="placeholder" />
					</view>
				</block>
				<!-- 日期选择 -->
				<block v-else-if="item.type == 'datetime'">
					<view class="item-date" @click="openDatePicker(index)">
						<view class="input" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder" v-else>{{item.message || '请选择'}}</view>
						<image class="icon" src="/static/date.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 下拉选择 -->
				<block v-else-if="item.type == 'select'">
					<view class="item-select" @click="openSelectPicker(index)">
						<view class="input" v-if="item.value">{{item.value}}</view>
						<view class="input placeholder" v-else>{{item.message || '请选择'}}</view>
						<image class="icon" src="/static/right.png" mode="aspectFit"></image>
					</view>
				</block>
				<!-- 文本域 -->
				<block v-else-if="item.type == 'textarea'">
					<view class="item-textarea">
						<textarea v-model="item.value" class="item-textarea-height" :placeholder="item.message || '请输入'" placeholder-class="placeholder"></textarea>
					</view>
				</block>
				<!-- 上传图片 -->
				<block v-else-if="item.type == 'images'">
					<view class="item-upload">
						<view class="upload-image" v-if="item.value && item.value.length > 0" v-for="(itemImages, imgIndex) in item.value" :key="imgIndex" @click="previewImage(index, imgIndex)">
							<image class="image-select" :src="itemImages" mode="aspectFill"></image>
							<image class="image-delete" src="/static/delete.png" mode="aspectFit" @click.stop="deleteImage(index, imgIndex)"></image>
						</view>
						<view class="upload-image" v-if="!item.value || item.value.length < 9" @click="chooseImage(index)">
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
			</view>
		</view>
		<!-- 单项选择框弹窗组件 -->
		<select-picker ref="selectPicker" title="下拉选择" @onChange="pageChange" @confirm="changeSelectPicker"></select-picker>
		<!-- 日期选择框弹窗组件 -->
		<date-picker ref="datePicker" @onChange="pageChange" @confirm="changeDatePicker"></date-picker>
	</view>
</template>

<script>
	import selectPicker from "@/pages/component/picker/select.vue"
	import datePicker from "@/pages/component/picker/date.vue"
	export default {
		name: "questionProblem",
		props: ["showData"],
		components: {
			selectPicker,
			datePicker
		},
		data() {
			return {
				// 问卷字段 
				problemField: [],
			};
		},
		watch: {
			showData: {
				handler(value) {
					this.problemField = value || [];
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// 单选按钮
			selectRadio(index, radioItem) {
				this.$set(this.problemField[index], 'value', radioItem);
			},
			// 多选按钮
			toggleCheckbox(index, checkboxItem) {
				if (this.problemField[index].value) {
					if (this.problemField[index].value.includes(checkboxItem)) {
						this.$delete(this.problemField[index].value, this.problemField[index].value.indexOf(checkboxItem))
					} else {
						this.problemField[index].value.push(checkboxItem)
					}
				} else {
					this.problemField[index].value = [checkboxItem]
				}
				this.$forceUpdate()
			},
			// 选择下拉选项
			openSelectPicker(index) {
				let list = this.getOptions(this.problemField[index].content)
				list = list.map(item => item.title)
				this.$refs.selectPicker.open(list, this.problemField[index].value, index)
			},
			// 改变下拉选项
			changeSelectPicker(value, index) {
				this.$set(this.problemField[index], 'value', value);
			},
			// 选择日期
			openDatePicker(index) {
				this.$refs.datePicker.open(this.problemField[index].value, index)
			},
			// 改变日期 
			changeDatePicker(value, index) {
				this.$set(this.problemField[index], 'value', value);
			},
			// 获取表单数据
			getApplyField(fn) {
				fn(JSON.parse(JSON.stringify(this.problemField)))
			},
			// 获取选项数据
			getOptions(content) {
				try {
					const parsedContent = JSON.parse(content);
					if (Array.isArray(parsedContent)) {
						return parsedContent;
					} else {
						return [];
					}
				} catch (error) {
					return [];
				}
			},
			// 获取已选数据
			getSelectData(content) {
				try {
					const parsedContent = content ? content.split(",") : [];
					if (Array.isArray(parsedContent)) {
						return parsedContent;
					} else {
						return [];
					}
				} catch (error) {
					return [];
				}
			},
			// 选择图片
			chooseImage(index) {
				let limit = this.problemField[index].value ? (9 - this.problemField[index].value.length) : 9
				// #ifdef MP-WEIXIN
				uni.chooseMedia({
					count: limit,
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						let list = res.tempFiles.map(item => item.tempFilePath)
						if (!this.problemField[index].value) this.problemField[index].value = []
						this.problemField[index].value = [...this.problemField[index].value, ...list]
						this.$forceUpdate()
					}
				})
				// #endif
				// #ifndef MP-WEIXIN
				uni.chooseImage({
					count: limit,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed'],
					success: (res) => {
						let list = res.tempFilePaths
						if (!this.problemField[index].value) this.problemField[index].value = []
						this.problemField[index].value = [...this.problemField[index].value, ...list]
						this.$forceUpdate()
					}
				});
				// #endif
			},
			// 删除图片
			deleteImage(i, j) {
				this.$delete(this.problemField[i].value, j)
				this.$forceUpdate()
			},
			// 预览图片
			previewImage(i, j) {
				let list = []
				if (this.problemField[i].status == 1) list = this.problemField[i].content || []
				else list = this.problemField[i].value || []
				uni.previewImage({
					urls: list,
					current: j
				});
			},
			// 改变页面滚动状态
			pageChange(state) {
				this.$emit("onChange", state)
			}
		}
	}
</script>

<style lang="scss">
	.component-problem {
		.problem-form {
			.problem-form-item {
				margin-top: 32rpx;

				&:first-child {
					margin-top: 0;
				}

				.item-title {
					font-size: 32rpx;
					font-weight: 600;
					color: #5A5B6E;
				}

				.item-text {
					margin-top: 32rpx;
					padding: 36rpx 32rpx;
					border-radius: 16rpx;
					background: #FFFFFF;

					.placeholder {
						font-size: 28rpx;
						line-height: 40rpx;
						color: #8D929C;
					}
				}

				.item-radio {
					.item-radio-option {
						margin-top: 32rpx;
						display: flex;
						align-items: center;

						.item-radio-button {
							width: 48rpx;
							height: 48rpx;
							border-radius: 8rpx;
							background: #FFFFFF;
							position: relative; // 设置相对定位，用于放置图片    

							.radio-image {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								display: block;
							}
						}

						.item-radio-txt {
							padding-left: 16rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}
					}
				}

				.item-checkbox {
					.item-checkbox-option {
						margin-top: 32rpx;
						display: flex;
						align-items: center;

						.item-checkbox-button {
							width: 48rpx;
							height: 48rpx;
							border-radius: 8rpx;
							background: #FFFFFF;
							position: relative; // 设置相对定位，用于放置图片

							.checkbox-image {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								display: block;
							}
						}

						.item-checkbox-txt {
							padding-left: 16rpx;
							font-size: 28rpx;
							line-height: 40rpx;
							color: #5A5B6E;
						}
					}
				}

				.item-date {
					margin-top: 32rpx;
					padding: 36rpx 32rpx;
					border-radius: 16rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;

					.input {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						flex: 1;
					}

					.placeholder {
						color: #ACADB7;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.icon {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.item-select {
					margin-top: 32rpx;
					padding: 36rpx 32rpx;
					border-radius: 16rpx;
					background: #FFFFFF;
					display: flex;
					align-items: center;

					.input {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						flex: 1;
					}

					.placeholder {
						color: #ACADB7;
						font-size: 28rpx;
						line-height: 40rpx;
					}

					.icon {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.item-textarea {
					margin-top: 32rpx;
					padding: 36rpx 32rpx;
					border-radius: 16rpx;
					background: #FFFFFF;

					.item-textarea-height {
						height: 136rpx;
						width: 100%;
					}

					.placeholder {
						font-size: 28rpx;
						line-height: 40rpx;
						color: #8D929C;
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

					.upload-empty {
						color: #5A5B6E;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-top: 24rpx;
					}
				}
			}
		}
	}
</style>