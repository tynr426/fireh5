    //2.2 上传图片
    var images = {
            localId : [],
            serverId : []
    };
function takePicture(config){
	console.log(config);
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        	  images.localId = res.localIds;
              //2.2.2 上传图片
              uploadImg(config);
        }
    });
}
// 2.2.2 上传图片
function uploadImg(config) {
    if (images.localId.length == 0) {
        alert('请先使用 chooseImage 接口选择图片');
        return;
    }
    var i = 0, length = images.localId.length;
    images.serverId = [];
  
    function upload() {
    	 
        wx.uploadImage({
            localId : images.localId[i],
            success : function(res) {
                i++;
                images.serverId.push(res.serverId);
                uploadService(config,res);
                if (i < length) {
                    upload();
                }
            },
            fail : function(res) {
                alert(JSON.stringify(res));
            }
        });
    }
    upload();
};
//uploadService({serverId:"PHOJ-WfH7C-n9E5KQZN9vAY4AK4D-Qib9GjlBKqKWOivuyDr3QphXe1-C-8vZf-y"});
function uploadService(config,res){
	
	  $.ajax({
          type : "POST",
          url : path+"/company/social/getMedia.do",
          data : {
              serverId : res.serverId
          },
          dataType : "json",
          success : function(data) {

        	  if(data.state==0){
        		  $(config.template.replace("%URL%","/fire"+data.data)).insertBefore("#btnWxImage")

        	  }
          }

      });
}
var wechat = {
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
            
            $.ajax({
            	url:path+'/company/social/getWeChatAccount.do', 
            	type:"post",
            	data:{url:encodeURIComponent(url)},
            	dataType:"json",
            	aynsc:false,
                success: function (result) {
                    var r =$.parseJSON(result.data);
                    wx.config({
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
        if (ecwx.IsWx){
        	wechat.init();
        }
        if (param && param.actions) {
            ecwx.extend(param.actions);
        }
    },
    initialize: function (isWx, isApp, useFkflag, para) {
    	debugger;
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
    
        var btns = [];
        if (typeof (ipara.btn) == 'string') {
            btns.push(ipara.btn);
        }
        else { btns = ipara.btn; }
        for (var i = 0, len = btns.length; i < len; i++) {
            var ebtn = $(btns[i]);
            if (ebtn) {
                $(ebtn).bind("click", function () {
                	 ecwx.upImage(ipara);
                	
                });
            }
        }
        
        if (window.wx&&window.wx!=undefined) {
        	ipara.container = ipara.container || "#logo-pic";
        	ipara.selector = ipara.selector || "#Ticket";
        	ipara.template = ipara.template || '<li><a href="javascript:void(0);" id="wxpic" ><img src="%URL%"  alt=""/></a></li>';
           
        }
    },
    upImage: function (ipara) {
        if (ecwx.IsWx && window.wx != undefined) {
        	takePicture(ipara);
        } else if (ecwx.isApp) {
            var imgDomain = "";
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
                	ecwx.scanCode(spara,this);
                	
                });
            }
        }
    },
    scanCode: function (spara,obj) {
        if (ecwx.isApp) {
            if (typeof (JsOpenScanFunction) == "function") {
                JsOpenScanFunction("onScanComplete");
            }
            else {
                pub.alert("JsOpenScanFunction is not find");
            }
        } else if (ecwx.IsWx) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    if (res.errMsg == "scanQRCode:ok") {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        if (spara && spara.fn)//如果存在回调就执行回调
                        { spara.fn(result,obj); }
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
           // ecwx.ps.delete(pictures[0]);
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
    }
};