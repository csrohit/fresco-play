package com.example.project.controller;

import java.util.List;
import java.util.Optional;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.project.Model.Patient;
import com.example.project.service.PatientService;
@RestController
@RequestMapping("patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("list")
    public ResponseEntity<List<Patient>> listPatients(){
        return ResponseEntity.ok(patientService.findAll());
    }

    @PostMapping("register")
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient){
        return ResponseEntity.ok(patientService.save(patient));
    }

    @GetMapping("view/{patientId}")
    public ResponseEntity<Patient> findById(@PathVariable String patientId){
        Optional<Patient> patient = patientService.findById(patientId);
        return  ResponseEntity.ok(patient.get());
    }
	
}
