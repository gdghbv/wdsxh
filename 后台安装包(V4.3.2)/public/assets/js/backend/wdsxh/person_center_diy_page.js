define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
    var Controller = {
        index: function () {
            new Vue({
                el: '#diy',
                data: {
                    // 页面数据
                    pageData: pageData,
                    // 已选页面样式
                    selectPageStyle: {},
                    // 已选组件索引
                    selectedIndex: -1,
                    // 当前组件数据
                    currentData: {},
                    // 当前日期
                    currentDate: "",
                    // 选择弹窗是否显示
                    selectVisible: false,
                    // 选择弹窗数据
                    selectData: null,
                    // 选择弹窗选中类型
                    selectType: 'Custom',
                    // 选择弹窗选中回调事件
                    selectCallback: null,
                    // 选择弹窗表单数据
                    selectForm: {
                        title: "",
                        content: "",
                        appid: '',
                        path: '',
                        protocol: '',
                        url: '',
                        phone: '',
                    },
                },
                created() {
                    this.getCurrentDate()
                    this.getPageStyle()
                    $("#diy").show()
                    $("#loading").hide()
                },
                methods: {
                    // 获取已选页面样式
                    getPageStyle() {
                        var index = this.pageData.pageStyle.findIndex(item => {
                            if (item.layout == this.pageData.pageLayout) return true
                        })
                        if (index === -1) index = 0
                        this.selectPageStyle = JSON.parse(JSON.stringify(this.pageData.pageStyle[index]))
                    },
                    // 获取当前时间
                    getCurrentDate() {
                        const date = new Date();
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        this.currentDate = `${year}/${month}/${day}`;
                    },
                    // 编辑组件
                    handleEdit(index) {
                        this.selectedIndex = index;
                        this.currentData = {}
                        this.$nextTick(() => {
                            if (this.selectedIndex == -1) {
                                this.currentData = this.selectPageStyle;
                            } else {
                                this.currentData = this.pageData.items[this.selectedIndex];
                                if (!this.currentData.activeName) this.currentData.activeName = "first"
                            }
                        })
                    },
                    // 拖动组件
                    handleDrag(event) {
                        this.handleEdit(event.newIndex);
                    },
                    // 重置颜色
                    handleResetColor(source, key, color) {
                        source[key] = color;
                    },
                    // 选择图片
                    handleSelectImage(source, index, type = "image/") {
                        parent.Fast.api.open(`general/attachment/select?element_id=&multiple=true&mimetype=${type}*`, __('Choose'), {
                            callback: (data) => {
                                if (data.multiple) {
                                    var url = Fast.api.cdnurl(data.url);
                                    source[index] = url;
                                }
                            }
                        });
                    },
                    // 删除图片
                    handleDeleteImage(source, index) {
                        source[index] = "";
                    },
                    // 选择组件类型
                    handleSelectType(source) {
                        this.selectCallback = (type, row) => {
                            source['link'] = null;
                            switch (type) {
                                case 'Custom':
                                    var path = row.path
                                    if (row.parameter) {
                                        if (path.indexOf("?") > -1) path += "&" + row.parameter
                                        else path += "?" + row.parameter
                                    }
                                    source['link'] = { type: type, title: row.title, path: path, };
                                    break;
                                case 'Editor':
                                    var content = $("#Editor").val()
                                    source['link'] = { type: type, title: row.name, pageTitle: this.selectForm.title, content: content };
                                    break;
                                case 'WXMp':
                                    source['link'] = { type: type, title: row.name, appid: this.selectForm.appid, path: this.selectForm.path };
                                    break;
                                case 'Outside':
                                    source['link'] = { type: type, title: row.name, url: this.selectForm.protocol + this.selectForm.url };
                                    break;
                                case 'Phone':
                                    source['link'] = { type: type, title: row.name, phone: this.selectForm.phone };
                                    break;
                                case 'Service':
                                    source['link'] = { type: type, title: row.name };
                                    break;
                            }
                            this.selectVisible = false;
                        }
                        $.post('wdsxh/person_center_diy_page/select_url_pro', {}, (res) => {
                            this.selectData = res.rows;
                            this.selectForm = {
                                title: "",
                                content: "",
                                appid: '',
                                path: '',
                                protocol: '',
                                url: '',
                                phone: '',
                            }
                            if (source['link']) {
                                this.selectType = source['link'].type

                                if (source['link'].type === 'Custom') {
                                    let index = this.selectData.Custom.list.findIndex((item) => {
                                        if (source['link'].path.indexOf(item.path) > -1) {
                                            return true
                                        }
                                    })
                                    if (index > -1) {
                                        let selectLink = this.selectData.Custom.list[index]
                                        this.$delete(this.selectData.Custom.list, index)
                                        let selectPath = source['link'].path.split(selectLink.path)[1]
                                        if (selectPath[0] == "?" || selectPath[0] == "&") {
                                            this.$set(selectLink, "parameter", selectPath.slice(1))
                                        }
                                        this.selectData.Custom.list.unshift(selectLink)
                                        this.selectData.Custom.list = [...this.selectData.Custom.list]
                                    }
                                } else if (source['link'].type === 'WXMp') {
                                    this.selectForm.appid = source['link'].appid;
                                    this.selectForm.path = source['link'].path;
                                } else if (source['link'].type === 'Outside') {
                                    if (source['link'].url && source['link'].url.substring(0, 5) == "http:") {
                                        this.selectForm.protocol = 'http://';
                                        this.selectForm.url = source['link'].url.split('http://')[1];
                                    } else if (source['link'].url && source['link'].url.substring(0, 5) == "https") {
                                        this.selectForm.protocol = 'https://';
                                        this.selectForm.url = source['link'].url.split('https://')[1];
                                    } else {
                                        this.selectForm.protocol = '';
                                        this.selectForm.url = source['link'].url;
                                    }
                                } else if (source['link'].type === 'Phone') {
                                    this.selectForm.phone = source['link'].phone
                                }
                            } else {
                                this.selectType = "Custom"
                                $("#Editor").val("")
                            }
                            this.selectVisible = true;
                            this.$nextTick(() => {
                                if (source['link'] && source['link'].type === 'Editor') {
                                    $("#Editor").val(source['link'].content)
                                    this.selectForm.title = source['link'].pageTitle
                                    this.selectForm.content = source['link'].content
                                }
                                Controller.api.bindevent();
                            })
                        });
                    },
                    // 改变选择框类型
                    tabChange(e) {
                        if (e.name == "Editor") {
                            this.$nextTick(() => {
                                Form.api.bindevent($("form[role=form]"));
                                $('#Editor').on('change', () => {
                                    this.selectForm.content = $('#Editor').val()
                                });
                            })
                        }
                    },
                    // 添加组件内容项目
                    handleAddItem() {
                        this.currentData.data.push({
                            imgUrl: '/assets/addons/wdsxh/img/menu.png',
                            link: null,
                            text: '导航标题',
                        });
                    },
                    // 删除组件内容项目
                    handleDeleteItem(index) {
                        if (this.pageData.items[this.selectedIndex].data.length > 1) {
                            this.pageData.items[this.selectedIndex].data.splice(index, 1);
                        } else {
                            this.$message({
                                showClose: true,
                                message: '至少保留一个项目',
                                type: 'error'
                            });
                        }
                    },
                    // 提交数据
                    handleSubmit() {
                        var submitData = JSON.parse(JSON.stringify(this.pageData))
                        var index = submitData.pageStyle.findIndex(item => {
                            if (item.layout == submitData.pageLayout) return true
                        })
                        if (index === -1) index = 0
                        submitData.pageStyle[index] = JSON.parse(JSON.stringify(this.selectPageStyle))
                        for (var i in submitData.items) {
                            submitData.items[i].activeName = undefined
                        }
                        $.post('', { data: JSON.stringify(submitData) }, (res) => {
                            if (res.code == 1) {
                                Toastr.success(res.msg);
                                this.pageData = submitData
                                this.getCurrentDate()
                                this.getPageStyle()
                                return
                            }
                            return Toastr.error(res.msg);
                        });
                    },
                }
            });
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
