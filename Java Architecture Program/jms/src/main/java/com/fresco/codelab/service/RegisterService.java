package com.fresco.codelab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fresco.codelab.jms.MergeRequest;
import com.fresco.codelab.model.CodeLabRepoVersion;
import com.fresco.codelab.model.CodeLabUser;
import com.fresco.codelab.repo.CodeLabRepoVersionRepository;
import com.fresco.codelab.repo.CodeLabUserRepository;
import com.fresco.codelab.repo.MergeRequestRepository;
@Service
public class RegisterService {
	@Autowired
	private CodeLabUserRepository repo;
	@Autowired
	private MergeRequestRepository mrRepo;
	@Autowired
	CodeLabRepoVersionRepository versionRepo;
	
	public void registerUser(String fullname, String username, String password) {
		repo.save( new CodeLabUser(fullname, username, 
				new BCryptPasswordEncoder().encode(password), null));
	}

	public void saveMergeRequest(MergeRequest mr) {
		if(!mr.getReqTo().equals(mr.getReqFrom())) {
			CodeLabRepoVersion repoVersion = versionRepo.findByVersionAndRepo_RepoAutoGenId(
					mr.getVersion(), mr.getRepoId());
//			repoVersion.setIsMrPending(true);
//			versionRepo.save(repoVersion);
			mrRepo.save(mr);
		}
	}
}
