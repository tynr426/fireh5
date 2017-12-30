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
 <section class="ui-wrap">
        <!-- 引入页面顶部 -->
        <$include templatename="Block/Head.html" />
        <!-- //引入页面顶部 -->
        <!--体部-->
        <article class="ui-page">
            <!-- 内盒 -->
            <div class="ui-content iscroll-wrapper" id="DetailBox">

            </div>
            <!-- //内盒 -->
        </article>
        <!--//体部-->
        <!-- 底部 -->
        <div class="custom-foot" id="OptBox" style="display:none">
        </div>
        <!-- //底部 -->
    </section>
    <!--//框架-->
    <!-- 弹出层 -->
    <!-- 返修退换货批次号选择弹出层 -->
    <div class="alert-box" id="chooseBatch" style="display:none;">
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
        <div class="batch-btn box box-horizontal">
            <a class="box1 cancel" href="javascript:void(0);">取消</a>
            <a class="box1 sure" href="javascript:void(0);">确定</a>
        </div>
    </div>
    <!-- //返修退换货批次号选择弹出层 -->
    <!-- //弹出层 -->
</body>
</html>
<script type="text/template" id="DetailTemplate">
    <!-- 返修退换货详情 -->
    <div class="retreat-details">
        <input type="hidden" id="gisbatch" value="${_.OpenBatchNumber}" />
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
                                <p class="name" status="${Retreat.Status}">
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
            <$switch id="IsAutoSplit">
                [# <$var IsAutoSplit />]
                {@if Retreat.to_name.length > 0}
                <div class="mt extend-mt">
                    <p>供应商：<em>${Retreat.to_name}</em></p>
                </div>
                {@/if}
                [#/]
            </$switch>
            {@each RetreatItem as f, index}
            <div class="mt extend-mt">
                <p>订单号：<em>${f.OddNumber}</em></p>
            </div>
            <div class="mc">
                <div class="product-info">
                    <!--循环产品-->
                    <div class="product-line">
                        <!--商品-->
                        <div class="product">
                            <a href="/Supplier/Product/Product.aspx?pid=${f.ProductId}&sid=${f.FKId}" class="box box-horizontal">
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
                            {@if f.BarterGoodsId > 0}
                            <a href="/Supplier/Product/Product.aspx?pid=${f.BarterProductId}&sid=${f.FKId}" class="box box-horizontal">
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
                            {@if _.OpenBatchNumber}
                            <!-- 商品批次 -->
                            <div class="batch box box-horizontal">
                                <div class="title" status="${ Retreat.Status}">发货批次：</div>
                                <div class="detail box1">
                                    <ul>
                                        {@each _.Batchs as bt,bindx}
                                        {@if f.Id==bt.ItemId&&f.GoodsId==bt.GoodsId}
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">${bt.BatchNumber}</div>
                                            <div class="num">x${bt.InventoryCount|formatFloat,0}</div>
                                        </li>
                                        {@/if}
                                        {@/each}                                       
                                    </ul>
                                </div>
                            </div>
                            {@if _.InventoryBatch.length>0}
                            <div class="batch box box-horizontal">
                                <div class="title" status="${ Retreat.Status}">退换批次：</div>
                                <div class="detail box1">
                                    <ul>
                                        <!-- InventoryBatch -->
                                        {@if Retreat.Status>=20}
                                        {@each _.InventoryBatch as bt,bindx}
                                        {@if bt.Flag==0&&f.Id==bt.ItemId&&f.GoodsId==bt.GoodsId}
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">[原]${bt.BatchNumber}</div>
                                            <div class="num">x${bt.Quantity|formatFloat,0}</div>
                                            {@if Retreat.ReType==1}
                                            <input type="hidden" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" otid="${f.OrderItemId}" gid="${f.GoodsId}" bid="${bt.Id}" stock="${bt.Quantity}" bnumber="${bt.BatchNumber}" id="goodsbatch_${f.Id}_{@if f.BarterGoodsId > 0}${f.BarterGoodsId}{@else}${f.GoodsId}{@/if}_${bt.Id}" name="goodsbatch_${f.Id}_{@if f.BarterGoodsId > 0}${f.BarterGoodsId}{@else}${f.GoodsId}{@/if}" value="${bt.Quantity}">
                                            {@/if}
                                        </li>
                                        {@/if}
                                        {@/each}
                                        {@each _.InventoryBatch as nbt,bindx}
                                        {@if nbt.Flag==1&&f.Id==nbt.ItemId}
                                        <li class="box box-horizontal">
                                            <div class="batch-num box1">[新]${nbt.BatchNumber}</div>
                                            <div class="num">x${nbt.Quantity|formatFloat,0}</div>
                                            {@if Retreat.ReType==2}
                                            <input type="hidden" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" otid="${f.OrderItemId}" gid="${f.GoodsId}" bid="${nbt.Id}" stock="${nbt.Quantity}" bnumber="${nbt.BatchNumber}" id="goodsbatch_${f.Id}_{@if f.BarterGoodsId > 0}${f.BarterGoodsId}{@else}${f.GoodsId}{@/if}_${nbt.Id}" name="goodsbatch_${f.Id}_{@if f.BarterGoodsId > 0}${f.BarterGoodsId}{@else}${f.GoodsId}{@/if}" value="${nbt.Quantity}">
                                            {@/if}
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
                                </div>
                            </div>
                            {@/if}
                            <div class="batch box box-horizontal">
                                <div class="detail box1">        
                                    {@if Retreat.Status == 10}
                                    <div class="batch-btn">
                                        <input hidden="hidden" tag="gstr" id="itemBatch_${f.Id}_${f.GoodsId}" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" pid="${f.ProductId}" gid="${f.GoodsId}" gname="${f.GoodsName}" gprice="${f.Price}" quantity="${f.Quantity}" sipping="0" value="" />
                                        <a href="javascript:void(0);" json="${_.Batchs|formatJson}" rtid="${f.Id}" gid="${f.GoodsId}" onclick="retreat.filterBatch(this,'${f.Id}','${f.GoodsId}','${f.Quantity}')" class="btn">选择批次号</a>
                                    </div>
                                    {@else if Retreat.Status == 40}
                                    <input hidden="hidden" tag="gstr" id="itemBatch_${f.Id}_{@if f.BarterGoodsId}${f.BarterGoodsId}{@else}${f.GoodsId}{@/if}" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" pid="${f.ProductId}" gid="{@if f.BarterGoodsId>0}${f.BarterGoodsId}{@else}${f.GoodsId}{@/if}" gname="${f.GoodsName}" gprice="${f.Price}" quantity="${f.Quantity}" sipping="0" value="${_.InventoryBatch|ParseBatchByStatus,f.Id,f.GoodsId,Retreat.Status}" />
                                    {@/if}

                                </div>
                            </div>
                            <div class="batch box box-horizontal" id="selectBatchBox_${f.Id}_${f.GoodsId}">
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
                            <input hidden="hidden" tag="gstr" id="sendgoods_${f.Id}_${f.GoodsId}" rid="${Retreat.Id}" rtid="${f.Id}" oid="${f.OrderId}" otid="${f.OrderItemId}" pid="${f.ProductId}" gid="${f.GoodsId}" gname="${f.GoodsName}" gprice="${f.Price}" quantity="${f.Quantity}" sipping="0" value="" />

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
            <div class="mt">{@if l.IsTaken}买家收货{@else}商家收货{@/if}信息</div>
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
            <div class="mt"> {@if l.IsTaken}卖家收货{@else}商家收货{@/if}信息：</div>
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
            <div class="list-mc" label-limitarea">
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
        <a href="javascript:void(0);" onclick="retreat.cancel(${Retreat.Id});" class="btn gray">取消申请</a>
        {@/if}
        {@if Retreat.Status == 10}
        <a href="javascript:void(0);" onclick="retreat.UpdLogistics(${Retreat.Id},${Retreat.ReType});" class="btn gray">确认发货</a>
        <!--<a href="javascript:void(0);" onclick="pub.tips('请到PC端处理...');" class="btn gray">确认发货</a>-->
        {@/if}
        {@if Retreat.Status == 40}
        {@if Retreat.ReType == 1}
        <a href="javascript:void(0);" onclick="retreat.Finish(${Retreat.ReType},${Retreat.Id})" class="btn gray">确认收款</a>
        {@/if}
        {@if Retreat.ReType == 2 || Retreat.ReType == 3}
        <a href="javascript:void(0);" onclick="retreat.Finish(${Retreat.ReType},${Retreat.Id})" class="btn gray">确认收货</a>
        {@/if}
        {@/if}
    </div>
    <!-- //订单详情底部 -->
</script>
<script type="text/template" id="LogisticsTemplate">
    <!-- 返修退换货物流信息弹出层 -->
    <div class="alert-box">
        <p class="title">确认发货</p>
        <div class="pop-logistics" id="LogisticsBox">
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
            <div class="line box box-horizontal" id="BuyAddress" style="display:none;">
                <p class="name">买家地址：</p>
                <div class="string box1" id="ToAddress">
                    <$switch id="ToAddress">
                        [# <$var ToAddress.Province /> !='']
                        <$Var ToAddress.Province /><$Var ToAddress.City /><$Var ToAddress.Area /> <$Var ToAddress.Address />,<$Var ToAddress.Name />,<$Var ToAddress.Mobile />
                        [#/]
                        [#]
                        未设置收货地址
                        [#/]
                    </$switch>                    
                </div>
            </div>
            <div class="line box box-horizontal" id="BuyAddressOpt" style="display:none;">
                <p class="name"></p>
                <div class="button box1" id="UToAddress">
                    <a href="javascript:void(0);" class="btn" onclick="retreat.UpdAddress();">修改地址</a>
                </div>
            </div>
        </div>
    </div>
    <!-- //返修退换货物流信息弹出层 -->
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
                                <input type="text" class="itembatchcount" bid="${d.Id}" rtid="${d.ItemId}" gid="${d.GoodsId}" number="${d.BatchNumber}" stock="${d.Stock}" value="{@if d.InventoryCount|formatFloat,0>=d.Stock} ${d.Stock|formatFloat,0}{@else}${d.InventoryCount|formatFloat,0}{@/if}" readonly="readonly" id="BatchCount" />
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
                <div class="num red">应退(换)数量:${xd.InventoryCount|formatFloat,0}</div>
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
<!--<script type="text/template" id="AddressFromBox">
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
</script>-->
<!--收货人地址列表模板-->
<script type="text/template" id="AddressFromBox">
    <div class="alert-box" id="AddressBox">
        <p class="title">收货地址</p>
        <div class="pop-address-choose">
            <ul class="list">
                <$loop id="AddressList" datasourceid="AddressList">
                    <li>
                        <a href="javascript:void(0);" addressid="${addr.Id}" onclick="retreat.SetAddress(this,'<$var addresslist.province /><$var addresslist.city /><$var addresslist.area /> <$var addresslist.address />，<$var addresslist.name />，<$var addresslist.mobile />');">
                            <span class="userinfo">
                                <span class="name"><$var addresslist.name /></span>
                                <span class="phone"><$var addresslist.mobile /></span>
                            </span>
                            <span class="address-text">
                                <span class="info">
                                    <i class="icon-choose"></i>
                                    <span class="name">地址：</span>
                                    <$var addresslist.province /><$var addresslist.city /><$var addresslist.area /> <$var addresslist.address />
                                </span>
                            </span>
                        </a>
                    </li>
                </$loop>
            </ul>
        </div>
    </div>
</script>
<script>
    retreat.getRetreatDeatil();
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
