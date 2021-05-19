package com.fresco.codelab;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fresco.codelab.model.CodeLabRepo;
import com.fresco.codelab.model.CodeLabRepoVersion;
import com.fresco.codelab.model.CodeLabUser;

@SpringBootApplication
@Controller
public class CodeLabApplication {
	public static void main(String[] args){
		SpringApplication.run(CodeLabApplication.class, args);
	}
	@GetMapping("/register")
	public String register(Principal principal) throws IOException {
		return principal == null ? "registrationpage" : "redirect:/dashboard/";
	}
	@GetMapping({"/login", "/"})
	public String loginPage(Principal principal) {
		return principal == null ? "loginpage" : "redirect:/dashboard/";
	}
	@PostMapping("/register")
	public String register(String fullname, String username, String password) throws IOException {
		System.out.println("Here ");
		Files.write(Paths.get("score"), (fullname + username + password).getBytes());
		return "loginpage";
	}	
	@GetMapping("/dashboard")
	public ModelAndView dashboard() {		
		ModelAndView mv = new ModelAndView();
		List<CodeLabRepo> repos = new ArrayList<CodeLabRepo>();
		repos.add(new CodeLabRepo(1L, "repo1", 1L, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>()));
		repos.add(new CodeLabRepo(2L, "repo2", 1L, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>()));
		mv.addObject("myrepos", repos);
		repos = new ArrayList<CodeLabRepo>();
		repos.add(new CodeLabRepo(3L, "repo3", 2L, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>()));
		repos.add(new CodeLabRepo(4L, "repo4", 2L, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>()));
		mv.addObject("allrepos", repos);
		mv.setViewName("homepage");
		return mv;
	}
	@PostMapping("/dashboard/createnewrepo")
	public String createNewRepo(@RequestParam String repo_name) throws IOException{
		Files.write(Paths.get("score"), repo_name.getBytes());
		return "redirect:/dashboard/";
	}
	@GetMapping("/dashboard/openrepo/{repoId}")
	public ModelAndView openRepo(@PathVariable Long repoId) {
		ModelAndView mv = new ModelAndView();
		CodeLabRepo repo = new CodeLabRepo(1L, "repo1", 1L, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>());
		List<CodeLabRepoVersion> versions = new ArrayList<CodeLabRepoVersion>();
		versions.add(new CodeLabRepoVersion(1, 1, repo, 1L));
		versions.add(new CodeLabRepoVersion(2, 2, repo, 1L));
		repo.setVersions(versions);
		mv.addObject("repo", repo);
		mv.addObject("repoOwner", new CodeLabUser(1L, "user1", "user1@gmail.com", "pass", new ArrayList<CodeLabRepo>()));
		mv.addObject("developers", new ArrayList<CodeLabUser>());
		mv.addObject("loggedInUser", 1L);
		mv.addObject("loggedInUsername", "user1");
		mv.setViewName("repodashboardpage");
		return mv;
	}
	@PostMapping("/dashboard/uploadcode/{repoId}") 
    public String singleFileUpload(@PathVariable Long repoId, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) throws IOException {
		Files.write(Paths.get("score"), file.getOriginalFilename().getBytes());
		return "redirect:/dashboard/openrepo/" + repoId;
    }
	@GetMapping("/dashboard/openrepo/{repoId}/version/{version}")
	public ModelAndView openRepoVersion(@PathVariable Long repoId, @PathVariable Integer version) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("repo", new CodeLabRepo(1L, "repo1", 1L, new ArrayList<CodeLabUser>(), new ArrayList<CodeLabRepoVersion>()));
		mv.addObject("version", version);
		TreeMap<String, List<String>> repoCode = new TreeMap<String, List<String>>();
		List<String> code = new ArrayList<String>();
		code.add("100");
		code.add("this is sample content");
		repoCode.put("sample.txt", code);
		mv.addObject("repoCode", repoCode);
		mv.setViewName("repocodepage");
		return mv;
	}
	@PostMapping("/dashboard/savecode/{repoId}/{version}")
	public String saveCode(@PathVariable Long repoId, @PathVariable Integer version, String filename, String code) throws IOException {
		Files.write(Paths.get("score"), (filename+code).getBytes());
		System.out.println(Paths.get("score"));
		return "redirect:/dashboard/openrepo/" + repoId + "/version/" + version;
	}
	@PostMapping("/dashboard/adddeveloper/{repoId}")
	public String addDeveloper(@PathVariable Long repoId, String developer) throws IOException {
		Files.write(Paths.get("score"), developer.getBytes());
		return "redirect:/dashboard/openrepo/"+repoId;
	}
}
