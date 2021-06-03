package com.fresco.codelab.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.model.CodeLabRepo;
import com.fresco.codelab.model.CodeLabRepoVersion;
@Repository
public interface CodeLabRepoVersionRepository  extends JpaRepository<CodeLabRepoVersion, Integer>{
	CodeLabRepoVersion findByVersionAndRepo(Integer version, CodeLabRepo repo);
	CodeLabRepoVersion findByVersionAndRepo_RepoAutoGenId(Integer verison, Long repoAutoGenId);
	CodeLabRepoVersion findByRepo_RepoAutoGenIdAndIsMaster(Long repoId, Boolean isMaster);
	CodeLabRepoVersion findByRepo_RepoAutoGenIdAndVersion(Long repoId, Integer version);
}
