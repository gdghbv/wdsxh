define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/points/user_wechat_points_log/index' + location.search,
                    table: 'wdsxh_user_wechat_points_log',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                commonSearch: false,
                visible: false,
                showToggle: false,
                showColumns: false,
                search:false,
                showExport: false,
                columns: [
                    [
                        {field: 'id', title: __('Id')},
                        {field: 'points', title: __('Points')},
                        {field: 'before', title: __('Before')},
                        {field: 'after', title: __('After')},
                        {field: 'memo', title: __('Memo'), operate: 'LIKE', table: table, class: 'autocontent'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'change', title: __('Change'), searchList: {"1":__('Change 1'),"2":__('Change 2')}, formatter: Table.api.formatter.normal},
                        {field: 'source', title: __('Source'), searchList: {"1":__('Source 1'),"2":__('Source 2'),"3":__('Source 3')}, formatter: Table.api.formatter.normal},
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
