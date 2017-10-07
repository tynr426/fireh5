package fireh5.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.company.entity.Manager;
import fire.modules.entity.FormatType;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;


@Controller
@RequestMapping("/company")
public class LoginController {
//@Resource
//private ProxyBase proxy;
@RequestMapping("/toLogin.do")
public String GetView(){
	
	return "Company/login";
}
@RequestMapping("/toMain.do")
public String toMain(){
	return "Company/main";
}
@RequestMapping("/login.do")
@ResponseBody
public Object login(String username,String password,String code,HttpSession session){
	Map<String, String> map = new HashMap<String, String>();   
	map.put("Code",code);
	map.put("UserName", username);    
	map.put("Password", password);  
	
	JsonResult result=new ProxyBase().GetResponse("company", "login", map);
	if(result.getState()==0){
		Manager user=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), Manager.class)	;
		session.setAttribute("user", user);
		return new JsonResult();
	}
	return result.toString();
}
}
