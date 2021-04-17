package com.example.project.controller;

import org.apache.tomcat.util.http.parser.MediaType;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.Model.ApplicationUser;
import com.example.project.Model.AuthenticationRequest;
import com.example.project.Model.AuthenticationResponse;
import com.example.project.repository.ApplicationUserRepository;
import com.example.project.security.JwtUtil;
import com.example.project.service.ApplicationUserService;


@RestController
@RequestMapping("/")
public class ApplicationUserController {

    private final ApplicationUserRepository applicationUserRepository;
    private final ApplicationUserService applicationUserService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public ApplicationUserController(ApplicationUserRepository applicationUserRepository, ApplicationUserService applicationUserService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.applicationUserRepository = applicationUserRepository;
        this.applicationUserService = applicationUserService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping( value = "/register", headers = "Accept=application/json", produces = "application/json")
    public ResponseEntity<?> registerUser(@RequestBody ApplicationUser applicationUser) {
        ApplicationUser user = applicationUserRepository.save(applicationUser);
        if (applicationUser != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PostMapping( value = "/signin", headers = "Accept=application/json", produces ="application/json")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        }catch (BadCredentialsException e){
            throw new Exception("Incorrect username and password");
        }

        final UserDetails userDetails = applicationUserService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}