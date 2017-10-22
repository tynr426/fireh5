package fireh5.company.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/company/check")
public class CheckController {
	@RequestMapping("/toCheck.do")
	public String GetView(){
		return "Company/checkDevice";
	}
}
