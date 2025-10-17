package com.hms.ProfileMS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.exception.HmsException;
import com.hms.ProfileMS.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService {
    
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Long addPatient(PatientDTO patientDTO) throws HmsException {
        if(patientDTO.getEmail() != null &&
        patientRepository.findByEmail(patientDTO.getEmail()).isPresent()) throw new 
        HmsException("PATIENT_ALREADY_EXISTS");

        if(patientDTO.getIdCardNo()!=null &&
        patientRepository.findByIdCardNo(patientDTO.getIdCardNo()).isPresent()) throw new 
        HmsException("PATIENT_ALREADY_EXISTS");
        return patientRepository.save(patientDTO.toEntity()).getId();
    }

    @Override
    public PatientDTO getPatientById(Long id) throws HmsException {
        return patientRepository.findById(id).orElseThrow(()-> new 
        HmsException("PATIENT_NOT_FOUND")).toDTO();
    }
}
