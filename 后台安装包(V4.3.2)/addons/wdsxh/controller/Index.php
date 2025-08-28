<?php

namespace addons\wdsxh\controller;

use think\addons\Controller;
use think\exception\HttpResponseException;
use think\Request;
use think\Response;

class Index extends Controller
{
    // 初始化
    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        $config = get_addon_config('wdsxh');
        // 设定主题模板目录
        $this->view->engine->config('view_path', $this->view->engine->config('view_path') . $config['theme'] . DS);
    }

    public function index()
    {
        return $this->view->fetch('/index');
    }

    public function about()
    {
        return $this->view->fetch('/about');
    }

    public function activity()
    {
        return $this->view->fetch('/activity');
    }

    public function album()
    {
        return $this->view->fetch('/album');
    }

    public function contact()
    {
        return $this->view->fetch('/contact');
    }

    public function enterprise()
    {
        return $this->view->fetch('/enterprise');
    }

    public function membership()
    {
        return $this->view->fetch('/membership');
    }

    public function news()
    {
        return $this->view->fetch('/news');
    }

    public function news_detail()
    {
        return $this->view->fetch('/news_detail');
    }

    public function business()
    {
        return $this->view->fetch('/business');
    }

    public function header()
    {
        return $this->view->fetch('/header');
    }

    public function footer()
    {
        return $this->view->fetch('/footer');
    }




}
