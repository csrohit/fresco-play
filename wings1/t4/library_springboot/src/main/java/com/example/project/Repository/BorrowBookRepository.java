package com.example.project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.Models.BorrowBook;

@Repository
public interface BorrowBookRepository extends JpaRepository<BorrowBook, Integer>{

}
