<?php

namespace addons\wdsxh;

use app\admin\model\AuthRule;
use app\common\library\Menu;
use think\Addons;
use think\exception\PDOException;
use think\Exception;

/**
 * 插件
 */
class Wdsxh extends Addons
{

    /**
     * 应用初始化
     */
    public function appInit()
    {
        // 公共方法
        require_once __DIR__ . '/helper.php';

        if(!class_exists("\Darabonba\OpenApi\Models\Config")){
            \think\Loader::addNamespace('Darabonba\OpenApi\Models', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'alibabacloud' . DS. 'openapi-core' . DS. 'src' . DS. 'Models' . DS);
        }

        if(!class_exists("\AlibabaCloud\Dara\Model")){
            \think\Loader::addNamespace('AlibabaCloud\Dara', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'alibabacloud' . DS. 'darabonba' . DS. 'src' . DS);
        }

        if(!class_exists("\AlibabaCloud\SDK\Dysmsapi\V20170525\Dysmsapi")){
            \think\Loader::addNamespace('AlibabaCloud\SDK\Dysmsapi\V20170525', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'alibabacloud' . DS. 'dysmsapi-20170525' . DS. 'src' . DS);
        }

        if(!class_exists("\Darabonba\OpenApi\OpenApiClient")){
            \think\Loader::addNamespace('Darabonba\OpenApi', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'alibabacloud' . DS. 'openapi-core' . DS. 'src' . DS);
        }

        if(!class_exists("\AlibabaCloud\Credentials\Credential")){
            \think\Loader::addNamespace('AlibabaCloud\Credentials', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'alibabacloud' . DS. 'credentials' . DS. 'src' . DS);
        }

        if(!class_exists("\AlibabaCloud\Tea\Model")){
            \think\Loader::addNamespace('AlibabaCloud\Tea', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'alibabacloud' . DS. 'tea' . DS. 'src' . DS);
        }

        if(!class_exists("\Adbar\Dot")){
            \think\Loader::addNamespace('Adbar', ADDON_PATH . 'wdsxh' . DS . 'library' . DS . 'adbario' . DS. 'php-dot-notation' . DS. 'src' . DS);
        }
    }

    /**
     * 插件安装方法
     * @return bool
     */
    public function install()
    {
        $menu = self::getMenu();
        Menu::create($menu['new']);
        return true;
    }

    /**
     * 插件卸载方法
     * @return bool
     */
    public function uninstall()
    {
        Menu::delete('wdsxh');
        return true;
    }

    /**
     * 插件启用方法
     * @return bool
     */
    public function enable()
    {
        Menu::enable('wdsxh');
        return true;
    }

    /**
     * 插件禁用方法
     * @return bool
     */
    public function disable()
    {
        Menu::disable('wdsxh');
        return true;
    }

    /**
     * 插件升级方法
     * @return bool
     */
    public function upgrade()
    {
        $menu = self::getMenu();
        if(method_exists(Menu::class, 'upgrade')){
            Menu::upgrade('wdsxh', $menu['new']);
        }else {
            //使用Groupon自带的更新操作
            self::menuWdsxhUpdate($menu['new'], $menu['old']);
        }
        return true;
    }

    private static function getMenu()
    {
        $newMenu = [];
        $config_file = ADDON_PATH . "wdsxh" . DS . 'config' . DS . "menu.php";
        if (is_file($config_file)) {$newMenu = include $config_file;}
        $oldMenu = AuthRule::where('name','like',"wdsxh%")->select();
        $oldMenu = array_column($oldMenu, null, 'name');
        return ['new' => $newMenu, 'old' => $oldMenu];
    }

    private static function menuWdsxhUpdate($newMenu, $oldMenu, $parent = 0)
    {
        if (!is_numeric($parent)) {
            $parentRule = AuthRule::getByName($parent);
            $pid = $parentRule ? $parentRule['id'] : 0;
        } else {
            $pid = $parent;
        }
        $allow = array_flip(['file', 'name', 'title', 'icon', 'condition', 'remark', 'ismenu', 'weigh']);
        foreach ($newMenu as $k => $v) {
            $hasChild = isset($v['sublist']) && $v['sublist'] ? true : false;
            $data = array_intersect_key($v, $allow);
            $data['ismenu'] = isset($data['ismenu']) ? $data['ismenu'] : ($hasChild ? 1 : 0);
            $data['icon'] = isset($data['icon']) ? $data['icon'] : ($hasChild ? 'fa fa-list' : 'fa fa-circle-o');
            $data['pid'] = $pid;
            $data['status'] = 'normal';
            try {
                if (!isset($oldMenu[$data['name']])) {
                    $menu = AuthRule::create($data);
                }else{
                    $menu = $oldMenu[$data['name']];
                }
                if ($hasChild) {
                    self::menuWdsxhUpdate($v['sublist'], $oldMenu, $menu['id']);
                }
            } catch (PDOException $e) {
                new Exception($e->getMessage());
            }
        }
    }


}
