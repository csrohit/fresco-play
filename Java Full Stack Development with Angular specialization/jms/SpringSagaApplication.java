package com.fresco.saga;

import org.apache.activemq.broker.BrokerService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringSagaApplication {
	@Value("${activemq.brocker-url}")
	private String url;
	public static void main(String[] args){
		SpringApplication.run(SpringSagaApplication.class, args);
	}
	@Bean
	public BrokerService broker() throws Exception {
		/*write your code and return appropriate object*/
		BrokerService brokerService = new BrokerService();
		brokerService.addConnector(url);
		brokerService.start();
		return brokerService;
	}
}
