$(function () {
  // 是否加载完成
  var loadTypeEnd = true
  var loadListEnd = true
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
  var catId = 0
  $('#screen').on('click', '.item', function () {
    $(this).addClass("active").siblings().removeClass('active')
    catId = $(this).attr("data-id")
		page = 1
    getNewsList()
  })
  // 获取新闻分类
  function getNewsType() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/article/article_cat',
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
  // 获取新闻列表
  var page = 1
  var limit = 10
  function getNewsList() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/article/index',
      data: {
        page: page,
        limit: limit,
        cat_id: catId,
      },
      success: function (res) {
        loadListEnd = true
        if (loadTypeEnd && loadListEnd) {
          $(".container-fluid").show()
        }
        if (res.code == 1) {
          var listHtml = ""
          for (var i in res.data.data) {
            if (res.data.data[i].type == 2) {
              listHtml += `
                <a href="${res.data.data[i].link}" target="_blank" class="cont-item flex justify-content-between">
                  <div class="title">${res.data.data[i].title}</div>
                  <div class="date">${res.data.data[i].createtime}</div>
                </a>
              `
            } else {
              listHtml += `
                <a href="news_detail.html?id=${res.data.data[i].id}" class="cont-item flex justify-content-between">
                  <div class="title">${res.data.data[i].title}</div>
                  <div class="date">${res.data.data[i].createtime}</div>
                </a>
              `
            }
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
          getNewsList()
        }
      })
    }
  }
  // 调用方法
  setScroll()
  getNewsType()
  getNewsList()
});