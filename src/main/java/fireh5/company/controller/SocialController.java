package fireh5.company.controller;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.protocol.HttpRequestHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.CompanyResult;
import fire.common.entity.WeChatAccount;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.WechatUtils;
import fireh5.web.utils.Company;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;
import fire.sdk.utils.WechatJsSDK;
@Controller
@RequestMapping("/company/social")
public class SocialController {
	@RequestMapping("/getWeChatAccount.do")
	@ResponseBody	
	public Object getWeChatAccount(String url){
		     try {
				url=URLDecoder.decode(url,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			//return "";
			return new  JsonResult(WechatUtils.sign(url, WechatUtils.GetWechatAccount()));
	}
	@RequestMapping("/getMedia.do")
	@ResponseBody
	public Object getMedia(String serverId,HttpSession session,HttpServletResponse response){
		System.out.println("mediaId="+serverId);
		WeChatAccount wa=WechatUtils.GetWechatAccount(); 
		String access_token= WechatJsSDK.getAccessToken(wa.getAppId(), wa.getSecret(),false);  
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",Company.getCompanyId());
		map.put("MediaId",serverId);
		map.put("AccessToken", access_token);
		return new ProxyBase().GetResponse("company.social", "getMedia", map);	
	}
}
