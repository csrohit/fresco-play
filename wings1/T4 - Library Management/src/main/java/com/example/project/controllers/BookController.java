package com.example.project.controllers;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.Models.Book;
import com.example.project.service.BookService;
import com.example.project.service.BorrowBookService;

@RestController
@RequestMapping("books")
public class BookController {

    @Autowired
    private BookService bookService;

	@PostMapping
    public ResponseEntity<Book> save(@RequestBody Book book){
        return ResponseEntity.ok(bookService.save(book));
    }

    @GetMapping
    public ResponseEntity<List<Book>> findAll(){
        return ResponseEntity.ok(bookService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Book> findById(@PathVariable int id){
        Book book = bookService.findById(id).get();
        return ResponseEntity.ok(book);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable int id){
        bookService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
	
}
