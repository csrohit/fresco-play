package com.fresco.codelab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fresco.codelab.jms.MergeRequest;
import com.fresco.codelab.model.CodeLabRepo;
import com.fresco.codelab.model.UserPrincipal;
import com.fresco.codelab.service.DashboardService;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {
	@Autowired
	DashboardService dashboardService;


	@GetMapping("")
	public ModelAndView dashboard() {		
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		ModelAndView mv = new ModelAndView();
		mv.addObject("myrepos", dashboardService.getUserOwnedRepos(userId));
		mv.addObject("allrepos", dashboardService.getUserDeveloperRepos(userId));
		mv.setViewName("homepage");
		return mv;
	}
	
	
	@PostMapping("/createnewrepo")
	public String createNewRepo(@RequestParam String repo_name){
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		dashboardService.saveRepo(repo_name, userId);
		return "redirect:/dashboard/";
	}
	
	@GetMapping("/openrepo/{repoId}")
	public ModelAndView openRepo(@PathVariable Long repoId) {
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		String username = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUsername();
		ModelAndView mv = new ModelAndView();
		CodeLabRepo repo = dashboardService.getRepoWithRepoIdAndUserId(repoId, userId);
		if(repo == null)
			return dashboard();
		mv.addObject("repo", repo);
		mv.addObject("repoOwner", dashboardService.getUserFromId(repo.getRepoOwnerId()));
		mv.addObject("developers", dashboardService.getAllUsersExcept(userId));
		mv.addObject("loggedInUser", userId);
		mv.addObject("loggedInUsername", username);
		mv.setViewName("repodashboardpage");
		return mv;
	}
	
	@PostMapping("/uploadcode/{repoId}") 
    public String singleFileUpload(@PathVariable Long repoId, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		if(dashboardService.getRepoWithRepoIdAndUserId(repoId, userId) == null)
			return "redirect:/dashboard";
		dashboardService.uploadCode(userId, repoId, file);
        return "redirect:/dashboard/openrepo/" + repoId;
    }

	@GetMapping("/openrepo/{repoId}/version/{version}")
	public ModelAndView openRepoVersion(@PathVariable Long repoId, @PathVariable Integer version) {
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		CodeLabRepo repo = dashboardService.getRepoWithRepoIdAndUserIdAndVersionId(repoId, userId, version);
		if(repo == null)
			return dashboard();
		ModelAndView mv = new ModelAndView();
		mv.addObject("repo", repo);
		mv.addObject("version", version);
		mv.addObject("repoCode", dashboardService.getFiles("uploads/" + repoId + "-" + version + "code"));
		mv.setViewName("repocodepage");
		return mv;
	}
	
	@PostMapping("/savecode/{repoId}/{version}")
	public String saveCode(@PathVariable Long repoId, @PathVariable Integer version, String filename, String code) {
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		CodeLabRepo repo = dashboardService.getRepoWithRepoIdAndUserId(repoId, userId);
		if(repo == null)
			return "redirect:/dashboard";
		dashboardService.saveCode(repoId, version, filename, code);
		return "redirect:/dashboard/openrepo/" + repoId + "/version/" + version;
	}

	@PostMapping("/adddeveloper/{repoId}")
	public String addDeveloper(@PathVariable Long repoId, String developer) {
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		CodeLabRepo repo = dashboardService.getRepoWithRepoIdAndOwnerId(repoId, userId);
		if(repo == null)
			return "redirect:/dashboard";
		dashboardService.addRepoToUserName(repo, developer, userId);
		return "redirect:/dashboard/openrepo/"+repoId;
	}
	
	@GetMapping("/getmergerequests")
	@ResponseBody
	public List<MergeRequest> getMergeRequests() {
		Long userId = ((UserPrincipal)SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal()).getUserId();
		return dashboardService.getMergeRequests(userId);
	}
	@GetMapping("/mraction/{repoId}/{version}/{flag}")
	@ResponseBody
	public boolean MRAction(@PathVariable Long repoId, @PathVariable Integer version,
			@PathVariable Integer flag) {
		return dashboardService.MRAction(repoId, version, flag);
	}
	
}
