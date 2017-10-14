var ecPage=function(){}



//分页插件的扩展信息
ecPage.fn = ecPage.prototype = {
		Version: '2.0.0.1',
		create: '20140728',
		

		// 配置信息
		_config: {},

        // page初始化
        _init: function (c) {

            var onIScroll = function (pager) {

               

                if ($.iscroll) {

                    $.iscroll.on("scrollEnd", function () {
                        var c = pager._config;

                        if (c.pages > c.pageIndex && this.y < (this.maxScrollY + 5) && c.touchPage) {

                            pager.goNextPage(true);

                            if (c.touchTip) {
                                c.touchTip.html("数据加载中...");
                            }
                        }

                        var showObj = $('.ui-more');
                        showObj.css({ 'display': 'none' });
                    });

                    $.iscroll.on("scrollStart", function () {
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

                                var showPanel = $('.iscroll-wrapper').parent();
                                //if (c.container.parent().find(".ui-more").length === 0) {
                                //    c.container.parent().append(div);
                                //    c.touchTip = $(div);
                                //}

                                if (showPanel.find(".ui-more").length === 0) {
                                    showPanel.append(div);
                                    c.touchTip = $(div);
                                }
                            }
                        } else if (c.pages == c.pageIndex && Number(this.y) < (this.maxScrollY + 10)) {
                            var showObj = $('.ui-more');
                            if (showObj.length <= 0) {
                                var div = document.createElement("Div");
                                div.className = "ui-more";

                                var showPanel = $('.iscroll-wrapper').parent();
                                if (showPanel.find(".ui-more").length === 0) {
                                    showPanel.append(div);
                                }

                                showObj = $('.ui-more');
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
                $(win).bind("scroll", function () {
                    var _c = my._config, pindex = _c.pageIndex;

                    //alert("1");
                    //console.log("distBottom:" + _c.distBottom);

                    var target = win;

                    if (win.document) {
                        target = win.document;
                    }

                    if (win.document.documentElement.scrollHeight == $(target).height()) {

                        // 总页数大于当前页时才进行加载
                        if (_c.pages > pindex) {
                            //console.log($.isMobile);
                            // 移动端进行不断的加载
                            if ($.isMobile) {
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
		// 生成相应的html代码
        render: function (func) {
            loadData(this, null, func);
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
function showData(pager, data, append,func) {
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
          func(pager,data);
      }
	if (typeof $.lazy === 'function') {
		//延迟加载
		$(document).nonePic();
	}
};

//内部方法开始
//加载数据
function loadData(pager, append,func) {
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
				c.showData.apply(pager, [doc.list, arguments,func]);
			}
			else {
				showData(pager, doc.list, append,func);
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


