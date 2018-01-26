package fireh5.company.controller;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.CheckDevice;
import fire.common.entity.CheckDeviceResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.DTOBeanUtils;
import fire.sdk.utils.JsonResult;
import fireh5.web.utils.Company;

@Controller
@RequestMapping("/company/check")
public class CheckController {
	@RequestMapping("/toCheck.do")
	public String GetView(HttpServletRequest request){
		request.setAttribute("title", "检查录入");
		return "Company/checkDevice";
	}
	@RequestMapping("/toCheckList.do")
	public String GetCheckList(HttpServletRequest request){
		request.setAttribute("userId", Company.getCompany().getUserId());
		return "Company/checkDeviceList";
	}
	@RequestMapping("/toSendAssignment.do")
	public String GetSendAssignment(HttpServletRequest request){
		request.setAttribute("title", "任务指派");
		return "Company/sendAssignment";
	}
	@RequestMapping("/add.do")
	@ResponseBody
	public Object addCD(CheckDeviceResult cd){
		cd.setCompanyId(Company.getCompanyId());
		cd.setManagerId(Company.getCompany().getManagerId());
		cd.setManagerName(Company.getCompany().getManagerName());
		return new ProxyBase().httpPostSerialObject("company.checkDevice", "addCD",cd);
	}
	@RequestMapping("/showCDList.do")
	@ResponseBody
	public Object showCDList(String index,String size,Integer status,String keyword,HttpSession session,HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",String.valueOf(Company.getCompanyId()));
		map.put("Index",index);
		map.put("Size",size);
		if(status!=null){
			map.put("Status",status);
		}
		map.put("Keyword", keyword);
		return new ProxyBase().GetResponse("company.checkDevice", "showCDList", map);	
	}
	@RequestMapping("/getStatistics.do")
	@ResponseBody
	public Object getStatistics(Integer status,String keyword,HttpSession session,HttpServletRequest request,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",String.valueOf(Company.getCompanyId()));
		if(status!=null){
			map.put("Status",status);
		}
		map.put("Keyword", keyword);
		return new ProxyBase().GetResponse("company.checkDevice", "getStatistics", map);	
	}
	@RequestMapping("/getCD.do")
	@ResponseBody
	public Object getDevice(String id,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("Id",id);
		return new ProxyBase().GetResponse("company.checkDevice", "getCD", map);
	}
	@RequestMapping("/getCheckParameter.do")
	@ResponseBody
	public Object getCheckParameter(String deviceTypeId,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("DeviceTypeId",deviceTypeId);
		return new ProxyBase().GetResponse("company.checkDevice", "getCheckParameter", map);
	}
}
