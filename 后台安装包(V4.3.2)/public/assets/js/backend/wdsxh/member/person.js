define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'wdsxh/member/person/index' + location.search,
                    add_url: 'wdsxh/member/person/add',
                    edit_url: 'wdsxh/member/person/edit',
                    del_url: 'wdsxh/member/person/del',
                    multi_url: 'wdsxh/member/person/multi',
                    import_url: 'wdsxh/member/person/import',
                    table: 'wdsxh_member',
                }
            });

            var table = $("#table");

            $(document).on("click", ".btn-export", function () {
                var ids = Table.api.selectedids(table);
                var page = table.bootstrapTable('getData');
                var all = table.bootstrapTable('getOptions').totalRows;
                console.log(ids, page, all);
                Layer.confirm("请选择导出的选项", {
                    title: '导出数据',
                    btn: ["选中项(" + ids.length + "条)", "本页(" + page.length + "条)", "全部(" + all + "条)"],
                    success: function (layero, index) {
                        $(".layui-layer-btn a", layero).addClass("layui-layer-btn0");
                    }
                    , yes: function (index, layero) {
                        submitForm(ids.join(","));
                        return false;
                    }
                    ,
                    btn2: function (index, layero) {
                        var ids = [];
                        $.each(page, function (i, j) {
                            ids.push(j.id);
                        });
                        submitForm(ids.join(","));
                        return false;
                    }
                    ,
                    btn3: function (index, layero) {
                        submitForm("all");
                        return false;
                    }
                })
            });
            var submitForm = function (ids) {
                // 确保隐藏表单存在
                var $form = $("#exportHiddenForm");
                if ($form.length === 0) {
                    $form = $("<form id='exportHiddenForm' method='post' target='_blank' style='display:none;'></form>");
                    $form.attr('action', Fast.api.fixurl("wdsxh/member/person/export"));
                    $form.append("<input type='hidden' name='ids' />");
                    $form.append("<input type='hidden' name='filter' />");
                    $form.append("<input type='hidden' name='op' />");
                    $form.append("<input type='hidden' name='search' />");
                    $form.append("<input type='hidden' name='columns' />");
                    $("body").append($form);
                }

                var options = table.bootstrapTable('getOptions');
                console.log(options);
                var columns = [];
                $.each(options.columns[0], function (i, j) {
                    if (j.field && !j.checkbox && j.visible && j.field != 'operate') {
                        columns.push(j.field);
                    }
                });
                var search = options.queryParams({});
                $("input[name=search]", $form).val(options.searchText);
                $("input[name=ids]", $form).val(ids);
                var _filter = search.filter || {};
                var _op = search.op || {};
                if (typeof _filter !== 'string') {
                    _filter = JSON.stringify(_filter);
                }
                if (typeof _op !== 'string') {
                    _op = JSON.stringify(_op);
                }
                $("input[name=filter]", $form).val(_filter);
                $("input[name=op]", $form).val(_op);
                $("input[name=columns]", $form).val(columns.join(','));
                $form[0].submit();
            };

            $(document).on("click", ".import_template", function () {
                Fast.api.ajax({
                    url:'wdsxh/member/person/import_template',
                }, function(data, ret){
                    //成功的回调
                    var $a = $("<a>");
                    $a.attr("href", data.file);
                    $a.attr("download", data.filename);
                    $("body").append($a);
                    $a[0].click();
                    $a.remove();
                    return false;
                }, function(data, ret){
                    alert(ret.msg);
                    //失败的回调
                    return false;
                });
            });


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
                        {field: 'name', title: __('Name'), operate: 'LIKE'},
                        {field: 'avatar', title: __('Avatar'), operate: 'LIKE', events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'mobile', title: __('Mobile'), operate: 'LIKE'},
                        {field: 'level.name', title: __('Level.name'), operate: 'LIKE'},
                        {field: 'native_place', title: __('Native_place'), operate: 'LIKE'},
                        {field: 'industry.name', title: __('Industry.name'), operate: 'LIKE'},
                        {field: 'join_time', title: __('Join_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
                        {field: 'expire_time', title: __('Expire_time'), operate:'RANGE', addclass:'datetimerange', autocomplete:false},
                        {field: 'status', title: __('Status'), searchList: {"normal":__('Status normal'),"hidden":__('Status hidden')}, formatter: Table.api.formatter.status},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', autocomplete:false, formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $(".btn-editone,.btn-edit,.btn-add").data("area", ["100%", "100%"]);
            });

            // 为表格绑定事件
            Table.api.bindevent(table);

            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $(".btn-editone,.btn-edit,.btn-add").data("area", ["100%", "100%"]);
            });
        },
        add: function () {
            Controller.api.bindevent();
            $(document).on('click','#select-user',function () {
                Fast.api.open('wdsxh/member/member/seluser','选择用户',{
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
        edit: function () {
            $(document).on('click','#select-user',function () {
                Fast.api.open('wdsxh/member/member/seluser','选择用户',{
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
            
            // 监听用户输入框变化，当清空时同时清空隐藏字段
            $(document).on('input', '#c-user', function() {
                if ($(this).val() === '') {
                    $('#c-uid').val('');
                }
            });
            
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
