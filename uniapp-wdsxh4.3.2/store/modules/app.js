// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

const app = {
	namespaced: true,
	state: {
		// 主题色
		themeColor: "#325DFF",
		// 组织类型
		organize: "商协",
		// 订阅消息ids
		subscribeNotifyIds: {},
		// 备案号声明
		statement: "",
		// 技术支持
		support: {},
		// 登录背景图
		loginImg: "",
		// 接龙分享图
		jielongImg: "",
		// 问卷分享图
		questionnaireImg: "",
		// 小程序名称
		appletName: "",
		// 小程序log
		appletLogo: "",
		// 底部导航列表
		tabBarList: [],
		// 分享图片
		shareImage: "",
		// 分享标题
		shareTitle: "",
		// 微信公众号APPID
		WeChatAppid: "",
		// 是否启用微信收货
		deliveryManagement: "",
		// 版本号
		version: "",
		// 会员类型
		memberTypeConfig: {
			enterprise: "企业会员",
			group: "团体会员",
		},
		// 富文本内容
		editorContent: "",
		// 商城预订单数据
		mallOrder: [],
		// 活动申请字段
		activityField: "",
	},
	mutations: {
		// 设置小程序信息
		setAppletInfo(state, data) {
			state.appletName = data.name || ""
			state.appletLogo = data.logo || ""
		},
		// 设置基础配置
		setConfig(state, data) {
			state.themeColor = data.themeColor || "#325DFF"
			state.organize = data.organize || "商协"
			state.subscribeNotifyIds = data.subscribeNotifyIds
			state.statement = data.statement || ""
			state.support = data.support || {}
			state.loginImg = data.loginImg || ""
			state.jielongImg = data.jielongImg || ""
			state.questionnaireImg = data.questionnaireImg || ""
			state.shareImage = data.shareImage || ""
			state.shareTitle = data.shareTitle || ""
			state.WeChatAppid = data.WeChatAppid || ""
			state.deliveryManagement = data.deliveryManagement || ""
			state.version = data.version || "1.0.0"
			if (data.joinConfig?.length) {
				data.joinConfig.forEach((item) => {
					if (item.type == 2) {
						state.memberTypeConfig.enterprise = item.name
					} else if (item.type == 3) {
						state.memberTypeConfig.group = item.name
					}
				});
			} else {
				state.memberTypeConfig = {
					enterprise: "企业会员",
					group: "团体会员",
				}
			}
		},
		// 设置底部导航
		setTabBar(state, data) {
			state.tabBarList = data || []
		},
		// 设置富文本内容
		setEditorContent(state, data) {
			state.editorContent = data || ""
		},
		// 设置商城预订单数据
		setMallOrder(state, data) {
			state.mallOrder = data || ""
		},
		// 设置活动申请字段
		setActivityField(state, data) {
			state.activityField = data || ""
		},
	},
}

export default app