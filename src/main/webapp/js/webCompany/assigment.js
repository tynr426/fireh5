var assigment={	
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
			 var status=$("#RetreatCountBox .select").attr("data-status");
			 var keyword=$("#keyword").val();
			 if(status==999){
				 status=null;
			 }
			 load();
			 if(obj==undefined){
				 assigment.getStatistics(status,keyword);
			 }
		},
		detail:function(id){
			$.ajax({
				url:path+"/company/check/getCD.do",
				type:"post",
				dataType:"json",
				data:{id:id},
				success:function(result){
					if(result.state==0){
						$("#DetailTemplate").tmpl(result.data).appendTo("#DetailBox");
						assigment.loadManagerName();
						if(result.data.status>1){
							assigment.getAssigment(id);
						}
					}
					
				}
			});
		},
		getAssigment:function(checkId){
			$.ajax({
				url:path+"/company/assigment/getAssignment.do",
				type:"post",
				dataType:"json",
				data:{checkId:checkId},
				success:function(result){
					$("#ToManagerId").val(result.data.toManagerId);
					$("#PredictTime").val(result.data.predictTime);
					$("#Remark").val(result.data.assignmentRemark);
				}		
			});
		},
		getJsonValue:function(json,name){
			var v="";
			$.each(json,function(key,value){
				if(key.firstUpperCase()==name){
					v= value;
					return;
				}
				
			});
			return v;
		},
		saveAssignment:function(id){
			if(!$("#CheckDeviceForm").formValidate())return;
			
			var ToManagerId=$("#ToManagerId").val();
			var PredictTime=$("#PredictTime").val();
			var Remark=$("#Remark").val();
			$.ajax({
				url:path+"/company/assigment/save.do",
				type:"post",
				dataType:"json",
				data:{CheckId:id,ToManagerId:ToManagerId,
					PredictTime:PredictTime,Remark:Remark},
				success:function(result){
					if(result.state==0){
						alert("操作成功!");
						location.href=path+"/company/check/toCheckList.do";
					}
					else{
						alert("操作失败!");
					}
				}
			});
		},
		loadManagerName:function(){
			$.ajax({url:path+"/company/manager/getManagerList.do",
			type:"post",
			dataType:"json",
			success:function(result){
				var managerName=[];
				if(result.state==0){
					$.each(result.data,function(i,item){
						managerName.push("<option value='"+item.id+"'>"+(item.name==null?item.userName:item.name)+"</option>");
					});
					$("#ToManagerId").append(managerName.join());
				}
			}
		});
		},
		getStatistics:function(status,keyword){
			$.ajax({
				url:path+"/company/assigment/getStatistics.do",
				type:"post",
				dataType:"json",
				async:false,
				data:{status:status,keyword:keyword},
				success:function(result){
					$("#RetreatCountBox [data-status]").each(function(){
						$(this).find("em").eq(1).html("(0)");
					});
					if(result.state==0){
						$.each(result.data,function(i,item){
							$("#RetreatCountBox [data-status="+item.status+"]").find("em").eq(1).html("("+item.count+")");
							
						});
					}
				}		
			});
		}

}



