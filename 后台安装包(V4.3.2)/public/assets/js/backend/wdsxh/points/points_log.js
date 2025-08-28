define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/points/points_log/index' + location.search,
                    add_url: 'wdsxh/points/points_log/add',
                    multi_url: 'wdsxh/points/points_log/multi',
                    import_url: 'wdsxh/points/points_log/import',
                    del_url:'wdsxh/points/points_log/del',
                    edit_url: 'wdsxh/points/points_log/edit',
                    table: 'wdsxh_user_wechat_points_log',
                    
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'wechat_id', title: __('Wechat_id')},
                        {field: 'points', title: __('Points'),operate: false},
                        {field: 'before', title: __('Before')},
                        {field: 'after', title: __('After')},
                        {field: 'total_points', title: __('Total_points')},
                        {field: 'memo', title: __('Memo'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'change', title: __('Change'), searchList: {"1":__('Change 1'),"2":__('Change 2')}, formatter: Table.api.formatter.normal},
                        {field: 'activity_id', title: __('Activity_id')},
                        {field: 'source', title: __('Source'), searchList: {"1":__('Source 1')}, formatter: Table.api.formatter.normal},
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
        edit:function(){
Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
