$(function () {
  // 添加选中样式
  $('.component-header .nav-box').children('.' + $('.container-header').attr('data-type')).addClass('active')
  $('.component-header .nav-list ul').children('.' + $('.container-header').attr('data-type')).addClass('active')
  // 是否加载完成
  var loadSystemEnd = false
  var loadBasicEnd = false
  var loadAssociationEnd = false
  // 获取系统配置
  function getSystemInfo() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/config/config',
      success: function (res) {
        // 加载完成
        loadSystemEnd = true
        if (loadSystemEnd && loadBasicEnd && loadAssociationEnd) {
          $(".container-fluid").css("opacity", 1)
        }
        if (res.code == 1) {
          // 设置主题色
          $("body")[0].style.setProperty('--main-color', res.data.theme_colors)
          // 设置备案信息
          $(".component-footer .footer-info .website").text(res.data.domain_record_number)
          $(".component-footer .footer-info .police").text(res.data.public_security_record_number)
          // 设置版本选择
          $(".versionName").text(res.data.organize)
          // 设置信息页标题
          if ($('.about-container').length > 0) {
            $("title").text(res.data.organize + "信息")
          }
          // 设置活动页标题
          if ($('.activity-container').length > 0) {
            $("title").text(res.data.organize + "活动")
          }
          // 设置新闻页标题
          if ($('.news-container').length > 0) {
            $("title").text(res.data.organize + "新闻")
          }
        } else {
          console.error(res.msg)
        }
      },
    })
  }
  // 获取商会信息
  function getBasicInfo() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/association/index',
      success: function (res) {
        // 加载完成
        loadBasicEnd = true
        if (loadSystemEnd && loadBasicEnd && loadAssociationEnd) {
          $(".container-fluid").css("opacity", 1)
        }
        if (res.code == 1) {
          // 设置页头信息
          $(".component-header .header-top .name").text(`欢迎进入${res.data.name}官方网站！`)
          $(".component-header .nav-logo img").attr("src", res.data.logo)
          $(".component-header .nav-logo .title").text(res.data.name)
          // 设置页脚信息
          $(".component-footer .footer-logo img").attr("src", res.data.logo)
          $(".component-footer .footer-logo .title").text(res.data.name)
          $(".component-footer .footer-info .address").append(res.data.address)
          $(".component-footer .footer-info .phone").append(res.data.phone)
          $(".component-footer .footer-info .email").append(res.data.mailbox)
          $(".component-footer .footer-info span b").text(res.data.name)
          // 设置首页
          if ($('.index-container').length > 0) {
            $(".index-container .column-2 .column-title span").text(res.data.name)
          }
          // 设置商会信息
          if ($('.about-container').length > 0) {
            $(".about-container .main-content .course").html(res.data.course)
            $(".about-container .main-content .honor").html(res.data.honor)
            $(".about-container .main-content .rules").html(res.data.rules)
          }
          // 设置联系我们
          if ($('.contact-container').length > 0) {
            $(".contact-container .main-content .address").text(res.data.address)
            $(".contact-container .main-content .phone").text(res.data.phone)
            $(".contact-container .main-content .email").text(res.data.mailbox)
            $(".contact-container .main-content .item-code").attr("src", res.data.wananchi_qr_code)
          }
        } else {
          console.error(res.msg)
        }
      },
    })
  }
  // 获取商会介绍
  function getAssociationInfo() {
    $.ajax({
      method: 'GET',
      url: adminPath + '/api/wdsxh/association/pc_index',
      success: function (res) {
        // 加载完成
        loadAssociationEnd = true
        if (loadSystemEnd && loadBasicEnd && loadAssociationEnd) {
          $(".container-fluid").css("opacity", 1)
        }
        if (res.code == 1) {
          // 设置关键词和描述
					if (!$("meta[name='keywords']").attr('content')) {
						$("meta[name='keywords']").attr('content', res.data.keywords || "")
					}
					if (!$("meta[name='description']").attr('content')) {
						$("meta[name='description']").attr('content', res.data.description || "")
					}
          // 设置小程序码
          $("#codeModal .modal-body .code").attr("src", res.data.applet_qr_code)
          // 设置网站首页
          if ($('.index-container').length > 0) {
            $('title').html(res.data.title || "首页")
            $(".index-container .column-1 .cont-left").html(res.data.introduce)
            $(".index-container .column-1 .cont-right img").attr("src", res.data.image)
            $(".index-container .column-2 .column-bg img").attr("src", res.data.background_image)
          }
          // 设置商会信息
          if ($('.about-container').length > 0) {
            $(".about-container .container-banner .banner-image").attr("src", res.data.association_image)
          }
          // 设置会员风采
          if ($('.membership-container').length > 0) {
            $(".membership-container .container-banner .banner-image").attr("src", res.data.member_image)
          }
          // 设置商会活动
          if ($('.activity-container').length > 0) {
            $(".activity-container .container-banner .banner-image").attr("src", res.data.activity_image)
          }
          // 设置活动相册
          if ($('.album-container').length > 0) {
            $(".album-container .container-banner .banner-image").attr("src", res.data.album_image)
          }
          // 设置供需大厅
          if ($('.business-container').length > 0) {
            $(".business-container .container-banner .banner-image").attr("src", res.data.business_image)
          }
          // 设置商会新闻
          if ($('.news-container').length > 0) {
            $(".news-container .container-banner .banner-image").attr("src", res.data.article_image)
          }
          // 设置联系我们
          if ($('.contact-container').length > 0) {
            $(".contact-container .container-banner .banner-image").attr("src", res.data.contact_image)
          }
        } else {
          console.error(res.msg)
        }
      },
    })
  }
  // 移动端导航菜单点击
  var isExpand = 1;
  $('#navbar').on('click', function (event) {
    event.stopPropagation()
    if (isExpand == 1) {
      $(this).css("transform", 'rotate(90deg)');
      $('.nav-mobile .nav-list').stop().fadeIn();
      isExpand = 2;
    } else {
      $(this).css("transform", 'rotate(0deg)');
      $('.nav-mobile .nav-list').stop().fadeOut();
      isExpand = 1;
    }
  })
  // 点击其他地方关机手机端导航框
  $('body').click(function () {
    $('#navbar').css("transform", 'rotate(0deg)');
    $('.nav-mobile .nav-list').stop().fadeOut();
    isExpand = 1;
  })
  // 调用方法
  getSystemInfo()
  getBasicInfo()
  getAssociationInfo()
})