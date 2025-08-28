define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        config: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[self_pickup_status]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1":
                            $('.address').removeClass('hide');
                            break;
                        case "2":
                            $('.address').addClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});
