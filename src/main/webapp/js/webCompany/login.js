var loginCM = {

		login:function(obj){
			//if(!$("#loginForm").formValidate())return;
			
			var name = $("#UserName").val().trim();
			var pwd = $("#Password").val().trim();
			var code = $("#Code").val().trim();
			var ok = true;
			if(name==""){
				alert("用户名为空");
				ok=false;
			}
			if(pwd==""){
				alert("密码为空");
				ok=false;
			}
		
			if(code==""){
				alert("代码为空");
				ok=false;
			}
			if(ok){
				$.ajax({
					url:path+"/company/login.do",
					type:"post",
					data:{username:name,password:pwd,code:code},
					dataType:"json",
					success:function(result){
						if(result.state==0){
							window.location.href=path+"/company/toMain.do";
						}else{	
							alert(result.message);		
						}								

					},
					error:function(){
						alert("登录失败");
					}
				});
			}
		},
		loginOut:function(){
			if(confirm("确认退出吗?")){
				$.ajax({
					url:path+"/company/loginOut.do",
					dataType:"json",
					success:function(result){
						window.location.href="toLogin.do";
					},
					error:function(){
						alert(arguments);
					}

				});
			}
		},
		  /*密码显示切换*/
	    pwdSwitch: function () {
	        var _isShow = $('#isShow'),
	            _obj = _isShow.parent(),
	            _showPwd = $('#Password'),
	            _showTxt = $('#showTxt');

	        //密码值同步
	        _showPwd.blur(function () {
	            var n = $(this).val();
	            $(this).parent().find('#showTxt').val(n);
	        });
	        _showTxt.blur(function () {
	            var n = $(this).val();
	            $(this).parent().find('#Password').val(n);
	        });

	        //密码显示
	        _isShow.bind('click', function () {
	            if (_obj.hasClass('show')) {
	                _obj.removeClass('show');
	                _showPwd.show();
	                _showTxt.hide();
	            } else {
	                _obj.addClass('show');
	                _showPwd.hide();
	                _showTxt.show();
	            }
	        });
	    }
}