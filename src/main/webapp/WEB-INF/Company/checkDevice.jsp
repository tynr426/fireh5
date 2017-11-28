<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<jsp:include page="block/Meta.html"></jsp:include>
<script type="text/javascript" src="/fireh5/Static/Js/Wechat.js?v=1.2.10"></script>
<script type="text/javascript" src="/fireh5/Static/Js/jweixin-1.2.0.js"></script>

</head>
<body>
	<!--框架-->
	<section class="ui-wrap"> <!-- 头部 --> <$include
	templateName="Block/Head.html" /> <!-- //头部 --> <!--体部--> <article
		class="ui-page"> <!--内盒-->
	<div class="scroll iscroll-wrapper">
		<!--收款收银台-->
		<div class="receipt-cashier">
			<div class="login-input-box">
				<ul id="ReceiveCash">
					<li class="box box-horizontal scan">
						<p class="name">设备编号：</p>
						<div class="inputbox box1">
							<input type="hidden" value="0" name="PayFKId" id="PayFKId" /> <input
								type="hidden" value="0" name="PayFKFlag" id="PayFKFlag" /> <input
								type="text" name="Model" id="Model" value=""
								error="请输入设备型号" validate="isnull" placeholder="请扫码或输入型号"
								onchange="receiveCash.searchUser();" />
						</div> <a href="javascript:void(0);" class="search-btn" id="btnScanCode">扫码</a>
					</li>
					<li class="box box-horizontal">
						<p class="name">设备类型：</p>
						<div class="inputbox box1">
							<input type="text" name="DeviceTypeId" maxlenth="9" id="DeviceTypeId"
								value="" onchange="receiveCash.inputAmount(this);"
								validate="isnull|decimal6" error="请输入收款金额(大于0)！"
								placeholder="请输入设备类型" receipt-money />
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">设备位置：</p>
						<div class="inputbox box1">
							<input type="text" name="Detail" id="Detail" value="0"
								validate="decimal7" error="请输入赠送积分(>=0)！" placeholder="请输入赠送积分" />
						</div>
					</li>
					<li class="box box-horizontal scan">
						<p class="name">检查描述：</p>
						<div class="inputbox box1">
							<input type="text" name="Description" id="Description" value=""
								error="请输入票号！" placeholder="请输入问题" />
						</div> 
					</li>
					<li class="box box-horizontal aptitude-info">
						<p class="name">检查凭证：</p>
						<div class="aptitude box1">
							<input type="hidden" id="Certificate" name="Certificate" value="" />
							<ol id="logo-pic">
								<li class="update" id="btnWxImage"><a class="update-btn"
									href="javascript:void(0);"></a></li>
							</ol>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">备注：</p>
						<div class="textareabox box1">
							<textarea cols="" rows="" id="Remark"></textarea>
						</div>
					</li>
				</ul>
			</div>

			<div class="button">
				<a href="javascript:void(0);" onclick="save(this);" class="btn">确认提交</a>
			</div>

			<div class="golist">
				<a href="">查看检查清单</a>
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
				}, {
					action : 'scan',
					btn : [ '#btnScanCode'],
					fn : function(r) {
						onScanComplete(r);
					}
				} ]
			});

		}
	};

	$(function() {
		initConfig.wechat();
	});

	//扫描完成后
	function onScanComplete(result) {
		//app那边直接返回的字符串
		var arr = result.split('|');
		
	}
	function onAppImageComplete(imgUrl) {
		if (imgUrl == undefined || imgUrl == '') {
			pub.error("很抱歉，获取图片信息失败，请稍后重试...");
		} else {
			var html = jte(ecwx.imgTemplate, {
				url : imgUrl
			});
			var c = $("#logo-pic");
			if (c.length > 3) {
				pub.alert("最多上传{0}张图片".format(3));
			} else {
				c.append(html);
			}
		}
	};

	
</script>
