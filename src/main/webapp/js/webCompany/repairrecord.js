var repairrecord={
		save:function(obj){
			if($(obj).attr("state")==1)return;
			$(obj).attr("state",1);
			$(obj).html("正在提交..");
			var AssignmentId=$("#AssignmentId").val();
			var DeviceId=$("#DeviceId").val();
			var DeviceTypeId=$("#DeviceTypeId").val();
			var Certificate=[];
			var Description=$("#Description").val();
			var IsFinish=$("#IsFinish").val();
			$("#logo-pic #wxpic").each(function(){
				Certificate.push($(this).find("img").attr("src"));
			});
			$.ajax({
				url:path+"/company/repairrecord/add.do",
				type:"post",
				data:{
					AssignmentId:AssignmentId,
					DeviceId:DeviceId,
					DeviceTypeId:DeviceTypeId,
					Certificate:Certificate.join(";"),
					Description:Description,
					IsFinish:IsFinish},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						window.location.href=path+"/company/assigment/toAssigment.do";
					}
					else{
						alert(result.data);
					}
				}
			});
			$(obj).attr("state",0);
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
						result.data.assignment=repairrecord.getAssigment(id);
		
					 $("#DetailTemplate").tmpl(result.data).appendTo($("#DetailBox"));
					 
					
							//$("#OptBox").show();
							ecwx.initImage({
			    				action : 'image',
			    				btn : "#btnWxImage",
			    				fn :null
			    			} );
							  //iScroll刷新
						    if ($.iscroll) {
						        $.iscroll.refresh();
						    }
					}
					
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
		}
}


