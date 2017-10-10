/*
 魔镜无限滚动
 */

(function(){
	var runShow = {
	    //配置变量
	    runTimer: 100,
	    //构造函数
	    init: function (obj) {
	        var my = this;
	        //记录外框对象
	        this.obj = null;
	        //外框对象的高度
	        this.objHeight = 0;
	        //记录子集元素对象
	        this.listObj = null;
	        //记录子集元素个数
	        this.listNum = 0;
	        //记录子集元素的单位高度
	        this.listHeight = 0;
	        //记录滚动的时间机制
	        this.times = 0;
	        //记录滚动位距
	        this.moveLoad = 0;
	        //记录滚动位数
	        this.indexNum = 0;
	        //当前子集DOM
	        this.filemListObj = null;
	        //运行琐
	        this.runSock = false;
	
	        if (!runShow.check(obj)) return;
	        my.obj = obj;
	        //找到子集元素
	        my.listObj = $e('*[marquee-list]', obj);
	        var i = my.listNum = my.listObj.length;
	        //获取外框尺寸
	        my.objHeight = this.obj.offsetHeight;
	        //获取子集元素的高度
	
	        //分析子集元素
	        if (i >= 1) {
	            my.listHeight = my.listObj[0].offsetHeight;
	            //判定可否进行滚动
	            if (Number(my.listHeight * my.listNum) <= my.objHeight) return;
	            //遍历listObj
	            while (--i >= 0) {
	                //初始化子集元素
	                my.listObj[i].setAttribute('marquee-list', i);
	
	                //给子集元素绑定事件
	                my.listObj[i].onmouseover = function (eventOver) {
	                    //锁定
	                    my.runSock = true;
	                    return;
	                };
	                my.listObj[i].onmouseout = function (eventOut) {
	                    //解锁
	                    my.runSock = false;
	                    return;
	                };
	            };
	            //滚动开始
	            runShow.marqueeRun(my);
	        };
	        return;
	    },
	    //滚动开始
	    marqueeRun: function (my) {
	        my.times = setTimeout(function () {
	            if (!my.runSock) {
	                my.filemListObj = my.listObj[my.indexNum];
	                my.moveLoad = parseInt(my.moveLoad) - 1;
	                //检测滚动的距离是否满足了一个周期
	                var moveMaxLoad = -Number(my.listHeight);
	                //初始化滚动位距
	                if (my.moveLoad === moveMaxLoad) {
	                    my.moveLoad = 0;
	                    my.indexNum++;
	                    //复位
	                    if (my.indexNum === my.listNum) {
	                        my.indexNum = 0;
	                    };
	                    $e(my.filemListObj).remove();
	                    $e(my.obj).append(my.filemListObj);
	                };
	                //给子集元素赋值
	                $e(my.listObj).css({ 'top': my.moveLoad + 'px' });
	            };
	            runShow.marqueeRun(my);
	        }, runShow.runTimer);
	        return;
	    },
	    //验证函数
	    check: function (obj) {
	        var _obj = $e(obj)[0];
	        if (!_obj || typeof (_obj) == 'string' || typeof (_obj) == 'undefined' || typeof (_obj) == 'unmber' || _obj.nodeType != 1) return false;
	        else return true;
	    },
	    //运行函数
	    run: function () {
	        //找到DOM
	        var dom = $e('*[marquee]');
	        var i = dom.length;
	        if (i <= 0) return;
	        if (runShow.check(dom)) {
	            while (--i >= 0) {
	                dom[i] = new runShow.init(dom[i]);
	            }
	        };
	        return;
	    }
	};
	
	runShow.run();
})();