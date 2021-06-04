package com.fresco.codelab.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);
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
    	LOG.debug("hello around here..................................");
		return principal == null ? "registrationpage" : "redirect:/dashboard/";
	}

	@GetMapping({"/login", "/"})

	public String loginPage(Principal principal) {
		LOG.debug("hello around here..................................");
		System.out.println("here again");
		return principal == null ? "loginpage" : "redirect:/dashboard/";

	}

	@PostMapping("/register")
	public String register(String fullname, String username, String password) {
		service.registerUser(fullname, username, password);
		return "loginpage";
	}

}







