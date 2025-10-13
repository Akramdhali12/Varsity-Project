package com.hms.HMS.service;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.HMS.dto.UserDTO;
import com.hms.HMS.entity.User;
import com.hms.HMS.exception.HmsException;
import com.hms.HMS.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service("userService")
public class UserServiceImpl implements UserService {

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
}
