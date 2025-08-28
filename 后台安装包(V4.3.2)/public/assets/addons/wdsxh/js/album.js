$(function () {
  $(".container-fluid").hide()
  // 获取相册列表
  var page = 1
  var limit = 5
  function getAlbumList() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/album/index',
      data: {
        page: page,
        limit: limit,
      },
      success: function (res) {
        $(".container-fluid").show()
        if (res.code == 1) {
          var albumHtml = ""
          var isMultiple = false
          for (var i in res.data.data) {
            var imagesHtml = ""
            if (res.data.data[i].type == 1) {
              var imagesList = res.data.data[i].files.split(",")
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
            } else {
              isMultiple = false
              imagesHtml += `
                <div class="video">
                  <img class="cover" src="${res.data.data[i].image}">
                  <img class="play" src="/assets/addons/wdsxh/img/play.png">
                </div>
              `
            }
            albumHtml += `
              <button type="button" data-toggle="modal" data-target="#codeModal" class="cont-item">
                <div class="item-date">${res.data.data[i].release_date}</div>
                <div class="item-title txthide-more">${res.data.data[i].name}</div>
                <div class="item-box flex">
                  <div class="box-timeline">
                    <div class="point"></div>
                    <div class="line"></div>
                  </div>
                  <div class="${isMultiple ? "box-multiple flex" : "box-single"}">
                    ${imagesHtml}
                  </div>
                </div>
              </button>
            `
          }
          $(".container-main .main-content").html(albumHtml)
          if (albumHtml) {
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
          getAlbumList()
        }
      })
    }
  }
  // 调用方法
  getAlbumList()
});