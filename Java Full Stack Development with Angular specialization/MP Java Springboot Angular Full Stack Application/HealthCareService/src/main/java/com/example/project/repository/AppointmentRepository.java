package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.Model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment,String>{

}
