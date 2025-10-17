package com.hms.ProfileMS.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hms.ProfileMS.entity.Doctor;

public interface DoctorRepository extends CrudRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNo(String licenseNo);
}
