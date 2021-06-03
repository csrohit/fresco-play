package com.fresco.codelab.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.fresco.codelab.jms.MergeRequest;
import com.fresco.codelab.service.RegisterService;

@Controller
public class AuthController {
	@Autowired
	RegisterService service;
	
	@Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/queue/sendMR")
//    @SendToUser("/queue/receiveMR")
	public void processMessageFromClient(@Payload MergeRequest mr) throws Exception {
    	service.saveMergeRequest(mr);
    	simpMessagingTemplate.convertAndSendToUser(mr.getReqTo(), "/queue/receiveMR", mr);
	}
	
	@GetMapping("/register")
	public String register(Principal principal) {
		return principal == null ? "registrationpage" : "redirect:/dashboard/";
	}

	@GetMapping({"/login", "/"})
	public String loginPage(Principal principal) {
		return principal == null ? "loginpage" : "redirect:/dashboard/";
	}

	@PostMapping("/register")
	public String register(String fullname, String username, String password) {
		service.registerUser(fullname, username, password);
		return "loginpage";
	}

}







