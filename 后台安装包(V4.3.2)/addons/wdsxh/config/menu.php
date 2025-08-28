<?php

/**
             * 菜单配置文件
             */
            return[
                [
                'type'=> 'file',
                'name'=> 'wdsxh',
                'title'=> '沃德商协会系统',
                'icon'=> 'fa fa-list',
                'condition'=> '',
                'remark'=> '',
                'ismenu'=> 1,
                'weigh'=> 0,
                'sublist'=> [
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/dashboard/index',
                    'title'=> '数据统计',
                    'icon'=> 'fa fa-dashboard',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 21,
                    'sublist'=> []
                ], [
                    'type'=> 'file',
                    'name'=> 'wdsxh/config/index',
                    'title'=> '系统配置',
                    'icon'=> 'fa fa-cog',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 20,
                    'sublist'=> []
                ], [
                    'type'=> 'file',
                    'name'=> 'wdsxh/business/association/index',
                    'title'=> '商协管理',
                    'icon'=> 'fa fa-bar-chart-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 19,
                    'sublist'=> []
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/home_set',
                    'title'=> '页面装修',
                    'icon'=> 'fa fa-home',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 18,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/diy_page',
                        'title'=> '首页装修',
                        'icon'=> 'fa fa-edit',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 3,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/select_home_mode',
                            'title'=> '选择首页模式',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/get_article_link',
                            'title'=> '选择url',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/set_home',
                            'title'=> '设为首页',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/editor',
                            'title'=> '显示富文本',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/select_url_pro',
                            'title'=> '选择链接',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/add',
                            'title'=> 'Add',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/get_article_category',
                            'title'=> '选择文章分类',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/diy_page/get_demand_category',
                            'title'=> '选择供需分类',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/fixed_style',
                        'title'=> '固定首页',
                        'icon'=> 'fa fa-expeditedssl',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 2,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/banner',
                            'title'=> '轮播管理',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/banner/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/banner/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/banner/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/banner/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/banner/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/quickmenu',
                            'title'=> '快速导航',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/quickmenu/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/quickmenu/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/quickmenu/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/quickmenu/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/quickmenu/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ]]
                    ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/person_center_diy_page',
                            'title'=> '个人中心',
                            'icon'=> 'fa fa-align-center',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 1,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/person_center_diy_page/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/person_center_diy_page/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                            'type'=> 'file',
                                'name'=> 'wdsxh/person_center_diy_page/editor',
                                'title'=> '显示富文本',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/person_center_diy_page/select_url_pro',
                            'title'=> '选择链接',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                        ]
                    ]
                ], [
                    'type'=> 'file',
                    'name'=> 'wdsxh/member_set',
                    'title'=> '入会设置',
                    'icon'=> 'fa fa-paper-plane',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 17,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/set/index',
                        'title'=> '入会设置',
                        'icon'=> 'fa fa-gear',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 5,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/willbrand/index',
                        'title'=> '电子会牌',
                        'icon'=> 'fa fa-id-card-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/apply',
                        'title'=> '入会申请',
                        'icon'=> 'fa fa-user-plus',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/apply/apply/offline_examine',
                            'title'=> '线下审核',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/apply/apply/examine',
                            'title'=> '审核',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/apply/apply/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/apply/organize',
                            'title'=> '团体会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/apply/organize/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/apply/company',
                            'title'=> '企业会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/apply/company/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/apply/person',
                            'title'=> '个人会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/apply/person/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/level',
                        'title'=> '会员级别',
                        'icon'=> 'fa fa-users',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/level/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/level/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/level/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/level/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/level/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/join_config',
                        'title'=> '入会类型',
                        'icon'=> 'fa fa-opencart',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/join_config/fieldset',
                            'title'=> '自定义登记字段',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/join_config/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/join_config/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/join_config/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/member',
                    'title'=> '会员管理',
                    'icon'=> 'fa fa-address-card',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 16,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/member_list',
                        'title'=> '会员列表',
                        'icon'=> 'fa fa-address-card',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 3,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/member/index',
                            'title'=> '选择会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/member/seluser',
                            'title'=> '选择普通用户',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/member/activity_seluser',
                            'title'=> '选择报名普通用户',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/member/multi',
                            'title'=> '更多',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/member/member',
                            'title'=> '商协会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/member/del',
                            'title'=> '删除会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ],[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/organize',
                            'title'=> '团体会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/import',
                                'title'=> '团体会员导入数据',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/import_template',
                                'title'=> '下载团体会员模板',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/export',
                                'title'=> '导出',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/organize/activitySeluser',
                                'title'=> '活动选择报名用户',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/company',
                            'title'=> '企业会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/import',
                                'title'=> '企业会员导入数据',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/import_template',
                                'title'=> '下载企业会员模板',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/export',
                                'title'=> '导出',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/company/activitySeluser',
                                'title'=> '活动选择报名用户',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/person',
                            'title'=> '个人会员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/import',
                                'title'=> '个人会员导入数据',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/import_template',
                                'title'=> '下载个人会员模板',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                            'type'=> 'file',
                                'name'=> 'wdsxh/member/person/export',
                                'title'=> '导出',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/member/person/activitySeluser',
                                'title'=> '活动选择报名用户',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/industry_category',
                        'title'=> '行业分类',
                        'icon'=> 'fa fa-industry',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/industry_category/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/industry_category/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/industry_category/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/industry_category/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/industry_category/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/pay/index',
                        'title'=> '缴费记录',
                        'icon'=> 'fa fa-money',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/article',
                    'title'=> '新闻资讯',
                    'icon'=> 'fa fa-newspaper-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 15,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/article/article',
                        'title'=> '文章管理',
                        'icon'=> 'fa fa-list-alt',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/article/article_cat',
                        'title'=> '文章分类',
                        'icon'=> 'fa fa-industry',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article_cat/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article_cat/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article_cat/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article_cat/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/article/article_cat/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/tabbar',
                    'title'=> '底部导航',
                    'icon'=> 'fa fa-tablet',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 14,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/tabbar/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/tabbar/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/tabbar/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/tabbar/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/tabbar/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/activity',
                    'title'=> '活动管理',
                    'icon'=> 'fa fa-file-text',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 13,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/activity/refund',
                        'title'=> '活动退款',
                        'icon'=> 'fa fa-backward',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 2,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/refund/refuse',
                            'title'=> '拒绝退款',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/refund/agree',
                            'title'=> '同意退款',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/refund/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/activity/activity_apply',
                        'title'=> '活动报名',
                        'icon'=> 'fa fa-pencil',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 3,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity_apply/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity_apply/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity_apply/field_data_details',
                            'title'=> '报名信息',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/activity/activity',
                        'title'=> '活动列表',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 4,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/user/wechat/index',
                            'title'=> '选择核销管理员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/verification_qr_code',
                            'title'=> '公众号签到二维码',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity/verification_applet_code',
                            'title'=> '小程序签到二维码',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity_config/config',
                            'title'=> '活动配置',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity_fieldset/fieldset',
                            'title'=> '自定义报名字段',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ],
                        [
                            'type'=> 'file',
                            'name'=> 'wdsxh/activity/activity_electronic_certificate/index',
                            'title'=> '电子证书',
                            'icon'=> 'fa fa-id-card-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 1,
                            'sublist'=> []
                        ]
                    ]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/business',
                    'title'=> '供需管理',
                    'icon'=> 'fa fa-handshake-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 12,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/business/business',
                        'title'=> '供需列表',
                        'icon'=> 'fa fa-align-center',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/business_config',
                            'title'=> '供需配置',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/three_reject',
                            'title'=> '驳回',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/three_adopt',
                            'title'=> '通过',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/business/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/business/category',
                        'title'=> '供需分类',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/business/category/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/pc',
                    'title'=> '官网设置',
                    'icon'=> 'fa fa-internet-explorer',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 11,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/pc_business_association/index',
                        'title'=> '基础信息',
                        'icon'=> 'fa fa-th-list',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/pc_banner',
                        'title'=> '轮播管理',
                        'icon'=> 'fa fa-file-photo-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/pc_banner/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/pc_banner/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/pc_banner/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/pc_banner/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/pc_banner/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/mall',
                    'title'=> '商城管理',
                    'icon'=> 'fa fa-shopping-cart',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 10,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/order',
                        'title'=> '订单管理',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/refund',
                            'title'=> '退款列表',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/refund/refund',
                                'title'=> '已收到商品,同意退款',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/refund/three_reject',
                                'title'=> '驳回申请',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/refund/three_adopt',
                                'title'=> '通过申请',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/refund/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/refund/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/order',
                            'title'=> '订单列表',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/order/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/order/goods_details',
                                'title'=> '订单详情',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/order/confirm_self_pickup',
                                'title'=> '确认自提',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/order/confirm_receipt',
                                'title'=> '确认收货',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/goods',
                        'title'=> '商品管理',
                        'icon'=> 'fa fa-shopping-basket',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/goods_category',
                            'title'=> '分类管理',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/restore',
                                'title'=> '还原',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/destroy',
                                'title'=> '真实删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/recyclebin',
                                'title'=> '回收站',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods_category/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/goods',
                            'title'=> '商品管理',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 0,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/order/delivery',
                                'title'=> '发货',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/restore',
                                'title'=> '还原',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/destroy',
                                'title'=> '真实删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/recyclebin',
                                'title'=> '回收站',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/goods/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/mall/self_pickup/config',
                                'title'=> '自提点配置',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0
                            ]]
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/mall/banner',
                        'title'=> '轮播管理',
                        'icon'=> 'fa fa-file-photo-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/banner/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/mall/freight_rules',
                        'title'=> '运费规则',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/freight_rules/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/mall/express',
                        'title'=> '快递公司',
                        'icon'=> 'fa fa-stack-exchange',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/mall/express/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/jielong',
                    'title'=> '活动接龙',
                    'icon'=> 'fa fa-american-sign-language-interpreting',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 9,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/config',
                        'title'=> '分享图片',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/restore',
                        'title'=> '还原',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/destroy',
                        'title'=> '真实删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/recyclebin',
                        'title'=> '回收站',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/lists',
                        'title'=> '反馈信息',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/copy_relay',
                        'title'=> '复制接龙',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/jielong/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/questionnaire/questionnaire',
                    'title'=> '问卷调查',
                    'icon'=> 'fa fa-pencil-square-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 8,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/render/export',
                        'title'=> '导出问卷',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/config',
                        'title'=> '分享图片',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/render/details',
                        'title'=> '问卷详情',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/render/index',
                        'title'=> '问卷提交',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/multi',
                        'title'=> '问题批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/restore',
                        'title'=> '问题还原',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/destroy',
                        'title'=> '问题真实删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/del',
                        'title'=> '问题删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/recyclebin',
                        'title'=> '问题回收站',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/edit',
                        'title'=> '问题编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/add',
                        'title'=> '问题添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/topic/index',
                        'title'=> '问题查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/restore',
                        'title'=> '还原',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/destroy',
                        'title'=> '真实删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/recyclebin',
                        'title'=> '回收站',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/questionnaire/questionnaire/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/album',
                    'title'=> '相册管理',
                    'icon'=> 'fa fa-file-movie-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 7,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/restore',
                        'title'=> '还原',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/destroy',
                        'title'=> '真实删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/recyclebin',
                        'title'=> '回收站',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/album_config',
                        'title'=> '商会相册配置',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/album/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/member/cert',
                    'title'=> '证书管理',
                    'icon'=> 'fa fa-file',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 6,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/cert/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/cert/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/cert/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/cert/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/cert/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/user',
                    'title'=> '用户管理',
                    'icon'=> 'fa fa-user-circle-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 5,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/member/promotion',
                        'title'=> '会员推广',
                        'icon'=> 'fa fa-user-md',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/promotion/config',
                            'title'=> '推广海报',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/member/promotion/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/user/user',
                        'title'=> '用户列表',
                        'icon'=> 'fa fa-user-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/user/wechat/cancellation',
                            'title'=> '取消管理员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/user/wechat/pass_through',
                            'title'=> '设为管理员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'user',
                            'name'=> 'wdsxh/user/wechat/user',
                            'title'=> '普通用户',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/user/user/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'del',
                            'name'=> 'wdsxh/user/user/del',
                            'title'=> '删除用员',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/link',
                    'title'=> '链接管理',
                    'icon'=> 'fa fa-chain',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 4,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/link/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/link/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/link/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/link/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/link/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/demand',
                    'title'=> '需求反馈',
                    'icon'=> 'fa fa-pencil-square',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 3,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/demand/details',
                        'title'=> '反馈详情',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/demand/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/demand/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                    'type'=> 'file',
                        'name'=> 'wdsxh/demand/processing',
                        'title'=> '处理',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ] ]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/faq',
                    'title'=> '常见问题',
                    'icon'=> 'fa fa-question-circle',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 2,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/faq/multi',
                        'title'=> '批量更新',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/faq/del',
                        'title'=> '删除',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/faq/edit',
                        'title'=> '编辑',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/faq/add',
                        'title'=> '添加',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ], [
                        'type'=> 'file',
                        'name'=> 'wdsxh/faq/index',
                        'title'=> '查看',
                        'icon'=> 'fa fa-circle-o',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 0,
                        'weigh'=> 0,
                        'sublist'=> []
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/corporate',
                    'title'=> '名片管理',
                    'icon'=> 'fa fa-address-card-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 2,
                    'sublist'=> [[
                        'type'=> 'file',
                        'name'=> 'wdsxh/corporate/card_background',
                        'title'=> '名片背景',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 1,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/restore',
                            'title'=> '还原',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/destroy',
                            'title'=> '真实删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/recyclebin',
                            'title'=> '回收站',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card_background/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ],[
                        'type'=> 'file',
                        'name'=> 'wdsxh/corporate/card',
                        'title'=> '名片列表',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 2,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card/details',
                            'title'=> '查看详情',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/corporate/card/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/datascreen/index',
                    'title'=> '数据大屏',
                    'icon'=> 'fa fa-circle-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 1,
                    'menutype'=>'addtabs',
                    'sublist'=> []
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/institution',
                    'title'=> '机构管理',
                    'icon'=> 'fa fa-bank',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 14,
                    'sublist'=> [
                        [
                        'type'=> 'file',
                        'name'=> 'wdsxh/institution/institution',
                        'title'=> '机构列表',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 3,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution/institution_config',
                            'title'=> '机构配置',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ],
                        [
                        'type'=> 'file',
                        'name'=> 'wdsxh/institution/level',
                        'title'=> '机构级别',
                        'icon'=> 'fa fa-align-justify',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 2,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/level/multi',
                            'title'=> '批量更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/level/del',
                            'title'=> '删除',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/level/edit',
                            'title'=> '编辑',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/level/add',
                            'title'=> '添加',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/level/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ],
                        [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/member',
                            'title'=> '机构成员',
                            'icon'=> 'fa fa-align-justify',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 1,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/member/multi',
                                'title'=> '批量更新',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/member/del',
                                'title'=> '删除',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/member/edit',
                                'title'=> '编辑',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/member/add',
                                'title'=> '添加',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/member/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/member/select_member',
                                'title'=> '选择会员',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ]]
                        ],
                        [
                            'type'=> 'file',
                            'name'=> 'wdsxh/institution/institution_member_apply',
                            'title'=> '机构申请',
                            'icon'=> 'fa fa-align-justify',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 1,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/institution_member_apply/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/institution/institution_member_apply/handle',
                                'title'=> '审核',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ]]
                        ]
                    ]
                ],
                    [
                    'type'=> 'file',
                    'name'=> 'wdsxh/points',
                    'title'=> '积分管理',
                    'icon'=> 'fa fa-star-half-o',
                    'condition'=> '',
                    'remark'=> '',
                    'ismenu'=> 1,
                    'weigh'=> 15,
                    'sublist'=> [
                        [
                            'type'=> 'file',
                            'name'=> 'wdsxh/points/ranking',
                            'title'=> '积分排行',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 1,
                            'weigh'=> 3,
                            'sublist'=> [[
                                'type'=> 'file',
                                'name'=> 'wdsxh/points/user_wechat_points_log/index',
                                'title'=> '积分日志',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/points/ranking/index',
                                'title'=> '查看',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ], [
                                'type'=> 'file',
                                'name'=> 'wdsxh/points/ranking/one_click_reset',
                                'title'=> '一键清零',
                                'icon'=> 'fa fa-circle-o',
                                'condition'=> '',
                                'remark'=> '',
                                'ismenu'=> 0,
                                'weigh'=> 0,
                                'sublist'=> []
                            ]]
                        ]

                    ]
                ],
                    [
                        'type'=> 'file',
                        'name'=> 'wdsxh/upgrade',
                        'title'=> '检查更新',
                        'icon'=> 'fa fa-cog',
                        'condition'=> '',
                        'remark'=> '',
                        'ismenu'=> 1,
                        'weigh'=> 0,
                        'sublist'=> [[
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/index',
                            'title'=> '查看',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/down_mini_zip',
                            'title'=> '下载小程序代码',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/check',
                            'title'=> '检查',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/update',
                            'title'=> '更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/code_edit',
                            'title'=> '编辑校验码',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/upgrade',
                            'title'=> '更新',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/download',
                            'title'=> '下载',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/getClient',
                            'title'=> '查看客户端',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/getAddonDir',
                            'title'=> '获取目录',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ], [
                            'type'=> 'file',
                            'name'=> 'wdsxh/upgrade/getCheckDirs',
                            'title'=> '检查目录',
                            'icon'=> 'fa fa-circle-o',
                            'condition'=> '',
                            'remark'=> '',
                            'ismenu'=> 0,
                            'weigh'=> 0,
                            'sublist'=> []
                        ]]
                    ]
                ]
            ]];


