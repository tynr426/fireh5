var device={
		deviceTypeList:null,
		save:function(Id){
			if(Id>0){
				device.updateDevice(Id);
			}else{
				device.addDevice();
			}
		},
		addDevice:function(obj){
			if(!$("#DeviceForm").formValidate())return;
			var DeviceTypeId = $("#DeviceTypeId").val().trim();
			var Manufacturer = $("#Manufacturer").val().trim();
			var Model = $("#Model").val().trim();
			var Spec = $("#Spec").val().trim();
			var Buildings = $("#Buildings").val();
			var Floor = $("#Floor").val();
			var Position = $("#Position").val();
			var Passageway = $("#Passageway").val();
			var AddTime = $("#AddTime").val();
			var RenewalDate = $("#RenewalDate").val();
			var Detail = $("#Detail").val().trim();
			var Code=$.getUrlParam("code");
			var devicejson={DeviceTypeId:DeviceTypeId,Manufacturer:Manufacturer,
					Model:Model,Spec:Spec,Buildings:Buildings,Floor:Floor,
					Position:Position,Passageway:Passageway,AddTime:AddTime,RenewalDate:RenewalDate,
					Detail:Detail,Code:Code};

			var arrValue=[];
			if(device.deviceTypeList!=null){
				$.each(device.deviceTypeList,function(i,item){
					if(item.id==DeviceTypeId){	
						for(var i=0;i<item.list.length;i++){
							var child=item.list[i];
							var multipleValue=[];
							if(child.editorType=="texts"||child.editorType=="checkbox"){

								$.each(child.candidate,function(j,jitem){
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
						}
					}

				});

			}
			for(var index=0;index<arrValue.length;index++){
				devicejson['list[' + index +'].DeviceTypeId']=arrValue[index].DeviceTypeId;
				devicejson['list[' + index +'].ParameterId']=arrValue[index].ParameterId;
				devicejson['list[' + index +'].Value']=arrValue[index].Value;
			}
			$.ajax({
				url:path+"/company/device/add.do",
				type:"post",
				data:devicejson,
				dataType:"json",
				success:function(result){
					if(result.state==0){

						window.location.href=path+"/company/device/toDeviceList.do";
					}else{	
						alert(result.message);		
					}								

				}
			});
		},
		getDevice:function(Id){
			$.ajax({
				url:path+"/company/device/getDevice.do",
				type:"post",
				async:false,
				data:{id:Id},
				dataType:"json",
				success:function(result){					
					if(result.state==0){
						device.deviceFinish(result.data);
			    		$("#btnSave").hide();
					}
				}
			});
			return null;
		},
		initControll:function(){
			var arrFloor=[],arrPo=[],arrPassage=[];
			for(var i=-2;i<34;i++){
				arrFloor.push("<option value='"+i+"'>"+i+"</option>");
			}
			$("#Floor").append(arrFloor.join(''));

			$.each(dict.position,function(i,item){
				arrPo.push("<option value='"+i+"'>"+item+"</option>");
			});
			$("#Position").append(arrPo.join(""));
			$.each(dict.passageway,function(i,item){
				arrPassage.push("<option value='"+i+"'>"+item+"</option>");
			});
			$("#Passageway").append(arrPassage.join(""));
			device.getDeviceType();
			var deviceType=[];
			if(device.deviceTypeList!=null){
				$.each(device.deviceTypeList,function(i,item){
					deviceType.push("<option value='"+item.id+"'>"+item.name+"</option>");
				});

				$("#DeviceTypeId").append(deviceType.join());
			}
			var deviceTypeId = $.getUrlParam('deviceTypeId');
			if(deviceTypeId!=null&&deviceTypeId!=""){

				$("#DeviceTypeId").val(deviceTypeId);
				$("#DeviceTypeId").change();
				$("#DeviceTypeId").attr("disabled", true);

			}
		},
		deviceFinish:function(){

			var json=arguments[0];
			if(json.id==undefined) return ;

			$.each(json,function(key,value){

				$("#"+key.firstUpperCase()).val(value);

			});
			$("#DeviceTypeId").change();
			if(json.list!=undefined){
				$.each(json.list,function(i,item){
					$.each($.parseJSON(item.value),function(key,value){
						$("#"+key).val(value);
					}) ;
				});
			}
		},
		//获得所有的设备类型
		getDeviceType:function(){

			$.ajax({
				url:path+"/company/deviceType/findAll.do",
				async:false,
				type:"post",
				dataType:"json",
				success:function(result){
					if(result.state==0){
						device.deviceTypeList=result.data;
						$.each(device.deviceTypeList,function(i,item){
							$.each(item.list,function(j,jitem){
								if(jitem.editorType=="texts"||jitem.editorType=="select"||item.editorType=="checkbox"){
									jitem.candidate=$.parseJSON(jitem.candidate);
								}
							});

						});

					}
				}

			});
		},
		/*选择设备类型是触发的事件*/
		deviceTypeChange:function(obj){
			$("#parameterList").html("");
			if(obj.value!=""){
				if(device.deviceTypeList!=null){
					$.each(device.deviceTypeList,function(i,item){
						if(item.id==obj.value){
							var str = "";
							for(var i=0;i<item.list.length;i++){
								var child=item.list[i];
								$("#DeviceTypeParameterFormTemplate").tmpl(child).appendTo("#parameterList");
							}
							var arr=[];
							$("#parameterList #btnWxImage").each(function(){
								arr.push(this);
							});
							ecwx.initImage({
								action : 'image',
								btn : arr,
								fn :null
							} );
						}
					});

				}
			}
		},
		updateDevice:function(Id){
			if(!$("#DeviceForm").formValidate())return;
			var DeviceTypeId = $("#DeviceTypeId").val().trim();
			var Manufacturer = $("#Manufacturer").val().trim();
			var Model = $("#Model").val().trim();
			var Spec = $("#Spec").val().trim();
			var Buildings = $("#Buildings").val();
			var Floor = $("#Floor").val();
			var Position = $("#Position").val();
			var Passageway = $("#Passageway").val();
			var AddTime = $("#AddTime").val();
			var Detail = $("#Detail").val().trim();
			var devicejson={Id:Id,DeviceTypeId:DeviceTypeId,Manufacturer:Manufacturer,
					Model:Model,Spec:Spec,Buildings:Buildings,Floor:Floor,
					Position:Position,Passageway:Passageway,AddTime:AddTime,
					Detail:Detail};
			var arrValue=[];
			if(device.deviceTypeList!=null){
				$.each(device.deviceTypeList,function(i,item){
					if(item.id==DeviceTypeId){	
						for(var i=0;i<item.list.length;i++){
							var child=item.list[i];
							var multipleValue=[];
							if(child.editorType=="texts"||child.editorType=="checkbox"){

								$.each(child.candidate,function(j,jitem){
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
						}
					}

				});

			}
			for(var index=0;index<arrValue.length;index++){
				devicejson['list[' + index +'].DeviceTypeId']=arrValue[index].DeviceTypeId;
				devicejson['list[' + index +'].ParameterId']=arrValue[index].ParameterId;
				devicejson['list[' + index +'].Value']=arrValue[index].Value;
			}
			$.ajax({
				url:path+"/company/device/update.do",
				type:"post",
				data:devicejson,
				dataType:"json",
				success:function(result){
					if(result.state==0){

						window.location.href=path+"/company/device/toDeviceList.do";
					}else{	
						alert(result.message);			
					}								

				}
			});
		},
		stepTrigger:function(){
			$("#firstStep").toggle();
			$("#secondStep").toggle();
		},
		getQR:function(code,obj){
			if(code=="scan resultStr is here"){

				return;
			}
			$.ajax({
				url:path+"/company/device/getQR.do",
				type:"post",
				data:{code:code},
				dataType:"json",
				success:function(result){
					var attr=$(obj).attr("data-state");
					if(result.state==100){
						alert(result.message);
					}
					else if(result.state==1){
						alert("异常");
					}
					else{
						if(result.data.deviceId==null || result.data.deviceId==""){
							window.location.href=path+"/company/device/toDevice.do?deviceTypeId="+result.data.deviceTypeId+"&code="+code;
						}
						else if(result.data.checkStatus==null || result.data.checkStatus=="" || result.data.checkStatus==3){
							window.location.href=path+"/company/check/toCheck.do?code="+code;

						}
						else{
							window.location.href=path+"/company/repairrecord/toRepairrecord.do?checkId="+result.data.assignmentId;
						}
					}

				}
			});
		},
		loadDeviceType:function(){
			$.ajax({url:path+"/company/deviceType/findAll.do",
				type:"post",
				dataType:"json",
				success:function(result){
					var deviceType=[];
					if(result.state==0){
						$.each(result.data,function(i,item){
							deviceType.push('<li data-status="'+item.id+'"><a href="javascript:void(0);" onclick="device.search(this)"><em>'+item.name+'</em></a></li>');
						});
						$("#RetreatCountBox").append(deviceType.join());
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
		isBindQr:function(code,obj){
			if(code=="scan resultStr is here"){
				return;
			}
			var id=$(obj).attr("data-state");
			var deviceTypeId=$(obj).attr("data-typeId");
			$.ajax({
				url:path+"/company/device/isBindQr.do",
				type:"post",
				dataType:"json",
				data:{deviceId:id,code:code,deviceTypeId:deviceTypeId},
				success:function(result){
					
					if(result.state==0){
						if(result.data==2)
						{
							if(confirm("该设备已经绑定了二维码是否重新绑定？")){
								device.bind(code,id);
							}
						}else{
							device.bind(code,id);
						}
					}
					else {
						alert(result.message);
					}
				}
			});
		},
		bind:function(code,deviceId){
			$.ajax({
				url:path+"/company/device/bind.do",
				type:"post",
				dataType:"json",
				data:{deviceId:deviceId,code:code},
				success:function(result){
					if(result.state==0){
						alert("绑定成功");
					}
					else {
						alert(result.message);
					}
				}
			});
		}
}



