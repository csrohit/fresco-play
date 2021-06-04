package com.fresco.codelab.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.jms.MergeRequest;
@Repository
public interface MergeRequestRepository  extends JpaRepository<MergeRequest, Long>{
	public List<MergeRequest> findAllByReqTo(String username);
	public void deleteByRepoIdAndVersion(Long repoId, Integer version);
}
