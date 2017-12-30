<%@page import="fire.sdk.utils.WechatUtils"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${title}</title>
<jsp:include page="block/Meta.html"></jsp:include>
<script type="text/javascript" src="/fireh5/Static/Js/Wechat.js?v=1.2.10"></script>
<script type="text/javascript" src="/fireh5/Static/Js/jweixin-1.2.0.js"></script>

</head>
<body>
 <!--框架-->
    <section class="ui-wrap">
        <!-- 引入页面顶部 -->
        <$include templatename="Block/Head.html" />
        <!-- //引入页面顶部 -->
        <!--体部-->
        <article class="ui-page">
            <!-- 内盒 -->
            <div class="ui-content iscroll-wrapper">
                <!-- 返修退换货详情 -->
                <div class="retreat-details" id="DetailBox">

                </div>
                <!-- 返修退换货详情 -->
            </div>
            <!-- //内盒 -->
        </article>
        <!--//体部-->
        <!-- 底部 -->
        <div class="custom-foot" id="OptBox" style="display:none">
            <!-- 订单详情底部 -->
            <!--<div class="orderinfo-foot">-->
                <!--<a href="javascript:void(0);" class="btn gray">取消申请</a>-->
                <!--<a href="javascript:void(0);" class="btn">填写物流信息发货</a>
                <a href="javascript:void(0);" class="btn">确认收货</a>-->
            <!--</div>-->
            <!-- //订单详情底部 -->
        </div>
        <!-- //底部 -->
    </section>
    <!--//框架-->
    <!-- 弹出层 -->
    <!-- 返修退换货批次号选择弹出层 -->
    <div class="alert-box" style="display:none;">
        <p class="title">选择批次号</p>
        <div class="pop-batch">
            <div class="batch-name box box-horizontal">
                <div class="batch-num box1">批次号</div>
                <div class="num">数 量</div>
                <div class="stock">库 存</div>
            </div>
            <div class="batch-list">
                <ul>
                    <li class="box box-horizontal">
                        <div class="batch-num box1">20161221</div>
                        <div class="buy-num">
                            <a href="javascript:void(0);" class="btn down"></a>
                            <div class="inputbox">
                                <input type="text" name="" value="" id="" />
                            </div>
                            <a href="javascript:void(0);" class="btn up"></a>
                        </div>
                        <div class="stock">14</div>
                    </li>
                    <li class="box box-horizontal">
                        <div class="batch-num box1">20161221</div>
                        <div class="buy-num">
                            <a href="javascript:void(0);" class="btn down"></a>
                            <div class="inputbox">
                                <input type="text" name="" value="" id="" />
                            </div>
                            <a href="javascript:void(0);" class="btn up"></a>
                        </div>
                        <div class="stock">14</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //返修退换货批次号选择弹出层 -->
    <!-- //弹出层 -->
</body>
</html>
<script type="text/template" id="DetailTemplate">
    <!-- 返修退换货详情 -->
    <div class="retreat-details">
        <!-- 订单状态 -->
        <div class="status-model">
            <!-- 待付款 -->
            <div class="status-wrap obligation-wrap">
                <div class="status">${Retreat.RetreatStatus}</div>
            </div>
            <!-- //待付款 -->
        </div>
        <!-- //订单状态 -->
        <!--列表切换组件-->
        <div class="order-model order-details-lab">
            <!--列表区域-->
            <div class="list-mc" label-limitarea>
                <div class="for select" label-area>
                    <div class="line">
                        <ul class="fold-list">
                            <li>
                                <p class="name">
                                    ${Retreat.Type}单号：
                                </p>
                                <div class="string">
                                    ${Retreat.OddNumber}
                                </div>
                            </li>
                            <li>
                                <p class="name">申请时间：</p>
                                <div class="string">
                                    ${Retreat.AddTime}
                                </div>
                            </li>
                            <li>
                                <p class="name">${Retreat.Type}数量：</p>
                                <div class="string">
                                    ${Retreat.Quantity}
                                </div>
                            </li>
                            {@if Retreat.ReType == 1}
                            <li>
                                <p class="name">退款金额：</p>
                                <div class="string red">
                                    {@if Retreat.Amount>0 && Retreat.Integral>0}
                                    ¥${Retreat.Amount|formatFloat}+${Retreat.Integral}积分
                                    {@else if Retreat.Amount>0}
                                    ¥${Retreat.Amount|formatFloat}
                                    {@else if Retreat.Integral>0}
                                    ${Retreat.Integral}积分
                                    {@else}
                                    ¥0.00
                                    {@/if}
                                </div>
                            </li>
                            <li>
                                <p class="name">退款途径：</p>
                                <div class="string">
                                    {@if Retreat.RefundType == 0}
                                    退款至余额
                                    {@/if}
                                    {@if Retreat.RefundType == 1}
                                    退款至银行卡
                                    {@/if}
                                    {@if Retreat.RefundType == 3}
                                    退款至授信账户
                                    {@/if}
                                </div>
                            </li>
                            {@/if}
                            {@if Retreat.RefundType == 1 && Retreat.Amount > 0}
                            <li>
                                <p class="name">银行信息：</p>
                                <div class="string">
                                    ${Retreat.BankName}&nbsp;${Retreat.Province}${Retreat.City}
                                </div>
                            </li>
                            <li>
                                <p class="name">开户银行：</p>
                                <div class="string">
                                    ${Retreat.OpenBank}
                                </div>
                            </li>
                            <li>
                                <p class="name">开户地区：</p>
                                <div class="string">
                                    ${Retreat.Province}${Retreat.City}
                                </div>
                            </li>
                            <li>
                                <p class="name">开户人姓名：</p>
                                <div class="string">
                                    ${Retreat.AccountName}
                                </div>
                            </li>
                            <li>
                                <p class="name">开户银行账号：</p>
                                <div class="string">
                                    ${Retreat.Account}
                                </div>
                            </li>
                            {@/if}
                            <li>
                                <p class="name">${Retreat.Type}原因：</p>
                                <div class="string">
                                    ${Retreat.Reason}
                                </div>
                            </li>
                        </ul>
                        <!-- 展开按钮 -->
                        <div class="fold-btn">
                            <a href="javascript:void(0);" class="btn" onclick="var obj = $e(this); obj.parent().siblings('.fold-list').toggleClass('open'); obj.toggleClass('close'); if (obj.hasClass('close')) { obj.html('收起'); } else { obj.html('查看全部'); }">查看全部</a>
                        </div>
                        <!-- //展开按钮 -->
                    </div>
                </div>
            </div>
            <!--//列表区域-->
        </div>
        <!--//列表切换组件-->
        <!--产品信息-->
        <div class="order-model">
            <div class="mt-title">
                <input type="hidden" id="gjson" value="${_.batchsTxt}" />
                <input type="hidden" id="gdepotid" value="${_.depotId}" />
                <input type="hidden" id="gisbatch" value="${_.OpenBatchNumber}" />
                <p>商家：<em>${Retreat.to_name}</em></p>
            </div>
            {@each RetreatItem as f, index}
            <div class="mt extend-mt">
                <p>订单号：<em>${f.OddNumber}</em></p>
            </div>
            <div class="mc" name="gstr" isbatch="0" oid="${f.OrderId}" otid="${f.OrderItemId}" poid="${f.OrderId}" rid="${Retreat.Id}" rtid="${f.Id}" pid="${f.ProductId}" gid="${f.GoodsId}" gname="${f.GoodsName}" gprice="${f.Price|formatFloat}" quantity="${f.Quantity|formatFloat}" orderId="${f.OddNumber}">
                <div class="product-info">
                    <!--循环产品-->
                    <div class="product-line">
                        <!--商品-->
                        <div class="product">
                            <a href="/Store/Product/Product.aspx?pid=${f.ProductId}&sid=${f.FKId}" class="box box-horizontal">
                                <span class="pic load">
                                    <img lazy_src="<$var sources.ImageDomain />${f.DefaultPic|thumbImage,80,80}" alt="" />
                                </span>

                                <span class="info box1">
                                    <span class="name box box-horizontal">
                                        <em class="name-txt box2"> ${f.GoodsName}</em>
                                        <em class="price-txt box1">
                                            {@if f.Price>0 && (f.SalesIntegral>0 || f.DeductionIntegral > 0)}
                                            ¥${f.Price|formatFloat,<$var PriceDigits />}+${f.SalesIntegral + f.DeductionIntegral}积分
                                            {@else if f.Price>0}
                                            ¥${f.Price|formatFloat,<$var PriceDigits />}
                                            {@else if f.SalesIntegral>0 || f.DeductionIntegral > 0}
                                            ${f.SalesIntegral + f.DeductionIntegral}积分
                                            {@else}
                                            ¥0.00
                                            {@/if}
                                        </em>
                                    </span>

                                    <span class="value box box-horizontal">
                                        <em class="name-txt box3">${Retreat.Type}数量</em>
                                        <em class="num-txt box1">x${f.Quantity}</em>
                                    </span>
                                </span>
                            </a>
                            <!--{@if Retreat.Type == '换货' && Retreat.Status == 30}
                            <div class="batch box box-horizontal">
                                <div class="detail box1">
                                    <div class="batch-btn">
                                        <a href="javascript:void(0);" onclick="pub.tips('请到PC端更换产品信息！');" class="btn">更换产品</a>
                                    </div>
                                </div>
                            </div>
                            {@/if}-->
                            {@if f.BarterGoodsId > 0}
                            <a href="/Store/Product/Product.aspx?pid=${f.BarterProductId}&sid=${f.FKId}" class="box box-horizontal">
                                <span class="pic load">
                                    <img lazy_src="<$var sources.ImageDomain />${f.BarterDefaultPic|thumbImage,80,80}" alt="" />
                                </span>
                                <span class="info box1">
                                    <span class="name box box-horizontal">
                                        <em class="name-txt box2"> ${f.BarterGoodsName}</em>
                                        <em class="price-txt box1">
                                        </em>
                                    </span>
                                    <span class="value box box-horizontal">
                                        <em class="name-txt box3">${Retreat.Type}数量</em>
                                        <em class="num-txt box1">x${f.Quantity}</em>
                                    </span>
                                </span>
                            </a>
                            {@/if}
                            <!--{@if !_.OpenBatchNumber}-->
                            <!--<input type="hidden" style="width:100%;" gid="${f.GoodsId}" rtid="${f.Id}" stock="${f.Stock}" id="sendgoods_${f.Id}_${f.GoodsId}" name="sendgoods_${f.Id}_${f.GoodsId}" value="${f.Quantity}" validate="isnull">-->
                            <!--{@/if}-->
                            <!-- 商品批次 -->
                            <!--{@if _.OpenBatchNumber&&(Retreat.Status > 10)}
                            <div class="batch box box-horizontal">
                                <div class="title">退货批次：</div>
                                <div class="detail box1">
                                    <ul>
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">20161015</div>
                                            <div class="num">x1</div>
                                        </li>
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">20161016</div>
                                            <div class="num">x2</div>
                                        </li>
                                    </ul>
                                    <div class="batch-btn">
                                        <a href="javascript:void(0);" class="btn">选择批次号</a>
                                    </div>
                                </div>
                            </div>
                            {@/if}-->
                            <!-- 商品批次 -->
                            {@if _.OpenBatchNumber}
                            <!-- 商品批次 -->
                            <div class="batch box box-horizontal">
                                <div class="title" status="${ Retreat.Status}">${Retreat.Type}批次：</div>
                                <div class="detail box1">
                                    <ul>
                                        <!-- InventoryBatch -->
                                        {@if Retreat.Status>=20}
                                        {@each _.InventoryBatch as bt,bindx}
                                        {@if bt.Flag==0&&f.Id==bt.ItemId&&f.GoodsId==bt.GoodsId}
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">[原]${bt.BatchNumber}</div>
                                            <div class="num">x${bt.Quantity|formatFloat,0}</div>
                                        </li>
                                        {@/if}
                                        {@/each}
                                        {@each _.InventoryBatch as bt,bindx}
                                        {@if bt.Flag==1&&f.Id==bt.ItemId&&f.GoodsId==bt.GoodsId}
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">[新]${bt.BatchNumber}</div>
                                            <div class="num">x${bt.Quantity|formatFloat,0}</div>
                                        </li>
                                        {@/if}
                                        {@/each}
                                        {@else if Retreat.Status == 10}
                                        {@each _.InventoryBatch as bt,bindx}
                                        {@if f.Id == bt.ItemId && f.GoodsId == bt.GoodsId}
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">${bt.BatchNumber}</div>
                                            <div class="num">x${bt.Quantity|formatFloat,0}</div>
                                        </li>
                                        {@/if}
                                        {@/each}
                                        {@/if}
                                    </ul>
                                    <!--{@if Retreat.Status == 20 || Retreat.Status == 30}-->
                                    {@if Retreat.Status == 20}
                                    <div class="batch-btn">
                                        <input hidden="hidden" tag="gstr" id="itemBatch_${f.Id}_${f.GoodsId}" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" pid="${f.ProductId}" gid="${f.GoodsId}" gname="${f.GoodsName}" gprice="${f.Price}" quantity="${f.Quantity}" sipping="0" value="" />
                                        <a href="javascript:void(0);" json="${_.Batchs|formatJson}" rtid="${f.Id}" gid="${f.GoodsId}" onclick="retreat.filterBatch(this,'${f.Id}','${f.GoodsId}','${f.Quantity}')" class="btn">选择批次号</a>
                                    </div>
                                    {@else if Retreat.Status == 40}
                                    <input hidden="hidden" tag="gstr" id="itemBatch_${f.Id}_${f.GoodsId}" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" pid="${f.ProductId}" gid="${f.GoodsId}" gname="${f.GoodsName}" gprice="${f.Price}" quantity="${f.Quantity}" sipping="0" value="${_.InventoryBatch|ParseBatchByStatus,f.Id,f.GoodsId,Retreat.Status}" />
                                    {@/if}

                                </div>
                            </div>
                            <div class="batch box box-horizontal" id="selectBatchBox">
                                <!--<div class="title">选中批次：</div>
                                <div class="detail box1">
                                    <ul>
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">20161015</div>
                                            <div class="num">x1</div>
                                        </li>
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">20161016</div>
                                            <div class="num">x2</div>
                                        </li>
                                    </ul>
                                    <div class="batch-btn">
                                        <a href="javascript:void(0);" class="btn">选择批次号</a>
                                    </div>
                                </div>-->
                            </div>
                            <!-- 商品批次 -->
                            {@else}
                            <input hidden="hidden" tag="gstr" id="itemBatch_${f.Id}_${f.GoodsId}" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" otid="${f.OrderItemId}" pid="${f.ProductId}" gid="${f.GoodsId}" gname="${f.GoodsName}" gprice="${f.Price}" quantity="${f.Quantity}" sipping="0" value="" />

                            <input type="hidden" gid="${f.GoodsId}" oid="${f.OrderId}" otid="${f.OrderItemId}" rtid="${f.Id}" stock="${f.StoreGoodsStock}" id="sendgoods_${f.Id}_${f.GoodsId}" name="sendgoods_${f.Id}_${f.GoodsId}" value="${f.Quantity}" validate="isnull" />
                            {@/if}
                        </div>
                        <!--//商品-->
                        <!--赠品-->
                        <!--<div class="gift">
                            <ul>
                                <li class="box box-horizontal">
                                    <p class="name">赠品：</p>
                                    <div class="text box1">送围巾一条，颜色随机发  X1</div>
                                </li>
                                <li class="box box-horizontal">
                                    <p class="name">赠品：</p>
                                    <div class="text box1">送价值100元代金券一张，购物满300即抵 X1</div>
                                </li>
                            </ul>
                        </div>-->
                        <!--//赠品-->
                    </div>
                    <!--//循环产品-->
                </div>

                <!--费用显示-->
                <!--<div class="line">
                    <ul>
                        <li>
                            <p class="name">运费</p>
                            <div class="string">
                                ¥12.00
                            </div>
                        </li>
                        <li>
                            <p class="name">订单优惠</p>
                            <div class="string green">
                                ¥0.00
                            </div>
                        </li>
                        <li>
                            <p class="name">订单总价</p>
                            <div class="string bold red">
                                ¥120.00
                            </div>
                        </li>
                    </ul>
                </div>-->
                <!--//费用显示-->
            </div>
            {@/each}
        </div>
        <!--//产品信息-->
        <!--收件人信息-->
        <div class="extend-model">
            {@if Retreat.Status == 10}
            {@each RetreatLogistics as l, index}
            <div class="mt">{@if l.IsTaken}商家收货{@else}买家收货{@/if}信息</div>
            <div class="mc">
                <div class="address-info">
                    ${l.TakeAddress}
                </div>
            </div>
            {@if Retreat.ReType == 2 || Retreat.ReType == 3}
            <!--<div class="mt">买家收货信息</div>
            <div class="mc">
                <div class="address-info">
                    <$Var ToAddress.Address />
                </div>
                <a href="javascript:void(0);" onclick="retreat.UpdAddress();" class="btn">修改</a>
            </div>-->
            {@/if}
            {@if l.IsTaken}
            <input type="hidden" id="LId" value="${l.Id}" />
            {@/if}
            {@/each}
            {@/if}
            {@if Retreat.Status >= 20 }
            {@each RetreatLogistics as l, index}
            <div class="mt"> {@if l.IsTaken}商家收货{@else}买家收货{@/if}信息：</div>
            <div class="mc">
                <div class="address-info">
                    {@if l.LogisticsName}${l.LogisticsName}　${l.OddNumber}　{@/if}${l.TakeAddress}
                </div>
            </div>
            {@/each}
            {@/if}
        </div>
        <!--//收件人信息-->
        <!--列表切换组件-->
        <div class="order-model order-details-lab">
            <!--列表区域-->
            <div class="list-mc" label-limitarea>
                <div class="for select" label-area>
                    <div class="line">
                        <ul class="fold-list handle-record">
                            {@each RetreatLog as f, index}
                            <li>
                                <div class="title box box-horizontal">
                                    <p class="name">${f.ProcInfo}</p>
                                    <div class="string box1">
                                        ${f.ProcTime}
                                    </div>
                                    <!--<div class="string box1">
                                        ${f.Operator}
                                    </div>-->
                                </div>
                                <div class="explain">操作人：${f.Operator} </div>
                                <div class="explain">${f.Descs} </div>
                            </li>
                            {@/each}
                        </ul>
                        <!-- 展开按钮 -->
                        <div class="fold-btn">
                            <a href="javascript:void(0);" class="btn" onclick="var obj = $e(this); obj.parent().siblings('.fold-list').toggleClass('open'); obj.toggleClass('close'); if (obj.hasClass('close')) { obj.html('收起'); } else { obj.html('查看全部'); }">查看全部</a>
                        </div>
                        <!-- //展开按钮 -->
                    </div>
                </div>
            </div>
            <!--//列表区域-->
        </div>
        <!--//列表切换组件-->
    </div>
    <!-- 返修退换货详情 -->
</script>
<script type="text/template" id="optTemplate">
    <!-- 订单详情底部 -->
    <div class="orderinfo-foot">
    {@if Retreat.Status == 0}
    <a href="javascript:void(0);" onclick="retreat.accept(${Retreat.Id});" class="btn gray">审核通过</a>
    <a href="javascript:void(0);" onclick="retreat.reject(${Retreat.Id});" class="btn gray">拒绝${Retreat.Type}</a>
    {@/if}
    {@if Retreat.Status == 20}
    <a href="javascript:void(0);" onclick="retreat.toReceive(${Retreat.Id})" class="btn gray">确认收货</a>
    {@/if}        
    {@if Retreat.Status == 30}
        {@if Retreat.ReType == 1}    
            {@if Retreat.ReceiveFKId==Retreat.toFKId}
            <a href="javascript:retreat.refund(${Retreat.Id})" class="btn">确认退款</a>
            {@else}
            <!--<ul><li><p class="text">本退货单由平台退款，请等待平台处理...</p></li></ul>-->
            {@/if}
        {@else}
            <a href="javascript:void(0);" onclick="retreat.toSend(${Retreat.Id})" class="btn gray">确认发货</a>
        {@/if}
    {@/if}
    </div>
    <!-- //订单详情底部 -->
</script>


<script type="text/template" id="SelectBatchTemplate">
    <!-- 弹出层 -->
    <!-- 返修退换货批次号选择弹出层 -->
    <div class="alert-box">
        <p class="title">选择批次号</p>
        <div class="pop-batch">

            <div class="batch-name box box-horizontal">
                <div class="batch-num box1">批次号</div>
                <div class="num">数 量</div>
                <div class="stock">库 存</div>
            </div>
            <div class="batch-list">
                <ul>
                    {@each _.data as d,didx}
                    {@if d.ItemId==_.itemId}
                    <li class="box box-horizontal">
                        <div class="batch-num box1">{@if d.Id==-1}--{@else}${d.BatchNumber}{@/if}</div>

                        <div class="buy-num " json="{'itemId':${d.ItemId},'goodsId':${d.GoodsId},'stock':${d.Stock},'count':${d.InventoryCount}}">
                            <a href="javascript:void(0);" onclick="retreat.reduceBacth(this);" class="btn down"></a>
                            <div class="inputbox">
                                <input type="text" class="itembatchcount" bid="${d.Id}" rtid="${d.ItemId}" gid="${d.GoodsId}" number="${d.BatchNumber}" stock="${d.Stock}" value="{@if d.InventoryCount>=d.Stock} ${d.Stock|formatFloat,0}{@else}${d.InventoryCount|formatFloat,0}{@/if}" readonly="readonly" id="BatchCount" />
                            </div>
                            <a href="javascript:void(0);" onclick="retreat.addBatch(this);" class="btn up"></a>
                        </div>
                        <div class="stock">${d.Stock|formatFloat,0}</div>
                    </li>
                    {@/if}
                    {@/each}

                </ul>
            </div>
            {@each _.data as xd,xidx}
            {@if xd.ItemId==_.itemId&&xidx==0}
            <div class="batch-name box box-horizontal">
                <div class="num red">应退总数:${xd.InventoryCount|formatFloat,0}</div>
            </div>
            {@/if}
            {@/each}
        </div>
    </div>
    <!-- //返修退换货批次号选择弹出层 -->
    <!-- //弹出层 -->
</script>

<script type="text/template" id="selectBatchFormTemplate">
    <div class="title">选中批次：</div>
    <div class="detail box1">
        <ul>
            {@each _ as d,idx}
            <li class="box box-horizontal">
                <div class="batch-num box1">
                    ${d.number}
                    <input type="hidden" rtid="${d.rtid}" gid="${d.gid}" bid="${d.bid}" stock="${d.stock}" bnumber="${d.number}" id="goodsbatch_${d.rtid}_${d.gid}" name="goodsbatch_${d.rtid}_${d.gid}" type="text" value="${d.count}" />
                </div>
                <div class="num">x${d.count}</div>
            </li>
            {@/each}
        </ul>
    </div>
</script>
<script type="text/template" id="LogisticsTemplate">
    <!-- 返修退换货物流信息弹出层 -->
    <div class="alert-box">
        <p class="title">确认发货</p>
        <div class="pop-logistics" id="LogisticsBox">
            <div class="line box box-horizontal" id="BuyAddress" style="display:none;">
                <p class="name" onclick="retreat.UpdAddress();">买家地址：</p>
                <div class="string" id="ToAddress">
                    <$Var ToAddress.Province /><$Var ToAddress.City /><$Var ToAddress.Area /> <$Var ToAddress.Address />,<$Var ToAddress.Name />,<$Var ToAddress.Mobile />
                </div>
            </div>
            <div class="line box box-horizontal">
                <p class="name">快递公司：</p>
                <div class="selectbox box1">
                    <select id="LogisticsName" name="LogisticsName" validate="isnull" error="请选择快递公司">
                        <option value="">请选择</option>
                        <$loop id="LogisticsList" datasourceid="LogisticsList">
                            <option value="<$var LogisticsList.Name/>"><$var LogisticsList.Name /></option>
                        </$loop>
                    </select>
                </div>
            </div>
            <div class="line box box-horizontal">
                <p class="name">快递单号：</p>
                <div class="inputbox box1">
                    <input type="text" name="OddNumber" id="OddNumber" value="" validate="isnull" error="请输入快递单号" />
                </div>
            </div>
        </div>
    </div>
    <!-- //返修退换货物流信息弹出层 -->
</script>
<script type="text/template" id="AddressFromBox">
    <div class="dilog-add">
        <div class="radio" radio="box" id="AddressBox">
            <$loop id="AddressList" datasourceid="AddressList">
                <div class="line" radio="line">
                    <input type="radio" id="" name="name" value="<$var addresslist.province /><$var addresslist.city /><$var addresslist.area /> <$var addresslist.address />，<$var addresslist.name />，<$var addresslist.mobile />" />
                    <label>
                        <$var addresslist.province /><$var addresslist.city /><$var addresslist.area /> <$var addresslist.address />，<$var addresslist.name />，<$var addresslist.mobile />
                    </label>
                </div>
            </$loop>
        </div>
    </div>
</script>
<script>
    retreat.getRetreatDeatil();
</script>
<!--收货人地址列表模板-->
<script type="text/template" id="accept_template">
    <div class="alert-box" id="AddressBox">
        <p class="title">收货地址</p>

        <div class="pop-address-choose">
            <ul class="list">
                <li>
                    <a href="javascript:void(0);" class="btn" style="font-size:12px;" onclick="retreat.addAddress('${_.id}');"> 添加收货地址</a>
                </li>
            </ul>
            <input type="hidden" id="address" value="" />
            <ul class="list" id="addressItem">
                {@each _.data as addr,index1}
                <li>
                    <a href="javascript:void(0);" addressid="${addr.Id}" onclick="retreat.selectedAddress(this,'${addr.Province}${addr.City}${addr.Area}${addr.Address}，${addr.Name}，${addr.Mobile}');" class="{@if addr.IsDefault}select{@/if}">
                        <span class="userinfo">
                            <span class="name">${addr.Name}</span>
                            <span class="phone">${addr.Mobile}</span>
                        </span>
                        <span class="address-text">
                            <span class="info">
                                <i class="icon-choose"></i>
                                <span class="name">地址：</span>
                                ${addr.Province}${addr.City}${addr.Area}${addr.Address}
                            </span>
                        </span>
                    </a>
                </li>
                {@/each}
            </ul>
        </div>
    </div>
</script>
<script type="text/template" id="address_itemTemplate">
    {@each _ as addr,index1}
    <li>
        <a href="javascript:void(0);" addressid="${addr.Id}" onclick="retreat.selectedAddress(this,'${addr.Province}${addr.City}${addr.Area}${addr.Address}，${addr.Name}，${addr.Mobile}');">
            <span class="userinfo">
                <span class="name">${addr.Name}</span>
                <span class="phone">${addr.Mobile}</span>
            </span>
            <span class="address-text">
                <span class="info">
                    <i class="icon-choose"></i>
                    <span class="name">地址：</span>
                    ${addr.Province}${addr.City}${addr.Area}${addr.Address}
                </span>
            </span>
        </a>
    </li>
    {@/each}
</script>
<!-- 新增收货地址 -->
<script type="text/template" id="AppendAddressBox">
    <div class="alert-box" id="AppendAddress">
        <p class="title">新增收货信息</p>

        <!-- 添加收货地址 -->
        <div class="pop-address-add">
            <ul>
                <li class="box box-horizontal normal">
                    <p class="name">收货人姓名：</p>
                    <div class="inputbox box1">
                        <input type="text" id="Name" name="Name" value="" validet="isnull" placeholder="请输入收货人姓名" />
                    </div>
                </li>
                <li class="box box-horizontal normal">
                    <p class="name">收货人电话：</p>
                    <div class="inputbox box1">
                        <input type="text" id="Mobile" name="Mobile" value="" validet="mobile" placeholder="请输入收货人电话" />
                    </div>
                </li>
                <li class="box box-horizontal normal">
                    <p class="name">收货人地址：</p>

                    <div class="address-selectbox box1">
                        <div class="selectbox">
                            <select validet="isnull" id="Province" name="Province" onchange="area.loadArea(this,'City',false,null,'province_text');" value=""></select>
                        </div>

                        <span class="tips">省</span>

                        <div class="selectbox">
                            <select validet="isnull" id="City" name="City" onchange="area.loadArea(this,'Area',false,null,'city_text');" value=""></select>
                        </div>

                        <span class="tips">市</span>

                        <div class="selectbox">
                            <select validet="isnull" id="Area" name="Area" onchange="area.loadArea(this,null,null,null,'area_text');" value=""></select>
                        </div>

                        <span class="tips">区/县</span>
                    </div>
                </li>
                <li class="box box-horizontal">
                    <p class="name">详细地址：</p>
                    <div class="textareabox box1">
                        <textarea validet="isnull" name="Address" id="Address" rows="5" cols="30" title="" class="textarea" maxlength="100"></textarea>
                    </div>
                </li>
                <li class="box box-horizontal normal">
                    <p class="name">邮政编码：</p>
                    <div class="inputbox box1">
                        <input type="text" id="ZIP" name="ZIP" value="" maxlength="6" validet="ZIP" placeholder="请输入邮政编码" />
                    </div>
                </li>
            </ul>
        </div>
        <!-- //添加收货地址 -->
    </div>
</script>
<!--配送方式列表模板-->
<!--<script type="text/template" id="accept_template">
    <div class="dilog-selectbox">
        <select id="address" valite="ifnull">{@each _ as f,index}<option value="${f.Province}${f.City}${f.Area} ${f.Address}，${f.Name} ${f.Mobile} ${f.Tel}">${f.Province}${f.City}${f.Area} ${f.Address}，${f.Name} ${f.Mobile} ${f.Tel}</option>{@/each}</select>
    </div>
</script>-->

<script type="text/template" id="reject_template">
    <div class="alert-box">
        <p class="title">拒绝申请</p>
        <div class="pop-change-notice">
            <div class="textareabox">
                <textarea id="descs" validate="isnull" maxlength="30" error="请输入拒绝理由"></textarea>
            </div>
        </div>
    </div>
</script>

<script type="text/template" id="refund_template">
    <div class="alert-box">
        <p class="title">确认退款</p>
        <div class="pop-change-notice">
            <div class="textareabox">
                <textarea id="descs" validate="isnull" maxlength="30" error="请输入确认退款备注"></textarea>
            </div>
        </div>
    </div>
</script>



<script type="text/javascript">
	//wechat.init();
	var initConfig = {
		wechat : function() {
			var iswx = '<%=WechatUtils.IsWxBrowser()%>';
			ecwx.init({
				isWx : (iswx == 'true'),
				actions : [ {
					action : 'image',
					btn : '#btnWxImage',
					maxCount : 3,
					fn : null
				} ]
			});

		}
	};

	$(function() {
		initConfig.wechat();
		
	});
	
</script>
