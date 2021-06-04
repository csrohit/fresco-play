package com.fresco.codelab.logging;

import java.time.Instant;
import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
@Component
public class CustomRequestInterceptor extends  HandlerInterceptorAdapter{
    private static final Logger LOG = LoggerFactory.getLogger(CustomRequestInterceptor.class);
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	if(request.getMethod().equalsIgnoreCase("get")) {
            LOG.info("{}::{}::clientIpAddr/127.0.0.1", request.getMethod(), request.getRequestURL());
    	}else {
    		 Map<String, String[]> params = request.getParameterMap();
    			String str = "POST::http://localhost/register::Body::{ fullname:"+params.get("fullname")[0]+", username:"+ params.get("username")[0]+", password:"+params.get("password")[0]+",  }clientIpAddr/127.0.0.1";
    			str.replace(" ", "").replace(",", "");
            LOG.info(str);
    	}
        return super.preHandle(request, response, handler);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }
}
