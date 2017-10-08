/*初始化开始*/

/*
	文件图片上传js处理
	file: swfUploadHander.js
	Version: 1.1.0
	Author: xp
	Modefiy: 2012-02-15:新增图片预览的相关配置,preview_width,preview_height,class_name(xp)
*/
// 图片服务器
if (typeof (imageDomain) == "undefined")
    imageDomain = '';

//创建上传的处理方法
var uploadHandler = function (config){
    //alert(uploadHandler.fn.init);
    swfCurrentObj: null;
	return new uploadHandler.fn.init(config);
}

//点击查看大图
function upload_Preview_Image (id,src,o){
	var oimg = document.getElementById(id + "_max_pic_img");
	oimg.src = src;
};

uploadHandler.fn = uploadHandler.prototype = {
    version: "1.0.0 beta",
    handler: null,
    //初始化安装flash
    init: function (config) {
        var self = this,
            dfs = this.defaults();
        //将默认配置添加到config中
        for (var _ in dfs) { if (config[_] === undefined) config[_] = dfs[_]; }
        this.config = config;
        uploadHandler[config.id + "_Config"] = config;
        this.swf = new SWFUpload(config);
        uploadHandler.swfCurrentObj = this.swf;
        var hid = document.getElementById(config.id);
        if (hid) hid.value = "";
        return this;
    },
    //开始打开文件选择对话框
    fileDialogStart: function () {
    },
    //处理文件队列
    fileQueued: function () {
        var imgSrc = document.getElementById(this.settings.id).value;
        var length = imgSrc.split(";").length;
        //如果上传图片大等于了设置大小
        if (length == parseInt(this.settings.file_upload_limit) && imgSrc.length > 0) {
            //取消上传
            this.cancelUpload(null, false);
            alert("最多只能上传" + this.settings.file_upload_limit + "张图片，请删除部分图片后继续。");
            return;
        }
        ECF("#Delete_Div").show();
        var arg = arguments[0],
			tid = uploadHandler.getId(arg.id);
        var tbox = document.getElementById(tid + "_thumbs_box");

        //禁止显示上传成功后的缩略图 By Zkai 2015-07-06
        return;
        if (tbox) {
            tbox.style.display = this.settings.file_upload_limit == 1 ? "none":"block";
            tbox.style.zIndex = 1982;
            var thumb = document.createElement("div");
            thumb.id = 'thumbs_inner_' + arg.id;
            thumb.className = "thumbs_inner";
            thumb.innerHTML = uploadHandler["thumbHtml"]
			.replace("{$img$}", arg.name + "待上传文件...")
			.replace("{$method$}", "")
			.replace("{$view$}", "")
			.replace("{$delete$}", "");
            tbox.appendChild(thumb);
        }
    },
    //文件对列错误
    fileQueueError: function (file, errorCode, message) {
        try {
            var errorMsg = "";
            switch (errorCode) {
                case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                    if (message > 0) {
                        errorMsg = "您只能同时上传" + message + "个文件!";
                    } else {
                        errorMsg = "不能再继续上传";
                    }
                    break;
                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                    errorMsg = "您不可上传0字节的文件";
                    break;
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    errorMsg = "文件不可大于" + this.settings.file_size_limit + "KB";
                    break;
                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                default:
                    alert(message);
                    break;
            }
            if (errorMsg !== "") {
                alert(errorMsg);
                return;
            }
            //addImage("images/" + imageName);
        } catch (ex) {
            this.debug(ex);
        }
    },
    //打开选择图片对话框完成时调用
    fileDialogComplete: function (numFilesSelected, numFilesQueued) {
        try {
            if (numFilesSelected > 0) {
                this.startUpload();
                //禁用提交按钮
                //document.getElementById(this.customSettings.submitBtnId).disabled = true;
            }
        } catch (ex) {
            this.debug(ex);
        }
    },
    //上传进度处理
    uploadProgress: function (file, bytesLoaded) {
        var arg = arguments[0];
        try {
            var percent = Math.ceil((bytesLoaded / file.size) * 100);
            var thumb = document.getElementById('thumbs_inner_' + arg.id);
            thumb.style.display = "block";
            if (percent === 100) {
                if (thumb) thumb.innerHTML = uploadHandler["thumbHtml"].replace("{$img$}", "已上传完成").replace("{$method$}", "");
            } else {
                if (thumb) thumb.innerHTML = uploadHandler["thumbHtml"].replace("{$img$}", "已上传: " + percent + "%").replace("{$method$}", ""); 			//progress.setStatus("正在上传...");
            }
        } catch (ex) {
            this.debug(ex);
        }
    },
    //一张图片上传成功处理
    uploadSuccess: function (file, serverData) {
        var thumb = document.getElementById('thumbs_inner_' + file.id),
			tid = uploadHandler.getId(file.id);

        var prev = document.getElementById(tid + "_max_pic_img");
        var n = prev.parentNode;
        if (n.style && n.style.display == "none") {
            n.style.display = "";
        }
        n.style.display = "block";
        serverData = (serverData.substr(0, 1) == "/" ? "" : "/") + serverData
        if (prev) prev.src = imageDomain + serverData;

        var hid = document.getElementById(tid);
        if (hid) hid.value = hid.value + (hid.value.length > 0 ? ";" : "") + serverData;
        if (thumb) thumb.innerHTML = uploadHandler["thumbHtml"]
		.replace("{$img$}", "<img src=\"" + imageDomain +  serverData + "\" alt=\"" + file.name + "\" />")
		.replace("{$method$}", "upload_Preview_Image('" + tid + "','" + serverData + "',this);return false;")
		.replace("{$view$}", "uploadHandler.view(\'" + serverData + "\',\'" + file.id + "\',this);")
		.replace("{$delete$}", "uploadHandler.deleteFile(\'" + serverData + "\',\'" + file.id + "\',this,'');")
		.replace("{$deltitle$}", "删除图片");
    },
    //上传全部完成时处理
    uploadComplete: function (file) {
        //alert(this.config);
    },
    //取消上传
    cancelUpload: function () {
    },
    //上传出错时处理
    uploadError: function (file, errorCode, message) {
        //alert("error" + message +"||"+ errorCode);
        var imageName = "error.gif";
        var progress;
        try {
            switch (message) {
                case "417":
                    alert("服务器不允许上传此格式的文件");
                    break;
                case "500":
                    alert("服务器错误");
                    break;
                case "501":
                    alert("单张图片不允许超过2M");
                    break;
                case "405":
                    alert("上传文件时不允许写入");
                    break;
                default:
                    break;
            } 
            delThumb(file.id);
            switch (errorCode) {
                case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED: //当上传被取消
                    try {

                    }
                    catch (ex1) {
                        this.debug(ex1);
                    }
                    break;
                case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED: //当上传被停止
                    try {
                        progress = GetFileProgressObject(this.customSettings, file, this.customSettings.upload_target);
                        progress.setCancelled();
                        progress.setStatus("已停止");
                        progress.toggleCancel(true);
                    }
                    catch (ex2) {
                        this.debug(ex2);
                    }
                case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:  //不允许上传的文件
                    imageName = "uploadlimit.gif";
                    break;
                default:
                    //alert(message);
                    break;
            }
        } catch (ex3) {
            this.debug(ex3);
        }
        //删除已加入的缩略显示
        function delThumb(fid) {
            var th = document.getElementById("thumbs_inner_" + fid),
				tid = uploadHandler.getId(fid),
				p = th.parentNode;
            p.removeChild(th);
        }
    },
    //空方法
    empty: function () {
    },
    // 更改post参数
    setPostParams: function (param) {
        if(typeof(param) == "object"){
            this.swf.setPostParams(param);
        }
    },
    //初始化一些常用html
    _init: (function () {
        uploadHandler["thumbHtml"] = '\
            <div class="picbox rm">\
			    <a href="javascript:void(0);" class="rm" onclick="{$method$}">\
			        {$img$}\
                </a>\
			</div>\
			<div class="thumb_btn_bar rm">\
			    <a href="javascript:void(0);" onclick="{$view$}" title="查看图片路径"><span class="thumb_btn_view"></span></a>\
			    <a href="javascript:void(0);" onclick="{$delete$}" title="{$deltitle$}"><span  class="thumb_btn_delete"></span></a>\
		    </div>';
    })(),
    //上传处理的默认配置部分
    defaults: (function () {
        return {
            id: "swfUpload",
            upload_url: "/Upload.axd",
            file_dialog_start_handler: this.fileDialogStart, 				//打开对话框
            file_queued_handler: this.fileQueued, 						//选择文件后
            file_dialog_complete_handler: this.fileDialogComplete, //对话框完成
            file_queue_error_handler: this.fileQueueError, 		//上传队列出错的回调
            upload_progress_handler: this.uploadProgress,
            upload_error_handler: this.uploadError,
            upload_success_handler: this.uploadSuccess,
            upload_complete_handler: this.uploadComplete,
            call_back: null, //function(){alert("this");}
            call_back_args: [], 	//队列上传完成后回调参数
            class_name: "upload_box", //上传控件的整体样式替换
            preview_hide: false, //是否隐藏图片预览
            default_preview: "/Static/Images/error.png", //默认的预览图片
            max_picture: "", 	//给定初始的图片
            preview_width: 200, 	//预览图片宽度
            preview_height: 200, //预览图片高度
            debug: false				//开启调试
        }
    })
};

//根据实际id取出当前组件的id
uploadHandler.getId = function (id) {
    var tid = id.substr(0, id.length - 4);
    if (tid.substr(tid.length - 1) == "_") {
        tid = tid.substr(0, tid.length - 1);
    }
    return tid;
}

//执行图片的删除操作
uploadHandler.deleteFile = function () {
    if (!confirm("你确定要删除此图片吗?")) return;
    var fname = arguments[0],
		fid = arguments[1],
		o = arguments[2],
        functName = arguments[3];

    var th = document.getElementById("thumbs_inner_" + fid);
    if (th == null) {
        return;
    }
    ECF.ajax({
        url: "/upload.axd",
        dataType: "xml",
        data: '<action>deleteImg</action><filename>' + fname + '</filename>',
        success: function () {
            if (arguments[1].text == 200) {
                var tid = uploadHandler.getId(fid),
				oimg = document.getElementById(tid + "_max_pic_img"),
				p = th.parentNode,
				hid = document.getElementById(tid),
				c = uploadHandler[tid + "_Config"];

                p.removeChild(th);

                if (hid) {  //处理输入隐藏域中的值
                    var val = hid.value + ";";
                    val = val.replace(fname + ";", "");
                    val = val.substr(0, val.length - 1);
                    hid.value = val;

                    if (val == "" && c) {
                        var p = oimg.parentNode;
                        if (p && p.style && c.preview_hide) {
                            p.style.display = "none";
                        }
                        //alert(c.default_preview);
                        if (c.default_preview) {
                            oimg.src = c.default_preview;
                        }
                    }
                }

                if (oimg.src.indexOf(fname) > -1) {

                    oimg.src = "";
                    if (p.childNodes.length > 0) {
                        var m = ECF("img", p)[0];
                        if (m) m.parentNode.click();
                    }
                }
                ECF("#Delete_Div").hide();
                alert("删除图片成功！");

                if (document.getElementById(tid + '_thumbs_box').childNodes.length == 3) {
                    oimg.parentNode.style.display = "none";
                }

                //执行回调函数
                //eval(functName + "('" + fname + "',true)");
            }
            else {
                alert("删除图片失败！");
            }
        }
    });
}

//删除图片
uploadHandler.deleteImg = function (id, functName, delDiv) {
    if (!confirm("你确定要删除此图片吗?")) return;
    var imgSrc = document.getElementById(id).value;
    var oimg = document.getElementById(id + "_max_pic_img");
    ECF.ajax({
        url: "/upload.axd",
        dataType: "xml",
        data: '<action>deleteImg</action><filename>' + imgSrc + '</filename>',
        success: function () {
            alert(arguments[1].text);
            if (arguments[2].text == 200) {
               
                oimg.src = "default.jpg";
                delDiv.parentNode.style.display = "none";
            }
            else {
            }           
        },
        error: function () {
            alert("错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
        }
    });

    window.location.reload();
}

//删除图片
uploadHandler.delImg = function (src) {
    var isSucceed = false;
    ECF.ajax({
        url: "/upload.axd",
        dataType: "xml",
        data: '<action>deleteImg</action><filename>' + src + '</filename>',
        async: true,
        success: function () {
            if (arguments[1].text == 200) {
                isSucceed = true;
            }
            else {
                isSucceed = false;
            }
        }
    });

    return isSucceed;
}

//删除一张或者多张图片
uploadHandler.deleteFiles = function (val) {
    ECF.ajax({
        url: "/upload.axd",
        dataType: "xml",
        data: '<action>deleteImg</action><filename>' + val + '</filename>',
        success: function () {
            if (arguments[1].text == 200) {
                //alert("成功！");
            }
            else {
            }
        }
    });
}


//查看图片源文件地址
uploadHandler.view = function(){
	alert(arguments[0]);
}

uploadHandler.fn.init.prototype = uploadHandler.fn;

//将上传控件可以以js一形式整合在需要用到上传的位置
var uploads = function (container, config) {
    return new uploads.fn.init(container, config);
}

//定义上传功能函数
uploads.fn = uploads.prototype = {
    //对外的初始化处理
    init: function (container, config) {
        //alert(document.getElementById(config.id).value);
        var self = this,
			dfs = this.defaults(),
			id = config.id || container;
        if (typeof (container) == "string") {
            container = document.getElementById(container);
        }
        if (!container) {
            //alert("找不到放置上传控件的容器");
            return;
        }
        //将默认配置添加到config中
        for (var _ in dfs) { if (config[_] === undefined) config[_] = dfs[_]; }
        //alert(config.default_preview);
        container.innerHTML = uploads["innerUploads"]
		.replace(/\{\$id\$\}/g, config.id)
		.replace(/\{\$classname\$\}/g, config.class_name)
        .replace(/\{\$message\$\}/g, typeof (config.message) == "undefined" ? "" : config.message)
		.replace(/\{\$src\$\}/g, config.default_preview == undefined ? "/Static/Images/error.png" : config.default_preview)//替换默认预览图片
		.replace(/\{\$pwidth\$\}/g, config.preview_width)//替换默认预览图片宽度
		.replace(/\{\$pheight\$\}/g, config.preview_height)//替换默认预览图片高度
		.replace(/\{\$display\$\}/g, (config.preview_hide ? " style=\"display:none\"" : ""))
        .replace(/\{\$isDisplay\$\}/g, (parseInt(config.file_upload_limit) > 1 ? " style=\"display:block;\"" : " style=\"display:none;\""))
        .replace(/\{\$isDelete\$\}/g, (parseInt(config.file_upload_limit) == 1 ? "<div id=\"Delete_Div\" class=\"max_pic_delete\"  onclick=\"uploadHandler.deleteImg(\'" + config.id + "\', '" + config.functname + "', this);\" title=\"删除图片\"></div>" : ""));
        config.button_placeholder_id = config.id + "_Buttons";
        return new uploadHandler(config);
    },
    //初始化处理
    _init: (function () {
        uploads["innerUploads"] = '<script language="javascript">\
			function prev_Thumb_Image(src,o){\
				var oimg = document.getElementById("{$id$}_max_pic_img");\
				oimg.src = src;\
			}\
			</script>\
			<div id="{$id$}_box" class="{$classname$} rm">\
			<!--上传按钮-->\
			<div class="buttons rm">\
			<input type="hidden" id="{$id$}" value="" />\
			<span id="{$id$}_Buttons"></span>\
            <span class="tips rm">{$message$}</span>\
			</div>\
			<!--大图预览-->\
			<div class="max_pic_box" style="display:none;" >{$isDelete$}<img id="{$id$}_max_pic_img" src="{$src$}" alt="暂无预览" onload="javascript:ECF(this).scaleZoom({$pwidth$},{$pheight$});" nolazy="0" /></div>\
			<!--缩略图-->\
            <div class="clear"></div>\
			<div id="{$id$}_thumbs_box" class="thumbs_box" {$isDisplay$}></div>\
		</div>';
    })(),
    defaults: function () {
        return {
            id: "swfUpload"
        };
    }
}

//给上传控件设置值
uploads.setValue = function (id, val) {
    //console.log(val);
    if(typeof(val)!='string') return;

    val = val.replace(" ", "");
    if (val.length == 0) {
        ECF("#Delete_Div").hide();
        return;
    }
    var c = uploadHandler[id + "_Config"];

    var vs = val.split(';'),
		box = document.getElementById(id + '_box');
    hid = document.getElementById(id);
    if (hid) {
        hid.value = val;
    }
    if (box) {	//判断显示图片的区域是否存在
        var max_box = ECF(".max_pic_box", box),
			thmbs_box = ECF(".thumbs_box", box);
        max_box.css("display", "none");
        for (var i = 0; i < vs.length; i++) {	//对多个值进行循环设置处理
            if (vs[i] != "") {
                //判断图片路径第一个字符是否为反斜杠
                vs[i] = (vs[i].substr(0, 1) == "/" ? "" : "/") + vs[i];
                if (i == 0) {
                    ECF("#" + id + "_max_pic_img", box).attr("src", vs[i]);
                }
                var preSrc = (imageDomain == "" ? "http://" + window.location.host : imageDomain);

                if (vs.length == 1) {
                    //判断图片是否存在
                    var Img = new Image;
                    Img.src = preSrc + vs[i];

                    Img.onload = function () {
                        i = i - 1;
                        if (i == 0) {
                            if (c.max_picture == "")
                                ECF("#" + id + "_max_pic_img", box).attr("src", preSrc + vs[i]);
                        }
                        var tbox = thmbs_box[0];
                        if (tbox) {
                            var thumb = document.createElement("div");
                            var tid = id + "_0_" + i;
                            thumb.id = 'thumbs_inner_' + tid;
                            thumb.className = "thumbs_inner";
                            thumb.innerHTML = uploadHandler["thumbHtml"]
					        .replace("{$img$}", "<img  src=\"" + preSrc + vs[i] + "\" alt=\"" + vs[i] + "\" />")
					        .replace("{$method$}", "upload_Preview_Image('" + id + "','" + vs[i] + "',this);return false;")
					        .replace("{$view$}", "uploadHandler.view(\'" + vs[i] + "\',\'" + tid + "\',this);")
					        .replace("{$delete$}", "uploadHandler.deleteFile(\'" + vs[i] + "\',\'" + tid + "\',this);")
					        .replace("{$deltitle$}", "删除图片");
                            //tbox.appendChild(thumb);
                        }
                    }
                    Img.onerror = function () {
                        i = i - 1;
                        var hid = document.getElementById(id);
                        //处理输入隐藏域中的值
                        if (hid) {
                            var val = hid.value + ";";
                            val = val.replace(vs[i] + ";", "");
                            val = val.substr(0, val.length - 1);
                            hid.value = val;
                        }
                        ECF("#" + id + "_max_pic_img", box).attr("src", "");
                        ECF("#" + id + "_max_pic_img", box).attr("alt", "");
                        ECF("#Delete_Div").hide();
                    }
                }
                else {
                    var src =  vs[i];
                    //判断图片是否存在
                    var Img = new Image;
                    
                    Img.src = preSrc + src;

                    Img.onload = function () {
                        src = this.src;
                        ECF("#" + id + "_max_pic_img", box).attr("src", preSrc + src);
                        var tbox = thmbs_box[0];
                        if (tbox) {
                            var thumb = document.createElement("div");
                            var tid = id + "_up_" + i;
                            thumb.id = 'thumbs_inner_' + tid;
                            thumb.className = "thumbs_inner";
                            thumb.innerHTML = uploadHandler["thumbHtml"]
					                        .replace("{$img$}", "<img src=\"" + preSrc + src + "\" alt=\"" + src + "\" />")
					                        .replace("{$method$}", "upload_Preview_Image('" + id + "','" + src + "',this);return false;")
					                        .replace("{$view$}", "uploadHandler.view(\'" + src + "\',\'" + tid + "\',this);")
					                        .replace("{$delete$}", "uploadHandler.deleteFile(\'" + src + "\',\'" + tid + "\',this," + c.funtname + ");")
					                        .replace("{$deltitle$}", "删除图片");
                            tbox.appendChild(thumb);
                        }
                    }
                    Img.onerror = function () {
                    }
                }
            }
        }
    }
}

//上传的配置信息
uploads.config = function(){
	//alert('');
}

uploads.fn.init.prototype = uploads.fn;
//window.unload = function () {
//}

//图片按比例缩放 
function DrawImage(ImgID, w, h) {
    var flag = false;
    var image = new Image();
    var iwidth = w || ImgID.width;  //定义允许图片宽度 
    var iheight = h || ImgID.height;  //定义允许图片高度
    //如调用函数和img中都没设置宽和高
    iwidth = iwidth == 0 ? 200 : iwidth;
    iheight = iheight == 0 ? 150 : iheight;

    image.src = ImgID.src;

    if (image.width > 0 && image.height > 0) {
        flag = true;
        if (image.width / image.height >= iwidth / iheight) {
            if (image.width > iwidth) {
                ImgID.width = iwidth;
                ImgID.height = (image.height * iwidth) / image.width;
            } else {
                ImgID.width = image.width;
                ImgID.height = image.height;
            }
        }
        else {
            if (image.height > iheight) {
                ImgID.height = iheight;
                ImgID.width = (image.width * iheight) / image.height;
            } else {
                ImgID.width = image.width;
                ImgID.height = image.height;
            }
        }
    }
}

function delShopLogo(imgScr, isSucceed) {
    if (isSucceed) {
        //alert(imgScr);
    }
}