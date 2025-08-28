define(['jquery', 'bootstrap', 'backend', 'table', 'form', 'clipboard', 'designer', 'jquery-contextMenu', 'jquery-form', 'jquery-lazyload', 'poster', 'wdsxh-colorpicker'], function ($, undefined, Backend, Table, Form, Clipboard, Designer, jqueryContextMenu, jqueryForm, jqueryLazyload, poster, colorpicker) {
    var Controller = {
        index: function () {
            $(".panel-body").show()
            $("#loading").hide()
            $("#faupload-image").data("upload-success", function (data) {
                var url = Fast.api.cdnurl(data.url);
                $(".bg").prop("src", url);
            });
            Form.api.bindevent($("form[role=form]"), function (data, ret) {
                Toastr.success("成功");
            }, function (data, ret) {
                Toastr.success("失败");
            }, function (success, error) {
                var data = getPosterData();
                console.log(data)
                $('#poster-data').val(JSON.stringify(data));
                Form.api.submit(this, success, error);
                return false;
            });
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"), function (data, ret) {
                    Toastr.success("成功");
                }, function (data, ret) {
                    Toastr.success("失败");
                }, function (success, error) {
                    var data = getPosterData();
                    $('#poster-data').val(JSON.stringify(data));
                    Form.api.submit(this, success, error);
                    return false;
                });
            }
        }
    };
    return Controller;
});