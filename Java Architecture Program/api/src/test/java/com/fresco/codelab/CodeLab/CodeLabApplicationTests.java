package com.fresco.codelab.CodeLab;

import static org.hamcrest.CoreMatchers.hasItem;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fresco.codelab.model.CodeLabRepo;
import com.fresco.codelab.model.CodeLabUser;
import com.fresco.codelab.repo.CodeLabRepoRepository;
import com.fresco.codelab.repo.CodeLabRepoVersionRepository;
import com.fresco.codelab.repo.CodeLabUserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CodeLabApplicationTests {
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	CodeLabUserRepository userRepo;
	@Autowired
	CodeLabRepoRepository repoRepo;
	@Autowired
	CodeLabRepoVersionRepository versionRepo;
	static String name, pass, repoName;
	static Long userId, repoId;

	public String generateString() {
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
		StringBuilder sb = new StringBuilder(5);
		for (int i = 0; i < 5; i++) {
			int index = (int) (AlphaNumericString.length() * Math.random());
			sb.append(AlphaNumericString.charAt(index));
		}
		return sb.toString();
	}

	@Test
	public void test1_getRegisterPage() throws Exception {
		try {
			this.mockMvc.perform(get("/register")).andExpect(status().isOk())
					.andExpect(view().name("registrationpage.jsp"));
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test2_getLoginPage() throws Exception {
		try {
			this.mockMvc.perform(get("/login")).andExpect(status().isOk()).andExpect(view().name("loginpage.jsp"));
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test3_postRegister() throws Exception {
		try {
			name = generateString();
			pass = generateString();
			this.mockMvc
					.perform(post("/register").contentType(MediaType.APPLICATION_FORM_URLENCODED)
							.param("fullname", name).param("username", name + "@gmail.com").param("password", pass))
					.andExpect(status().isOk()).andExpect(view().name("loginpage.jsp"));
			List<CodeLabUser> users = userRepo.findAll();
			assertEquals(users.size(), 1);
			userId = users.get(0).getUserAutoGenId();
			assertEquals(users.get(0).getFullname(), name);
			assertEquals(users.get(0).getUsername(), name + "@gmail.com");
			assertEquals(users.get(0).getPassword(), pass);
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test4_postCreateNewRepo() throws Exception {
		try {
			repoName = generateString();
			this.mockMvc
					.perform(post("/dashboard/createnewrepo").contentType(MediaType.APPLICATION_FORM_URLENCODED)
							.param("repo_name", repoName))
					.andExpect(status().is3xxRedirection()).andExpect(view().name("redirect:/dashboard/"));
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test5_getDashboard() throws Exception {
		try {
			this.mockMvc.perform(get("/dashboard/")).andExpect(status().isOk()).andExpect(view().name("homepage.jsp"))
					.andExpect(model().attribute("myrepos", hasSize(1)))
					.andExpect(model().attribute("myrepos", hasItem(hasProperty("repoName", is(repoName)))));
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test6_getOpenRepo() throws Exception {
		try {
			repoId = repoRepo.findAll().get(0).getRepoAutoGenId();
			this.mockMvc.perform(get("/dashboard/openrepo/" + repoId)).andExpect(status().isOk())
					.andExpect(view().name("repodashboardpage.jsp"))
					.andExpect(model().attribute("repo", hasProperty("repoName", is(repoName))))
					.andExpect(model().attribute("repo", hasProperty("repoAutoGenId", is(repoId))))
					.andExpect(model().attribute("repoOwner", hasProperty("userAutoGenId", is(userId))));
		} catch (Throwable e) {
			System.out.println("test 6 failed");
			e.printStackTrace();
			assert (false);
		}
	}

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Test
	public void test7_postUploadCode() throws Exception {
		try {
			StringBuilder sb = new StringBuilder();
			sb.append("content of text file");
			File f = new File("sample.zip");
			ZipOutputStream out = new ZipOutputStream(new FileOutputStream(f));
			ZipEntry e = new ZipEntry("mytext.txt");
			out.putNextEntry(e);
			byte[] data = sb.toString().getBytes();
			out.write(data, 0, data.length);
			out.closeEntry();
			out.close();
			MockMultipartFile firstFile = new MockMultipartFile("file", "sample.zip", "application/zip",
					new FileInputStream(f));
			MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
			mockMvc.perform(MockMvcRequestBuilders.multipart("/dashboard/uploadcode/" + repoId).file(firstFile))
					.andExpect(status().is3xxRedirection());
			f.delete();
			f = new File("uploads/" + repoId + "-1code/mytext.txt");
			assert (f.exists());
			assertEquals(new BufferedReader(new FileReader(f)).readLine(), sb.toString());
			assertEquals(versionRepo.findAll().size(), 1);
			assertEquals((int) versionRepo.findAll().get(0).getVersion(), 1);
		} catch (Throwable e) {
			System.out.println("test7 failed");
			e.printStackTrace();
			assert (false);
		}
	}

	@Test
	public void test8_getOpenRepoVersion() throws Exception {
		try {
			Map<String, List<String>> repoCode = new TreeMap<String, List<String>>();
			List<String> temp = new ArrayList<String>();
			temp.add(new BufferedReader(new FileReader("uploads/2-1code/mytext.txt")).readLine());
			temp.add(0, String.valueOf(temp.get(0).length()));
			repoCode.put("2-1code/mytext.txt", temp);
			this.mockMvc.perform(get("/dashboard/openrepo/" + repoId + "/version/1")).andExpect(status().isOk())
					.andExpect(view().name("repocodepage.jsp"))
					.andExpect(model().attribute("repo", hasProperty("repoName", is(repoName))))
					.andExpect(model().attribute("repo", hasProperty("repoAutoGenId", is(repoId))))
					.andExpect(model().attribute("repoCode", repoCode));
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test9_postSaveCode() throws Exception {
		try {
			this.mockMvc
					.perform(post("/dashboard/savecode/" + repoId + "/1")
							.contentType(MediaType.APPLICATION_FORM_URLENCODED)
							.param("filename", repoId + "-1code/mytext.txt").param("code", "changed text"))
					.andExpect(status().is3xxRedirection());
			File f = new File("uploads/" + repoId + "-1code/mytext.txt");
			assert (f.exists());
			assertEquals(new BufferedReader(new FileReader(f)).readLine(), "changed text");
		} catch (Throwable e) {
			assert (false);
		}
	}

	@Test
	public void test9_postAddDeveloper() throws Exception {
		try {
			String user2 = generateString();
			String pass2 = generateString();
			CodeLabUser user = new CodeLabUser();
			user.setFullname(user2);
			user.setUsername(user2 + "@gmail.com");
			user.setPassword(pass2);
			userRepo.save(user);
			this.mockMvc.perform(post("/dashboard/adddeveloper/" + repoId)
					.contentType(MediaType.APPLICATION_FORM_URLENCODED).param("developer", user2 + "@gmail.com"))
					.andExpect(status().is3xxRedirection());
			List<CodeLabUser> users = userRepo.findAll();
			for (int i = 0; i < users.size(); i++)
				if (users.get(i).getFullname().contentEquals(user2))
					user = users.get(i);
			assertEquals(user.getRepos().size(), 1);
			assertEquals(((CodeLabRepo) user.getRepos().toArray()[0]).getRepoName(), repoName);
			assertEquals(((CodeLabRepo) user.getRepos().toArray()[0]).getRepoAutoGenId(), repoId);
		} catch (Throwable e) {
			System.out.println("test 9 failed");
			e.printStackTrace();
			assert (false);
		}
	}
}
