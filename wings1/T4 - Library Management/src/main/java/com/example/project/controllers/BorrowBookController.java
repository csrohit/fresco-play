package com.example.project.controllers;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import com.example.project.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.Models.Book;
import com.example.project.Models.BorrowBook;
import com.example.project.service.BorrowBookService;

@RestController
@RequestMapping("borrowbook")
public class BorrowBookController {

    @Autowired
    private BorrowBookService service;

    @Autowired
    private BookService bookService;

	@PostMapping("{bookId}")
	public ResponseEntity<BorrowBook> borrowBook(@PathVariable int bookId, @RequestBody BorrowBook borrowBook){
        Book book = bookService.findById(bookId).get();
        borrowBook.setBook(book);
        return ResponseEntity.ok(service.save(borrowBook));
    }

    @GetMapping("{id}")
    public ResponseEntity<BorrowBook> findById(@PathVariable int id){
        BorrowBook borrowBook = service.findById(id).get();
        return ResponseEntity.ok(borrowBook);
    }

    @GetMapping
    public ResponseEntity<List<BorrowBook>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }
}
