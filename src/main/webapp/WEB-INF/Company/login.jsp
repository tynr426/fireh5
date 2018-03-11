<%@page pageEncoding="utf-8" 
contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
<jsp:include page="block/Meta.html" ></jsp:include>
<title><%=fireh5.web.utils.Constants.Title%></title>
</head>
<body>
        <!-- 框架 -->
        <section class="ui-wrap">
            <!-- 体部 -->
            <article class="ui-page">
                <!-- 登录 -->
                <div class="login" id="LoginForm">
                    <div class="logo">
                        <img src="/fireh5/images/company_logo.png" alt="" />
                    </div>

                    <!--输入框-->
                    <div class="login-input-box">
                        <ul>
                            <li class="could">
                                <div class="inputbox">
                                    <input type="text" name="Code" id="Code" value="" placeholder="请输入公司代码" validate="isnull" tabindex="1" />
                                </div>
                            </li>
                            <li class="user">
                                <div class="inputbox">
                                    <input type="text" tabindex="2" name="UserName" id="UserName" value="" placeholder="请输入账号" validate="isnull" />
                                </div>
                            </li>
                            <li class="password">
                                <div class="inputbox">
                                <input type="password" name="Password" id="Password1" style="display:none">
                                    <input type="password" name="Password" id="Password" value="" placeholder="请输入密码" validate="isnull" tabindex="3" />
                                    
                                    <input id="showTxt" type="text" class="input_text" style="display:none;" error="请输入密码！" validate="isnull" value=""  placeholder="请输入密码">
                                </div>

                                <i class="icon show-target" id="isShow"></i>
                            </li>
                        </ul>
                    </div>
                    <!--//输入框-->

                    <div class="button">
                        <a href="javascript:void(0);" onclick="loginCM.login();" class="btn" tabindex="4">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
                    </div>

                    <!--服务器地址-->
                    <div class="server-box" style="display:none">
                        <div class="title">
                            <a href="javascript:void(0);" tabindex="5" onclick='pub.dialog("管理系统登录", $e("#CodeForm").html(), null, null, null, null)'>什么是代码?</a>
                        </div>
                    </div>
                     <!--快捷登录-->
                     
                     <c:if test="${isWxAuth}">
   
					
                    <div class="quick-login">
                        <div class="name">
                            <em>快捷登录</em>
                        </div>
                        <div class="link">
                            
                          <a href="<%=request.getContextPath() %>/company/wxLogin.do" class="weixin-login" title=""></a>
                          
                        </div>
                    </div>
                    </c:if>
                    <!--//快捷登录-->
                    
                </div>
                <!-- //登录 -->
            </article>
            <!-- //体部 -->
        </section>
        <!-- //框架 -->
    </body>
</html>
  
<script type="text/template" id="DomainForm">
    <div class="alert-box">
        <p class="title">服务器地址</p>

        <div class="pop-notice">服务器地址。</div>
    </div>
</script>
<script type="text/template" id="CodeForm">
    <div class="alert-box">
        <p class="title">代码</p>
        <div class="pop-notice">代码，指店铺入驻时自己填写的或者系统分配的唯一标识，如：YXP，注意代码可以由字母和数字组成。</div>
    </div>
</script>

<script type="text/javascript">
    $(function() {
        document.onkeydown = function(e) {
            var e = e || window.event;
            if (e.keyCode == 13) {
                var act = document.activeElement;
                if (act.nodeType == 1 && act.tagName == 'INPUT') {
                    store.login();
                }
            }
        };
    });
    loginCM.pwdSwitch();
</script>