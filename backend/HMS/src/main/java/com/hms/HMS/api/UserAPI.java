package com.hms.HMS.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.hms.HMS.dto.LoginDTO;
import com.hms.HMS.dto.ResponseDTO;
import com.hms.HMS.dto.UserDTO;
import com.hms.HMS.exception.HmsException;
import com.hms.HMS.jwt.JwtUtil;
import com.hms.HMS.service.UserService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("user")
@Validated
@CrossOrigin
public class UserAPI {
    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid UserDTO userDTO) throws HmsException{
        userService.registerUser(userDTO);
        return new ResponseEntity<>(new ResponseDTO("User registered successfully"),HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> postMethodName(@RequestBody LoginDTO loginDTO) throws HmsException{
        try{
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
            );
        }
        catch(AuthenticationException e){
            throw new HmsException("INVALID_CREDENTIALS");
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginDTO.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        return new ResponseEntity<>(jwt,HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return new ResponseEntity<>("Hello ",HttpStatus.OK);
    }
    
}
