package frescojpa;

import javax.persistence.*;
import frescojpa.Student;

import java.util.*;

public class JPADemo {

	public static void main(String[] args) {
 EntityManagerFactory emf =
      Persistence.createEntityManagerFactory("$objectdb/students.odb");
  EntityManager entityManager = emf.createEntityManager();
  entityManager.getTransaction( ).begin( );
    try {
          Student student = new Student(1, "Ramesh");
          entityManager.persist(student);
          Student student1 = new Student(1, "John");
          entityManager.persist(student);
          Student student2 = new Student(1, "Ali");
          entityManager.persist(student);
          System.out.println(entityManager.find(Student.class, 1).getStudentName());
          System.out.println(entityManager.find(Student.class, 2).getStudentName());
          System.out.println(entityManager.find(Student.class, 3).getStudentName());
		  entityManager.getTransaction( ).commit( );
        }
        finally {
            entityManager.close();
			emf.close();
    } 
  }
}
