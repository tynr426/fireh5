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
	<article class="ui-page">
	<section class="ui-wrap" > <!-- 头部 -->  <!-- //头部 --> <!--体部--> <article
		class="ui-page"> <!--内盒-->
	<div class="scroll iscroll-wrapper">
		<!--收款收银台-->
		<div class="receipt-cashier">
			<div class="login-input-box">
				<ul id="ReceiveCash">
					<li class="box box-horizontal scan">
						<p class="name">设备型号：</p>
						<div class="inputbox box1">
						<input type="hidden" id="DeviceId"/>
						<input type="hidden" id="DeviceTypeId"/>
							<input type="text" name="Model" id="Model" value=""
								error="请输入设备型号" validate="isnull" placeholder="请扫码或输入型号" />
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">设备类型：</p>
						<div class="inputbox box1">
							<input type="text" name="DeviceTypeName" maxlenth="9" id="DeviceTypeName"
								value=""  readonly="readonly"
								placeholder="请输入设备类型" receipt-money />
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">设备位置：</p>
						<div class="inputbox box1">
							<input type="text" name="PositionDetail" id="PositionDetail" value="0"
								readonly="readonly"/>
						</div>
					</li>
					<li class="box box-horizontal aptitude-info">
						<p class="name">检查凭证：</p>
						<div class="aptitude box1">
							
							<ol id="logo-pic">
								<li class="update" id="btnWxImage"><a class="update-btn"
									href="javascript:void(0);"></a></li>
							</ol>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">问题描述：</p>
						<div class="textareabox box1">
							<textarea cols="" rows="" id="Description"></textarea>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">是否完成：</p>
						<div class="selectbox" error="请选择问题级别" validate="isnull">
							<select id="IsFinish" class="select" style="height:40px">
							<option value="">请选择</option>
							<option value="0">待整改</option>
							<option value="1">已整改</option>
							</select>
						</div>
					</li>
				</ul>
			</div>

			<div class="button">
				<a href="javascript:void(0);" onclick="" class="btn">确认提交</a>
			</div>
		</div>
		<!--//收款收银台-->
	</div>
	<!--//内盒--> </article> <!--//体部--> </section>
	<!--//框架-->
</body>
</html>



<script type="text/javascript">
	//wechat.init();
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
