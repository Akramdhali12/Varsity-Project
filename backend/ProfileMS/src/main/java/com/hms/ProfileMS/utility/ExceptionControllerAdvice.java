package com.hms.ProfileMS.utility;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hms.ProfileMS.exception.HmsException;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.ConstraintViolation;


@RestControllerAdvice
public class ExceptionControllerAdvice {

    @Autowired
    Environment environment;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorInfo> handleException(Exception ex) {
        ErrorInfo error = new ErrorInfo("some error occurrede",
         HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
         return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(HmsException.class)
    public ResponseEntity<ErrorInfo> handleHmsException(HmsException ex) {
        ErrorInfo error = new ErrorInfo(environment.getProperty(ex.getMessage()),
         HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
         return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class,
        ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> handleValidationExceptions(Exception e) {
        String errorMsg;
        if (e instanceof MethodArgumentNotValidException manv) {
            errorMsg = manv.getBindingResult().getAllErrors().stream()
            .map(ObjectError::getDefaultMessage).collect(Collectors.joining(","));
        } else{
            ConstraintViolationException ex = (ConstraintViolationException) e;
            errorMsg = ex.getConstraintViolations().stream()
            .map(ConstraintViolation::getMessage).collect(Collectors.joining(","));
        }
        ErrorInfo error = new ErrorInfo(errorMsg,
         HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
         return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}
