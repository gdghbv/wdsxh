define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/activity/activity_apply/index' + location.search + '&activity_id=' + Config.activity_id,
                    add_url: 'wdsxh/activity/activity_apply/add?activity_id=' + Config.activity_id,
                    multi_url: 'wdsxh/activity/activity_apply/multi',
                    import_url: 'wdsxh/activity/activity_apply/import',
                    table: 'wdsxh_activity_apply',
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
                        // {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'order_no', title: '订单号', operate: false},
                        {field: 'wechat.nickname', title: '用户昵称', operate: 'LIKE'},
                        {field: 'wechat.avatar', title: '用户头像', operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'wechat.mobile', title: '用户电话', operate: false},
                        {field: 'activity.name', title: __('Activity.name'), operate: 'LIKE'},
                        {field: 'activity.start_time', title: __('Activity.start_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'activity.end_time', title: __('Activity.end_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'activity.fees', title: __('Activity.fees'), operate:'BETWEEN'},
                        {field: 'state', title: __('State'), searchList: {"1":__('State 1'),"2":__('State 2'),"3":__('State 3'),"4":__('State 4'),"5":__('State 5')}, formatter: Table.api.formatter.normal},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'is_sign_in', title: __('Is_sign_in'), searchList: {"1":__('Is_sign_in 1'),"2":__('Is_sign_in 2'),"3":__('Is_sign_in 3')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,
                            buttons: [
                                {
                                    name: 'field_data_details',
                                    text: __('报名信息'),
                                    title: __('报名信息'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/activity/activity_apply/field_data_details',
                                    visible: function (row) {
                                        if(row.show_field_data == 1){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                },
                            ]
                        }
                    ]
                ]
            });

            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $(".btn-editone,.btn-edit,.btn-add").data("area", ["80%", "80%"]);
            })

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
            $(document).on('click','#select-user',function () {
                Fast.api.open('wdsxh/member/member/activity_seluser?activity_id='+ Config.activity_id,'选择用户',{
                    area:['80%','95%'],
                    callback:function(data){
                        console.log(data);
                        if(data){
                            $('#c-uid').val(data.id);
                            $('#c-user').val(data.nickname);
                        }else{
                            Layer.alert("请选择用户");
                        }
                    }
                });
            });
        },
        field_data_details: function () {
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
