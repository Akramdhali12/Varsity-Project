package com.hms.HMS.repository;

import com.hms.HMS.dto.MonthlyRoleCountDTO;
import com.hms.HMS.dto.Roles;
import com.hms.HMS.entity.User;

import java.time.Month;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("Select new com.hms.HMS.dto.MonthlyRoleCountDTO(CAST(FUNCTION('MONTHNAME',a.createdAt) as String), COUNT(a)) from User a WHERE a.role= :role "
    + "AND YEAR(a.createdAt)=YEAR(CURRENT_DATE) GROUP BY FUNCTION('MONTH', a.createdAt),CAST(FUNCTION('MONTHNAME',a.createdAt) as String) ORDER BY FUNCTION('MONTH',a.createdAt)")
    List<MonthlyRoleCountDTO> countRegistrationsByRoleGroupedByMonth(Roles role);
    
}
