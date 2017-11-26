package fireh5.company.controller;


import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.protocol.HttpRequestHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.CompanyResult;
import fire.common.entity.WeChatAccount;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.WechatUtils;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;
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
}
