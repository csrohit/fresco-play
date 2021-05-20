package com.fresco.codelab.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.model.CodeLabUser;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodeLabUserRepository extends JpaRepository<CodeLabUser, Long>{

    Optional<CodeLabUser> findByUsername(String developer);
}
