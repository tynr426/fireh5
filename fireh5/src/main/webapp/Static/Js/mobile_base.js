/**
 * 移动商定位数据获取和处理
 * @type {Object}
 */
document.write("<script src='http://webapi.amap.com/maps?v=1.3&key=f57fc85695e18249d04ac656bd548dc4' type='text/javascript'></script>");
var opts = {}; //因安卓客户端缘故，提到local外部来  2017-03-06
var local = {
    /**
	 * 获取当前定位
	 * @return {[type]} [description]
	 */
    getPos: function (back, error) {
        if (typeof (back) == "object") {
            opts = back;
        } else {
            opts.callback = back;
            opts.error = error;
        }

        if (window.JsInterface && typeof (window.JsInterface.JsStartLocationFunction) == "function") { /*判断是否为封装app*/

            //window.JsInterface.JsStartLocationFunction("onComplete", "onError");
            window.JsInterface.JsStartLocationFunction("onComplete");

        } else {
            //$e.getScript("http://webapi.amap.com/maps?v=1.3&key=f57fc85695e18249d04ac656bd548dc4", function() {  此处引用会存在延迟，导致AMap对象加载不完整，调用出错，修改至顶部引用  李勇明 2017-03-02
            var map, geolocation;
            /*加载地图，调用浏览器定位服务*/
            map = new AMap.Map('', {
                resizeEnable: true
            });
            map.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    /* 是否使用高精度定位，默认:true */
                    timeout: 10000,
                    /*超过10秒后停止定位，默认：无穷大*/
                    buttonOffset: new AMap.Pixel(10, 20),
                    /*定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)*/
                    zoomToAccuracy: true,
                    /*定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false*/
                    buttonPosition: 'RB'
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onMapComplete); /*返回定位信息*/
                AMap.event.addListener(geolocation, 'error', onError); /*返回定位出错信息*/
            });

            /*解析定位结果*/
            function onMapComplete(data) {
                lngs = data.position.getLng();
                lats = data.position.getLat();
                var loc = {};
                loc.lng = lngs;
                loc.lat = lats;

                if (typeof (opts.callback) == "function") {
                    opts.callback.apply(this, [loc]);
                }

            };

            //}, true);
        }       
    },

    getAddress: function (lnglatXY,valObj) {        
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            var address = "";
            geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                   address= geocoder_CallBack(result);
                }
                console.log(address);
                $e(valObj).value(address);
            });
           
       
        function geocoder_CallBack(data) {
            var address = data.regeocode.formattedAddress; //返回地址描述
            //document.getElementById("result").innerHTML = address;
            return address;
        }
    }
}

//因为安卓客户端调用不了内部方法，故提出来  2017-03-06  李勇明
function onComplete(lng, lat) {
    var loc = {};
    loc.lng = lng;
    loc.lat = lat;

    if (typeof (opts.callback) == "function") {
        opts.callback.apply(this, [loc]);
    }
}

//解析定位错误信息
function onError(data) {
    if (typeof (opts.error) == "function") {
        opts.error.apply(this, ["获取定位信息失败", data]);
    }
};