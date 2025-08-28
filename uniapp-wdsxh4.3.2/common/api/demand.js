// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 供需接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------

export default {
	// 商圈列表
	businessIndexList: {
		url: '/api/wdsxh/business/index',
		method: 'GET',
	},
	// 自定义装修商圈列表
	businessDiyList: {
		url: '/api/wdsxh/business/diy_list',
		method: 'GET',
	},
	// 商圈分类
	businessCat: {
		url: '/api/wdsxh/business/business_cat',
		method: 'GET',
	},
	// 商圈详情
	businessDetails: {
		url: '/api/wdsxh/business/details',
		auth: true,
		method: 'GET',
	},
	// 发布
	businessAdd: {
		url: '/api/wdsxh/business/add',
		auth: true,
		method: 'POST',
	},
	// 发布列表
	businessList: {
		url: '/api/wdsxh/business/user_index',
		auth: true,
		method: 'GET',
	},
	// 发布删除
	businessDel: {
		url: '/api/wdsxh/business/del',
		auth: true,
		method: 'GET',
	},
	// 发布详情
	businessUserDetails: {
		url: '/api/wdsxh/business/user_details',
		auth: true,
		method: 'GET',
	},
	// 修改
	businessEdit: {
		url: '/api/wdsxh/business/edit',
		auth: true,
		method: 'POST',
	},
	// 商圈限制
	businessLimit: {
		url: '/api/wdsxh/business/business_config',
		method: 'GET',
	},
};