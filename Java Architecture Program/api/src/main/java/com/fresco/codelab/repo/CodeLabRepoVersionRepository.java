package com.fresco.codelab.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fresco.codelab.model.CodeLabRepoVersion;
@Repository
public interface CodeLabRepoVersionRepository  extends JpaRepository<CodeLabRepoVersion, Integer>{
    public CodeLabRepoVersion findByVersion(Integer version);
}
