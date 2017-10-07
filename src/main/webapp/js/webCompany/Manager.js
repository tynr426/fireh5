var manager={
		addManager:function(obj){
			if(!$("#ManagerForm").formValidate())return;
			
			var UserName = $("#UserName").val().trim();
			var Password = $("#Password").val().trim();
			var Name = $("#Name").val().trim();
			var Email = $("#Email").val();
			var Mobile = $("#Mobile").val();
			var Position = $("#Position").val();
			$.ajax({
				url:companypath+"/manager/add.do",
				type:"post",
				data:{UserName:UserName,Password:Password,Name:Name,Email:Email,Mobile:Mobile,Position:Position},
				dataType:"json",
				success:function(result){
					if(result.state==0){
						alert("添加成功");
						$(obj).dialog('close');
						load();
					}else{	
						alert(result.message);		
					}								

				},
				error:function(){
					alert("添加失败");
				}
			});
		},
		getManager:function(Id){
			$.ajax({
				url:companypath+"/manager/getManager.do",
				type:"post",
				data:{Id:Id},
				dataType:"json",
				success:function(result){					
					if(data.state==0){
						user.openDialog(result.data);
					}
				},
				error:function(){
					alert("获取失败");
				}
			});
		},
		updateFinish:function(){
			var json=arguments[0];
			$("#UserName").parent().html(json.userName);
			$("#Password").val("");
		},
		updateManager:function(obj){
			if(!$("#ManagerForm").formValidate())return;
			var id = $("#ManagerForm").find("#Id").val();
			var Password = $("#Password").val().trim();
			var Name = $("#Name").val().trim();
			var Email = $("#Email").val().trim();
			var Mobile = $("#Mobile").val().trim();
			var Position = $("#Position").val().trim();
			$.ajax({
				url:companypath+"/manager/update.do",
				type:"post",
				data:{Id:id,Password:Password,Name:Name,Email:Email,Mobile:Mobile,Position:Position},
					dataType:"json",
					success:function(result){
						if(result.state==0){
							alert("您已修改成功");
							load();
							$(obj).dialog('close');
						}else{	
							alert(result.message);			
						}								

					},
					error:function(){
						alert("修改失败");
					}
			});
		},


}

	
