define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/activity/activity/index' + location.search,
                    add_url: 'wdsxh/activity/activity/add',
                    edit_url: 'wdsxh/activity/activity/edit',
                    del_url: 'wdsxh/activity/activity/del',
                    multi_url: 'wdsxh/activity/activity/multi',
                    import_url: 'wdsxh/activity/activity/import',
                    table: 'wdsxh_activity',
                }
            });

            var table = $("#table");

            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $(".btn-editone,.btn-edit,.btn-add").data("area", ["100%", "100%"]);
            });

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'weigh',
                fixedRightNumber: 1,
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'fees', title: __('Fees'), operate:'BETWEEN'},
                        {field: 'organizing_method', title: __('Organizing_method'), searchList: {"1":__('Organizing_method 1'),"2":__('Organizing_method 2')}, formatter: Table.api.formatter.normal},
                        {field: 'apply_time', title: __('Apply_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'start_time', title: __('Start_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'end_time', title: __('End_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'state', title: __('State'), searchList: {"1":__('State 1'),"2":__('State 2'),"3":__('State 3')}, formatter: Table.api.formatter.normal},
                        {field: 'is_verifying', title: __('Is_verifying'), searchList: {"1":__('Is_verifying 1'),"2":__('Is_verifying 2')}, formatter: Table.api.formatter.normal},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'weigh', title: __('Weigh'), operate: false},
                        {field: 'status', title: __('Status'), searchList: {"normal":__('Status normal'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
                        {field: 'applet_activity_qrcode_path', title: __('Applet_activity_qrcode_path'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'points_status', title: __('Points_status'), searchList: {"1":__('Points_status 1'),"2":__('Points_status 2'),"3":__('Points_status 3')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate,
                            buttons:[
                                {
                                    name: 'list',
                                    text: __('报名列表'),
                                    title: __('报名列表'),
                                    classname: 'btn btn-xs btn-info btn-dialog',
                                    icon: 'fa fa-list',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/activity/activity_apply?activity_id={id}',
                                    callback: function (data) {
                                        Layer.alert("接收到回传数据：" + JSON.stringify(data), {title: "回传数据"});
                                    },
                                    visible: function (row) {
                                        //返回true时按钮显示,返回false隐藏
                                        return true;
                                    }
                                },
                                {
                                    name: 'verification_qr_code',
                                    text: __('公众号签到二维码'),
                                    title: __('公众号签到二维码'),
                                    classname: 'btn btn-xs bg-olive btn-dialog',
                                    icon: 'fa fa-qrcode',
                                    extend: 'data-area=["40%","60%"]',
                                    url: 'wdsxh/activity/activity/verification_qr_code',
                                    visible: function (row) {
                                        if(Config.wananchi_appid !== null && Config.wananchi_appid !== undefined && Config.wananchi_appid !== '' && row.is_verifying == '1' && row.verification_method == 1 && row.state != '3'){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                },
                                {
                                    name: 'verification_applet_code',
                                    text: __('小程序签到二维码'),
                                    title: __('小程序签到二维码'),
                                    classname: 'btn btn-xs bg-black btn-dialog',
                                    icon: 'fa fa-qrcode',
                                    extend: 'data-area=["40%","60%"]',
                                    url: 'wdsxh/activity/activity/verification_applet_code',
                                    visible: function (row) {
                                        if(Config.applet_appid !== null && Config.applet_appid !== undefined && Config.applet_appid !== '' && row.is_verifying == '1' && row.verification_method == 1 && row.state != '3'){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                },
                                {
                                    name: 'fieldset',
                                    text: __('自定义报名字段'),
                                    title: __('自定义报名字段'),
                                    classname: 'btn btn-xs btn-primary btn-dialog',
                                    icon: 'fa fa-list',
                                    extend: 'data-area=["100%","100%"]',
                                    url: 'wdsxh/activity/activity_fieldset/fieldset',
                                    visible: function (row) {
                                        if(row.apply_field_state == 1){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    },
                                }
                            ]
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
        verification_qr_code: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
                $(document).on('change','input[name="row[organizing_method]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1":
                            $('.address').addClass('hide');
                            $('.url').removeClass('hide');
                            break;
                        case "2":
                            $('.url').addClass('hide');
                            $('.address').removeClass('hide');
                            break;
                    }
                });
                $(document).on('change','input[name="row[is_verifying]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1"://需要核销
                            $('.verification_method').removeClass('hide');
                            break;
                        case "2"://不需要核销
                            $('.verification_method').addClass('hide');
                            $('.verifying_wechat_ids').addClass('hide');
                            break;
                    }
                });
                $(document).on('change','input[name="row[verification_method]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1"://核销方式：自动签到
                            $('.verifying_wechat_ids').addClass('hide');
                            break;
                        case "2"://核销方式：管理员核销
                            $('.verifying_wechat_ids').removeClass('hide');
                            break;
                    }
                });
                $(document).on('change','input[name="row[points_status]"]',function (){
                    var type=$(this).val();
                    switch (type){
                        case "1"://能活动积分
                            $('.points').removeClass('hide');
                            break;
                        case "2"://不能活动积分
                            $('.points').addClass('hide');
                            break;
                    }
                });
            }
        }
    };
    return Controller;
});
