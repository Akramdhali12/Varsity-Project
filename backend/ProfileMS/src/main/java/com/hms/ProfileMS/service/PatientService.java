package com.hms.ProfileMS.service;

import java.util.List;

import com.hms.ProfileMS.dto.DoctorDropdown;
import com.hms.ProfileMS.dto.PatientDTO;
import com.hms.ProfileMS.exception.HmsException;

public interface PatientService {
    public Long addPatient(PatientDTO patientDTO) throws HmsException;
    public PatientDTO getPatientById(Long id) throws HmsException;
    public PatientDTO updatePatient(PatientDTO patientDTO) throws HmsException;
    public Boolean patientExists(Long id) throws HmsException;
    public List<PatientDTO> getAllPatients() throws HmsException;
    public List<DoctorDropdown> getPatientsById(List<Long> ids) throws HmsException;
    
}
