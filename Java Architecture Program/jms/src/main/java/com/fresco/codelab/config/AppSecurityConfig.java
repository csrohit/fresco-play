package com.fresco.codelab.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fresco.codelab.repo.CodeLabUserRepository;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public AuthenticationProvider authProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(new BCryptPasswordEncoder());
		return provider;
	}
	
	@Autowired
	CodeLabUserRepository repo;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.headers().disable().cors();
		http.csrf().disable().authorizeRequests().antMatchers("/js/**", "/css/**", "/register", "/h2/**").permitAll()
		.anyRequest().authenticated();
		super.configure(http);
		
//		repo.save(new CodeLabUser("Jack", "jack@gmail.com", new BCryptPasswordEncoder().encode("abc"), null));
//		repo.save(new CodeLabUser("Bob", "bob@gmail.com", new BCryptPasswordEncoder().encode("abc"), null));
	}
	
	
}
