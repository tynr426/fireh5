package fireh5.company.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.Assignment;
import fire.common.entity.CheckDeviceResult;
import fire.proxy.service.ProxyBase;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company/assigment")
public class AssigmentController {
	@RequestMapping("/toAssigment.do")
	public String toAssigment(HttpServletRequest request){
		request.setAttribute("title", "任务列表");
		return "Company/assigment";
	}
	@RequestMapping("/show.do")
	@ResponseBody
	public Object showAssigment(String index,String size,Integer status,String keyword,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();
		if(Company.getCompany().getUserId()!=0){
		map.put("ManagerId",String.valueOf(Company.getCompany().getManagerId()));
		}
		map.put("CompanyId", Company.getCompanyId());
		map.put("Index",index);
		map.put("Size",size);
		if(status!=null){
			map.put("Status",status);
		}
		map.put("Keyword",keyword);
		return new ProxyBase().GetResponse("company.assigment", "showAssigment", map);	
	}
	@RequestMapping("/getAssignment.do")
	@ResponseBody
	public Object getAssignmentByCheckId(String checkId,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CheckId",checkId);
		return new ProxyBase().GetResponse("company.assigment", "getAssignmentByCheckId", map);
	}
	@RequestMapping("/save.do")
	@ResponseBody
	public Object addCD(Assignment assignment){
		return new ProxyBase().httpPostSerialObject("company.assigment", "save",assignment);
	}
	@RequestMapping("/getStatistics.do")
	@ResponseBody
	public Object getStatistics(Integer status,String keyword,HttpSession session,HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("ManagerId",String.valueOf(Company.getCompany().getManagerId())); 
		if(status!=null){
			map.put("Status",status);
		}
		map.put("Keyword", keyword);
		return new ProxyBase().GetResponse("company.assigment", "getStatistics", map);	
	}
}
