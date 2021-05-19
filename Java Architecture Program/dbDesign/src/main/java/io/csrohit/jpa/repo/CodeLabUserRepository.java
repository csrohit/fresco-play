package io.csrohit.jpa.repo;

import java.util.List;
import java.util.Optional;

import io.csrohit.jpa.model.CodeLabUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CodeLabUserRepository extends JpaRepository<CodeLabUser, Long>{
    Optional<CodeLabUser> findByUsername(String username);

//    List<CodeLabUser> findBy
}
