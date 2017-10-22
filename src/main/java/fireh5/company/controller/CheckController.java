package fireh5.company.controller;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

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
}
