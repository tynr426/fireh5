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
@RequestMapping("/company/assigment")
public class AssigmentController {
	@RequestMapping("/toAssigment.do")
	public String toAssigment(){
		return "Company/assigment";
	}
	@RequestMapping("/show.do")
	@ResponseBody
	public Object showAssigment(String index,String size,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("ManagerId",String.valueOf(Company.getCompany().getManagerId()));
		map.put("Index",index);
		map.put("Size",size);
		return new ProxyBase().GetResponse("company.assigment", "showAssigment", map);	
	}
}
