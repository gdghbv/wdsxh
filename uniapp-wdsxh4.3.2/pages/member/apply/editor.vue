<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 编辑器 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="介绍内容"></title-bar>
		<!-- 内容区 -->
		<view class="container-main">
			<sp-editor :toolbar-config="toolbarConfig" @init="initEditor" @upinImage="upinImage" @overMax="overMax" @exportHtml="exportHtml"></sp-editor>
		</view>
		<view class="safe-padding"></view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				// 页面参数
				params: null,
				// 编辑器实例
				editorIns: null,
				// 编辑器配置
				toolbarConfig: {
					excludeKeys: ['direction', 'date', 'lineHeight', 'letterSpacing', 'listCheck'],
					iconSize: '18px'
				}
			}
		},
		computed: {
			...mapState({
				editorContent: state => state.app.editorContent,
			})
		},
		onLoad(option) {
			if (option.params) this.params = option.params;
		},
		methods: {
			// 超出最大内容限制
			overMax(e) {
				uni.showToast({
					title: "输入内容已超过最大字数限制"
				})
			},
			// 初始化编辑器
			initEditor(editor) {
				this.editorIns = editor
				this.editorIns.setContents({
					html: this.editorContent || ""
				})
			},
			// 上传图片
			upinImage(tempFiles, editorCtx) {
				let imageList = []
				// #ifdef MP-WEIXIN
				imageList = tempFiles.map(item => item.tempFilePath)
				// #endif
				// #ifndef MP-WEIXIN
				imageList = tempFiles.map(item => item.path)
				// #endif
				uni.showLoading({
					title: '上传中请稍后',
					mask: true
				})
				this.$util.uploadFileMultiple(imageList, [], 2).then(result => {
					result.forEach((item) => {
						editorCtx.insertImage({
							src: item,
							width: '80%',
							success: () => {
								uni.hideLoading()
							}
						})
					});
				}).catch(error => {
					console.error('上传图片 ', error)
				})
			},
			// 完成编辑
			exportHtml(e) {
				let pages = getCurrentPages()
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.editorContent = {
					params: this.params,
					content: e,
				}
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">
	page {
		padding-bottom: 0;
	}

	.container {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.container-main {
			flex: 1;
			overflow: hidden;
		}
	}
</style>