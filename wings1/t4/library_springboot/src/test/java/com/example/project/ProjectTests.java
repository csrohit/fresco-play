package com.example.project;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


import org.junit.Before;
import org.junit.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.example.project.Models.Billing;
import com.example.project.Models.Book;
import com.example.project.Models.BorrowBook;
import com.example.project.Models.User;
import com.example.project.Repository.BillingRepository;
import com.example.project.Repository.BookRepository;
import com.example.project.Repository.BorrowBookRepository;
import com.example.project.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@RunWith(SpringRunner.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)	
public class ProjectTests {

	
private MockMvc mockMvc; 
	

	@Autowired
	WebApplicationContext context;
	
	@Autowired
	private BookRepository br;
	
	@Autowired
	private UserRepository ur;
	@Autowired
	private BillingRepository billr;
	@Autowired
	private BorrowBookRepository bbr;
	@Before
	  public void setup() throws Exception {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	  }
		
	@Test
	public void addUser_test() throws Exception{
		User u=new User();
		u.setUserid(1);
		u.setUserName("jhon");
		u.setEmailId("jhon@tcs.com");
		byte[] iJson = toJson(u);
		mockMvc.perform(post("/user")
				.content(iJson)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		User u1=new User();
		u1.setUserid(2);
		u1.setUserName("jhon1");
		u1.setEmailId("jhon1@tcs.com");
		byte[] iJson1 = toJson(u1);
		mockMvc.perform(post("/user")
				.content(iJson1)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		 mockMvc.perform(get("/user/1" )).andDo(print())
		 .andExpect(status().isOk())
         .andExpect(MockMvcResultMatchers.jsonPath("$.userid").value(1))
         .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("jhon"))
         .andExpect(MockMvcResultMatchers.jsonPath("$.emailId").value("jhon@tcs.com"));
		 mockMvc.perform(get("/user/2" )).andDo(print())
		 .andExpect(status().isOk())
         .andExpect(MockMvcResultMatchers.jsonPath("$.userid").value(2))
         .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("jhon1"))
         .andExpect(MockMvcResultMatchers.jsonPath("$.emailId").value("jhon1@tcs.com"));
		 assertEquals(2,ur.findAll().size() );
		 mockMvc.perform(delete("/user/1")
		 			.contentType(MediaType.APPLICATION_JSON)
		 			.accept(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk());
		 assertEquals(1,ur.findAll().size());
		
	}
	@Test
	public void addBook_test() throws Exception{
		Book b = new Book(1,"microservices","microservices with springboot","http://book.com",5,"available");
		byte[] iJson = toJson(b);
		mockMvc.perform(post("/books")
				.content(iJson)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		Book b1 = new Book(2,"microservices1","microservices with spring5.0","http://spring.com",5,"available");
		byte[] iJson1 = toJson(b1);
		mockMvc.perform(post("/books")
				.content(iJson1)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		 mockMvc.perform(get("/books/1" )).andDo(print())
		 .andExpect(status().isOk())
         .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
         .andExpect(MockMvcResultMatchers.jsonPath("$.category").value("microservices"))
         .andExpect(MockMvcResultMatchers.jsonPath("$.bookName").value("microservices with springboot"))
		 .andExpect(MockMvcResultMatchers.jsonPath("$.bookUrl").value("http://book.com"))
		 .andExpect(MockMvcResultMatchers.jsonPath("$.availableBooks").value(5))
		 .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("available"));
		 mockMvc.perform(get("/books/2" )).andDo(print())
		 .andExpect(status().isOk())
         .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
         .andExpect(MockMvcResultMatchers.jsonPath("$.category").value("microservices1"))
         .andExpect(MockMvcResultMatchers.jsonPath("$.bookName").value("microservices with spring5.0"))
		 .andExpect(MockMvcResultMatchers.jsonPath("$.bookUrl").value("http://spring.com"))
		 .andExpect(MockMvcResultMatchers.jsonPath("$.availableBooks").value(5))
		 .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("available"));
		 assertEquals(2,br.findAll().size());
		 mockMvc.perform(delete("/books/1")
		 			.contentType(MediaType.APPLICATION_JSON)
		 			.accept(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk());
		 assertEquals(1,br.findAll().size());
	}
	
	@Test
	public void borrowBook_test() throws Exception{
		List<BorrowBook> bb =new ArrayList<BorrowBook>();
		List<BorrowBook> bb1 =new ArrayList<BorrowBook>();
		
		User u=new User(1,"jhon","jhon@tcs.com",bb);
		
		byte[] iJson = toJson(u);
		mockMvc.perform(post("/user")
				.content(iJson)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		User u1=new User(2,"jhon1","jhon1@tcs.com",bb1);
		
		byte[] iJson1 = toJson(u1);
		mockMvc.perform(post("/user")
				.content(iJson1)
	 			.contentType(MediaType.APPLICATION_JSON)
	 			.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
		 mockMvc.perform(get("/user/1" )).andDo(print())
		 .andExpect(status().isOk())
         .andExpect(MockMvcResultMatchers.jsonPath("$.userid").value(1))
         .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("jhon"))
         .andExpect(MockMvcResultMatchers.jsonPath("$.emailId").value("jhon@tcs.com"));
		 mockMvc.perform(get("/user/2" )).andDo(print())
		 .andExpect(status().isOk())
         .andExpect(MockMvcResultMatchers.jsonPath("$.userid").value(2))
         .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("jhon1"))
         .andExpect(MockMvcResultMatchers.jsonPath("$.emailId").value("jhon1@tcs.com"));
		 assertEquals(2,ur.findAll().size() );
		 Book b = new Book(1,"microservices","microservices with springboot","http://book.com",5,"available");
			byte[] iJson2 = toJson(b);
			mockMvc.perform(post("/books")
					.content(iJson2)
		 			.contentType(MediaType.APPLICATION_JSON)
		 			.accept(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk());
			Book b1 = new Book(2,"microservices1","microservices with spring5.0","http://spring.com",5,"available");
			byte[] iJson3 = toJson(b1);
			mockMvc.perform(post("/books")
					.content(iJson3)
		 			.contentType(MediaType.APPLICATION_JSON)
		 			.accept(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk());
			 mockMvc.perform(get("/books/1" )).andDo(print())
			 .andExpect(status().isOk())
	         .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
	         .andExpect(MockMvcResultMatchers.jsonPath("$.category").value("microservices"))
	         .andExpect(MockMvcResultMatchers.jsonPath("$.bookName").value("microservices with springboot"))
			 .andExpect(MockMvcResultMatchers.jsonPath("$.bookUrl").value("http://book.com"))
			 .andExpect(MockMvcResultMatchers.jsonPath("$.availableBooks").value(5))
			 .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("available"));
			 mockMvc.perform(get("/books/2" )).andDo(print())
			 .andExpect(status().isOk())
	         .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(2))
	         .andExpect(MockMvcResultMatchers.jsonPath("$.category").value("microservices1"))
	         .andExpect(MockMvcResultMatchers.jsonPath("$.bookName").value("microservices with spring5.0"))
			 .andExpect(MockMvcResultMatchers.jsonPath("$.bookUrl").value("http://spring.com"))
			 .andExpect(MockMvcResultMatchers.jsonPath("$.availableBooks").value(5))
			 .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("available"));
			 assertEquals(2,br.findAll().size());
			 String s = "27/05/2022";
		        SimpleDateFormat sd = new SimpleDateFormat("dd/MM/yyyy");
		        Date date1 = sd.parse(s);
		       
			 BorrowBook bb3 = new BorrowBook(1,2,date1,50.0,4);
		
			 byte[] iJson4 = toJson(bb3);
			 mockMvc.perform(post("/borrowbook/1")
						.content(iJson4)
			 			.contentType(MediaType.APPLICATION_JSON)
			 			.accept(MediaType.APPLICATION_JSON))
		                .andExpect(status().isOk());
      	 mockMvc.perform(get("/borrowbook/1"))
      	 	.andExpect(status().isOk())
      	 	.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
   	         .andExpect(MockMvcResultMatchers.jsonPath("$.userid").value(2))
   	         .andExpect(MockMvcResultMatchers.jsonPath("$.book.id").value(1))
   			 .andExpect(MockMvcResultMatchers.jsonPath("$.book.category").value("microservices"))
   			 .andExpect(MockMvcResultMatchers.jsonPath("$.book.bookName").value("microservices with springboot"))
   			 .andExpect(MockMvcResultMatchers.jsonPath("$.book.bookUrl").value("http://book.com"))
   			.andExpect(MockMvcResultMatchers.jsonPath("$.book.availableBooks").value(5))
   			.andExpect(MockMvcResultMatchers.jsonPath("$.book.status").value("available"))
   			.andExpect(MockMvcResultMatchers.jsonPath("$.chargePerDay").value(50))
   			.andExpect(MockMvcResultMatchers.jsonPath("$.no_Of_Days").value("4"));
      	Calendar cal1 = Calendar.getInstance();
		cal1.set(Calendar.YEAR, 2022);
		cal1.set(Calendar.MONTH, Calendar.JUNE);
		cal1.set(Calendar.DAY_OF_MONTH, 02);

      	 Billing bill = new Billing(1,cal1.getTime(),20);
      	 byte[] ijson5 = toJson(bill);
      	 mockMvc.perform(post("/billing/1")
					.content(ijson5)
		 			.contentType(MediaType.APPLICATION_JSON)
		 			.accept(MediaType.APPLICATION_JSON))
	                .andExpect(status().isOk());
      	 mockMvc.perform(get("/billing/getbill/1"))
   	 	.andExpect(status().isOk())
      	.andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.borrowBook.id").value(1))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.borrowBook.userid").value(2))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.borrowBook.chargePerDay").value(50))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.borrowBook.book.id").value(1))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.borrowBook.no_Of_Days").value(4))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.finePerDay").value(20))
      	.andExpect(MockMvcResultMatchers.jsonPath("$.billAmount").value(260));
      	

      	
   			
		
	}
	
	
	
	
	
	private byte[] toJson(Object r) throws Exception {
        ObjectMapper map = new ObjectMapper();
        return map.writeValueAsString(r).getBytes();
        }
}
