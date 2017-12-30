package fireh5.web.utils;

import fire.common.entity.AuthBind;
import fire.common.entity.WeChatAccount;
import fire.common.entity.WeiXinAccessTokenModel;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.WebPageOAuth;
import fire.sdk.utils.WechatJsSDK;
import fire.sdk.utils.WechatUtils;

public class Wechat {
	public static AuthBind AuthBind;
	public static AuthBind getAuthBind() {
		return AuthBind;
	}
	public static void setAuthBind(AuthBind authBind) {
		AuthBind = authBind;
	}
	public static String setAuthInfo(String code){
		WeChatAccount wa=WechatUtils.GetWechatAccount(); 
		if(wa==null){
			return "Company/login";
		}
		JsonResult userResult=	WebPageOAuth.getAccessToken(wa.getAppId(), wa.getSecret(), code);
		if(userResult.getState()!=0)return "Company/login";


		WeiXinAccessTokenModel userAuth=(WeiXinAccessTokenModel)userResult.getData();
		
		String access_token= WechatJsSDK.getAccessToken(wa.getAppId(), wa.getSecret());  
		JsonResult userInfoResult=WebPageOAuth.getInfo(access_token, userAuth.getOpenid());

		if(userInfoResult.getState()!=0)return "Company/login";
		
		AuthBind=(AuthBind)userInfoResult.getData();
		
		if(AuthBind==null) return "Company/login";
		
		return "";
	}
}
