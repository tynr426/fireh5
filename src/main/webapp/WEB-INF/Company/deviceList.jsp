<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=fireh5.web.utils.Constants.Title%></title>
<jsp:include page="block/Meta.html"></jsp:include>
<script type="text/javascript" src="/fireh5/Static/Js/Wechat.js?v=1.2.10"></script>
<script type="text/javascript" src="/fireh5/Static/Js/jweixin-1.2.0.js"></script>
</head>

<body>
	<!--框架-->
	<section class="ui-wrap"> 
	
	<!--体部--> 
	<article class="ui-page" >
	 <!--订单列表-->
	<div class="order-list">
		<!--搜索区域-->
		<div class="order-search box box-horizontal">
			<!--模拟下拉-->
			<div class="search-push close">
				<div class="title"
					onclick="var obj = $(this.parentNode);if(obj.hasClass('open')){obj.removeClass('open').addClass('close');}else{obj.removeClass('close').addClass('open');}">
					<p id="select-title">全部数据</p>
					<i class="icon"></i>
				</div>

				<!-- 下拉列表 -->
			<div class="push-list" >
					<ul id="RetreatCountBox">
					<li class="select" data-status="0"><a href="javascript:void(0);" onclick="device.search(this)"><em>全部</em></a></li>
					</ul>
				</div>
				<!-- //下拉列表 
				-->
			</div>
			<!--//模拟下拉-->
			<!--搜索区域-->
			<div class="search-area box1">
				<div class="inputbox">
					<input type="text" name="searchText" id="searchText" value="" />
				</div>

				<div class="button">
					<a href="javascript:void(0);" onclick="load();"
						class="btn"></a>
				</div>
			</div>
			<!--//搜索区域-->
		</div>
		<!--//搜索区域-->
		<!--列表区域-->
		<div class="list" iscroll="box">
			<!--列表滚动区域-->
			<div class="scroll iscroll-wrapper">
				<ul id="deviceList">

				</ul>
			</div>
			<!--//列表滚动区域-->
		</div>
		<!--//列表区域-->
	</div>
	<!--//订单列表--> </article> <!--//体部--> </section>
	<!--//框架-->
</body>
</html>
<jsp:include page="template/device.html"></jsp:include>

<script type="text/javascript">
	$(function(){
		device.loadDeviceType();
		load();
	});
	var iswx = '<%=WechatUtils.IsWxBrowser()%>';
	 function load(){

		 var devicetypeId=$("#RetreatCountBox .select").attr("data-status")||0;
	     var keyword=$("#searchText").val();
		 console.log(devicetypeId);
		  var config={
					url:path+"/company/device/show.do",
		  			pageSize:3,
		  			pageIndex:1,
		  			isScroll:true,
		  			templateId:"BodyListTmpelate",
		  			container:"deviceList",
		  			data:{deviceTypeId:devicetypeId,keyword:keyword},
		  			callback:function(){
		  				 //device.isBindQr('520ea986e4084ad69dcebffae89fed72',$("#deviceList a[data-state]").eq(1));
		  				var arr=[];
		  				$("#deviceList a[data-state]").each(function(){
		  					arr.push(this);
		  				});

	  					ecwx.init({
	  						isWx : (iswx == 'true'),
	  						actions : [{
	  							action : 'scan',
	  							btn : arr,
	  							fn : function(r,obj) {
	  								device.isBindQr(r,obj);
	  							}
	  						} ]
	  					});
		  			}
		  			};
		  var pageInfo=new ecPage.fn._init(config);
	 }

</script>