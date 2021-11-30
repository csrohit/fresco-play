package com.example.project.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.Model.ApplicationUser;
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


	@PostMapping( value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> registerUser(@RequestBody ApplicationUser applicationUser) {
		ApplicationUser user = applicationUserRepository.save(applicationUser);
		if (applicationUser != null) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@PostMapping( value = "/signin", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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
