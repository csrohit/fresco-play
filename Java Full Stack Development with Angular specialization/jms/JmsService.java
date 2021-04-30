package com.fresco.saga;

import javax.annotation.PostConstruct;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

/*declare JmpTemplate and setReceiveTimeout in init()*/

@Service
public class JmsService {
	@Value("${activemq.brocker-url}")
	private String url;

	@Bean
	public ActiveMQQueue queue(){
		return new ActiveMQQueue("csrohit");
	}

	@Bean
	public ActiveMQConnectionFactory activeMQConnectionFactory(){
		ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory();
		activeMQConnectionFactory.setBrokerURL(url);
		return activeMQConnectionFactory;
	}



	public void sendMessage(String destination, String message) {
		jmsTemplate().convertAndSend(destination, message);
	}

	public Object receiveMessage(String destination) {
		/*write your code and return appropriate object*/
		return jmsTemplate().receiveAndConvert(destination).toString();
	}

	@Bean
	public JmsTemplate jmsTemplate(){
		return new JmsTemplate(activeMQConnectionFactory());
	}
}
