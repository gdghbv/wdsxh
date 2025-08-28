define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/mall/banner/index' + location.search,
                    add_url: 'wdsxh/mall/banner/add',
                    edit_url: 'wdsxh/mall/banner/edit',
                    del_url: 'wdsxh/mall/banner/del',
                    multi_url: 'wdsxh/mall/banner/multi',
                    import_url: 'wdsxh/mall/banner/import',
                    table: 'wdsxh_mall_banner',
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
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'jump_type', title: __('Jump_type'), searchList: {"0":__('Jump_type 0'),"1":__('Jump_type 1'),"2":__('Jump_type 2'),"3":__('Jump_type 3'),"4":__('Jump_type 4')}, formatter: Table.api.formatter.normal},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.toggle},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
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
                url: 'wdsxh/mall/banner/recyclebin' + location.search,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'title', title: __('Title'), align: 'left'},
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
                                    url: 'wdsxh/mall/banner/restore',
                                    refresh: true
                                },
                                {
                                    name: 'Destroy',
                                    text: __('Destroy'),
                                    classname: 'btn btn-xs btn-danger btn-ajax btn-destroyit',
                                    icon: 'fa fa-times',
                                    url: 'wdsxh/mall/banner/destroy',
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
                $("#c-jump_link").data("format-item", function(row){
                    return row.name + " 【" + row.url+"】";
                });
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[jump_type]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1":
                            $('.page-url').addClass('hide');
                            $('.outer-url').addClass('hide');
                            $('.wxapp').addClass('hide');
                            $('.teletext').removeClass('hide');
                            break;
                        case "2":
                            $('.page-url').removeClass('hide');
                            $('.outer-url').addClass('hide');
                            $('.wxapp').addClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                        case "4":
                            $('.page-url').addClass('hide');
                            $('.outer-url').addClass('hide');
                            $('.wxapp').removeClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                        case "3":
                            $('.page-url').addClass('hide');
                            $('.outer-url').removeClass('hide');
                            $('.wxapp').addClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});
