package fireh5.web.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import fire.common.entity.AuthBind;
import fire.common.entity.CompanyResult;
import fire.common.entity.WeChatAccount;
import fire.common.entity.WeiXinAccessTokenModel;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.WebPageOAuth;
import fire.sdk.utils.WechatJsSDK;
import fire.sdk.utils.WechatUtils;

public class Wechat {
	public static AuthBind AuthBind;
	public static AuthBind getAuthBind() {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		return (AuthBind) request.getSession().getAttribute(Constants.CompanyPre+Constants.WechatAuthCacheKey);
	
	}
//	public static void setAuthBind(AuthBind authBind) {
//		AuthBind = authBind;
//	}
	public static String setAuthInfo(String code){
		WeChatAccount wa=WechatUtils.GetWechatAccount(); 
		if(wa==null){
			return "Company/login";
		}
		JsonResult userResult=	WebPageOAuth.getAccessToken(wa.getAppId(), wa.getSecret(), code);
		if(userResult.getState()!=0)return "Company/login";


		WeiXinAccessTokenModel userAuth=(WeiXinAccessTokenModel)userResult.getData();
		
		String access_token= WechatJsSDK.getAccessToken(wa.getAppId(), wa.getSecret(),false);  
		JsonResult userInfoResult=WebPageOAuth.getInfo(access_token, userAuth.getOpenid());

		if(userInfoResult.getState()!=0)return "Company/login";
		
		AuthBind=(AuthBind)userInfoResult.getData();
		
		if(AuthBind==null) return "Company/login";
		
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		HttpSession session=request.getSession();
		
		//HttpServletResponse response = ((ServletWebRequest) RequestContextHolder.getRequestAttributes()).getResponse();
		session.setAttribute(Constants.CompanyPre+Constants.WechatAuthCacheKey, AuthBind);
		
		return "";
	}
}
