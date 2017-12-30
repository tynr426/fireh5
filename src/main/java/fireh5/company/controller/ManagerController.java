package fireh5.company.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.proxy.service.ProxyBase;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company/manager")
public class ManagerController {
	@RequestMapping("/toPwd.do")
	public String toPwd(){
		return "Company/updatePwd";
	}
	@RequestMapping("/getManager.do")
	@ResponseBody
	public Object getManager(String id,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("Code",id);
		return new ProxyBase().GetResponse("company.manager", "getManager", map);	
	}
	@RequestMapping("/getManagerList.do")
	@ResponseBody
	public Object getManagerList(HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",Company.getCompanyId());
		return new ProxyBase().GetResponse("company.manager", "getManagerList", map);	
	}
	@RequestMapping("/updatePwd.do")
	@ResponseBody
	public Object updatePwd(String oldPwd,String pwd,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("ManagerId",Company.getCompany().getManagerId());
		map.put("OldPwd",oldPwd);
		map.put("Pwd",pwd);
		return new ProxyBase().GetResponse("company.manager", "updatePwd", map);	
	}
}
