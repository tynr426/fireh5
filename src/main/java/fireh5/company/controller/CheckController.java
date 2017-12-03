package fireh5.company.controller;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.CheckDevice;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.DTOBeanUtils;
import fire.sdk.utils.JsonResult;
import fireh5.web.utils.Company;

@Controller
@RequestMapping("/company/check")
public class CheckController {
	@RequestMapping("/toCheck.do")
	public String GetView(){
		return "Company/checkDevice";
	}
	@RequestMapping("/toCheckList.do")
	public String GetCheckList(){
		return "Company/checkDeviceList";
	}
	@RequestMapping("/add.do")
	@ResponseBody
	public Object addCD(CheckDevice cd){
		cd.setCompanyId(Company.getCompanyId());
		Map<String,Object> map;
		
		try {
			map = DTOBeanUtils.convertBeanToMap(cd);
			return new ProxyBase().httpPostSerialObject("company.checkDevice", "addCD",cd);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new JsonResult(e);
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new JsonResult(e);
		} catch (IntrospectionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new JsonResult(e);
		}
	}
	@RequestMapping("/showCDList.do")
	@ResponseBody
	public Object showCDList(String index,String size,String model,String deviceTypeId,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",String.valueOf(Company.getCompanyId()));
		map.put("Index",index);
		map.put("Size",size);
		map.put("ManagerName",Company.getCompany().getManagerName());
		map.put("Model",model);
		map.put("DeviceTypeId",deviceTypeId);
		return new ProxyBase().GetResponse("company.checkDevice", "showCDList", map);	
	}
}
