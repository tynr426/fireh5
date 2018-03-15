var checkDeviceList={	
		loadManagerName:function(){
			$.ajax({url:path+"/company/manager/getManagerList.do",
			type:"post",
			dataType:"json",
			success:function(result){
				var managerName=[];
				if(result.state==0){
					$.each(result.data,function(i,item){
						managerName.push('<li data-status="'+item.id+'"><a href="javascript:void(0);" onclick="device.search(this)"><em>'+item.name+'</em></a></li>');
					});
					$("#RetreatCountBox").append(managerName.join());
				}
			}
		});
		},
		search:function(obj){
			if(obj!=undefined){
			$("#RetreatCountBox li").removeClass("select");
			$(obj).parent().addClass("select");
			 $(".search-push").removeClass("open").addClass("close");
			 $("#select-title").html($(obj).find("em").html());
			 }
			 var status=$("#RetreatCountBox .select").attr("data-status");
			 var keyword=$("#keyword").val();
			 if(status==999){
				 status=null;
			 }
			load();
			if(obj==undefined){
				checkDeviceList.getStatistics(status,keyword);
			}
		},
		 onScanComplete:function(code) {
			 if(code.indexOf(" ")>0) return;
			//app那边直接返回的字符串
			$.ajax({
				url:path+"/company/device/getQR.do",
				type:"post",
				data:{code:code},
				dataType:"json",
				success:function(result){
					if(result.state==0 && result.data.deviceId==null){
						window.location.href=path+"/company/device/toDevice.do?deviceTypeId="+result.data.deviceTypeId+"&code="+code;
					}else if(result.state==0 && result.data.deviceId!=null){
						$.each(result.data,function(key,value){

							$("#"+key.firstUpperCase()).val(value);

						});
						checkDevice.getParameter(result.data.deviceTypeId);
					}else{
						alert("该二维码不存在");
					}
				}
			});
			
		},
		getStatistics:function(status,keyword){
			$.ajax({
				url:path+"/company/check/getStatistics.do",
				type:"post",
				dataType:"json",
				async:false,
				data:{status:status,keyword:keyword},
				success:function(result){
					if(result.state==0){
						$("#RetreatCountBox [data-status]").each(function(){
							$(this).find("em").eq(1).html("(0)");
						});
						$.each(result.data,function(i,item){
							$("#RetreatCountBox [data-status="+item.status+"]").find("em").eq(1).html("("+item.count+")");
							
						});
					}
				}		
			});
		}

}
var checkDevice={
		parameterList:[],
		getParameter:function(deviceTypeId){
			$.ajax({
				url:path+"/company/check/getCheckParameter.do",
				type:"post",
				data:{deviceTypeId:deviceTypeId},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						 checkDevice.parameterList=result.data.list;
						 $("#DeviceTypeParameterFormTemplate").tmpl(result.data.list).appendTo("#parameterList");
							var arr=[];
					    	$("#parameterList #btnWxImage").each(function(){
					    		arr.push(this);
					    	});
							ecwx.initImage({
			    				action : 'image',
			    				btn : arr,
			    				fn :null
			    			} );
							  //iScroll刷新
						    if ($.iscroll) {
						        $.iscroll.refresh();
						    }
					}
				}
			})
		},
		save:function(obj){
			obj.disabled=true;
			$(obj).html("正在提交..");
			if(!$("#ReceiveCash").formValidate())return;
			var DeviceId=$("#DeviceId").val();
			var DeviceTypeId=$("#DeviceTypeId").val();
			var Certificate=[];
			var Description=$("#Description").val();
			var SeverityLevel=$("#SeverityLevel").val();
			$("#logo-pic #wxpic").each(function(){
				Certificate.push($(this).find("img").attr("src"));
			});
			var deviceTypeJson={DeviceId:DeviceId,DeviceTypeId:DeviceTypeId,
					Certificate:Certificate.join(";"),
					Description:Description,
					SeverityLevel:SeverityLevel};
			var arrValue=[];
			if(checkDevice.parameterList!=null){
				$.each(checkDevice.parameterList,function(i,item){	
					
							var child=item;
							var multipleValue=[];
							if(child.editorType=="texts"||child.editorType=="checkbox"){

								$.each($.parseJSON(child.candidate),function(j,jitem){
									p_id="parameter_"+child.id+"_"+j;
									multipleValue.push("\""+p_id+"\":\""+$("#"+p_id).val()+"\"");

								});	
							}
							else{
								p_id="parameter_"+child.id;
								multipleValue.push("\""+p_id+"\":\""+$("#"+p_id).val()+"\"");

							}
							arrValue.push({
								DeviceTypeId:DeviceTypeId,
								ParameterId:child.id,
								Description:child.Description,
								Value:"{"+multipleValue.join(',')+"}"
							});	
						
					

				});

			}
			for(var index=0;index<arrValue.length;index++){
				deviceTypeJson['list[' + index +'].ParameterId']=arrValue[index].ParameterId;
				deviceTypeJson['list[' + index +'].Value']=arrValue[index].Value;
			}
			$.ajax({
				url:path+"/company/check/add.do",
				type:"post",
				data:deviceTypeJson,
				dataType:"json",
				success:function(result){
					if(result.state==0){
						window.location.href=path+"/company/check/toCheckList.do";
					}
				}
			});
			obj.disabled=false;
			$(obj).html("确认");
		},
		detail:function(id){
			$.ajax({
				url:path+"/company/check/getCD.do",
				type:"post",
				dataType:"json",
				data:{id:id},
				success:function(result){
					if(result.state==0){
						result.data.assignment=checkDevice.getAssigment(id);
		
					 $("#DetailTemplate").tmpl(result.data).appendTo($("#DetailBox"));
					 if(result.data.assignment.id==0){
							//$("#OptBox").show();
							ecwx.initImage({
			    				action : 'image',
			    				btn : "#btnWxImage",
			    				fn :null
			    			} );
						}
					}
					
				},
				error:function(){
					alert("加载失败!");
				}
			});
		},
		getAssigment:function(checkId){
			var data={};
			$.ajax({
				url:path+"/company/assigment/getAssignment.do",
				type:"post",
				dataType:"json",
				async:false,
				data:{checkId:checkId},
				success:function(result){
					if(result.state==0)
					data=result.data;
				}		
			});
			return data;
		},
		 getDevice:function(id) {
			 if(id==0) return;
			//app那边直接返回的字符串
			$.ajax({
				url:path+"/company/device/getDevice.do",
				type:"post",
				data:{id:id},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						$.each(result.data,function(key,value){

							$("#"+key.firstUpperCase()).val(value);

						});
						checkDevice.getParameter(result.data.deviceTypeId);
					}else{
						alert("该二维码不存在");
					}
				}
			});
			
		}
}


