package com.fresco.codelab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@SpringBootApplication
@Controller
public class CodeLabApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodeLabApplication.class, args);
	}
}
