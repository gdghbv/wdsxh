define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {
  var Controller = {
    index: function () {
      // 初始化表格参数配置
      Table.api.init({
        extend: {
          index_url: 'wdsxh/diy_page/index' + location.search,
          add_url: 'wdsxh/diy_page/add',
          edit_url: 'wdsxh/diy_page/edit',
          del_url: 'wdsxh/diy_page/del',
          multi_url: 'wdsxh/diy_page/multi',
          import_url: 'wdsxh/diy_page/import',
          table: 'wdsxh_diy_page',
        }
      });

      var table = $("#table");

      // 初始化表格
      table.bootstrapTable({
        url: $.fn.bootstrapTable.defaults.extend.index_url,
        pk: 'id',
        sortName: 'id',
        columns: [
          [
            { checkbox: true },
            { field: 'id', title: __('Id') },
            {
              field: 'page_name',
              title: __('Page Name')
            },
            { field: 'status', title: __('Status'), searchList: { "home": __('Status home'), "custom": __('Status custom') }, formatter: Table.api.formatter.status },
            { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, formatter: Table.api.formatter.datetime },
            { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, formatter: Table.api.formatter.datetime },
            {
              field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate, buttons: [
                {
                  name: 'adopt',
                  text: '设为首页',
                  title: '设为首页',
                  confirm: '页面类型确认设为首页吗？',
                  classname: 'btn btn-xs btn-info btn-view btn-ajax',
                  url: 'wdsxh/diy_page/set_home',
                  hidden: function (row) {
                    if (row.status != 'home') {
                      return false;
                    } else {
                      return true;
                    }
                  },
                  refresh: true
                },
              ],
            }
          ]
        ]
      });
      table.on('post-body.bs.table', function (e, settings, json, xhr) {
        $(".btn-editone,.btn-edit,.btn-add").data("area", ["100%", "100%"]);
      });
      // 为表格绑定事件
      Table.api.bindevent(table);
    },
    add: function () {
      new Vue({
        el: '#diy',
        data: {
          // 默认组件数据
          defaultData: defaultData,
          // 模板数据
          pageData: pageData,
          // 已选组件索引
          selectedIndex: -1,
          // 当前组件数据
          currentData: {},
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
          // 文章分类列表
          articleCategoryList: [],
          // 供需分类列表
          demandCategoryList: [],
        },
        created() {
          $("#diy").show()
          $("#loading").hide()
          this.pageData.page.activeName = "first"
          this.getArticleCategory()
          this.getDemandCategory()
        },
        methods: {
          // 添加组件
          handleAdd(type) {
            this.pageData.items.push(JSON.parse(JSON.stringify(defaultData[type])));
            this.handleEdit(this.pageData.items.length - 1);
            setTimeout(() => {
              const listContainer = document.querySelector(".main-center .scroll-drag")
              listContainer.scrollTop = listContainer.scrollHeight;
            }, 50);
          },
          // 编辑组件
          handleEdit(index) {
            this.selectedIndex = index;
            this.currentData = {}
            this.$nextTick(() => {
              this.currentData = this.selectedIndex == -1 ? this.pageData.page : this.pageData.items[this.selectedIndex];
              if (!this.currentData.activeName) this.currentData.activeName = "first"
              if (this.currentData.type == "richTextDiy") {
                this.$nextTick(() => {
                  Form.api.bindevent($("form[role=form]"));
                  $('#richTextDiy').on('change', () => {
                    this.currentData.params.content = $('#richTextDiy').val()
                  });
                })
              }
            })
          },
          // 拖动组件
          handleDrag(event) {
            this.handleEdit(event.newIndex);
          },
          // 获取当前时间
          getCurrentDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
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
                  this.$set(source, index, url)
                }
              }
            });
          },
          // 删除图片
          handleDeleteImage(source, index) {
            this.$set(source, index, "")
          },
          // 获取文章分类
          getArticleCategory() {
            $.post('wdsxh/diy_page/get_article_category', {}, (res) => {
              this.articleCategoryList = res.rows
            });
          },
          // 选择文章分类
          handleSelectArticleCategory(source, event) {
            if (event) {
              const index = this.articleCategoryList.findIndex(item => item.id == event)
              if (index > -1) source.categoryName = this.articleCategoryList[index].name
              else source.categoryName = ""
            } else {
              source.categoryName = ""
            }
          },
          // 获取供需分类
          getDemandCategory() {
            $.post('wdsxh/diy_page/get_demand_category', {}, (res) => {
              this.demandCategoryList = res.rows
            });
          },
          // 选择文章分类
          handleSelectDemandCategory(source, event) {
            if (event) {
              const index = this.demandCategoryList.findIndex(item => item.id == event)
              if (index > -1) source.categoryName = this.demandCategoryList[index].name
              else source.categoryName = ""
            } else {
              source.categoryName = ""
            }
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
                case 'Inlay':
                  source['link'] = { type: type, title: row.title, path: row.path };
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
                case 'Member':
                  source['link'] = { type: type, title: '会员：' + row.name, id: row.id };
                  break;
                case 'Article':
                  source['link'] = { type: type, title: '文章：' + row.title, id: row.id, link_type: row.type, link_url: row.link };
                  break;
                case 'Activity':
                  source['link'] = { type: type, title: '活动：' + row.name, id: row.id };
                  break;
                case 'Goods':
                  source['link'] = { type: type, title: '商品：' + row.name, id: row.id };
                  break;
              }
              this.selectVisible = false;
            }
            $.post('wdsxh/diy_page/select_url_pro', {}, (res) => {
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
            this.currentData.data.push(JSON.parse(JSON.stringify(defaultData[this.currentData.type].data[0])));
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
          // 向上移动组件
          handleMoveUp(index) {
            if (index > 0) {
              [this.pageData.items[index], this.pageData.items[index - 1]] = [this.pageData.items[index - 1], this.pageData.items[index]];
              this.selectedIndex = index - 1
            }
          },
          // 向下移动组件
          handleMoveDown(index) {
            if (index < this.pageData.items.length - 1) {
              [this.pageData.items[index], this.pageData.items[index + 1]] = [this.pageData.items[index + 1], this.pageData.items[index]];
              this.selectedIndex = index + 1
            }
          },
          // 复制组件
          handleCopy(index) {
            this.pageData.items.push(JSON.parse(JSON.stringify(this.pageData.items[index])));
            this.handleEdit(this.pageData.items.length - 1);
            setTimeout(() => {
              const listContainer = document.querySelector(".main-center .scroll-drag")
              listContainer.scrollTop = listContainer.scrollHeight;
            }, 50);
          },
          // 删除组件
          handleDelete(index) {
            this.$delete(this.pageData.items, index)
            this.selectedIndex = -1;
          },
          // 提交数据
          handleSubmit() {
            if (this.pageData.items.length) {
              this.pageData.page.activeName = undefined
              for (var i in this.pageData.items) {
                this.pageData.items[i].activeName = undefined
              }
              $.post('', { data: JSON.stringify(this.pageData) }, (res) => {
                if (res.code == 1) {
                  parent.window.$(".btn-refresh").trigger("click");
                  Toastr.success(res.msg);
                  return setTimeout(() => {
                    Fast.api.close({});
                  }, 1000);
                }
                return Toastr.error(res.msg);
              });
            } else {
              this.$message({
                showClose: true,
                message: '至少添加一个组件',
                type: 'error'
              });
            }
          },
        }
      });
      Controller.api.bindevent();
    },
    edit: function () {
      new Vue({
        el: '#diy',
        data: {
          // 默认组件数据
          defaultData: defaultData,
          // 模板数据
          pageData: pageData,
          // 已选组件索引
          selectedIndex: -1,
          // 当前组件数据
          currentData: {},
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
          // 文章分类列表
          articleCategoryList: [],
          // 供需分类列表
          demandCategoryList: [],
        },
        created() {
          $("#diy").show()
          $("#loading").hide()
          this.pageData.page.activeName = "first"
          this.getArticleCategory()
          this.getDemandCategory()
        },
        methods: {
          // 添加组件
          handleAdd(type) {
            this.pageData.items.push(JSON.parse(JSON.stringify(defaultData[type])));
            this.handleEdit(this.pageData.items.length - 1);
            setTimeout(() => {
              const listContainer = document.querySelector(".main-center .scroll-drag")
              listContainer.scrollTop = listContainer.scrollHeight;
            }, 50);
          },
          // 编辑组件
          handleEdit(index) {
            this.selectedIndex = index;
            this.currentData = {}
            this.$nextTick(() => {
              this.currentData = this.selectedIndex == -1 ? this.pageData.page : this.pageData.items[this.selectedIndex];
              if (!this.currentData.activeName) this.currentData.activeName = "first"
              if (this.currentData.type == "richTextDiy") {
                this.$nextTick(() => {
                  Form.api.bindevent($("form[role=form]"));
                  $('#richTextDiy').on('change', () => {
                    this.currentData.params.content = $('#richTextDiy').val()
                  });
                })
              }
            })
          },
          // 拖动组件
          handleDrag(event) {
            this.handleEdit(event.newIndex);
          },
          // 获取当前时间
          getCurrentDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
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
                  this.$set(source, index, url)
                }
              }
            });
          },
          // 删除图片
          handleDeleteImage(source, index) {
            this.$set(source, index, "")
          },
          // 获取文章分类
          getArticleCategory() {
            $.post('wdsxh/diy_page/get_article_category', {}, (res) => {
              this.articleCategoryList = res.rows
            });
          },
          // 选择文章分类
          handleSelectArticleCategory(source, event) {
            if (event) {
              const index = this.articleCategoryList.findIndex(item => item.id == event)
              if (index > -1) source.categoryName = this.articleCategoryList[index].name
              else source.categoryName = ""
            } else {
              source.categoryName = ""
            }
          },
          // 获取供需分类
          getDemandCategory() {
            $.post('wdsxh/diy_page/get_demand_category', {}, (res) => {
              this.demandCategoryList = res.rows
            });
          },
          // 选择文章分类
          handleSelectDemandCategory(source, event) {
            if (event) {
              const index = this.demandCategoryList.findIndex(item => item.id == event)
              if (index > -1) source.categoryName = this.demandCategoryList[index].name
              else source.categoryName = ""
            } else {
              source.categoryName = ""
            }
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
                case 'Inlay':
                  source['link'] = { type: type, title: row.title, path: row.path };
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
                case 'Member':
                  source['link'] = { type: type, title: '会员：' + row.name, id: row.id };
                  break;
                case 'Article':
                  source['link'] = { type: type, title: '文章：' + row.title, id: row.id, link_type: row.type, link_url: row.link };
                  break;
                case 'Activity':
                  source['link'] = { type: type, title: '活动：' + row.name, id: row.id };
                  break;
                case 'Goods':
                  source['link'] = { type: type, title: '商品：' + row.name, id: row.id };
                  break;
              }
              this.selectVisible = false;
            }
            $.post('wdsxh/diy_page/select_url_pro', {}, (res) => {
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
            this.currentData.data.push(JSON.parse(JSON.stringify(defaultData[this.currentData.type].data[0])));
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
          // 向上移动组件
          handleMoveUp(index) {
            if (index > 0) {
              [this.pageData.items[index], this.pageData.items[index - 1]] = [this.pageData.items[index - 1], this.pageData.items[index]];
              this.selectedIndex = index - 1
            }
          },
          // 向下移动组件
          handleMoveDown(index) {
            if (index < this.pageData.items.length - 1) {
              [this.pageData.items[index], this.pageData.items[index + 1]] = [this.pageData.items[index + 1], this.pageData.items[index]];
              this.selectedIndex = index + 1
            }
          },
          // 复制组件
          handleCopy(index) {
            this.pageData.items.push(JSON.parse(JSON.stringify(this.pageData.items[index])));
            this.handleEdit(this.pageData.items.length - 1);
            setTimeout(() => {
              const listContainer = document.querySelector(".main-center .scroll-drag")
              listContainer.scrollTop = listContainer.scrollHeight;
            }, 50);
          },
          // 删除组件
          handleDelete(index) {
            this.$delete(this.pageData.items, index)
            this.selectedIndex = -1;
          },
          // 提交数据
          handleSubmit() {
            if (this.pageData.items.length) {
              this.pageData.page.activeName = undefined
              for (var i in this.pageData.items) {
                this.pageData.items[i].activeName = undefined
              }
              $.post('', { data: JSON.stringify(this.pageData) }, (res) => {
                if (res.code == 1) {
                  parent.window.$(".btn-refresh").trigger("click");
                  Toastr.success(res.msg);
                  return setTimeout(() => {
                    Fast.api.close({});
                  }, 1000);
                }
                return Toastr.error(res.msg);
              });
            } else {
              this.$message({
                showClose: true,
                message: '至少添加一个组件',
                type: 'error'
              });
            }
          },
        }
      });
      Controller.api.bindevent();
    },
    select_home_mode: function () {
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
