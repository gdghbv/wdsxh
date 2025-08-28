<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 调查问卷-详情组件 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-problem">
		<view class="problem-item" v-for="(item, index) in problemField" :key="index">
			<!-- 标题 -->
			<view class="item-title">
				{{item.topic}}<text style="color: #E60012;" v-if="item.must == 1">*</text>
			</view>
			<!-- 多选字段 -->
			<block v-if="item.type == 'checkbox'">
				<view class="item-content" v-for="(checkboxItem, checkboxIndex) in getContent(item.content)" :key="checkboxIndex">
					<text class="text">{{checkboxItem}}</text>
				</view>
				<view class="item-content" v-if="!item.content">
					<text class="text"></text>
				</view>
			</block>
			<!-- 日期选择 -->
			<block v-else-if="item.type == 'datetime'">
				<view class="item-content">
					<text class="text">{{item.content}}</text>
					<image class="icon" src="/static/date.png" mode="aspectFit"></image>
				</view>
			</block>
			<!-- 上传图片 -->
			<block v-else-if="item.type == 'images'">
				<view class="item-upload" v-if="item.content && item.content.length">
					<view class="upload-image" v-for="(itemImages, imgIndex) in item.content" :key="imgIndex" @click="previewImage(index, imgIndex)">
						<image class="image" :src="itemImages" mode="aspectFill"></image>
					</view>
				</view>
				<view class="item-empty" v-else>未上传相关图片</view>
			</block>
			<!-- 其他字段 -->
			<block v-else>
				<view class="item-content">
					<text class="text">{{item.content}}</text>
				</view>
			</block>
			<!-- 说明字段 -->
			<block v-if="(item.type == 'radio' || item.type == 'checkbox') && item.is_explain == 1">
				<view class="item-content">
					<text class="text">{{item.explain}}</text>
				</view>
			</block>
		</view>
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
			// 预览图片
			previewImage(i, j) {
				uni.previewImage({
					urls: this.problemField[i].content,
					current: j
				});
			},
			// 获取填写数据
			getContent(content) {
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
		}
	}
</script>

<style lang="scss">
	.component-problem {
		.problem-item {
			margin-top: 32rpx;

			&:first-child {
				margin-top: 0;
			}

			.item-title {
				font-size: 32rpx;
				font-weight: 600;
				color: #5A5B6E;
			}

			.item-content {
				margin-top: 32rpx;
				padding: 36rpx 32rpx;
				border-radius: 16rpx;
				background: #FFFFFF;
				display: flex;
				align-items: center;

				.text {
					flex: 1;
					font-size: 28rpx;
					line-height: 40rpx;
					min-height: 40rpx;
					color: #5A5B6E;
					word-break: break-all;
				}

				.icon {
					width: 48rpx;
					height: 48rpx;
					margin-left: 32rpx;
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

					.image {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						border-radius: 10rpx;
					}
				}
			}

			.item-empty {
				color: #5A5B6E;
				font-size: 28rpx;
				line-height: 40rpx;
				margin-top: 24rpx;
			}
		}
	}
</style>