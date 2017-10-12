<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="block/Meta-2.html" ></jsp:include>
</head>
<body>
<!--框架-->
    <section class="ui-wrap">
        <!--体部-->
        <article class="ui-page">
            <!--内盒-->
            <div class="ui-content iscroll-wrapper">
                <!--个人信息-->
                <div class="usercenter-info" id="Profile">
                    <!--用户基本信息-->
                    <div class="user-info box box-horizontal">
                        <!--用户头像-->
                        <div class="pic load">
                            <a href="javascript:void(0);">
                                <img lazy_src="<$var sources.ImageDomain/><$var user.face>isNull:</$var>" alt="" error="~/Images/user-pic.png" />
                            </a>
                        </div>
                        <!--//用户头像-->
                        <!--用户信息-->
                        <div class="info box1">
                            <p class="name">会员名1：<em>                                
                                           <$var userinfo.NickName>Ifnull:</$var>     
                                </em></p>
                            <p class="time">注册时间：<em><$var userinfo.regdate>IfNull:</$var></em></p>
                        </div>
                        <!--//用户信息-->
                        <!--信息编辑-->
                        <div class="edit">
                            <a href="javascript:void(0);" class="btn" edit='off' onclick="editUserInfo(this);"></a>
                        </div>
                        <!--//信息编辑-->
                    </div>
                    <!--//用户基本信息-->
                    <!--详细信息-->
                    <div class="user-area" edit-area>
                        <ul>
                            <li class="box box-horizontal">
                                <p class="name">昵称：</p>
                               
                                <div class="edit-box box1">
                                    <div class="inputbox">
                                        <input type="text" value="" name="" id="" placeholder="粉红猪" validate="">
                                    </div>
                                </div>
                            </li>
                            
                            <li class="box box-horizontal">
                                <p class="name">生日：</p>
                               
                                <div class="edit-box box1">
                                    <div class="selectarea">
                                        <div class="selectbox">
                                            <select name="BirthYear" id="BirthYear" onchange="user.loadBirth();" validate="isnull" error="请选择生日年份">
                                                <option value="-1" selected="selected">年份</option>
                                            </select>
                                        </div>

                                        <span class="tips">年</span>

                                        <div class="selectbox">
                                            <select name="BirthMonth" id="BirthMonth" onchange="user.loadBirthDay(this)" validate="isnull" error="请选择生日月份">
                                                <option value="-1" selected="selected">月份</option>
                                            </select>
                                        </div>

                                        <span class="tips">月</span>

                                        <div class="selectbox">
                                            <select name="BirthDay" id="BirthDay" validate="isnull" error="请选择生日日期">
                                                <option value="-1" selected="selected">日期</option>
                                            </select>
                                        </div>

                                        <span class="tips">日</span>
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
                            <li class="box box-horizontal">
                                <p class="name">手机：</p>
                                <div class="text box1"><$var userinfo.mobile /></div>
                                <div class="edit-box box1">
                                    <div class="inputbox">
                                        <input type="text" value="<$var userinfo.mobile></$var>" name="Mobile" id="Mobile" placeholder="" validate="isnull|mobile" error="请输入手机">
                                    </div>
                                </div>
                            </li>
                            <li class="box box-horizontal">
                                <p class="name">邮箱：</p>
                                <div class="text box1"><$var userinfo.email /></div>
                                <div class="edit-box box1">
                                    <div class="inputbox">
                                        <input type="text" value="<$var userinfo.email></$var>" name="Email" id="Email" placeholder="" validate="email">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--//详细信息-->
                    <!--详细信息-->
                    <div class="user-area" edit-area>
                        <ul>
                            <li class="box box-horizontal">
                                <p class="name">区域：</p>
                                <div class="text box1"><$var userinfo.Province/> <$var userinfo.City /> <$var userinfo.Area /></div>
                                <div class="edit-box box1">
                                    <div class="selectarea">
                                        <div class="selectbox">
                                            <select id="Province" onchange="area.loadArea(this,'City');" error="请输入省" validate="isnull">
                                                <option value="-1">请选择</option>
                                            </select>
                                        </div>

                                        <span class="tips">省</span>

                                        <div class="selectbox">
                                            <select id="City" onchange="area.loadArea(this,'Area');" error="请输入市" validate="isnull">
                                                <option value="-1">请选择</option>
                                            </select>
                                        </div>

                                        <span class="tips">市</span>

                                        <div class="selectbox">
                                            <select id="Area" error="请输入区/县" validate="isnull">
                                                <option value="-1">请选择</option>
                                            </select>
                                        </div>

                                        <span class="tips">区/县</span>
                                    </div>
                                </div>
                            </li>
                            <li class="box box-horizontal">
                                <p class="name">详细地址：</p>
                                <div class="text box1">
                                    <$var userinfo.address />
                                </div>
                                <div class="edit-box box1">
                                    <div class="textareabox">
                                        <textarea name="Address" id="Address" rows="1" cols=""><$var userinfo.address></$var></textarea>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--//详细信息-->

                    <div class="button box box-horizontal" style="display:none" id="btnEdit">
                        <a href="javascript:void(0);" class="btn box1 seccess" onclick="user.editUserExtension();">确定修改</a>
                        <a href="javascript:void(0);" class="btn box1 cancel" onclick="cancel()">取消</a>
                    </div>
                </div>
                <!--//个人信息-->
            </div>
            <!--//内盒-->
        </article>
        <!--//体部-->
    </section>
    <!--//框架-->
</body>
</html>

<script type="text/javascript">
    $(function () {
        var json = $.parseJSON('<$var UserInfoJson/>');
        user.showProfile(json[0]);
    });
</script>
<body>
<script type="text/javascript" language="javascript" charset="utf-8">
    //编辑
    var editUserInfo = function (obj) {
        if (!obj.hasAttribute('edit')) { return; }

        var edit_panel = $('*[edit-area]');

        if (edit_panel.length <= 0) { return; }

        var i = 0;

        if (obj.getAttribute('edit') === 'off') {
            obj.setAttribute('edit', 'on');
            $("#btnEdit").show();
        } else {
            obj.setAttribute('edit', 'off');
            $("#btnEdit").hide();
        }

        if (obj.getAttribute('edit') === 'off') {
            for (; i < edit_panel.length; i++) {
                $(edit_panel[i]).removeClass('edit');
            }
        } else {
            for (; i < edit_panel.length; i++) {
                $(edit_panel[i]).addClass('edit');
            }
        }

        //iScroll刷新
        if ($.iscroll) {
            $.iscroll.refresh();
        }

        //自定义单选复选
        if (typeof $().customCheck === 'function') {
            $(document).customCheck();
        }
    };
    var cancel = function () {
        console.log($("a[edit='on']"));
        editUserInfo($("a[edit='on']")[0]);
    }
</script>
  