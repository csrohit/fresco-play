package com.fresco.codelab;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CodeLabApplication {
	private static final Logger LOG = LoggerFactory.getLogger(CodeLabApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(CodeLabApplication.class, args);
		LOG.info("Starting app using log statement");
	}

}
