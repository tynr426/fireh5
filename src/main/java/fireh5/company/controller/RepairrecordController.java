package fireh5.company.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/company/repairrecord")
public class RepairrecordController {
	@RequestMapping("/toRepairrecord.do")
	public String toAssigment(HttpServletRequest request){
		request.setAttribute("title", "维修表");
		return "Company/Repairrecord";
	}
}
