package com.fresco.codelab.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.model.CodeLabUser;

@Repository
public interface CodeLabUserRepository extends JpaRepository<CodeLabUser, Long>{
	CodeLabUser findByUsername(String username);
	public List<CodeLabUser> findAllByUserAutoGenIdIsNot(Long userId);
	CodeLabUser findByUsernameAndUserAutoGenIdIsNot(String username, Long ownerId);
}
