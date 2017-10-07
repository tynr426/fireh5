/* 
    <reference path="/Static/Js/ECF.js" />
    <reference path="/Static/Js/ECF.forms.js" />
    1. 功能：后台管理公用js处理，主要放置系统中用到的公用处理方法
    2. 作者：谢鹏
    3. 创建日期：2011-11-29
    4. 最后修改者：谢鹏
    5. 最后修改日期：2015-2-27
    6. 版本号:2015.02.27.1

    * 在frm.add,frm.update 后添加finish 参数，用于使用正常的添加和修改完成后回调的方法来替换公用方法中提供的公用回调方法，回调方法中的this对像就是当前弹出层对象
    * 在物理删除方法上添加参数据 data 可以自行添加参数向后台传递
*/

//错误图片显示地址,此处必须要用到全局变量,防止error变量在不同函数中失效
var error = "/Static/Images/error.gif";

// 获取js路径
var jsPath = window['_js_path'] || (function (script, i, me) {

    for (i in script) {
        // 如果通过第三方脚本加载器加载本文件，请保证文件名含有"public"字符
        if (script[i].src && script[i].src.toLowerCase().indexOf('public') !== -1) me = script[i];
    };

    var _thisScript = me || script[script.length - 1];
    me = _thisScript.src.replace(/\\/g, '/');
    return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
}(document.getElementsByTagName('script')));


var iWindow = null;

if (typeof (imageDomain) == "undefined") imageDomain = '';

//公用的弹出以及其他相关处理
var pub = {
    //本页面的对话框对象
    _dialog: null,

    zIndex: 214748364,

    // 弹出层的宽度
    dlgWidth: '100%',

    dlgHeight: "auto",

    times: 2.5,

    win: (function () { return window; })(),

    //获取当前浏览器的最顶级窗口
    top: (function () {
        var _top = window;
        return _top;

        if (window.top) {
            _top = window.top;
        }
        else {
            _top = window.parent;
        }
        return _top;
    })(),

    iwin: function () {
        //获取最高层的window对象
        var _top = window;

        if (window.top) {
            _top = window.top;
        }
        else {
            _top = window.parent;
        }
        console.log(typeof (_top.$e));
        //判断window是否加载ECF框架
        if (_top.$e) {
            var $ifr = _top.$e('#contentIframe');
            //alert($ifr.length);
            if ($ifr.length > 0) {
                if ($ifr[0].contentWindow) {
                    return $ifr[0].contentWindow;
                }
                else {
                    return $ifr[0].window;
                }
            }
        }

        //独立页面时返回当前页面的window对象
        return window;
    },

    //获取主框架中的主体操作部分
    ifr: (function () {
        //获取最高层的window对象
        var _top = window;

        if (window.top) {
            _top = window.top;
        }
        else {
            _top = window.parent;
        }

        try {
            //判断window是否加载ECF框架
            if (_top.$e) {
                var $ifr = _top.$e('#contentIframe');

                if ($ifr.length > 0) {
                    if ($ifr[0].contentWindow) {
                        return $ifr[0].contentWindow;
                    }
                    else {
                        return $ifr[0].window;
                    }
                }
            }
        } catch (e) {

        }

        //独立页面时返回当前页面的window对象
        return window;

    })(),

    //获取弹出层时需要的按钮数组
    button: function (btns) {
        btns = btns || [];
        var ret = new Array();
        for (var i = 0; i < btns.length; i++) {
            ret.push({
                name: btns[i].name || "保存",
                callback: btns[i].callback || function () { this.close(); },
                arguments: btns[i].arguments || [],
                focus: btns[i].focus || true
            });
        }
        if (btns.length > 0) {
            ret.push({
                name: "取消",
                callback: function () { this.close(); },
                arguments: [],
                focus: false
            });
        }
        return ret;
    },

    /*
   在对话框中打开一个页面
   @1:	要打开的页面地址,也可以为一个{},其中包含所有的必要元素
   @2:	打开窗口的宽度
   @3:	打开窗口的高度
   @4:	打开窗口的标题
   @5:	在弹出层上需要展示的按钮
   @6:	子页面加载完成后需要执行的方法
   @7:	加载完成后执行方法的参数
   @8:	关闭时需要执行的方法
   */
    open: function (url, w, h, title, btns, loaded, loadArgs, closed) {

        var _top = pub.top,
			opts = {};

        // alert(window.location.pathname + ' == ' + _top.location.pathname);

        var fname = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')).toLowerCase();

        RootUrlDirectory = (typeof (RootUrlDirectory) == "undefined" ? "/Webadmin" : RootUrlDirectory);

        //用于判断是否应该加上../的处理,判断是否使用的框架
        if (window.location.pathname == _top.location.pathname && fname != '/main.aspx' && RootUrlDirectory.length == 0) {
            url = '../' + url;
        }

        //判断传入的第一个对象是否为object类型
        if (typeof (url) == "object") {
            opts = url;
        }
        else {
            opts = {
                url: url,
                width: w,
                height: h,
                title: title || 'title',
                minBtn: false,
                maxBtn: false,
                zindex: pub.zIndex,
                button: pub.button(btns),
                loaded: loaded || null,
                loadArguments: loadArgs || [],
                close: closed || function () { },
                win: window
            };
        }

        //打开一个页面
        _top.dialog = _top.ECF.dialog.open(opts);

        return _top.dialog;
    },

    /*
    alert提示信息
    @param1 提示信息内容
    */
    alert: function (content, error, times, func) {
        error = error || false;
        times = times || pub.times;
        pub.top.tip.show(content, error);

        var tipTimer = setInterval(function () {
            times--;
            //清除循环计时器
            if (times < 1) {
                pub.top.tip.hide();
                if (typeof (func) != 'undefined') {
                    func.apply();
                }
                try {	//IE8及以下不支持对象的clear方法
                    if (tipTimer) tipTimer.clearInterval();
                } catch (e) { clearInterval(tipTimer); }
            }
        }, 1000);
    },

    /*
    错误提示信息
    @param1 提示信息内容
    */
    error: function (content, times) {

        times = times || pub.times;
        pub.top.tip.show(content, true);
        var tipTimer = setInterval(function () {
            times--;
            //清除循环计时器
            if (times < 1) {
                pub.top.tip.hide();
                try {	//IE8及以下不支持对象的clear方法
                    if (tipTimer) { tipTimer.clearInterval(); }
                } catch (e) {
                    clearInterval(tipTimer);
                }
            }
        }, 1000);
    },

    /*
    弹出提示信息
    @param1	提示内容
    @param2 提示信息显示时间
    */
    tips: function (content, times, func) {

        times = times || pub.times;
        pub.top.tip.show(content, true);

        var tipTimer = setInterval(function () {
            times--;
            //清除循环计时器
            if (times < 1) {
                if (func) func();
                pub.top.tip.hide();
                try {	//IE8及以下不支持对象的clear方法
                    if (tipTimer) tipTimer.clearInterval();
                    tipTimer = null;
                } catch (e) { clearInterval(tipTimer); }
            }
        }, 1000);

    },
  
    /*
    */
    dialog: function (title, content, width, height, buttons, func, args) {

        var opts = null,
            _top = pub.top;

        if (arguments.length == 1 && $e.isObject(arguments[0])) {
            opts = arguments[0];
        }
        else {
            opts = {
                title: title || "标题",
                width: width || pub.dlgWidth,
                height: height || pub.dlgHeight,
                content: content,
                zindex: pub.zIndex,
                button: pub.button(buttons),
                completed: func,
                completes: args || [],
                animate: false,
                finish: {
                    method: function () {
                        var api = this,
                         acfg = api.config,
                         wrap = api.dom.wrap,
                         h = wrap[0].offsetHeight;
                        wrap.css('height', '0px')
                            .animate({ height: h + 'px' }, 300, function () {
                            });
                    }
                }
            };
        }


        if (_top.ECF.dialog) {
            //创建弹出层
            pub._dialog = _top.ECF.dialog(opts);
            //console.log("ds");
            pub._dialog.dom.content.forms();

        }
        else {
            alert("需要使用弹出层的页面没有加载相应的js");
        }

        if (typeof (opts.completed) == "function") {
            opts.completed.apply(pub._dialog, opts.completes);
        }



        return pub._dialog;
    },

    /*
    向一个弹出层中写入html数据
    @1  需要显示的html代码或Html元素
    @2  弹出层的宽度
    @3  弹出层的高度
    @4  弹出层的标题
    @5  需要处理的formid
    @6  只是在当前页面显示弹出层
    */
    html: function (title, content, width, height, buttons, func, curr) {

        var opt = {};

        if (arguments.length == 1 && $e.isObject(arguments[0])) {
            opt = arguments[0];
        }
        else {
            opt = {
                title: title || "标题",
                content: content,
                width: width || pub.dlgWidth,
                height: height || pub.dlgHeight,
                buttons: buttons,
                callback: func,
                current: false

            };
        }

        // 处理大量字符串传递
        if (typeof (opt.content) == "string") {
            var box = document.createElement("span");
            box.innerHTML = opt.content;
            opt.content = box;
        }

        if (arguments.length < 7) {
            //console.log(content);
            pub._dialog = pub.dialog(opt.title, opt.content, opt.width, opt.height, opt.buttons, opt.callback);

            //console.log(1);
        }
        else {
            if (arguments.length == 1 && $e.isObject(content)) {
                pub._dialog = pub.htmlValue(content);
            }
            else {
                pub._dialog = pub.htmlValue(content, width, height, title, null, buttons, isForm, curr);
            }
        }
        //console.log("2” +" + typeof (func));
        pub._dialog.dom.content.forms();

        // 加载显示完成后回调
        if (typeof (func) == "function") {
            func.apply(pub._dialog, []);
        }

        return pub._dialog;
    },



    //执行表单初始化操作
    forms: function (html, data) {

        var _forms, editor = true;

        //需要先把对象添加到页面后才能使用编辑器,否则会报错
        if (typeof (html) == "string") {
            _forms = $e("#" + html).forms(data);
        }
        else {
            _forms = $e(html).forms(data);
        }

        return _forms;
    },

    /*
    弹出一个html对象的层,并把相应的值赋给hml中的对象里的相应容器中
    @1  需要显示的html代码或Html元素
    @2  弹出层的宽度
    @3  弹出层的高度
    @4  弹出层的标题
    @5  要赋的值
    6 { callback:func,arguments: args }
    */
    htmlValue: function (html, w, h, t, val, btns, isForm, curr) {
        //alert(html);
        var dfs, _fs, div,
            isf = isForm || true, //用于判断是否加载Forms
            isEditor = true,
            data = val || null,
            opts = {},
             _top = pub.top;

        try {
            //alert(arguments.length );
            //只传入一个object对象的处理
            if (arguments.length == 1 && ECF.isObject(html)) {
                opts = html;
                //此方法中的button的执行方法中的this对象是返回的弹出层对象
                //this.dom.content[0]可以取到弹出层里的内容
                //例如 使用这样的方法可以跨iframe取到显示在主界面里对象的值
                // var fs = new ECF.forms({ "selector": this.dom.content[0] });
                // alert(fs.getValues());
                // return;  在已经写的方法中不再去做这些元素的修改和处理,可以在上面的buttons中添加callback方法为pub.top.方法
                //这样就可以达到让此方法在主窗体上进行执行
                //如果直接给定了button对象就不再进行按钮的处理
                if (!opts.button) {
                    opts.button = pub.button(opts.buttons);
                }
                //需要把node元素赋值到div对象方便Forms使用
                div = opts.content;
                //to do 还待验证
                isf = opts.isForm || true;
                isEditor = opts.isEditor;
                //alert(

                //把传入的值赋给val
                data = html.value;
                //从对象中删除value
                html.value = null;
            }
            else {

                //生成弹出层的对执行对象
                opts = {
                    title: t,
                    width: w,
                    height: h,
                    content: html,
                    zindex: pub.zIndex,
                    button: pub.button(btns)
                }; //判断是否在当前窗口显示弹出层
                if (curr) {
                    _top = window;
                }
                div = html;
            }

            //alert(opts.width);
            //判断弹出层对象是否存在
            if (_top.ECF.dialog) {

                //创建弹出层
                dialog = pub._dialog = _top.ECF.dialog(opts);

                if (isf) {
                    //执行创建表单
                    forms = pub._forms = pub.forms(div, data);
                }
            }
            else {
                alert("需要使用弹出层的页面没有加载相应的js");
            }

            return dialog;
        } catch (e) {
            throw e;
            alert('pub.html error info : ' + e);
        }
    },

    /*
        关闭弹出层
    */
    close: function () {
        if (pub.top.dialog) {
            pub.top.dialog.close();
            return;
        }
        if (pub._dialog)
            pub._dialog.close();
        if (parent.dialog) {
            parent.dialog.close();
        }
    },

    /*
        公共在批量删除数据后重新绑定列表的方法
    */
    rebind: function () {

        try {
            var ifrs = $e("iframe");

            if (ifrs.length > 0) {
                //获取框架里的Grid
                var iwin = ifrs[0].contentWindow;

                if (iwin && iwin.EGrid1) {
                    iwin.EGrid1.reBind();
                }
                else if (EGrid1) {
                    EGrid1.reBind();
                }
                else {
                    ifrs[0].src = ifrs[0].src;
                    ifrs[0].location.reload();
                }
            }
            else {
                if (EGrid1) {
                    EGrid1.reBind();
                }
                else {
                    window.location.reload();
                }
            }
        }
        catch (e) { }
    },

    //公用的刷新页面方法,后期会扩展为刷新Grid的方法
    refresh: function () {
        try {

            if (typeof (window.loadData) == "function") {
                window.loadData.apply();
            }
            else {
                var ifrs = $e("iframe");

                if (ifrs.length > 0) {
                    //获取框架里的Grid
                    var iwin = ifrs[0].contentWindow;

                    if (iwin && iwin.EGrid1) {
                        iwin.EGrid1.refresh();
                    }
                    else {
                        ifrs[0].src = ifrs[0].src;
                        ifrs[0].location.reload();
                    }
                }
                else {
                    if (EGrid1) {
                        EGrid1.refresh();
                    }
                    else {
                        window.location.reload();
                    }
                }
            }

        }
        catch (e) { }
    },

    /*
        保留n位小数
        @1: 数据
        @2: 保留位数
    */
    formatNum: function (total, n) {
        total = String(total.toFixed(n));
        var re = /(\d+)(\d{100})/;
        return total.replace(re, "$2");
    },

    /*
        是否处理的判断提示
        @1: 提示内容
        @2: 确定执行的方法
        @3: 取消执行的方法
    */
    confirm: function (text, yes, no, title) {
        if (typeof (yes) == "function" && typeof (no) == "function") {
            var _top = pub.top;
            if (typeof (title) != "string") {
                title = "提示信息";
            }
            _top.ECF.dialog.confirm(title, "<div class=\"dilog-titles\">" + text + "</div>", yes, no);
            return false;
        }
        else {
            if (confirm(text)) {
                return true;
            }
            else {
                return false;
            }
        }
    },

    // 默认图片
    defImgSrc: "/Static/Upload/DefaultPreviw.png",


    /* 
        缩略图替换处理 by xp 20120806
        @1 需要替换的目标地址
        @2 要替换的大小,如80X80
    */
    scaleReplace: function (s, a) {
        if (s == undefined || s.length == 0)
            return "";
        var ps = s.split('.');
        if (ps.length == 2) {
            return s + '_' + a + '.' + ps[1];
        }
        return s;
    },

    /*
        简单版tab切换
        @1: 当前对象
        @2: 需要执行的方法
    */
    tabChange: function (o, func) {
        var $o = $e(o);

        // 还原所有的显示
        $o.parent().find("li").each(function () {
            var l = $e(this),
                pid = l.attr("pannelId");
            if (pid != null && pid != "") {
                $e("#" + pid).hide();
            }
            l.removeClass("select");
        });

        $o.addClass("select");

        //设置对应的区域块显示
        var pd = $o.attr("pannelId");
        if (pd != null && pd != "") {
            $e("#" + pd).show();
        }

        //console.log(func);

        // 如果有回调方法执行
        if (typeof (func) == "function") {
            func.apply(o, []);
        }

        // 判断动态刷新框架高度
        if (window.top) {
            if (window.top.main) {
                if (typeof (window.top.main.autoSize) == "function")
                    window.top.main.autoSize();
            }
        }
    },

    // 判断动态刷新框架高度
    autoSize: function () {
        // 判断动态刷新框架高度
        if (window.top) {
            if (window.top.main) {
                if (typeof (window.top.main.autoSize) == "function")
                    window.top.main.autoSize();
            }
        };
    },

    // 临时Tr列表
    _listTr: null,

    // 用于在tr列表中插入显示行的详情
    listHtml: function (o, html, colspan, parentId, cssName) {

        if (pub._listTr) {
            pub._listTr.remove();
        }

        var cssName = 'expchild exp-on';
        var tr = document.createElement("tr"), td = document.createElement("td"), $tr = $e(tr), $td = $e(td);
        tr.className = cssName;
        $tr.attr("extendlist", parentId);
        $td.attr("colspan", colspan);

        $td.html(html);
        $tr.append($td[0]);

        // 记录全局变量下一下插入时需要删除已存在的对象
        pub._listTr = $tr;

        if (o.tagName == "TR")
            $e(o).after($tr[0]);
        else {
            var $o = $e(o);
            $o = $o.parent("tr");
            $o.after($tr[0]);
        }

        if (tableLimitList) tableLimitList();

        //计算高度
        if (window.parent) {
            if (window.parent.main) {
                if (typeof (window.parent.main.autoSize) === 'function')
                    window.parent.main.autoSize();
            }
        }
    }
};

//通用表单处理
var frm = {

    // 状态开关切换
    onoff: function (btn, valId) {
        var obj = null;
        if (btn.nodeName == "SPAN") {
            obj = $e(btn).parent();
        }
        else {
            obj = $e(btn);
        }

        var val = 1;

        if (obj.hasClass('target-on')) {
            obj.removeClass('target-on');
            obj.addClass('target-off');
            val = 0;
        }
        else if (obj.hasClass('target-off')) {
            obj.removeClass('target-off');
            obj.addClass('target-on');
            val = 1;
        }

        if (valId) {
            $e("#" + valId).value(val);
        }

    },

    /*
        切换数据状态
        @1: 切换点击对象
        @2: 需要切换数据的Id
        @3: 需要切换的状态
    */
    switchStatus: function (btn, id, status, func) {
        var info = "开启";
        //pub.top.tip.show();
        // 处理状态切换
        status = (status == 0 ? 1 : 0);

        if (status == 0) {
            info = "关闭";
        };

        //pub.confirm("您确定要" + info + "状态吗?", function () {
        if (btn) {
            // 处理按钮显示
            frm.onoff(btn);
        }

        var ld = window.loadData;

        // 更新状态数据
        $e.ajax({
            dataType: "xml",
            data: "<action>updstatus</action><Id>" + id + "</Id><Status>" + status + "</Status>",
            loading: function () {
                if (btn && btn.disabled) {
                    btn.disabled = true;
                }
            },
            success: function () {

                if (btn && btn.disabled) {
                    btn.disabled = false;
                }
                if (arguments[1].text == 1) {

                    pub.top.pub.alert("操作成功.");

                    if (typeof (ld) == "function") {
                        ld.apply();
                    }
                    //console.log(typeof (pub.refresh));
                    if (typeof (pub.refresh) == "function") {
                        pub.refresh.apply();
                    }

                } else {
                    pub.top.pub.error("操作失败.");
                }


                if (typeof (func) == "function") {
                    func.apply(btn, []);
                }


            },
            error: function () {
                pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                if (btn && btn.disabled) {
                    btn.disabled = false;
                }
            }
        });
        //}, function () { });
    },

    /*
        添加数据
        @1: 弹出层标题
        @2: 表单id
        @3: 自定义更新提交时的动作
        @4: 请求的页面路径
        @5: 请求执行完后的回调方法
        @6: 请求执行后加调方法参数
        @7: 宽度
        @8: 度度
    */
    add: function (title, formId, action, url, func, args, width, height, cback) {

        var opt = null;

        if (arguments.length == 1 && $e.isObject(arguments[0])) {
            // console.log(arguments[0]);
            opt = arguments[0];
        }
        else {
            opt = {
                title: title,
                formId: formId,
                action: action || "insert",
                arguments: args,
                width: width || pub.dlgWidth,
                url: url || window.location.pathname,
                height: height || "auto",
                // 添加成功后的回调方法
                callback: func,
                finish: cback

            };
        }

        if (opt.formId == null || opt.formId == "") {
            pub.top.pub.error("表单参数错误");
            return;
        }


        opt.url = opt.url || window.location.pathname;
        opt.html = $e("#" + opt.formId).html();

        if (opt.html == null || opt.html == "") {
            pub.top.pub.error("模板参数据错误");
            return;
        }


        var div = document.createElement("div");
        div.className = "forms";
        div.innerHTML = opt.html;

        // 处理页面加载时的数据处理,即刷新操作
        if (typeof (loadData) == "function") {
            opt.load = loadData;
        }


        // 添加按钮
        opt.buttons = [{
            "name": "添加", "focus": true, "callback": opt.callback || function () {
                var content = this.dom.content;
                var bopt = {
                    url: opt.url,
                    action: opt.action,
                    dataType: "xml",
                    data: opt.data || '',
                    callback: opt.finish || function () {

                        if (arguments[0][1].text > 0) {

                            if (typeof (opt.load) == "function") {
                                opt.load.apply();
                            }

                            if (typeof (pub.refresh) == "function") {
                                pub.refresh.apply();
                            }

                            pub.top.pub.alert("添加数据成功;");

                            var dlg = arguments[arguments.length - 1];
                            if (dlg) {
                                dlg.close();
                            }
                        }
                        else if (arguments[0][1].text == -1) {
                            pub.top.pub.error("不允许出现项目名称数据");
                        }
                        else {
                            pub.top.pub.error("添加数据失败");
                        }

                    },
                    arguments: [this],
                    button: arguments[arguments.length - 1]
                };
                // 提交修改的数据
                content.ajaxPost(bopt);
            }
        }];
        pub.dialog(opt.title, div, opt.width, opt.height, opt.buttons, opt.completed, []);

    },

    /*
        获取并更新数据
        @1: 弹出层标题
        @2: 表单id
        @3: 更新数据的id
        @4: 自定义更新提交时的动作
        @5: 请求的页面路径
        @6: 请求执行完后的回调方法
        @7: 请求执行后加调方法参数
        @8: 宽度
        @9: 度度
        @10： 按钮显示文字
        @11： 添加数据完成后回调
    */
    update: function (title, formid, id, action, url, func, args, width, height, buttonValue, cback) {

        var opt = null;

        if (arguments.length == 1 && $e.isObject(arguments[0])) {
            opt = arguments[0];
        }
        else {
            opt = {
                title: title,
                formId: formid,
                id: id,
                action: action || "update",
                callback: func,
                arguments: args,
                width: width || pub.dlgWidth,
                height: height || "auto",
                finish: cback
            };
        }

        if (opt.id < 1) {
            pub.top.pub.error("参数错误");
            return;
        }

        opt.url = opt.url || (url || window.location.pathname);
        opt.html = $e("#" + opt.formId).html();

        // 此处理可以在传入object对象时不需要指定action对象
        opt.action = opt.action || "update";


        if (opt.html == null || opt.html == "") {
            pub.top.pub.error("模板参数据错误");
            return;
        }

        if (typeof (loadData) == "function") {
            opt.load = loadData;
        }



        $e.ajax({
            url: opt.url,
            dataType: "xml",
            data: "<action>detail</action><Id>" + opt.id + "</Id>",
            loading: function () {
                //tip.show("数据加载中...");
            },
            success: function () {

                var doc = (arguments[1].xml ? arguments[1].xml : arguments[1].text);

                var div = document.createElement("div");
                div.className = "forms";
                div.innerHTML = opt.html;

                if (ECF.isArray(opt.completes)) {
                    opt.completes.push(doc);
                }
                else {
                    opt.completes = [doc];
                }

                $e(div).setValues(doc);

                // typeof(null) = object
                if (typeof (opt.buttons) == "undefined") {

                    // 处理数据保存按钮
                    opt.buttons = [{
                        "name": buttonValue || "保存", "focus": true, "callback": opt.callback || function () {
                            var content = this.dom.content;
                            var bopt = {
                                url: opt.url,
                                action: opt.action,
                                dataType: "xml",
                                callback: opt.finish || function () {

                                    if (arguments[0][1].text > 0) {

                                        if (typeof (opt.load) == "function") {
                                            opt.load.apply();
                                        }

                                        //if (typeof (pub.refresh) == "function") {
                                        //    pub.refresh.apply();
                                        //}

                                        pub.top.pub.alert("修改数据成功");
                                        var dlg = arguments[arguments.length - 1];
                                        if (dlg) {
                                            dlg.close();
                                        }
                                    }
                                    else if (arguments[0][1].text == -1) {
                                        pub.top.pub.error("不允许出现项目名称数据");
                                    }
                                    else {
                                        pub.top.pub.error("修改数据失败");
                                    }
                                },
                                arguments: [this],
                                button: arguments[arguments.length - 1]
                            };
                            // 提交修改的数据
                            content.ajaxPost(bopt);
                        }
                    }];
                }

                pub.dialog(opt.title, div, opt.width, opt.height, opt.buttons, opt.completed, opt.completes);


            },
            error: function () {
                pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
      删除数据
      @1： 需要删除数据的Id
      @2： 删除后需要回调的方法
    */
    del: function (id, func) {
        pub.confirm("您确定要删除数据吗?", function () {

            var opt = {};

            if (typeof (loadData) == "function") {
                opt.load = loadData;
            }


            // 更新状态数据
            $e.ajax({
                dataType: "xml",
                data: "<action>delete</action><Id>" + id + "</Id>",
                loading: function () {

                },
                success: function () {
                    if (arguments[1].text > 0) {

                        pub.top.pub.alert("删除数据成功");

                        if (typeof (opt.load) == "function") {
                            opt.load.apply();
                        }

                        if (typeof (pub.refresh) == "function") {
                            pub.refresh.apply();
                        }

                        if (typeof (func) == "function") {
                            func.apply(this, []);
                        }
                    }
                    else {
                        pub.top.pub.error("删除数据失败");
                    }

                },
                error: function () {
                    pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function () { });
    },

    /*后台高级查询、回收站、批量查找、物理删除、还原*/

    //批量删除
    batchDel: function (func) {

        var ids = frm.getCheckedIds();

        if (ids.length == 0) return;


        pub.confirm("您确定要删除数据吗?", function () {

            var opt = {};

            if (typeof (loadData) == "function") {
                opt.load = loadData;
            }


            // 更新状态数据
            $e.ajax({
                dataType: "xml",
                data: "<action>batchdel</action><strId>" + ids + "</strId>",
                loading: function () {

                },
                success: function () {
                    if (arguments[1].text > 0) {

                        pub.top.pub.alert("删除数据成功");

                        if (typeof (opt.load) == "function") {
                            opt.load.apply();
                        }

                        if (typeof (pub.refresh) == "function") {
                            pub.refresh.apply();
                        }

                        if (typeof (func) == "function") {
                            func.apply(this, []);
                        }
                    }
                    else {
                        pub.top.pub.error("删除数据失败");
                    }

                },
                error: function () {
                    pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function () { });
    },

    //获取已选择的Id
    getCheckedIds: function () {

        var strId = "";

        var checks = ECF("input[name='Id']");

        ECF.each(checks, function () {
            var div = ECF(this).parent();

            if (div.hasClass("checked")) {
                strId += this.value + ",";
            }
        });

        if (strId.lastIndexOf(",") == strId.length - 1) {
            strId = strId.substr(0, strId.length - 1);
        }

        if (strId.length == 0) {
            pub.top.pub.error("请选择需要操作的数据");
            return "";
        }

        return strId;
    },

    /*
      物理删除数据
      @1： 需要删除数据的Id
      @2： 删除后需要回调的方法
      @3:  特定数据
    */
    physicalDel: function (id, func, data) {
        pub.confirm("您确定要删除数据吗?", function () {

            var opt = {};

            if (typeof (loadData) == "function") {
                opt.load = loadData;
            }

            var xml = "<action>physicdel</action><Id>" + id + "</Id>" + (typeof (data) == "string" ? data : "");

            // 更新状态数据
            $e.ajax({
                dataType: "xml",
                data: xml,
                loading: function () {

                },
                success: function () {
                    if (arguments[1].text > 0) {

                        pub.top.pub.alert("删除数据成功");

                        frm.refresh(func, opt);
                    }
                    else {
                        pub.top.pub.error("删除数据失败");
                    }

                },
                error: function () {
                    pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function () { });
    },

    /*
      物理删除数据
      @1： 需要删除数据的Id
      @2： 删除后需要回调的方法
    */
    batchPhysicalDel: function (func) {

        var ids = frm.getCheckedIds();

        if (ids.length == 0) return;

        pub.confirm("您确定要删除数据吗?", function () {

            var opt = {};

            if (typeof (loadData) == "function") {
                opt.load = loadData;
            }


            // 更新状态数据
            $e.ajax({
                dataType: "xml",
                data: "<action>batchphysicdel</action><strId>" + ids + "</strId>",
                loading: function () {

                },
                success: function () {
                    if (arguments[1].text > 0) {

                        pub.top.pub.alert("删除数据成功");

                        frm.refresh(func, opt);
                    }
                    else {
                        pub.top.pub.error("删除数据失败");
                    }

                },
                error: function () {
                    pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function () { });
    },

    /*
     恢复删除数据
     @1： 需要恢复删除数据的Id
     @2： 恢复后需要回调的方法
   */
    revert: function (id, func) {

        var opt = {};

        if (typeof (loadData) == "function") {
            opt.load = loadData;
        }


        // 更新状态数据
        $e.ajax({
            dataType: "xml",
            data: "<action>revert</action><Id>" + id + "</Id>",
            loading: function () {

            },
            success: function () {
                if (arguments[1].text > 0) {

                    pub.top.pub.alert("恢复数据成功");

                    frm.refresh(func, opt);
                }
                else {
                    pub.top.pub.error("恢复数据失败");
                }

            },
            error: function () {
                pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
    批量恢复删除数据
    @1： 批量恢复后需要回调的方法
  */
    batchRevert: function (func) {

        var ids = frm.getCheckedIds();

        if (ids.length == 0) return;

        var opt = {};

        if (typeof (loadData) == "function") {
            opt.load = loadData;
        }

        // 更新状态数据
        $e.ajax({
            dataType: "xml",
            data: "<action>batchrevert</action><strId>" + ids + "</strId>",
            loading: function () {

            },
            success: function () {
                if (arguments[1].text > 0) {

                    pub.top.pub.alert("恢复数据成功");

                    frm.refresh(func, opt);

                }
                else {
                    pub.top.pub.error("恢复数据失败");
                }

            },
            error: function () {
                pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
    刷新列表
    @1： 批量恢复后需要回调的方法
    */
    refresh: function (func, opt) {
        if (typeof (func) == "function") {
            func.apply(this, []);
        } else {
            if (typeof (pub.refresh) == "function") {
                pub.refresh.apply();
            }
            if (typeof (opt.load) == "function") {
                opt.load.apply();
            }
        }
    },

    //高级查询全部数据
    loadAllData: function () {
        //清空筛选框
        //$e('#filterForm').formReset();
        //重新筛选
        $e('#filterForm').filter(function () {
            $e("#filterHidden").value("");
        });
    },

    /*后台高级查询、回收站、批量查找、物理删除、还原*/

    /*
      用ajax向后台提交数据,以xml格式提交
      @1： 动作
      @2： 数据
      @3: 提交地址
      @4: 回调方法
    */
    post: function (action, data, url, func) {

        var opt = {};

        if (typeof (loadData) == "function") {
            opt.load = loadData;
        }

        // 更新状态数据
        $e.ajax({
            url: url,
            dataType: "xml",
            data: "<action>" + action + "</action>" + data,
            loading: function () {

            },
            success: function () {

                // 有回调函数直接走回调
                if (typeof (func) == "function") {
                    func.apply(this, arguments);
                }
                else { // 无回调直接使用系统提供
                    if (arguments[1].text > 0) {

                        pub.top.pub.alert("数据处理成功");

                        if (typeof (opt.load) == "function") {
                            opt.load.apply();
                        }

                        if (typeof (pub.refresh) == "function") {
                            pub.refresh.apply();
                        }
                    }
                    else if (arguments[1].json) {
                        var json = arguments[1].json;
                        if (json.code != "error") {
                            pub.top.pub.tips(json.msg);
                        }
                        else {
                            pub.top.pub.error(json.msg);
                        }
                    }
                    else {
                        pub.top.pub.error("数据处理失败");
                    }
                }

            },
            error: function () {
                pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    }


};

// 基于业务的数据加载扩展
ECF.extend($e.fn, {
    /*
        加载列表数据
        @1: 需要进行绑定的模板id
        @2: 需要带到后台的
        @3: 请求动作
        @4: 执行完回调方法
        @5: 执行方法回调参数
        @6: 请求地址
    */
    loadList: function (templateId, data, action, func, args, url) {

        if (this.length < 1) {
            alert("数据错误");
            return;
        }

        var opt = {
            templateId: templateId
        };

        if (arguments.length == 1 && $e.isObject(arguments[0])) {
            if (typeof (arguments[0]) == "string") {
                opt.templateId = arguments[0];
                opt.action = action || "loaddata";
            } else {
                opt = arguments[0];
            }
        }
        else {
            opt.url = url;
            opt.action = action || "loaddata";
            opt.callback = func;
            opt.arguments = args;
            opt.data = data;
        }

        if (opt.templateId == null || opt.templateId == "") {
            alert("模板参数错误");
            return;
        }

        var my = this,
            sendData = "<action>" + opt.action + "</action>" + opt.data;

        //console.log(sendData);

        $e.ajax({
            url: opt.url,
            dataType: "xml",
            data: sendData,
            loading: function () {
                my.html("数据获取中...");
            },
            success: function () {

                var doc = arguments[1].xml ? arguments[1].xml : arguments[1].text,
                    json = null;
                if (typeof (doc) == "string") {
                    json = ECF.parseJSON(arguments[1].text);
                }
                else {
                    json = ECF.xml.toJson(doc);
                }

                opt.html = $e("#" + opt.templateId).html();

                if (opt.html == null || opt.html == "") {
                    alert("模板数据为空");
                    return;
                }

                if (json) {
                    my.html(jte(opt.html, json));
                }
                else {
                    my.html("没有数据");
                }
                if (typeof (func) == "function") {
                    func.apply(this, arguments);
                }

                if (window.parent) {
                    if (window.parent.main) {
                        if (typeof (window.parent.main.autoSize) === 'function')
                            window.parent.main.autoSize();
                    }
                }
            },
            error: function () {
                my.html("数据获取失败...");
            }
        });
    },

    /*
        加载分页列表数据
        @1: 需要进行绑定的模板id
        @2: 分页条显示id
        @3: 需要执行的条件
        @4: 状态字符特殊处理
        @5: 每页显示条数
    */
    loadPage: function (templateId, pagebarId, conditions, status, pagesize) {

        var ofilter = $e("#filterHidden"), filter = "";

        if (ofilter.length > 0) {
            filter = ofilter.val();
        }

        if (typeof (status) == "undefined" || status == null) {
            filter += "<Status>all</Status>";
        }
        else if (status != "" && filter.toLowerCase().indexOf("<status>") < 0) {
            filter += "<Status>" + status + "</Status>";
        }

        filter = (filter != "" ? "<Filter>" + filter + "</Filter>" : "");

        // 判断列表加载是否为第一次页面加载
        if (window.pages && window.pages[this.selector + conditions + filter]) {

            window.pages[this.selector + conditions + filter].query(conditions + filter);

        }
        else {

            if (!window.pages) window.pages = [];

            var func = (typeof (definedCheckbox) != "undefined" && typeof (definedCheckbox.reset) == "function" ? definedCheckbox.reset : function () { });
            window.pages[this.selector + conditions + filter] = this.page(templateId, pagebarId, conditions + filter, pagesize, func);
        }
    },
    /*
         加载分页列表返回数据为IResultRespone格式专项处理 wchao by 2017-06-01
         @1: 需要进行绑定的模板id
         @2: 分页条显示id
         @3: 需要执行的条件
         @4: 状态字符特殊处理
         @5: 每页显示条数
         @6: 通过Ajax获取数据后执行函数处理,将传入page对象
         @7: 分页数据请求页面
         @8：需要加载的滚动条对象
         @9: 是否启用滚动条
     */
    resultPage: function (templateId, pageBarId, conditions, pageSize, callback, callPage, scrollTarget, isScroll) {
        isScroll = (isScroll === true);
        var dox = $e(this);
        this.page({
            templateId: templateId,
            pageBarId: pageBarId,
            data: conditions,
            pageSize: pageSize,
            callback: callback,
            callPage: callPage,
            scrollTarget: scrollTarget,
            isScroll: isScroll,
            showData: function (result, ele, append, func) {
                if (result.Success) {
                    var d = result.Content;
                    var data = d.data;
                    if (d == null || data == null || data.length < 1) {
                        dox.html("<div class='errornull'>{0}</div>".format('暂无数据'));
                    } else {
                        var c = this._config;
                        c.isScroll = isScroll;
                        c.records = d.count; // 获取总记录数
                        c.pages = Math.ceil(c.records / c.pageSize); // 计算总页数
                        this.pages = c.pages;
                        this.reset(c);
                        var html = jte($e("#" + templateId).html(), data);
                        if (c.pageIndex <= 1 || c.isScroll == false) {//非滚动或初始index过盖
                            dox.html(html);
                        } else
                            dox.append(html);


                        if (func) {
                            func(this, result);
                        }

                        if (typeof(callback) == "function") {
                            callback(this, result);
                        }

                    }
                } else {
                    dox.html("<div class='errornull'>{0}</div>".format(result.Message == '失败' ? "暂无数据" : result.Message));
                }
            }
        });
    },
    /*
        分页列表高级查询
    */
    filter: function (func) {

        // 表单验证判断
        if (!this.formValidate()) {
            pub.error("表单数据不正确");
            return;
        }

        var data = this.getValues("xml", false);

        var pfh = $e("#filterHidden");
        if (pfh.length < 1) {
            this.after("<input type=\"hidden\" id=\"filterHidden\" value=\"" + data + "\" />");
        }
        else {
            pfh.val(data);
        }

        if (typeof (func) == "function") {
            func.apply();
        }

        if (typeof (window.loadData) == "function") {

            if ($e.page) {
                $e.page.defaults.pageIndex = 1;
            }

            window.loadData.apply();
        }

    }
});

//地区js操作对象
var area = {

    //加载省市区信息
    loadArea: function (pctrl, ctrlId, isValue, value, url) {
        //获取子元素
        var parentId = '0',
            ctl = $e("#" + ctrlId);
        if (ctl.length == 0) {
            ctl = top.$e("#" + ctrlId);
        }
        if (ctl.length < 1) return; //当没有找到控件对象时直接跳出处理

        //加载顶级处理
        if (pctrl != null) {
            //从parentId属性中获取父级Id
            var trims = pctrl.options[pctrl.selectedIndex].getAttribute("parentId");
            if (trims != null) {
                parentId = trims.trim();
            }
        }

        if (parentId == "-1") return; //当父级对象为空时不处理

        //ajax请求地区数据
        $e.ajax({
            url: 'Core.axd',
            data: '<action>area.list</action><parentid>' + parentId + '</parentid>',
            dataType: 'xml',
            async: false,
            success: function () {
                var req = arguments[1],
					areaList = $e.parseJSON(req.text);
                //判断是否为正确的Json格式
                if (areaList.length > 0) {
                    if (top.$e("#" + ctrlId).length == 0) {
                        $e("#" + ctrlId)[0].options.length = 0;
                    }
                    else {
                        top.$e("#" + ctrlId)[0].options.length = 0;
                    }
                    ctl.append("<option parentId='-1' value='-1' >请选择</option>");
                    $e.each(areaList, function (i) {
                        if (areaList[i].Name == value) {
                            ctl.append('<option value="' + (isValue ? areaList[i].CodeId : areaList[i].Name) + '" parentId="' + areaList[i].CodeId + '" selected >' + areaList[i].Name + '</option>');
                            //ctl.trigger('change');
                        }
                        else {
                            ctl.append('<option value="' + (isValue ? areaList[i].CodeId : areaList[i].Name) + '" parentId="' + areaList[i].CodeId + '" >' + areaList[i].Name + '</option>');
                        }
                    });
                }
            },
            error: function () {
                pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1], 1.5);
            }
        });
    },

    //显示省市区信息
    showArea: function () {
        area.loadArea(null, 'Province', false);
    },

    //设置地区值
    setArea: function (ctrlId, val, txt, div) {
        var ctl;
        if (div) {
            ctl = $e("#" + ctrlId, div);
        }
        else {
            ctl = top.$e("#" + ctrlId);
        }

        if (ctl.length == 0)
            ctl = $e("#" + ctrlId);

        if (ctl[0].options.length > 0) {
            for (var i = 0; i < ctl[0].length; i++) {
                if (ctl[0][i].value == val) {
                    //后台传过来的数据
                    ctl[0][i].selected = true;
                }
            }
        }
    }
};

//上传文件和文件(图片)的选择管理
var files = {
    /*
    文件选择
    @1: 最多可选择文件数
    @2: 需要上传和选择文件的模块
    @3: 元素
    @4: 数据
    @5: 标题
    @6: 宽度
    @7: 高度
    @8: 回调方法
    @9: 要上传或选择的文件类型,多个文件类型以|相隔
    */
    select: function () {
        var c;
        if (arguments.length == 1 || $e.isObject(arguments[0])) {
            c = arguments[0];
        }
        else {
            c = {};
            c.fileCount = arguments[0];
            c.module = arguments[1];
            c.element = arguments[2];
            c.data = arguments[3];
            c.title = arguments[4];
            c.width = arguments[5];
            c.height = arguments[6];
            c.callback = arguments[7];
            c.fileTypes = arguments[8];
        }
        //alert(arguments[0].module);
        // alert(c.module + ' + ' + c.callback)
        c.fileTypes = c.fileTypes || '';
        c.arguments = c.arguments || [];
        c.callback = c.callback || null;
        c.title = c.title || '图片选择';
        c.width = c.width || 800;
        c.height = c.height || 600;
        c.module = c.module || 'public';
        c.fileCount = c.fileCount || 1;

        search = 'module=' + c.module + '&count=' + c.fileCount;
        // alert(c.module);

        if (c.fileTypes != "") {
            search += '&type=' + c.fileTypes;
        }

        var url = (typeof (RootUrlDirectory) == "undefined" ? "/Webadmin" : RootUrlDirectory) + "/Material/Album.aspx?";

        //用于先把上传的Flash控件给清除,否则在ie下会出现 __flash__removeCallback 未定义
        function clearFlash() {
            if (arguments[0] && arguments[0].$e) {
                arguments[0].$e("#upload").remove();
            }
        }

        pub.open(url + search, c.width, c.height, c.title, [{ callback: files.selectCallback, name: '确定', arguments: [c], focus: true }], files.loadSelect, [c.data], clearFlash);
    },

    //文件选择页面加载完成后执行的方法
    loadSelect: function () {
        var win = this,
            srcs = '|' + arguments[0] + '|';

        if (win.$e) {
            //console.log(win.$e('input[type="checkbox"]').length);
            win.$e('input[type="checkbox"]').each(function () {
                //console.log(srcs.indexOf('|'+this.value+'|'));
                if (srcs.indexOf('|' + this.value + '|') > -1) {
                    this.checked = true;
                }
            });
        }

    },

    selectImg: function (win) {
        var imageIds = "";
        var from = win.ECF("#DataFrom");
        var childrens = from.children();

        for (var i = 0; i < childrens.length; i++) {
            if (childrens[i].attr("type") == "Images" && childrens[i].attr("class") == "select") {
                imageIds += childrens[i].children()[1].value() + (i < childrens.length - 1 ? "|" : "");
            }
        }

        //去掉字符串末尾的“|”
        if (imageIds.lastIndexOf("|") == imageIds.length - 1) {
            imageIds = imageIds.substr(0, imageIds.length - 1);
        }

        return imageIds;
    },

    //选择页面的确定按钮处理方法
    selectCallback: function (c) {
        var win = this.iwindow || window,
            count = c.fileCount,
            srcs = files.selectImg(win);

        //判断是否选择了图片
        if (srcs.length == 0) {

            pub.top.pub.error("请选择图片后再确定！");
            return;
        }

        //判断选择图片的张数

        if (count > 0 && srcs.split("|").length > count + 1) {
            pub.top.pub.error("一次最多只能选择" + count + "张图片！");
            return;
        }

        if (c.element) {
            if (typeof (c.element) == "string") {
                var $el = [],
                    selector = "#" + c.element + ',[name="' + c.element + '"]';

                // 从最顶层获取对象
                $el = pub.top.$e(selector);
                if ($el.length < 1) {
                    //如果最顶层获取不到对象就获获取框架内的
                    $el = pub.iwin().$e(selector);
                    if ($el.length < 1) {
                        $el = $e(selector);
                    }
                }

                //$el.each(function(){    //用于处理图片时加上图片服务器地址
                //    //alert(this.tagName);
                //    if(this.tagName ==  "IMG"){
                //        this.src = imageDomain + srcs;
                //    }
                //    else{
                //        this.value = srcs;
                //    }
                //});

                $el.value(srcs);
            }
            else {
                $e(c.element).value(srcs);
            }
        }

        if (ECF.isArray(c.arguments)) {
            c.arguments.push(srcs);
        }

        files.upUseTime(srcs, c.module);

        if (typeof (c.callback) == "function") {
            c.callback.apply(this, c.arguments);
        }

        this.close();
    },

    // 更新图片的使用时间
    upUseTime: function (src, module) {
        //var url = '../Core/SelectFiles.aspx';
        //var fname = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')).toLowerCase();

        ////用于判断是否应该加上../的处理,判断是否使用的框架
        //if (window.location.pathname == pub.top.location.pathname && fname != '/main.aspx') {
        //    url = '../' + url;
        //}

        ECF.ajax({
            url: imageDomain + '/MaterialService.axd',
            data: '<action>imgusetime</action><srcs><![CDATA[' + src + ']]></srcs><module>' + module + '</module>',
            dataType: "xml",
            success: function () {
            }
        });
    },

    // 删除图片
    deleteFile: function (o, id, src) {
        pub.confirm("删除已选择的文件或图片后,会导致图片或文件无法访问,您确定要删除吗？", del, function () { });

        function del() {
            if (id < 1 || src == '') return;
            ECF.ajax({
                data: '<action>delete</action><Id>' + id + '</Id><Src><![CDATA[' + src + ']]></Src>',
                dataType: "xml",
                loading: function () {
                    tip.show("数据处理中 ...");
                },
                success: function () {
                    tip.hide();
                    if (arguments[1].text > 0) {
                        pub.top.pub.alert("产品图片删除成功！");
                        //删除界面上的图片显示 
                        if (o) {
                            $e(o.parentNode.parentNode).remove();
                        }
                    }
                    else {
                        pub.top.pub.error("产品图片删除失败！", 1.5);
                    }
                },
                error: function () {
                    tip.hide();
                    pub.top.pub.error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1], 1.5);
                }
            });
        };
    },

    selectFile: function (id) {
        var chk = $e("#" + id)[0];
        if (chk) {
            if (chk.checked) {
                chk.checked = false;
            }
            else {
                chk.checked = true;
            }
        }
    }
};

//提示信息显示
var tip = {
    //提示信息元素
    box: null,
    //显示提示信息
    show: function (html, error) {
        //alert(arguments.caller.toString() + 'ddd');
        //获取提示信息框
        var lad = document.getElementById("vast_page_tips_box"),
            title_icon = document.getElementById("vast_page_tips_icon");
        text_panel = document.getElementById("vast_page_tips_text");
        var content = html || "数据加载中...";

        var win = $e(window);

        //提示信息框不存在时创建提示信息框
        if (!lad) {
            lad = document.createElement("div");
            //var close = document.createElement('div');
            ////初始化关闭按钮
            //close.style.cssText = 'width:16px;height:16px;position:absolute;top:50%;right:2px;margin-top:-8px;cursor:pointer;background:url(/Static/Images/close_tips.png) 0 0 no-repeat;';
            //close.title = '点击关闭';
            //$e(close).bind('click', function () { tip.hide(); });
            //lad.appendChild(close);
            //lad.className = clsName || "Loading_box";
            lad.id = "vast_page_tips_box";
            lad.className = 'ui-tips-pop tips-pop-close';
            lad.innerHTML = content;
            document.getElementsByTagName('body')[0].appendChild(lad);

            //创建提示图标层
            //var title_icon = document.createElement('i');
            //title_icon.id = 'vast_page_tips_icon';
            //title_icon.className = 'icon iconfont i-warning';
            //lad.appendChild(title_icon);

            //创建文字层
            //var text_panel = document.createElement('div');
            //text_panel.id = 'vast_page_tips_text';
            //text_panel.className = 'text';
            //lad.appendChild(text_panel);
        }

        //<div id="msgBoxDIV" style="position: absolute; width: 100%; padding-top: 2px; height: 24px; top: 43px; text-align: center; /* display: none; */"><span class="msg">删除成功&nbsp;<a href="#" style="color:white" onclick="getTop().rollback(2);return false;" initlized="true" md="0">[撤销]</a></span></div>

        //附提示信息html
        //text_panel.innerHTML = content;
        var fbs = lad.style;
        fbs.cssText = "";
        fbs.display = "";
        fbs.zIndex = 2147483640;

        var w = 120,
            h = lad.offsetHeight,
            l = 0,
            t = 0,
            max = $e(window).width() - 100,
            _w = 0;

        var nw = ['padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
        var nw_length = nw.length;
        var nw_size = 0;
        for (var i = 0; i < nw_length; i++) {
            nw_size = nw_size + tip.cssSize(lad, nw[i]);
        }

        _w = Number(lad.innerHTML.length * 20);

        if (_w > max) {
            _w = max;
        }

        nw_size = nw_size + _w;

        var win = $e(window),
            doc = $e(document),
            l = (win.width() - nw_size) / 2,
            t = (win.height() - h) / 2;

        var scrollTop;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }

        l = l + 'px';

        var bgc = "#000";
        var bog = "#000";

        //if (!error || typeof (error) == 'undefined') {
        //title_icon.className = 'icon iconfont i-iconchenggong';
        //} else {
        //title_icon.className = 'icon iconfont i-warning';
        //}

        //fbs.cssText = "background-color:" + bgc + "; position:fixed;width:" + w + "px;left:" + l + ";top:" + t + "px;border-color: " + bog;
        fbs.cssText = "position:fixed;width:" + _w + "px;left:" + l + ";top:" + t + "px;";

        tip.box = lad;

        lad.className = 'ui-tips-pop tips-pop-open';
        //$e(tip.box).show(2);  
    },
    //隐藏提示框
    hide: function () {
        //console.log(tip.box + window.location.href);
        if (tip.box) {
            //$e(tip.box).hide(2, null);
            tip.box.className = 'ui-tips-pop tips-pop-close';
        }
        else {
            // $e("#vast_page_tips_box").hide(2, null);
            //$e("#vast_page_tips_box")[0].className = 'ui-tips-pop tips-pop-close';
        }

        setTimeout(function () {
            $e(tip.box).remove();
        }, 450);
    },
    //获取CSS样式中的尺寸值
    cssSize: function (obj, style) {
        var si = 0;
        var _obj = [];
        if (obj.style[style]) {
            var regx = /([\S]+)px/ig;
            var sizer = regx.exec(obj.style[style])[0];
            if (!sizer) {
                sizer = '0px';
            };
        } else if (obj.currentStyle) {
            try {
                var regx = /([\S]+)px/ig;
                var sizer = regx.exec(obj.currentStyle[style])[0];
                if (!sizer) {
                    sizer = '0px';
                };
            } catch (e) {
                sizer = '0px';
            };
        } else if (window.getComputedStyle) {
            try {
                propprop = style.replace(/([A-Z])/g, "-$1");
                propprop = style.toLowerCase();
                var sizer = document.defaultView.getComputedStyle(obj, null);
                if (sizer) {
                    var regx = /([\S]+)px/ig;
                    sizer = regx.exec(sizer.getPropertyValue(style))[0];
                } else {
                    sizer = '0px';
                };
            } catch (e) {
                sizer = '0px';
            };
        };
        if (sizer === 'auto' || sizer === '0px') {
            si = 0;
        } else {
            si = Number(sizer.replace('px', ''));
        };
        return si;
    }
};

ECF.extend($e, {
    //定位
    locate: {
        model: {
            lng: 0,
            lat: 0,
            adcode: "",
            province: "",
            citycode: "",
            city: "",
            district: "",
            street: "",
            streetNumber: "",
            township: "",
            address: ""
        },
        init: function (callback) {
            //if (ECF.isWeixin) {
            //    //console.log("weixin-location");
            //    $e.getScript("/Static/Js/jweixin-1.0.0.js", function () {
            //        $e.getScript("/Static/Js/Wechat.js?v=1.2.0", function () {
            //            wechat.init(function () {
            //                wx.checkJsApi({
            //                    jsApiList: ['getLocation'],
            //                    success: function (res) {
            //                        pub.tips("获取定位成功", 1);
            //                        if (res.checkResult.getLocation) {
            //                            wx.getLocation({
            //                                success: function (n) {
            //                                    var model = $e.locate.model;
            //                                    model.lng = n.longitude;//经度
            //                                    model.lat = n.latitude;//纬度
            //                                    //model.province = res.addressComponent.province;
            //                                    //model.city = res.addressComponent.city;
            //                                    //model.district = res.addressComponent.district;
            //                                    //model.street = res.addressComponent.street;
            //                                    //model.streetNumber = res.addressComponent.streetNumber;
            //                                    console.log("success-res：", n);
            //                                    if (callback) {
            //                                        callback(model);
            //                                    }
            //                                }
            //                            });
            //                        }
            //                    },
            //                    fail: function (res) {
            //                        console.log("fail-res：", res);
            //                        pub.tips("获取位置失败", 1);
            //                    }
            //                });
            //            });
            //        });
            //    });
            //} else if (ECF.isAndroid) {
            //    //console.log("android-location");
            //    if (window.JsInterface && typeof (window.JsInterface.JsStartLocationFunction) == "function") {

            //        window.JsInterface.JsStartLocationFunction("onComplete", "onError");

            //        function onComplete(lng, lat) {
            //            console.log("success-res：", lng, lat);

            //            if (callback) {
            //                callback(lng, lat);
            //            }
            //        }

            //        function onError() {
            //            console.log("fail-res：", arguments[0]);
            //        }
            //    }

            //} else if (ECF.isIOS) {
            //    //console.log("ios-location");

            //} else {
            //console.log("web-location");
            //高德地图定位
            var map, geolocation;
            /*加载地图，调用浏览器定位服务*/
            map = new AMap.Map('', {
                resizeEnable: true
            });
            map.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,/* 是否使用高精度定位，默认:true */
                    timeout: 10000,          /*超过10秒后停止定位，默认：无穷大*/
                    buttonOffset: new AMap.Pixel(10, 20),/*定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)*/
                    zoomToAccuracy: true,      /*定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false*/
                    buttonPosition: 'RB'
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onMapComplete);/*返回定位信息*/
                AMap.event.addListener(geolocation, 'error', onError);      /*返回定位出错信息*/
            });

            /*解析定位结果*/
            function onMapComplete(res) {
                var model = $e.locate.model;
                model.lng = res.position.getLng();//经度
                model.lat = res.position.getLat();//纬度
                model.province = res.addressComponent.province;
                model.city = res.addressComponent.city;
                model.district = res.addressComponent.district;
                model.street = res.addressComponent.street;
                model.streetNumber = res.addressComponent.streetNumber;
                //console.log("success-res：", res);
                if (callback) {
                    callback(model);
                }
            };
            //解析定位错误信息
            function onError(res) {
                console.log("error-res：", res);
            };
            //}
        },
        show: function (callback) {
            //调用wechat.js中的方法
            getAMapLocation($e.locate.model.lng, $e.locate.model.lat, function (point, address) {
                //console.log(arguments);
                var model = $e.locate.model;
                model.lng = point.lng;//经度
                model.lat = point.lat;//纬度
                model.province = address.province;
                model.city = address.city;
                model.district = address.district;
                model.street = address.street;
                model.streetNumber = address.streetNumber;
                if (callback) {
                    callback(model);
                }
            });
        }
    }
});

// 当页面加载完成之后对地址进行一次批量处理，添加运营主体的参数
$e(function () {
    if (typeof (proprietor) != "undefined") {
        var de_p = ECF.code.deBase64(proprietor);
        //url正则表达式
        var reg = /^([^":']*?(?=\.aspx)\.aspx[^"']*?)/;
        $e("a:not([href*='" + de_p + "'])").each(function () {
            var $a = $e(this),
                href = $a.attr("href");
            if (reg.test(href)) {
                if (typeof (href) == "string")
                    $a.attr("href", href.toUrl());
            }
        });
    }
});