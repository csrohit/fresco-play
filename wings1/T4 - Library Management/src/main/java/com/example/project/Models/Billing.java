package com.example.project.Models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Billing {

    @Id
    private int id;
    @OneToOne(targetEntity = BorrowBook.class)
    private BorrowBook borrowBook;
    private Date returnDate;
    private double finePerDay;
    private double billAmount;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BorrowBook getBorrowBook() {
        return borrowBook;
    }

    public void setBorrowBook(BorrowBook borrowBook) {
        this.borrowBook = borrowBook;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public double getFinePerDay() {
        return finePerDay;
    }

    public void setFinePerDay(double finePerDay) {
        this.finePerDay = finePerDay;
    }

    public double getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(double billAmount) {
        this.billAmount = billAmount;
    }

    public Billing(int id, BorrowBook borrowBook, Date returnDate, double finePerDay, double billAmount) {
        super();
        this.id = id;
        this.borrowBook = borrowBook;
        this.returnDate = returnDate;
        this.finePerDay = finePerDay;
        this.billAmount = billAmount;
    }

    public Billing() {
        super();
    }

    public Billing(int id, Date returnDate, double finePerDay) {
        super();
        this.id = id;
        this.returnDate = returnDate;
        this.finePerDay = finePerDay;
    }


}
