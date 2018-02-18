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

		<!--列表区域-->
		<div class="list" style="top:10px" iscroll="box">
			<!--列表滚动区域-->
			<div class="scroll iscroll-wrapper">
				<ul id="bindList">

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
<jsp:include page="template/authBind.html"></jsp:include>

<script type="text/javascript">
function load(){
	$("#bindList").loadList("BodyListTmpelate",null,null,null,path+'/company/authBind/show.do')
}
$(function(){
	load();
});
</script>