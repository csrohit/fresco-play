package com.example.project.controller;

import com.example.project.Model.AuthenticationResponse;
import com.example.project.repository.ApplicationUserRepository;
import com.example.project.security.JwtUtil;
import com.example.project.service.MyUserDetailsService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.project.Model.ApplicationUser;
import com.example.project.service.ApplicationUserService;

import java.util.List;

@RestController
public class ApplicationUserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ApplicationUserRepository repository;

    @GetMapping("/users")
    public ResponseEntity<List<ApplicationUser>> getAllUsers() {
        return new ResponseEntity<List<ApplicationUser>>(repository.findAll(), HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody ApplicationUser user) {
        ApplicationUser user1 = repository.save(user);
        return new ResponseEntity<>(user1, HttpStatus.OK);
    }

    @PostMapping("signin")
    public ResponseEntity<?> signin(@RequestBody ApplicationUser user) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUser_name(), user.getPassword())
            );
        }catch (BadCredentialsException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUser_name());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @GetMapping("viewprofile/{username}")
    public ResponseEntity<ApplicationUser> viewProfile(@PathVariable String username){
        return ResponseEntity.ok(repository.findById(username).get());
    }

}
