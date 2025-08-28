<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 反馈问卷详情 开发者: 麦沃德科技-半夏
+---------------------------------------------------------------------- -->

<template>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar title="问卷反馈详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<question-info :show-data="questionDetails" v-if="questionDetails.length"></question-info>
			<empty top="26%" title="暂无问题~" v-else></empty>
		</view>
		<!-- 底部导航 -->
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import questionInfo from "@/pagesTools/component/questionnaire/info.vue"
	export default {
		components: {
			questionInfo
		},
		data() {
			return {
				// 加载完成
				loadEnd: false,
				// 问卷id 
				questionId: 0,
				// 问卷详情
				questionDetails: [],
			};
		},
		computed: {
			...mapState({
				themeColor: state => state.app.themeColor,
			})
		},
		onLoad(option) {
			uni.showLoading({
				title: "加载中"
			})
			this.questionId = option.id
			this.getQuestionDetails(() => {
				uni.hideLoading()
				this.loadEnd = true
			})
		},
		methods: {
			// 获取问卷详情
			getQuestionDetails(fn) {
				this.$util.request("questionnaire.renderDetails", {
					questionnaire_id: this.questionId
				}).then(res => {
					if (fn) fn()
					if (res.code == 1) {
						this.questionDetails = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(error => {
					if (fn) fn()
					console.error('获取问卷详情', error)
				})
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding: 32rpx;
		}
	}
</style>