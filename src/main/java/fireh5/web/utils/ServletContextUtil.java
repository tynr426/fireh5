package fireh5.web.utils;

import javax.servlet.ServletContext;

import org.springframework.web.context.ContextLoader;  
import org.springframework.web.context.WebApplicationContext;  

public class ServletContextUtil {
	private static ServletContext serveltContext = null;  

	private ServletContextUtil(){};  

	public synchronized static ServletContext get() {  

		if(null == serveltContext) {  
			WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
			serveltContext = webApplicationContext.getServletContext();   
		}   
		return serveltContext;  
	}  
}
