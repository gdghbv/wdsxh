// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

import App from './App'

import Vue from 'vue'
import store from './store'
import './uni.promisify.adaptor'
import tools from './common/tools.js'
import titleBar from '@/pages/component/title-bar/title-bar.vue'
import tabBar from '@/pages/component/tab-bar/tab-bar.vue'
import empty from '@/pages/component/empty/empty.vue'
Vue.component("title-bar", titleBar)
Vue.component("tab-bar", tabBar)
Vue.component("empty", empty)
// #ifdef H5
Vue.config.ignoredElements.push('wx-open-launch-weapp')
// #endif
Vue.prototype.$store = store
Vue.prototype.$util = tools
Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve
})
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()