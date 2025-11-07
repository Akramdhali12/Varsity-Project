package com.hms.pharmacy.repository;

import org.springframework.data.repository.CrudRepository;

import com.hms.pharmacy.entity.MedicineInventory;

public interface MedicineInventoryRepository extends CrudRepository<MedicineInventory,Long>{
    
}
