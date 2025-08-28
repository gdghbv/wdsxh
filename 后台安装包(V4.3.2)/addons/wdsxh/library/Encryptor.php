<?php
// +----------------------------------------------------------------------
// | 麦沃德科技赋能开发者，助力中小企业发展
// +----------------------------------------------------------------------
// | Copyright (c) 2017～2024  www.wdadmin.cn    All rights reserved.
// +----------------------------------------------------------------------
// | Wdadmin系统产品软件并不是自由软件，不加密，并不代表开源，未经许可不可自由转售和商用
// +----------------------------------------------------------------------
// | Author: MY WORLD Team <bd@maiwd.cn>   www.wdadmin.cn
// +----------------------------------------------------------------------
/**
 * Class Encryptor
 * Desc  加密和解密函数
 * Create on 2024/10/30 10:29
 * Create by wangyafang
 */

namespace addons\wdsxh\library;


class Encryptor
{
    private $encryption_key;
    private $iv;

    public function __construct($key,$iv) {
        if (strlen($key) !== 16) {
            throw new \think\Exception('Encryption key must be 32 bytes long.');
        }
        $this->encryption_key = $key;
        $this->iv = $iv; // fixed IV (16 bytes for AES-256-CBC)
    }

    public function encrypt($data) {
        // Encrypt the data using the fixed IV
        $encrypted = openssl_encrypt($data, 'aes-256-cbc', $this->encryption_key, 0, $this->iv);
        return base64_encode($encrypted);
    }

    public function decrypt($data) {
        // Decode the base64 encoded string
        $data = base64_decode($data);
        // Decrypt the data using the fixed IV
        return openssl_decrypt($data, 'aes-256-cbc', $this->encryption_key, 0, $this->iv);
    }
}



 