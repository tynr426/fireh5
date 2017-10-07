package fireh5.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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
@RequestMapping("/login.do")
public String GetView(){
	
	return "Company/login";
}
@RequestMapping("/toLogin.do")
public String login(){
	Map<String, String> map = new HashMap<String, String>();   
	map.put("Code", "adf");
	 map.put("UserName", "tyn");    
	 map.put("Password", "111111");  
	
	 JsonResult result=new ProxyBase(1).GetResponse("company", "login", map);
	if(result.getState()==0){
		Manager obj=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), Manager.class)	;
	System.out.println(obj);
	}
	return result.toString();
}
}
