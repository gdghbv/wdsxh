// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 活动接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

export default {
	// 活动列表
	list: {
		url: '/api/wdsxh/activity/activity/index',
		method: 'GET',
	},
	// 活动详情
	details: {
		url: '/api/wdsxh/activity/activity/details',
		method: 'GET',
	},
	// 活动报名字段
	field: {
		url: '/api/wdsxh/activity/activity_fieldset/field',
		auth: true,
		method: 'GET',
	},
	// 提交报名
	submit: {
		url: '/api/wdsxh/activity/activity_apply/submit',
		auth: true,
		method: 'POST',
	},
	// 订单列表
	orderList: {
		url: '/api/wdsxh/activity/activity/user_index',
		auth: true,
		method: 'GET',
	},
	// 订单详情
	orderDetails: {
		url: '/api/wdsxh/activity/activity_apply/details',
		auth: true,
		method: 'GET',
	},
	// 活动核销列表
	verifyList: {
		url: '/api/wdsxh/activity/verifying/activity_list',
		auth: true,
		method: 'GET',
	},
	// 核销会员列表
	verifyMemberList: {
		url: '/api/wdsxh/activity/verifying/verifying_member_list',
		auth: true,
		method: 'GET',
	},
	// 核销活动
	verifying: {
		url: '/api/wdsxh/activity/verifying/verifying',
		auth: true,
		method: 'POST',
	},
	// 申请退款
	applyRefund: {
		url: '/api/wdsxh/activity/activity/apply_refund',
		auth: true,
		method: 'POST',
	},
	// 取消参加
	applyCancel: {
		url: '/api/wdsxh/activity/activity_apply/cancel',
		auth: true,
		method: 'POST',
	},
	// 参会凭证
	attendance: {
		url: '/api/wdsxh/activity/activity/attendance_voucher',
		auth: true,
		method: 'GET',
	},
	// 扫码签到
	scanSign: {
		url: '/api/wdsxh/activity/verifying/self_service_check_in',
		auth: true,
		method: 'POST',
	},
	// 删除未支付订单
	applyDel: {
		url: '/api/wdsxh/activity/activity_apply/del',
		auth: true,
		method: 'POST',
	},
	// 签到码参数解析
	decryptData: {
		url: '/api/wdsxh/activity/verifying/get_decrypt_data',
		auth: true,
		method: 'GET',
	},
	// 参会证书
	certificate: {
		url: '/api/wdsxh/activity/activity_electronic_certificate/index',
		auth: true,
		method: 'GET',
	},
	// 活动权限
	limit: {
		url: '/api/wdsxh/activity/activity/activity_config',
		method: 'GET',
	},
};