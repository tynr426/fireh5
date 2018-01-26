<%@page import="fireh5.web.utils.Company"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=fireh5.web.utils.Constants.Title%></title>
<jsp:include page="block/Meta.html"></jsp:include>
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
					<li class="select" data-status="999"><a href="javascript:void(0);" onclick="checkDeviceList.search(this)"><em>全部</em><em>(0)</em></a></li>
					<li data-status="0"><a href="javascript:void(0);" onclick="checkDeviceList.search(this)"><em>正常</em><em>(0)</em></a></li>
					<li data-status="1"><a href="javascript:void(0);" onclick="checkDeviceList.search(this)"><em>待指派</em><em>(0)</em></a></li>
					<li data-status="2"><a href="javascript:void(0);" onclick="checkDeviceList.search(this)"><em>待整改</em><em>(0)</em></a></li>
					<li data-status="3"><a href="javascript:void(0);" onclick="checkDeviceList.search(this)"><em>已整改</em><em>(0)</em></a></li>
					</ul>
				</div>
				<!-- //下拉列表 -->
			</div>
			<!--//模拟下拉-->
			<!--搜索区域-->
			<div class="search-area box1">
				<div class="inputbox">
					<input type="text" name="keyword" id="keyword" value="" />
				</div>

				<div class="button">
					<a href="javascript:void(0);" onclick="checkDeviceList.search();"
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
<jsp:include page="template/checkDeviceList.html"></jsp:include>

<script type="text/javascript">
var userId=<%=Company.getCompany().getUserId()%>;
	$(function(){
		checkDeviceList.search();
	});
	 function load(){
		 var status=$("#RetreatCountBox .select").attr("data-status");
		 var keyword=$("#keyword").val();
		 if(status==999){
			 status=null;
		 }
		  var config={
					url:path+"/company/check/showCDList.do",
		  			pageSize:3,
		  			pageIndex:1,
		  			isScroll:true,
		  			templateId:"BodyListTmpelate",
		  			container:"deviceList",
		  			data:{status:status,keyword:encodeURI(keyword)}
		  			};
		  var pageInfo=new ecPage.fn._init(config);
	 }
</script>