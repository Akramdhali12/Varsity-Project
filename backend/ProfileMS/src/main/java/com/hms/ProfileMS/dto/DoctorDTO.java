package com.hms.ProfileMS.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.hms.ProfileMS.entity.Doctor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    private Long profilePictureId;
    private String phone;
    private String address;
    private String licenseNo;
    private String specialization;
    private String department;
    private Integer totalExp;

    private LocalTime startTime;
private LocalTime endTime;
private List<String> availableDays;


    public Doctor toEntity() {
        return new Doctor(this.id, this.name, this.email, this.dob,this.profilePictureId, this.phone, this.address, 
        this.licenseNo, this.specialization, this.department, this.totalExp, this.startTime, this.endTime, this.availableDays);
    }
}
