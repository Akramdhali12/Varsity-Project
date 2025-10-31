package com.hms.appointment.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.appointment.dto.ApRecordDTO;
import com.hms.appointment.service.ApRecordService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/appointment/report")
@Validated
@RequiredArgsConstructor
public class ApRecordAPI {
    private final ApRecordService apRecordService;

    @PostMapping("/create")
    public ResponseEntity<Long> createAppointmentReport(@RequestBody ApRecordDTO request) throws Exception {
        return new ResponseEntity<>(apRecordService.createApRecord(request),HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAppointmentReport(@RequestBody ApRecordDTO request) throws Exception {
        apRecordService.updateApRecord(request);
        return new ResponseEntity<>("Appointment Report Updated",HttpStatus.OK);
    }

    @GetMapping("/getByAppointmentId/{appointmentId}")
    public ResponseEntity<ApRecordDTO> getAppointmentReportByAppointmentId(@PathVariable Long appointmentId) throws Exception {
        return new ResponseEntity<>(apRecordService.getApRecordByAppointmentId(appointmentId),HttpStatus.OK);
    }
    @GetMapping("/getDetailsByAppointmentId/{appointmentId}")
    public ResponseEntity<ApRecordDTO> getAppointmentReportDetailsByAppointmentId(@PathVariable Long appointmentId) throws Exception {
        return new ResponseEntity<>(apRecordService.getApRecordDetailsByAppointmentId(appointmentId),HttpStatus.OK);
    }

    @GetMapping("/getById/{recordId}")
    public ResponseEntity<ApRecordDTO> getAppointmentReportById(@PathVariable Long recordId) throws Exception {
        return new ResponseEntity<>(apRecordService.getApRecordById(recordId),HttpStatus.OK);
    }
}
