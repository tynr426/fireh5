package fireh5.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import fire.common.entity.CompanyResult;
import fire.common.entity.WeChatAccount;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;
import fire.sdk.utils.WebPageOAuth;
import fire.sdk.utils.WechatUtils;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company")
public class LoginController {
	//@Resource
	@RequestMapping("/toLogin.do")
	public String GetView(HttpServletRequest request,RedirectAttributes ras){
		
		WeChatAccount wa=WechatUtils.GetWechatAccount(); 
		
		if(wa==null||!WechatUtils.IsWxBrowser()){
			return "Company/login";
			}
		String basePath = request.getScheme()+"://"+request.getServerName()+"/company/toRealLogin.do";
		return "redirect:"+WebPageOAuth.getCodeUrl(wa.getAppId(), "", basePath)+"";
	}	
	@RequestMapping("/toRealLogin.do")
	public String GetRealView(HttpServletRequest request){
		String code=request.getParameter("code");
		WeChatAccount wa=WechatUtils.GetWechatAccount(); 
		if(wa==null){
			return "Company/login";
			}
		WebPageOAuth.getAccessToken(wa.getAppId(), wa.getSecret(), code);
		return "Company/login";
	}
	@RequestMapping("/toMain.do")
	public String toMain(){
		return "Company/main";
	}
	@RequestMapping("/login.do")
	@ResponseBody
	public Object login(String username,String password,String code,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("Code",code);
		map.put("UserName", username);    
		map.put("Password", password);  

		JsonResult result=new ProxyBase().GetResponse("company.manager", "login", map);
		if(result.getState()==0){
			CompanyResult user=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), CompanyResult.class)	;
			Company.setCookie(user,response);
			return new JsonResult("");
		}
		return result.toString();
	}
}
