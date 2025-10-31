package com.hms.appointment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hms.appointment.dto.MedicineDTO;
import com.hms.appointment.entity.Medicine;
import com.hms.appointment.repository.MedicineRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicineServiceImpl implements MedicineService {
    private final MedicineRepository medicineRepository;

    @Override
    public Long saveMedicine(MedicineDTO request) {
        return medicineRepository.save(request.toEntity()).getId();
    }

    @Override
    public List<MedicineDTO> saveAllMedicines(List<MedicineDTO> requestList) {
        return ((List<Medicine>) medicineRepository.saveAll(
            requestList.stream().map(MedicineDTO::toEntity).toList()
        )).stream().map(Medicine::toDTO).toList();
    }

    @Override
    public List<MedicineDTO> getAllMedicinesByPrescriptionId(Long prescriptionId) {
        return ((List<Medicine>) medicineRepository.findAllByPrescription_Id(prescriptionId))
        .stream().map(Medicine::toDTO).toList();
    }

    
}
