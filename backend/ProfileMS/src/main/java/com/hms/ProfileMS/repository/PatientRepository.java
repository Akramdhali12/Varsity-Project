package com.hms.ProfileMS.repository;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hms.ProfileMS.entity.Patient;

public interface PatientRepository extends CrudRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByIdCardNo(String idCardNo);
}
