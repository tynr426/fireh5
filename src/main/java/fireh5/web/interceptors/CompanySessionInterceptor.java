package fireh5.web.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


import fireh5.web.utils.Company;

public class CompanySessionInterceptor implements HandlerInterceptor {
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {

	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {

	}

	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object arg2) throws Exception {
		
		if(!Company.IsLogin(res))
		{
			res.sendRedirect(req.getContextPath()+"/company/toLogin.do");
			return false;
		}
		return true;
	}
}
