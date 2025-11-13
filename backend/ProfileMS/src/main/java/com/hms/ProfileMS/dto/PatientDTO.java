package com.hms.ProfileMS.dto;

import java.time.LocalDate;

import com.hms.ProfileMS.entity.Patient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    private Long profilePictureId;
    private String phone;
    private String address;
    private String idCardNo;
    private BloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;

    public Patient toEntity() {
        return new Patient(this.id, this.name, this.email, this.dob,this.profilePictureId, this.phone,
         this.address, this.idCardNo, this.bloodGroup, this.allergies, this.chronicDisease);
    }
}
