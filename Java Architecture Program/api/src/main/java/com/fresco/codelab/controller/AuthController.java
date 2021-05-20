package com.fresco.codelab.controller;

import com.fresco.codelab.model.CodeLabUser;
import com.fresco.codelab.repo.CodeLabRepoRepository;
import com.fresco.codelab.repo.CodeLabUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;

@Controller
public class AuthController {

    @Autowired
    private CodeLabUserRepository userRepository;

    @Autowired
    private CodeLabRepoRepository repoRepository;

    @GetMapping("/register")
    public String register() throws IOException {
        return "registrationpage.jsp";
    }
    @PostMapping("/register")
    public String createUser(String fullname, String username, String password){
        CodeLabUser user = new CodeLabUser();
        user.setFullname(fullname);
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
        return "loginpage.jsp";
    }

    @GetMapping("/login")
    public String getLogin() throws IOException {
        return "loginpage.jsp";
    }
}