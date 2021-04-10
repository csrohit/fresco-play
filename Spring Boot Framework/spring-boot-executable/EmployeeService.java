package com.example.demo.employee;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {
  
  private List<Employee> employees = new ArrayList<>(Arrays.asList(
    new Employee("Sandhya",20, 0),
    new Employee("Kemp",24, 2),
    new Employee("Anil",22, 3),
    new Employee("Kumar",30, 6),
    new Employee("Tim",32, 7)


  ));
	
	public List<Employee> getEmployees() {
return Collections.sort(employees);
    }
	
	

	
}
