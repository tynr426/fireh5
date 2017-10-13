
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

</head>
<body>
	<!--框架-->
	<section class="ui-wrap"> <!--体部--> <article class="ui-page">
	<!--内盒-->
	<div class="ui-content iscroll-wrapper">
		<!--个人信息-->
		<div class="usercenter-info" id="Profile">
			<!--用户基本信息-->
			<div class="user-info box box-horizontal">
				<!--用户头像-->
				<div class="pic load">
					<a href="javascript:void(0);"> <img
						lazy_src="<$var sources.ImageDomain/><$var user.face>isNull:</$var>"
						alt="" error="~/Images/user-pic.png" />
					</a>
				</div>
				<!--//用户头像-->
				<!--用户信息-->
				<div class="info box1">
					<p class="name">
						公司名称：<em> </em>
					</p>
				</div>
				<!--//用户信息-->
				<!--信息编辑-->
				<div class="edit">
					<a href="javascript:void(0);" class="btn" edit='on'
						onclick="editUserInfo(this);"></a>
				</div>
				<!--//信息编辑-->
			</div>
			<!--//用户基本信息-->
			<!--详细信息-->
			<div class="user-area edit" id="firstStep" edit-area>
				<ul>
					<li class="box box-horizontal">
						<p class="name">设备类型：</p>

						<div class="edit-box box1">
							<div class="selectarea">
								<div class="selectbox">
									<select id="DeviceTypeId" onchange="device.deviceTypeChange(this)" error="请选择设备"
										validate="isnull">
										<option value="-1">请选择</option>
									</select>
								</div>
							</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">生产厂家：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="Manufacturer" id="Manufacturer"
									error="输入格式不正确！" validate="isnull|username" maxlength="20"
									value="" />
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">型号：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="Model" id="Model" error="输入格式不正确！"
									validate="isnull" maxlength="20" value="" />
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">规格：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="Spec" id="Spec" error="输入格式不正确！"
									validate="isnull" maxlength="20" value="" />
							</div>
						</div>
					</li>
					<li class="box box-horizontal">
						<p class="name">录入时间：</p>

						<div class="edit-box box1">
							<div class="inputbox">
								<input type="text" name="AddTime" id="AddTime" readonly=readonly
									onclick="WdatePicker({ dateFmt: 'yyyy-MM-dd'});"
									error="输入格式不正确！" validate="isnull" />
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
						<p class="name">安装位置：</p>
						<div class="text box1"><$var userinfo.Province/> <$var
							userinfo.City /> <$var userinfo.Area /></div>
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

								<span class="tips">方位</span>
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
						<p class="name">详细地址：</p>

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
					<a href="javascript:void(0);" class="btn box1 seccess" onclick="">保存</a>
					<a href="javascript:void(0);" class="btn box1 cancel"
						onclick="device.stepTrigger()">上一步</a>
				</div>
			</div>
			<!--//详细信息-->


		</div>
		<!--//个人信息-->
	</div>
	<!--//内盒--> </article> <!--//体部--> </section>
	<!--//框架-->
</body>
</html>

<script type="text/javascript">
    $(function () {
    	device.initControll();
    });
</script>
<body>
	<script type="text/javascript" language="javascript" charset="utf-8">
	 //iScroll刷新
    if ($.iscroll) {
        $.iscroll.refresh();
    }
  </script>