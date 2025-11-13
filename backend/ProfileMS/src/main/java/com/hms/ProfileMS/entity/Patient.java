
package com.hms.ProfileMS.entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import com.hms.ProfileMS.dto.BloodGroup;
import com.hms.ProfileMS.dto.PatientDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Patient{
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
    private String idCardNo;
    private BloodGroup bloodGroup;
    private String allergies;
    private String chronicDisease;

    public PatientDTO toDTO() {
        return new PatientDTO(this.id, this.name, this.email, this.dob,this.profilePictureId, this.phone,
        this.address, this.idCardNo, this.bloodGroup, this.allergies, this.chronicDisease);
    }

}