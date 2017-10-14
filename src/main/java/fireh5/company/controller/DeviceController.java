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

import fire.common.entity.DeviceResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.DTOBeanUtils;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.SyncHttp;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company/device")
public class DeviceController {
	@RequestMapping("/toDevice.do")
	public String GetView(){
		return "Company/device";
	}
	@RequestMapping("/toDeviceList.do")
	public String GetListView(){
		return "Company/deviceList";
	}
	@RequestMapping("/add.do")
	@ResponseBody	
	public Object addDevice(DeviceResult device){
		
		device.setCompanyId(Company.getCompanyId());
		Map<String, Object> map;
		try {
			
			map = DTOBeanUtils.convertBeanToMap(device);
			return new ProxyBase().httpPostSerialObject("company.device", "addDevice",device);
			
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
	@RequestMapping("/getDevice.do")
	@ResponseBody
	public Object getDevice(String id,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("Id",id);
		return new ProxyBase().GetResponse("company.device", "getDevice", map);	
	}
	@RequestMapping("/show.do")
	@ResponseBody
	public Object showDevice(String index,String size,HttpSession session,HttpServletResponse response){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",String.valueOf(Company.getCompanyId()));
		map.put("Index",index);
		map.put("Size",size);
		return new ProxyBase().GetResponse("company.device", "showDevice", map);	
	}
}
