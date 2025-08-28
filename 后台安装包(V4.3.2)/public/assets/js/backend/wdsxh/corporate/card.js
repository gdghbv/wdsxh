define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/corporate/card/index' + location.search,
                    edit_url: 'wdsxh/corporate/card/edit',
                    del_url: 'wdsxh/corporate/card/del',
                    table: 'wdsxh_corporate_card',
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
                        {field: 'share_title', title: __('Share_title'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'image', title: __('Image'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'avatar', title: __('Avatar'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'company_name', title: __('Company_name'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'company_position', title: __('Company_position'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'company_address', title: __('Company_address'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'wechat_number', title: __('Wechat_number'), operate: 'LIKE', table: table, class: 'autocontent', formatter: Table.api.formatter.content},
                        {field: 'is_default', title: __('Is_default'), searchList: {"1":__('Is_default 1'),"2":__('Is_default 2')}, formatter: Table.api.formatter.normal},
                        {field: 'is_hide_avatar', title: __('Is_hide_avatar'), searchList: {"1":__('Is_hide_avatar 1'),"2":__('Is_hide_avatar 2')}, formatter: Table.api.formatter.normal},
                        {field: 'is_wechat_number_public', title: __('Is_wechat_number_public'), searchList: {"1":__('Is_wechat_number_public 1'),"2":__('Is_wechat_number_public 2')}, formatter: Table.api.formatter.normal},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,buttons:[
                                {
                                    name: 'details',
                                    text: __('查看详情'),
                                    title: __('查看详情'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    url: 'wdsxh/corporate/card/details',
                                    extend: 'data-area=["80%","80%"]',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    }
                                }

                            ]}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        details: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                $('body').on('click', '[data-tips-image]', function () {
                    var img = new Image();
                    var imgWidth = this.getAttribute('data-width') || '480px';
                    img.onload = function () {
                        var $content = $(img).appendTo('body').css({background: '#fff', width: imgWidth, height: 'auto'});
                        Layer.open({
                            type: 1, area: imgWidth, title: false, closeBtn: 1,
                            skin: 'layui-layer-nobg', shadeClose: true, content: $content,
                            end: function () {
                                $(img).remove();
                            },
                            success: function () {

                            }
                        });
                    };
                    img.onerror = function (e) {

                    };
                    img.src = this.getAttribute('data-tips-image') || this.src;
                });
            }
        }
    };
    return Controller;
});
