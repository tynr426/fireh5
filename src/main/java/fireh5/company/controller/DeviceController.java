package fireh5.company.controller;


import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.DeviceResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.DTOBeanUtils;
import fire.sdk.utils.JsonResult;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company/device")
public class DeviceController {
	@RequestMapping("/toDevice.do")
	public String GetView(){
		return "Company/device";
	}
	@RequestMapping("/add.do")
	@ResponseBody	
	public Object addDevice(DeviceResult device){
		
		device.setCompanyId(Company.getCompanyId());
		Map<String, Object> map;
		try {
			map = DTOBeanUtils.convertBeanToMap(device);
			return new ProxyBase().GetResponse("company.device", "addDevice", map);
			
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
	
}
