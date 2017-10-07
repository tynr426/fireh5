var WeiXinCommon2 = ({
    //配置
    WeiXinConfig: function () {
        $e.ajax({
            async: false,
            url: '/Wechat.axd',
            dataType: "xml",
            data: "<action>signature</action><url>" + location.href + "</url>",
            success: function () {
                var json = ECF.parseJSON(arguments[1].text);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: json.appId, // 必填，公众号的唯一标识
                    timestamp: json.timestamp, // 必填，生成签名的时间戳
                    nonceStr: json.nonceStr, // 必填，生成签名的随机串
                    signature: json.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'startRecord',
                        'stopRecord',
                        'onVoiceRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'onVoicePlayEnd',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'translateVoice',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

            }
        });
    },
    //分享给朋友
    ShareToFriend: function (title, desc, link, imgUrl, successFn, cancelFn, failFn) {
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                if (typeof (successFn) == "function") {
                    successFn();
                }
            },
            cancel: function (res) {
                if (typeof (cancelFn) == "function") {
                    cancelFn();
                }
            },
            fail: function (res) {
                if (typeof (failFn) == "function") {
                    failFn();
                }
            }
        });
    },
    //分享至朋友圈
    ShareToTimeLine: function (title, link, imgUrl, successFn, cancelFn, failFn) {
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                if (typeof (successFn) == "function") {
                    successFn();
                }
            },
            cancel: function (res) {
                if (typeof (cancelFn) == "function") {
                    cancelFn();
                }
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
                if (typeof (failFn) == "function") {
                    failFn();
                }
            }
        });
    },
    //分享至QQ
    ShareToQQ: function (title, desc, link, imgUrl, completeFn, successFn, cancelFn, failFn) {
        wx.onMenuShareQQ({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            trigger: function (res) {
                alert('用户点击分享到QQ');
            },
            complete: function (res) {
                if (typeof (completeFn) == "function") {
                    completeFn();
                }
            },
            success: function (res) {
                if (typeof (successFn) == "function") {
                    successFn();
                }
            },
            cancel: function (res) {
                if (typeof (cancelFn) == "function") {
                    cancelFn();
                }
            },
            fail: function (res) {
                if (typeof (failFn) == "function") {
                    failFn();
                }
            }
        });
    },
    //分享至微博
    ShareToWeiBo: function (title, desc, link, imgUrl, completeFn, successFn, cancelFn, failFn) {
        wx.onMenuShareWeibo({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            trigger: function (res) {
                alert('用户点击分享到微博');
            },
            complete: function (res) {
                if (typeof (completeFn) == "function") {
                    completeFn();
                }
            },
            success: function (res) {
                if (typeof (successFn) == "function") {
                    successFn();
                }
            },
            cancel: function (res) {
                if (typeof (cancelFn) == "function") {
                    cancelFn();
                }
            },
            fail: function (res) {
                if (typeof (failFn) == "function") {
                    failFn();
                }
            }
        });
    },
    //隐藏菜单
    HideOptionMenu: function () {
        wx.hideOptionMenu();
    },
    //显示菜单
    ShowOptionMenu: function () {
        wx.showOptionMenu();
    },
    //批量隐藏菜单项
    HideMenuItems: function (menuList) {
        wx.hideMenuItems({
            menuList: menuList,
            //[
            //  'menuItem:readMode', // 阅读模式
            //  'menuItem:share:timeline', // 分享到朋友圈
            //  'menuItem:copyUrl' // 复制链接
            //],
            success: function (res) {
                //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    },
    //批量显示菜单项
    ShowMenuItems: function (menuList) {
        wx.showMenuItems({
            menuList: menuList,
            //[
            //  'menuItem:readMode', // 阅读模式
            //  'menuItem:share:timeline', // 分享到朋友圈
            //  'menuItem:copyUrl', // 复制链接
            //  'menuItem:profile', // 查看公众号（已添加）
            //  'menuItem:addContact' // 查看公众号（未添加）
            //],
            success: function (res) {
                //alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
            },
            fail: function (res) {
                //alert(JSON.stringify(res));
            }
        });
    },
    //隐藏所有非基本菜单项
    HideAllNonBaseMenuItems: function () {
        wx.hideAllNonBaseMenuItem({
            success: function () {
                alert('已隐藏所有非基本菜单项');
            }
        });
    },
    //显示所有被隐藏的非基本菜单项
    ShowAllNonBaseMenuItems: function () {
        wx.showAllNonBaseMenuItem({
            success: function () {
                alert('已显示所有非基本菜单项');
            }
        });
    },
    //关闭当前窗口
    CloseWindow: function () {
        wx.closeWindow();
    }
});

function openLocation(longitude, latitude, name, address) {
    wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        name: name,
        address: address
    });
}
