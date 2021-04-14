package com.csrohit.cantabilerest;

import com.csrohit.cantabilerest.solution.Hospital;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
class CantabileRestApplicationTests {


	private MockMvc mockMvc;

	@Autowired
	WebApplicationContext context;



	@BeforeEach
	public void setup() {
		//this.mockMvc = MockMvcBuilders.standaloneSetup(new WeatherApiController()).build();
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}


	@Test
	public void retrievetest_ok() throws Exception {
		addhospital_ok();
		mockMvc.perform(get("/test/hospitals/1000" )).andDo(print())
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1000))
				.andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Apollo Hospital"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.rating").value(3.8))
				.andExpect(MockMvcResultMatchers.jsonPath("$.city").value("Chennai"));

	}


	@Test
	public void addhospital_ok() throws Exception {
		Hospital hosp=new Hospital();
		hosp.setId(1000);
		hosp.setName("Apollo Hospital");
		hosp.setCity("Chennai");
		hosp.setRating(3.8);
		byte[] hospJson = toJson(hosp);
		Hospital hosp1=new Hospital();
		hosp1.setId(1001);
		hosp1.setName("Global Hospital");
		hosp1.setCity("Bangalore");
		hosp1.setRating(3.5);
		byte[] hospJson1 = toJson(hosp1);
		mockMvc.perform(post("/test/hospitals/" )//.andDo(print())
				.content(hospJson)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
		mockMvc.perform(post("/test/hospitals/" )//.andDo(print())
				.content(hospJson1)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}

	@Test
	public void updatehospital_ok() throws Exception {
		Hospital hosp1=new Hospital();
		hosp1.setId(1001);
		hosp1.setName("Global Hospitals");
		hosp1.setCity("Goa");
		hosp1.setRating(3.5);
		byte[] hospJson1 = toJson(hosp1);
		mockMvc.perform(post("/test/hospitals/" )//.andDo(print())
				.content(hospJson1)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());

		mockMvc.perform(get("/test/hospitals/1001" )).andDo(print())
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Global Hospitals"))
				.andExpect(MockMvcResultMatchers.jsonPath("$.city").value("Goa"));
	}


	@Test
	public void deleteHospital_ok() throws Exception {
		Hospital hosp=new Hospital();
		hosp.setId(1000);
		hosp.setName("Apollo Hospital");
		hosp.setCity("Chennai");
		hosp.setRating(3.8);
		byte[] hospJson = toJson(hosp);
		mockMvc.perform(delete("/test/hospitals/" )//.andDo(print())
				.content(hospJson)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isNoContent());

	}

	private byte[] toJson(Object r) throws Exception {
		ObjectMapper map = new ObjectMapper();
		return map.writeValueAsString(r).getBytes();
	}

}
