package com.example.project.repository;

import org.springframework.stereotype.Repository;

import com.example.project.Model.Patient;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface PatientRepository extends JpaRepository<Patient,String>{

}
