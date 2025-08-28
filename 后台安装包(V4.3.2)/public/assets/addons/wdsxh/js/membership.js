$(function () {
  // 是否加载完成
  var loadTypeEnd = false
  var loadListEnd = false
  $(".container-fluid").hide()
  // 设置横向滚动
  function setScroll() {
    var element = $(".main-screen .screen-box");
    element.on("wheel", function (event) {
      if (element.get(0).scrollWidth > element.innerWidth()) {
        event.preventDefault();
        var scrollAmount = event.originalEvent.deltaY;
        element.scrollLeft(element.scrollLeft() + scrollAmount);
      }
    });
  }
  // 设置分类筛选
  var levelId = 0
  $('#screen').on('click', '.item', function () {
    $(this).addClass("active").siblings().removeClass('active')
    levelId = $(this).attr("data-id")
		page = 1
    getMemberList()
  })
  // 获取会员级别
  function getMemberLevel() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/member/member_apply/level_list',
      success: function (res) {
        loadTypeEnd = true
        if (loadTypeEnd && loadListEnd) {
          $(".container-fluid").show()
        }
        if (res.code == 1) {
          var screenHtml = ""
          for (var i in res.data) [
            screenHtml += `<div class="item" data-id="${res.data[i].id}">${res.data[i].name}</div>`
          ]
          $("#screen").append(screenHtml)
        } else {
          console.error(res.msg)
        }
      },
    })
  }
  // 获取会员列表
  var page = 1
  var limit = 12
  function getMemberList() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/member/member/index',
      data: {
        page: page,
        limit: limit,
        member_level_id: levelId,
      },
      success: function (res) {
        loadListEnd = true
        if (loadTypeEnd && loadListEnd) {
          $(".container-fluid").show()
        }
        if (res.code == 1) {
          var listHtml = ""
          for (var i in res.data.data) {
            listHtml += `
              <button type="button" data-toggle="modal" data-target="#codeModal" class="cont-item">
                <div class="image">
                  <img src="${res.data.data[i].avatar}" alt="${res.data.data[i].name}">
                </div>
                <div class="normal">
                  <div class="name">${res.data.data[i].name}</div>
                  <div class="post">${res.data.data[i].level_name}</div>
                </div>
                <div class="mobile">
                  <div class="name">${res.data.data[i].name}</div>
                  <div class="address">${res.data.data[i].native_place || "尚未完善"}</div>
                  <div class="post">${res.data.data[i].level_name || "尚未完善"}</div>
                </div>
              </button>
            `
          }
          $(".container-main .column-cont").html(listHtml)
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
        canJump: 0,// 是否能跳转。0=不显示（默认），1=显示
        showOne: 0,//只有一页时，是否显示。0=不显示,1=显示（默认）
        callback: function (num) { //回调函数
          page = num
          getMemberList()
        }
      })
    }
  }
  // 调用方法
  setScroll()
  getMemberLevel()
  getMemberList()
});