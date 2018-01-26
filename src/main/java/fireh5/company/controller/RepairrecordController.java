package fireh5.company.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fire.common.entity.CheckDevice;
import fire.common.entity.Repairrecord;
import fire.proxy.service.ProxyBase;
import fireh5.web.utils.Company;

@Controller
@RequestMapping("/company/repairrecord")
public class RepairrecordController {
	@RequestMapping("/toRepairrecord.do")
	public String toAssigment(HttpServletRequest request){
		request.setAttribute("title", "维修表");
		return "Company/Repairrecord";
	}
	@RequestMapping("/add.do")
	@ResponseBody
	public Object addRepairrecord(Repairrecord repairrecord){
		return new ProxyBase().httpPostSerialObject("company.Repairrecord", "addRepairrecord",repairrecord);
	}
}
