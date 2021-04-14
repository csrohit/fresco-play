package com.csrohit.cantabilerest.solution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;


    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Hospital getHospital(int id) {
        return hospitalRepository.findAll().stream().filter(hospital -> hospital.getId() == id).findFirst().get();
    }

    public void addHospital(Hospital hospital) {
		hospitalRepository.save(hospital);
    }

    public void updateHospital(Hospital hospital) {
		hospitalRepository.save(hospital);
    }

    public void deleteHospital(Hospital hospital) {
	hospitalRepository.delete(hospital);
    }
}
