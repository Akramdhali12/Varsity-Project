package com.hms.ProfileMS.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ProfileMS.dto.DoctorDTO;
import com.hms.ProfileMS.exception.HmsException;
import com.hms.ProfileMS.service.DoctorService;
import com.hms.ProfileMS.service.PatientService;

@RestController
@CrossOrigin
@RequestMapping("/profile/doctor")
@Validated
public class DoctorAPI {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/add")
    public ResponseEntity<Long> addPatient(@RequestBody DoctorDTO doctorDTO) throws HmsException {
        return new ResponseEntity<>(doctorService.addDoctor(doctorDTO),HttpStatus.CREATED);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DoctorDTO> getPatientById(@PathVariable Long id) throws HmsException{
        return new ResponseEntity<>(doctorService.getDoctorById(id),HttpStatus.OK);
    }
    
}
