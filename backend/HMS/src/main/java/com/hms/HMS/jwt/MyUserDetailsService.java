package com.hms.HMS.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hms.HMS.dto.UserDTO;
import com.hms.HMS.service.UserService;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            UserDTO user = userService.getUser(email);
            return new CustomUserDetails(user.getId(), user.getEmail(), user.getEmail(),
                    user.getPassword(), user.getRole(), user.getName(), user.getProfileId(), null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
