<?php

namespace app\admin\model\wdsxh;

use app\admin\model\wdsxh\article\ArticleCat;
use think\Model;
use traits\model\SoftDelete;
use think\Db;

class PersonCenterDiyPage extends Model
{

    use SoftDelete;



    // 表名
    protected $name = 'wdsxh_person_center_diy_page';

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
     * 页面默认数据
     */
    public function getDefaultPageData()
    {
        static $defaultPage = [];
        if (!empty($defaultPage)) return $defaultPage;
        return [
            'pageTitle' => '个人中心',
            'pageLayout' => 1,
            'pageStyle' => [
                [
                    'layout' => 1,
                    'titleTextColor' => 'black',
                    'backgroundColor' => '#F6F7FB',
                    'backgroundImage' => '/assets/addons/wdsxh/img/mine/bg1.png',
                    'hideMember' => false,
                    'hideApply' => false,
                ],
                [
                    'layout' => 2,
                    'titleTextColor' => 'white',
                    'backgroundColor' => '#F6F7FB',
                    'backgroundImage' => '/assets/addons/wdsxh/img/mine/bg2.png',
                    'hideMember' => false,
                    'hideApply' => false,
                ],
                [
                    'layout' => 3,
                    'titleTextColor' => 'white',
                    'backgroundColor' => '#F6F7FB',
                    'backgroundImage' => '/assets/addons/wdsxh/img/mine/bg3.png',
                    'hideMember' => false,
                    'hideApply' => false,
                ]
            ],
            'items' => [
                [
                    'name' => '商城订单',
                    'type' => 'mallOrderDiy',
                    'show' => true,
                    'style' => [
                        'iconSize' => 32,
                        'fontSize' => 12,
                        'textColor' => '#5A5B6E',
                        'graphicSpace' => 8,
                    ],
                    'data' => [
                        [
                            'type' => 1,
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/order_1.png',
                            'text' => '待付款',
                        ],
                        [
                            'type' => 2,
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/order_2.png',
                            'text' => '待发货',
                        ],
                        [
                            'type' => 3,
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/order_3.png',
                            'text' => '待收货',
                        ],
                        [
                            'type' => 4,
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/order_4.png',
                            'text' => '退款',
                        ]
                    ]
                ],
                [
                    'name' => '我的名片',
                    'type' => 'cardDiy',
                    'show' => true,
                ],
                [
                    'name' => '会员中心',
                    'type' => 'navDiy',
                    'show' => true,
                    'style' => [
                        'layout' => 1,
                        'rowsNum' => 4,
                        'iconSize' => 40,
                        'fontSize' => 14,
                        'textColor' => '#5A5B6E',
                        'graphicSpace' => 8,
                        'itemSpace' => 16,
                    ],
                    'data' => [
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/member_1.png',
                            'text' => '编辑资料',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pages/member/information',
                                'title' => '编辑资料'
                            ],
                        ],
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/member_2.png',
                            'text' => '推广会员',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pagesTools/publicize/index',
                                'title' => '推广会员'
                            ],
                        ],
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/member_3.png',
                            'text' => '我的发布',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pagesDemand/demand/list',
                                'title' => '我的发布'
                            ],
                        ],
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/member_4.png',
                            'text' => '我的活动',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pagesActivity/order/index',
                                'title' => '我的活动'
                            ],
                        ],
                    ]
                ],
                [
                    'name' => '管理员中心',
                    'type' => 'adminDiy',
                    'show' => true,
                    'style' => [
                        'layout' => 1,
                        'rowsNum' => 4,
                        'iconSize' => 40,
                        'fontSize' => 14,
                        'textColor' => '#5A5B6E',
                        'graphicSpace' => 8,
                        'itemSpace' => 16,
                    ],
                    'data' => [
                        [
                            'type' => 'subscribeMessage',
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/admin_1.png',
                            'text' => '消息订阅',
                        ],
                        [
                            'type' => 'verificationActivity',
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/admin_2.png',
                            'text' => '核销活动',
                        ],
                        [
                            'type' => 'examineMember',
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/admin_3.png',
                            'text' => '审核会员',
                        ],
                    ]
                ],
                [
                    'name' => '系统中心',
                    'type' => 'navDiy',
                    'show' => true,
                    'style' => [
                        'layout' => 1,
                        'rowsNum' => 4,
                        'iconSize' => 40,
                        'fontSize' => 14,
                        'textColor' => '#5A5B6E',
                        'graphicSpace' => 8,
                        'itemSpace' => 16,
                    ],
                    'data' => [
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/system_1.png',
                            'text' => '地址管理',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pagesMall/address/index',
                                'title' => '地址管理'
                            ],
                        ],
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/system_2.png',
                            'text' => '平台客服',
                            'link' => [
                                'type' => 'Service',
                                'title' => '小程序客服'
                            ],
                        ],
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/system_3.png',
                            'text' => '常见问题',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pages/mine/problem/index',
                                'title' => '常见问题'
                            ],
                        ],
                        [
                            'imgUrl' => '/assets/addons/wdsxh/img/mine/system_4.png',
                            'text' => '系统设置',
                            'link' => [
                                'type' => 'Custom',
                                'path' => '/pages/mine/settings/system',
                                'title' => '系统设置'
                            ],
                        ],
                    ]
                ],
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
            'Editor' => ['type' => 'Editor', 'name' => '图文'],
            'WXMp' => ['type' => 'WXMp', 'name' => '微信小程序'],
            'Outside' => ['type' => 'Outside', 'name' => '外部链接'],
            'Phone' => ['type' => 'Phone', 'name' => '拨打电话'],
            'Service' => ['type' => 'Service', 'name' => '小程序客服'],
        ];
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
}
