package com.hms.pharmacy.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hms.pharmacy.entity.MedicineInventory;

public interface MedicineInventoryRepository extends CrudRepository<MedicineInventory,Long>{
    List<MedicineInventory> findByExpiryDateBefore(LocalDate date);
}
