

//错误图片显示地址,此处必须要用到全局变量,防止error变量在不同函数中失效
var error = "data:image/png;base64,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";

// 获取js路径
var jsPath = window['_js_path'] || (function(script, i, me) {

    for (i in script) {
        // 如果通过第三方脚本加载器加载本文件，请保证文件名含有"public"字符
        if (script[i].src && script[i].src.toLowerCase().indexOf('public') !== -1) me = script[i];
    };

    var _thisScript = me || script[script.length - 1];
    me = _thisScript.src.replace(/\\/g, '/');
    return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
}(document.getElementsByTagName('script')));


var iWindow = null;

if (typeof(imageDomain) == "undefined") imageDomain = '';

//公用的弹出以及其他相关处理
var pub = {
    //本页面的对话框对象
    _dialog: null,

    zIndex: 214748364,

    // 弹出层的宽度
    dlgWidth: 800,

    dlgHeight: "auto",

    times: 2.5,

    win: (function() {
        return window;
    })(),

    //获取当前浏览器的最顶级窗口
    top: (function() {
        var _top = window;
        if (window.top) {
            _top = window.top;
        } else {
            _top = window.parent;
        }
        return _top;
    })(),

    iwin: function() {
        //获取最高层的window对象
        var _top = window;

        if (window.top) {
            _top = window.top;
        } else {
            _top = window.parent;
        }
        //判断window是否加载$框架
        if (_top.$) {
            var $ifr = _top.$('#contentIframe');
            if ($ifr.length > 0) {
                if ($ifr[0].contentWindow) {
                    return $ifr[0].contentWindow;
                } else {
                    return $ifr[0].window;
                }
            }
        }

        //独立页面时返回当前页面的window对象
        return window;
    },

    //获取主框架中的主体操作部分
    ifr: (function() {
        //获取最高层的window对象
        var _top = window;

        if (window.top) {
            _top = window.top;
        } else {
            _top = window.parent;
        }
        //判断window是否加载$框架
        if (_top.$) {
            var $ifr = _top.$('#contentIframe');

            if ($ifr.length > 0) {
                if ($ifr[0].contentWindow) {
                    return $ifr[0].contentWindow;
                } else {
                    return $ifr[0].window;
                }
            }
        }

        //独立页面时返回当前页面的window对象
        return window;

    })(),

    //获取弹出层时需要的按钮数组
    button: function(btns) {
        btns = btns || [];
        var ret = new Array();
        for (var i = 0; i < btns.length; i++) {
            ret.push({
                name: btns[i].name || "保存",
                callback: btns[i].callback || function() {
                    this.close();
                },
                arguments: btns[i].arguments || [],
                focus: btns[i].focus || true
            });
        }
        if (btns.length > 0) {
            ret.push({
                name: "取消",
                callback: function() {
                    this.close();
                },
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
    open: function(url, w, h, title, btns, loaded, loadArgs, closed) {

        var _top = pub.top,
            opts = {};

        var fname = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')).toLowerCase();

        RootUrlDirectory = (typeof(RootUrlDirectory) == "undefined" ? "/Webadmin" : RootUrlDirectory);

        //用于判断是否应该加上../的处理,判断是否使用的框架
        if (window.location.pathname == _top.location.pathname && fname != '/main.aspx' && RootUrlDirectory.length == 0) {
            url = '../' + url;
        }

        //判断传入的第一个对象是否为object类型
        if (typeof(url) == "object") {
            opts = url;
        } else {
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
                close: closed || function() {},
                win: window
            };
        }

        //打开一个页面
        _top.dialog = _top.$.dialog.open(opts);

        return _top.dialog;
    },

    /*
    @param1 提示信息内容
    */
    alert: function(content) {
        var _top = pub.top;
        _top.$.dialog.alert("<div style=\"padding: 20px 50px;\">" + content + "</div>");

    },

    /*
    错误提示信息
    @param1 提示信息内容
    */
    error: function(content, times, func) {

        times = times || pub.times;
        pub.top.tip.show(content, true);

        var tipTimer = setInterval(function() {
            times--;
            //清除循环计时器
            if (times < 1) {
                if (func) func();
                pub.top.tip.hide();
                try { //IE8及以下不支持对象的clear方法
                    if (tipTimer) tipTimer.clearInterval();
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
    tips: function(content, times, func) {

        times = times || pub.times;
        pub.top.tip.show(content);

        var tipTimer = setInterval(function() {
            times--;
            //清除循环计时器
            if (times < 1) {
                if (func) func();
                pub.top.tip.hide();
                try { //IE8及以下不支持对象的clear方法
                    if (tipTimer) tipTimer.clearInterval();
                    tipTimer = null;
                } catch (e) {
                    clearInterval(tipTimer);
                }
            }
        }, 1000);

    },

    /*
     */
    dialog: function(title, content, width, height, buttons, func, args) {

        var opts = null,
            _top = pub.top;

        if (arguments.length == 1 && $.isObject(arguments[0])) {
            opts = arguments[0];
        } else {
            opts = {
                title: title || "标题",
                width: width || pub.dlgWidth,
                height: height || pub.dlgHeight,
                content: content,
                zindex: pub.zIndex,
                button: pub.button(buttons),
                completed: func,
                completes: args || []
            };
        }


        if (_top.$.dialog) {
            //创建弹出层
            pub._dialog = _top.$.dialog(opts);
            pub._dialog.dom.content.forms();

        } else {
            alert("需要使用弹出层的页面没有加载相应的js");
        }

        if (typeof(opts.completed) == "function") {
            opts.completed.apply(pub._dialog, opts.completes);
        }

        //初始化UI
        if (typeof($().customCheck) == 'function') {
            $(pub._dialog.dom.content[0]).customCheck();
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
    html: function(title, content, width, height, buttons, func, curr) {

        var opt = {};

        if (arguments.length == 1 && $.isObject(arguments[0])) {
            opt = arguments[0];
        } else {
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
        if (typeof(opt.content) == "string") {
            var box = document.createElement("div");
            box.innerHTML = opt.content;
            opt.content = box;
        }

        if (arguments.length < 7) {
            pub._dialog = pub.dialog(opt.title, opt.content, opt.width, opt.height, opt.buttons, opt.callback, opt.completes);
        } else {
            if (arguments.length == 1 && $.isObject(content)) {
                pub._dialog = pub.htmlValue(content);
            } else {
                pub._dialog = pub.htmlValue(content, width, height, title, null, buttons, isForm, curr);
            }

            // 加载显示完成后回调
            if (typeof(func) == "function") {
                func.apply(pub._dialog, []);
            }
        }

        pub._dialog.dom.content.forms();

        return pub._dialog;
    },



    //执行表单初始化操作
    forms: function(html, data) {

        var _forms, editor = true;

        //需要先把对象添加到页面后才能使用编辑器,否则会报错
        if (typeof(html) == "string") {
            _forms = $("#" + html).forms(data);
        } else {
            _forms = $(html).forms(data);
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
    htmlValue: function(html, w, h, t, val, btns, isForm, curr) {
        var dfs, _fs, div,
            isf = isForm || true, //用于判断是否加载Forms
            isEditor = true,
            data = val || null,
            opts = {},
            _top = pub.top;

        try {
            //只传入一个object对象的处理
            if (arguments.length == 1 && $.isObject(html)) {
                opts = html;
                //此方法中的button的执行方法中的this对象是返回的弹出层对象
                //this.dom.content[0]可以取到弹出层里的内容
                //例如 使用这样的方法可以跨iframe取到显示在主界面里对象的值
                // var fs = new $.forms({ "selector": this.dom.content[0] });
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
                //把传入的值赋给val
                data = html.value;
                //从对象中删除value
                html.value = null;
            } else {

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

            //判断弹出层对象是否存在
            if (_top.$.dialog) {

                //创建弹出层
                dialog = pub._dialog = _top.$.dialog(opts);

                if (isf) {
                    //执行创建表单
                    forms = pub._forms = pub.forms(div, data);
                }
            } else {
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
    close: function() {
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
    rebind: function() {

        try {
            var ifrs = $("iframe");

            if (ifrs.length > 0) {
                //获取框架里的Grid
                var iwin = ifrs[0].contentWindow;

                if (iwin && iwin.EGrid1) {
                    iwin.EGrid1.reBind();
                } else if (EGrid1) {
                    EGrid1.reBind();
                } else {
                    ifrs[0].src = ifrs[0].src;
                    ifrs[0].location.reload();
                }
            } else {
                if (EGrid1) {
                    EGrid1.reBind();
                } else {
                    window.location.reload();
                }
            }
        } catch (e) {}
    },

    //公用的刷新页面方法,后期会扩展为刷新Grid的方法
    refresh: function() {
        try {

            if (typeof(window.loadData) == "function") {
                window.loadData.apply();
            } else {
                var ifrs = $("iframe");

                if (ifrs.length > 0) {
                    //获取框架里的Grid
                    var iwin = ifrs[0].contentWindow;

                    if (iwin && iwin.EGrid1) {
                        iwin.EGrid1.refresh();
                    } else {
                        ifrs[0].src = ifrs[0].src;
                        ifrs[0].location.reload();
                    }
                } else {
                    if (EGrid1) {
                        EGrid1.refresh();
                    } else {
                        window.location.reload();
                    }
                }
            }

        } catch (e) {}
    },

    /*
        保留n位小数
        @1: 数据
        @2: 保留位数
    */
    formatNum: function(total, n) {
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
    confirm: function(text, yes, no, title, func, width) {
        if (typeof(yes) == "function" && typeof(no) == "function") {
            var _top = pub.top;
            if (typeof(title) != "string") {
                title = "提示信息";
            }
            pub._dialog = _top.$.dialog.confirm(title, "<div>" + text + "</div>", yes, no, width);

            // 加载显示完成后回调
            if (typeof(func) == "function") {
                func.apply(pub._dialog, []);
            }

            return false;
        } else {
            if (confirm(text)) {
                return true;
            } else {
                return false;
            }
        }
    },

    // 默认图片
    defImgSrc: error,


    /* 
        缩略图替换处理 by xp 20120806
        @1 需要替换的目标地址
        @2 要替换的大小,如80X80
    */
    scaleReplace: function(s, a) {
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
    tabChange: function(o, func) {
        var $o = $(o);

        // 还原所有的显示
        $o.parent().find("li").each(function() {
            var l = $(this),
                pid = l.attr("pannelId");
            if (pid != null && pid != "") {
                $("#" + pid).hide();
            }
            l.removeClass("select");
        });

        $o.addClass("select");

        //设置对应的区域块显示
        var pd = $o.attr("pannelId");
        if (pd != null && pd != "") {
            $("#" + pd).show();
        }

        // 如果有回调方法执行
        if (typeof(func) == "function") {
            func.apply(o, []);
        }

        // 判断动态刷新框架高度
        if (window.top) {
            if (window.top.main) {
                if (typeof(window.top.main.autoSize) == "function")
                    window.top.main.autoSize();
            }
        }
    },

    // 判断动态刷新框架高度
    autoSize: function() {
        // 判断动态刷新框架高度
        if (window.top) {
            if (window.top.main) {
                if (typeof(window.top.main.autoSize) == "function")
                    window.top.main.autoSize();
            }
        };
    },

    // 临时Tr列表
    _listTr: null,

    // 用于在tr列表中插入显示行的详情
    listHtml: function(o, html, colspan, parentId, cssName) {

        if (pub._listTr) {
            pub._listTr.remove();
        }

        var cssName = 'expchild exp-on';
        var tr = document.createElement("tr"),
            td = document.createElement("td"),
            $tr = $(tr),
            $td = $(td);
        tr.className = cssName;
        $tr.attr("extendlist", parentId);
        $td.attr("colspan", colspan);

        $td.html(html);
        $tr.append($td[0]);

        // 记录全局变量下一下插入时需要删除已存在的对象
        pub._listTr = $tr;

        if (o.tagName == "TR")
            $(o).after($tr[0]);
        else {
            var $o = $(o);
            $o = $o.parent("tr");
            $o.after($tr[0]);
        }

        //列表切换
        if (typeof(cutTable) == 'function') {
            cutTable();
        }

        //计算高度
        if (window.parent) {
            if (window.parent.main) {
                if (typeof(window.parent.main.autoSize) === 'function')
                    window.parent.main.autoSize();
            }
        }
    }
};

//通用表单处理
var frm = {

    // 状态开关切换
    onoff: function(btn, valId) {
        var obj = null;
        if (btn.nodeName == "SPAN") {
            obj = $(btn).parent();
        } else {
            obj = $(btn);
        }

        var val = 1;

        if (obj.hasClass('target-on')) {
            obj.removeClass('target-on');
            obj.addClass('target-off');
            val = 0;
        } else if (obj.hasClass('target-off')) {
            obj.removeClass('target-off');
            obj.addClass('target-on');
            val = 1;
        }

        if (valId) {
            $("#" + valId).value(val);
        } else if ($("input[type=hidden]", btn).length > 0) {
            $("input[type=hidden]", btn).value(val);
        }

    },

    /*
        切换数据状态
        @1: 切换点击对象
        @2: 需要切换数据的Id
        @3: 需要切换的状态
    */
    switchStatus: function(btn, id, status, func, url) {
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

        var ld = window.load;

        // 更新状态数据
        $.ajax({
            url: path+url,
            dataType: "json",
            data: {id:id,status:status},
            loading: function() {
                if (btn && btn.disabled) {
                    btn.disabled = true;
                }
            },
            success: function(result) {
            	
                if (btn && btn.disabled) {
                    btn.disabled = false;
                }
                if (result.state == 0) {

                    alert("操作成功.");

                    if (typeof(ld) == "function") {
                        ld.apply();
                    }

                } else {
                   alert("操作失败.");
                }


                if (typeof(func) == "function") {
                    func.apply(btn, []);
                }


            },
            error: function() {
                alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
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
    add: function(title, formId, action, url, func, args, width, height, cback) {
        var opt = null;

        if (arguments.length == 1 && $.isPlainObject(arguments[0])) {
            opt = arguments[0];
        } else {

            var $win = $(top.window),
                w = $win.width() - 300,
                h = $win.height() - 200;

            opt = {
                title: title,
                formId: formId,
                action: action || "insert",
                arguments: args,
                width: width || w,
                url: url || window.location.pathname,
                height: height || h,
                // 添加成功后的回调方法
                callback: func,
                finish: cback
            };
        }
        opt.finishArgs=opt.finishArgs||[];
        // 此处理可以在传入object对象时不需要指定action对象
        opt.action = opt.action || "insert";

        if (opt.formId == null || opt.formId == "") {
            alert("表单参数错误");
            return;
        }

        opt.url = opt.url || window.location.pathname;
        opt.html = $("#" + opt.formId).html();

        if (opt.html == null || opt.html == "") {
            alert("模板参数据错误");
            return;
        }


        var div = document.createElement("div");
        div.className = "forms";
        div.innerHTML = opt.html;

        // 添加按钮
        opt.buttons = {
				"确定":function(){
					if(typeof(opt.callback)=="function"){
						opt.callback(this);
					}
				},
				"取消":function(){
					$(this).dialog('close');
				}
		};
        opt.Cancle =function(){
			$(this).dialog('close');
		};
        if($("#dialogForm").length==0){
        	$("body").append("	<div id='dialogForm' style='display: none'></div>");
        }
        $("#dialogForm").html($('#'+opt.formId).html());
        $("#dialogForm").dialog(opt).dialog('open');
        if(typeof(opt.finish)=='function'){
        	opt.finish.apply(this,opt.finishArgs);
        }
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
        @12： 保存按钮提交前的回调
    */
    update: function(title, formid, id, action, url, func, args, width, height, buttonValue, cback, beforefunc) {
        var opt = null;

        if (arguments.length == 1 && $.isPlainObject(arguments[0])) {
            opt = arguments[0];
        } else {

            var $win = $(top.window),
                w = $win.width() - 300,
                h = $win.height() - 200;

            opt = {
                title: title,
                formId: formid,
                id: id,
                action: action || "update",
                callback: func,
                arguments: args,
                width: width || w,
                height: height || h,
                buttonValue: buttonValue,
                before: beforefunc, //保存按钮提交前的回调
                finish: cback
            };
        }

        if (opt.id < 1) {
            alert("参数错误");
            return;
        }

        opt.url = opt.url || (url || window.location.pathname);
        opt.html = $("#" + opt.formId).html();

        // 此处理可以在传入object对象时不需要指定action对象
        opt.action = opt.action || "update";

        if (opt.html == null || opt.html == "") {
            alert("模板参数据错误");
            return;
        }

        $.ajax({
            url: path+opt.url,
            dataType: "json",
            data: {id:opt.id},
            success: function(result) {
            	
            	  if($("#dialogForm").length==0){
                  	$("body").append("	<div id='dialogForm' style='display: none'></div>");
                  }
            	$("#dialogForm").html(opt.html);
            	
            	if(result.state==0){
            		var doc = (result.data);
            	
            		$.each(doc,function(key,item){
            			$("#dialogForm").find("#"+key.firstUpperCase()).val(item);
            			
            		});
            		 if(typeof(opt.finish)=='function'){
                       	opt.finish(doc);
                       }
            	}
               
            	
              

                if (typeof(opt.buttons) == "undefined") {
                    // 添加按钮
                    opt.buttons = {
            				"确定":function(){
            					if(typeof(opt.callback)=="function"){
            						opt.callback(this);
            					}
            				},
            				"取消":function(){
            					$(this).dialog('close');
            				}
            		};
                    opt.Cancle =function(){
            			$(this).dialog('close');
            		};
            		 $("#dialogForm").dialog(opt).dialog('open');
                    
                   
                }

               
            },
            error: function() {
                alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
        查看详细信息
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
    view: function(title, formid, id, action, url, func, args, width, height, buttonValue, cback) {
        var opt = null;

        if (arguments.length == 1 && $.isObject(arguments[0])) {
            opt = arguments[0];
        } else {
            opt = {
                title: title,
                formId: formid,
                id: id,
                action: action || "detail",
                callback: func,
                arguments: args,
                width: width || pub.dlgWidth,
                height: height || "auto",
                finish: cback
            };
        }

        if (opt.id < 1) {
            alert("参数错误");
            return;
        }

        opt.url = opt.url || (url || window.location.pathname);
        opt.html = $("#" + opt.formId).html();

        // 此处理可以在传入object对象时不需要指定action对象
        opt.action = opt.action || "detail";


        if (opt.html == null || opt.html == "") {
            alert("模板参数据错误");
            return;
        }

        if (typeof(loadData) == "function") {
            opt.load = loadData;
        }



        $.ajax({
            url: opt.url,
            dataType: "xml",
            data: "<action>" + opt.action+"</action><Id>" + opt.id + "</Id>",
            loading: function() {
                //tip.show("数据加载中...");
            },
            success: function() {

                var doc = (arguments[1].xml ? arguments[1].xml : arguments[1].text);
                var div = document.createElement("div");
                div.className = "forms";
                div.innerHTML = opt.html;

                if ($.isArray(opt.completes)) {
                    opt.completes.push(doc);
                } else {
                    opt.completes = [doc];
                }

                $(div).setValues(doc);


                pub.dialog(opt.title, div, opt.width, opt.height, opt.buttons, opt.completed, opt.completes);


            },
            error: function() {
                alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
      删除数据
      @1： 需要删除数据的Id
      @2： 删除后需要回调的方法
    */
    del: function(id, func,url,args) {
        if(confirm("您确定要将数据移到回收站吗?"))
        {
            // 更新状态数据
            $.ajax({
				url:path+url,
				type:"post",
				data:{id:id},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						alert("删除成功");
						if(typeof(func)=='function'){
							func.apply(this,args);
						}
					}			
				},
				error:function(){
					alert("删除失败");
				}
			});
        };
    },

    /*后台高级查询、回收站、批量查找、物理删除、还原*/

    //批量删除
    batchDel: function(func) {

        var ids = frm.getCheckedIds();

        if (ids.length == 0) return;


        pub.confirm("您确定要将数据移到回收站吗?", function() {

            var opt = {};

            if (typeof(loadData) == "function") {
                opt.load = loadData;
            }


            // 更新状态数据
            $.ajax({
                dataType: "xml",
                data: "<action>batchdel</action><strId>" + ids + "</strId>",
                loading: function() {

                },
                success: function() {
                    if (arguments[1].text > 0) {

                        alert("删除数据成功");

                        if (typeof(opt.load) == "function") {
                            opt.load.apply();
                        }

                        if (typeof(pub.refresh) == "function") {
                            pub.refresh.apply();
                        }

                        if (typeof(func) == "function") {
                            func.apply(this, []);
                        }
                    } else {
                        alert("删除数据失败");
                    }

                },
                error: function() {
                    alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function() {});
    },

    //获取已选择的Id
    getCheckedIds: function() {

        var strId = "";

        var checks = $("input[name='Id']");

        $.each(checks, function() {
            var div = $(this).parent();

            if (div.hasClass("checked")) {
                strId += this.value + ",";
            }
        });

        if (strId.lastIndexOf(",") == strId.length - 1) {
            strId = strId.substr(0, strId.length - 1);
        }

        if (strId.length == 0) {
            alert("请选择需要操作的数据");
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
    physicalDel: function(id, func, data) {
        pub.confirm("您确定要彻底删除数据吗?", function() {

            var opt = {};

            if (typeof(loadData) == "function") {
                opt.load = loadData;
            }

            var xml = "<action>physicdel</action><Id>" + id + "</Id>" + (typeof(data) == "string" ? data : "");

            // 更新状态数据
            $.ajax({
                dataType: "xml",
                data: xml,
                loading: function() {

                },
                success: function() {
                    if (arguments[1].text > 0) {

                        alert("删除数据成功");

                        frm.refresh(func, opt);
                    } else if (arguments[1].text == -1) {
                        alert("删除数据失败,有关联数据存在！");
                    } else {
                        alert("删除数据失败");
                    }

                },
                error: function() {
                    alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function() {});
    },

    /*
      物理删除数据
      @1： 需要删除数据的Id
      @2： 删除后需要回调的方法
    */
    batchPhysicalDel: function(func) {

        var ids = frm.getCheckedIds();

        if (ids.length == 0) return;

        pub.confirm("您确定要彻底删除数据吗?", function() {

            var opt = {};

            if (typeof(loadData) == "function") {
                opt.load = loadData;
            }


            // 更新状态数据
            $.ajax({
                dataType: "xml",
                data: "<action>batchphysicdel</action><strId>" + ids + "</strId>",
                loading: function() {

                },
                success: function() {
                    if (arguments[1].text > 0) {

                        alert("删除数据成功");

                        frm.refresh(func, opt);
                    } else {
                        alert("删除数据失败");
                    }

                },
                error: function() {
                    alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }, function() {});
    },

    /*
     恢复删除数据
     @1： 需要恢复删除数据的Id
     @2： 恢复后需要回调的方法
   */
    revert: function(id, func) {

        var opt = {};

        if (typeof(loadData) == "function") {
            opt.load = loadData;
        }


        // 更新状态数据
        $.ajax({
            dataType: "xml",
            data: "<action>revert</action><Id>" + id + "</Id>",
            loading: function() {

            },
            success: function() {
                if (arguments[1].text > 0) {

                    alert("恢复数据成功");

                    frm.refresh(func, opt);
                } else {
                    alert("恢复数据失败");
                }

            },
            error: function() {
                alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
    批量恢复删除数据
    @1： 批量恢复后需要回调的方法
  */
    batchRevert: function(func) {

        var ids = frm.getCheckedIds();

        if (ids.length == 0) return;

        var opt = {};

        if (typeof(loadData) == "function") {
            opt.load = loadData;
        }

        // 更新状态数据
        $.ajax({
            dataType: "xml",
            data: "<action>batchrevert</action><strId>" + ids + "</strId>",
            loading: function() {

            },
            success: function() {
                if (arguments[1].text > 0) {

                    alert("恢复数据成功");

                    frm.refresh(func, opt);

                } else {
                    alert("恢复数据失败");
                }

            },
            error: function() {
                alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    },

    /*
    刷新列表
    @1： 批量恢复后需要回调的方法
    */
    refresh: function(func, opt) {
        if (typeof(func) == "function") {
            func.apply(this, []);
        } else {
            if (typeof(pub.refresh) == "function") {
                pub.refresh.apply();
            }
            if (typeof(opt.load) == "function") {
                opt.load.apply();
            }
        }
    },

    //高级查询全部数据
    loadAllData: function() {
        //清空筛选框
        //$('#filterForm').formReset();
        //重新筛选
        $('#filterForm').filter(function() {
            $("#filterHidden").value("");
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
    post: function(action, data, url, func) {

        var opt = {};

        if (typeof(loadData) == "function") {
            opt.load = loadData;
        }

        // 更新状态数据
        $.ajax({
            url: url,
            dataType: "xml",
            data: "<action>" + action + "</action>" + data,
            loading: function() {

            },
            success: function() {

                // 有回调函数直接走回调
                if (typeof(func) == "function") {
                    func.apply(this, arguments);
                } else { // 无回调直接使用系统提供
                    if (arguments[1].text > 0) {

                        alert("数据处理成功");

                        if (typeof(opt.load) == "function") {
                            opt.load.apply();
                        }

                        if (typeof(pub.refresh) == "function") {
                            pub.refresh.apply();
                        }
                    } else if (arguments[1].json) {
                        var json = arguments[1].json;
                        if (json.code != "error") {
                            alert(json.msg);
                        } else {
                            alert(json.msg);
                        }
                    } else {
                        alert("数据处理失败");
                    }
                }

            },
            error: function() {
                alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
            }
        });
    }
};

// 基于业务的数据加载扩展
$.extend($.fn, {
    /*
        加载列表数据
        @1: 需要进行绑定的模板id
        @2: 需要带到后台的
        @3: 请求动作
        @4: 执行完回调方法
        @5: 执行方法回调参数
        @6: 请求地址
    */
    loadList: function(templateId, data, action, func, args, url) {

        if (this.length < 1) {
            alert("数据错误");
            return;
        }

        var opt = {
            templateId: templateId
        };

        if (arguments.length == 1 && $.isObject(arguments[0])) {
            if (typeof(arguments[0]) == "string") {
                opt.templateId = arguments[0];
                opt.action = action || "loaddata";
            } else {
                opt = arguments[0];
            }
        } else {
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
        $.ajax({
            url: opt.url,
            dataType: "xml",
            data: sendData,
            loading: function() {
                my.html("数据获取中...");
            },
            success: function() {

                var doc = arguments[1].xml ? arguments[1].xml : arguments[1].text,
                    json = null;
                if (typeof(doc) == "string") {
                    json = $.parseJSON(arguments[1].text);
                } else {
                    json = $.xml.toJson(doc);
                }

                opt.html = $("#" + opt.templateId).html();

                if (opt.html == null || opt.html == "") {
                    alert("模板数据为空");
                    return;
                }

                if (json) {
                    my.html(jte(opt.html, json));
                    if (my[0].nodeName == "TBODY") {
                        $(">tr", my[0]).each(function () {
                            $(this).bind("mouseover", function () {
                                $(">th,>td", this).css("background-color", "#EEF3F7");
                            });
                            $(this).bind("mouseout", function () {
                                $(">th,>td", this).css("background-color", "");
                            });
                        });
                    }
                } else {
                    my.html("没有数据");
                }
                if (typeof(func) == "function") {
                    func.apply(this, arguments);
                }

                if (window.parent) {
                    if (window.parent.main) {
                        if (typeof(window.parent.main.autoSize) === 'function')
                            window.parent.main.autoSize();
                    }
                }

                //自定义单选复选UI
                if (typeof $().customCheck === 'function') {
                    $(document).customCheck();
                }

                //延迟加载
                if (typeof $.lazy === 'function') {
                    $(document).nonePic();
                }
            },
            error: function() {
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
    loadPage: function (templateId, pagebarId, conditions, status, pagesize, callback) {
        var ofilter = $("#filterHidden"),
            filter = "";

        if (ofilter.length > 0) {
            filter = ofilter.val();
        }

        if (typeof(status) == "undefined" || status == null) {
            filter += "<Status>all</Status>";
        } else if (status != "" && filter.toLowerCase().indexOf("<status>") < 0) {
            filter += "<Status>" + status + "</Status>";
        }

        filter = (filter != "" ? "<Filter>" + filter + "</Filter>" : "");

        // 判断列表加载是否为第一次页面加载
        if (window.pages && window.pages[this.selector + conditions + filter]) {

            window.pages[this.selector + conditions + filter].query(conditions + filter);

        } else {

            if (!window.pages) window.pages = [];

            //var func = (typeof (definedCheckbox) != "undefined" && typeof (definedCheckbox.reset) == "function" ? definedCheckbox.reset : function () { });
            //var func = (typeof (custom) != "undefined" && typeof (custom) == "function" ? custom : function () { });
            //window.pages[this.selector + conditions + filter] = this.page(templateId, pagebarId, conditions + filter, pagesize, func);
            window.pages[this.selector + conditions + filter] = this.page(templateId, pagebarId, conditions + filter, pagesize, callback);
        }
    }
});
    

//提示信息显示
var tip = {
    //提示信息元素
    box: null,
    //显示提示信息
    show: function (html, error) {
        //获取提示信息框
        var lad = document.getElementById("vast_page_tips_box");
        var content = html || "数据加载中...";

        //提示信息框不存在时创建提示信息框
        if (!lad) {
            lad = document.createElement("div");
            var close = document.createElement('div');
            //初始化关闭按钮
            close.style.cssText = 'width:16px;height:16px;position:absolute;top:50%;right:2px;margin-top:-8px;cursor:pointer;background:url(/Static/Images/close_tips.png) 0 0 no-repeat;';
            close.title = '点击关闭';
            $(close).bind('click', function () { tip.hide(); });
            lad.appendChild(close);
            //lad.className = clsName || "Loading_box";
            lad.id = "vast_page_tips_box";
            document.getElementsByTagName('body')[0].appendChild(lad);
        }
        //<div id="msgBoxDIV" style="position: absolute; width: 100%; padding-top: 2px; height: 24px; top: 43px; text-align: center; /* display: none; */"><span class="msg">删除成功&nbsp;<a href="#" style="color:white" onclick="getTop().rollback(2);return false;" initlized="true" md="0">[撤销]</a></span></div>
        //附提示信息html
        lad.innerHTML = "<span style='height:16px;line-height:16px;display:block;font-size:12px;white-space: nowrap;word-break: break-all;word-spacing: normal;word-break: break-all;'>" + content + "</span>";
        var fbs = lad.style;
        fbs.cssText = "";
        fbs.display = "";
        fbs.opacity = "";
        fbs.zIndex = 2147483640;
        fbs.cssFloat = "left";
        fbs.width = "auto";
        fbs.fontSize = "12px";
        var w = lad.offsetWidth + "px",
        h = lad.offsetHeight + "px", l = 0, t = 0;

        var win = $(window),
            doc = $(document),
            l = (win.width() - lad.offsetWidth) / 2,
            t = (win.height() - lad.offsetHeight) / 2;

        var scrollTop;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }

        l = l + 'px';

        var bgc = "#f2f9d9";
        var bog = "#abd909";

        if (error) {
            bgc = "#fef9f9";
            bog = "#fdcdcd";
        }

        fbs.cssText = "padding: 20px;text-align:cneter;border-radius: 2px;background-color:" + bgc + "; position:fixed;width:"
            + w + ";height:" + h + ";left:" + l + ";top: 120px; font-size: 16px;z-index:9999999999;cursor:default;border-style: solid;border-width: 1px;border-color: " + bog;



        tip.box = lad;
        //$(tip.box).show(2);
    },
    //隐藏提示框
    hide: function () {
        if (tip.box) {
            $(tip.box).hide(2, null);
        }
        else {
            $("#vast_page_tips_box").hide(2, null);
        }
    }
};

//树状列表
var treeGrid = {
    childArray: [],
    recursion: function (obj, num) {
        var child = obj.find("tr[parentIndex='" + num + "']");
        if (child.length > 0) {
            child.each(function () {
                treeGrid.recursion(obj, $(this).attr("treeIndex"));

                treeGrid.childArray[treeGrid.childArray.length] = this;
            });

            return treeGrid.childArray;
        }
    },
    //展开/收缩
    toggle: function (o) {
        //By Zkai 2016-6-2 13:57:50
        var $tr = $(o).parents("tr:eq(0)"),
            treeIndex = $tr.attr("treeIndex"),
            parentIndex = $tr.attr("parentIndex");

        var par = $tr.parent("tbody");

        //如果是最后一级点击就不起效
        if ($tr.hasClass("nochild")) return;

        //初始化数据
        treeGrid.childArray = [];

        var child = treeGrid.recursion(par, treeIndex);
     
        if ($tr.hasClass("open")) {
            $tr.removeClass("open").addClass("close");

            //收缩列表
            for (var i = 0; i < child.length; i++) {
               // console.log($(child[i]).html());
                //关闭所有展开项
                if ($(child[i]).hasClass("open")) {
                    $(child[i]).removeClass("open").addClass("close");
                }

                $(child[i]).css({
                    'display': 'none'
                });
            }
        } else {
            $tr.removeClass("close").addClass("open");

            var childs = $tr.parent("tbody").find("tr[parentIndex='" + treeIndex + "']");
            childs.each(function () {
                // console.log($(this).html());
                $(this).css({
                    'display': ''
                });
            });
        }
        if (typeof (top.main) != "undefined" && typeof (top.main.autoSize) == "function") top.main.autoSize(true);
        return;

    },
    //获取子列表
    getChild: function (o) {

        var $tr = $(o).parent("tr"),
            treeIndex = $tr.attr("treeIndex");
        var child = $tr.parent("tbody").find("tr[parentIndex='" + treeIndex + "']");

        return child;
    },
    //获取子节点Id
    getChildrenId: function (parentId, obj) {
        var child = treeGrid.getChild(obj);

        var ids = "";

        if (child && child.length > 0) {

            for (var i = 0; i < child.length; i++) {
                var childObj = $("#ID", child[i]);

                if (childObj && childObj.length > 0) {

                    var childId = childObj[0].value;

                    if (childId > 0) {
                        ids += treeGrid.getChildrenId(childId, childObj);
                    }
                }
            }
        }

        ids += parentId + ",";

        return ids;
    },
    //删除树状列表
    del: function (id, cinfo, sinfo, einfo, obj) {
        var ids = treeGrid.getChildrenId(id, obj);

        if (ids.indexOf(",")) {
            ids = ids.toString().substr(0, ids.length - 1);
        }

        if (ids.length == 0) {
            alert("请选择要删除的数据！");
            return;
        }
        cinfo = cinfo || "你是否确认要删除当前选中记录？";
        if (pub.confirm(cinfo)) {
            sinfo = sinfo || "删除数据成功";
            einfo = einfo || "删除数据失败";
            $.ajax({
                data: '{"action":"batchdel","strId":"' + ids + '"}',
                dataType: "json",
                loading: function () {
                    tip.show("数据处理中 ...");
                },
                success: function () {
                    tip.hide();
                    if (arguments[1].text > 0) {
                        alert(sinfo, 1.5);
                        //pub.refresh();
                        // 删除数据用reBind
                        pub.iwin().location.reload();
                    }
                    else {
                        alert(einfo, 1.5);
                    }
                },
                error: function () {
                    tip.hide();
                    alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1], 1.5);
                }
            });
        }

    },
    //初始化树状列表
    initTreeGrid: function (templateId, formId, func,data,isShowAll) {

        var opt = {};

        if (arguments.length == 1 && $.isObject(arguments[0])) {
            opt = arguments[0];
        }
        else {
            opt = {
                formId: formId,
                templateId: templateId,
                action: "loaddata",
                func: func,
                data: data || "",
                isShowAll: isShowAll||false
            };
        }

        var tep = $("#" + opt.templateId).html();

        var template = "";

        var endTemplate = "", indexs = "", ps = "";

        for (var i = 0; i < 5; i++) {
            indexs += "${it" + i + ".Id}";

            template += "{@each " + (i == 0 ? "_" : "it" + (i - 1) + ".children") + " as it" + i + ",index" + i + "}" +
                tep.replace(/\[\#i\]/g, i).replace(/\[\#index\]/g, indexs).replace(/\[\#parent\]/g, ps).replace(/\[\#style\]/g, ((!opt.isShowAll && i) > 0 ? "style='display:none;'" : ""));

            endTemplate += "{@/each}";

            ps = indexs;
        }

        template += endTemplate;

        opt.template = template;
        if (template == "") {
            alert("模板数据错误。");
        };

        $.ajax({
            url: opt.url,
            dataType: "xml",
            data: "<action>" + opt.action + "</action>" + opt.data,
            loading: function () { },
            success: function () {

                var doc = arguments[1].xml ? arguments[1].xml : arguments[1].text,
                    json = null;

                if (typeof (doc) == "string") {
                    json = $.parseJSON(arguments[1].text);
                }
                else {
                    json = $.xml.toJson(doc);
                }

                if (json.length <= 0) {
                    var errorNull = '<div class=\"errornull\">暂无数据</div>';
                    if ($("#" + opt.formId)[0].nodeName == 'TBODY') {
                        //找col
                        var cols = $('colgroup > col', $("#" + opt.formId)[0].parentNode);

                        var newErrorNull = "<tr><td colspan=\"" + cols.length + "\">" + errorNull + "</td></tr>";
                    }
                    $("#" + opt.formId).html(newErrorNull);
                } else {
                    var box = $("#" + opt.formId);
                    box.html(jte(opt.template, json));
                    if (box[0].nodeName == "TBODY") {
                        $(">tr", box[0]).each(function () {
                            $(this).bind("mouseover", function () {
                                $(">th,>td", this).css("background-color", "#EEF3F7");
                            });
                            $(this).bind("mouseout", function () {
                                $(">th,>td", this).css("background-color", "");
                            });
                        });
                    }
                }

                // 判断动态刷新框架高度
                //if (window.top) {
                //	if (window.top.main) {
                //		if (typeof (window.top.main.autoSize) == "function") {
                //			window.top.main.autoSize(false);
                //		}
                //	}
                //};

                if (typeof (opt.func) == "function") {
                    opt.func.apply();
                }

                //可拖动Table列表宽度UI
                if (typeof $().customChangeTableUI === 'function') {
                    $('#customChangeTable').customChangeTableUI({ min: 60 });
                }

                //自定义单选复选UI
                if (typeof $().customCheck === 'function') {
                    $(document).customCheck();
                }
            },
            error: function () {
                alert("数据获取失败...");
            }
        });


    }
};

/**
 * 为$扩展areas方法
 * @param  {[type]} ctlId      [description]
 * @param  {[type]} secendId   [description]
 * @param  {String} thirdId){                     var jsonUrl [description]
 * @param  {[type]} true);                                                        ctl.bind("change", function() {            var obj [description]
 * @return {[type]}            [description]
 */
$.extend($, {
    areas: function(ctlId, secendId, thirdId,fun) {
        var jsonUrl = "/fire/Static/Js/areas.js",
          
            ctl = $("#" + ctlId),
            sctl = $("#" + secendId),
            tctl = $("#" + thirdId),
            areaList = {};
        ctl.append('<option value="" parentId="" >请选择</option>');

        $.getScript(jsonUrl, function(item) {
        	
            areaList = chinaAreas;
            ;
            for (var key in areaList) {
                ctl.append('<option value="' + key + '" parentId="" subContrlId="' + '" >' + key + '</option>');
            }
            if (typeof (fun) == "function") {
                fun();
            }
        }, true);

        // 为一级区域添加改为方法
        ctl.bind("change", function () {
            var obj = $(this),
                val = obj.val(),
                slist = areaList[val];
                // 重置三级元素
                sctl.empty();
                sctl.append('<option value="" parentId="" >请选择</option>');
                // 重置三级元素
                tctl.empty();
                tctl.append('<option value="" parentId="" >请选择</option>');
            for (var skey in slist) {
                sctl.append('<option value="' + skey + '">' + skey + '</option>');
            }

            // 为二级区域添加改变方法
            sctl.bind("change", function() {
                var tobj = $(this),
                    tval = tobj.val(),
                    tlist = slist[tval];
                    tctl.empty();
                tctl.append('<option value="" parentId="" >请选择</option>');
                if(typeof(tlist) == "undefined") return;
                for (var i = 0; i < tlist.length; i++) {
                    tctl.append('<option value="' + tlist[i] + '">' + tlist[i] + '</option>');
                }
            });
        });
       
    }
});
String.prototype.firstUpperCase=function(){
    return this.replace(/^\S/,function(s){return s.toUpperCase();});
}
