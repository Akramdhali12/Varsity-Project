package com.hms.HMS.dto;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.hms.HMS.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    @NotBlank(message = "Name is mandatory")
    private String name;
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Password is mandatory")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", 
             message = "Password must be at least 8 characters long, contain at least one digit, one lowercase letter, one uppercase letter, one special character and have no whitespace")
    private String password;
    private Roles role;

    public User toEntity(){
        return new User(this.id, this.name, this.email, this.password, this.role);
    }
}
