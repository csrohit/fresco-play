package com.fresco.codelab.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.model.CodeLabRepo;
@Repository
public interface CodeLabRepoRepository  extends JpaRepository<CodeLabRepo, Long>{

}
