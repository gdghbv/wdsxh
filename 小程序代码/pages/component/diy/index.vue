<!-- +----------------------------------------------------------------------
| 麦沃德科技赋能开发者，助力商协会发展 
+----------------------------------------------------------------------
| Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
+----------------------------------------------------------------------
| 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
+----------------------------------------------------------------------
| Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
+----------------------------------------------------------------------
| 组件-自定义装修 开发者: 麦沃德科技-半夏 
+---------------------------------------------------------------------- -->

<template>
	<view :style="{padding: paddingTop + ' ' + paddingLeft}">
		<block v-for="(item,index) in showData.items" :key='index'>
			<!-- 图片轮播 -->
			<block v-if="item.type == 'carouselDiy'">
				<carousel-diy :showStyle="item.style" :showData="item.data" :showParams="item.params" :domain="showData.domain" @onClick="onClick"></carousel-diy>
			</block>
			<!-- 单图组 -->
			<block v-if="item.type == 'imagesDiy'">
				<images-diy :showStyle="item.style" :showData="item.data" :domain="showData.domain" @onClick="onClick"></images-diy>
			</block>
			<!-- 导航组 -->
			<block v-if="item.type == 'navDiy'">
				<nav-diy :showStyle="item.style" :showData="item.data" :domain="showData.domain" @onClick="onClick"></nav-diy>
			</block>
			<!-- 图片魔方 -->
			<block v-if="item.type == 'cubeDiy'">
				<cube-diy :showStyle="item.style" :showData="item.data" :domain="showData.domain" @onClick="onClick"></cube-diy>
			</block>
			<!-- 信息卡片 -->
			<block v-if="item.type == 'infoCardDiy'">
				<info-card-diy :showStyle="item.style" :showParams="item.params" :domain="showData.domain" @onClick="onClick"></info-card-diy>
			</block>
			<!-- 按钮组 -->
			<block v-if="item.type == 'textButtonDiy'">
				<text-button-diy :showStyle="item.style" :showData="item.data" @onClick="onClick"></text-button-diy>
			</block>
			<!-- 标题 -->
			<block v-if="item.type == 'titleDiy'">
				<title-diy :showStyle="item.style" :showParams="item.params" @onClick="onClick"></title-diy>
			</block>
			<!-- 视频 -->
			<block v-if="item.type == 'videoDiy'">
				<video-diy :showStyle="item.style" :showParams="item.params" :domain="showData.domain"></video-diy>
			</block>
			<!-- 地图 -->
			<block v-if="item.type == 'mapDiy'">
				<map-diy :showStyle="item.style" :showParams="item.params"></map-diy>
			</block>
			<!-- 平台动态 -->
			<block v-if="item.type == 'articleDiy'">
				<article-diy :ref="'articleDiy_' + index" :showStyle="item.style" :showParams="item.params"></article-diy>
			</block>
			<!-- 商会介绍 -->
			<block v-if="item.type == 'introduceDiy'">
				<introduce-diy :showStyle="item.style" :showParams="item.params" :domain="showData.domain"></introduce-diy>
			</block>
			<!-- 会员展示 -->
			<block v-if="item.type == 'memberDiy'">
				<member-diy :ref="'memberDiy_' + index" :showStyle="item.style" :showParams="item.params"></member-diy>
			</block>
			<!-- 商会活动 -->
			<block v-if="item.type == 'activityDiy'">
				<activity-diy :ref="'activityDiy_' + index" :showStyle="item.style" :showParams="item.params"></activity-diy>
			</block>
			<!-- 活动接龙 -->
			<block v-if="item.type == 'chainsDiy'">
				<chains-diy :ref="'chainsDiy_' + index" :showStyle="item.style" :showParams="item.params" @setShareData="setShareData"></chains-diy>
			</block>
			<!-- 商会相册 -->
			<block v-if="item.type == 'albumDiy'">
				<album-diy :ref="'albumDiy_' + index" :showStyle="item.style" :showParams="item.params"></album-diy>
			</block>
			<!-- 商城商品 -->
			<block v-if="item.type == 'goodsDiy'">
				<goods-diy :ref="'goodsDiy_' + index" :showStyle="item.style" :showParams="item.params"></goods-diy>
			</block>
			<!-- 会员供需 -->
			<block v-if="item.type == 'demandDiy'">
				<demand-diy :ref="'demandDiy_' + index" :showStyle="item.style" :showParams="item.params"></demand-diy>
			</block>
			<!-- 会员地图 -->
			<block v-if="item.type == 'memberMapDiy'">
				<member-map-diy :ref="'memberMapDiy_' + index" :showMap="item.map" :showCategory="item.category" :spaceHeight="spaceHeight"></member-map-diy>
			</block>
			<!-- 搜索 -->
			<block v-if="item.type == 'searchDiy'">
				<search-diy :showStyle="item.style" :showParams="item.params"></search-diy>
			</block>
			<!-- 辅助线条 -->
			<block v-if="item.type == 'lineDiy'">
				<line-diy :showStyle="item.style"></line-diy>
			</block>
			<!-- 辅助空白 -->
			<block v-if="item.type == 'blankDiy'">
				<blank-diy :showStyle="item.style"></blank-diy>
			</block>
			<!-- 消息通知 -->
			<block v-if="item.type == 'noticeDiy'">
				<notice-diy :showStyle="item.style" :showParams="item.params" :domain="showData.domain"></notice-diy>
			</block>
			<!-- 文本组 -->
			<block v-if="item.type == 'textDiy'">
				<text-diy :showStyle="item.style"></text-diy>
			</block>
			<!-- 富文本 -->
			<block v-if="item.type == 'richTextDiy'">
				<rich-text-diy :showStyle="item.style" :showParams="item.params"></rich-text-diy>
			</block>
			<!-- 警告提示 -->
			<block v-if="item.type == 'warnDiy'">
				<warn-diy :showStyle="item.style" :showParams="item.params"></warn-diy>
			</block>
			<!-- 时间线 -->
			<block v-if="item.type == 'timelineDiy'">
				<timeline-diy :showStyle="item.style" :showData="item.data"></timeline-diy>
			</block>
			<!-- 悬浮按钮 -->
			<block v-if="item.type == 'floatDiy'">
				<float-diy :showStyle="item.style" :showParams="item.params" :domain="showData.domain" @onClick="onClick"></float-diy>
			</block>
		</block>
	</view>
</template>

<script>
	import carouselDiy from './carouselDiy.vue'
	import imagesDiy from './imagesDiy.vue'
	import navDiy from './navDiy.vue'
	import cubeDiy from './cubeDiy.vue'
	import infoCardDiy from './infoCardDiy.vue'
	import textButtonDiy from './textButtonDiy.vue'
	import titleDiy from './titleDiy.vue'
	import videoDiy from './videoDiy.vue'
	import mapDiy from './mapDiy.vue'
	import articleDiy from './articleDiy.vue'
	import introduceDiy from './introduceDiy.vue'
	import memberDiy from './memberDiy.vue'
	import activityDiy from './activityDiy.vue'
	import chainsDiy from './chainsDiy.vue'
	import albumDiy from './albumDiy.vue'
	import goodsDiy from './goodsDiy.vue'
	import demandDiy from './demandDiy.vue'
	import memberMapDiy from './memberMapDiy.vue'
	import searchDiy from './searchDiy.vue'
	import lineDiy from './lineDiy.vue'
	import blankDiy from './blankDiy.vue'
	import noticeDiy from './noticeDiy.vue'
	import textDiy from './textDiy.vue'
	import richTextDiy from './richTextDiy.vue'
	import warnDiy from './warnDiy.vue'
	import timelineDiy from './timelineDiy.vue'
	import floatDiy from './floatDiy.vue'

	export default {
		components: {
			carouselDiy,
			imagesDiy,
			navDiy,
			cubeDiy,
			infoCardDiy,
			textButtonDiy,
			titleDiy,
			videoDiy,
			mapDiy,
			articleDiy,
			introduceDiy,
			memberDiy,
			activityDiy,
			chainsDiy,
			albumDiy,
			goodsDiy,
			demandDiy,
			memberMapDiy,
			searchDiy,
			lineDiy,
			blankDiy,
			noticeDiy,
			textDiy,
			richTextDiy,
			warnDiy,
			timelineDiy,
			floatDiy,
		},
		props: ['showData', 'spaceHeight'],
		computed: {
			paddingTop() {
				return uni.upx2px(this.showData.page.style.paddingTop * 2) + 'px';
			},
			paddingLeft() {
				return uni.upx2px(this.showData.page.style.paddingLeft * 2) + 'px';
			},
		},
		methods: {
			// 更新数据
			updateData() {
				for (var key in this.$refs) {
					const type = key.split("_")[0]
					switch (type) {
						case "articleDiy":
							this.$refs[key][0].getArticleList()
							break;
						case "memberDiy":
							this.$refs[key][0].getMemberList()
							break;
						case "activityDiy":
							this.$refs[key][0].getActivityList()
							break;
						case "chainsDiy":
							this.$refs[key][0].getChainsList()
							break;
						case "albumDiy":
							this.$refs[key][0].getAlbumList()
							break;
						case "goodsDiy":
							this.$refs[key][0].getGoodsList()
							break;
						case "demandDiy":
							this.$refs[key][0].getDemandList()
							break;
						case "memberMapDiy":
							this.$refs[key][0].getMemberList()
							break;
						default:
							break;
					}
				}
			},
			// 按钮点击
			onClick(e) {
				if (!e) return;
				if (e.type == "Fixed" && (e.Fixed_type == "Fixed_type_7" || e.Fixed_type == "Fixed_type_8")) {
					this.$emit("toPage", e)
				} else {
					this.$util.openLink(e);
				}
			},
			// 设置分享数据
			setShareData(data) {
				this.$emit('setShareData', data)
			},
		}
	}
</script>