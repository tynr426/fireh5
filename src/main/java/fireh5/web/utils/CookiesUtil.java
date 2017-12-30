package fireh5.web.utils;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookiesUtil {
	public static Cookie getCookieByName(HttpServletRequest request,String name){
		Map<String,Cookie> cookieMap = ReadCookieMap(request);
		if(cookieMap.containsKey(name)){
			Cookie cookie = cookieMap.get(name);
			return cookie;
		}
		return null;
	}

	private static Map<String, Cookie> ReadCookieMap(HttpServletRequest request) {
		Map<String,Cookie> cookieMap = new HashMap<String, Cookie>();
		Cookie[] cookies = request.getCookies();
      	if(cookies != null){
			for (Cookie cookie : cookies) {
				cookieMap.put(cookie.getName(), cookie);
				System.out.println(cookie.getValue()+","+cookie.getName());
			}
		}
		return cookieMap;
	}
	public static void addCookie(HttpServletResponse response,String name,String value,int maxAge){
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		cookie.setMaxAge(maxAge);
		cookie.setHttpOnly(true);
		response.addCookie(cookie);
	}
}

