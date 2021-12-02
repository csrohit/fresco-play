package com.example.project.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.Model.Patient;
import com.example.project.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    public List<Patient> findAll(){
        return repository.findAll();
    }

    public Patient save(Patient patient){
        return repository.save(patient);
    }

    public Optional<Patient> findById(String id){
        return repository.findById(id);
    }
}
