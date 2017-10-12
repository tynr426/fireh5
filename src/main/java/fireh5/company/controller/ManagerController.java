package fireh5.company.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.proxy.service.ProxyBase;


@Controller
@RequestMapping("/company/manager")
public class ManagerController {
	@RequestMapping("/getManager.do")
	@ResponseBody
	public Object getManager(String id,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("Code",id);
		return new ProxyBase().GetResponse("company.manager", "getManager", map);	
	}
}
