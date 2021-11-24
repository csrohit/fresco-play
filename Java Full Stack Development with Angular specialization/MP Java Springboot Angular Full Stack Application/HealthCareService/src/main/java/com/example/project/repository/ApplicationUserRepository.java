package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.Model.ApplicationUser;



public interface ApplicationUserRepository  extends JpaRepository<ApplicationUser, String>{

}
