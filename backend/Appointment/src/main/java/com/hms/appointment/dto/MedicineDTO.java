package com.hms.appointment.dto;

import com.hms.appointment.entity.Medicine;
import com.hms.appointment.entity.Prescription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicineDTO {
    private Long id;
    private String name;
    private Long medicineId;
    private String dosage;
    private String frequency;
    private Integer duration;// duration in days
    private String route;// e.g., Oral, Intravenous
    private String type;// e.g., Tablet, Syrup, Injection
    private String instructions;// additional instructions
    private Long prescriptionId;

    public Medicine toEntity(){
        return new Medicine(id,name,medicineId,dosage,frequency,duration,
        route,type,instructions, new Prescription(prescriptionId));
    }
}
