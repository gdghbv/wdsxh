define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/activity/refund/index' + location.search,
                    // del_url: 'wdsxh/activity/refund/del',
                    table: 'wdsxh_activity_refund',
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
                        // {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'order.order_no', title: '订单号', operate: 'LIKE'},
                        {field: 'activity.name', title: '活动名称', operate: 'LIKE'},
                        {field: 'wechat.nickname', title: '用户昵称', operate: 'LIKE'},
                        {field: 'wechat.avatar', title: '用户头像', operate: 'LIKE', events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'wechat.mobile', title: '用户电话', operate: 'LIKE'},
                        {field: 'activity.fees', title: '报名费用', operate: false},
                        {field: 'order.pay_amount', title: '退款费用', operate: false},
                        {field: 'state', title: __('State'), searchList: {"1":__('State 1'),"2":__('State 2'),"3":__('State 3')}, formatter: Table.api.formatter.normal},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'dispose_time', title: __('Dispose_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {
                            field: 'buttons',
                            width: "120px",
                            title: __('操作'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'agree',
                                    text: __('确认退款'),
                                    title: __('确认退款'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax',
                                    icon: 'fa fa-check',
                                    url: 'wdsxh/activity/refund/agree',
                                    confirm: '确认并同意退款？退款后费用将原路退回',
                                    visible:function (row){
                                        if(row.state == 1){
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
                                    name: 'refuse',
                                    text: __('拒绝退款'),
                                    title: __('拒绝退款'),
                                    classname: 'btn btn-xs btn-info btn-danger btn-dialog',
                                    icon: 'fa fa-close',
                                    url: 'wdsxh/activity/refund/refuse',
                                    visible: function (row) {
                                        if(row.state == 1){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                    success: function (data, ret) {
                                        $(".btn-refresh").trigger("click");
                                        return true;
                                    },
                                    error: function (data, ret) {
                                        Layer.alert(ret.msg);
                                        return false;
                                    }
                                },

                                // {
                                //     name: 'del',
                                //     icon: 'fa fa-trash',
                                //     title: __('删除'),
                                //     text: __('删除'),
                                //     extend: 'data-toggle="tooltip"',
                                //     classname: 'btn btn-xs btn-danger btn-delone'
                                // }
                            ],
                            formatter: Table.api.formatter.buttons
                        }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        agree: function () {
            Controller.api.bindevent();
        },
        refuse: function () {
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
