define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/mall/order/index' + location.search,
                    table: 'wdsxh_mall_order',
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
                        {field: 'order_no', title: __('Order_no'), operate: 'LIKE'},
                        {field: 'real_name', title: __('Real_name'), operate: 'LIKE'},
                        {field: 'user_phone', title: __('User_phone'), operate: 'LIKE'},
                        {field: 'user_address', title: __('User_address'), operate: 'LIKE'},
                        // {field: 'cart_ids', title: __('Cart_ids'), operate: 'LIKE'},
                        {field: 'number', title: '下单数量', operate: false},
                        {field: 'state', title: __('State'), searchList: {"1":__('待付款'),"2":__('待发货'),"3":__('待收货'),"4":__('已完成'),"5":__('支付失败'),"6":__('已取消'),"-1":__('退款中'),"-2":__('已退款')}, formatter: Table.api.formatter.status},
                        {field: 'pay_price', title: __('Pay_price'), operate:'BETWEEN'},
                        // {field: 'pay_postage', title: __('Pay_postage'), operate:'BETWEEN'},
                        {field: 'paid', title: __('Paid'), searchList: {"1":__('未付款'),"2":__('已付款')}, formatter: Table.api.formatter.normal},
                        {field: 'delivery_method', title: __('Delivery_method'), searchList: {"1":__('Delivery_method 1'),"2":__('Delivery_method 2')}, formatter: Table.api.formatter.normal},
                        {field: 'pick_up_code', title: __('Pick_up_code'), operate: 'LIKE'},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons:[
                                {
                                    name: 'delivery',
                                    text:'发货',
                                    classname: 'btn btn-xs btn-primary btn-dialog bg-aqua',
                                    icon: 'fa',
                                    extend:'data-area=["80%","80%"]',
                                    url: 'wdsxh/mall/order/delivery',
                                    visible:function(row){
                                        if(row['state']==2 && row['delivery_method']==1){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                    refresh:true
                                },
                                {
                                    text:'订单详情',
                                    name: 'goods_details',
                                    title: '订单详情',
                                    classname: 'btn btn-xs btn-primary btn-dialog bg-aqua',
                                    icon: 'fa',
                                    url: 'wdsxh/mall/order/goods_details',
                                    extend:'data-area=["95%","95%"]',
                                },
                                {
                                    name: 'confirm_self_pickup',
                                    text: __('确认自提'),
                                    title: __('确认自提'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax bg-green',
                                    url: 'wdsxh/mall/order/confirm_self_pickup',
                                    confirm: '确认确认自提？操作后将确认收货',
                                    visible:function (row){
                                        if(row.delivery_method == 2 && row.state == '2'){
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
                                    name: 'confirm_receipt',
                                    text: __('确认收货'),
                                    title: __('确认收货'),
                                    classname: 'btn btn-xs btn-info btn-magic btn-ajax bg-olive',
                                    icon: 'fa',
                                    url: 'wdsxh/mall/order/confirm_receipt',
                                    confirm: '确认收货？',
                                    visible:function (row){
                                        if(row.state == '3' && row.delivery_method == 1 && row.paid == '2'){
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
        confirm_self_pickup: function () {
            Controller.api.bindevent();
        },
        delivery: function () {
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
