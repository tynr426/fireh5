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
import fire.common.entity.DeviceTypeResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.DTOBeanUtils;
import fire.sdk.utils.JsonResult;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company/deviceType")
public class DeviceTypeController {
	
	@RequestMapping("/findAll.do")
	@ResponseBody	
	public Object getfindAll(){
		Map<String, Object> map=new HashMap<String,Object>();
				
	    return new ProxyBase().GetResponse("company.deviceType", "findAll", map);
		
	}
}
