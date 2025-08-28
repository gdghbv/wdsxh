define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/mall/refund/index' + location.search,
                    del_url: 'wdsxh/mall/refund/del',
                    table: 'wdsxh_mall_order_refund',
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
                        {field: 'id', title: __('Id')},
                        {field: 'order_no', title: __('退款单号')},
                        {field: 'real_name', title: __('用户名称'),operate:false},
                        {field: 'refund_price', title: __('Refund_price'), operate:false},
                        {field: 'refund_time', title: __('Refund_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'refund_reason', title: __('Refund_reason'), operate: false, table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'refund_express_no', title: __('Refund_express_no'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:false, addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'add_express_no_time', title: __('Add_express_no_time'), operate:false, addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons:[
                                {
                                    name: 'three_adopt',
                                    text: __('通过'),
                                    title: __('通过申请'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax',
                                    url: 'wdsxh/mall/refund/three_adopt',
                                    confirm: '确认并同意退款申请？',
                                    visible:function(row){
                                        if(row['refund_status']==2){
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
                                    name: 'three_reject',
                                    text: __('驳回'),
                                    title: __('驳回申请'),
                                    classname: 'btn btn-xs btn-danger btn-magic btn-ajax',
                                    url: 'wdsxh/mall/refund/three_reject',
                                    confirm: '确认并驳回退款申请？',
                                    visible:function(row){
                                        if(row['refund_status']==2){
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
                                    name: 'refund',
                                    text: __('已收到商品,同意退款'),
                                    title: __('已收到商品,同意退款'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax',
                                    url: 'wdsxh/mall/refund/refund',
                                    confirm: '确认并已收到商品,同意退款申请？',
                                    visible:function(row){
                                        if(row['refund_status']==4){
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
