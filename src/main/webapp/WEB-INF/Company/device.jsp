
<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page import="fire.common.entity.DeviceTypeResult"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="block/Meta-2.html"></jsp:include>
<link type="text/css" rel="stylesheet"
	href="/fireh5/Static/Js/Calendar/skin/WdatePicker.css" />
<script type="text/javascript"
	src="/fireh5/Static/Js/Calendar/WdatePicker.js">
</script>
<script type="text/javascript" src="/fireh5/Static/Js/Wechat.js?v=1.2.10"></script>
<script type="text/javascript" src="/fireh5/Static/Js/jweixin-1.2.0.js"></script>
</head>
<body>
	<!--框架-->
	<section class="ui-wrap"> 

	<!--体部--> 
	<article class="ui-page"  style="top:2px">
	<!--内盒-->
	<div class="ui-content iscroll-wrapper">
		<!--个人信息-->
		<div class="usercenter-info" id="DeviceForm">
		
			<!--详细信息-->
			<div class="user-area edit" id="firstStep" edit-area>
				<ul>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>设备类型：</p>

						<div class="edit-box box1 scan">
							<div class="selectarea">
								<div class="selectbox">
									<select id="DeviceTypeId" onchange="device.deviceTypeChange(this)" error="请选择设备"
										validate="isnull">
										<option value="-1">请选择</option>
									</select>
								</div>
							</div>
							<a href="javascript:void(0);" class="search-btn" id="btnScanCode">扫码</a>
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>生产厂家：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="Manufacturer" id="Manufacturer"
									error="输入格式不正确！" placeholder="请输入生产厂家" validate="isnull|username" maxlength="20"
									value="" />
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>设备型号：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="Model" id="Model" error="输入格式不正确！"
									validate="isnull" placeholder="请输入设备型号" maxlength="20" value="" />
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>设备规格：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="Spec" id="Spec" error="输入格式不正确！"
									validate="isnull" placeholder="请输入设备规格" maxlength="20" value="" />
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>年检时间：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="RenewalDate" id="RenewalDate" readonly=readonly
									onclick="WdatePicker({ dateFmt: 'yyyy-MM-dd'});"
									error="输入格式不正确！" validate="isnull" placeholder="请选择录入年检时间"/>
							</div>
						</div>
					</li>
					<!--<li class="box box-horizontal">
                                <p class="name">性别：</p>
                                <div class="text box1">女</div>
                                <div class="edit-box box1">
                                    <input type="radio" value="1" name="Sex" id="SexMale">
                                    <label>男性</label>

                                    <input type="radio" value="2" name="Sex" id="SexFemale">
                                    <label>女性</label>
                                    <input type="radio" value="0" name="Sex" id="SexSecret">
                                    <label>保密</label>
                                </div>
                            </li>-->
				</ul>
				<ul>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>安装位置：</p>
						<div class="edit-box box1">
							<div class="selectarea">
								<div class="selectbox">
									<select id="Buildings" name="Buildings" validate="isnull"
										error="输入格式不正确！">
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

								<span class="tips">栋</span>

								<div class="selectbox">
									<select id="Floor" name="Floor" validate="isnull"
										error="输入格式不正确！">
										<option value="">楼层</option>
									</select>
								</div>

								<span class="tips">楼</span>

								<div class="selectbox">
									<select id="Position" name="Position" validate="isnull"
										error="输入格式不正确！">
										<option value="">方位</option>
									</select>
								</div>

								
								<div class="selectbox">
									<select id="Passageway" name="Passageway" validate="isnull"
										error="输入格式不正确！">
										<option value="">通道</option>
									</select>
								</div>

								<span class="tips"></span>
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name"><em class="red">*</em>详细地址：</p>

						<div class="edit-box box1">
							<div class="textareabox">
								<textarea name="Detail" id="Detail" rows="1" cols=""></textarea>
							</div>
						</div>
					</li>
				</ul>
				<div class="button box box-horizontal" style="display:" id="btnEdit">
					<a href="javascript:void(0);" class="btn box1 seccess" onclick="device.stepTrigger()">下一步</a>
					
				</div>
			</div>
			<!--//详细信息-->
			<!--详细信息-->
			<div class="user-area edit" id="secondStep" style="display:none" edit-area>

				<ul id="parameterList">

				</ul>
				<div class="button box box-horizontal"  >
					<a href="javascript:void(0);" class="btn box1 seccess" onclick="device.save('<%=request.getParameter("Id")%>')">保存</a>
					<a href="javascript:void(0);" class="btn box1 cancel"
						onclick="device.stepTrigger()">上一步</a>
						<a href="#" style="display:none" id="btnScanCode">aa</a>
				</div>
			</div>
			<!--//详细信息-->


		</div>
		<!--//个人信息-->
	</div>
	<!--//内盒--> </article> <!--//体部--> </section>
	<!--//框架-->
	<jsp:include page="template/device.html"></jsp:include>
</body>
</html>

<script type="text/javascript">
    $(function () {
    	device.initControll();
    	var iswx = '<%=WechatUtils.IsWxBrowser()%>';
    	var arr=[];
    	$("#parameterList #btnWxImage").each(function(){
    		arr.push(this);
    	});
    	if(iswx == 'true'){
    		ecwx.init({
    			isWx : (iswx == 'true'),
    			actions : [{
    				action : 'scan',
    				btn : '#btnScanCode',
    				fn : function(r) {
    					device.getQR(r);
    				}
    			},
    			{
    				action : 'image',
    				btn : arr,
    				fn :null
    			} ]
    		});
    		//document.getElementById("btnScanCode").click();
    	}
    });
</script>

	<script type="text/javascript" language="javascript" charset="utf-8">
	 //iScroll刷新
    if ($.iscroll) {
        $.iscroll.refresh();
    }
	 

  </script>