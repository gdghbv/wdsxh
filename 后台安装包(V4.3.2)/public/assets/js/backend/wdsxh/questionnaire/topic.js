define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/questionnaire/topic/index' + location.search,
                    add_url: 'wdsxh/questionnaire/topic/add?questionnaire_id=' + Config.questionnaire_id,
                    edit_url: 'wdsxh/questionnaire/topic/edit',
                    del_url: 'wdsxh/questionnaire/topic/del',
                    multi_url: 'wdsxh/questionnaire/topic/multi',
                    import_url: 'wdsxh/questionnaire/topic/import',
                    table: 'wdsxh_questionnaire_topic',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                fixedColumns: true,
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'topic', title: __('Topic'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'type', title: __('Type'), searchList: {"text":__('Type text'),"number":__('Type number'),"radio":__('Type radio'),"checkbox":__('Type checkbox'),"select":__('Type select'),"date":__('Type date'),"time":__('Type time'),"datetime":__('Type datetime'),"textarea":__('Type textarea'),"image":__('Type image'),"images":__('Type images')}, formatter: Table.api.formatter.normal},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), searchList: {"normal":__('Status normal'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        recyclebin: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    'dragsort_url': ''
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: 'wdsxh/questionnaire/topic/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), align: 'left'},
                        {
                            field: 'deletetime',
                            title: __('Deletetime'),
                            operate: 'RANGE',
                            addclass: 'datetimerange',
                            formatter: Table.api.formatter.datetime
                        },
                        {
                            field: 'operate',
                            width: '140px',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'Restore',
                                    text: __('Restore'),
                                    classname: 'btn btn-xs btn-info btn-ajax btn-restoreit',
                                    icon: 'fa fa-rotate-left',
                                    url: 'wdsxh/questionnaire/topic/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'wdsxh/questionnaire/topic/destroy',
                                    refresh: true
                                }
                            ],
                            formatter: Table.api.formatter.operate
                        }
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
                $(document).on('change', 'input[name="row[type]"]', function () {
                    var type = $("input[name='row[type]']:checked").val();
                    switch (type) {
                        case "radio":
                            $('.substance').removeClass('hide');
                            $('.is_explain').removeClass('hide');
                            $('.message').addClass('hide');
                            break;
                        case "checkbox":
                            $('.substance').removeClass('hide');
                            $('.is_explain').removeClass('hide');
                            $('.message').addClass('hide');
                            break;
                        case "select":
                            $('.substance').removeClass('hide');
                            $('.is_explain').addClass('hide');
                            $('.message').addClass('hide');
                            break;
                        case "text":
                            $('.substance').addClass('hide');
                            $('.is_explain').addClass('hide');
                            $('.message').removeClass('hide');
                            break;
                        case "number":
                            $('.substance').addClass('hide');
                            $('.is_explain').addClass('hide');
                            $('.message').removeClass('hide');
                            break;
                        case "datetime":
                            $('.substance').addClass('hide');
                            $('.is_explain').addClass('hide');
                            $('.message').removeClass('hide');
                            break;
                        case "textarea":
                            $('.substance').addClass('hide');
                            $('.is_explain').addClass('hide');
                            $('.message').removeClass('hide');
                            break;
                        case "images":
                            $('.substance').addClass('hide');
                            $('.is_explain').addClass('hide');
                            $('.message').addClass('hide');
                            break;
                    }
                });

                $(document).on('change', 'input[name="row[is_explain]"]', function () {
                    var type = $("input[name='row[is_explain]']:checked").val();
                    switch (type) {
                        case "1":
                            $('.explain').removeClass('hide');
                            break;
                        case "2":
                            $('.explain').addClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});
