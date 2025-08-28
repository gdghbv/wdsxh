// 接口地址
var adminPath = window.location.origin
// 手机号验证
var pattern = /^1[0-9]{10,10}$/;
// 获取地址栏参数
$.getUrlParam = function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search).substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}