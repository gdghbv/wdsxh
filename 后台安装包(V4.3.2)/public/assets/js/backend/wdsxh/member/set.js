define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                $(document).on('change','input[name="row[expire_time_type]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1":
                            $('.fixed_date').addClass('hide');
                            $('.days').removeClass('hide');
                            break;
                        case "2":
                            $('.days').addClass('hide');
                            $('.fixed_date').removeClass('hide');
                            break;

                    }
                });
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
