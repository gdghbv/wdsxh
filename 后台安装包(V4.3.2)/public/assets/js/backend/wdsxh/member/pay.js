define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/member/pay/index' + location.search,
                    table: 'wdsxh_member_pay',
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
                        {field: 'order_no', title: '订单号', operate: 'LIKE'},
                        {field: 'wechat.nickname', title: '昵称', operate: false},
                        {field: 'wechat.avatar', title: '头像', operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'member.name', title: '姓名', operate: 'LIKE'},
                        {field: 'level.name', title: '入会级别', operate: 'LIKE'},
                        {field: 'fees', title: __('Fees'), operate:'BETWEEN'},
                        {field: 'paid', title: __('Paid'), searchList: {"1":__('Paid 1'),"2":__('Paid 2')}, formatter: Table.api.formatter.normal},
                        {field: 'pay_time', title: __('Pay_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'pay_method', title: '缴费方式', searchList: {"2":'微信支付',"3":'线下缴费',"4":'后台添加'}, formatter: Table.api.formatter.normal},
                        {field: 'pay_voucher', title: '缴费凭证', operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
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
