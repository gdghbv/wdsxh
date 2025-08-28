define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/institution/institution/index' + location.search,
                    add_url: 'wdsxh/institution/institution/add',
                    edit_url: 'wdsxh/institution/institution/edit',
                    del_url: 'wdsxh/institution/institution/del',
                    multi_url: 'wdsxh/institution/institution/multi',
                    import_url: 'wdsxh/institution/institution/import',
                    table: 'wdsxh_institution',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'icon', title: __('Icon'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons:[
                                {
                                    name: 'level_list',
                                    text: '级别列表',
                                    title: '级别列表',
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    url: 'wdsxh/institution/level?institution_id={id}',
                                    extend: 'data-area=["100%","100%"]',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },


                                },
                                {
                                    name: 'member_list',
                                    text: '成员列表',
                                    title: '成员列表',
                                    classname: 'btn btn-xs btn-info btn-dialog bg-olive',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/institution/member?institution_id={id}',
                                    refresh:true,
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
        institution_config: function () {
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
