package com.fresco.apigateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fresco.apigateway.model.User;
import com.fresco.apigateway.repo.UserRepository;

@Service
public class RegisterService {
	@Autowired
	private UserRepository repo;

	public void registerUser(String fullname, String username, String password) {
		repo.save( new User(0,fullname, username, new BCryptPasswordEncoder().encode(password)) );
	}
}
