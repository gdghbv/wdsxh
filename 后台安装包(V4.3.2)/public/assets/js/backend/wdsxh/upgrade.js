define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            Controller.api.bindevent();

            $(document).on("click", ".top-box-button", function (event) {
                $.post('wdsxh/upgrade/check', { old_version: Config.old_version, name: Config.name }, function (result) {
                    console.log(result); // 调试输出

                    if (result.code === 1) {
                        var window_bg = document.getElementsByClassName("renew-popup")[0];
                        var log_content = result.data.log_content;
                        $(".title-num").text(result.data.new_version);
                        $(".info-title").text(result.data.introduction);
                        $("#log").html(log_content);
                        window_bg.style.display = "block";

                    } else if (result.code === 2) {
                        Toastr.error(result.msg);
                    } else if (result.code === 3) {
                        Toastr.error('请先绑定授权编码');
                    } else {
                        var window_bg = document.getElementsByClassName("latest-popup")[0];
                        $("#latest-version").text(Config.old_version + '已是最新版本');
                        window_bg.style.display = "block";
                        window.onclick = function (event) {
                            if (event.target == window_bg) {
                                event.target.style.display = "none";
                            }
                        };
                    }
                });
            });
            $(document).on("click", ".info-button", function () {
                var window_bg = document.getElementsByClassName("renew-popup")[0];
                window_bg.style.display = "block";
                var index = layer.load(2, { //icon0-2 加载中,页面显示不同样式
                    // shade: [0.4, '#000'], //0.4为透明度 ，#000 为颜色
                    content: "更新中",
                    success: function (layero) {
                        layero.find('.layui-layer-content').css({
                            'padding-top': '40px',//图标与样式会重合，这样设置可以错开
                            'width': '200px'//文字显示的宽度
                        });
                    }
                });
                $.post('wdsxh/upgrade/update', { old_version: Config.old_version,name: Config.name }, function (result) {
                    if (result.code === 1) {
                        Toastr.success('升级成功');
                        layer.close(index);
                        // window_bg.style.display = "none"
                        return setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    } else if(result.code === 2) {
                        layer.close(index);
                        return Toastr.error(result.msg);
                    } else {
                        layer.close(index);
                        return Toastr.error(result.msg);

                    }
                    //return Toastr.error(result.msg);
                });

            });
            $(document).ready(function() {
                var index; // 在作用域内声明

                $(document).on("click", ".top-box-button-code", function () {
                    var inputValue = $('.top-box-name-code').val();
                    console.log(inputValue); // 打印到控制台以确认是否获取到值
                    $.post('wdsxh/upgrade/code_edit', {
                        code: inputValue,name: Config.name
                    }, function (result) {
                        if (result.code === 1) {
                            Toastr.success('绑定成功');
                            layer.close(index);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            layer.close(index);
                            Toastr.error(result.msg);
                        }
                    });
                });
            });


        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
