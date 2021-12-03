package com.example.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.Models.Billing;
import com.example.project.Models.User;
import com.example.project.Repository.BillingRepository;
import com.example.project.Repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User save(User user){
		return  userRepository.save(user);
	}

	public Optional<User> findById(int id){
		return userRepository.findById(id);
	}

	public List<User> findAll(){
		return userRepository.findAll();
	}

	public void delete(int id){
		userRepository.deleteById(id);
	}

}
	

