package com.example.demo.employee;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmployeeController {

  @Autowired
  EmployeeService employeeService;
	
    //Put your code here
    @RequestMapping("/")
	public List<Employee> getEmpList(){
		//Put your code here
		return employeeService.getEmployees();		
	}
	
}
