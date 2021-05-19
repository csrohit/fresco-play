package com.fresco.codelab.CodeLab;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlInput;
import com.gargoylesoftware.htmlunit.html.HtmlLink;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import com.gargoylesoftware.htmlunit.html.HtmlSubmitInput;


@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CodeLabApplicationTests {
	public String generateString() {
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz"; 
		StringBuilder sb = new StringBuilder(10); 
		for (int i = 0; i < 10; i++) { 
			int index = (int)(AlphaNumericString.length() * Math.random()); 
			sb.append(AlphaNumericString.charAt(index)); 
		}
		return sb.toString(); 
	}
	static Process process;
	static ProcessBuilder processBuilder;

//	@Test
//	public void test1_start() throws IOException {
//		File f = new File("score");
//		if(f.exists())
//			f.delete();
//		f.createNewFile();
//		processBuilder = new ProcessBuilder();
//		processBuilder.command("bash", "-c", "mvn spring-boot:run");
//		try {
//			process = processBuilder.start();
//			BufferedReader reader = new BufferedReader(
//					new InputStreamReader(process.getInputStream()));
//			String line;
//			while ((line = reader.readLine()) != null && process.isAlive()) {
//				if(line.contains("Tomcat started on port(s): 8000"))
//					break;
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		}	
//	}
	@Test
	public void test2_register() {
		try (final WebClient webClient = new WebClient()) {
	        final HtmlPage page = webClient.getPage("http://localhost:8000/register");
	        String fullname = generateString();
	        String password = generateString();
	        HtmlInput ele = (HtmlInput) page.getByXPath("//input[@name='fullname']").get(0);
	        ele.setValueAttribute(fullname);
	        ele = (HtmlInput) page.getByXPath("//input[@name='username']").get(0);
	        ele.setValueAttribute(fullname + "@gmail.com");
	        ele = (HtmlInput) page.getByXPath("//input[@name='password']").get(0);
	        ele.setValueAttribute(password);
	        ele = (HtmlSubmitInput) page.getByXPath("//input[@name='submit']").get(0);
	        ele.click();
	        String content = String.join("", Files.readAllLines(Paths.get("score")));
	        assert(content.contains(fullname));
	        assert(content.contains(fullname+"@gmail.com"));
	        assert(content.contains(password));
	    }catch(Exception e) {e.printStackTrace();assert(false);}
	}
	@Test
	public void test3_login() {
		try (final WebClient webClient = new WebClient()) {
	        final HtmlPage page = webClient.getPage("http://localhost:8000/login");
	        HtmlInput ele = (HtmlInput) page.getByXPath("//input[@name='username']").get(0);
	        assert(ele != null);
	        ele = (HtmlInput) page.getByXPath("//input[@name='password']").get(0);
	        assert(ele != null);
	        ele = (HtmlInput) page.getByXPath("//input[@name='submit']").get(0);
	        assert(ele != null);
	    }catch(Exception e) {e.printStackTrace();assert(false);}
	}
	@Test
	public void test4_homepage() {
		try (final WebClient webClient = new WebClient()) {
	        final HtmlPage page = webClient.getPage("http://localhost:8000/dashboard");
	        for(int i = 1; i < 5; i++)
	        	assert(page.asXml().contains("repo" + i));
	    }catch(Exception e) {e.printStackTrace();assert(false);}
	}
	@Test
	public void test5_createNewRepo() {
		try (final WebClient webClient = new WebClient()) {
	        final HtmlPage page = webClient.getPage("http://localhost:8000/dashboard");
	        for( Object obj : page.getByXPath("//*")) {
	        	HtmlElement html = (HtmlElement) obj;
	        	html.removeAttribute("style");
	        	if(html instanceof HtmlLink)
	        		html.remove();
	        }
	        HtmlInput ele = (HtmlInput) page.getByXPath("//input[@name='repo_name']").get(0);
	        String repo_name = generateString();
	        ele.setValueAttribute(repo_name);
	        ele = (HtmlSubmitInput) page.getByXPath("//input[@name='create_repo_btn']").get(0);
	        ele.click();
	        assert(String.join("", Files.readAllLines(Paths.get("score"))).contains(repo_name));
	    }catch(Exception e) {e.printStackTrace();assert(false);}
	}
	@Test
	public void test6_openRepo() {
		try (final WebClient webClient = new WebClient()) {
	        final HtmlPage page = webClient.getPage("http://localhost:8000/dashboard/openrepo/1");
	        assert(page.asXml().contains("repo1"));
	        assert(page.asXml().contains("user1"));
	        assert(page.asXml().contains("version 1"));
	        assert(page.asXml().contains("version 2"));
	        for( Object obj : page.getByXPath("//*")) {
	        	HtmlElement html = (HtmlElement) obj;
	        	html.removeAttribute("style");
	        	if(html instanceof HtmlLink)
	        		html.remove();
	        }
	        HtmlInput ele = (HtmlInput) page.getByXPath("//input[@name='file']").get(0);
	        String file_name = generateString();
	        ele.setValueAttribute(file_name);
	        ele = (HtmlSubmitInput) page.getByXPath("//input[@name='file_submit_btn']").get(0);
	        ele.click();
	        assert(String.join("", Files.readAllLines(Paths.get("score"))).contains(file_name));
	        
	        ele = (HtmlInput) page.getByXPath("//input[@name='developer']").get(0);
	        file_name = generateString();
	        ele.setValueAttribute(file_name);
	        ele = (HtmlSubmitInput) page.getByXPath("//input[@name='add_developer_btn']").get(0);
	        ele.click();
	        assert(String.join("", Files.readAllLines(Paths.get("score"))).contains(file_name));
	    }catch(Exception e) {e.printStackTrace();assert(false);}
	}
	@Test
	public void test7_openRepoCode() {
		try (final WebClient webClient = new WebClient()) {
	        final HtmlPage page = webClient.getPage("http://localhost:8000/dashboard/openrepo/1/version/1");
	        assert(page.asXml().contains("sample.txt"));
	        assert(!page.asText().contains("this is sample content"));
	        HtmlElement ele = (HtmlElement) page.getByXPath("//*[contains(text(),'sample.txt')]").get(0);
	        ele.click();
	        assert(page.asText().contains("this is sample content"));
	        ele = (HtmlElement) page.getByXPath("//*[contains(text(),'this is sample content')]").get(0);
	        String content = generateString();
	        ele.setTextContent(content);
	        ele = (HtmlInput) page.getByXPath("//input[@type='submit']").get(0);
	        ele.click();
	
	        assert(String.join("", Files.readAllLines(Paths.get("score"))).contains("sample.txt"+content));
	    }catch(Exception e) {e.printStackTrace();assert(false);}
	}
	@Test
	public void test9_end() throws InterruptedException {
		if(process != null && process.isAlive()) {
			process.destroy();
		}
		File f = new File("score");
		if(f.exists())
			f.delete();
	}
}
