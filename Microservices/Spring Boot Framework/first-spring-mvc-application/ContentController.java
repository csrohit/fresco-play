package com.example.demo.content;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class ContentController {
  @Autowired
  ContentService contentService;
  @RequestMapping("/")
  public List<Category> getAllContent(){
   return contentService.getAllContent();

  }
}
