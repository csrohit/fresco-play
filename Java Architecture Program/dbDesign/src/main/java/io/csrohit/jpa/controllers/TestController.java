package io.csrohit.jpa.controllers;

import io.csrohit.jpa.model.CodeLabRepo;
import io.csrohit.jpa.model.CodeLabRepoVersion;
import io.csrohit.jpa.model.CodeLabUser;
import io.csrohit.jpa.repo.CodeLabRepoRepository;
import io.csrohit.jpa.repo.CodeLabRepoVersionRepository;
import io.csrohit.jpa.repo.CodeLabUserRepository;
import io.csrohit.jpa.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TestController {

    @Autowired
    CodeLabUserRepository userRepository;
    @Autowired
    CodeLabRepoRepository repoRepository;
    @Autowired
    private CodeLabRepoVersionRepository versionRepository;


    @Autowired
    DashboardService dashboardService;
    @PostMapping("user")
    public long createUser(@RequestBody CodeLabUser user){
        return userRepository.save(user).getUserAutoGenId();
    }

    @GetMapping("/users")
    public List<CodeLabUser> getUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/repos")
    public List<CodeLabRepo> getRepos(){
        return repoRepository.findAll();
    }

    @PostMapping("/repo")
    public CodeLabRepo createRepo(@RequestBody CodeLabRepo repo){
        return repoRepository.save(repo);
    }

    @GetMapping("/test3")
    public List<CodeLabRepo> getUserOwnedRepos(@RequestParam long userId){
        return dashboardService.getUserOwnedRepos(userId);
    }

    @PutMapping("test5/{username}/{repoId}")
    public CodeLabUser addRepoToUsername(@PathVariable String username, @PathVariable long repoId){
        CodeLabUser user = userRepository.findByUsername(username).get();
        CodeLabRepo repo = repoRepository.findById(repoId).get();
        user.addRepo(repo);
        CodeLabUser saved = userRepository.save(user);
        return saved;
    }

    @PutMapping("test7/{repoId}/{userId}")
    public CodeLabRepo uploadCode(@PathVariable long repoId, @PathVariable long userId){
//        Integer versionId = dashboardService.uploadCode(userId, repoId);
        CodeLabRepo repo = dashboardService.getRepoWithRepoIdAndUserIdAndVersionId(repoId, userId, 1);

return repo;
    }

    @GetMapping("/versions")
    public List<CodeLabRepoVersion> getVersions(){
        return versionRepository.findAll();
    }

}
