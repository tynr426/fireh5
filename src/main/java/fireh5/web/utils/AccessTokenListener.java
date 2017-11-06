package fireh5.web.utils;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

public class AccessTokenListener implements ApplicationListener<ContextRefreshedEvent>  {  
    
  public void onApplicationEvent(ContextRefreshedEvent event) {  
      if(event.getApplicationContext().getParent() == null){  
            
          Runnable runnable = new Runnable() {  
              public void run() {  
                  /** 
                   * 定时设置accessToken 
                   */  
                  //AccessTokenUtil.initAndSetAccessToken();  
              }  
          };  
            
          ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();  
          service.scheduleAtFixedRate(runnable, 1, 7000, TimeUnit.SECONDS);  
      }  
  }
}
