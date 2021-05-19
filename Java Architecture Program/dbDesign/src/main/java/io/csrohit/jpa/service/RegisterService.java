package io.csrohit.jpa.service;

import io.csrohit.jpa.model.CodeLabUser;
import io.csrohit.jpa.repo.CodeLabUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
	@Autowired
	CodeLabUserRepository userRepository;
	public Long registerUser(String fullname, String username, String password) {
		CodeLabUser user = new CodeLabUser();
		user.setUsername(username);
		user.setFullname(fullname);
		user.setPassword(password);
		return userRepository.save(user).getUserAutoGenId();
	}

}
