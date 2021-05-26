package com.fresco.codelab.CodeLab;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class CodeLabApplicationTests {
    public String generateString() {
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            int index = (int) (AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        return sb.toString();
    }

    static Process process;
    static ProcessBuilder processBuilder;

    @Test
    public void test1_start() throws IOException {
        File f = new File("score");
        if(f.exists())
            f.delete();
        f.createNewFile();
        processBuilder = new ProcessBuilder();
        processBuilder.command("bash", "-c", "cd ../CodeLab-WebSockets && mvn spring-boot:run");
        try {
            process = processBuilder.start();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null && process.isAlive()) {
                if(line.contains("Tomcat started on port(s): 8000"))
                    break;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }    
    }

    public void registerUser(String username) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("fullname", username.split("@")[0]);
        map.add("username", username);
        map.add("password", "abcd");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        try {
            restTemplate.postForObject("http://localhost:8000/register", request, Void.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void unzip(String zipFilePath, String destDir) {
        File dir = new File(destDir);
        if (!dir.exists())
            dir.mkdirs();
        FileInputStream fis;
        byte[] buffer = new byte[1024];
        try {
            fis = new FileInputStream(zipFilePath);
            ZipInputStream zis = new ZipInputStream(fis);
            ZipEntry ze = zis.getNextEntry();
            while (ze != null) {
                String fileName = ze.getName();
                File newFile = new File(destDir + File.separator + fileName);
                System.out.println("Unzipping to " + newFile.getAbsolutePath());
                new File(newFile.getParent()).mkdirs();
                FileOutputStream fos = new FileOutputStream(newFile);
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }
                fos.close();
                zis.closeEntry();
                ze = zis.getNextEntry();
            }
            zis.closeEntry();
            zis.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    public void test2_testing() throws Exception {
        try {
            String username1 = generateString() + "@gmail.com";
            String username2 = generateString() + "@gmail.com";
            registerUser(username1);
            registerUser(username2);
            if (!(new File("chromedriver").exists())) {
                InputStream in = new URL(
                        "https://chromedriver.storage.googleapis.com/78.0.3904.105/chromedriver_linux64.zip")
                                .openStream();
                Files.copy(in, Paths.get("chromedriver_linux64.zip"), StandardCopyOption.REPLACE_EXISTING);
                unzip("chromedriver_linux64.zip", ".");
                Files.delete(Paths.get("chromedriver_linux64.zip"));
                processBuilder = new ProcessBuilder();
                processBuilder.command("bash", "-c", "chmod +x chromedriver");
                process = processBuilder.start();
                while (process.isAlive())
                    Thread.sleep(1000);
            }
            System.setProperty("webdriver.chrome.driver", "chromedriver");
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--start-maximized","--window-size=1920,1080", "--headless", "--disable-gpu", "--ignore-certificate-errors");
            WebDriver driver1 = new ChromeDriver(options);
            driver1.navigate().to("http://localhost:8000/dashboard");
            WebDriver driver2 = new ChromeDriver(options);
            driver2.navigate().to("http://localhost:8000/dashboard");
            driver1.findElement(By.id("username")).sendKeys(username1);
            driver1.findElement(By.id("password")).sendKeys("abcd");
            driver1.findElement(By.xpath("//button")).click();
            driver2.findElement(By.id("username")).sendKeys(username2);
            driver2.findElement(By.id("password")).sendKeys("abcd");
            driver2.findElement(By.xpath("//button")).click();
            driver1.findElement(By.id("receiver-username")).sendKeys(username2);
            driver1.findElement(By.id("send-btn")).click();
            Thread.sleep(5000);
            driver2.findElement(By.id("notification-btn")).click();
            Thread.sleep(1000);
            assert (!driver2.findElement(By.id("notification-panel")).getText().equals(""));
            driver1.quit(); driver2.quit();
        } catch (Exception e) {
            e.printStackTrace();
            assert (false);
        }
    }
    
    @Test
    public void test3_stop() throws Exception {
        if(process != null && process.isAlive()) {
            process.destroy();
        }    
    }
}
