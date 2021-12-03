package com.fresco.saga;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
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

import com.fresco.saga.models.Payment;
import com.fresco.saga.models.PaymentStatus;
import com.fresco.saga.repo.PaymentRepository;

@TestMethodOrder(Alphanumeric.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class PaymentServiceApplicationTests {
	@LocalServerPort
	int port;
	@Autowired
	private MockMvc mvc;
	@Autowired
	PaymentRepository paymentRepo;
	@Rule
	public EmbeddedActiveMQBroker broker = new EmbeddedActiveMQBroker(
			"broker:(tcp://localhost:61616?wireFormat.maxInactivityDurationInitalDelay=30000&broker.persistent=false)");
	@Autowired
	JmsTemplate jmsTemplate;

	@Test
	public void test1_createPayment() throws Exception {
		try {
			FileUtils.deleteDirectory(new File("activemq-data"));
			Random r = new Random();
			double orderPrice = 1 + (999 - 1) * r.nextDouble();
			int orderId = r.nextInt(100);
			broker.start();
			jmsTemplate.getConnectionFactory().createConnection().start();
			jmsTemplate.setReceiveTimeout(10000);
			JSONObject json = new JSONObject();
			json.put("orderId", orderId);
			json.put("orderPrice", orderPrice);
			json.put("orderStatus", PaymentStatus.PAYMENT_PENDING.toString());
			jmsTemplate.convertAndSend(PaymentStatus.PAYMENT_PENDING.toString(), json.toString());
			Thread.sleep(2000);
			Payment payment = paymentRepo.findAllByOrderId(orderId).get(0);
			assertEquals(String.valueOf(orderPrice), String.valueOf(payment.getOrderPrice()));
			assertEquals(PaymentStatus.PAYMENT_PENDING, payment.getPaymentStatus());
			int paymentId = payment.getPaymentId();
			json = new JSONObject();
			json.put("orderId", orderId);
			MvcResult mvcResult = mvc.perform(post("http://localhost:" + port + "/make_payment/")
					.contentType(MediaType.APPLICATION_JSON).content(json.toString())).andExpect(status().isOk())
					.andReturn();
			json = new JSONObject(mvcResult.getResponse().getContentAsString());
			assertEquals(String.valueOf(orderPrice), String.valueOf(payment.getOrderPrice()));
			assertEquals(PaymentStatus.PAYMENT_PENDING, payment.getPaymentStatus());
			assertEquals(orderId, payment.getOrderId());
			json = new JSONObject(
					jmsTemplate.receiveAndConvert(PaymentStatus.PAYMENT_SUCCESSFUL.toString()).toString());
			assertEquals(String.valueOf(orderPrice), String.valueOf(json.getDouble("orderPrice")));
			assertEquals(PaymentStatus.PAYMENT_SUCCESSFUL.toString(), json.getString("paymentStatus"));
			assertEquals(orderId, json.getInt("orderId"));
			assertEquals(paymentId, json.getInt("paymentId"));
			json = new JSONObject().put("orderId", orderId).put("orderStatus", "ORDER_CANCELLED");
			jmsTemplate.convertAndSend("ORDER_CANCELLED", json.toString());
			Thread.sleep(2000);
			payment = paymentRepo.findById(paymentId).get();
			assertEquals(String.valueOf(orderPrice), String.valueOf(payment.getOrderPrice()));
			assertEquals(PaymentStatus.REFUND, payment.getPaymentStatus());
			broker.stop();
		} catch (Exception e) {
			e.printStackTrace();
			assert (false);
		}
	}

}
