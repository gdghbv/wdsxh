define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/tabbar/index' + location.search,
                    add_url: 'wdsxh/tabbar/add',
                    edit_url: 'wdsxh/tabbar/edit',
                    del_url: 'wdsxh/tabbar/del',
                    multi_url: 'wdsxh/tabbar/multi',
                    import_url: 'wdsxh/tabbar/import',
                    table: 'wdsxh_tabbar',
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
                        {field: 'path', title: __('Path'), operate: 'LIKE'},
                        {field: 'icon', title: __('Icon'), operate: false, formatter: Table.api.formatter.image},
                        {field: 'selicon', title: __('Selicon'), operate: false, formatter: Table.api.formatter.image},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
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
            }
        }
    };
    return Controller;
});