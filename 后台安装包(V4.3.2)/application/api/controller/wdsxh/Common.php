<?php
/**
 * Class Common
 * Desc  公共控制器
 * Create on 2023/8/17 11:26
 * Create by wangyafang
 */

namespace app\api\controller\wdsxh;


use app\common\controller\Api;
use app\common\exception\UploadException;
use app\common\library\Upload;
use think\App;
use think\Config;
use think\Hook;
use think\Lang;

class Common extends Api
{
    protected $noNeedLogin = ['upload'];
    protected $noNeedRight = '*';
    //上传方法
    public function upload()
    {
        // 自定义鉴权判断
        // 强烈建议这里判断$file = $this->request->file('file');的后缀和mimetype

        // 载入语言包，避免出现英文错误提示
        Lang::load(APP_PATH . 'api/lang/zh-cn.php');

        // 获取上传配置
        $uploadConfig = Config::get("upload");

        // 兼容云存储上传
        if ($uploadConfig['storage'] != 'local') {
            // 这里可以修改允许上传文件的后缀或修改存储的文件路径，例如只允许上传图片
            set_addon_config($uploadConfig['storage'], ['savekey' => '/uploads/{year}{mon}{day}/{filemd5}{.suffix}', 'mimetype' => 'jpg,png,bmp,jpeg,gif,webp,zip,rar,wav,mp4,mp3,webm,pem,xlsx,xls,doc,docx,pdf'], false);

            // 添加允许上传的行为
            Hook::add('upload_config_checklogin', function () {
                return true;
            });

            request()->param('isApi', true);
            App::invokeMethod(["\\addons\\{$uploadConfig["storage"]}\\controller\\Index", "upload"], ['isApi' => true]);
        } else {
            // 这里可以修改允许上传文件的后缀或修改存储的文件路径，例如只允许上传图片
            //Config::set('upload', array_merge($uploadConfig, ['savekey' => '/uploads/{year}{mon}{day}/{filemd5}{.suffix}', 'mimetype' => 'jpg,png,bmp,jpeg,gif']));

            $attachment = null;
            // 默认普通上传文件
            $file = $this->request->file('file');
            try {
                $upload = new Upload($file);
                $attachment = $upload->upload();
                $fileInfo = $attachment;//todo 后台和前端上传图片自动压缩到1M以内
                if (in_array($fileInfo['mimetype'], ['image/gif', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/png', 'image/webp']) || in_array($fileInfo['imagetype'], ['gif', 'jpg', 'jpeg', 'bmp', 'png', 'webp'])) {
                    $max_size = 1024*1024;
                    if($fileInfo['filesize']>$max_size){

                        $required_memory = $fileInfo['imagewidth'] * $fileInfo['imageheight'];
                        $new_limit=memory_get_usage() + $required_memory+200000000;
                        ini_set("memory_limit", $new_limit);

                        if($fileInfo['mimetype']=='image/jpg'||$fileInfo['mimetype']=='jpg' || $fileInfo['mimetype']=='image/jpeg' || $fileInfo['mimetype']=='jpeg'){
                            $image = ROOT_PATH . '/public' . $fileInfo['url'];
                            $src = @imagecreatefromjpeg($image);
                            $newwidth = $fileInfo['imagewidth'];   //宽高可以设置,
                            $newheight = $fileInfo['imageheight'];


                            $tmp = imagecreatetruecolor($newwidth,$newheight); //生成新的宽高
                            imagecopyresampled($tmp, $src, 0, 0, 0, 0, $newwidth, $newheight, $fileInfo['imagewidth'], $fileInfo['imageheight']); //缩放图像
                            imagejpeg($tmp, $image, 60); //第三个参数(0~100);越大越清晰,图片大小也高;   png格式的为(1~9)
                            $filesize = filesize($image);
                            $attachment->filesize = $filesize;
                            $attachment->save();
                        }

                        if($fileInfo['mimetype']=='image/png'||$fileInfo['mimetype']=='png'){
                            $image = ROOT_PATH . '/public' . $fileInfo['url'];
                            $src = @imagecreatefrompng($image);
                            $newwidth = $fileInfo['imagewidth'];   //宽高可以设置,
                            $newheight = $fileInfo['imageheight'];
                            $newwidth = $newwidth/2;
                            $newheight = $newheight/2;
                            $tmp = imagecreatetruecolor($newwidth,$newheight);
                            imagecopyresampled($tmp, $src, 0, 0, 0, 0, $newwidth, $newheight, $fileInfo['imagewidth'], $fileInfo['imageheight']);
                            imagepng($tmp, $image, 2);  //这个图片的第三参数(1~9)
                            $filesize = filesize($image);
                            $attachment->imagewidth = $newwidth;
                            $attachment->imageheight = $newheight;
                            $attachment->filesize = $filesize;
                            $attachment->save();
                        }

                    }
                }
            } catch (UploadException $e) {
                $error = $e->getMessage();
                $intercept_result = substr($error,0,15);
                if ($intercept_result == 'File is too big') {
                    $maxsize = strtoupper(config('upload')['maxsize']);
                    $this->error('文件太大，最大文件大小：'.$maxsize);
                } else {
                    $this->error($e->getMessage());
                }
            }
            $this->success('上传成功', ['url' => $attachment->url, 'fullurl' => cdnurl($attachment->url, true)]);
        }
    }
}



 