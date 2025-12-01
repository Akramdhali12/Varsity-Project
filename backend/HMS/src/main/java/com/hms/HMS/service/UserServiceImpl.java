package com.hms.HMS.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.HMS.clients.Profile;
import com.hms.HMS.clients.ProfileClient;
import com.hms.HMS.dto.MonthlyRoleCountDTO;
import com.hms.HMS.dto.RegistrationCountsDTO;
// import com.hms.HMS.clients.ProfileClient;
import com.hms.HMS.dto.Roles;
import com.hms.HMS.dto.UserDTO;
import com.hms.HMS.entity.User;
import com.hms.HMS.exception.HmsException;
import com.hms.HMS.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    // @Autowired
    // private ApiService apiService;

    @Autowired
    private ProfileClient profileClient;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void registerUser(UserDTO userDTO) throws HmsException {
        Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new HmsException("USER_ALREADY_EXISTS");
        }
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        // Long profileId = apiService.addProfile(userDTO).block();
        Long profileId = null;
        if(userDTO.getRole().equals(Roles.DOCTOR)){
            profileId=profileClient.addDoctor(userDTO);
        }else if(userDTO.getRole().equals(Roles.PATIENT)){
            profileId=profileClient.addPatient(userDTO);
        }
        System.out.println(profileId);
        userDTO.setProfileId(profileId);
        userRepository.save(userDTO.toEntity());
    }

    @Override
    public UserDTO loginUser(UserDTO userDTO) throws HmsException {
        User user = userRepository.findByEmail(userDTO.getEmail())
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND"));
        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            throw new HmsException("INVALID_CREDENTIALS");
        }
        user.setPassword(null);
        return user.toDTO();
    }

    @Override
    public UserDTO getUserById(Long id) throws HmsException {   
        return userRepository.findById(id).orElseThrow(()->new HmsException("User not found")).toDTO();

    }

    @Override
    public void updateUser(UserDTO userDTO) {
        // Implementation here
    }

    @Override
    public UserDTO getUser(String email) throws HmsException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new HmsException("USER_NOT_FOUND")).toDTO();
    }

    @Override
    public Long getProfile(Long id) throws HmsException {
        User user = userRepository.findById(id).orElseThrow(()->new HmsException("USER_NOT_FOUND"));
        if(user.getRole().equals(Roles.DOCTOR)){
            return profileClient.getDoctor(id);
        }else if(user.getRole().equals(Roles.PATIENT)){
            return profileClient.getPatient(id);
        }
        throw new HmsException("INVALID_USER_ROLE");
    }

    @Override
    public RegistrationCountsDTO getMonthlyRegistrationCounts() {
        List<MonthlyRoleCountDTO> doctorCounts = userRepository.countRegistrationsByRoleGroupedByMonth(Roles.DOCTOR);
        List<MonthlyRoleCountDTO> patientCounts = userRepository.countRegistrationsByRoleGroupedByMonth(Roles.PATIENT);
        return new RegistrationCountsDTO(doctorCounts, patientCounts);
    }
}
