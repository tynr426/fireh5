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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import fire.common.entity.DeviceResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.DTOBeanUtils;
import fire.sdk.utils.JsonResult;
import fireh5.web.utils.Company;


@Controller
@RequestMapping("/company/device")
public class DeviceController {
	@RequestMapping("/toDevice.do")
	public String GetView(HttpServletRequest request){
		request.setAttribute("title", "设备录入");
		return "Company/device";
	}
	@RequestMapping("/toDeviceList.do")
	public String GetListView(HttpServletRequest request){
		request.setAttribute("title", "消防设备列表");
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
	public Object showDevice(String index,String size,int deviceTypeId,String keyword){
		Map<String, Object> map = new HashMap<String, Object>();   
		map.put("CompanyId",String.valueOf(Company.getCompanyId()));
		map.put("Index",index);
		map.put("Size",size);
		map.put("DeviceTypeId", deviceTypeId);
		map.put("KeyWord", keyword);
		return new ProxyBase().GetResponse("company.device", "showDevice", map);	
	}
	@RequestMapping("/update.do")
	@ResponseBody	
	public Object updateDevice(DeviceResult device){
		return new ProxyBase().httpPostSerialObject("company.device", "updateDevice",device);
	}
	@RequestMapping("/getQR.do")
	@ResponseBody	
	public Object getQR(String code){
		System.out.println("code"+code);
		Map<String, Object> map = new HashMap<String, Object>();  
		map.put("QrCode", code);
		map.put("ToManagerId", Company.getCompany().getManagerId());
		map.put("CompanyId", Company.getCompanyId());
		return new ProxyBase().GetResponse("company.getQR", "getDeviceQRByCode",map);
	}
	
}
