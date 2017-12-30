package fireh5.web.utils;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

import fire.common.entity.CompanyResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;


public class Company {
	private static CompanyResult company;
	public static CompanyResult getCompany(){
		if(company==null||company.getId()==0){	
			HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
			company =  (CompanyResult) request.getSession().getAttribute(Constants.CompanyPre+Constants.LoginCacheKey);
		}
		if(company==null){
			company=new CompanyResult();
		}
		return company;
	}
	public static int getCompanyId(){

		return getCompany().getId();

	}
	public static void setCookie(CompanyResult user,HttpServletResponse response){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session=request.getSession();
		company=null;
		//HttpServletResponse response = ((ServletWebRequest) RequestContextHolder.getRequestAttributes()).getResponse();
		session.setAttribute(Constants.CompanyPre+Constants.LoginCacheKey, user);
		CookiesUtil.addCookie(response, Constants.CompanyPre+Constants.LoginCacheKey,user.getToken(), 60*60*24*3);
	}
	public static void clearCookie(HttpServletResponse response){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session=request.getSession();
		
		session.removeAttribute(Constants.CompanyPre+Constants.LoginCacheKey);
		CookiesUtil.addCookie(response, Constants.CompanyPre+Constants.LoginCacheKey,null, 10);
		company=null;
	}
	public static boolean IsLogin(HttpServletResponse response){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session=request.getSession();
		Cookie cookie=CookiesUtil.getCookieByName(request, Constants.CompanyPre+Constants.Ticket);

		if(session.getAttribute(Constants.CompanyPre+Constants.LoginCacheKey)!=null){
			return true;
		}
		
		if(request.getSession().getAttribute(Constants.CompanyPre+Constants.LoginCacheKey)==null&&cookie==null){
			return false;
		}
		else if(cookie!=null){
			//模拟登录
			if(AutologLogin(cookie.getValue(),response)){
				return true;
			}
		}
		return false;
	}
	public static boolean AutologLogin(String token,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>(); 
		map.put("Token",token);
		JsonResult result=new ProxyBase().GetResponse("company", "autologin", map);
		if(result.getState()==0){
			CompanyResult user=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), CompanyResult.class);
			setCookie(user,response);
			return true;
		}
		return false;
	}
}