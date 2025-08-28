define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/article/article/index' + location.search,
                    add_url: 'wdsxh/article/article/add',
                    edit_url: 'wdsxh/article/article/edit',
                    del_url: 'wdsxh/article/article/del',
                    multi_url: 'wdsxh/article/article/multi',
                    import_url: 'wdsxh/article/article/import',
                    table: 'wdsxh_article',
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
                        {field: 'wdsxharticlecat.name', title: __('文章分类'), operate: false},
                        {field: 'title', title: __('Title'), operate: 'LIKE'},
                        {field: 'release', title: __('Release'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'status', title: __('Status'), searchList: {"0":__('Status 0'),"1":__('Status 1')}, formatter: Table.api.formatter.status},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
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
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[type]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1":
                            $('.linktext').addClass('hide');
                            $('.release').removeClass('hide');
                            $('.read_num').removeClass('hide');
                            $('.teletext').removeClass('hide');
                            break;
                        case "2":
                            $('.linktext').removeClass('hide');
                            $('.release').addClass('hide');
                            $('.read_num').addClass('hide');
                            $('.teletext').addClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});
