<?php

namespace app\admin\model\wdsxh;

use app\admin\model\wdsxh\article\ArticleCat;

use think\Model;
use traits\model\SoftDelete;
use think\Db;

class DiyPage extends Model
{

    use SoftDelete;



    // 表名
    protected $name = 'wdsxh_diy_page';

    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'integer';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = 'deletetime';

    // 追加属性
    protected $append = [
        'status_text'
    ];



    public function getStatusList()
    {
        return ['home' => __('Status home'), 'custom' => __('Status custom')];
    }


    public function getStatusTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['status']) ? $data['status'] : '');
        $list = $this->getStatusList();
        return isset($list[$value]) ? $list[$value] : '';
    }

    /**
     * 页面默认样式数据
     */
    public function getDefaultStyle($url)
    {
        return [
            // 轮播图
            'carouselDiy' => [
                'name' => '轮播图',
                'type' => 'carouselDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'dotColor' => '#409EFF',
                    'height' => 180,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'borderRadius' => 0,
                ],
                'params' => [
                    'type' => 'normal',
                    'interval' => 3000,
                ],
                'data' => [
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/banner.png',
                        'link' => null
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/banner.png',
                        'link' => null
                    ]
                ]
            ],
            // 单图组
            'imagesDiy' => [
                'name' => '单图组',
                'type' => 'imagesDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'borderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 0,
                ],
                'data' => [
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/image.png',
                        'link' => null
                    ]
                ]
            ],
            // 导航组
            'navDiy' => [
                'name' => '导航组',
                'type' => 'navDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'rowsLimit' => -1,
                    'dotColor' => '#409EFF',
                    'rowsNum' => 4,
                    'iconSize' => 44,
                    'borderRadius' => 0,
                    'fontSize' => 14,
                    'textColor' => '#666666',
                    'paddingTop' => 16,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
                'data' => [
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                        'link' => null,
                        'text' => '导航标题',
                    ]
                ]
            ],
            // 图片魔方
            'cubeDiy' => [
                'name' => '图片魔方',
                'type' => 'cubeDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'layout' => 2,
                    'model' => 1,
                    'imgWidth' => 60,
                    'imgFloat' => "left",
                    'borderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 0,
                ],
                'data' => [
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/cube.png',
                        'link' => null
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/cube.png',
                        'link' => null
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/cube.png',
                        'link' => null
                    ],
                    [
                        'imgUrl' => '/assets/addons/wdsxh/img/cube.png',
                        'link' => null
                    ]
                ],
            ],
            // 信息卡片
            'infoCardDiy' => [
                'name' => '信息卡片',
                'type' => 'infoCardDiy',
                'params' => [
                    'title' => '此处是信息卡片标题',
                    'image' => '/assets/addons/wdsxh/img/menu.png',
                    'content' => '此处是信息卡片内容',
                    'btnTxt' => '查看详情',
                    'link' => null
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'borderRadius' => 0,
                    'btnBorderRadius' => 0,
                    'btnBackground' => '#409EFF',
                    'btnColor' => '#FFFFFF',
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 按钮组
            'textButtonDiy' => [
                'name' => '按钮组',
                'type' => 'textButtonDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'fontSize' => 14,
                    'textColor' => '#666666',
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ],
                'data' => [
                    [
                        'link' => null,
                        'text' => '按钮文字1',
                    ],
                    [
                        'link' => null,
                        'text' => '按钮文字2',
                    ],
                    [
                        'link' => null,
                        'text' => '按钮文字3',
                    ]
                ]
            ],
            // 标题
            'titleDiy' => [
                'name' => '标题',
                'type' => 'titleDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'color' => "#000000",
                    'fontSize' => 14,
                    'fontStyle' => "normal",
                    'btnSize' => 12,
                    'iconSize' => 16,
                    'btnColor' => "#888888",
                    'paddingTop' => 10,
                    'paddingLeft' => 0,
                ],
                'params' => [
                    'title' => "标题文字",
                    'btnType' => "text",
                    'btnText' => "查看更多",
                    'link' => null,
                ]
            ],
            // 视频
            'videoDiy' => [
                'name' => '视频',
                'type' => 'videoDiy',
                'params' => [
                    'videoUrl' => 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app-video-courses.mp4',
                    'poster' => 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/dcloudPoster.jpg',
                    'autoplay' => '2'
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 地图
            'mapDiy' => [
                'name' => '地图',
                'type' => 'mapDiy',
                'params' => [
                    'latitude' => 36.04,
                    'longitude' => 120.2,
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'height' => 160,
                    'borderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 新闻资讯
            'articleDiy' => [
                'name' => '新闻资讯',
                'type' => 'articleDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "新闻资讯",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'showImg' => true,
                    'category' => '',
                    'categoryName' => '',
                    'count' => 3,
                    'showReadNum' => true,
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'imgWidth' => 110,
                    'imgHeight' => 96,
                    'imgFloat' => 'left',
                    'borderRadius' => 5,
                    'nameSize' => 14,
                    'nameWeight' => 'normal',
                    'dateSize' => 12,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ]
            ],
            // 商会介绍
            'introduceDiy' => [
                'name' => '商会介绍',
                'type' => 'introduceDiy',
                'params' => [
                    'showImg' => true,
                    'imgUrl' => '/assets/addons/wdsxh/img/menu.png',
                    'name' => '沃德商协会',
                    'btnName' => '商会介绍',
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'borderRadius' => 0,
                    'iconSize' => 40,
                    'btnBorderRadius' => 8,
                    'btnSize' => 14,
                    'btnColor1' => '#325DFF',
                    'btnColor2' => '#489FFF',
                    'nameSize' => 16,
                    'nameWeight' => 'normal',
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 会员列表
            'memberDiy' => [
                'name' => '会员列表',
                'type' => 'memberDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "会员列表",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'count' => 5
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'isAutoRoll'=> false,
                    'rollDelay'=> 2000,
                    'rollSpeed'=> 1000,
                    'iconSize' => 64,
                    'iconRadius' => 50,
                    'pSize' => 12,
                    'pRadiusType' => 'half',
                    'pRadius' => 12,
                    'pColor' => '#fff',
                    'pBackground' => '#325DFF',
                    'nameSize' => 14,
                    'nameColor' => "#333333",
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
            ],
            // 商会活动
            'activityDiy' => [
                'name' => '商会活动',
                'type' => 'activityDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "商会活动",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'showImg' => true,
                    'count' => 3
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'imgWidth' => 110,
                    'imgHeight' => 80,
                    'borderRadius' => 8,
                    'nameSize' => 14,
                    'nameWeight' => 'normal',
                    'showIcon' => true,
                    'iconSize' =>  16,
                    'iconColor' => '#325DFF',
                    'contentSize' => 12,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
            ],
            // 活动接龙
            'chainsDiy' => [
                'name' => '活动接龙',
                'type' => 'chainsDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "活动接龙",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'count' => 2
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'nameSize' => 14,
                    'nameWeight' => 'normal',
                    'contentSize' => 12,
                    'showIcon' => true,
                    'iconSize' => 16,
                    'iconColor' => '#325DFF',
                    'btnSize' => 14,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
            ],
            // 活动相册
            'albumDiy' => [
                'name' => '活动相册',
                'type' => 'albumDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "活动相册",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'count' => 2
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'timeSize' =>16,
                    'iconColor' => '#325DFF',
                    'nameSize' => 14,
                    'nameWeight' => 'normal',
                    'borderRadius' => 8,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
            ],
            // 商城商品
            'goodsDiy' => [
                'name' => '商城商品',
                'type' => 'goodsDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "商城商品",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'count' => 4
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'imgHeight' => 148,
                    'borderRadius' => 10,
                    'nameSize' => 14,
                    'nameWeight' => 'normal',
                    'priceSize' => 14,
                    'priceColor' => '#325DFF',
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
            ],
            // 会员供需
            'demandDiy' => [
                'name' => '会员供需',
                'type' => 'demandDiy',
                'params' => [
                    'showTitle' => true,
                    'titleText' => "会员供需",
                    'titleBtnType' => "text",
                    'titleBtnText' => "more+",
                    'showContact' => true,
                    'category' => '',
                    'categoryName' => '',
                    'count' => 2,
                ],
                'style' => [
                    'titleColor' => "#000000",
                    'titleFontSize' => 16,
                    'titleFontStyle' => "normal",
                    'titleBtnSize' => 12,
                    'titleBtnColor' => "#888888",
                    'titleIconSize' => 16,
                    'titleSpace' => 16,
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'btnColor' => '#325DFF',
                    'btnTextColor' => '#ffffff',
                    'nameSize' => 16,
                    'nameWeight' => 'bold',
                    'contentSize' => 14,
                    'addressColor' => '#325DFF',
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                    'itemSpace' => 16,
                ],
            ],
            // 会员地图
            'memberMapDiy' => [
                'name' => '会员地图',
                'type' => 'memberMapDiy',
                'map' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'heightType' => 1,
                    'height' => 200,
                    'borderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ],
                'category' => [
                    'type' => 1,
                    'background' => '#FFFFFF',
                    'styleMode' => 1,
                    'position' => 'left',
                    'borderRadius' => 8,
                    'widthType' => 1,
                    'widthNumber' => 32,
                    'marginTop' => 16,
                    'marginLeft' => 16,
                    'expandColor' => '#325DFF',
                    'paddingTop' => 8,
                    'paddingLeft' => 8,
                    'itemSpace' => 8,
                    'btnBackground' => '#F6F7FB',
                    'btnActiveBackground' => '#325DFF',
                    'btnColor' => '#5A5B6E',
                    'btnActiveColor' => '#FFFFFF',
                    'btnBorderRadius' => 8,
                    'btnPaddingTop' => 8,
                    'btnPaddingLeft' => 16,
                ],
            ],
            // 搜索
            'searchDiy' => [
                'name' => '搜索',
                'type' => 'searchDiy',
                'params' => [
                    'placeholder' => '请输入关键词搜索',
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'iconColor' => '#BBBBBB',
                    'iconSize' => 20,
                    'placeholderColor' => '#BBBBBB',
                    'inputColor' => '#5A5B6E',
                    'fontSize' => 14,
                    'inputBackground' => '#FFFFFF',
                    'inputBorderRadius' => 5,
                    'inputPaddingTop' => 10,
                    'inputPaddingLeft' => 16,
                    'paddingTop' => 8,
                    'paddingLeft' => 16,
                ]
            ],
            // 辅助线条
            'lineDiy' => [
                'name' => '辅助线条',
                'type' => 'lineDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'lineStyle' => 'solid',
                    'lineHeight' => '1',
                    'lineColor' => "#000000",
                    'paddingTop' => 10,
                    'paddingLeft' => 0,
                ]
            ],
            // 辅助空白
            'blankDiy' => [
                'name' => '辅助空白',
                'type' => 'blankDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'height' => 12,
                ]
            ],
            // 消息通知
            'noticeDiy' => [
                'name' => '消息通知',
                'type' => 'noticeDiy',
                'params' => [
                    'text' => '这里是第一条来自后台自定义消息通知的信息',
                    'icon' => '/assets/addons/wdsxh/img/notice.png',
                    'showImg' => true,
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'textColor' => '#000000',
                    'fontSize' => 14,
                    'iconSize' => 16,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 文本组
            'textDiy' => [
                'name' => '文本组',
                'type' => 'textDiy',
                'style' => [
                    'text' => '这里是文本的内容',
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'textColor' => '#000000',
                    'fontSize' => 14,
                    'fontStyle' => 'normal',
                    'textAlign' => 'left',
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 富文本
            'richTextDiy' => [
                'name' => '富文本',
                'type' => 'richTextDiy',
                'params' => [
                    'content' => '<span>这里是富文本的内容</span>',
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ]
            ],
            // 警告提示
            'warnDiy' => [
                'name' => '警告提示',
                'type' => 'warnDiy',
                'params' => [
                    'type' => 'success',
                    'title' => '提示标题',
                    'description' => '提示内容1，提示内容2，提示内容3，提示内容4，提示内容5',
                    'closable' => true,
                    'showIcon' => true,
                    'effect' => "light",
                ],
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ],
            ],
            // 时间线
            'timelineDiy' => [
                'name' => '时间线',
                'type' => 'timelineDiy',
                'style' => [
                    'background' => '',
                    'itemBorderRadius' => 0,
                    'paddingTop' => 0,
                    'paddingLeft' => 0,
                ],
                'data' => [
                    [
                        'time' => date('Y-m-d'),
                        'color' => '#0FAFFF',
                        'hide' => true,
                        'content' => '时间节点1',
                    ],
                    [
                        'time' => date('Y-m-d'),
                        'color' => '#0FAFFF',
                        'hide' => true,
                        'content' => '时间节点2',
                    ],
                    [
                        'time' => date('Y-m-d'),
                        'color' => '#0FAFFF',
                        'hide' => true,
                        'content' => '时间节点3',
                    ],
                ],
            ],
            // 悬浮按钮
            'floatDiy' => [
                'name' => '悬浮按钮',
                'type' => 'floatDiy',
                'params' => [
                    'image' => '/assets/addons/wdsxh/img/service.png',
                    'link' => null
                ],
                'style' => [
                    'btnSize' => 40,
                    'right' => 2,
                    'bottom' => 10,
                    'opacity' => 100
                ]
            ],
        ];
    }

    /**
     * 页面默认数据
     */
    public function getDefaultPageData()
    {
        static $defaultPage = [];
        if (!empty($defaultPage))
            return $defaultPage;
        return [
            'type' => -1,
            'name' => '页面设置',
            'params' => [
                'name' => '模板名称',
                'title' => '首页',
            ],
            'style' => [
                'titleTextColor' => 'black',
                'titleBackgroundColor' => '#fff',
                'backgroundColor' => '#F6F7FB',
                'backgroundImage' => '',
                'paddingTop' => 0,
                'paddingLeft' => 0,
            ]
        ];
    }

    /**
     * 获取内置链接列表
     */
    public function getLinkUrl()
    {
        return [
            'Custom' => ['type' => 'Custom', 'name' => '内部页面', 'list' => $this->getCustomList()],
            'Inlay' => ['type' => 'Inlay', 'name' => '自定义页面', 'list' => $this->getInlayList()],
            'Editor' => ['type' => 'Editor', 'name' => '图文'],
            'WXMp' => ['type' => 'WXMp', 'name' => '微信小程序'],
            'Outside' => ['type' => 'Outside', 'name' => '外部链接'],
            'Phone' => ['type' => 'Phone', 'name' => '拨打电话'],
            'Service' => ['type' => 'Service', 'name' => '小程序客服'],
            'Member' => ['type' => 'Member', 'name' => '会员列表', 'list' => $this->getMemberList()],
            'Article' => ['type' => 'Article', 'name' => '文章列表', 'list' => $this->getArticleList()],
            'Activity' => ['type' => 'Activity', 'name' => '活动列表', 'list' => $this->getActivityList()],
            'Goods' => ['type' => 'Goods', 'name' => '商品列表', 'list' => $this->getGoodsList()],
        ];
    }

    /**
     * 获取自定义页面列表
     */
    public function getInlayList()
    {
        return $this->where('status', 'custom')->order(['id' => 'desc'])->select();
    }

    /**
     * 获取内部页面列表
     */
    public function getCustomList()
    {
        $data = Db::name('wdsxh_link')
            ->where('status', '1')
            ->field('name title,url path')
            ->order('weigh desc')
            ->select();
        return $data;
    }

    /**
     * 获取文章分类
     */
    public function getArticleCategory()
    {
        $data = (new ArticleCat())->field('id,name')
            ->order('weigh desc,id desc')
            ->select();
        return $data;
    }

    /**
     * 获取供需分类
     */
    public function getDemandCategory()
    {
        $data = (new \app\admin\model\wdsxh\business\Category())->field('id,name')
            ->order('weigh desc,id desc')
            ->select();
        return $data;
    }

    /**
     * 选择会员列表
     */
    public function getMemberList()
    {
        $list = (new \app\admin\model\wdsxh\member\Member)->field('id,name,mobile,member_level_name,type')
            ->order('id desc')
            ->select();
        return $list;
    }

     /**
     * 选择文章列表
     */
    public function getArticleList()
    {
        $list = (new \app\admin\model\wdsxh\article\Article)->field('id,title,type,link')
            ->order('id desc')
            ->select();
        return $list;
    }

     /**
     * 选择活动列表
     */
    public function getActivityList()
    {
        $list = (new \app\admin\model\wdsxh\activity\Activity)->field('id,name')
            ->order('id desc')
            ->select();
        return $list;
    }

     /**
     * 选择商品列表
     */
    public function getGoodsList()
    {
        $list = (new \app\admin\model\wdsxh\mall\Goods)->field('id,name,price')
            ->order('id desc')
            ->select();
        return $list;
    }
}
