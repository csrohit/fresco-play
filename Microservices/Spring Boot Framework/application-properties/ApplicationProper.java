package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Value;

@SpringBootApplication
@RestController
public class ApplicationProper {

    @Value("${fresco-course}")
    private String name;

    public static void main(String[] args) {
        SpringApplication.run(ApplicationProper.class, args);
    }
    @RequestMapping("/")
    public String name() {
        System.out.println(name);
        return name;
    }
}
