(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
if (!target[key].canIUse('getAppBaseInfo')) {
  target[key].getAppBaseInfo = target[key].getSystemInfoSync;
}
if (!target[key].canIUse('getWindowInfo')) {
  target[key].getWindowInfo = target[key].getSystemInfoSync;
}
if (!target[key].canIUse('getDeviceInfo')) {
  target[key].getDeviceInfo = target[key].getSystemInfoSync;
}
var _default = target[key];
exports.default = _default;

/***/ }),

/***/ 10:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 11:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1174:
/*!*******************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-icons/components/uni-icons/uniicons_file_vue.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontData = void 0;
var fontData = [{
  "font_class": "arrow-down",
  "unicode": "\uE6BE"
}, {
  "font_class": "arrow-left",
  "unicode": "\uE6BC"
}, {
  "font_class": "arrow-right",
  "unicode": "\uE6BB"
}, {
  "font_class": "arrow-up",
  "unicode": "\uE6BD"
}, {
  "font_class": "auth",
  "unicode": "\uE6AB"
}, {
  "font_class": "auth-filled",
  "unicode": "\uE6CC"
}, {
  "font_class": "back",
  "unicode": "\uE6B9"
}, {
  "font_class": "bars",
  "unicode": "\uE627"
}, {
  "font_class": "calendar",
  "unicode": "\uE6A0"
}, {
  "font_class": "calendar-filled",
  "unicode": "\uE6C0"
}, {
  "font_class": "camera",
  "unicode": "\uE65A"
}, {
  "font_class": "camera-filled",
  "unicode": "\uE658"
}, {
  "font_class": "cart",
  "unicode": "\uE631"
}, {
  "font_class": "cart-filled",
  "unicode": "\uE6D0"
}, {
  "font_class": "chat",
  "unicode": "\uE65D"
}, {
  "font_class": "chat-filled",
  "unicode": "\uE659"
}, {
  "font_class": "chatboxes",
  "unicode": "\uE696"
}, {
  "font_class": "chatboxes-filled",
  "unicode": "\uE692"
}, {
  "font_class": "chatbubble",
  "unicode": "\uE697"
}, {
  "font_class": "chatbubble-filled",
  "unicode": "\uE694"
}, {
  "font_class": "checkbox",
  "unicode": "\uE62B"
}, {
  "font_class": "checkbox-filled",
  "unicode": "\uE62C"
}, {
  "font_class": "checkmarkempty",
  "unicode": "\uE65C"
}, {
  "font_class": "circle",
  "unicode": "\uE65B"
}, {
  "font_class": "circle-filled",
  "unicode": "\uE65E"
}, {
  "font_class": "clear",
  "unicode": "\uE66D"
}, {
  "font_class": "close",
  "unicode": "\uE673"
}, {
  "font_class": "closeempty",
  "unicode": "\uE66C"
}, {
  "font_class": "cloud-download",
  "unicode": "\uE647"
}, {
  "font_class": "cloud-download-filled",
  "unicode": "\uE646"
}, {
  "font_class": "cloud-upload",
  "unicode": "\uE645"
}, {
  "font_class": "cloud-upload-filled",
  "unicode": "\uE648"
}, {
  "font_class": "color",
  "unicode": "\uE6CF"
}, {
  "font_class": "color-filled",
  "unicode": "\uE6C9"
}, {
  "font_class": "compose",
  "unicode": "\uE67F"
}, {
  "font_class": "contact",
  "unicode": "\uE693"
}, {
  "font_class": "contact-filled",
  "unicode": "\uE695"
}, {
  "font_class": "down",
  "unicode": "\uE6B8"
}, {
  "font_class": "bottom",
  "unicode": "\uE6B8"
}, {
  "font_class": "download",
  "unicode": "\uE68D"
}, {
  "font_class": "download-filled",
  "unicode": "\uE681"
}, {
  "font_class": "email",
  "unicode": "\uE69E"
}, {
  "font_class": "email-filled",
  "unicode": "\uE69A"
}, {
  "font_class": "eye",
  "unicode": "\uE651"
}, {
  "font_class": "eye-filled",
  "unicode": "\uE66A"
}, {
  "font_class": "eye-slash",
  "unicode": "\uE6B3"
}, {
  "font_class": "eye-slash-filled",
  "unicode": "\uE6B4"
}, {
  "font_class": "fire",
  "unicode": "\uE6A1"
}, {
  "font_class": "fire-filled",
  "unicode": "\uE6C5"
}, {
  "font_class": "flag",
  "unicode": "\uE65F"
}, {
  "font_class": "flag-filled",
  "unicode": "\uE660"
}, {
  "font_class": "folder-add",
  "unicode": "\uE6A9"
}, {
  "font_class": "folder-add-filled",
  "unicode": "\uE6C8"
}, {
  "font_class": "font",
  "unicode": "\uE6A3"
}, {
  "font_class": "forward",
  "unicode": "\uE6BA"
}, {
  "font_class": "gear",
  "unicode": "\uE664"
}, {
  "font_class": "gear-filled",
  "unicode": "\uE661"
}, {
  "font_class": "gift",
  "unicode": "\uE6A4"
}, {
  "font_class": "gift-filled",
  "unicode": "\uE6C4"
}, {
  "font_class": "hand-down",
  "unicode": "\uE63D"
}, {
  "font_class": "hand-down-filled",
  "unicode": "\uE63C"
}, {
  "font_class": "hand-up",
  "unicode": "\uE63F"
}, {
  "font_class": "hand-up-filled",
  "unicode": "\uE63E"
}, {
  "font_class": "headphones",
  "unicode": "\uE630"
}, {
  "font_class": "heart",
  "unicode": "\uE639"
}, {
  "font_class": "heart-filled",
  "unicode": "\uE641"
}, {
  "font_class": "help",
  "unicode": "\uE679"
}, {
  "font_class": "help-filled",
  "unicode": "\uE674"
}, {
  "font_class": "home",
  "unicode": "\uE662"
}, {
  "font_class": "home-filled",
  "unicode": "\uE663"
}, {
  "font_class": "image",
  "unicode": "\uE670"
}, {
  "font_class": "image-filled",
  "unicode": "\uE678"
}, {
  "font_class": "images",
  "unicode": "\uE650"
}, {
  "font_class": "images-filled",
  "unicode": "\uE64B"
}, {
  "font_class": "info",
  "unicode": "\uE669"
}, {
  "font_class": "info-filled",
  "unicode": "\uE649"
}, {
  "font_class": "left",
  "unicode": "\uE6B7"
}, {
  "font_class": "link",
  "unicode": "\uE6A5"
}, {
  "font_class": "list",
  "unicode": "\uE644"
}, {
  "font_class": "location",
  "unicode": "\uE6AE"
}, {
  "font_class": "location-filled",
  "unicode": "\uE6AF"
}, {
  "font_class": "locked",
  "unicode": "\uE66B"
}, {
  "font_class": "locked-filled",
  "unicode": "\uE668"
}, {
  "font_class": "loop",
  "unicode": "\uE633"
}, {
  "font_class": "mail-open",
  "unicode": "\uE643"
}, {
  "font_class": "mail-open-filled",
  "unicode": "\uE63A"
}, {
  "font_class": "map",
  "unicode": "\uE667"
}, {
  "font_class": "map-filled",
  "unicode": "\uE666"
}, {
  "font_class": "map-pin",
  "unicode": "\uE6AD"
}, {
  "font_class": "map-pin-ellipse",
  "unicode": "\uE6AC"
}, {
  "font_class": "medal",
  "unicode": "\uE6A2"
}, {
  "font_class": "medal-filled",
  "unicode": "\uE6C3"
}, {
  "font_class": "mic",
  "unicode": "\uE671"
}, {
  "font_class": "mic-filled",
  "unicode": "\uE677"
}, {
  "font_class": "micoff",
  "unicode": "\uE67E"
}, {
  "font_class": "micoff-filled",
  "unicode": "\uE6B0"
}, {
  "font_class": "minus",
  "unicode": "\uE66F"
}, {
  "font_class": "minus-filled",
  "unicode": "\uE67D"
}, {
  "font_class": "more",
  "unicode": "\uE64D"
}, {
  "font_class": "more-filled",
  "unicode": "\uE64E"
}, {
  "font_class": "navigate",
  "unicode": "\uE66E"
}, {
  "font_class": "navigate-filled",
  "unicode": "\uE67A"
}, {
  "font_class": "notification",
  "unicode": "\uE6A6"
}, {
  "font_class": "notification-filled",
  "unicode": "\uE6C1"
}, {
  "font_class": "paperclip",
  "unicode": "\uE652"
}, {
  "font_class": "paperplane",
  "unicode": "\uE672"
}, {
  "font_class": "paperplane-filled",
  "unicode": "\uE675"
}, {
  "font_class": "person",
  "unicode": "\uE699"
}, {
  "font_class": "person-filled",
  "unicode": "\uE69D"
}, {
  "font_class": "personadd",
  "unicode": "\uE69F"
}, {
  "font_class": "personadd-filled",
  "unicode": "\uE698"
}, {
  "font_class": "personadd-filled-copy",
  "unicode": "\uE6D1"
}, {
  "font_class": "phone",
  "unicode": "\uE69C"
}, {
  "font_class": "phone-filled",
  "unicode": "\uE69B"
}, {
  "font_class": "plus",
  "unicode": "\uE676"
}, {
  "font_class": "plus-filled",
  "unicode": "\uE6C7"
}, {
  "font_class": "plusempty",
  "unicode": "\uE67B"
}, {
  "font_class": "pulldown",
  "unicode": "\uE632"
}, {
  "font_class": "pyq",
  "unicode": "\uE682"
}, {
  "font_class": "qq",
  "unicode": "\uE680"
}, {
  "font_class": "redo",
  "unicode": "\uE64A"
}, {
  "font_class": "redo-filled",
  "unicode": "\uE655"
}, {
  "font_class": "refresh",
  "unicode": "\uE657"
}, {
  "font_class": "refresh-filled",
  "unicode": "\uE656"
}, {
  "font_class": "refreshempty",
  "unicode": "\uE6BF"
}, {
  "font_class": "reload",
  "unicode": "\uE6B2"
}, {
  "font_class": "right",
  "unicode": "\uE6B5"
}, {
  "font_class": "scan",
  "unicode": "\uE62A"
}, {
  "font_class": "search",
  "unicode": "\uE654"
}, {
  "font_class": "settings",
  "unicode": "\uE653"
}, {
  "font_class": "settings-filled",
  "unicode": "\uE6CE"
}, {
  "font_class": "shop",
  "unicode": "\uE62F"
}, {
  "font_class": "shop-filled",
  "unicode": "\uE6CD"
}, {
  "font_class": "smallcircle",
  "unicode": "\uE67C"
}, {
  "font_class": "smallcircle-filled",
  "unicode": "\uE665"
}, {
  "font_class": "sound",
  "unicode": "\uE684"
}, {
  "font_class": "sound-filled",
  "unicode": "\uE686"
}, {
  "font_class": "spinner-cycle",
  "unicode": "\uE68A"
}, {
  "font_class": "staff",
  "unicode": "\uE6A7"
}, {
  "font_class": "staff-filled",
  "unicode": "\uE6CB"
}, {
  "font_class": "star",
  "unicode": "\uE688"
}, {
  "font_class": "star-filled",
  "unicode": "\uE68F"
}, {
  "font_class": "starhalf",
  "unicode": "\uE683"
}, {
  "font_class": "trash",
  "unicode": "\uE687"
}, {
  "font_class": "trash-filled",
  "unicode": "\uE685"
}, {
  "font_class": "tune",
  "unicode": "\uE6AA"
}, {
  "font_class": "tune-filled",
  "unicode": "\uE6CA"
}, {
  "font_class": "undo",
  "unicode": "\uE64F"
}, {
  "font_class": "undo-filled",
  "unicode": "\uE64C"
}, {
  "font_class": "up",
  "unicode": "\uE6B6"
}, {
  "font_class": "top",
  "unicode": "\uE6B6"
}, {
  "font_class": "upload",
  "unicode": "\uE690"
}, {
  "font_class": "upload-filled",
  "unicode": "\uE68E"
}, {
  "font_class": "videocam",
  "unicode": "\uE68C"
}, {
  "font_class": "videocam-filled",
  "unicode": "\uE689"
}, {
  "font_class": "vip",
  "unicode": "\uE6A8"
}, {
  "font_class": "vip-filled",
  "unicode": "\uE6C6"
}, {
  "font_class": "wallet",
  "unicode": "\uE6B1"
}, {
  "font_class": "wallet-filled",
  "unicode": "\uE6C2"
}, {
  "font_class": "weibo",
  "unicode": "\uE68B"
}, {
  "font_class": "weixin",
  "unicode": "\uE691"
}];

// export const fontData = JSON.parse<IconsDataItem>(fontDataJson)
exports.fontData = fontData;

/***/ }),

/***/ 12:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 13:
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 14:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1400:
/*!********************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/index.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 1401));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 1402));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 1403));
var _default = {
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default
};
exports.default = _default;

/***/ }),

/***/ 1401:
/*!*******************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/en.json ***!
  \*******************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-datetime-picker.year, uni-datetime-picker.month, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, uni-calender.SUN, uni-calender.confirm, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"select date\",\"uni-datetime-picker.selectTime\":\"select time\",\"uni-datetime-picker.selectDateTime\":\"select date and time\",\"uni-datetime-picker.startDate\":\"start date\",\"uni-datetime-picker.endDate\":\"end date\",\"uni-datetime-picker.startTime\":\"start time\",\"uni-datetime-picker.endTime\":\"end time\",\"uni-datetime-picker.ok\":\"ok\",\"uni-datetime-picker.clear\":\"clear\",\"uni-datetime-picker.cancel\":\"cancel\",\"uni-datetime-picker.year\":\"-\",\"uni-datetime-picker.month\":\"\",\"uni-calender.MON\":\"MON\",\"uni-calender.TUE\":\"TUE\",\"uni-calender.WED\":\"WED\",\"uni-calender.THU\":\"THU\",\"uni-calender.FRI\":\"FRI\",\"uni-calender.SAT\":\"SAT\",\"uni-calender.SUN\":\"SUN\",\"uni-calender.confirm\":\"confirm\"}");

/***/ }),

/***/ 1402:
/*!************************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/zh-Hans.json ***!
  \************************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-datetime-picker.year, uni-datetime-picker.month, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, uni-calender.confirm, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"选择日期\",\"uni-datetime-picker.selectTime\":\"选择时间\",\"uni-datetime-picker.selectDateTime\":\"选择日期时间\",\"uni-datetime-picker.startDate\":\"开始日期\",\"uni-datetime-picker.endDate\":\"结束日期\",\"uni-datetime-picker.startTime\":\"开始时间\",\"uni-datetime-picker.endTime\":\"结束时间\",\"uni-datetime-picker.ok\":\"确定\",\"uni-datetime-picker.clear\":\"清除\",\"uni-datetime-picker.cancel\":\"取消\",\"uni-datetime-picker.year\":\"年\",\"uni-datetime-picker.month\":\"月\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\",\"uni-calender.confirm\":\"确认\"}");

/***/ }),

/***/ 1403:
/*!************************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/i18n/zh-Hant.json ***!
  \************************************************************************************************************************************/
/*! exports provided: uni-datetime-picker.selectDate, uni-datetime-picker.selectTime, uni-datetime-picker.selectDateTime, uni-datetime-picker.startDate, uni-datetime-picker.endDate, uni-datetime-picker.startTime, uni-datetime-picker.endTime, uni-datetime-picker.ok, uni-datetime-picker.clear, uni-datetime-picker.cancel, uni-datetime-picker.year, uni-datetime-picker.month, uni-calender.SUN, uni-calender.MON, uni-calender.TUE, uni-calender.WED, uni-calender.THU, uni-calender.FRI, uni-calender.SAT, uni-calender.confirm, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-datetime-picker.selectDate\":\"選擇日期\",\"uni-datetime-picker.selectTime\":\"選擇時間\",\"uni-datetime-picker.selectDateTime\":\"選擇日期時間\",\"uni-datetime-picker.startDate\":\"開始日期\",\"uni-datetime-picker.endDate\":\"結束日期\",\"uni-datetime-picker.startTime\":\"開始时间\",\"uni-datetime-picker.endTime\":\"結束时间\",\"uni-datetime-picker.ok\":\"確定\",\"uni-datetime-picker.clear\":\"清除\",\"uni-datetime-picker.cancel\":\"取消\",\"uni-datetime-picker.year\":\"年\",\"uni-datetime-picker.month\":\"月\",\"uni-calender.SUN\":\"日\",\"uni-calender.MON\":\"一\",\"uni-calender.TUE\":\"二\",\"uni-calender.WED\":\"三\",\"uni-calender.THU\":\"四\",\"uni-calender.FRI\":\"五\",\"uni-calender.SAT\":\"六\",\"uni-calender.confirm\":\"確認\"}");

/***/ }),

/***/ 1404:
/*!**************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-datetime-picker/components/uni-datetime-picker/util.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;
exports.addZero = addZero;
exports.checkDate = checkDate;
exports.dateCompare = dateCompare;
exports.fixIosDateFormat = fixIosDateFormat;
exports.getDate = getDate;
exports.getDateTime = getDateTime;
exports.getDefaultSecond = getDefaultSecond;
exports.getTime = getTime;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var Calendar = /*#__PURE__*/function () {
  function Calendar() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      selected = _ref.selected,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      range = _ref.range;
    (0, _classCallCheck2.default)(this, Calendar);
    // 当前日期
    this.date = this.getDateObj(new Date()); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 起始时间
    this.startDate = startDate;
    // 终止时间
    this.endDate = endDate;
    // 是否范围选择
    this.range = range;
    // 多选状态
    this.cleanMultipleStatus();
    // 每周日期
    this.weeks = {};
    this.lastHover = false;
  }
  /**
   * 设置日期
   * @param {Object} date
   */
  (0, _createClass2.default)(Calendar, [{
    key: "setDate",
    value: function setDate(date) {
      var selectDate = this.getDateObj(date);
      this.getWeeks(selectDate.fullDate);
    }

    /**
     * 清理多选状态
     */
  }, {
    key: "cleanMultipleStatus",
    value: function cleanMultipleStatus() {
      this.multipleStatus = {
        before: '',
        after: '',
        data: []
      };
    }
  }, {
    key: "setStartDate",
    value: function setStartDate(startDate) {
      this.startDate = startDate;
    }
  }, {
    key: "setEndDate",
    value: function setEndDate(endDate) {
      this.endDate = endDate;
    }
  }, {
    key: "getPreMonthObj",
    value: function getPreMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      var oldMonth = date.getMonth();
      date.setMonth(oldMonth - 1);
      var newMonth = date.getMonth();
      if (oldMonth !== 0 && newMonth - oldMonth === 0) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
  }, {
    key: "getNextMonthObj",
    value: function getNextMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      var oldMonth = date.getMonth();
      date.setMonth(oldMonth + 1);
      var newMonth = date.getMonth();
      if (newMonth - oldMonth > 1) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }

    /**
     * 获取指定格式Date对象
     */
  }, {
    key: "getDateObj",
    value: function getDateObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      return {
        fullDate: getDate(date),
        year: date.getFullYear(),
        month: addZero(date.getMonth() + 1),
        date: addZero(date.getDate()),
        day: date.getDay()
      };
    }

    /**
     * 获取上一个月日期集合
     */
  }, {
    key: "getPreMonthDays",
    value: function getPreMonthDays(amount, dateObj) {
      var result = [];
      for (var i = amount - 1; i >= 0; i--) {
        var month = dateObj.month - 1;
        result.push({
          date: new Date(dateObj.year, month, -i).getDate(),
          month: month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取本月日期集合
     */
  }, {
    key: "getCurrentMonthDays",
    value: function getCurrentMonthDays(amount, dateObj) {
      var _this = this;
      var result = [];
      var fullDate = this.date.fullDate;
      var _loop = function _loop(i) {
        var currentDate = "".concat(dateObj.year, "-").concat(dateObj.month, "-").concat(addZero(i));
        var isToday = fullDate === currentDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(currentDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          disableBefore = dateCompare(_this.startDate, currentDate);
        }
        if (_this.endDate) {
          disableAfter = dateCompare(currentDate, _this.endDate);
        }
        var multiples = _this.multipleStatus.data;
        var multiplesStatus = -1;
        if (_this.range && multiples) {
          multiplesStatus = multiples.findIndex(function (item) {
            return _this.dateEqual(item, currentDate);
          });
        }
        var checked = multiplesStatus !== -1;
        result.push({
          fullDate: currentDate,
          year: dateObj.year,
          date: i,
          multiple: _this.range ? checked : false,
          beforeMultiple: _this.isLogicBefore(currentDate, _this.multipleStatus.before, _this.multipleStatus.after),
          afterMultiple: _this.isLogicAfter(currentDate, _this.multipleStatus.before, _this.multipleStatus.after),
          month: dateObj.month,
          disable: _this.startDate && !dateCompare(_this.startDate, currentDate) || _this.endDate && !dateCompare(currentDate, _this.endDate),
          isToday: isToday,
          userChecked: false,
          extraInfo: info
        });
      };
      for (var i = 1; i <= amount; i++) {
        _loop(i);
      }
      return result;
    }
    /**
     * 获取下一个月日期集合
     */
  }, {
    key: "_getNextMonthDays",
    value: function _getNextMonthDays(amount, dateObj) {
      var result = [];
      var month = dateObj.month + 1;
      for (var i = 1; i <= amount; i++) {
        result.push({
          date: i,
          month: month,
          disable: true
        });
      }
      return result;
    }

    /**
     * 获取当前日期详情
     * @param {Object} date
     */
  }, {
    key: "getInfo",
    value: function getInfo(date) {
      var _this2 = this;
      if (!date) {
        date = new Date();
      }
      return this.calendar.find(function (item) {
        return item.fullDate === _this2.getDateObj(date).fullDate;
      });
    }

    /**
     * 比较时间是否相等
     */
  }, {
    key: "dateEqual",
    value: function dateEqual(before, after) {
      before = new Date(fixIosDateFormat(before));
      after = new Date(fixIosDateFormat(after));
      return before.valueOf() === after.valueOf();
    }

    /**
     *  比较真实起始日期
     */
  }, {
    key: "isLogicBefore",
    value: function isLogicBefore(currentDate, before, after) {
      var logicBefore = before;
      if (before && after) {
        logicBefore = dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDate);
    }
  }, {
    key: "isLogicAfter",
    value: function isLogicAfter(currentDate, before, after) {
      var logicAfter = after;
      if (before && after) {
        logicAfter = dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDate);
    }

    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
  }, {
    key: "geDateAll",
    value: function geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDateObj(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }

    /**
     *  获取多选状态
     */
  }, {
    key: "setMultiple",
    value: function setMultiple(fullDate) {
      if (!this.range) return;
      var _this$multipleStatus = this.multipleStatus,
        before = _this$multipleStatus.before,
        after = _this$multipleStatus.after;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = '';
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.multipleStatus.after = undefined;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this.lastHover = true;
        }
      }
      this.getWeeks(fullDate);
    }

    /**
     *  鼠标 hover 更新多选状态
     */
  }, {
    key: "setHoverMultiple",
    value: function setHoverMultiple(fullDate) {
      //抖音小程序点击会触发hover事件，需要避免一下

      if (!this.range || this.lastHover) return;
      var before = this.multipleStatus.before;
      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this.getWeeks(fullDate);
    }

    /**
     * 更新默认值多选状态
     */
  }, {
    key: "setDefaultMultiple",
    value: function setDefaultMultiple(before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this.getWeeks(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this.getWeeks(before);
        }
      }
    }

    /**
     * 获取每周数据
     * @param {Object} dateData
     */
  }, {
    key: "getWeeks",
    value: function getWeeks(dateData) {
      var _this$getDateObj = this.getDateObj(dateData),
        year = _this$getDateObj.year,
        month = _this$getDateObj.month;
      var preMonthDayAmount = new Date(year, month - 1, 1).getDay();
      var preMonthDays = this.getPreMonthDays(preMonthDayAmount, this.getDateObj(dateData));
      var currentMonthDayAmount = new Date(year, month, 0).getDate();
      var currentMonthDays = this.getCurrentMonthDays(currentMonthDayAmount, this.getDateObj(dateData));
      var nextMonthDayAmount = 42 - preMonthDayAmount - currentMonthDayAmount;
      var nextMonthDays = this._getNextMonthDays(nextMonthDayAmount, this.getDateObj(dateData));
      var calendarDays = [].concat((0, _toConsumableArray2.default)(preMonthDays), (0, _toConsumableArray2.default)(currentMonthDays), (0, _toConsumableArray2.default)(nextMonthDays));
      var weeks = new Array(6);
      for (var i = 0; i < calendarDays.length; i++) {
        var index = Math.floor(i / 7);
        if (!weeks[index]) {
          weeks[index] = new Array(7);
        }
        weeks[index][i % 7] = calendarDays[i];
      }
      this.calendar = calendarDays;
      this.weeks = weeks;
    }
  }]);
  return Calendar;
}();
exports.Calendar = Calendar;
function getDateTime(date, hideSecond) {
  return "".concat(getDate(date), " ").concat(getTime(date, hideSecond));
}
function getDate(date) {
  date = fixIosDateFormat(date);
  date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return "".concat(year, "-").concat(addZero(month), "-").concat(addZero(day));
}
function getTime(date, hideSecond) {
  date = fixIosDateFormat(date);
  date = new Date(date);
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return hideSecond ? "".concat(addZero(hour), ":").concat(addZero(minute)) : "".concat(addZero(hour), ":").concat(addZero(minute), ":").concat(addZero(second));
}
function addZero(num) {
  if (num < 10) {
    num = "0".concat(num);
  }
  return num;
}
function getDefaultSecond(hideSecond) {
  return hideSecond ? '00:00' : '00:00:00';
}
function dateCompare(startDate, endDate) {
  startDate = new Date(fixIosDateFormat(startDate));
  endDate = new Date(fixIosDateFormat(endDate));
  return startDate <= endDate;
}
function checkDate(date) {
  var dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
  return date.match(dateReg);
}
//ios低版本15及以下，无法匹配 没有 ’秒‘ 时的情况，所以需要在末尾 秒 加上 问号
var dateTimeReg = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])( [0-5]?[0-9]:[0-5]?[0-9](:[0-5]?[0-9])?)?$/;
function fixIosDateFormat(value) {
  if (typeof value === 'string' && dateTimeReg.test(value)) {
    value = value.replace(/-/g, '/');
  }
  return value;
}

/***/ }),

/***/ 1454:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/mixin/mpMixin.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
};
exports.default = _default;

/***/ }),

/***/ 1455:
/*!***********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/mixin/mixin.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var index = _interopRequireWildcard(__webpack_require__(/*! ../function/index.js */ 1456));
var test = _interopRequireWildcard(__webpack_require__(/*! ../function/test.js */ 1457));
var _route = _interopRequireDefault(__webpack_require__(/*! ../util/route.js */ 1460));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ../function/debounce.js */ 1461));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ../function/throttle.js */ 1462));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default2 = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: function _default() {
        return {};
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ''
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: 'navigateTo'
    }
  },
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$uv上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$uv.getRect = this.$uvGetRect;
  },
  created: function created() {
    // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$uv
    this.$uv.getRect = this.$uvGetRect;
  },
  computed: {
    $uv: function $uv() {
      var _uni, _uni$$uv, _uni$$uv$config;
      return _objectSpread(_objectSpread({}, index), {}, {
        test: test,
        route: _route.default,
        debounce: _debounce.default,
        throttle: _throttle.default,
        unit: (_uni = uni) === null || _uni === void 0 ? void 0 : (_uni$$uv = _uni.$uv) === null || _uni$$uv === void 0 ? void 0 : (_uni$$uv$config = _uni$$uv.config) === null || _uni$$uv$config === void 0 ? void 0 : _uni$$uv$config.unit
      });
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem: function bem() {
      return function (name, fixed, change) {
        var _this = this;
        // 类名前缀
        var prefix = "uv-".concat(name, "--");
        var classes = {};
        if (fixed) {
          fixed.map(function (item) {
            // 这里的类名，会一直存在
            classes[prefix + _this[item]] = true;
          });
        }
        if (change) {
          change.map(function (item) {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            _this[item] ? classes[prefix + item] = _this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
        // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      };
    }
  },

  methods: {
    // 跳转某一个页面
    openPage: function openPage() {
      var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
      var url = this[urlKey];
      if (url) {
        // 执行类似uni.navigateTo的方法
        uni[this.linkType]({
          url: url
        });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uvGetRect: function $uvGetRect(selector, all) {
      var _this2 = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this2)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData: function getParentData() {
      var _this3 = this;
      var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = {};
      // 这里的本质原理是，通过获取父组件实例(也即类似uv-radio的父组件uv-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(uv-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      // 此处并不会自动更新子组件的数据，而是依赖父组件uv-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
      this.parent = this.$uv.$parent.call(this, parentName);
      if (this.parent.children) {
        // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this3.parentData[key] = _this3.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation();
    },
    // 空操作
    noop: function noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uvOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this4) {
          childrenList.splice(index, 1);
        }
      });
    }
  },
  // 兼容vue3
  unmounted: function unmounted() {
    var _this5 = this;
    if (this.parent && test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this5) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1456:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/function/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$parent = $parent;
exports.addStyle = addStyle;
exports.addUnit = addUnit;
exports.deepClone = deepClone;
exports.deepMerge = deepMerge;
exports.error = error;
exports.formValidate = formValidate;
exports.getDuration = getDuration;
exports.getHistoryPage = getHistoryPage;
exports.getProperty = getProperty;
exports.getPx = getPx;
exports.guid = guid;
exports.os = os;
exports.padZero = padZero;
exports.page = page;
exports.pages = pages;
exports.priceFormat = priceFormat;
exports.queryParams = queryParams;
exports.random = random;
exports.randomArray = randomArray;
exports.range = range;
exports.setConfig = setConfig;
exports.setProperty = setProperty;
exports.sleep = sleep;
exports.sys = sys;
exports.timeFormat = timeFormat;
exports.timeFrom = timeFrom;
exports.toast = toast;
exports.trim = trim;
exports.type2icon = type2icon;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _test = __webpack_require__(/*! ./test.js */ 1457);
var _digit = __webpack_require__(/*! ./digit.js */ 1458);
/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
function range() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.max(min, Math.min(max, Number(value)));
}

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
function getPx(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if ((0, _test.number)(value)) {
    return unit ? "".concat(value, "px") : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? "".concat(uni.upx2px(parseInt(value)), "px") : Number(uni.upx2px(parseInt(value)));
  }
  return unit ? "".concat(parseInt(value), "px") : parseInt(value);
}

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$uv.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
function sleep() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, value);
  });
}
/**
 * @description 运行期判断平台
 * @returns {string} 返回所在平台(小写)
 * @link 运行期判断平台 https://uniapp.dcloud.io/frame?id=判断平台
 */
function os() {
  return uni.getSystemInfoSync().platform.toLowerCase();
}
/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
function sys() {
  return uni.getSystemInfoSync();
}

/**
 * @description 取一个区间数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return "u".concat(uuid.join(''));
  }
  return uuid.join('');
}

/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
function addStyle(customStyle) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  // 字符串转字符串，对象转对象情形，直接返回
  if ((0, _test.empty)(customStyle) || (0, _typeof2.default)(customStyle) === 'object' && target === 'object' || target === 'string' && typeof customStyle === 'string') {
    return customStyle;
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    var styleArray = customStyle.split(';');
    var style = {};
    // 历遍数组，拼接成对象
    for (var i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        var item = styleArray[i].split(':');
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  var string = '';
  for (var _i2 in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    var key = _i2.replace(/([A-Z])/g, '-$1').toLowerCase();
    string += "".concat(key, ":").concat(customStyle[_i2], ";");
  }
  // 去除两端空格
  return trim(string);
}

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {string|number} value 需要添加单位的值
 * @param {string} unit 添加的单位名 比如px
 */
function addUnit() {
  var _uni, _uni$$uv, _uni$$uv$config, _uni2, _uni2$$uv, _uni2$$uv$config;
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_uni = uni) !== null && _uni !== void 0 && (_uni$$uv = _uni.$uv) !== null && _uni$$uv !== void 0 && (_uni$$uv$config = _uni$$uv.config) !== null && _uni$$uv$config !== void 0 && _uni$$uv$config.unit ? (_uni2 = uni) === null || _uni2 === void 0 ? void 0 : (_uni2$$uv = _uni2.$uv) === null || _uni2$$uv === void 0 ? void 0 : (_uni2$$uv$config = _uni2$$uv.config) === null || _uni2$$uv$config === void 0 ? void 0 : _uni2$$uv$config.unit : 'px';
  value = String(value);
  // 用uvui内置验证规则中的number判断是否为数值
  return (0, _test.number)(value) ? "".concat(value).concat(unit) : value;
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (obj === null || (0, _typeof2.default)(obj) !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj);
  var clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return [key, deepClone(value, cache)];
    }));
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, function (value) {
      return deepClone(value, cache);
    }));
  } else if (Array.isArray(obj)) {
    clone = obj.map(function (value) {
      return deepClone(value, cache);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (var _i3 = 0, _Object$entries = Object.entries(obj); _i3 < _Object$entries.length; _i3++) {
      var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i3], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = deepClone(target);
  if ((0, _typeof2.default)(target) !== 'object' || target === null || (0, _typeof2.default)(source) !== 'object' || source === null) return target;
  var merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    var sourceValue = source[prop];
    var targetValue = merged[prop];
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue);
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue);
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue);
    } else if ((0, _typeof2.default)(sourceValue) === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }
  return merged;
}

/**
 * @description error提示
 * @param {*} err 错误内容
 */
function error(err) {
  // 开发环境才提示，生产环境不会提示
  if (true) {
    console.error("uvui\u63D0\u793A\uFF1A".concat(err));
  }
}

/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError('fillString must be String');
    }
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length;
    var times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
function timeFormat() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  var date;
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date();
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime === null || dateTime === void 0 ? void 0 : dateTime.toString().trim())) {
    date = new Date(dateTime * 1000);
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime));
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
    date = new Date(dateTime.replace(/-/g, '/'));
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime);
  }
  var timeSource = {
    'y': date.getFullYear().toString(),
    // 年
    'm': (date.getMonth() + 1).toString().padStart(2, '0'),
    // 月
    'd': date.getDate().toString().padStart(2, '0'),
    // 日
    'h': date.getHours().toString().padStart(2, '0'),
    // 时
    'M': date.getMinutes().toString().padStart(2, '0'),
    // 分
    's': date.getSeconds().toString().padStart(2, '0') // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (var key in timeSource) {
    var _ref3 = new RegExp("".concat(key, "+")).exec(formatStr) || [],
      _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
      ret = _ref4[0];
    if (ret) {
      // 年可能只需展示两位
      var beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
    }
  }
  return formatStr;
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
function timeFrom() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = "".concat(parseInt(timer / 60), "\u5206\u949F\u524D");
      break;
    case timer >= 3600 && timer < 86400:
      tips = "".concat(parseInt(timer / 3600), "\u5C0F\u65F6\u524D");
      break;
    case timer >= 86400 && timer < 2592000:
      tips = "".concat(parseInt(timer / 86400), "\u5929\u524D");
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = "".concat(parseInt(timer / (86400 * 30)), "\u4E2A\u6708\u524D");
        } else {
          tips = "".concat(parseInt(timer / (86400 * 365)), "\u5E74\u524D");
        }
      } else {
        tips = timeFormat(timestamp, format);
      }
  }
  return tips;
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  str = String(str);
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '');
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {Boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "=").concat(_value));
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = '';
          value.forEach(function (_value) {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push("".concat(key, "=").concat(commaStr));
          break;
        default:
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
      }
    } else {
      _result.push("".concat(key, "=").concat(value));
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}

/**
 * 显示消息提示框
 * @param {String} title 提示的内容，长度与 icon 取值有关。
 * @param {Number} duration 提示的延迟时间，单位毫秒，默认：2000
 */
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  uni.showToast({
    title: String(title),
    icon: 'none',
    duration: duration
  });
}

/**
 * @description 根据主题type值,获取对应的图标
 * @param {String} type 主题名称,primary|info|error|warning|success
 * @param {boolean} fill 是否使用fill填充实体的图标
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}

/**
 * @description 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
function priceFormat(number) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimalPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousandsSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  number = "".concat(number).replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
  var dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
  var s = '';
  s = (prec ? (0, _digit.round)(n, prec) + '' : "".concat(Math.round(n))).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @description 获取duration值
 * 如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
 * 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
 * @param {String|number} value 比如: "1s"|"100ms"|1|100
 * @param {boolean} unit  提示: 如果是false 默认返回number
 * @return {string|number}
 */
function getDuration(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value)) return value;
    return value > 30 ? "".concat(value, "ms") : "".concat(value, "s");
  }
  if (/ms$/.test(value)) return valueNum;
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
  return valueNum;
}

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
function padZero(value) {
  return "00".concat(value).slice(-2);
}

/**
 * @description 在uv-form的子组件内容发生变化，或者失去焦点时，尝试通知uv-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
function formValidate(instance, event) {
  var formItem = $parent.call(instance, 'uv-form-item');
  var form = $parent.call(instance, 'uv-form');
  // 如果发生变化的input或者textarea等，其父组件中有uv-form-item或者uv-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, function () {}, event);
  }
}

/**
 * @description 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
 * @param {object} obj 对象
 * @param {string} key 需要获取的属性字段
 * @returns {*}
 */
function getProperty(obj, key) {
  if (!obj) {
    return;
  }
  if (typeof key !== 'string' || key === '') {
    return '';
  }
  if (key.indexOf('.') !== -1) {
    var keys = key.split('.');
    var firstObj = obj[keys[0]] || {};
    for (var i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}

/**
 * @description 设置对象的属性值，如果'a.b.c'的形式进行设置
 * @param {object} obj 对象
 * @param {string} key 需要设置的属性
 * @param {string} value 设置的值
 */
function setProperty(obj, key, value) {
  if (!obj) {
    return;
  }
  // 递归赋值
  var inFn = function inFn(_obj, keys, v) {
    // 最后一个属性key
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    // 0~length-1个key
    while (keys.length > 1) {
      var k = keys[0];
      if (!_obj[k] || (0, _typeof2.default)(_obj[k]) !== 'object') {
        _obj[k] = {};
      }
      var _key = keys.shift();
      // 自调用判断是否存在属性，不存在则自动创建对象
      inFn(_obj[k], keys, v);
    }
  };
  if (typeof key !== 'string' || key === '') {} else if (key.indexOf('.') !== -1) {
    // 支持多层级赋值操作
    var keys = key.split('.');
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}

/**
 * @description 获取当前页面路径
 */
function page() {
  var _pages;
  var pages = getCurrentPages();
  var route = (_pages = pages[pages.length - 1]) === null || _pages === void 0 ? void 0 : _pages.route;
  // 某些特殊情况下(比如页面进行redirectTo时的一些时机)，pages可能为空数组
  return "/".concat(route ? route : '');
}

/**
 * @description 获取当前路由栈实例数组
 */
function pages() {
  var pages = getCurrentPages();
  return pages;
}

/**
 * 获取页面历史栈指定层实例
 * @param back {number} [0] - 0或者负数，表示获取历史栈的哪一层，0表示获取当前页面实例，-1 表示获取上一个页面实例。默认0。
 */
function getHistoryPage() {
  var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var pages = getCurrentPages();
  var len = pages.length;
  return pages[len - 1 + back];
}

/**
 * @description 修改uvui内置属性值
 * @param {object} props 修改内置props属性
 * @param {object} config 修改内置config属性
 * @param {object} color 修改内置color属性
 * @param {object} zIndex 修改内置zIndex属性
 */
function setConfig(_ref5) {
  var _ref5$props = _ref5.props,
    props = _ref5$props === void 0 ? {} : _ref5$props,
    _ref5$config = _ref5.config,
    config = _ref5$config === void 0 ? {} : _ref5$config,
    _ref5$color = _ref5.color,
    color = _ref5$color === void 0 ? {} : _ref5$color,
    _ref5$zIndex = _ref5.zIndex,
    zIndex = _ref5$zIndex === void 0 ? {} : _ref5$zIndex;
  var deepMerge = uni.$uv.deepMerge;
  uni.$uv.config = deepMerge(uni.$uv.config, config);
  uni.$uv.props = deepMerge(uni.$uv.props, props);
  uni.$uv.color = deepMerge(uni.$uv.color, color);
  uni.$uv.zIndex = deepMerge(uni.$uv.zIndex, zIndex);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1457:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/function/test.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.amount = amount;
exports.array = array;
exports.carNo = carNo;
exports.chinese = chinese;
exports.code = code;
exports.contains = contains;
exports.date = date;
exports.dateISO = dateISO;
exports.digits = digits;
exports.email = email;
exports.empty = empty;
exports.enOrNum = enOrNum;
exports.func = func;
exports.idCard = idCard;
exports.image = image;
exports.jsonString = jsonString;
exports.landline = landline;
exports.letter = letter;
exports.mobile = mobile;
exports.number = number;
exports.object = object;
exports.promise = promise;
exports.range = range;
exports.rangeLength = rangeLength;
exports.regExp = regExp;
exports.string = string;
exports.url = url;
exports.video = video;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * 验证字符串
 */
function string(value) {
  return typeof value === 'string';
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  // 英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (value === 0 || isNaN(value)) return true;
      break;
    case 'object':
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信验证码
 */
function code(value) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}

/**
 * 是否函数方法
 * @param {Object} value
 */
function func(value) {
  return typeof value === 'function';
}

/**
 * 是否promise对象
 * @param {Object} value
 */
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}

/** 是否图片格式
 * @param {Object} value
 */
function image(value) {
  var newValue = value.split('?')[0];
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}

/**
 * 是否视频格式
 * @param {Object} value
 */
function video(value) {
  var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}

/**
 * 是否为正则对象
 * @param {Object}
 * @return {Boolean}
 */
function regExp(o) {
  return o && Object.prototype.toString.call(o) === '[object RegExp]';
}

/***/ }),

/***/ 1458:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/function/digit.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.divide = divide;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports.minus = minus;
exports.plus = plus;
exports.round = round;
exports.times = times;
var _toArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toArray */ 1459));
var _boundaryCheckingState = true; // 是否进行越界检查的全局开关

/**
 * 把错误的数据转正
 * @private
 * @example strip(0.09999999999999998)=0.1
 */
function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @private
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数,如果是小数则放大成整数
 * @private
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @private
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn("".concat(num, " \u8D85\u51FA\u4E86\u7CBE\u5EA6\u9650\u5236\uFF0C\u7ED3\u679C\u53EF\u80FD\u4E0D\u6B63\u786E"));
    }
  }
}

/**
 * 把递归操作扁平迭代化
 * @param {number[]} arr 要操作的数字数组
 * @param {function} operation 迭代操作
 * @private
 */
function iteratorOperation(arr, operation) {
  var _arr = (0, _toArray2.default)(arr),
    num1 = _arr[0],
    num2 = _arr[1],
    others = _arr.slice(2);
  var res = operation(num1, num2);
  others.forEach(function (num) {
    res = operation(res, num);
  });
  return res;
}

/**
 * 高精度乘法
 * @export
 */
function times() {
  for (var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}

/**
 * 高精度加法
 * @export
 */
function plus() {
  for (var _len2 = arguments.length, nums = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    nums[_key2] = arguments[_key2];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  // 取最大的小数位
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 高精度减法
 * @export
 */
function minus() {
  for (var _len3 = arguments.length, nums = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    nums[_key3] = arguments[_key3];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 高精度除法
 * @export
 */
function divide() {
  for (var _len4 = arguments.length, nums = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    nums[_key4] = arguments[_key4];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // 重要，这里必须用strip进行修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

/**
 * 四舍五入
 * @export
 */
function round(num, ratio) {
  var base = Math.pow(10, ratio);
  var result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  // 位数不足则补0
  return result;
}

/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 * @export
 */
function enableBoundaryChecking() {
  var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  _boundaryCheckingState = flag;
}
var _default = {
  times: times,
  plus: plus,
  minus: minus,
  divide: divide,
  round: round,
  enableBoundaryChecking: enableBoundaryChecking
};
exports.default = _default;

/***/ }),

/***/ 1459:
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toArray.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}
module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1460:
/*!**********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/util/route.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _index = __webpack_require__(/*! @/uni_modules/uv-ui-tools/libs/function/index.js */ 1456);
/**
 * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
 * 并且带有路由拦截功能
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2.default)(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: 'pop-in',
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false,
      // 是否需要拦截
      events: {} // 页面间通信接口，用于监听被打开页面发送到当前页面的数据。hbuilderx 2.8.9+ 开始支持。
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  (0, _createClass2.default)(Router, [{
    key: "addRootPath",
    value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, {
    key: "mixinParam",
    value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = (0, _index.queryParams)(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&".concat(query);
      }
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = (0, _index.queryParams)(params);
      return url += query;
    }

    // 对外的方法名称
  }, {
    key: "route",
    value: function () {
      var _route = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
          params,
          mergeConfig,
          isNext,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};
                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = (0, _index.deepMerge)(this.config, options);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }
                // 如果本次跳转的路径和本页面路径一致，不执行跳转，防止用户快速点击跳转按钮，造成多次跳转同一个页面的问题
                if (!(mergeConfig.url === (0, _index.page)())) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                if (params.intercept) {
                  mergeConfig.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = (0, _index.deepMerge)(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof mergeConfig.intercept === 'function')) {
                  _context.next = 16;
                  break;
                }
                _context.next = 12;
                return new Promise(function (resolve, reject) {
                  mergeConfig.intercept(mergeConfig, resolve);
                });
              case 12:
                isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);
                _context.next = 17;
                break;
              case 16:
                this.openPage(mergeConfig);
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function route() {
        return _route.apply(this, arguments);
      }
      return route;
    }() // 执行路由跳转
  }, {
    key: "openPage",
    value: function openPage(config) {
      // 解构参数
      var url = config.url,
        type = config.type,
        delta = config.delta,
        animationType = config.animationType,
        animationDuration = config.animationDuration,
        events = config.events;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration,
          events: events
        });
      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url
        });
      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url
        });
      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url
        });
      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta
        });
      }
    }
  }]);
  return Router;
}();
var _default = new Router().route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1461:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/function/debounce.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),

/***/ 1462:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-ui-tools/libs/function/throttle.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer;
var flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(function () {
      flag = false;
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = throttle;
exports.default = _default;

/***/ }),

/***/ 1463:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uv-waterfall/components/uv-waterfall/props.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _uni$$uv, _uni$$uv$props;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default2 = {
  props: _objectSpread({
    // 瀑布流数据

    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 数据的id值，根据id值对数据执行删除操作
    // 如数据为：{id: 1, name: 'uv-ui'}，那么该值设置为id
    idKey: {
      type: String,
      default: 'id'
    },
    // 每次插入数据的事件间隔，间隔越长能保证两列高度相近，但是用户体验不好，单位ms
    addTime: {
      type: Number,
      default: 200
    },
    // 瀑布流的列数，默认2，最高为5
    columnCount: {
      type: [Number, String],
      default: 2
    },
    // 列与列的间隙，默认20
    columnGap: {
      type: [Number, String],
      default: 20
    },
    // 左边和列表的间隙
    leftGap: {
      type: [Number, String],
      default: 0
    },
    // 右边和列表的间隙
    rightGap: {
      type: [Number, String],
      default: 0
    },
    // 是否显示滚动条，仅nvue生效
    showScrollbar: {
      type: [Boolean],
      default: false
    },
    // 列宽，nvue生效
    columnWidth: {
      type: [Number, String],
      default: 'auto'
    },
    // 瀑布流的宽度，nvue生效
    width: {
      type: [Number, String],
      default: ''
    },
    // 瀑布流的高度，nvue生效
    height: {
      type: [Number, String],
      default: ''
    }
  }, (_uni$$uv = uni.$uv) === null || _uni$$uv === void 0 ? void 0 : (_uni$$uv$props = _uni$$uv.props) === null || _uni$$uv$props === void 0 ? void 0 : _uni$$uv$props.waterfall)
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1471:
/*!***************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAnimation = createAnimation;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {
    (0, _classCallCheck2.default)(this, MPAnimation);
    this.options = options;
    // 在iOS10+QQ小程序平台下，传给原生的对象一定是个普通对象而不是Proxy对象，否则会报parameter should be Object instead of ProxyObject的错误
    this.animation = uni.createAnimation(_objectSpread({}, options));
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;
  }
  (0, _createClass2.default)(MPAnimation, [{
    key: "_nvuePushAnimates",
    value: function _nvuePushAnimates(type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    }
  }, {
    key: "_animateRun",
    value: function _animateRun() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles
        }, config), function (res) {
          resolve();
        });
      });
    }
  }, {
    key: "_nvueNextAnimate",
    value: function _nvueNextAnimate(animates) {
      var _this2 = this;
      var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {
        var styles = obj.styles,
          config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    }
  }, {
    key: "step",
    value: function step() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.animation.step(config);
      return this;
    }
  }, {
    key: "run",
    value: function run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);
    }
  }]);
  return MPAnimation;
}();
var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ'];
var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {
    var _this$animation;
    (_this$animation = this.animation)[type].apply(_this$animation, arguments);
    return this;
  };
});
function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1477:
/*!********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/Sansnn-uQRCode/js_sdk/uqrcode/uqrcode.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = b;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
//---------------------------------------------------------------------
// uQRCode二维码生成插件 v4.0.6
// 
// uQRCode是一款基于Javascript环境开发的二维码生成插件，适用所有Javascript运行环境的前端应用和Node.js。
// 
// Copyright (c) Sansnn uQRCode All rights reserved.
// 
// Licensed under the Apache License, Version 2.0.
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// github地址：
//   https://github.com/Sansnn/uQRCode
// 
// npm地址：
//   https://www.npmjs.com/package/uqrcodejs
// 
// uni-app插件市场地址：
//   https://ext.dcloud.net.cn/plugin?id=1287
// 
// 复制使用请保留本段注释，感谢支持开源！
// 
//---------------------------------------------------------------------

//---------------------------------------------------------------------
// 当前文件格式为 es，将 bundle 保留为 ES 模块文件，适用于其他打包工具以及支持 <script type=module> 标签的浏览器（别名: esm，module）
// 如需在其他环境使用，请获取环境对应的格式文件
// 格式说明：
// amd - 异步模块定义，适用于 RequireJS 等模块加载器
// cjs - CommonJS，适用于 Node 环境和其他打包工具（别名：commonjs）
// es - 将 bundle 保留为 ES 模块文件，适用于其他打包工具以及支持 <script type=module> 标签的浏览器（别名: esm，module）
// umd - 通用模块定义，生成的包同时支持 amd、cjs 和 iife 三种格式
//---------------------------------------------------------------------

function o(o) {
  this.mode = r.MODE_8BIT_BYTE, this.data = o;
}
function e(o, e) {
  this.typeNumber = o, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = new Array();
}
o.prototype = {
  getLength: function getLength(o) {
    return this.data.length;
  },
  write: function write(o) {
    for (var e = 0; e < this.data.length; e++) {
      o.put(this.data.charCodeAt(e), 8);
    }
  }
}, e.prototype = {
  addData: function addData(e) {
    var r = new o(e);
    this.dataList.push(r), this.dataCache = null;
  },
  isDark: function isDark(o, e) {
    if (o < 0 || this.moduleCount <= o || e < 0 || this.moduleCount <= e) throw new Error(o + "," + e);
    return this.modules[o][e];
  },
  getModuleCount: function getModuleCount() {
    return this.moduleCount;
  },
  make: function make() {
    if (this.typeNumber < 1) {
      var o = 1;
      for (o = 1; o < 40; o++) {
        for (var e = v.getRSBlocks(o, this.errorCorrectLevel), r = new p(), t = 0, i = 0; i < e.length; i++) {
          t += e[i].dataCount;
        }
        for (i = 0; i < this.dataList.length; i++) {
          var n = this.dataList[i];
          r.put(n.mode, 4), r.put(n.getLength(), h.getLengthInBits(n.mode, o)), n.write(r);
        }
        if (r.getLengthInBits() <= 8 * t) break;
      }
      this.typeNumber = o;
    }
    this.makeImpl(!1, this.getBestMaskPattern());
  },
  makeImpl: function makeImpl(o, r) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
    for (var t = 0; t < this.moduleCount; t++) {
      this.modules[t] = new Array(this.moduleCount);
      for (var i = 0; i < this.moduleCount; i++) {
        this.modules[t][i] = null;
      }
    }
    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(o, r), this.typeNumber >= 7 && this.setupTypeNumber(o), null == this.dataCache && (this.dataCache = e.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, r);
  },
  setupPositionProbePattern: function setupPositionProbePattern(o, e) {
    for (var r = -1; r <= 7; r++) {
      if (!(o + r <= -1 || this.moduleCount <= o + r)) for (var t = -1; t <= 7; t++) {
        e + t <= -1 || this.moduleCount <= e + t || (this.modules[o + r][e + t] = 0 <= r && r <= 6 && (0 == t || 6 == t) || 0 <= t && t <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= t && t <= 4);
      }
    }
  },
  getBestMaskPattern: function getBestMaskPattern() {
    for (var o = 0, e = 0, r = 0; r < 8; r++) {
      this.makeImpl(!0, r);
      var t = h.getLostPoint(this);
      (0 == r || o > t) && (o = t, e = r);
    }
    return e;
  },
  createMovieClip: function createMovieClip(o, e, r) {
    var t = o.createEmptyMovieClip(e, r);
    this.make();
    for (var i = 0; i < this.modules.length; i++) {
      for (var n = 1 * i, a = 0; a < this.modules[i].length; a++) {
        var d = 1 * a;
        this.modules[i][a] && (t.beginFill(0, 100), t.moveTo(d, n), t.lineTo(d + 1, n), t.lineTo(d + 1, n + 1), t.lineTo(d, n + 1), t.endFill());
      }
    }
    return t;
  },
  setupTimingPattern: function setupTimingPattern() {
    for (var o = 8; o < this.moduleCount - 8; o++) {
      null == this.modules[o][6] && (this.modules[o][6] = o % 2 == 0);
    }
    for (var e = 8; e < this.moduleCount - 8; e++) {
      null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
    }
  },
  setupPositionAdjustPattern: function setupPositionAdjustPattern() {
    for (var o = h.getPatternPosition(this.typeNumber), e = 0; e < o.length; e++) {
      for (var r = 0; r < o.length; r++) {
        var t = o[e],
          i = o[r];
        if (null == this.modules[t][i]) for (var n = -2; n <= 2; n++) {
          for (var a = -2; a <= 2; a++) {
            this.modules[t + n][i + a] = -2 == n || 2 == n || -2 == a || 2 == a || 0 == n && 0 == a;
          }
        }
      }
    }
  },
  setupTypeNumber: function setupTypeNumber(o) {
    for (var e = h.getBCHTypeNumber(this.typeNumber), r = 0; r < 18; r++) {
      var t = !o && 1 == (e >> r & 1);
      this.modules[Math.floor(r / 3)][r % 3 + this.moduleCount - 8 - 3] = t;
    }
    for (r = 0; r < 18; r++) {
      t = !o && 1 == (e >> r & 1);
      this.modules[r % 3 + this.moduleCount - 8 - 3][Math.floor(r / 3)] = t;
    }
  },
  setupTypeInfo: function setupTypeInfo(o, e) {
    for (var r = this.errorCorrectLevel << 3 | e, t = h.getBCHTypeInfo(r), i = 0; i < 15; i++) {
      var n = !o && 1 == (t >> i & 1);
      i < 6 ? this.modules[i][8] = n : i < 8 ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n;
    }
    for (i = 0; i < 15; i++) {
      n = !o && 1 == (t >> i & 1);
      i < 8 ? this.modules[8][this.moduleCount - i - 1] = n : i < 9 ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n;
    }
    this.modules[this.moduleCount - 8][8] = !o;
  },
  mapData: function mapData(o, e) {
    for (var r = -1, t = this.moduleCount - 1, i = 7, n = 0, a = this.moduleCount - 1; a > 0; a -= 2) {
      for (6 == a && a--;;) {
        for (var d = 0; d < 2; d++) {
          if (null == this.modules[t][a - d]) {
            var u = !1;
            n < o.length && (u = 1 == (o[n] >>> i & 1)), h.getMask(e, t, a - d) && (u = !u), this.modules[t][a - d] = u, -1 == --i && (n++, i = 7);
          }
        }
        if ((t += r) < 0 || this.moduleCount <= t) {
          t -= r, r = -r;
          break;
        }
      }
    }
  }
}, e.PAD0 = 236, e.PAD1 = 17, e.createData = function (o, r, t) {
  for (var i = v.getRSBlocks(o, r), n = new p(), a = 0; a < t.length; a++) {
    var d = t[a];
    n.put(d.mode, 4), n.put(d.getLength(), h.getLengthInBits(d.mode, o)), d.write(n);
  }
  var u = 0;
  for (a = 0; a < i.length; a++) {
    u += i[a].dataCount;
  }
  if (n.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + n.getLengthInBits() + ">" + 8 * u + ")");
  for (n.getLengthInBits() + 4 <= 8 * u && n.put(0, 4); n.getLengthInBits() % 8 != 0;) {
    n.putBit(!1);
  }
  for (; !(n.getLengthInBits() >= 8 * u || (n.put(e.PAD0, 8), n.getLengthInBits() >= 8 * u));) {
    n.put(e.PAD1, 8);
  }
  return e.createBytes(n, i);
}, e.createBytes = function (o, e) {
  for (var r = 0, t = 0, i = 0, n = new Array(e.length), a = new Array(e.length), d = 0; d < e.length; d++) {
    var u = e[d].dataCount,
      s = e[d].totalCount - u;
    t = Math.max(t, u), i = Math.max(i, s), n[d] = new Array(u);
    for (var g = 0; g < n[d].length; g++) {
      n[d][g] = 255 & o.buffer[g + r];
    }
    r += u;
    var l = h.getErrorCorrectPolynomial(s),
      c = new f(n[d], l.getLength() - 1).mod(l);
    a[d] = new Array(l.getLength() - 1);
    for (g = 0; g < a[d].length; g++) {
      var m = g + c.getLength() - a[d].length;
      a[d][g] = m >= 0 ? c.get(m) : 0;
    }
  }
  var v = 0;
  for (g = 0; g < e.length; g++) {
    v += e[g].totalCount;
  }
  var p = new Array(v),
    C = 0;
  for (g = 0; g < t; g++) {
    for (d = 0; d < e.length; d++) {
      g < n[d].length && (p[C++] = n[d][g]);
    }
  }
  for (g = 0; g < i; g++) {
    for (d = 0; d < e.length; d++) {
      g < a[d].length && (p[C++] = a[d][g]);
    }
  }
  return p;
};
for (var r = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8
  }, t = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  }, i = 0, n = 1, a = 2, d = 3, u = 4, s = 5, g = 6, l = 7, h = {
    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
    G15: 1335,
    G18: 7973,
    G15_MASK: 21522,
    getBCHTypeInfo: function getBCHTypeInfo(o) {
      for (var e = o << 10; h.getBCHDigit(e) - h.getBCHDigit(h.G15) >= 0;) {
        e ^= h.G15 << h.getBCHDigit(e) - h.getBCHDigit(h.G15);
      }
      return (o << 10 | e) ^ h.G15_MASK;
    },
    getBCHTypeNumber: function getBCHTypeNumber(o) {
      for (var e = o << 12; h.getBCHDigit(e) - h.getBCHDigit(h.G18) >= 0;) {
        e ^= h.G18 << h.getBCHDigit(e) - h.getBCHDigit(h.G18);
      }
      return o << 12 | e;
    },
    getBCHDigit: function getBCHDigit(o) {
      for (var e = 0; 0 != o;) {
        e++, o >>>= 1;
      }
      return e;
    },
    getPatternPosition: function getPatternPosition(o) {
      return h.PATTERN_POSITION_TABLE[o - 1];
    },
    getMask: function getMask(o, e, r) {
      switch (o) {
        case i:
          return (e + r) % 2 == 0;
        case n:
          return e % 2 == 0;
        case a:
          return r % 3 == 0;
        case d:
          return (e + r) % 3 == 0;
        case u:
          return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
        case s:
          return e * r % 2 + e * r % 3 == 0;
        case g:
          return (e * r % 2 + e * r % 3) % 2 == 0;
        case l:
          return (e * r % 3 + (e + r) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + o);
      }
    },
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(o) {
      for (var e = new f([1], 0), r = 0; r < o; r++) {
        e = e.multiply(new f([1, c.gexp(r)], 0));
      }
      return e;
    },
    getLengthInBits: function getLengthInBits(o, e) {
      if (1 <= e && e < 10) switch (o) {
        case r.MODE_NUMBER:
          return 10;
        case r.MODE_ALPHA_NUM:
          return 9;
        case r.MODE_8BIT_BYTE:
        case r.MODE_KANJI:
          return 8;
        default:
          throw new Error("mode:" + o);
      } else if (e < 27) switch (o) {
        case r.MODE_NUMBER:
          return 12;
        case r.MODE_ALPHA_NUM:
          return 11;
        case r.MODE_8BIT_BYTE:
          return 16;
        case r.MODE_KANJI:
          return 10;
        default:
          throw new Error("mode:" + o);
      } else {
        if (!(e < 41)) throw new Error("type:" + e);
        switch (o) {
          case r.MODE_NUMBER:
            return 14;
          case r.MODE_ALPHA_NUM:
            return 13;
          case r.MODE_8BIT_BYTE:
            return 16;
          case r.MODE_KANJI:
            return 12;
          default:
            throw new Error("mode:" + o);
        }
      }
    },
    getLostPoint: function getLostPoint(o) {
      for (var e = o.getModuleCount(), r = 0, t = 0; t < e; t++) {
        for (var i = 0; i < e; i++) {
          for (var n = 0, a = o.isDark(t, i), d = -1; d <= 1; d++) {
            if (!(t + d < 0 || e <= t + d)) for (var u = -1; u <= 1; u++) {
              i + u < 0 || e <= i + u || 0 == d && 0 == u || a == o.isDark(t + d, i + u) && n++;
            }
          }
          n > 5 && (r += 3 + n - 5);
        }
      }
      for (t = 0; t < e - 1; t++) {
        for (i = 0; i < e - 1; i++) {
          var s = 0;
          o.isDark(t, i) && s++, o.isDark(t + 1, i) && s++, o.isDark(t, i + 1) && s++, o.isDark(t + 1, i + 1) && s++, 0 != s && 4 != s || (r += 3);
        }
      }
      for (t = 0; t < e; t++) {
        for (i = 0; i < e - 6; i++) {
          o.isDark(t, i) && !o.isDark(t, i + 1) && o.isDark(t, i + 2) && o.isDark(t, i + 3) && o.isDark(t, i + 4) && !o.isDark(t, i + 5) && o.isDark(t, i + 6) && (r += 40);
        }
      }
      for (i = 0; i < e; i++) {
        for (t = 0; t < e - 6; t++) {
          o.isDark(t, i) && !o.isDark(t + 1, i) && o.isDark(t + 2, i) && o.isDark(t + 3, i) && o.isDark(t + 4, i) && !o.isDark(t + 5, i) && o.isDark(t + 6, i) && (r += 40);
        }
      }
      var g = 0;
      for (i = 0; i < e; i++) {
        for (t = 0; t < e; t++) {
          o.isDark(t, i) && g++;
        }
      }
      return r += 10 * (Math.abs(100 * g / e / e - 50) / 5);
    }
  }, c = {
    glog: function glog(o) {
      if (o < 1) throw new Error("glog(" + o + ")");
      return c.LOG_TABLE[o];
    },
    gexp: function gexp(o) {
      for (; o < 0;) {
        o += 255;
      }
      for (; o >= 256;) {
        o -= 255;
      }
      return c.EXP_TABLE[o];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256)
  }, m = 0; m < 8; m++) {
  c.EXP_TABLE[m] = 1 << m;
}
for (m = 8; m < 256; m++) {
  c.EXP_TABLE[m] = c.EXP_TABLE[m - 4] ^ c.EXP_TABLE[m - 5] ^ c.EXP_TABLE[m - 6] ^ c.EXP_TABLE[m - 8];
}
for (m = 0; m < 255; m++) {
  c.LOG_TABLE[c.EXP_TABLE[m]] = m;
}
function f(o, e) {
  if (null == o.length) throw new Error(o.length + "/" + e);
  for (var r = 0; r < o.length && 0 == o[r];) {
    r++;
  }
  this.num = new Array(o.length - r + e);
  for (var t = 0; t < o.length - r; t++) {
    this.num[t] = o[t + r];
  }
}
function v(o, e) {
  this.totalCount = o, this.dataCount = e;
}
function p() {
  this.buffer = new Array(), this.length = 0;
}
function C(o) {
  return o.setFillStyle = o.setFillStyle || function (e) {
    o.fillStyle = e;
  }, o.setFontSize = o.setFontSize || function (e) {
    o.font = "".concat(e, "px");
  }, o.setTextAlign = o.setTextAlign || function (e) {
    o.textAlign = e;
  }, o.setTextBaseline = o.setTextBaseline || function (e) {
    o.textBaseline = e;
  }, o.setGlobalAlpha = o.setGlobalAlpha || function (e) {
    o.globalAlpha = e;
  }, o.setStrokeStyle = o.setStrokeStyle || function (e) {
    o.strokeStyle = e;
  }, o.setShadow = o.setShadow || function (e, r, t, i) {
    o.shadowOffsetX = e, o.shadowOffsetY = r, o.shadowBlur = t, o.shadowColor = i;
  }, o.draw = o.draw || function (o, e) {
    e && e();
  }, o.clearRect = o.clearRect || function (e, r, t, i) {
    o.draw(!1);
  }, o;
}
function b(o, e) {
  var _this = this;
  var r = this.data = "",
    t = this.size = 200;
  this.useDynamicSize = !1, this.dynamicSize = t;
  var i = this.typeNumber = -1;
  this.errorCorrectLevel = b.errorCorrectLevel.H;
  var n = this.margin = 0;
  this.areaColor = "#FFFFFF", this.backgroundColor = "rgba(255,255,255,0)", this.backgroundImageSrc = void 0;
  var a = this.backgroundImageWidth = void 0,
    d = this.backgroundImageHeight = void 0,
    u = this.backgroundImageX = void 0,
    s = this.backgroundImageY = void 0;
  this.backgroundImageAlpha = 1, this.backgroundImageBorderRadius = 0;
  var g = this.backgroundPadding = 0;
  this.foregroundColor = "#000000", this.foregroundImageSrc = void 0;
  var l = this.foregroundImageWidth = void 0,
    h = this.foregroundImageHeight = void 0,
    c = this.foregroundImageX = void 0,
    m = this.foregroundImageY = void 0,
    f = this.foregroundImagePadding = 0;
  this.foregroundImageBackgroundColor = "#FFFFFF";
  var v = this.foregroundImageBorderRadius = 0,
    p = this.foregroundImageShadowOffsetX = 0,
    k = this.foregroundImageShadowOffsetY = 0,
    y = this.foregroundImageShadowBlur = 0;
  this.foregroundImageShadowColor = "#808080";
  var w = this.foregroundPadding = 0,
    I = this.positionProbeBackgroundColor = void 0,
    B = this.positionProbeForegroundColor = void 0,
    S = this.separatorColor = void 0,
    P = this.positionAdjustBackgroundColor = void 0,
    L = this.positionAdjustForegroundColor = void 0,
    D = this.timingBackgroundColor = void 0,
    A = this.timingForegroundColor = void 0,
    E = this.typeNumberBackgroundColor = void 0,
    T = this.typeNumberForegroundColor = void 0,
    N = this.darkBlockColor = void 0;
  this.base = void 0, this.modules = [], this.moduleCount = 0, this.drawModules = [];
  var M = this.canvasContext = void 0;
  this.loadImage, this.drawReserve = !1, this.isMaked = !1, Object.defineProperties(this, {
    data: {
      get: function get() {
        if ("" === r || void 0 === r) throw console.error("[uQRCode]: data must be set!"), new b.Error("data must be set!");
        return r;
      },
      set: function set(o) {
        r = String(o);
      }
    },
    size: {
      get: function get() {
        return t;
      },
      set: function set(o) {
        t = Number(o);
      }
    },
    typeNumber: {
      get: function get() {
        return i;
      },
      set: function set(o) {
        i = Number(o);
      }
    },
    margin: {
      get: function get() {
        return n;
      },
      set: function set(o) {
        n = Number(o);
      }
    },
    backgroundImageWidth: {
      get: function get() {
        return void 0 === a ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * a : a;
      },
      set: function set(o) {
        a = Number(o);
      }
    },
    backgroundImageHeight: {
      get: function get() {
        return void 0 === d ? this.dynamicSize : this.useDynamicSize ? this.dynamicSize / this.size * d : d;
      },
      set: function set(o) {
        d = Number(o);
      }
    },
    backgroundImageX: {
      get: function get() {
        return void 0 === u ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * u : u;
      },
      set: function set(o) {
        u = Number(o);
      }
    },
    backgroundImageY: {
      get: function get() {
        return void 0 === s ? 0 : this.useDynamicSize ? this.dynamicSize / this.size * s : s;
      },
      set: function set(o) {
        s = Number(o);
      }
    },
    backgroundPadding: {
      get: function get() {
        return g;
      },
      set: function set(o) {
        g = o > 1 ? 1 : o < 0 ? 0 : o;
      }
    },
    foregroundImageWidth: {
      get: function get() {
        return void 0 === l ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * l : l;
      },
      set: function set(o) {
        l = Number(o);
      }
    },
    foregroundImageHeight: {
      get: function get() {
        return void 0 === h ? (this.dynamicSize - 2 * this.margin) / 4 : this.useDynamicSize ? this.dynamicSize / this.size * h : h;
      },
      set: function set(o) {
        h = Number(o);
      }
    },
    foregroundImageX: {
      get: function get() {
        return void 0 === c ? this.dynamicSize / 2 - this.foregroundImageWidth / 2 : this.useDynamicSize ? this.dynamicSize / this.size * c : c;
      },
      set: function set(o) {
        c = Number(o);
      }
    },
    foregroundImageY: {
      get: function get() {
        return void 0 === m ? this.dynamicSize / 2 - this.foregroundImageHeight / 2 : this.useDynamicSize ? this.dynamicSize / this.size * m : m;
      },
      set: function set(o) {
        m = Number(o);
      }
    },
    foregroundImagePadding: {
      get: function get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * f : f;
      },
      set: function set(o) {
        f = Number(o);
      }
    },
    foregroundImageBorderRadius: {
      get: function get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * v : v;
      },
      set: function set(o) {
        v = Number(o);
      }
    },
    foregroundImageShadowOffsetX: {
      get: function get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * p : p;
      },
      set: function set(o) {
        p = Number(o);
      }
    },
    foregroundImageShadowOffsetY: {
      get: function get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * k : k;
      },
      set: function set(o) {
        k = Number(o);
      }
    },
    foregroundImageShadowBlur: {
      get: function get() {
        return this.useDynamicSize ? this.dynamicSize / this.size * y : y;
      },
      set: function set(o) {
        y = Number(o);
      }
    },
    foregroundPadding: {
      get: function get() {
        return w;
      },
      set: function set(o) {
        w = o > 1 ? 1 : o < 0 ? 0 : o;
      }
    },
    positionProbeBackgroundColor: {
      get: function get() {
        return I || this.backgroundColor;
      },
      set: function set(o) {
        I = o;
      }
    },
    positionProbeForegroundColor: {
      get: function get() {
        return B || this.foregroundColor;
      },
      set: function set(o) {
        B = o;
      }
    },
    separatorColor: {
      get: function get() {
        return S || this.backgroundColor;
      },
      set: function set(o) {
        S = o;
      }
    },
    positionAdjustBackgroundColor: {
      get: function get() {
        return P || this.backgroundColor;
      },
      set: function set(o) {
        P = o;
      }
    },
    positionAdjustForegroundColor: {
      get: function get() {
        return L || this.foregroundColor;
      },
      set: function set(o) {
        L = o;
      }
    },
    timingBackgroundColor: {
      get: function get() {
        return D || this.backgroundColor;
      },
      set: function set(o) {
        D = o;
      }
    },
    timingForegroundColor: {
      get: function get() {
        return A || this.foregroundColor;
      },
      set: function set(o) {
        A = o;
      }
    },
    typeNumberBackgroundColor: {
      get: function get() {
        return E || this.backgroundColor;
      },
      set: function set(o) {
        E = o;
      }
    },
    typeNumberForegroundColor: {
      get: function get() {
        return T || this.foregroundColor;
      },
      set: function set(o) {
        T = o;
      }
    },
    darkBlockColor: {
      get: function get() {
        return N || this.foregroundColor;
      },
      set: function set(o) {
        N = o;
      }
    },
    canvasContext: {
      get: function get() {
        if (void 0 === M) throw console.error("[uQRCode]: use drawCanvas, you need to set the canvasContext!"), new b.Error("use drawCanvas, you need to set the canvasContext!");
        return M;
      },
      set: function set(o) {
        M = C(o);
      }
    }
  }), b.plugins.forEach(function (o) {
    return o(b, _this, !1);
  }), o && this.setOptions(o), e && (this.canvasContext = C(e));
}
f.prototype = {
  get: function get(o) {
    return this.num[o];
  },
  getLength: function getLength() {
    return this.num.length;
  },
  multiply: function multiply(o) {
    for (var e = new Array(this.getLength() + o.getLength() - 1), r = 0; r < this.getLength(); r++) {
      for (var t = 0; t < o.getLength(); t++) {
        e[r + t] ^= c.gexp(c.glog(this.get(r)) + c.glog(o.get(t)));
      }
    }
    return new f(e, 0);
  },
  mod: function mod(o) {
    if (this.getLength() - o.getLength() < 0) return this;
    for (var e = c.glog(this.get(0)) - c.glog(o.get(0)), r = new Array(this.getLength()), t = 0; t < this.getLength(); t++) {
      r[t] = this.get(t);
    }
    for (t = 0; t < o.getLength(); t++) {
      r[t] ^= c.gexp(c.glog(o.get(t)) + e);
    }
    return new f(r, 0).mod(o);
  }
}, v.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], v.getRSBlocks = function (o, e) {
  var r = v.getRsBlockTable(o, e);
  if (null == r) throw new Error("bad rs block @ typeNumber:" + o + "/errorCorrectLevel:" + e);
  for (var t = r.length / 3, i = new Array(), n = 0; n < t; n++) {
    for (var a = r[3 * n + 0], d = r[3 * n + 1], u = r[3 * n + 2], s = 0; s < a; s++) {
      i.push(new v(d, u));
    }
  }
  return i;
}, v.getRsBlockTable = function (o, e) {
  switch (e) {
    case t.L:
      return v.RS_BLOCK_TABLE[4 * (o - 1) + 0];
    case t.M:
      return v.RS_BLOCK_TABLE[4 * (o - 1) + 1];
    case t.Q:
      return v.RS_BLOCK_TABLE[4 * (o - 1) + 2];
    case t.H:
      return v.RS_BLOCK_TABLE[4 * (o - 1) + 3];
    default:
      return;
  }
}, p.prototype = {
  get: function get(o) {
    var e = Math.floor(o / 8);
    return 1 == (this.buffer[e] >>> 7 - o % 8 & 1);
  },
  put: function put(o, e) {
    for (var r = 0; r < e; r++) {
      this.putBit(1 == (o >>> e - r - 1 & 1));
    }
  },
  getLengthInBits: function getLengthInBits() {
    return this.length;
  },
  putBit: function putBit(o) {
    var e = Math.floor(this.length / 8);
    this.buffer.length <= e && this.buffer.push(0), o && (this.buffer[e] |= 128 >>> this.length % 8), this.length++;
  }
}, e.errorCorrectLevel = t, b.errorCorrectLevel = e.errorCorrectLevel, b.Error = function (o) {
  this.errMsg = "[uQRCode]: " + o;
}, b.plugins = [], b.use = function (o) {
  "function" == typeof o && b.plugins.push(o);
}, b.prototype.loadImage = function (o) {
  return Promise.resolve(o);
}, b.prototype.setOptions = function (o) {
  var _this2 = this;
  var e, r, t, i, n, a, d, u, s, g, l, h, c, m, f, v, p, C, b, k, y, w, I, B, S, P, L, D, A, E, T, N, M, z, R, _, O, F, x, H, X, Y, j, W, G, K, Q, U, $, J, q, V, Z, oo, eo, ro;
  o && (Object.keys(o).forEach(function (e) {
    _this2[e] = o[e];
  }), function () {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    var t;
    t = r ? o : _objectSpread({}, o);
    for (var _o in e) {
      var i = e[_o];
      null != i && (i.constructor == Object ? t[_o] = this.deepReplace(t[_o], i) : i.constructor != String || i ? t[_o] = i : t[_o] = t[_o]);
    }
  }(this, {
    data: o.data || o.text,
    size: o.size,
    useDynamicSize: o.useDynamicSize,
    typeNumber: o.typeNumber,
    errorCorrectLevel: o.errorCorrectLevel,
    margin: o.margin,
    areaColor: o.areaColor,
    backgroundColor: o.backgroundColor || (null === (e = o.background) || void 0 === e ? void 0 : e.color),
    backgroundImageSrc: o.backgroundImageSrc || (null === (r = o.background) || void 0 === r || null === (t = r.image) || void 0 === t ? void 0 : t.src),
    backgroundImageWidth: o.backgroundImageWidth || (null === (i = o.background) || void 0 === i || null === (n = i.image) || void 0 === n ? void 0 : n.width),
    backgroundImageHeight: o.backgroundImageHeight || (null === (a = o.background) || void 0 === a || null === (d = a.image) || void 0 === d ? void 0 : d.height),
    backgroundImageX: o.backgroundImageX || (null === (u = o.background) || void 0 === u || null === (s = u.image) || void 0 === s ? void 0 : s.x),
    backgroundImageY: o.backgroundImageY || (null === (g = o.background) || void 0 === g || null === (l = g.image) || void 0 === l ? void 0 : l.y),
    backgroundImageAlpha: o.backgroundImageAlpha || (null === (h = o.background) || void 0 === h || null === (c = h.image) || void 0 === c ? void 0 : c.alpha),
    backgroundImageBorderRadius: o.backgroundImageBorderRadius || (null === (m = o.background) || void 0 === m || null === (f = m.image) || void 0 === f ? void 0 : f.borderRadius),
    backgroundPadding: o.backgroundPadding,
    foregroundColor: o.foregroundColor || (null === (v = o.foreground) || void 0 === v ? void 0 : v.color),
    foregroundImageSrc: o.foregroundImageSrc || (null === (p = o.foreground) || void 0 === p || null === (C = p.image) || void 0 === C ? void 0 : C.src),
    foregroundImageWidth: o.foregroundImageWidth || (null === (b = o.foreground) || void 0 === b || null === (k = b.image) || void 0 === k ? void 0 : k.width),
    foregroundImageHeight: o.foregroundImageHeight || (null === (y = o.foreground) || void 0 === y || null === (w = y.image) || void 0 === w ? void 0 : w.height),
    foregroundImageX: o.foregroundImageX || (null === (I = o.foreground) || void 0 === I || null === (B = I.image) || void 0 === B ? void 0 : B.x),
    foregroundImageY: o.foregroundImageY || (null === (S = o.foreground) || void 0 === S || null === (P = S.image) || void 0 === P ? void 0 : P.y),
    foregroundImagePadding: o.foregroundImagePadding || (null === (L = o.foreground) || void 0 === L || null === (D = L.image) || void 0 === D ? void 0 : D.padding),
    foregroundImageBackgroundColor: o.foregroundImageBackgroundColor || (null === (A = o.foreground) || void 0 === A || null === (E = A.image) || void 0 === E ? void 0 : E.backgroundColor),
    foregroundImageBorderRadius: o.foregroundImageBorderRadius || (null === (T = o.foreground) || void 0 === T || null === (N = T.image) || void 0 === N ? void 0 : N.borderRadius),
    foregroundImageShadowOffsetX: o.foregroundImageShadowOffsetX || (null === (M = o.foreground) || void 0 === M || null === (z = M.image) || void 0 === z ? void 0 : z.shadowOffsetX),
    foregroundImageShadowOffsetY: o.foregroundImageShadowOffsetY || (null === (R = o.foreground) || void 0 === R || null === (_ = R.image) || void 0 === _ ? void 0 : _.shadowOffsetY),
    foregroundImageShadowBlur: o.foregroundImageShadowBlur || (null === (O = o.foreground) || void 0 === O || null === (F = O.image) || void 0 === F ? void 0 : F.shadowBlur),
    foregroundImageShadowColor: o.foregroundImageShadowColor || (null === (x = o.foreground) || void 0 === x || null === (H = x.image) || void 0 === H ? void 0 : H.shadowColor),
    foregroundPadding: o.foregroundPadding,
    positionProbeBackgroundColor: o.positionProbeBackgroundColor || (null === (X = o.positionProbe) || void 0 === X ? void 0 : X.backgroundColor) || (null === (Y = o.positionDetection) || void 0 === Y ? void 0 : Y.backgroundColor),
    positionProbeForegroundColor: o.positionProbeForegroundColor || (null === (j = o.positionProbe) || void 0 === j ? void 0 : j.foregroundColor) || (null === (W = o.positionDetection) || void 0 === W ? void 0 : W.foregroundColor),
    separatorColor: o.separatorColor || (null === (G = o.separator) || void 0 === G ? void 0 : G.color),
    positionAdjustBackgroundColor: o.positionAdjustBackgroundColor || (null === (K = o.positionAdjust) || void 0 === K ? void 0 : K.backgroundColor) || (null === (Q = o.alignment) || void 0 === Q ? void 0 : Q.backgroundColor),
    positionAdjustForegroundColor: o.positionAdjustForegroundColor || (null === (U = o.positionAdjust) || void 0 === U ? void 0 : U.foregroundColor) || (null === ($ = o.alignment) || void 0 === $ ? void 0 : $.foregroundColor),
    timingBackgroundColor: o.timingBackgroundColor || (null === (J = o.timing) || void 0 === J ? void 0 : J.backgroundColor),
    timingForegroundColor: o.timingForegroundColor || (null === (q = o.timing) || void 0 === q ? void 0 : q.foregroundColor),
    typeNumberBackgroundColor: o.typeNumberBackgroundColor || (null === (V = o.typeNumber) || void 0 === V ? void 0 : V.backgroundColor) || (null === (Z = o.versionInformation) || void 0 === Z ? void 0 : Z.backgroundColor),
    typeNumberForegroundColor: o.typeNumberForegroundColor || (null === (oo = o.typeNumber) || void 0 === oo ? void 0 : oo.foregroundColor) || (null === (eo = o.versionInformation) || void 0 === eo ? void 0 : eo.foregroundColor),
    darkBlockColor: o.darkBlockColor || (null === (ro = o.darkBlock) || void 0 === ro ? void 0 : ro.color)
  }, !0));
}, b.prototype.make = function () {
  var o = this.foregroundColor,
    r = this.backgroundColor,
    t = this.typeNumber,
    i = this.errorCorrectLevel,
    n = this.data,
    a = this.size,
    d = this.margin,
    u = this.useDynamicSize;
  if (o === r) throw console.error("[uQRCode]: foregroundColor and backgroundColor cannot be the same!"), new b.Error("foregroundColor and backgroundColor cannot be the same!");
  var s = new e(t, i);
  s.addData(function (o) {
    o = o.toString();
    for (var e, r = "", t = 0; t < o.length; t++) {
      (e = o.charCodeAt(t)) >= 1 && e <= 127 ? r += o.charAt(t) : e > 2047 ? (r += String.fromCharCode(224 | e >> 12 & 15), r += String.fromCharCode(128 | e >> 6 & 63), r += String.fromCharCode(128 | e >> 0 & 63)) : (r += String.fromCharCode(192 | e >> 6 & 31), r += String.fromCharCode(128 | e >> 0 & 63));
    }
    return r;
  }(n)), s.make(), this.base = s, this.typeNumber = s.typeNumber, this.modules = s.modules, this.moduleCount = s.moduleCount, this.dynamicSize = u ? Math.ceil((a - 2 * d) / s.moduleCount) * s.moduleCount + 2 * d : a, function (o) {
    var e = o.dynamicSize,
      r = o.margin,
      t = o.backgroundColor,
      i = o.backgroundPadding,
      n = o.foregroundColor,
      a = o.foregroundPadding,
      d = o.modules,
      u = o.moduleCount,
      s = (e - 2 * r) / u,
      g = s,
      l = 0;
    i > 0 && (l = g * i / 2, g -= 2 * l);
    var h = s,
      c = 0;
    a > 0 && (c = h * a / 2, h -= 2 * c);
    for (var m = 0; m < u; m++) {
      for (var f = 0; f < u; f++) {
        var v = f * s + r,
          p = m * s + r;
        if (d[m][f]) {
          var C = c,
            b = v + c,
            k = p + c,
            y = h,
            w = h;
          d[m][f] = {
            type: ["foreground"],
            color: n,
            isBlack: !0,
            isDrawn: !1,
            destX: v,
            destY: p,
            destWidth: s,
            destHeight: s,
            x: b,
            y: k,
            width: y,
            height: w,
            paddingTop: C,
            paddingRight: C,
            paddingBottom: C,
            paddingLeft: C
          };
        } else C = l, b = v + l, k = p + l, y = g, w = g, d[m][f] = {
          type: ["background"],
          color: t,
          isBlack: !1,
          isDrawn: !1,
          destX: v,
          destY: p,
          destWidth: s,
          destHeight: s,
          x: b,
          y: k,
          width: y,
          height: w,
          paddingTop: C,
          paddingRight: C,
          paddingBottom: C,
          paddingLeft: C
        };
      }
    }
  }(this), function (o) {
    var e = o.modules,
      r = o.moduleCount,
      t = o.positionProbeBackgroundColor,
      i = o.positionProbeForegroundColor,
      n = r - 7;
    [[0, 0, 1], [1, 0, 1], [2, 0, 1], [3, 0, 1], [4, 0, 1], [5, 0, 1], [6, 0, 1], [0, 1, 1], [1, 1, 0], [2, 1, 0], [3, 1, 0], [4, 1, 0], [5, 1, 0], [6, 1, 1], [0, 2, 1], [1, 2, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 0], [6, 2, 1], [0, 3, 1], [1, 3, 0], [2, 3, 1], [3, 3, 1], [4, 3, 1], [5, 3, 0], [6, 3, 1], [0, 4, 1], [1, 4, 0], [2, 4, 1], [3, 4, 1], [4, 4, 1], [5, 4, 0], [6, 4, 1], [0, 5, 1], [1, 5, 0], [2, 5, 0], [3, 5, 0], [4, 5, 0], [5, 5, 0], [6, 5, 1], [0, 6, 1], [1, 6, 1], [2, 6, 1], [3, 6, 1], [4, 6, 1], [5, 6, 1], [6, 6, 1]].forEach(function (o) {
      var r = e[o[0]][o[1]],
        a = e[o[0] + n][o[1]],
        d = e[o[0]][o[1] + n];
      d.type.push("positionProbe"), a.type.push("positionProbe"), r.type.push("positionProbe"), r.color = 1 == o[2] ? i : t, a.color = 1 == o[2] ? i : t, d.color = 1 == o[2] ? i : t;
    });
  }(this), function (o) {
    var e = o.modules,
      r = o.moduleCount,
      t = o.separatorColor;
    [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]].forEach(function (o) {
      var i = e[o[0]][o[1]],
        n = e[r - o[0] - 1][o[1]],
        a = e[o[0]][r - o[1] - 1];
      a.type.push("separator"), n.type.push("separator"), i.type.push("separator"), i.color = t, n.color = t, a.color = t;
    });
  }(this), function (o) {
    var e = o.typeNumber,
      r = o.modules,
      t = o.moduleCount,
      i = o.foregroundColor,
      n = o.backgroundColor,
      a = o.positionAdjustForegroundColor,
      d = o.positionAdjustBackgroundColor,
      u = o.timingForegroundColor,
      s = o.timingBackgroundColor;
    var g = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]][e - 1];
    if (g) {
      var _o2 = [[-2, -2, 1], [-1, -2, 1], [0, -2, 1], [1, -2, 1], [2, -2, 1], [-2, -1, 1], [-1, -1, 0], [0, -1, 0], [1, -1, 0], [2, -1, 1], [-2, 0, 1], [-1, 0, 0], [0, 0, 1], [1, 0, 0], [2, 0, 1], [-2, 1, 1], [-1, 1, 0], [0, 1, 0], [1, 1, 0], [2, 1, 1], [-2, 2, 1], [-1, 2, 1], [0, 2, 1], [1, 2, 1], [2, 2, 1]],
        _e = g.length;
      for (var _l = 0; _l < _e; _l++) {
        var _loop = function _loop(_h) {
          var _x$y = {
              x: g[_l],
              y: g[_h]
            },
            e = _x$y.x,
            c = _x$y.y;
          e < 9 && c < 9 || e > t - 9 - 1 && c < 9 || c > t - 9 - 1 && e < 9 || _o2.forEach(function (o) {
            var t = r[e + o[0]][c + o[1]];
            t.type.push("positionAdjust"), t.type.includes("timing") ? 1 == o[2] ? t.color = a == i ? u : a : t.color = a == i && d == n ? s : d : t.color = 1 == o[2] ? a : d;
          });
        };
        for (var _h = 0; _h < _e; _h++) {
          _loop(_h);
        }
      }
    }
  }(this), function (o) {
    var e = o.modules,
      r = o.moduleCount,
      t = o.timingForegroundColor,
      i = o.timingBackgroundColor,
      n = r - 16;
    for (var _o3 = 0; _o3 < n; _o3++) {
      var a = e[6][8 + _o3],
        d = e[8 + _o3][6];
      a.type.push("timing"), d.type.push("timing"), a.color = 1 & _o3 ^ 1 ? t : i, d.color = 1 & _o3 ^ 1 ? t : i;
    }
  }(this), function (o) {
    var e = o.modules,
      r = o.moduleCount,
      t = o.darkBlockColor;
    var i = e[r - 7 - 1][8];
    i.type.push("darkBlock"), i.color = t;
  }(this), function (o) {
    var e = o.typeNumber,
      r = o.modules,
      t = o.moduleCount,
      i = o.typeNumberBackgroundColor,
      n = o.typeNumberForegroundColor;
    if (e < 7) return r;
    var a = [0, 0, 0, 0, 0, 0, 0, "000111110010010100", "001000010110111100", "001001101010011001", "001010010011010011", "001011101111110110", "001100011101100010", "001101100001000111", "001110011000001101", "001111100100101000", "010000101101111000", "010001010001011101", "010010101000010111", "010011010100110010", "010100100110100110", "010101011010000011", "010110100011001001", "010111011111101100", "011000111011000100", "011001000111100001", "011010111110101011", "011011000010001110", "011100110000011010", "011101001100111111", "011110110101110101", "011111001001010000", "100000100111010101", "100001011011110000", "100010100010111010", "100011011110011111", "100100101100001011", "100101010000101110", "100110101001100100", "100111010101000001", "101000110001101001"];
    var d = a[e] + a[e],
      u = [t - 11, t - 10, t - 9];
    [[5, u[2]], [5, u[1]], [5, u[0]], [4, u[2]], [4, u[1]], [4, u[0]], [3, u[2]], [3, u[1]], [3, u[0]], [2, u[2]], [2, u[1]], [2, u[0]], [1, u[2]], [1, u[1]], [1, u[0]], [0, u[2]], [0, u[1]], [0, u[0]], [u[2], 5], [u[1], 5], [u[0], 5], [u[2], 4], [u[1], 4], [u[0], 4], [u[2], 3], [u[1], 3], [u[0], 3], [u[2], 2], [u[1], 2], [u[0], 2], [u[2], 1], [u[1], 1], [u[0], 1], [u[2], 0], [u[1], 0], [u[0], 0]].forEach(function (o, e) {
      var t = r[o[0]][o[1]];
      t.type.push("typeNumber"), t.color = "1" == d[e] ? n : i;
    });
  }(this), this.isMaked = !0, this.drawModules = [];
}, b.prototype.getDrawModules = function () {
  if (this.drawModules && this.drawModules.length > 0) return this.drawModules;
  var o = this.drawModules = [],
    e = this.modules,
    r = this.moduleCount,
    t = this.dynamicSize,
    i = this.areaColor,
    n = this.backgroundImageSrc,
    a = this.backgroundImageX,
    d = this.backgroundImageY,
    u = this.backgroundImageWidth,
    s = this.backgroundImageHeight,
    g = this.backgroundImageAlpha,
    l = this.backgroundImageBorderRadius,
    h = this.foregroundImageSrc,
    c = this.foregroundImageX,
    m = this.foregroundImageY,
    f = this.foregroundImageWidth,
    v = this.foregroundImageHeight,
    p = this.foregroundImagePadding,
    C = this.foregroundImageBackgroundColor,
    b = this.foregroundImageBorderRadius,
    k = this.foregroundImageShadowOffsetX,
    y = this.foregroundImageShadowOffsetY,
    w = this.foregroundImageShadowBlur,
    I = this.foregroundImageShadowColor;
  i && o.push({
    name: "area",
    type: "area",
    color: i,
    x: 0,
    y: 0,
    width: t,
    height: t
  }), n && o.push({
    name: "backgroundImage",
    type: "image",
    imageSrc: n,
    mappingName: "backgroundImageSrc",
    x: a,
    y: d,
    width: u,
    height: s,
    alpha: g,
    borderRadius: l
  });
  for (var B = 0; B < r; B++) {
    for (var S = 0; S < r; S++) {
      var P = e[B][S];
      P.isDrawn || (P.type.includes("foreground") ? o.push({
        name: "foreground",
        type: "tile",
        color: P.color,
        destX: P.destX,
        destY: P.destY,
        destWidth: P.destWidth,
        destHeight: P.destHeight,
        x: P.x,
        y: P.y,
        width: P.width,
        height: P.height,
        paddingTop: P.paddingTop,
        paddingRight: P.paddingRight,
        paddingBottom: P.paddingBottom,
        paddingLeft: P.paddingLeft,
        rowIndex: B,
        colIndex: S
      }) : o.push({
        name: "background",
        type: "tile",
        color: P.color,
        destX: P.destX,
        destY: P.destY,
        destWidth: P.destWidth,
        destHeight: P.destHeight,
        x: P.x,
        y: P.y,
        width: P.width,
        height: P.height,
        paddingTop: P.paddingTop,
        paddingRight: P.paddingRight,
        paddingBottom: P.paddingBottom,
        paddingLeft: P.paddingLeft,
        rowIndex: B,
        colIndex: S
      }), P.isDrawn = !0);
    }
  }
  return h && o.push({
    name: "foregroundImage",
    type: "image",
    imageSrc: h,
    mappingName: "foregroundImageSrc",
    x: c,
    y: m,
    width: f,
    height: v,
    padding: p,
    backgroundColor: C,
    borderRadius: b,
    shadowOffsetX: k,
    shadowOffsetY: y,
    shadowBlur: w,
    shadowColor: I
  }), o;
}, b.prototype.isBlack = function (o, e) {
  var r = this.moduleCount;
  return !(0 > o || 0 > e || o >= r || e >= r) && this.modules[o][e].isBlack;
}, b.prototype.drawCanvas = function () {
  var _this3 = this;
  var o = this.isMaked,
    e = this.canvasContext,
    r = this.useDynamicSize,
    t = this.dynamicSize,
    i = this.foregroundColor,
    n = this.foregroundPadding,
    a = this.backgroundColor,
    d = this.backgroundPadding,
    u = this.drawReserve,
    s = this.margin;
  if (!o) return console.error("[uQRCode]: please execute the make method first!"), Promise.reject(new b.Error("please execute the make method first!"));
  var g = this.getDrawModules(),
    l = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(o, r) {
        var i, n, a, d, s, l, h, c, m, f, v, p, C, k;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                e.clearRect(0, 0, t, t), e.draw(!1);
                i = 0;
              case 3:
                if (!(i < g.length)) {
                  _context.next = 48;
                  break;
                }
                n = g[i];
                _context.t0 = (e.save(), n.type);
                _context.next = _context.t0 === "area" ? 8 : _context.t0 === "tile" ? 10 : _context.t0 === "image" ? 13 : 44;
                break;
              case 8:
                e.setFillStyle(n.color), e.fillRect(n.x, n.y, n.width, n.height);
                return _context.abrupt("break", 44);
              case 10:
                a = n.x, d = n.y, s = n.width, l = n.height;
                e.setFillStyle(n.color), e.fillRect(a, d, s, l);
                return _context.abrupt("break", 44);
              case 13:
                if (!("backgroundImage" === n.name)) {
                  _context.next = 28;
                  break;
                }
                a = Math.round(n.x), d = Math.round(n.y), s = Math.round(n.width), l = Math.round(n.height);
                s < 2 * (c = Math.round(n.borderRadius)) && (c = s / 2), l < 2 * c && (c = l / 2), e.setGlobalAlpha(n.alpha), c > 0 && (e.beginPath(), e.moveTo(a + c, d), e.arcTo(a + s, d, a + s, d + l, c), e.arcTo(a + s, d + l, a, d + l, c), e.arcTo(a, d + l, a, d, c), e.arcTo(a, d, a + s, d, c), e.closePath(), e.setStrokeStyle("rgba(0,0,0,0)"), e.stroke(), e.clip());
                _context.prev = 16;
                _context.next = 19;
                return _this3.loadImage(n.imageSrc);
              case 19:
                h = _context.sent;
                e.drawImage(h, a, d, s, l);
                _context.next = 26;
                break;
              case 23:
                _context.prev = 23;
                _context.t1 = _context["catch"](16);
                throw console.error("[uQRCode]: ".concat(n.mappingName, " invalid!")), new b.Error("".concat(n.mappingName, " invalid!"));
              case 26:
                _context.next = 44;
                break;
              case 28:
                if (!("foregroundImage" === n.name)) {
                  _context.next = 44;
                  break;
                }
                a = Math.round(n.x), d = Math.round(n.y), s = Math.round(n.width), l = Math.round(n.height);
                m = Math.round(n.padding);
                s < 2 * (c = Math.round(n.borderRadius)) && (c = s / 2), l < 2 * c && (c = l / 2);
                f = a - m, v = d - m, p = s + 2 * m, C = l + 2 * m, k = Math.round(p / s * c);
                p < 2 * k && (k = p / 2), C < 2 * k && (k = C / 2), e.save(), e.setShadow(n.shadowOffsetX, n.shadowOffsetY, n.shadowBlur, n.shadowColor), k > 0 ? (e.beginPath(), e.moveTo(f + k, v), e.arcTo(f + p, v, f + p, v + C, k), e.arcTo(f + p, v + C, f, v + C, k), e.arcTo(f, v + C, f, v, k), e.arcTo(f, v, f + p, v, k), e.closePath(), e.setFillStyle(n.backgroundColor), e.fill()) : (e.setFillStyle(n.backgroundColor), e.fillRect(f, v, p, C)), e.restore(), e.save(), k > 0 ? (e.beginPath(), e.moveTo(f + k, v), e.arcTo(f + p, v, f + p, v + C, k), e.arcTo(f + p, v + C, f, v + C, k), e.arcTo(f, v + C, f, v, k), e.arcTo(f, v, f + p, v, k), e.closePath(), e.setFillStyle(m > 0 ? n.backgroundColor : "rgba(0,0,0,0)"), e.fill()) : (e.setFillStyle(m > 0 ? n.backgroundColor : "rgba(0,0,0,0)"), e.fillRect(f, v, p, C)), e.restore(), c > 0 && (e.beginPath(), e.moveTo(a + c, d), e.arcTo(a + s, d, a + s, d + l, c), e.arcTo(a + s, d + l, a, d + l, c), e.arcTo(a, d + l, a, d, c), e.arcTo(a, d, a + s, d, c), e.closePath(), e.setStrokeStyle("rgba(0,0,0,0)"), e.stroke(), e.clip());
                _context.prev = 34;
                _context.next = 37;
                return _this3.loadImage(n.imageSrc);
              case 37:
                h = _context.sent;
                e.drawImage(h, a, d, s, l);
                _context.next = 44;
                break;
              case 41:
                _context.prev = 41;
                _context.t2 = _context["catch"](34);
                throw console.error("[uQRCode]: ".concat(n.mappingName, " invalid!")), new b.Error("".concat(n.mappingName, " invalid!"));
              case 44:
                u && e.draw(!0), e.restore();
              case 45:
                i++;
                _context.next = 3;
                break;
              case 48:
                e.draw(!0), setTimeout(o, 150);
                _context.next = 56;
                break;
              case 51:
                _context.prev = 51;
                _context.t3 = _context["catch"](0);
                if (_context.t3 instanceof b.Error) {
                  _context.next = 55;
                  break;
                }
                throw _context.t3;
              case 55:
                r(_context.t3);
              case 56:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 51], [16, 23], [34, 41]]);
      }));
      return function l(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  return new Promise(function (o, e) {
    l(o, e);
  });
}, b.prototype.draw = function () {
  return this.drawCanvas();
}, b.prototype.register = function (o) {
  o && o(b, this, !0);
};

/***/ }),

/***/ 1478:
/*!**********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/Sansnn-uQRCode/common/queue.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queueLoadImage = exports.queueDraw = void 0;
function Queue() {
  var waitingQueue = this.waitingQueue = [];
  var isRunning = this.isRunning = false; // 记录是否有未完成的任务

  function execute(task, resolve, reject) {
    task().then(function (data) {
      resolve(data);
    }).catch(function (e) {
      reject(e);
    }).finally(function () {
      // 等待任务队列中如果有任务，则触发它；否则设置isRunning = false,表示无任务状态
      if (waitingQueue.length) {
        var next = waitingQueue.shift();
        execute(next.task, next.resolve, next.reject);
      } else {
        isRunning = false;
      }
    });
  }
  this.exec = function (task) {
    return new Promise(function (resolve, reject) {
      if (isRunning) {
        waitingQueue.push({
          task: task,
          resolve: resolve,
          reject: reject
        });
      } else {
        isRunning = true;
        execute(task, resolve, reject);
      }
    });
  };
}

/* 队列实例，某些平台一起使用多个组件时需要通过队列逐一绘制，否则部分绘制方法异常，nvue端的iOS gcanvas尤其明显，在不通过队列绘制时会出现图片丢失的情况 */
var queueDraw = new Queue();
exports.queueDraw = queueDraw;
var queueLoadImage = new Queue();
exports.queueLoadImage = queueLoadImage;

/***/ }),

/***/ 1479:
/*!**********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/Sansnn-uQRCode/common/cache.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheImageList = void 0;
var cacheImageList = [];
exports.cacheImageList = cacheImageList;

/***/ }),

/***/ 1494:
/*!************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/utils/utils.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllRect = getAllRect;
exports.getRect = getRect;
exports.requestAnimationFrame = requestAnimationFrame;
function getAllRect(context, selector) {
  return new Promise(function (resolve) {
    uni.createSelectorQuery().in(context).selectAll(selector).boundingClientRect().exec(function () {
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return resolve(rect[0]);
    });
  });
}
function getRect(context, selector) {
  return new Promise(function (resolve) {
    uni.createSelectorQuery().in(context).select(selector).boundingClientRect().exec(function () {
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return resolve(rect[0]);
    });
  });
}
function requestAnimationFrame(cb) {
  var systemInfo = uni.getSystemInfoSync();
  if (systemInfo.platform === 'devtools') {
    return setTimeout(function () {
      cb();
    }, 1000 / 30);
  }
  return uni.createSelectorQuery().selectViewport().boundingClientRect().exec(function () {
    cb();
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1495:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/get-params.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParams = getParams;
var _index = _interopRequireDefault(__webpack_require__(/*! ../../index.js */ 1496));
var _utils = __webpack_require__(/*! ./utils.js */ 1573);
var _paramsList = __webpack_require__(/*! ./params-list.js */ 1574);
function getParams() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = {
    on: {}
  };
  var passedParams = {};
  (0, _utils.extend)(params, _index.default.defaults);
  (0, _utils.extend)(params, _index.default.extendedDefaults);
  params._emitClasses = true;
  params.init = false;
  var rest = {};
  var allowedParams = _paramsList.paramsList.map(function (key) {
    return key.replace(/_/, '');
  });
  // Prevent empty Object.keys(obj) array on ios.
  var plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach(function (key) {
    if (typeof obj[key] === 'undefined') return;
    if (allowedParams.indexOf(key) >= 0) {
      if ((0, _utils.isObject)(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        (0, _utils.extend)(params[key], obj[key]);
        (0, _utils.extend)(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      params.on["".concat(key[2].toLowerCase()).concat(key.substr(3))] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach(function (key) {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });
  return {
    params: params,
    passedParams: passedParams,
    rest: rest
  };
}

/***/ }),

/***/ 1496:
/*!*************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Swiper", {
  enumerable: true,
  get: function get() {
    return _core.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _core.default;
  }
});
var _core = _interopRequireDefault(__webpack_require__(/*! ./libs/core.js */ 1497));
var _autoplay = _interopRequireDefault(__webpack_require__(/*! ./modules/autoplay/autoplay.js */ 1552));
var _freeMode = _interopRequireDefault(__webpack_require__(/*! ./modules/free-mode/free-mode.js */ 1553));
var _effectFade = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-fade/effect-fade.js */ 1554));
var _effectCube = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-cube/effect-cube.js */ 1558));
var _effectCoverflow = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-coverflow/effect-coverflow.js */ 1559));
var _effectFlip = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-flip/effect-flip.js */ 1560));
var _effectCards = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-cards/effect-cards.js */ 1561));
var _effectCreative = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-creative/effect-creative.js */ 1562));
var _effectPanorama = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-panorama/effect-panorama.js */ 1563));
var _effectCarousel = _interopRequireDefault(__webpack_require__(/*! ./modules/effect-carousel/effect-carousel.js */ 1564));
var _navigation = _interopRequireDefault(__webpack_require__(/*! ./modules/navigation/navigation.js */ 1565));
var _pagination = _interopRequireDefault(__webpack_require__(/*! ./modules/pagination/pagination.js */ 1566));
var _thumbs = _interopRequireDefault(__webpack_require__(/*! ./modules/thumbs/thumbs.js */ 1568));
var _scrollbar = _interopRequireDefault(__webpack_require__(/*! ./modules/scrollbar/scrollbar.js */ 1569));
var _virtual = _interopRequireDefault(__webpack_require__(/*! ./modules/virtual/virtual.js */ 1570));
var _controller = _interopRequireDefault(__webpack_require__(/*! ./modules/controller/controller.js */ 1571));
var _willChange = _interopRequireDefault(__webpack_require__(/*! ./modules/will-change/will-change.js */ 1572));
var modules = [_autoplay.default, _freeMode.default, _effectFade.default, _effectCube.default, _effectCoverflow.default, _effectFlip.default, _effectCards.default, _effectCreative.default, _effectPanorama.default, _effectCarousel.default, _navigation.default, _pagination.default, _thumbs.default, _scrollbar.default, _willChange.default, _virtual.default, _controller.default];
_core.default.use(modules);

/***/ }),

/***/ 1497:
/*!*****************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/core.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _utils = __webpack_require__(/*! ../shared/utils.js */ 1498);
var _getSupport = __webpack_require__(/*! ../shared/get-support.js */ 1499);
var _getDevice = __webpack_require__(/*! ../shared/get-device.js */ 1500);
var _getBrowser = __webpack_require__(/*! ../shared/get-browser.js */ 1501);
var _moduleExtendParams = _interopRequireDefault(__webpack_require__(/*! ./moduleExtendParams.js */ 1502));
var _eventsEmitter = _interopRequireDefault(__webpack_require__(/*! ./events-emitter.js */ 1503));
var _index = _interopRequireDefault(__webpack_require__(/*! ./update/index.js */ 1504));
var _index2 = _interopRequireDefault(__webpack_require__(/*! ./translate/index.js */ 1514));
var _index3 = _interopRequireDefault(__webpack_require__(/*! ./transition/index.js */ 1520));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults.js */ 1525));
var _index4 = _interopRequireDefault(__webpack_require__(/*! ./classes/index.js */ 1526));
var _index5 = _interopRequireDefault(__webpack_require__(/*! ./check-overflow/index.js */ 1529));
var _index6 = _interopRequireDefault(__webpack_require__(/*! ./slide/index.js */ 1530));
var _index7 = _interopRequireDefault(__webpack_require__(/*! ./loop/index.js */ 1538));
var _index8 = _interopRequireDefault(__webpack_require__(/*! ./grab-cursor/index.js */ 1542));
var _index9 = _interopRequireDefault(__webpack_require__(/*! ./events/index.js */ 1545));
var _utils2 = __webpack_require__(/*! ./utils/utils.js */ 1494);
var prototypes = {
  eventsEmitter: _eventsEmitter.default,
  update: _index.default,
  checkOverflow: _index5.default,
  slide: _index6.default,
  loop: _index7.default,
  translate: _index2.default,
  transition: _index3.default,
  grabCursor: _index8.default,
  events: _index9.default,
  classes: _index4.default
};
var extendedDefaults = {};
var Swiper = /*#__PURE__*/function () {
  function Swiper() {
    (0, _classCallCheck2.default)(this, Swiper);
    var swiper = this;
    var params;
    var el;
    var native;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else if (args.length === 2 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
      native = args[1];
    } else {
      el = args[0];
      params = args[1];
      native = args[2];
    }
    if (!params) params = {};
    params = (0, _utils.extend)({}, params);
    if (el && !params.el) params.el = el;

    // Swiper Instance
    swiper.__swiper__ = true;
    swiper.support = (0, _getSupport.getSupport)();
    swiper.device = (0, _getDevice.getDevice)({
      userAgent: params.userAgent
    });
    swiper.browser = (0, _getBrowser.getBrowser)();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = (0, _toConsumableArray2.default)(swiper.__modules__);
    swiper.native = native;
    if (params.modules && Array.isArray(params.modules)) {
      var _swiper$modules;
      (_swiper$modules = swiper.modules).push.apply(_swiper$modules, (0, _toConsumableArray2.default)(params.modules));
    }
    var allModulesParams = {};
    swiper.modules.forEach(function (mod) {
      mod({
        swiper: swiper,
        extendParams: (0, _moduleExtendParams.default)(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    }); // Extend defaults with modules params
    var swiperParams = (0, _utils.extend)({}, _defaults.default, allModulesParams); // Extend defaults with passed params
    swiper.params = (0, _utils.extend)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0, _utils.extend)({}, swiper.params);
    swiper.passedParams = (0, _utils.extend)({}, params); // add event listeners

    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(function (eventName) {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    } // Save Dom lib

    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEvents: function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        var desktop = ['pointerdown', 'pointermove', 'pointerup'];
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3]
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2]
        };
        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
      }(),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: (0, _utils.now)(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0,
      virtualList: [],
      virtualIndexList: []
    });
    swiper.emit('_swiper'); // Init

    if (swiper.params.init) {
      swiper.init();
    } // Return app instance
    return swiper;
  }
  (0, _createClass2.default)(Swiper, [{
    key: "enable",
    value: function enable() {
      var swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit('enable');
    }
  }, {
    key: "disable",
    value: function disable() {
      var swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit('disable');
    }
  }, {
    key: "setProgress",
    value: function setProgress(progress, speed) {
      var swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      var min = swiper.minTranslate();
      var max = swiper.maxTranslate();
      var current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }, {
    key: "emitContainerClasses",
    value: function emitContainerClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var cls = swiper.native.contentClass.split(' ').filter(function (className) {
        return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit('_containerClasses', cls.join(' '));
    }
  }, {
    key: "getSlideClasses",
    value: function getSlideClasses(slideEl) {
      var swiper = this;
      return slideEl.slideClass.split(' ').filter(function (className) {
        return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(' ');
    }
  }, {
    key: "emitSlidesClasses",
    value: function emitSlidesClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var updates = [];
      swiper.slides.forEach(function (slideEl) {
        var classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl: slideEl,
          classNames: classNames
        });
        swiper.emit('_slideClass', slideEl, classNames);
      });
      swiper.emit('_slideClasses', updates);
    }
  }, {
    key: "slidesPerViewDynamic",
    value: function slidesPerViewDynamic() {
      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
      var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var swiper = this;
      var params = swiper.params,
        slides = swiper.slides,
        slidesGrid = swiper.slidesGrid,
        slidesSizesGrid = swiper.slidesSizesGrid,
        swiperSize = swiper.size,
        activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        // eslint-disable-next-line
        if (view === 'current') {
          for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
            var slideInView = exact ? slidesGrid[_i2] + slidesSizesGrid[_i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          // previous
          for (var _i3 = activeIndex - 1; _i3 >= 0; _i3 -= 1) {
            var _slideInView = slidesGrid[activeIndex] - slidesGrid[_i3] < swiperSize;
            if (_slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }
      swiper.$wrapperEl.removeClass("".concat(swiper.params.containerModifierClass).concat(currentDirection));
      swiper.$wrapperEl.addClass("".concat(swiper.params.containerModifierClass).concat(newDirection));
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach(function (slideEl) {
        if (newDirection === 'vertical') {
          slideEl.css({
            width: ''
          });
        } else {
          slideEl.css({
            height: ''
          });
        }
      });
      swiper.emit('changeDirection');
      if (needUpdate) swiper.update();
      return swiper;
    }
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(el) {
        var swiper, snapGrid, params, setTranslate, translated;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setTranslate = function _setTranslate() {
                  var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                  var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                  swiper.setTranslate(newTranslate);
                  swiper.updateActiveIndex();
                  swiper.updateSlidesClasses();
                };
                swiper = this;
                if (!(!swiper || swiper.destroyed)) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                snapGrid = swiper.snapGrid, params = swiper.params; // Breakpoints
                _context.next = 7;
                return swiper.native.getRect();
              case 7:
                el = _context.sent;
                if (el) {
                  _context.next = 10;
                  break;
                }
                return _context.abrupt("return", false);
              case 10:
                Object.assign(swiper, {
                  el: el,
                  $el: swiper.native
                });
                swiper.emit('beforeUpdate');
                if (params.breakpoints) {
                  swiper.setBreakpoint();
                }
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                  setTranslate();
                  if (swiper.params.autoHeight) {
                    swiper.updateAutoHeight();
                  }
                } else {
                  if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
                    translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
                  } else {
                    translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                  }
                  if (!translated) {
                    setTranslate();
                  }
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
                  swiper.checkOverflow();
                }
                swiper.emit('update');
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function update(_x) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "mount",
    value: function () {
      var _mount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(el) {
        var swiper;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                swiper = this;
                if (!swiper.mounted) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return", true);
              case 3:
                _context2.next = 5;
                return swiper.native.getRect();
              case 5:
                el = _context2.sent;
                if (el) {
                  _context2.next = 8;
                  break;
                }
                return _context2.abrupt("return", false);
              case 8:
                swiper.emit('beforeMount'); // Set breakpoint
                // let $wrapperEl = new DomSimulation(swiper.native);
                // let $el = new DomSimulation(swiper.native);
                // if (swiper.native && swiper.native.children && swiper.native.children.length) {
                // 	swiper.native.children.forEach((item) => {
                // 		item.$itemEl = new ChildDomSimulation(item);
                // 	})
                // }
                Object.assign(swiper, {
                  $el: swiper.native,
                  el: el,
                  $wrapperEl: swiper.native,
                  wrapperEl: swiper.native,
                  mounted: true
                });
                return _context2.abrupt("return", true);
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function mount(_x2) {
        return _mount.apply(this, arguments);
      }
      return mount;
    }()
  }, {
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(el) {
        var swiper, mounted;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                swiper = this;
                if (!swiper.initialized) {
                  _context3.next = 3;
                  break;
                }
                return _context3.abrupt("return", swiper);
              case 3:
                _context3.next = 5;
                return swiper.mount(el);
              case 5:
                mounted = _context3.sent;
                if (!(mounted === false)) {
                  _context3.next = 8;
                  break;
                }
                return _context3.abrupt("return", swiper);
              case 8:
                swiper.emit('beforeInit'); // Set breakpoint

                swiper.addClasses(); // Create loop

                if (swiper.params.loop) {
                  swiper.loopCreate();
                } // Update size

                swiper.updateSize(); // Update slides

                swiper.updateSlides();
                if (swiper.params.watchOverflow) {
                  swiper.checkOverflow();
                } // Set Grab Cursor

                if (swiper.params.grabCursor && swiper.enabled) {
                  swiper.setGrabCursor();
                }

                // if (swiper.params.loop) {
                // 	swiper.on("update", () => {
                // 		swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params
                // 			.runCallbacksOnInit,
                // 			false, true);
                // 	})
                // } else {
                // 	swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                // } // Attach events
                // Slide To Initial Slide
                if (swiper.params.loop) {
                  swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true);
                } else {
                  swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                }
                swiper.attachEvents(); // Init Flag
                swiper.initialized = true; // Emit
                swiper.emit('init');
                swiper.emit('afterInit');
                return _context3.abrupt("return", swiper);
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function init(_x3) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var params = swiper.params,
        $el = swiper.$el,
        $wrapperEl = swiper.$wrapperEl,
        slides = swiper.slides;
      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }
      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles

      swiper.emit('destroy'); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        (0, _utils.deleteProps)(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
  }], [{
    key: "extendDefaults",
    value: function extendDefaults(newDefaults) {
      (0, _utils.extend)(extendedDefaults, newDefaults);
    }
  }, {
    key: "extendedDefaults",
    get: function get() {
      return extendedDefaults;
    }
  }, {
    key: "defaults",
    get: function get() {
      return _defaults.default;
    }
  }, {
    key: "installModule",
    value: function installModule(mod) {
      if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
      var modules = Swiper.prototype.__modules__;
      if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
  }, {
    key: "use",
    value: function use(module) {
      if (Array.isArray(module)) {
        module.forEach(function (m) {
          return Swiper.installModule(m);
        });
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  }]);
  return Swiper;
}();
Object.keys(prototypes).forEach(function (prototypeGroup) {
  Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
var _default = Swiper;
exports.default = _default;

/***/ }),

/***/ 1498:
/*!********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/utils.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateCSSModeScroll = animateCSSModeScroll;
exports.deleteProps = deleteProps;
exports.extend = extend;
exports.getTranslate = getTranslate;
exports.isObject = isObject;
exports.nextTick = nextTick;
exports.now = now;
exports.setCSSProperty = setCSSProperty;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function deleteProps(obj) {
  var object = obj;
  Object.keys(object).forEach(function (key) {
    try {
      object[key] = null;
    } catch (e) {// no getter for object
    }
    try {
      delete object[key];
    } catch (e) {// something got wrong
    }
  });
}
function getTranslate(el) {
  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
  var curTransform;
  if (axis === 'x') {
    curTransform = el.translate;
  }
  if (axis === 'y') {
    curTransform = el.translate;
  }
  return curTransform || 0;
}
function isObject(o) {
  return (0, _typeof2.default)(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function now() {
  return Date.now();
}
function nextTick(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return setTimeout(callback, delay);
}
function extend() {
  var to = Object(arguments.length <= 0 ? undefined : arguments[0]);
  var noExtend = ['__proto__', 'constructor', 'prototype'];
  for (var i = 1; i < arguments.length; i += 1) {
    var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (nextSource !== undefined && nextSource !== null) {
      var keysArray = Object.keys(Object(nextSource)).filter(function (key) {
        return noExtend.indexOf(key) < 0;
      });
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  var swiper = _ref.swiper,
    targetPosition = _ref.targetPosition,
    side = _ref.side;
  var window = getWindow();
  var startPosition = -swiper.translate;
  var startTime = null;
  var time;
  var duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  var dir = targetPosition > startPosition ? 'next' : 'prev';
  var isOutOfBound = function isOutOfBound(current, target) {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  var animate = function animate() {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    var easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    var currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo((0, _defineProperty2.default)({}, side, currentPosition));
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(function () {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo((0, _defineProperty2.default)({}, side, currentPosition));
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}

/***/ }),

/***/ 1499:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/get-support.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupport = getSupport;
var support;
function getMobile() {
  if (navigator.userAgent.indexOf('Mobile') > -1) {
    return true;
  } else {
    return false;
  }
}
function calcSupport() {
  return {
    smoothScroll: true,
    touch: true,
    passiveListener: function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          }
        });
      } catch (e) {// No support
      }
      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return false;
    }()
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

/***/ }),

/***/ 15:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1500:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/get-device.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevice = getDevice;
var _getSupport = __webpack_require__(/*! ./get-support.js */ 1499);
var deviceCached;
function calcDevice() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    userAgent = _ref.userAgent;
  var support = (0, _getSupport.getSupport)();
  var device = {
    ios: false,
    android: false
  };
  var res = uni.getSystemInfoSync();
  if (res.platform == "android") {
    device.os = 'android';
    device.android = true;
  }
  if (res.platform == "ios") {
    device.os = 'ios';
    device.ios = true;
  } // Export object

  return device;
}
function getDevice() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1501:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/get-browser.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowser = getBrowser;
var browser;
function calcBrowser() {
  function isSafari() {
    var res = uni.getSystemInfoSync();
    return res.model;
  }
  return {
    isSafari: isSafari(),
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(isSafari())
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 1502:
/*!*******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/moduleExtendParams.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moduleExtendParams;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _utils = __webpack_require__(/*! ../shared/utils.js */ 1498);
function moduleExtendParams(params, allModulesParams) {
  return function extendParams() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var moduleParamName = Object.keys(obj)[0];
    var moduleParams = obj[moduleParamName];
    if ((0, _typeof2.default)(moduleParams) !== 'object' || moduleParams === null) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if ((0, _typeof2.default)(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0, _utils.extend)(allModulesParams, obj);
  };
}

/***/ }),

/***/ 1503:
/*!***************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events-emitter.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
/* eslint-disable no-underscore-dangle */
var _default = {
  on: function on(events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once: function once(events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') return self;
    function onceHandler() {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny: function onAny(handler, priority) {
    var self = this;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny: function offAny(handler) {
    var self = this;
    if (!self.eventsAnyListeners) return self;
    var index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off: function off(events, handler) {
    var self = this;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(function (event) {
      // self.native.off(event, handler);
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit: function emit() {
    var self = this;
    if (!self.eventsListeners) return self;
    var events;
    var data;
    var context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      // console.log(event)
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(function (eventHandler) {
          eventHandler.apply(context, [event].concat((0, _toConsumableArray2.default)(data)));
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
exports.default = _default;

/***/ }),

/***/ 1504:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _updateSize = _interopRequireDefault(__webpack_require__(/*! ./updateSize.js */ 1505));
var _updateSlides = _interopRequireDefault(__webpack_require__(/*! ./updateSlides.js */ 1506));
var _updateAutoHeight = _interopRequireDefault(__webpack_require__(/*! ./updateAutoHeight.js */ 1507));
var _updateSlidesOffset = _interopRequireDefault(__webpack_require__(/*! ./updateSlidesOffset.js */ 1508));
var _updateSlidesProgress = _interopRequireDefault(__webpack_require__(/*! ./updateSlidesProgress.js */ 1509));
var _updateProgress = _interopRequireDefault(__webpack_require__(/*! ./updateProgress.js */ 1510));
var _updateSlidesClasses = _interopRequireDefault(__webpack_require__(/*! ./updateSlidesClasses.js */ 1511));
var _updateActiveIndex = _interopRequireDefault(__webpack_require__(/*! ./updateActiveIndex.js */ 1512));
var _updateClickedSlide = _interopRequireDefault(__webpack_require__(/*! ./updateClickedSlide.js */ 1513));
var _default = {
  updateSize: _updateSize.default,
  updateSlides: _updateSlides.default,
  updateAutoHeight: _updateAutoHeight.default,
  updateSlidesOffset: _updateSlidesOffset.default,
  updateSlidesProgress: _updateSlidesProgress.default,
  updateProgress: _updateProgress.default,
  updateSlidesClasses: _updateSlidesClasses.default,
  updateActiveIndex: _updateActiveIndex.default,
  updateClickedSlide: _updateClickedSlide.default
};
exports.default = _default;

/***/ }),

/***/ 1505:
/*!******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateSize.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSize;
function updateSize() {
  var swiper = this;
  var width;
  var height;
  var el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.width;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.height;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  } // Subtract paddings
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height
  });
}

/***/ }),

/***/ 1506:
/*!********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateSlides.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlides;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function updateSlides() {
  var swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    } // prettier-ignore

    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node[getDirectionLabel(label)] || 0);
  }
  function getComputedStyle(native) {
    return native.itemStyle;
  }
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl,
    swiperSize = swiper.size,
    rtl = swiper.rtlTranslate,
    wrongRTL = swiper.wrongRTL;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  // const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
  var slides = swiper.slides;
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];
  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.slidesGrid.length;
  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  }
  swiper.virtualSize = -spaceBetween; // reset margins

  if (params.centeredSlides && params.cssMode) {
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', '');
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', '');
  }
  var gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }
  var slideSize;
  var shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(function (key) {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  Array.apply(void 0, (0, _toConsumableArray2.default)(Array(slidesLength))).forEach( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(item, i) {
      var slide, slideStyles, currentTransform, currentWebKitTransform, width, paddingLeft, paddingRight, marginLeft, marginRight, boxSizing;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              slideSize = 0;
              slide = slides[i];
              if (gridEnabled) {
                swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
              }
              if (params.slidesPerView === 'auto') {
                if (shouldResetSlideSize) {
                  slides[i].style[getDirectionLabel('width')] = "";
                }
                slideStyles = getComputedStyle(slide);
                currentTransform = slide.itemStyle.transform;
                currentWebKitTransform = slide.itemStyle.webkitTransform;
                if (currentTransform) {
                  slide.itemStyle.transform = 'none';
                }
                if (currentWebKitTransform) {
                  slide.itemStyle.webkitTransform = 'none';
                }
                if (params.roundLengths) {
                  slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                } else {
                  width = swiper.isHorizontal() ? slide.width : slide.height;
                  paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
                  paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
                  marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
                  marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
                  boxSizing = slideStyles['box-sizing'];
                  if (boxSizing && boxSizing === 'border-box') {
                    slideSize = width + marginLeft + marginRight;
                  } else {
                    // slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
                    slideSize = width;
                  }
                }
                if (currentTransform) {
                  slide.itemStyle.transform = currentTransform;
                }
                if (currentWebKitTransform) {
                  slide.itemStyle.webkitTransform = currentWebKitTransform;
                }
                if (params.roundLengths) slideSize = Math.floor(slideSize);
              } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                slides[i] && slides[i].css((0, _defineProperty2.default)({}, getDirectionLabel('width'), "".concat(slideSize, "px")));
              }
              if (slides[i]) {
                slides[i].swiperSlideSize = slideSize;
              }
              if (params.autoHeight) {
                slides[i] && slides[i].css({
                  height: 'auto'
                });
              }
              slidesSizesGrid.push(slideSize);
              if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
              } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
              }
              swiper.virtualSize += slideSize + spaceBetween;
              prevSlideSize = slideSize;
              index += 1;
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({
      width: "".concat(swiper.virtualSize + params.spaceBetween, "px")
    });
  }
  if (params.setWrapperSize) {
    $wrapperEl.css((0, _defineProperty2.default)({}, getDirectionLabel('width'), "".concat(swiper.virtualSize + params.spaceBetween, "px")));
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  } // Remove last grid elements depending on width

  if (!params.centeredSlides) {
    var newSlidesGrid = [];
    for (var i = 0; i < snapGrid.length; i += 1) {
      var slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (params.spaceBetween !== 0) {
    var key = swiper.isHorizontal() && rtl ? 'margin-left' : getDirectionLabel('margin-right');
    slides.filter(function (_, slideIndex) {
      if (!params.cssMode) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(function (item) {
      item.css((0, _defineProperty2.default)({}, key, "".concat(spaceBetween, "px")));
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    var allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    var maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map(function (snap) {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    var _allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      _allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    _allSlidesSize -= params.spaceBetween;
    if (_allSlidesSize < swiperSize) {
      var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
      snapGrid.forEach(function (snap, snapIndex) {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach(function (snap, snapIndex) {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-before', "".concat(-snapGrid[0], "px"));
    (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-centered-offset-after', "".concat(swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2, "px"));
    var addToSnapGrid = -swiper.snapGrid[0];
    var addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(function (v) {
      return v + addToSnapGrid;
    });
    swiper.slidesGrid = swiper.slidesGrid.map(function (v) {
      return v + addToSlidesGrid;
    });
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  return slides;
}

/***/ }),

/***/ 1507:
/*!************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateAutoHeight.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateAutoHeight;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
function updateAutoHeight(_x) {
  return _updateAutoHeight.apply(this, arguments);
}
function _updateAutoHeight() {
  _updateAutoHeight = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(speed) {
    var swiper, activeSlides, isVirtual, newHeight, i, getSlideByIndex, index, size, height;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            swiper = this;
            activeSlides = [];
            isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            newHeight = 0;
            if (typeof speed === 'number') {
              swiper.setTransition(speed);
            } else if (speed === true) {
              swiper.setTransition(swiper.params.speed);
            }
            getSlideByIndex = function getSlideByIndex(index) {
              if (isVirtual) {
                return swiper.slides.filter(function (el) {
                  return parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index;
                })[0];
              }
              return swiper.slides[index];
            }; // Find slides currently in view
            if (!(swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1)) {
              _context.next = 22;
              break;
            }
            if (!swiper.params.centeredSlides) {
              _context.next = 11;
              break;
            }
            swiper.visibleSlides.each(function (slide) {
              activeSlides.push(slide);
            });
            _context.next = 20;
            break;
          case 11:
            i = 0;
          case 12:
            if (!(i < Math.ceil(swiper.params.slidesPerView))) {
              _context.next = 20;
              break;
            }
            index = swiper.activeIndex + i;
            if (!(index > swiper.slides.length && !isVirtual)) {
              _context.next = 16;
              break;
            }
            return _context.abrupt("break", 20);
          case 16:
            activeSlides.push(getSlideByIndex(index));
          case 17:
            i += 1;
            _context.next = 12;
            break;
          case 20:
            _context.next = 23;
            break;
          case 22:
            activeSlides.push(getSlideByIndex(swiper.activeIndex));
          case 23:
            i = 0;
          case 24:
            if (!(i < activeSlides.length)) {
              _context.next = 34;
              break;
            }
            if (!(typeof activeSlides[i] !== 'undefined')) {
              _context.next = 31;
              break;
            }
            _context.next = 28;
            return activeSlides[i].getSize();
          case 28:
            size = _context.sent;
            height = size.height;
            newHeight = height > newHeight ? height : newHeight;
          case 31:
            i += 1;
            _context.next = 24;
            break;
          case 34:
            // Update Height

            if (newHeight || newHeight === 0) swiper.$wrapperEl.css({
              height: "".concat(newHeight ? newHeight : '', "px")
            });
          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _updateAutoHeight.apply(this, arguments);
}

/***/ }),

/***/ 1508:
/*!**************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateSlidesOffset.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlidesOffset;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
function updateSlidesOffset() {
  return _updateSlidesOffset.apply(this, arguments);
}
function _updateSlidesOffset() {
  _updateSlidesOffset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var swiper, slides, i, offset;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            swiper = this;
            slides = swiper.slides;
            for (i = 0; i < slides.length; i += 1) {
              offset = (slides[i].swiperSlideSize + swiper.params.spaceBetween) * slides[i].index;
              slides[i].swiperSlideOffset = swiper.isHorizontal() ? offset : offset;
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _updateSlidesOffset.apply(this, arguments);
}

/***/ }),

/***/ 1509:
/*!****************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateSlidesProgress.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlidesProgress;
function updateSlidesProgress() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
  var swiper = this;
  var params = swiper.params;
  var slides = swiper.slides,
    rtl = swiper.rtlTranslate,
    snapGrid = swiper.snapGrid;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined' || typeof slides[slides.length - 1].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  var offsetCenter = -translate;
  if (rtl) offsetCenter = translate; // Visible Slides

  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];

  // slides.forEach((item)=>)

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var slideBefore = -(offsetCenter - slideOffset);
    var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
      slides[i].addClass(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

/***/ }),

/***/ 1510:
/*!**********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateProgress.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateProgress;
function updateProgress(translate) {
  var swiper = this;
  if (typeof translate === 'undefined') {
    var multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  var params = swiper.params;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress,
    isBeginning = swiper.isBeginning,
    isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Object.assign(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

/***/ }),

/***/ 1511:
/*!***************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateSlidesClasses.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateSlidesClasses;
function updateSlidesClasses() {
  var swiper = this;
  var slides = swiper.slides,
    params = swiper.params,
    $wrapperEl = swiper.$wrapperEl,
    activeIndex = swiper.activeIndex,
    realIndex = swiper.realIndex;
  if (!slides.length || !$wrapperEl) return;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  for (var i = 0; i < slides.length; i++) {
    slides[i].removeClass("".concat(params.slideActiveClass, " ").concat(params.slideNextClass, " ").concat(params.slidePrevClass, " ").concat(params.slideDuplicateActiveClass, " ").concat(params.slideDuplicateNextClass, " ").concat(params.slideDuplicatePrevClass));
  }
  var activeSlide;
  if (isVirtual) {
    // activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
    activeSlide = slides[slides.findIndex(function (item) {
      return item.dataSwiperSlideIndex == activeIndex;
    })];
  } else {
    activeSlide = slides[activeIndex];
  } // Active classes

  if (!activeSlide) return;
  activeSlide.addClass(params.slideActiveClass);
  if (params.loop) {
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      // $wrapperEl.children[realIndex].addClass(params.slideDuplicateActiveClass);
      var index = slides.findIndex(function (item) {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == realIndex;
      });
      slides[index] && slides[index].addClass(params.slideDuplicateActiveClass);
    } else {
      // $wrapperEl.children[realIndex].addClass(params.slideDuplicateActiveClass);
      var _index = slides.findIndex(function (item) {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == realIndex;
      });
      slides[_index] && slides[_index].addClass(params.slideDuplicateActiveClass);
    }
  } // Next Slide

  var nextSlide = activeSlide.nextAll(".".concat(params.slideClass))[0];
  if (nextSlide) {
    nextSlide.addClass(params.slideNextClass);
  } else {
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide
  }

  var prevSlide = activeSlide.prevAll(".".concat(params.slideClass))[0];
  if (prevSlide) {
    prevSlide.addClass(params.slidePrevClass);
  } else {
    if (params.loop && !prevSlide) {
      prevSlide = slides[slides.length - 1];
      prevSlide.addClass(params.slidePrevClass);
    }
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      // $wrapperEl.children(
      // 	nextSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicateNextClass);

      var _index2 = slides.findIndex(function (item) {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == nextSlide.dataSwiperSlideIndex;
      });
      slides[_index2] && slides[_index2].addClass(params.slideDuplicateNextClass);
    } else {
      // $wrapperEl.children(
      // 	nextSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicateNextClass);

      var _index3 = slides.findIndex(function (item) {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == nextSlide.dataSwiperSlideIndex;
      });
      slides[_index3] && slides[_index3].addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      // $wrapperEl.children(
      // 	prevSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicatePrevClass);
      var _index4 = slides.findIndex(function (item) {
        return !item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == prevSlide.dataSwiperSlideIndex;
      });
      slides[_index4] && slides[_index4].addClass(params.slideDuplicatePrevClass);
    } else {
      // $wrapperEl.children(
      // 	prevSlide.dataSwiperSlideIndex
      // ).addClass(params.slideDuplicatePrevClass);
      var _index5 = slides.findIndex(function (item) {
        return item.hasClass(params.slideDuplicateClass) && item.dataSwiperSlideIndex == prevSlide.dataSwiperSlideIndex;
      });
      slides[_index5] && slides[_index5].addClass(params.slideDuplicatePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}

/***/ }),

/***/ 1512:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateActiveIndex.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateActiveIndex;
function updateActiveIndex(newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid,
    snapGrid = swiper.snapGrid,
    params = swiper.params,
    previousIndex = swiper.activeIndex,
    previousRealIndex = swiper.realIndex,
    previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    } // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (swiper.loopedSlides) {
    swiper.slides.filter(function (item) {
      return item.index >= swiper.loopedSlides && item.index < swiper.slides.length - swiper.loopedSlides;
    }).forEach(function (item, index) {
      item.dataSwiperSlideIndex = item.index - swiper.loopedSlides;
    });
    swiper.slides.filter(function (item) {
      return item.index < swiper.loopedSlides;
    }).forEach(function (item, index) {
      if (swiper.slides[swiper.slides.length - swiper.loopedSlides * 3 + index]) {
        item.dataSwiperSlideIndex = swiper.slides[swiper.slides.length - swiper.loopedSlides * 3 + index].index;
      }
    });
    swiper.slides.filter(function (item) {
      return item.index >= swiper.slides.length - swiper.loopedSlides;
    }).forEach(function (item, index) {
      item.dataSwiperSlideIndex = swiper.slides[index].index;
    });
  }
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  } // Get real index

  var realIndex;
  if (swiper.virtual && params.virtual.enabled) {
    realIndex = activeIndex;
  } else {
    if (swiper.slides[activeIndex].dataSwiperSlideIndex == undefined || swiper.slides[activeIndex].dataSwiperSlideIndex == null) {
      realIndex = activeIndex;
    } else {
      realIndex = swiper.slides[activeIndex].dataSwiperSlideIndex;
    }
  }
  Object.assign(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit('slideChange', activeIndex);
  }
}

/***/ }),

/***/ 1513:
/*!**************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/update/updateClickedSlide.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateClickedSlide;
function updateClickedSlide(e) {
  var swiper = this;
  var params = swiper.params;
  var slide = swiper.slides[e];
  var slideFound = false;
  var slideIndex;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

/***/ }),

/***/ 1514:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/translate/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _getTranslate = _interopRequireDefault(__webpack_require__(/*! ./getTranslate.js */ 1515));
var _setTranslate = _interopRequireDefault(__webpack_require__(/*! ./setTranslate.js */ 1516));
var _minTranslate = _interopRequireDefault(__webpack_require__(/*! ./minTranslate.js */ 1517));
var _maxTranslate = _interopRequireDefault(__webpack_require__(/*! ./maxTranslate.js */ 1518));
var _translateTo = _interopRequireDefault(__webpack_require__(/*! ./translateTo.js */ 1519));
var _default = {
  getTranslate: _getTranslate.default,
  setTranslate: _setTranslate.default,
  minTranslate: _minTranslate.default,
  maxTranslate: _maxTranslate.default,
  translateTo: _translateTo.default
};
exports.default = _default;

/***/ }),

/***/ 1515:
/*!***********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/translate/getTranslate.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSwiperTranslate;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function getSwiperTranslate() {
  var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';
  var swiper = this;
  var params = swiper.params,
    rtl = swiper.rtlTranslate,
    translate = swiper.translate,
    $wrapperEl = swiper.$wrapperEl;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  var currentTranslate = (0, _utils.getTranslate)(swiper, axis);
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

/***/ }),

/***/ 1516:
/*!***********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/translate/setTranslate.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setTranslate;
function setTranslate(translate, byController) {
  var swiper = this;
  var rtl = swiper.rtlTranslate,
    params = swiper.params,
    $wrapperEl = swiper.$wrapperEl,
    wrapperEl = swiper.wrapperEl,
    progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;
  if (isNaN(translate)) {
    return;
  }
  if (!$wrapperEl) return;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    $wrapperEl.transform("translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)"));
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

/***/ }),

/***/ 1517:
/*!***********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/translate/minTranslate.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = minTranslate;
function minTranslate() {
  return -this.snapGrid[0];
}

/***/ }),

/***/ 1518:
/*!***********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/translate/maxTranslate.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = maxTranslate;
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

/***/ }),

/***/ 1519:
/*!**********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/translate/translateTo.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = translateTo;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function translateTo() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var translateBounds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var internal = arguments.length > 4 ? arguments[4] : undefined;
  var swiper = this;
  var timer;
  var params = swiper.params,
    wrapperEl = swiper.wrapperEl;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  var minTranslate = swiper.minTranslate();
  var maxTranslate = swiper.maxTranslate();
  var newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate; // Update progress

  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, (0, _defineProperty2.default)(_wrapperEl$scrollTo, isH ? 'left' : 'top', -newTranslate), (0, _defineProperty2.default)(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          clearTimeout(timer);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      timer = setTimeout(function () {
        swiper.onTranslateToWrapperTransitionEnd();
      }, speed);
    }
  }
  return true;
}

/***/ }),

/***/ 1520:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/transition/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setTransition = _interopRequireDefault(__webpack_require__(/*! ./setTransition.js */ 1521));
var _transitionStart = _interopRequireDefault(__webpack_require__(/*! ./transitionStart.js */ 1522));
var _transitionEnd = _interopRequireDefault(__webpack_require__(/*! ./transitionEnd.js */ 1524));
var _default = {
  setTransition: _setTransition.default,
  transitionStart: _transitionStart.default,
  transitionEnd: _transitionEnd.default
};
exports.default = _default;

/***/ }),

/***/ 1521:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/transition/setTransition.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setTransition;
function setTransition(duration, byController) {
  var swiper = this;
  if (!swiper.$wrapperEl) return;
  if (!swiper.params.cssMode) {
    swiper.$wrapperEl.transition(duration);
  }
  swiper.emit('setTransition', duration, byController);
}

/***/ }),

/***/ 1522:
/*!***************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/transition/transitionStart.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionStart;
var _transitionEmit = _interopRequireDefault(__webpack_require__(/*! ./transitionEmit.js */ 1523));
function transitionStart() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  (0, _transitionEmit.default)({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'Start'
  });
}

/***/ }),

/***/ 1523:
/*!**************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/transition/transitionEmit.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionEmit;
function transitionEmit(_ref) {
  var swiper = _ref.swiper,
    runCallbacks = _ref.runCallbacks,
    direction = _ref.direction,
    step = _ref.step;
  var activeIndex = swiper.activeIndex,
    previousIndex = swiper.previousIndex;
  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit("transition".concat(step));
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit("slideResetTransition".concat(step));
      return;
    }
    swiper.emit("slideChangeTransition".concat(step));
    if (dir === 'next') {
      swiper.emit("slideNextTransition".concat(step));
    } else {
      swiper.emit("slidePrevTransition".concat(step));
    }
  }
}

/***/ }),

/***/ 1524:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/transition/transitionEnd.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transitionEnd;
var _transitionEmit = _interopRequireDefault(__webpack_require__(/*! ./transitionEmit.js */ 1523));
function transitionEnd() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  (0, _transitionEmit.default)({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'End'
  });
}

/***/ }),

/***/ 1525:
/*!*********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/defaults.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  virtualList: [],
  virtualIndexList: [],
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // Images
  preloadImages: true,
  updateOnImagesReady: true,
  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,
  loopPreventsSlide: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: false,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',
  slideThumbsClass: 'swiper-slide-thumb',
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false,
  willChange: false
};
exports.default = _default;

/***/ }),

/***/ 1526:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/classes/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addClasses = _interopRequireDefault(__webpack_require__(/*! ./addClasses.js */ 1527));
var _removeClasses = _interopRequireDefault(__webpack_require__(/*! ./removeClasses.js */ 1528));
var _default = {
  addClasses: _addClasses.default,
  removeClasses: _removeClasses.default
};
exports.default = _default;

/***/ }),

/***/ 1527:
/*!*******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/classes/addClasses.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClasses;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function prepareClasses(entries, prefix) {
  var resultClasses = [];
  entries.forEach(function (item) {
    if ((0, _typeof2.default)(item) === 'object') {
      Object.keys(item).forEach(function (classNames) {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  var swiper = this;
  var classNames = swiper.classNames,
    params = swiper.params,
    rtl = swiper.rtl,
    $el = swiper.$el,
    device = swiper.device,
    support = swiper.support; // prettier-ignore

  var suffixes = prepareClasses(['initialized', params.direction, {
    'pointer-events': !support.touch
  }, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }], params.containerModifierClass);
  classNames.push.apply(classNames, (0, _toConsumableArray2.default)(suffixes));
  $el.addClass((0, _toConsumableArray2.default)(classNames).join(' '));
  swiper.emitContainerClasses();
}

/***/ }),

/***/ 1528:
/*!**********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/classes/removeClasses.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClasses;
function removeClasses() {
  var swiper = this;
  var $el = swiper.$el,
    classNames = swiper.classNames;
  $el.removeClass(classNames.join(' '));
  swiper.emitContainerClasses();
}

/***/ }),

/***/ 1529:
/*!*********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/check-overflow/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked,
    params = swiper.params;
  var slidesOffsetBefore = params.slidesOffsetBefore;
  if (slidesOffsetBefore) {
    var lastSlideIndex = swiper.slides.length - 1;
    var lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var _default = {
  checkOverflow: checkOverflow
};
exports.default = _default;

/***/ }),

/***/ 1530:
/*!************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slideTo = _interopRequireDefault(__webpack_require__(/*! ./slideTo.js */ 1531));
var _slideToLoop = _interopRequireDefault(__webpack_require__(/*! ./slideToLoop.js */ 1532));
var _slideNext = _interopRequireDefault(__webpack_require__(/*! ./slideNext.js */ 1533));
var _slidePrev = _interopRequireDefault(__webpack_require__(/*! ./slidePrev.js */ 1534));
var _slideReset = _interopRequireDefault(__webpack_require__(/*! ./slideReset.js */ 1535));
var _slideToClosest = _interopRequireDefault(__webpack_require__(/*! ./slideToClosest.js */ 1536));
var _slideToClickedSlide = _interopRequireDefault(__webpack_require__(/*! ./slideToClickedSlide.js */ 1537));
var _default = {
  slideTo: _slideTo.default,
  slideToLoop: _slideToLoop.default,
  slideNext: _slideNext.default,
  slidePrev: _slidePrev.default,
  slideReset: _slideReset.default,
  slideToClosest: _slideToClosest.default,
  slideToClickedSlide: _slideToClickedSlide.default
};
exports.default = _default;

/***/ }),

/***/ 1531:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slideTo.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideTo;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function slideTo() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var initial = arguments.length > 4 ? arguments[4] : undefined;
  if (typeof index !== 'number' && typeof index !== 'string') {
    throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [".concat((0, _typeof2.default)(index), "] given."));
  }
  if (typeof index === 'string') {
    /**
     * The `index` argument converted from `string` to `number`.
     * @type {number}
     */
    var indexAsNumber = parseInt(index, 10);
    /**
     * Determines whether the `index` argument is a valid `number`
     * after being converted from the `string` type.
     * @type {boolean}
     */

    var isValidNumber = isFinite(indexAsNumber);
    if (!isValidNumber) {
      throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [".concat(index, "] given."));
    } // Knowing that the converted `index` is a valid number,
    // we can update the original argument's value.

    index = indexAsNumber;
  }
  var swiper = this;
  var slideIndex = index;
  var timer;
  if (slideIndex < 0) slideIndex = 0;
  var params = swiper.params,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    previousIndex = swiper.previousIndex,
    activeIndex = swiper.activeIndex,
    rtl = swiper.rtlTranslate,
    wrapperEl = swiper.wrapperEl,
    enabled = swiper.enabled;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }
  var translate = -snapGrid[snapIndex]; // Update progress

  swiper.updateProgress(translate); // Normalize slideIndex

  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      var normalizedTranslate = -Math.floor(translate * 100);
      var normalizedGrid = Math.floor(slidesGrid[i] * 100);
      var normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  } // Directions locks

  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) return false;
    }
  }
  var direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset'; // Update Index

  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex); // Update Height

    if (params.autoHeight) {
      setTimeout(function () {
        swiper.updateAutoHeight();
      }, 0);
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    var t = rtl ? translate : -translate;
    if (speed === 0) {
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      if (isVirtual) {
        requestAnimationFrame(function () {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._swiperImmediateVirtual = false;
        });
      }
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, (0, _defineProperty2.default)(_wrapperEl$scrollTo, isH ? 'left' : 'top', t), (0, _defineProperty2.default)(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        clearTimeout(timer);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    timer = setTimeout(function () {
      if (swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd();
      }
    }, speed);
  }
  return true;
}

/***/ }),

/***/ 1532:
/*!******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slideToLoop.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideToLoop;
function slideToLoop() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var swiper = this;
  var newIndex = index;
  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 1533:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slideNext.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideNext;
function slideNext() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var animating = swiper.animating,
    enabled = swiper.enabled,
    params = swiper.params;
  if (!enabled) return swiper;
  var perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    swiper.loopFix();
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  setTimeout(function () {
    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }, 0);
  return true;
}

/***/ }),

/***/ 1534:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slidePrev.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slidePrev;
function slidePrev() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var params = swiper.params,
    animating = swiper.animating,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return swiper;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return false;
    swiper.loopFix();
  }
  var translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  var normalizedTranslate = normalize(translate);
  var normalizedSnapGrid = snapGrid.map(function (val) {
    return normalize(val);
  });
  var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && params.cssMode) {
    var prevSnapIndex;
    snapGrid.forEach(function (snap, snapIndex) {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  var prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    return swiper.slideTo(swiper.slides.length - 1, speed, runCallbacks, internal);
  }
  setTimeout(function () {
    swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }, 30);
  return true;
}

/***/ }),

/***/ 1535:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slideReset.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideReset;
function slideReset() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

/***/ }),

/***/ 1536:
/*!*********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slideToClosest.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideToClosest;
/* eslint no-unused-vars: "off" */
function slideToClosest() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var threshold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
  var swiper = this;
  var index = swiper.activeIndex;
  var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    var currentSnap = swiper.snapGrid[snapIndex];
    var nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    var prevSnap = swiper.snapGrid[snapIndex - 1];
    var _currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

/***/ }),

/***/ 1537:
/*!**************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/slide/slideToClickedSlide.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = slideToClickedSlide;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function slideToClickedSlide() {
  var swiper = this;
  var params = swiper.params,
    $wrapperEl = swiper.$wrapperEl;
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  if (params.loop) {
    if (swiper.animating) return;
    // realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    realIndex = parseInt(swiper.activeIndex, 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children(".".concat(params.slideClass, "[data-swiper-slide-index=\"").concat(realIndex, "\"]:not(.").concat(params.slideDuplicateClass, ")")).eq(0).index();
        (0, _utils.nextTick)(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl.children(".".concat(params.slideClass, "[data-swiper-slide-index=\"").concat(realIndex, "\"]:not(.").concat(params.slideDuplicateClass, ")")).eq(0).index();
      (0, _utils.nextTick)(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

/***/ }),

/***/ 1538:
/*!***********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/loop/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _loopCreate = _interopRequireDefault(__webpack_require__(/*! ./loopCreate.js */ 1539));
var _loopFix = _interopRequireDefault(__webpack_require__(/*! ./loopFix.js */ 1540));
var _loopDestroy = _interopRequireDefault(__webpack_require__(/*! ./loopDestroy.js */ 1541));
var _default = {
  loopCreate: _loopCreate.default,
  loopFix: _loopFix.default,
  loopDestroy: _loopDestroy.default
};
exports.default = _default;

/***/ }),

/***/ 1539:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/loop/loopCreate.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopCreate;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
function loopCreate() {
  var swiper = this;
  var params = swiper.params,
    $wrapperEl = swiper.$wrapperEl,
    native = swiper.native; // Remove duplicated slides
  var $selector = $wrapperEl;
  var slides = native.children;
  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
    if (blankSlidesNum !== params.slidesPerGroup) {
      native.loopBlankShow = true;
      native.loopBlankNumber = blankSlidesNum;
    }
  }
  if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
  swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }
  var prependSlides = [];
  var appendSlides = [];
  slides.forEach(function (el, index) {
    var slide = el;
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
      prependSlides.push(el);
    }
    if (index < swiper.loopedSlides) {
      appendSlides.push(el);
    }
  });
  var list = (0, _toConsumableArray2.default)(swiper.native.value);
  var newList = (0, _toConsumableArray2.default)(list);
  swiper.originalDataList = (0, _toConsumableArray2.default)(swiper.native.value);
  for (var i = 0; i < appendSlides.length; i += 1) {
    newList.push(list[appendSlides[i].index]);
  }
  for (var _i = prependSlides.length - 1; _i >= 0; _i -= 1) {
    newList.unshift(list[prependSlides[_i].index]);
  }
  swiper.native.$emit("input", newList);
  return true;
}

/***/ }),

/***/ 1540:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/loop/loopFix.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopFix;
function loopFix() {
  var swiper = this;
  swiper.emit('beforeLoopFix');
  var activeIndex = swiper.activeIndex,
    slides = swiper.slides,
    loopedSlides = swiper.loopedSlides,
    allowSlidePrev = swiper.allowSlidePrev,
    allowSlideNext = swiper.allowSlideNext,
    snapGrid = swiper.snapGrid,
    rtl = swiper.rtlTranslate;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  var snapTranslate = -snapGrid[activeIndex];
  var diff = snapTranslate - swiper.getTranslate();
  if (activeIndex < loopedSlides) {
    newIndex = slides.length - loopedSlides * 3 + activeIndex;
    newIndex += loopedSlides;
    var slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  } else if (activeIndex >= slides.length - loopedSlides) {
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    var _slideChanged = swiper.slideTo(newIndex, 0, false, true);
    if (_slideChanged && diff !== 0) {
      swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  swiper.emit('loopFix');
}

/***/ }),

/***/ 1541:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/loop/loopDestroy.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loopDestroy;
function loopDestroy() {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl,
    params = swiper.params,
    slides = swiper.slides;
}

/***/ }),

/***/ 1542:
/*!******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/grab-cursor/index.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _setGrabCursor = _interopRequireDefault(__webpack_require__(/*! ./setGrabCursor.js */ 1543));
var _unsetGrabCursor = _interopRequireDefault(__webpack_require__(/*! ./unsetGrabCursor.js */ 1544));
var _default = {
  setGrabCursor: _setGrabCursor.default,
  unsetGrabCursor: _unsetGrabCursor.default
};
exports.default = _default;

/***/ }),

/***/ 1543:
/*!**************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/grab-cursor/setGrabCursor.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setGrabCursor;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function setGrabCursor(moving) {
  var _el$setCss;
  var swiper = this;
  if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  var el = swiper.params.touchEventsTarget === 'container' ? swiper.$el : swiper.$wrapperEl;
  el.setCss((_el$setCss = {
    cursor: 'move'
  }, (0, _defineProperty2.default)(_el$setCss, "cursor", moving ? '-webkit-grabbing' : '-webkit-grab'), (0, _defineProperty2.default)(_el$setCss, "cursor", moving ? '-moz-grabbin' : '-moz-grab'), (0, _defineProperty2.default)(_el$setCss, "cursor", moving ? 'grabbing' : 'grab'), _el$setCss));
}

/***/ }),

/***/ 1544:
/*!****************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/grab-cursor/unsetGrabCursor.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unsetGrabCursor;
function unsetGrabCursor() {
  var swiper = this;
  if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? '$el' : '$wrapperEl'].setCss({
    cursor: ''
  });
}

/***/ }),

/***/ 1545:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _onTouchStart = _interopRequireDefault(__webpack_require__(/*! ./onTouchStart.js */ 1546));
var _onTouchMove = _interopRequireDefault(__webpack_require__(/*! ./onTouchMove.js */ 1547));
var _onTouchEnd = _interopRequireDefault(__webpack_require__(/*! ./onTouchEnd.js */ 1548));
var _onResize = _interopRequireDefault(__webpack_require__(/*! ./onResize.js */ 1549));
var _onClick = _interopRequireDefault(__webpack_require__(/*! ./onClick.js */ 1550));
var _onScroll = _interopRequireDefault(__webpack_require__(/*! ./onScroll.js */ 1551));
var dummyEventAttached = false;
function dummyEventListener() {}
var events = function events(swiper, method) {
  var params = swiper.params,
    touchEvents = swiper.touchEvents,
    wrapperEl = swiper.wrapperEl,
    device = swiper.device,
    support = swiper.support;
  var el = swiper.native;
  var capture = !!params.nested;
  var domMethod = method === 'on' ? 'on' : 'off';
  var swiperMethod = method;
  if (!support.touch) {
    var desktopMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    if (document.querySelector("#".concat(swiper.$el.swiperElId))) {
      document.querySelector("#".concat(swiper.$el.swiperElId))[desktopMethod](touchEvents.start, swiper.onTouchStart, false);
    }
    document[desktopMethod](touchEvents.move, swiper.onTouchMove, capture);
    document[desktopMethod](touchEvents.end, swiper.onTouchEnd, false);
  } else {
    var passiveListener = touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize.default, true);
  } else {
    swiper[swiperMethod]('observerUpdate', _onResize.default, true);
  }
};
function attachEvents() {
  var swiper = this;
  var params = swiper.params,
    support = swiper.support;
  swiper.onTouchStart = _onTouchStart.default.bind(swiper);
  swiper.onTouchMove = _onTouchMove.default.bind(swiper);
  swiper.onTouchEnd = _onTouchEnd.default.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = _onScroll.default.bind(swiper);
  }
  swiper.onClick = _onClick.default.bind(swiper);
  events(swiper, 'on');
}
function detachEvents() {
  var swiper = this;
  events(swiper, 'off');
}
var _default = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};
exports.default = _default;

/***/ }),

/***/ 1546:
/*!********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/onTouchStart.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTouchStart;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function onTouchStart(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  data.isTouchEvent = e.type === 'touchstart' || e.type === 'touchStart' || e.type === 'onTouchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
  if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return; // change target el for shadow root component

  var swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  var noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass);
  var isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$targetEl.closest(params.swipeHandler)[0]) return;
  }
  touches.currentX = e.type === 'touchstart' || e.type === 'touchStart' || e.type === 'onTouchstart' ? e.touches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' || e.type === 'touchStart' || e.type === 'onTouchstart' ? e.touches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;
  var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0, _utils.now)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  // if (e.type !== 'touchstart' && e.type !== 'touchStart') {
  // let preventDefault = true;
  // if ($targetEl.is(data.focusableElements)) preventDefault = false;

  // const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

  // if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
  // e.preventDefault();
  // }
  // }

  swiper.emit('touch-start', e);
}

/***/ }),

/***/ 1547:
/*!*******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/onTouchMove.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTouchMove;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function onTouchMove(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  if (data.isTouchEvent && e.type !== 'touchmove' && e.type !== 'touchMove' && e.type !== 'onTouchmove') return;
  var targetTouch = (e.type === 'touchmove' || e.type === 'touchMove' || e.type === 'onTouchmove') && e.touches && (e.touches[0] || e.changedTouches[0]);
  var pageX = e.type === 'touchmove' || e.type === 'touchMove' || e.type === 'onTouchmove' ? targetTouch.pageX : e.pageX;
  var pageY = e.type === 'touchmove' || e.type === 'touchMove' || e.type === 'onTouchmove' ? targetTouch.pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    swiper.allowClick = false;
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0, _utils.now)();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }

  // if (data.isTouchEvent && document.activeElement) {
  //   if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
  //     data.isMoved = true;
  //     swiper.allowClick = false;
  //     return;
  //   }
  // }

  if (data.allowTouchCallbacks) {
    swiper.emit('touch-move', e);
  }
  if (e.touches && e.touches.length > 1) return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  if (!data.isMoved) {
    if (params.loop && !params.cssMode) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.emit('transitionend', [swiper]);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  var diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) diff = -diff;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;
  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}

/***/ }),

/***/ 1548:
/*!******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/onTouchEnd.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTouchEnd;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function onTouchEnd(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    slidesGrid = swiper.slidesGrid,
    enabled = swiper.enabled;
  if (!enabled) return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit('touch-end', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  var touchEndTime = (0, _utils.now)();
  var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

  if (swiper.allowClick) {
    var pathTree = e.path || e.composedPath && e.composedPath();
    // swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = (0, _utils.now)();
  (0, _utils.nextTick)(function () {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos: currentPos
    });
    return;
  }
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    var _increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + _increment] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + _increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + _increment] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment);else swiper.slideTo(stopIndex);
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

/***/ }),

/***/ 1549:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/onResize.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onResize;
function onResize() {
  var swiper = this;
  var params = swiper.params,
    el = swiper.el;
  if (el && el.offsetWidth === 0) return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  var allowSlideNext = swiper.allowSlideNext,
    allowSlidePrev = swiper.allowSlidePrev,
    snapGrid = swiper.snapGrid;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    swiper.slideTo(swiper.activeIndex, 0, false, true);
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    swiper.autoplay.run();
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

/***/ }),

/***/ 1550:
/*!***************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/onClick.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onClick;
function onClick(e) {
  var swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

/***/ }),

/***/ 1551:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/events/onScroll.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onScroll;
function onScroll() {
  var swiper = this;
  var wrapperEl = swiper.wrapperEl,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  } // eslint-disable-next-line

  if (swiper.translate === -0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

/***/ }),

/***/ 1552:
/*!*********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/autoplay/autoplay.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Autoplay;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function Autoplay(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var timeout;
  swiper.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  function run() {
    var $activeSlideEl = swiper.slides[swiper.activeIndex];
    var delay = swiper.params.autoplay.delay;
    clearTimeout(timeout);
    timeout = (0, _utils.nextTick)(function () {
      var autoplayResult;
      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.isBeginning) {
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          emit('autoplay');
        } else {
          stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        setTimeout(function () {
          autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        }, 30);
        emit('autoplay');
      } else if (!swiper.isEnd) {
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }
      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }
  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (swiper.autoplay.running) return false;
    swiper.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }
  function stop() {
    if (!swiper.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    swiper.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }
  function pause(speed) {
    if (!swiper.autoplay.running) return;
    if (swiper.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    swiper.autoplay.paused = true;
    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      run();
    } else {
      ['transitionEnd', 'webkitTransitionEnd'].forEach(function (event) {
        swiper.on(event, onTransitionEnd);
      });
    }
  }
  function onVisibilityChange() {
    // const document = getDocument();

    // if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
    // 	pause();
    // }

    // if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
    // 	run();
    // 	swiper.autoplay.paused = false;
    // }
  }
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
    // if (e.target !== swiper.$wrapperEl[0]) return;
    ['transitionEnd', 'webkitTransitionEnd'].forEach(function (event) {
      swiper.off(event, onTransitionEnd);
    });
    swiper.autoplay.paused = false;
    if (!swiper.autoplay.running) {
      stop();
    } else {
      run();
    }
  }
  function onMouseEnter() {
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      pause();
    }

    // ['transitionend', 'webkitTransitionEnd'].forEach(event => {
    // 	swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    // });
  }

  function onMouseLeave() {
    if (swiper.params.autoplay.disableOnInteraction) {
      return;
    }
    swiper.autoplay.paused = false;
    run();
  }
  function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {}
  }
  function detachMouseEvents() {}
  on('init update', function () {
    if (swiper.params.autoplay.enabled) {
      start();
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', function (_s, speed, internal) {
    if (swiper.autoplay.running) {
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        swiper.autoplay.pause(speed);
      } else {
        if (!swiper.params.loop) {
          stop();
        }
      }
    }
  });
  on('sliderFirstMove', function () {
    if (swiper.autoplay.running) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touch-end', function () {
    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
      run();
    }
  });
  on('destroy', function () {
    detachMouseEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  Object.assign(swiper.autoplay, {
    pause: pause,
    run: run,
    start: start,
    stop: stop
  });
}

/***/ }),

/***/ 1553:
/*!***********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/free-mode/free-mode.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = freeMode;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function freeMode(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    emit = _ref.emit,
    once = _ref.once;
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchMove() {
    var data = swiper.touchEventsData,
      touches = swiper.touches; // Velocity

    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0, _utils.now)()
    });
  }
  function onTouchEnd(_ref2) {
    var currentPos = _ref2.currentPos;
    var params = swiper.params,
      $wrapperEl = swiper.$wrapperEl,
      rtl = swiper.rtlTranslate,
      snapGrid = swiper.snapGrid,
      data = swiper.touchEventsData; // Time diff

    var touchEndTime = (0, _utils.now)();
    var timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();
        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        } // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.

        if (time > 150 || (0, _utils.now)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeMode.momentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;
      var newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      var needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', function () {
          swiper.loopFix();
        });
      } // Fix duration

      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(function () {
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            }, momentumDuration);
          }, 0);
        }, momentumDuration);
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          }, momentumDuration);
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }
  });
}

/***/ }),

/***/ 1554:
/*!***************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-fade/effect-fade.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectFade;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 1556));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 1557));
function EffectFade(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    fadeEffect: {
      crossFade: false,
      transformEl: null
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides;
    var params = swiper.params.fadeEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = swiper.slides[i];
      var offset = $slideEl.swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl.progress), 0) : 1 + Math.min(Math.max($slideEl.progress, -1), 0);
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.css({
        opacity: slideOpacity
      });
      $targetEl.transform("translate3d(".concat(tx, "px, ").concat(ty, "px, 0px)"));
      if (swiper.params.willChange) {
        $targetEl.willChange("opacity");
      }
      slides[i].addClass('swiper-slide-fade');
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.fadeEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl,
      allSlides: true
    });
  };
  (0, _effectInit.default)({
    effect: 'fade',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 1555:
/*!**************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/effect-init.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = effectInit;
function effectInit(params) {
  var effect = params.effect,
    swiper = params.swiper,
    on = params.on,
    setTranslate = params.setTranslate,
    setTransition = params.setTransition,
    overwriteParams = params.overwriteParams,
    perspective = params.perspective;
  on('beforeInit', function () {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass).concat(effect));
    if (perspective && perspective()) {
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
    }
    var overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate', function () {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
}

/***/ }),

/***/ 1556:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/effect-target.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = effectTarget;
function effectTarget(effectParams, $slideEl) {
  if (effectParams.transformEl) {
    return $slideEl.find(effectParams.transformEl).css({
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden'
    });
  }
  return $slideEl;
}

/***/ }),

/***/ 1557:
/*!********************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/effect-virtual-transition-end.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = effectVirtualTransitionEnd;
function effectVirtualTransitionEnd(_ref) {
  var swiper = _ref.swiper,
    duration = _ref.duration,
    transformEl = _ref.transformEl,
    allSlides = _ref.allSlides;
  var slides = swiper.slides,
    activeIndex = swiper.activeIndex,
    $wrapperEl = swiper.$wrapperEl;
  if (swiper.params.virtualTranslate && duration !== 0) {
    (function () {
      var eventTriggered = false;
      var $transitionEndTarget;
      if (allSlides) {
        $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
      } else {
        $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides[activeIndex];
      }
      for (var i = 0; i < $transitionEndTarget.length; i += 1) {
        $transitionEndTarget[i].transitionEnd(function () {
          if (eventTriggered) return;
          if (!swiper || swiper.destroyed) return;
          eventTriggered = true;
          swiper.animating = false;
          // const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          swiper.emit('transitionEnd');
          // for (let i = 0; i < triggerEvents.length; i += 1) {
          // 	$wrapperEl.trigger(triggerEvents[i]);
          // }
        }, duration);
      }
    })();
  }
}

/***/ }),

/***/ 1558:
/*!***************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-cube/effect-cube.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCube;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
function EffectCube(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  var setTranslate = function setTranslate() {
    var $el = swiper.$el,
      $wrapperEl = swiper.$wrapperEl,
      slides = swiper.slides,
      swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      rtl = swiper.rtlTranslate,
      swiperSize = swiper.size,
      browser = swiper.browser;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        // $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
        if (!swiper.native.cubeShadowShowWrapper) {
          swiper.$wrapperEl.updateData({
            cubeShadowShowWrapper: true
          });
        }
        swiper.$wrapperEl.cubeShadowCss({
          height: "".concat(swiperWidth, "px")
        });
      } else {
        if (!swiper.native.cubeShadowShowRoot) {
          swiper.$wrapperEl.updateData({
            cubeShadowShowRoot: true
          });
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides[i];
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(swiper.activeIndex, 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min($slideEl.progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      var transform = "rotateX(".concat(isHorizontal ? 0 : -slideAngle, "deg) rotateY(").concat(isHorizontal ? slideAngle : 0, "deg) translate3d(").concat(tx, "px, ").concat(ty, "px, ").concat(tz, "px)");
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      $slideEl.transform(transform);
      // if (params.slideShadows) {
      // 	// Set shadows
      // 	let shadowBefore = isHorizontal ?
      // 		$slideEl.find('.swiper-slide-shadow-left') :
      // 		$slideEl.find('.swiper-slide-shadow-top');
      // 	let shadowAfter = isHorizontal ?
      // 		$slideEl.find('.swiper-slide-shadow-right') :
      // 		$slideEl.find('.swiper-slide-shadow-bottom');
      // 	if (shadowBefore.length === 0) {
      // 		shadowBefore = $(
      // 			`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`,
      // 		);
      // 		$slideEl.append(shadowBefore);
      // 	}
      // 	if (shadowAfter.length === 0) {
      // 		shadowAfter = $(
      // 			`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`,
      // 		);
      // 		$slideEl.append(shadowAfter);
      // 	}
      // 	if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
      // 	if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      // }
      $slideEl.addClass('swiper-slide-cube');
    }
    $wrapperEl.css({
      '-webkit-transform-origin': "50% 50% -".concat(swiperSize / 2, "px"),
      'transform-origin': "50% 50% -".concat(swiperSize / 2, "px")
    });
    if (params.shadow) {
      if (isHorizontal) {
        swiper.$wrapperEl.cubeShadowTransform("translate3d(0px, ".concat(swiperWidth / 2 + params.shadowOffset, "px, ").concat(-swiperWidth / 2, "px) rotateX(90deg) rotateZ(0deg) scale(").concat(params.shadowScale, ")"));
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        swiper.$wrapperEl.cubeShadowTransform("scale3d(".concat(scale1, ", 1, ").concat(scale2, ") translate3d(0px, ").concat(swiperHeight / 2 + offset, "px, ").concat(-swiperHeight / 2 / scale2, "px) rotateX(-90deg)"));
      }
    }
    var zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
    $wrapperEl.transform("translate3d(0px,0,".concat(zFactor, "px) rotateX(").concat(swiper.isHorizontal() ? 0 : wrapperRotate, "deg) rotateY(").concat(swiper.isHorizontal() ? -wrapperRotate : 0, "deg)"));
  };
  var setTransition = function setTransition(duration) {
    var $el = swiper.$el,
      slides = swiper.slides;
    for (var i = 0; i < slides.length; i++) {
      slides[i].transition(duration);
    }
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      swiper.$wrapperEl.cubeShadowTransition(duration);
    }
  };
  (0, _effectInit.default)({
    effect: 'cube',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      };
    }
  });
}

/***/ }),

/***/ 1559:
/*!*************************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-coverflow/effect-coverflow.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCoverflow;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 1556));
function EffectCoverflow(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true,
      transformEl: null
    }
  });
  var setTranslate = function setTranslate() {
    var swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      slides = swiper.slides,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth; // Each slide offset from center

    for (var i = 0, length = slides.length; i < length; i += 1) {
      var $slideEl = slides[i];
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl.swiperSlideOffset;
      var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

      var translateZ = -translate * Math.abs(offsetMultiplier);
      var stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      var translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      var translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      var scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      var slideTransform = "translate3d(".concat(translateX, "px,").concat(translateY, "px,").concat(translateZ, "px)  rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg) scale(").concat(scale, ")");
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(slideTransform);
      $slideEl.css({
        zIndex: -Math.abs(Math.round(offsetMultiplier)) + 1
      });
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      $slideEl.addClass('swiper-slide-coverflow');
      // if (params.slideShadows) {
      //   // Set shadows
      //   let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
      //   let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

      //   if ($shadowBeforeEl.length === 0) {
      //     $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
      //   }

      //   if ($shadowAfterEl.length === 0) {
      //     $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
      //   }

      //   if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
      //   if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      // }
    }
  };

  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.coverflowEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i++) {
      $transitionElements[i].transition(duration);
    }
  };
  (0, _effectInit.default)({
    effect: 'coverflow',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true
      };
    }
  });
}

/***/ }),

/***/ 1560:
/*!***************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-flip/effect-flip.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectFlip;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 1556));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 1557));
function EffectFlip(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
      transformEl: null
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      rtl = swiper.rtlTranslate;
    var params = swiper.params.flipEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides[i];
      var progress = $slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl.progress, 1), -1);
      }
      var offset = $slideEl.swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      $slideEl.css({
        zIndex: -Math.abs(Math.round(progress)) + slides.length
      });
      // if (params.slideShadows) {
      //   // Set shadows
      //   let shadowBefore = swiper.isHorizontal()
      //     ? $slideEl.find('.swiper-slide-shadow-left')
      //     : $slideEl.find('.swiper-slide-shadow-top');
      //   let shadowAfter = swiper.isHorizontal()
      //     ? $slideEl.find('.swiper-slide-shadow-right')
      //     : $slideEl.find('.swiper-slide-shadow-bottom');
      //   if (shadowBefore.length === 0) {
      //     shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
      //   }
      //   if (shadowAfter.length === 0) {
      //     shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
      //   }
      //   if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
      //   if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
      // }
      var transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0px) rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg)");
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(transform);
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      slides[i].addClass('swiper-slide-flip');
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.flipEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl
    });
  };
  (0, _effectInit.default)({
    effect: 'flip',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 1561:
/*!*****************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-cards/effect-cards.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCards;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 1556));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 1557));
function EffectCards(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cardsEffect: {
      slideShadows: true,
      transformEl: null,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      activeIndex = swiper.activeIndex;
    var params = swiper.params.cardsEffect;
    var _swiper$touchEventsDa = swiper.touchEventsData,
      startTranslate = _swiper$touchEventsDa.startTranslate,
      isTouched = _swiper$touchEventsDa.isTouched;
    var currentTranslate = swiper.translate;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides[i];
      var slideProgress = $slideEl.progress;
      var progress = Math.min(Math.max(slideProgress, -4), 4);
      var offset = $slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.$wrapperEl.transform("translateX(".concat(swiper.minTranslate(), "px)"));
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides.swiperSlideOffset;
      }
      var tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var tY = 0;
      var tZ = -100 * Math.abs(progress);
      var scale = 1;
      var rotate = -params.perSlideRotate * progress;
      var tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      var isSwipeToNext = (i === activeIndex || i === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      var isSwipeToPrev = (i === activeIndex || i === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        var subProgress = Math.pow(1 - Math.abs((Math.abs(progress) - 0.5) / 0.5), 0.5);
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = "".concat(-25 * subProgress * Math.abs(progress), "%");
      }
      if (progress < 0) {
        // next
        tX = "calc(".concat(tX, "px + (").concat(tXAdd * Math.abs(progress), "%))");
      } else if (progress > 0) {
        // prev
        tX = "calc(".concat(tX, "px + (-").concat(tXAdd * Math.abs(progress), "%))");
      } else {
        tX = "".concat(tX, "px");
      }
      if (!swiper.isHorizontal()) {
        var prevY = tY;
        tY = tX;
        tX = prevY;
      }
      var scaleString = progress < 0 ? "".concat(1 + (1 - scale) * progress) : "".concat(1 - (1 - scale) * progress);
      var transform = "translate3d(".concat(tX, ", ").concat(tY, ", ").concat(tZ, "px) rotateZ(").concat(params.rotate ? rotate : 0, "deg) scale(").concat(scaleString, ")");
      $slideEl.css({
        zIndex: -Math.abs(Math.round(slideProgress)) + slides.length
      });
      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(transform);
      if (swiper.params.willChange) {
        $targetEl.willChange("transform");
      }
      slides[i].addClass('swiper-slide-cards');
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.cardsEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl
    });
  };
  (0, _effectInit.default)({
    effect: 'cards',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 1562:
/*!***********************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-creative/effect-creative.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCreative;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 1556));
var _effectVirtualTransitionEnd = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-virtual-transition-end.js */ 1557));
function EffectCreative(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    creativeEffect: {
      transformEl: null,
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  var getTranslateValue = function getTranslateValue(value) {
    if (typeof value === 'string') return value;
    return "".concat(value, "px");
  };
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      $wrapperEl = swiper.$wrapperEl,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.creativeEffect;
    var multiplier = params.progressMultiplier;
    var isCenteredSlides = swiper.params.centeredSlides;
    if (isCenteredSlides) {
      var margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      $wrapperEl.transform("translateX(calc(50% - ".concat(margin, "px))"));
    }
    var _loop = function _loop(i) {
      var $slideEl = slides[i];
      var slideProgress = $slideEl.progress;
      var progress = Math.min(Math.max($slideEl.progress, -params.limitProgress), params.limitProgress);
      var originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max($slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      var offset = $slideEl.swiperSlideOffset;
      var t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      var r = [0, 0, 0];
      var custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      var data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      // set translate
      t.forEach(function (value, index) {
        t[index] = "calc(".concat(value, "px + (").concat(getTranslateValue(data.translate[index]), " * ").concat(Math.abs(progress * multiplier), "))");
      });
      // set rotates
      r.forEach(function (value, index) {
        r[index] = data.rotate[index] * Math.abs(progress * multiplier);
      });

      // $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      $slideEl.css({
        zIndex: -Math.abs(Math.round(slideProgress)) + slides.length
      });
      var translateString = t.join(', ');
      var rotateString = "rotateX(".concat(r[0], "deg) rotateY(").concat(r[1], "deg) rotateZ(").concat(r[2], "deg)");
      var scaleString = originalProgress < 0 ? "scale(".concat(1 + (1 - data.scale) * originalProgress * multiplier, ")") : "scale(".concat(1 - (1 - data.scale) * originalProgress * multiplier, ")");
      var opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      var transform = "translate3d(".concat(translateString, ") ").concat(rotateString, " ").concat(scaleString);

      // Set shadows
      // if ((custom && data.shadow) || !custom) {
      //   let $shadowEl = $slideEl.children('.swiper-slide-shadow');
      //   if ($shadowEl.length === 0 && data.shadow) {
      //     $shadowEl = createShadow(params, $slideEl);
      //   }
      //   if ($shadowEl.length) {
      //     const shadowOpacity = params.shadowPerProgress
      //       ? progress * (1 / params.limitProgress)
      //       : progress;
      //     $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
      //   }
      // }

      var $targetEl = (0, _effectTarget.default)(params, $slideEl);
      $targetEl.transform(transform);
      $targetEl.css({
        opacity: opacityString
      });
      if (data.origin) {
        $targetEl.css({
          'transform-origin': data.origin
        });
      }
      if (swiper.params.willChange) {
        slides[i].willChange("transform,opacity");
      }
      slides[i].addClass('swiper-slide-creative');
    };
    for (var i = 0; i < slides.length; i += 1) {
      _loop(i);
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.creativeEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i += 1) {
      $transitionElements[i].transition(duration);
    }
    (0, _effectVirtualTransitionEnd.default)({
      swiper: swiper,
      duration: duration,
      transformEl: transformEl,
      allSlides: true
    });
  };
  (0, _effectInit.default)({
    effect: 'creative',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return swiper.params.creativeEffect.perspective;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

/***/ }),

/***/ 1563:
/*!***********************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-panorama/effect-panorama.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Panorama;
function Panorama(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    panorama: {
      depth: 200,
      rotate: 30,
      stretch: 1
    }
  });
  on('beforeInit', function () {
    if (swiper.params.effect !== 'panorama') return;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "panorama"));
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
    var overwriteParams = {
      watchSlidesProgress: true
    };
    Object.assign(swiper.params, overwriteParams);
    Object.assign(swiper.originalParams, overwriteParams);
  });
  on('progress', function () {
    if (swiper.params.effect !== 'panorama') return;
    var sizesGrid = swiper.slidesSizesGrid;
    var _swiper$params$panora = swiper.params.panorama,
      _swiper$params$panora2 = _swiper$params$panora.depth,
      depth = _swiper$params$panora2 === void 0 ? 200 : _swiper$params$panora2,
      _swiper$params$panora3 = _swiper$params$panora.rotate,
      rotate = _swiper$params$panora3 === void 0 ? 30 : _swiper$params$panora3,
      _swiper$params$panora4 = _swiper$params$panora.stretch,
      stretch = _swiper$params$panora4 === void 0 ? 1 : _swiper$params$panora4;
    var angleRad = rotate * Math.PI / 180;
    var halfAngleRad = angleRad / 2;
    var angleModifier = 1 / (180 / rotate);
    for (var i = 0; i < swiper.slides.length; i += 1) {
      var slideEl = swiper.slides[i];
      var slideProgress = slideEl.progress;
      var slideSize = sizesGrid[i];
      var progressModifier = swiper.params.centeredSlides ? 0 : (swiper.params.slidesPerView - 1) * 0.5;
      var modifiedProgress = slideProgress + progressModifier;
      var angleCos = 1 - Math.cos(modifiedProgress * angleModifier * Math.PI);
      var translateX = "".concat(modifiedProgress * (stretch * slideSize / 3) * angleCos, "px");
      var rotateY = modifiedProgress * rotate;
      var radius = slideSize * 0.5 / Math.sin(halfAngleRad);
      var translateZ = "".concat(radius * angleCos - depth, "px");
      slideEl.transform("translateX(".concat(translateX, ") translateZ(").concat(translateZ, ") rotateY(").concat(rotateY, "deg)"));
      if (swiper.params.willChange) {
        slideEl.willChange("transform");
      }
      slideEl.addClass('swiper-slide-panorama');
    }
  });
  on('setTransition', function (s, duration) {
    if (swiper.params.effect !== 'panorama') return;
    swiper.slides.forEach(function (slideEl) {
      slideEl.transition(duration);
    });
  });
}

/***/ }),

/***/ 1564:
/*!***********************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/effect-carousel/effect-carousel.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EffectCarousel;
var _effectInit = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-init.js */ 1555));
var _effectTarget = _interopRequireDefault(__webpack_require__(/*! ../../shared/effect-target.js */ 1556));
function EffectCarousel(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    carouselEffect: {}
  });
  var setTranslate = function setTranslate() {
    var scaleStep = 0.2;
    var zIndexMax = swiper.slides.length;
    for (var i = 0; i < swiper.slides.length; i += 1) {
      var slideEl = swiper.slides[i];
      var slideProgress = swiper.slides[i].progress;
      var absProgress = Math.abs(slideProgress);
      var modify = 1;
      if (absProgress > 1) {
        modify = (absProgress - 1) * 0.3 + 1;
      }
      var translate = "".concat(slideProgress * modify * 50, "%");
      var scale = 1 - absProgress * scaleStep;
      var zIndex = zIndexMax - Math.abs(Math.round(slideProgress));
      var slideTransform = "translateX(".concat(translate, ") scale(").concat(scale, ")");
      slideEl.transform(slideTransform);
      slideEl.css({
        zIndex: zIndex
      });
      if (absProgress > 3) {
        slideEl.css({
          opacity: 0
        });
      } else {
        slideEl.css({
          opacity: 1
        });
      }
    }
  };
  var setTransition = function setTransition(duration) {
    var transformEl = swiper.params.coverflowEffect.transformEl;
    var $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
    for (var i = 0; i < $transitionElements.length; i++) {
      $transitionElements[i].transition(duration);
    }
  };
  (0, _effectInit.default)({
    effect: 'carousel',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true
      };
    }
  });
}

/***/ }),

/***/ 1565:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/navigation/navigation.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navigation;
function Navigation(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock'
    }
  });
  swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  };
  function toggleEl($el, disabled) {
    if (!swiper.$wrapperEl) return;
    // debugger
    var params = swiper.params.navigation;
    if ($el) {
      swiper.$wrapperEl[disabled ? "add".concat($el) : "remove".concat($el)](params.disabledClass);
      if (swiper.params.watchOverflow && swiper.enabled) {
        swiper.$wrapperEl[swiper.isLocked ? "add".concat($el) : "remove".concat($el)](params.lockClass);
      }
    }
  }
  function update() {
    // Update Navigation Buttons
    if (swiper.params.loop) return;
    var _swiper$navigation = swiper.navigation,
      $nextEl = _swiper$navigation.$nextEl,
      $prevEl = _swiper$navigation.$prevEl;
    toggleEl('PrevElClass', swiper.isBeginning && !swiper.params.rewind);
    toggleEl('NextElClass', swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    // e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
  }
  function onNextClick() {
    // e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
  }
  function init() {
    var params = swiper.params.navigation;
    if (params.slot || params.custom) {
      params.nextEl = true;
      params.prevEl = true;
    }
    if (!(params.nextEl || params.prevEl) && !params.slot && !params.custom) return;
    if (params.slot) {
      swiper.native.updateData({
        showPrevButtonSlot: true,
        showNextButtonSlot: true
      });
    } else if (params.custom) {} else {
      swiper.native.updateData({
        showPrevButton: true,
        showNextButton: true
      });
    }
    var $nextEl = params.nextEl;
    var $prevEl = params.prevEl;
    if ($nextEl) {
      swiper.on('nextClick', onNextClick);
    }
    if ($prevEl) {
      swiper.on('prevClick', onPrevClick);
    }
    Object.assign(swiper.navigation, {
      $nextEl: $nextEl,
      nextEl: $nextEl,
      $prevEl: $prevEl,
      prevEl: $prevEl
    });
    if (!swiper.enabled) {
      if ($nextEl) swiper.$wrapperEl.addNextElClass(params.lockClass);
      if ($prevEl) swiper.$wrapperEl.addPrevElClass(params.lockClass);
    }
  }
  function destroy() {
    var _swiper$navigation2 = swiper.navigation,
      $nextEl = _swiper$navigation2.$nextEl,
      $prevEl = _swiper$navigation2.$prevEl;
    if ($nextEl) {
      swiper.off('nextClick', onNextClick);
      swiper.$wrapperEl.removeNextElClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl) {
      swiper.off('prevClick', onPrevClick);
      swiper.$wrapperEl.removePrevElClass(swiper.params.navigation.disabledClass);
    }
  }
  on('init', function () {
    init();
    update();
  });
  on('toEdge fromEdge lock unlock', function () {
    update();
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var _swiper$navigation3 = swiper.navigation,
      $nextEl = _swiper$navigation3.$nextEl,
      $prevEl = _swiper$navigation3.$prevEl;
    if ($nextEl) {
      swiper.$wrapperEl[swiper.enabled ? 'removeNextElClass' : 'addNextElClass'](swiper.params.navigation.lockClass);
      // $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }

    if ($prevEl) {
      swiper.$wrapperEl[swiper.enabled ? 'removePrevElClass' : 'addPrevElClass'](swiper.params.navigation.lockClass);
      // $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
    }
  });
  // on('click', (_s, e) => {
  // 	const {
  // 		$nextEl,
  // 		$prevEl
  // 	} = swiper.navigation;
  // 	const targetEl = e.target;
  // 	if (
  // 		swiper.params.navigation.hideOnClick &&
  // 		!$(targetEl).is($prevEl) &&
  // 		!$(targetEl).is($nextEl)
  // 	) {
  // 		if (
  // 			swiper.pagination &&
  // 			swiper.params.pagination &&
  // 			swiper.params.pagination.clickable &&
  // 			(swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))
  // 		)
  // 			return;
  // 		let isHidden;
  // 		if ($nextEl) {
  // 			isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
  // 		} else if ($prevEl) {
  // 			isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
  // 		}
  // 		if (isHidden === true) {
  // 			emit('navigationShow');
  // 		} else {
  // 			emit('navigationHide');
  // 		}
  // 		if ($nextEl) {
  // 			$nextEl.toggleClass(swiper.params.navigation.hiddenClass);
  // 		}
  // 		if ($prevEl) {
  // 			$prevEl.toggleClass(swiper.params.navigation.hiddenClass);
  // 		}
  // 	}
  // });

  Object.assign(swiper.navigation, {
    update: update,
    init: init,
    destroy: destroy
  });
}

/***/ }),

/***/ 1566:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/pagination/pagination.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Pagination;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classesToSelector = _interopRequireDefault(__webpack_require__(/*! ../../shared/classes-to-selector.js */ 1567));
function Pagination(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: function formatFractionCurrent(number) {
        return number;
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return number;
      },
      bulletClass: "".concat(pfx, "-bullet"),
      bulletActiveClass: "".concat(pfx, "-bullet-active"),
      modifierClass: "".concat(pfx, "-"),
      currentClass: "".concat(pfx, "-current"),
      totalClass: "".concat(pfx, "-total"),
      hiddenClass: "".concat(pfx, "-hidden"),
      progressbarFillClass: "".concat(pfx, "-progressbar-fill"),
      progressbarOppositeClass: "".concat(pfx, "-progressbar-opposite"),
      clickableClass: "".concat(pfx, "-clickable"),
      lockClass: "".concat(pfx, "-lock"),
      horizontalClass: "".concat(pfx, "-horizontal"),
      verticalClass: "".concat(pfx, "-vertical")
    }
  });
  swiper.pagination = {
    el: null,
    $el: null,
    bullets: []
  };
  var bulletSize;
  var dynamicBulletIndex = 0;
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el;
  }
  function setSideBullets($bulletEl, position) {
    var bulletActiveClass = swiper.params.pagination.bulletActiveClass;
    var bullets = swiper.pagination.bullets;
    if (bullets[$bulletEl.index + position]) {
      bullets[$bulletEl.index + position].addPaginationItemClass("".concat(bulletActiveClass, "-").concat(position > 0 ? 'next' : 'prev'));
    }
    if (bullets[$bulletEl.index + (position > 0 ? position + 1 : position - 1)]) {
      bullets[$bulletEl.index + (position > 0 ? position + 1 : position - 1)].addPaginationItemClass("".concat(bulletActiveClass, "-").concat(position > 0 ? 'next' : 'prev', "-").concat(position > 0 ? 'next' : 'prev'));
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    // Current/Total
    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
      if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
        current -= slidesLength - swiper.loopedSlides * 2;
      }
      if (current > total - 1) current -= total;
      if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;
      if (params.dynamicBullets) {
        bulletSize = bullets[0][swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'];
        swiper.$wrapperEl.paginationCss((0, _defineProperty2.default)({}, swiper.isHorizontal() ? 'width' : 'height', "".concat(bulletSize * (params.dynamicMainBullets + 4), "px")));
        if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
          dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(function (item) {
        item.removePaginationItemClass(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(function (suffix) {
          return "".concat(params.bulletActiveClass).concat(suffix);
        }).join(' '));
      });
      if ($el.length > 1) {
        bullets.each(function (bullet) {
          var $bullet = $(bullet);
          var bulletIndex = $bullet.index();
          if (bulletIndex === current) {
            $bullet.addClass(params.bulletActiveClass);
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              $bullet.addClass("".concat(params.bulletActiveClass, "-main"));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets($bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets($bullet, 'next');
            }
          }
        });
      } else {
        var $bullet = bullets[current];
        var bulletIndex = $bullet.index;
        $bullet.addPaginationItemClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          var $firstDisplayedBullet = bullets[firstIndex];
          var $lastDisplayedBullet = bullets[lastIndex];
          for (var i = firstIndex; i <= lastIndex; i += 1) {
            bullets[i].addPaginationItemClass("".concat(params.bulletActiveClass, "-main"));
          }
          if (swiper.params.loop) {
            if (bulletIndex >= bullets.length) {
              for (var _i = params.dynamicMainBullets; _i >= 0; _i -= 1) {
                bullets[bullets.length - _i].addPaginationItemClass("".concat(params.bulletActiveClass, "-main"));
              }
              bullets[bullets.length - params.dynamicMainBullets - 1].addPaginationItemClass("".concat(params.bulletActiveClass, "-prev"));
            } else {
              setSideBullets($firstDisplayedBullet, -1);
              setSideBullets($lastDisplayedBullet, 1);
            }
          } else {
            setSideBullets($firstDisplayedBullet, -1);
            setSideBullets($lastDisplayedBullet, 1);
          }
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        var offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(function (item) {
          item.setCss((0, _defineProperty2.default)({}, swiper.isHorizontal() ? offsetProp : 'top', "".concat(bulletsOffset, "px")));
        });
        // bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
      }
    }

    if (params.type === 'fraction') {
      // $el
      // 	.find(classesToSelector(params.currentClass))
      // 	.text(params.formatFractionCurrent(current + 1));
      swiper.native.paginationContent.text = params.formatFractionCurrent(current + 1);
      swiper.native.paginationContent.total = params.formatFractionTotal(total);
      swiper.native.updateData({
        paginationContent: swiper.native.paginationContent
      });
      // $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
    }

    if (params.type === 'progressbar') {
      var progressbarDirection;
      if (params.progressbarOpposite) {
        progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
      } else {
        progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
      }
      var scale = (current + 1) / total;
      var scaleX = 1;
      var scaleY = 1;
      if (progressbarDirection === 'horizontal') {
        scaleX = scale;
      } else {
        scaleY = scale;
      }
      // $el
      // .find(classesToSelector(params.progressbarFillClass))
      swiper.native.paginationContent.transform("translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(").concat(scaleY, ")"));
      swiper.native.paginationContent.transition(swiper.params.speed);
      swiper.native.updateData({
        paginationContent: swiper.native.paginationContent
      });
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      emit('paginationRender', $el[0]);
    } else {
      emit('paginationUpdate', $el[0]);
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      swiper.$wrapperEl[swiper.isLocked ? 'addPaginationClass' : 'removePaginationClass'](params.lockClass);
    }
  }
  function render() {
    // Render Container
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    var paginationHTML = 0;
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        }
        // else {
        // 	paginationHTML +=
        // 		`<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
        // }
        // paginationHTML += 1;
        else {
          swiper.native.paginationType = "bullets";
          swiper.native.paginationContent.push({
            index: i,
            outerWidth: 16,
            outerHeight: 16,
            classContent: [params.bulletClass],
            styleContent: {},
            addPaginationItemClass: function addPaginationItemClass(value) {
              this.classContent = Array.from(new Set([].concat((0, _toConsumableArray2.default)(this.classContent), (0, _toConsumableArray2.default)(value.split(" ")))));
            },
            removePaginationItemClass: function removePaginationItemClass(value) {
              this.classContent = this.classContent.filter(function (item) {
                return !value.split(" ").includes(item);
              });
            },
            setCss: function setCss(value) {
              var _this = this;
              // vueNative['itemStyle'] = {
              // 	...vueNative['itemStyle'],
              // 	...value
              // };Object.keys(value).forEach((item) => {
              Object.keys(value).forEach(function (item) {
                // this.$set(this.itemStyle, item, value[item])
                _this.styleContent[item] = value[item];
              });

              // this.$set(this.itemStyle, item, value[item])
            }
          });

          swiper.native.updateData({
            paginationType: swiper.native.paginationType,
            paginationContent: swiper.native.paginationContent
          });
        }
      }
      // $el.html(paginationHTML);

      // swiper.$wrapperEl.addPaginationItemClass(params.bulletClass)

      // swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
      swiper.pagination.bullets = swiper.native.paginationContent;
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        swiper.native.paginationType = "fraction";
        // paginationHTML =
        // 	`<span class="${params.currentClass}"></span>` +
        // 	' / ' +
        // 	`<span class="${params.totalClass}"></span>`;
        swiper.native.paginationContent = {
          currentClass: params.currentClass,
          totalClass: params.totalClass
        };
        swiper.native.updateData({
          paginationType: swiper.native.paginationType,
          paginationContent: swiper.native.paginationContent
        });
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        swiper.native.paginationType = "progressbar";
        // paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        swiper.native.paginationContent = {
          progressbarFillClass: params.progressbarFillClass,
          styleContent: {
            transform: '',
            transitionDuration: ''
          },
          transition: function transition(value) {
            this.styleContent.transitionDuration = "".concat(value, "ms");
          },
          transform: function transform(value) {
            this.styleContent.transform = value;
          }
        };
        swiper.native.updateData({
          paginationType: swiper.native.paginationType,
          paginationContent: swiper.native.paginationContent
        });
      }
      // $el.html(paginationHTML);
    }

    if (params.type !== 'custom') {
      emit('paginationRender', swiper.pagination.$el[0]);
    }
  }
  function init() {
    var params = swiper.params.pagination;
    if (!params.el) return;
    // swiper.native.showIndicators = true;
    swiper.native.updateData({
      showIndicators: true
    });
    var $el = params.el;
    if (params.type === 'bullets' && params.clickable) {
      swiper.$wrapperEl.addPaginationClass(params.clickableClass);
    }
    swiper.$wrapperEl.addPaginationClass(params.modifierClass + params.type);
    swiper.$wrapperEl.addPaginationClass(params.modifierClass + swiper.params.direction);
    if (params.type === 'bullets' && params.dynamicBullets) {
      swiper.$wrapperEl.addPaginationClass("".concat(params.modifierClass).concat(params.type, "-dynamic"));
      dynamicBulletIndex = 0;
      if (params.dynamicMainBullets < 1) {
        params.dynamicMainBullets = 1;
      }
    }
    if (params.type === 'progressbar' && params.progressbarOpposite) {
      swiper.$wrapperEl.addPaginationClass(params.progressbarOppositeClass);
    }
    if (params.clickable) {
      swiper.on('paginationItemClick', function onClick(_s, itemIndex) {
        var index = itemIndex * swiper.params.slidesPerGroup;
        if (swiper.params.loop) index += swiper.loopedSlides;
        swiper.slideTo(index);
      });
    }
    Object.assign(swiper.pagination, {
      $el: $el,
      el: $el
    });
    if (!swiper.enabled) {
      swiper.$wrapperEl.addPaginationClass(params.lockClass);
    }
  }
  function destroy() {
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var $el = swiper.pagination.$el;
    if (params.clickable) {
      swiper.off('paginationItemClick', (0, _classesToSelector.default)(params.bulletClass));
    }
  }
  on('init update', function () {
    if (swiper.native.paginationContent) {
      swiper.native.updateData({
        paginationContent: []
      });
    }
    // swiper.native.paginationContent = [];
    init();
    render();
    update();
  });
  on('activeIndexChange', function () {
    if (swiper.params.loop) {
      update();
    } else if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', function () {
    if (!swiper.params.loop) {
      update();
    }
  });
  on('slidesLengthChange', function () {
    if (swiper.params.loop) {
      render();
      update();
    }
  });
  on('snapGridLengthChange', function () {
    if (!swiper.params.loop) {
      render();
      update();
    }
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var $el = swiper.pagination.$el;
    if ($el) {
      swiper.$wrapperEl[swiper.enabled ? 'removePaginationClass' : 'addPaginationClass'](swiper.params.pagination.lockClass);
    }
  });
  on('lock unlock', function () {
    update();
  });
  on('click', function (_s, e) {
    var targetEl = e.target;
    var $el = swiper.pagination.$el;
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !$(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      var isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      $el.toggleClass(swiper.params.pagination.hiddenClass);
    }
  });
  Object.assign(swiper.pagination, {
    render: render,
    update: update,
    init: init,
    destroy: destroy
  });
}

/***/ }),

/***/ 1567:
/*!**********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/shared/classes-to-selector.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = classesToSelector;
function classesToSelector() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return ".".concat(classes.trim().replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.'));
}

/***/ }),

/***/ 1568:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/thumbs/thumbs.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Thumb;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
// import $ from '../../shared/dom.js';

function Thumb(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  var initialized = false;
  var swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function onThumbClick() {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    var clickedIndex = thumbsSwiper.clickedIndex;
    var clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    var slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      var currentIndex = swiper.activeIndex;
      if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
        swiper.loopFix();
        // eslint-disable-next-line
        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        currentIndex = swiper.activeIndex;
      }
      var prevIndex = swiper.slides.eq(currentIndex).prevAll("[data-swiper-slide-index=\"".concat(slideToIndex, "\"]")).eq(0).index();
      var nextIndex = swiper.slides.eq(currentIndex).nextAll("[data-swiper-slide-index=\"".concat(slideToIndex, "\"]")).eq(0).index();
      if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;else slideToIndex = prevIndex;
    }
    swiper.slideTo(slideToIndex);
  }
  function init() {
    var thumbsParams = swiper.params.thumbs;
    if (initialized) return false;
    initialized = true;
    var SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
    } else if ((0, _utils.isObject)(thumbsParams.swiper)) {
      var thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.$el && swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('slideClick', onThumbClick);
    return true;
  }
  function update(initial) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
    var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      var currentThumbsIndex = thumbsSwiper.activeIndex;
      var newThumbsIndex;
      var direction;
      if (thumbsSwiper.params.loop) {
        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
          thumbsSwiper.loopFix();
          // eslint-disable-next-line
          thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
          currentThumbsIndex = thumbsSwiper.activeIndex;
        }
        // Find actual thumbs index to slide to
        var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll("[data-swiper-slide-index=\"".concat(swiper.realIndex, "\"]")).eq(0).index();
        var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll("[data-swiper-slide-index=\"".concat(swiper.realIndex, "\"]")).eq(0).index();
        if (typeof prevThumbsIndex === 'undefined') {
          newThumbsIndex = nextThumbsIndex;
        } else if (typeof nextThumbsIndex === 'undefined') {
          newThumbsIndex = prevThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
        } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
          newThumbsIndex = nextThumbsIndex;
        } else {
          newThumbsIndex = prevThumbsIndex;
        }
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {
          // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }

    // Activate thumbs
    var thumbsToActivate = 1;
    var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    // thumbsSwiper.slides.removeClass(thumbActiveClass);
    thumbsSwiper.slides.forEach(function (item) {
      item.addClass(swiper.params.slideThumbsClass);
      item.removeClass(thumbActiveClass);
    });
    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (var i = 0; i < thumbsToActivate; i += 1) {
        thumbsSwiper.$wrapperEl.children("[data-swiper-slide-index=\"".concat(swiper.realIndex + i, "\"]")).addClass(thumbActiveClass);
      }
    } else {
      for (var _i = 0; _i < thumbsToActivate; _i += 1) {
        thumbsSwiper.slides[swiper.realIndex + _i].addClass(thumbActiveClass);
      }
    }
  }
  on('beforeInit', function () {
    var thumbs = swiper.params.thumbs;
    if (!thumbs || !thumbs.swiper) return;
    init();
    update(true);
  });
  on('slideChange update resize observerUpdate', function () {
    if (!swiper.thumbs.swiper) return;
    update();
  });
  on('setTransition', function (_s, duration) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', function () {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper) return;
    if (swiperCreated && thumbsSwiper) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init: init,
    update: update
  });
}

/***/ }),

/***/ 1569:
/*!***********************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/scrollbar/scrollbar.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Scrollbar;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function Scrollbar(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var isTouched = false;
  var timeout = null;
  var dragTimeout = null;
  var dragStartPos;
  var dragSize;
  var trackSize;
  var divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag'
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null,
    $el: null,
    $dragEl: null
  };
  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate,
      progress = swiper.progress;
    var params = swiper.params.scrollbar;
    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      swiper.$wrapperEl.scrollbarItemTransform("translate3d(".concat(newPos, "px, 0, 0)"));
      swiper.$wrapperEl.scrollbarItemCss({
        width: "".concat(newSize, "px")
      });
    } else {
      swiper.$wrapperEl.scrollbarItemTransform("translate3d(0px, ".concat(newPos, "px, 0)"));
      swiper.$wrapperEl.scrollbarItemCss({
        height: "".concat(newSize, "px")
      });
    }
    if (params.hide) {
      clearTimeout(timeout);
      swiper.$wrapperEl.scrollbarCss({
        opacity: 1
      });
      timeout = setTimeout(function () {
        swiper.$wrapperEl.scrollbarCss({
          opacity: 0
        });
        swiper.$wrapperEl.scrollbarTransition(400);
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.$wrapperEl.scrollbarItemTransition(duration);
  }
  function updateSize() {
    return _updateSize.apply(this, arguments);
  }
  function _updateSize() {
    _updateSize = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var scrollbar, $el, methods, rectInfo;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!swiper.params.scrollbar.el || !swiper.scrollbar.el)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              scrollbar = swiper.scrollbar;
              $el = scrollbar.$el, methods = scrollbar.methods;
              swiper.$wrapperEl.scrollbarItemCss({
                width: '',
                height: ''
              });
              _context2.next = 7;
              return swiper.native.getRectScrollbar();
            case 7:
              rectInfo = _context2.sent;
              methods.offset = function () {
                return rectInfo;
              };
              trackSize = swiper.isHorizontal() ? rectInfo.width : rectInfo.height;
              divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
              if (swiper.params.scrollbar.dragSize === 'auto') {
                dragSize = trackSize * divider;
              } else {
                dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
              }
              if (swiper.isHorizontal()) {
                swiper.$wrapperEl.scrollbarItemCss({
                  width: "".concat(dragSize, "px")
                });
              } else {
                swiper.$wrapperEl.scrollbarItemCss({
                  height: "".concat(dragSize, "px")
                });
              }
              if (divider >= 1) {
                swiper.$wrapperEl.scrollbarCss({
                  display: 'none'
                });
              } else {
                swiper.$wrapperEl.scrollbarCss({
                  display: ''
                });
              }
              if (swiper.params.scrollbar.hide) {
                swiper.$wrapperEl.scrollbarCss({
                  opacity: 0
                });
              }
              if (swiper.params.watchOverflow && swiper.enabled) {
                swiper.$wrapperEl[swiper.isLocked ? 'addScrollbarClass' : 'removeScrollbarClass'](swiper.params.scrollbar.lockClass);
              }
            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _updateSize.apply(this, arguments);
  }
  function getPointerPosition(e) {
    if (swiper.isHorizontal()) {
      return e.type === 'touchstart' || e.type === 'touchmove' || 'touchStart' || e.type === 'touchMove' ? e.touches[0].clientX : e.clientX;
    }
    return e.type === 'touchstart' || e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
  }
  function setDragPosition(e) {
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate;
    var $el = scrollbar.$el,
      methods = scrollbar.methods;
    var positionRatio;
    positionRatio = (getPointerPosition(e) - methods.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }
    var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(_s, e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      $wrapperEl = swiper.$wrapperEl;
    isTouched = true;
    dragStartPos =
    // e.target ===
    //  $dragEl[0] || e.target === $dragEl ?
    // getPointerPosition(e) -
    // e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] :
    null;
    // e.preventDefault();
    // e.stopPropagation();

    $wrapperEl.transition(100);
    swiper.$wrapperEl.scrollbarItemTransition(100);
    // $dragEl.transition(100);
    setDragPosition(e);
    clearTimeout(dragTimeout);
    swiper.$wrapperEl.scrollbarTransition(0);
    if (params.hide) {
      swiper.$wrapperEl.scrollbarCss({
        opacity: 1
      });
    }
    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css({
        'scroll-snap-type': 'none'
      });
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(_s, e) {
    var scrollbar = swiper.scrollbar,
      $wrapperEl = swiper.$wrapperEl;
    if (!isTouched) return;
    setDragPosition(e);
    $wrapperEl.transition(0);
    swiper.$wrapperEl.scrollbarTransition(0);
    swiper.$wrapperEl.scrollbarItemTransition(0);
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(_s, e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.$wrapperEl.css({
        'scroll-snap-type': ''
      });
      $wrapperEl.transition('');
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0, _utils.nextTick)(function () {
        swiper.$wrapperEl.scrollbarCss({
          opacity: 0
        });
        swiper.$wrapperEl.scrollbarTransition(400);
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events(method) {
    var scrollbar = swiper.scrollbar,
      touchEventsTouch = swiper.touchEventsTouch,
      touchEventsDesktop = swiper.touchEventsDesktop,
      params = swiper.params,
      support = swiper.support;
    var $el = scrollbar.$el;
    var target = $el;
    var activeListener = support.passiveListener && params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    var passiveListener = support.passiveListener && params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    var eventMethod = method === 'on' ? 'on' : 'off';
    if (!support.touch) {
      swiper[eventMethod]('touchStartScrollbar', onDragStart, activeListener);
      swiper[eventMethod]('touchMoveScrollbar', onDragMove, activeListener);
      swiper[eventMethod]('touchEndScrollbar', onDragEnd, passiveListener);
    } else {
      swiper[eventMethod]('touchStartScrollbar', onDragStart, activeListener);
      swiper[eventMethod]('touchMoveScrollbar', onDragMove, activeListener);
      swiper[eventMethod]('touchEndScrollbar', onDragEnd, passiveListener);
    }
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el) return;
    events('off');
  }
  function init() {
    var scrollbar = swiper.scrollbar;
    var params = swiper.params.scrollbar;
    if (!params.el) return;
    // swiper.native.updateData({
    // 	scrollbarShow: true
    // })
    var $el = params.el;
    Object.assign(scrollbar, {
      $el: $el,
      el: $el,
      methods: {}
    });
    if (params.draggable) {
      enableDraggable();
    }
    swiper.$wrapperEl[swiper.enabled ? 'removeScrollbarClass' : 'addScrollbarClass'](swiper.params.scrollbar.lockClass);
    return true;
  }
  function destroy() {
    disableDraggable();
  }
  on('init', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return init();
          case 2:
            updateSize();
            setTranslate();
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  on('update resize observerUpdate lock unlock', function () {
    updateSize();
  });
  on('setTranslate', function () {
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    setTransition(duration);
  });
  on('enable disable', function () {
    var $el = swiper.scrollbar.$el;
    if ($el) {
      $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
    }
  });
  on('destroy', function () {
    destroy();
  });
  Object.assign(swiper.scrollbar, {
    updateSize: updateSize,
    setTranslate: setTranslate,
    init: init,
    destroy: destroy
  });
}

/***/ }),

/***/ 1570:
/*!*******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/virtual/virtual.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Virtual;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
function Virtual(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  var cssModeTimeout;
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  function renderSlide(slide, index) {
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    // const $slideEl = params.renderSlide ?
    // 	$(params.renderSlide.call(swiper, slide, index)) :
    // 	$(
    // 		`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`,
    // 	);
    // if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
    // if (params.cache) swiper.virtual.cache[index] = $slideEl;
    // return $slideEl;
  }

  function onRendered() {
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    if (swiper.lazy && swiper.params.lazy.enabled) {
      swiper.lazy.load();
    }
  }
  function update(_x) {
    return _update.apply(this, arguments);
  }
  function _update() {
    _update = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(force) {
      var _swiper$params, slidesPerView, slidesPerGroup, centeredSlides, _swiper$params$virtua, addSlidesBefore, addSlidesAfter, _swiper$virtual, previousFrom, previousTo, slides, previousSlidesGrid, previousOffset, activeIndex, offsetProp, slidesAfter, slidesBefore, from, to, offset, onRendered, prependIndexes, appendIndexes, _loop, i, _i2;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onRendered = function _onRendered() {
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                if (swiper.lazy && swiper.params.lazy.enabled) {
                  swiper.lazy.load();
                }
              };
              _swiper$params = swiper.params, slidesPerView = _swiper$params.slidesPerView, slidesPerGroup = _swiper$params.slidesPerGroup, centeredSlides = _swiper$params.centeredSlides;
              _swiper$params$virtua = swiper.params.virtual, addSlidesBefore = _swiper$params$virtua.addSlidesBefore, addSlidesAfter = _swiper$params$virtua.addSlidesAfter;
              _swiper$virtual = swiper.virtual, previousFrom = _swiper$virtual.from, previousTo = _swiper$virtual.to, slides = _swiper$virtual.slides, previousSlidesGrid = _swiper$virtual.slidesGrid, previousOffset = _swiper$virtual.offset;
              if (!swiper.params.cssMode) {
                swiper.updateActiveIndex();
              }
              activeIndex = swiper.activeIndex || 0;
              if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
              if (centeredSlides) {
                slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
                slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
              } else {
                slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
                slidesBefore = slidesPerGroup + addSlidesBefore;
              }
              from = Math.max((activeIndex || 0) - slidesBefore, 0);
              to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
              offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
              Object.assign(swiper.virtual, {
                from: from,
                to: to,
                offset: offset,
                slidesGrid: swiper.slidesGrid
              });
              if (!(previousFrom === from && previousTo === to && !force)) {
                _context2.next = 16;
                break;
              }
              if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
                swiper.slides.css(offsetProp, "".concat(offset, "px"));
              }
              swiper.updateProgress();
              return _context2.abrupt("return");
            case 16:
              if (!swiper.params.virtual.renderExternal) {
                _context2.next = 20;
                break;
              }
              swiper.params.virtual.renderExternal.call(swiper, {
                offset: offset,
                from: from,
                to: to,
                slides: function getSlides() {
                  var slidesToRender = [];
                  if (swiper.params.virtual.type == 'keep') {
                    for (var i = 0; i < from; i += 1) {
                      slidesToRender.push("");
                    }
                  }
                  for (var _i = from; _i <= to; _i += 1) {
                    slidesToRender.push(slides[_i]);
                  }
                  return slidesToRender;
                }()
              });
              if (swiper.params.virtual.renderExternalUpdate) {
                onRendered();
              }
              return _context2.abrupt("return");
            case 20:
              prependIndexes = [];
              appendIndexes = [];
              if (force) {
                swiper.$wrapperEl.find(".".concat(swiper.params.slideClass)).remove();
              } else {
                _loop = function _loop(i) {
                  if (i < from || i > to) {
                    swiper.virtualList.splice(swiper.virtualList.findIndex(function (item) {
                      return item == slides[i];
                    }), 1);
                    swiper.virtualIndexList.splice(swiper.virtualIndexList.findIndex(function (item) {
                      return item == i;
                    }), 1);
                    // swiper.slides[i].virtualShow = false;
                  }
                };
                for (i = previousFrom; i <= previousTo; i += 1) {
                  _loop(i);
                }
              }
              for (_i2 = 0; _i2 < slides.length; _i2 += 1) {
                if (_i2 >= from && _i2 <= to) {
                  if (typeof previousTo === 'undefined' || force) {
                    appendIndexes.push(_i2);
                  } else {
                    if (_i2 > previousTo) appendIndexes.push(_i2);
                    if (_i2 < previousFrom) prependIndexes.push(_i2);
                  }
                }
              }
              // let list = [];
              appendIndexes.forEach(function (index) {
                // if (swiper.slides[index]) {
                // 	swiper.slides[index].virtualShow = true;
                // } else {
                swiper.virtualList.push(slides[index]);
                swiper.virtualIndexList.push(index);
                // }

                // renderSlide(slides[index], index)
                // renderSlide(slides[index], index)
                // swiper.$wrapperEl.append(renderSlide(slides[index], index));
              });

              prependIndexes.sort(function (a, b) {
                return b - a;
              }).forEach(function (index) {
                // swiper.slides[index].virtualShow = true;
                swiper.virtualList.unshift(slides[index]);
                swiper.virtualIndexList.unshift(index);

                // swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
              });

              swiper.native.emit("input", [swiper.virtualList]);
              onRendered();
            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _update.apply(this, arguments);
  }
  function appendSlide(slides) {
    if ((0, _typeof2.default)(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    var activeIndex = swiper.activeIndex;
    var newActiveIndex = activeIndex + 1;
    var numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        var $cachedEl = cache[cachedIndex];
        var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
        if (cachedElIndex) {
          $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    var activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
        }
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
      }
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }
  on('beforeInit', function () {
    if (!swiper.params.virtual.enabled) return;
    swiper.virtual.slides = swiper.params.virtual.slides;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "virtual"));
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    if (!swiper.params.initialSlide) {
      update();
    }
  });
  // on('beforeUpdate', () => {
  // 	if (!swiper.params.virtual.enabled) return;
  // 	let offsetProp;
  // 	if (swiper.rtlTranslate) offsetProp = 'right';
  // 	else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
  // 	swiper.slides.forEach((item, index) => {
  // 		item.dataSwiperSlideIndex = swiper.virtualIndexList[index];
  // 		item.css({
  // 			[offsetProp]: `${swiper.virtual.offset}px`
  // 		})
  // 	})
  // })
  on('setTranslate', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (swiper.params.virtual.enabled) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            if (swiper.params.cssMode && !swiper._immediateVirtual) {
              clearTimeout(cssModeTimeout);
              cssModeTimeout = setTimeout(function () {
                update();
              }, 100);
            } else {
              clearTimeout(cssModeTimeout);
              cssModeTimeout = setTimeout(function () {
                update();
              }, 100);
              // update();
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  Object.assign(swiper.virtual, {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
    update: update
  });
}

/***/ }),

/***/ 1571:
/*!*************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/controller/controller.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controller;
var _utils = __webpack_require__(/*! ../../shared/utils.js */ 1498);
function Controller(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'
    }
  });

  swiper.controller = {
    control: undefined
  };
  function LinearSpline(x, y) {
    var binarySearch = function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    var i1;
    var i3;
    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate(_t, byController) {
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    var Swiper = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed) return;
      var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        getInterpolateFunction(c);
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }
      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration, byController) {
    var Swiper = swiper.constructor;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      if (c.destroyed) return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          (0, _utils.nextTick)(function () {
            c.updateAutoHeight();
          });
        }
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }
  on('beforeInit', function () {
    if (typeof window !== 'undefined' && (
    // eslint-disable-line
    typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
      var controlElement = document.querySelector(swiper.params.controller.control);
      if (controlElement && controlElement.swiper) {
        swiper.controller.control = controlElement.swiper;
      } else if (controlElement) {
        var onControllerSwiper = function onControllerSwiper(e) {
          swiper.controller.control = e.detail[0];
          swiper.update();
          controlElement.removeEventListener('init', onControllerSwiper);
        };
        controlElement.addEventListener('init', onControllerSwiper);
      }
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on('update', function () {
    removeSpline();
  });
  on('resize', function () {
    removeSpline();
  });
  on('observerUpdate', function () {
    removeSpline();
  });
  on('setTranslate', function (_s, translate, byController) {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate, byController);
  });
  on('setTransition', function (_s, duration, byController) {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate: setTranslate,
    setTransition: setTransition
  });
}

/***/ }),

/***/ 1572:
/*!***************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/modules/will-change/will-change.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WillChange;
function WillChange(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  on('setTransition', function (s, duration) {
    if (!swiper.params.willChange) return;
    if (swiper.params.effect == "slide" || swiper.params.effect == "cube" || swiper.params.effect == "coverflow" || swiper.params.effect == "panorama") {
      swiper.$wrapperEl.willChange("transform");
    }
  });
  on('transitionEnd', function (s, duration) {
    if (!swiper.params.willChange) return;
    swiper.$wrapperEl.willChange("auto");
    swiper.slides.forEach(function (item) {
      item.$itemEl.willChange("auto");
    });
  });
}

/***/ }),

/***/ 1573:
/*!***********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/utils.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
exports.isObject = isObject;
exports.needsNavigation = needsNavigation;
exports.needsPagination = needsPagination;
exports.needsScrollbar = needsScrollbar;
exports.uniqueClasses = uniqueClasses;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
function isObject(o) {
  return (0, _typeof2.default)(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function extend(target, src) {
  var noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src).filter(function (key) {
    return noExtend.indexOf(key) < 0;
  }).forEach(function (key) {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      if (src[key].__swiper__) target[key] = src[key];else extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
function needsNavigation() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return props.navigation && typeof props.navigation.nextEl === 'undefined' && typeof props.navigation.prevEl === 'undefined';
}
function needsPagination() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return props.pagination && typeof props.pagination.el === 'undefined';
}
function needsScrollbar() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return props.scrollbar;
}
function uniqueClasses() {
  var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var classes = classNames.split(' ').map(function (c) {
    return c.trim();
  }).filter(function (c) {
    return !!c;
  });
  var unique = [];
  classes.forEach(function (c) {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}

/***/ }),

/***/ 1574:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/params-list.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paramsList = void 0;
/* underscore in name -> watch for changes */
var paramsList = ['modules', 'init', '_direction', 'touchEventsTarget', 'initialSlide', '_speed', 'cssMode', 'updateOnWindowResize', 'resizeObserver', 'nested', 'focusableElements', '_enabled', '_width', '_height', 'preventInteractionOnTransition', 'userAgent', 'url', '_edgeSwipeDetection', '_edgeSwipeThreshold', '_freeMode', '_autoHeight', 'setWrapperSize', 'virtualTranslate', '_effect', 'breakpoints', '_spaceBetween', '_slidesPerView', 'maxBackfaceHiddenSlides', '_grid', '_slidesPerGroup', '_slidesPerGroupSkip', '_slidesPerGroupAuto', '_centeredSlides', '_centeredSlidesBounds', '_slidesOffsetBefore', '_slidesOffsetAfter', 'normalizeSlideIndex', '_centerInsufficientSlides', '_watchOverflow', 'roundLengths', 'touchRatio', 'touchAngle', 'simulateTouch', '_shortSwipes', '_longSwipes', 'longSwipesRatio', 'longSwipesMs', '_followFinger', 'allowTouchMove', '_threshold', 'touchMoveStopPropagation', 'touchStartPreventDefault', 'touchStartForcePreventDefault', 'touchReleaseOnEdges', 'uniqueNavElements', '_resistance', '_resistanceRatio', '_watchSlidesProgress', '_grabCursor', 'preventClicks', 'preventClicksPropagation', '_slideToClickedSlide', '_preloadImages', 'updateOnImagesReady', '_loop', '_loopAdditionalSlides', '_loopedSlides', '_loopFillGroupWithBlank', 'loopPreventsSlide', '_rewind', '_allowSlidePrev', '_allowSlideNext', '_swipeHandler', '_noSwiping', 'noSwipingClass', 'noSwipingSelector', 'passiveListeners', 'containerModifierClass', 'slideClass', 'slideBlankClass', 'slideActiveClass', 'slideDuplicateActiveClass', 'slideVisibleClass', 'slideDuplicateClass', 'slideNextClass', 'slideDuplicateNextClass', 'slidePrevClass', 'slideDuplicatePrevClass', 'wrapperClass', 'runCallbacksOnInit', 'observer', 'observeParents', 'observeSlideChildren',
// modules
'a11y', '_autoplay', '_controller', 'coverflowEffect', 'cubeEffect', 'fadeEffect', 'flipEffect', 'creativeEffect', 'cardsEffect', 'panorama', 'hashNavigation', 'history', 'keyboard', 'lazy', 'mousewheel', '_navigation', '_pagination', 'parallax', '_scrollbar', '_thumbs', '_virtual', 'zoom'];
exports.paramsList = paramsList;

/***/ }),

/***/ 1575:
/*!*****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/init-swiper.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSwiper = initSwiper;
exports.mountSwiper = mountSwiper;
var _index = _interopRequireDefault(__webpack_require__(/*! ../../index.js */ 1496));
var _utils = __webpack_require__(/*! ./utils.js */ 1573);
function initSwiper(swiperParams, native) {
  return new _index.default(swiperParams, native);
}
function mountSwiper(_ref, swiperParams) {
  var el = _ref.el,
    nextEl = _ref.nextEl,
    prevEl = _ref.prevEl,
    paginationEl = _ref.paginationEl,
    scrollbarEl = _ref.scrollbarEl,
    swiper = _ref.swiper;
  if ((0, _utils.needsNavigation)(swiperParams) && nextEl && prevEl) {
    swiper.params.navigation.nextEl = nextEl;
    swiper.originalParams.navigation.nextEl = nextEl;
    swiper.params.navigation.prevEl = prevEl;
    swiper.originalParams.navigation.prevEl = prevEl;
  }
  if ((0, _utils.needsPagination)(swiperParams) && paginationEl) {
    swiper.params.pagination.el = paginationEl;
    swiper.originalParams.pagination.el = paginationEl;
  }
  if ((0, _utils.needsScrollbar)(swiperParams) && scrollbarEl) {
    swiper.params.scrollbar.el = scrollbarEl;
    swiper.originalParams.scrollbar.el = scrollbarEl;
  }
  swiper.init(el);
}

/***/ }),

/***/ 1576:
/*!**********************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/loop.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcLoopedSlides = calcLoopedSlides;
exports.renderLoop = renderLoop;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _index = _interopRequireDefault(__webpack_require__(/*! ../../index.js */ 1496));
function calcLoopedSlides(slides, swiperParams) {
  var slidesPerViewParams = swiperParams.slidesPerView;
  if (swiperParams.breakpoints) {
    var breakpoint = _index.default.prototype.getBreakpoint(swiperParams.breakpoints);
    var breakpointOnlyParams = breakpoint in swiperParams.breakpoints ? swiperParams.breakpoints[breakpoint] : undefined;
    if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
      slidesPerViewParams = breakpointOnlyParams.slidesPerView;
    }
  }
  var loopedSlides = Math.ceil(parseFloat(swiperParams.loopedSlides || slidesPerViewParams, 10));
  loopedSlides += swiperParams.loopAdditionalSlides;
  if (loopedSlides > slides.length) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
}
function renderLoop(native, swiperParams, data) {
  var modifiedValue = data;
  if (swiperParams.loopFillGroupWithBlank) {
    var blankSlidesNum = swiperParams.slidesPerGroup - modifiedValue.length % swiperParams.slidesPerGroup;
    if (blankSlidesNum !== swiperParams.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankSlide = h('div', {
          class: "".concat(swiperParams.slideClass, " ").concat(swiperParams.slideBlankClass)
        });
        modifiedValue.push(blankSlide);
      }
    }
  }
  if (swiperParams.slidesPerView === 'auto' && !swiperParams.loopedSlides) {
    swiperParams.loopedSlides = modifiedValue.length;
  }
  var loopedSlides = calcLoopedSlides(modifiedValue, swiperParams);
  var prependSlides = [];
  var appendSlides = [];
  var prependValue = [];
  var appendValue = [];
  modifiedValue.forEach(function (child, index) {
    if (index < loopedSlides) {
      if (!native.loopUpdateData) {
        appendValue.push(child);
      }
    }
    if (index < modifiedValue.length && index >= modifiedValue.length - loopedSlides) {
      if (!native.loopUpdateData) {
        prependValue.push(child);
      }
    }
  });
  if (native) {
    if (!native.originalDataList) native.originalDataList = [];
    native.originalDataList = [].concat(prependValue, (0, _toConsumableArray2.default)(modifiedValue), appendValue);
  }
  return {
    data: [].concat(prependValue, (0, _toConsumableArray2.default)(modifiedValue), appendValue)
  };
}

/***/ }),

/***/ 1577:
/*!************************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/get-changed-params.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangedParams = getChangedParams;
var _paramsList = __webpack_require__(/*! ./params-list.js */ 1574);
var _utils = __webpack_require__(/*! ./utils.js */ 1573);
function getChangedParams(swiperParams, oldParams, children, oldChildren) {
  var keys = [];
  if (!oldParams) return keys;
  var addKey = function addKey(key) {
    if (keys.indexOf(key) < 0) keys.push(key);
  };
  var oldChildrenKeys = oldChildren.map(function (child) {
    return child.props && child.props.key;
  });
  var childrenKeys = children.map(function (child) {
    return child.props && child.props.key;
  });
  if (oldChildrenKeys.join('') !== childrenKeys.join('')) keys.push('children');
  if (oldChildren.length !== children.length) keys.push('children');
  var watchParams = _paramsList.paramsList.filter(function (key) {
    return key[0] === '_';
  }).map(function (key) {
    return key.replace(/_/, '');
  });
  watchParams.forEach(function (key) {
    if (key in swiperParams && key in oldParams) {
      if ((0, _utils.isObject)(swiperParams[key]) && (0, _utils.isObject)(oldParams[key])) {
        var newKeys = Object.keys(swiperParams[key]);
        var oldKeys = Object.keys(oldParams[key]);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach(function (newKey) {
            if (swiperParams[key][newKey] !== oldParams[key][newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach(function (oldKey) {
            if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
          });
        }
      } else if (swiperParams[key] !== oldParams[key]) {
        addKey(key);
      }
    } else if (key in swiperParams && !(key in oldParams)) {
      addKey(key);
    } else if (!(key in swiperParams) && key in oldParams) {
      addKey(key);
    }
  });
  return keys;
}

/***/ }),

/***/ 1578:
/*!*******************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/update-swiper.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSwiper = updateSwiper;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _utils = __webpack_require__(/*! ./utils.js */ 1573);
function updateSwiper(_x) {
  return _updateSwiper.apply(this, arguments);
}
function _updateSwiper() {
  _updateSwiper = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var swiper, slides, passedParams, changedParams, nextEl, prevEl, paginationEl, scrollbarEl, updateParams, currentParams, pagination, navigation, scrollbar, virtual, thumbs, needThumbsInit, needControllerInit, needPaginationInit, needScrollbarInit, needNavigationInit, destroyModule, initialized;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            swiper = _ref.swiper, slides = _ref.slides, passedParams = _ref.passedParams, changedParams = _ref.changedParams, nextEl = _ref.nextEl, prevEl = _ref.prevEl, paginationEl = _ref.paginationEl, scrollbarEl = _ref.scrollbarEl;
            updateParams = changedParams.filter(function (key) {
              return key !== 'children' && key !== 'direction';
            });
            currentParams = swiper.params, pagination = swiper.pagination, navigation = swiper.navigation, scrollbar = swiper.scrollbar, virtual = swiper.virtual, thumbs = swiper.thumbs;
            if (changedParams.includes('thumbs') && passedParams.thumbs && passedParams.thumbs.swiper && currentParams.thumbs && !currentParams.thumbs.swiper) {
              needThumbsInit = true;
            }
            if (changedParams.includes('controller') && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) {
              needControllerInit = true;
            }
            if (changedParams.includes('pagination') && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) {
              needPaginationInit = true;
            }
            if (changedParams.includes('scrollbar') && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) {
              needScrollbarInit = true;
            }
            if (changedParams.includes('navigation') && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) {
              needNavigationInit = true;
            }
            destroyModule = function destroyModule(mod) {
              if (!swiper[mod]) return;
              swiper[mod].destroy();
              if (mod === 'navigation') {
                currentParams[mod].prevEl = undefined;
                currentParams[mod].nextEl = undefined;
                swiper[mod].prevEl = undefined;
                swiper[mod].nextEl = undefined;
              } else {
                currentParams[mod].el = undefined;
                swiper[mod].el = undefined;
              }
            };
            updateParams.forEach(function (key) {
              if ((0, _utils.isObject)(currentParams[key]) && (0, _utils.isObject)(passedParams[key])) {
                (0, _utils.extend)(currentParams[key], passedParams[key]);
              } else {
                var newValue = passedParams[key];
                if ((newValue === true || newValue === false) && (key === 'navigation' || key === 'pagination' || key === 'scrollbar')) {
                  if (newValue === false) {
                    destroyModule(key);
                  }
                } else {
                  currentParams[key] = passedParams[key];
                }
              }
            });
            // if (changedParams.includes('virtual') && virtual && currentParams.virtual.enabled) {
            // 	virtual.update();
            // }
            if (changedParams.includes('children') && virtual && currentParams.virtual.enabled) {
              // virtual.slides = slides;
              virtual.update(true);
            } else if (changedParams.includes('children') && swiper.lazy && swiper.params.lazy.enabled) {
              swiper.lazy.load();
            }
            if (needThumbsInit) {
              initialized = thumbs.init();
              if (initialized) thumbs.update(true);
            }
            if (needControllerInit) {
              swiper.controller.control = currentParams.controller.control;
            }
            if (needPaginationInit) {
              if (paginationEl) currentParams.pagination.el = paginationEl;
              pagination.init();
              pagination.render();
              pagination.update();
            }
            if (needScrollbarInit) {
              if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
              scrollbar.init();
              scrollbar.updateSize();
              scrollbar.setTranslate();
            }
            if (needNavigationInit) {
              if (nextEl) currentParams.navigation.nextEl = nextEl;
              if (prevEl) currentParams.navigation.prevEl = prevEl;
              navigation.init();
              navigation.update();
            }
            if (changedParams.includes('allowSlideNext')) {
              swiper.allowSlideNext = passedParams.allowSlideNext;
            }
            if (changedParams.includes('allowSlidePrev')) {
              swiper.allowSlidePrev = passedParams.allowSlidePrev;
            }
            if (changedParams.includes('direction')) {
              swiper.changeDirection(passedParams.direction, false);
            }
            swiper.update();
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateSwiper.apply(this, arguments);
}

/***/ }),

/***/ 1579:
/*!*************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/vue2/virtual.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderVirtual = renderVirtual;
exports.updateOnVirtualData = updateOnVirtualData;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// import { h } from 'vue';

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
}
function renderVirtual(swiperRef, slides, virtualData) {
  if (!virtualData) return null;
  var style = swiperRef.isHorizontal() ? (0, _defineProperty2.default)({}, swiperRef.rtlTranslate ? 'right' : 'left', "".concat(virtualData.offset, "px")) : {
    top: "".concat(virtualData.offset, "px")
  };
  return slides.filter(function (slide, index) {
    return index >= virtualData.from && index <= virtualData.to;
  }).map(function (slide) {
    if (!slide.props) slide.props = {};
    if (!slide.props.style) slide.props.style = {};
    slide.props.swiperRef = swiperRef;
    slide.props.style = style;
    return h(slide.type, _objectSpread({}, slide.props), slide.children);
  });
}

/***/ }),

/***/ 1580:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/zebra-swiper/libs/mixins/relation.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChildrenMixin = ChildrenMixin;
exports.ParentMixin = ParentMixin;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ChildrenMixin(parent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var indexKey = options.indexKey || 'index';
  return {
    inject: (0, _defineProperty2.default)({}, parent, {
      default: null
    }),
    mounted: function mounted() {
      this.parent = this[parent];
      this.bindRelation();
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;
      if (this.parent) {
        this.parent.children = this.parent.children.filter(function (item) {
          return item !== _this;
        });
        uni.$emit("childrenReady" + this.parent._uid, this);
      }
    },
    methods: {
      bindRelation: function bindRelation() {
        if (!this.parent || this.parent.children.indexOf(this) !== -1) {
          return;
        }
        var children = [].concat((0, _toConsumableArray2.default)(this.parent.children), [this]);
        this.parent.children = children;
        this.index = this.parent.children.indexOf(this);
        uni.$emit("childrenReady" + this.parent._uid, this);
      }
    }
  };
}
function ParentMixin(parent) {
  return {
    provide: function provide() {
      return (0, _defineProperty2.default)({}, parent, this);
    },
    created: function created() {
      this.children = [];
    },
    beforeDestroy: function beforeDestroy() {
      uni.$off("childrenReady" + this._uid);
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 16:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 17:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 18:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 19:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (!res) {
          resolve(res);
          return;
        }
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|__f__|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|rpx2px|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var windowWidth, pixelRatio, platform;
  {
    var windowInfo = typeof wx.getWindowInfo === 'function' && wx.getWindowInfo() ? wx.getWindowInfo() : wx.getSystemInfoSync();
    var deviceInfo = typeof wx.getDeviceInfo === 'function' && wx.getDeviceInfo() ? wx.getDeviceInfo() : wx.getSystemInfoSync();
    windowWidth = windowInfo.windowWidth;
    pixelRatio = windowInfo.pixelRatio;
    platform = deviceInfo.platform;
  }
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
function getLocaleLanguage() {
  var localeLanguage = '';
  {
    var appBaseInfo = typeof wx.getAppBaseInfo === 'function' && wx.getAppBaseInfo() ? wx.getAppBaseInfo() : wx.getSystemInfoSync();
    var language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
var locale;
{
  locale = getLocaleLanguage();
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return getLocaleLanguage();
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  rpx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system, platform) {
  var osName = '';
  var osVersion = '';
  if (platform && "mp-weixin" === 'mp-baidu') {
    osName = platform;
    osVersion = system;
  } else {
    osName = system.split(' ')[0] || platform;
    osVersion = system.split(' ')[1] || '';
  }
  osName = osName.toLocaleLowerCase();
  switch (osName) {
    case 'harmony': // alipay
    case 'ohos': // weixin
    case 'openharmony':
      // feishu
      osName = 'harmonyos';
      break;
    case 'iphone os':
      // alipay
      osName = 'ios';
      break;
    case 'mac': // weixin qq
    case 'darwin':
      // feishu
      osName = 'macos';
      break;
    case 'windows_nt':
      // feishu
      osName = 'windows';
      break;
  }
  return {
    osName: osName,
    osVersion: osVersion
  };
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var _getOSInfo = getOSInfo(system, platform),
    osName = _getOSInfo.osName,
    osVersion = _getOSInfo.osVersion;
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = (language || '').replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__2747D80",
    appName: "商协会",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.66",
    uniCompilerVersion: "4.66",
    uniRuntimeVersion: "4.66",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined,
    isUniAppX: false
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = (language || '').replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__2747D80",
      appName: "商协会",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      isUniAppX: false,
      uniPlatform: undefined || "mp-weixin",
      uniCompileVersion: "4.66",
      uniCompilerVersion: "4.66",
      uniRuntimeVersion: "4.66"
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model,
      _result2$system = _result2.system,
      system = _result2$system === void 0 ? '' : _result2$system,
      _result2$platform = _result2.platform,
      platform = _result2$platform === void 0 ? '' : _result2$platform;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    var _getOSInfo2 = getOSInfo(system, platform),
      osName = _getOSInfo2.osName,
      osVersion = _getOSInfo2.osVersion;
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model,
      osName: osName,
      osVersion: osVersion
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
function __f__(type) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  console[type].apply(console, args);
}
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback,
  __f__: __f__
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"商协会","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, getLocaleLanguage$1());
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function getLocaleLanguage$1() {
  var localeLanguage = '';
  {
    var appBaseInfo = wx.getAppBaseInfo();
    var language = appBaseInfo && appBaseInfo.language ? appBaseInfo.language : LOCALE_EN;
    localeLanguage = normalizeLocale(language) || LOCALE_EN;
  }
  return localeLanguage;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 21:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 22:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 23:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 24:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 25:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2024 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"商协会","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"商协会","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"商协会","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"商协会","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 26:
/*!**************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/pages.json ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 32:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 33:
/*!******************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/store/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 34));
var _app = _interopRequireDefault(__webpack_require__(/*! ./modules/app */ 35));
var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user */ 36));
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  modules: {
    app: _app.default,
    user: _user.default
  }
});
var _default = store;
exports.default = _default;

/***/ }),

/***/ 34:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 35:
/*!************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/store/modules/app.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

var app = {
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
      group: "团体会员"
    },
    // 富文本内容
    editorContent: "",
    // 商城预订单数据
    mallOrder: [],
    // 活动申请字段
    activityField: ""
  },
  mutations: {
    // 设置小程序信息
    setAppletInfo: function setAppletInfo(state, data) {
      state.appletName = data.name || "";
      state.appletLogo = data.logo || "";
    },
    // 设置基础配置
    setConfig: function setConfig(state, data) {
      var _data$joinConfig;
      state.themeColor = data.themeColor || "#325DFF";
      state.organize = data.organize || "商协";
      state.subscribeNotifyIds = data.subscribeNotifyIds;
      state.statement = data.statement || "";
      state.support = data.support || {};
      state.loginImg = data.loginImg || "";
      state.jielongImg = data.jielongImg || "";
      state.questionnaireImg = data.questionnaireImg || "";
      state.shareImage = data.shareImage || "";
      state.shareTitle = data.shareTitle || "";
      state.WeChatAppid = data.WeChatAppid || "";
      state.deliveryManagement = data.deliveryManagement || "";
      state.version = data.version || "1.0.0";
      if ((_data$joinConfig = data.joinConfig) !== null && _data$joinConfig !== void 0 && _data$joinConfig.length) {
        data.joinConfig.forEach(function (item) {
          if (item.type == 2) {
            state.memberTypeConfig.enterprise = item.name;
          } else if (item.type == 3) {
            state.memberTypeConfig.group = item.name;
          }
        });
      } else {
        state.memberTypeConfig = {
          enterprise: "企业会员",
          group: "团体会员"
        };
      }
    },
    // 设置底部导航
    setTabBar: function setTabBar(state, data) {
      state.tabBarList = data || [];
    },
    // 设置富文本内容
    setEditorContent: function setEditorContent(state, data) {
      state.editorContent = data || "";
    },
    // 设置商城预订单数据
    setMallOrder: function setMallOrder(state, data) {
      state.mallOrder = data || "";
    },
    // 设置活动申请字段
    setActivityField: function setActivityField(state, data) {
      state.activityField = data || "";
    }
  }
};
var _default = app;
exports.default = _default;

/***/ }),

/***/ 36:
/*!*************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/store/modules/user.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

var user = {
  namespaced: true,
  state: {
    // 登录鉴权
    token: "",
    // 用户信息
    userInfo: {},
    // 用户手机号
    mobile: ""
  },
  mutations: {
    // 设置token
    setToken: function setToken(state, token) {
      state.token = token;
    },
    // 设置用户信息
    setUserInfo: function setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      state.mobile = userInfo.mobile;
    },
    // 更新用户信息手机号
    updateMobile: function updateMobile(state, mobile) {
      var userInfo = state.userInfo;
      userInfo.mobile = mobile;
      uni.setStorageSync("userInfo", userInfo);
      state.userInfo = userInfo;
      state.mobile = mobile;
    },
    // 清除登录信息
    clearAuth: function clearAuth(state) {
      state.token = "";
      state.userInfo = {};
      uni.removeStorageSync("token");
      uni.removeStorageSync("userInfo");
    }
  }
};
var _default = user;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 37:
/*!****************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni.promisify.adaptor.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

uni.addInterceptor({
  returnValue: function returnValue(res) {
    if (!(!!res && (_typeof(res) === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 38:
/*!*******************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/tools.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 39));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 41));
var _index = _interopRequireDefault(__webpack_require__(/*! ./api/index.js */ 42));
var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 33));
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 常用API方法集成 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------

// 引入接口列表文档

// 接口请求方法
function request(api) {
  var parameter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adminPath = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    var channel = 2;
    channel = 1;
    var config = {
      url: '',
      // 接口地址
      data: {},
      // 请求的参数
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": uni.getStorageSync('token'),
        "channel": channel
      },
      // 设置请求头
      method: "POST",
      // 请求方法
      timeout: 30000,
      // 超时时间
      loading: true,
      // 设置加载等待
      dataType: "json",
      // 如果设为 json，会尝试对返回的数据做一次 JSON.parse
      responseType: "text",
      // 设置响应的数据类型
      sslVerify: true,
      // 验证 ssl 证书
      withCredentials: false,
      // 跨域请求时是否携带凭证（cookies）
      firstIpv4: "false",
      // DNS解析时优先使用ipv4
      success: function success(res) {
        if (res.statusCode == 401) {
          uni.hideLoading();
          uni.removeStorageSync("token");
          uni.removeStorageSync("userInfo");
          _store.default.commit('user/clearAuth');
          uni.removeStorageSync("myCart");
          uni.removeStorageSync("currentAddress");
          uni.removeStorageSync("searchHistory");
          verifyLogin(2);
          reject(401);
        } else if (res.statusCode == 200) {
          resolve(res.data);
        } else if (res.msg) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        } else if (res.statusCode == 408) {
          uni.showToast({
            title: '请求超时，请稍后重试',
            icon: 'none',
            duration: 2000
          });
          reject();
        } else if (res.statusCode == 500) {
          uni.showToast({
            title: '服务器开小差了，请稍后再试',
            icon: 'none',
            duration: 2000
          });
          reject();
        } else {
          uni.redirectTo({
            url: "/pages/error/error"
          });
          reject();
        }
      },
      fail: function fail(err) {
        uni.redirectTo({
          url: "/pages/error/error"
        });
        reject(err);
      }
    };
    var apiObj = getApiObj(api);
    if (!apiObj) {
      reject("接口地址错误");
    } else if (apiObj.auth && !uni.getStorageSync('token')) {
      uni.hideLoading();
      uni.showToast({
        title: '请登录后操作',
        icon: 'none',
        duration: 1000,
        mask: true
      });
      setTimeout(function () {
        verifyLogin(2);
        reject(401);
      }, 1000);
      return;
    }
    var newConfig = Object.assign({}, config, {
      url: (adminPath ? adminPath : getApp().globalData.adminPath) + apiObj.url,
      method: apiObj.method,
      data: parameter
    });
    // 判断有无网络
    uni.getNetworkType({
      success: function success(res) {
        if (res.networkType === "none") {
          uni.showToast({
            icon: "none",
            title: "请先连接网络后操作"
          });
          uni.hideLoading();
        } else {
          uni.request(newConfig);
        }
      }
    });
  });
}

// 获取接口信息
function getApiObj(url) {
  var apiArray = url.split(".");
  var api = _index.default;
  apiArray.forEach(function (v) {
    api = api[v];
  });
  return api;
}

// 验证是否登录 type: 1.判断是否有token, 2.不判断直接跳转登录
function verifyLogin() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  if (type == 1) {
    if (!uni.getStorageSync("token")) {
      uni.navigateTo({
        url: "/pages/login/index",
        animationType: "fade-in"
      });
      return false;
    } else return true;
  } else {
    var pages = getCurrentPages();
    uni.redirectTo({
      url: "/pages/login/index?from=" + encodeURIComponent(pages[pages.length - 1].$page.fullPath),
      animationType: "fade-in"
    });
  }
}

// 上传文件-单文件
function uploadFile(file) {
  return new Promise(function (resolve, reject) {
    // 判断有无网络
    uni.getNetworkType({
      success: function success(res) {
        if (res.networkType === "none") {
          uni.showToast({
            icon: "none",
            title: "请先连接网络后操作"
          });
          uni.hideLoading();
        } else {
          uni.uploadFile({
            url: getApp().globalData.adminPath + '/api/wdsxh/common/upload',
            filePath: file,
            name: 'file',
            header: {
              token: uni.getStorageSync("token")
            },
            success: function success(res) {
              resolve(JSON.parse(res.data));
            },
            fail: function fail(err) {
              reject(err);
            }
          });
        }
      }
    });
  });
}

// 上传文件-多文件 type: 1.返回url, 2.返回fullurl
function uploadFileMultiple(files, oldFiles) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return new Promise(function (resolve, reject) {
    var uploadList = new Array(files.length);
    var completeNum = 0;
    var _loop = function _loop() {
      var index = i;
      if (oldFiles && oldFiles.includes(files[i])) {
        uploadList[index] = files[i];
        if (++completeNum == files.length) {
          resolve(uploadList);
        }
      } else {
        uploadFile(files[i]).then(function (res) {
          if (res.code == 1) {
            if (type == 2) uploadList[index] = res.data.fullurl;else uploadList[index] = res.data.url;
            if (++completeNum == files.length) {
              resolve(uploadList);
            }
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            reject(res.msg);
          }
        }).catch(function (err) {
          reject(err);
        });
      }
    };
    for (var i in files) {
      _loop();
    }
  });
}

// 导航菜单跳转及功能
// path: 跳转页面时使用的地址
// appId: 跳转小程序时使用的小程序id或原始id
// phone: 拨打电话时使用的电话号码
// address: 地图导航时使用的地址
// content: 复制文本时使用的文本
// mode: 1.跳转内部页面，2.关闭当前页面跳转，3.关闭所有页面跳转，4.跳转外部链接，5.跳转微信小程序，6.拨打电话，7.地图导航，8.复制文本
// success: 成功回调函数
function toPage(_x) {
  return _toPage.apply(this, arguments);
} // 自定义装修-打开链接
function _toPage() {
  _toPage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {
    var loginRequired, tabbarList, isPermission, location;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(e.mode == 1 || e.mode == 2 || e.mode == 3)) {
              _context2.next = 14;
              break;
            }
            // 需要登录的页面
            loginRequired = ['/pages/mine/settings/user', '/pages/mine/subscribe/index', '/pages/member/details', '/pages/member/enterprise', '/pages/member/organization', '/pages/member/apply/index', '/pages/member/fees/index', '/pages/member/fees/pay', '/pages/member/information', '/pagesActivity/index/order', '/pagesActivity/order/index', '/pagesActivity/order/details', '/pagesActivity/verification/index', '/pagesActivity/verification/details', '/pagesMall/goods/order', '/pagesMall/address/index', '/pagesMall/address/add', '/pagesMall/cart/index', '/pagesMall/order/index', '/pagesMall/order/details', '/pagesMall/order/payment', '/pagesMall/refund/index', '/pagesMall/refund/details', '/pagesMall/refund/apply', '/pagesMall/refund/goods', '/pagesDemand/demand/details', '/pagesDemand/demand/edit', '/pagesDemand/demand/list', '/pagesDemand/demand/publish', '/pagesTools/certificate/index', '/pagesTools/certificate/result', '/pagesTools/phoneBook/index', '/pagesTools/sequence/feedback', '/pagesTools/suggest/index', '/pagesTools/publicize/index', '/pagesTools/sequence/details', '/pagesTools/questionnaire/details', '/pagesTools/institution/apply', '/pagesCard/mine/index', '/pagesCard/mine/details', '/pagesCard/mine/edit', '/pagesCard/mine/manage', '/pagesCard/card/details', '/pagesAdmin/examine/index', '/pagesAdmin/examine/details']; // 底部导航
            tabbarList = ['/pages/index/index', '/pages/member/index', '/pages/mall/index', '/pages/demand/index', '/pages/mine/index']; // 判断是否需要登录
            if (!(loginRequired.indexOf(e.path.split("?")[0]) > -1 && !uni.getStorageSync("token"))) {
              _context2.next = 6;
              break;
            }
            // 是否登录
            uni.navigateTo({
              url: "/pages/login/index",
              animationType: "fade-in"
            });
            return _context2.abrupt("return");
          case 6:
            _context2.next = 8;
            return getPagePermission(e);
          case 8:
            isPermission = _context2.sent;
            if (isPermission) {
              _context2.next = 11;
              break;
            }
            return _context2.abrupt("return");
          case 11:
            if (tabbarList.indexOf(e.path.split("?")[0]) > -1) {
              // 链接是否为底部导航
              uni.switchTab({
                url: e.path
              });
            } else {
              if (e.mode == 1) {
                uni.navigateTo({
                  url: e.path,
                  success: function success() {
                    if (e.success) e.success();
                  }
                });
              } else if (e.mode == 2) {
                uni.redirectTo({
                  url: e.path,
                  success: function success() {
                    if (e.success) e.success();
                  }
                });
              } else if (e.mode == 3) {
                uni.reLaunch({
                  url: e.path,
                  success: function success() {
                    if (e.success) e.success();
                  }
                });
              }
            }
            _context2.next = 15;
            break;
          case 14:
            if (e.mode == 4) {
              // 跳转外部链接

              uni.navigateTo({
                url: '/pages/webview/webview?path=' + encodeURIComponent(e.path)
              });
            } else if (e.mode == 5) {
              // 跳转微信小程序

              uni.navigateToMiniProgram({
                appId: e.appId,
                path: e.path
              });
            } else if (e.mode == 6) {
              // 拨打电话
              // Android需要在 manifest.json 增加权限 <uses-permission android:name="android.permission.CALL_PHONE"/>
              if (e.phone) {
                uni.makePhoneCall({
                  phoneNumber: e.phone + ""
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "暂无可拨打电话"
                });
              }
            } else if (e.mode == 7) {
              if (e.address && e.address.latitude && e.address.longitude) {
                location = {
                  latitude: Number(e.address.latitude),
                  longitude: Number(e.address.longitude)
                };
                if (e.address.name) location.name = e.address.name;
                if (e.address.address) location.address = e.address.address;
                uni.openLocation(location);
              } else {
                uni.showToast({
                  icon: "none",
                  title: "暂无相关地址"
                });
              }
            } else if (e.mode == 8) {
              if (e.content) {
                uni.setClipboardData({
                  data: e.content,
                  success: function success() {
                    if (e.success) {
                      e.success();
                    } else {
                      uni.showToast({
                        icon: "success",
                        title: "复制成功"
                      });
                    }
                  }
                });
              } else {
                uni.showToast({
                  icon: "none",
                  title: "暂无可复制内容"
                });
              }
            }
          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _toPage.apply(this, arguments);
}
function openLink(e) {
  switch (e.type) {
    case 'Custom':
      this.toPage({
        mode: 1,
        path: e.path
      });
      break;
    case 'Inlay':
      this.toPage({
        mode: 1,
        path: e.path
      });
      break;
    case 'Editor':
      _store.default.commit('app/setEditorContent', e.content);
      this.toPage({
        mode: 1,
        path: "/pages/diy/richText?name=" + (e.pageTitle || "详情")
      });
      break;
    case 'WXMp':
      this.toPage({
        mode: 5,
        appId: e.appid,
        path: e.path
      });
      break;
    case 'Outside':
      this.toPage({
        mode: 4,
        path: e.url
      });
      break;
    case 'Phone':
      this.toPage({
        mode: 6,
        phone: e.phone + ""
      });
      break;
    case 'Member':
      this.toPage({
        mode: 1,
        path: "/pages/member/details?id=" + e.id
      });
      break;
    case 'Article':
      if (e.link_type == 2) {
        this.toPage({
          mode: 4,
          path: e.link_url
        });
        this.$util.request("main.article.updateReadNum", {
          id: item.id
        });
      } else {
        this.toPage({
          mode: 1,
          path: "/pages/article/details?id=" + e.id
        });
      }
      break;
    case 'Activity':
      this.toPage({
        mode: 1,
        path: "/pagesActivity/index/details?id=" + e.id
      });
      break;
    case 'Goods':
      this.toPage({
        mode: 1,
        path: "/pagesMall/goods/details?id=" + e.id
      });
      break;
    default:
      break;
  }
}

// 判断页面跳转权限 isShowTips: 1.显示提示，2不显示提示
function getPagePermission(e) {
  var isShowTips = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {
      var memberRequired, memberLimit, demandLimit;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 需要入会的页面
              memberRequired = ['/pages/member/information', '/pagesDemand/demand/edit', '/pagesDemand/demand/list', '/pagesDemand/demand/publish', '/pagesTools/certificate/index', '/pagesTools/certificate/result', '/pagesTools/publicize/index', '/pagesTools/institution/apply']; // 会员权限判断
              memberLimit = {
                list: ['/pages/member/index', '/pages/member/units', '/pages/member/search/index', '/pages/member/industry'],
                details: ['/pages/member/details', '/pages/member/enterprise', '/pages/member/organization']
              }; // 供需权限判断
              demandLimit = {
                list: ['/pages/demand/index', '/pages/demand/search/index', '/pages/demand/search/result'],
                details: ['/pagesDemand/demand/details']
              };
              if (!(memberRequired.indexOf(e.path.split("?")[0]) > -1)) {
                _context.next = 11;
                break;
              }
              _context.t0 = resolve;
              _context.next = 7;
              return getMemberState(isShowTips);
            case 7:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1);
              _context.next = 148;
              break;
            case 11:
              if (!(memberLimit.list.indexOf(e.path.split("?")[0]) > -1)) {
                _context.next = 19;
                break;
              }
              _context.t2 = resolve;
              _context.next = 15;
              return getMemberLimit(1, isShowTips);
            case 15:
              _context.t3 = _context.sent;
              (0, _context.t2)(_context.t3);
              _context.next = 148;
              break;
            case 19:
              if (!(memberLimit.details.indexOf(e.path.split("?")[0]) > -1)) {
                _context.next = 27;
                break;
              }
              _context.t4 = resolve;
              _context.next = 23;
              return getMemberLimit(2, isShowTips);
            case 23:
              _context.t5 = _context.sent;
              (0, _context.t4)(_context.t5);
              _context.next = 148;
              break;
            case 27:
              if (!(demandLimit.list.indexOf(e.path.split("?")[0]) > -1)) {
                _context.next = 35;
                break;
              }
              _context.t6 = resolve;
              _context.next = 31;
              return getDemandLimit(1, isShowTips);
            case 31:
              _context.t7 = _context.sent;
              (0, _context.t6)(_context.t7);
              _context.next = 148;
              break;
            case 35:
              if (!(demandLimit.details.indexOf(e.path.split("?")[0]) > -1)) {
                _context.next = 43;
                break;
              }
              _context.t8 = resolve;
              _context.next = 39;
              return getDemandLimit(2, isShowTips);
            case 39:
              _context.t9 = _context.sent;
              (0, _context.t8)(_context.t9);
              _context.next = 148;
              break;
            case 43:
              if (!(e.path.split("?")[0] == "/pagesTools/album/index")) {
                _context.next = 51;
                break;
              }
              _context.t10 = resolve;
              _context.next = 47;
              return getAlbumLimit(1, isShowTips);
            case 47:
              _context.t11 = _context.sent;
              (0, _context.t10)(_context.t11);
              _context.next = 148;
              break;
            case 51:
              if (!(e.path.split("?")[0] == "/pagesTools/album/details")) {
                _context.next = 59;
                break;
              }
              _context.t12 = resolve;
              _context.next = 55;
              return getAlbumLimit(2, isShowTips);
            case 55:
              _context.t13 = _context.sent;
              (0, _context.t12)(_context.t13);
              _context.next = 148;
              break;
            case 59:
              if (!(e.path.split("?")[0] == "/pagesActivity/index/details")) {
                _context.next = 67;
                break;
              }
              _context.t14 = resolve;
              _context.next = 63;
              return getActivityLimit(getUrlParam(e.path, "id"), isShowTips);
            case 63:
              _context.t15 = _context.sent;
              (0, _context.t14)(_context.t15);
              _context.next = 148;
              break;
            case 67:
              if (!(e.path.split("?")[0] == "/pagesTools/institution/details")) {
                _context.next = 75;
                break;
              }
              _context.t16 = resolve;
              _context.next = 71;
              return getInstitutionLimit(isShowTips);
            case 71:
              _context.t17 = _context.sent;
              (0, _context.t16)(_context.t17);
              _context.next = 148;
              break;
            case 75:
              if (!(e.path.split("?")[0] == "/pagesTools/phoneBook/index")) {
                _context.next = 83;
                break;
              }
              _context.t18 = resolve;
              _context.next = 79;
              return getAddressBookLimit(isShowTips);
            case 79:
              _context.t19 = _context.sent;
              (0, _context.t18)(_context.t19);
              _context.next = 148;
              break;
            case 83:
              if (!(e.path.split("?")[0] == "/pagesTools/questionnaire/details")) {
                _context.next = 91;
                break;
              }
              _context.t20 = resolve;
              _context.next = 87;
              return getQuestionnaireLimit(getUrlParam(e.path, "id"), isShowTips);
            case 87:
              _context.t21 = _context.sent;
              (0, _context.t20)(_context.t21);
              _context.next = 148;
              break;
            case 91:
              if (!(e.path.split("?")[0] == "/pagesTools/sequence/details")) {
                _context.next = 99;
                break;
              }
              _context.t22 = resolve;
              _context.next = 95;
              return getSequenceLimit(getUrlParam(e.path, "id"), isShowTips);
            case 95:
              _context.t23 = _context.sent;
              (0, _context.t22)(_context.t23);
              _context.next = 148;
              break;
            case 99:
              if (!(e.path.split("?")[0] == "/pages/mine/subscribe/index")) {
                _context.next = 107;
                break;
              }
              _context.t24 = resolve;
              _context.next = 103;
              return getSubscribeAdmin(1, isShowTips);
            case 103:
              _context.t25 = _context.sent;
              (0, _context.t24)(_context.t25);
              _context.next = 148;
              break;
            case 107:
              if (!(e.path.split("?")[0] == "/pagesAdmin/examine/index")) {
                _context.next = 115;
                break;
              }
              _context.t26 = resolve;
              _context.next = 111;
              return getSubscribeAdmin(1, isShowTips);
            case 111:
              _context.t27 = _context.sent;
              (0, _context.t26)(_context.t27);
              _context.next = 148;
              break;
            case 115:
              if (!(e.path.split("?")[0] == "/pagesAdmin/examine/details")) {
                _context.next = 123;
                break;
              }
              _context.t28 = resolve;
              _context.next = 119;
              return getSubscribeAdmin(1, isShowTips);
            case 119:
              _context.t29 = _context.sent;
              (0, _context.t28)(_context.t29);
              _context.next = 148;
              break;
            case 123:
              if (!(e.path.split("?")[0] == "/pagesActivity/verification/index")) {
                _context.next = 131;
                break;
              }
              _context.t30 = resolve;
              _context.next = 127;
              return getSubscribeAdmin(2, isShowTips);
            case 127:
              _context.t31 = _context.sent;
              (0, _context.t30)(_context.t31);
              _context.next = 148;
              break;
            case 131:
              if (!(e.path.split("?")[0] == "/pages/member/apply/index")) {
                _context.next = 139;
                break;
              }
              _context.t32 = resolve;
              _context.next = 135;
              return getMemberApply(isShowTips);
            case 135:
              _context.t33 = _context.sent;
              (0, _context.t32)(_context.t33);
              _context.next = 148;
              break;
            case 139:
              if (!(e.path.split("?")[0] == "/pages/member/fees/index")) {
                _context.next = 147;
                break;
              }
              _context.t34 = resolve;
              _context.next = 143;
              return getMemberFeesState(isShowTips);
            case 143:
              _context.t35 = _context.sent;
              (0, _context.t34)(_context.t35);
              _context.next = 148;
              break;
            case 147:
              resolve(true);
            case 148:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

// 获取会员状态
function getMemberState(isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("member.state").then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.state.state == 6) {
          resolve(true);
        } else if (res.data.state.state == -1) {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "此页面需成为会员后可查看！",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "去加入",
              success: function success(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: "/pages/member/apply/index"
                  });
                }
              }
            });
          }
          resolve(false);
        } else {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "此页面需成为会员后可查看！",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "前往查看",
              success: function success(res) {
                if (res.confirm) {
                  uni.switchTab({
                    url: "/pages/mine/index"
                  });
                }
              }
            });
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取会员对外开放状态
function getMemberLimit(type, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("member.limit", {
      type: type
    }).then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "此页面需成为会员后可查看！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync, _uni$getStorageSync$a;
                      var memberState = ((_uni$getStorageSync = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync === void 0 ? void 0 : (_uni$getStorageSync$a = _uni$getStorageSync.apply_member_state) === null || _uni$getStorageSync$a === void 0 ? void 0 : _uni$getStorageSync$a.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取通讯录对外开放状态
function getAddressBookLimit(isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("member.addressBookLimit").then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "此页面需成为会员后可查看！",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "去加入",
              success: function success(res) {
                if (res.confirm) {
                  try {
                    var _uni$getStorageSync2, _uni$getStorageSync2$;
                    var memberState = ((_uni$getStorageSync2 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync2 === void 0 ? void 0 : (_uni$getStorageSync2$ = _uni$getStorageSync2.apply_member_state) === null || _uni$getStorageSync2$ === void 0 ? void 0 : _uni$getStorageSync2$.state) || -1;
                    if (memberState == -1) {
                      uni.navigateTo({
                        url: "/pages/member/apply/index"
                      });
                    } else {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  } catch (error) {
                    uni.switchTab({
                      url: "/pages/mine/index"
                    });
                  }
                }
              }
            });
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取供需对外开放状态
function getDemandLimit(type, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("demand.businessLimit", {
      type: type
    }).then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "此页面需成为会员后可查看！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync3, _uni$getStorageSync3$;
                      var memberState = ((_uni$getStorageSync3 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync3 === void 0 ? void 0 : (_uni$getStorageSync3$ = _uni$getStorageSync3.apply_member_state) === null || _uni$getStorageSync3$ === void 0 ? void 0 : _uni$getStorageSync3$.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取相册对外开放状态
function getAlbumLimit(type, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("album.albumLimit", {
      type: type
    }).then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "此页面需成为会员后可查看！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync4, _uni$getStorageSync4$;
                      var memberState = ((_uni$getStorageSync4 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync4 === void 0 ? void 0 : (_uni$getStorageSync4$ = _uni$getStorageSync4.apply_member_state) === null || _uni$getStorageSync4$ === void 0 ? void 0 : _uni$getStorageSync4$.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取活动详情对外开放状态
function getActivityLimit(id, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("activity.limit", {
      id: id
    }).then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "此页面需成为会员后可查看！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync5, _uni$getStorageSync5$;
                      var memberState = ((_uni$getStorageSync5 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync5 === void 0 ? void 0 : (_uni$getStorageSync5$ = _uni$getStorageSync5.apply_member_state) === null || _uni$getStorageSync5$ === void 0 ? void 0 : _uni$getStorageSync5$.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取机构详情对外开放状态
function getInstitutionLimit(isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("institution.limit").then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "此页面需成为会员后可查看！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync6, _uni$getStorageSync6$;
                      var memberState = ((_uni$getStorageSync6 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync6 === void 0 ? void 0 : (_uni$getStorageSync6$ = _uni$getStorageSync6.apply_member_state) === null || _uni$getStorageSync6$ === void 0 ? void 0 : _uni$getStorageSync6$.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取问卷详情对外开放状态
function getQuestionnaireLimit(id, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("questionnaire.limit", {
      id: id
    }).then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "该问卷需成为会员后可填写！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync7, _uni$getStorageSync7$;
                      var memberState = ((_uni$getStorageSync7 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync7 === void 0 ? void 0 : (_uni$getStorageSync7$ = _uni$getStorageSync7.apply_member_state) === null || _uni$getStorageSync7$ === void 0 ? void 0 : _uni$getStorageSync7$.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取接龙详情对外开放状态
function getSequenceLimit(id, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("sequence.limit", {
      id: id
    }).then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.show_status == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            if (uni.getStorageSync("token")) {
              uni.showModal({
                title: "系统提示",
                content: "该接龙需成为会员后可参加！",
                confirmColor: _store.default.state.app.themeColor,
                confirmText: "去加入",
                success: function success(res) {
                  if (res.confirm) {
                    try {
                      var _uni$getStorageSync8, _uni$getStorageSync8$;
                      var memberState = ((_uni$getStorageSync8 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync8 === void 0 ? void 0 : (_uni$getStorageSync8$ = _uni$getStorageSync8.apply_member_state) === null || _uni$getStorageSync8$ === void 0 ? void 0 : _uni$getStorageSync8$.state) || -1;
                      if (memberState == -1) {
                        uni.navigateTo({
                          url: "/pages/member/apply/index"
                        });
                      } else {
                        uni.switchTab({
                          url: "/pages/mine/index"
                        });
                      }
                    } catch (error) {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  }
                }
              });
            } else {
              uni.navigateTo({
                url: "/pages/login/index",
                animationType: "fade-in"
              });
            }
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取管理员状态 type: 1.消息订阅管理员，2.核销活动管理员
function getSubscribeAdmin(type, isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("mine.user").then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (type == 1 && res.data.set_admin == 1) {
          resolve(true);
        } else if (type == 2 && res.data.is_verifying == 1) {
          resolve(true);
        } else {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "此页面需成为管理员后可查看！",
              showCancel: false,
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "我知道了"
            });
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取会费缴纳状态
function getMemberFeesState(isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("member.state").then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.state.state == -1) {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "请先提交入会申请后可查看",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "去申请",
              success: function success(res) {
                if (res.confirm) {
                  try {
                    var _uni$getStorageSync9, _uni$getStorageSync9$;
                    var memberState = ((_uni$getStorageSync9 = uni.getStorageSync("userInfo")) === null || _uni$getStorageSync9 === void 0 ? void 0 : (_uni$getStorageSync9$ = _uni$getStorageSync9.apply_member_state) === null || _uni$getStorageSync9$ === void 0 ? void 0 : _uni$getStorageSync9$.state) || -1;
                    if (memberState == -1) {
                      uni.navigateTo({
                        url: "/pages/member/apply/index"
                      });
                    } else {
                      uni.switchTab({
                        url: "/pages/mine/index"
                      });
                    }
                  } catch (error) {
                    uni.switchTab({
                      url: "/pages/mine/index"
                    });
                  }
                }
              }
            });
          }
          resolve(false);
        } else if (res.data.state.state == 1) {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "入会申请审核中，请耐心等待",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "我知道了",
              showCancel: false
            });
          }
          resolve(false);
        } else {
          resolve(true);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取入会申请状态
function getMemberApply(isShowTips) {
  return new Promise(function (resolve) {
    uni.showLoading({
      title: "加载中",
      mask: true
    });
    request("member.state").then(function (res) {
      uni.hideLoading();
      if (res.code == 1) {
        if (res.data.state.state == -1 || res.data.state.state == 2) {
          resolve(true);
        } else if (res.data.state.state == 6) {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "您已成为会员，无需重复提交",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "前往查看",
              success: function success(res) {
                if (res.confirm) {
                  uni.switchTab({
                    url: "/pages/mine/index"
                  });
                }
              }
            });
          }
          resolve(false);
        } else {
          if (isShowTips != 2) {
            uni.showModal({
              title: "系统提示",
              content: "您已提交入会申请，无需重复提交",
              confirmColor: _store.default.state.app.themeColor,
              confirmText: "前往查看",
              success: function success(res) {
                if (res.confirm) {
                  uni.switchTab({
                    url: "/pages/mine/index"
                  });
                }
              }
            });
          }
          resolve(false);
        }
      } else {
        if (isShowTips != 2) {
          uni.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(false);
      }
    }).catch(function () {
      uni.hideLoading();
      resolve(false);
    });
  });
}

// 获取地址栏参数 path: 页面路径，name: 参数名称
function getUrlParam(path, name) {
  var search = path.split("?")[1] || "";
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURI(search).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// 常用规则验证
// mode: phone验证手机号，email验证邮箱，IDcard身份证号（简单验证），password密码
// info: 需要验证的内容
function validation(mode, info) {
  if (mode == 'phone') {
    var reg = /^1[0-9]{10,10}$/;
    if (reg.test(info)) return true;else return false;
  } else if (mode == 'email') {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (reg.test(info)) return true;else return false;
  } else if (mode == 'IDcard') {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(info)) {
      var birth = info.length === 18 ? info.slice(6, 14) : info.slice(6, 12);
      var month, day;
      if (birth.length == 8) {
        month = parseInt(birth.slice(4, 6), 10);
        day = parseInt(birth.slice(-2), 10);
      } else if (birth.length == 6) {
        month = parseInt(birth.slice(2, 4), 10);
        day = parseInt(birth.slice(-2), 10);
      } else {
        return false;
      }
      if (month > 12 || month === 0 || day > 31 || day === 0) {
        return false;
      }
      return true;
    } else return false;
  } else if (mode == 'password') {
    if (info.length >= 8) return true;else return false;
  }
}

// 获取当前日期
function getCurrentDate() {
  var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "y-m-d";
  var date = new Date();
  var year = date.getFullYear(); //年
  var month = date.getMonth() + 1; //月
  var day = date.getDate(); //日
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
  var minute = date.getMinutes() < 10 ? date.getMinutes() : date.getMinutes(); //分
  var second = date.getSeconds() < 10 ? date.getSeconds() : date.getSeconds(); //秒
  month >= 1 && month <= 9 ? month = "0" + month : "";
  day >= 0 && day <= 9 ? day = "0" + day : "";
  hour >= 0 && hour <= 9 ? hour : "";
  minute >= 0 && minute <= 9 ? minute = "0" + minute : "";
  second >= 0 && second <= 9 ? second = "0" + second : "";
  if (format.indexOf('y') != -1) {
    format = format.replace('y', year);
  }
  if (format.indexOf('m') != -1) {
    format = format.replace('m', month);
  }
  if (format.indexOf('d') != -1) {
    format = format.replace('d', day);
  }
  if (format.indexOf('h') != -1) {
    format = format.replace('h', hour);
  }
  if (format.indexOf('i') != -1) {
    format = format.replace('i', minute);
  }
  if (format.indexOf('s') != -1) {
    format = format.replace('s', second);
  }
  return format;
}

// 时间戳转日期格式 type: dateTime-日期时间，date-日期，hours-时，minutes-时分，seconds-时分秒
function formatDate(timeStamp) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "dateTime";
  var date = new Date(timeStamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var h = date.getHours();
  var mm = date.getMinutes();
  var s = date.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  h = h >= 10 ? h : "0" + h;
  mm = mm >= 10 ? mm : "0" + mm;
  s = s >= 10 ? s : "0" + s;
  var result = "";
  if (hyphen == "object") {
    result = {
      year: year,
      month: month,
      day: day,
      hours: h,
      minutes: mm,
      seconds: s
    };
  } else if (type == "date") {
    result = "".concat(year).concat(hyphen).concat(month).concat(hyphen).concat(day);
  } else if (type == "hours") {
    result = "".concat(h);
  } else if (type == "minutes") {
    result = "".concat(h, ":").concat(mm);
  } else if (type == "seconds") {
    result = "".concat(h, ":").concat(mm, ":").concat(s);
  } else {
    result = "".concat(year).concat(hyphen).concat(month).concat(hyphen).concat(day, " ").concat(h, ":").concat(mm, ":").concat(s);
  }
  return result;
}

// 时间格式化时间为：刚刚、多少分钟前、多少天前
function getDateBeforeNow(stringTime) {
  // 统一单位换算
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var time1 = new Date().getTime(); //当前的时间戳
  // 对时间进行毫秒单位转换
  var time2 = new Date(stringTime * 1000).getTime(); //指定时间的时间戳
  var time = time1 - time2;
  var result = null;
  if (time < 0) {
    result = "刚刚";
  } else if (time / day >= 3) {
    result = formatDate(stringTime, ".", "date");
  } else if (time / day >= 1) {
    result = parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
    result = parseInt(time / minute) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}

// 获取时间差
function getTimeDifference(startTime, endTime) {
  var result = null;
  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var timeDif = endTime - startTime;
  var secondDif = parseInt(timeDif / second);
  var minuteDif = parseInt(timeDif / minute);
  var hourDif = parseInt(timeDif / hour);
  var dayDif = parseInt(timeDif / day);
  if (secondDif <= 0) {
    result = {
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  } else if (secondDif < 60) {
    result = {
      day: 0,
      hours: 0,
      minutes: 0,
      seconds: parseInt(secondDif % 60)
    };
  } else if (minuteDif < 60) {
    result = {
      day: 0,
      hours: 0,
      minutes: parseInt(minuteDif % 60),
      seconds: parseInt(secondDif % 60)
    };
  } else if (hourDif < 24) {
    result = {
      day: 0,
      hours: parseInt(hourDif % 24),
      minutes: parseInt(minuteDif % 60),
      seconds: parseInt(secondDif % 60)
    };
  } else {
    result = {
      day: parseInt(dayDif),
      hours: parseInt(hourDif % 24),
      minutes: parseInt(minuteDif % 60),
      seconds: parseInt(secondDif % 60)
    };
  }
  return result;
}

// 获取前一天日期
function getYesterday(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var today = new Date(date);
  var yesterday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24;
  var yesterday = new Date();
  yesterday.setTime(yesterday_milliseconds);
  var strYear = yesterday.getFullYear();
  var strDay = yesterday.getDate();
  var strMonth = yesterday.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  return strYear + hyphen + strMonth + hyphen + strDay;
}

// 获取后一天日期
function getTomorrow(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var today = new Date(date);
  var tomorrow_milliseconds = today.getTime() + 1000 * 60 * 60 * 24;
  var tomorrow = new Date();
  tomorrow.setTime(tomorrow_milliseconds);
  var strYear = tomorrow.getFullYear();
  var strDay = tomorrow.getDate();
  var strMonth = tomorrow.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  return strYear + hyphen + strMonth + hyphen + strDay;
}

// 获取上一周日期
function getLastWeek(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var lastWeek = new Date(date).getTime() - 86400000 * 7;
  var day = new Date(lastWeek).getDate();
  var month = new Date(lastWeek).getMonth() + 1;
  var year = new Date(lastWeek).getFullYear();
  return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取下一周日期
function getNextWeek(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var nextWeek = new Date(date).getTime() + 86400000 * 7;
  var day = new Date(nextWeek).getDate();
  var month = new Date(nextWeek).getMonth() + 1;
  var year = new Date(nextWeek).getFullYear();
  return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取上一月日期
function getLastMonth(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var year, lastMonth;
  var today = new Date(date);
  var nowYear = today.getFullYear();
  var nowMonth = today.getMonth();
  if (nowMonth == 0) {
    year = nowYear - 1;
    lastMonth = 12;
  } else {
    year = nowYear;
    lastMonth = nowMonth;
  }
  lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth;
  return year + hyphen + lastMonth;
}

// 获取下一月日期
function getNextMonth(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var year, nextMonth;
  var today = new Date(date);
  var nowYear = today.getFullYear();
  var nowMonth = today.getMonth() + 2;
  if (nowMonth == 12) {
    year = nowYear + 1;
    nextMonth = 1;
  } else {
    year = nowYear;
    nextMonth = nowMonth;
  }
  nextMonth = nextMonth < 10 ? '0' + nextMonth : nextMonth;
  return year + hyphen + nextMonth;
}

// 获取指定日期的一周开始日期（周一为每周开始，周日为每周结束）
function beginOfWeek(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var subDay = 0;
  var weekDay = new Date(date).getDay();
  if (weekDay == 0) {
    subDay = 6;
  } else {
    subDay = weekDay - 1;
  }
  var beginDateTime = new Date(date).getTime() - 86400000 * subDay;
  var day = new Date(beginDateTime).getDate();
  var month = new Date(beginDateTime).getMonth() + 1;
  var year = new Date(beginDateTime).getFullYear();
  return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取指定日期的一周结束日期（周一为每周开始，周日为每周结束）
function endOfWeek(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var weekDay = new Date(date).getDay();
  if (weekDay == 0) {
    var day = new Date(date).getDate();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();
    return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
  } else {
    var addDay = 7 - weekDay;
    var endDateTime = new Date(date).getTime() + 86400000 * addDay;
    var _day = new Date(endDateTime).getDate();
    var _month = new Date(endDateTime).getMonth() + 1;
    var _year = new Date(endDateTime).getFullYear();
    return _year + hyphen + (_month < 10 ? '0' + _month : _month) + hyphen + (_day < 10 ? '0' + _day : _day);
  }
}

// 获取指定日期的一周的所有日期的数组（周一为每周开始，周日为每周结束）
function getWeekTime(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var timesStamp = new Date(date).getTime();
  var currenDay = new Date(date).getDay();
  var dates = [];
  for (var i = 0; i < 7; i++) {
    var das = timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7);
    dates.push(formatDate(das / 1000, hyphen, "date"));
  }
  return dates;
}

// 获取指定日期的一个月开始日期
function beginOfMonth(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var currenDay = new Date(date);
  currenDay.setDate(1);
  var day = currenDay.getDate();
  var year = currenDay.getFullYear();
  var month = currenDay.getMonth() + 1;
  return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取指定日期的一个月结束日期
function endOfMonth(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var year = new Date(date).getFullYear();
  var month = new Date(date).getMonth() + 1;
  var nextMonthFirthDay = new Date(year, month, 1);
  var oneDay = 1000 * 60 * 60 * 24;
  var endDay = new Date(nextMonthFirthDay - oneDay);
  var day = endDay.getDate();
  return year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day);
}

// 获取指定日期的一个月的所有日期的数组
function getMonthTime(date) {
  var hyphen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "-";
  date = date.replace('-', '/');
  date = date.replace('-', '/');
  var dataTimes = [];
  var year = new Date(date).getFullYear();
  var month = new Date(date).getMonth() + 1;
  var number = new Date(year, month, 0).getDate();
  for (var day = 1; day < number + 1; day++) {
    dataTimes.push(year + hyphen + (month < 10 ? '0' + month : month) + hyphen + (day < 10 ? '0' + day : day));
  }
  return dataTimes; //返回天数数组
}

// 计算年龄
function getAge(birth) {
  birth = birth.replace('-', '/');
  birth = birth.replace('-', '/');
  var birthDate = new Date(birth);
  var momentDate = new Date();
  momentDate.setHours(0, 0, 0, 0);
  var thisYearBirthDate = new Date(momentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  var aDate = thisYearBirthDate - birthDate;
  var bDate = momentDate - birthDate;
  var tempAge = momentDate.getFullYear() - birthDate.getFullYear();
  var age = null;
  if (bDate < aDate) {
    tempAge = tempAge - 1;
    age = tempAge < 0 ? 0 : tempAge;
  } else {
    age = tempAge;
  }
  return age;
}

//计算两个经纬度之间的距离 单位米
function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s * 1000;
  s = parseFloat(s).toFixed(2);
  return s;
}

// 十六进制转rgb/rgba
function hexToRgb(hex, weight) {
  var reg = new RegExp("^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$");
  var color = hex ? hex.toLowerCase() : hex;
  if (color && reg.test(color)) {
    if (color.length === 4) {
      var temp = "#";
      for (var i = 1; i < 4; i += 1) {
        temp += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = temp;
    }
    var colorRes = [];
    for (var _i = 1; _i < 7; _i += 2) {
      colorRes.push(parseInt("0x" + color.slice(_i, _i + 2)));
    }
    if (weight) {
      return "rgba(" + colorRes.join(",") + "," + weight + ")";
    }
    return colorRes.join(",");
  } else {
    return color;
  }
}

// 查看文件
function openDocument(fileLink) {
  return new Promise(function (resolve, reject) {
    // 判断有无网络
    uni.getNetworkType({
      success: function success(res) {
        if (res.networkType === "none") {
          uni.showToast({
            icon: "none",
            title: "请先连接网络后操作"
          });
          uni.hideLoading();
        } else {
          uni.downloadFile({
            url: fileLink,
            success: function success(result) {
              if (result.statusCode === 200) {
                uni.openDocument({
                  filePath: result.tempFilePath,
                  showMenu: true,
                  success: function success() {
                    resolve();
                  },
                  fail: function fail(err) {
                    reject(err);
                  }
                });
              }
            },
            fail: function fail(err) {
              reject(err);
            }
          });
        }
      }
    });
  });
}
module.exports.request = request;
module.exports.uploadFile = uploadFile;
module.exports.uploadFileMultiple = uploadFileMultiple;
module.exports.verifyLogin = verifyLogin;
module.exports.toPage = toPage;
module.exports.openLink = openLink;
module.exports.getPagePermission = getPagePermission;
module.exports.getUrlParam = getUrlParam;
module.exports.validation = validation;
module.exports.getCurrentDate = getCurrentDate;
module.exports.formatDate = formatDate;
module.exports.getDateBeforeNow = getDateBeforeNow;
module.exports.getTimeDifference = getTimeDifference;
module.exports.getYesterday = getYesterday;
module.exports.getTomorrow = getTomorrow;
module.exports.getLastWeek = getLastWeek;
module.exports.getNextWeek = getNextWeek;
module.exports.getLastMonth = getLastMonth;
module.exports.getNextMonth = getNextMonth;
module.exports.beginOfWeek = beginOfWeek;
module.exports.endOfWeek = endOfWeek;
module.exports.getWeekTime = getWeekTime;
module.exports.beginOfMonth = beginOfMonth;
module.exports.endOfMonth = endOfMonth;
module.exports.getMonthTime = getMonthTime;
module.exports.getAge = getAge;
module.exports.getDistance = getDistance;
module.exports.hexToRgb = hexToRgb;
module.exports.openDocument = openDocument;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 39:
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 40)();
module.exports = runtime;

/***/ }),

/***/ 4:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 40:
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) {
              if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            }
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) {
      r.push(n);
    }
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) {
        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      }
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 41:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 42:
/*!***********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _main = _interopRequireDefault(__webpack_require__(/*! ./main.js */ 43));
var _login = _interopRequireDefault(__webpack_require__(/*! ./login.js */ 44));
var _mine = _interopRequireDefault(__webpack_require__(/*! ./mine.js */ 45));
var _member = _interopRequireDefault(__webpack_require__(/*! ./member.js */ 46));
var _mall = _interopRequireDefault(__webpack_require__(/*! ./mall.js */ 47));
var _demand = _interopRequireDefault(__webpack_require__(/*! ./demand.js */ 48));
var _activity = _interopRequireDefault(__webpack_require__(/*! ./activity.js */ 49));
var _album = _interopRequireDefault(__webpack_require__(/*! ./album.js */ 50));
var _sequence = _interopRequireDefault(__webpack_require__(/*! ./sequence.js */ 51));
var _questionnaire = _interopRequireDefault(__webpack_require__(/*! ./questionnaire.js */ 52));
var _card = _interopRequireDefault(__webpack_require__(/*! ./card.js */ 53));
var _institution = _interopRequireDefault(__webpack_require__(/*! ./institution.js */ 54));
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------
var _default = {
  // 公共模块
  main: _main.default,
  // 登录模块
  login: _login.default,
  // 个人中心模块
  mine: _mine.default,
  // 会员模块
  member: _member.default,
  // 商城模块
  mall: _mall.default,
  // 供需模块
  demand: _demand.default,
  // 活动模块
  activity: _activity.default,
  // 商会相册模块
  album: _album.default,
  // 活动接龙模块
  sequence: _sequence.default,
  // 问卷调查模块
  questionnaire: _questionnaire.default,
  // 电子名片模块
  card: _card.default,
  // 机构模块
  institution: _institution.default
};
exports.default = _default;

/***/ }),

/***/ 43:
/*!**********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/main.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 公共接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------
var _default = {
  // 系统配置
  config: {
    url: '/api/wdsxh/config/config',
    method: 'GET'
  },
  // 底部导航
  tabbar: {
    url: '/api/wdsxh/index/tabbar_index',
    method: 'GET'
  },
  // 自定义装修数据
  diyData: {
    url: '/api/wdsxh/diy/getPage',
    method: 'GET'
  },
  // 自定义搜索数据
  diySearch: {
    url: '/api/wdsxh/search/search_result',
    method: 'GET'
  },
  // 首页轮播图
  carousel: {
    url: '/api/wdsxh/banner/index',
    method: 'GET'
  },
  // 轮播图详情
  carouselDetails: {
    url: '/api/wdsxh/banner/details',
    method: 'GET'
  },
  // 快速导航
  menu: {
    url: '/api/wdsxh/index/quickmenu_index',
    method: 'GET'
  },
  // 快速导航详情
  menuDetails: {
    url: '/api/wdsxh/index/quickmenu_details',
    method: 'GET'
  },
  // 省市区管理
  address: {
    // 获取省份
    province: {
      url: '/api/wdsxh/goods/address/address_province',
      method: 'GET'
    },
    // 获取城市
    city: {
      url: '/api/wdsxh/goods/address/address_city',
      method: 'GET'
    },
    // 获取区县
    area: {
      url: '/api/wdsxh/goods/address/address_area',
      method: 'GET'
    }
  },
  // 需求建议提交
  addDemand: {
    url: '/api/wdsxh/demand/add',
    method: 'POST'
  },
  // 商协信息
  association: {
    url: '/api/wdsxh/association/index',
    method: 'GET'
  },
  // 文章管理
  article: {
    // 分类
    category: {
      url: '/api/wdsxh/article/article_cat',
      method: 'GET'
    },
    // 列表
    list: {
      url: '/api/wdsxh/article/index',
      method: 'GET'
    },
    // 详情
    details: {
      url: '/api/wdsxh/article/details',
      method: 'GET'
    },
    // 增加阅读量
    updateReadNum: {
      url: '/api/wdsxh/article/update_read_num',
      method: 'POST'
    }
  },
  // 协议内容
  agreement: {
    url: '/api/wdsxh/config/agreement',
    method: 'GET'
  },
  // 消息订阅
  message: {
    // 订阅数量
    count: {
      url: '/api/wdsxh/member/member/subscribe_count',
      auth: true,
      method: 'GET'
    },
    // 消息订阅
    subscribe: {
      url: '/api/wdsxh/member/member/submit_subscribe',
      auth: true,
      method: 'POST'
    }
  },
  // 系统配置
  WeChatConfig: {
    url: '/api/wdsxh/wananchi_user_wechat/get_wechat_config',
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 44:
/*!***********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/login.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 登录接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------
var _default = {
  // 查询用户是否已注册-微信小程序
  isAuth: {
    url: '/api/wdsxh/applet_user_wechat/is_register',
    method: 'GET'
  },
  // 绑定手机号-微信小程序
  bindMobile: {
    url: '/api/wdsxh/applet_user_wechat/bind_mobile',
    auth: true,
    method: 'POST'
  },
  // 登录-微信小程序
  login: {
    url: '/api/wdsxh/applet_user_wechat/login',
    method: 'POST'
  },
  // 注册-微信小程序
  register: {
    url: '/api/wdsxh/applet_user_wechat/register',
    method: 'POST'
  },
  // 登录-微信公众号
  officialLogin: {
    url: '/api/wdsxh/wananchi_user_wechat/mobile_login',
    method: 'POST'
  },
  // 发送验证码-微信公众号
  captcha: {
    url: '/api/sms/send',
    method: 'POST'
  },
  // 获取手机号
  getMobile: {
    url: '/api/wdsxh/user_wechat/get_mobile',
    method: 'GET',
    auth: true
  }
};
exports.default = _default;

/***/ }),

/***/ 45:
/*!**********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/mine.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 个人中心接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------
var _default = {
  // 用户信息
  user: {
    url: '/api/wdsxh/user_wechat/center',
    auth: true,
    method: 'GET'
  },
  // 个人中心自定义数据
  diyData: {
    url: '/api/wdsxh/person_center_diy_page/details',
    method: 'GET'
  },
  // 电子会牌
  poster: {
    url: '/api/wdsxh/willbrand/index',
    auth: true,
    method: 'GET'
  },
  // 更新用户信息
  updateUser: {
    url: '/api/wdsxh/user_wechat/update_nickname_avatar',
    auth: true,
    method: 'POST'
  },
  // 常见问题列表
  problemList: {
    url: '/api/wdsxh/faq/index',
    method: 'GET'
  },
  // 常见问题详情
  problemDetails: {
    url: '/api/wdsxh/faq/details',
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 46:
/*!************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/member.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 会员接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------
var _default = {
  // 会员列表
  list: {
    url: '/api/wdsxh/member/member/index',
    method: 'GET'
  },
  // 自定义装修会员列表
  diyList: {
    url: '/api/wdsxh/member/member/diy_list',
    method: 'GET'
  },
  // 自定义装修搜索会员列表
  diySearchList: {
    url: '/api/wdsxh/search/search_member_name',
    method: 'GET'
  },
  // 会员地图会员列表
  memberMapList: {
    url: '/api/wdsxh/member/member/member_map_list',
    method: 'GET'
  },
  // 会员单位
  units: {
    url: '/api/wdsxh/member/member/unit',
    method: 'GET'
  },
  // 会员详情
  details: {
    url: '/api/wdsxh/member/member/details',
    auth: true,
    method: 'GET'
  },
  // 企业详情
  enterprise: {
    url: '/api/wdsxh/member/member/company_details',
    auth: true,
    method: 'GET'
  },
  // 团体详情
  organization: {
    url: '/api/wdsxh/member/member/organize_details',
    auth: true,
    method: 'GET'
  },
  // 对外限制
  limit: {
    url: '/api/wdsxh/member/member/auth',
    method: 'GET'
  },
  // 会员级别
  level: {
    url: '/api/wdsxh/member/member_apply/level_list',
    method: 'GET'
  },
  // 入会类型
  type: {
    url: '/api/wdsxh/config/join_config',
    method: 'GET'
  },
  // 会员状态
  state: {
    url: '/api/wdsxh/user_wechat/apply_member_state',
    auth: true,
    method: 'GET'
  },
  // 入会字段
  field: {
    url: '/api/wdsxh/member/join_config/custom_field',
    auth: true,
    method: 'GET'
  },
  // 入会申请
  apply: {
    url: '/api/wdsxh/member/member_apply/submit',
    auth: true,
    method: 'POST'
  },
  // 申请详情
  applyDetails: {
    url: '/api/wdsxh/member/member_apply/details',
    auth: true,
    method: 'GET'
  },
  // 入会申请验证
  applyCheck: {
    url: '/api/wdsxh/member/member_apply/check_mobile_use',
    auth: true,
    method: 'GET'
  },
  // 会员资料
  information: {
    url: '/api/wdsxh/member/member/information_details',
    auth: true,
    method: 'GET'
  },
  // 编辑资料
  editInformation: {
    url: '/api/wdsxh/member/member/submit_information',
    auth: true,
    method: 'POST'
  },
  // 会费缴纳详情
  payDetails: {
    url: '/api/wdsxh/member/member/membershipPayDetail',
    auth: true,
    method: 'GET'
  },
  // 线上缴费
  accountInfo: {
    url: '/api/wdsxh/association/public_account_information',
    auth: true,
    method: 'GET'
  },
  // 线上缴费
  payOnline: {
    url: '/api/wdsxh/member/member/membershipPay',
    auth: true,
    method: 'POST'
  },
  // 线下缴费
  payOffline: {
    url: '/api/wdsxh/member/member/submit_pay_voucher',
    auth: true,
    method: 'POST'
  },
  // 免费入会
  payFree: {
    url: '/api/wdsxh/member/member/freeMembershipPay',
    auth: true,
    method: 'POST'
  },
  // 证书查询
  certificate: {
    url: '/api/wdsxh/member/cert/index',
    auth: true,
    method: 'GET'
  },
  // 行业分类
  industry: {
    url: '/api/wdsxh/member/member_apply/industry_category_list',
    method: 'GET'
  },
  // 通讯录
  addressBook: {
    url: '/api/wdsxh/member/member/address_book',
    auth: true,
    method: 'GET'
  },
  // 通讯录限制
  addressBookLimit: {
    url: '/api/wdsxh/member/member/address_book_auth',
    auth: true,
    method: 'GET'
  },
  // 推广会员列表
  promotionList: {
    url: '/api/wdsxh/member/promotion/index',
    auth: true,
    method: 'GET'
  },
  // 审核会员
  examine: {
    // 审核会员列表
    list: {
      url: '/api/wdsxh/member/member_apply_examine/index',
      auth: true,
      method: 'GET'
    },
    // 审核会员详情
    details: {
      url: '/api/wdsxh/member/member_apply_examine/details',
      auth: true,
      method: 'GET'
    },
    // 审核入会申请
    examineApply: {
      url: '/api/wdsxh/member/member_apply_examine/examine',
      auth: true,
      method: 'POST'
    },
    // 审核线下支付
    examineOffline: {
      url: '/api/wdsxh/member/member_apply_examine/offline_examine',
      auth: true,
      method: 'POST'
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 47:
/*!**********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/mall.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = {
  // 轮播图
  carousel: {
    url: '/api/wdsxh/goods/goods/banner_index',
    method: 'GET'
  },
  // 商城轮播图
  carouselDetails: {
    url: '/api/wdsxh/goods/goods/banner_details',
    method: 'GET'
  },
  // 商品分类
  categoay: {
    url: '/api/wdsxh/goods/goods/category_index',
    method: 'GET'
  },
  // 商品列表
  goodsList: {
    url: '/api/wdsxh/goods/goods/index',
    method: 'GET'
  },
  // 商品详情
  goodsDetails: {
    url: '/api/wdsxh/goods/goods/details',
    method: 'GET'
  },
  // 地址列表
  addressList: {
    url: '/api/wdsxh/goods/address/index',
    auth: true,
    method: 'GET'
  },
  // 添加地址
  addAddress: {
    url: '/api/wdsxh/goods/address/add',
    auth: true,
    method: 'POST'
  },
  // 修改地址
  editAddress: {
    url: '/api/wdsxh/goods/address/edit',
    auth: true,
    method: 'POST'
  },
  // 删除地址
  delAddress: {
    url: '/api/wdsxh/goods/address/del',
    auth: true,
    method: 'POST'
  },
  // 修改默认地址
  setDefault: {
    url: '/api/wdsxh/goods/address/set_default',
    auth: true,
    method: 'POST'
  },
  // 计算邮费
  getPostage: {
    url: '/api/wdsxh/goods/order/postage',
    auth: true,
    method: 'GET'
  },
  // 订单预支付
  preparePay: {
    url: '/api/wdsxh/goods/order/prepare_pay',
    auth: true,
    method: 'GET'
  },
  // 订单创建
  createOrder: {
    url: '/api/wdsxh/goods/order/create',
    auth: true,
    method: 'POST'
  },
  // 订单详情
  orderDetails: {
    url: '/api/wdsxh/goods/order/details',
    auth: true,
    method: 'GET'
  },
  // 订单列表
  orderList: {
    url: '/api/wdsxh/goods/order/index',
    auth: true,
    method: 'GET'
  },
  // 确认收货
  orderCollect: {
    url: '/api/wdsxh/goods/order/sing',
    auth: true,
    method: 'POST'
  },
  // 申请退款
  orderRefund: {
    url: '/api/wdsxh/goods/order/refund',
    auth: true,
    method: 'POST'
  },
  // 退款列表
  refundList: {
    url: '/api/wdsxh/goods/order/refund_index',
    auth: true,
    method: 'GET'
  },
  // 提交快递
  receipt: {
    url: '/api/wdsxh/goods/order/receipt',
    auth: true,
    method: 'POST'
  },
  // 取消退款
  cancelRefund: {
    url: '/api/wdsxh/goods/order/cancel_refund',
    auth: true,
    method: 'POST'
  },
  // 取消订单
  delOrder: {
    url: '/api/wdsxh/goods/order/del_order',
    auth: true,
    method: 'POST'
  },
  // 加入购物车
  addCart: {
    url: '/api/wdsxh/mall/cart/add',
    auth: true,
    method: 'POST'
  },
  // 购物车数量
  cartNumber: {
    url: '/api/wdsxh/mall/cart/cart_goods_number',
    auth: true,
    method: 'GET'
  },
  // 购物车列表
  cartList: {
    url: '/api/wdsxh/mall/cart/list',
    auth: true,
    method: 'GET'
  },
  // 更新购物车商品数量
  updateCartNumber: {
    url: '/api/wdsxh/mall/cart/update_goods_number',
    auth: true,
    method: 'POST'
  },
  // 删除购物车商品
  deleteCart: {
    url: '/api/wdsxh/mall/cart/del',
    auth: true,
    method: 'POST'
  },
  // 商城配置
  config: {
    url: '/api/wdsxh/mall/self_pickup/config',
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 48:
/*!************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/demand.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = {
  // 商圈列表
  businessIndexList: {
    url: '/api/wdsxh/business/index',
    method: 'GET'
  },
  // 自定义装修商圈列表
  businessDiyList: {
    url: '/api/wdsxh/business/diy_list',
    method: 'GET'
  },
  // 商圈分类
  businessCat: {
    url: '/api/wdsxh/business/business_cat',
    method: 'GET'
  },
  // 商圈详情
  businessDetails: {
    url: '/api/wdsxh/business/details',
    auth: true,
    method: 'GET'
  },
  // 发布
  businessAdd: {
    url: '/api/wdsxh/business/add',
    auth: true,
    method: 'POST'
  },
  // 发布列表
  businessList: {
    url: '/api/wdsxh/business/user_index',
    auth: true,
    method: 'GET'
  },
  // 发布删除
  businessDel: {
    url: '/api/wdsxh/business/del',
    auth: true,
    method: 'GET'
  },
  // 发布详情
  businessUserDetails: {
    url: '/api/wdsxh/business/user_details',
    auth: true,
    method: 'GET'
  },
  // 修改
  businessEdit: {
    url: '/api/wdsxh/business/edit',
    auth: true,
    method: 'POST'
  },
  // 商圈限制
  businessLimit: {
    url: '/api/wdsxh/business/business_config',
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 49:
/*!**************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/activity.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = {
  // 活动列表
  list: {
    url: '/api/wdsxh/activity/activity/index',
    method: 'GET'
  },
  // 活动详情
  details: {
    url: '/api/wdsxh/activity/activity/details',
    method: 'GET'
  },
  // 活动报名字段
  field: {
    url: '/api/wdsxh/activity/activity_fieldset/field',
    auth: true,
    method: 'GET'
  },
  // 提交报名
  submit: {
    url: '/api/wdsxh/activity/activity_apply/submit',
    auth: true,
    method: 'POST'
  },
  // 订单列表
  orderList: {
    url: '/api/wdsxh/activity/activity/user_index',
    auth: true,
    method: 'GET'
  },
  // 订单详情
  orderDetails: {
    url: '/api/wdsxh/activity/activity_apply/details',
    auth: true,
    method: 'GET'
  },
  // 活动核销列表
  verifyList: {
    url: '/api/wdsxh/activity/verifying/activity_list',
    auth: true,
    method: 'GET'
  },
  // 核销会员列表
  verifyMemberList: {
    url: '/api/wdsxh/activity/verifying/verifying_member_list',
    auth: true,
    method: 'GET'
  },
  // 核销活动
  verifying: {
    url: '/api/wdsxh/activity/verifying/verifying',
    auth: true,
    method: 'POST'
  },
  // 申请退款
  applyRefund: {
    url: '/api/wdsxh/activity/activity/apply_refund',
    auth: true,
    method: 'POST'
  },
  // 取消参加
  applyCancel: {
    url: '/api/wdsxh/activity/activity_apply/cancel',
    auth: true,
    method: 'POST'
  },
  // 参会凭证
  attendance: {
    url: '/api/wdsxh/activity/activity/attendance_voucher',
    auth: true,
    method: 'GET'
  },
  // 扫码签到
  scanSign: {
    url: '/api/wdsxh/activity/verifying/self_service_check_in',
    auth: true,
    method: 'POST'
  },
  // 删除未支付订单
  applyDel: {
    url: '/api/wdsxh/activity/activity_apply/del',
    auth: true,
    method: 'POST'
  },
  // 签到码参数解析
  decryptData: {
    url: '/api/wdsxh/activity/verifying/get_decrypt_data',
    auth: true,
    method: 'GET'
  },
  // 参会证书
  certificate: {
    url: '/api/wdsxh/activity/activity_electronic_certificate/index',
    auth: true,
    method: 'GET'
  },
  // 活动权限
  limit: {
    url: '/api/wdsxh/activity/activity/activity_config',
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 5:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 50:
/*!***********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/album.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 商会相册接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------
var _default = {
  // 相册列表
  albumList: {
    url: '/api/wdsxh/album/index',
    method: 'GET'
  },
  // 自定义装修相册列表
  albumDiyList: {
    url: '/api/wdsxh/album/diy_list',
    method: 'GET'
  },
  // 相册详情
  albumDetails: {
    url: '/api/wdsxh/album/details',
    method: 'GET'
  },
  // 相册权限
  albumLimit: {
    url: '/api/wdsxh/album/album_config',
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 51:
/*!**************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/sequence.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 活动接龙接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------
var _default = {
  // 接龙列表
  chainsList: {
    url: '/api/wdsxh/jielong/index',
    method: 'GET'
  },
  // 接龙详情
  chainsDetails: {
    url: '/api/wdsxh/jielong/details',
    method: 'GET'
  },
  // 限定接龙资格
  chainsSeniority: {
    url: '/api/wdsxh/jielong/jielong_state',
    auth: true,
    method: 'GET'
  },
  // 获取反馈结果
  feedbackResult: {
    url: '/api/wdsxh/jielong/feedback_state',
    auth: true,
    method: 'GET'
  },
  // 提交反馈
  addFeedback: {
    url: '/api/wdsxh/jielong/add',
    auth: true,
    method: 'POST'
  },
  // 反馈详情
  feedbackDetails: {
    url: '/api/wdsxh/jielong/feedback_details',
    auth: true,
    method: 'POST'
  },
  // 接龙权限
  limit: {
    url: '/api/wdsxh/jielong/jielong_config',
    auth: true,
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 52:
/*!*******************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/questionnaire.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 问卷调查接口列表文件 开发者: 麦沃德科技-暴雨
// +----------------------------------------------------------------------
var _default = {
  // 问卷列表
  questionList: {
    url: '/api/wdsxh/questionnaire/index/index',
    method: 'GET'
  },
  // 问卷详情
  questionDetails: {
    url: '/api/wdsxh/questionnaire/index/details',
    method: 'GET'
  },
  // 问卷提交
  questionAdd: {
    url: '/api/wdsxh/questionnaire/index/add_topic',
    auth: true,
    method: 'POST'
  },
  // 问卷反馈详情
  renderDetails: {
    url: '/api/wdsxh/questionnaire/index/render_details',
    auth: true,
    method: 'GET'
  },
  // 问卷权限
  limit: {
    url: '/api/wdsxh/questionnaire/index/answer_sheet_status',
    auth: true,
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 53:
/*!**********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/card.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 电子名片接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------
var _default = {
  // 名片列表
  list: {
    url: '/api/wdsxh/corporate/card/index',
    auth: true,
    method: 'GET'
  },
  // 名片详情
  details: {
    url: '/api/wdsxh/corporate/card/details',
    auth: true,
    method: 'GET'
  },
  // 名片统计
  statistics: {
    url: '/api/wdsxh/corporate/card/center',
    auth: true,
    method: 'GET'
  },
  // 名片样式
  background: {
    url: '/api/wdsxh/corporate/card_background/index',
    method: 'GET'
  },
  // 添加名片
  add: {
    url: '/api/wdsxh/corporate/card/add',
    auth: true,
    method: 'POST'
  },
  // 编辑名片
  edit: {
    url: '/api/wdsxh/corporate/card/edit',
    auth: true,
    method: 'POST'
  },
  // 编辑详情
  editDetails: {
    url: '/api/wdsxh/corporate/card/edit_details',
    auth: true,
    method: 'GET'
  },
  // 删除名片
  delete: {
    url: '/api/wdsxh/corporate/card/del',
    auth: true,
    method: 'POST'
  },
  // 设置默认名片
  setDefault: {
    url: '/api/wdsxh/corporate/card/set_default',
    auth: true,
    method: 'POST'
  },
  // 获取默认名片
  getDefault: {
    url: '/api/wdsxh/corporate/card/default_card',
    auth: true,
    method: 'GET'
  },
  // 设置名片靠谱
  setReliable: {
    url: '/api/wdsxh/corporate/reliable/reliable',
    auth: true,
    method: 'POST'
  },
  // 取消名片靠谱
  cancelReliable: {
    url: '/api/wdsxh/corporate/reliable/cancel',
    auth: true,
    method: 'POST'
  }
};
exports.default = _default;

/***/ }),

/***/ 54:
/*!*****************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/api/institution.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展 
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdsxh.cn    All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------
// | 机构管理接口列表文件 开发者: 麦沃德科技-半夏
// +----------------------------------------------------------------------
var _default = {
  // 机构列表
  list: {
    url: '/api/wdsxh/institution/institution/index',
    method: 'GET'
  },
  // 机构详情
  details: {
    url: '/api/wdsxh/institution/institution/details',
    method: 'GET'
  },
  // 成员列表
  member: {
    url: '/api/wdsxh/institution/member/index',
    method: 'GET'
  },
  // 机构权限
  limit: {
    url: '/api/wdsxh/institution/institution/institution_config',
    method: 'GET'
  },
  // 申请加入
  apply: {
    url: '/api/wdsxh/institution/institution_member_apply/submit',
    auth: true,
    method: 'POST'
  },
  // 机构级别
  level: {
    url: '/api/wdsxh/institution/level/index',
    method: 'GET'
  },
  // 申请详情
  applyDetails: {
    url: '/api/wdsxh/institution/institution_member_apply/details',
    auth: true,
    method: 'GET'
  }
};
exports.default = _default;

/***/ }),

/***/ 6:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 69:
/*!*****************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/svg.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var svgData = {
  more: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<path d=\"M8 0C6.41772 0 4.87103 0.46875 3.55542 1.34863C2.23987 2.22754 1.21448 3.47656 0.608948 4.93848C0.003479 6.40039 -0.154968 8.00879 0.153748 9.56055C0.462402 11.1123 1.2243 12.5381 2.34314 13.6572C3.46198 14.7754 4.88745 15.5371 6.43927 15.8467C7.99115 16.1553 9.59967 15.9961 11.0615 15.3906C12.5233 14.7852 13.7727 13.7598 14.6517 12.4443C15.5308 11.1289 16 9.58203 16 8C15.9976 5.87891 15.154 3.8457 13.6542 2.3457C12.1544 0.845703 10.121 0.00195312 8 0ZM8 14.4004C6.73419 14.4004 5.49683 14.0244 4.44434 13.3213C3.39191 12.6182 2.57159 11.6182 2.08716 10.4492C1.60278 9.2793 1.47601 7.99316 1.72296 6.75098C1.96991 5.50977 2.57947 4.36914 3.47449 3.47461C4.36957 2.5791 5.50995 1.96973 6.7514 1.72266C7.99292 1.47559 9.27972 1.60254 10.4492 2.08691C11.6186 2.57129 12.6182 3.3916 13.3214 4.44434C14.0247 5.49707 14.4 6.73438 14.4 8C14.3981 9.69727 13.7231 11.3232 12.5233 12.5234C11.3235 13.7227 9.69678 14.3984 8 14.4004Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t<path d=\"M5.76703 4.62012L9.27338 8.00098L5.76703 11.3818L6.92072 12.4932L11.5827 8.00098L6.92072 3.50684L5.76703 4.62012Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t</svg>",
  time: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<rect width=\"16.000000\" height=\"16.000000\" fill=\"#FFFFFF\" fill-opacity=\"0\"/>\n\t\t<path d=\"M8 1.33301C4.32666 1.33301 1.33337 4.32617 1.33337 8C1.33337 11.6729 4.32666 14.666 8 14.666C11.6733 14.666 14.6667 11.6729 14.6667 8C14.6667 4.32617 11.6733 1.33301 8 1.33301ZM10.9 10.3799C10.8068 10.54 10.64 10.626 10.4667 10.626C10.38 10.626 10.2933 10.6064 10.2134 10.5527L8.14673 9.31934C7.63342 9.0127 7.25342 8.33984 7.25342 7.74609L7.25342 5.0127C7.25342 4.73926 7.47998 4.5127 7.75342 4.5127C8.02673 4.5127 8.25342 4.73926 8.25342 5.0127L8.25342 7.74609C8.25342 7.98633 8.45337 8.33984 8.66003 8.45996L10.7267 9.69336C10.9667 9.83301 11.0468 10.1396 10.9 10.3799Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t<g opacity=\"0.000000\"/>\n\t</svg>",
  location: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<clipPath id=\"clip4930_3326\">\n\t\t\t\t<rect id=\"location\" width=\"16.000000\" height=\"16.000000\" fill=\"white\" fill-opacity=\"0\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<rect id=\"location\" width=\"16.000000\" height=\"16.000000\" fill=\"#FFFFFF\" fill-opacity=\"0\"/>\n\t\t<g clip-path=\"url(#clip4930_3326)\">\n\t\t\t<path id=\"Vector\" d=\"M13.7467 5.63379C13.0468 2.55371 10.3601 1.16699 8.00012 1.16699C8.00012 1.16699 8.00012 1.16699 7.99341 1.16699C5.64001 1.16699 2.94678 2.54688 2.2467 5.62695C1.46667 9.06738 3.57336 11.9805 5.4801 13.8135C6.18677 14.4941 7.09338 14.834 8.00012 14.834C8.90674 14.834 9.81335 14.4941 10.5134 13.8135C12.42 11.9805 14.5267 9.07324 13.7467 5.63379ZM8.00012 8.97363C6.84009 8.97363 5.90002 8.0332 5.90002 6.87402C5.90002 5.71387 6.84009 4.77344 8.00012 4.77344C9.16003 4.77344 10.1001 5.71387 10.1001 6.87402C10.1001 8.0332 9.16003 8.97363 8.00012 8.97363Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t\t<g opacity=\"0.000000\"/>\n\t\t\t<g opacity=\"0.000000\"/>\n\t\t</g>\n\t</svg>",
  invite: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<g opacity=\"0.000000\"/>\n\t\t<path d=\"M10.7933 1.33301L5.20667 1.33301C2.78003 1.33301 1.33337 2.7793 1.33337 5.20605L1.33337 10.7861C1.33337 13.2197 2.78003 14.666 5.20667 14.666L10.7867 14.666C13.2134 14.666 14.66 13.2197 14.66 10.793L14.66 5.20605C14.6667 2.7793 13.2201 1.33301 10.7933 1.33301ZM10.9401 6.55273C10.5333 7.71289 9.44006 8.49316 8.21338 8.49316C8.20667 8.49316 8.20667 8.49316 8.20007 8.49316L6.82666 8.48633C6.82666 8.48633 6.82666 8.48633 6.82007 8.48633C6.31335 8.48633 5.87341 8.82617 5.73999 9.31348C6.33337 9.5 6.76672 10.0527 6.76672 10.7061C6.76672 11.5127 6.10669 12.1729 5.30005 12.1729C4.49341 12.1729 3.83337 11.5127 3.83337 10.7061C3.83337 10.1133 4.19336 9.59961 4.70007 9.37305L4.70007 6.4668C4.19336 6.2666 3.83337 5.77344 3.83337 5.19922C3.83337 4.44629 4.44666 3.83301 5.20007 3.83301C5.95337 3.83301 6.56665 4.44629 6.56665 5.19922C6.56665 5.7793 6.20667 6.2666 5.70007 6.4668L5.70007 7.81348C6.02673 7.60645 6.41333 7.48633 6.82007 7.48633L6.82666 7.48633L8.20007 7.49316C8.98669 7.51953 9.68677 7.0127 9.96667 6.2793C9.64001 6.02637 9.42676 5.63965 9.42676 5.19922C9.42676 4.44629 10.04 3.83301 10.7933 3.83301C11.5468 3.83301 12.16 4.44629 12.16 5.19922C12.1667 5.90625 11.6267 6.47949 10.9401 6.55273Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t</svg>",
  phone: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<circle id=\"Ellipse 52\" cx=\"8.000000\" cy=\"7.500000\" r=\"8.000000\" fill=\"#FFFFFF\" fill-opacity=\"0\"/>\n\t\t<path id=\"\u5408\u5E76\" d=\"M5.20996 0.833008L10.7966 0.833008C13.2234 0.833008 14.67 2.2793 14.6633 4.70605L14.6633 10.293C14.6633 12.7197 13.2167 14.166 10.79 14.166L5.20996 14.166C2.78333 14.166 1.33667 12.7197 1.33667 10.2861L1.33667 4.70605C1.33667 2.2793 2.78333 0.833008 5.20996 0.833008Z\" clip-rule=\"evenodd\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"evenodd\"/>\n\t\t<path id=\"Vector\" d=\"M5.6 6.96C6.24 8.21 7.28 9.24 8.53 9.89L9.51 8.91C9.63 8.79 9.81 8.75 9.96 8.8C10.46 8.97 11 9.05 11.55 9.05C11.8 9.05 12 9.25 12 9.5L12 11.05C12 11.29 11.8 11.5 11.55 11.5C7.38 11.5 4 8.11 4 3.94C4 3.7 4.19 3.5 4.44 3.5L6 3.5C6.24 3.5 6.44 3.7 6.44 3.94C6.44 4.5 6.53 5.03 6.69 5.53C6.74 5.68 6.71 5.86 6.58 5.98L5.6 6.96Z\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t</svg>",
  clock: "<svg width=\"20.000000\" height=\"20.000000\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<g clip-path=\"url(#clip4609_5448)\">\n\t\t\t<path id=\"Vector\" d=\"M10 2.125C5.1875 2.125 1.25 6.0625 1.25 10.875C1.25 15.6875 5.1875 19.625 10 19.625C14.8125 19.625 18.75 15.6875 18.75 10.875C18.75 6.0625 14.8125 2.125 10 2.125ZM10 18.375C5.875 18.375 2.5 15 2.5 10.875C2.5 6.6875 5.875 3.3125 10 3.3125C14.125 3.3125 17.5625 6.6875 17.5625 10.875C17.5625 15 14.1875 18.375 10 18.375ZM17.1875 3.75C17.3125 3.8125 17.375 3.875 17.5 3.875C17.6875 3.875 17.875 3.75 18 3.625L18.125 3.4375C18.1875 3.3125 18.25 3.125 18.25 3C18.25 2.8125 18.125 2.6875 18 2.625L15.9375 1.1875C15.8125 1.125 15.75 1.0625 15.625 1.0625C15.4375 1.0625 15.25 1.1875 15.125 1.3125L15 1.5C14.9375 1.625 14.875 1.8125 14.875 1.9375C14.875 2.0625 15 2.25 15.125 2.3125L17.1875 3.75ZM2 3.875C2.125 4 2.3125 4.125 2.5 4.125C2.625 4.125 2.75 4.0625 2.875 4L4.75 2.375C5 2.125 5.0625 1.75 4.8125 1.5L4.75 1.375C4.625 1.25 4.4375 1.1875 4.25 1.1875C4.125 1.1875 4 1.25 3.875 1.3125L2 2.9375C1.75 3.125 1.6875 3.5 1.9375 3.75L2 3.875Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t\t<path id=\"Vector\" d=\"M12.875 10.3125L9.8125 10.3125L9.8125 7C9.8125 6.6875 9.5625 6.375 9.1875 6.3125L9.125 6.3125C8.75 6.3125 8.4375 6.625 8.4375 7L8.4375 11.625L12.875 11.625C13.25 11.625 13.5625 11.3125 13.5625 10.9375C13.5625 10.625 13.25 10.3125 12.875 10.3125Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  down: "<svg width=\"10.000000\" height=\"8.000000\" viewBox=\"0 0 10 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<path id=\"Polygon 2\" d=\"M5.54607 7.71387C5.30338 8.0957 4.69662 8.0957 4.45393 7.71387L0.0854187 0.857422C-0.157272 0.476562 0.146088 0 0.631485 0L9.36852 0C9.85391 0 10.1573 0.476562 9.91458 0.857422L5.54607 7.71387Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t</svg>",
  release: "<svg width=\"20.000000\" height=\"20.000000\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<g clip-path=\"url(#clip4557_5025)\">\n\t\t\t<circle id=\"Ellipse 67\" cx=\"10.000000\" cy=\"10.000000\" r=\"10.000000\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\"/>\n\t\t\t<path id=\"Vector\" d=\"M11.917 17.9775C11.775 17.9775 11.6371 17.9092 11.5511 17.791L11.5492 17.7871L8.57495 13.0439C8.573 13.042 8.57092 13.04 8.56897 13.04L2.50659 12.5967L2.50061 12.5967C2.3147 12.5723 2.16077 12.4346 2.11682 12.251C2.07288 12.0703 2.14685 11.8789 2.29871 11.7725L15.5367 3.38379L15.5388 3.38184C15.6587 3.30176 15.8086 3.28027 15.9425 3.32812C16.1644 3.41016 16.2823 3.62988 16.2363 3.84766L12.3586 17.6172C12.3207 17.791 12.1848 17.9287 12.0109 17.9668C11.9789 17.9727 11.9469 17.9775 11.917 17.9775Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  security: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<g clip-path=\"url(#clip4557_7034)\">\n\t\t\t<path id=\"Vector\" d=\"M8 0.666992L2 3.33398L2 7.33398C2 11.0332 4.56006 14.4941 8 15.334C11.4399 14.4941 14 11.0332 14 7.33398L14 3.33398L8 0.666992ZM8 7.99414L12.6666 7.99414C12.3134 10.7402 10.48 13.1865 8 13.9541L8 8L3.33337 8L3.33337 4.2002L8 2.12695L8 7.99414Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  sheet: "<svg width=\"109.000008\" height=\"99.000000\" viewBox=\"0 0 109 99\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<linearGradient id=\"paint_linear_4474_1306_0\" x1=\"31.000008\" y1=\"20.500000\" x2=\"68.500000\" y2=\"82.499992\" gradientUnits=\"userSpaceOnUse\">\n\t\t\t\t<stop stop-color=\"#325DFF\"/>\n\t\t\t\t<stop offset=\"1.000000\" stop-color=\"#325DFF\" stop-opacity=\"0.000000\"/>\n\t\t\t</linearGradient>\n\t\t\t<linearGradient id=\"paint_linear_4474_1307_0\" x1=\"31.500008\" y1=\"12.500000\" x2=\"69.000000\" y2=\"74.499992\" gradientUnits=\"userSpaceOnUse\">\n\t\t\t\t<stop stop-color=\"#325DFF\"/>\n\t\t\t\t<stop offset=\"1.000000\" stop-color=\"#325DFF\" stop-opacity=\"0.000000\"/>\n\t\t\t</linearGradient>\n\t\t</defs>\n\t\t<path d=\"M0 38C10 33.667 45.2 15.2002 52 8C59 18.5 95.5 63.5 100.5 64.5C95 69.5 46.5 94 42.5 99C38.5 93 17.5 49.5 0 38Z\" fill=\"url(#paint_linear_4474_1306_0)\" fill-opacity=\"1.000000\" fill-rule=\"evenodd\"/>\n\t\t<path d=\"M0.5 30C10.5 25.667 45.7 7.2002 52.5 0C59.5 10.5 96 55.5 101 56.5C95.5 61.5 47 86 43 91C39 85 18 41.5 0.5 30Z\" fill=\"url(#paint_linear_4474_1307_0)\" fill-opacity=\"1.000000\" fill-rule=\"evenodd\"/>\n\t\t<rect x=\"18.000000\" y=\"35.036133\" rx=\"2.000000\" width=\"32.000000\" height=\"4.000000\" transform=\"rotate(-30.0748 18.000000 35.036133)\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\"/>\n\t\t<rect x=\"23.000000\" y=\"43.036133\" rx=\"2.000000\" width=\"32.000000\" height=\"4.000000\" transform=\"rotate(-30.0748 23.000000 43.036133)\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\"/>\n\t\t<rect x=\"28.000000\" y=\"51.036133\" rx=\"2.000000\" width=\"32.000000\" height=\"4.000000\" transform=\"rotate(-30.0748 28.000000 51.036133)\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\"/>\n\t\t<path d=\"M48.8848 74.2119L48.9126 74.2168C49.0707 74.4482 49.0134 74.7539 48.7823 74.9121C48.5512 75.0703 48.2454 75.0127 48.0873 74.7822L48.0925 74.7539L48.8848 74.2119ZM70.3253 58.1465L70.3535 58.1465C70.5515 58.3438 70.5515 58.6553 70.3535 58.8535C70.1556 59.0508 69.8444 59.0508 69.6465 58.8535L69.6465 58.8252L70.3253 58.1465Z\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t<path d=\"M48.5 74.5C46.3333 71.333 43.9 65.1992 51.5 66C61 67 65 70 65 66C65 62 60.5 57 65 57.5C68.6 57.8994 69.8333 58.333 70 58.5\" stroke=\"#FFFFFF\" stroke-opacity=\"1.000000\" stroke-width=\"1.000000\" stroke-linecap=\"round\"/>\n\t\t<path d=\"M71.2453 59C69.7148 52.8887 75.733 49.2129 78.5889 43.0098C89.0602 25.2285 76.821 10.7539 108.915 4C109.459 15.5791 107.283 23.8496 105.515 28.123L97.2197 31.9824C99.1689 31.6611 103.448 30.7969 104.971 29.915C103.475 36.2559 101.027 40.2529 99.2596 41.3555C96.7573 42.1279 93.8652 42.7803 92.732 43.0098L98.5796 43.5615C97.129 45.4453 92.5416 49.792 86.3404 49.9023C83.5117 49.9023 79.1782 48.4775 78.3169 48.248L97.2197 18.749C91.916 25.7793 79.296 43.6719 71.2453 59Z\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\" fill-rule=\"evenodd\"/>\n\t\t<path d=\"M70.2453 59C68.7148 52.8887 74.733 49.2129 77.5889 43.0098C88.0602 25.2285 75.821 10.7539 107.915 4C108.459 15.5791 106.283 23.8496 104.515 28.123L96.2197 31.9824C98.1689 31.6611 102.448 30.7969 103.971 29.915C102.475 36.2559 100.027 40.2529 98.2596 41.3555C95.7573 42.1279 92.8652 42.7803 91.732 43.0098L97.5796 43.5615C96.129 45.4453 91.5416 49.792 85.3404 49.9023C82.5117 49.9023 78.1782 48.4775 77.3169 48.248L96.2197 18.749C90.916 25.7793 78.296 43.6719 70.2453 59Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"evenodd\"/>\n\t</svg>",
  fees: "<svg width=\"375.262451\" height=\"60.000000\" viewBox=\"0 0 375.262 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<linearGradient id=\"paint_linear_4557_7531_0\" x1=\"8.283279\" y1=\"54.999969\" x2=\"362.449951\" y2=\"54.999969\" gradientUnits=\"userSpaceOnUse\">\n\t\t\t\t<stop stop-color=\"#325DFF\"/>\n\t\t\t\t<stop offset=\"1.000000\" stop-color=\"#325DFF\"/>\n\t\t\t</linearGradient>\n\t\t</defs>\n\t\t<path id=\"Vector 18\" d=\"M0.131104 0L187.7 50.4648L375.131 0L375.131 59.9268L187.7 60L0.131104 59.9268L0.131104 0Z\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\" fill-rule=\"evenodd\"/>\n\t\t<path id=\"Vector 19\" d=\"\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t<path id=\"Vector 19\" d=\"M0.131104 4L187.7 55L375.131 4\" stroke=\"url(#paint_linear_4557_7531_0)\" stroke-opacity=\"1.000000\" stroke-width=\"1.000000\"/>\n\t</svg>",
  pay: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<clipPath id=\"clip5365_4444\">\n\t\t\t\t<rect width=\"16.000000\" height=\"16.000000\" fill=\"white\" fill-opacity=\"0\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<rect width=\"16.000000\" height=\"16.000000\" fill=\"#FFFFFF\" fill-opacity=\"0\"/>\n\t\t<g clip-path=\"url(#clip5365_4444)\">\n\t\t\t<path id=\"Vector\" d=\"M13.6331 4.13574C13.9661 4.46875 14.137 4.88086 14.146 5.37305L14.146 12.373C14.137 12.8652 13.9661 13.2773 13.6331 13.6104C13.3 13.9434 12.8879 14.1143 12.396 14.123L3.646 14.123C3.15405 14.1143 2.74097 13.9434 2.40894 13.6104C2.07593 13.2773 1.90503 12.8652 1.896 12.373L1.896 5.37305C1.90503 4.88086 2.07593 4.46875 2.40894 4.13574C2.74194 3.80273 3.15405 3.63184 3.646 3.62305L12.396 3.62305C12.8879 3.63281 13.3 3.80273 13.6331 4.13574ZM2.88696 2.63184C2.80908 2.55469 2.771 2.44727 2.771 2.31055C2.771 2.1748 2.81006 2.06738 2.88696 1.99023C2.96411 1.91309 3.07202 1.87402 3.20801 1.87402L12.833 1.87402C12.97 1.87402 13.0769 1.91309 13.1541 1.99023C13.231 2.06836 13.27 2.1748 13.27 2.31055C13.27 2.44727 13.231 2.55469 13.1541 2.63184C13.0759 2.70996 12.969 2.74805 12.833 2.74805L3.20801 2.74805C3.07104 2.74805 2.96411 2.70996 2.88696 2.63184ZM8.45801 9.39258L8.45801 8.87305L9.77002 8.87305C9.90698 8.87305 10.0139 8.83398 10.0911 8.75684C10.168 8.67969 10.207 8.57227 10.207 8.43555C10.207 8.2998 10.168 8.19238 10.0911 8.11523C10.0129 8.03809 9.90601 7.99902 9.77002 7.99902L8.97705 7.99902L9.85205 7.12402C9.94312 7.0332 9.98901 6.92969 9.98901 6.81641C9.98901 6.70215 9.94312 6.60156 9.85205 6.51465C9.76099 6.42773 9.66089 6.38477 9.55103 6.38477C9.44092 6.38477 9.34106 6.42578 9.25 6.50781L8.02002 7.73828L6.79004 6.60449C6.69897 6.5127 6.59888 6.4668 6.48901 6.4668C6.37891 6.4668 6.27905 6.5127 6.18799 6.60449C6.09692 6.69531 6.05103 6.79492 6.05103 6.90527C6.05103 7.01465 6.09692 7.11523 6.18799 7.20605L7.06299 7.99902L6.27002 7.99902C6.13306 7.99902 6.02588 8.03809 5.94897 8.11523C5.87109 8.19336 5.83301 8.2998 5.83301 8.43555C5.83301 8.57227 5.87207 8.67969 5.94897 8.75684C6.02588 8.83496 6.13403 8.87305 6.27002 8.87305L7.58203 8.87305L7.58203 9.39258L6.271 9.39258C6.13403 9.40234 6.0271 9.44629 5.94995 9.52344C5.87207 9.60059 5.83398 9.70508 5.83398 9.83691C5.83398 9.96875 5.87305 10.0742 5.94995 10.1514C6.0271 10.2295 6.13501 10.2666 6.271 10.2666L7.58301 10.2666L7.58301 10.9775C7.58301 11.1064 7.62207 11.208 7.69897 11.2861C7.77588 11.3643 7.88403 11.4023 8.02002 11.4023C8.15601 11.4023 8.26392 11.3633 8.34106 11.2861C8.41797 11.209 8.45703 11.1064 8.45703 10.9775L8.45703 10.2666L9.76904 10.2666C9.90601 10.2666 10.0129 10.2275 10.0901 10.1514C10.167 10.0742 10.2061 9.96875 10.2061 9.83691C10.2061 9.70508 10.167 9.59961 10.0901 9.52344C10.012 9.44629 9.90503 9.40234 9.76904 9.39258L8.45801 9.39258Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  edit: "<svg width=\"24.000000\" height=\"24.000000\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<clipPath id=\"clip4609_5918\">\n\t\t\t\t<rect id=\"border_color\" width=\"24.000000\" height=\"24.000000\" fill=\"white\" fill-opacity=\"0\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<rect id=\"border_color\" width=\"24.000000\" height=\"24.000000\" fill=\"#FFFFFF\" fill-opacity=\"0\"/>\n\t\t<g clip-path=\"url(#clip4609_5918)\">\n\t\t\t<path id=\"Vector\" d=\"M15.8958 8.53125L13.4696 6.10352L7 12.5742L7 15L9.42612 15L15.8958 8.53125ZM17.8108 6.61523C18.0631 6.36328 18.0631 5.95508 17.8108 5.70312L16.2969 4.18945C16.0446 3.9375 15.637 3.9375 15.3846 4.18945L14.1166 5.45703L16.5427 7.88281L17.8108 6.61523Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t\t<path id=\"Vector\" d=\"M4 17L20 17L20 20L4 20L4 17Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  navigation: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<clipPath id=\"clip4934_3111\">\n\t\t\t\t<rect id=\"route-square\" width=\"16.000000\" height=\"16.000000\" fill=\"white\" fill-opacity=\"0\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<rect id=\"route-square\" width=\"16.000000\" height=\"16.000000\" fill=\"#FFFFFF\" fill-opacity=\"0\"/>\n\t\t<g clip-path=\"url(#clip4934_3111)\">\n\t\t\t<g opacity=\"0.000000\"/>\n\t\t\t<path id=\"Vector\" d=\"M10.7934 1.33301L5.20668 1.33301C2.78001 1.33301 1.33334 2.7793 1.33334 5.20605L1.33334 10.7861C1.33334 13.2197 2.78001 14.666 5.20668 14.666L10.7867 14.666C13.2133 14.666 14.66 13.2197 14.66 10.793L14.66 5.20605C14.6667 2.7793 13.22 1.33301 10.7934 1.33301ZM11.5667 6.0332L10.0067 11.0596C9.63335 12.2529 7.96001 12.2734 7.56668 11.0859L7.10001 9.70605C6.97334 9.32617 6.67334 9.01953 6.29335 8.89941L4.90668 8.43262C3.73334 8.04004 3.74667 6.35254 4.94002 5.99316L9.96667 4.42676C10.9533 4.12598 11.88 5.05273 11.5667 6.0332Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  network: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs>\n\t\t\t<clipPath id=\"clip241_6749\">\n\t\t\t\t<rect width=\"16.000000\" height=\"16.000000\" fill=\"white\" fill-opacity=\"0\"/>\n\t\t\t</clipPath>\n\t\t</defs>\n\t\t<g clip-path=\"url(#clip241_6749)\">\n\t\t\t<circle cx=\"8.000000\" cy=\"8.500000\" r=\"7.000000\" fill=\"#325DFF\" fill-opacity=\"1.000000\"/>\n\t\t\t<path id=\"path\" d=\"M8 3.5C5.23859 3.5 3 5.73828 3 8.5C3 11.2617 5.23859 13.5 8 13.5C10.7614 13.5 13 11.2617 13 8.5C13 5.73828 10.7614 3.5 8 3.5ZM7.64288 6.33789C7.16315 6.29785 6.70569 6.18066 6.28406 5.99414C6.62555 5.0957 7.13013 4.48535 7.64288 4.28711L7.64288 6.33789ZM7.64288 7.05273L7.64288 8.14258L5.86707 8.14258C5.88995 7.61328 5.96216 7.12207 6.07233 6.67871C6.56104 6.88477 7.08905 7.0127 7.64288 7.05273ZM7.64288 8.85742L7.64288 9.94727C7.08905 9.9873 6.56104 10.1152 6.07233 10.3213C5.96204 9.87793 5.88995 9.38672 5.86707 8.85742L7.64288 8.85742ZM7.64288 10.6621L7.64288 12.7129C7.13013 12.5146 6.62555 11.9043 6.28406 11.0059C6.70569 10.8193 7.16315 10.7021 7.64288 10.6621ZM8.35712 10.6621C8.83685 10.7021 9.29431 10.8193 9.71594 11.0059C9.37445 11.9043 8.86987 12.5146 8.35712 12.7129L8.35712 10.6621ZM8.35712 9.94727L8.35712 8.85742L10.1329 8.85742C10.11 9.38672 10.038 9.87793 9.92767 10.3213C9.43896 10.1152 8.91095 9.9873 8.35712 9.94727ZM8.35712 8.14258L8.35712 7.05273C8.91095 7.0127 9.43896 6.88477 9.92767 6.67871C10.038 7.12207 10.11 7.61328 10.1329 8.14258L8.35712 8.14258ZM8.35712 6.33789L8.35712 4.28711C8.86987 4.48535 9.37445 5.0957 9.71594 5.99414C9.29431 6.18066 8.83685 6.29785 8.35712 6.33789ZM9.79645 4.61426C10.1715 4.78809 10.5142 5.01172 10.8246 5.28516C10.6744 5.41797 10.5123 5.53613 10.3447 5.64648C10.1902 5.25879 10.0058 4.91113 9.79645 4.61426ZM5.65546 5.64648C5.48785 5.53613 5.32568 5.41797 5.17548 5.28516C5.48584 5.01172 5.82861 4.78809 6.20367 4.61426C5.9942 4.91113 5.80981 5.25879 5.65546 5.64648ZM5.42401 6.34863C5.27356 6.89844 5.17914 7.50391 5.15326 8.14258L3.73248 8.14258C3.80591 7.25879 4.14679 6.44922 4.67688 5.79883C4.90723 6.00488 5.15839 6.1875 5.42401 6.34863ZM5.15314 8.85742C5.17902 9.49609 5.27344 10.1016 5.42389 10.6514C5.15826 10.8125 4.90723 10.9951 4.6767 11.2012C4.14655 10.5508 3.80566 9.74121 3.73224 8.85742L5.15314 8.85742ZM5.65546 11.3535C5.80981 11.7412 5.9942 12.0889 6.20367 12.3857C5.82861 12.2119 5.4859 11.9883 5.17548 11.7148C5.32568 11.582 5.48785 11.4639 5.65546 11.3535ZM10.3445 11.3535C10.5121 11.4639 10.6743 11.582 10.8246 11.7148C10.5142 11.9883 10.1714 12.2119 9.79633 12.3857C10.0058 12.0889 10.1902 11.7412 10.3445 11.3535ZM10.576 10.6514C10.7264 10.1016 10.8209 9.49609 10.8467 8.85742L12.2675 8.85742C12.1941 9.74121 11.8532 10.5508 11.3231 11.2012C11.0928 10.9951 10.8416 10.8125 10.576 10.6514ZM10.8469 8.14258C10.821 7.50391 10.7266 6.89844 10.5761 6.34863C10.8417 6.1875 11.0928 6.00488 11.3233 5.79883C11.8535 6.44922 12.1943 7.25879 12.2678 8.14258L10.8469 8.14258Z\" fill=\"#FFFFFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t\t</g>\n\t</svg>",
  share: "<svg width=\"16.000000\" height=\"16.000000\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<path id=\"Vector\" d=\"M14.7356 8.4209C14.7356 8.25391 14.8021 8.09277 14.9207 7.97461C15.0391 7.85645 15.1997 7.78906 15.3672 7.78906C15.5347 7.78906 15.6953 7.85645 15.8137 7.97461C15.9321 8.09277 15.9987 8.25391 15.9987 8.4209L15.9987 13.6846C15.9987 14.9629 14.9619 16 13.6831 16L2.31555 16C1.03674 16 0 14.9629 0 13.6846L0 2.94727C0 1.66895 1.03674 0.631836 2.31555 0.631836L7.78882 0.631836C7.9563 0.631836 8.11694 0.698242 8.23535 0.816406C8.35388 0.93457 8.42041 1.0957 8.42041 1.26367C8.42041 1.43066 8.35388 1.5918 8.23535 1.70996C8.11694 1.82812 7.9563 1.89453 7.78882 1.89453L2.31555 1.89453C2.0365 1.89453 1.76868 2.00586 1.57129 2.20312C1.3739 2.40039 1.26306 2.66797 1.26306 2.94727L1.26306 13.6846C1.26306 13.9639 1.3739 14.2314 1.57129 14.4287C1.76868 14.626 2.0365 14.7373 2.31555 14.7373L13.6831 14.7373C13.9623 14.7373 14.23 14.626 14.4274 14.4287C14.6248 14.2314 14.7356 13.9639 14.7356 13.6846L14.7356 8.4209ZM13.9056 2.94727L12.1335 1.06445C12.0187 0.942383 11.9572 0.780273 11.9622 0.612305C11.9673 0.445312 12.0387 0.286133 12.1606 0.171875C12.2827 0.0566406 12.4453 -0.00488281 12.6127 0C12.7802 0.00585938 12.9387 0.0771484 13.0535 0.199219L15.8271 3.14648C16.2064 3.54883 15.9205 4.21094 15.3672 4.21094L12.1971 4.21094C10.5852 4.21094 9.26245 5.61621 9.26245 7.36816L9.26245 11.1582C9.26245 11.3252 9.1958 11.4863 9.07739 11.6045C8.95898 11.7227 8.79834 11.7891 8.63086 11.7891C8.46338 11.7891 8.30273 11.7227 8.18433 11.6045C8.06592 11.4863 7.99939 11.3252 7.99939 11.1582L7.99939 7.36816C7.99939 4.93457 9.86987 2.94727 12.1971 2.94727L13.9056 2.94727Z\" fill=\"#325DFF\" fill-opacity=\"1.000000\" fill-rule=\"nonzero\"/>\n\t</svg>",
  downloads: "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<path d=\"M10.7933 1.33301H5.20659C2.77992 1.33301 1.33325 2.77967 1.33325 5.20634V10.7863C1.33325 13.2197 2.77992 14.6663 5.20659 14.6663H10.7866C13.2133 14.6663 14.6599 13.2197 14.6599 10.793V5.20634C14.6666 2.77967 13.2199 1.33301 10.7933 1.33301ZM5.64659 7.31967C5.83992 7.12634 6.15992 7.12634 6.35325 7.31967L7.49992 8.46634V4.33967C7.49992 4.06634 7.72659 3.83967 7.99992 3.83967C8.27325 3.83967 8.49992 4.06634 8.49992 4.33967V8.46634L9.64659 7.31967C9.83992 7.12634 10.1599 7.12634 10.3533 7.31967C10.5466 7.51301 10.5466 7.83301 10.3533 8.02634L8.35325 10.0263C8.30659 10.073 8.25325 10.1063 8.19325 10.133C8.13325 10.1597 8.06659 10.173 7.99992 10.173C7.93325 10.173 7.87325 10.1597 7.80659 10.133C7.74659 10.1063 7.69325 10.073 7.64659 10.0263L5.64659 8.02634C5.45325 7.83301 5.45325 7.51967 5.64659 7.31967ZM12.1599 11.4797C10.8199 11.9263 9.41325 12.153 7.99992 12.153C6.58659 12.153 5.17992 11.9263 3.83992 11.4797C3.57992 11.393 3.43992 11.1063 3.52659 10.8463C3.61325 10.5863 3.89325 10.4397 4.15992 10.533C6.63992 11.3597 9.36659 11.3597 11.8466 10.533C12.1066 10.4463 12.3933 10.5863 12.4799 10.8463C12.5599 11.113 12.4199 11.393 12.1599 11.4797Z\" fill=\"#325DFF\"/>\n\t</svg>",
  upload: "<svg width=\"36\" height=\"32\" viewBox=\"0 0 36 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t<desc>\n\t\t\tCreated with maiwd-zct.\n\t\t</desc>\n\t\t<defs/>\n\t\t<path d=\"M3.6002 24.3258C3.59361 25.1258 3.91496 25.8955 4.49359 26.4658C5.07221 27.036 5.86072 27.36 6.68568 27.3665H12.4674C12.9136 27.3658 13.3542 27.2705 13.7585 27.0875C14.1628 26.9045 14.521 26.6381 14.8081 26.3069L16.3081 24.5825C16.5952 24.2514 16.9534 23.985 17.3577 23.8019C17.762 23.6189 18.2027 23.5237 18.6488 23.5229H29.8238C30.6487 23.5164 31.4372 23.1924 32.0159 22.6221C32.5945 22.0519 32.9158 21.2822 32.9092 20.4822V3.04073C32.9158 2.24076 32.5945 1.47101 32.0159 0.900776C31.4372 0.330545 30.6487 0.0065318 29.8238 0H6.68568C5.86072 0.0065318 5.07221 0.330545 4.49359 0.900776C3.91496 1.47101 3.59361 2.24076 3.6002 3.04073V24.3258Z\" fill=\"#0059FF\" fill-opacity=\"0.6\"/>\n\t\t<path d=\"M0.000120755 7.68835C-0.00826585 6.62201 0.420494 5.5961 1.19209 4.83629C1.96369 4.07647 3.01493 3.64498 4.11459 3.63672L10.95 3.63672C11.4861 3.6375 12.0167 3.74066 12.5116 3.94032C13.0066 4.13998 13.4561 4.43222 13.8345 4.80036L15.5475 6.45854C15.926 6.82667 16.3755 7.11891 16.8704 7.31857C17.3653 7.51823 17.896 7.62139 18.432 7.62217H31.8854C32.9847 7.63044 34.0356 8.06163 34.8071 8.82097C35.5786 9.58031 36.0077 10.6057 35.9999 11.6716V27.948C36.0041 28.4761 35.9011 28.9998 35.6966 29.4892C35.4921 29.9786 35.1902 30.4242 34.8082 30.8005C34.4261 31.1768 33.9713 31.4765 33.4698 31.6823C32.9684 31.8882 32.43 31.9963 31.8854 32.0004H4.11459C3.01493 31.9921 1.96369 31.5606 1.19209 30.8008C0.420494 30.041 -0.00826585 29.0151 0.000120755 27.9487V7.68835Z\" fill=\"#0059FF\"/>\n\t\t<path d=\"M13.6441 20.2883C13.4483 20.2885 13.2568 20.2329 13.0933 20.1286C12.9297 20.0242 12.8014 19.8756 12.7241 19.7011C12.6468 19.5267 12.624 19.3341 12.6585 19.1472C12.693 18.9604 12.7832 18.7874 12.9181 18.6498L17.4683 13.9996C17.5644 13.9013 17.6801 13.823 17.8084 13.7696C17.9367 13.7161 18.0749 13.6885 18.2146 13.6885C18.3542 13.6885 18.4924 13.7161 18.6207 13.7696C18.749 13.823 18.8647 13.9013 18.9608 13.9996L23.511 18.6491C23.6459 18.7867 23.7362 18.9596 23.7707 19.1465C23.8052 19.3334 23.7824 19.526 23.7051 19.7004C23.6278 19.8748 23.4994 20.0235 23.3359 20.1278C23.1723 20.2322 22.9808 20.2878 22.785 20.2876H20.9701C20.8336 20.2876 20.7027 20.3402 20.6062 20.4337C20.5098 20.5273 20.4556 20.6542 20.4556 20.7865V22.7123C20.4557 22.8433 20.4291 22.9731 20.3775 23.0941C20.3259 23.2152 20.2501 23.3252 20.1547 23.4179C20.0592 23.5105 19.9458 23.584 19.821 23.6342C19.6962 23.6843 19.5624 23.7102 19.4273 23.7102H17.0018C16.7291 23.7102 16.4676 23.6051 16.2748 23.4181C16.0819 23.2311 15.9736 22.9775 15.9736 22.7131V20.7865C15.9736 20.6542 15.9194 20.5273 15.8229 20.4337C15.7264 20.3402 15.5955 20.2876 15.4591 20.2876L13.6441 20.2883Z\" fill=\"white\" fill-opacity=\"0.9\"/>\n\t</svg>",
  address: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\">\n\t\t<path d=\"M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z\" stroke=\"#325DFF\" stroke-miterlimit=\"10\"/>\n\t\t<path d=\"M6.75 4.00012C5.235 4.00012 4 5.24012 4 6.75012C4 8.00012 4 8.00012 5.25 8.00012C6.76 8.00012 8 6.76012 8 5.25012C8 3.96225 8 4.00012 6.75 4.00012Z\" stroke=\"#325DFF\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n\t</svg>",
  details: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\">\n\t\t<path d=\"M10.6667 1.33398H5.33333C2.66666 1.33398 1.33333 2.66732 1.33333 5.33398V14.0007C1.33333 14.3673 1.63333 14.6673 1.99999 14.6673H10.6667C13.3333 14.6673 14.6667 13.334 14.6667 10.6673V5.33398C14.6667 2.66732 13.3333 1.33398 10.6667 1.33398ZM9.33333 10.1673H4.66666C4.39333 10.1673 4.16666 9.94065 4.16666 9.66732C4.16666 9.39398 4.39333 9.16732 4.66666 9.16732H9.33333C9.60666 9.16732 9.83333 9.39398 9.83333 9.66732C9.83333 9.94065 9.60666 10.1673 9.33333 10.1673ZM11.3333 6.83398H4.66666C4.39333 6.83398 4.16666 6.60732 4.16666 6.33398C4.16666 6.06065 4.39333 5.83398 4.66666 5.83398H11.3333C11.6067 5.83398 11.8333 6.06065 11.8333 6.33398C11.8333 6.60732 11.6067 6.83398 11.3333 6.83398Z\" fill=\"#325DFF\"/>\n\t</svg>",
  auth: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\">\n\t\t<path d=\"M8.90473 2.745V3.115L7.13473 2.09C6.46473 1.705 5.52973 1.705 4.86473 2.09L3.09473 3.12V2.745C3.09473 1.62 3.70973 1 4.83473 1H7.16473C8.28973 1 8.90473 1.62 8.90473 2.745Z\" fill=\"#325DFF\"/>\n\t\t<path d=\"M8.92 3.98512L8.85 3.95012L8.17 3.56012L6.76 2.74512C6.33 2.49512 5.67 2.49512 5.24 2.74512L3.83 3.55512L3.15 3.95512L3.06 4.00012C2.185 4.59012 2.125 4.70012 2.125 5.64512V7.90512C2.125 8.85012 2.185 8.96012 3.08 9.56512L5.24 10.8101C5.455 10.9401 5.725 10.9951 6 10.9951C6.27 10.9951 6.545 10.9351 6.76 10.8101L8.94 9.55012C9.82 8.96012 9.875 8.85512 9.875 7.90512V5.64512C9.875 4.70012 9.815 4.59012 8.92 3.98512ZM7.395 6.75012L7.09 7.12512C7.04 7.18012 7.005 7.28512 7.01 7.36012L7.04 7.84012C7.06 8.13512 6.85 8.28512 6.575 8.18012L6.13 8.00012C6.06 7.97512 5.945 7.97512 5.875 8.00012L5.43 8.17512C5.155 8.28512 4.945 8.13012 4.965 7.83512L4.995 7.35512C5 7.28012 4.965 7.17512 4.915 7.12012L4.605 6.75012C4.415 6.52512 4.5 6.27512 4.785 6.20012L5.25 6.08012C5.325 6.06012 5.41 5.99012 5.45 5.93012L5.71 5.53012C5.87 5.28012 6.125 5.28012 6.29 5.53012L6.55 5.93012C6.59 5.99512 6.68 6.06012 6.75 6.08012L7.215 6.20012C7.5 6.27512 7.585 6.52512 7.395 6.75012Z\" fill=\"#325DFF\"/>\n\t</svg>",
  rectangle: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"58\" height=\"53\" viewBox=\"0 0 58 53\" fill=\"none\">\n\t\t<path d=\"M34 0H58L24 53H0L34 0Z\" fill=\"url(#paint0_linear_95_16249)\"/>\n\t\t<defs>\n\t\t\t<linearGradient id=\"paint0_linear_95_16249\" x1=\"21\" y1=\"0\" x2=\"21\" y2=\"53\" gradientUnits=\"userSpaceOnUse\">\n\t\t\t\t<stop stop-color=\"#325DFF\" stop-opacity=\"0.2\"/>\n\t\t\t\t<stop offset=\"1\" stop-color=\"#325DFF\" stop-opacity=\"0\"/>\n\t\t\t</linearGradient>\n\t\t</defs>\n\t</svg>",
  search: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n\t\t<g clip-path=\"url(#clip0_3907_10643)\">\n\t\t\t<path d=\"M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z\" fill=\"#325DFF\"/>\n\t\t</g>\n\t</svg>",
  expand: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"17\" height=\"17\" viewBox=\"0 0 17 17\" fill=\"none\">\n\t\t<path d=\"M8.50001 11.6994C8.03335 11.6994 7.56668 11.5194 7.21335 11.1661L2.86668 6.81944C2.67335 6.62611 2.67335 6.30611 2.86668 6.11277C3.06001 5.91944 3.38001 5.91944 3.57335 6.11277L7.92001 10.4594C8.24001 10.7794 8.76001 10.7794 9.08001 10.4594L13.4267 6.11277C13.62 5.91944 13.94 5.91944 14.1333 6.11277C14.3267 6.30611 14.3267 6.62611 14.1333 6.81944L9.78668 11.1661C9.43335 11.5194 8.96668 11.6994 8.50001 11.6994Z\" fill=\"#325DFF\" />\n\t</svg>"
};
module.exports = {
  svgToUrl: function svgToUrl(key, color) {
    var url = svgData[key];
    var encoded = url.replace(/<!--(.*)-->/g, "").replace(/[\r\n]/g, " ").replace(/"/g, "'").replace(/%/g, "%25").replace(/&/g, "%26").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E");
    var res = '"' + "data:image/svg+xml,".concat(encoded) + '"';
    if (color) {
      res = res.replaceAll("%23325DFF", color.replace("#", "%23"));
    }
    return res;
  }
};

/***/ }),

/***/ 7:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8:
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 947:
/*!********************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/common/poster.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canvasToTempFilePath = canvasToTempFilePath;
exports.createPoster = createPoster;
exports.loadImage = loadImage;
exports.saveImageToPhotosAlbum = saveImageToPhotosAlbum;
// 获取图片信息，这里主要要获取图片缓存地址
function loadImage(url) {
  return new Promise(function (resolve) {
    uni.getImageInfo({
      src: url,
      success: function success(res) {
        resolve(res.path);
      },
      fail: function fail() {
        resolve("");
      }
    });
  });
}
// 解析海报对象，绘制canvas海报
function createPoster(ctx, posterItemList) {
  return new Promise(function (resolve, reject) {
    try {
      // 单行文本超出隐藏
      var textEllipsis = function textEllipsis(text, maxWidth) {
        var strWidth = ctx.measureText(text).width;
        var ellipsis = '…';
        var ellipsisWidth = ctx.measureText(ellipsis).width;
        if (strWidth > maxWidth && maxWidth > ellipsisWidth) {
          var len = text.length;
          while (strWidth >= maxWidth - ellipsisWidth && len-- > 0) {
            text = text.slice(0, len);
            strWidth = ctx.measureText(text).width;
          }
          text += ellipsis;
        }
        return text;
      };
      // 文本换行
      var breakTextLines = function breakTextLines(text, maxWidth) {
        var words = text.split('');
        var line = '';
        var lines = [];
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          var testLine = line + word;
          var metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            lines.push(line);
            line = word;
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        return lines;
      };
      for (var i = 0; i < posterItemList.length; i++) {
        var temp = posterItemList[i];
        if (temp.type === 'image') {
          ctx.setStrokeStyle("rgba(255, 255, 255, 0)");
          ctx.save();
          var x = temp.config.x;
          var y = temp.config.y;
          var width = temp.config.w;
          var height = temp.config.h;
          var radius = temp.config.r || 0;
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0); // 从右边绘制圆角
          ctx.lineTo(x + width, y + height - radius);
          ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2); // 从底部绘制圆角
          ctx.lineTo(x + radius, y + height);
          ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI); // 从左边绘制圆角
          ctx.lineTo(x, y + radius);
          ctx.arc(x + radius, y + radius, radius, -Math.PI, -Math.PI / 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(temp.url, temp.config.x, temp.config.y, temp.config.w, temp.config.h);
          ctx.restore();
        } else if (temp.type === 'imageGroup') {
          var itemX = parseFloat(temp.config.x);
          for (var _j in temp.group) {
            if (_j >= 3) break;
            ctx.drawImage(temp.group[_j], itemX, temp.config.y, temp.config.w, temp.config.h);
            itemX += parseFloat(temp.config.w) + parseFloat(temp.config.space);
          }
        } else if (temp.type === 'avatar') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(temp.config.w / 2 + temp.config.x, temp.config.h / 2 + temp.config.y, temp.config.w / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(temp.url, temp.config.x, temp.config.y, temp.config.w, temp.config.h);
          ctx.restore();
          ctx.setStrokeStyle('#fff');
        } else if (temp.type === 'text') {
          if (temp.config.font) ctx.font = temp.config.font;else ctx.font = "10px sans-serif";
          temp.config.fontSize && ctx.setFontSize(temp.config.fontSize);
          temp.config.color && ctx.setFillStyle(temp.config.color);
          temp.config.textAlign && ctx.setTextAlign(temp.config.textAlign);
          ctx.setTextBaseline("middle");
          if (temp.config.wrap) {
            var maxWidth = temp.config.maxWidth;
            var lineHeight = temp.config.lineHeight;
            var lines = breakTextLines(temp.text, maxWidth);
            var lineNumber = temp.config.lineNumber || 2;
            if (temp.config.isVerticalCenter) {
              temp.config.y += lineHeight * lineNumber / 2 - lines.length * lineHeight / 2;
            }
            for (var index = 0; index < lineNumber; index++) {
              if (index >= lines.length) break;
              var line = lines[index];
              if (index == lineNumber - 1 && index + 1 < lines.length) {
                line = textEllipsis(line + "...", maxWidth);
                ctx.fillText(line, temp.config.x, temp.config.y + index * lineHeight);
              } else {
                ctx.fillText(line, temp.config.x, temp.config.y + index * lineHeight);
              }
            }
          } else {
            var _lineHeight = temp.config.lineHeight;
            if (temp.config.isVerticalCenter) {
              temp.config.y += _lineHeight / 2;
            }
            temp.text = textEllipsis(temp.text, temp.config.maxWidth);
            ctx.fillText(temp.text, temp.config.x, temp.config.y);
          }
          ctx.stroke();
        } else if (temp.type === 'textGroup') {
          var _itemX = temp.config.x;
          for (var j in temp.group) {
            var item = temp.group[j];
            if (temp.font) ctx.font = temp.font;else ctx.font = "10px sans-serif";
            item.fontSize && ctx.setFontSize(item.fontSize);
            item.color && ctx.setFillStyle(item.color);
            temp.config.textAlign && ctx.setTextAlign(temp.config.textAlign);
            ctx.setTextBaseline("middle");
            if (item.wrap) {
              var _maxWidth = temp.config.maxWidth - _itemX + parseFloat(temp.config.x); // 最大宽度
              var _lineHeight2 = item.lineHeight; // 行高
              var _lines = breakTextLines(item.text, _maxWidth);
              var _lineNumber = item.lineNumber || 2;
              for (var _index = 0; _index < _lineNumber; _index++) {
                if (_index >= _lines.length) break;
                var _line = _lines[_index];
                if (_index == _lineNumber - 1 && _index + 1 < _lines.length) {
                  _line = textEllipsis(_line + "...", _maxWidth);
                  ctx.fillText(_line, _itemX, temp.config.y + _index * _lineHeight2);
                } else {
                  ctx.fillText(_line, _itemX, temp.config.y + _index * _lineHeight2);
                }
              }
            } else {
              ctx.fillText(item.text, _itemX, temp.config.y);
            }
            ctx.stroke();
            _itemX += parseFloat(ctx.measureText(item.text).width);
          }
        } else if (temp.type === 'line') {
          ctx.beginPath();
          ctx.setLineWidth(temp.config.w);
          ctx.moveTo(temp.config.xo, temp.config.y);
          ctx.lineTo(temp.config.xt, temp.config.y);
          ctx.setStrokeStyle(temp.config.color);
          ctx.stroke();
        } else if (temp.type === 'function') {
          temp.function();
        }
      }
      ctx.draw();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
// canvas转image图片
function canvasToTempFilePath(canvasId, vm) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  return new Promise(function (resolve, reject) {
    // 这里canvas绘制完成之后想要存缓存需要一定时间，这里设置了50毫秒
    setTimeout(function () {
      uni.canvasToTempFilePath({
        canvasId: canvasId,
        success: function success(res) {
          if (res.errMsg && res.errMsg.indexOf('ok') != -1) resolve(res.tempFilePath);else reject(res);
        },
        fail: function fail(err) {
          reject(err);
        }
      }, vm);
    }, delay);
  });
}
// 保存图片到相册
function saveImageToPhotosAlbum(imagePath) {
  return new Promise(function (resolve, reject) {
    uni.saveImageToPhotosAlbum({
      filePath: imagePath,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 955:
/*!****************************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/mp-html/components/mp-html/parser.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * @fileoverview html 解析器
 */

// 配置
var config = {
  // 信任的标签（保持标签名不变）
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 块级标签（转为 div，其他的非信任标签转为 span）
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 要移除的标签
  ignoreTags: makeMap('area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr'),
  // 自闭合的标签
  voidTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // html 实体
  entities: {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    ensp: "\u2002",
    emsp: "\u2003",
    nbsp: '\xA0',
    semi: ';',
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…',
    larr: '←',
    uarr: '↑',
    rarr: '→',
    darr: '↓'
  },
  // 默认的标签样式
  tagStyle: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    strike: 'text-decoration:line-through',
    u: 'text-decoration:underline'
  },
  // svg 大小写对照表
  svgDict: {
    animatetransform: 'animateTransform',
    lineargradient: 'linearGradient',
    viewbox: 'viewBox',
    attributename: 'attributeName',
    repeatcount: 'repeatCount',
    repeatdur: 'repeatDur',
    foreignobject: 'foreignObject'
  }
};
var tagSelector = {};
var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),
  windowWidth = _uni$getSystemInfoSyn.windowWidth,
  system = _uni$getSystemInfoSyn.system;
var blankChar = makeMap(' ,\r,\n,\t,\f');
var idIndex = 0;

/**
 * @description 创建 map
 * @param {String} str 逗号分隔
 */
function makeMap(str) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;
  }
  return map;
}

/**
 * @description 解码 html 实体
 * @param {String} str 要解码的字符串
 * @param {Boolean} amp 要不要解码 &amp;
 * @returns {String} 解码后的字符串
 */
function decodeEntity(str, amp) {
  var i = str.indexOf('&');
  while (i !== -1) {
    var j = str.indexOf(';', i + 3);
    var code = void 0;
    if (j === -1) break;
    if (str[i + 1] === '#') {
      // &#123; 形式的实体
      code = parseInt((str[i + 2] === 'x' ? '0' : '') + str.substring(i + 2, j));
      if (!isNaN(code)) {
        str = str.substr(0, i) + String.fromCharCode(code) + str.substr(j + 1);
      }
    } else {
      // &nbsp; 形式的实体
      code = str.substring(i + 1, j);
      if (config.entities[code] || code === 'amp' && amp) {
        str = str.substr(0, i) + (config.entities[code] || '&') + str.substr(j + 1);
      }
    }
    i = str.indexOf('&', i + 1);
  }
  return str;
}

/**
 * @description 合并多个块级标签，加快长内容渲染
 * @param {Array} nodes 要合并的标签数组
 */
function mergeNodes(nodes) {
  var i = nodes.length - 1;
  for (var j = i; j >= -1; j--) {
    if (j === -1 || nodes[j].c || !nodes[j].name || nodes[j].name !== 'div' && nodes[j].name !== 'p' && nodes[j].name[0] !== 'h' || (nodes[j].attrs.style || '').includes('inline')) {
      if (i - j >= 5) {
        nodes.splice(j + 1, i - j, {
          name: 'div',
          attrs: {},
          children: nodes.slice(j + 1, i + 1)
        });
      }
      i = j - 1;
    }
  }
}

/**
 * @description html 解析器
 * @param {Object} vm 组件实例
 */
function Parser(vm) {
  this.options = vm || {};
  this.tagStyle = Object.assign({}, config.tagStyle, this.options.tagStyle);
  this.imgList = vm.imgList || [];
  this.imgList._unloadimgs = 0;
  this.plugins = vm.plugins || [];
  this.attrs = Object.create(null);
  this.stack = [];
  this.nodes = [];
  this.pre = (this.options.containerStyle || '').includes('white-space') && this.options.containerStyle.includes('pre') ? 2 : 0;
}

/**
 * @description 执行解析
 * @param {String} content 要解析的文本
 */
Parser.prototype.parse = function (content) {
  // 插件处理
  for (var i = this.plugins.length; i--;) {
    if (this.plugins[i].onUpdate) {
      content = this.plugins[i].onUpdate(content, config) || content;
    }
  }
  new Lexer(this).parse(content);
  // 出栈未闭合的标签
  while (this.stack.length) {
    this.popNode();
  }
  if (this.nodes.length > 50) {
    mergeNodes(this.nodes);
  }
  return this.nodes;
};

/**
 * @description 将标签暴露出来（不被 rich-text 包含）
 */
Parser.prototype.expose = function () {
  for (var i = this.stack.length; i--;) {
    var item = this.stack[i];
    if (item.c || item.name === 'a' || item.name === 'video' || item.name === 'audio') return;
    item.c = 1;
  }
};

/**
 * @description 处理插件
 * @param {Object} node 要处理的标签
 * @returns {Boolean} 是否要移除此标签
 */
Parser.prototype.hook = function (node) {
  for (var i = this.plugins.length; i--;) {
    if (this.plugins[i].onParse && this.plugins[i].onParse(node, this) === false) {
      return false;
    }
  }
  return true;
};

/**
 * @description 将链接拼接上主域名
 * @param {String} url 需要拼接的链接
 * @returns {String} 拼接后的链接
 */
Parser.prototype.getUrl = function (url) {
  var domain = this.options.domain;
  if (url[0] === '/') {
    if (url[1] === '/') {
      // // 开头的补充协议名
      url = (domain ? domain.split('://')[0] : 'http') + ':' + url;
    } else if (domain) {
      // 否则补充整个域名
      url = domain + url;
    }
  } else if (!url.includes('data:') && !url.includes('://')) {
    if (domain) {
      url = domain + '/' + url;
    }
  }
  return url;
};

/**
 * @description 解析样式表
 * @param {Object} node 标签
 * @returns {Object}
 */
Parser.prototype.parseStyle = function (node) {
  var attrs = node.attrs;
  var list = (this.tagStyle[node.name] || '').split(';').concat((attrs.style || '').split(';'));
  var styleObj = {};
  var tmp = '';
  if (attrs.id && !this.xml) {
    // 暴露锚点
    if (this.options.useAnchor) {
      this.expose();
    } else if (node.name !== 'img' && node.name !== 'a' && node.name !== 'video' && node.name !== 'audio') {
      attrs.id = undefined;
    }
  }

  // 转换 width 和 height 属性
  if (attrs.width) {
    styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
    attrs.width = undefined;
  }
  if (attrs.height) {
    styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
    attrs.height = undefined;
  }
  for (var i = 0, len = list.length; i < len; i++) {
    var info = list[i].split(':');
    if (info.length < 2) continue;
    var key = info.shift().trim().toLowerCase();
    var value = info.join(':').trim();
    if (value[0] === '-' && value.lastIndexOf('-') > 0 || value.includes('safe')) {
      // 兼容性的 css 不压缩
      tmp += ";".concat(key, ":").concat(value);
    } else if (!styleObj[key] || value.includes('import') || !styleObj[key].includes('import')) {
      // 重复的样式进行覆盖
      if (value.includes('url')) {
        // 填充链接
        var j = value.indexOf('(') + 1;
        if (j) {
          while (value[j] === '"' || value[j] === "'" || blankChar[value[j]]) {
            j++;
          }
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      } else if (value.includes('rpx')) {
        // 转换 rpx（rich-text 内部不支持 rpx）
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {
          return parseFloat($) * windowWidth / 750 + 'px';
        });
      }
      styleObj[key] = value;
    }
  }
  node.attrs.style = tmp;
  return styleObj;
};

/**
 * @description 解析到标签名
 * @param {String} name 标签名
 * @private
 */
Parser.prototype.onTagName = function (name) {
  this.tagName = this.xml ? name : name.toLowerCase();
  if (this.tagName === 'svg') {
    this.xml = (this.xml || 0) + 1; // svg 标签内大小写敏感
    config.ignoreTags.style = undefined; // svg 标签内 style 可用
  }
};

/**
 * @description 解析到属性名
 * @param {String} name 属性名
 * @private
 */
Parser.prototype.onAttrName = function (name) {
  name = this.xml ? name : name.toLowerCase();
  if (name.substr(0, 5) === 'data-') {
    if (name === 'data-src' && !this.attrs.src) {
      // data-src 自动转为 src
      this.attrName = 'src';
    } else if (this.tagName === 'img' || this.tagName === 'a') {
      // a 和 img 标签保留 data- 的属性，可以在 imgtap 和 linktap 事件中使用
      this.attrName = name;
    } else {
      // 剩余的移除以减小大小
      this.attrName = undefined;
    }
  } else {
    this.attrName = name;
    this.attrs[name] = 'T'; // boolean 型属性缺省设置
  }
};

/**
 * @description 解析到属性值
 * @param {String} val 属性值
 * @private
 */
Parser.prototype.onAttrVal = function (val) {
  var name = this.attrName || '';
  if (name === 'style' || name === 'href') {
    // 部分属性进行实体解码
    this.attrs[name] = decodeEntity(val, true);
  } else if (name.includes('src')) {
    // 拼接主域名
    this.attrs[name] = this.getUrl(decodeEntity(val, true));
  } else if (name) {
    this.attrs[name] = val;
  }
};

/**
 * @description 解析到标签开始
 * @param {Boolean} selfClose 是否有自闭合标识 />
 * @private
 */
Parser.prototype.onOpenTag = function (selfClose) {
  // 拼装 node
  var node = Object.create(null);
  node.name = this.tagName;
  node.attrs = this.attrs;
  // 避免因为自动 diff 使得 type 被设置为 null 导致部分内容不显示
  if (this.options.nodes.length) {
    node.type = 'node';
  }
  this.attrs = Object.create(null);
  var attrs = node.attrs;
  var parent = this.stack[this.stack.length - 1];
  var siblings = parent ? parent.children : this.nodes;
  var close = this.xml ? selfClose : config.voidTags[node.name];

  // 替换标签名选择器
  if (tagSelector[node.name]) {
    attrs.class = tagSelector[node.name] + (attrs.class ? ' ' + attrs.class : '');
  }

  // 转换 embed 标签
  if (node.name === 'embed') {
    var src = attrs.src || '';
    // 按照后缀名和 type 将 embed 转为 video 或 audio
    if (src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8') || (attrs.type || '').includes('video')) {
      node.name = 'video';
    } else if (src.includes('.mp3') || src.includes('.wav') || src.includes('.aac') || src.includes('.m4a') || (attrs.type || '').includes('audio')) {
      node.name = 'audio';
    }
    if (attrs.autostart) {
      attrs.autoplay = 'T';
    }
    attrs.controls = 'T';
  }

  // 处理音视频
  if (node.name === 'video' || node.name === 'audio') {
    // 设置 id 以便获取 context
    if (node.name === 'video' && !attrs.id) {
      attrs.id = 'v' + idIndex++;
    }
    // 没有设置 controls 也没有设置 autoplay 的自动设置 controls
    if (!attrs.controls && !attrs.autoplay) {
      attrs.controls = 'T';
    }
    // 用数组存储所有可用的 source
    node.src = [];
    if (attrs.src) {
      node.src.push(attrs.src);
      attrs.src = undefined;
    }
    this.expose();
  }

  // 处理自闭合标签
  if (close) {
    if (!this.hook(node) || config.ignoreTags[node.name]) {
      // 通过 base 标签设置主域名
      if (node.name === 'base' && !this.options.domain) {
        this.options.domain = attrs.href;
      } else if (node.name === 'source' && parent && (parent.name === 'video' || parent.name === 'audio') && attrs.src) {
        // 设置 source 标签（仅父节点为 video 或 audio 时有效）
        parent.src.push(attrs.src);
      }
      return;
    }

    // 解析 style
    var styleObj = this.parseStyle(node);

    // 处理图片
    if (node.name === 'img') {
      if (attrs.src) {
        // 标记 webp
        if (attrs.src.includes('webp')) {
          node.webp = 'T';
        }
        // data url 图片如果没有设置 original-src 默认为不可预览的小图片
        if (attrs.src.includes('data:') && !attrs['original-src']) {
          attrs.ignore = 'T';
        }
        if (!attrs.ignore || node.webp || attrs.src.includes('cloud://')) {
          for (var i = this.stack.length; i--;) {
            var item = this.stack[i];
            if (item.name === 'a') {
              node.a = item.attrs;
            }
            if (item.name === 'table' && !node.webp && !attrs.src.includes('cloud://')) {
              if (!styleObj.display || styleObj.display.includes('inline')) {
                node.t = 'inline-block';
              } else {
                node.t = styleObj.display;
              }
              styleObj.display = undefined;
            }
            var style = item.attrs.style || '';
            if (style.includes('flex:') && !style.includes('flex:0') && !style.includes('flex: 0') && (!styleObj.width || parseInt(styleObj.width) > 100)) {
              styleObj.width = '100% !important';
              styleObj.height = '';
              for (var j = i + 1; j < this.stack.length; j++) {
                this.stack[j].attrs.style = (this.stack[j].attrs.style || '').replace('inline-', '');
              }
            } else if (style.includes('flex') && styleObj.width === '100%') {
              for (var _j = i + 1; _j < this.stack.length; _j++) {
                var _style = this.stack[_j].attrs.style || '';
                if (!_style.includes(';width') && !_style.includes(' width') && _style.indexOf('width') !== 0) {
                  styleObj.width = '';
                  break;
                }
              }
            } else if (style.includes('inline-block')) {
              if (styleObj.width && styleObj.width[styleObj.width.length - 1] === '%') {
                item.attrs.style += ';max-width:' + styleObj.width;
                styleObj.width = '';
              } else {
                item.attrs.style += ';max-width:100%';
              }
            }
            item.c = 1;
          }
          attrs.i = this.imgList.length.toString();
          var _src = attrs['original-src'] || attrs.src;
          if (this.imgList.includes(_src)) {
            // 如果有重复的链接则对域名进行随机大小写变换避免预览时错位
            var _i = _src.indexOf('://');
            if (_i !== -1) {
              _i += 3;
              var newSrc = _src.substr(0, _i);
              for (; _i < _src.length; _i++) {
                if (_src[_i] === '/') break;
                newSrc += Math.random() > 0.5 ? _src[_i].toUpperCase() : _src[_i];
              }
              newSrc += _src.substr(_i);
              _src = newSrc;
            }
          }
          this.imgList.push(_src);
          if (!node.t) {
            this.imgList._unloadimgs += 1;
          }
        }
      }
      if (styleObj.display === 'inline') {
        styleObj.display = '';
      }
      if (attrs.ignore) {
        styleObj['max-width'] = styleObj['max-width'] || '100%';
        attrs.style += ';-webkit-touch-callout:none';
      }

      // 设置的宽度超出屏幕，为避免变形，高度转为自动
      if (parseInt(styleObj.width) > windowWidth) {
        styleObj.height = undefined;
      }
      // 记录是否设置了宽高
      if (!isNaN(parseInt(styleObj.width))) {
        node.w = 'T';
      }
      if (!isNaN(parseInt(styleObj.height)) && (!styleObj.height.includes('%') || parent && (parent.attrs.style || '').includes('height'))) {
        node.h = 'T';
      }
      if (node.w && node.h && styleObj['object-fit']) {
        if (styleObj['object-fit'] === 'contain') {
          node.m = 'aspectFit';
        } else if (styleObj['object-fit'] === 'cover') {
          node.m = 'aspectFill';
        }
      }
    } else if (node.name === 'svg') {
      siblings.push(node);
      this.stack.push(node);
      this.popNode();
      return;
    }
    for (var key in styleObj) {
      if (styleObj[key]) {
        attrs.style += ";".concat(key, ":").concat(styleObj[key].replace(' !important', ''));
      }
    }
    attrs.style = attrs.style.substr(1) || undefined;
  } else {
    if ((node.name === 'pre' || (attrs.style || '').includes('white-space') && attrs.style.includes('pre')) && this.pre !== 2) {
      this.pre = node.pre = 1;
    }
    node.children = [];
    this.stack.push(node);
  }

  // 加入节点树
  siblings.push(node);
};

/**
 * @description 解析到标签结束
 * @param {String} name 标签名
 * @private
 */
Parser.prototype.onCloseTag = function (name) {
  // 依次出栈到匹配为止
  name = this.xml ? name : name.toLowerCase();
  var i;
  for (i = this.stack.length; i--;) {
    if (this.stack[i].name === name) break;
  }
  if (i !== -1) {
    while (this.stack.length > i) {
      this.popNode();
    }
  } else if (name === 'p' || name === 'br') {
    var siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
    siblings.push({
      name: name,
      attrs: {
        class: tagSelector[name] || '',
        style: this.tagStyle[name] || ''
      }
    });
  }
};

/**
 * @description 处理标签出栈
 * @private
 */
Parser.prototype.popNode = function () {
  var node = this.stack.pop();
  var attrs = node.attrs;
  var children = node.children;
  var parent = this.stack[this.stack.length - 1];
  var siblings = parent ? parent.children : this.nodes;
  if (!this.hook(node) || config.ignoreTags[node.name]) {
    // 获取标题
    if (node.name === 'title' && children.length && children[0].type === 'text' && this.options.setTitle) {
      uni.setNavigationBarTitle({
        title: children[0].text
      });
    }
    siblings.pop();
    return;
  }
  if (node.pre && this.pre !== 2) {
    // 是否合并空白符标识
    this.pre = node.pre = undefined;
    for (var i = this.stack.length; i--;) {
      if (this.stack[i].pre) {
        this.pre = 1;
      }
    }
  }
  var styleObj = {};

  // 转换 svg
  if (node.name === 'svg') {
    if (this.xml > 1) {
      // 多层 svg 嵌套
      this.xml--;
      return;
    }
    var src = '';
    var style = attrs.style;
    attrs.style = '';
    attrs.xmlns = 'http://www.w3.org/2000/svg';
    (function traversal(node) {
      if (node.type === 'text') {
        src += node.text;
        return;
      }
      var name = config.svgDict[node.name] || node.name;
      if (name === 'foreignObject') {
        var _iterator = _createForOfIteratorHelper(node.children || []),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            if (child.attrs && !child.attrs.xmlns) {
              child.attrs.xmlns = 'http://www.w3.org/1999/xhtml';
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      src += '<' + name;
      for (var item in node.attrs) {
        var val = node.attrs[item];
        if (val) {
          src += " ".concat(config.svgDict[item] || item, "=\"").concat(val, "\"");
        }
      }
      if (!node.children) {
        src += '/>';
      } else {
        src += '>';
        for (var _i2 = 0; _i2 < node.children.length; _i2++) {
          traversal(node.children[_i2]);
        }
        src += '</' + name + '>';
      }
    })(node);
    node.name = 'img';
    node.attrs = {
      src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
      style: style,
      ignore: 'T'
    };
    node.children = undefined;
    this.xml = false;
    config.ignoreTags.style = true;
    return;
  }

  // 转换 align 属性
  if (attrs.align) {
    if (node.name === 'table') {
      if (attrs.align === 'center') {
        styleObj['margin-inline-start'] = styleObj['margin-inline-end'] = 'auto';
      } else {
        styleObj.float = attrs.align;
      }
    } else {
      styleObj['text-align'] = attrs.align;
    }
    attrs.align = undefined;
  }

  // 转换 dir 属性
  if (attrs.dir) {
    styleObj.direction = attrs.dir;
    attrs.dir = undefined;
  }

  // 转换 font 标签的属性
  if (node.name === 'font') {
    if (attrs.color) {
      styleObj.color = attrs.color;
      attrs.color = undefined;
    }
    if (attrs.face) {
      styleObj['font-family'] = attrs.face;
      attrs.face = undefined;
    }
    if (attrs.size) {
      var size = parseInt(attrs.size);
      if (!isNaN(size)) {
        if (size < 1) {
          size = 1;
        } else if (size > 7) {
          size = 7;
        }
        styleObj['font-size'] = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'xxx-large'][size - 1];
      }
      attrs.size = undefined;
    }
  }

  // 一些编辑器的自带 class
  if ((attrs.class || '').includes('align-center')) {
    styleObj['text-align'] = 'center';
  }
  Object.assign(styleObj, this.parseStyle(node));
  if (node.name !== 'table' && parseInt(styleObj.width) > windowWidth) {
    styleObj['max-width'] = '100%';
    styleObj['box-sizing'] = 'border-box';
  }
  if (config.blockTags[node.name]) {
    node.name = 'div';
  } else if (!config.trustTags[node.name] && !this.xml) {
    // 未知标签转为 span，避免无法显示
    node.name = 'span';
  }
  if (node.name === 'a' || node.name === 'ad') {
    this.expose();
  } else if (node.name === 'video') {
    if ((styleObj.height || '').includes('auto')) {
      styleObj.height = undefined;
    }
  } else if ((node.name === 'ul' || node.name === 'ol') && node.c) {
    // 列表处理
    var types = {
      a: 'lower-alpha',
      A: 'upper-alpha',
      i: 'lower-roman',
      I: 'upper-roman'
    };
    if (types[attrs.type]) {
      attrs.style += ';list-style-type:' + types[attrs.type];
      attrs.type = undefined;
    }
    for (var _i3 = children.length; _i3--;) {
      if (children[_i3].name === 'li') {
        children[_i3].c = 1;
      }
    }
  } else if (node.name === 'table') {
    // 表格处理
    // cellpadding、cellspacing、border 这几个常用表格属性需要通过转换实现
    var padding = parseFloat(attrs.cellpadding);
    var spacing = parseFloat(attrs.cellspacing);
    var border = parseFloat(attrs.border);
    var bordercolor = styleObj['border-color'];
    var borderstyle = styleObj['border-style'];
    if (node.c) {
      // padding 和 spacing 默认 2
      if (isNaN(padding)) {
        padding = 2;
      }
      if (isNaN(spacing)) {
        spacing = 2;
      }
    }
    if (border) {
      attrs.style += ";border:".concat(border, "px ").concat(borderstyle || 'solid', " ").concat(bordercolor || 'gray');
    }
    if (node.flag && node.c) {
      // 有 colspan 或 rowspan 且含有链接的表格通过 grid 布局实现
      styleObj.display = 'grid';
      if (styleObj['border-collapse'] === 'collapse') {
        styleObj['border-collapse'] = undefined;
        spacing = 0;
      }
      if (spacing) {
        styleObj['grid-gap'] = spacing + 'px';
        styleObj.padding = spacing + 'px';
      } else if (border) {
        // 无间隔的情况下避免边框重叠
        attrs.style += ';border-left:0;border-top:0';
      }
      var width = []; // 表格的列宽
      var trList = []; // tr 列表
      var cells = []; // 保存新的单元格
      var map = {}; // 被合并单元格占用的格子

      (function traversal(nodes) {
        for (var _i4 = 0; _i4 < nodes.length; _i4++) {
          if (nodes[_i4].name === 'tr') {
            trList.push(nodes[_i4]);
          } else if (nodes[_i4].name === 'colgroup') {
            var colI = 1;
            var _iterator2 = _createForOfIteratorHelper(nodes[_i4].children || []),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var col = _step2.value;
                if (col.name === 'col') {
                  var _style2 = col.attrs.style || '';
                  var start = _style2.indexOf('width') ? _style2.indexOf(';width') : 0;
                  // 提取出宽度
                  if (start !== -1) {
                    var end = _style2.indexOf(';', start + 6);
                    if (end === -1) {
                      end = _style2.length;
                    }
                    width[colI] = _style2.substring(start ? start + 7 : 6, end);
                  }
                  colI += 1;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          } else {
            traversal(nodes[_i4].children || []);
          }
        }
      })(children);
      for (var row = 1; row <= trList.length; row++) {
        var col = 1;
        for (var j = 0; j < trList[row - 1].children.length; j++) {
          var td = trList[row - 1].children[j];
          if (td.name === 'td' || td.name === 'th') {
            // 这个格子被上面的单元格占用，则列号++
            while (map[row + '.' + col]) {
              col++;
            }
            var _style3 = td.attrs.style || '';
            var start = _style3.indexOf('width') ? _style3.indexOf(';width') : 0;
            // 提取出 td 的宽度
            if (start !== -1) {
              var end = _style3.indexOf(';', start + 6);
              if (end === -1) {
                end = _style3.length;
              }
              if (!td.attrs.colspan) {
                width[col] = _style3.substring(start ? start + 7 : 6, end);
              }
              _style3 = _style3.substr(0, start) + _style3.substr(end);
            }
            // 设置竖直对齐
            _style3 += ';display:flex';
            start = _style3.indexOf('vertical-align');
            if (start !== -1) {
              var val = _style3.substr(start + 15, 10);
              if (val.includes('middle')) {
                _style3 += ';align-items:center';
              } else if (val.includes('bottom')) {
                _style3 += ';align-items:flex-end';
              }
            } else {
              _style3 += ';align-items:center';
            }
            // 设置水平对齐
            start = _style3.indexOf('text-align');
            if (start !== -1) {
              var _val = _style3.substr(start + 11, 10);
              if (_val.includes('center')) {
                _style3 += ';justify-content: center';
              } else if (_val.includes('right')) {
                _style3 += ';justify-content: right';
              }
            }
            _style3 = (border ? ";border:".concat(border, "px ").concat(borderstyle || 'solid', " ").concat(bordercolor || 'gray') + (spacing ? '' : ';border-right:0;border-bottom:0') : '') + (padding ? ";padding:".concat(padding, "px") : '') + ';' + _style3;
            // 处理列合并
            if (td.attrs.colspan) {
              _style3 += ";grid-column-start:".concat(col, ";grid-column-end:").concat(col + parseInt(td.attrs.colspan));
              if (!td.attrs.rowspan) {
                _style3 += ";grid-row-start:".concat(row, ";grid-row-end:").concat(row + 1);
              }
              col += parseInt(td.attrs.colspan) - 1;
            }
            // 处理行合并
            if (td.attrs.rowspan) {
              _style3 += ";grid-row-start:".concat(row, ";grid-row-end:").concat(row + parseInt(td.attrs.rowspan));
              if (!td.attrs.colspan) {
                _style3 += ";grid-column-start:".concat(col, ";grid-column-end:").concat(col + 1);
              }
              // 记录下方单元格被占用
              for (var rowspan = 1; rowspan < td.attrs.rowspan; rowspan++) {
                for (var colspan = 0; colspan < (td.attrs.colspan || 1); colspan++) {
                  map[row + rowspan + '.' + (col - colspan)] = 1;
                }
              }
            }
            if (_style3) {
              td.attrs.style = _style3;
            }
            cells.push(td);
            col++;
          }
        }
        if (row === 1) {
          var temp = '';
          for (var _i5 = 1; _i5 < col; _i5++) {
            temp += (width[_i5] ? width[_i5] : 'auto') + ' ';
          }
          styleObj['grid-template-columns'] = temp;
        }
      }
      node.children = cells;
    } else {
      // 没有使用合并单元格的表格通过 table 布局实现
      if (node.c) {
        styleObj.display = 'table';
      }
      if (!isNaN(spacing)) {
        styleObj['border-spacing'] = spacing + 'px';
      }
      if (border || padding) {
        // 遍历
        (function traversal(nodes) {
          for (var _i6 = 0; _i6 < nodes.length; _i6++) {
            var _td = nodes[_i6];
            if (_td.name === 'th' || _td.name === 'td') {
              if (border) {
                _td.attrs.style = "border:".concat(border, "px ").concat(borderstyle || 'solid', " ").concat(bordercolor || 'gray', ";").concat(_td.attrs.style || '');
              }
              if (padding) {
                _td.attrs.style = "padding:".concat(padding, "px;").concat(_td.attrs.style || '');
              }
            } else if (_td.children) {
              traversal(_td.children);
            }
          }
        })(children);
      }
    }
    // 给表格添加一个单独的横向滚动层
    if (this.options.scrollTable && !(attrs.style || '').includes('inline')) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:auto'
      };
      node.children = [table];
      attrs = table.attrs;
    }
  } else if ((node.name === 'td' || node.name === 'th') && (attrs.colspan || attrs.rowspan)) {
    for (var _i7 = this.stack.length; _i7--;) {
      if (this.stack[_i7].name === 'table') {
        this.stack[_i7].flag = 1; // 指示含有合并单元格
        break;
      }
    }
  } else if (node.name === 'ruby') {
    // 转换 ruby
    node.name = 'span';
    for (var _i8 = 0; _i8 < children.length - 1; _i8++) {
      if (children[_i8].type === 'text' && children[_i8 + 1].name === 'rt') {
        children[_i8] = {
          name: 'div',
          attrs: {
            style: 'display:inline-block;text-align:center'
          },
          children: [{
            name: 'div',
            attrs: {
              style: 'font-size:50%;' + (children[_i8 + 1].attrs.style || '')
            },
            children: children[_i8 + 1].children
          }, children[_i8]]
        };
        children.splice(_i8 + 1, 1);
      }
    }
  } else if (node.c) {
    (function traversal(node) {
      node.c = 2;
      for (var _i9 = node.children.length; _i9--;) {
        var child = node.children[_i9];
        if (!child.c || child.name === 'table') {
          node.c = 1;
        }
      }
    })(node);
  }
  if ((styleObj.display || '').includes('flex') && !node.c) {
    for (var _i10 = children.length; _i10--;) {
      var item = children[_i10];
      if (item.f) {
        item.attrs.style = (item.attrs.style || '') + item.f;
        item.f = undefined;
      }
    }
  }
  // flex 布局时部分样式需要提取到 rich-text 外层
  var flex = parent && ((parent.attrs.style || '').includes('flex') || (parent.attrs.style || '').includes('grid'))

  // 检查基础库版本 virtualHost 是否可用
  && !(node.c && wx.getNFCAdapter); // eslint-disable-line

  if (flex) {
    node.f = ';max-width:100%';
  }
  if (children.length >= 50 && node.c && !(styleObj.display || '').includes('flex')) {
    mergeNodes(children);
  }
  for (var key in styleObj) {
    if (styleObj[key]) {
      var _val2 = ";".concat(key, ":").concat(styleObj[key].replace(' !important', ''));
      if (flex && (key.includes('flex') && key !== 'flex-direction' || key === 'align-self' || key.includes('grid') || styleObj[key][0] === '-' || key.includes('width') && _val2.includes('%'))) {
        node.f += _val2;
        if (key === 'width') {
          attrs.style += ';width:100%';
        }
      } else {
        attrs.style += _val2;
      }
    }
  }
  attrs.style = attrs.style.substr(1) || undefined;
};

/**
 * @description 解析到文本
 * @param {String} text 文本内容
 */
Parser.prototype.onText = function (text) {
  if (!this.pre) {
    // 合并空白符
    var trim = '';
    var flag;
    for (var i = 0, len = text.length; i < len; i++) {
      if (!blankChar[text[i]]) {
        trim += text[i];
      } else {
        if (trim[trim.length - 1] !== ' ') {
          trim += ' ';
        }
        if (text[i] === '\n' && !flag) {
          flag = true;
        }
      }
    }
    // 去除含有换行符的空串
    if (trim === ' ') {
      if (flag) return;
    }
    text = trim;
  }
  var node = Object.create(null);
  node.type = 'text';
  node.text = decodeEntity(text);
  if (this.hook(node)) {
    if (this.options.selectable === 'force' && system.includes('iOS') && !uni.canIUse('rich-text.user-select')) {
      this.expose();
    }
    var siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
    siblings.push(node);
  }
};

/**
 * @description html 词法分析器
 * @param {Object} handler 高层处理器
 */
function Lexer(handler) {
  this.handler = handler;
}

/**
 * @description 执行解析
 * @param {String} content 要解析的文本
 */
Lexer.prototype.parse = function (content) {
  this.content = content || '';
  this.i = 0; // 标记解析位置
  this.start = 0; // 标记一个单词的开始位置
  this.state = this.text; // 当前状态
  for (var len = this.content.length; this.i !== -1 && this.i < len;) {
    this.state();
  }
};

/**
 * @description 检查标签是否闭合
 * @param {String} method 如果闭合要进行的操作
 * @returns {Boolean} 是否闭合
 * @private
 */
Lexer.prototype.checkClose = function (method) {
  var selfClose = this.content[this.i] === '/';
  if (this.content[this.i] === '>' || selfClose && this.content[this.i + 1] === '>') {
    if (method) {
      this.handler[method](this.content.substring(this.start, this.i));
    }
    this.i += selfClose ? 2 : 1;
    this.start = this.i;
    this.handler.onOpenTag(selfClose);
    if (this.handler.tagName === 'script') {
      this.i = this.content.indexOf('</', this.i);
      if (this.i !== -1) {
        this.i += 2;
        this.start = this.i;
      }
      this.state = this.endTag;
    } else {
      this.state = this.text;
    }
    return true;
  }
  return false;
};

/**
 * @description 文本状态
 * @private
 */
Lexer.prototype.text = function () {
  this.i = this.content.indexOf('<', this.i); // 查找最近的标签
  if (this.i === -1) {
    // 没有标签了
    if (this.start < this.content.length) {
      this.handler.onText(this.content.substring(this.start, this.content.length));
    }
    return;
  }
  var c = this.content[this.i + 1];
  if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {
    // 标签开头
    if (this.start !== this.i) {
      this.handler.onText(this.content.substring(this.start, this.i));
    }
    this.start = ++this.i;
    this.state = this.tagName;
  } else if (c === '/' || c === '!' || c === '?') {
    if (this.start !== this.i) {
      this.handler.onText(this.content.substring(this.start, this.i));
    }
    var next = this.content[this.i + 2];
    if (c === '/' && (next >= 'a' && next <= 'z' || next >= 'A' && next <= 'Z')) {
      // 标签结尾
      this.i += 2;
      this.start = this.i;
      this.state = this.endTag;
      return;
    }
    // 处理注释
    var end = '-->';
    if (c !== '!' || this.content[this.i + 2] !== '-' || this.content[this.i + 3] !== '-') {
      end = '>';
    }
    this.i = this.content.indexOf(end, this.i);
    if (this.i !== -1) {
      this.i += end.length;
      this.start = this.i;
    }
  } else {
    this.i++;
  }
};

/**
 * @description 标签名状态
 * @private
 */
Lexer.prototype.tagName = function () {
  if (blankChar[this.content[this.i]]) {
    // 解析到标签名
    this.handler.onTagName(this.content.substring(this.start, this.i));
    while (blankChar[this.content[++this.i]]) {
      ;
    }
    if (this.i < this.content.length && !this.checkClose()) {
      this.start = this.i;
      this.state = this.attrName;
    }
  } else if (!this.checkClose('onTagName')) {
    this.i++;
  }
};

/**
 * @description 属性名状态
 * @private
 */
Lexer.prototype.attrName = function () {
  var c = this.content[this.i];
  if (blankChar[c] || c === '=') {
    // 解析到属性名
    this.handler.onAttrName(this.content.substring(this.start, this.i));
    var needVal = c === '=';
    var len = this.content.length;
    while (++this.i < len) {
      c = this.content[this.i];
      if (!blankChar[c]) {
        if (this.checkClose()) return;
        if (needVal) {
          // 等号后遇到第一个非空字符
          this.start = this.i;
          this.state = this.attrVal;
          return;
        }
        if (this.content[this.i] === '=') {
          needVal = true;
        } else {
          this.start = this.i;
          this.state = this.attrName;
          return;
        }
      }
    }
  } else if (!this.checkClose('onAttrName')) {
    this.i++;
  }
};

/**
 * @description 属性值状态
 * @private
 */
Lexer.prototype.attrVal = function () {
  var c = this.content[this.i];
  var len = this.content.length;
  if (c === '"' || c === "'") {
    // 有冒号的属性
    this.start = ++this.i;
    this.i = this.content.indexOf(c, this.i);
    if (this.i === -1) return;
    this.handler.onAttrVal(this.content.substring(this.start, this.i));
  } else {
    // 没有冒号的属性
    for (; this.i < len; this.i++) {
      if (blankChar[this.content[this.i]]) {
        this.handler.onAttrVal(this.content.substring(this.start, this.i));
        break;
      } else if (this.checkClose('onAttrVal')) return;
    }
  }
  while (blankChar[this.content[++this.i]]) {
    ;
  }
  if (this.i < len && !this.checkClose()) {
    this.start = this.i;
    this.state = this.attrName;
  }
};

/**
 * @description 结束标签状态
 * @returns {String} 结束的标签名
 * @private
 */
Lexer.prototype.endTag = function () {
  var c = this.content[this.i];
  if (blankChar[c] || c === '>' || c === '/') {
    this.handler.onCloseTag(this.content.substring(this.start, this.i));
    if (c !== '>') {
      this.i = this.content.indexOf('>', this.i);
      if (this.i === -1) return;
    }
    this.start = ++this.i;
    this.state = this.text;
  } else {
    this.i++;
  }
};
var _default = Parser;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 998:
/*!****************************************************************************************!*\
  !*** D:/Projects/实习文件-惠爱/惠爱商协会/uniapp-wdsxh4.3.2/uni_modules/sp-editor/utils/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLink = addLink;
exports.convertImgStylesToAttributes = convertImgStylesToAttributes;
exports.handleHtmlWithVideo = handleHtmlWithVideo;
exports.linkFlag = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
// 标识必须独一无二 - 标识是为了使用insertText插入标识文本后，查找到标识所在delta位置的索引
var linkFlag = '#-*=*-*=*-*=*@-link超链接标识link-@*=*-*=*-*=*-#';
exports.linkFlag = linkFlag;
function addLink(editorCtx, attr, callback) {
  // 先插入一段文本内容
  editorCtx.insertText({
    text: linkFlag
  });
  // 获取全文delta内容
  editorCtx.getContents({
    success: function success(res) {
      var options = res.delta.ops;
      var findex = options.findIndex(function (item) {
        var _item$insert;
        return item.insert && (0, _typeof2.default)(item.insert) !== 'object' && ((_item$insert = item.insert) === null || _item$insert === void 0 ? void 0 : _item$insert.indexOf(linkFlag)) !== -1;
      });
      // 根据标识查找到插入的位置
      if (findex > -1) {
        var findOption = options[findex];
        var findAttributes = findOption.attributes;
        // 将该findOption分成三部分：前内容 要插入的link 后内容
        var _findOption$insert$sp = findOption.insert.split(linkFlag),
          _findOption$insert$sp2 = (0, _slicedToArray2.default)(_findOption$insert$sp, 2),
          prefix = _findOption$insert$sp2[0],
          suffix = _findOption$insert$sp2[1];
        var handleOps = [];
        // 前内容
        if (prefix) {
          var prefixOps = findAttributes ? {
            insert: prefix,
            attributes: findAttributes
          } : {
            insert: prefix
          };
          handleOps.push(prefixOps);
        }
        // 插入的link
        var linkOps = {
          insert: attr.text,
          attributes: {
            link: attr.href,
            textDecoration: attr.textDecoration || 'none',
            // 下划线
            color: attr.color || '#007aff'
          }
        };
        handleOps.push(linkOps);
        // 后内容
        if (suffix) {
          var suffixOps = findAttributes ? {
            insert: suffix,
            attributes: findAttributes
          } : {
            insert: suffix
          };
          handleOps.push(suffixOps);
        }
        // 删除原options[findex]并在findex位置插入上述三个ops
        options.splice(findex, 1);
        options.splice.apply(options, [findex, 0].concat(handleOps));
        // 最后重新初始化内容，注意该方法会导致光标重置到最开始位置
        editorCtx.setContents({
          delta: {
            ops: options
          }
        });
        // 所以最后建议使富文本光标失焦，让用户手动聚焦光标
        editorCtx.blur();

        // 后续回调操作
        if (callback) callback();
      }
    }
  });
}

/**
 * 将含有特殊图片形式视频的富文本转换成正常视频的富文本
 * @param {String} html 要进行处理的富文本字符串
 * @returns {String} 返回处理结果
 */
function handleHtmlWithVideo(html) {
  // 正则表达式用于匹配img标签中带有alt属性且alt属性值为视频链接的模式
  var regex = /<img\s+src="[^"]*"\s+alt="([^"]*)"[^>]*>/g;
  // 使用replace方法和一个函数回调来替换匹配到的内容
  return html.replace(regex, function (match, videoUrl) {
    // 替换为video标签，并添加controls属性以便用户可以控制播放
    return "<video width=\"80%\" controls><source src=\"".concat(videoUrl, "\" type=\"video/mp4\"></video>");
  });
}

/**
 * 将img标签中内联style属性中的宽高样式提取出标签width与height属性
 * @param {Object} html 要处理的富文本字符串
 * @returns {Object} 返回处理结果
 */
function convertImgStylesToAttributes(html) {
  return html.replace(/<img\s+([^>]+)\s*>/g, function (match, attributes) {
    // 分割属性
    var attrs = attributes.split(/\s+/);

    // 找到style属性的位置
    var styleIndex = attrs.findIndex(function (attr) {
      return attr.startsWith('style=');
    });
    if (styleIndex === -1) return match; // 如果没有找到style属性，则返回原样

    // 提取style属性值
    var styleAttr = attrs.splice(styleIndex, 1)[0];
    var style = styleAttr.match(/"([^"]*)"/)[1];

    // 解析 style 属性
    var styleObj = {};
    style.split(';').forEach(function (part) {
      if (part) {
        var _part$split = part.split(':'),
          _part$split2 = (0, _slicedToArray2.default)(_part$split, 2),
          name = _part$split2[0],
          value = _part$split2[1];
        styleObj[name.trim()] = value.trim();
      }
    });

    // 创建新的 img 标签
    var newTag = '<img';
    if (styleObj.width) {
      newTag += " width=\"".concat(styleObj.width, "\"");
    }
    if (styleObj.height) {
      newTag += " height=\"".concat(styleObj.height, "\"");
    }

    // 添加原有的属性，包括修改过的style属性
    newTag += " ".concat(styleAttr, " ").concat(attrs.join(' '));

    // 关闭 img 标签
    newTag += '>';
    return newTag;
  });
}

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map