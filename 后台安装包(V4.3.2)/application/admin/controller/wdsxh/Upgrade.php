<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力商协会发展
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  All rights reserved.
// +----------------------------------------------------------------------
// | 沃德商协会系统并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.maiwd.cn
// +----------------------------------------------------------------------

namespace app\admin\controller\wdsxh;
use Exception;
use app\common\controller\Backend;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\TransferException;
use think\addons\AddonException;
use think\addons\Service;
use think\Cache;

/**
 * 检查更新
 *
 * @icon fa fa-circle-o
 */
class Upgrade extends Backend
{
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
    }

    public function index(){
        $name = 'wdsxh';
        $info = get_addon_info($name);
        $client = self::getClient();
        $domain = $client->get('/api/product/version/code', ['query' => array_merge(['domain' => $_SERVER['HTTP_HOST']])]);
        $body_domain = $domain->getBody();
        $content_domain = $body_domain->getContents();
        $content_domain = trim($content_domain, '"');
        $product_info = array(
            'product_name'=>'商协会系统',
            'version'=>$info['version'],
            'developers'=>'青岛麦沃德网络科技有限公司',
            'auth'=>'是',
            'code' => $content_domain,
        );
        $this->assign('product_info',$product_info);
        $this->assignconfig('old_version',$info['version']);
        $this->assignconfig('name',$info['name']);
//        $this->view->engine->layout(false);

        $domain = $client->get('/api/product/version/update_log', ['query' => array_merge(['name' => $name,'version'=>$info['version']])]);
        $body_domain = $domain->getBody();
        $content = $body_domain->getContents();
        $content = json_decode($content,true);

//        p(ROOT_PATH.'addons'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'uniapp'.DIRECTORY_SEPARATOR.'商协会');
        $domain = $this->request->domain();

        foreach ($content['data'] as &$v) {
            if (is_file(ROOT_PATH.'addons'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'uniapp'.DIRECTORY_SEPARATOR.'uniapp-wdsxh'.$v['version'].'.zip')) {
                $zip_url = ROOT_PATH.'addons'.DIRECTORY_SEPARATOR.'wdsxh'.DIRECTORY_SEPARATOR.'uniapp'.DIRECTORY_SEPARATOR.'uniapp-wdsxh'.$v['version'].'.zip';
            } else {
                $zip_url = '';
            }
            $v['zip_url'] = $zip_url;
        }
        $version_list = $content['data'];
        $this->assign('version_list',$version_list);

        return $this->fetch('index');
    }

    public function down_mini_zip()
    {
        $version = $this->request->get('version');

        // 文件路径
        $file_path = ROOT_PATH.'addons'.DIRECTORY_SEPARATOR .'wdsxh'.DIRECTORY_SEPARATOR .'uniapp'.DIRECTORY_SEPARATOR.'uniapp-wdsxh'.$version.'.zip';


// 检查文件是否存在
        if (!file_exists($file_path)) {
            die('文件不存在');
        }

// 设置 HTTP 头
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path));

// 输出文件
        readfile($file_path);
        exit;
    }

    /**
     * Desc  检查最新版本
     * Create on 2024/7/4 8:54
     * Create by zhangwei
     */
    public function check()
    {
        $old_version = $this->request->post('old_version');
        $name = $this->request->post('name');
        $extend = [
            'oldversion' => $old_version,
            'domain'=>$this->request->domain()
        ];
        $client = self::getClient();
        $response = $client->get('/api/product/version/check', ['query' => array_merge(['name' => $name , 'authorized_version'=>'2','domain' => $_SERVER['HTTP_HOST']], $extend)]);
        $body = $response->getBody();
        $content = $body->getContents();
        $json = (array)json_decode($content, true);

        return $json;
    }

    /**
     * Desc  更新最新版本
     * Create on 2024/7/4 11:17
     * Create by zhangwei
     */
    public function update()
    {
        $old_version = $this->request->post("old_version");
        $name = $this->request->post("name");
        $addonTmpDir = RUNTIME_PATH . 'addons' . DS;
        $domain = $_SERVER['HTTP_HOST'];
        if (!$name) {
            $this->error(__('Parameter %s can not be empty', 'name'));
        }
        if (!preg_match("/^[a-zA-Z0-9]+$/", $name)) {
            $this->error(__('Addon name incorrect'));
        }
        if (!is_dir($addonTmpDir)) {
            @mkdir($addonTmpDir, 0755, true);
        }

        $info = [];
        try {
            $info = get_addon_info($name);
            $uid = $this->request->post("uid");
            $token = $this->request->post("token");
            $version = $this->request->post("version");
            $faversion = $this->request->post("faversion");
            $extend = [
                'uid'        => $uid,
                'token'      => $token,
                'version'    => $version,
//                'oldversion' => $info['version'] ?? '',
                'oldversion' => $old_version,
                'faversion'  => $faversion,
                'domain'=>$this->request->domain()
            ];
            //调用更新的方法
            $info = self::upgrade($name, $extend);
            Cache::rm('__menu__');
        } catch (AddonException $e) {
            $this->result($e->getData(), $e->getCode(), __($e->getMessage()));
        } catch (\think\Exception $e) {
            $this->error(__($e->getMessage()));
        }


        $this->success(__('Operate successful'), '', ['addon' => $info]);
    }

    public function code_edit()
    {
        $param = $this->request->param();
        $client = self::getClient();
        $domain = $client->post('/api/product/version/code_edit', ['query' => array_merge(['code' => $param['code'],'domain' => $_SERVER['HTTP_HOST'],'name' => $param['name']])]);
        $body_domain = $domain->getBody();
        $content_domain = $body_domain->getContents();
        $json = (array)json_decode($content_domain, true);
        return $json;
    }

    /**
     * 升级插件
     *
     * @param string $name   插件名称
     * @param array  $extend 扩展参数
     */
    public static function upgrade($name, $extend = [], $tmpFile = false)
    {
        $info = get_addon_info($name);
        $config = get_addon_config($name);
        if ($config) {
            //备份配置
        }
        // 远程下载插件(如果为本地文件则使用本地文件)
//        $tmpFile = $tmpFile ? $tmpFile : self::download($name, $extend);
        $downloadResult = $tmpFile ? $tmpFile : self::download($name, $extend);
        $tmpFile = $downloadResult['tmpFile'];
        $new_version = $downloadResult['new_version'];
        $version_list = $downloadResult['version_list'];

        // 备份插件文件
        Service::backup($name);

        $addonDir = self::getAddonDir($name);

        // 删除插件目录下的application和public
        $files = self::getCheckDirs();
        foreach ($files as $index => $file) {
            @rmdirs($addonDir . $file);
        }
        try {
            // 解压插件
            Service::unzip($name, $tmpFile);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        } finally {
            // 移除临时文件
            @unlink($tmpFile);
        }

        if ($config) {
            $configFile = ADDON_PATH . $name . DS . 'config.php';

            $bakFile = ADDON_PATH . $name . DS . 'config_tmp.php';
            @copy($configFile, $bakFile);
            $fullConfig = include($bakFile);
            @unlink($bakFile);
            foreach ($fullConfig as $index => &$item) {
                if (isset($config[$item['name']])) {
                    $item['value'] = $config[$item['name']];
                }
            }
            // 更新配置
            set_addon_fullconfig($name, $fullConfig);
        }

        // 导入
        Service::importsql($name);

        // 执行升级脚本
        try {
            $addonName = ucfirst($name);
            //创建临时类用于调用升级的方法
            $sourceFile = $addonDir . $addonName . ".php";
            $destFile = $addonDir . $addonName . "Upgrade.php";

            $classContent = str_replace("class {$addonName} extends", "class {$addonName}Upgrade extends", file_get_contents($sourceFile));

            //创建临时的类文件
            file_put_contents($destFile, $classContent);

            $className = "\\addons\\" . $name . "\\" . $addonName . "Upgrade";
            $addon = new $className($name);

            //调用升级的方法
            if (method_exists($addon, "upgrade")) {
                $addon->upgrade();
            }

            //移除临时文件
            @unlink($destFile);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

        // 刷新
        Service::refresh();

        //必须变更版本号
        $info['version'] = $extend['version'] ?? $info['version'];

        $info['config'] = get_addon_config($name) ? 1 : 0;
        $info['bootstrap'] = is_file(Service::getBootstrapFile($name));

        Service::enable($name, true);
        set_addon_info($name, ['version'=>$new_version]);

        if (!empty($version_list)) {
            file_put_contents(
                ADDON_PATH . $name . DS . 'config' . DS . "upgrade.php",
                '<?php' . "\n\nreturn " . var_export_short($version_list) . ";\n"
            );
        }

        return $info;
    }

    /**
     * 远程下载插件
     *
     * @param string $name   插件名称
     * @param array  $extend 扩展参数
     * @return  string
     */
    public static function download($name, $extend = [])
    {
        $addonsTempDir = Service::getAddonsBackupDir();
        $tmpFile = $addonsTempDir . $name . ".zip";
        $new_version = '';
        $version_list = array();
        try {
            $client = self::getClient();
            $response = $client->get('/api/product/version/upgrade', ['query' => array_merge(['name' => $name , 'authorized_version'=>'2'], $extend)]);
            $body = $response->getBody();
            $content = $body->getContents();

            if (substr($content, 0, 1) === '{') {
                $json = (array)json_decode($content, true);
                //如果传回的是一个下载链接,则再次下载
                if ($json['data'] && isset($json['data']['url'])) {
                    $new_version = $json['data']['new_version'];
                    $version_list = $json['data']['version_list'];
                    $response = $client->get($json['data']['url']);
                    $body = $response->getBody();
                    $content = $body->getContents();
                } else {
                    //下载返回错误，抛出异常
                    throw new AddonException($json['msg'], $json['code'], $json['data']);
                }
            }
        } catch (TransferException $e) {
            throw new \think\Exception("Addon package download failed");
        }

        if ($write = fopen($tmpFile, 'w')) {
            fwrite($write, $content);
            fclose($write);
            //return $tmpFile;
            return [
                'tmpFile'=>$tmpFile,
                'new_version'=>$new_version,
                'version_list'=>$version_list,
            ];
        }
        throw new Exception("No permission to write temporary files");
    }

    /**
     * 获取请求对象
     * @return Client
     */
    public static function getClient()
    {
        $options = [
            'base_uri'        => 'http://www.wdadmin.cn/',
            'timeout'         => 30,
            'connect_timeout' => 30,
            'verify'          => false,
            'http_errors'     => false,
            'headers'         => [
                'X-REQUESTED-WITH' => 'XMLHttpRequest',
                'Referer'          => dirname(request()->root(true)),
                'User-Agent'       => 'FastAddon',
            ]
        ];
        static $client;
        if (empty($client)) {
            $client = new Client($options);
        }
        return $client;
    }

    /**
     * 获取指定插件的目录
     */
    public static function getAddonDir($name)
    {
        $dir = ADDON_PATH . $name . DS;
        return $dir;
    }


    /**
     * 获取检测的全局文件夹目录
     * @return  array
     */
    protected static function getCheckDirs()
    {
        return [
            'application',
            'public'
        ];
    }




}
