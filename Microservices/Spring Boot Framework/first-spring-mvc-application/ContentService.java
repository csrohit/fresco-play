package com.example.demo.content;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

@Service
public class ContentService {

  private List<Course> courses = new ArrayList<Course>(Arrays.asList(
                new Course(2001, "Cloud Computing", 10, 1000, 1001),
            new Course(3003,"DevOps", 10, 1000, 1002),
            new Course(2002,"Data Science", 10, 1000, 1003)
  ));


  private List<Category> categories = new ArrayList<>(Arrays.asList(
                new Category(1001, "Cloud Computing", "network of remote servers hosted on the Internet to store",courses),
            new Category(1003,"DevOps","practices that emphasize on collaboration and communication",courses),
            new Category(1002,"Data Science","practice of deriving valuable insights from data",courses)
  ));



    //put your code here.
	public List<Category> getAllContent() {
		return categories;
	
	}
	
}
