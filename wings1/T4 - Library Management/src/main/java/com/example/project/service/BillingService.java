package com.example.project.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.Models.Billing;
import com.example.project.Models.User;
import com.example.project.Repository.BillingRepository;
import com.example.project.Repository.BorrowBookRepository;
import com.example.project.Repository.UserRepository;

@Service
public class BillingService {

	@Autowired
    private BillingRepository billingRepository;

    public Billing save(Billing billing){
        return billingRepository.save(billing);
    }

    public List<Billing> findAll(){
        return billingRepository.findAll();
    }

    public Optional<Billing> findById(int id){
        return billingRepository.findById(id);
    }

}
