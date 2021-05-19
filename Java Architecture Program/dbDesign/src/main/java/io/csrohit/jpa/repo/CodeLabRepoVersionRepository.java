package io.csrohit.jpa.repo;

import io.csrohit.jpa.model.CodeLabRepoVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeLabRepoVersionRepository  extends JpaRepository<CodeLabRepoVersion, Integer>{
}
