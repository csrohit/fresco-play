package com.example.project;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsService {


	public ResponseEntity<Response> getTopStories() {
		RestTemplate restTemplate = new RestTemplate();
		String fooResourceUrl
				= "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=<your___api__key>";
		ResponseEntity<Response> response
				= restTemplate.getForEntity(fooResourceUrl, Response.class);
		return response;
	}
}
