package com.hms.ProfileMS.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hms.ProfileMS.dto.DoctorDropdown;
import com.hms.ProfileMS.entity.Doctor;

public interface DoctorRepository extends CrudRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNo(String licenseNo);

    @Query("SELECT d.id AS id, d.name AS name FROM Doctor d")
    List<DoctorDropdown> findAllDoctorDropdowns();

    @Query("SELECT d.id AS id, d.name AS name FROM Doctor d WHERE d.id in ?1")
    List<DoctorDropdown> findAllDoctorDropdownsByIds(List<Long> ids);


}
