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
			$("#RetreatCountBox li").removeClass("select");
			$(obj).parent().addClass("select");
			 $(".search-push").removeClass("open").addClass("close");
			 $("#select-title").html($(obj).find("em").html());
			load();
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
					}else{
						alert("该二维码不存在");
					}
				}
			});
			
		}

}
var checkDevice={
		init:function(){
			var id =$.getUrlParam("deviceId");
			var result = device.getDevice(id);
			if(result!=null && result.state==0){				
				$.each($.parseJSON(result.data),function(key,value){
					$("#"+key).val(value);
				}) ;
			}
		},
		save:function(){
			var DeviceId=$("#DeviceId").val();
			var DeviceTypeId=$("#DeviceTypeId").val();
			var Certificate=[];
			var Description=$("#Description").val();
			var SeverityLevel=$("#SeverityLevel").val();
			$("#logo-pic #wxpic").each(function(){
				Certificate.push($(this).find("img").attr("src"));
			});
			$.ajax({
				url:path+"/company/check/add.do",
				type:"post",
				data:{DeviceId:DeviceId,DeviceTypeId:DeviceTypeId,
					Certificate:Certificate.join(";"),
					Description:Description,
					SeverityLevel:SeverityLevel},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						window.location.href=path+"/company/check/toCheckList.do";
					}
				}
			});
		},
		detail:function(id){
			$.ajax({
				url:path+"/checkdevice/getCheckDevice.do",
				type:"post",
				dataType:"json",
				data:{id:id},
				success:function(result){
					if(result.state==0){
						var div = document.createElement("div");
						div.innerHTML = $("#CheckDeviceFormTemplate").html();
					
						$(div).find("var,img").each(function(){
							var name=$(this).attr("id");
							if(this.tagName=="IMG"){
								$(this).src=checkdevice.getJsonValue(result.data,name);
							}
							else{
								$(this).html(checkdevice.getJsonValue(result.data,name));
							}
						});
						var config={ 
								content: div, 
								width: 700, 
								height: 500, 
								title: "指派任务", 
								callback: checkdevice.assignment, 
								arguments: [id] 
						} ;
						if(result.data.status==2){
							config.isView=true;
						}
						pub.openDialog(config);
						var arr=[];
						manager.getManagerList(function(data){
							$.each(data,function(i,item){
								arr.push('<option value="'+item.id+'">'+item.name+'</option>')
							});
							$("#ToManagerId").append(arr.join(""));
						});
						if(result.data.status==2){
							checkdevice.getAssigment(id);
						}
					}
					
				},
				error:function(){
					alert("加载失败!");
				}
			});
		}
}


