package com.example.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.Models.User;

@Repository
public interface UserRepository extends  JpaRepository<User, Integer>{

}
