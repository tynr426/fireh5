

!function ($, win) {
    // 初始化表单
    $.fn.forms = function (data, callback) {

        if (typeof (this.length) == "undefined" || this.length < 1) return;

        var frm = this;
        //if (this.length && this.length > 0) {
        _init();
        // }


        // 传递数据进入自动进行赋值处理
        if (data) {
            this.setValues(data, callback, []);
        }
        return frm;

        // 进行初始化设置
        function _init() {
            var boxs = frm.find(dfs.tags);
            // 处理不支持placeholder的浏览器支持
            boxs.placeholder();
            boxs.each(function () {
                var el = this;
                if (el.tagName == 'INPUT' && el.type == 'hidden') {
                    return;
                }
                // 加载立即验证事件
                onPromptly(el);

                if (el.nodeName == "TEXTAREA") {
                    // 加载编辑器
                    loadEditor(el);
                }

            });

        };

        function onPromptly(el) {

            var $l = $(el),
                valid = $l.attr("validate"),
                visible = $l.isVisible(),//对元素的可见性进行判断
                isEditor = $l.attr("editor") == "true";

            if (valid && (isEditor || visible)) {
                $l.bind("blur", function () {
                    $.forms.fieldValidate(this, valid.split("|"));
                });
            }
        };

        // 加载编辑器
        function loadEditor(el) {
            var upload = "false";

            var id = el.id || el.name,
                edited = $(el).attr("editor"); //获取在线修改器是否启用
            upload = $(el).attr("uploads"); // 获取上传控件是否启用

            //加载上传图片控件
            if (upload == "true") {
                uploads($(el).attr("divid"), {
                    id: $(el).attr("divid"),
                    preview_hide: true,
                    file_upload_limit: $(el).attr("imgnum"),
                    file_upload_limit: $(el).attr("queuenum"),
                    message: $(el).attr("message"),
                    preview_width: $(el).attr("imgwidth"),
                    preview_height: $(el).attr("imgheight"),
                    functname: $(el).attr("functname"),
                    post_params: {
                        module: $(el).attr("module"),
                        isprdimg: $(el).attr("isprdimg") == null ? "" : $(el).attr("isprdimg")
                    }
                });
            }

            // 判断加启用在线修改器
            if (edited == "true") { //判断是否启用在线修改器
                if (dfs.editor = 'kind') {  //对kindEidtor的加载处理
                    try {
                        if (dfs.kindEditor) {
                            // 如果元素给定了宽度或高度将被赋值到编辑器元素上 by xp 20160922
                            if (el.style.width != "") dfs.kindEditor.config.width = el.style.width;
                            if (el.style.height != "") dfs.kindEditor.config.height = el.style.height;
                            $.forms.editors[id] = KindEditor.create('#' + id, dfs.kindEditor.config);
                        }
                    }
                    catch (_) { alert('加载编辑器时异常' + _); throw _; };
                }
                else if (dfs.editor = 'fck') {  //对FCKEditor的加载处理
                }

            }
        };

    };


    // 定义页面的表单元素
    $.forms = $.fn.forms;

    $.extend($.forms, {
        // 单个字段验证
        fieldValidate: function (o, types) {
            var vtype = "", val = o.value, isEditor = false;
            //对修改器进行取值判断
            if ($(o).attr("editor") == "true") {
                isEditor = true;
                if (!$.forms.editors[o.id]) {
                    return;
                }
                val = $.forms.editors[o.id].html();
            }
            for (var i = 0; i < types.length; i++) { //根据类型进行数据的正确性判断
                vtype = types[i];
                if (vtype !== "") {
                    vtype = vtype.toLowerCase();
                    if (o.tagName == "SELECT") {
                        if (val == "-1" || val == "") {
                            var info = $(o).attr("error") || '请选择信息';
                            $.forms.error(o, info);
                            var pos = $(o).offset();
                            //此处BUG田小军同志以后更改
                            //window.scroll(0, pos.top);
                            return false;
                        }
                    }
                    else if (o.type == "radio" || o.type == "checkbox") {
                        val = $("input[name=" + $(o).attr("name") + "]:checked", $(o).parent().parent()[0]).length;
                        if (val == 0) {
                            var info = $(o).attr("error") || '请选择信息';
                            $.forms.error(o, info);
                            return false;
                        }
                    }
                    else if (val.trim() == "") { //如果值为空时再处理
                        if (vtype == "isnull") {
                            var info = $(o).attr("error") || '此项不能为空';
                            $.forms.error(o, info);
                            var pos = $(o).offset();
                            //此处BUG田小军同志以后更改
                            //window.scroll(0, pos.top);
                            return false;
                        }
                    }
                    else {  //当值不为空时处理
                        if (validateRegExp[vtype] != null) {
                            var pattern = new RegExp(validateRegExp[vtype]);
                            var ret = pattern.test(val);
                            var info = $(o).attr("error") || '数据格式不正确';
                            if (!ret) {
                                $.forms.error(o, info);
                                return false;
                            }
                        }

                        //验证length属性
                        var len = $(o).attr("length");

                        if (len && o.tagName !== "SELECT") {
                            var valText = $(o).value();

                            var slen = 0;
                            if (typeof (valText) == "string") {
                                slen = valText.getLength();
                            }

                            var minLen = len.toString().split('-')[0];
                            var maxLen = len.toString().split('-')[1];
                            maxLen = maxLen || 0;

                            if (slen > maxLen || slen < minLen) {
                                var info = $(o).attr("error") || '输入超过限定长度';
                                $.forms.error(o, info);
                                return false;
                            }
                        }
                    }
                }
            }
            $.forms.success(o);
            return true;
        },

        // 记录当前表单中的编辑器信息
        editors: {},

        // 验证成功的时提示
        success: function (o) {
            var $o = $(o);
            var tip = $("#" + o.id + "_successTip");
            if (tip.length < 1) {
                tip = $(document.createElement(dfs.success.tagName));
                $o.after(tip[0]);
            }

            tip.attr("id", o.id + "_successTip");
            tip.addClass(dfs.success.tagCssName);

            $o.addClass(dfs.success.cssName);

            $o.bind("focus", function () {
                $(this).removeClass(dfs.success.cssName);
                $("#" + this.id + "_successTip").remove();
            });
        },

        //验证失败提示
        error: function (o, info) {
            var $o = $(o);
            var id = "#" + $o.attr("id") + "_ErrorTip";
            var tip = $(id);
            if (tip.length < 1) {
                tip = $(document.createElement(dfs.error.tagName));
                $o.after(tip[0]);
            }
            tip.html(info);
            tip.attr("id", $o.attr("id") + "_ErrorTip");
            //tip.addClass({'left'});

            tip.addClass(dfs.error.tagCssName);

            $o.addClass(dfs.error.cssName);
            //top.pub.error(info,5);

            $o.bind("focus", function () {
                $(this).removeClass(dfs.error.cssName);
                $(id).remove();
            });

            //获取对象的宽度
            var obj = tip[0];
            while (obj) {
                //判断是页面的表单提示还是弹出层的表单提示
                if ($(obj).hasClass('box_content')) {
                    var _w = tip[0].parentNode.offsetWidth;

                    //如果判断他的父级元素高度小于100,那么意味着就会被遮住,这个时候该换方向提示
                    if (tip[0].parentNode.offsetTop <= 100) {
                        tip.css({
                            'left': Number(_w + 10) + 'px',
                            'bottom': '1px'
                        });

                        tip.addClass('extend_error');
                    } else {
                        //判断是否文本域
                        if ($o[0].nodeName == 'TEXTAREA') {
                            tip.css({
                                'bottom': '57px'
                            });
                        }
                    }
                } else if ($(obj).hasClass('custom-area')) {
                    //如果判断他的父级元素高度小于40,那么意味着就会被遮住,这个时候该换方向提示
                    if (tip[0].parentNode.offsetTop <= 40) {
                        var _w = $(tip[0].parentNode).width();
                        tip.css({
                            'left': Number(_w + 10) + 'px',
                            'bottom': '1px'
                        });

                        tip.addClass('extend_error');
                    } else {
                        //判断是否文本域
                        if ($o[0].nodeName == 'TEXTAREA') {
                            tip.css({
                                'bottom': '57px'
                            });
                        }
                    }
                }
                obj = obj.parentNode;
            }
        }
    });

    // 错误提示信息
    var error = function (txt) {
        if (pub && pub.error) {
            if (pub.top)
                pub.top.pub.error(txt);
            else
                pub.error(txt);
        }
        else {
            alert(txt);
        }
    }

    // 成功提示信息
    var tip = function (txt) {
        if (pub && pub.tips) {
            if (pub.top)
                pub.top.pub.tips(txt);
            else
                pub.tips(txt);
        }
        else {
            alert(txt);
        }
    }

    $.extend($.fn, {

        // 表单验证
        formValidate: function () {
            var frms = this.find(dfs.tags);
            var vald = true;
            frms.each(function () {
                var $l = $(this),
                valid = $l.attr("validate"),
                visible = !$l.is(':hidden'),//对元素的可见性进行判断
                isEditor = $l.attr("editor") == "true",
                isRadioOrCheckbox = this.type == "radio" || this.type == "checkbox";

                if (valid && (isEditor || isRadioOrCheckbox || visible)) {
                    var result = $.forms.fieldValidate(this, valid.split("|"));
                    if (!result) {
                        vald = false;
                        return false;
                    }
                }
            });
            return vald;
        },

        // 获取表单元素的值
        getValues: function (type, noEmpty) {
            return this.find(dfs.tags).serialize(type, true)
        },


        getChkValue: function (name) {  //传入需要获取的一组对象的name
            var ret = new Array();
            this.find('[name="' + name + '"]').each(function (el) {
                if (el.checked) {
                    ret.push(el.value);
                }
            });
            return ret.join("|");
        },

        setChkValue: function (name, values) {  //对一组对象进行附值,name一对象的控件Name,values需要对值等于values的控件进行选中,values以竖线(|)隔开
            if (typeof (values) == "string") {
                var vals = values.split('|');
                this.find('[name="' + name + '"]').each(function (el) {
                    for (var i = 0; i < vals.length; i++) {
                        if (vals[i] != "" && vals[i].toLowerCase() == el.value.toLowerCase()) {
                            el.checked = true;
                            return;
                        }
                    }
                });
            }
        },

        // 对表单元素进行赋值
        setValues: function (data, callback, args) {
            if (typeof (data) == "object" && $.isXMLDoc(data)) {  //处理XmlDocument对象
                try {
                    this.find(dfs.tags).each(function () {
                        var el = this,
                        id = this.id || this.name;
                        // 处理var本身不带有name属性的处理
                        if (!id && el.tagName == "VAR") id = $(el).attr('name');

                        // 只有id不空的情况下才进行处理
                        if (id) {
                            if (el.type == "checkbox" || el.type == "radio") {  //判断checkbox,以name为先
                                id = el.name || el.id;
                            }
                            // 如果xml的数据对象中有值存在才进行赋值
                            if ($.xml.hasNode(data, id, 0)) {
                                if ($(this).attr("formatter"))
                                    setValue(el, data);
                                else
                                    setValue(el, $.xml.getNodeValue(data, id, 0)); //取出xml的值并进行附值,区分节点的大小写
                            }
                        }
                    });
                } catch (e) {
                    console.error('forms - 422 err:' + e);
                }
            }
            else {  //处理json格式字符串对象
                var json;
                if (typeof (data) == "object") { //如果为Json格式数据直接使用
                    json = data;
                }
                else {
                    json = eval('(' + data + ')');
                }
                if (!json) return;
                if ($.isArray(json))
                    json = json[0];
                this.find(dfs.tags).each(function () { //对元素进行循环附值
                    var id = this.name || this.id;
                    // 处理var本身不带有name属性的处理
                    if (!id && this.tagName == "VAR") id = $(this).attr('name');

                    if (id) {
                        if (this.type == "checkbox" || this.type == "radio") {  //判断checkbox,以name为先
                            id = this.name || this.id;
                        }
                        if (typeof (json[id]) != "undefined") { //如果值存在则附值给对象
                            if ($(this).attr("formatter"))
                                setValue(this, json);
                            else
                                setValue(this, json[id]);
                        }
                    }
                });
            }


            // 处理数据加载完之后进行回调方法处理 by xp 20120724
            if (typeof (callback) == 'function') {
                if (typeof (args) == "undefined") {
                    args = [];
                }
                callback.apply(this, [window, args]);
            }

            return this;

            function setValue(el, val, form) {  //为远元素附值
                // console.log(el,val,form);
                if (typeof (val) != "undefined") {  //如果值存在则附值给对象

                    //加载Editor，并赋值
                    if ($(el).attr("editor") == "true") {
                        var id = el.id || el.name;
                        //$orms.editors[id].html(val);
                    }

                    //加载图片，显示图片
                    if ($(el).attr("uploads") == "true") {
                        var id = el.id || el.name;
                        if (uploads && uploads.setValue) uploads.setValue($(el).attr("divid"), val);
                    }
                    else { //对普通元素进行处理
                        if (el.type == "select-multiple") {
                            var arry = val.split(",");
                            for (i = 0; i < el.options.length; i++) {
                                for (var j = 0; j < arry.length; j++) {
                                    if (el.options[i].value == arry[j]) {
                                        el.options[i].selected = true;
                                    }
                                }
                            }
                        }
                        else {
                            if (el.tagName == 'IMG') {
                                var imgDomain = imageDomain || ""; //用于处理图片服务器地址配置
                                el.onload = function () {
                                    $(this).scaleZoom();
                                };
                                el.onerror = function () {
                                    el.src = pub.defImgSrc;
                                };
                                el.src = imgDomain + val;
                            }
                            else {
                                //格式化特性method|arg0,arg1,...
                                if($(el).attr("formatter")){
                                    var formatter = $(el).attr("formatter").split('|');
                                    var functionName = formatter[0];
                                    if (typeof window[functionName] === "function") {
                                        var vals = [], args = formatter.length > 1 ? formatter[1].split(',') : [];
                                        if (args.length == 0) {
                                            args.push("data");
                                            vals.push(data);
                                        } else {
                                            for (var i = 0; i < args.length; i++) {
                                                if ($.isXMLDoc(data))
                                                    vals.push($.xml.getNodeValue(val, args[i], 0));
                                                else
                                                    vals.push(val[args[i]]);
                                            }
                                        }
                                        var fun = new Function(args, "return " + functionName + "(" + args.join(',') + ")");
                                        $(el).value(fun.apply(this, vals));
                                    } else {
                                        $(el).value(val);
                                    }
                                }
                                else if ($(el).attr("formatfloat") == "true")
                                    $(el).value(parseFloat(val).toFixed(2));
                                else
                                    $(el).value(val);
                            }
                        }
                    }
                }
            }
        },
        /*
            重置表单
        */
        formReset: function () {        //重置表单元素的值,如果给定了defaultValue将把defaultValue的值附到控件中

            this.find(dfs.tags).each(function (el) {//查找出所有需要处理的元素并获取其默认值,给元素附上默认值
                var cel = $(el),
                    dval = cel.attr('defaultValue');
                //判断类型
                if (el.type === 'text' || el.type === 'hidden') {
                    dval = (dval == null ? '' : dval);
                    cel.value(dval);
                } else if (el.type === 'radio') {
                    //判断是否有马甲的
                    var parent = el.parentNode;
                    if (parent.hasAttribute('radio')) {
                        //全部取消马甲
                        $(parent).removeClass('checked');
                        el.checked = false;

                        //给第一个加上马甲
                        if (el.hasAttribute('checked')) {
                            $(parent).addClass('checked');
                            el.checked = true;
                        };
                    };
                } else if (el.type === 'checkbox') {
                    //判断是否有马甲的
                    var parent = el.parentNode;
                    if (parent.hasAttribute('checkbox')) {
                        //全部取消马甲
                        $(parent).removeClass('checked');
                        el.checked = false;
                    };
                } else if (el.type === 'select-one') {
                    el[0].selected = true;
                } else if (cel.attr("data-type") === 'text') {
                    cel.html("");
                };

            });
            return this;
        },

        /*
            表单进行AjaxPost提交数据,以Json数据格式进行提交
            @1: 请求动作
            @2: 回调方法
            @3: 需要禁用的按钮
            @4: 请求的url地址,本页面可以不用填
        */
        postJson: function (action, func, btn, url) {
            this.ajaxPost(action, func, btn, url, 'json');
        },

        /*
            表单进行AjaxPost提交数据,以Xml数据格式进行提交
            @1: 请求动作
            @2: 回调方法
            @3: 需要禁用的按钮
            @4: 请求的url地址,本页面可以不用填
        */
        postXml: function (action, func, btn, url) {
            this.ajaxPost(action, func, btn, url, 'xml');
        },

        /*
            表单进行AjaxPost提交数据
            @1: 请求动作
            @2: 回调方法
            @3: 需要禁用的按钮
            @4: 请求的url地址,本页面可以不用填
            @5: 数据类型,不给默认为xml数据格式提交
        */
        ajaxPost: function (action, func, btn, url, dataType) {

            // 表单验证判断
            if (!this.formValidate()) {
                error("表单数据不正确");
                return;
            }

            var opt = {};
            if (arguments.length == 1 && $.isObject(arguments[0])) {
                opt = arguments[0];
            }
            else {
                opt = {
                    url: url,
                    action: action,
                    dataType: dataType || "xml",
                    callback: func,
                    arguments: [],
                    button: btn
                };
            }

            opt.data = this.getValues(dataType) + (typeof (opt.data) == "string" ? opt.data : "");

            if (opt.data == "") {
                error("表单数据不正确");
                return;
            }

            if (dataType == "json") {
                opt.data = opt.data.remove(0, 1) + "{\"action\":" + opt.action + opt.data;
            }
            else {
                opt.data = "<action>" + opt.action + "</action>" + opt.data;
            }

            var $btn = $(opt.button),
                btnHtml = $btn.html();

            $.ajax({
                url: opt.url,
                dataType: opt.dataType || "xml",
                data: opt.data,
                loading: function () {
                    if (opt.button && opt.button.disabled) {
                        opt.button.disabled = true;
                    }
                    $btn.html("数据提交中...");
                },
                success: function () {

                    if (opt.button && opt.button.disabled) {
                        opt.button.disabled = false;
                    }

                    $btn.html(btnHtml);

                    if ($.isArray(opt.arguments)) {
                        // 向数组的开头添加元素,在第一位
                        opt.arguments.unshift(arguments);
                    }
                    else {
                        opt.arguments = arguments;
                    }

                    if (typeof (opt.callback) == "function") {
                        opt.callback.apply(this, opt.arguments);
                    }
                },
                error: function () {

                    if (opt.button && opt.button.disabled) {
                        opt.button.disabled = false;
                    }

                    $btn.html(btnHtml);
                    error("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1], 1.5);
                }
            });
        }


    });

    // 默认配置项
    var dfs = {
        success: {
            cssName: "success",
            tagName: "i",
            tagCssName: "bg rm"
        },
        error: {
            cssName: "error",
            tagName: "label",
            tagCssName: "error"
        },
        editor: "kind",
        kindEditor: {
            path: "/Static/Editor/KindEditor.js",
            config: {       //加载editor的方法
                //cssPath: (typeof (jsPath) != "undefined" ? jsPath : '') + '/Editor/themes/qq/qq.css',
                filterMode: true,
                width: 'auto',
                height: '250px',
                uploadJson: '/EditorAshx/upload_json.ashx',
                fileManagerJson: '/EditorAshx/file_manager_json.ashx',
                allowFileManager: true,
                resizeType: 1,
                // allowPreviewEmoticons : false,
                // allowImageUpload : false,
                items: [
                'source', 'fullscreen', '|', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist', 'lineheight', 'indent', 'outdent', '|', 'emoticons', 'table', 'image', 'multiimage', 'link']
            }
        },
        tags: 'input[type="text"],input[type="password"],input[type="hidden"],input[type="radio"],input[type="checkbox"],select,textarea,var,img,[data-type=text]'
    };

    var validateRegExp = {
        decimal: "^([+-]?)\\d*\\.\\d+$", //浮点数
        decimal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
        decimal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
        decimal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
        decimal4: "^([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //非负浮点数（正浮点数 + 0）
        decimal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
        decimal6: "^([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|[1-9]\\d*)$",   //正浮点数与正数
        decimal7: "^([1-9]\\d*.\\d*|0.\\d*[0-9]\\d*|[0-9]\\d*)$",   //正浮点数与正数 (包括0)
        decimal8: "^([1-9]\\d*\\.\\d*|0\\.\\d*[0-9]\\d*|[0-9]\\d*)$",   //正浮点数与正数 (包括0)
        discount: "^0\.\d*[0-9]\d*", //20130427 修改
        intege: "^-?[1-9]\\d*$", //整数
        intege1: "^[1-9]\\d*$", //正整数
        intege2: "^-[1-9]\\d*$", //负整数
        intege3: "^-?[0-9]\\d*$",               //负整数(包括0)
        intege4: "^[0-9]\\d*$",                 //正整数(包括0)
        intordec: "^([1-9]\\d*|[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*)$", //正整数或者正浮点数
        num: "^([+-]?)\\d*\\.?\\d+$", //数字
        num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
        num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
        ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
        english: "^[a-z]*|[A-Z]*$",                                      //仅英文
        chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
        color: "^[a-fA-F0-9]{6}$", //颜色
        date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
        email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        idcard: "^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
        ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
        letter: "^[A-Za-z]+$", //字母
        letter_l: "^[a-z]+$", //小写字母
        letter_u: "^[A-Z]+$", //大写字母
        mobile: "^0?(13|14|15|16|17|18|19)[0-9]{9}$", //手机
        notempty: "^\\S+$", //非空
        password: "^[a-zA-Z0-9\_]{1}([a-zA-Z0-9]|[._]){5,19}$",  //匹配由数字、26个英文字母或者下划线组成的字符串 验证用户密码:“^[a-zA-Z]w{5,17}$”正确格式为：以字母开头，长度在6-18之间，
        fullNumber: "^[0-9]+$", //数字
        picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
        qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
        rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
        tel: "(^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$)|(^(13|14|15|16|17|18|19)[0-9]{9}$)", //电话号码的函数(包括验证国内区号,国际区号,分机号)
        url: "((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?", //url
        domain: "(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?", //domain
        username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //用户名
        deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$", //单位名
        zipcode: "^\\d{6}$", //邮编
        realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
        companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
        companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
        companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$",
        script: /^(([^\^\.<>%&',;=?$"':#@!~\]\[{}\\/`\|])*)$/,
        code: "^[A-Za-z0-9\-\.]+$"         //条码 仅英文和数字
    };

}($, window);

// 自动初始化表单
$(function () {
    $("*[forms]").each(function () {
        $(this).forms();
        //alert(this);
    });
});
