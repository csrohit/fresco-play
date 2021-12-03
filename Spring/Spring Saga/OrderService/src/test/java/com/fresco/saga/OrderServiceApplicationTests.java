package com.fresco.saga;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.sql.Date;
import java.util.Random;

import org.apache.activemq.junit.EmbeddedActiveMQBroker;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.json.JSONObject;
import org.junit.Rule;
import org.junit.jupiter.api.MethodOrderer.Alphanumeric;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fresco.saga.models.OrderStatus;
import com.fresco.saga.models.Orders;
import com.fresco.saga.repo.OrderRepository;

@TestMethodOrder(Alphanumeric.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class OrderServiceApplicationTests {
	@LocalServerPort
	int port;
	@Autowired
	private MockMvc mvc;
	@Autowired
	OrderRepository orderRepo;
	@Rule
	public EmbeddedActiveMQBroker broker = new EmbeddedActiveMQBroker(
			"broker:(tcp://localhost:61616?wireFormat.maxInactivityDurationInitalDelay=30000&broker.persistent=false)");

	public String generateString(Random random) {
		String candidateChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		candidateChars.charAt(random.nextInt(candidateChars.length()));
		String randStr = "";
		while (randStr.length() < 8)
			randStr += candidateChars.charAt(random.nextInt(candidateChars.length()));
		return randStr;
	}

	public Date generateDate(Random rnd) {
		return new Date(-946771200000L + (Math.abs(rnd.nextLong()) % (70L * 365 * 24 * 60 * 60 * 1000)));
	}

	static int orderSize, orderId;
	static Date orderDate;
	static double orderPrice;
	static String orderOwner;

	@Autowired
	JmsTemplate jmsTemplate;

	@Test
	public void test1_createOrder() throws Exception {
		try {
			FileUtils.deleteDirectory(new File("activemq-data"));
			broker.start();
			Random r = new Random();
			orderSize = r.nextInt(1000);
			orderDate = generateDate(r);
			orderPrice = 1 + (1000 - 1) * r.nextDouble();
			orderOwner = generateString(r);
			JSONObject json = new JSONObject();
			json.put("orderSize", orderSize).put("orderDate", orderDate).put("orderPrice", orderPrice).put("orderOwner",
					orderOwner);
			MvcResult mvcResult = mvc.perform(post("http://localhost:" + port + "/create_order")
					.contentType(MediaType.APPLICATION_JSON).content(json.toString())).andExpect(status().isCreated())
					.andReturn();
			json = new JSONObject(mvcResult.getResponse().getContentAsString());
			assertEquals(orderSize, json.getInt("orderSize"));
			assertEquals(orderDate.toString(), json.getString("orderDate"));
			assertEquals(String.valueOf(orderPrice), json.getString("orderPrice"));
			assertEquals(orderOwner, json.getString("orderOwner"));
			assertEquals(OrderStatus.PAYMENT_PENDING.toString(), json.getString("orderStatus"));
			orderId = json.getInt("orderId");
			Orders order = orderRepo.findById(orderId).get();
			assertEquals(orderSize, order.getOrderSize());
			assertEquals(orderDate.toString(), order.getOrderDate().toString());
			assertEquals(String.valueOf(orderPrice), String.valueOf(order.getOrderPrice()));
			assertEquals(orderOwner, order.getOrderOwner());
			assertEquals(OrderStatus.PAYMENT_PENDING, order.getOrderStatus());
			jmsTemplate.getConnectionFactory().createConnection().start();
			jmsTemplate.setReceiveTimeout(10000);
			json = new JSONObject(jmsTemplate.receiveAndConvert(OrderStatus.PAYMENT_PENDING.toString()).toString());
			assertEquals(orderId, json.getInt("orderId"));
			assertEquals(orderSize, json.getInt("orderSize"));
			assertEquals(orderDate.toString(), json.getString("orderDate"));
			assertEquals(String.valueOf(orderPrice), json.getString("orderPrice"));
			assertEquals(orderOwner, json.getString("orderOwner"));
			assertEquals(OrderStatus.PAYMENT_PENDING.toString(), json.getString("orderStatus"));
			json = new JSONObject();
			json.put("orderId", orderId);
			json.put("paymentId", r.nextInt());
			json.put("orderPrice", orderPrice);
			json.put("orderStatus", "PAYMENT_SUCCESSFUL");
			jmsTemplate.convertAndSend("PAYMENT_SUCCESSFUL", json.toString());
			Thread.sleep(2000);
			order = orderRepo.findById(orderId).get();
			assertEquals(OrderStatus.ORDER_SUCCESSFULLY_PLACED, order.getOrderStatus());
			mvc.perform(get("http://localhost:" + port + "/finish_order/" + orderId)).andExpect(status().isOk());
			json = new JSONObject(jmsTemplate.receiveAndConvert(OrderStatus.ORDER_DELIVERED.toString()).toString());
			assertEquals(orderId, json.getInt("orderId"));
			assertEquals(OrderStatus.ORDER_DELIVERED.toString(), json.getString("orderStatus"));
			order = orderRepo.findById(orderId).get();
			assertEquals(OrderStatus.ORDER_DELIVERED, order.getOrderStatus());
			mvc.perform(get("http://localhost:" + port + "/cancel_order/" + orderId)).andExpect(status().isOk());
			json = new JSONObject(jmsTemplate.receiveAndConvert(OrderStatus.ORDER_CANCELLED.toString()).toString());
			assertEquals(orderId, json.getInt("orderId"));
			assertEquals(OrderStatus.ORDER_CANCELLED.toString(), json.getString("orderStatus"));
			order = orderRepo.findById(orderId).get();
			assertEquals(OrderStatus.ORDER_CANCELLED, order.getOrderStatus());
			broker.stop();
		} catch (Exception e) {
			e.printStackTrace();
			assert (false);
		}
	}

}
