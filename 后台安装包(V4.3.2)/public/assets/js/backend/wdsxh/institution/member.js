define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/institution/member/index' + location.search + '&institution_id=' + Config.institution_id + '&level_id=' + Config.level_id,
                    add_url: 'wdsxh/institution/member/add?institution_id=' + Config.institution_id + '&level_id=' + Config.level_id,
                    edit_url: 'wdsxh/institution/member/edit?institution_id=' + Config.institution_id + '&level_id=' + Config.level_id,
                    del_url: 'wdsxh/institution/member/del',
                    multi_url: 'wdsxh/institution/member/multi',
                    import_url: 'wdsxh/institution/member/import',
                    table: 'wdsxh_institution_member',
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
                        {field: 'usermember.name', title: __('Member_id')},
                        {field: 'usermember.mobile', title: '会员手机号', operate: 'LIKE'},
                        {field: 'institution.name', title: __('Institution.name'), operate: 'LIKE'},
                        {field: 'level.level_name', title: __('Level.level_name'), operate: 'LIKE'},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'member_expire_status', title: __('会员状态'), searchList: {"1":__('正常'),"2":__('已过期')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
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
                $("#c-level_id").data("params", function(){
                    console.log($("#c-institution_id").val());
                    return {custom: {institution_id: $('input[name="row[institution_id]"]').val()}};
                });
                $(document).on("change", "#c-institution_id_text", function () {
                    $("#c-level_id_text").val('');
                });


                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
