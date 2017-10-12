package fireh5.web.utils;


import fire.common.entity.DeviceTypeResult;
import fire.proxy.service.ProxyBase;
import fire.sdk.utils.JsonResult;
import fire.sdk.utils.JsonUtils;

public class Device {
	private static DeviceTypeResult dtr;
	public static DeviceTypeResult getDTR(){
		JsonResult result=new ProxyBase().GetResponse("company.deviceType", "findAll", null);
		dtr = JsonUtils.JSONToObj(JsonUtils.objectToJson(result.getData()), DeviceTypeResult.class);
		return dtr;
	}
}