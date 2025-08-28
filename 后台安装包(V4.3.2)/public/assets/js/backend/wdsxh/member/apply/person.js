define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/member/apply/person/index' + location.search,
                    del_url: 'wdsxh/member/apply/apply/del',
                    examine_url: 'wdsxh/member/apply/apply/examine',
                    table: 'wdsxh_member_apply',
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
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'avatar', title: __('Avatar'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'native_place', title: __('Native_place'), operate: 'LIKE'},
                        {field: 'level.name', title: __('Level.name'), operate: 'LIKE'},
                        {field: 'state', title: __('State'), visible: false, searchList: {"1":__('State 1'),"2":__('State 2'),"3":__('State 3'),"4":__('State 4')}, formatter: Table.api.formatter.normal},
                        {field: 'child_state', title: __('State'), searchList: {"1":'待审核',"2":'已驳回',"3":'待付款',"4":'线下待审核',"5":'线下已驳回',"6":'已通过'}, formatter: Table.api.formatter.normal},
                        {field: 'examine_name', title: '审核人', operate: false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,
                            buttons: [
                                {
                                    name: 'examine',
                                    text: __('入会审核'),
                                    title: __('查看'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/member/apply/apply/examine',
                                    visible: function (row) {
                                        if(row.child_state == 1){
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
                                {
                                    name: 'offline_examine',
                                    text: __('线下审核'),
                                    title: __('查看'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/member/apply/apply/offline_examine',
                                    visible: function (row) {
                                        if(row.child_state == 4){
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
                                {
                                    name: 'details',
                                    text: __('详情'),
                                    title: __('查看'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/member/apply/apply/examine',
                                    visible: function (row) {
                                        if(row.child_state != '1' && row.child_state != '4'){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                },
                                {
                                    name: 'del',
                                    text: __('删除'),
                                    title: __('删除'),
                                    classname: 'btn btn-xs btn-danger btn-magic btn-ajax',
                                    url: 'wdsxh/member/apply/apply/del',
                                    confirm: '确认删除吗？',
                                    visible:function(row){
                                        if(row['child_state'] =='3'){
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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
