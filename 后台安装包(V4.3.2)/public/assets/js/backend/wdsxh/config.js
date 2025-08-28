define(['jquery', 'bootstrap', 'backend', 'table', 'form','wdsxh-colorpicker'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            Controller.api.bindevent();

            //选择颜色
            var colorpickerObj = null;
            $(document).on("click", ".colorpicker", function () {
                var that = this;
                var input_id = $(that).data("input-id") ? $(that).data("input-id") : "";
                var color = $("#" + input_id).val();

                if (!colorpickerObj) {
                    colorpickerObj = Colorpicker.create({
                        el: "colorpicker",
                        color: color ? color : 'rgba(0,0,0)',
                        allMode: 'hex',
                        change: function (elem, rgba, hex) {
                            $("#" + input_id).val(hex);
                        }
                    });
                } else {
                    colorpickerObj.color = color ? color : 'rgba(0,0,0)';
                    // 调用 Colorpicker 库中提供的方法来重新渲染颜色选择器
                    colorpickerObj.render();
                }
                // 显示颜色选择器
                colorpickerObj.show();
            });
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[jump_type]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1"://小程序客服
                            $('.jump_link').addClass('hide');
                            $('.call_mobile').addClass('hide');
                            break;
                        case "2"://拨打电话
                            $('.jump_link').addClass('hide');
                            $('.call_mobile').removeClass('hide');
                            break;
                        case "3"://外部链接
                            $('.call_mobile').addClass('hide');
                            $('.jump_link').removeClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});
