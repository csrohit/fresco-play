package com.fresco.codelab.controller;

import com.fresco.codelab.model.CodeLabRepo;
import com.fresco.codelab.model.CodeLabRepoVersion;
import com.fresco.codelab.model.CodeLabUser;
import com.fresco.codelab.repo.CodeLabRepoRepository;
import com.fresco.codelab.repo.CodeLabRepoVersionRepository;
import com.fresco.codelab.repo.CodeLabUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {
    @Autowired
    private CodeLabRepoRepository repoRepository;

    @Autowired
    private CodeLabUserRepository userRepository;

    @Autowired
    private CodeLabRepoVersionRepository versionRepository;


    @GetMapping("/")
    public ModelAndView dashboard() {
        ModelAndView mv = new ModelAndView();
        List<CodeLabRepo> repos = repoRepository.findAll();

        mv.addObject("myrepos", repos);
        mv.setViewName("homepage.jsp");
        return mv;
    }

    @PostMapping("/createnewrepo")
    public String createRepo(String repo_name) {
        CodeLabRepo repo = new CodeLabRepo();
        repo.setRepoName(repo_name);
        repoRepository.save(repo);
        return "redirect:/dashboard/";
    }

    @GetMapping("/openrepo/{repoId}")
    public ModelAndView openRepo(@PathVariable Long repoId) {
        ModelAndView mv = new ModelAndView();
        CodeLabRepo repo = repoRepository.findById(repoId).get();
        CodeLabUser user = userRepository.findAll().get(0);

        mv.addObject("repo", repo);
        mv.addObject("repoOwner", user);
        mv.addObject("developers", new ArrayList<CodeLabUser>());
        mv.addObject("loggedInUser", 1L);
        mv.addObject("loggedInUsername", "user1");
        mv.setViewName("repodashboardpage.jsp");
        return mv;
    }

    @PostMapping("/uploadcode/{repoId}")
    public String uploadCode(@PathVariable long repoId, @RequestPart MultipartFile file) {
        try {
            File dir = new File("uploads/" + repoId + "-1code/");
            if (!dir.exists()) {
                dir.mkdirs();
            }

            File convertedFile = new File("uploads/" + repoId + "-1code/" + file.getOriginalFilename());
            try (FileOutputStream outputStream = new FileOutputStream(convertedFile)) {
                outputStream.write(file.getBytes());
            }


            FileInputStream fis;
            byte[] buffer = new byte[1024];

            fis = new FileInputStream(convertedFile);
            ZipInputStream zis = new ZipInputStream(fis);
            ZipEntry ze = zis.getNextEntry();
            while (ze != null) {
                String fileName = ze.getName();
                File newFile = new File(dir + File.separator + fileName);
                System.out.println("Unzipping to " + newFile.getAbsolutePath());
                //create directories for sub directories in zip
                new File(newFile.getParent()).mkdirs();
                FileOutputStream fos = new FileOutputStream(newFile);
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }
                fos.close();
                //close this ZipEntry
                zis.closeEntry();
                ze = zis.getNextEntry();
            }
            //close last ZipEntry
            zis.closeEntry();
            zis.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        CodeLabRepoVersion version = new CodeLabRepoVersion();
        version.setRepo(repoRepository.findById(repoId).get());
        version.setVersion(1);
        versionRepository.save(version);
        return "redirect:/dashboard/";
    }

    @GetMapping("/openrepo/{repoId}/version/{versionNo}")
    public ModelAndView openRepoVersion(@PathVariable Long repoId, @PathVariable Integer versionNo) throws IOException {
        ModelAndView mv = new ModelAndView();
        CodeLabRepoVersion version = versionRepository.findByVersion(versionNo);
        CodeLabRepo repo = repoRepository.findById(repoId).get();

        mv.addObject("repo", repo);
        mv.addObject("version", version);
        Map<String, List<String>> repoCode = new TreeMap<String, List<String>>();
        List<String> temp = new ArrayList<String>();
        temp.add(new BufferedReader(new FileReader("uploads/2-1code/mytext.txt")).readLine());
        temp.add(0, String.valueOf(temp.get(0).length()));
        repoCode.put("2-1code/mytext.txt", temp);
        mv.addObject("repoCode", repoCode);
        mv.setViewName("repocodepage.jsp");
        return mv;
    }


    @PostMapping("/adddeveloper/{repoId}")
    public String addDeveloper(@PathVariable long repoId, String developer) {
        CodeLabUser user = userRepository.findByUsername(developer).get();
        CodeLabRepo repo = repoRepository.findById(repoId).get();
        user.getRepos().add(repo);
        userRepository.save(user);

        return "redirect:/dashboard/";
    }
    @PostMapping("/savecode/{repoId}/{version}")
    public String saveCode(@PathVariable Long repoId, @PathVariable Integer version, String filename, String code) throws IOException {
        File f = new File("uploads/" + repoId + "-1code/mytext.txt");
        try(FileOutputStream out = new FileOutputStream(f)){
            out.write(code.getBytes(StandardCharsets.UTF_8));
        }
        return "redirect:/dashboard/openrepo/" + repoId + "/version/" + version;
    }
}
