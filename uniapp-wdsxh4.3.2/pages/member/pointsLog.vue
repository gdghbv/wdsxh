<template>
	<page-meta :page-style="'overflow:' + (pageShow ? 'hidden' : 'visible')"></page-meta>
	<view class="container" :style="{'--theme-color': themeColor}">
		<!-- 标题栏 -->
		<title-bar :showBack="true" title="积分详情"></title-bar>
		<!-- 内容区 -->
		<view class="container-main" v-if="loadEnd">
			<!-- 日志列表 -->
			<view class="main-list">
				<points-log :show-data="pointsLogList" ></points-log>
				<empty top="64rpx" title="暂无相关积分日志" v-if="pointsLogList.length==0"></empty>
			</view>
		</view>
		<!-- 底部导航 -->
		<tar-bar></tar-bar>
	</view>
</template>

<script>
	import pointsLog from "@/pages/component/member/points-log.vue"
	import { mapState } from "vuex"
export default{
	components:{
		pointsLog
	},
	data(){
		return {
			loadEnd:false,
			//积分列表
			pointsLogList: [],
			page: 1,
			limit: 10,
			hasMore: false,
		}
	},
	computed:{
		...mapState({
			themeColor: state => state.app.themeColor
		})
	},
	mounted(){
		// #ifdef MP-WEIXIN
		let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.titleBarHeight = statusBarHeight + (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
		// #endif
	},
	onLoad() {
		uni.showLoading({
			title:"加载中"
		})
		this.getPointsLogList(()=>{
			uni.hideLoading()
			this.loadEnd=true
		})
	},
	onShow() {
		if(this.loadEnd){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			this.page=1
			this.getPointsLogList()
		}
	},
	onPullDownRefresh(){
		this.page=1
		this.resetPointsLogLiset(()=>{
			uni.stopPullDownRefresh()
		})
	},
	onReachBottom(){
		console.log("检测到上拉到底部，是否还有更多的数据",this.hasMore)
		if(this.hasMore){
			this.page++
			this.getPointsLogList()
		}
	},
	methods:{
	getPointsLogList(fn) {
	  let data = {
	    page: this.page,
	    limit: this.limit,
	  }
	  this.$util.request("mine.pointsLog", data).then(res => {
	    console.log("获取到的积分信息是:", res)
	    if (fn) fn()
	    if (res.code == 1) {
	      let list = res.data.data || [] // 确保 list 是数组
		  console.log("验证list是否被正确传入",list,"数据是否完成",res.data.total)
	      this.hasMore = this.page < res.data.total / this.limit ? true : false
	      this.pointsLogList = this.page == 1 ? list : [...this.pointsLogList, ...list];
	    } else {
	      uni.showToast({
	        title: res.msg,
	        icon: 'none'
	      })
	      this.pointsLogList = [] // 确保失败时也是空数组
	    }
	  }).catch(error => {
	    if (fn) fn()
	    console.error('获取订单列表', error)
	    this.pointsLogList = [] // 确保异常时也是空数组
	  })
	},
	//重新获取积分日志列表
	resetPointsLogList(){
		this.page=1
		this.getPointsLogList()
	},
	
	}
}
</script>

<style lang="scss">
	.container {
		.container-main {
			padding-bottom: 112rpx;

			.main-header {
				position: sticky;
				top: 0;
				z-index: 96;

				.header-screen {
					display: flex;
					background: #ffffff;

					.screen {
						width: 50%;
						color: #8D929C;
						font-size: 28rpx;
						line-height: 40rpx;
						text-align: center;
						padding: 32rpx 24rpx;

						&.active {
							color: var(--theme-color)
						}
					}
				}

				.header-box {
					position: relative;
					background: linear-gradient(0deg, #F6F7FB, var(--theme-color) 316.667%);
					padding: 40rpx 48rpx;

					.box-image {
						position: absolute;
						top: 64rpx;
						right: 48rpx;
						width: 218rpx;
						height: 198rpx;
						background-size: 218rpx 198rpx;
					}

					.box-title {
						color: var(--theme-color);
						font-size: 48rpx;
						font-weight: 600;
						line-height: 68rpx;
						position: relative;
						z-index: 1;
					}

					.box-subtitle {
						margin-top: 32rpx;
						color: #999999;
						font-size: 28rpx;
						line-height: 40rpx;
						position: relative;
						z-index: 1;
					}
				}
			}

			.main-form {
				padding: 22rpx 48rpx 32rpx;
			}

			.main-footer {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 96;
				background: #ffffff;
				border-top: 1rpx solid #F6F7FB;
				padding: 12rpx 24rpx;

				.footer-btn {
					color: #ffffff;
					font-size: 32rpx;
					line-height: 44rpx;
					padding: 22rpx 24rpx;
					border-radius: 16rpx;
					background: var(--theme-color);
					text-align: center;
				}
			}
		}
	}
</style>
