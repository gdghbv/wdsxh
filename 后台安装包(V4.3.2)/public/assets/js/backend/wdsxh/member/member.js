define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        member: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/member/member/member' + location.search,
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: '昵称', operate: 'LIKE'},
                        {field: 'avatar', title: '头像', operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'createtime', title: '注册时间', operate:false},
                        {field: 'level_name', title: '级别', operate: false},
                        {field: 'join_time', title: '加入时间', operate:'RANGE', addclass:'datetimerange', autocomplete:false},

                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        seluser:function(){
            Table.api.init({
                extend: {
                }
            });
            var table = $("#table");
            table.bootstrapTable({
                url: 'wdsxh/member/member/seluser' + location.search,
                pk: 'id',
                sortName: 'createtime',
                search:false,
                showToggle: false,
                showColumns: false,
                visible: false,
                showExport: false,
                searchFormVisible: true,
                sortOrder:'desc',
                columns: [
                    [
                        {field: 'id', title: __('ID'), sortable: true,operate: false},
                        {field: 'avatar', title: __('头像'), events: Table.api.events.image, formatter: Table.api.formatter.image, operate: false},
                        {field: 'nickname', title: __('昵称'), operate: 'LIKE'},
                        {field: 'mobile', title: __('手机号'), operate: 'LIKE'},
                        {field: 'createtime', title: __('创建时间'),operate: false, formatter: Table.api.formatter.datetime, addclass: 'datetimerange', sortable: true},
                        {
                            field: 'buttons',
                            width: "80px",
                            title: __('操作'),
                            text: __('操作'),
                            table: table,
                            operate: false,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'ajax',
                                    text: __('选择'),
                                    title: __('选择'),
                                    classname: 'btn btn-xs btn-primary btn-magic btn-click',
                                    icon: 'fa fa-check',
                                    click:function (obj,row) {
                                        console.log(row);
                                        Fast.api.close(row);
                                    }
                                }
                            ],
                            formatter: Table.api.formatter.buttons
                        }
                    ]
                ]
            });
            Table.api.bindevent(table);
        },
        activity_seluser:function(){
            Table.api.init({
                extend: {
                }
            });
            var table = $("#table");
            table.bootstrapTable({
                url: 'wdsxh/member/member/activity_seluser' + location.search,
                pk: 'id',
                sortName: 'createtime',
                search:false,
                showToggle: false,
                showColumns: false,
                visible: false,
                showExport: false,
                searchFormVisible: true,
                sortOrder:'desc',
                columns: [
                    [
                        {field: 'id', title: __('ID'), sortable: true,operate: false},
                        {field: 'avatar', title: __('头像'), events: Table.api.events.image, formatter: Table.api.formatter.image, operate: false},
                        {field: 'nickname', title: __('昵称'), operate: 'LIKE'},
                        {field: 'mobile', title: __('手机号'), operate: 'LIKE'},
                        {field: 'createtime', title: __('创建时间'),operate: false, formatter: Table.api.formatter.datetime, addclass: 'datetimerange', sortable: true},
                        {
                            field: 'buttons',
                            width: "80px",
                            title: __('操作'),
                            text: __('操作'),
                            table: table,
                            operate: false,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'ajax',
                                    text: __('选择'),
                                    title: __('选择'),
                                    classname: 'btn btn-xs btn-primary btn-magic btn-click',
                                    icon: 'fa fa-check',
                                    click:function (obj,row) {
                                        console.log(row);
                                        Fast.api.close(row);
                                    }
                                }
                            ],
                            formatter: Table.api.formatter.buttons
                        }
                    ]
                ]
            });
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
