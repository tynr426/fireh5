package fireh5.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.proxy.service.ProxyBase;
import fireh5.web.utils.Company;

@Controller
@RequestMapping("/company/authBind")
public class AuthBindController {
	@RequestMapping("/toAuthBind.do")
	public String toAssigment(HttpServletRequest request){
		request.setAttribute("title", "微信账号列表");
		return "Company/authBind";
	}
	@RequestMapping("/show.do")
	@ResponseBody
	public Object showAuthBind(){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",Company.getCompanyId());
		return new ProxyBase().GetResponse("company.AuthBind", "getBindList", map);	
	}
	@RequestMapping("/delete.do")
	@ResponseBody
	public Object delete(int id){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("Id",id);
		return new ProxyBase().GetResponse("company.AuthBind", "deleteById", map);	
	}
}
