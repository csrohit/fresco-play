package com.fresco.codelab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fresco.codelab.model.CodeLabUser;
import com.fresco.codelab.model.UserPrincipal;
import com.fresco.codelab.repo.CodeLabUserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private CodeLabUserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		CodeLabUser user = repo.findByUsername(username);
		if (user == null)
			throw new UsernameNotFoundException("User 404");
		return new UserPrincipal(user);
	}

}
