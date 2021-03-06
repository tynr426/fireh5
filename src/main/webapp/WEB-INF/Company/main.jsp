<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="fireh5.web.utils.*"%> 
    <%@ page import="fire.common.entity.CompanyResult" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>消防管理系统</title>
<jsp:include page="block/Meta.html" ></jsp:include>
<script type="text/javascript" src="/fireh5/Static/Js/Wechat.js?v=1.2.10"></script>
<script type="text/javascript" src="/fireh5/Static/Js/jweixin-1.2.0.js"></script>
<%
CompanyResult company=Company.getCompany();
%> 
</head>

<body>

    <!-- 框架 -->
    <section class="ui-wrap">
        <!-- 体部 -->
        <article class="ui-page">
            <!-- 店铺首页 -->
            <div class="store-index">
                <!--标题区域-->
                <div class="store-title">
                    <!--用户基本信息-->
                    <div class="user-info box box-horizontal">
                        <!--用户头像-->
                            <div class="pic load">
                                <a href="javascript:void(0);">
                                    <img src="<%=company.getLogo() %>" alt="" error="/Static/Images/webstore-pic.png" />
                                </a>
                            </div>
                          
                        <!--//用户头像-->
                        <!--用户信息-->
                        <div class="info box1">
                            <h1><%=company.getName() %></h1>
                            <div class="line box box-horizontal">
                                <p class="name">公司代码：</p>
                                <div class="string box1"><%=company.getCode() %></div>
                            </div>
                         
                            <div class="line box box-horizontal">
                                <p class="name">公司地址：</p>
                                <div class="add-string box1"><%=company.getAddress() %></div>
                            </div>
                            <div class="line box box-horizontal">
                                <p class="name">操作账户：</p>
                                <div class="string box1">
                                    <%=company.getUserName() %>
                                   
                                </div>
                            </div>
                        </div>
                        <!--//用户信息-->
                    </div>
                    <!--//用户基本信息-->
                </div>
                <!--//标题区域-->
                <!--订单处理-->
                <div class="store-order-handle">
                    <div class="mt">
                        <i class="icon"></i>
                        <p>订单处理</p>
                    </div>

                    <div class="mc">
                        <ul class="box box-horizontal">
                            <li class="box1"><a href="Order/List.aspx">销售订单</a></li>
                            <li class="box1"><a href="Supplier/OrderList.aspx">进货订单</a></li>
                        </ul>
                    </div>
                </div>
                <!--//订单处理-->
                <!-- 列表切换组件 -->
                <div class="index-lab">
                    <!--表头-->
                    <div class="statis">
                        <ul class="box box-horizontal" label-btncom>
                         
                                <li class="box1" label-btn="0" onclick="setLocalStorage(this);">
                                    <a href="javascript:void(0);" class="">
                                        <span>我的地盘</span>
                                    </a>
                                </li>
                              
                                <li class="box1" label-btn="1" onclick="setLocalStorage(this);">
                                    <a href="javascript:void(0);" class="">
                                        <span>数据录入</span>
                                    </a>
                                </li>
                           
                        </ul>
                    </div>
                    <!--//表头-->
                    <div class="ui-iscroll-cont" iscroll="box">
                        <div class="scroll iscroll-wrapper">
                            <div class="list-mc" label-limitarea>
                            
                                    <div class="for" label-area>
                                        <!--菜单导航-->
                                        <div class="store-menu">
                                            <ul>
                                                <li>
                                                    <a href="<%=request.getContextPath()%>/company/assigment/toAssigment.do" class="box box-horizontal">
                                                        <span>
                                                            <i class="icon text"></i>
                                                            <em>任务列表<em id="OrderCountBox"></em></em>
                                                        </span>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="<%=request.getContextPath()%>/company/check/toCheckList.do" class="box box-horizontal">
                                                        <span>
                                                            <i class="icon money"></i>
                                                            <em>巡查记录</em>
                                                        </span>
                                                    </a>
                                                </li> 
                                              <li>
                                                    <a href="<%=request.getContextPath() %>/company/device/toDeviceList.do" class="box box-horizontal">
                                                        <span>
                                                            <i class="icon user"></i>
                                                            <em>设备列表</em>
                                                        </span>
                                                    </a>
                                                </li>    
                                            </ul>
                                        </div>
                                        <!--//菜单导航-->
                                    </div>
                                 
                                    <div class="for" label-area>
                                        <!--菜单导航-->
                                        <div class="store-menu">
                                            <ul>

                                            
                                                <li>
                                                    <a data-state="insert" data-link="<%=request.getContextPath() %>/company/device/toDevice.do" class="box box-horizontal">
                                                        <span>
                                                            <i class="icon retreat"></i>
                                                            <em>录入设备</em>
                                                        </span>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a  data-state="check" data-link="<%=request.getContextPath() %>/company/check/toCheck.do" class="box box-horizontal">
                                                        <span>
                                                            <i class="icon retreat"></i>
                                                            <em>检查录入</em>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a data-state="repair"  class="box box-horizontal">
                                                        <span>
                                                            <i class="icon retreat"></i>
                                                            <em>维修录入</em>
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--//菜单导航-->
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- //列表切换组件 -->
            </div>
            <!-- //店铺首页 -->
        </article>
        <!-- //体部 -->
        <!-- 底部 -->
       
    
        <!-- //底部 -->
    </section>
    <!-- //框架 -->
   
    <div class="ui-fast-menu close" id="ui-fast-menu">
        <!--半透明背景-->
        <div class="bg-color"></div>
        <!--//半透明背景-->
        <!--列表-->
        <div class="list">
            <ul>
             <li class="change">
                        <a href="<%=request.getContextPath() %>/company/manager/toPwd.do">
                            <i class="icon"></i>
                            <em class="text">修改密码</em>
                        </a>
                    </li>
                       <li class="merchant">
                            <a href="<%=request.getContextPath()%>/company/authBind/toAuthBind.do">
                                <i class="icon"></i>
                                <em class="text">微信帐号</em>
                            </a>
                        </li>
                        <li class="exit thirdexit">
                            <a href="javascript:void(0);" onclick="loginCM.loginOut()">
                                <i class="icon"></i>
                                <em>退出登录</em>
                            </a>
                        </li>
                        
                   
                <li class="main">
                    <a href="javascript:void(0);" onclick="var obj = $('#ui-fast-menu');if(obj.hasClass('open')){obj.addClass('close').removeClass('open');}else{obj.addClass('open').removeClass('close')}">
                        <i class="icon"></i>
                    </a>
                </li>
            </ul>
        </div>
        <!--//列表-->
    </div>
    <!--//悬浮菜单-->
</body>
</html>
<style>
     .ui-fast-menu.open li.merchant{bottom:-90px;}
     .ui-fast-menu.open li.thirdexit{bottom:-135px;}
</style>


<script type="text/javascript" language="javascript" charset="utf-8">
    $(function () {

        //列表切换
        if (typeof $().customCheckTable === 'function') {
            $('.index-lab').customCheckTable({
                setName: 'tab1'
            });
        }

        //本地存储
        var getLocalStorage = function () {
            var key = 'tab1';

            //获取DOM对象
            var obj = $('*[custom-changetable=' + key + ']');

            if (obj.length <= 0) { return; }

            //获取按钮组
            var btn_box = $('*[label-btncom=' + key + ']', obj[0]);

            //获取切换组
            var area_box = $('*[label-limitarea=' + key + ']', obj[0]);

            if (btn_box.length <= 0 || area_box.length <= 0) { return; }

            //落实到具体按钮
            var btn = $('*[label-btn]', btn_box[0]);

            //落实到具体切换内容
            var area = $('*[label-area]', area_box[0]);

            if (btn.length <= 0) { return; }

            //通过key来获取value
            var dt = localStorage.getItem("tabnum");

            if (dt === null) {
                dt = '0';
            }

            btn.each(function () {
                //去掉选项卡选择样式
                $(this).removeClass('select');

                if ($(this).attr('label-btn') === dt) {
                    $(this).addClass('select');
                    if (btn.length == 1 && $(this).find("a").hasClass("sale")) {
                        //不显示底部
                        $("footer").hide();
                    } else {
                        $("footer").show();
                    }
                }

            });

            area.each(function () {
                //去掉选项卡选择样式
                $(this).removeClass('select');

                if ($(this).attr('label-area') === dt) {
                    $(this).addClass('select');
                }
            });
        };

        var test_obj_fun = function () {
            var test_obj = $('.store-menu');

            var times = setTimeout(function () {
                if (test_obj !== null && test_obj[0].childNodes.length > 0) {
                    //sizeStoreIndex(times);
                    clearTimeout();
                } else {
                    test_obj_fun();
                }
            }, 50);
        };

        test_obj_fun();

        //获取本地数据
        getLocalStorage();

    });

    //设置本地储存
    var setLocalStorage = function (obj) {
        //获取切换数据
        var num = obj.getAttribute('label-btn');
        //添加key-value 数据到 sessionStorage
        localStorage.setItem("tabnum", num);

        //清空所有的key-value数据。
        //localStorage.clear();
    };
	var iswx = '<%=WechatUtils.IsWxBrowser()%>';
	var arr=[];
	$("a[data-state]").each(function(){
		arr.push(this);
	});

		ecwx.init({
			isWx : (iswx == 'true'),
			actions : [{
				action : 'scan',
				btn : arr,
				fn : function(r,obj) {
					device.getQR(r,obj);
				}
			} ]
		});
//device.getQR('4bff38d855c149dda7ad66312546edb2');
</script>