package com.example.project;

import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication
public class RestBooksApi {
	static RestTemplate restTemplate;
	
	public RestBooksApi(){
		restTemplate = new RestTemplate();
	}
	
	public static void main(String[] args)  {
		SpringApplication.run(RestBooksApi.class, args);
		try {
			JSONObject books=getEntity();
		System.out.println(books);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * get entity
	 * @throws JSONException 
	 */
	public static JSONObject getEntity() throws Exception{
		JSONObject books = new JSONObject();
		String getUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<String> entity = new HttpEntity<String>(headers);
		ResponseEntity<Map> bookList = restTemplate.exchange(getUrl, HttpMethod.GET, entity, Map.class);
		if (bookList.getStatusCode() == HttpStatus.OK) {
			books = new JSONObject(bookList.getBody());
		}
return books;
	}
	
}