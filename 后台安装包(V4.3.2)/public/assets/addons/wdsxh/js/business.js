$(function () {
  $(".container-fluid").hide()
  // 获取供需列表
  var page = 1
  var limit = 5
  function getBusinessList() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/business/index',
      data: {
        page: page,
        limit: limit,
      },
      success: function (res) {
        $(".container-fluid").show()
        if (res.code == 1) {
          var listHtml = ""
          var isMultiple = false
          for (var i in res.data.data) {
            var imagesHtml = ""
            var imagesList = res.data.data[i].images.split(",")
            if (imagesList.length > 1) {
              isMultiple = true
              for (var j in imagesList) {
                imagesHtml += `
                  <div class="image">
                    <img src="${imagesList[j]}">
                  </div>
                `
              }
            } else {
              isMultiple = false
              imagesHtml = `
                <div class="image">
                  <img src="${imagesList[0]}">
                </div>
              `
            }
            listHtml += `
              <button type="button" data-toggle="modal" data-target="#codeModal" class="cont-item">
                <div class="item-header flex justify-content-between align-items-center">
                  <div class="header-info flex align-items-center">
                    <img class="info-avatar" src="${res.data.data[i].member.avatar}">
                    <div class="info-box flex align-items-center">
                      <div class="name txthide">${res.data.data[i].member.name}</div>
                      <div class="tag">${res.data.data[i].member.level_name} | ${getDateBeforeNow(res.data.data[i].createtime)}</div>
                    </div>
                  </div>
                  <div class="header-btn">联系TA</div>
                </div>
                <div class="item-title txthide">${res.data.data[i].title}</div>
                <div class="item-subtitle txthide-more">${res.data.data[i].content}</div>
                <div class="item-box flex">
                  <div class="${isMultiple ? "box-multiple flex flex-wrap" : "box-single"}">
                    ${imagesHtml}
                  </div>
                </div>
              </button>
            `
          }
          $(".container-main .main-content").html(listHtml)
          if (listHtml) {
            $(".empty").hide()
          } else {
            $(".empty").css("display", "flex")
          }
          setPages(res.data.total)
        } else {
          console.error(res.msg)
        }
      },
    })
  }
  // 设置分页
  function setPages(total) {
    var nowPage = page
    var totalPage = Math.ceil(total / limit)
    if (nowPage == 1) {
      new Paging('page', {
        nowPage: nowPage, // 当前页码
        pageNum: totalPage, // 总页码
        totalNum: total, // 总条数
        buttonNum: 5, //要展示的页码数量
        canJump: 1,// 是否能跳转。0=不显示（默认），1=显示
        showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
        callback: function (num) { //回调函数
          page = num
          getBusinessList()
        }
      })
    }
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
  // 时间戳转日期格式 type: dateTime-日期时间，date-日期，hours-时，minutes-时分，seconds-时分秒
  function formatDate(timeStamp, hyphen = "-", type = "dateTime") {
    let date = new Date(timeStamp * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let h = date.getHours();
    let mm = date.getMinutes();
    let s = date.getSeconds();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    h = h >= 10 ? h : "0" + h;
    mm = mm >= 10 ? mm : "0" + mm;
    s = s >= 10 ? s : "0" + s;
    let result = "";
    if (hyphen == "object") {
      result = {
        year: year,
        month: month,
        day: day,
        hours: h,
        minutes: mm,
        seconds: s,
      }
    } else if (type == "date") {
      result = `${year}${hyphen}${month}${hyphen}${day}`;
    } else if (type == "hours") {
      result = `${h}`;
    } else if (type == "minutes") {
      result = `${h}:${mm}`;
    } else if (type == "seconds") {
      result = `${h}:${mm}:${s}`;
    } else {
      result = `${year}${hyphen}${month}${hyphen}${day} ${h}:${mm}:${s}`;
    }
    return result;
  }
  // 调用方法
  getBusinessList()
});