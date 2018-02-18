<%@page import="fireh5.web.utils.Company"%>
<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${title}</title>
<jsp:include page="block/Meta.html"></jsp:include>
<link type="text/css" rel="stylesheet"
	href="/fireh5/Static/Js/Calendar/skin/WdatePicker.css" />
<script type="text/javascript"
	src="/fireh5/Static/Js/Calendar/WdatePicker.js">
</script>
</head>
<body>
 <section class="ui-wrap">
       
        <!--体部-->
        <article class="ui-page">
            <!-- 内盒 -->
            <div class="ui-content iscroll-wrapper" id="DetailBox">

            </div>
            <!-- //内盒 -->
        </article>
        <!--//体部-->
        <!-- 底部 -->
        <div class="custom-foot" id="OptBox" style="display:none">
        <div class="orderinfo-foot">
        <a href="javascript:void(0);" onclick='$("#chooseBatch").show()' class="btn gray">整改</a>
        </div>
        </div>
        <!-- //底部 -->
    </section>
    <!--//框架-->
    <!-- 弹出层 -->

    <!-- //弹出层 -->
    	<jsp:include page="template/sendAssignment.html"></jsp:include>
</body>
</html>


<script type="text/javascript">
var userId=<%=Company.getCompany().getUserId()%>;
	assigment.detail($.getUrlParam("checkId"));
</script>
