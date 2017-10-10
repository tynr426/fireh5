var ecPage=function(){}



//分页插件的扩展信息
ecPage.fn = ecPage.prototype = {
		Version: '2.0.0.1',
		create: '20140728',
		

		// 配置信息
		_config: {},

		// page初始化
		_init: function (c) {
			var my = this;
			my._config = c;
			my.pages = c.pages;
			my.render();


			return my;
		},

		// 设置分页大小
		setPageSize: function (size) {
			if (size > 0) {
				this._config.pageSize = size;
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
		refresh: function () {
			loadData(this);
		},

		// 生成相应的html代码
		render: function () {
			loadData(this);
		}
};

//功能转换  核心必不可少
ecPage.fn._init.prototype = ecPage.fn;

//获取分页条
function pageString(pager) {
	var c = pager._config,
	div = document.createElement("DIV");
	div.className =  "page-box";
	div.id = c.id + '_PageBar';
	//var div = appendElement(box, 'DIV');

	// 显示获取数据的情况
	if (c.barRecords) {
		var recordsBar = appendElement(div, "DIV", "info");

		recordsBar.innerHTML = "共" + c.pages + "</em>页,<em class=\"rm\">" + c.records + "</em>条数据";
	}


	//首页
	if (c.pages > 0) { //c.pageIndex > 1
		var fristPage = appendElement(div, 'A', "first");
		fristPage.innerHTML = '首页';
		fristPage.href = "javascript:;";
		fristPage.onclick = function () { pager.goFirstPage(); };
	}

	if (c.pageIndex > 1) { //c.pageIndex > 1
		var fristPage = appendElement(div, 'A', "up");
		fristPage.innerHTML = '上一页';
		fristPage.href = "javascript:;";
		fristPage.onclick = function () { pager.goPreviousPage(); };
	}

	var ii = 1, t = 1, vpage;
	if (parseInt(c.pages - c.barSize) > 0) { // 处理从哪开始循环得到中间部分分页条
		if ((c.pageIndex + (c.barSize - 2)) > c.barSize) {
			t = c.pageIndex - 2;
			if (t < 1) t = 1;
			if (t > (c.pages - c.barSize)) {
				t = c.pages - c.barSize + 1;
			}
		}
	}

	if (t > 1) {	//当循环开始时比第一页大
		appendElement(div, 'span', "more").innerHTML = '...';
	}

	for (t; t <= c.pages; t++) {
		if (ii <= c.barSize) {
			if (t == c.pageIndex) {   // 处理当前页
				var cpage = appendElement(div, 'span', "now");
				cpage.innerHTML = t;
			}
			else {  // 可以跳转到其他页面
				vpage = appendElement(div, 'A', "num");
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

	if (t <= c.pages) {	// 循环结束后小于最大页数
		appendElement(div, 'span', "more").innerHTML = '...';
	}

	if (c.pageIndex < c.pages) { //c.pageIndex < c.pages
		var lastPage = appendElement(div, 'A', "down");
		lastPage.innerHTML = '下一页';
		lastPage.href = "javascript:;";
		lastPage.setAttribute('page', c.pages);
		lastPage.onclick = function () { pager.goNextPage(); };
	}

	//  最后一页
	if (c.pages > 0) { //c.pageIndex < c.pages
		var lastPage = appendElement(div, 'A', "end");
		lastPage.innerHTML = '尾页';
		lastPage.href = "javascript:;";
		lastPage.setAttribute('page', c.pages);
		lastPage.onclick = function () { pager.goLastPage(this); };
	}

	var input = appendElement(div, "INPUT", "");
	input.type = "text";
	input.value = c.pageIndex;
	input.id = c.id + '_IndexPage';

	var  el= appendElement(div, "A", "return");
	el.onclick = function () {
		pager.goPage(this, input.value);
	};
	el.innerHTML = "跳转";

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

};


//显示回调回来的数据到容器中
function showData(pager, data, append) {
	var c = pager._config;
	var html = $("#" + c.templateId).html();
	if (typeof (c.container) == "string") {
		c.container = $("#"+c.container);
	}
	if (c.isScroll && append) { //进行追加
		c.container.append($.tmpl(html,data));
	} else {
		c.container.html($.tmpl(html,data));
	}
	if ($.isArray(data) && data.length > 0) {
		

		// 开启鼠标移入如果是Table进行行的交替处理
		if (c.isHover && c.container[0].nodeName == 'TBODY') {
			$(">tr", c.container[0]).each(function(){
				$(this).bind("mouseover", function () {
					$(">th,>td", this).css("background-color", c.hoverColor);
				});
				$(this).bind("mouseout", function () {
					$(">th,>td", this).css("background-color", "");
				});
			});
		}
	}
	else {
		console.log(c.container[0].nodeName);
		if (c.container[0].nodeName == 'TBODY') {
			//找col
			var cols = $('colgroup > col', c.container[0].parentNode);

			var newErrorNull = "<tr><td colspan=\"" + cols.length + "\">无此数据</td></tr>";

			c.container.html(newErrorNull);
		} else {
			c.container.html("无此数据");
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

	if (typeof $.lazy === 'function') {
		//延迟加载
		$(document).nonePic();
	}
};

//内部方法开始
//加载数据
function loadData(pager, append) {
	var c = pager._config,
	data = '';

//	判断是否锁定了请求
	if (c.lock) return;

//	给请求加锁
	c.lock = true;
	var configData = c.data||{};
	data = {index: c.pageIndex , size:  c.pageSize};
	var empty = {};
	var settings = $.extend(empty,data, configData);
	
	$.ajax({
		url: c.url,
		data: settings,
		dataType: "json",
		open: c.open,
		success: function (result) {

			// 请求完成后解锁
			c.lock = false;

			var doc =  result.data;

			// 获取总记录数
			c.records = doc.count;
			// 计算总页数
			c.pages = Math.ceil(c.records / c.pageSize);
			pager.reset(c);

			// 给定了回调方法后的执行处理
			if (typeof (c.showData) == 'function') {
				c.showData.apply(pager, [doc.list, arguments]);
			}
			else {
				showData(pager, doc.list, append);
			}

			if (c.pageBarId) {    //添加专用的pageBar容器 by xp 20121205
				$('#' + c.pageBarId).html(pageString(pager));
			}

			//自定义单选复选UI
			if (typeof ($().customCheck) == 'function') {
				$(document).customCheck();
			}

			//可拖动Table列表宽度UI
			if (typeof $().customChangeTableUI === 'function') {
				$('#customChangeTable').customChangeTableUI({ min: 60 });
			}

			//高级查询关闭事件
			if (typeof (filterClose) == 'function') {
				filterClose();
			}
		},
		done: c.done,
		error: function () {
			alert("分页数据处理错误,错误代码: " + arguments[0] + ";错误信息: " + arguments[1]);
		}
	});
};


