<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<jsp:include page="block/Meta.html"></jsp:include>
 <script type="text/javascript" src="/Static/Js/Wechat.js?v=1.2.10"></script>
</head>
<body>
 <!--框架-->
    <section class="ui-wrap">
        <!-- 头部 -->
        <$include templateName="Block/Head.html" />
        <!-- //头部 -->
        <!--体部-->
        <article class="ui-page">
            <!--内盒-->
            <div class="scroll iscroll-wrapper">
                <!--收款收银台-->
                <div class="receipt-cashier">
                    <div class="login-input-box">
                        <ul id="ReceiveCash">
                            <li class="box box-horizontal scan">
                                <p class="name">设备编号：</p>
                                <div class="inputbox box1">
                                    <input type="hidden" value="0" name="PayFKId" id="PayFKId" />
                                    <input type="hidden" value="0" name="PayFKFlag" id="PayFKFlag" />
                                    <input type="text" name="UserName" id="UserName" value="" error="请输入设备编号" validate="isnull" placeholder="请扫码或输入会员名"
                                           onchange="receiveCash.searchUser();" />
                                </div>
                                <a href="javascript:void(0);" class="search-btn" id="btnUserScanCode">扫码</a>
                            </li>
                            <li class="box box-horizontal">
                                <p class="name">设备类型：</p>
                                <div class="inputbox box1">
                                    <input type="text" name="Amount" maxlenth="9" id="Amount" value="" onchange="receiveCash.inputAmount(this);" validate="isnull|decimal6" error="请输入收款金额(大于0)！" placeholder="请输入收款金额" receipt-money />
                                </div>
                            </li>
                            <li class="box box-horizontal">
                                <p class="name">设备位置：</p>
                                <div class="inputbox box1">
                                    <input type="text" name="Integral" id="Integral" value="0" validate="decimal7" error="请输入赠送积分(>=0)！" placeholder="请输入赠送积分" />
                                </div>
                            </li>
                            <li class="box box-horizontal scan">
                                <p class="name">检查描述：</p>
                                <div class="inputbox box1">
                                    <input type="text" name="TicketNumber" id="TicketNumber" value="" error="请输入票号！" placeholder="请输入票号" />
                                </div>
                                <a href="javascript:void(0);" class="search-btn" id="btnScanCode">扫码</a>
                            </li>
                            <li class="box box-horizontal aptitude-info">
                                <p class="name">检查凭证：</p>
                                <div class="aptitude box1">
                                    <input type="hidden" id="Ticket" name="Ticket" value="" />
                                    <ol id="logo-pic">
                                        <li class="update" id="btnWxImage">
                                            <a class="update-btn" href="javascript:void(0);"></a>
                                        </li>
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
            <!--//内盒-->
        </article>
        <!--//体部-->
    </section>
    <!--//框架-->
</body>
</html>



<script type="text/javascript">
    var settings = {
        ps: null,
        codeType: 0,
    };
    var initConfig = {
        wechat: function () {
            var iswx = '<$var sources.IsWxBrowser/>', isApp = '<$var sources.IsApp/>', fkFlag = '<$var sources.FKFlag/>';
            ecwx.init(
               {
                   isWx: (iswx == 'True'),
                   isApp: (isApp == 'True'),
                   useFkflag: 1,
                   actions: [
                       { action: 'image', btn: '#btnWxImage', maxCount: 3, fn: null },
                       { action: 'scan', btn: ['#btnScanCode', '#btnUserScanCode'], fn: function (r) { onScanComplete(r); } }
                   ]
               });

            //ecwx.init((iswx == 'True'), (isApp == 'True'),1, {
            //    actions: "image,scan", image: { btn: '#btnWxImage', maxCount: 3, fn: null }, scan: {
            //        btn: ['#btnScanCode', '#btnUserScanCode'], fn: function (r) {
            //            onScanComplete(r);
            //        }
            //    }
            //});
        }
    };

    $e(function () {
        initConfig.wechat();
    });
    
    function onScanComplete(result) {
        //app那边直接返回的字符串
        var arr = result.split('|');
        if (arr.length > 1) {
            $e("#PayFKFlag").value(arr[0]);
            $e("#PayFKId").value(arr[1]);
            $e("#UserName").value(arr[2]);
        } else {
            $e("#TicketNumber").value(result);
        }
    }
    function onAppImageComplete(imgUrl) {
        if (imgUrl == undefined || imgUrl == '') {
            pub.error("很抱歉，获取图片信息失败，请稍后重试...");
        } else {
            var html = jte(ecwx.imgTemplate, { url: imgUrl });
            var c = $e("#logo-pic");
            if (c.length > 3) {
                pub.alert("最多上传{0}张图片".format(3));
            } else {
                c.append(html);
            }
        }
    };

    //保存收款信息
    function save(obj) {
        try {
            if (ecwx.sync && typeof (ecwx.sync) == 'function') {
                ecwx.sync(function (result, url) {
                    if (url.length > 0)
                        $e("#Ticket").value(url);
                    receiveCash.addReceiveCash(obj);
                });
            } else {
                receiveCash.addReceiveCash(obj);
            }
            //if (settings.ps) {
            //    settings.ps.sync(function (result, url) {
            //        receiveCash.addReceiveCash(obj);
            //    });
            //} else {
            //    receiveCash.addReceiveCash(obj);
            //}
        } catch (e) {
            alert("保存：" + e.message);
        }
    }
</script>