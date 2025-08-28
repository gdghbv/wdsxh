<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-会员自定义字段(会员审核) 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="component-member-custom">
		<block v-for="(item, index) in showData" :key="index">
			<!-- 文本域 -->
			<view class="custom-item" v-if="item.type == 'textarea'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-content" v-if="(showType == 1 && item.field == 'introduce_content') || (showType == 2 && item.field == 'company_introduction') || (showType == 3 && item.field == 'organize_introduction')">
					<mp-html :content="item.value || '暂未完善'"></mp-html>
				</view>
				<view class="item-content" v-else>{{item.value || '暂未完善'}}</view>
			</view>
			<!-- 图片 -->
			<view class="custom-item" v-else-if="item.type == 'image'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-list" v-if="item.value">
					<view class="list-image" v-for="(img, num) in item.value.split(',')" :key="num">
						<image class="image" :src="img" mode="aspectFill" @click="previewImage(index, num)"></image>
					</view>
				</view>
				<view class="item-content" v-else>暂未完善</view>
			</view>
			<!-- 视频 -->
			<view class="custom-item" v-else-if="item.type == 'video'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-video" v-if="item.value">
					<video class="video" :src="item.value" controls></video>
				</view>
				<view class="item-content" v-else>暂未完善</view>
			</view>
			<!-- 证书 -->
			<view class="custom-item" v-else-if="item.type == 'cert'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-cert" v-if="item.value && item.value.image">
					<view class="cert-text">姓名：{{item.value.name}}</view>
					<view class="cert-text">证书编号：{{item.value.number}}</view>
					<image class="cert-image" :src="item.value.image" mode="widthFix" @click="previewImage(index)"></image>
				</view>
				<view class="item-content" v-else>暂未完善</view>
			</view>
			<!-- 文件 -->
			<view class="custom-item" v-else-if="item.type == 'file'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-file" v-if="item.value && item.value.length">
					<view class="file-box" v-for="(file, number) in item.value" :key="number">
						<view class="box-name text-ellipsis">{{file.name || "文件"}}</view>
						<view class="box-btn" @click="handleView(file.path)">
							<image src="/static/see.png" mode="aspectFit"></image>
							<text>查看</text>
						</view>
					</view>
				</view>
				<view class="item-content" v-else>暂未完善</view>
			</view>
			<!-- 地址 -->
			<view class="custom-item flex" v-else-if="item.type == 'text' && showType == 1 && item.field == 'address'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-value flex-item">{{ item.value ? (item.value.address || "暂未完善") : "暂未完善"}}</view>
			</view>
			<!-- 手机号 -->
			<view class="custom-item flex align-items-center flex-wrap" v-else-if="item.type == 'number' && showType == 1 && item.field == 'mobile'">
				<view class="item-title">{{item.label}}</view>
				<view class="item-value flex-item">{{item.value || "暂未完善"}}</view>
				<view class="item-icon" :style="{'background-image': 'url('+ iconPhone +')'}" v-if="iconPhone" @click="onContact(item.value)"></view>
			</view>
			<!-- 其他 -->
			<view class="custom-item flex" v-else>
				<view class="item-title">{{item.label}}</view>
				<view class="item-value flex-item">{{(item.value || item.value === 0) ? item.value : "暂未完善"}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	import svgData from "@/common/svg.js"
	import { mapState } from "vuex"
	export default {
		name: "memberCustom",
		props: ["showData", "showType"],
		computed: {
			...mapState({
				iconPhone: state => {
					return svgData.svgToUrl("phone", state.app.themeColor)
				},
			})
		},
		methods: {
			// 预览图片
			previewImage(i, j = 0) {
				let list = []
				if (this.showData[i].type == "cert") {
					list = [this.showData[i].value.image]
				} else {
					list = this.showData[i].value.split(",")
				}
				uni.previewImage({
					urls: list,
					current: j
				});
			},
			// 查看附件
			handleView(link) {
				if (link) {
					// #ifdef MP-WEIXIN
					uni.showLoading({
						mask: true,
						title: '加载中',
					})
					uni.getImageInfo({
						src: link,
						success: (res) => {
							if (res.type == "unknown" || res.width == -1 || res.height == -1) {
								this.openDocument(link)
							} else {
								uni.previewImage({
									urls: [link],
									success: () => {
										uni.hideLoading()
									},
								})
							}
						},
						fail: () => {
							this.openDocument(link)
						},
					})
					// #endif
					// #ifdef H5
					uni.setClipboardData({
						data: e.content,
						success: () => {
							uni.showToast({
								title: "链接复制成功，请前往浏览器下载后查看"
							})
						}
					});
					// #endif
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂无可查看附件',
					})
				}
			},
			// 打开文件
			openDocument(link) {
				this.$util.openDocument(link).then(() => {
					uni.hideLoading()
				}).catch(() => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '附件打开失败',
					})
				})
			},
			// 联系
			onContact(mobile) {
				this.$util.toPage({
					mode: 6,
					phone: mobile,
				})
			},
		},
	}
</script>

<style lang="scss">
	.component-member-custom {
		.custom-item {
			padding: 32rpx 0;
			border-bottom: 1px solid #F1F4FF;

			&:last-child {
				padding-bottom: 0;
				border-bottom: none;
			}

			.item-title {
				color: #5A5B6E;
				font-size: 28rpx;
				font-weight: 600;
				line-height: 40rpx;
				margin-right: 32rpx;
			}

			.item-value {
				color: #5A5B6E;
				font-size: 28rpx;
				line-height: 40rpx;
				word-break: break-all;
				text-align: right;
			}

			.item-content {
				color: #5A5B6E;
				font-size: 28rpx;
				line-height: 1.5;
				word-break: break-all;
				margin-top: 32rpx;
			}

			.item-list {
				display: flex;
				flex-wrap: wrap;
				margin-top: 32rpx;
				column-gap: 3.5%;
				row-gap: 24rpx;

				.list-image {
					position: relative;
					width: 31%;
					height: 0;
					padding-top: 31%;

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

			.item-video {
				margin-top: 32rpx;

				.video {
					width: 100%;
				}
			}

			.item-image {
				margin-top: 32rpx;

				.image {
					width: 100%;
					border-radius: 10rpx;
				}
			}

			.item-cert {
				padding-top: 8rpx;

				.cert-text {
					margin-top: 24rpx;
					color: #5A5B6E;
					font-size: 28rpx;
					line-height: 40rpx;
					word-break: break-all;
				}

				.cert-image {
					margin-top: 24rpx;
					width: 100%;
					border-radius: 10rpx;
				}
			}

			.item-file {
				margin-top: 32rpx;

				.file-box {
					border-radius: 16rpx;
					border: 1rpx solid #EEE;
					background: #FFF;
					padding: 24rpx;
					display: flex;
					align-items: center;
					margin-top: 16rpx;

					&:first-child {
						margin-top: 0;
					}

					.box-name {
						flex: 1;
						color: #5A5B6E;
						font-size: 24rpx;
						line-height: 34rpx;
					}

					.box-btn {
						margin-left: 20rpx;
						display: flex;
						align-items: center;

						image {
							width: 32rpx;
							height: 32rpx;
						}

						text {
							margin-left: 20rpx;
							color: #5A5B6E;
							font-size: 24rpx;
							line-height: 34rpx;
						}
					}
				}
			}

			.item-icon {
				width: 32rpx;
				height: 32rpx;
				background-size: 32rpx;
				margin-left: 24rpx;
			}
		}
	}
</style>