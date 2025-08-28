<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.maiwd.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 富文本 开发者: 麦沃德科技半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :title="navigationBarTitle"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<mp-html :content="editorContent" />
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from 'weixin-js-sdk';
	// #endif
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 页面标题
				navigationBarTitle: "详情",
				// 加载完成
				loadEnd: false,
			};
		},
		computed: {
			...mapState({
				shareInfo: state => state.app.shareInfo,
				editorContent: state => state.app.editorContent,
			})
		},
		onLoad(option) {
			this.navigationBarTitle = option.name || "详情"
			this.$nextTick(() => {
				this.loadEnd = true
			})
			// #ifdef H5
			this.initConfig()
			// #endif
		},
		onShareAppMessage() {
			return {
				title: this.shareInfo.title,
				imageUrl: this.shareInfo.image,
			}
		},
		onShareTimeline() {
			return {
				title: this.shareInfo.title,
				imageUrl: this.shareInfo.image,
			}
		},
		methods: {
			// #ifdef H5
			// 微信公众号初始化方法
			initConfig() {
				this.$util.request("main.WeChatConfig", {
					url: location.href.split('#')[0]
				}).then(res => {
					if (res.code == 1) {
						wx.config({
							debug: false,
							appId: res.data.appId,
							timestamp: Number(res.data.timestamp),
							nonceStr: res.data.nonceStr,
							signature: res.data.signature,
							jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
							openTagList: ["updateAppMessageShareData", "updateTimelineShareData"],
						})
						wx.ready(() => {
							wx.updateAppMessageShareData({
								title: this.shareTitle,
								desc: "",
								link: window.location.href,
								imgUrl: this.shareImage,
							});
							wx.updateTimelineShareData({
								title: this.shareTitle,
								link: window.location.href,
								imgUrl: this.shareImage,
							});
						});
					} else {
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					uni.hideLoading()
					console.error('通过config接口注入权限验证配置 ', error)
				})
			},
			// #endif
		},
	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		.container-main {
			padding: 32rpx;
			font-size: 32rpx;
			line-height: 60rpx;
			color: #666;
		}
	}
</style>