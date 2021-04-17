package repository;

import Model.Patient;
import org.springframework.stereotype.Repository;


import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface PatientRepository extends JpaRepository<Patient,String>{

}
