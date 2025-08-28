<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:98:"/www/wwwroot/1209/后台安装包(V4.3.2)/public/../application/admin/command/Install/install.html";i:1737604453;}*/ ?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo __('Installing FastAdmin'); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
    <meta name="renderer" content="webkit">

    <style>
        body {
            background: #f1f6fd;
            margin: 0;
            padding: 0;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body, input, button {
            font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, 'Microsoft Yahei', Arial, sans-serif;
            font-size: 14px;
            color: #7E96B3;
        }

        .container {
            max-width: 480px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        a {
            color: #4e73df;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        h1 {
            margin-top: 0;
            margin-bottom: 10px;
        }

        h2 {
            font-size: 28px;
            font-weight: normal;
            color: #3C5675;
            margin-bottom: 0;
            margin-top: 0;
        }

        form {
            margin-top: 40px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group .form-field:first-child input {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        .form-group .form-field:last-child input {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }

        .form-field input {
            background: #fff;
            margin: 0 0 2px;
            border: 2px solid transparent;
            transition: background 0.2s, border-color 0.2s, color 0.2s;
            width: 100%;
            padding: 15px 15px 15px 180px;
            box-sizing: border-box;
        }

        .form-field input:focus {
            border-color: #4e73df;
            background: #fff;
            color: #444;
            outline: none;
        }

        .form-field label {
            float: left;
            width: 160px;
            text-align: right;
            margin-right: -160px;
            position: relative;
            margin-top: 15px;
            font-size: 14px;
            pointer-events: none;
            opacity: 0.7;
        }

        button, .btn {
            background: #3C5675;
            color: #fff;
            border: 0;
            font-weight: bold;
            border-radius: 4px;
            cursor: pointer;
            padding: 15px 30px;
            -webkit-appearance: none;
        }

        button[disabled] {
            opacity: 0.5;
        }

        .form-buttons {
            height: 52px;
            line-height: 52px;
        }

        .form-buttons .btn {
            margin-right: 5px;
        }

        #error, .error, #success, .success, #warmtips, .warmtips {
            background: #D83E3E;
            color: #fff;
            padding: 15px 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }

        #success {
            background: #3C5675;
        }

        #error a, .error a {
            color: white;
            text-decoration: underline;
        }

        #warmtips {
            background: #ffcdcd;
            font-size: 14px;
            color: #e74c3c;
        }

        #warmtips a {
            background: #ffffff7a;
            display: block;
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            color: #e21a1a;
            border-radius: 3px;
        }

        /* 新增CSS调整左对齐 */
        #notice {
            text-align: left;
            background: #ffcdcd;
            color: #e74c3c;
            padding: 15px 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }

        #notice ul {
            list-style-type: decimal;
            padding-left: 20px; /* 左对齐并加上缩进 */
        }

        #notice li {
            margin-bottom: 8px;
        }
    </style>
</head>

<body>
<div class="container">
    <h1>
        <img style="width: 100px;height: 100px;" src="/assets/img/sxh_logo.png">
    </h1>
    <h2>安装商协会管理系统</h2>

    <!-- 注意事项 -->
    <div id="notice">
        <h3>注意事项：</h3>
        <ul>
            <li>务必设置网站<strong>根目录为 Public</strong></li>
            <li>小程序务必配置 <strong>HTTPS，即SSL证书</strong></li>
            <li>务必设置 <strong>伪静态Thinkphp</strong></li>
            <li>PHP版本必须为 <strong>7.4</strong></li>
            <li>一键安装前 <strong>必须先设置xxx/application/data.php数据库名称、账号、密码和宝塔创建数据库一致</strong></li>
            <li>一键安装前 <strong>必须先设置xxx/runtime,xxx/application,xxx/public,xxx/addons目录和子目录为写入权限</strong></li>
            <li>安装后，<strong>务必确认是否以后启用云存储</strong>，目前沃德商协会仅适配了七牛云，如果半途中启用七牛云后，需要把以前的数据重新覆盖上传一遍！如果半途中修改，需要我方协助，我们将收取一定的费用</li>
        </ul>
    </div>
    <div>

        <form method="post">
            <?php if($errInfo): ?>
            <div class="error">
                <?php echo $errInfo; ?>
            </div>
            <?php endif; ?>
            <div id="error" style="display:none"></div>
            <div id="success" style="display:none"></div>
            <div id="warmtips" style="display:none"></div>

            <div class="form-group">
                <div class="form-field">
                    <label><?php echo __('Mysql Hostname'); ?></label>
                    <input type="text" name="mysqlHostname" value="127.0.0.1" required="">
                </div>

                <div class="form-field">
                    <label><?php echo __('Mysql Database'); ?></label>
                    <input type="text" name="mysqlDatabase" value="" required="">
                </div>

                <div class="form-field">
                    <label><?php echo __('Mysql Username'); ?></label>
                    <input type="text" name="mysqlUsername" value="root" required="">
                </div>

                <div class="form-field">
                    <label><?php echo __('Mysql Password'); ?></label>
                    <input type="password" name="mysqlPassword">
                </div>

                <div class="form-field">
                    <label><?php echo __('Mysql Prefix'); ?></label>
                    <input type="text" name="mysqlPrefix" value="fa_">
                </div>

                <div class="form-field">
                    <label><?php echo __('Mysql Hostport'); ?></label>
                    <input type="number" name="mysqlHostport" value="3306">
                </div>
            </div>

            <div class="form-group">
                <div class="form-field">
                    <label><?php echo __('Admin Username'); ?></label>
                    <input name="adminUsername" value="admin" required=""/>
                </div>

                <div class="form-field">
                    <label><?php echo __('Admin Email'); ?></label>
                    <input name="adminEmail" value="admin@admin.com" required="">
                </div>

                <div class="form-field">
                    <label><?php echo __('Admin Password'); ?></label>
                    <input type="password" name="adminPassword" required="">
                </div>

                <div class="form-field">
                    <label><?php echo __('Repeat Password'); ?></label>
                    <input type="password" name="adminPasswordConfirmation" required="">
                </div>
            </div>

            <div class="form-group">
                <div class="form-field">
                    <label><?php echo __('Website'); ?></label>
                    <input type="text" name="siteName" value="<?php echo __('My Website'); ?>" required=""/>
                </div>

            </div>

            <div class="form-buttons">
                <!--@formatter:off-->
                <button type="submit" <?php echo $errInfo?'disabled':''; ?>><?php echo __('Install now'); ?></button>
                <!--@formatter:on-->
            </div>
        </form>

        <!-- jQuery -->
        <script src="https://cdn.staticfile.org/jquery/2.1.4/jquery.min.js"></script>

        <script>
            $(function () {
                $('form :input:first').select();

                $('form').on('submit', function (e) {
                    e.preventDefault();
                    var form = this;
                    var $error = $("#error");
                    var $success = $("#success");
                    var $button = $(this).find('button')
                        .text("<?php echo __('Installing'); ?>")
                        .prop('disabled', true);
                    $.ajax({
                        url: "",
                        type: "POST",
                        dataType: "json",
                        data: $(this).serialize(),
                        success: function (ret) {
                            if (ret.code == 1) {
                                $("#notice").hide();
                                var data = ret.data;
                                $error.hide();
                                $(".form-group", form).remove();
                                $button.remove();
                                $("#success").text(ret.msg).show();

                                $buttons = $(".form-buttons", form);
                                $("<a class='btn' href='./'><?php echo __('Home'); ?></a>").appendTo($buttons);

                                if (typeof data.adminName !== 'undefined') {
                                    var url = location.href.replace(/install\.php/, data.adminName);
                                    $("#warmtips").html("<?php echo __('Security tips'); ?>" + '<a href="' + url + '">' + url + '</a>').show();
                                    $('<a class="btn" href="' + url + '" id="btn-admin" style="background:#4e73df">' + "<?php echo __('Dashboard'); ?>" + '</a>').appendTo($buttons);
                                }
                                localStorage.setItem("fastep", "installed");
                            } else {
                                $error.show().text(ret.msg);
                                $button.prop('disabled', false).text("<?php echo __('Install now'); ?>");
                                $("html,body").animate({
                                    scrollTop: 0
                                }, 500);
                            }
                        },
                        error: function (xhr) {
                            $error.show().text(xhr.responseText);
                            $button.prop('disabled', false).text("<?php echo __('Install now'); ?>");
                            $("html,body").animate({
                                scrollTop: 0
                            }, 500);
                        }
                    });
                    return false;
                });
            });
        </script>
    </div>
</div>
</body>
</html>
