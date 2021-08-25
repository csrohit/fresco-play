package com.example.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.Models.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>{

}
