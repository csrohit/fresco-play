package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.Model.ApplicationUser;

import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ApplicationUserRepository  extends JpaRepository<ApplicationUser, String>{
    public Optional<ApplicationUser> findByUsername(String username);
}
