package fireh5.company.controller;


import javax.servlet.http.HttpServletRequest;

import org.apache.http.protocol.HttpRequestHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.CompanyResult;
import fire.common.entity.WeChatAccount;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.JsSignUtil;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;
@Controller
@RequestMapping("/company/social")
public class SocialController {
	@RequestMapping("/getWeChatAccount.do")
	@ResponseBody	
	public Object getWeChatAccount(HttpServletRequest request){
			String url=request.getContextPath();
			JsonResult result= new ProxyBase().httpPostSerialObject("company.social", "getWeChatAccount",null);
			WeChatAccount wca=JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()),WeChatAccount.class)	;
			return JsSignUtil.sign(url, wca);
	}
}
