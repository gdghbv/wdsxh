define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/user/wechat/index' + location.search,
                    table: 'wdsxh_user_wechat',
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
                        {field: 'nickname', title: __('Nickname'), operate: 'LIKE'},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'avatar', title: __('Avatar'), operate: 'LIKE', events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'set_admin', title: __('Set_admin'), searchList: {"1":__('Set_admin 1'),"2":__('Set_admin 2')}, formatter: Table.api.formatter.normal},
                        {field: 'channel', title: __('Channel'), searchList: {"1":__('Channel 1'),"2":__('Channel 2')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons:[
                                {
                                    name: 'pass_through',
                                    text: __('设为管理员'),
                                    title: __('设为管理员'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax',
                                    url: 'wdsxh/user/wechat/pass_through',
                                    confirm: '确认设此用为管理员？',
                                    visible:function(row){
                                        if(row['set_admin']==2){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                    success: function (data, ret) {
                                        $("#table").bootstrapTable('refresh',{});
                                    },
                                    error: function (data, ret) {
                                        Toastr.error(ret.msg);
                                        return false;
                                    }
                                },
                                {
                                    name: 'cancellation',
                                    text: __('取消管理员'),
                                    title: __('取消管理员'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax',
                                    url: 'wdsxh/user/wechat/cancellation',
                                    confirm: '确认并取消此用户的管理权限？',
                                    visible:function(row){
                                        if(row['set_admin']==1){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                    success: function (data, ret) {
                                        $("#table").bootstrapTable('refresh',{});
                                    },
                                    error: function (data, ret) {
                                        Toastr.error(ret.msg);
                                        return false;
                                    }
                                },
                            ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        user: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/user/wechat/user' + location.search,
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
                        {field: 'nickname', title: '昵称', operate: 'LIKE'},
                        {field: 'avatar', title: '头像', operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'createtime', title: '注册时间', operate:'RANGE', addclass:'datetimerange', autocomplete:false},

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
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
