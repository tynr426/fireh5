//框架初始化
var resetSize = function () {
    var mainer = $e('.ui-wrap'),
    	header = $e('.custom-head'),
        footer = $e('.custom-foot'),
        exfooter = $e('.extend-foot'),
        bodyer = $e('.ui-page'),
        top = 0,
        bootom = 0,
        style = '',
        height = 0;

    //外包围
    if (mainer.length <= 0) {
        console.error('请编写标准框架');
        //mainer.remove();
        //header.remove();
        //bodyer.remove();
        //footer.remove();
        return;
    }

    // header存在
    if (header.length > 0) {
        style += (style === '' ? '' : ';') + 'top: ' + header[0].offsetHeight + 'px';
        height = height + header[0].offsetHeight;
    } else {
        style += (style === '' ? '' : ';') + 'top: 0';
    }

    // footer存在
    if (footer.length > 0 && exfooter.length > 0) {
        style += (style === '' ? '' : ';') + 'bottom: ' + Number(footer[0].offsetHeight + exfooter[0].offsetHeight) + 'px;';
        height = height + Number(footer[0].offsetHeight + exfooter[0].offsetHeight);
    } else if (footer.length > 0 && exfooter.length <= 0) {
        style += (style === '' ? '' : ';') + 'bottom: ' + footer[0].offsetHeight + 'px;';
        height = height + footer[0].offsetHeight;
    } else if (footer.length <= 0 && exfooter.length > 0) {
        style += (style === '' ? '' : ';') + 'bottom: ' + exfooter[0].offsetHeight + 'px;';
        height = height + exfooter[0].offsetHeight;
    } else {
        style += (style === '' ? '' : ';') + 'bottom: 0;';
    }

    // 样式不空
    if (style !== '') {
        style += (style === '' ? '' : '') + 'height: ' + Number($e(window).height() - height) + 'px;';

        bodyer.attr("style", style);
    }

    //自定义单选复选
    if (typeof $e().customCheck === 'function') {
        $e(document).customCheck();
    }

    //延迟加载
    if (typeof $e.lazy === 'function') {
        $e.lazy({
            deBug: true,
            throuTop: 200,
            errorImg: '/Static/Images/error.png'
        });
    }

    //去掉页面加载等待
    var loading = $e('.loading');
    if (loading.length > 0) {
        loading.remove();
    }

    //iScroll刷新
    if ($e.iscroll) {
        $e.iscroll.refresh();
    }
};

$e(function () {
    resetSize();
    $e('body').click(function (e) {
        if (e.target.nodeName != "INPUT") {
            $e('input').blur();
        };
    });
});