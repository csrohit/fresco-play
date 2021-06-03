package com.fresco.codelab.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.model.CodeLabRepo;
@Repository
public interface CodeLabRepoRepository  extends JpaRepository<CodeLabRepo, Long>{
	public List<CodeLabRepo> findAllByRepoOwnerId(Long repoOwnerId);
	public CodeLabRepo findByRepoAutoGenIdAndRepoOwnerId(Long repoId, Long repoOwnerId);
	public CodeLabRepo findByRepoAutoGenIdAndRepoDevelopersUserAutoGenId(Long repoOwnerId, Long userId);
	public CodeLabRepo findByRepoAutoGenIdAndRepoOwnerIdAndVersionsVersion(Long repoId, Long userId, Integer version);
	public CodeLabRepo findByRepoAutoGenIdAndRepoDevelopersUserAutoGenIdAndVersionsVersion(Long repoId, Long userId,
			Integer version);
}
