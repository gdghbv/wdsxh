<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 协议 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :title="agreementTitle"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<mp-html :content="content"></mp-html>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 协议类型 1.用户协议，2.隐私政策，3.入会协议
				agreementType: 0,
				// 协议标题
				agreementTitle: "",
				// 协议内容
				content: "",
			}
		},
		onLoad(option) {
			this.agreementType = option.type
			if (option.type == 1) {
				this.agreementTitle = "用户协议"
			} else if (option.type == 2) {
				this.agreementTitle = "隐私政策"
			} else if (option.type == 3) {
				this.agreementTitle = "入会协议"
			}
			uni.showLoading({
				title: "加载中"
			})
			this.getConfigInfo(() => {
				this.loadEnd = true
				uni.hideLoading()
			})
		},
		methods: {
			// 获取协议内容
			getConfigInfo(fn) {
				this.$util.request("main.agreement", {
					type: this.agreementType
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.content = res.data.content
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取协议内容 ', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		.container-main {
			padding: 32rpx;
			color: #333;
			font-size: 32rpx;
			line-height: 60rpx;
		}
	}
</style>