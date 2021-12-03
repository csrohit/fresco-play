package com.fresco.saga;

import static org.junit.Assert.assertEquals;

import java.io.File;
import java.util.Random;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.Destination;
import javax.jms.MessageConsumer;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class SpringSagaApplicationTests {

	public String generateString(Random random) {
		String candidateChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		candidateChars.charAt(random.nextInt(candidateChars.length()));
		String randStr = "";
		while (randStr.length() < 8)
			randStr += candidateChars.charAt(random.nextInt(candidateChars.length()));
		return randStr;
	}

	@Test
	public void test1() {
		try {
			FileUtils.deleteDirectory(new File("activemq-data"));
			Random r = new Random();
			String dest = generateString(r), body = generateString(r);
			ConnectionFactory connectionFactory = new ActiveMQConnectionFactory("tcp://localhost:61616");
			Connection connection = connectionFactory.createConnection();
			connection.start();
			Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
			Destination destination = session.createQueue(dest);
			MessageProducer producer = session.createProducer(destination);
			TextMessage sentMessage = session.createTextMessage(body);
			producer.send(sentMessage);
			MessageConsumer consumer = session.createConsumer(destination);
			TextMessage receivedMessage = (TextMessage) consumer.receive();
			assertEquals(receivedMessage.getText(), body);
			connection.stop();
		} catch (Exception e) {
			e.printStackTrace();
			assert (false);
		}
	}

}
