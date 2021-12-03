package com.example.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.Models.Book;
import com.example.project.Repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book save(Book book){
        return bookRepository.save(book);
    }

    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    public Optional<Book> findById(int id){
        return bookRepository.findById(id);
    }

    public void deleteById(int id){
        bookRepository.deleteById(id);
        return;
    }
	
}
