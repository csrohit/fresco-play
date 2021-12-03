package com.example.project.Models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Book {

    @Id
    private int id;
    private String category;
    private String bookName;
    private String bookUrl;
    private int availableBooks;
    private String status;

    public Book(int id, String category, String bookName, String bookUrl, int availableBooks, String status) {
        super();
        this.id = id;
        this.category = category;
        this.bookName = bookName;
        this.bookUrl = bookUrl;
        this.availableBooks = availableBooks;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Book() {
        super();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookUrl() {
        return bookUrl;
    }

    public void setBookUrl(String bookUrl) {
        this.bookUrl = bookUrl;
    }

    public int getAvailableBooks() {
        return availableBooks;
    }

    public void setAvailableBooks(int availableBooks) {
        this.availableBooks = availableBooks;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}
