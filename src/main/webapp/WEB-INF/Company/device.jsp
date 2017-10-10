<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no" />
<meta name="format-detection" content="address=no" />

<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

<!-- 初始化 -->
<link type="text/css" rel="stylesheet" href="/fireh5/Static/Css/style.min.css">

<!-- 内页样式 -->
<link type="text/css" rel="stylesheet" href="/fireh5/css/device.css">

<script language="javascript" type="text/javascript"
	src="/fireh5/Static/Js/jquery-1.8.2.js?v=2.0.14.715">
</script>
<script type="text/javascript" src="/fireh5/js/basevalue.js">
</script>
<script type="text/javascript" src="/fireh5/js/webCompany/device.js">
</script>
<script type="text/javascript" src="/fireh5/Static/Js/page.js">
</script>
<script type="text/javascript" src="/fireh5/Static/Js/Public.js">
</script>

</head>
<body>
    <!--框架-->
    <section class="ui-wrap">
      
        <!--体部-->
        <article class="ui-page">
            <!--内盒-->
            <div class="ui-content iscroll-wrapper">
                <!--注册-->
                <div class="dhxt-wrap find-system">
                    <div class="header">
                        <ul class="step-list">
                            <li tag="step"  class="step1 on"><div><em>1</em><p>验证手机号</p></div></li>
                            <li tag="step"  class="step2"><div><em>2</em><p>重置密码</p></div></li>
                            <li tag="step"  class="step3"><div><em>3</em><p>重置成功</p></div></li>
                        </ul>
                    </div>
                    <!--验证手机号   元素step1加class:on-->
                    <div tag="step" class="inner-cont divstep1">
                        <div class="main">
                            <ul class="info">
                                <li>
                                    <input type="text" name="ForgetKeyword" class="input_text" id="ForgetKeyword" placeholder="请输入手机号码" value="" onblur="iforget.compare(this);" />
                                </li>
                                <li class="yzm">
                                    <input type="text" name="ForgetMobileCode" class="input_text" id="ForgetMobileCode" value="" placeholder="请输入手机验证" />
                                    <a href="javascript:void(0);" onclick="iforget.verify(this,0);" id="iforget_verify">获取验证码</a>
                                </li>
                            </ul>
                            <div class="btn-group">
                                <button type="submit" class="btn yes-btn" id="iforget1">验证</button>
                            </div>
                            <div class="apply-button box box-horizontal">
                                <div class="text box1">已有账号，点击登录</div>
                                <a class="btn" href="/join/login.aspx?role=<$var Role/>">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
                            </div>
                        </div>
                    </div>
                    <!--//验证手机号-->
                    <!--重置密码     元素step1、step2加class:on-->
                    <div tag="step" class="inner-cont divstep2" style="display:none;">
                        <div class="main">
                            <ul class="info">
                                <li>
                                    <input type="password" id="ForgetPassword" name="ForgetPassword" class="input_text"  placeholder="请输入新密码"/>
                                </li>
                                <li>
                                    <input type="password" id="ForgetPasswordBak" name="ForgetPasswordBak" class="input_text" placeholder="请确认新密码"  />
                                </li>
                            </ul>
                            <div class="btn-group">
                                <button type="submit" class="btn yes-btn" id="iforget2">提交</button>
                            </div>
                        </div>
                    </div>
                    <!--//重置密码-->
                    <!--重置成功     元素step1、step2、step3加class:on-->
                    <div tag="step" class="inner-cont divstep3" style="display:none;">
                        <div class="success">
                            <p><i></i>密码重置成功，<a href="/join/login.aspx?role=<$var Role/>">去登录！</a></p>
                        </div>
                    </div>
                    <!--//重置成功-->


                  
                </div>
                <!--//注册-->
            </div>
            <!--//内盒-->
        </article>
        <!--//体部-->
    </section>
    <!--//框架-->
    <script type="text/javascript">
        $e(function () {
            iforget.init(1);
        });
    </script>
</body>
</html>