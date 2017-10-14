<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<jsp:include page="block/Meta.html"></jsp:include>
</head>

<body>
	<!--框架-->
	<section class="ui-wrap"> 
	
	<!-- 引入页面顶部 --> 
	<jsp:include page="block/head.html"></jsp:include> 
	<!-- //引入页面顶部 --> 
	<!--体部--> 
	<article class="ui-page" style="top: 40px;bottom: 0;height: 606px;">
	 <!--订单列表-->
	<div class="order-list">
		<!--搜索区域-->
		<div class="order-search box box-horizontal">
			<!--模拟下拉-->
			<div class="search-push close">
				<div class="title"
					onclick="var obj = $e(this.parentNode);if(obj.hasClass('open')){obj.removeClass('open').addClass('close');}else{obj.removeClass('close').addClass('open');}">
					<p id="select-title">全部数据</p>
					<i class="icon"></i>
				</div>

				<!-- 下拉列表 -->
				<div class="push-list" id="RetreatCountBox"></div>
				<!-- //下拉列表 -->
			</div>
			<!--//模拟下拉-->
			<!--搜索区域-->
			<div class="search-area box1">
				<div class="inputbox">
					<input type="text" name="searchText" id="searchText" value="" />
				</div>

				<div class="button">
					<a href="javascript:void(0);" onclick="retreat.searchRetreat();"
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
		load();
	});
	 function load(){
		  var config={
					url:path+"/company/device/show.do",
		  			pageSize:6,
		  			pageIndex:1,
		  			barSize:3,
		  			templateId:"BodyListTmpelate",
		  			container:"deviceList"
		  			};
		  var pageInfo=new ecPage.fn._init(config);
	 }
</script>