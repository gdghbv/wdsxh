<?php

return [
    'autoload' => false,
    'hooks' => [
        'app_init' => [
            'qrcode',
            'wdsxh',
        ],
        'config_init' => [
            'summernote',
        ],
        'upgrade' => [
            'wdsxh',
        ],
    ],
    'route' => [
        '/qrcode$' => 'qrcode/index/index',
        '/qrcode/build$' => 'qrcode/index/build',
        '/wdsxh/$' => 'wdsxh/index/index',
        '/wdsxh/about/$' => 'wdsxh/index/about',
        '/wdsxh/contact/$' => 'wdsxh/index/contact',
        '/wdsxh/membership/$' => 'wdsxh/index/membership',
        '/wdsxh/news/$' => 'wdsxh/index/news',
        '/wdsxh/news/news_detail/$' => 'wdsxh/index/news_detail',
        '/wdsxh/header/$' => 'wdsxh/index/header',
        '/wdsxh/footer/$' => 'wdsxh/index/footer',
    ],
    'priority' => [],
    'domain' => '',
];
