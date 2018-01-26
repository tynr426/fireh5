<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${title}</title>
<jsp:include page="block/Meta.html"></jsp:include>
<script type="text/javascript" src="/fireh5/Static/Js/Wechat.js?v=1.2.10"></script>
<script type="text/javascript" src="/fireh5/Static/Js/jweixin-1.2.0.js"></script>

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
    	<jsp:include page="template/repairrecord.html"></jsp:include>
</body>
</html>


<script type="text/javascript">
	//wechat.init();
	checkDevice.detail($.getUrlParam("checkId"));
	var initConfig = {
		wechat : function() {
			var iswx = '<%=WechatUtils.IsWxBrowser()%>';
			ecwx.init({
				isWx : (iswx == 'true'),
				actions : [ {
					action : 'image',
					btn : '#btnWxImage',
					maxCount : 3,
					fn : null
				} ]
			});

		}
	};

	$(function() {
		initConfig.wechat();
		
	});
	
</script>
