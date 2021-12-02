package com.example.project.service;

import com.example.project.Model.ApplicationUser;
import com.example.project.Model.MyUserPrincipal;
import com.example.project.repository.ApplicationUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private static final Logger LOG = LoggerFactory.getLogger(MyUserDetailsService.class);

    @Autowired
    private ApplicationUserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LOG.info("Finding details for {}", username);
        Optional<ApplicationUser> user = repository.findById(username);
        if(user.isPresent()){
            return new MyUserPrincipal(user.get().getUser_name(), user.get().getPassword());
        }
        return null;
    }
}
