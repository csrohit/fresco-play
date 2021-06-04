package io.csrohit.jpa.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import io.csrohit.jpa.model.CodeLabRepo;
import io.csrohit.jpa.model.CodeLabRepoVersion;
import io.csrohit.jpa.model.CodeLabUser;
import io.csrohit.jpa.repo.CodeLabRepoRepository;
import io.csrohit.jpa.repo.CodeLabRepoVersionRepository;
import io.csrohit.jpa.repo.CodeLabUserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class DashboardService {

	@Autowired
	private CodeLabRepoRepository repoRepository;

	@Autowired
	private CodeLabUserRepository userRepository;

	@Autowired
	private CodeLabRepoVersionRepository versionRepository;

	public Long saveRepo(String repo_name, Long userId) {
		CodeLabRepo repo = new CodeLabRepo();
		repo.setRepoName(repo_name);
		repo.setRepoOwnerId(userId);
		return repoRepository.save(repo).getRepoAutoGenId();
	}
	
	public List<CodeLabRepo> getUserOwnedRepos(Long userId) {
		List<CodeLabRepo> repos = repoRepository.findByRepoOwnerId(userId);
		return repos;
	}

	public CodeLabRepo getRepoWithRepoIdAndOwnerId(Long repoId, Long userId) {
		return repoRepository.findById(repoId).get();
	}
	
	public void addRepoToUserName(CodeLabRepo repo, String username, Long ownerId) {
		CodeLabUser user = userRepository.findByUsername(username).get();
		user.addRepo(repo);
		userRepository.save(user);
	}
	
	public Set<CodeLabRepo> getUserDeveloperRepos(Long userId) {
		CodeLabUser user = userRepository.findById(userId).get();
		return user.getRepos();
	}

	public CodeLabRepo getRepoWithRepoIdAndDeveloperId(Long repoId, Long userId) {
		return repoRepository.findById(repoId).get();
	}

	public Integer uploadCode(Long userId, Long repoId) {
		CodeLabRepoVersion version = new CodeLabRepoVersion();
		version.setVersion(1);
		version.setVersionOwnerId(userId);
		version.setRepo(repoRepository.findById(repoId).get());

		return versionRepository.save(version).getId();
	}
	@Transactional
	public CodeLabRepo getRepoWithRepoIdAndUserIdAndVersionId(Long repoId, Long userId, Integer version) {
		CodeLabRepo repo = null;
		try{
			repo = repoRepository.findById(repoId).get();
			repo.setVersions(versionRepository.findAll());
		}catch (Exception e){
			e.printStackTrace();
		}
		return repo;
	}

	public List<CodeLabUser> getAllUsersExcept(Long userId) {
		List<CodeLabUser> users = userRepository.findAll();
		return users.stream().filter(user -> user.getUserAutoGenId() != userId).collect(Collectors.toList());
	}
}
