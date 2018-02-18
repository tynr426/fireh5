package fireh5.company.controller;


import java.util.HashMap;
import java.util.Map;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.proxy.service.ProxyBase;


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
