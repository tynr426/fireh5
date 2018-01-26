package fireh5.web.interceptors;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import fire.sdk.utils.Base64;
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
			String query=req.getQueryString();
			query=(query==null||query.equals("")?"":"?"+query);
			String returnUrl= Base64.encodeBase64((req.getServletPath()+query).getBytes("utf-8"));
			res.sendRedirect(req.getContextPath()+"/company/toLogin.do?ReturnUrl="+returnUrl);
			return false;
		}
		return true;
	}
}
