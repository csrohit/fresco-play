package com.fresco.codelab.CodeLab;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CodeLabApplicationTests {
	@Autowired
	private MockMvc mvc;
	
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
		mvc.perform(get("/register")).andExpect(status().isOk());
		String content = new String(Files.readAllBytes(Paths.get("application.log")));
		assert(content.contains("GET::http://localhost/register::clientIpAddr/127.0.0.1"));
	}
	@Test
	public void test2_getLoginPage() throws Exception {
		mvc.perform(get("/login")).andExpect(status().isOk());
		String content = new String(Files.readAllBytes(Paths.get("application.log")));
		assert(content.contains("GET::http://localhost/login::clientIpAddr/127.0.0.1"));
	}

	@Test
	public void test3_postRegister() throws Exception {
		name = generateString();
		pass = generateString();
		mvc.perform(post("/register").contentType(MediaType.APPLICATION_FORM_URLENCODED)
			.param("fullname", name).param("username", name + "@gmail.com").param("password", pass))
			.andExpect(status().isOk());
		String str = "POST::http://localhost/register::Body::{ fullname:"+name+", username:"+name+"@gmail.com, password:"+pass+",  }clientIpAddr/127.0.0.1";
		str.replace(" ", "").replace(",", "");
		String content = new String(Files.readAllBytes(Paths.get("application.log")));
		content.replace(" ", "").replace(",", "");
		assert(content.contains(str));
	}
	static int count = 0;
	@Test
	public void test4_testFile() throws Exception {
		String content = new String(Files.readAllBytes(Paths.get("application.log"))).replace(" ", "");
		Long linesCount = Files.lines(Paths.get("test.log")).count();
		Files.lines(Paths.get("test.log")).forEach(i -> { if(content.contains(i.replace(" ", ""))) count++; });
		assert(((count/(double)linesCount)*100) > 35);
	}
	
}
