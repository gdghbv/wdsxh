<?php
namespace addons\wdsxh\command;

use GatewayWorker\BusinessWorker;
use GatewayWorker\Gateway;
use GatewayWorker\Register;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use Workerman\Worker;

class Wdsxh extends Command
{
    protected function configure()
    {
        $this->setName('wdsxh')
            ->setDescription("启动GatewayWorker服务");
    }

    /*
     * 逻辑处理
     */
    protected function execute(Input $input, Output $output)
    {
        //逻辑处理
        //定义端口
        $port = 1238;
        // 初始化register
        new Register('text://0.0.0.0:' . $port);

        //初始化 bussinessWorker 进程
        $worker = new BusinessWorker();
        $worker->name = 'chatWorker';  //进程名
        $worker->count = 4;  //进程数
        $worker->registerAddress = '127.0.0.1:' . $port;

        // 设置处理业务的类,此处制定Events的命名空间
        $worker->eventHandler = '\app\api\controller\wdsxh\gateway\Events';
        // 初始化 gateway 进程
        $gateway = new Gateway("websocket://0.0.0.0:8282");
        $gateway->name = 'chatGateway'; //Gateway进程名
        $gateway->count =  4;  //Gateway进程数
        $gateway->lanIp = '127.0.0.1';
        $gateway->startPort = 2000;  //开始端口
//        $gateway->pingInterval = 60;
//        $gateway->pingNotResponseLimit = 5;
//        $gateway->pingData = 'pong';
        $gateway->registerAddress = '127.0.0.1:' . $port;

        // 运行所有Worker;
        Worker::runAll();
        $output->writeln("done");
    }
}
