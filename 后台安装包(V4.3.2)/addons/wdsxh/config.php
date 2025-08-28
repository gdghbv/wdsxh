<?php

return [
    [
        'name' => 'theme',
        'title' => '前台模板',
        'type' => 'string',
        'content' => [],
        'value' => 'default',
        'rule' => '',
        'msg' => '',
        'tip' => '请确保addons/wdsxh/view有相应的目录',
        'ok' => '',
        'extend' => '',
    ],
    [
        'name' => 'rewrite',
        'title' => '伪静态',
        'type' => 'array',
        'content' => [],
        'value' => [
            'index/index' => '/wdsxh/$',
            'index/about' => '/wdsxh/about/$',
            'index/contact' => '/wdsxh/contact/$',
            'index/membership' => '/wdsxh/membership/$',
            'index/news' => '/wdsxh/news/$',
            'index/news_detail' => '/wdsxh/news/news_detail/$',
            'index/header' => '/wdsxh/header/$',
            'index/footer' => '/wdsxh/footer/$',
        ],
        'rule' => 'required',
        'msg' => '',
        'tip' => '',
        'ok' => '',
        'extend' => '',
    ],
];
