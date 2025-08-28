var that, bscounter = 0, imgcounter = 0, ncounter = 0, colorpickerObj, styleset = $('#styleset'), textset = $("#textset");

function dragEvent(obj) {
  var posterIndex = obj.attr('index');
  var posterrs = new Resize(obj, {
    Max: true,
    mxContainer: "#poster",
    onResize: function () {
      updateInfoBox();
    }
  });
  posterrs.Set($(".rRightDown", obj), "right-down");
  posterrs.Set($(".rLeftDown", obj), "left-down");
  posterrs.Set($(".rRightUp", obj), "right-up");
  posterrs.Set($(".rLeftUp", obj), "left-up");
  posterrs.Set($(".rRight", obj), "right");
  posterrs.Set($(".rLeft", obj), "left");
  posterrs.Set($(".rUp", obj), "up");
  posterrs.Set($(".rDown", obj), "down");
  posterrs.Scale = true;

  var type = obj.data('type');
  if (type == 'text') {
    posterrs.Scale = false;
  }

  var drag = new Drag(obj, {
    Limit: true,
    mxContainer: "#poster",
    onMove: function () {
      updateInfoBox();
    }
  });

  $.contextMenu({
    selector: '.drag[index=' + posterIndex + ']',
    callback: function (key, options) {
      var zindex = parseInt($(this).attr('zindex'));

      if (key == 'prev') {
        var prevdiv = $(this).prev('.drag');
        if (prevdiv.length > 0) {
          $(this).insertBefore(prevdiv);
        }
      } else if (key == 'next') {
        var nextdiv = $(this).next('.drag');
        if (nextdiv.length > 0) {
          nextdiv.insertBefore($(this));
        }
      } else if (key == 'last') {
        var len = $('.drag').length;
        if (zindex >= len - 1) {
          return;
        }
        var last = $('#poster .drag:last');
        if (last.length > 0) {
          $(this).insertAfter(last);
        }
      } else if (key == 'first') {
        var zindex = $(this).index();
        if (zindex <= 1) {
          return;
        }
        var first = $('#poster .drag:first');
        if (first.length > 0) {
          $(this).insertBefore(first);
        }
      } else if (key == 'delete') {
        that = null;
        $(this).remove();
        updateInfoBox();
      }
      var n = 1;
      $('.drag').each(function () {
        $(this).css("z-index", n);
        n++;
      })
    },
    items: {
      "next": {
        name: "移动到上一层"
      },
      "prev": {
        name: "移动到下一层"
      },
      "last": {
        name: "移动到最顶层"
      },
      "first": {
        name: "移动到最低层"
      },
      "delete": {
        name: "删除组件"
      }
    }
  });
}

function deleteTimers() {
  clearInterval(imgcounter);
  clearInterval(ncounter);
  clearInterval(bscounter);
}

function getUrl(val) {
  if (val.indexOf('http://') == -1) {
    val = attachurl + val;
  }
  return val;
}

function getImgInfo(url) {
  var start_time = new Date().getTime();
  var img_url = url + "?t=" + start_time;
  var img = new Image();
  img.src = img_url;
  var check = function () {
    if (img.width > 0 || img.height > 0) {
      clearInterval(set);
    }
  };
  var set = setInterval(check, 40);
  img.onload = function () {
    return { 'width': img.width, 'height': img.height };
  };
}

function PreviewImg(imgFile) {
  var image = new Image();
  image.src = imgFile;
  return image;
}

function tiger_bind(obj) {
  that = obj;
  updateInfoBox();
  styleset.show();
  textset.hide();
  deleteTimers();
  var type = obj.data('type');
  if (type == 'text') {
    textset.show();
    var size = obj.attr('size') || "16";
    var input = textset.find('input:first');
    var namesize = textset.find('#namesize');
    var textAlign = obj.attr('textAlign') || "left";
    var fontStyle = obj.attr('fontStyle');
    var color = obj.attr('color') || "#000";
    input.val(color);
    $("#previewColor").css("background-color", color);
    namesize.val(size.replace("px", ""));
    $("#textAlign .control-radio").removeClass("active");
    $(`#textAlign .control-radio.${textAlign}`).addClass("active");
    $("#fontStyle .control-radio.active").removeClass("active")
    if (fontStyle == 2) {
      $("#fontStyle .control-radio.italic").addClass("active")
    } else if (fontStyle == 3) {
      $("#fontStyle .control-radio.bold").addClass("active")
    } else if (fontStyle == 4) {
      $("#fontStyle .control-radio.italic").addClass("active")
      $("#fontStyle .control-radio.bold").addClass("active")
    }
    //设置字体颜色
    if (!colorpickerObj) {
      colorpickerObj = Colorpicker.create({
        el: "colorpicker",
        color: $('input[name="color"]').val(),
        allMode: 'hex',
        change: function (elem, rgba, hex) {
          if (that) {
            $('#previewColor').css('backgroundColor', rgba);
            if (hex !== undefined) {
              $('input[name="color"]').val(hex);
              that.attr('color', input.val()).find('.text').css('color', input.val());
            }
          }
        }
      })
    }
  }
}

function updateInfoBox() {
  if (that) {
    $("#item-top").val(parseFloat($(that).css('top')));
    $("#item-left").val(parseFloat($(that).css('left')));
    $("#item-width").val(parseFloat($(that).css('width')));
    $("#item-height").val(parseFloat($(that).css('height')));
    $(that).find(".text").css('line-height', parseFloat($(that).css('height')) + "px")
  } else {
    $("#item-top").val('');
    $("#item-left").val('');
    $("#item-width").val('');
    $("#item-height").val('');
  }
}

function getPosterData() {
  var data = [];
  $('.drag').each(function () {
    var obj = $(this);
    var type = obj.data('type');
    var item = obj.data('item');
    var left = obj.css('left'),
      top = obj.css('top'),
      lab = obj.data('lab');
    var d = {
      left: left,
      top: top,
      type: type,
      item: item,
      lab: lab,
      width: obj.css('width'),
      height: obj.css('height')
    };
    if (type == 'text') {
      d.size = obj.attr('size');
      d.color = obj.attr('color');
      d.textAlign = obj.attr('textAlign');
      d.fontStyle = obj.attr('fontStyle');
    }
    data.push(d);
  });
  var bg = {
    'img': $('#poster .bg').attr('src'),
    'width': $('#poster .bg').width(),
    'height': $('#poster .bg').height()
  }

  return { 'bg': bg, 'data': data };
}

$(function () {
  $('.drag').each(function () {
    dragEvent($(this));
  });
  textset.hide(), styleset.hide();
  $('.btn-poster').click(function () {
    if ($('#poster .bg').attr('src').length <= 0) {
      alert('请选择背景图片!');
      return;
    }
    var type = $(this).data('type');
    var item = $(this).data('item');
    var lab = $(this).text();
    var obj = "";
    if (type == 'img' && item == 'qr') {
      obj = '<img src="/assets/addons/wdsxh/img/qr.png" />';
    } else if (type == 'img' && item == 'avatar') {
      obj = '<img src="/assets/addons/wdsxh/img/avatar.png" />';
    } else if (type == 'img' && item == 'banner') {
      obj = '<img src="/assets/addons/wdsxh/img/image.jpg" />';
    } else if (type == 'text') {
      obj = '<div class="text">' + lab.replace(/^\s*|\s*$/g, "") + '</div>';
    }
    if (!obj) {
      alert('组件类型错误');
      return;
    }
    var index = $('#poster .drag').length + 1;
    $(".drag").removeClass("active")
    var html = `<div class="drag active" data-type="${type}" data-item="${item}" data-lab="${lab.replace(/^\s*|\s*$/g, "")}" index="${index}" style="z-index: ${index}; left: 0px; top: 0px; " ${(type == "text" ? "size='16px' color='#000000' textAlign='left'" : "")}>
      ${obj}
      <div class="rRightDown"></div>
      <div class="rLeftDown"></div>
      <div class="rRightUp"></div>
      <div class="rLeftUp"></div>
      <div class="rRight"></div>
      <div class="rLeft"></div>
      <div class="rUp"></div>
      <div class="rDown"></div>
    </div>`;
    var obj = $(html);
    $('#poster').append(obj);
    dragEvent(obj);
    tiger_bind(obj);
  });
  $("#poster").on("mousedown", ".drag", function () {
    $(".drag").removeClass("active")
    $(this).addClass("active")
    tiger_bind($(this));
  });
  $("#poster").on("mousedown", ".rDown", function () {
    $(".drag").removeClass("active")
    $(this).addClass("active")
    tiger_bind($(this));
  });
  $("#colorclean").click(function () {
    $('input[name="color"]').val('#000000');
    $('#previewColor').css('backgroundColor', '#000000');
  })
  // 设置距顶边距
  $("#styleset").on('input', "#item-top", function (e) {
    var that = $(".drag.active")
    if (that) {
      that.attr('top', $(this).val() + "px").css('top', $(this).val() + "px");
    }
  });
  // 设置距左边距
  $("#styleset").on('input', "#item-left", function (e) {
    var that = $(".drag.active")
    if (that) {
      that.attr('left', $(this).val() + "px").css('left', $(this).val() + "px");
    }
  });
  // 设置组件宽度
  $("#styleset").on('input', "#item-width", function (e) {
    var that = $(".drag.active")
    if (that) {
      that.attr('width', $(this).val() + "px").css('width', $(this).val() + "px");
    }
  });
  // 设置组件高度
  $("#styleset").on('input', "#item-height", function (e) {
    var that = $(".drag.active")
    if (that) {
      that.attr('height', $(this).val() + "px").css('height', $(this).val() + "px");
      $(".drag.active .text").css('line-height', $(this).val() + "px");
    }
  });
  // 重置字体颜色
  $("#styleset").on('click', "#colorclean", function (e) {
    var that = $(".drag.active")
    if (that) {
      that.attr('color', "#000000").find('.text').css('color', "#000000");
    }
  });
  // 设置字体大小
  $("#styleset").on('input', "#namesize", function (e) {
    var that = $(".drag.active")
    var namesize = textset.find('#namesize');
    if (that) {
      that.attr('size', namesize.val() + "px").find('.text').css('font-size', namesize.val() + "px");
    }
  });
  // 设置文字位置
  $("#textAlign").on('click', ".control-radio", function (e) {
    var that = $(".drag.active")
    if (that) {
      that.attr('textAlign', $(this).attr("data-item")).find('.text').css('text-align', $(this).attr("data-item"));
      $("#textAlign .control-radio.active").removeClass("active")
      $(this).addClass("active")
    }
  });
  // 设置文字样式
  $("#fontStyle").on('click', ".control-radio", function (e) {
    var that = $(".drag.active")
    $(this).toggleClass("active")
    let list = $("#fontStyle .control-radio.active")
    let selected = []
    for (let i = 0; i < list.length; i++) {
      selected.push(list[i].getAttribute("data-item"))
    }
    selected = selected.join()
    if (selected.includes("bold") && selected.includes("italic")) {
      that.attr('fontStyle', 4).find('.text').css('font-weight', 'bold').css('font-style', 'italic');
    } else if (selected.includes("bold")) {
      that.attr('fontStyle', 3).find('.text').css('font-weight', 'bold').css('font-style', 'normal');
    } else if (selected.includes("italic")) {
      that.attr('fontStyle', 2).find('.text').css('font-weight', 'normal').css('font-style', 'italic');
    } else {
      that.attr('fontStyle', 1).find('.text').css('font-weight', 'normal').css('font-style', 'normal');
    }
  });
});