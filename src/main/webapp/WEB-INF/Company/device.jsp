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
<link type="text/css" rel="stylesheet" href="/fireh5/css/device/device.css">

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
<script type="text/javascript" src="/fire/Static/Js/Calendar/WdatePicker.js">
</script>
<script type="text/javascript" src="/fire/Static/Js/formValidate.js">
</script>
<script type="text/javascript" src="/fire/js/data.json">
</script>
<script type="text/javascript" src="/fire/js/data.json">
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
                            <li tag="step"  class="step1 on"><div><em>1</em><p>设备录入</p></div></li>
                            <li tag="step"  class="step2"><div><em>2</em><p>参数录入</p></div></li>
                            <li tag="step"  class="step3"><div><em>3</em><p>录入成功</p></div></li>
                        </ul>
                    </div>
                    <!--验证手机号   元素step1加class:on-->
                    <div tag="step" class="inner-cont divstep1">
                        <div class="main">
                            <div class="custom-table">
    <div class="form" id="DeviceForm">
        <table border="0" cellpadding="0" cellspacing="0">
            <colgroup>
                <col style="width: 150px;" />
                <col style="width:auto;" />
                <col style="width: 150px;" />
                <col style="width:auto;" />
            </colgroup>

            <tbody id="tbDevice">
                <tr>
                    <th>
                        <p class="name rm">
                            <em class="red">*</em>设备类型：
<input type="hidden" id="Id" />
                        </p>
                    </th>
                    <td>
                        <div class="selectbox">
                            <select id="DeviceTypeId" onchange="device.deviceTypeChange(this)" error="请选择设备！" validate="isnull">
								<option value="">选择设备</option>
							</select>
                        </div>
                    </td>
<th>
                        <p class="name rm">
                            <em class="red">*</em>生产厂家：
                        </p>
                    </th>
                    <td>
                        <div class="inputbox">
                            <input type="text" name="Manufacturer" id="Manufacturer" error="输入格式不正确！" validate="isnull|username" maxlength="20" value="" />
                        </div>
                    </td>
                </tr>
                <tr>
                 	<th>
                        <p class="name rm">
                            <em class="red">*</em>型号：
                        </p>
                    </th>
                    <td>
                        <div class="inputbox">
                            <input type="text" name="Model" id="Model" error="输入格式不正确！" validate="isnull" maxlength="20" value="" />
                        </div>
                    </td><th>
                        <p class="name rm">
                            <em class="red">*</em>规格：
                        </p>
                    </th>
                    <td>
                        <div class="inputbox">
                            <input type="text" name="Spec" id="Spec" error="输入格式不正确！" validate="isnull" maxlength="20" value="" />
                        </div>
                    </td>
                </tr>
				<tr>
					<th>
                        <p class="name rm">
                            <em class="red">*</em>录入时间：
                        </p>
                    </th>
                    <td>
                        <div class="inputbox">
                            <input type="text" name="AddTime" id="AddTime" readonly=readonly onclick="WdatePicker({ dateFmt: 'yyyy-MM-dd'});" error="输入格式不正确！" validate="isnull"/>
                        </div>
                    </td>
				</tr>				
                <tr>
					<th>
                            <p class="name">
                                <em class="red">*</em>安装位置：
                            </p>
                        </th>
                        <td colspan="3">
							<div class="selectbox">
                                <select id="Buildings" name="Buildings" validate="isnull" error="输入格式不正确！">
									<option value="">栋数</option>
                                    <option value='1'>1</option>
 									<option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                </select>
                            </div>
                            <div class="selectbox">
                                <select id="Floor" name="Floor" validate="isnull" error="输入格式不正确！">
                                 <option value="">楼层</option>
                                </select>
                            </div>
 							<div class="selectbox">
                                <select id="Position" name="Position" validate="isnull" error="输入格式不正确！">
                                  <option value="">方位</option>
                                </select>
                            </div>
							<div class="selectbox">
                                <select id="Passageway" name="Passageway" validate="isnull" error="输入格式不正确！" >
                                 <option value="">通道</option>
                                </select>
                            </div>
  							<div class="inputbox">
                            <input type="text" name="Detail" id="Detail" error="输入格式不正确！" placeholder="详细位置" validate="isnull|username" maxlength="20" value="" />
                        </div>
                </td>
                </tr>
				
            </tbody>
        </table>
    </div>
</div>
                            <div class="btn-group">
                                <button type="button" onclick="device.addDevice()" class="btn yes-btn" id="iforget1">保存</button>
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
    
</body>
<jsp:include  page="template/device.html"></jsp:include>
<script type="text/javascript">
	$(function() {
		device.deviceFinish();
	});
</script>
</html>