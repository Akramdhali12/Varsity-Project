package com.hms.appointment.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hms.appointment.entity.ApRecord;

public interface ApRecordRepository extends CrudRepository<ApRecord, Long> {
    Optional<ApRecord> findByAppointment_Id(Long appointmentId);
}
