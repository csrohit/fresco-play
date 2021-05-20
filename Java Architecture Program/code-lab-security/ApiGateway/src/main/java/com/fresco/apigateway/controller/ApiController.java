package com.fresco.apigateway.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fresco.apigateway.service.MyUserDetailsService;

@RestController
public class ApiController {
	@Autowired
	MyUserDetailsService service;

	@RequestMapping("/dashboard")
	public String getFullName(Principal principal) {
		return "DASHBOARD";
	}
}
