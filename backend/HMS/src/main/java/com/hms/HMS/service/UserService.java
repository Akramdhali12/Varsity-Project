package com.hms.HMS.service;

import com.hms.HMS.dto.UserDTO;
import com.hms.HMS.exception.HmsException;

public interface UserService {
    public void registerUser(UserDTO userDTO) throws HmsException;
    public UserDTO loginUser(UserDTO userDTO) throws HmsException;
    public UserDTO getUserById(Long id) throws HmsException;
    public void updateUser(UserDTO userDTO);
    public UserDTO getUser(String email) throws HmsException;
}
