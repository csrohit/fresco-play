package com.fresco.apigateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fresco.apigateway.model.User;
import com.fresco.apigateway.model.UserPrincipal;
import com.fresco.apigateway.repo.UserRepository;

@Service
public class MyUserDetailsService{
}
