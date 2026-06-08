package com.leslie.library_system.repository;

import com.leslie.library_system.model.BorrowRecord;
import com.leslie.library_system.model.BorrowRecordStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
    List<BorrowRecord> findByStudentId(Long studentId);
    List<BorrowRecord> findByStudentIdAndStatus(Long studentId, BorrowRecordStatus status);
}
