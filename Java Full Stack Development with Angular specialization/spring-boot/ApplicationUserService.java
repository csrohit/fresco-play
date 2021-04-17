package com.example.project.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.example.project.Model.ApplicationUser;
import com.example.project.Model.MyUserDetails;
import com.example.project.repository.ApplicationUserRepository;



@Service
public class ApplicationUserService implements UserDetailsService {
	private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserService(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ApplicationUser> applicationUser = applicationUserRepository.findById(username);
        applicationUser.orElseThrow(() ->new UsernameNotFoundException("User not found"));
        return applicationUser.map(MyUserDetails::new).get();
    }
}

