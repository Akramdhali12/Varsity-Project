package com.hms.ProfileMS.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.hms.ProfileMS.dto.BloodGroup;
import com.hms.ProfileMS.dto.DoctorDTO;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private LocalDate dob;
    private Long profilePictureId;
    private String phone;
    private String address;
    @Column(unique = true)
    private String licenseNo;
    private String specialization;
    private String department;
    private Integer totalExp;
    private LocalTime startTime;
    private LocalTime endTime;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "doctor_available_days", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "day")
    private List<String> availableDays = new ArrayList<>();


    public DoctorDTO toDTO() {
        return new DoctorDTO(this.id, this.name, this.email, this.dob,this.profilePictureId, this.phone, this.address, 
        this.licenseNo, this.specialization, this.department, this.totalExp, this.startTime, this.endTime, this.availableDays);
    }
}
