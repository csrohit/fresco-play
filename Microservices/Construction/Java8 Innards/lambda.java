import java.io.*;
import java.util.*;

class Employee
{
    //Create the Constructor here
    String name;
    int id;
    int age;
    public Employee(String name,int id,int age){
        this.name = name;
        this.id = id;
        this.age = age;
    }
}

class SortEmployees 
{
    void sortEmployees(ArrayList<Employee> empList) 
    {

        //Enter your Code here
        Collections.sort(empList,(o1,o2) -> o1.name.compareTo(o2.name));
        for(Employee x:empList)
        {
            System.out.println(x.name+" "+x.id+" "+x.age);
        }
    }
}

public class SortEmployeesMain