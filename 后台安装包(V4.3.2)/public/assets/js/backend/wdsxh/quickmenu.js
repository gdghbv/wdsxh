define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/quickmenu/index' + location.search,
                    add_url: 'wdsxh/quickmenu/add',
                    edit_url: 'wdsxh/quickmenu/edit',
                    del_url: 'wdsxh/quickmenu/del',
                    multi_url: 'wdsxh/quickmenu/multi',
                    import_url: 'wdsxh/quickmenu/import',
                    table: 'wdsxh_quickmenu',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'icon', title: __('Icon'), operate: false, formatter: Table.api.formatter.image},
                        {field: 'skip_type', title: __('Skip_type'), searchList: {"1":__('Skip_type 1'),"2":__('Skip_type 2'),"3":__('Skip_type 3'),"4":__('Skip_type 4')}, formatter: Table.api.formatter.normal},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                $("#c-path").data("format-item", function(row){
                    return row.name + " 【" + row.url+"】";
                });
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[skip_type]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1":
                            $('.page-url').removeClass('hide');
                            $('.outer-url').addClass('hide');
                            $('.wxapp').addClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                        case "2":
                            $('.page-url').addClass('hide');
                            $('.outer-url').addClass('hide');
                            $('.wxapp').addClass('hide');
                            $('.teletext').removeClass('hide');
                            break;
                        case "3":
                            $('.page-url').addClass('hide');
                            $('.outer-url').addClass('hide');
                            $('.wxapp').removeClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                        case "4":
                            $('.page-url').addClass('hide');
                            $('.outer-url').removeClass('hide');
                            $('.wxapp').addClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});