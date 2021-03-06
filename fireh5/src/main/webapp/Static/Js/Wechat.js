//--------------------------------------------------------------------------------------------------
//1. wechat.init(callback, api=null) 初始化，在callback里绑定事件、创建控件
//2. var ps = $('input[type=hidden]').picSelector(opt),以隐藏域为存储控件创建图片选择、上传器
//      opt = {
//           count: 数量上限，默认0，不限制
//           btn: 添加按钮模板，如果按钮在选择器外部，这里设置为null
//           template: 缩略图模板，%URL%为图片url占位标记
//           container: 缩略图列容器，默认为隐藏域父控件
//           isprdimg: 是否是产品图片, 0,1, 默认为0
//           no_thumb: 不生成缩略图，0,1，默认0
//           defaultPic: 没有图片时显示的默认图片
//           clip: {width:xxx, height:xxx} 裁剪
//           onAdd: 图片添加回调，function(pic, url){}
//                  pic: 添加到容器的缩略图控件，可以绑定删除操作ps.delete(pic);
//                  url: 添加的图片url
//      }
//3. ps.add() 添加图片，返回false说明数量达到上限，如果提供了添加按钮模板不需要主动调用
//4. ps.delete(pic) 删除图片项，pic可以是序号和图片项
//5. ps.replace(pic) 替换图片项，pic可以是序号和图片项
//6. ps.sync(callback) 同步上传未本地图片, callback = function(result, urls){}
//       result: true 上传完成, false不支持上传，
//       urls: 不论上传是否支持，返回所有远程图片url，逗号分隔，隐藏域中也会保存
//--------------------------------------------------------------------------------------------------

// 扩展对象的图片选择方法
$.fn.picSelector = function (opt) {
    var _this = $(this);
    var config = {
        count: 0,
        btn: '<a class="add-btn" href="javascript:void(0);"></a>',
        template: '<span><img src="%URL%" /></span>',
        defaultPic: '',
        clip: { width: 0, height: 0 },
        container: null,
        onAdd: null,
        islocal: false,//是否启用本地模式
        isApp: false,
    };
    for (var k in opt) {
        config[k] = opt[k];
    }
    if (!config.container) {
        config.container = _this.parent();
        config.selfParent = true;
    }

    var btn = null;
    var def = null;
    var pictures = [];
    function _clip(c) {
        var img = $(this);
        var src = img.attr('src');
        var parent = img.parent();
        if (parent.attr('data-role') == 'clip-cover') {
            img = parent;
            parent = parent.parent();
        }
        var pw = parent.width(), ph = parent.height();
        if (pw == 0 || ph == 0) pw = ph = Math.max(pw, ph);
        var x = c.x * c.orginalWidth, y = c.y * c.orginalHeight
        var width = c.orginalWidth * c.width, height = c.orginalHeight * c.height;
        var z = Math.min(pw / width, ph / height);
        var vw = width * z, vh = height * z;
        img.remove();
        parent.append('<span style="display:inline-block;position:relative;overflow: hidden;width:' + Math.round(vw) + 'px;height:' + Math.round(vh) + 'px;" data-role="clip-cover">' +
            '<img src="' + src + '" style="position:absolute;max-width:none;max-height:none;min-width:none;min-width:none;width:' + Math.round(z * c.orginalWidth) + 'px;height:' + Math.round(z * c.orginalHeight) + 'px;left:' + Math.round(-x * z) + 'px;top:' + Math.round(-y * z) + 'px;right:auto;bottom:auto" />' +
            '</span>');

    }
    function add(pic) {

        wx.getLocalImgData({
            localId: pic.url, // 图片的localID
            async: false,
            success: function (res) {
                var baseData = res.localData; // localData是图片的base64数据，可以用img标签显示      
                pic.baseData = baseData;
            }
        });

        pictures.push(pic);
        if (btn != null) {
            btn.remove();
            btn = null;
        }
        if (def) {
            def.remove();
            def = null;
        }
        var p = $(config.template.replace("%URL%", pic.url)).appendTo(config.container);
        if (pic.clip) {
            _clip.call(p[0].tagName.toLowerCase() == 'img' ? p[0] : p.find('img')[0], pic.clip);
        }
        if (typeof (config.onAdd) == 'function') config.onAdd(p, pic.url);
        if (config.btn && (config.count == 0 || config.count > pictures.length)) {
            btn = $(config.btn).appendTo(config.container).click(_this.add);
        }
    };
    _this.getPictures = function () {
        return pictures == null ? [] : pictures;
    },
    _this.add = function (i) {
        if (i == undefined && config.count > 0 && config.count <= pictures.length) return false;
        wx.checkJsApi({
            jsApiList: ['chooseImage'],
            success: function (res) {

                if (res.checkResult.chooseImage) {
                    wx.chooseImage({
                        count: i >= 0 ? 1 : (config.count == 0 ? 9 : config.count - pictures.length),
                        success: function (res) {
                            //进行裁剪
                            if (config.clip && config.clip.width > 0 && config.clip.height > 0) {
                                var j = 0;
                                function clip() {
                                    if (j < res.localIds.length) {
                                        clipImage(res.localIds[j], config.clip.width, config.clip.height, function (clipData) {
                                            if (i >= 0 && i < pictures.length) {
                                                var img = config.container.children()[i + (config.selfParent ? 1 : 0)].find('img').attr('src', res.localIds[j]);
                                                _clip.call(img[0], clipData);
                                                pictures[i] = { url: res.localIds[j], local: true, clip: clipData };
                                            } else {
                                                add({ url: res.localIds[j], local: true, clip: clipData });
                                            }
                                            j++;
                                            clip();
                                            return true;
                                        });
                                    }
                                }
                                clip();
                            } else {
                                if (i >= 0 && i < pictures.length && res.localIds.length > 0) {
                                    config.container.children()[i + (config.selfParent ? 1 : 0)].find('img').attr('src', res.localIds[0]);
                                    pictures[i] = { url: res.localIds[j], local: true };
                                } else {
                                    for (var j = 0; j < res.localIds.length; j++) {
                                        add({ url: res.localIds[j], local: true });

                                    }
                                }
                            }
                        }, error: function () {
                            alert("add 错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                        }
                    });
                } else {
                    alert('不支持chooseImage接口');
                }
            }
        });
        return true;
    };
    function index(p) {
        var i = -1;
        var cs = config.container.children();
        for (var j = 0; j < cs.length; j++) {
            if (p[0] == cs[j][0]) {
                i = j;
                break;
            }
        };
        if (config.selfParent) i--;
        return i;
    }
    _this.replace = function (i) {
        if (typeof (i) == 'object') {
            i = index(i);
        }
        i = i >= 0 ? i : 0;
        if (i >= 0 && i < pictures.length) {
            _this.add(i);
        } else {
            _this.add();
        }
    };

    _this.delete = function (p) {
        var i = typeof (p) == 'object' ? index(p) : p;
        if (i >= 0) {
            var b = p.attr('data-default') == '1';
            p.remove();
            pictures.splice(i, 1);
            if (!b) {
                if (pictures.length == 0 && config.defaultPic) {
                    def = $(config.template.replace('%URL%', config.defaultPic)).appendTo(config.container).attr('data-default', '1');
                }
                if (btn == null && config.btn) {
                    btn = $(config.btn).appendTo(config.container).click(_this.add);
                }
            }
        }
    };


    _this.sync = function (callback) {
        wx.checkJsApi({
            jsApiList: ['uploadImage'],
            success: function (res) {
                if (res.checkResult.uploadImage) {
                    var i = 0;
                    function upload() {
                        while (i < pictures.length && !pictures[i].local) {
                            i++;
                        }
                        if (i == pictures.length) {
                            var a = [];
                            i = 0;
                            while (i < pictures.length) {
                                if (!pictures[i].local) { a.push(pictures[i].url) };
                                i++;
                            }
                            _this.value(a.join(','));
                            if (typeof (callback) == 'function') {
                                callback(true, a.join(','));
                            }
                        } else {
                            var opt = {
                                localId: pictures[i].url,
                                isShowProgressTips: 1,
                                success: function (res) {
                                    $.post({
                                        url: '/wechat.axd',
                                        data: '<action>pullWeixinImage</action>' +
                                            '<serverId>' + res.serverId + '</serverId>' +
                                            (pictures[i].clip ? '<cut_image>' + pictures[i].clip.x + '|' + pictures[i].clip.y + '|' + pictures[i].clip.width + '|' + pictures[i].clip.height + '|' + pictures[i].clip.targetWidth + '|' + pictures[i].clip.targetHeight + '</cut_image>' : '') +
                                            (config.isprdimg ? '<isprdimg>1</isprdimg>' : '') +
                                            (config.no_thumb ? '<no_thumb>1</no_thumb>' : ''),
                                        dataType: 'xml',
                                        success: function () {
                                            var r = eval('(' + arguments[1].text + ')');
                                            //alert(arguments[1].text);
                                            if (r.code == 0) {
                                                pictures[i].url = r.data.url;
                                                pictures[i].local = false;
                                                i++;
                                                upload();
                                            } else {
                                                alert('第' + (i + 1) + '张' + r.msg);
                                            }
                                        },
                                        error: function () {
                                            alert("错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                                        }
                                    });
                                },
                                fail: function (res) {
                                    i++;
                                    upload();
                                }
                            };
                            wx.uploadImage(opt);
                        }
                    }
                    upload();
                } else if (typeof (callback) == 'function') {
                    callback(false, '不支持uploadImage接口');
                }
            }
        });
    };

    setTimeout(function () {
        var v = _this.value();
        //console.log(v);
        if (typeof (v) == "string") {
            var a = v.split(',');
            for (var i = 0; i < a.length; i++) {
                add({ url: a[i], local: false });
            }
        } else {
            if (config.defaultPic) {
                def = $(config.template.replace('%URL%', config.defaultPic)).appendTo(config.container).attr('data-default', '1');
            }
            if (config.btn && (config.count == 0 || config.count > pictures.length)) {
                btn = $(config.btn).appendTo(config.container).click(_this.add);
            }
        }
    }, 10);
    return _this;
};
//--------------------------------------------------------------------------------------------------
//图文编辑器，两种用法：
//1.var editor = $(selector).editor(opt); selector为隐藏域、文本框等，初始内容为隐藏域、文本框的内容，也可为html(字符串）替换
//2.var editor = $.editor(opt);
//      opt = {
//           container: 编辑器容器，如果是第一种用法而且该字段为空时，默认为隐藏域、文本框的父控件
//           height: 编辑框高度，未设置时受css控制
//      }
//      editor.html(字段串) 设置编辑器内容
//      editor.html(回调函数) 获取编辑内容，如果有未上传的图片自动上传，
//                            最终内容保存进隐藏域、文本框和编辑器，并作为参数传给回调函数
//--------------------------------------------------------------------------------------------------
$.editor = $.fn.editor = function (opt) {
    var _this = $(this);
    var config = {
        container: null,
    };
    if (opt)
        for (var k in opt) {
            config[k] = opt[k];
        }
    if (!config.container) {
        config.container = _this.parent();
    }
    var box = $('<div class="content editor"></div>').appendTo(config.container);
    var toolbar = $('<div class="menu box box-horizontal">' +
                        '<a href="javascript:" class="btn box-flex"><i class="iconfont i-tuwen2"></i></a>' +
                        '<a href="javascript:" class="btn box-flex"><i class="iconfont i-jiacu"></i></a>' +
                        '<a href="javascript:" class="btn box-flex"><i class="iconfont i-zuoduiqi"></i></a>' +
                        '<a href="javascript:" class="btn box-flex"><i class="iconfont i-juzhong"></i></a>' +
                        '<a href="javascript:" class="btn box-flex"><i class="iconfont i-youduiqi"></i></a>' +
                    '</div>').appendTo(box);
    var editor = $('<div class="text-area" contenteditable="true"' + (config.height > 0 ? ' style="height:' + config.height + 'px"' : '') + '></div>').appendTo(box);
    toolbar.find('.i-tuwen2').click(function () {
        wx.chooseImage({
            count: 5,
            success: function (r) {
                var a = r.localIds;
                for (var i = 0; i < a.length; i++) {
                    editor[0].focus();
                    document.execCommand('insertImage', true, a[i]);
                }
            }
        });
    });
    toolbar.find('.i-jiacu').click(function () {
        editor[0].focus();
        document.execCommand('bold', true);
    });
    toolbar.find('.i-zuoduiqi').click(function () {
        editor[0].focus();
        document.execCommand('justifyLeft', true);
    });
    toolbar.find('.i-juzhong').click(function () {
        editor[0].focus();
        document.execCommand('justifyCenter', true);
    });
    toolbar.find('.i-youduiqi').click(function () {
        editor[0].focus();
        document.execCommand('justifyRight', true);
    });
    if (_this.value) {
        _this.hide();
        editor.html(_this.value());
    }
    _this.html = function (v) {
        if (typeof (v) == 'string') {
            editor.html(v);
            if (_this.value) _this.value(v);
            return _this;
        } else {
            var h = editor.html();
            var need_upload = [];
            h.replace(/<img[^>]*\s+src="((wx[\w\d]*|weixin):\/\/[^"]+)"[^>]*>/gi, function (a, b) {
                if (need_upload.indexOf(b) == -1) {
                    need_upload.push(b);
                }
            });
            //有本地图片需要上传
            if (need_upload.length) {
                var i = 0;
                function upload() {
                    if (i < need_upload.length) {
                        var opt = {
                            localId: need_upload[i],
                            isShowProgressTips: 1,
                            success: function (res) {
                                $.post({
                                    async: false,
                                    url: '/wechat.axd',
                                    data: '<action>pullWeixinImage</action><serverId>' + res.serverId + '</serverId><isprdimg>' +
                                    (config.isprdimg ? '1' : '0') + '</isprdimg><no_thumb>' + (config.no_thumb ? '1' : '0') + '</no_thumb>',
                                    dataType: 'xml',
                                    success: function () {
                                        var r = eval('(' + arguments[1].text + ')');
                                        if (r.code == 0) {
                                            editor.html(h = h.replace(new RegExp(need_upload[i].replace(/\./g, '\\.').replace(/\//g, '\\/'), 'g'), r.data.domain + r.data.url));
                                            if (_this.value) _this.value(h);
                                            i++;
                                            upload();
                                        } else {
                                            alert('第' + (i + 1) + '张' + r.msg);
                                            if (typeof (v) == 'function') { v(false); }
                                        }
                                    },
                                    error: function () {
                                        alert(arguments[1].text);
                                    }
                                });
                            },
                            fail: function (res) {
                                alert('第' + (i + 1) + '张上传失败');
                                if (typeof (v) == 'function') { v(false); }
                            }
                        };
                        wx.uploadImage(opt);
                    } else {
                        if (typeof (v) == 'function') {
                            v(h);
                        }
                    }
                }
                upload();
            } else {
                if (typeof (v) == 'function') {
                    v(h);
                }
            }
        }
    }
    return _this;
}

///图片裁剪器
function clipImage(url, w, h, callback) {
    var ww = $(window).width(), wh = $(window).height() - 50;
    var iw = 0, ih = 0;
    var tchs = 0, px = 0, py = 0, x = 0, y = 0, z = 0, l = 0, center = { x: 0, y: 0 };
    var zoom = 1;
    if (ww - 10 < w || wh - 10 < h) {
        zoom = Math.min((ww - 10) / w, (wh - 10) / h);
    }
    var back = $('<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:1000000"></div>').appendTo($('body'));
    var img = $('<img src="' + url + '" style="position:fixed;z-index:1000001" />').appendTo($('body')).bind('load', function () {
        iw = $(this).width() * zoom;
        ih = $(this).height() * zoom;
        $(this).css({ left: (ww - iw) / 2, top: (wh - ih) / 2, width: iw, height: ih });
    });
    var view = { x: parseInt((ww - w * zoom) / 2) * zoom, y: parseInt((wh - h * zoom) / 2) * zoom, width: w * zoom, height: h * zoom };
    var cover = $('<div style="position:fixed;top:0;left:0;width:100%;height:100%;box-sizing: border-box;border:1px solid rgba(0,0,0,0.8);z-index:1000002; border-width:' + view.y + 'px ' + view.x + 'px ' + (view.y + 50) + 'px;"></div>')
    .appendTo($('body')).bind('touchstart', function (e) {
        e.preventDefault();
        var ts = e.touches;
        x = parseInt(img.css('left'));
        y = parseInt(img.css('top'));
        z = img.width() / iw;
        tchs = ts.length;
        px = ts[0].pageX;
        py = ts[0].pageY;
        if (ts.length > 1) {
            l = Math.sqrt((ts[0].pageX - ts[1].pageX) * (ts[0].pageX - ts[1].pageX) + (ts[0].pageY - ts[1].pageY) * (ts[0].pageY - ts[1].pageY));
            center = { x: view.x + view.width / 2, y: view.y + view.height / 2 };
        }
    }).bind('touchmove', function (e) {
        e.preventDefault();
        var ts = e.touches;
        if (tchs == 1) {//移动
            img.css({ left: x + ts[0].pageX - px, top: y + ts[0].pageY - py });
        } else if (tchs > 1) {//缩放
            var l2 = Math.sqrt((ts[0].pageX - ts[1].pageX) * (ts[0].pageX - ts[1].pageX) + (ts[0].pageY - ts[1].pageY) * (ts[0].pageY - ts[1].pageY));
            var r = l2 / l;
            var z2 = z * r;
            if (z2 > 0.1 && z2 < 2) {
                img.css({ width: z2 * iw, height: z2 * ih, left: (x - center.x) * r + center.x, top: (y - center.y) * r + center.y });
            }
        }
    });
    var buttons = $('<div style="position:fixed;width:100%;bottom:0;left:0;z-index:1000003">' +
        '<a href="javascript:" style="display:inline-block;width:50%;text-align:center;color:#fff;background:green;line-height:50px;letter-spacing:0.5em">确定<a>' +
        '<a href="javascript:" style="display:inline-block;width:50%;text-align:center;color:#fff;background:red;line-height:50px;letter-spacing:0.5em">取消<a>' +
        '</div>').appendTo($('body')).find('a').click(function () {
            if ($(this).html() == '确定') {
                var x = (view.x - parseInt(img.css('left'))) / img.width();
                var y = (view.y - parseInt(img.css('top'))) / img.height();
                var cw = view.width / img.width();
                var ch = view.height / img.height();
                if (typeof (callback) == 'function' && !callback({ x: x, y: y, width: cw, height: ch, targetWidth: w, targetHeight: h, orginalWidth: iw / zoom, orginalHeight: ih / zoom })) {
                    return;
                }
            }
            back.remove();
            cover.remove();
            img.remove();
            buttons.remove();
        });
}

function openLocation(longitude, latitude, name, address) {
    wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: name,
        address: address
    });
}

function gcj02_to_bd09(lng, lat) {
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * Math.PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * Math.PI);
    return { lng: z * Math.cos(theta) + 0.0065, lat: z * Math.sin(theta) + 0.006 };
}


function bd09_to_gcj02(lng, lat) {
    var x = lng - 0.0065, y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
    return { lng: z * Math.cos(theta), lat: z * Math.sin(theta) };
}

//定位
function getLocation(longitude, latitude, callback) {
    function createMap(lng, lat) {
        var p = gcj02_to_bd09(lng, lat);
        var container = $('<div style="width:100%;height:100%;position:absolute;z-index:1000001" id="baidu_map"></div>').appendTo($('body'));
        var map = new BMap.Map('baidu_map');
        var point = new BMap.Point(p.lng, p.lat);
        map.centerAndZoom(point, 18);
        map.addControl(new BMap.NavigationControl());

        var cross = $('<div style="position:absolute;width:40px;height:40px;z-index:1000002;left:50%;top:50%;margin-left:-20px;margin-top:-40px;background:url(/static/images/locate.png) no-repeat center;background-size:100%"></div>').appendTo($('body'));

        var buttons = $('<div style="position:fixed;width:100%;bottom:0;left:0;z-index:1000003">' +
            '<a href="javascript:" style="display:inline-block;width:50%;text-align:center;color:#fff;background:green;line-height:50px;letter-spacing:0.5em">确定<a>' +
            '<a href="javascript:" style="display:inline-block;width:50%;text-align:center;color:#fff;background:red;line-height:50px;letter-spacing:0.5em">取消<a>' +
            '</div>').appendTo($('body')).find('a').click(function () {
                if ($(this).html() == '确定') {
                    var p = map.getCenter();
                    var geocoder = new BMap.Geocoder();
                    geocoder.getLocation(p, function (rs) {
                        callback(bd09_to_gcj02(p.lng, p.lat), rs.addressComponents);
                    });
                }
                container.remove();
                cross.remove();
                buttons.remove();
            });
    }
    if (latitude > 0 && longitude > 0) {
        createMap(longitude, latitude);
    } else {
        wx.checkJsApi({
            jsApiList: ['getLocation'],
            success: function (res) {
                if (res.checkResult.getLocation) {
                    wx.getLocation({
                        type: 'gcj02',
                        success: function (res) {
                            createMap(res.longitude, res.latitude);
                        }
                    });
                }
            }
        });
    }
}

//高德地图定位
function getAMapLocation(longitude, latitude, callback) {
    function createMap(lng, lat) {
        var container = $('<div style="width:100%;height:100%;position:absolute;z-index:1000001" id="gaode_map"></div>').appendTo($('body'));
        var map, geolocation;
        /*加载地图，调用浏览器定位服务*/
        map = new AMap.Map('gaode_map', {
            resizeEnable: true,
            zoom: 16,
            center: [lng, lat]
        });

        var cross = $('<div style="position:absolute;width:40px;height:40px;z-index:1000002;left:50%;top:50%;margin-left:-20px;margin-top:-40px;background:url(/static/images/locate.png) no-repeat center;background-size:100%"></div>').appendTo($('body'));

        var buttons = $('<div style="position:fixed;width:100%;bottom:0;left:0;z-index:1000003">' +
            '<a href="javascript:" style="display:inline-block;width:50%;text-align:center;color:#fff;background:green;line-height:50px;letter-spacing:0.5em">确定<a>' +
            '<a href="javascript:" style="display:inline-block;width:50%;text-align:center;color:#fff;background:red;line-height:50px;letter-spacing:0.5em">取消<a>' +
            '</div>').appendTo($('body')).find('a').click(function () {
                if ($(this).html() == '确定') {
                    var p = map.getCenter();
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress([p.lng, p.lat], function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            callback({ lng: p.lng, lat: p.lat }, result.regeocode.addressComponent);
                        }
                    });
                }
                container.remove();
                cross.remove();
                buttons.remove();
            });
    }
    if (latitude > 0 && longitude > 0) {
        createMap(longitude, latitude);
    } else {
        wx.checkJsApi({
            jsApiList: ['getLocation'],
            success: function (res) {
                if (res.checkResult.getLocation) {
                    wx.getLocation({
                        type: 'gcj02',
                        success: function (res) {
                            createMap(res.longitude, res.latitude);
                        }
                    });
                }
            }
        });
    }
}

wechat = {
    init: function (callback, api) {
        var url = location.href.replace(/#.*$/, '');
        var c = api && api.indexOf('uploadImage') == -1 & localStorage.getItem(url);
        if (c) {
            if (typeof (callback) == 'function') callback();
        } else {

            wx.ready(function () {
                localStorage.setItem(url, true);
                if (typeof (callback) == 'function') callback();
            });
            $.post('/wechat.axd', {
                data: '<action>signature</action><url>' + url + '</url>',
                dataType: 'xml',
                success: function () {
                    var r = eval('(' + arguments[1].text + ')');
                    wx.config({
                        debug: false,
                        appId: r.appId,
                        timestamp: r.timestamp,
                        nonceStr: r.nonceStr,
                        signature: r.signature,
                        jsApiList: api ? api : ['chooseImage', 'getLocation', 'openLocation', 'uploadImage', 'scanQRCode']
                    });
                },
                error: function () {
                    alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                }
            });
        }
    }
};

var ecwx = {
    ps: null,
    param: {},
    IsWx: false,
    isApp: false,
    useFkFlag: -1,
    appType: 0,
    ext: {},
    imgTemplate: '<li><i class="trashIcon" onclick="$(this.parentNode).remove();"></i><a href="javascript:void(0);"><img class="pay_pic" src="${_.url}" alt=""/></a></li>',
    imgsTemplate: '{@each _.imgs as img,indx}<li><i class="trashIcon" onclick="$(this.parentNode).remove();"></i><a href="javascript:void(0);"><img class="pay_pic" src="${img}" alt=""/></a></li>{@/each}',
    init: function (param) {
        ecwx.IsWx = (param.isWx == true);
        ecwx.isApp = (param.isApp == true);
        ecwx.useFkFlag = param.useFkflag || 0;
        ecwx.ext = param.ext || {};
        ecwx.param = param;
        if (param && param.actions) {
            ecwx.extend(param.actions);

            //ecwx.initialize(
            //    {
            //        isWx: true,
            //        isApp: true,
            //        useFkflag: 1,
            //        actions: [
            //            { action: 'image', btn: '#btnWxImage', maxCount: 3, fn: null },
            //            { action: 'scan', btn: ['#btnScanCode', '#btnUserScanCode'], fn: function (r) { onScanComplete(r); } }
            //        ]
            //    });

        }
    },
    initialize: function (isWx, isApp, useFkflag, para) {
        ecwx.IsWx = isWx;
        ecwx.isApp = isApp;
        ecwx.useFkFlag = useFkflag;
        ecwx.ext = (para && para.ext) ? para.ext : {};
        ecwx.extend(para.actions);
    },
    extend: function (actions) {
        if (actions && actions.length > 0) {
            for (var i = 0, len = actions.length; i < len; i++) {
                var act = actions[i];
                if (act.action == 'image') {
                    ecwx.initImage(act);
                }
                else if (act.action == 'scan') {
                    ecwx.initScan(act);
                }
            }
        } else {
            pub.error("微信扩展功能初始加载异常！请稍后重试.");
        }
    },
    initImage: function (ipara) {
        var btn = $(ipara.btn);
        if (btn) {
            $(btn).bind("click", function () {
                ecwx.upImage(ipara);
            });
        }
        if (window.wx) {
            var container = ipara.container || "#logo-pic";
            var selector = ipara.selector || "#Ticket";
            var template = ipara.template || '<li><a href="javascript:void(0);" id="logo-pic"><img src="%URL%"  alt=""/></a></li>';
            var config = {
                count: ipara.maxCount || 3,
                btn: null,
                template: template,
                container: $(container),
                onAdd: function (pic, url) {
                    if (typeof (ipara.addCompeleted) == 'function') {
                        ipara.addCompeleted(url);
                    }
                    var c = $(container).children();
                    var clen = c.length - 1;
                    if (clen > ipara.maxCount) {
                        ecwx.ps.delete($(c[0]));
                    } else if (clen == ipara.maxCount) {
                        $(btn).hide();
                        pub.alert("最多上传{0}张图片".format(ipara.maxCount));
                    }
                }
            };
            if (ipara.clip)
                config.clip = ipara.clip;// { width: 0, height: 0 };          
            wechat.init(function () {
                ecwx.ps = $(selector).picSelector(config);
            });
        }
    },
    upImage: function (ipara) {
        if (ecwx.IsWx && window.wx != undefined) {
            ecwx.ps.add(ipara.maxCount);
        } else if (ecwx.isApp) {
            var imgDomain = "";
            //if (typeof (JsTakePhotoFunction) == 'function') {
            //    JsTakePhotoFunction(imgDomain);
            //} else {
            //    pub.error("App request was aborted！ JsTakePhotoFunction Is Not Find!", 2);
            //}
            if (typeof (appMultiPickPhoto) == 'function') {
                appMultiPickPhoto('{\"callBack\":\"ecwx.onAppImageCompleted\",\"maxCount\":3}');
            } else {
                pub.error("App request was aborted！ appMultiPickPhoto Is Not Find!", 2);
            }

        }
        else {
            pub.error("请在微信或App中使用此功能...");
        }
    },
    onAppImageComplete: function (imgUrl) {
        if (imgUrl == undefined || imgUrl == '') {
            pub.error("很抱歉，获取图片信息失败，请稍后重试...");
        } else {
            var html = jte(ecwx.imgTemplate, { url: imgUrl });
            var c = $("#logo-pic");
            if (c.length > 3) {
                pub.alert("最多上传{0}张图片".format(3));
            } else {
                c.append(html);
            }
        }
    },
    onAppImageCompleted: function (imgUrls) {
        if (imgUrls == undefined || imgUrls == '') {
            pub.error("很抱歉，获取图片信息失败，请稍后重试...");
        } else {
            var json = $.parseJSON(imgUrls);// { imgs: imgUrls } 
            var html = jte(ecwx.imgsTemplate, json);
            var c = $("#logo-pic");
            if (c.length > 3) {
                pub.alert("最多上传{0}张图片".format(3));
            } else {
                c.append(html);
            }
        }
    },
    initScan: function (spara) {
        var btns = [];
        if (typeof (spara.btn) == 'string') {
            btns.push(spara.btn);
        }
        else { btns = spara.btn; }
        for (var i = 0, len = btns.length; i < len; i++) {
            var ebtn = $(btns[i]);
            if (ebtn) {
                $(ebtn).bind("click", function () {
                    ecwx.scanCode(spara);
                });
            }
        }
    },
    scanCode: function (spara) {
        if (ecwx.isApp) {
            if (typeof (JsOpenScanFunction) == "function") {
                JsOpenScanFunction("onScanComplete");
            }
            else {
                pub.alert("JsOpenScanFunction is not find");
            }
        } else if (ecwx.IsWx) {
            if (window.wx) {
                wechat.init();
            }
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    if (res.errMsg == "scanQRCode:ok") {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        if (spara && spara.fn)//如果存在回调就执行回调
                        { spara.fn(result); }
                    } else {
                        pub.error("扫码信息识别错误,请稍后重试...");
                    }
                }
            });
        } else {
            pub.error("请在微信或App中使用此功能...");
        }
    },
    getImages: function () {
        var imgs = $(".pay_pic");
        var txt = '';
        if (imgs && imgs.length > 0) {
            for (var i = 0, len = imgs.length; i < len; i++) {
                var img = imgs[i];
                var src = $(img).attr('src');
                txt += "<Image>{0}</Image>".format(src);
            }
        }
        return txt;
    },
    remove: function (t) {
        $(t.parentNode).remove();
        try {
            var pictures = ecwx.ps.getPictures();
            ecwx.ps.delete(pictures[0]);
        } catch (e) { pub.tips("[remove]" + e.name + "==>" + e.message); }
    },
    sync: function (callback) {
        if (ecwx.IsWx == false && ecwx.isApp == false) {
            if (typeof (callback) == 'function')
                callback({ Success: true }, '');
            return;
        }
        var rec = { success: 0 };
        var pictures = [];
        if (ecwx.IsWx && ecwx.ps != null) {
            if (typeof (ecwx.ps.getPictures) == 'function')
                pictures = ecwx.ps.getPictures();
        }
        else if (ecwx.isApp) {
            pictures = ["app image"];
        }
        if (pictures == undefined || pictures.length < 1) {
            if (typeof (callback) == 'function')
                callback({ Success: true }, '');
            else {
                pub.tips("没有需要上传的图片！", 2);
            }
            return;
        }
        var images = '';
        function upload() {
            for (var i = 0, len = pictures.length; i < len; i++) {
                var pic = pictures[i];

                if (ecwx.isApp) {
                    images = ecwx.getImages();
                }
                else {
                    images += "<Image><![CDATA[{0}]]></Image>".format(pic.baseData);
                    //wx.getLocalImgData({
                    //    localId: pic.url, // 图片的localID
                    //    async: false,
                    //    success: function (res) {
                    //        var baseData = res.localData; // localData是图片的base64数据，可以用img标签显示      
                    //        images += "<Image>{0}<Image>".format(baseData);
                    //        if (i == len - 1)
                    //            sync();
                    //    }
                    //});
                }

            }
            if (images.length > 0)
                imgsync();

        }
        function imgsync() {
            var data = "<action>upload.images</action><FkFlag>" + ecwx.useFkFlag + "</FkFlag><Images>" + images + "</Images>";//.format(1, images);

            if (images.length > 0) {
                $.ajax({
                    type: "post",
                    url: "/Core.axd",
                    dataType: "xml",
                    data: data,//"<action>upload.images</action><FkFlag>{0}</FkFlag><Images>{1}</Images>".format(1, images),
                    success: function () {
                        var r = ECF.parseJSON(arguments[1].text);
                        if (r.Success) {
                            if (typeof (callback) == 'function')
                                callback(r, r.Content);
                            else {
                                pub.tips("图片上传成功！", 2);
                            }
                        } else {
                            pub.error(r.Message, 2);
                        }
                    },
                    error: function () {
                        alert("数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
                    }
                });
            }
        }
        upload();
    },
    test: function () {
        var images = "<Image>data:image/jpeg;base64,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</Image>";
        var imgx = "<Image>data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACz6ADAAQAAAABAAAFAAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8IAEQgFAALPAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMCBAEFAAYHCAkKC//EAMMQAAEDAwIEAwQGBAcGBAgGcwECAAMRBBIhBTETIhAGQVEyFGFxIweBIJFCFaFSM7EkYjAWwXLRQ5I0ggjhU0AlYxc18JNzolBEsoPxJlQ2ZJR0wmDShKMYcOInRTdls1V1pJXDhfLTRnaA40dWZrQJChkaKCkqODk6SElKV1hZWmdoaWp3eHl6hoeIiYqQlpeYmZqgpaanqKmqsLW2t7i5usDExcbHyMnK0NTV1tfY2drg5OXm5+jp6vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAQIAAwQFBgcICQoL/8QAwxEAAgIBAwMDAgMFAgUCBASHAQACEQMQEiEEIDFBEwUwIjJRFEAGMyNhQhVxUjSBUCSRoUOxFgdiNVPw0SVgwUThcvEXgmM2cCZFVJInotIICQoYGRooKSo3ODk6RkdISUpVVldYWVpkZWZnaGlqc3R1dnd4eXqAg4SFhoeIiYqQk5SVlpeYmZqgo6SlpqeoqaqwsrO0tba3uLm6wMLDxMXGx8jJytDT1NXW19jZ2uDi4+Tl5ufo6ery8/T19vf4+fr/2wBDAAYGBgYGBgoGBgoOCgoKDhIODg4OEhcSEhISEhccFxcXFxcXHBwcHBwcHBwiIiIiIiInJycnJywsLCwsLCwsLCz/2wBDAQcHBwsKCxMKChMuHxofLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi7/2gAMAwEAAhEDEQAAAfO9iGHrBFMsd7VXlvqrs8HTfOelrkd1bSuf3c6uG13dVxW7rj6a636CuI0moG7Udcduh56ttq22rbattq22rbattfVQ62tq5PPBUDdpxVTu04uttq22rbattq22rbattq2u7GuT1hX1tNrVTui52tumv6861zTVteIqm3SIrntet6qtY+i15TvV9XlG66mqqxg1u54aa94rfIIr0b0b5vNXoPaeBOK9aqvN01Z3vFv66Pcw/q0lZKZdDwVzV5TprasrSt1cymIrr+g81uKrWm1bbVttW21bbVttW21Z4zLXadF54aodVCa9Q4XUleo+WXlBQ9tW21bbVttW21bbVttXV9j5wSn3MOG9WfQ8W/qa/avVug8a7CmnEmDXc1jSKv2Ia6uiZ1FlQfefnbua9Q3mGEx4roqw15xxRVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVtOqNOqNtW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW2moyoqNtWyoqNtW06o21bTFbTFbZVJ0xW21bbVttW21bbVttW21bbVttW21bbVttW06o0xW21bbVO2qDT6jQfLn7CrsT2wpnUXjSoKo1Nqx8auZ21bbVttW21bbVttW21bbVur5S/q/u+cPROWuaOuk6QF6Ko4/0LlqrbyrszTyPeVIuTeU3cGdRQ4U8h6ZWmumVL0Ih8l2XnRrvp6rpao6vrqUXnm2NttW21bbVttW21bbVttW21bbVp2qNPS1zW6B3XKa5f1y8XtHUadW21WnoPlVvVUn1Hy+r+ybWNWHH3DOpsRMaKLIrndtW21bbVttW21bbVttW21boeev67oLGlFb8j2NUa8tqslP8AnLSsE3teV6g1kyGxFyPZVNobjsx1OndVY10vV81d04847LmaLf1/RVRsetoa4DTFbbVttW21bbVttW21bbVttW21bbVuz4zV1r3hdXR2fE6un5jattq22rbanrLattq22rbattq22rbattq22rbattq22rbasQerbaii2owdqxg6lJ2pSdqmU6ttqyk6jQLUuR6stGpaNq22rbattq22rbattq22rbattq22rbattq22rbattq22rb2HV4/HsOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6vHt7Dq8e3sOrx7ew6u22wmdDZ0FO7rlugq556aGu+pUNaIqnPV/UwzqzdcpYV2u2rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq2jhK7zVvOV2uCatzPScJV6TjOrrpNtW21bbUPiO3oap+sZuabc10TWn9Y/dVyLq+mquq6xxXNGcvatdtW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVuT6ysqKfoaSnl0ItJ4H0DV5t0NhcVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVsmKXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeRqXkal5GpeQqp21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVszVTrV1jW1KOr7UrqrDc+muizZzW1bZVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVtHMV1G5QtdNtq22rbamFfdUVVHT8t1lczUdNSU9v659VQMBK6Kn6Tlqoe45m0rqdtW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVHC93ydW9E5uqz/AJ7oazZzy9UvSW9DXS7attq22quHa6uWtLXVSB6HVRvLDVRRfamrraqu02rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rVNtqBzHXahk2qKDoNVczvdW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttSYXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepGXqRl6kZepEq1bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttWrWtVT615ayq0b8vcU8uKRFO2/J9PXS1zvzuu4seIdV0bPnl10TjnrymMMH1P7HnOjrbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbctXU7kCV1e5VvXZblh11u4wddvuOFXbblWddtomttq22qsp72uqns0Oqq9YOaqLF0+rg7+LGh0PQaudX1tTQLxjbVRRFjXLJtrWqDraa5rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rcT21DVFYOC0zquhbU1dPC1PLdrztVK79nVcLpGVdMSJrbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq2TFLyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvI1LyNS8jUvImlbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq2ZsKu9XEp7mlXV/mRKc6gJV3tXVY6gc1bauFVtucu6cahHXRYB622rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22pjynQ8/UXnK9lVBXXjCrMjDq64lDY1dBN9zNO2Dy0qofMwUm/oOhrkJNNXNvVWtbbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21aqtU1zym1xXOFtuaq3aQqnAa6ypQJJTlm1t66NQD1ttW21ahvtVCq81c5Y2Wqjc2erk91mpkxu9XO7otVbVdPq5ToHerc50eoJtq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq0TqqIuNW5bqdVEw6zVT1XW6qSu6zVSMOq1bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVFc0r6f2nLXlN9Tiq+s+U6WmsUY67Oqec1V4TjL+ur21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bakqyNx4K7JxWc5XXOPObmut21bbVttVVUXtfVbfUtzVWxszU1tK95VNZLDT+nsa6ql1Yaum21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21ahvqaqonUUdApej1NUOW1dTtq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbatk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lZOpWTqVk6lbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq2HV1carLT/ZjT7ZpTvDbU92oavtQnq321B0EpGXqRl6kZepGXqRl6kZepqkiKjTqhwA9H21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttVG0dNaY3zQlU2TNWonM1RLK8p5X2NZTqx5roqtdtTeIFRqs1RVi/wCfuaA1bN6vLLmr+jYOo2DqmExTgag0pw2c0421bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttVVZq1UpbXVR1/WaudsbHVTgv9VPXdTq58l5q22po2OzpFVcIqvcFVTRL8dNrQM0XC1FwtRpGuoVGqXTR3TjbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttTGvvEVTa51U2udVNrnVTa51U2udVNrnVWLsNVfrDVXvVkqdtW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21QhBaTlak5WpOVqTlak5WpOVqTlak5Sa2aTTrNdTtdfYVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbUBQ4oqW1PXQqoH9WCedZV2O51/VgvkbCr5NbUV1KuIsK6fC1C0LpOKGtYV1jW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttTUJG1LqXdXRbyhLSgqijYbuqwxC0ust6ak2FYeujwtS9E0qEzWsqyzrbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22pkye19LyNS8jUvI1LyNS8jUvI1LyNS8jU5lOpWTqm0q7Sttq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbatE6o06o06o06o06o06o06o06o06o06o06ttq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq2Qmi4WouFqLhai4WouFqLhai4WouFqLgaj4Go+Cattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbaglDNFwgU8w4ouZlo+ry071Tqts2JRcLUWB6m8omlZOrP6+wrbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22psmQUjnr6no9lznQ1TwnUuxq7CpgLaulUHUbB1GgWrLHFO26ZrWNbZVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbUzauGVCE61N841Mkv9VQ+c6q6bDUk4tRcLUXC1ONGqdGqbOrtK22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattqaMrjVT641U+uNVPrjVT641U+uNVPrjVT641U+uNVbrLVW6y1V9htW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytScrUnK1JytW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbUCtc1tNbTkuupDWmLT605G7q3BzZa7WnYsq6ZfMva6bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVh5jTwnOvqsiUy6fnqbKsRpqdoXX08zRtVtDEFW+qzU7VVDq5TWzVqJsGrTDJWCVjT8cM6f5gejJrG9dANrqf7attq22rbao4ntkVxHTuHlcI46kFcndWFnXH2llVUiu6clch0Ql1b7attq22rbattq22rbattq22rbattq22rbattq22rbaswfsKZOYXQEuopheVj2g5wWlsVooTK9a0ltYNKG4QukCet6SUbigqFqtMItDbvGVDaPgUtyg1VanaKiVTT3bVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9TjN9S8XULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdQsXULF1CxdW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21ahdBpt0fH2lW/LOaWu6aVrimAq2K7SmueLq2tOOu663bUAYg04NWOasW4G1XIgMatDUNlURWHqzEJvTxxR3VDhkmrhsupqxd0F5RttQ2rqpp68qntLLUHqxCthVlDRrT4lKWrnNh09aoRTgtOWniAMqtjV5adGrHVKOwf1ttW21bbVttW21bbVttW21bbVttW21bbUjm71hVL1la8pjy/VasYTmqCb5dG5DpRVSPOhZ0/21V2eIqvdLJTdnY6oaP0UwLZDqpO+VTRtazVHbpcVVhsjUFlYRVbZlRSTiLQ6m2BQLBsSmq3JaSwdipwzIamjW6DRYVqS0et6rTuyUxa26KaKeTTXPh0zsBFrbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbRU5OpWTqVk6lZOpWTqVk6lZOpWTqVk6lZKq2YVYuj1KqrjVI6utSqq41TBrfU81b6oirjALStUjFdamfmdbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rIWil7attq22rbattq22rbattq22pC0Lqk4fuuFVkHrnsXLV2Ihgdg5p+NaYAcVx4ulkugb9yyeG4yktaxNHfccX1zJbbZs9tq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rIWil7attq22rbattq22rbattq22pC0Lqk4vtOKVk2jLv4MdYQR5tHZcwCqROKC3ct4uLo/REt1kYANedseYVOntOC7l26HbEbbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttWQtFL21bbVttW21YZK+rDbVttW21bbUhaF1TJmsBvvPPRKMAfS1lkQoCm825btvMRPWVn1g1oHo2C69DwDpkcay/DZFKvueP7Rq82xXbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattqyFope2rbattq22rV9hX1Ybattq22rbakLQuqPiO34tW7otDVunZH8d9Mi2oO7Er7k7vh3y63jrhym4LuubZ7V1Ta9aeblzEbvbtuN7CrvbFdtq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rIWil7attq2bAqw1fqsK/MKv9X6rDV80/21bbUhaF1R8R2vEqxSoTVnac0Ir34eMYEWrHqY0UJGoU0fnprTLR9SpZkqAzeHNXXcl1xrvbFdtq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rIWil7attq22rbatX2FfVhtq22rbattqQtC6ouJ7fh1Y6UYFQjApcZNVds0FJ2pOFtGNummrcR2nJ05206gLRu1bdfw/alb/bMu21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVkLRS9tW21bbVttWr7Cvqw21bbVttW21IWhdUPB+h8spq4ukA1YbsVVUXCjVjPowCoZvNHl56rE1aLfS1M2kCqe357qjW+2Zdtq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rIWil7attq22rbasherbattq22rbakLQuttq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattqyFope2rbattq22rbattq22rbattqQtC622rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rIXqTlak5WpOVqTlak5WpOVqTlak5WpOVqGTattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbak5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tqc5tq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22ptzcUHL7t9qHZ9t9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHVfah1X2odV9qHV0XTebdXr5/R7bp8XbauQob6h4fqtts+vbattq22rbattq22rbattq22rbattq22rbattq22rbattq2fY5MYes5ttg+2moxgw22jttW21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bqeW6nTh6Tbd3zG21chQ31Dw/VbbZ9e21bbVttW21bbVttW21bbVttW21bbVttW21bbVttW21bbUW952205K8L8Y0a6zwq6/pXbY3dRLR8GW2w9Tbattq22rbattq22rbattq22rbattq22rbattq22rbattq3U8t1OnD0m27vmNtq5ChvqHh+q22z69tq22rbattq22rbattq22rbattq22rbattq22rbattq22rP2EFJ2wfbatZ1mOdpVTBE7Zddtq22rbattq22rbattq22rbattq22rbattq22rbattq22rdTy3U6cPSbbu+Y22rkKHs+O4vpU7bL0Ntq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattq22rbattqjqea7jbzLLbdnzv/2gAIAQEAAQUC/wCRbSlS1TWlzbiG2nuDJFJCpNldrjCVKMtpcwCG3nuDJFJCqGMzSwWKBcS2CDPa26ffYoYZgYrdCkoQm4ureETyQ2qxEYQo+7TObbJFI4OONcqzt9navDZZHebeu1H89Z2JuXe2wtLix2z3pCoVe8SRriXabRz4nb7TzYP59EcUKJUJiTcQiIvixa4udFtHau0s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zzzzzzzzzzzzzzzzzzgBTxxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjTzDTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjTzxxjAzyjjzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxxRyjTzzxxyxyxxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxzxyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjRDCSwCRjBTzzzzzzzzzzzzzzzzzzzzzzzzjDjTzjDTzxgRAiBzwzCjzzzzzzzzzzzzzzzzzzzzzzzzzgDQxxSxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzTTDTDjDDTTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzBCTggSihThTzzzzzzzzzzzzzzzzzzzzzzzyxCDAjgjTzyzzyyzxwxzxzzzzzzzzzzzzzzzzzzzzzzzzywzyyzzxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzySwhhQRTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjDTjTzzCTAyAiDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyxDizzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjDjzzjTxjDDDDDCABDzzzzzzzzzzzzzzzzzzzzzzzzzzyCRwTyBjxzAzRzzwxjjzzzzzzzzzzzzzzzzzzzzzzzzzzyywxyxzzxgCxDDDBjDDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjDDDDDBDCDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxjDDDDDDDTjDzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxzzizTDhChDxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzhCxByySzCghzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxzzzzzzzzyADTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjDDDDDDDDDDTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzTzTjjzTzgwxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyTgSAhiQxzwBTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzwjAACDAAATzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxzzzzzzzzzzzzzzzzzzzzzzzzzywwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwxzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzyDyhgARTzzzzzzzzzzzzzzzySwThiiCxgAjzzSBzwDzzzwCiyQRzDzzzzzzzzzzzzzzzxjgTSiRwhRhwBSiyyhTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzywThwzjzDRyjDgDyhDjxwxSigjCiyjSDTzzzzzzzzzzzxgSzCDxjyTCiDhASQSxjyRgSxChzgjwDjTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzjDDDDDDDDDT/P/AL9x99/58888888888888888888888888888888888800FkNkGs2888888888888888888888888888888888888qL+yDmlivt88888888888888888888888888888o88888Iut2yO2QzM88888888888888888888888888888o88888S2AYky8xsk8888888888888888888888888884wkw08886nFycpF+2I88888888888888888888888888888o88888CCW8jAZ44m88888888888888888888888888888o88888ffnNNSSZLo888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888sMMMMMMMMMc888888888888888888888888888888888MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM8888888888888888888888888888888888888888888888KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM88A//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AA0f7mv/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AOvzwD//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AKECHx//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AK/PAP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A+3/+dH//AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD+vzwv/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A+fz/xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxD/APteWWNjY2NjY2NjZ/8AonTxjq230k5SQ9f/AKJ0l8W87bvgnqVYw45tbw3xz/8AonxYLzZ8R8ErwWjgGAL2+JlNOLOdun/6J0hOFyxz3YCJOx3C/Wvi45DydFpXtDpt0/8A0TpJtj4vvkkOzF4NvDD/ABG8KC6f/onT8C3iAJ1AV+XcmDtDjq6f/oi4tLS0tIB2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</Image>";
        var data = "<action>upload.images</action><FkFlag>{0}</FkFlag><Images>{1}</Images>".format(1, imgx);
        $.ajax({
            url: "/Core.axd",
            dataType: "xml",
            async: false,
            data: data,//"<action>upload.images</action><FkFlag>{0}</FkFlag><Images>{1}</Images>".format(ecwx.useFkFlag, images),
            success: function () {
                var r = ECF.parseJSON(arguments[1].text);
                console.log(r);
            }
        });
    }
};

function onAppImageCompleted(imgUrl) {
    if (imgUrl == undefined || imgUrl == '') {
        pub.error("很抱歉，获取图片信息失败，请稍后重试...");
    } else {
        var html = jte(ecwx.imgTemplate, { url: imgUrl });
        var c = $("#logo-pic");
        if (c.length > 3) {
            pub.alert("最多上传{0}张图片".format(3));
        } else {
            c.append(html);
        }
    }
}