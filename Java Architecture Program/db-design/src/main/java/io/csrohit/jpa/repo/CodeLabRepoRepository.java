package io.csrohit.jpa.repo;

import java.util.List;

import io.csrohit.jpa.model.CodeLabRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeLabRepoRepository  extends JpaRepository<CodeLabRepo, Long>{
    List<CodeLabRepo> findByRepoOwnerId(Long userId);
}
