package com.leslie.library_system.repository;

import com.leslie.library_system.model.BorrowRequest;
import com.leslie.library_system.model.ReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
    List<ReturnRequest> findByStudentId(Long studentId);
}
