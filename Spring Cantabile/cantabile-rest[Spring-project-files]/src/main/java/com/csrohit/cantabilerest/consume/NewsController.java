package com.csrohit.cantabilerest.consume;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/api/news/topstories")
    public ResponseEntity<?> getNews() throws Exception {
        Response response = newsService.getTopStories().getBody();
        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }

}
