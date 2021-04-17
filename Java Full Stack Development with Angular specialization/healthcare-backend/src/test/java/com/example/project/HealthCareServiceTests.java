package com.example.project;


import Model.ApplicationUser;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

@SpringBootTest
@RunWith(SpringRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
@Transactional
public class HealthCareServiceTests {
public String token;
	
private MockMvc mockMvc; 
@Autowired
  WebApplicationContext context;
 @Before
  public void setup() throws Exception {
    mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
  }

	 @Test
		public void contextLoads() {
		}
	@Test
	public void test1() throws Exception{
		ApplicationUser u =  new ApplicationUser("user1","user1@hcs.com","user@1","9999999999","chennai");
		byte[] iJson = toJson(u);
		mockMvc.perform(post("/register")
				.content(iJson)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		
	}
	@Test
	public void test2() throws Exception{
		test1();
		ApplicationUser u =  new ApplicationUser("user1","user@1");
		byte[] iJson = toJson(u);
	MvcResult result =	mockMvc.perform(post("/signin")
				.content(iJson)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
	token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
	System.out.println("hello"+token);
		
	}
	private byte[] toJson(Object r) throws Exception {
        ObjectMapper map = new ObjectMapper();
        return map.writeValueAsString(r).getBytes();
        }

	
}
