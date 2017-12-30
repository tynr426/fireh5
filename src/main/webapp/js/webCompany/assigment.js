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
			load();
		}	

}



