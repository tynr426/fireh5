package fireh5.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import fire.common.entity.AuthBind;
import fire.common.entity.CompanyResult;
import fire.common.entity.WeChatAccount;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.Base64;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;
import fire.sdk.utils.WebPageOAuth;
import fire.sdk.utils.WechatUtils;
import fireh5.web.utils.Company;
import fireh5.web.utils.Wechat;


@Controller
@RequestMapping("/company")
public class LoginController {
	//@Resource
	@RequestMapping("/toLogin.do")
	public String GetView(HttpServletRequest request,RedirectAttributes ras){
		
		request.getSession().setAttribute("ReturnUrl", request.getParameter("ReturnUrl"));
		WeChatAccount wa=WechatUtils.GetWechatAccount(); 
		if(wa!=null&&WechatUtils.IsWxBrowser()){
			request.setAttribute("weixin", wa);
			String basePath = request.getScheme()+"://"+request.getServerName()+"/fireh5/company/toRealLogin.do";
			return "redirect:"+WebPageOAuth.getCodeUrl(wa.getAppId(), "", basePath)+"";

		}


		return "Company/login";
	}	
	@RequestMapping("/toRealLogin.do")
	public String GetRealView(HttpServletRequest request){
		String code=request.getParameter("code");

		Wechat.setAuthInfo(code);

		isWxAuth(request);
		return "Company/login";
	}

	private void isWxAuth(HttpServletRequest request){
		if(WechatUtils.IsWxBrowser()&&Wechat.getAuthBind()!=null){

			Map<String, Object> map = new HashMap<String, Object>();   
			map.put("OpenId",Wechat.getAuthBind().getOpenId());
			JsonResult result= new ProxyBase().GetResponse("company.manager", "isWxAuth", map);
			if(result.getState()==0&&result.getData()!=null){
				request.setAttribute("isWxAuth", true);
				return;
			}
		}
		request.setAttribute("isWxAuth", false);
	}
	@RequestMapping("/wxLogin.do")
	public String wxLogin(HttpServletRequest request,HttpServletResponse response){
		AuthBind entity=new AuthBind();
		if(WechatUtils.IsWxBrowser()&&Wechat.getAuthBind()!=null){
			entity=Wechat.getAuthBind();
			JsonResult result=new ProxyBase().httpPostSerialObject("company.manager", "wxLogin", entity);
			if(result.getState()==0){
				CompanyResult user=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), CompanyResult.class)	;
				Company.setCookie(user,response);
				
				return "redirect:"+skipUrl(request,"/company/toMain.do");
			}
		}
		return "Company/login";
	}
	private String skipUrl(HttpServletRequest request,String defaultUrl){
		if(request.getSession().getAttribute("ReturnUrl")==null) return defaultUrl;
		String returnUrl=(String)request.getSession().getAttribute("ReturnUrl");
		if(returnUrl.equals("")) return defaultUrl;

		try {
			returnUrl= new String(Base64.decodeBase64(returnUrl));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnUrl="";
		}
		if(returnUrl.equals("")) return defaultUrl;
		return returnUrl;
	}
	@RequestMapping("/toMain.do")
	public String toMain(){
		return "Company/main";
	}
	@RequestMapping("/login.do")
	@ResponseBody
	public Object login(String username,String password,String code,HttpServletRequest request,HttpServletResponse response){
		AuthBind entity=new AuthBind();
		if(WechatUtils.IsWxBrowser()&&Wechat.getAuthBind()!=null){
			entity=Wechat.getAuthBind();
		}
		entity.setUserName(username);
		entity.setPassword(password);
		entity.setCode(code);
		JsonResult result=new ProxyBase().httpPostSerialObject("company.manager", "login", entity);
		if(result.getState()==0){
			CompanyResult user=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), CompanyResult.class)	;
			Company.setCookie(user,response);
			return new JsonResult(skipUrl(request,"/company/toMain.do"));
		}
		return result.toString();
	}
	@RequestMapping("/loginOut.do")
	@ResponseBody
	public Object loginOut(HttpServletResponse response){
		Company.clearCookie(response);
		return new JsonResult(1);	
	}
}
