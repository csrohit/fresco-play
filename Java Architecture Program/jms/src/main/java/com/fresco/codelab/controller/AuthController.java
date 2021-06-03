package com.fresco.codelab.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
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
	
	public void processMessageFromClient(@Payload MergeRequest mr) throws Exception {
	}
	
	@GetMapping("/register")
	public String register(Principal principal) {
		return principal == null ? "registrationpage" : "redirect:/dashboard/";
	}

	@GetMapping({"/login", "/"})
	public String loginPage(Principal principal) {
		//remove this line after development 
		try {service.registerUser("Jack", "jack@gmail.com", "abcd");
		service.registerUser("abc", "abc@gmail.com", "abcd");
		}catch(Exception e) {}
		
		
		return principal == null ? "loginpage" : "redirect:/dashboard/";
	}

	@PostMapping("/register")
	public String register(String fullname, String username, String password) {
		System.out.println(fullname);
		service.registerUser(fullname, username, password);
		return "loginpage";
	}

}







