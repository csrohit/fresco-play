package com.example.project.controllers;

import java.text.ParseException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.example.project.Models.BorrowBook;
import com.example.project.service.BorrowBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.Models.Billing;
import com.example.project.service.BillingService;

@RestController
@RequestMapping("billing")
public class BillingController {

    @Autowired
    private BorrowBookService borrowBookService;

    @Autowired
    private BillingService billingService;

    @PostMapping("{borrowbookId}")
    public ResponseEntity<Billing> save(@PathVariable int borrowbookId, @RequestBody Billing billing) {
        BorrowBook borrowBook = borrowBookService.findById(borrowbookId).get();
        billing.setBorrowBook(borrowBook);
        return ResponseEntity.ok(billingService.save(billing));
    }

    @GetMapping
    public ResponseEntity<List<Billing>> findAll(){
        return ResponseEntity.ok(billingService.findAll());
    }

    @GetMapping("getbill/{id}")
    public ResponseEntity<Billing> findById(@PathVariable int id){
        Billing billing = billingService.findById(id).get();
        BorrowBook borrowBook = billing.getBorrowBook();
        Date bookingDate = borrowBook.getBookingDate();
        Date returnDate = billing.getReturnDate();
        long duration = TimeUnit.MILLISECONDS.toDays(returnDate.getTime() - bookingDate.getTime());
        double bill = 0;
        if (duration < borrowBook.getNo_Of_Days()){

        }else{
            bill = borrowBook.getNo_Of_Days() * borrowBook.getChargePerDay();
            long overdue = duration - borrowBook.getNo_Of_Days() + 1;
            bill += overdue * billing.getFinePerDay();
        }

        billing.setBillAmount(bill);





        return ResponseEntity.ok(billing);
    }


}
