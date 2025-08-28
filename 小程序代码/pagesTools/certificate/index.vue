<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 证书查询 开发者: 麦沃德科技-暴雨 
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar title="证书查询"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 顶部图片  -->
			<view class="main-image">
				<image src="/static/ground.png" mode="aspectFill" class="image"></image>
			</view>
			<!-- 输入框 -->
			<view class="main-form">
				<view class="main-form-item">
					<input type="text" placeholder="请输入姓名" placeholder-class="placeholder" v-model="name" @confirm="getCertificate" />
				</view>
				<view class="main-form-item">
					<input type="text" placeholder="请输入证书编号查询" placeholder-class="placeholder" v-model="number" @confirm="getCertificate" />
				</view>
				<view class="main-form-button" :style="{background: themeColor}" @click="getCertificate()">
					证书查询
				</view>
				<view class="main-form-item">
					<view class="main-form-item-tip">温馨提示:输入任一数据即可查询。</view>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 名称
				name: '',
				// 编号
				number: ''
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
				loginImg: state => state.app.loginImg,
			})
		},
		onReady() {
			this.loadEnd = true
		},
		methods: {
			// 获取证书
			getCertificate() {
				if (this.name == '' && this.number == '') {
					uni.showToast({
						title: "请输入姓名或证书编号查询",
						icon: "none"
					})
					return
				}
				uni.showLoading({
					title: "查询中"
				})
				this.$util.request("member.certificate", {
					name: this.name,
					number: this.number
				}).then(res => {
					if (res.code == 1) {
						uni.hideLoading()
						if (res.data == '') {
							uni.showToast({
								title: "暂无相关证书~",
								icon: "none",
								duration: 1000
							})
						} else {
							this.$util.toPage({
								mode: 1,
								path: "/pagesTools/certificate/result?image=" + JSON.stringify(res.data)
							})
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					console.error('获取证书', error)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFF;
	}

	.container {
		.container-main {
			.main-image {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;

				.image {
					width: 100vw;
					height: 800rpx;
					display: block;
				}
			}

			.main-form {
				position: relative;
				top: 750rpx;
				padding: 32rpx;
				border-radius: 16rpx 16rpx 0rpx;
				background: #FFFFFF;

				.main-form-item {
					padding: 34rpx;
					margin-bottom: 32rpx;
					border-radius: 16rpx;
					text-align: center;
					background: #F6F7FB;

					.placeholder {
						text-align: center;
						font-size: 32rpx;
						color: #8D929C;
					}

					.main-form-item-tip {
						font-size: 24rpx;
						line-height: 48rpx;
						color: #5A5B6E;
					}
				}

				.main-form-button {
					padding: 34rpx;
					border-radius: 16rpx;
					margin-bottom: 32rpx;
					font-size: 32rpx;
					text-align: center;
					color: #FFFFFF;
				}
			}
		}
	}
</style>