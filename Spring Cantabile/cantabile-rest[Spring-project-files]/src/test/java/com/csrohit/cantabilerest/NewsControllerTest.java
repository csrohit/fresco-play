package com.example.project;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
public class NewsControllerTest {

    private MockMvc mockMvc;
    
    @Autowired
    WebApplicationContext context;
    
   

    @BeforeEach
    public void setup() {
    	mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }
    
	@Test
	public void retrievetest_ok() throws Exception {
		
		 mockMvc.perform(get("/api/news/topstories" )).andDo(print())
	                .andExpect(status().isOk())
	                .andExpect(MockMvcResultMatchers.jsonPath("$.results.[0].title").exists())
	                .andExpect(MockMvcResultMatchers.jsonPath("$.section").exists());
		 
	
	}


}
