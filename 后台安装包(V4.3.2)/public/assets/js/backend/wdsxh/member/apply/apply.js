define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        examine: function () {
            Controller.api.bindevent();
        },
        offline_examine: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[state]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "2":
                            $('.reject').addClass('hide');
                            break;
                        case "3":
                            $('.reject').removeClass('hide');
                            break;

                    }
                });
            }
        }
    };
    return Controller;
});
