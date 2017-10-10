if(!error) {
	var error = 'data:image/png;base64,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';
}

//全局事件类型
var isTouchPad = /hp-tablet/gi.test(navigator.appVersion); /*平板电脑*/
var isIDevice = /iphone|ipad/gi.test(navigator.appVersion); /*苹果设备*/
var isAndroid = /android/gi.test(navigator.appVersion); /*安卓设备*/
var hasTouch = 'ontouchstart' in window && !isTouchPad; /*判断是否支持手势*/
/*鼠标按下*/
var START_EV = hasTouch ? 'touchstart' : 'mousedown';
/*鼠标移动*/
var MOVE_EV = hasTouch ? 'touchmove' : 'mousemove';
/*鼠标弹起*/
var END_EV = hasTouch ? 'touchend' : 'mouseup';
/*手势改变*/
var CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';
//兼容性平台
var broswer = function() {
	//设置几总浏览器
	var broswerArray = 'MSIE|,CHROME|-webkit-,FIREFOX|-moz-,SAFARI|-webkit-'.split(','),
		i = broswerArray.length,
		o = 0;
	while(--i >= 0) {
		var sm = broswerArray[i].split('|');
		o = sm.length;
		while(--o >= 0) {
			var k = navigator.userAgent.toUpperCase().indexOf(sm[0]) >= 0 ? true : false;
			if(k) {
				return sm[1];
			}
		}
	}
};
var broswerInfo = broswer();
//获取内容值
var reg = /\-?[0-9]+\.?[0-9]*/g;
//取消事件的默认动作
var uninstallDefault = function(e) {
	if(typeof e === 'undefined') {
		e = e ? window : window.document;
	}

	e.addEventListener('touchmove', function(event) {
		event.preventDefault();
	});
};
//捕获WEB坐标
var getMousePoint = function(ev) {
	//获取鼠标坐标
	if(typeof ev.pageX !== "undefined" && typeof ev.pageY !== "undefined") {
		return { x: ev.pageX, y: ev.pageY };
	}

	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

	return {
		x: ev.clientX + scrollLeft - document.body.clientLeft,
		y: ev.clientY + scrollTop - document.body.clientTop
	};
};
//返回兼容性坐标点
var Touch = function(eventObj) {
	var icn = hasTouch ? eventObj.touches[0] === undefined ? eventObj.changedTouches[0] : eventObj.touches[0] : getMousePoint(eventObj);

	return {
		X: icn.x === undefined ? icn.screenX : icn.x,
		Y: icn.y === undefined ? icn.screenY : icn.y
	};
};

//工具
var tools = {
	//判断是否IE
	winBrown: function() {
		var win = navigator.userAgent.toLowerCase();
		var IE = win.match(/msie\s*\d\.\d/);
		return IE;
	},
	//阻止冒泡
	stopBubble: function(evt) {
		//如果提供了事件对象，则这是一个非IE浏览器
		if(evt && evt.stopPropagation) {
			//因此它支持W3C的stopPropagation()方法
			evt.stopPropagation();
		} else {
			//否则，我们需要使用IE的方式来取消事件冒泡
			evt = evt ? evt : eventwindow.event;
			evt.cancelBubble = true;
		}
	},
	//获取浏览器URL地址栏中某项参数的值
	request: function(st) {
		var ustr = document.location.search;
		var intPos = ustr.indexOf("?");
		var strRight = ustr.substr(intPos + 1);
		var arrTmp = strRight.split("%26");
		for(var i = 0; i < arrTmp.length; i++) {
			var arrTemp = arrTmp[i].split("=");
			if(arrTemp[0].toUpperCase() === st.toUpperCase()) {
				return arrTemp[1];
			}
		}
		return "";
	},
	//验证函数
	check: function(obj) {
		var _obj = $e(obj)[0];
		if(!_obj || typeof _obj === 'string' || typeof _obj === 'undefined' || typeof _obj === 'unmber' || _obj.nodeType !== 1) {
			return false;
		} else {
			return true;
		}
	},
	//获取CSS样式中的尺寸值
	cssSize: function(obj, style) {
		var si = 0;
		var _obj = [];
		if(obj.style[style]) {
			var regx = /([\S]+)px/ig;
			var sizer = regx.exec(obj.style[style])[0];
			if(!sizer) {
				sizer = '0px';
			}
		} else if(obj.currentStyle) {
			try {
				var regx = /([\S]+)px/ig;
				var sizer = regx.exec(obj.currentStyle[style])[0];
				if(!sizer) {
					sizer = '0px';
				}
			} catch(e) {
				sizer = '0px';
			}
		} else if(window.getComputedStyle) {
			try {
				propprop = style.replace(/([A-Z])/g, "-$1");
				propprop = style.toLowerCase();
				var sizer = document.defaultView.getComputedStyle(obj, null);
				if(sizer) {
					var regx = /([\S]+)px/ig;
					sizer = regx.exec(sizer.getPropertyValue(style))[0];
				} else {
					sizer = '0px';
				}
			} catch(e) {
				sizer = '0px';
			}
		}
		if(sizer === 'auto' || sizer === '0px') {
			si = 0;
		} else {
			si = Number(sizer.replace('px', ''));
		}
		return si;
	},
	//返回需要获取CSS尺寸样式的宽度
	cssWidthSize: function(obj) {
		if(!tools.check(obj)) {
			return;
		}
		var _obj = $e(obj);
		var size = ['width', 'margin-left', 'margin-right', 'padding-left', 'padding-right', 'border-left-width', 'border-right-width'];
		var i = size.length;
		var o = 0;
		while(--i >= 0) {
			o = o + tools.cssSize(_obj[0], size[i]);
		}
		return o;
	},
	//返回需要获取CSS尺寸样式的高度
	cssHeightSize: function(obj) {
		if(!tools.check(obj)) {
			return;
		}
		var _obj = $e(obj);
		var size = ['height', 'margin-top', 'margin-bottom', 'padding-top', 'padding-bottom', 'border-top-width', 'border-bottom-width'];
		var i = size.length;
		var o = 0;
		while(--i >= 0) {
			o = o + tools.cssSize(_obj[0], size[i]);
		}
		return o;
	},
	//获取滚动条高度
	getScrollTop: function() {
		var scrollTop = 0;
		if(document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if(document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	},
	//获取屏幕的可视区域高度
	getShowHeight: function() {
		var clientHeight = 0;
		if(document.body.clientHeight && document.documentElement.clientHeight) {
			var clientHeight = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
		} else {
			var clientHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
		}
		return clientHeight;
	},
	//获取文档实际高度
	getScrollHeight: function() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	},
	//捕获WEB坐标
	getMousePoint: function(ev) {
		//获取鼠标坐标
		if(typeof ev.pageX !== "undefined" && typeof ev.pageY !== "undefined") {
			return { x: ev.pageX, y: ev.pageY };
		}

		var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

		return {
			x: ev.clientX + scrollLeft - document.body.clientLeft,
			y: ev.clientY + scrollTop - document.body.clientTop
		};
	},
	//返回兼容性坐标点
	Touch: function(eventObj) {
		var icn = hasTouch ? eventObj.touches[0] : tools.getMousePoint(eventObj);
		return icn;
	},
	//获取元素的高度
	getTopValue: function(obj) {
		var pos = {
			top: 0,
			left: 0
		};

		if(obj.offsetParent) {
			while(obj.offsetParent) {
				pos.top += obj.offsetTop;
				pos.left += obj.offsetLeft;
				obj = obj.offsetParent;
			}
		} else if(obj.x) {
			pos.left += obj.x;
		} else if(obj.y) {
			pos.top += obj.y;
		}

		return {
			x: Number(pos.left),
			y: Number(pos.top)
		}
	},
	//设置文本选中
	selectStartStyle: null,
	selectFrameStartStyle: null,
	selectStart: function(target) {
		var doms = window.document.body;
		var fdoms = window.top.document.body;

		if(target) {
			//缓存原来对象的Style
			tools.selectStartStyle = doms.getAttribute('style');
			tools.selectFrameStartStyle = fdoms.getAttribute('style');

			if(window.attachEvent) {
				//IE route
				doms.onselectstart = function() { return false; };

				fdoms.onselectstart = function() { return false; };
			} else if(typeof doms.style.MozUserSelect !== 'undefined') {
				//Firefox route
				doms.setAttribute('unselectable', 'on');
				doms.setAttribute('onselectstart', 'return false;');
				doms.style.cssText += '-webkit-user-select: none;-moz-user-select: none;';

				fdoms.setAttribute('unselectable', 'on');
				fdoms.setAttribute('onselectstart', 'return false;');
				fdoms.style.cssText += '-webkit-user-select: none;-moz-user-select: none;';
			} else {
				//All other route (Chrome : Opera)
				doms.setAttribute('unselectable', 'on');
				doms.setAttribute('onselectstart', 'return false;');
				doms.style.cssText += '-webkit-user-select: none;-moz-user-select: none;';

				fdoms.setAttribute('unselectable', 'on');
				fdoms.setAttribute('onselectstart', 'return false;');
				fdoms.style.cssText += '-webkit-user-select: none;-moz-user-select: none;';
			}
		} else {
			if(window.attachEvent) {
				//IE route
				doms.onselectstart = function() { return true; };

				fdoms.onselectstart = function() { return true; };
			} else if(typeof doms.style.MozUserSelect !== 'undefined') {
				//Firefox route
				doms.removeAttribute('unselectable');
				doms.removeAttribute('onselectstart');

				fdoms.removeAttribute('unselectable');
				fdoms.removeAttribute('onselectstart');

				if(tools.selectStartStyle !== '') {
					doms.style.cssText = tools.selectStartStyle;
				} else {
					doms.style.cssText = '-webkit-user-select: ;-moz-user-select: ;';
				}

				if(tools.selectFrameStartStyle !== '') {
					fdoms.style.cssText = tools.selectFrameStartStyle;
				} else {
					fdoms.style.cssText = '-webkit-user-select: ;-moz-user-select: ;';
				}
			} else {
				//All other route (Chrome : Opera)
				doms.removeAttribute('unselectable');
				doms.removeAttribute('onselectstart');

				fdoms.removeAttribute('unselectable');
				fdoms.removeAttribute('onselectstart');

				if(tools.selectStartStyle !== '') {
					doms.style.cssText = tools.selectStartStyle;
				} else {
					doms.style.cssText = '-webkit-user-select: ;-moz-user-select: ;';
				}

				if(tools.selectFrameStartStyle !== '') {
					fdoms.style.cssText = tools.selectFrameStartStyle;
				} else {
					fdoms.style.cssText = '-webkit-user-select: ;-moz-user-select: ;';
				}
			}
		}
		return;
	},
	//后面插入节点
	insertAfter: function(newEl, targetEl) {
		var parentEl = targetEl.parentNode;
		if(parentEl.lastChild === targetEl) {
			parentEl.appendChild(newEl);
		} else {
			parentEl.insertBefore(newEl, targetEl.nextSibling);
		}
	},
	//属性判断
	hasAttr: function(elem, attr) {
		if(!elem || 1 !== elem.nodeType) {
			return false;
		}
		if(elem.hasAttribute) {
			return elem.hasAttribute(attr);
		}
		attr = attr.toLowerCase();
		if(attr === 'style') {
			return "" !== elem.style.cssText;
		}
		if(navigator.userAgent.indexOf('MSIE 6') > 0 && (tag === 'input' && attr === 'checked' || tag === 'option' && attr === 'selected' || tag === 'select' && attr === 'multiple')) {
			return elem.getAttribute(attr);
		}
		var val = elem.getAttribute(attr);
		if(val === null) {
			return false;
		} else if(typeof val === 'function') {
			return val.toString().indexOf("function " + attr + "()") === 0;
		} else {
			return true;
		}
	},
	//随机数
	GetRandomNum: function(Min, Max) {
		/*
			Math.random(); 结果为0-1间的一个随机数(包括0,不包括1)
			Math.floor(num); 参数num为一个数值，函数结果为num的整数部分。
			Math.round(num); 参数num为一个数值，函数结果为num四舍五入后的整数。
			Math.ceil(n); 返回大于等于n的最小整数。
			用Math.ceil(Math.random()*10);时，主要获取1到10的随机整数，取0的几率极小。
			Math.round(n); 返回n四舍五入后整数的值。
			用Math.round(Math.random());可均衡获取0到1的随机整数。
			用Math.round(Math.random()*10);时，可基本均衡获取0到10的随机整数，其中获取最小值0和最大值10的几率少一半。
			Math.floor(n); 返回小于等于n的最大整数。
			用Math.floor(Math.random()*10);时，可均衡获取0到9的随机整数。
		*/
		var Range = Max - Min;
		var Rand = Math.random();
		return Min + Math.round(Rand * Range);
	},
	//判断鼠标右键
	keyCode: function(event) {
		//返回右键为true,其他为false
		var keyCode = event.keyCode || event.button;
		if(keyCode === 2) {
			return true;
		} else {
			return false;
		}
	},
	//图片等比例自动适应
	imageAutoSize: function() {
		//获取需要自动计算的图片DOM
		var pic = $e('*[autosize]');
		var max = pic.length;
		var i = 0;
		if(max <= 0) { return; }
		for(; i < max; i++) {
			//获取父级元素尺寸
			var w = pic[i].parentNode.offsetWidth,
				h = pic[i].parentNode.offsetHeight;

			$e.scaleZoom(pic[i], w, h);
		}
	},
	//登录页面用切换密码明文和密文
	passwordChange: function(obj) {
		var inputObj = typeof $e('#password')[0] === 'undefined' ? $e('#Password')[0] : $e('#password')[0];

		if(typeof inputObj === 'undefined') { return; }
		if($e(obj).hasClass('tp-on')) {
			$e(obj).removeClass('tp-on').addClass('tp-off');
			inputObj.type = 'password';
		} else {
			$e(obj).removeClass('tp-off').addClass('tp-on');
			inputObj.type = 'text';
		}
	},
	//字符串转DOM
	parseDom: function(arg){
		var objE = document.createElement('div');
	　　 objE.innerHTML = arg;
		var children = objE.childNodes;
		for(var i = 0;i < children.length;i++) {
			if(children[i].nodeType == 1) {
				 return children[i];
			}
		}
	},
	//动态加载样式
	loadStyle: function(url){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
	},
	//RGB转16进制
	colorHex: function(rgb){
		//rgb(x, y, z)
		var color = rgb.toString().match(/\d+/g);
		//把 x,y,z 推送到 color 数组里
		var hex = '#';
		for (var i = 0; i < 3; i++) {
			//'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
			//'color[i]' 是数组，要转换成字符串.
			//如果结果是一位数，就在前面补零。例如： A变成0A
			hex += ("0" + Number(color[i]).toString(16)).slice(-2);
		}
		return hex;
	},
	//16进制转RGB
	colorRgb: function(hex){
		var color = [], rgb = [];
		hex = hex.replace(/#/,"");
		if (hex.length == 3) {
			//处理 "#abc" 成 "#aabbcc"
			var tmp = [];
			for (var i = 0; i < 3; i++) {
				tmp.push(hex.charAt(i) + hex.charAt(i));
			}
			hex = tmp.join("");
		}
		for (var i = 0; i < 3; i++) {
			color[i] = "0x" + hex.substr(i+2, 2);
			rgb.push(parseInt(Number(color[i])));
		}
		return "rgb(" + rgb.join(",") + ")";
	}
};

//集成iScroll的初始化
if(typeof IScroll !== 'undefined') {
	! function($e, win) {
		$e.fn.iscroll = function(opts) {
			opts = opts || {
				scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale', // 'scale',
				fadeScrollbars: true,
				click: true
			}

			$e.iscroll = new IScroll(this[0], opts);

			$e.iscroll.on("scrollEnd", function() {
				if(typeof $e.lazy == 'function') {
					$e.iScrollLazyLoading();
				}

				this.refresh();
			});

			return $e.iscroll;
		};

		$e(function() {
			//判断有无不滚属性
			if($e('.no-scroll').length > 0) return;
			var obj = $e('*[iscroll=box]').length >= 1 ? $e('*[iscroll=box]') : $e(".ui-page");
			if(obj.length <= 0 || obj[0].children.length <= 0) return;
			//判断当前对象是不是指定了不进行滚动显示
			if(obj[0].hasAttribute('no-iscroll')) { return; }
			//禁用默认的视图反弹
			obj[0].addEventListener(MOVE_EV, function(e) { e.preventDefault(); }, false);
			obj.iscroll();
		});
	}(ECF, window);
}