<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${title}</title>
<jsp:include page="block/Meta.html"></jsp:include>
</head>
<body>
	<article class="ui-page">
	<!--框架-->
		<!-- 引入页面顶部 --> 
	
	    <header class="custom-head">
        <!-- 返回按钮 -->
        <a href="javascript:void(0);" onclick="history.go(-1);" class="btn ui-back-btn" title="返回"></a>
        <!-- //返回按钮 -->

        <!-- 标题党 -->
        <h1 class="ui-title">${title}</h1>
        <!-- //标题党 -->
    </header>
	<!-- //引入页面顶部 --> 
	<section class="ui-wrap" style="top: 40px;bottom: 0;height: 606px;"> <!-- 头部 -->  <!-- //头部 --> <!--体部--> <article
		class="ui-page"> <!--内盒-->
	<div class="scroll iscroll-wrapper">
		<!--收款收银台-->
		<div class="receipt-cashier">
			<div class="login-input-box">
				<ul id="ReceiveCash">
					<li class="box box-horizontal scan">
						<p class="name"><em class="red">*</em>旧密码：</p>
						<div class="inputbox box1">
							<input
								type="password" id="OldPwd" name="OldPwd" value=""
								validate="isnull" maxlength="64">
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>新密码：</p>
						<div class="inputbox box1">
							<input type="password" id="NewPwd" name="NewPwd" value=""
								validate="isnull" maxlength="64">
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>再次输入新密码：</p>
						<div class="inputbox box1">
							<input type="password" id="PassWord" name="PassWord" value=""
								validate="isnull" maxlength="64">
						</div>
					</li>
				</ul>
			</div>

			<div class="button">
				<a href="javascript:void(0);" onclick="updatePwd();" class="btn">确认</a>
			</div>
		</div>
		<!--//收款收银台-->
	</div>
	<!--//内盒--> </article> <!--//体部--> </section>
	<!--//框架-->
</body>
</html>
<script type="text/javascript">
	 function updatePwd(){
		 var oldPwd = $("#OldPwd").val();
			var newPwd = $("#NewPwd").val();
			var pwd = $("#PassWord").val();
			if(oldPwd==newPwd){
				alert("密码不能与原密码相同");
				return;
			}
			if(newPwd!=pwd){
				alert("两次密码输入不一致");
				return;
			}
			$.ajax({
				url:path+"/company/manager/updatePwd.do",
				type:"post",
				data:{oldPwd:oldPwd,pwd:pwd},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						alert("修改成功,下次登录生效");
						window.location.href=path+"/company/toMain.do";
					}else{	
						alert(result.message);			
					}								
					
				},
				error:function(){
					alert("修改失败");
				}
			});
	 }
</script>