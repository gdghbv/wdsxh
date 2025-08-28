// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 商城接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------

export default {
	// 轮播图
	carousel: {
		url: '/api/wdsxh/goods/goods/banner_index',
		method: 'GET',
	},
	// 商城轮播图
	carouselDetails: {
		url: '/api/wdsxh/goods/goods/banner_details',
		method: 'GET',
	},
	// 商品分类
	categoay: {
		url: '/api/wdsxh/goods/goods/category_index',
		method: 'GET',
	},
	// 商品列表
	goodsList: {
		url: '/api/wdsxh/goods/goods/index',
		method: 'GET',
	},
	// 商品详情
	goodsDetails: {
		url: '/api/wdsxh/goods/goods/details',
		method: 'GET',
	},
	// 地址列表
	addressList: {
		url: '/api/wdsxh/goods/address/index',
		auth: true,
		method: 'GET',
	},
	// 添加地址
	addAddress: {
		url: '/api/wdsxh/goods/address/add',
		auth: true,
		method: 'POST',
	},
	// 修改地址
	editAddress: {
		url: '/api/wdsxh/goods/address/edit',
		auth: true,
		method: 'POST',
	},
	// 删除地址
	delAddress: {
		url: '/api/wdsxh/goods/address/del',
		auth: true,
		method: 'POST',
	},
	// 修改默认地址
	setDefault: {
		url: '/api/wdsxh/goods/address/set_default',
		auth: true,
		method: 'POST',
	},
	// 计算邮费
	getPostage: {
		url: '/api/wdsxh/goods/order/postage',
		auth: true,
		method: 'GET',
	},
	// 订单预支付
	preparePay: {
		url: '/api/wdsxh/goods/order/prepare_pay',
		auth: true,
		method: 'GET',
	},
	// 订单创建
	createOrder: {
		url: '/api/wdsxh/goods/order/create',
		auth: true,
		method: 'POST',
	},
	// 订单详情
	orderDetails: {
		url: '/api/wdsxh/goods/order/details',
		auth: true,
		method: 'GET',
	},
	// 订单列表
	orderList: {
		url: '/api/wdsxh/goods/order/index',
		auth: true,
		method: 'GET',
	},
	// 确认收货
	orderCollect: {
		url: '/api/wdsxh/goods/order/sing',
		auth: true,
		method: 'POST',
	},
	// 申请退款
	orderRefund: {
		url: '/api/wdsxh/goods/order/refund',
		auth: true,
		method: 'POST',
	},
	// 退款列表
	refundList: {
		url: '/api/wdsxh/goods/order/refund_index',
		auth: true,
		method: 'GET',
	},
	// 提交快递
	receipt: {
		url: '/api/wdsxh/goods/order/receipt',
		auth: true,
		method: 'POST',
	},
	// 取消退款
	cancelRefund: {
		url: '/api/wdsxh/goods/order/cancel_refund',
		auth: true,
		method: 'POST',
	},
	// 取消订单
	delOrder: {
		url: '/api/wdsxh/goods/order/del_order',
		auth: true,
		method: 'POST',
	},
	// 加入购物车
	addCart: {
		url: '/api/wdsxh/mall/cart/add',
		auth: true,
		method: 'POST',
	},
	// 购物车数量
	cartNumber: {
		url: '/api/wdsxh/mall/cart/cart_goods_number',
		auth: true,
		method: 'GET',
	},
	// 购物车列表
	cartList: {
		url: '/api/wdsxh/mall/cart/list',
		auth: true,
		method: 'GET',
	},
	// 更新购物车商品数量
	updateCartNumber: {
		url: '/api/wdsxh/mall/cart/update_goods_number',
		auth: true,
		method: 'POST',
	},
	// 删除购物车商品
	deleteCart: {
		url: '/api/wdsxh/mall/cart/del',
		auth: true,
		method: 'POST',
	},
	// 商城配置
	config: {
		url: '/api/wdsxh/mall/self_pickup/config',
		method: 'GET',
	},
};