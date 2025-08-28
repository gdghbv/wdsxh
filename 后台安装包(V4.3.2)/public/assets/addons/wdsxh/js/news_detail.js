$(function () {
  // 加载时隐藏
  $(".container-fluid").hide()
  // 返回上一页
  $("#toBack").click(function () {
    history.back(-1)
  })
  // 设置导航栏文字
  function setNavigation() {
    try {
      if (document.referrer.includes("news.html")) {
        $("#toBack").text("商会新闻")
      } else {
        $("#toBack").text("首页")
      }
    } catch (error) {
      $("#toBack").text("首页")
    }
  }
  // 获取会员详情
  function getNewsDetail() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/article/details',
      data: {
        id: $.getUrlParam("id")
      },
      success: function (res) {
        $(".container-fluid").show()
        if (res.code == 1) {
          $(".main-content .title").text(res.data.title)
          $(".main-content .release").append(res.data.release)
          $(".main-content .createtime").append(res.data.createtime)
          $(".main-content .content").html(res.data.content)
        } else {
          console.error(res.msg)
        }
      },
    })
  }
  // 调用方法
  setNavigation()
  getNewsDetail()
})