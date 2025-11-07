package com.hms.pharmacy.service;

import java.util.List;

import com.hms.pharmacy.dto.MedicineDTO;
import com.hms.pharmacy.exception.HmsException;

public interface MedicineService {
    public Long addMedicine(MedicineDTO medicineDTO) throws HmsException;
    public MedicineDTO getMedicineById(Long id) throws HmsException;
    public void updateMedicine(MedicineDTO medicineDTO) throws HmsException;
    public List<MedicineDTO> getAlllMedicines() throws HmsException;
}
