require.config({
    paths: {
        'wdsxh-colorpicker': '../addons/wdsxh/libs/colorpicker/colorpicker',
        'poster': '../addons/wdsxh/libs/poster',
        'clipboard': '../addons/wdsxh/libs/clipboard.min',
        'designer': '../addons/wdsxh/libs/designer',
        'jquery-contextMenu': '../addons/wdsxh/libs/jquery.contextMenu',
        'jquery-form': '../addons/wdsxh/libs/jquery.form',
        'jquery-lazyload': '../addons/wdsxh/libs/jquery.lazyload.min',
    },
    // shim依赖配置
    shim: {
        'wdsxh-colorpicker': ['css!../addons/wdsxh/libs/colorpicker/colorpicker.css'],
        'poster': ['css!../addons/wdsxh/libs/poster.css'],
        'jquery-contextMenu': ['css!../addons/wdsxh/libs/jquery.contextMenu.css'],
        'animation': ['css!../addons/wdsxh/libs/colorui/animation.css'],
        'jquery-form': ['css!../addons/wdsxh/libs/colorui/coloriui-forh5.css'],
        'ColorUi-simplified': ['css!../addons/wdsxh/libs/colorui/ColorUi-simplified.css'],
        'icon': ['css!../addons/wdsxh/libs/colorui/icon.css'],
    },

});

