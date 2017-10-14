/*!
 * ECF JavaScript Page Library v2.0.1.5
 * 数据分页显示Js文件
 *
 * Includes ECF.js
 *
 * Includes ECF.TEngine.js
 *
 * Copyright 2015 , shaipe
 *
 * Date: 2014-07-28T21:02Z
 * Modify:  xp 2014/10/28
 *
 * 1. 扩展数据展示完后的回调方法,名称Callback把原callbak用于获取数据后自定义展示改为showData  2014-7-28
 * 2. 处理一个页面中使用多个分页控件时会有问题的解决 2014-10-28
 * 3. 添加是否请允许滚动加载以及指定滚动对象   20141030
 * 4. 修改分页条的模式，添加可以自行设置每页显示行数 20150527
 */

// js结合Ajax分页插件处理开始
!function ($e, win) {

    //扩展到ECF的插件中进行使用
    $e.fn.page = function (templateId, pageBarId, data, pageSize, callback, callPage, scrollTarget) {
        var container = this,
            _c = {};

        if (arguments.length == 1 && $e.isObject(arguments[0])) {
            _c = arguments[0];
        }
        else {
            _c = {
                templateId: templateId,
                id: this.selector.substr(1),
                pageBarId: pageBarId,
                pageSize: pageSize || null,
                data: data,
                callback: callback,
                callPage: callPage || null,
                scrollTarget: window //scrollTarget || 
            };
        }

        _c.container = container;


        if (this.length > 0) {
            return ecPage(_c);
        }
    };

    // Ajax分页的构造函数
    var ecPage = $e.page = function (c) {

        var my = this;


        // 定义传入的config信息
        c = c || {};

        var dfs = ecPage.defaults;

        //处理默认配置
        for (var i in dfs) {
            if (c[i] == undefined) c[i] = dfs[i];
        }
        //alert(c.id);
        ecPage._count++;

        if (!c.container) c.container = c.id;

        // 计算总页数
        c.pages = Math.ceil(c.records / c.pageSize);
        var cpage = ecPage.list[c.id];
        if (cpage) {
            cpage.refresh(c);
            return cpage;
        }
        else {
            //给list对列附值并返回弹出层实例化对象
            return ecPage.list[c.id] = new ecPage.fn._init(c);
        }
        
    };


    // 分页插件的默认配置信息
    ecPage.defaults = {
        id: 'pager1',				// 给定page对象的id
        container: "",						//控件容器的id号
        templateId: "templateId",
        pageSize: 20,						//每页显示的数据条数
        action: "AjaxPageData",                 // 是否允许设置分页大小
        records: 0,						//总数据记录
        type: 'default',				//默认,number:数字型,image:图片格式
        isCache: false,					//启用客户端数据缓存
        loadImg: '/System/images/loading.gif',	//数据等待时Loading图片地址
        barSize: 5,						// 分页第最多现示页码
        barRecords: true,                    // 是否在分页条上显示数据条数
        pageIndex: 1,						// 当前页面Index
        callPage: null,			        // 分页数据请求页面
        cssName: '',						// 分页条的样式名
        showData: null,                     // 定义显示数据方法
        callback: null,					// 通过Ajax获取数据后执行函数处理,将传入page对象
        data: '',						// 需要通过分页条向后发送的数据参数
        dataType: 'xml',					// Ajax发送数据的格式
        isPageBar: true,                // 是否使用分页条
        pageBarId: null,                // 显示分页条的容器id
        isScroll: false,                 // 是否滚动时自动加载分页
        scrollTarget: null,                // 需要加载的滚动条对象
        distBottom: 100,                // 滚动条距离底部距离高度时自动加载分页
        topScroll: false,                // 是否使用顶部的滚动条
        loading: null,                  // 加载时方法
        errorNull: '<div class=\"errornull\">暂无数据</div>'
    };

    // 设置默认值
    ecPage.setDefault = function (name, value) {
        ecPage.defaults[name] = value;
    };

    // 分页条的列表数
    ecPage.list = {};

    // 已创建的分页条个数
    ecPage._count = 0;

    // 分页插件的扩展信息
    ecPage.fn = ecPage.prototype = {
        Version: '2.0.0.1',
        create: '20140728',
        info: {
            // ajax分页
        },

        // 配置信息
        _config: {},


        // page初始化
        _init: function (c) {

            var onIScroll = function (pager) {

               

                if ($e.iscroll) {

                    //// 获取初始化时系统绑定的刷新方法
                    //var sd = $e.iscroll._events.scrollEnd;

                    // // 解除原来的绑定
                    //$e.iscroll.off("scrollEnd",  sd[sd.length - 1]);

                    $e.iscroll.on("scrollEnd", function () {
                        var c = pager._config;

                        if (c.pages > c.pageIndex && this.y < (this.maxScrollY + 5) && c.touchPage) {

                            pager.goNextPage(true);

                            if (c.touchTip) {
                                c.touchTip.html("数据加载中...");
                            }
                        }

                        var showObj = ECF('.ui-more');
                        showObj.css({ 'display': 'none' });
                    });

                    $e.iscroll.on("scrollStart", function () {
                        var c = pager._config;
                        if (c.pages > c.pageIndex && this.y < (this.maxScrollY + 10)) {
                            c.touchPage = true;
                            if (c.touchTip) {
                                c.touchTip.show();
                            }
                            else {
                                var div = document.createElement("Div");
                                div.className = "ui-more";
                                div.innerHTML = "获取更多数据...";

                                var showPanel = ECF('.iscroll-wrapper').parent();
                                //if (c.container.parent().find(".ui-more").length === 0) {
                                //    c.container.parent().append(div);
                                //    c.touchTip = $e(div);
                                //}

                                if (showPanel.find(".ui-more").length === 0) {
                                    showPanel.append(div);
                                    c.touchTip = $e(div);
                                }
                            }
                        } else if (c.pages == c.pageIndex && Number(this.y) < (this.maxScrollY + 10)) {
                            var showObj = ECF('.ui-more');
                            if (showObj.length <= 0) {
                                var div = document.createElement("Div");
                                div.className = "ui-more";

                                var showPanel = ECF('.iscroll-wrapper').parent();
                                if (showPanel.find(".ui-more").length === 0) {
                                    showPanel.append(div);
                                }

                                showObj = ECF('.ui-more');
                            }
                            showObj[0].innerHTML = "获取更多数据...";
                            showObj.css({ 'display': 'block' });
                        }
                    });
                }
            };

            var my = this;
            my._config = c;
            my.pages = c.pages;
            my.render(onIScroll);

            // 是否启用滚动条自动加载分页
            if (c.isScroll) {

                var win = window.top ? window.top : window;

                // 是否指定滚动对象
                if (c.scrollTarget) {
                    win = c.scrollTarget;
                }
                else {
                    // 判断是否使用顶层页面的滚动条控制
                    if (!c.topScroll) {
                        win = window;
                    }
                }

                //alert(win);

                // 当页面滚动到某位置时加载分页数据
                $e(win).bind("scroll", function () {
                    var _c = my._config, pindex = _c.pageIndex;

                    //alert("1");
                    //console.log("distBottom:" + _c.distBottom);

                    var target = win;

                    if (win.document) {
                        target = win.document;
                    }

                    if (win.document.documentElement.scrollHeight == $e(target).height()) {

                        // 总页数大于当前页时才进行加载
                        if (_c.pages > pindex) {
                            //console.log($e.isMobile);
                            // 移动端进行不断的加载
                            if ($e.isMobile) {
                                my.goNextPage(true);
                            }
                            else {

                                // 每页只是累计加载5页数据
                                if (_c.isPageBar) {
                                    if (pindex % 5 != 0) {
                                        // 进行追加
                                        my.goNextPage(true);
                                    }
                                }
                                else {
                                    // 进行追加
                                    my.goNextPage(true);
                                }
                            }

                        }


                    }
                });

            }

            return my;
        },

        // 设置分页大小
        setPageSize: function (size) {
            if (size > 0) {
                this._config.pageSize = size;
                loadData(this);
            }
        },

        // 重置对象,主要是重置配置
        reset: function (c) {
            this._config = c;
        },

        // 跳转到指定页
        goPage: function (o, page) {
            var p = o.getAttribute('page');

            p = p ? p : page;

            this._config.pageIndex = p;

            loadData(this);
        },

        // 跳转到第一页
        goFirstPage: function (o) {
            this._config.pageIndex = 1;
            loadData(this);
        },

        // 跳转到上一页
        goPreviousPage: function () {
            if (this._config.pageIndex > 1) {
                this._config.pageIndex--;
                loadData(this);
            }
            else {

            }
        },

        // 跳转到下一页
        goNextPage: function (append) {

            // 如果处理解锁状态才进行加载请求
            this._config.pageIndex++;
            loadData(this, append);

        },

        // 跳转到最后一页
        goLastPage: function (o) {
            this._config.pageIndex = o.getAttribute('page');
            loadData(this);
            //alert(this._config.pageIndex);
        },

        // 根据相应条件进行分页数据查询
        query: function (data) {
            if (data) {
                this._config.data = data;

                var currentData = this._config.data;
                if (currentData != data) {
                    this._config.pageIndex = 1;
                }
            }

            loadData(this);
        },

        // 刷新当前条件下的分页数据
        refresh: function (c) {
            var my = this;
            if (typeof (c) == "object") {
                my._config = c;
                my.pages = c.pages;
            }

            loadData(my);

            //iScroll刷新
            if ($e.iscroll) {
                $e.iscroll.refresh();
            }
        },

        // 生成相应的html代码
        render: function (func) {
            loadData(this, null, func);
        }
    };

    //功能转换  核心必不可少
    ecPage.fn._init.prototype = ecPage.fn;

    // 获取分页条
    function pageString(pager) {

        var c = pager._config,
            div = document.createElement("DIV");
        div.className = (c.cssName ? c.cssName : "box rm");
        div.id = c.id + '_PageBar';
        //var div = appendElement(box, 'DIV');

        // 显示获取数据的情况
        if (c.barRecords) {
            var recordsBar = appendElement(div, "DIV", "info rm");
            appendText(recordsBar, "共"+ c.pages + "页,");

            var em1 = appendElement(recordsBar, "EM", "rm");
            em1.innerHTML = c.records;
            appendText(recordsBar, "条数据");

            var em2 = appendElement(recordsBar, "SPAN", "rm");

            var input = appendElement(em2, "INPUT", "");
            input.type = "text";
            input.value = c.pageIndex;
            input.id = c.id + '_IndexPage';
            input.onchange = function () {
                pager.goPage(this, input.value);
            };

            //appendText(recordsBar, "/" + c.pages + "页,每页");

            var em3 = appendElement(recordsBar, "SPAN", "rm");

            // 自行设置分页大小
            var pageInput = appendElement(em3, "INPUT", "");
            pageInput.type = "text";
            pageInput.value = c.pageSize;
            pageInput.id = c.id + '_PageSize';
            pageInput.onchange = function () {
                pager.setPageSize(this.value);
            };

           // appendText(recordsBar, "条记录");

        }


        //首页
        if (c.pages > 0) { //c.pageIndex > 1
            var fristPage = appendElement(div, 'A', "first rm");
            fristPage.innerHTML = '首页';
            fristPage.href = "javascript:;";
            fristPage.onclick = function () { pager.goFirstPage(); };
        }

        if (c.pageIndex > 1) { //c.pageIndex > 1
            var fristPage = appendElement(div, 'A', "up rm");
            fristPage.innerHTML = '上一页';
            fristPage.href = "javascript:;";
            fristPage.onclick = function () { pager.goPreviousPage(); };
        }

        var ii = 1, t = 1, vpage;
        if (parseInt(c.pages - c.barSize) > 0) { // 处理从哪开始循环得到中间部分分页条
            if ((c.pageIndex + (c.barSize - 2)) > c.barSize) {
                t = c.pageIndex - 2;
                //console.log(t);
                if (t < 1) t = 1;
                if (t > (c.pages - c.barSize)) {
                    t = c.pages - c.barSize + 1;
                }
            }
        }

        if (t > 1) {	//当循环开始时比第一页大
            appendElement(div, 'span', "more rm").innerHTML = '...';
        }

        for (t; t <= c.pages; t++) {
            if (ii <= c.barSize) {
                if (t == c.pageIndex) {   // 处理当前页
                    var cpage = appendElement(div, 'span', "now rm");
                    cpage.innerHTML = t;
                }
                else {  // 可以跳转到其他页面
                    vpage = appendElement(div, 'A', "num rm");
                    vpage.href = "javascript:;";
                    vpage.onclick = function () { pager.goPage(this); };
                    vpage.innerHTML = t;
                    vpage.setAttribute('page', t);
                }
            }
            else {
                break;
            }
            ii++;
        }
        //alert(t + " : " + c.pages);
        if (t <= c.pages) {	// 循环结束后小于最大页数
            appendElement(div, 'span', "more rm").innerHTML = '...';
        }

        if (c.pageIndex < c.pages) { //c.pageIndex < c.pages
            var lastPage = appendElement(div, 'A', "down rm");
            lastPage.innerHTML = '下一页';
            lastPage.href = "javascript:;";
            lastPage.setAttribute('page', c.pages);
            lastPage.onclick = function () { pager.goNextPage(); };
        }

        //  最后一页
        if (c.pages > 0) { //c.pageIndex < c.pages
            var lastPage = appendElement(div, 'A', "end rm");
            lastPage.innerHTML = '尾页';
            lastPage.href = "javascript:;";
            lastPage.setAttribute('page', c.pages);
            lastPage.onclick = function () { pager.goLastPage(this); };
        }

        //console.log(div);

        return div;


        //添加并绑定元素
        function appendElement(el, tagName, className, id) {
            tagName = tagName || 'DIV';
            var ele = document.createElement(tagName);
            if (id && id != "") ele.setAttribute("id", id);
            if (className && className != "") ele.className = className;
            el.appendChild(ele);
            return ele;
        };

        // 向节点中添加文本
        function appendText(el, data) {
            if (typeof (data) == "string") {
                var text = document.createTextNode(data);
                el.appendChild(text);
            }
        }

    };

    // 内部方法开始
    // 加载数据
    function loadData(pager, append, func) {

        var c = pager._config,
            data = '';

        // 判断是否锁定了请求
        if (c.lock) return;

        // 给请求加锁
        c.lock = true;

        if (c.dataType.toLowerCase() == "josn") {
            data = '{action:"' + c.action + '",PageIndex: ' + c.pageIndex + ', PageSize: ' + c.pageSize + ',' + c.data + '}';
        }
        else {
            data = '<action>' + c.action + '</action><PageIndex>' + c.pageIndex + '</PageIndex><PageSize>' + c.pageSize + '</PageSize>' + c.data;
        }
        //alert(data);
        $e.ajax({
            url: c.callPage,
            data: data,
            dataType: c.dataType,
            open: c.open,
            success: function () {

                // 请求完成后解锁
                c.lock = false;

                var doc = (arguments[1].xml ? arguments[1].xml : arguments[1].text);
                if (!doc) return;

                if (typeof (doc) == "string") {
                    doc = $e.parseJSON(doc);
                }
                else {
                    doc = $e.xml.toJson(doc);
                }

                if (!doc) return;

                //alert(doc);
                // 获取总记录数
                c.records = doc.count;
                // 计算总页数
                c.pages = Math.ceil(c.records / c.pageSize);
                //console.log(c);
                pager.reset(c);

                // 给定了回调方法后的执行处理
                if (typeof (c.showData) == 'function') {
                    c.showData.apply(pager, [doc, arguments, append, func]);
                }
                else {
                    showData(pager, doc, append, func);
                }

                if (c.pageBarId && c.pageBarId != "") {    //添加专用的pageBar容器 by xp 20121205
                    $e('#' + c.pageBarId).html(pageString(pager));
                }
            },
            done: c.done,
            error: function () {
                alert("分页数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    };

    // 显示回调回来的数据到容器中
    function showData(pager, doc, append, func) {
        var c = pager._config, data = doc.data;
        if (ECF.isArray(data) && data.length > 0) {
            var html = $e("#" + c.templateId).html();
            //console.log(html);
            if (typeof (c.container) == "string") {
                c.container = $e(c.container);
            }

            if (append) { //进行追加
                c.container.append(jte(html, data));
            } else {
                c.container.html(jte(html, data));
            }
        }
        else {
            if (!append) {
                c.container.html(c.errorNull);
            }
        };

        // 判断动态刷新框架高度
        if (window.top) {
            if (window.top.main) {
                if (typeof (window.top.main.autoSize) == "function") {
                    window.top.main.autoSize(false);
                }
            }
        };

        // 分页数据显示执行完后的回调方法
        if (typeof (c.callback) == 'function') {
            c.callback.apply(pager, arguments);
        };

        if (func) {
            func(pager,doc);
        }

        if (c.touchTip) {
            c.touchTip.hide();
        }

        //延迟加载
        if (typeof $e.lazy === 'function') {
            $e.lazy({
                deBug: true,
                throuTop: 200,
                errorImg: '/Static/Images/error.png'
            });
        }

        //滚动条刷新
        if (typeof (refresh) == 'function') {
            refresh();
        }

        //初始化UI
        if (typeof $e().customCheck === 'function') {
            $e(document).customCheck();
        }
    };

}(ECF, window);