package com.hms.HMS.entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.management.relation.Role;

import com.hms.HMS.dto.Roles;
import com.hms.HMS.dto.UserDTO;

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
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private Roles role;

    public UserDTO toDTO(){
        return new UserDTO(this.id, this.name, this.email, this.password, this.role);
    }
}