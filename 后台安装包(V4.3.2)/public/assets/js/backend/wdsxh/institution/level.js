define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/institution/level/index' + location.search + '&institution_id=' + Config.institution_id,
                    add_url: 'wdsxh/institution/level/add?institution_id=' + Config.institution_id,
                    edit_url: 'wdsxh/institution/level/edit?institution_id=' + Config.institution_id,
                    del_url: 'wdsxh/institution/level/del',
                    multi_url: 'wdsxh/institution/level/multi',
                    import_url: 'wdsxh/institution/level/import',
                    table: 'wdsxh_institution_level',
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
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'institution.name', title: __('Institution.name'), operate: 'LIKE'},
                        {field: 'level_name', title: __('Level_name'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons:[
                                {
                                    name: 'member_list',
                                    text: '成员列表',
                                    title: '成员列表',
                                    classname: 'btn btn-xs btn-info btn-dialog bg-olive',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/institution/member?level_id={id}',
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
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
