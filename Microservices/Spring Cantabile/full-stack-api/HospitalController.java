package com.example.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping("/{id}")
    public @ResponseBody
    Hospital getHospital(@PathVariable("id") int id) throws Exception {

        return hospitalService.getAllHospitals().stream().filter(hospital -> hospital.getId() == id).findFirst().get();
    }

    @GetMapping("")
    public @ResponseBody
    List<Hospital> getAllHospitals() throws Exception {
        return hospitalService.getAllHospitals();
    }

    @PostMapping("")
    public ResponseEntity<String> addHospital(@RequestBody Hospital hospital) {
        hospitalService.addHospital(hospital);
        return null;
    }

    @PutMapping("")
    public ResponseEntity<String> updateHospital(@RequestBody Hospital hospital) {
        hospitalService.updateHospital(hospital);
        return null;
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteHospital(@RequestBody Hospital hospital) {
        hospitalService.deleteHospital(hospital);
        return new ResponseEntity<String>("deleted", HttpStatus.NO_CONTENT);
    }

}
