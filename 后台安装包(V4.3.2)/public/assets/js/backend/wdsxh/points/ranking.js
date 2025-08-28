define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/points/ranking/index' + location.search,
                    table: 'wdsxh_user_wechat_points_log',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                commonSearch: false,
                visible: true,
                showToggle: false,
                showColumns: true,
                search:false,
                showExport: true,
                columns: [
                    [
                        {field: 'id', title: __('会员Id')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'level.name', title: __('Level.name'), operate: 'LIKE'},
                        {field: 'wechat.points', title: __('Points'), operate: false},
                        // {field: 'before', title: __('Before')},
                        // {field: 'after', title: __('After')},
                        // {field: 'memo', title: __('Memo'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        // {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,
                            buttons:[
                                {
                                    name: 'list',
                                    text: __('积分日志'),
                                    title: __('积分日志'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa fa-list',
                                    url: 'wdsxh/points/user_wechat_points_log/index?wechat_id={wechat_id}',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    },
                                    extend: 'data-area=["70%","70%"]',
                                },
                                {
                                    name: 'agree',
                                    text: __('一键清零'),
                                    title: __('一键清零'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax',
                                    icon: 'fa fa-check',
                                    url: 'wdsxh/points/ranking/one_click_reset',
                                    confirm: '确认一键清零？操作后将清零',
                                    visible:function (row){
                                        if(row.wechat.points > 0){
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
                                }

                            ]
                        }

                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        one_click_reset: function () {
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
