$(function () {
  $(".about-container .main-screen .screen-item").click(function () {
    let id = $(this).attr("data-id")
    $(".about-container .main-screen .screen-item").removeClass("active")
    $(this).addClass("active")
    if (id == 1) {
      $(".about-container .main-content .content").hide()
      $(".about-container .main-content .course").show()
    } else if (id == 2) {
      $(".about-container .main-content .content").hide()
      $(".about-container .main-content .honor").show()
    } else if (id == 3) {
      $(".about-container .main-content .content").hide()
      $(".about-container .main-content .rules").show()
    }
  })
});